// Service Phòng Ban - Xử lý logic nghiệp vụ
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { TaoPhongBanDto, CapNhatPhongBanDto } from './dto/phong-ban.dto';

@Injectable()
export class PhongBanService {
  constructor(private prisma: PrismaService) {}

  // Lấy tất cả phòng ban
  async layTatCa() {
    return this.prisma.phongBan.findMany({
      where: { trangThai: true },
      include: {
        _count: {
          select: { nhanViens: true },
        },
      },
      orderBy: { tenPhongBan: 'asc' },
    });
  }

  // Lấy phòng ban theo ID
  async layTheoId(id: number) {
    const phongBan = await this.prisma.phongBan.findUnique({
      where: { id },
      include: {
        nhanViens: {
          where: { trangThai: 'DANG_LAM' },
          orderBy: { hoTen: 'asc' },
        },
        coCauLuongs: {
          include: {
            chiTiets: {
              include: {
                khoanLuong: true,
              },
            },
          },
        },
        _count: {
          select: { nhanViens: true, bangLuongs: true },
        },
      },
    });

    if (!phongBan) {
      throw new NotFoundException(`Không tìm thấy phòng ban với ID: ${id}`);
    }

    return phongBan;
  }

  // Tạo phòng ban mới
  async taoMoi(dto: TaoPhongBanDto) {
    return this.prisma.phongBan.create({
      data: dto,
    });
  }

  // Cập nhật phòng ban
  async capNhat(id: number, dto: CapNhatPhongBanDto) {
    await this.layTheoId(id); // Kiểm tra tồn tại

    return this.prisma.phongBan.update({
      where: { id },
      data: dto,
    });
  }

  // Xóa phòng ban (soft delete)
  async xoa(id: number) {
    await this.layTheoId(id); // Kiểm tra tồn tại

    return this.prisma.phongBan.update({
      where: { id },
      data: { trangThai: false },
    });
  }

  // Lấy danh sách nhân viên theo phòng ban
  async layNhanVienTheoPhongBan(id: number) {
    await this.layTheoId(id); // Kiểm tra tồn tại

    return this.prisma.nhanVien.findMany({
      where: {
        phongBanId: id,
        trangThai: 'DANG_LAM',
      },
      orderBy: { hoTen: 'asc' },
    });
  }
}
