import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { TaoThueBHDto, CapNhatThueBHDto } from './thue-bh.dto';

@Injectable()
export class ThueBHService {
  constructor(private prisma: PrismaService) {}

  /**
   * Lấy thông tin thuế/BHXH của nhân viên
   */
  async layTheoNhanVien(nhanVienId: number) {
    // Kiểm tra nhân viên tồn tại
    const nhanVien = await this.prisma.nhanVien.findUnique({
      where: { id: nhanVienId },
    });

    if (!nhanVien) {
      throw new NotFoundException(`Không tìm thấy nhân viên với ID ${nhanVienId}`);
    }

    const thueBH = await this.prisma.nhanVienThueBH.findFirst({
      where: { nhanVienId },
    });

    return thueBH;
  }

  /**
   * Tạo hoặc cập nhật thông tin thuế/BHXH
   */
  async taoHoacCapNhat(nhanVienId: number, dto: TaoThueBHDto) {
    // Kiểm tra nhân viên tồn tại
    const nhanVien = await this.prisma.nhanVien.findUnique({
      where: { id: nhanVienId },
    });

    if (!nhanVien) {
      throw new NotFoundException(`Không tìm thấy nhân viên với ID ${nhanVienId}`);
    }

    // Kiểm tra đã có record chưa
    const existing = await this.prisma.nhanVienThueBH.findFirst({
      where: { nhanVienId },
    });

    const data = {
      mstCaNhan: dto.mstCaNhan?.trim() || null,
      soCmndCccd: dto.soCmndCccd?.trim() || null,
      ngayCap: dto.ngayCap ? new Date(dto.ngayCap) : null,
      noiCap: dto.noiCap?.trim() || null,
      soNguoiPhuThuoc: dto.soNguoiPhuThuoc ?? 0,
      ghiChu: dto.ghiChu?.trim() || null,
    };

    if (existing) {
      // Cập nhật
      return this.prisma.nhanVienThueBH.update({
        where: { id: existing.id },
        data,
      });
    } else {
      // Tạo mới
      return this.prisma.nhanVienThueBH.create({
        data: {
          nhanVienId,
          ...data,
        },
      });
    }
  }

  /**
   * Cập nhật theo ID
   */
  async capNhat(id: number, dto: CapNhatThueBHDto) {
    const thueBH = await this.prisma.nhanVienThueBH.findUnique({
      where: { id },
    });

    if (!thueBH) {
      throw new NotFoundException(`Không tìm thấy thông tin thuế/BHXH với ID ${id}`);
    }

    return this.prisma.nhanVienThueBH.update({
      where: { id },
      data: {
        mstCaNhan: dto.mstCaNhan?.trim() || null,
        soCmndCccd: dto.soCmndCccd?.trim() || null,
        ngayCap: dto.ngayCap ? new Date(dto.ngayCap) : null,
        noiCap: dto.noiCap?.trim() || null,
        soNguoiPhuThuoc: dto.soNguoiPhuThuoc ?? thueBH.soNguoiPhuThuoc,
        ghiChu: dto.ghiChu?.trim() || null,
      },
    });
  }

  /**
   * Xóa thông tin thuế/BHXH
   */
  async xoa(id: number) {
    const thueBH = await this.prisma.nhanVienThueBH.findUnique({
      where: { id },
    });

    if (!thueBH) {
      throw new NotFoundException(`Không tìm thấy thông tin thuế/BHXH với ID ${id}`);
    }

    await this.prisma.nhanVienThueBH.delete({
      where: { id },
    });

    return { message: 'Đã xóa thông tin thuế/BHXH' };
  }
}
