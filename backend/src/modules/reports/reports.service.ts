// Reports Service - Sprint 12
import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import {
  ReportFilterDto,
  DiTreVeSomReport,
  OTReport,
  NghiPhepReport,
  QuyLuongReport,
  HeadcountReport,
  ChamCongReport,
  DashboardReport,
  DashboardKPI,
  DashboardAlert,
} from './reports.dto';

@Injectable()
export class ReportsService {
  private readonly logger = new Logger(ReportsService.name);

  constructor(private prisma: PrismaService) {}

  /**
   * Báo cáo đi trễ / về sớm
   */
  async getDiTreVeSom(filter: ReportFilterDto): Promise<DiTreVeSomReport> {
    const { thang, nam, phongBanId, tuNgay, denNgay } = filter;
    
    let ngayDau: Date, ngayCuoi: Date;
    if (tuNgay && denNgay) {
      ngayDau = new Date(tuNgay);
      ngayCuoi = new Date(denNgay);
    } else {
      const t = thang || new Date().getMonth() + 1;
      const n = nam || new Date().getFullYear();
      ngayDau = new Date(n, t - 1, 1);
      ngayCuoi = new Date(n, t, 0);
    }

    // Lấy nhân viên theo điều kiện
    const nhanViens = await this.prisma.nhanVien.findMany({
      where: {
        trangThai: 'DANG_LAM',
        ...(phongBanId && { phongBanId }),
      },
      include: {
        phongBan: true,
      },
    });
    const nvMap = new Map(nhanViens.map(nv => [nv.id, nv]));
    const nvIds = nhanViens.map(nv => nv.id);

    // Lấy chi tiết chấm công có đi trễ/về sớm
    const chiTietChamCongs = await this.prisma.chiTietChamCong.findMany({
      where: {
        nhanVienId: { in: nvIds },
        ngay: { gte: ngayDau, lte: ngayCuoi },
        OR: [
          { phutDiTre: { gt: 0 } },
          { phutVeSom: { gt: 0 } },
        ],
      },
      orderBy: { ngay: 'desc' },
    });

    const chiTiet = chiTietChamCongs.map(cc => {
      const nv = nvMap.get(cc.nhanVienId);
      return {
        nhanVienId: cc.nhanVienId,
        maNhanVien: nv?.maNhanVien || '',
        hoTen: nv?.hoTen || '',
        phongBan: nv?.phongBan?.tenPhongBan || '',
        ngay: cc.ngay,
        gioVao: cc.gioVao ? cc.gioVao.toISOString().substring(11, 16) : null,
        gioRa: cc.gioRa ? cc.gioRa.toISOString().substring(11, 16) : null,
        soPhutTre: cc.phutDiTre || 0,
        soPhutVeSom: cc.phutVeSom || 0,
        lyDo: cc.ghiChu,
        coGiaiTrinh: false,
      };
    });

    const tongLuotDiTre = chiTiet.filter(c => c.soPhutTre > 0).length;
    const tongLuotVeSom = chiTiet.filter(c => c.soPhutVeSom > 0).length;
    const tongPhutTre = chiTiet.reduce((s, c) => s + c.soPhutTre, 0);
    const tongPhutVeSom = chiTiet.reduce((s, c) => s + c.soPhutVeSom, 0);

    const diTreByNV = new Map<number, { hoTen: string; count: number }>();
    chiTiet.filter(c => c.soPhutTre > 0).forEach(c => {
      const curr = diTreByNV.get(c.nhanVienId) || { hoTen: c.hoTen, count: 0 };
      curr.count++;
      diTreByNV.set(c.nhanVienId, curr);
    });
    const topDiTre = Array.from(diTreByNV.entries())
      .map(([nhanVienId, v]) => ({ nhanVienId, hoTen: v.hoTen, soLan: v.count }))
      .sort((a, b) => b.soLan - a.soLan)
      .slice(0, 5);

    return {
      filter,
      summary: {
        tongNhanVien: new Set(chiTiet.map(c => c.nhanVienId)).size,
        tongLuotDiTre,
        tongLuotVeSom,
        tongPhutTre,
        tongPhutVeSom,
        topDiTre,
      },
      chiTiet,
    };
  }

  /**
   * Báo cáo OT
   */
  async getOT(filter: ReportFilterDto): Promise<OTReport> {
    const { thang, nam, phongBanId } = filter;
    const t = thang || new Date().getMonth() + 1;
    const n = nam || new Date().getFullYear();
    const ngayDau = new Date(n, t - 1, 1);
    const ngayCuoi = new Date(n, t, 0);

    const nhanViens = await this.prisma.nhanVien.findMany({
      where: {
        trangThai: 'DANG_LAM',
        ...(phongBanId && { phongBanId }),
      },
      include: {
        phongBan: true,
      },
    });
    const nvMap = new Map(nhanViens.map(nv => [nv.id, nv]));
    const nvIds = nhanViens.map(nv => nv.id);

    // Lấy chi tiết chấm công có OT
    const chiTietChamCongs = await this.prisma.chiTietChamCong.findMany({
      where: {
        nhanVienId: { in: nvIds },
        ngay: { gte: ngayDau, lte: ngayCuoi },
        soGioOT: { gt: 0 },
      },
      orderBy: { ngay: 'desc' },
    });

    const chiTiet = chiTietChamCongs.map(cc => {
      const nv = nvMap.get(cc.nhanVienId);
      return {
        nhanVienId: cc.nhanVienId,
        maNhanVien: nv?.maNhanVien || '',
        hoTen: nv?.hoTen || '',
        phongBan: nv?.phongBan?.tenPhongBan || '',
        ngay: cc.ngay,
        soGioOT: Number(cc.soGioOT || 0),
        heSoOT: 1.5,
        tienOT: 0,
        trangThai: 'DA_DUYET',
      };
    });

    const tongGioOT = chiTiet.reduce((s, c) => s + c.soGioOT, 0);

    const bangLuongs = await this.prisma.bangLuong.findMany({
      where: { thang: t, nam: n, ...(phongBanId && { phongBanId }) },
      include: {
        chiTiets: {
          where: {
            khoanLuong: { maKhoan: { contains: 'OT' } },
          },
        },
      },
    });
    const tongTienOT = bangLuongs.reduce((s, bl) => 
      s + bl.chiTiets.reduce((ss, ct) => ss + Number(ct.soTien || 0), 0), 0);

    const otByPB = new Map<string, number>();
    chiTiet.forEach(c => {
      otByPB.set(c.phongBan, (otByPB.get(c.phongBan) || 0) + c.soGioOT);
    });
    const phongBanNhieuOTNhat = Array.from(otByPB.entries())
      .map(([phongBan, tongGio]) => ({ phongBan, tongGio }))
      .sort((a, b) => b.tongGio - a.tongGio)
      .slice(0, 5);

    return {
      filter,
      summary: {
        tongNhanVien: new Set(chiTiet.map(c => c.nhanVienId)).size,
        tongGioOT,
        tongTienOT,
        trungBinhGioOTNgay: chiTiet.length > 0 ? tongGioOT / chiTiet.length : 0,
        phongBanNhieuOTNhat,
      },
      chiTiet,
    };
  }

  /**
   * Báo cáo nghỉ phép
   */
  async getNghiPhep(filter: ReportFilterDto): Promise<NghiPhepReport> {
    const { thang, nam, phongBanId, tuNgay, denNgay } = filter;

    let ngayDau: Date, ngayCuoi: Date;
    if (tuNgay && denNgay) {
      ngayDau = new Date(tuNgay);
      ngayCuoi = new Date(denNgay);
    } else {
      const t = thang || new Date().getMonth() + 1;
      const n = nam || new Date().getFullYear();
      ngayDau = new Date(n, t - 1, 1);
      ngayCuoi = new Date(n, t, 0);
    }

    const dons = await this.prisma.donNghiPhep.findMany({
      where: {
        OR: [
          { tuNgay: { gte: ngayDau, lte: ngayCuoi } },
          { denNgay: { gte: ngayDau, lte: ngayCuoi } },
        ],
        ...(phongBanId && { phongBanId }),
      },
      include: {
        nhanVien: {
          include: { phongBan: true },
        },
        loaiNghi: true,
      },
      orderBy: { tuNgay: 'desc' },
    });

    const chiTiet = dons.map(d => ({
      nhanVienId: d.nhanVienId,
      maNhanVien: d.nhanVien.maNhanVien,
      hoTen: d.nhanVien.hoTen,
      phongBan: d.nhanVien.phongBan?.tenPhongBan || '',
      loaiNghi: d.loaiNghi?.tenLoaiNghi || '',
      tuNgay: d.tuNgay,
      denNgay: d.denNgay,
      soNgay: Number(d.soNgayNghi),
      trangThai: d.trangThai,
      lyDo: d.lyDo,
    }));

    const daDuyet = dons.filter(d => d.trangThai === 'DA_DUYET').length;
    const choDuyet = dons.filter(d => ['NHAP', 'GUI_DUYET'].includes(d.trangThai)).length;
    const tuChoi = dons.filter(d => d.trangThai === 'TU_CHOI').length;
    const tongNgayNghi = chiTiet.reduce((s, c) => s + c.soNgay, 0);

    const byLoai = new Map<string, { soNgay: number; soDon: number }>();
    chiTiet.forEach(c => {
      const curr = byLoai.get(c.loaiNghi) || { soNgay: 0, soDon: 0 };
      curr.soNgay += c.soNgay;
      curr.soDon++;
      byLoai.set(c.loaiNghi, curr);
    });
    const theoLoai = Array.from(byLoai.entries())
      .map(([loai, v]) => ({ loai, soNgay: v.soNgay, soDon: v.soDon }));

    return {
      filter,
      summary: {
        tongDon: dons.length,
        tongNgayNghi,
        daDuyet,
        choDuyet,
        tuChoi,
        theoLoai,
      },
      chiTiet,
    };
  }

  /**
   * Báo cáo quỹ lương theo phòng ban/khoản
   */
  async getQuyLuong(filter: ReportFilterDto): Promise<QuyLuongReport> {
    const t = filter.thang || new Date().getMonth() + 1;
    const n = filter.nam || new Date().getFullYear();

    const bangLuongs = await this.prisma.bangLuong.findMany({
      where: {
        thang: t,
        nam: n,
        ...(filter.phongBanId && { phongBanId: filter.phongBanId }),
      },
      include: {
        phongBan: true,
        chiTiets: {
          include: {
            khoanLuong: true,
          },
        },
      },
    });

    const theoPhongBan = bangLuongs.map(bl => {
      const tongLuongCoBan = bl.chiTiets
        .filter(ct => ct.khoanLuong?.loai === 'THU_NHAP' && ct.khoanLuong?.maKhoan?.includes('LUONG'))
        .reduce((s, ct) => s + Number(ct.soTien || 0), 0);
      const tongPhuCap = bl.chiTiets
        .filter(ct => ct.khoanLuong?.loai === 'THU_NHAP' && ct.khoanLuong?.maKhoan?.includes('PHU_CAP'))
        .reduce((s, ct) => s + Number(ct.soTien || 0), 0);
      const tongThuong = bl.chiTiets
        .filter(ct => ct.khoanLuong?.loai === 'THU_NHAP' && ct.khoanLuong?.maKhoan?.includes('THUONG'))
        .reduce((s, ct) => s + Number(ct.soTien || 0), 0);
      const tongKhauTru = bl.chiTiets
        .filter(ct => ct.khoanLuong?.loai === 'KHAU_TRU')
        .reduce((s, ct) => s + Number(ct.soTien || 0), 0);
      
      // Tính tổng thực lĩnh = tổng thu nhập - tổng khấu trừ
      const tongThuNhap = bl.chiTiets
        .filter(ct => ct.khoanLuong?.loai === 'THU_NHAP')
        .reduce((s, ct) => s + Number(ct.soTien || 0), 0);
      const tongThucLinh = tongThuNhap - tongKhauTru;
      
      // Số nhân viên = số nhanVienId unique trong chi tiết
      const nhanVienIds = new Set(bl.chiTiets.map(ct => ct.nhanVienId));

      return {
        phongBanId: bl.phongBanId,
        tenPhongBan: bl.phongBan?.tenPhongBan || '',
        tongNhanVien: nhanVienIds.size,
        tongLuongCoBan,
        tongPhuCap,
        tongThuong,
        tongKhauTru,
        tongThucLinh,
        tyLeQuyLuong: 0,
      };
    });

    const tongQuyLuong = theoPhongBan.reduce((s, p) => s + p.tongThucLinh, 0);
    theoPhongBan.forEach(p => {
      p.tyLeQuyLuong = tongQuyLuong > 0 ? (p.tongThucLinh / tongQuyLuong) * 100 : 0;
    });

    const khoanMap = new Map<string, { tenKhoan: string; loai: string; tongSoTien: number; soNguoiNhan: number }>();
    bangLuongs.forEach(bl => {
      bl.chiTiets.forEach(ct => {
        if (!ct.khoanLuong) return;
        const key = ct.khoanLuong.maKhoan;
        const curr = khoanMap.get(key) || {
          tenKhoan: ct.khoanLuong.tenKhoan,
          loai: ct.khoanLuong.loai,
          tongSoTien: 0,
          soNguoiNhan: 0,
        };
        curr.tongSoTien += Number(ct.soTien || 0);
        if (Number(ct.soTien || 0) > 0) curr.soNguoiNhan++;
        khoanMap.set(key, curr);
      });
    });
    const theoKhoan = Array.from(khoanMap.entries())
      .map(([maKhoan, v]) => ({ maKhoan, ...v }))
      .sort((a, b) => b.tongSoTien - a.tongSoTien);

    // Tính allThucLinh từ theoPhongBan
    const allThucLinh = theoPhongBan.map(p => p.tongThucLinh).filter(v => v > 0);
    const tongNhanVien = theoPhongBan.reduce((s, p) => s + p.tongNhanVien, 0);

    const tongBHXH_NLD = bangLuongs.reduce((s, bl) => 
      s + bl.chiTiets
        .filter(ct => ct.khoanLuong?.maKhoan?.includes('BHXH_NLD'))
        .reduce((ss, ct) => ss + Number(ct.soTien || 0), 0), 0);
    const tongBHXH_DN = bangLuongs.reduce((s, bl) => 
      s + bl.chiTiets
        .filter(ct => ct.khoanLuong?.maKhoan?.includes('BHXH_DN'))
        .reduce((ss, ct) => ss + Number(ct.soTien || 0), 0), 0);
    const tongThueTNCN = bangLuongs.reduce((s, bl) => 
      s + bl.chiTiets
        .filter(ct => ct.khoanLuong?.maKhoan?.includes('THUE'))
        .reduce((ss, ct) => ss + Number(ct.soTien || 0), 0), 0);

    return {
      filter,
      summary: {
        thang: t,
        nam: n,
        tongQuyLuong,
        tongNhanVien,
        luongTrungBinh: allThucLinh.length > 0 ? tongQuyLuong / allThucLinh.length : 0,
        luongCaoNhat: allThucLinh.length > 0 ? Math.max(...allThucLinh) : 0,
        luongThapNhat: allThucLinh.length > 0 ? Math.min(...allThucLinh) : 0,
        tongBHXH_NLD,
        tongBHXH_DN,
        tongThueTNCN,
      },
      theoPhongBan,
      theoKhoan,
    };
  }

  /**
   * Báo cáo Headcount
   */
  async getHeadcount(filter: ReportFilterDto): Promise<HeadcountReport> {
    const t = filter.thang || new Date().getMonth() + 1;
    const n = filter.nam || new Date().getFullYear();
    const ngayDau = new Date(n, t - 1, 1);
    const ngayCuoi = new Date(n, t, 0);

    const phongBans = await this.prisma.phongBan.findMany({
      where: filter.phongBanId ? { id: filter.phongBanId } : { trangThai: 'ACTIVE' },
      include: {
        nhanViens: {
          select: {
            id: true,
            trangThai: true,
            ngayVaoLam: true,
            ngayNghiViec: true,
            gioiTinh: true,
            ngaySinh: true,
          },
        },
      },
    });

    const today = new Date();
    const theoPhongBan = phongBans.map(pb => {
      const nvs = pb.nhanViens;
      const dangLam = nvs.filter(nv => nv.trangThai === 'DANG_LAM').length;
      const nghiViec = nvs.filter(nv => nv.trangThai === 'NGHI_VIEC').length;
      const thuViec = nvs.filter(nv => nv.trangThai === 'TAM_NGHI').length;
      
      const moiTuyen = nvs.filter(nv => 
        nv.ngayVaoLam && nv.ngayVaoLam >= ngayDau && nv.ngayVaoLam <= ngayCuoi
      ).length;
      
      const nghiMoi = nvs.filter(nv => 
        nv.ngayNghiViec && nv.ngayNghiViec >= ngayDau && nv.ngayNghiViec <= ngayCuoi
      ).length;

      return {
        phongBanId: pb.id,
        tenPhongBan: pb.tenPhongBan,
        tongNhanVien: nvs.length,
        dangLam,
        nghiViec,
        thuViec,
        moiTuyen,
        nghiMoi,
      };
    });

    const allNVs = phongBans.flatMap(pb => pb.nhanViens);
    const dangLam = allNVs.filter(nv => nv.trangThai === 'DANG_LAM').length;
    const nghiViec = allNVs.filter(nv => nv.trangThai === 'NGHI_VIEC').length;
    const thuViec = allNVs.filter(nv => nv.trangThai === 'TAM_NGHI').length;
    const moiTuyenThang = theoPhongBan.reduce((s, p) => s + p.moiTuyen, 0);
    const nghiViecThang = theoPhongBan.reduce((s, p) => s + p.nghiMoi, 0);

    const nam = allNVs.filter(nv => nv.gioiTinh === 'NAM').length;
    const nu = allNVs.filter(nv => nv.gioiTinh === 'NU').length;

    const getAge = (ngaySinh: Date | null): number => {
      if (!ngaySinh) return 0;
      return Math.floor((today.getTime() - new Date(ngaySinh).getTime()) / (365.25 * 24 * 60 * 60 * 1000));
    };
    const duoi25 = allNVs.filter(nv => getAge(nv.ngaySinh) < 25).length;
    const tu25den35 = allNVs.filter(nv => { const a = getAge(nv.ngaySinh); return a >= 25 && a < 35; }).length;
    const tu35den45 = allNVs.filter(nv => { const a = getAge(nv.ngaySinh); return a >= 35 && a < 45; }).length;
    const tren45 = allNVs.filter(nv => getAge(nv.ngaySinh) >= 45).length;

    return {
      filter,
      summary: {
        tongNhanVien: allNVs.length,
        dangLam,
        nghiViec,
        thuViec,
        tyLeNghiViec: dangLam > 0 ? (nghiViecThang / dangLam) * 100 : 0,
        moiTuyenThang,
        nghiViecThang,
        theoGioiTinh: { nam, nu },
        theoDoTuoi: { duoi25, tu25den35, tu35den45, tren45 },
      },
      theoPhongBan,
    };
  }

  /**
   * Báo cáo chấm công tổng hợp
   */
  async getChamCong(filter: ReportFilterDto): Promise<ChamCongReport> {
    const t = filter.thang || new Date().getMonth() + 1;
    const n = filter.nam || new Date().getFullYear();
    const ngayDau = new Date(n, t - 1, 1);
    const ngayCuoi = new Date(n, t, 0);

    let ngayCongChuan = 0;
    for (let d = new Date(ngayDau); d <= ngayCuoi; d.setDate(d.getDate() + 1)) {
      if (d.getDay() !== 0 && d.getDay() !== 6) ngayCongChuan++;
    }

    const nhanViens = await this.prisma.nhanVien.findMany({
      where: {
        trangThai: 'DANG_LAM',
        ...(filter.phongBanId && { phongBanId: filter.phongBanId }),
      },
      include: {
        phongBan: true,
      },
    });
    const nvMap = new Map(nhanViens.map(nv => [nv.id, nv]));
    const nvIds = nhanViens.map(nv => nv.id);

    // Lấy chi tiết chấm công
    const allChiTietChamCongs = await this.prisma.chiTietChamCong.findMany({
      where: {
        nhanVienId: { in: nvIds },
        ngay: { gte: ngayDau, lte: ngayCuoi },
      },
    });
    
    // Group by nhanVienId
    const ccsByNV = new Map<number, typeof allChiTietChamCongs>();
    allChiTietChamCongs.forEach(cc => {
      const arr = ccsByNV.get(cc.nhanVienId) || [];
      arr.push(cc);
      ccsByNV.set(cc.nhanVienId, arr);
    });

    const chiTiet = nhanViens.map(nv => {
      const ccs = ccsByNV.get(nv.id) || [];
      const ngayCongThuc = ccs.filter(c => Number(c.soGioLam || 0) > 0).length;
      const ngayNghi = ccs.filter(c => c.trangThai === 'NGHI_KHONG_LUONG').length;
      const ngayPhep = ccs.filter(c => c.trangThai === 'NGHI_PHEP').length;
      const soLanDiTre = ccs.filter(c => (c.phutDiTre || 0) > 0).length;
      const soLanVeSom = ccs.filter(c => (c.phutVeSom || 0) > 0).length;
      const tongGioOT = ccs.reduce((s, c) => s + Number(c.soGioOT || 0), 0);

      return {
        nhanVienId: nv.id,
        maNhanVien: nv.maNhanVien,
        hoTen: nv.hoTen,
        phongBan: nv.phongBan?.tenPhongBan || '',
        ngayCongChuan,
        ngayCongThuc,
        ngayNghi,
        ngayPhep,
        soLanDiTre,
        soLanVeSom,
        tongGioOT,
        tyLeDiLam: ngayCongChuan > 0 ? (ngayCongThuc / ngayCongChuan) * 100 : 0,
      };
    });

    const trungBinhNgayCong = chiTiet.length > 0 
      ? chiTiet.reduce((s, c) => s + c.ngayCongThuc, 0) / chiTiet.length 
      : 0;
    const tyLeDiLamTrungBinh = chiTiet.length > 0
      ? chiTiet.reduce((s, c) => s + c.tyLeDiLam, 0) / chiTiet.length
      : 0;

    return {
      filter,
      summary: {
        thang: t,
        nam: n,
        ngayCongChuan,
        tongNhanVien: nhanViens.length,
        trungBinhNgayCong,
        tyLeDiLamTrungBinh,
        tongNgayNghi: chiTiet.reduce((s, c) => s + c.ngayNghi, 0),
        tongNgayPhep: chiTiet.reduce((s, c) => s + c.ngayPhep, 0),
        tongGioOT: chiTiet.reduce((s, c) => s + c.tongGioOT, 0),
      },
      chiTiet,
    };
  }

  /**
   * Dashboard tổng hợp với KPIs và Alerts
   */
  async getDashboard(thang?: number, nam?: number): Promise<DashboardReport> {
    const t = thang || new Date().getMonth() + 1;
    const n = nam || new Date().getFullYear();
    const tThangTruoc = t === 1 ? 12 : t - 1;
    const nThangTruoc = t === 1 ? n - 1 : n;

    const quyLuong = await this.getQuyLuong({ thang: t, nam: n });
    const quyLuongTruoc = await this.getQuyLuong({ thang: tThangTruoc, nam: nThangTruoc });

    const headcount = await this.getHeadcount({ thang: t, nam: n });
    const headcountTruoc = await this.getHeadcount({ thang: tThangTruoc, nam: nThangTruoc });

    const chamCong = await this.getChamCong({ thang: t, nam: n });
    const chamCongTruoc = await this.getChamCong({ thang: tThangTruoc, nam: nThangTruoc });

    const calcTrend = (curr: number, prev: number): { trend: number; trendDirection: 'up' | 'down' | 'stable' } => {
      if (prev === 0) return { trend: 0, trendDirection: 'stable' };
      const trend = ((curr - prev) / prev) * 100;
      return {
        trend: Math.round(trend * 10) / 10,
        trendDirection: trend > 0.5 ? 'up' : trend < -0.5 ? 'down' : 'stable',
      };
    };

    const kpis: DashboardKPI[] = [
      {
        label: 'Quỹ lương',
        value: quyLuong.summary.tongQuyLuong,
        unit: 'VNĐ',
        ...calcTrend(quyLuong.summary.tongQuyLuong, quyLuongTruoc.summary.tongQuyLuong),
      },
      {
        label: 'Tổng nhân viên',
        value: headcount.summary.dangLam,
        unit: 'người',
        ...calcTrend(headcount.summary.dangLam, headcountTruoc.summary.dangLam),
      },
      {
        label: 'Tỷ lệ đi làm',
        value: Math.round(chamCong.summary.tyLeDiLamTrungBinh * 10) / 10,
        unit: '%',
        ...calcTrend(chamCong.summary.tyLeDiLamTrungBinh, chamCongTruoc.summary.tyLeDiLamTrungBinh),
      },
      {
        label: 'Lương trung bình',
        value: Math.round(quyLuong.summary.luongTrungBinh),
        unit: 'VNĐ',
        ...calcTrend(quyLuong.summary.luongTrungBinh, quyLuongTruoc.summary.luongTrungBinh),
      },
      {
        label: 'Tổng giờ OT',
        value: chamCong.summary.tongGioOT,
        unit: 'giờ',
        ...calcTrend(chamCong.summary.tongGioOT, chamCongTruoc.summary.tongGioOT),
      },
      {
        label: 'Nghỉ việc tháng',
        value: headcount.summary.nghiViecThang,
        unit: 'người',
        ...calcTrend(headcount.summary.nghiViecThang, headcountTruoc.summary.nghiViecThang),
      },
    ];

    const alerts: DashboardAlert[] = [];
    const ngayDau = new Date(n, t - 1, 1);
    const ngayCuoi = new Date(n, t, 0);

    const bangLuongChuaTao = await this.prisma.phongBan.count({
      where: {
        trangThai: 'ACTIVE',
        bangLuongs: {
          none: { thang: t, nam: n },
        },
      },
    });
    if (bangLuongChuaTao > 0) {
      alerts.push({
        loai: 'WARNING',
        tieuDe: 'Bảng lương chưa tạo',
        moTa: `${bangLuongChuaTao} phòng ban chưa có bảng lương tháng ${t}/${n}`,
        soLuong: bangLuongChuaTao,
        link: '/bang-luong',
      });
    }

    const donChoDuyet = await this.prisma.donNghiPhep.count({
      where: { trangThai: { in: ['GUI_DUYET'] } },
    });
    if (donChoDuyet > 0) {
      alerts.push({
        loai: 'INFO',
        tieuDe: 'Đơn nghỉ phép chờ duyệt',
        moTa: `Có ${donChoDuyet} đơn nghỉ phép đang chờ duyệt`,
        soLuong: donChoDuyet,
        link: '/nghi-phep/duyet',
      });
    }

    const nvCoChamCong = await this.prisma.chiTietChamCong.findMany({
      where: { ngay: { gte: ngayDau, lte: ngayCuoi } },
      select: { nhanVienId: true },
      distinct: ['nhanVienId'],
    });
    const nvThieuCC = headcount.summary.dangLam - nvCoChamCong.length;
    if (nvThieuCC > 0) {
      alerts.push({
        loai: 'ERROR',
        tieuDe: 'Nhân viên thiếu chấm công',
        moTa: `${nvThieuCC} nhân viên chưa có dữ liệu chấm công tháng ${t}/${n}`,
        soLuong: nvThieuCC,
        link: '/cham-cong',
      });
    }

    return {
      thang: t,
      nam: n,
      kpis,
      alerts,
      quyLuongThang: quyLuong.summary.tongQuyLuong,
      headcount: headcount.summary.dangLam,
      tyLeDiLam: Math.round(chamCong.summary.tyLeDiLamTrungBinh * 10) / 10,
      tyLeTurnover: Math.round(headcount.summary.tyLeNghiViec * 10) / 10,
    };
  }
}
