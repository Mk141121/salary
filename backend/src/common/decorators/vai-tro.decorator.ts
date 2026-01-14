// Decorator @VaiTro() - Yêu cầu vai trò cụ thể
import { SetMetadata } from '@nestjs/common';

export const VAI_TRO_KEY = 'vaiTro';

/**
 * Yêu cầu người dùng có một trong các vai trò được chỉ định
 * @param vaiTros - Danh sách vai trò cho phép (ADMIN, HR, ACCOUNTANT, EMPLOYEE...)
 * @example
 * @VaiTro('ADMIN', 'HR')
 * @Post('tao-nhan-vien')
 * async taoNhanVien() { ... }
 */
export const VaiTro = (...vaiTros: string[]) => SetMetadata(VAI_TRO_KEY, vaiTros);
