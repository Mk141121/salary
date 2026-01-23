// Service Sổ Lương - Xem lịch sử chi tiết lương theo khoảng ngày
import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { LocSoLuongDto, TimKiemSoLuongDto } from './dto';

// Interfaces cho response - export de controller dung
export interface BangLuongItem {
  bangLuongId: number;
  thangNam: string;
  thang: number;
  nam: number;
  luongCoBan: number;
  phuCapTong: number;
  thuongKPI: number;
  thuongThuNhap: number;
  khauTruTong: number;
  ungLuong: number;
  bhxh: number;
  bhyt: number;
  bhtn: number;
  thueTNCN: number;
  thucLanh: number;
  ngayCong: number;
  nghiCoPhep: number;
  nghiKhongPhep: number;
  chotNgay?: string;
}

export interface DieuChinhItem {
  phieuDieuChinhId: number;
  ngayTao: string;
  loaiPhieu: string;
  tenKhoanLuong: string;
  loaiKhoan: string;
  soTien: number;
  ghiChu?: string;
}

export interface UngLuongItem {
  bangUngLuongId: number;
  maBang: string;
  thangNam: string;
  soTienDuyet: number;
  trangThai: string;
  ngayChot?: string;
}

export interface KPIItem {
  kyDanhGiaId: number;
  thang: number;
  nam: number;
  tongDiem: number;
  xepLoai: string;
  tienThuong: number;
}

export interface ThuongPhatItem {
  suKienId: number;
  loai: 'THUONG' | 'PHAT';
  ten: string;
  soTien: number;
  ngay: string;
  lyDo?: string;
}

export interface TongKetNV {
  tongLuong: number;
  tongThuong: number;
  tongPhat: number;
  tongKhauTru: number;
  tongUng: number;
  tongThucNhan: number;
}

export interface TongHopPhongBan {
  tongThuNhap: number;
  tongKhauTru: number;
  tongThuong: number;
  tongPhat: number;
  thucLinh: number;
}

@Injectable()
export class SoLuongService {
  private readonly logger = new Logger(SoLuongService.name);

  constructor(private prisma: PrismaService) {}

  /**
   * Lấy sổ lương theo nhân viên - format đầy đủ cho frontend
   */
  async laySoLuongNhanVien(nhanVienId: number, dto: LocSoLuongDto) {
    const nhanVien = await this.prisma.nhanVien.findUnique({
      where: { id: nhanVienId },
      include: { phongBan: true },
    });

    if (!nhanVien) {
      throw new NotFoundException(`Khong tim thay nhan vien voi ID: ${nhanVienId}`);
    }

    const tuNgay = dto.tuNgay ? new Date(dto.tuNgay) : new Date(new Date().getFullYear(), 0, 1);
    const denNgay = dto.denNgay ? new Date(dto.denNgay) : new Date();

    // Chuyen doi tuNgay/denNgay thanh thang/nam de filter
    const tuThang = tuNgay.getMonth() + 1;
    const tuNam = tuNgay.getFullYear();
    const denThangVal = denNgay.getMonth() + 1;
    const denNamVal = denNgay.getFullYear();

    // 1. Lay Bang luong
    const bangLuongs = await this.layBangLuongs(nhanVienId, tuThang, tuNam, denThangVal, denNamVal);

    // 2. Lay Phieu dieu chinh
    const dieuChinhs = await this.layDieuChinhs(nhanVienId, tuNgay, denNgay);

    // 3. Lay Ung luong
    const ungLuongs = await this.layUngLuongs(nhanVienId, tuNgay, denNgay);

    // 4. Lay KPI
    const kpis = await this.layKPIs(nhanVienId, tuThang, tuNam, denThangVal, denNamVal);

    // 5. Lay Thuong phat
    const thuongPhats = await this.layThuongPhats(nhanVienId, tuNgay, denNgay);

    // Tinh tong ket
    const tongKet = this.tinhTongKetNV(bangLuongs, dieuChinhs, ungLuongs, kpis, thuongPhats);

    return {
      nhanVien: {
        id: nhanVien.id,
        maNhanVien: nhanVien.maNhanVien,
        hoTen: nhanVien.hoTen,
        phongBan: nhanVien.phongBan ? { tenPhongBan: nhanVien.phongBan.tenPhongBan } : undefined,
      },
      bangLuongs,
      dieuChinhs,
      ungLuongs,
      kpis,
      thuongPhats,
      tongKet,
    };
  }

  /**
   * Lay bang luong cho nhan vien trong khoang thoi gian
   */
  private async layBangLuongs(
    nhanVienId: number,
    tuThang: number,
    tuNam: number,
    denThang: number,
    denNam: number,
  ): Promise<BangLuongItem[]> {
    // Lay tat ca bang luong DA_CHOT trong khoang thoi gian
    const orConditions = this.buildMonthRangeCondition(tuThang, tuNam, denThang, denNam);
    
    const bangLuongs = await this.prisma.bangLuong.findMany({
      where: {
        trangThai: 'DA_CHOT',
        OR: orConditions,
      },
      select: { id: true, thang: true, nam: true, ngayChot: true },
      orderBy: [{ nam: 'desc' }, { thang: 'desc' }],
    });

    const ngayCongRecords = await this.prisma.ngayCongBangLuong.findMany({
      where: {
        nhanVienId,
        bangLuongId: { in: bangLuongs.map((bl) => bl.id) },
      },
      select: {
        bangLuongId: true,
        soCongThucTe: true,
        ngayCongDieuChinh: true,
        soNgayNghiCoPhep: true,
        soNgayNghiKhongPhep: true,
      },
    });

    const ngayCongMap = new Map(
      ngayCongRecords.map((record) => [record.bangLuongId, record]),
    );

    const result: BangLuongItem[] = [];

    const snapshotsAll = await this.prisma.snapshotBangLuong.findMany({
      where: {
        nhanVienId,
        bangLuongId: { in: bangLuongs.map((bl) => bl.id) },
      },
    });

    const snapshotMap = new Map<number, typeof snapshotsAll>();
    for (const ss of snapshotsAll) {
      const list = snapshotMap.get(ss.bangLuongId) || [];
      list.push(ss);
      snapshotMap.set(ss.bangLuongId, list);
    }

    for (const bl of bangLuongs) {
      const snapshots = snapshotMap.get(bl.id) || [];

      if (snapshots.length === 0) continue;

      // Tong hop cac khoan
      let luongCoBan = 0;
      let phuCapTong = 0;
      let thuongKPI = 0;
      let thuongThuNhap = 0;
      let khauTruTong = 0;
      let bhxh = 0;
      let bhyt = 0;
      let bhtn = 0;
      let thueTNCN = 0;

      for (const ss of snapshots) {
        const soTien = Number(ss.soTien);
        const tenKhoan = ss.tenKhoan.toLowerCase();

        if (ss.loaiKhoan === 'THU_NHAP') {
          if (tenKhoan.includes('luong co ban') || tenKhoan.includes('lương cơ bản')) {
            luongCoBan += soTien;
          } else if (tenKhoan.includes('thuong kpi') || tenKhoan.includes('thưởng kpi')) {
            thuongKPI += soTien;
          } else if (tenKhoan.includes('thuong') || tenKhoan.includes('thưởng')) {
            thuongThuNhap += soTien;
          } else {
            phuCapTong += soTien;
          }
        } else if (ss.loaiKhoan === 'KHAU_TRU') {
          if (tenKhoan.includes('bhxh')) {
            bhxh += soTien;
          } else if (tenKhoan.includes('bhyt')) {
            bhyt += soTien;
          } else if (tenKhoan.includes('bhtn')) {
            bhtn += soTien;
          } else if (tenKhoan.includes('thue') || tenKhoan.includes('thuế') || tenKhoan.includes('tncn')) {
            thueTNCN += soTien;
          } else {
            khauTruTong += soTien;
          }
        }
      }

      const ngayCongRecord = ngayCongMap.get(bl.id);
      const ngayCong = ngayCongRecord
        ? Number(ngayCongRecord.ngayCongDieuChinh ?? ngayCongRecord.soCongThucTe ?? 0)
        : 0;
      const nghiCoPhep = ngayCongRecord ? Number(ngayCongRecord.soNgayNghiCoPhep ?? 0) : 0;
      const nghiKhongPhep = ngayCongRecord ? Number(ngayCongRecord.soNgayNghiKhongPhep ?? 0) : 0;

      const thucLanh = luongCoBan + phuCapTong + thuongKPI + thuongThuNhap 
        - khauTruTong - bhxh - bhyt - bhtn - thueTNCN;

      result.push({
        bangLuongId: bl.id,
        thangNam: `T${bl.thang}/${bl.nam}`,
        thang: bl.thang,
        nam: bl.nam,
        luongCoBan,
        phuCapTong,
        thuongKPI,
        thuongThuNhap,
        khauTruTong,
        ungLuong: 0,
        bhxh,
        bhyt,
        bhtn,
        thueTNCN,
        thucLanh,
        ngayCong,
        nghiCoPhep,
        nghiKhongPhep,
        chotNgay: bl.ngayChot?.toISOString(),
      });
    }

    return result;
  }

  /**
   * Lay phieu dieu chinh
   */
  private async layDieuChinhs(nhanVienId: number, tuNgay: Date, denNgay: Date): Promise<DieuChinhItem[]> {
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

    const result: DieuChinhItem[] = [];

    for (const pdc of phieuDCs) {
      for (const ct of pdc.chiTiets) {
        result.push({
          phieuDieuChinhId: pdc.id,
          ngayTao: pdc.ngayTao.toISOString(),
          loaiPhieu: pdc.loaiDieuChinh,
          tenKhoanLuong: ct.khoanLuong.tenKhoan,
          loaiKhoan: pdc.loaiDieuChinh === 'TANG' ? 'CONG_THEM' : 'TRU_BOT',
          soTien: Number(ct.chenhLech),
          ghiChu: pdc.lyDo,
        });
      }
    }

    return result;
  }

  /**
   * Lay ung luong
   */
  private async layUngLuongs(nhanVienId: number, tuNgay: Date, denNgay: Date): Promise<UngLuongItem[]> {
    const snapshotUngs = await this.prisma.snapshotChiTietBangUngLuong.findMany({
      where: {
        nhanVienId,
        ngayTao: { gte: tuNgay, lte: denNgay },
        soTienUngDuyet: { gt: 0 },
      },
      include: {
        snapshot: {
          include: { bangUngLuong: true },
        },
      },
      orderBy: { ngayTao: 'desc' },
    });

    return snapshotUngs.map((su) => ({
      bangUngLuongId: su.snapshot.bangUngLuongId,
      maBang: su.snapshot.bangUngLuong.maBangUngLuong,
      thangNam: su.snapshot.thangNam,
      soTienDuyet: Number(su.soTienUngDuyet),
      trangThai: su.snapshot.bangUngLuong.trangThai,
      ngayChot: su.snapshot.ngayChot.toISOString(),
    }));
  }

  /**
   * Lay KPI
   */
  private async layKPIs(
    nhanVienId: number,
    tuThang: number,
    tuNam: number,
    denThang: number,
    denNam: number,
  ): Promise<KPIItem[]> {
    const orConditions = this.buildMonthRangeCondition(tuThang, tuNam, denThang, denNam);
    
    const kpiDanhGias = await this.prisma.danhGiaKPINhanVien.findMany({
      where: {
        nhanVienId,
        trangThai: 'DA_DUYET',
        soTienThuong: { gt: 0 },
        kyDanhGia: { OR: orConditions },
      },
      include: { kyDanhGia: true },
      orderBy: { ngayDuyet: 'desc' },
    });

    return kpiDanhGias.map((kpi) => ({
      kyDanhGiaId: kpi.kyDanhGiaId,
      thang: kpi.kyDanhGia.thang || 0,
      nam: kpi.kyDanhGia.nam,
      tongDiem: Number(kpi.diemTongKet || 0),
      xepLoai: kpi.xepLoai || 'D',
      tienThuong: Number(kpi.soTienThuong),
    }));
  }

  /**
   * Lay thuong phat
   */
  private async layThuongPhats(nhanVienId: number, tuNgay: Date, denNgay: Date): Promise<ThuongPhatItem[]> {
    const suKiens = await this.prisma.suKienThuongPhat.findMany({
      where: {
        nhanVienId,
        trangThai: 'DA_DUYET',
        duyetLuc: { gte: tuNgay, lte: denNgay },
      },
      orderBy: { duyetLuc: 'desc' },
    });

    return suKiens.map((sk) => ({
      suKienId: sk.id,
      loai: sk.loaiSuKien as 'THUONG' | 'PHAT',
      ten: sk.maSuKien,
      soTien: Number(sk.soTien),
      ngay: sk.duyetLuc!.toISOString(),
      lyDo: sk.ghiChu || undefined,
    }));
  }

  /**
   * Tinh tong ket cho nhan vien
   */
  private tinhTongKetNV(
    bangLuongs: BangLuongItem[],
    dieuChinhs: DieuChinhItem[],
    ungLuongs: UngLuongItem[],
    kpis: KPIItem[],
    thuongPhats: ThuongPhatItem[],
  ): TongKetNV {
    let tongLuong = 0;
    let tongThuong = 0;
    let tongPhat = 0;
    let tongKhauTru = 0;
    let tongUng = 0;

    // Tu bang luong
    for (const bl of bangLuongs) {
      tongLuong += bl.luongCoBan + bl.phuCapTong;
      tongThuong += bl.thuongKPI + bl.thuongThuNhap;
      tongKhauTru += bl.khauTruTong + bl.bhxh + bl.bhyt + bl.bhtn + bl.thueTNCN;
    }

    // Tu dieu chinh
    for (const dc of dieuChinhs) {
      if (dc.loaiKhoan === 'CONG_THEM') {
        tongLuong += dc.soTien;
      } else {
        tongKhauTru += dc.soTien;
      }
    }

    // Tu ung luong
    for (const ul of ungLuongs) {
      tongUng += ul.soTienDuyet;
    }

    // Tu KPI
    for (const kpi of kpis) {
      tongThuong += kpi.tienThuong;
    }

    // Tu thuong phat
    for (const tp of thuongPhats) {
      if (tp.loai === 'THUONG') {
        tongThuong += tp.soTien;
      } else {
        tongPhat += tp.soTien;
      }
    }

    const tongThucNhan = tongLuong + tongThuong - tongPhat - tongKhauTru;

    return {
      tongLuong,
      tongThuong,
      tongPhat,
      tongKhauTru,
      tongUng,
      tongThucNhan,
    };
  }

  /**
   * Build dieu kien loc theo khoang thang/nam
   */
  private buildMonthRangeCondition(
    tuThang: number,
    tuNam: number,
    denThang: number,
    denNam: number,
  ): Array<Record<string, unknown>> {
    if (tuNam === denNam) {
      return [{ nam: tuNam, thang: { gte: tuThang, lte: denThang } }];
    } else if (denNam - tuNam === 1) {
      return [
        { nam: tuNam, thang: { gte: tuThang } },
        { nam: denNam, thang: { lte: denThang } },
      ];
    } else {
      return [
        { nam: tuNam, thang: { gte: tuThang } },
        { nam: { gt: tuNam, lt: denNam } },
        { nam: denNam, thang: { lte: denThang } },
      ];
    }
  }

  /**
   * Lay so luong theo phong ban
   */
  async laySoLuongPhongBan(phongBanId: number, dto: LocSoLuongDto) {
    const phongBan = await this.prisma.phongBan.findUnique({
      where: { id: phongBanId },
    });

    if (!phongBan) {
      throw new NotFoundException(`Khong tim thay phong ban voi ID: ${phongBanId}`);
    }

    // Lay danh sach nhan vien trong phong ban
    const nhanViens = await this.prisma.nhanVien.findMany({
      where: { phongBanId, trangThai: 'DANG_LAM' },
    });

    const theoNhanVien: Array<{ 
      nhanVien: { id: number; maNhanVien: string; hoTen: string }; 
      tongHop: TongHopPhongBan 
    }> = [];
    
    const tongHopPB: TongHopPhongBan = {
      tongThuNhap: 0,
      tongKhauTru: 0,
      tongThuong: 0,
      tongPhat: 0,
      thucLinh: 0,
    };

    for (const nv of nhanViens) {
      const result = await this.laySoLuongNhanVien(nv.id, dto);
      const nvTongHop: TongHopPhongBan = {
        tongThuNhap: result.tongKet.tongLuong,
        tongKhauTru: result.tongKet.tongKhauTru,
        tongThuong: result.tongKet.tongThuong,
        tongPhat: result.tongKet.tongPhat,
        thucLinh: result.tongKet.tongThucNhan,
      };

      theoNhanVien.push({
        nhanVien: {
          id: result.nhanVien.id,
          maNhanVien: result.nhanVien.maNhanVien,
          hoTen: result.nhanVien.hoTen,
        },
        tongHop: nvTongHop,
      });

      // Cong don
      tongHopPB.tongThuNhap += nvTongHop.tongThuNhap;
      tongHopPB.tongKhauTru += nvTongHop.tongKhauTru;
      tongHopPB.tongThuong += nvTongHop.tongThuong;
      tongHopPB.tongPhat += nvTongHop.tongPhat;
      tongHopPB.thucLinh += nvTongHop.thucLinh;
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
   * Lay so luong tat ca phong ban
   */
  async laySoLuongTatCaPhongBan(dto: LocSoLuongDto) {
    const phongBans = await this.prisma.phongBan.findMany({
      where: { trangThai: 'ACTIVE' },
      orderBy: { tenPhongBan: 'asc' },
    });

    const theoPhongBan: Array<{
      phongBan: { id: number; maPhongBan: string; tenPhongBan: string };
      tongHop: TongHopPhongBan;
      soNhanVien: number;
    }> = [];

    const tongHopAll: TongHopPhongBan = {
      tongThuNhap: 0,
      tongKhauTru: 0,
      tongThuong: 0,
      tongPhat: 0,
      thucLinh: 0,
    };

    for (const pb of phongBans) {
      try {
        const result = await this.laySoLuongPhongBan(pb.id, dto);
        theoPhongBan.push({
          phongBan: result.phongBan,
          tongHop: result.tongHop,
          soNhanVien: result.theoNhanVien.length,
        });

        tongHopAll.tongThuNhap += result.tongHop.tongThuNhap;
        tongHopAll.tongKhauTru += result.tongHop.tongKhauTru;
        tongHopAll.tongThuong += result.tongHop.tongThuong;
        tongHopAll.tongPhat += result.tongHop.tongPhat;
        tongHopAll.thucLinh += result.tongHop.thucLinh;
      } catch {
        // Skip phong ban khong co nhan vien
      }
    }

    return {
      tongHop: tongHopAll,
      theoPhongBan,
    };
  }

  /**
   * Tim kiem so luong
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
          tongKet: soLuongData.tongKet,
          soBangLuong: soLuongData.bangLuongs.length,
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
   * Lay chi tiet entry theo refType va refId
   */
  async layChiTietEntry(refType: string, refId: number) {
    switch (refType) {
      case 'LUONG':
        return this.prisma.bangLuong.findUnique({
          where: { id: refId },
          include: {
            phongBan: true,
            chiTiets: true,
            ngayCong: true,
          },
        });

      case 'DIEU_CHINH':
        return this.prisma.phieuDieuChinh.findUnique({
          where: { id: refId },
          include: {
            chiTiets: true,
          },
        });

      case 'UNG_LUONG':
        return this.prisma.snapshotBangUngLuong.findUnique({
          where: { id: refId },
          include: {
            bangUngLuong: true,
            chiTiets: true,
          },
        });

      case 'KPI':
        return this.prisma.danhGiaKPINhanVien.findUnique({
          where: { id: refId },
          include: {
            kyDanhGia: true,
            ketQuaKPIs: true,
          },
        });

      case 'THUONG_PHAT':
        return this.prisma.suKienThuongPhat.findUnique({
          where: { id: refId },
          include: {
            nhanVien: true,
            phongBan: true,
          },
        });

      default:
        return null;
    }
  }
}
