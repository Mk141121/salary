// Reports API Service - Sprint 12
import api from './api';

// Interfaces
export interface ReportFilter {
  thang?: number;
  nam?: number;
  tuNgay?: string;
  denNgay?: string;
  phongBanId?: number;
  nhanVienId?: number;
}

// Di trễ / Về sớm Report
export interface DiTreVeSomChiTiet {
  nhanVienId: number;
  maNhanVien: string;
  hoTen: string;
  phongBan: string;
  ngay: string;
  gioVao: string | null;
  gioRa: string | null;
  soPhutTre: number;
  soPhutVeSom: number;
  lyDo: string | null;
  coGiaiTrinh: boolean;
}

export interface DiTreVeSomReport {
  filter: ReportFilter;
  summary: {
    tongNhanVien: number;
    tongLuotDiTre: number;
    tongLuotVeSom: number;
    tongPhutTre: number;
    tongPhutVeSom: number;
    topDiTre: { nhanVienId: number; hoTen: string; soLan: number }[];
  };
  chiTiet: DiTreVeSomChiTiet[];
}

// OT Report
export interface OTChiTiet {
  nhanVienId: number;
  maNhanVien: string;
  hoTen: string;
  phongBan: string;
  ngay: string;
  soGioOT: number;
  heSoOT: number;
  tienOT: number;
  trangThai: string;
}

export interface OTReport {
  filter: ReportFilter;
  summary: {
    tongNhanVien: number;
    tongGioOT: number;
    tongTienOT: number;
    trungBinhGioOTNgay: number;
    phongBanNhieuOTNhat: { phongBan: string; tongGio: number }[];
  };
  chiTiet: OTChiTiet[];
}

// Nghỉ phép Report
export interface NghiPhepChiTiet {
  nhanVienId: number;
  maNhanVien: string;
  hoTen: string;
  phongBan: string;
  loaiNghi: string;
  tuNgay: string;
  denNgay: string;
  soNgay: number;
  trangThai: string;
  lyDo: string | null;
}

export interface NghiPhepReport {
  filter: ReportFilter;
  summary: {
    tongDon: number;
    tongNgayNghi: number;
    daDuyet: number;
    choDuyet: number;
    tuChoi: number;
    theoLoai: { loai: string; soNgay: number; soDon: number }[];
  };
  chiTiet: NghiPhepChiTiet[];
}

// Quỹ lương Report
export interface QuyLuongPhongBan {
  phongBanId: number;
  tenPhongBan: string;
  tongNhanVien: number;
  tongLuongCoBan: number;
  tongPhuCap: number;
  tongThuong: number;
  tongKhauTru: number;
  tongThucLinh: number;
  tyLeQuyLuong: number;
}

export interface QuyLuongReport {
  filter: ReportFilter;
  summary: {
    thang: number;
    nam: number;
    tongQuyLuong: number;
    tongNhanVien: number;
    luongTrungBinh: number;
    luongCaoNhat: number;
    luongThapNhat: number;
    tongBHXH_NLD: number;
    tongBHXH_DN: number;
    tongThueTNCN: number;
  };
  theoPhongBan: QuyLuongPhongBan[];
  theoKhoan: { maKhoan: string; tenKhoan: string; loai: string; tongSoTien: number; soNguoiNhan: number }[];
}

// Headcount Report
export interface HeadcountPhongBan {
  phongBanId: number;
  tenPhongBan: string;
  tongNhanVien: number;
  dangLam: number;
  nghiViec: number;
  thuViec: number;
  moiTuyen: number;
  nghiMoi: number;
}

export interface HeadcountReport {
  filter: ReportFilter;
  summary: {
    tongNhanVien: number;
    dangLam: number;
    nghiViec: number;
    thuViec: number;
    tyLeNghiViec: number;
    moiTuyenThang: number;
    nghiViecThang: number;
    theoGioiTinh: { nam: number; nu: number };
    theoDoTuoi: { duoi25: number; tu25den35: number; tu35den45: number; tren45: number };
  };
  theoPhongBan: HeadcountPhongBan[];
}

// Chấm công Report
export interface ChamCongChiTiet {
  nhanVienId: number;
  maNhanVien: string;
  hoTen: string;
  phongBan: string;
  ngayCongChuan: number;
  ngayCongThuc: number;
  ngayNghi: number;
  ngayPhep: number;
  soLanDiTre: number;
  soLanVeSom: number;
  tongGioOT: number;
  tyLeDiLam: number;
}

export interface ChamCongReport {
  filter: ReportFilter;
  summary: {
    thang: number;
    nam: number;
    ngayCongChuan: number;
    tongNhanVien: number;
    trungBinhNgayCong: number;
    tyLeDiLamTrungBinh: number;
    tongNgayNghi: number;
    tongNgayPhep: number;
    tongGioOT: number;
  };
  chiTiet: ChamCongChiTiet[];
}

// Dashboard Report
export interface DashboardKPI {
  ten: string;
  giaTri: number;
  donVi: string;
  soSanhThangTruoc: number;
  icon: string;
  mau: string;
}

export interface DashboardAlert {
  loai: 'INFO' | 'WARNING' | 'ERROR';
  tieuDe: string;
  moTa: string;
  soLuong: number;
  link: string;
}

export interface DashboardReport {
  thang: number;
  nam: number;
  kpis: DashboardKPI[];
  alerts: DashboardAlert[];
  bienDongNhanSu: { thang: number; moiTuyen: number; nghiViec: number }[];
  phanBoLuongTheoPB: { tenPhongBan: string; tongLuong: number; tyLe: number }[];
}

// API Functions
export const reportsApi = {
  getDiTreVeSom: (filter: ReportFilter) =>
    api.get<DiTreVeSomReport>('/reports/di-tre-ve-som', { params: filter }),

  getOT: (filter: ReportFilter) =>
    api.get<OTReport>('/reports/ot', { params: filter }),

  getNghiPhep: (filter: ReportFilter) =>
    api.get<NghiPhepReport>('/reports/nghi-phep', { params: filter }),

  getQuyLuong: (filter: ReportFilter) =>
    api.get<QuyLuongReport>('/reports/quy-luong', { params: filter }),

  getHeadcount: (filter: ReportFilter) =>
    api.get<HeadcountReport>('/reports/headcount', { params: filter }),

  getChamCong: (filter: ReportFilter) =>
    api.get<ChamCongReport>('/reports/cham-cong', { params: filter }),

  getDashboard: (thang?: number, nam?: number) =>
    api.get<DashboardReport>('/reports/dashboard', { params: { thang, nam } }),
};
