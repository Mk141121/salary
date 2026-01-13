// RBAC API Service - Phân quyền & Người dùng
import axios from 'axios'

const api = axios.create({
  baseURL: '/api/rbac',
  headers: { 'Content-Type': 'application/json' },
})

// ==================== INTERFACES ====================
export interface NguoiDung {
  id: number
  tenDangNhap: string
  hoTen: string
  email: string
  soDienThoai?: string
  nhanVienId?: number
  trangThai: 'HOAT_DONG' | 'TAM_KHOA' | 'NGUNG_HOAT_DONG'
  lanDangNhapCuoi?: string
  ngayTao: string
  vaiTros?: NguoiDungVaiTro[]
  nhanVien?: { id: number; maNhanVien: string; hoTen: string }
}

export interface VaiTro {
  id: number
  maVaiTro: string
  tenVaiTro: string
  moTa?: string
  capDo: number
  trangThai: boolean
  ngayTao: string
  quyens?: VaiTroQuyen[]
  _count?: { nguoiDungs: number }
}

export interface Quyen {
  id: number
  maQuyen: string
  tenQuyen: string
  nhomQuyen: string
  moTa?: string
  ngayTao: string
}

export interface NguoiDungVaiTro {
  id: number
  nguoiDungId: number
  vaiTroId: number
  ngayTao: string
  vaiTro: VaiTro
}

export interface VaiTroQuyen {
  id: number
  vaiTroId: number
  quyenId: number
  ngayTao: string
  quyen: Quyen
}

export interface AuditLog {
  id: number
  nguoiDungId?: number
  hanhDong: 'TAO' | 'SUA' | 'XOA' | 'XEM' | 'DANG_NHAP' | 'DANG_XUAT' | 'CHOT' | 'MO_KHOA' | 'DUYET' | 'TU_CHOI'
  bangDuLieu?: string
  banGhiId?: string
  duLieuCu?: object
  duLieuMoi?: object
  ipAddress?: string
  userAgent?: string
  ngayTao: string
  nguoiDung?: NguoiDung
}

export interface DangNhapResponse {
  token: string
  nguoiDung: { id: number; tenDangNhap: string; hoTen: string; email: string }
  vaiTros: string[]
  quyens: string[]
  hetHan: string
}

// ==================== ĐĂNG NHẬP / ĐĂNG XUẤT ====================
export const authApi = {
  dangNhap: (tenDangNhap: string, matKhau: string) =>
    api.post<DangNhapResponse>('/dang-nhap', { tenDangNhap, matKhau }).then((res) => res.data),
  
  dangXuat: (token: string) =>
    api.post('/dang-xuat', null, { headers: { Authorization: `Bearer ${token}` } }).then((res) => res.data),
  
  kiemTraToken: (token: string) =>
    api.get<{ hieu_luc: boolean; nguoiDung: NguoiDung; vaiTros: string[]; quyens: string[]; hetHan: string }>('/kiem-tra-token', {
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) => res.data),
}

// ==================== NGƯỜI DÙNG ====================
export const nguoiDungApi = {
  layTatCa: () => api.get<NguoiDung[]>('/nguoi-dung').then((res) => res.data),
  
  layTheoId: (id: number) => api.get<NguoiDung>(`/nguoi-dung/${id}`).then((res) => res.data),
  
  taoMoi: (data: {
    tenDangNhap: string
    matKhau: string
    hoTen: string
    email: string
    soDienThoai?: string
    nhanVienId?: number
    vaiTroIds?: number[]
  }) => api.post<NguoiDung>('/nguoi-dung', data).then((res) => res.data),
  
  capNhat: (id: number, data: Partial<{ hoTen: string; email: string; soDienThoai: string; trangThai: string }>) =>
    api.put<NguoiDung>(`/nguoi-dung/${id}`, data).then((res) => res.data),
  
  doiMatKhau: (id: number, matKhauCu: string, matKhauMoi: string) =>
    api.put(`/nguoi-dung/${id}/doi-mat-khau`, { matKhauCu, matKhauMoi }).then((res) => res.data),
}

// ==================== VAI TRÒ ====================
export const vaiTroApi = {
  layTatCa: () => api.get<VaiTro[]>('/vai-tro').then((res) => res.data),
  
  layTheoId: (id: number) => api.get<VaiTro>(`/vai-tro/${id}`).then((res) => res.data),
  
  taoMoi: (data: { maVaiTro: string; tenVaiTro: string; moTa?: string; capDo?: number; quyenIds?: number[] }) =>
    api.post<VaiTro>('/vai-tro', data).then((res) => res.data),
  
  capNhat: (id: number, data: Partial<{ tenVaiTro: string; moTa: string; capDo: number; trangThai: boolean }>) =>
    api.put<VaiTro>(`/vai-tro/${id}`, data).then((res) => res.data),
  
  ganVaiTro: (nguoiDungId: number, vaiTroId: number) =>
    api.post('/vai-tro/gan', { nguoiDungId, vaiTroId }).then((res) => res.data),
  
  goVaiTro: (nguoiDungId: number, vaiTroId: number) =>
    api.delete('/vai-tro/go', { data: { nguoiDungId, vaiTroId } }).then((res) => res.data),
}

// ==================== QUYỀN ====================
export const quyenApi = {
  layTatCa: () => api.get<Quyen[]>('/quyen').then((res) => res.data),
  
  layTheoNhom: () =>
    api.get<Record<string, Quyen[]>>('/quyen/theo-nhom').then((res) => res.data),
  
  taoMoi: (data: { maQuyen: string; tenQuyen: string; nhomQuyen: string; moTa?: string }) =>
    api.post<Quyen>('/quyen', data).then((res) => res.data),
  
  ganChoVaiTro: (vaiTroId: number, quyenIds: number[]) =>
    api.post('/quyen/gan-cho-vai-tro', { vaiTroId, quyenIds }).then((res) => res.data),
  
  kiemTraQuyen: (nguoiDungId: number, maQuyen: string) =>
    api.get<{ coQuyen: boolean }>(`/kiem-tra-quyen/${nguoiDungId}/${maQuyen}`).then((res) => res.data),
}

// ==================== AUDIT LOG ====================
export const auditLogApi = {
  layDanhSach: (params?: { tuNgay?: string; denNgay?: string; hanhDong?: string; bangDuLieu?: string }) =>
    api.get<AuditLog[]>('/audit-log', { params }).then((res) => res.data),
  
  layTheoNguoiDung: (nguoiDungId: number) =>
    api.get<AuditLog[]>(`/audit-log/nguoi-dung/${nguoiDungId}`).then((res) => res.data),
  
  layTheoBanGhi: (bangDuLieu: string, banGhiId: string) =>
    api.get<AuditLog[]>(`/audit-log/ban-ghi/${bangDuLieu}/${banGhiId}`).then((res) => res.data),
}

// ==================== KHỞI TẠO ====================
export const khoiTaoApi = {
  khoiTaoQuyen: () => api.post('/khoi-tao/quyen').then((res) => res.data),
  khoiTaoVaiTro: () => api.post('/khoi-tao/vai-tro').then((res) => res.data),
  khoiTaoAdmin: () => api.post('/khoi-tao/admin').then((res) => res.data),
  khoiTaoTatCa: () => api.post('/khoi-tao/tat-ca').then((res) => res.data),
}

export default api
