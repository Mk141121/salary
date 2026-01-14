/**
 * Custom Throttle Decorators
 * Rate limiting tùy chỉnh cho các endpoint nhạy cảm
 */
import { Throttle, SkipThrottle } from '@nestjs/throttler';

/**
 * Rate limit cho endpoint đăng nhập
 * 5 lần / 60 giây để chống brute force
 */
export const ThrottleLogin = () => Throttle({ default: { limit: 5, ttl: 60000 } });

/**
 * Rate limit nghiêm ngặt hơn cho API nhạy cảm
 * 3 lần / 60 giây
 */
export const ThrottleStrict = () => Throttle({ default: { limit: 3, ttl: 60000 } });

/**
 * Bỏ qua rate limiting cho endpoint
 */
export const NoThrottle = () => SkipThrottle();
