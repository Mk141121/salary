// Decorator @NguoiDungHienTai() - Lấy thông tin người dùng từ request
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export interface ThongTinNguoiDung {
  id: number;
  tenDangNhap: string;
  hoTen: string;
  email: string;
  vaiTros: string[];
  quyens: string[];
}

/**
 * Lấy thông tin người dùng đang đăng nhập từ request
 * @example
 * @Get('profile')
 * async getProfile(@NguoiDungHienTai() nguoiDung: ThongTinNguoiDung) {
 *   return nguoiDung;
 * }
 */
export const NguoiDungHienTai = createParamDecorator(
  (data: keyof ThongTinNguoiDung | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const nguoiDung = request.nguoiDung as ThongTinNguoiDung;

    if (data) {
      return nguoiDung?.[data];
    }

    return nguoiDung;
  },
);
