// Service Sổ Lương - Xem lịch sử chi tiết lương theo khoảng ngày
import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { LocSoLuongDto, TimKiemSoLuongDto } from './dto';

// Loại nguồn dữ liệu cho entry sổ lương
export type LoaiNguonSoLuong =
  | 'BANG_LUONG'
  | 'DIEU_CHINH'
  | 'UNG_LUONG'
  | 'KPI'
  | 'THUONG_PHAT'
  | 'CHIA_HANG'
  | 'GIAO_HANG';

// Entry trong sổ lương
export interface EntrySoLuong {
  ngayHachToan: Date;
  loaiNguon: LoaiNguonSoLuong;
  khoanLuong: string;
  soTien: number;
  moTa: string;
  refId: number;
  refType: string;
  chiTiet?: Record<string, unknown>;
}

// Tổng hợp sổ lương
export interface TongHopSoLuong {
  tongThuNhap: number;
  tongKhauTru: number;
  tongUngLuong: number;
  tongKhauTruUng: number;
  tongDieuChinh: number;
  tongThuong: number;
  tongPhat: number;
  thucLinh: number;
}

@Injectable()
export class SoLuongService {
  private readonly logger = new Logger(SoLuongService.name);

  constructor(private prisma: PrismaService) {}

  /**
   * Lấy sổ lương theo nhân viên
   */
  async laySoLuongNhanVien(
    nhanVienId: number,
    dto: LocSoLuongDto,
  ): Promise<{ nhanVien: Record<string, unknown>; entries: EntrySoLuong[]; tongHop: TongHopSoLuong }> {
    const nhanVien = await this.prisma.nhanVien.findUnique({
      where: { id: nhanVienId },
      include: { phongBan: true },
    });

    if (!nhanVien) {
      throw new NotFoundException(`Không tìm thấy nhân viên với ID: ${nhanVienId}`);
    }

    const tuNgay = dto.tuNgay ? new Date(dto.tuNgay) : new Date(new Date().getFullYear(), 0, 1);
    const denNgay = dto.denNgay ? new Date(dto.denNgay) : new Date();

    const entries: EntrySoLuong[] = [];

    // 1. Lấy từ Bảng lương (snapshot)
    const snapshots = await this.prisma.snapshotBangLuong.findMany({
      where: {
        nhanVienId,
        ngayChot: { gte: tuNgay, lte: denNgay },
      },
      orderBy: { ngayChot: 'desc' },
    });

    for (const ss of snapshots) {
      entries.push({
        ngayHachToan: ss.ngayChot,
        loaiNguon: 'BANG_LUONG',
        khoanLuong: ss.tenKhoan,
        soTien: ss.loaiKhoan === 'THU_NHAP' ? Number(ss.soTien) : -Number(ss.soTien),
        moTa: `Bảng lương - ${ss.tenKhoan}`,
        refId: ss.bangLuongId,
        refType: 'BangLuong',
      });
    }

    // 2. Lấy từ Phiếu điều chỉnh
    const phieuDCs = await this.prisma.phieuDieuChinh.findMany({
      where: {
        nhanVienId,
        trangThai: 'DA_DUYET',
        ngayDuyet: { gte: tuNgay, lte: denNgay },
      },
      include: {
        chiTiets: {
          include: { khoanLuong: true },
        },
      },
      orderBy: { ngayDuyet: 'desc' },
    });

    for (const pdc of phieuDCs) {
      for (const ct of pdc.chiTiets) {
        const isKhauTruUng = ct.khoanLuong.maKhoan === 'KHAU_TRU_UNG_LUONG';
        entries.push({
          ngayHachToan: pdc.ngayDuyet!,
          loaiNguon: isKhauTruUng ? 'UNG_LUONG' : 'DIEU_CHINH',
          khoanLuong: ct.khoanLuong.tenKhoan,
          soTien:
            pdc.loaiDieuChinh === 'TANG'
              ? Number(ct.chenhLech)
              : -Number(ct.chenhLech),
          moTa: `Điều chỉnh: ${pdc.lyDo}`,
          refId: pdc.id,
          refType: 'PhieuDieuChinh',
        });
      }
    }

    // 3. Lấy từ Bảng ứng lương (snapshot)
    const snapshotUngs = await this.prisma.snapshotChiTietBangUngLuong.findMany({
      where: {
        nhanVienId,
        ngayTao: { gte: tuNgay, lte: denNgay },
        soTienUngDuyet: { gt: 0 },
      },
      include: {
        snapshot: true,
      },
      orderBy: { ngayTao: 'desc' },
    });

    for (const su of snapshotUngs) {
      entries.push({
        ngayHachToan: su.snapshot.ngayChot,
        loaiNguon: 'UNG_LUONG',
        khoanLuong: 'Ứng lương',
        soTien: Number(su.soTienUngDuyet),
        moTa: `Ứng lương kỳ ${su.snapshot.thangNam}`,
        refId: su.snapshot.bangUngLuongId,
        refType: 'BangUngLuong',
      });
    }

    // 4. Lấy từ KPI
    const kpiDanhGias = await this.prisma.danhGiaKPINhanVien.findMany({
      where: {
        nhanVienId,
        trangThai: 'DA_DUYET',
        ngayDuyet: { gte: tuNgay, lte: denNgay },
        soTienThuong: { gt: 0 },
      },
      include: {
        kyDanhGia: true,
      },
      orderBy: { ngayDuyet: 'desc' },
    });

    for (const kpi of kpiDanhGias) {
      entries.push({
        ngayHachToan: kpi.ngayDuyet!,
        loaiNguon: 'KPI',
        khoanLuong: 'Thưởng KPI',
        soTien: Number(kpi.soTienThuong),
        moTa: `Thưởng KPI ${kpi.kyDanhGia.tenKy} - ${kpi.xepLoai}`,
        refId: kpi.id,
        refType: 'DanhGiaKPINhanVien',
      });
    }

    // 5. Lấy từ Sự kiện thưởng/phạt
    const suKiens = await this.prisma.suKienThuongPhat.findMany({
      where: {
        nhanVienId,
        trangThai: 'DA_DUYET',
        duyetLuc: { gte: tuNgay, lte: denNgay },
      },
      orderBy: { duyetLuc: 'desc' },
    });

    for (const sk of suKiens) {
      entries.push({
        ngayHachToan: sk.duyetLuc!,
        loaiNguon: 'THUONG_PHAT',
        khoanLuong: sk.loaiSuKien === 'THUONG' ? 'Thưởng' : 'Phạt',
        soTien: sk.loaiSuKien === 'THUONG' ? Number(sk.soTien) : -Number(sk.soTien),
        moTa: `${sk.maSuKien}: ${sk.ghiChu || ''}`,
        refId: sk.id,
        refType: 'SuKienThuongPhat',
      });
    }

    // Sắp xếp theo ngày
    entries.sort((a, b) => b.ngayHachToan.getTime() - a.ngayHachToan.getTime());

    // Tính tổng hợp
    const tongHop = this.tinhTongHop(entries);

    return {
      nhanVien: {
        id: nhanVien.id,
        maNhanVien: nhanVien.maNhanVien,
        hoTen: nhanVien.hoTen,
        phongBan: nhanVien.phongBan?.tenPhongBan,
      },
      entries,
      tongHop,
    };
  }

  /**
   * Lấy sổ lương theo phòng ban
   */
  async laySoLuongPhongBan(
    phongBanId: number,
    dto: LocSoLuongDto,
  ): Promise<{
    phongBan: Record<string, unknown>;
    tongHop: TongHopSoLuong;
    theoNhanVien: Array<{ nhanVien: Record<string, unknown>; tongHop: TongHopSoLuong }>;
  }> {
    const phongBan = await this.prisma.phongBan.findUnique({
      where: { id: phongBanId },
    });

    if (!phongBan) {
      throw new NotFoundException(`Không tìm thấy phòng ban với ID: ${phongBanId}`);
    }

    // Lấy danh sách nhân viên trong phòng ban
    const nhanViens = await this.prisma.nhanVien.findMany({
      where: { phongBanId, trangThai: 'DANG_LAM' },
    });

    const theoNhanVien: Array<{ nhanVien: Record<string, unknown>; tongHop: TongHopSoLuong }> = [];
    let tongHopPB: TongHopSoLuong = {
      tongThuNhap: 0,
      tongKhauTru: 0,
      tongUngLuong: 0,
      tongKhauTruUng: 0,
      tongDieuChinh: 0,
      tongThuong: 0,
      tongPhat: 0,
      thucLinh: 0,
    };

    for (const nv of nhanViens) {
      const result = await this.laySoLuongNhanVien(nv.id, dto);
      theoNhanVien.push({
        nhanVien: result.nhanVien,
        tongHop: result.tongHop,
      });

      // Cộng dồn vào tổng phòng ban
      tongHopPB.tongThuNhap += result.tongHop.tongThuNhap;
      tongHopPB.tongKhauTru += result.tongHop.tongKhauTru;
      tongHopPB.tongUngLuong += result.tongHop.tongUngLuong;
      tongHopPB.tongKhauTruUng += result.tongHop.tongKhauTruUng;
      tongHopPB.tongDieuChinh += result.tongHop.tongDieuChinh;
      tongHopPB.tongThuong += result.tongHop.tongThuong;
      tongHopPB.tongPhat += result.tongHop.tongPhat;
      tongHopPB.thucLinh += result.tongHop.thucLinh;
    }

    return {
      phongBan: {
        id: phongBan.id,
        maPhongBan: phongBan.maPhongBan,
        tenPhongBan: phongBan.tenPhongBan,
      },
      tongHop: tongHopPB,
      theoNhanVien,
    };
  }

  /**
   * Tìm kiếm sổ lương
   */
  async timKiem(dto: TimKiemSoLuongDto) {
    const { keyword, tuNgay, denNgay, phongBanId, trang = 1, soLuong = 20 } = dto;

    const whereNhanVien: Record<string, unknown> = {
      trangThai: 'DANG_LAM',
    };

    if (keyword) {
      whereNhanVien.OR = [
        { maNhanVien: { contains: keyword, mode: 'insensitive' } },
        { hoTen: { contains: keyword, mode: 'insensitive' } },
      ];
    }

    if (phongBanId) {
      whereNhanVien.phongBanId = phongBanId;
    }

    const skip = (trang - 1) * soLuong;

    const [nhanViens, tongSo] = await Promise.all([
      this.prisma.nhanVien.findMany({
        where: whereNhanVien,
        include: { phongBan: true },
        skip,
        take: soLuong,
        orderBy: { maNhanVien: 'asc' },
      }),
      this.prisma.nhanVien.count({ where: whereNhanVien }),
    ]);

    const locDto: LocSoLuongDto = { tuNgay, denNgay };

    const results = await Promise.all(
      nhanViens.map(async (nv) => {
        const soLuongData = await this.laySoLuongNhanVien(nv.id, locDto);
        return {
          nhanVien: soLuongData.nhanVien,
          tongHop: soLuongData.tongHop,
          soEntries: soLuongData.entries.length,
        };
      }),
    );

    return {
      data: results,
      meta: {
        tongSo,
        trang,
        soLuong,
        tongTrang: Math.ceil(tongSo / soLuong),
      },
    };
  }

  /**
   * Tính tổng hợp từ danh sách entries
   */
  private tinhTongHop(entries: EntrySoLuong[]): TongHopSoLuong {
    let tongThuNhap = 0;
    let tongKhauTru = 0;
    let tongUngLuong = 0;
    let tongKhauTruUng = 0;
    let tongDieuChinh = 0;
    let tongThuong = 0;
    let tongPhat = 0;

    for (const entry of entries) {
      switch (entry.loaiNguon) {
        case 'BANG_LUONG':
          if (entry.soTien > 0) {
            tongThuNhap += entry.soTien;
          } else {
            tongKhauTru += Math.abs(entry.soTien);
          }
          break;
        case 'UNG_LUONG':
          if (entry.soTien > 0) {
            tongUngLuong += entry.soTien;
          } else {
            tongKhauTruUng += Math.abs(entry.soTien);
          }
          break;
        case 'DIEU_CHINH':
          tongDieuChinh += entry.soTien;
          break;
        case 'KPI':
        case 'THUONG_PHAT':
          if (entry.soTien > 0) {
            tongThuong += entry.soTien;
          } else {
            tongPhat += Math.abs(entry.soTien);
          }
          break;
      }
    }

    const thucLinh =
      tongThuNhap +
      tongUngLuong +
      tongDieuChinh +
      tongThuong -
      tongKhauTru -
      tongKhauTruUng -
      tongPhat;

    return {
      tongThuNhap,
      tongKhauTru,
      tongUngLuong,
      tongKhauTruUng,
      tongDieuChinh,
      tongThuong,
      tongPhat,
      thucLinh,
    };
  }

  /**
   * Lấy chi tiết một entry (để drill-down)
   */
  async layChiTietEntry(refType: string, refId: number) {
    switch (refType) {
      case 'BangLuong':
        return this.prisma.bangLuong.findUnique({
          where: { id: refId },
          include: { phongBan: true },
        });
      case 'PhieuDieuChinh':
        return this.prisma.phieuDieuChinh.findUnique({
          where: { id: refId },
          include: {
            nhanVien: true,
            chiTiets: { include: { khoanLuong: true } },
          },
        });
      case 'BangUngLuong':
        return this.prisma.bangUngLuong.findUnique({
          where: { id: refId },
        });
      case 'DanhGiaKPINhanVien':
        return this.prisma.danhGiaKPINhanVien.findUnique({
          where: { id: refId },
          include: { kyDanhGia: true },
        });
      case 'SuKienThuongPhat':
        return this.prisma.suKienThuongPhat.findUnique({
          where: { id: refId },
        });
      default:
        return null;
    }
  }
}
