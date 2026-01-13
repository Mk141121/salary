// KPI API Service - Quản lý KPI & Thưởng
import axios from 'axios'

const api = axios.create({
  baseURL: '/api/kpi',
  headers: { 'Content-Type': 'application/json' },
})

// ==================== ENUMS ====================
export type XepLoaiKPI = 'XUAT_SAC' | 'TOT' | 'KHA' | 'TRUNG_BINH' | 'YEU'
export type LoaiChiTieuKPI = 'SO' | 'PHAN_TRAM' | 'TIEN' | 'DANH_GIA'
export type LoaiKyDanhGia = 'THANG' | 'QUY' | 'NAM'
export type TrangThaiKyDanhGia = 'CHUA_BAT_DAU' | 'DANG_DIEN_RA' | 'DA_KET_THUC' | 'DA_DONG'
export type TrangThaiDanhGiaKPI = 'NHAP' | 'CHO_DUYET' | 'DA_DUYET' | 'TU_CHOI'

// ==================== INTERFACES ====================
export interface TemplateKPI {
  id: number
  maTemplate: string
  tenTemplate: string
  phongBanId?: number
  moTa?: string
  trangThai: boolean
  ngayTao: string
  ngayCapNhat: string
  chiTieuKPIs?: ChiTieuKPI[]
  phongBan?: { id: number; maPhongBan: string; tenPhongBan: string }
}

export interface ChiTieuKPI {
  id: number
  templateId: number
  maChiTieu: string
  tenChiTieu: string
  moTa?: string
  donViTinh: string
  trongSo: number
  loaiChiTieu: LoaiChiTieuKPI
  chiTieuToiThieu: number
  chiTieuMucTieu: number
  chiTieuVuotMuc: number
  thuTu: number
  ngayTao: string
}

export interface KyDanhGiaKPI {
  id: number
  maKy: string
  tenKy: string
  loaiKy: LoaiKyDanhGia
  tuNgay: string
  denNgay: string
  trangThai: TrangThaiKyDanhGia
  moTa?: string
  ngayTao: string
  _count?: { danhGias: number }
}

export interface DanhGiaKPINhanVien {
  id: number
  kyDanhGiaId: number
  nhanVienId: number
  templateId: number
  tongDiem?: number
  xepLoai?: XepLoaiKPI
  nhanXet?: string
  trangThai: TrangThaiDanhGiaKPI
  nguoiDanhGiaId?: number
  ngayDanhGia?: string
  nguoiDuyetId?: number
  ngayDuyet?: string
  ngayTao: string
  ngayCapNhat: string
  kyDanhGia?: KyDanhGiaKPI
  nhanVien?: { id: number; maNhanVien: string; hoTen: string; luongCoBan: number }
  template?: TemplateKPI
  ketQuaKPIs?: KetQuaKPI[]
}

export interface KetQuaKPI {
  id: number
  danhGiaId: number
  chiTieuId: number
  ketQua: number
  diemDat: number
  ghiChu?: string
  ngayTao: string
  chiTieu?: ChiTieuKPI
}

export interface CauHinhThuongKPI {
  id: number
  nam: number
  xepLoai: XepLoaiKPI
  diemToiThieu: number
  diemToiDa: number
  heSoThuong: number
  moTa?: string
  trangThai: boolean
  ngayTao: string
}

export interface BaoCaoKPIPhongBan {
  phongBan: { id: number; tenPhongBan: string }
  tongNhanVien: number
  daDanhGia: number
  theoXepLoai: Record<XepLoaiKPI, number>
  diemTrungBinh: number
}

// ==================== TEMPLATE KPI ====================
export const templateKPIApi = {
  layTatCa: (params?: { phongBanId?: number; trangThai?: boolean }) =>
    api.get<TemplateKPI[]>('/template', { params }).then((res) => res.data),
  
  layTheoId: (id: number) =>
    api.get<TemplateKPI>(`/template/${id}`).then((res) => res.data),
  
  taoMoi: (data: {
    maTemplate: string
    tenTemplate: string
    phongBanId?: number
    moTa?: string
  }) => api.post<TemplateKPI>('/template', data).then((res) => res.data),
  
  capNhat: (id: number, data: Partial<{ tenTemplate: string; moTa: string; trangThai: boolean }>) =>
    api.put<TemplateKPI>(`/template/${id}`, data).then((res) => res.data),
  
  themChiTieu: (templateId: number, data: {
    maChiTieu: string
    tenChiTieu: string
    moTa?: string
    donViTinh: string
    trongSo: number
    loaiChiTieu: LoaiChiTieuKPI
    chiTieuToiThieu: number
    chiTieuMucTieu: number
    chiTieuVuotMuc: number
    thuTu?: number
  }) => api.post<ChiTieuKPI>(`/template/${templateId}/chi-tieu`, data).then((res) => res.data),
  
  xoaChiTieu: (chiTieuId: number) =>
    api.delete(`/chi-tieu/${chiTieuId}`).then((res) => res.data),
}

// ==================== KỲ ĐÁNH GIÁ ====================
export const kyDanhGiaApi = {
  layTatCa: (params?: { nam?: number; loaiKy?: LoaiKyDanhGia; trangThai?: TrangThaiKyDanhGia }) =>
    api.get<KyDanhGiaKPI[]>('/ky-danh-gia', { params }).then((res) => res.data),
  
  layTheoId: (id: number) =>
    api.get<KyDanhGiaKPI & { danhGias: DanhGiaKPINhanVien[] }>(`/ky-danh-gia/${id}`).then((res) => res.data),
  
  taoMoi: (data: {
    maKy: string
    tenKy: string
    loaiKy: LoaiKyDanhGia
    tuNgay: string
    denNgay: string
    moTa?: string
  }) => api.post<KyDanhGiaKPI>('/ky-danh-gia', data).then((res) => res.data),
  
  capNhatTrangThai: (id: number, trangThai: TrangThaiKyDanhGia) =>
    api.put(`/ky-danh-gia/${id}/trang-thai`, { trangThai }).then((res) => res.data),
}

// ==================== ĐÁNH GIÁ KPI ====================
export const danhGiaKPIApi = {
  taoMoi: (data: {
    kyDanhGiaId: number
    nhanVienId: number
    templateId: number
    nguoiDanhGiaId?: number
  }) => api.post<DanhGiaKPINhanVien>('/danh-gia', data).then((res) => res.data),
  
  capNhat: (id: number, data: {
    ketQuaKPIs: { chiTieuId: number; ketQua: number; ghiChu?: string }[]
    nhanXet?: string
    nguoiDanhGiaId?: number
  }) => api.put<DanhGiaKPINhanVien>(`/danh-gia/${id}`, data).then((res) => res.data),
  
  guiDuyet: (id: number) =>
    api.post(`/danh-gia/${id}/gui-duyet`).then((res) => res.data),
  
  duyet: (id: number, nguoiDuyetId: number) =>
    api.put(`/danh-gia/${id}/duyet`, { nguoiDuyetId }).then((res) => res.data),
  
  tuChoi: (id: number, nguoiDuyetId: number, lyDo: string) =>
    api.put(`/danh-gia/${id}/tu-choi`, { nguoiDuyetId, lyDo }).then((res) => res.data),
}

// ==================== CẤU HÌNH THƯỞNG ====================
export const cauHinhThuongApi = {
  layTheoNam: (nam: number) =>
    api.get<CauHinhThuongKPI[]>(`/cau-hinh-thuong/${nam}`).then((res) => res.data),
  
  taoMoi: (data: {
    nam: number
    xepLoai: XepLoaiKPI
    diemToiThieu: number
    diemToiDa: number
    heSoThuong: number
    moTa?: string
  }) => api.post<CauHinhThuongKPI>('/cau-hinh-thuong', data).then((res) => res.data),
  
  khoiTaoMacDinh: (nam: number) =>
    api.post(`/cau-hinh-thuong/khoi-tao/${nam}`).then((res) => res.data),
}

// ==================== TÍNH THƯỞNG ====================
export const tinhThuongApi = {
  tinhThuong: (danhGiaId: number, luongCoBan: number) =>
    api.post<{
      xepLoai: XepLoaiKPI
      tongDiem: number
      heSoThuong: number
      tienThuong: number
      nhanVien: { hoTen: string; maNhanVien: string }
    }>('/tinh-thuong', { danhGiaId, luongCoBan }).then((res) => res.data),
}

// ==================== BÁO CÁO ====================
export const baoCaoKPIApi = {
  theoPhongBan: (kyDanhGiaId: number) =>
    api.get<BaoCaoKPIPhongBan[]>(`/bao-cao/theo-phong-ban/${kyDanhGiaId}`).then((res) => res.data),
}

export default api
