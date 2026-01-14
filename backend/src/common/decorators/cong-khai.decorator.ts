// Decorator @CongKhai() - Đánh dấu route public (không cần đăng nhập)
import { SetMetadata } from '@nestjs/common';

export const CONG_KHAI_KEY = 'congKhai';

/**
 * Đánh dấu route này là công khai, không cần đăng nhập
 * @example
 * @CongKhai()
 * @Post('dang-nhap')
 * async dangNhap() { ... }
 */
export const CongKhai = () => SetMetadata(CONG_KHAI_KEY, true);
