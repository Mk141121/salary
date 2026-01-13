// Cache Module - Sử dụng Redis hoặc In-Memory fallback
// Hỗ trợ caching cho cấu hình BHXH/Thuế ít thay đổi
import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export interface CacheOptions {
  ttl?: number; // Time to live in seconds
}

@Injectable()
export class CacheService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(CacheService.name);
  private redisClient: any = null;
  private memoryCache: Map<string, { value: any; expireAt: number }> = new Map();
  private useRedis = false;

  constructor(private configService: ConfigService) {}

  async onModuleInit() {
    const redisUrl = this.configService.get<string>('REDIS_URL');
    
    if (redisUrl) {
      try {
        // Dynamic import redis để không bắt buộc phải cài
        // @ts-ignore - redis is optional dependency
        const redis = await import('redis').catch(() => null);
        if (!redis) {
          this.logger.warn('Redis package not installed, using in-memory cache');
          return;
        }
        
        const { createClient } = redis;
        this.redisClient = createClient({ url: redisUrl });
        
        this.redisClient.on('error', (err: Error) => {
          this.logger.error('Redis connection error:', err.message);
          this.useRedis = false;
        });

        this.redisClient.on('connect', () => {
          this.logger.log('Redis connected successfully');
          this.useRedis = true;
        });

        await this.redisClient.connect();
      } catch (error) {
        this.logger.warn('Redis not available, using in-memory cache');
        this.useRedis = false;
      }
    } else {
      this.logger.log('REDIS_URL not configured, using in-memory cache');
    }
  }

  async onModuleDestroy() {
    if (this.redisClient) {
      await this.redisClient.quit();
    }
  }

  /**
   * Lấy giá trị từ cache
   */
  async get<T>(key: string): Promise<T | null> {
    try {
      if (this.useRedis && this.redisClient) {
        const value = await this.redisClient.get(key);
        return value ? JSON.parse(value) : null;
      }
      
      // In-memory fallback
      const cached = this.memoryCache.get(key);
      if (!cached) return null;
      
      if (cached.expireAt && Date.now() > cached.expireAt) {
        this.memoryCache.delete(key);
        return null;
      }
      
      return cached.value as T;
    } catch (error) {
      this.logger.error(`Cache get error for key ${key}:`, error);
      return null;
    }
  }

  /**
   * Lưu giá trị vào cache
   * @param key Cache key
   * @param value Giá trị cần cache
   * @param ttl Time to live in seconds (default: 3600 = 1 hour)
   */
  async set(key: string, value: any, ttl: number = 3600): Promise<void> {
    try {
      if (this.useRedis && this.redisClient) {
        await this.redisClient.setEx(key, ttl, JSON.stringify(value));
        return;
      }
      
      // In-memory fallback
      this.memoryCache.set(key, {
        value,
        expireAt: Date.now() + ttl * 1000,
      });
    } catch (error) {
      this.logger.error(`Cache set error for key ${key}:`, error);
    }
  }

  /**
   * Xóa key khỏi cache
   */
  async del(key: string): Promise<void> {
    try {
      if (this.useRedis && this.redisClient) {
        await this.redisClient.del(key);
        return;
      }
      
      this.memoryCache.delete(key);
    } catch (error) {
      this.logger.error(`Cache delete error for key ${key}:`, error);
    }
  }

  /**
   * Xóa tất cả keys matching pattern
   */
  async delByPattern(pattern: string): Promise<void> {
    try {
      if (this.useRedis && this.redisClient) {
        const keys = await this.redisClient.keys(pattern);
        if (keys.length > 0) {
          await this.redisClient.del(keys);
        }
        return;
      }
      
      // In-memory fallback
      const regex = new RegExp(pattern.replace(/\*/g, '.*'));
      for (const key of this.memoryCache.keys()) {
        if (regex.test(key)) {
          this.memoryCache.delete(key);
        }
      }
    } catch (error) {
      this.logger.error(`Cache delete by pattern error:`, error);
    }
  }

  /**
   * Cache với fallback - lấy từ cache hoặc gọi hàm nếu không có
   */
  async getOrSet<T>(
    key: string,
    fallbackFn: () => Promise<T>,
    ttl: number = 3600,
  ): Promise<T> {
    // Thử lấy từ cache
    const cached = await this.get<T>(key);
    if (cached !== null) {
      return cached;
    }

    // Gọi fallback và cache kết quả
    const value = await fallbackFn();
    await this.set(key, value, ttl);
    return value;
  }

  /**
   * Kiểm tra key có tồn tại trong cache không
   */
  async exists(key: string): Promise<boolean> {
    try {
      if (this.useRedis && this.redisClient) {
        return (await this.redisClient.exists(key)) === 1;
      }
      
      const cached = this.memoryCache.get(key);
      if (!cached) return false;
      
      if (cached.expireAt && Date.now() > cached.expireAt) {
        this.memoryCache.delete(key);
        return false;
      }
      
      return true;
    } catch (error) {
      this.logger.error(`Cache exists error for key ${key}:`, error);
      return false;
    }
  }

  /**
   * Xóa cache theo prefix (cho invalidation)
   */
  async invalidateByPrefix(prefix: string): Promise<void> {
    await this.delByPattern(`${prefix}*`);
  }
}

// Cache keys constants
export const CACHE_KEYS = {
  // BHXH config - cache 24 hours (ít thay đổi)
  CAU_HINH_BHXH: (nam: number) => `cau_hinh_bhxh:${nam}`,
  CAU_HINH_BHXH_ALL: 'cau_hinh_bhxh:all',
  
  // Thuế TNCN config - cache 24 hours
  CAU_HINH_THUE: (nam: number) => `cau_hinh_thue:${nam}`,
  CAU_HINH_THUE_ALL: 'cau_hinh_thue:all',
  BAC_THUE: (nam: number) => `bac_thue:${nam}`,
  
  // Khoản lương - cache 1 hour
  KHOAN_LUONG_ALL: 'khoan_luong:all',
  KHOAN_LUONG_DETAIL: (id: number) => `khoan_luong:${id}`,
  
  // Phòng ban - cache 1 hour
  PHONG_BAN_ALL: 'phong_ban:all',
  
  // Thông tin công ty - cache 24 hours
  THONG_TIN_CONG_TY: 'thong_tin_cong_ty',
};

// TTL constants (in seconds)
export const CACHE_TTL = {
  SHORT: 300,       // 5 minutes
  MEDIUM: 3600,     // 1 hour
  LONG: 86400,      // 24 hours
  VERY_LONG: 604800, // 7 days
};
