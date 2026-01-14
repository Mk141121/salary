// Decorator @Quyen() - Yêu cầu quyền cụ thể
import { SetMetadata } from '@nestjs/common';

export const QUYEN_KEY = 'quyen';

/**
 * Yêu cầu người dùng có một trong các quyền được chỉ định
 * @param quyens - Danh sách quyền cần có (LUONG_XEM, LUONG_SUA, NHAN_VIEN_TAO...)
 * @example
 * @Quyen('LUONG_SUA')
 * @Put('cap-nhat-luong')
 * async capNhatLuong() { ... }
 */
export const Quyen = (...quyens: string[]) => SetMetadata(QUYEN_KEY, quyens);
