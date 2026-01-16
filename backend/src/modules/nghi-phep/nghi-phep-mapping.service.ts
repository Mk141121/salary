// Service Mapping nghỉ phép sang Chấm công / Ngày công
import { Injectable, Logger, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma, TrangThaiChamCong } from '@prisma/client';

@Injectable()
export class NghiPhepMappingService {
  private readonly logger = new Logger(NghiPhepMappingService.name);

  constructor(private prisma: PrismaService) {}

  /**
   * Tạo chi tiết ngày nghỉ từ đơn nghỉ phép
   * Explode tuNgay..denNgay thành các bản ghi ChiTietNghiPhepNgay
   */
  async taoChiTietNgayNghi(donNghiPhepId: number): Promise<{ soNgayTao: number }> {
    const donNghi = await this.prisma.donNghiPhep.findUnique({
      where: { id: donNghiPhepId },
      include: { loaiNghi: true },
    });

    if (!donNghi) {
      throw new NotFoundException(`Không tìm thấy đơn nghỉ phép #${donNghiPhepId}`);
    }

    if (donNghi.trangThai !== 'DA_DUYET') {
      throw new BadRequestException('Chỉ có thể tạo chi tiết ngày nghỉ cho đơn đã duyệt');
    }

    // Xóa chi tiết cũ nếu có (idempotent)
    await this.prisma.chiTietNghiPhepNgay.deleteMany({
      where: { donNghiPhepId },
    });

    // Explode từng ngày
    const tuNgay = new Date(donNghi.tuNgay);
    const denNgay = new Date(donNghi.denNgay);
    const chiTietNgays: Prisma.ChiTietNghiPhepNgayCreateManyInput[] = [];

    for (let d = new Date(tuNgay); d <= denNgay; d.setDate(d.getDate() + 1)) {
      // Bỏ qua ngày cuối tuần (Chủ nhật = 0, Thứ 7 = 6)
      const dayOfWeek = d.getDay();
      if (dayOfWeek === 0 || dayOfWeek === 6) {
        continue;
      }

      chiTietNgays.push({
        donNghiPhepId,
        nhanVienId: donNghi.nhanVienId,
        ngay: new Date(d),
        soGioNghi: 8, // Mặc định 8 giờ/ngày
        loaiNghiId: donNghi.loaiNghiId,
        coTinhLuong: donNghi.loaiNghi.coTinhLuong,
        coTinhChuyenCan: donNghi.loaiNghi.coTinhChuyenCan,
      });
    }

    if (chiTietNgays.length > 0) {
      await this.prisma.chiTietNghiPhepNgay.createMany({
        data: chiTietNgays,
      });
    }

    this.logger.log(`Đã tạo ${chiTietNgays.length} chi tiết ngày nghỉ cho đơn #${donNghiPhepId}`);

    return { soNgayTao: chiTietNgays.length };
  }

  /**
   * Đồng bộ vào ChiTietChamCong
   * Update/insert trạng thái nghỉ cho các ngày trong đơn nghỉ
   */
  async dongBoChamCong(donNghiPhepId: number): Promise<{ soNgayCapNhat: number }> {
    const donNghi = await this.prisma.donNghiPhep.findUnique({
      where: { id: donNghiPhepId },
      include: {
        loaiNghi: true,
        chiTietNgays: true,
      },
    });

    if (!donNghi) {
      throw new NotFoundException(`Không tìm thấy đơn nghỉ phép #${donNghiPhepId}`);
    }

    if (donNghi.trangThai !== 'DA_DUYET') {
      throw new BadRequestException('Chỉ có thể đồng bộ chấm công cho đơn đã duyệt');
    }

    let soNgayCapNhat = 0;
    
    // Map loại nghỉ sang TrangThaiChamCong phù hợp
    // CO_PHEP = NGHI_PHEP, KHONG_PHEP = NGHI_KHONG_LUONG (không có lương)
    const trangThaiNghi: TrangThaiChamCong = donNghi.loaiNghi.coTinhLuong 
      ? TrangThaiChamCong.NGHI_PHEP 
      : TrangThaiChamCong.NGHI_KHONG_LUONG;

    for (const chiTiet of donNghi.chiTietNgays) {
      // Cập nhật hoặc tạo ChiTietChamCong (dùng unique constraint nhanVienId + ngay)
      await this.prisma.chiTietChamCong.upsert({
        where: {
          nhanVienId_ngay: {
            nhanVienId: donNghi.nhanVienId,
            ngay: chiTiet.ngay,
          },
        },
        update: {
          trangThai: trangThaiNghi,
          ghiChu: `Nghỉ phép - Đơn #${donNghi.maDon}`,
        },
        create: {
          nhanVienId: donNghi.nhanVienId,
          ngay: chiTiet.ngay,
          trangThai: trangThaiNghi,
          ghiChu: `Nghỉ phép - Đơn #${donNghi.maDon}`,
        },
      });
      soNgayCapNhat++;
    }

    this.logger.log(`Đã đồng bộ ${soNgayCapNhat} ngày chấm công cho đơn #${donNghiPhepId}`);

    return { soNgayCapNhat };
  }

  /**
   * Cập nhật tổng hợp NgayCongBangLuong
   * Tính lại các field soNgayNghiCoPhep, soNgayNghiKhongPhep, etc.
   */
  async capNhatNgayCongBangLuong(
    thangNam: string,
    nhanVienId: number,
  ): Promise<{
    soNgayNghiCoPhep: number;
    soNgayNghiKhongPhep: number;
    soNgayNghiCoLuong: number;
    soNgayNghiKhongLuong: number;
  }> {
    // Parse thangNam (YYYY-MM) thành khoảng ngày
    const [year, month] = thangNam.split('-').map(Number);
    const tuNgay = new Date(year, month - 1, 1);
    const denNgay = new Date(year, month, 0); // Ngày cuối tháng

    // Tổng hợp chi tiết nghỉ phép trong tháng
    const chiTietNgays = await this.prisma.chiTietNghiPhepNgay.findMany({
      where: {
        nhanVienId,
        ngay: {
          gte: tuNgay,
          lte: denNgay,
        },
        donNghiPhep: {
          trangThai: 'DA_DUYET',
        },
      },
      include: {
        loaiNghi: true,
      },
    });

    // Tính toán số ngày
    let soNgayNghiCoPhep = 0;
    let soNgayNghiKhongPhep = 0;
    let soNgayNghiCoLuong = 0;
    let soNgayNghiKhongLuong = 0;

    for (const ct of chiTietNgays) {
      const soNgay = Number(ct.soGioNghi) / 8; // Quy đổi giờ ra ngày

      if (ct.loaiNghi.nhomLoai === 'CO_PHEP') {
        soNgayNghiCoPhep += soNgay;
      } else {
        soNgayNghiKhongPhep += soNgay;
      }

      if (ct.coTinhLuong) {
        soNgayNghiCoLuong += soNgay;
      } else {
        soNgayNghiKhongLuong += soNgay;
      }
    }

    // Cập nhật NgayCongBangLuong - cập nhật cả field cũ và mới để backward compat
    await this.prisma.ngayCongBangLuong.updateMany({
      where: {
        nhanVienId,
        bangLuong: {
          thang: month,
          nam: year,
        },
      },
      data: {
        // Field mới
        soNgayNghiCoPhep,
        soNgayNghiCoLuong,
        soNgayNghiKhongLuong,
        // Field cũ - backward compat (mapping từ field mới)
        soNgayNghiPhep: soNgayNghiCoPhep, // soNgayNghiPhep = có phép
        soNgayNghiKhongPhep, // giữ nguyên
      },
    });

    this.logger.log(
      `Cập nhật NgayCongBangLuong tháng ${thangNam} cho NV #${nhanVienId}: ` +
      `nghỉ có phép=${soNgayNghiCoPhep}, không phép=${soNgayNghiKhongPhep}`,
    );

    return {
      soNgayNghiCoPhep,
      soNgayNghiKhongPhep,
      soNgayNghiCoLuong,
      soNgayNghiKhongLuong,
    };
  }

  /**
   * Rebuild mapping hoàn chỉnh cho một đơn nghỉ phép
   * Gồm: tạo chi tiết ngày + đồng bộ chấm công + cập nhật ngày công
   */
  async rebuildMapping(donNghiPhepId: number): Promise<{
    soNgayTao: number;
    soNgayCapNhatChamCong: number;
    thongKeNgayCong: {
      soNgayNghiCoPhep: number;
      soNgayNghiKhongPhep: number;
      soNgayNghiCoLuong: number;
      soNgayNghiKhongLuong: number;
    };
  }> {
    const donNghi = await this.prisma.donNghiPhep.findUnique({
      where: { id: donNghiPhepId },
    });

    if (!donNghi) {
      throw new NotFoundException(`Không tìm thấy đơn nghỉ phép #${donNghiPhepId}`);
    }

    // Bước 1: Tạo chi tiết ngày nghỉ
    const { soNgayTao } = await this.taoChiTietNgayNghi(donNghiPhepId);

    // Bước 2: Đồng bộ chấm công
    const { soNgayCapNhat: soNgayCapNhatChamCong } = await this.dongBoChamCong(donNghiPhepId);

    // Bước 3: Cập nhật ngày công cho tất cả các tháng liên quan
    const tuNgay = new Date(donNghi.tuNgay);
    const denNgay = new Date(donNghi.denNgay);
    const thangNams = new Set<string>();

    for (let d = new Date(tuNgay); d <= denNgay; d.setMonth(d.getMonth() + 1)) {
      thangNams.add(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`);
    }

    let thongKeNgayCong = {
      soNgayNghiCoPhep: 0,
      soNgayNghiKhongPhep: 0,
      soNgayNghiCoLuong: 0,
      soNgayNghiKhongLuong: 0,
    };

    for (const thangNam of thangNams) {
      const thongKe = await this.capNhatNgayCongBangLuong(thangNam, donNghi.nhanVienId);
      thongKeNgayCong = {
        soNgayNghiCoPhep: thongKeNgayCong.soNgayNghiCoPhep + thongKe.soNgayNghiCoPhep,
        soNgayNghiKhongPhep: thongKeNgayCong.soNgayNghiKhongPhep + thongKe.soNgayNghiKhongPhep,
        soNgayNghiCoLuong: thongKeNgayCong.soNgayNghiCoLuong + thongKe.soNgayNghiCoLuong,
        soNgayNghiKhongLuong: thongKeNgayCong.soNgayNghiKhongLuong + thongKe.soNgayNghiKhongLuong,
      };
    }

    return {
      soNgayTao,
      soNgayCapNhatChamCong,
      thongKeNgayCong,
    };
  }

  /**
   * Xóa mapping khi hủy đơn
   */
  async xoaMapping(donNghiPhepId: number): Promise<{ soNgayXoa: number }> {
    const donNghi = await this.prisma.donNghiPhep.findUnique({
      where: { id: donNghiPhepId },
      include: { chiTietNgays: true },
    });

    if (!donNghi) {
      throw new NotFoundException(`Không tìm thấy đơn nghỉ phép #${donNghiPhepId}`);
    }

    const soNgayXoa = donNghi.chiTietNgays.length;

    // Xóa chi tiết ngày nghỉ
    await this.prisma.chiTietNghiPhepNgay.deleteMany({
      where: { donNghiPhepId },
    });

    // Cập nhật lại ngày công cho các tháng liên quan
    const tuNgay = new Date(donNghi.tuNgay);
    const denNgay = new Date(donNghi.denNgay);
    const thangNams = new Set<string>();

    for (let d = new Date(tuNgay); d <= denNgay; d.setMonth(d.getMonth() + 1)) {
      thangNams.add(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`);
    }

    for (const thangNam of thangNams) {
      await this.capNhatNgayCongBangLuong(thangNam, donNghi.nhanVienId);
    }

    this.logger.log(`Đã xóa ${soNgayXoa} chi tiết ngày nghỉ cho đơn #${donNghiPhepId}`);

    return { soNgayXoa };
  }

  /**
   * Lấy lịch nghỉ phép của nhân viên trong khoảng thời gian
   */
  async layLichNghiNhanVien(
    nhanVienId: number,
    tuNgay: Date,
    denNgay: Date,
  ): Promise<{
    chiTietNgays: Array<{
      ngay: Date;
      soGioNghi: number;
      loaiNghi: { id: number; maLoaiNghi: string; tenLoaiNghi: string };
      coTinhLuong: boolean;
      coTinhChuyenCan: boolean;
      donNghiPhep: { id: number; maDon: string; trangThai: string };
    }>;
  }> {
    const chiTietNgays = await this.prisma.chiTietNghiPhepNgay.findMany({
      where: {
        nhanVienId,
        ngay: {
          gte: tuNgay,
          lte: denNgay,
        },
        donNghiPhep: {
          trangThai: 'DA_DUYET',
        },
      },
      include: {
        loaiNghi: {
          select: {
            id: true,
            maLoaiNghi: true,
            tenLoaiNghi: true,
          },
        },
        donNghiPhep: {
          select: {
            id: true,
            maDon: true,
            trangThai: true,
          },
        },
      },
      orderBy: { ngay: 'asc' },
    });

    return {
      chiTietNgays: chiTietNgays.map((ct) => ({
        ngay: ct.ngay,
        soGioNghi: Number(ct.soGioNghi),
        loaiNghi: ct.loaiNghi,
        coTinhLuong: ct.coTinhLuong,
        coTinhChuyenCan: ct.coTinhChuyenCan,
        donNghiPhep: ct.donNghiPhep,
      })),
    };
  }
}
