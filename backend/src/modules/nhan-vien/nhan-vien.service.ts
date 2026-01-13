// Service Nhân Viên - Xử lý logic nghiệp vụ
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { TaoNhanVienDto, CapNhatNhanVienDto, TimKiemNhanVienDto } from './dto/nhan-vien.dto';
import {
  PaginatedResult,
  tinhPagination,
  taoPaginatedResult,
} from '../../common/dto/pagination.dto';

@Injectable()
export class NhanVienService {
  constructor(private prisma: PrismaService) {}

  // Tạo mã nhân viên tự động theo format NV0001, NV0002...
  async taoMaNhanVienTuDong(): Promise<string> {
    // Lấy mã nhân viên lớn nhất hiện có
    const lastNv = await this.prisma.nhanVien.findFirst({
      where: {
        maNhanVien: {
          startsWith: 'NV',
        },
      },
      orderBy: {
        maNhanVien: 'desc',
      },
      select: {
        maNhanVien: true,
      },
    });

    let nextNumber = 1;
    if (lastNv) {
      // Extract số từ mã NV (VD: NV0032 -> 32)
      const match = lastNv.maNhanVien.match(/NV(\d+)/);
      if (match) {
        nextNumber = parseInt(match[1], 10) + 1;
      }
    }

    // Format với 4 chữ số (NV0001, NV0032, etc.)
    return `NV${nextNumber.toString().padStart(4, '0')}`;
  }

  // Lấy tất cả nhân viên (có pagination)
  async layTatCa(query?: TimKiemNhanVienDto): Promise<PaginatedResult<any>> {
    const where: Record<string, unknown> = {};

    if (query?.phongBanId) {
      where.phongBanId = query.phongBanId;
    }

    if (query?.trangThai) {
      where.trangThai = query.trangThai;
    } else {
      where.trangThai = 'DANG_LAM';
    }

    if (query?.tuKhoa) {
      where.OR = [
        { hoTen: { contains: query.tuKhoa, mode: 'insensitive' } },
        { maNhanVien: { contains: query.tuKhoa, mode: 'insensitive' } },
        { email: { contains: query.tuKhoa, mode: 'insensitive' } },
      ];
    }

    // Pagination params
    const trang = query?.trang || 1;
    const soLuong = query?.soLuong || 50;
    const { skip, take } = tinhPagination(trang, soLuong);

    // Query với pagination
    const [data, tongSo] = await Promise.all([
      this.prisma.nhanVien.findMany({
        where,
        include: {
          phongBan: {
            select: { id: true, maPhongBan: true, tenPhongBan: true },
          },
        },
        orderBy: [{ phongBanId: 'asc' }, { hoTen: 'asc' }],
        skip,
        take,
      }),
      this.prisma.nhanVien.count({ where }),
    ]);

    return taoPaginatedResult(data, tongSo, trang, soLuong);
  }

  // Lấy nhân viên theo ID
  async layTheoId(id: number) {
    const nhanVien = await this.prisma.nhanVien.findUnique({
      where: { id },
      include: {
        phongBan: true,
        chiTietBangLuongs: {
          include: {
            bangLuong: true,
            khoanLuong: true,
          },
          orderBy: { bangLuong: { nam: 'desc' } },
          take: 12, // 12 tháng gần nhất
        },
      },
    });

    if (!nhanVien) {
      throw new NotFoundException(`Không tìm thấy nhân viên với ID: ${id}`);
    }

    return nhanVien;
  }

  // Lấy nhân viên theo mã
  async layTheoMa(maNhanVien: string) {
    const nhanVien = await this.prisma.nhanVien.findUnique({
      where: { maNhanVien },
      include: {
        phongBan: true,
      },
    });

    if (!nhanVien) {
      throw new NotFoundException(`Không tìm thấy nhân viên với mã: ${maNhanVien}`);
    }

    return nhanVien;
  }

  // Tạo nhân viên mới
  async taoMoi(dto: TaoNhanVienDto) {
    // Tự động tạo mã nhân viên nếu không được cung cấp
    const maNhanVien = dto.maNhanVien || await this.taoMaNhanVienTuDong();

    // Xử lý chuỗi rỗng thành null cho email và số điện thoại
    const email = dto.email?.trim() || null;
    const soDienThoai = dto.soDienThoai?.trim() || null;

    return this.prisma.nhanVien.create({
      data: {
        ...dto,
        maNhanVien,
        email,
        soDienThoai,
        ngayVaoLam: dto.ngayVaoLam ? new Date(dto.ngayVaoLam) : new Date(),
      },
      include: {
        phongBan: true,
      },
    });
  }

  // Cập nhật nhân viên
  async capNhat(id: number, dto: CapNhatNhanVienDto) {
    await this.layTheoId(id); // Kiểm tra tồn tại

    // Xử lý chuỗi rỗng thành null cho email và số điện thoại
    const updateData: Record<string, unknown> = { ...dto };
    if (dto.email !== undefined) {
      updateData.email = dto.email?.trim() || null;
    }
    if (dto.soDienThoai !== undefined) {
      updateData.soDienThoai = dto.soDienThoai?.trim() || null;
    }
    if (dto.ngayVaoLam) {
      updateData.ngayVaoLam = new Date(dto.ngayVaoLam);
    }

    return this.prisma.nhanVien.update({
      where: { id },
      data: updateData,
      include: {
        phongBan: true,
      },
    });
  }

  // Xóa nhân viên (soft delete - chuyển trạng thái)
  async xoa(id: number) {
    await this.layTheoId(id); // Kiểm tra tồn tại

    return this.prisma.nhanVien.update({
      where: { id },
      data: { trangThai: 'NGHI_VIEC' },
    });
  }

  // Đếm số nhân viên theo phòng ban
  async demTheoPhongBan() {
    return this.prisma.nhanVien.groupBy({
      by: ['phongBanId'],
      where: { trangThai: 'DANG_LAM' },
      _count: { id: true },
    });
  }
}
