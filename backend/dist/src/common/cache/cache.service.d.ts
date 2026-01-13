import { OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
export interface CacheOptions {
    ttl?: number;
}
export declare class CacheService implements OnModuleInit, OnModuleDestroy {
    private configService;
    private readonly logger;
    private redisClient;
    private memoryCache;
    private useRedis;
    constructor(configService: ConfigService);
    onModuleInit(): Promise<void>;
    onModuleDestroy(): Promise<void>;
    get<T>(key: string): Promise<T | null>;
    set(key: string, value: any, ttl?: number): Promise<void>;
    del(key: string): Promise<void>;
    delByPattern(pattern: string): Promise<void>;
    getOrSet<T>(key: string, fallbackFn: () => Promise<T>, ttl?: number): Promise<T>;
    exists(key: string): Promise<boolean>;
    invalidateByPrefix(prefix: string): Promise<void>;
}
export declare const CACHE_KEYS: {
    CAU_HINH_BHXH: (nam: number) => string;
    CAU_HINH_BHXH_ALL: string;
    CAU_HINH_THUE: (nam: number) => string;
    CAU_HINH_THUE_ALL: string;
    BAC_THUE: (nam: number) => string;
    KHOAN_LUONG_ALL: string;
    KHOAN_LUONG_DETAIL: (id: number) => string;
    PHONG_BAN_ALL: string;
    THONG_TIN_CONG_TY: string;
};
export declare const CACHE_TTL: {
    SHORT: number;
    MEDIUM: number;
    LONG: number;
    VERY_LONG: number;
};
