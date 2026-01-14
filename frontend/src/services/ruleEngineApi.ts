// API Service cho Rule Engine - Quy chế lương
import axios from 'axios'

const AUTH_STORAGE_KEY = 'tinh_luong_auth'

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
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

// ==================== TYPES ====================
export type LoaiRule = 'CO_DINH' | 'THEO_HE_SO' | 'BAC_THANG' | 'THEO_SU_KIEN' | 'CONG_THUC'
export type CheDoGop = 'CONG_DON' | 'GHI_DE'
export type TrangThaiQuyChe = 'NHAP' | 'HIEU_LUC' | 'TAM_DUNG' | 'NGUNG'
export type LoaiSuKien = 'THUONG' | 'PHAT'
export type TrangThaiSuKien = 'NHAP' | 'DA_DUYET' | 'TU_CHOI' | 'HUY'

export interface QuyChe {
  id: number
  phongBanId: number
  tenQuyChe: string
  moTa?: string
  tuNgay: string
  denNgay?: string
  phienBan: number
  trangThai: TrangThaiQuyChe
  nguoiTao?: string
  ngayTao: string
  ngayCapNhat: string
  phongBan?: {
    id: number
    maPhongBan: string
    tenPhongBan: string
  }
  rules?: QuyCheRule[]
  _count?: {
    rules: number
    bangLuongs: number
  }
  daChotLuong?: boolean
  coDuocSua?: boolean
}

export interface QuyCheRule {
  id: number
  quyCheId: number
  khoanLuongId: number
  tenRule: string
  moTa?: string
  loaiRule: LoaiRule
  dieuKienJson?: string
  congThucJson: string
  thuTuUuTien: number
  cheDoGop: CheDoGop
  choPhepChinhTay: boolean
  trangThai: boolean
  nguoiTao?: string
  ngayTao: string
  ngayCapNhat: string
  khoanLuong?: {
    id: number
    maKhoan: string
    tenKhoan: string
    loai: 'THU_NHAP' | 'KHAU_TRU'
  }
}

export interface DieuKienApDung {
  vaiTro?: string[]
  capTrachNhiem?: number[]
  nhanVienIds?: number[]
  phongBanIds?: number[]
}

export interface DieuKienJson {
  apDungCho?: DieuKienApDung
}

export interface BacThang {
  from: number
  to: number
  soTien?: number
  soTienMoiLan?: number
  heSo?: number
}

// Các loại công thức
export interface CongThucCoDinh {
  soTien: number
}

export interface CongThucTheoHeSo {
  base: string
  heSo: number
  congThem?: number
}

export interface CongThucBacThang {
  field: string
  bac: BacThang[]
}

export interface CongThucTheoSuKien {
  maSuKien: string
  cachTinh: 'CO_DINH' | 'BAC_THANG'
  soTienMoiLan?: number
  bac?: BacThang[]
}

export interface CongThucBieuThuc {
  bieuThuc: string
}

export type CongThucJson = CongThucCoDinh | CongThucTheoHeSo | CongThucBacThang | CongThucTheoSuKien | CongThucBieuThuc

export interface SuKienThuongPhat {
  id: number
  nhanVienId: number
  phongBanId: number
  ngay: string
  loaiSuKien: LoaiSuKien
  maSuKien: string
  giaTri: number
  soTien: number
  ghiChu?: string
  trangThai: TrangThaiSuKien
  duyetBoi?: string
  duyetLuc?: string
  nguoiTao?: string
  ngayTao: string
  nhanVien?: {
    id: number
    maNhanVien: string
    hoTen: string
  }
  phongBan?: {
    id: number
    maPhongBan: string
    tenPhongBan: string
  }
}

export interface DanhMucSuKien {
  id: number
  maSuKien: string
  tenSuKien: string
  loai: LoaiSuKien
  moTa?: string
  soTienMacDinh?: number
  trangThai: boolean
}

export interface KetQuaValidate {
  hopLe: boolean
  danhSachLoi: string[]
  canhBao?: string[]
}

export interface KetQuaPreview {
  tongTien: number
  chiTiet: {
    khoanLuong: string
    soTien: number
    giaiThich: string
  }[]
  trace: {
    ruleName: string
    input: Record<string, unknown>
    output: number
    message: string
  }[]
}

export interface RuleTrace {
  id: number
  bangLuongId: number
  nhanVienId: number
  quyCheId: number
  quyCheRuleId?: number
  khoanLuongId: number
  inputJson: string
  outputSoTien: number
  messageGiaiThich: string
  taoLuc: string
  nhanVien?: {
    id: number
    maNhanVien: string
    hoTen: string
  }
  quyChe?: {
    id: number
    tenQuyChe: string
    phienBan: number
  }
  quyCheRule?: {
    id: number
    tenRule: string
    loaiRule: LoaiRule
  }
  khoanLuong?: {
    id: number
    maKhoan: string
    tenKhoan: string
    loai: 'THU_NHAP' | 'KHAU_TRU'
  }
}

// ==================== QUY CHẾ API ====================
export const quyCheApi = {
  // Danh sách
  layDanhSach: (params?: {
    phongBanId?: number
    trangThai?: TrangThaiQuyChe
    thang?: number
    nam?: number
  }) => api.get('/quy-che-luong', { params }).then((res) => res.data as QuyChe[]),

  // Chi tiết
  layChiTiet: (id: number) =>
    api.get(`/quy-che-luong/${id}`).then((res) => res.data as QuyChe),

  // Tạo mới
  tao: (data: {
    phongBanId: number
    tenQuyChe: string
    moTa?: string
    tuNgay: Date
    denNgay?: Date
    nguoiTao?: string
  }) => api.post('/quy-che-luong', data).then((res) => res.data as QuyChe),

  // Cập nhật
  capNhat: (id: number, data: Partial<{
    tenQuyChe: string
    moTa: string
    tuNgay: Date
    denNgay: Date
    trangThai: TrangThaiQuyChe
  }>) => api.put(`/quy-che-luong/${id}`, data).then((res) => res.data as QuyChe),

  // Nhân bản
  nhanBan: (id: number, data: {
    tenQuyChe?: string
    tuNgay: Date
    nguoiTao?: string
  }) => api.post(`/quy-che-luong/${id}/nhan-ban`, data).then((res) => res.data as QuyChe),

  // Kích hoạt
  kichHoat: (id: number) =>
    api.post(`/quy-che-luong/${id}/kich-hoat`).then((res) => res.data as QuyChe),

  // Ngưng
  ngung: (id: number) =>
    api.post(`/quy-che-luong/${id}/ngung`).then((res) => res.data as QuyChe),

  // Xóa
  xoa: (id: number) => api.delete(`/quy-che-luong/${id}`).then((res) => res.data),

  // Lấy rules
  layRules: (quyCheId: number) =>
    api.get(`/quy-che-luong/${quyCheId}/rules`).then((res) => res.data as QuyCheRule[]),

  // Thêm rule
  taoRule: (quyCheId: number, data: {
    khoanLuongId: number
    tenRule: string
    moTa?: string
    loaiRule: LoaiRule
    dieuKienJson?: DieuKienJson
    congThucJson: CongThucJson
    thuTuUuTien?: number
    cheDoGop?: CheDoGop
    choPhepChinhTay?: boolean
    nguoiTao?: string
  }) => api.post(`/quy-che-luong/${quyCheId}/rule`, data).then((res) => res.data as QuyCheRule),

  // Sắp xếp rules
  sapXepRules: (quyCheId: number, danhSachRuleId: number[]) =>
    api.put(`/quy-che-luong/${quyCheId}/sap-xep-rule`, { danhSachRuleId }).then((res) => res.data as QuyCheRule[]),
}

// ==================== RULE API ====================
export const quyCheRuleApi = {
  // Chi tiết
  layChiTiet: (id: number) =>
    api.get(`/quy-che-rule/${id}`).then((res) => res.data as QuyCheRule),

  // Cập nhật
  capNhat: (id: number, data: Partial<{
    tenRule: string
    moTa: string
    loaiRule: LoaiRule
    dieuKienJson: DieuKienJson
    congThucJson: CongThucJson
    thuTuUuTien: number
    cheDoGop: CheDoGop
    choPhepChinhTay: boolean
    trangThai: boolean
  }>) => api.put(`/quy-che-rule/${id}`, data).then((res) => res.data as QuyCheRule),

  // Xóa
  xoa: (id: number) => api.delete(`/quy-che-rule/${id}`).then((res) => res.data),

  // Validate
  validate: (data: {
    loaiRule: LoaiRule
    dieuKienJson?: DieuKienJson
    congThucJson: CongThucJson
  }) => api.post('/quy-che-rule/validate', data).then((res) => res.data as KetQuaValidate),

  // Preview
  preview: (data: {
    nhanVienId?: number
    quyCheId: number
    duLieuGiaLap?: Record<string, number>
  }) => api.post('/quy-che-rule/preview', data).then((res) => res.data as KetQuaPreview),
}

// ==================== SỰ KIỆN THƯỞNG/PHẠT API ====================
export const suKienApi = {
  // Danh sách
  layDanhSach: (params?: {
    nhanVienId?: number
    phongBanId?: number
    loaiSuKien?: LoaiSuKien
    maSuKien?: string
    trangThai?: TrangThaiSuKien
    thang?: number
    nam?: number
    tuNgay?: Date
    denNgay?: Date
  }) => api.get('/su-kien-thuong-phat', { params }).then((res) => res.data as SuKienThuongPhat[]),

  // Chi tiết
  layChiTiet: (id: number) =>
    api.get(`/su-kien-thuong-phat/${id}`).then((res) => res.data as SuKienThuongPhat),

  // Tạo
  tao: (data: {
    nhanVienId: number
    phongBanId: number
    ngay: Date
    loaiSuKien: LoaiSuKien
    maSuKien: string
    giaTri?: number
    soTien?: number
    ghiChu?: string
    nguoiTao?: string
  }) => api.post('/su-kien-thuong-phat', data).then((res) => res.data as SuKienThuongPhat),

  // Cập nhật
  capNhat: (id: number, data: Partial<{
    ngay: Date
    loaiSuKien: LoaiSuKien
    maSuKien: string
    giaTri: number
    soTien: number
    ghiChu: string
  }>) => api.put(`/su-kien-thuong-phat/${id}`, data).then((res) => res.data as SuKienThuongPhat),

  // Duyệt
  duyet: (id: number, data: { trangThai: 'DA_DUYET' | 'TU_CHOI'; duyetBoi?: string; lyDo?: string }) =>
    api.post(`/su-kien-thuong-phat/${id}/duyet`, { 
      duyetBoi: data.duyetBoi || 'admin', 
      ghiChu: data.lyDo 
    }).then((res) => res.data as SuKienThuongPhat),

  // Duyệt nhiều
  duyetNhieu: (data: { danhSachId: number[]; trangThai: 'DA_DUYET' | 'TU_CHOI'; duyetBoi?: string }) =>
    api.post('/su-kien-thuong-phat/duyet-nhieu', { 
      ids: data.danhSachId, 
      duyetBoi: data.duyetBoi || 'admin' 
    }).then((res) => res.data),

  // Hủy
  huy: (id: number) =>
    api.post(`/su-kien-thuong-phat/${id}/huy`).then((res) => res.data),

  // Thống kê
  thongKe: (nhanVienId: number, thang: number, nam: number) =>
    api.get(`/su-kien-thuong-phat/thong-ke/${nhanVienId}`, {
      params: { thang, nam }
    }).then((res) => res.data),

  // Danh mục
  layDanhMucSuKien: (loai?: LoaiSuKien) =>
    api.get('/su-kien-thuong-phat/danh-muc', { params: { loai } }).then((res) => res.data as DanhMucSuKien[]),

  taoDanhMucSuKien: (data: {
    maSuKien: string
    tenSuKien: string
    loai: LoaiSuKien
    moTa?: string
    soTienMacDinh?: number
  }) => api.post('/su-kien-thuong-phat/danh-muc', data).then((res) => res.data as DanhMucSuKien),

  khoiTaoDanhMucMau: () =>
    api.post('/su-kien-thuong-phat/khoi-tao-danh-muc-mau').then((res) => res.data),
}

// ==================== RULE ENGINE EXECUTOR API ====================
export const ruleEngineApi = {
  // Chạy rule engine
  chay: (bangLuongId: number, nguoiThucHien?: string) =>
    api.post(`/bang-luong/${bangLuongId}/chay-rule-engine`, { nguoiThucHien }).then((res) => res.data),

  // Xem trace
  xemTrace: (bangLuongId: number, nhanVienId?: number) =>
    api.get(`/bang-luong/${bangLuongId}/rule-trace`, {
      params: nhanVienId ? { nhanVienId } : undefined
    }).then((res) => res.data as RuleTrace[]),
}

// ==================== TRỢ LÝ AI API ====================

// Types cho Trợ lý AI
export type TrangThaiAiAudit = 'DE_XUAT' | 'DA_AP_DUNG' | 'HUY'

export interface DieuKienApDungDeXuat {
  tatCa?: boolean
  vaiTro?: string[]
  capTrachNhiem?: number[]
  nhanVienIds?: number[]
  phongBanIds?: number[]
}

export interface DieuKienJsonDeXuat {
  apDungCho?: DieuKienApDungDeXuat
}

export interface BacThangDeXuat {
  from: number
  to: number
  soTien?: number
  soTienMoiLan?: number
  heSo?: number
}

export interface CongThucCoDinhDeXuat {
  soTien: number
}

export interface CongThucTheoHeSoDeXuat {
  base: string
  heSo: number
  congThem?: number
}

export interface CongThucBacThangDeXuat {
  field: string
  bac: BacThangDeXuat[]
}

export interface CongThucTheoSuKienDeXuat {
  maSuKien: string
  cachTinh: 'CO_DINH' | 'BAC_THANG'
  soTienMoiLan?: number
  bac?: BacThangDeXuat[]
}

export interface CongThucBieuThucDeXuat {
  bieuThuc: string
}

export type CongThucJsonDeXuat = 
  | CongThucCoDinhDeXuat 
  | CongThucTheoHeSoDeXuat 
  | CongThucBacThangDeXuat 
  | CongThucTheoSuKienDeXuat 
  | CongThucBieuThucDeXuat

export interface RuleDeXuat {
  tenRule: string
  khoanLuongMa: string
  khoanLuongId?: number
  loaiRule: LoaiRule
  thuTuUuTien: number
  cheDoGop: CheDoGop
  choPhepChinhTay: boolean
  dieuKienJson?: DieuKienJsonDeXuat
  congThucJson: CongThucJsonDeXuat
}

export interface GoiYRuleResponse {
  hopLeSoBo: boolean
  canLamRo: string[]
  tomTatRule?: string
  ruleDeXuat?: RuleDeXuat
  giaiThich?: string[]
  canhBao?: string[]
  auditId?: number
}

export interface AiContext {
  phongBan: {
    id: number
    maPhongBan: string
    tenPhongBan: string
  }
  quyChe: {
    id: number
    tenQuyChe: string
    phienBan: number
  }
  khoanLuongs: Array<{
    id: number
    maKhoan: string
    tenKhoan: string
    loai: string
  }>
  danhMucSuKien: Array<{
    maSuKien: string
    tenSuKien: string
    loai: string
    soTienMacDinh: number
  }>
  capTrachNhiems: number[]
}

export interface AiRuleAudit {
  id: number
  nguoiTaoId?: number
  phongBanId?: number
  quyCheId?: number
  promptGoc: string
  responseJson: string
  trangThai: TrangThaiAiAudit
  ruleApDungId?: number
  taoLuc: string
  nguoiTao?: {
    id: number
    hoTen: string
  }
  rule?: {
    id: number
    tenRule: string
  }
}

export const troLyAiApi = {
  // Gợi ý rule từ tiếng Việt
  goiYRule: (phongBanId: number, quyCheId: number, noiDungTiengViet: string) =>
    api.post('/tro-ly-ai/goi-y-rule', {
      phongBanId,
      quyCheId,
      noiDungTiengViet,
    }).then((res) => res.data as GoiYRuleResponse),

  // Lấy context cho AI
  layContext: (phongBanId: number, quyCheId: number) =>
    api.get(`/tro-ly-ai/context/${phongBanId}/${quyCheId}`).then((res) => res.data as AiContext),

  // Áp dụng rule từ đề xuất AI
  apDungRule: (quyCheId: number, auditId: number, ruleDeXuat?: RuleDeXuat) =>
    api.post(`/tro-ly-ai/ap-dung/${quyCheId}`, {
      auditId,
      ruleDeXuat,
    }).then((res) => res.data as QuyCheRule),

  // Hủy đề xuất
  huyDeXuat: (auditId: number) =>
    api.post(`/tro-ly-ai/huy/${auditId}`).then((res) => res.data),

  // Lịch sử đề xuất AI
  lichSuDeXuat: (quyCheId: number) =>
    api.get(`/tro-ly-ai/lich-su/${quyCheId}`).then((res) => res.data as AiRuleAudit[]),
}

export default {
  quyChe: quyCheApi,
  quyCheRule: quyCheRuleApi,
  suKien: suKienApi,
  ruleEngine: ruleEngineApi,
  troLyAi: troLyAiApi,
}
