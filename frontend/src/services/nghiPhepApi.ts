// API Service cho module Nghỉ phép
import axios from 'axios'

const AUTH_STORAGE_KEY = 'tinh_luong_auth'

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Interceptor để tự động thêm token
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
        // Ignore
      }
    }
    return config
  },
  (error) => Promise.reject(error)
)

// ==================== TYPES ====================
export type TrangThaiDonNghiPhep = 'NHAP' | 'GUI_DUYET' | 'DA_DUYET' | 'TU_CHOI' | 'HUY'
export type NhomLoaiNghi = 'CO_PHEP' | 'KHONG_PHEP'

export interface LoaiNghi {
  id: number
  maLoaiNghi: string
  tenLoaiNghi: string
  nhomLoai: NhomLoaiNghi
  coTinhLuong: boolean
  coTinhChuyenCan: boolean
  thuTuHienThi: number
  isActive: boolean
}

export interface DonNghiPhep {
  id: number
  maDon: string
  nhanVien: {
    id: number
    maNhanVien: string
    hoTen: string
  }
  phongBan: {
    id: number
    tenPhongBan: string
  }
  loaiNghi: LoaiNghi
  tuNgay: string
  denNgay: string
  soNgayNghi: number
  lyDo?: string
  tepDinhKemUrl?: string
  trangThai: TrangThaiDonNghiPhep
  nguoiDuyet?: {
    id: number
    hoTen: string
  }
  ngayDuyet?: string
  lyDoTuChoi?: string
  ngayTao: string
}

export interface ChiTietNghiPhepNgay {
  id: number
  ngay: string
  soGioNghi: number
  loaiNghi: LoaiNghi
  coTinhLuong: boolean
  coTinhChuyenCan: boolean
  donNghiPhep?: {
    id: number
    maDon: string
    trangThai: TrangThaiDonNghiPhep
  }
}

export interface TaoLoaiNghiDto {
  maLoaiNghi: string
  tenLoaiNghi: string
  nhomLoai: NhomLoaiNghi
  coTinhLuong: boolean
  coTinhChuyenCan: boolean
  thuTuHienThi?: number
}

export interface TaoDonNghiPhepDto {
  nhanVienId: number
  loaiNghiId: number
  tuNgay: string
  denNgay: string
  lyDo?: string
  tepDinhKemUrl?: string
}

export interface CapNhatDonNghiPhepDto {
  loaiNghiId?: number
  tuNgay?: string
  denNgay?: string
  lyDo?: string
  tepDinhKemUrl?: string
}

export interface LocDonNghiPhep {
  phongBanId?: number
  nhanVienId?: number
  loaiNghiId?: number
  trangThai?: TrangThaiDonNghiPhep
  tuNgay?: string
  denNgay?: string
  page?: number
  limit?: number
}

export interface PaginatedDonNghiPhep {
  items: DonNghiPhep[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export interface LichNghiNhanVien {
  nhanVien: {
    id: number
    maNhanVien: string
    hoTen: string
  }
  chiTietNgays: ChiTietNghiPhepNgay[]
}

// ==================== API FUNCTIONS ====================

export const nghiPhepApi = {
  // === Loại nghỉ ===
  layDanhSachLoaiNghi: (all = false) =>
    api.get<LoaiNghi[]>('/nghi-phep/loai-nghi', { params: { all } }).then((res) => res.data),

  layLoaiNghi: (id: number) =>
    api.get<LoaiNghi>(`/nghi-phep/loai-nghi/${id}`).then((res) => res.data),

  taoLoaiNghi: (data: TaoLoaiNghiDto) =>
    api.post<LoaiNghi>('/nghi-phep/loai-nghi', data).then((res) => res.data),

  capNhatLoaiNghi: (id: number, data: Partial<TaoLoaiNghiDto>) =>
    api.put<LoaiNghi>(`/nghi-phep/loai-nghi/${id}`, data).then((res) => res.data),

  toggleLoaiNghi: (id: number) =>
    api.post<LoaiNghi>(`/nghi-phep/loai-nghi/${id}/toggle`).then((res) => res.data),

  // === Đơn nghỉ phép ===
  layDanhSachDon: (filter: LocDonNghiPhep) =>
    api.get<PaginatedDonNghiPhep>('/nghi-phep/don', { params: filter }).then((res) => res.data),

  layChiTietDon: (id: number) =>
    api.get<DonNghiPhep & { chiTietNgays: ChiTietNghiPhepNgay[] }>(`/nghi-phep/don/${id}`).then((res) => res.data),

  taoDon: (data: TaoDonNghiPhepDto) =>
    api.post<DonNghiPhep>('/nghi-phep/don', data).then((res) => res.data),

  capNhatDon: (id: number, data: CapNhatDonNghiPhepDto) =>
    api.put<DonNghiPhep>(`/nghi-phep/don/${id}`, data).then((res) => res.data),

  guiDuyet: (id: number) =>
    api.post<DonNghiPhep>(`/nghi-phep/don/${id}/gui-duyet`).then((res) => res.data),

  duyetDon: (id: number, ghiChu?: string) =>
    api.post<DonNghiPhep>(`/nghi-phep/don/${id}/duyet`, { ghiChu }).then((res) => res.data),

  tuChoiDon: (id: number, lyDoTuChoi: string) =>
    api.post<DonNghiPhep>(`/nghi-phep/don/${id}/tu-choi`, { lyDoTuChoi }).then((res) => res.data),

  huyDon: (id: number, lyDo?: string) =>
    api.post<DonNghiPhep>(`/nghi-phep/don/${id}/huy`, { lyDo }).then((res) => res.data),

  rebuildMapping: (id: number) =>
    api.post(`/nghi-phep/don/${id}/mapping/rebuild`).then((res) => res.data),

  // === Lịch nghỉ ===
  layLichNghi: (params: { nhanVienId?: number; phongBanId?: number; tuNgay: string; denNgay: string }) =>
    api.get<LichNghiNhanVien[]>('/nghi-phep/lich', { params }).then((res) => res.data),

  layLichNghiNhanVien: (nhanVienId: number, tuNgay: string, denNgay: string) =>
    api.get<{ chiTietNgays: ChiTietNghiPhepNgay[] }>(`/nghi-phep/nhan-vien/${nhanVienId}/lich`, {
      params: { tuNgay, denNgay },
    }).then((res) => res.data),
}

// Helper function để format trạng thái
export const getTrangThaiLabel = (trangThai: TrangThaiDonNghiPhep): string => {
  const labels: Record<TrangThaiDonNghiPhep, string> = {
    NHAP: 'Nháp',
    GUI_DUYET: 'Chờ duyệt',
    DA_DUYET: 'Đã duyệt',
    TU_CHOI: 'Từ chối',
    HUY: 'Đã hủy',
  }
  return labels[trangThai] || trangThai
}

export const getTrangThaiColor = (trangThai: TrangThaiDonNghiPhep): string => {
  const colors: Record<TrangThaiDonNghiPhep, string> = {
    NHAP: 'gray',
    GUI_DUYET: 'blue',
    DA_DUYET: 'green',
    TU_CHOI: 'red',
    HUY: 'gray',
  }
  return colors[trangThai] || 'gray'
}

export const getNhomLoaiLabel = (nhomLoai: NhomLoaiNghi): string => {
  const labels: Record<NhomLoaiNghi, string> = {
    CO_PHEP: 'Có phép',
    KHONG_PHEP: 'Không phép',
  }
  return labels[nhomLoai] || nhomLoai
}

export default nghiPhepApi
