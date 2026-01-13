// Service Khoản Lương - Xử lý logic nghiệp vụ danh mục khoản lương
import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { TaoKhoanLuongDto, CapNhatKhoanLuongDto } from './dto/khoan-luong.dto';

@Injectable()
export class KhoanLuongService {
  constructor(private prisma: PrismaService) {}

  // Lấy tất cả khoản lương
  async layTatCa() {
    return this.prisma.khoanLuong.findMany({
      where: { trangThai: true },
      orderBy: { thuTu: 'asc' },
    });
  }

  // Lấy khoản lương theo loại
  async layTheoLoai(loai: 'THU_NHAP' | 'KHAU_TRU') {
    return this.prisma.khoanLuong.findMany({
      where: {
        loai,
        trangThai: true,
      },
      orderBy: { thuTu: 'asc' },
    });
  }

  // Lấy khoản lương theo ID
  async layTheoId(id: number) {
    const khoanLuong = await this.prisma.khoanLuong.findUnique({
      where: { id },
      include: {
        _count: {
          select: { chiTietBangLuongs: true, coCauLuongChiTiets: true },
        },
      },
    });

    if (!khoanLuong) {
      throw new NotFoundException(`Không tìm thấy khoản lương với ID: ${id}`);
    }

    return khoanLuong;
  }

  // Lấy khoản lương theo mã
  async layTheoMa(maKhoan: string) {
    const khoanLuong = await this.prisma.khoanLuong.findUnique({
      where: { maKhoan },
    });

    if (!khoanLuong) {
      throw new NotFoundException(`Không tìm thấy khoản lương với mã: ${maKhoan}`);
    }

    return khoanLuong;
  }

  // Tạo khoản lương mới
  async taoMoi(dto: TaoKhoanLuongDto) {
    // Kiểm tra mã đã tồn tại chưa
    const existing = await this.prisma.khoanLuong.findUnique({
      where: { maKhoan: dto.maKhoan },
    });

    if (existing) {
      throw new ConflictException(`Mã khoản lương "${dto.maKhoan}" đã tồn tại`);
    }

    // Lấy thứ tự lớn nhất hiện tại
    const maxThuTu = await this.prisma.khoanLuong.aggregate({
      _max: { thuTu: true },
    });

    return this.prisma.khoanLuong.create({
      data: {
        ...dto,
        thuTu: dto.thuTu ?? (maxThuTu._max.thuTu || 0) + 1,
      },
    });
  }

  // Cập nhật khoản lương
  async capNhat(id: number, dto: CapNhatKhoanLuongDto) {
    await this.layTheoId(id); // Kiểm tra tồn tại

    // Nếu đổi mã, kiểm tra mã mới có trùng không
    if (dto.maKhoan) {
      const existing = await this.prisma.khoanLuong.findFirst({
        where: {
          maKhoan: dto.maKhoan,
          id: { not: id },
        },
      });

      if (existing) {
        throw new ConflictException(`Mã khoản lương "${dto.maKhoan}" đã tồn tại`);
      }
    }

    return this.prisma.khoanLuong.update({
      where: { id },
      data: dto,
    });
  }

  // Xóa khoản lương (soft delete)
  async xoa(id: number) {
    const khoanLuong = await this.layTheoId(id);

    // Kiểm tra xem có đang được sử dụng không
    if (khoanLuong._count.chiTietBangLuongs > 0) {
      throw new ConflictException(
        `Không thể xóa khoản lương này vì đang được sử dụng trong ${khoanLuong._count.chiTietBangLuongs} bảng lương`,
      );
    }

    return this.prisma.khoanLuong.update({
      where: { id },
      data: { trangThai: false },
    });
  }

  // Cập nhật thứ tự hiển thị
  async capNhatThuTu(danhSach: { id: number; thuTu: number }[]) {
    const updates = danhSach.map((item) =>
      this.prisma.khoanLuong.update({
        where: { id: item.id },
        data: { thuTu: item.thuTu },
      }),
    );

    return this.prisma.$transaction(updates);
  }
}
