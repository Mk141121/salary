"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var CacheService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CACHE_TTL = exports.CACHE_KEYS = exports.CacheService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
let CacheService = CacheService_1 = class CacheService {
    constructor(configService) {
        this.configService = configService;
        this.logger = new common_1.Logger(CacheService_1.name);
        this.redisClient = null;
        this.memoryCache = new Map();
        this.useRedis = false;
    }
    async onModuleInit() {
        const redisUrl = this.configService.get('REDIS_URL');
        if (redisUrl) {
            try {
                const redis = await Promise.resolve().then(() => require('redis')).catch(() => null);
                if (!redis) {
                    this.logger.warn('Redis package not installed, using in-memory cache');
                    return;
                }
                const { createClient } = redis;
                this.redisClient = createClient({ url: redisUrl });
                this.redisClient.on('error', (err) => {
                    this.logger.error('Redis connection error:', err.message);
                    this.useRedis = false;
                });
                this.redisClient.on('connect', () => {
                    this.logger.log('Redis connected successfully');
                    this.useRedis = true;
                });
                await this.redisClient.connect();
            }
            catch (error) {
                this.logger.warn('Redis not available, using in-memory cache');
                this.useRedis = false;
            }
        }
        else {
            this.logger.log('REDIS_URL not configured, using in-memory cache');
        }
    }
    async onModuleDestroy() {
        if (this.redisClient) {
            await this.redisClient.quit();
        }
    }
    async get(key) {
        try {
            if (this.useRedis && this.redisClient) {
                const value = await this.redisClient.get(key);
                return value ? JSON.parse(value) : null;
            }
            const cached = this.memoryCache.get(key);
            if (!cached)
                return null;
            if (cached.expireAt && Date.now() > cached.expireAt) {
                this.memoryCache.delete(key);
                return null;
            }
            return cached.value;
        }
        catch (error) {
            this.logger.error(`Cache get error for key ${key}:`, error);
            return null;
        }
    }
    async set(key, value, ttl = 3600) {
        try {
            if (this.useRedis && this.redisClient) {
                await this.redisClient.setEx(key, ttl, JSON.stringify(value));
                return;
            }
            this.memoryCache.set(key, {
                value,
                expireAt: Date.now() + ttl * 1000,
            });
        }
        catch (error) {
            this.logger.error(`Cache set error for key ${key}:`, error);
        }
    }
    async del(key) {
        try {
            if (this.useRedis && this.redisClient) {
                await this.redisClient.del(key);
                return;
            }
            this.memoryCache.delete(key);
        }
        catch (error) {
            this.logger.error(`Cache delete error for key ${key}:`, error);
        }
    }
    async delByPattern(pattern) {
        try {
            if (this.useRedis && this.redisClient) {
                const keys = await this.redisClient.keys(pattern);
                if (keys.length > 0) {
                    await this.redisClient.del(keys);
                }
                return;
            }
            const regex = new RegExp(pattern.replace(/\*/g, '.*'));
            for (const key of this.memoryCache.keys()) {
                if (regex.test(key)) {
                    this.memoryCache.delete(key);
                }
            }
        }
        catch (error) {
            this.logger.error(`Cache delete by pattern error:`, error);
        }
    }
    async getOrSet(key, fallbackFn, ttl = 3600) {
        const cached = await this.get(key);
        if (cached !== null) {
            return cached;
        }
        const value = await fallbackFn();
        await this.set(key, value, ttl);
        return value;
    }
    async exists(key) {
        try {
            if (this.useRedis && this.redisClient) {
                return (await this.redisClient.exists(key)) === 1;
            }
            const cached = this.memoryCache.get(key);
            if (!cached)
                return false;
            if (cached.expireAt && Date.now() > cached.expireAt) {
                this.memoryCache.delete(key);
                return false;
            }
            return true;
        }
        catch (error) {
            this.logger.error(`Cache exists error for key ${key}:`, error);
            return false;
        }
    }
    async invalidateByPrefix(prefix) {
        await this.delByPattern(`${prefix}*`);
    }
};
exports.CacheService = CacheService;
exports.CacheService = CacheService = CacheService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], CacheService);
exports.CACHE_KEYS = {
    CAU_HINH_BHXH: (nam) => `cau_hinh_bhxh:${nam}`,
    CAU_HINH_BHXH_ALL: 'cau_hinh_bhxh:all',
    CAU_HINH_THUE: (nam) => `cau_hinh_thue:${nam}`,
    CAU_HINH_THUE_ALL: 'cau_hinh_thue:all',
    BAC_THUE: (nam) => `bac_thue:${nam}`,
    KHOAN_LUONG_ALL: 'khoan_luong:all',
    KHOAN_LUONG_DETAIL: (id) => `khoan_luong:${id}`,
    PHONG_BAN_ALL: 'phong_ban:all',
    THONG_TIN_CONG_TY: 'thong_tin_cong_ty',
};
exports.CACHE_TTL = {
    SHORT: 300,
    MEDIUM: 3600,
    LONG: 86400,
    VERY_LONG: 604800,
};
//# sourceMappingURL=cache.service.js.map