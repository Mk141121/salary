// API Service cho Chấm công
import api from './api'

// Types
export interface ChamCong {
  id: number
  nhanVienId: number
  thang: number
  nam: number
  soCongChuan: number
  soCongThucTe: number
  soNgayNghiPhep: number
  soNgayNghiKhongLuong: number
  soGioOT: number
  soGioOTDem: number
  soGioOTChuNhat: number
  soGioOTLe: number
  soLanDiMuon: number
  soLanVeSom: number
  ghiChu?: string
  nhanVien?: {
    id: number
    maNhanVien: string
    hoTen: string
    luongCoBan: number
    phongBan?: { tenPhongBan: string }
  }
}

export interface ChiTietChamCong {
  id: number
  nhanVienId: number
  ngay: string
  gioVao?: string
  gioRa?: string
  loaiNgay: 'NGAY_THUONG' | 'THU_BAY' | 'CHU_NHAT' | 'NGAY_LE'
  trangThai: 'DI_LAM' | 'NGHI_PHEP' | 'NGHI_KHONG_LUONG' | 'NGHI_LE' | 'NGHI_BENH' | 'CONG_TAC' | 'LAM_TU_XA'
  soGioLam: number
  soGioOT: number
  ghiChu?: string
}

export interface CauHinhPhatChamCong {
  id: number
  nam: number
  phatDiMuon1_3Lan: number
  phatDiMuon4_6Lan: number
  phatDiMuonTren6Lan: number
  phatVeSom1_3Lan: number
  phatVeSom4_6Lan: number
  phatVeSomTren6Lan: number
  phatNghiKhongPhep: number
  truLuongNghiKhongPhep: boolean
  gioVaoChuan: string
  gioRaChuan: string
  phutChoPhepTre: number
  moTa?: string
}

export interface TinhPhatResult {
  soLanDiMuon: number
  soLanVeSom: number
  soNgayNghiKhongLuong: number
  tienPhatDiMuon: number
  tienPhatVeSom: number
  tienPhatNghiKhongPhep: number
  truLuongNgayCong: number
  tongPhat: number
}

// API Chấm công tháng
export const chamCongApi = {
  // Lấy danh sách chấm công theo tháng
  layDanhSach: (thang: number, nam: number, phongBanId?: number) => {
    const params = new URLSearchParams({ thang: String(thang), nam: String(nam) })
    if (phongBanId) params.append('phongBanId', String(phongBanId))
    return api.get<ChamCong[]>(`/cham-cong?${params}`)
  },

  // Lấy chấm công của nhân viên
  layChamCongNhanVien: (nhanVienId: number, thang: number, nam: number) =>
    api.get<ChamCong>(`/cham-cong/nhan-vien/${nhanVienId}?thang=${thang}&nam=${nam}`),

  // Lưu chấm công
  luu: (data: Partial<ChamCong>) =>
    api.post<ChamCong>('/cham-cong', data),

  // Khởi tạo chấm công cho tất cả NV
  khoiTao: (thang: number, nam: number, soCongChuan: number = 26) =>
    api.post<{ message: string; created: number; skipped: number }>(
      '/cham-cong/khoi-tao',
      { thang, nam, soCongChuan }
    ),

  // Import chấm công
  import: (thang: number, nam: number, duLieu: Partial<ChamCong>[]) =>
    api.post<{ success: number; failed: number; errors: { maNhanVien: string; lyDo: string }[] }>(
      '/cham-cong/import',
      { thang, nam, duLieu }
    ),
}

// API Chi tiết chấm công từng ngày
export const chiTietChamCongApi = {
  // Lấy chi tiết theo tháng
  layChiTiet: (nhanVienId: number, thang: number, nam: number) =>
    api.get<ChiTietChamCong[]>(`/cham-cong/chi-tiet/${nhanVienId}?thang=${thang}&nam=${nam}`),

  // Lưu chi tiết
  luu: (data: Partial<ChiTietChamCong>) =>
    api.post<ChiTietChamCong>('/cham-cong/chi-tiet', data),

  // Tổng hợp thành chấm công tháng
  tongHop: (nhanVienId: number, thang: number, nam: number) =>
    api.post<ChamCong>(`/cham-cong/tong-hop/${nhanVienId}?thang=${thang}&nam=${nam}`),
}

// API Cấu hình phạt
export const cauHinhPhatApi = {
  // Lấy cấu hình theo năm
  lay: (nam: number) =>
    api.get<CauHinhPhatChamCong>(`/cham-cong/cau-hinh-phat/${nam}`),

  // Cập nhật cấu hình
  capNhat: (nam: number, data: Partial<CauHinhPhatChamCong>) =>
    api.put<CauHinhPhatChamCong>(`/cham-cong/cau-hinh-phat/${nam}`, data),

  // Tính tiền phạt cho nhân viên
  tinhPhat: (nhanVienId: number, thang: number, nam: number) =>
    api.get<TinhPhatResult>(`/cham-cong/tinh-phat/${nhanVienId}?thang=${thang}&nam=${nam}`),
}

// Kết quả đồng bộ CSV
export interface DongBoCSVResult {
  tongBanGhi: number
  tongNgay: number
  chiTiet: {
    maNhanVien: string
    ngay: string
    gioVao: string | null
    gioRa: string | null
    diMuon: boolean
    veSom: boolean
    phutMuon: number
    phutSom: number
  }[]
  thongKe: {
    maNhanVien: string
    thang: number
    nam: number
    soCongThucTe: number
    soLanDiMuon: number
    soLanVeSom: number
  }[]
  luuThanhCong: number
  luuThatBai: number
  loi: string[]
}

// API đồng bộ từ máy chấm công
export const dongBoApi = {
  // Đồng bộ từ CSV
  dongBoCSV: (csvContent: string) =>
    api.post<DongBoCSVResult>('/cham-cong/dong-bo-csv', { csvContent }),
}
