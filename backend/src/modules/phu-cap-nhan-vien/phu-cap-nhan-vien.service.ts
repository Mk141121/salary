// Service quản lý Phụ cấp Nhân viên
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma, TrangThaiPhuCap, LoaiKhoanLuong } from '@prisma/client';

export interface TaoPhuCapDto {
  nhanVienId: number;
  khoanLuongId: number;
  soTien: number;
  tuNgay: Date;
  denNgay?: Date;
  ghiChu?: string;
  nguoiTao?: string;
}

export interface CapNhatPhuCapDto {
  denNgay?: Date;
  ghiChu?: string;
  trangThai?: TrangThaiPhuCap;
}

export interface TangPhuCapDto {
  soTienMoi: number;
  tuNgay: Date;
  ghiChu?: string;
  nguoiTao?: string;
}

@Injectable()
export class PhuCapNhanVienService {
  constructor(private prisma: PrismaService) {}

  /**
   * Lấy tất cả phụ cấp của nhân viên
   */
  async layTheoNhanVien(nhanVienId: number) {
    return this.prisma.phuCapNhanVien.findMany({
      where: { nhanVienId },
      include: {
        khoanLuong: true,
      },
      orderBy: [{ tuNgay: 'desc' }, { ngayTao: 'desc' }],
    });
  }

  /**
   * Lấy phụ cấp đang hiệu lực của nhân viên
   */
  async layPhuCapHieuLuc(nhanVienId: number) {
    const now = new Date();
    return this.prisma.phuCapNhanVien.findMany({
      where: {
        nhanVienId,
        trangThai: TrangThaiPhuCap.HIEU_LUC,
        tuNgay: { lte: now },
        OR: [{ denNgay: null }, { denNgay: { gte: now } }],
      },
      include: {
        khoanLuong: true,
      },
      orderBy: { khoanLuong: { thuTu: 'asc' } },
    });
  }

  /**
   * Lấy phụ cấp hợp lệ cho 1 tháng lương cụ thể
   * Logic: tuNgay <= ngayEndThang AND (denNgay IS NULL OR denNgay >= ngayStartThang)
   */
  async layPhuCapTheoThang(nhanVienId: number, thang: number, nam: number) {
    // Ngày đầu tháng và cuối tháng
    const ngayDauThang = new Date(nam, thang - 1, 1);
    const ngayCuoiThang = new Date(nam, thang, 0); // Ngày cuối tháng

    return this.prisma.phuCapNhanVien.findMany({
      where: {
        nhanVienId,
        trangThai: TrangThaiPhuCap.HIEU_LUC,
        tuNgay: { lte: ngayCuoiThang },
        OR: [{ denNgay: null }, { denNgay: { gte: ngayDauThang } }],
      },
      include: {
        khoanLuong: true,
      },
      orderBy: { khoanLuong: { thuTu: 'asc' } },
    });
  }

  /**
   * Lấy phụ cấp hợp lệ cho nhiều nhân viên trong 1 tháng
   * Dùng khi tạo bảng lương hàng loạt
   */
  async layPhuCapTheoThangBatch(
    nhanVienIds: number[],
    thang: number,
    nam: number,
  ) {
    const ngayDauThang = new Date(nam, thang - 1, 1);
    const ngayCuoiThang = new Date(nam, thang, 0);

    return this.prisma.phuCapNhanVien.findMany({
      where: {
        nhanVienId: { in: nhanVienIds },
        trangThai: TrangThaiPhuCap.HIEU_LUC,
        tuNgay: { lte: ngayCuoiThang },
        OR: [{ denNgay: null }, { denNgay: { gte: ngayDauThang } }],
      },
      include: {
        khoanLuong: true,
        nhanVien: {
          select: { id: true, maNhanVien: true, hoTen: true },
        },
      },
      orderBy: [{ nhanVienId: 'asc' }, { khoanLuong: { thuTu: 'asc' } }],
    });
  }

  /**
   * Thêm phụ cấp mới cho nhân viên
   */
  async taoPhuCap(dto: TaoPhuCapDto) {
    // Validate khoản lương phải là THU_NHAP
    const khoanLuong = await this.prisma.khoanLuong.findUnique({
      where: { id: dto.khoanLuongId },
    });

    if (!khoanLuong) {
      throw new NotFoundException('Không tìm thấy khoản lương');
    }

    if (khoanLuong.loai !== LoaiKhoanLuong.THU_NHAP) {
      throw new BadRequestException(
        'Chỉ khoản lương loại THU_NHAP mới được dùng làm phụ cấp',
      );
    }

    // Validate nhân viên tồn tại
    const nhanVien = await this.prisma.nhanVien.findUnique({
      where: { id: dto.nhanVienId },
    });

    if (!nhanVien) {
      throw new NotFoundException('Không tìm thấy nhân viên');
    }

    // Validate số tiền >= 0
    if (dto.soTien < 0) {
      throw new BadRequestException('Số tiền phụ cấp phải >= 0');
    }

    // Validate tuNgay <= denNgay
    if (dto.denNgay && dto.tuNgay > dto.denNgay) {
      throw new BadRequestException('Ngày bắt đầu phải <= ngày kết thúc');
    }

    // Kiểm tra trùng khoản lương trong cùng khoảng thời gian
    await this.kiemTraTrungLap(
      dto.nhanVienId,
      dto.khoanLuongId,
      dto.tuNgay,
      dto.denNgay,
    );

    return this.prisma.phuCapNhanVien.create({
      data: {
        nhanVienId: dto.nhanVienId,
        khoanLuongId: dto.khoanLuongId,
        soTien: new Prisma.Decimal(dto.soTien),
        tuNgay: dto.tuNgay,
        denNgay: dto.denNgay,
        ghiChu: dto.ghiChu,
        nguoiTao: dto.nguoiTao,
        trangThai: TrangThaiPhuCap.HIEU_LUC,
      },
      include: {
        khoanLuong: true,
      },
    });
  }

  /**
   * Kết thúc phụ cấp (đặt ngày kết thúc)
   */
  async ketThucPhuCap(id: number, denNgay: Date, nguoiCapNhat?: string) {
    const phuCap = await this.prisma.phuCapNhanVien.findUnique({
      where: { id },
    });

    if (!phuCap) {
      throw new NotFoundException('Không tìm thấy phụ cấp');
    }

    if (denNgay < phuCap.tuNgay) {
      throw new BadRequestException(
        'Ngày kết thúc phải >= ngày bắt đầu phụ cấp',
      );
    }

    return this.prisma.phuCapNhanVien.update({
      where: { id },
      data: {
        denNgay,
        trangThai: TrangThaiPhuCap.KET_THUC,
        ghiChu: phuCap.ghiChu
          ? `${phuCap.ghiChu} | Kết thúc bởi ${nguoiCapNhat || 'Hệ thống'}`
          : `Kết thúc bởi ${nguoiCapNhat || 'Hệ thống'}`,
      },
      include: {
        khoanLuong: true,
      },
    });
  }

  /**
   * Tăng/Điều chỉnh phụ cấp (không sửa đè, tạo bản ghi mới)
   */
  async tangPhuCap(id: number, dto: TangPhuCapDto) {
    const phuCapCu = await this.prisma.phuCapNhanVien.findUnique({
      where: { id },
      include: { khoanLuong: true },
    });

    if (!phuCapCu) {
      throw new NotFoundException('Không tìm thấy phụ cấp');
    }

    if (dto.soTienMoi < 0) {
      throw new BadRequestException('Số tiền mới phải >= 0');
    }

    // Ngày hiệu lực mới phải sau ngày bắt đầu phụ cấp cũ
    if (dto.tuNgay <= phuCapCu.tuNgay) {
      throw new BadRequestException(
        'Ngày hiệu lực mới phải sau ngày bắt đầu phụ cấp hiện tại',
      );
    }

    // Transaction: kết thúc phụ cấp cũ và tạo phụ cấp mới
    const ngayKetThucCu = new Date(dto.tuNgay);
    ngayKetThucCu.setDate(ngayKetThucCu.getDate() - 1);

    return this.prisma.$transaction(async (tx) => {
      // Kết thúc phụ cấp cũ
      await tx.phuCapNhanVien.update({
        where: { id },
        data: {
          denNgay: ngayKetThucCu,
          ghiChu: phuCapCu.ghiChu
            ? `${phuCapCu.ghiChu} | Điều chỉnh sang ${dto.soTienMoi.toLocaleString()}`
            : `Điều chỉnh sang ${dto.soTienMoi.toLocaleString()}`,
        },
      });

      // Tạo phụ cấp mới
      return tx.phuCapNhanVien.create({
        data: {
          nhanVienId: phuCapCu.nhanVienId,
          khoanLuongId: phuCapCu.khoanLuongId,
          soTien: new Prisma.Decimal(dto.soTienMoi),
          tuNgay: dto.tuNgay,
          denNgay: phuCapCu.denNgay, // Kế thừa ngày kết thúc nếu có
          ghiChu:
            dto.ghiChu ||
            `Điều chỉnh từ ${Number(phuCapCu.soTien).toLocaleString()}`,
          nguoiTao: dto.nguoiTao,
          trangThai: TrangThaiPhuCap.HIEU_LUC,
        },
        include: {
          khoanLuong: true,
        },
      });
    });
  }

  /**
   * Tạm dừng phụ cấp
   */
  async tamDungPhuCap(id: number) {
    const phuCap = await this.prisma.phuCapNhanVien.findUnique({
      where: { id },
    });

    if (!phuCap) {
      throw new NotFoundException('Không tìm thấy phụ cấp');
    }

    return this.prisma.phuCapNhanVien.update({
      where: { id },
      data: { trangThai: TrangThaiPhuCap.TAM_DUNG },
      include: { khoanLuong: true },
    });
  }

  /**
   * Kích hoạt lại phụ cấp đang tạm dừng
   */
  async kichHoatLai(id: number) {
    const phuCap = await this.prisma.phuCapNhanVien.findUnique({
      where: { id },
    });

    if (!phuCap) {
      throw new NotFoundException('Không tìm thấy phụ cấp');
    }

    if (phuCap.trangThai !== TrangThaiPhuCap.TAM_DUNG) {
      throw new BadRequestException('Chỉ kích hoạt lại phụ cấp đang tạm dừng');
    }

    return this.prisma.phuCapNhanVien.update({
      where: { id },
      data: { trangThai: TrangThaiPhuCap.HIEU_LUC },
      include: { khoanLuong: true },
    });
  }

  /**
   * Lấy lịch sử thay đổi phụ cấp của nhân viên
   */
  async layLichSuPhuCap(nhanVienId: number, khoanLuongId?: number) {
    const where: Prisma.PhuCapNhanVienWhereInput = { nhanVienId };
    if (khoanLuongId) {
      where.khoanLuongId = khoanLuongId;
    }

    return this.prisma.phuCapNhanVien.findMany({
      where,
      include: {
        khoanLuong: true,
      },
      orderBy: [{ khoanLuongId: 'asc' }, { tuNgay: 'asc' }],
    });
  }

  /**
   * Kiểm tra trùng lặp khoản phụ cấp trong cùng khoảng thời gian
   */
  private async kiemTraTrungLap(
    nhanVienId: number,
    khoanLuongId: number,
    tuNgay: Date,
    denNgay?: Date,
    excludeId?: number,
  ) {
    // Tìm các phụ cấp cùng khoản lương có khoảng thời gian chồng chéo
    const existing = await this.prisma.phuCapNhanVien.findMany({
      where: {
        nhanVienId,
        khoanLuongId,
        trangThai: { not: TrangThaiPhuCap.KET_THUC },
        id: excludeId ? { not: excludeId } : undefined,
      },
    });

    for (const pc of existing) {
      // Kiểm tra chồng chéo thời gian
      const pcDenNgay = pc.denNgay || new Date('2099-12-31');
      const newDenNgay = denNgay || new Date('2099-12-31');

      const overlap = tuNgay <= pcDenNgay && newDenNgay >= pc.tuNgay;

      if (overlap) {
        throw new BadRequestException(
          `Khoản phụ cấp này đã tồn tại trong khoảng thời gian chồng chéo (từ ${pc.tuNgay.toLocaleDateString('vi-VN')})`,
        );
      }
    }
  }

  /**
   * Thống kê tổng phụ cấp theo phòng ban
   */
  async thongKeTheoPhongBan(phongBanId: number) {
    const now = new Date();

    const result = await this.prisma.phuCapNhanVien.groupBy({
      by: ['khoanLuongId'],
      where: {
        nhanVien: { phongBanId },
        trangThai: TrangThaiPhuCap.HIEU_LUC,
        tuNgay: { lte: now },
        OR: [{ denNgay: null }, { denNgay: { gte: now } }],
      },
      _sum: { soTien: true },
      _count: { nhanVienId: true },
    });

    // Lấy thông tin khoản lương
    const khoanLuongIds = result.map((r) => r.khoanLuongId);
    const khoanLuongs = await this.prisma.khoanLuong.findMany({
      where: { id: { in: khoanLuongIds } },
    });

    return result.map((r) => ({
      khoanLuong: khoanLuongs.find((kl) => kl.id === r.khoanLuongId),
      tongTien: r._sum.soTien,
      soNhanVien: r._count.nhanVienId,
    }));
  }
}
