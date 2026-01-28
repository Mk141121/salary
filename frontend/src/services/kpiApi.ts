// KPI API Service - Quản lý KPI & Thưởng
import axios from 'axios'

const AUTH_STORAGE_KEY = 'tinh_luong_auth'

const api = axios.create({
  baseURL: '/api/kpi',
  headers: { 'Content-Type': 'application/json' },
})

// Interceptor để tự động thêm token vào header
api.interceptors.request.use(
  (config) => {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY)
    if (stored) {
      try {
        const data = JSON.parse(stored)
        if (data.token) {
          config.headers.Authorization = `Bearer ${data.token}`
        }
      } catch {
        // Ignore parse errors
      }
    }
    return config
  },
  (error) => Promise.reject(error)
)

// ==================== ENUMS ====================
export type XepLoaiKPI = 'XUAT_SAC' | 'TOT' | 'KHA' | 'TRUNG_BINH' | 'YEU'
export type LoaiChiTieuKPI = 'SO' | 'PHAN_TRAM' | 'TIEN' | 'THOI_GIAN' | 'DANH_GIA'
export type LoaiKyDanhGia = 'THANG' | 'QUY' | 'NAM'
// Match với backend schema: MO, DONG, DUYET, HOAN_THANH
export type TrangThaiKyDanhGia = 'MO' | 'DONG' | 'DUYET' | 'HOAN_THANH'
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

// ==================== KPI RULE ENGINE ====================
export type LoaiQuyTacKPI = 'THUONG' | 'PHAT' | 'TRUNG_BINH'
export type NguonDuLieuKPI = 'CHAM_CONG' | 'DOANH_SO' | 'BANG_LUONG' | 'HOP_DONG' | 'NHAP_TAY'
export type ToanTuSoSanh = 'BANG' | 'KHAC' | 'LON_HON' | 'NHO_HON' | 'LON_HON_BANG' | 'NHO_HON_BANG' | 'BETWEEN'
export type LoaiTinhDiemKPI = 'CO_DINH' | 'CONG_THUC' | 'TY_LE'

export interface NhomQuyTacKPI {
  id: number
  maNhom: string
  tenNhom: string
  moTa?: string
  thuTu: number
  trangThai: boolean
  quyTacKPIs?: QuyTacKPI[]
}

export interface QuyTacKPI {
  id: number
  maQuyTac: string
  tenQuyTac: string
  moTa?: string
  nhomId: number
  loaiQuyTac: LoaiQuyTacKPI
  nguonDuLieu: NguonDuLieuKPI
  diemToiDa: number
  diemMacDinh: number
  trongSoMacDinh: number
  apDungToanCongTy: boolean
  trangThai: boolean
  nhom?: NhomQuyTacKPI
  dieuKienQuyTacs?: DieuKienQuyTacKPI[]
  quyTacPhongBans?: QuyTacKPIPhongBan[]
  quyTacViTris?: QuyTacKPIViTri[]
}

export interface DieuKienQuyTacKPI {
  id: number
  quyTacId: number
  thuTu: number
  moTaDieuKien: string
  bienSo: string
  toanTu: ToanTuSoSanh
  giaTriMin?: number
  giaTriMax?: number
  loaiTinhDiem: LoaiTinhDiemKPI
  diemCoDinh?: number
  congThuc?: string
  trangThai: boolean
}

export interface QuyTacKPIPhongBan {
  id: number
  quyTacId: number
  phongBanId: number
  trongSo: number
  trangThai: boolean
}

export interface QuyTacKPIViTri {
  id: number
  quyTacId: number
  viTriId: number
  trongSo: number
  trangThai: boolean
}

export interface BienSoKPI {
  id: number
  maBienSo: string
  tenBienSo: string
  moTa?: string
  nguonDuLieu: NguonDuLieuKPI
  bangNguon?: string
  truongNguon?: string
  congThuc?: string
  donViTinh?: string
  trangThai: boolean
}

export interface KetQuaTinhKPI {
  quyTacId: number
  maQuyTac: string
  tenQuyTac: string
  giaTriDauVao: number
  diemDat: number
  trongSo: number
  diemQuyDoi: number
  ghiChu?: string
}

const ruleEngineApi = axios.create({
  baseURL: '/api/kpi/rule-engine',
  headers: { 'Content-Type': 'application/json' },
})

ruleEngineApi.interceptors.request.use(
  (config) => {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY)
    if (stored) {
      try {
        const data = JSON.parse(stored)
        if (data.token) {
          config.headers.Authorization = `Bearer ${data.token}`
        }
      } catch {
        // Ignore parse errors
      }
    }
    return config
  },
  (error) => Promise.reject(error)
)

export const kpiRuleEngineApi = {
  // Nhóm quy tắc
  layDanhSachNhom: () =>
    ruleEngineApi.get<NhomQuyTacKPI[]>('/nhom').then((res) => res.data),
  
  taoNhomQuyTac: (data: { maNhom: string; tenNhom: string; moTa?: string; thuTu?: number }) =>
    ruleEngineApi.post<NhomQuyTacKPI>('/nhom', data).then((res) => res.data),
  
  capNhatNhomQuyTac: (id: number, data: Partial<{ tenNhom: string; moTa: string; thuTu: number }>) =>
    ruleEngineApi.put<NhomQuyTacKPI>(`/nhom/${id}`, data).then((res) => res.data),

  // Quy tắc KPI
  layDanhSachQuyTac: (nhomId?: number) =>
    ruleEngineApi.get<QuyTacKPI[]>('/quy-tac', { params: nhomId ? { nhomId } : undefined }).then((res) => res.data),
  
  layQuyTacTheoId: (id: number) =>
    ruleEngineApi.get<QuyTacKPI>(`/quy-tac/${id}`).then((res) => res.data),
  
  taoQuyTac: (data: {
    maQuyTac: string
    tenQuyTac: string
    moTa?: string
    nhomId: number
    loaiQuyTac?: LoaiQuyTacKPI
    nguonDuLieu?: NguonDuLieuKPI
    diemToiDa?: number
    diemMacDinh?: number
    trongSoMacDinh?: number
    apDungToanCongTy?: boolean
  }) => ruleEngineApi.post<QuyTacKPI>('/quy-tac', data).then((res) => res.data),
  
  capNhatQuyTac: (id: number, data: Partial<{
    tenQuyTac: string
    moTa: string
    loaiQuyTac: LoaiQuyTacKPI
    nguonDuLieu: NguonDuLieuKPI
    diemToiDa: number
    diemMacDinh: number
    trongSoMacDinh: number
    apDungToanCongTy: boolean
  }>) => ruleEngineApi.put<QuyTacKPI>(`/quy-tac/${id}`, data).then((res) => res.data),
  
  xoaQuyTac: (id: number) =>
    ruleEngineApi.delete(`/quy-tac/${id}`).then((res) => res.data),

  // Điều kiện quy tắc
  themDieuKien: (data: {
    quyTacId: number
    thuTu?: number
    moTaDieuKien: string
    bienSo: string
    toanTu: ToanTuSoSanh
    giaTriMin?: number
    giaTriMax?: number
    loaiTinhDiem?: LoaiTinhDiemKPI
    diemCoDinh?: number
    congThuc?: string
  }) => ruleEngineApi.post<DieuKienQuyTacKPI>('/dieu-kien', data).then((res) => res.data),
  
  capNhatDieuKien: (id: number, data: Partial<DieuKienQuyTacKPI>) =>
    ruleEngineApi.put<DieuKienQuyTacKPI>(`/dieu-kien/${id}`, data).then((res) => res.data),
  
  xoaDieuKien: (id: number) =>
    ruleEngineApi.delete(`/dieu-kien/${id}`).then((res) => res.data),

  // Biến số KPI
  layDanhSachBienSo: () =>
    ruleEngineApi.get<BienSoKPI[]>('/bien-so').then((res) => res.data),
  
  taoBienSo: (data: {
    maBienSo: string
    tenBienSo: string
    moTa?: string
    nguonDuLieu?: NguonDuLieuKPI
    bangNguon?: string
    truongNguon?: string
    congThuc?: string
    donViTinh?: string
  }) => ruleEngineApi.post<BienSoKPI>('/bien-so', data).then((res) => res.data),

  // Override trọng số
  ganTrongSoPhongBan: (quyTacId: number, phongBanId: number, trongSo: number) =>
    ruleEngineApi.put(`/quy-tac/${quyTacId}/phong-ban/${phongBanId}`, { trongSo }).then((res) => res.data),
  
  ganTrongSoViTri: (quyTacId: number, viTriId: number, trongSo: number) =>
    ruleEngineApi.put(`/quy-tac/${quyTacId}/vi-tri/${viTriId}`, { trongSo }).then((res) => res.data),

  // Tính KPI
  previewKPI: (nhanVienId: number, thang: number, nam: number, duLieuNhapTay?: Record<string, number>) =>
    ruleEngineApi.post<KetQuaTinhKPI[]>('/preview', { nhanVienId, thang, nam, duLieuNhapTay }).then((res) => res.data),
  
  tinhKPI: (danhGiaId: number, nhanVienId: number, thang: number, nam: number, duLieuNhapTay?: Record<string, number>) =>
    ruleEngineApi.post<KetQuaTinhKPI[]>('/tinh-kpi', { danhGiaId, nhanVienId, thang, nam, duLieuNhapTay }).then((res) => res.data),

  // Thống kê & khởi tạo
  thongKeQuyTac: () =>
    ruleEngineApi.get<{ tongNhom: number; tongQuyTac: number; tongBienSo: number; chiTiet: { nhom: string; soQuyTac: number }[] }>('/thong-ke').then((res) => res.data),
  
  khoiTaoDuLieuMau: () =>
    ruleEngineApi.post<{ message: string; nhomQuyTac: number; bienSo: number; quyTac: number }>('/khoi-tao-mau').then((res) => res.data),
}

export default api

