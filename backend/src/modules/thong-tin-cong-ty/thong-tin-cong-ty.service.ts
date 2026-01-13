import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

export interface CapNhatThongTinCongTyDto {
  tenCongTy: string;
  maSoThue?: string;
  diaChi?: string;
  dienThoai?: string;
  email?: string;
  website?: string;
  logo?: string;
  nguoiDaiDien?: string;
  chucVuDaiDien?: string;
}

@Injectable()
export class ThongTinCongTyService {
  constructor(private prisma: PrismaService) {}

  /**
   * Lấy thông tin công ty (luôn trả về record đầu tiên)
   */
  async layThongTinCongTy() {
    const thongTin = await this.prisma.thongTinCongTy.findFirst();
    
    if (!thongTin) {
      // Tạo record mặc định nếu chưa có
      return this.prisma.thongTinCongTy.create({
        data: {
          tenCongTy: 'Công ty chưa cấu hình',
          maSoThue: '',
          diaChi: '',
          dienThoai: '',
          email: '',
          website: '',
          logo: '',
          nguoiDaiDien: '',
          chucVuDaiDien: '',
        },
      });
    }

    return thongTin;
  }

  /**
   * Cập nhật thông tin công ty
   */
  async capNhatThongTinCongTy(dto: CapNhatThongTinCongTyDto) {
    const existing = await this.prisma.thongTinCongTy.findFirst();

    if (existing) {
      // Update record hiện tại
      return this.prisma.thongTinCongTy.update({
        where: { id: existing.id },
        data: {
          ...dto,
          ngayCapNhat: new Date(),
        },
      });
    } else {
      // Tạo mới nếu chưa có
      return this.prisma.thongTinCongTy.create({
        data: dto,
      });
    }
  }

  /**
   * Upload logo (lưu đường dẫn)
   */
  async capNhatLogo(logoPath: string) {
    const existing = await this.prisma.thongTinCongTy.findFirst();

    if (!existing) {
      throw new NotFoundException('Chưa có thông tin công ty');
    }

    return this.prisma.thongTinCongTy.update({
      where: { id: existing.id },
      data: {
        logo: logoPath,
        ngayCapNhat: new Date(),
      },
    });
  }
}
