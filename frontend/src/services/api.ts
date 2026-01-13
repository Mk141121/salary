// API Service - Kết nối với Backend
import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

// ==================== PAGINATION TYPES ====================
export interface PaginationMeta {
  tongSo: number
  trang: number
  soLuong: number
  tongTrang: number
  coTrangTruoc: boolean
  coTrangSau: boolean
}

export interface PaginatedResult<T> {
  data: T[]
  meta: PaginationMeta
}

// ==================== PHÒNG BAN ====================
export const phongBanApi = {
  layTatCa: () => api.get('/phong-ban').then((res) => res.data),
  layTheoId: (id: number) => api.get(`/phong-ban/${id}`).then((res) => res.data),
  taoMoi: (data: { 
    maPhongBan: string; 
    tenPhongBan: string; 
    moTa?: string;
    gioVaoChuan?: string;
    gioRaChuan?: string;
    phutChoPhepTre?: number;
  }) =>
    api.post('/phong-ban', data).then((res) => res.data),
  capNhat: (id: number, data: Partial<{ 
    maPhongBan: string; 
    tenPhongBan: string; 
    moTa: string;
    gioVaoChuan: string;
    gioRaChuan: string;
    phutChoPhepTre: number;
  }>) =>
    api.put(`/phong-ban/${id}`, data).then((res) => res.data),
  xoa: (id: number) => api.delete(`/phong-ban/${id}`).then((res) => res.data),
}

// ==================== NHÂN VIÊN ====================
export type TrangThaiNhanVien = 'DANG_LAM' | 'NGHI_VIEC' | 'TAM_NGHI'

export interface NhanVien {
  id: number
  maNhanVien: string
  hoTen: string
  email?: string
  soDienThoai?: string
  phongBanId: number
  chucVu?: string
  luongCoBan: number
  trangThai: TrangThaiNhanVien
  phongBan?: {
    id: number
    maPhongBan: string
    tenPhongBan: string
  }
}

export const nhanVienApi = {
  layTatCa: (params?: { phongBanId?: number; tuKhoa?: string; trangThai?: TrangThaiNhanVien; trang?: number; soLuong?: number }) =>
    api.get('/nhan-vien', { params }).then((res) => res.data as PaginatedResult<NhanVien> | NhanVien[]),
  layTheoId: (id: number) => api.get(`/nhan-vien/${id}`).then((res) => res.data),
  layMaTuDong: () => api.get('/nhan-vien/ma-tu-dong').then((res) => res.data as { maNhanVien: string }),
  taoMoi: (data: Partial<NhanVien>) => api.post('/nhan-vien', data).then((res) => res.data),
  capNhat: (id: number, data: Partial<NhanVien>) =>
    api.put(`/nhan-vien/${id}`, data).then((res) => res.data),
  xoa: (id: number) => api.delete(`/nhan-vien/${id}`).then((res) => res.data),
}

// ==================== KHOẢN LƯƠNG ====================
export type CachTinhLuong = 'LUONG_THANG_CO_DINH' | 'THEO_NGAY_CONG' | 'CHUYEN_CAN_DIEU_KIEN'

export interface KhoanLuong {
  id: number
  maKhoan: string
  tenKhoan: string
  loai: 'THU_NHAP' | 'KHAU_TRU'
  cachTinh: CachTinhLuong
  chiuThue: boolean
  phamViApDung?: string
  moTa?: string
  thuTu: number
  trangThai: boolean
}

export const khoanLuongApi = {
  layTatCa: (loai?: 'THU_NHAP' | 'KHAU_TRU') =>
    api.get('/khoan-luong', { params: { loai } }).then((res) => res.data),
  layTheoId: (id: number) => api.get(`/khoan-luong/${id}`).then((res) => res.data),
  taoMoi: (data: Partial<KhoanLuong>) => api.post('/khoan-luong', data).then((res) => res.data),
  capNhat: (id: number, data: Partial<KhoanLuong>) =>
    api.put(`/khoan-luong/${id}`, data).then((res) => res.data),
  xoa: (id: number) => api.delete(`/khoan-luong/${id}`).then((res) => res.data),
}

// ==================== BẢNG LƯƠNG ====================
export interface BangLuong {
  id: number
  thang: number
  nam: number
  phongBanId: number
  tenBangLuong?: string
  trangThai: 'NHAP' | 'DA_CHOT' | 'KHOA'
  ngayChot?: string
  nguoiChot?: string
  phongBan: {
    id: number
    maPhongBan: string
    tenPhongBan: string
  }
  tongThuNhap?: number
  tongKhauTru?: number
  thucLinh?: number
  soNhanVien?: number
}

export interface ChiTietLuongNhanVien {
  nhanVienId: number
  maNhanVien: string
  hoTen: string
  chucVu: string | null
  phongBan: string
  ngayCongThucTe: number // Số ngày làm thực tế
  cacKhoanLuong: {
    khoanLuongId: number
    maKhoan: string
    tenKhoan: string
    loai: string
    soTien: number
  }[]
  tongThuNhap: number
  tongKhauTru: number
  thucLinh: number
}

export interface BangLuongChiTiet {
  bangLuongId: number
  thang: number
  nam: number
  ngayCongLyThuyet: number // Số ngày công lý thuyết
  phongBan: {
    id: number
    maPhongBan: string
    tenPhongBan: string
  }
  trangThai: string
  danhSachKhoanLuong: {
    id: number
    maKhoan: string
    tenKhoan: string
    loai: string
  }[]
  danhSachNhanVien: ChiTietLuongNhanVien[]
  tongCong: {
    tongThuNhap: number
    tongKhauTru: number
    thucLinh: number
  }
}

export const bangLuongApi = {
  layDanhSach: (params?: { thang?: number; nam?: number; phongBanId?: number; trang?: number; soLuong?: number }) =>
    api.get('/bang-luong', { params }).then((res) => res.data as PaginatedResult<BangLuong> | BangLuong[]),
  
  layTheoId: (id: number) =>
    api.get(`/bang-luong/${id}`).then((res) => res.data as BangLuongChiTiet),
  
  taoMoi: (data: { thang: number; nam: number; phongBanId: number; tenBangLuong?: string }) =>
    api.post('/bang-luong', data).then((res) => res.data),
  
  capNhatChiTiet: (data: {
    bangLuongId: number
    nhanVienId: number
    khoanLuongId: number
    soTien: number
    nguoiThayDoi?: string
    lyDo?: string
  }) => api.put('/bang-luong/chi-tiet/cap-nhat', data).then((res) => res.data),
  
  capNhatNhieuChiTiet: (danhSach: {
    bangLuongId: number
    nhanVienId: number
    khoanLuongId: number
    soTien: number
  }[]) => api.put('/bang-luong/chi-tiet/cap-nhat-nhieu', { danhSach }).then((res) => res.data),
  
  chotBangLuong: (id: number, data: { nguoiChot: string; ghiChu?: string }) =>
    api.post(`/bang-luong/${id}/chot`, data).then((res) => res.data),
  
  moKhoa: (id: number) => api.post(`/bang-luong/${id}/mo-khoa`).then((res) => res.data),
  
  khoa: (id: number) => api.post(`/bang-luong/${id}/khoa`).then((res) => res.data),
  
  xoa: (id: number) => api.delete(`/bang-luong/${id}`).then((res) => res.data),
  
  layLichSu: (id: number) => api.get(`/bang-luong/${id}/lich-su`).then((res) => res.data),
  
  soSanhExcel: (id: number, tongExcel: number) =>
    api.post(`/bang-luong/${id}/so-sanh-excel`, { tongExcel }).then((res) => res.data),
  
  tinhLaiLuong: (id: number) =>
    api.post(`/bang-luong/${id}/tinh-lai-luong`).then((res) => res.data as { success: boolean; message: string; soNhanVien: number }),
}

// ==================== PHIẾU LƯƠNG ====================
export interface PhieuLuongData {
  hoTen: string
  maNhanVien: string
  email: string
  phongBan: string
  chucVu: string
  thang: number
  nam: number
  ngayCongThucTe: number
  ngayCongLyThuyet: number
  cacKhoanLuong: {
    tenKhoan: string
    loai: 'THU_NHAP' | 'KHAU_TRU'
    soTien: number
  }[]
  tongThuNhap: number
  tongKhauTru: number
  thucLinh: number
}

export const phieuLuongApi = {
  // Lấy dữ liệu phiếu lương
  layPhieuLuong: (bangLuongId: number, nhanVienId: number) =>
    api.get(`/bang-luong/${bangLuongId}/phieu-luong/${nhanVienId}`).then((res) => res.data as PhieuLuongData),
  
  // Lấy HTML phiếu lương (để render hoặc xuất ảnh)
  layPhieuLuongHtml: (bangLuongId: number, nhanVienId: number) =>
    api.get(`/bang-luong/${bangLuongId}/phieu-luong/${nhanVienId}/html`).then((res) => res.data as { html: string; data: PhieuLuongData }),
  
  // Gửi phiếu lương cho 1 nhân viên
  guiPhieuLuong: (bangLuongId: number, nhanVienId: number) =>
    api.post(`/bang-luong/${bangLuongId}/gui-phieu-luong/${nhanVienId}`).then((res) => res.data as { success: boolean; message: string }),
  
  // Gửi phiếu lương cho tất cả nhân viên
  guiTatCa: (bangLuongId: number) =>
    api.post(`/bang-luong/${bangLuongId}/gui-tat-ca`).then((res) => res.data as { success: number; failed: number; errors: string[] }),
}

// ==================== IMPORT EXCEL ====================
export const importExcelApi = {
  docHeader: (file: File) => {
    const formData = new FormData()
    formData.append('file', file)
    return api.post('/import-excel/doc-header', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }).then((res) => res.data)
  },
  
  goiYMapping: (file: File) => {
    const formData = new FormData()
    formData.append('file', file)
    return api.post('/import-excel/goi-y-mapping', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }).then((res) => res.data)
  },
  
  import: (file: File, thang: number, nam: number, phongBanId: number, mappings: unknown[]) => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('thang', String(thang))
    formData.append('nam', String(nam))
    formData.append('phongBanId', String(phongBanId))
    formData.append('mappings', JSON.stringify(mappings))
    return api.post('/import-excel/import', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }).then((res) => res.data)
  },
  
  export: (bangLuongId: number) =>
    api.get(`/import-excel/export/${bangLuongId}`, { responseType: 'blob' }),
}

// ==================== PHỤ CẤP NHÂN VIÊN ====================
export interface PhuCapNhanVien {
  id: number
  nhanVienId: number
  khoanLuongId: number
  soTien: number
  tuNgay: string
  denNgay?: string
  ghiChu?: string
  trangThai: 'HIEU_LUC' | 'TAM_DUNG' | 'KET_THUC'
  nguoiTao?: string
  ngayTao: string
  khoanLuong: KhoanLuong
  nhanVien?: NhanVien
}

export const phuCapNhanVienApi = {
  // Lấy tất cả phụ cấp của nhân viên
  layTheoNhanVien: (nhanVienId: number) =>
    api.get(`/phu-cap-nhan-vien/nhan-vien/${nhanVienId}`).then((res) => res.data as PhuCapNhanVien[]),
  
  // Lấy phụ cấp đang hiệu lực
  layHieuLuc: (nhanVienId: number) =>
    api.get(`/phu-cap-nhan-vien/nhan-vien/${nhanVienId}/hieu-luc`).then((res) => res.data as PhuCapNhanVien[]),
  
  // Lấy phụ cấp theo tháng
  layTheoThang: (nhanVienId: number, thang: number, nam: number) =>
    api.get(`/phu-cap-nhan-vien/nhan-vien/${nhanVienId}/theo-thang`, {
      params: { thang, nam },
    }).then((res) => res.data as PhuCapNhanVien[]),
  
  // Lấy lịch sử phụ cấp
  layLichSu: (nhanVienId: number, khoanLuongId?: number) =>
    api.get(`/phu-cap-nhan-vien/nhan-vien/${nhanVienId}/lich-su`, {
      params: { khoanLuongId },
    }).then((res) => res.data as PhuCapNhanVien[]),
  
  // Thêm phụ cấp mới
  taoPhuCap: (data: {
    nhanVienId: number
    khoanLuongId: number
    soTien: number
    tuNgay: string
    denNgay?: string
    ghiChu?: string
    nguoiTao?: string
  }) => api.post('/phu-cap-nhan-vien', data).then((res) => res.data as PhuCapNhanVien),
  
  // Kết thúc phụ cấp
  ketThuc: (id: number, denNgay: string, nguoiCapNhat?: string) =>
    api.put(`/phu-cap-nhan-vien/${id}/ket-thuc`, { denNgay, nguoiCapNhat }).then((res) => res.data),
  
  // Tăng/Điều chỉnh phụ cấp
  tang: (id: number, data: { soTienMoi: number; tuNgay: string; ghiChu?: string; nguoiTao?: string }) =>
    api.post(`/phu-cap-nhan-vien/${id}/tang`, data).then((res) => res.data as PhuCapNhanVien),
  
  // Tạm dừng phụ cấp
  tamDung: (id: number) =>
    api.put(`/phu-cap-nhan-vien/${id}/tam-dung`).then((res) => res.data),
  
  // Kích hoạt lại phụ cấp
  kichHoat: (id: number) =>
    api.put(`/phu-cap-nhan-vien/${id}/kich-hoat`).then((res) => res.data),
  
  // Thống kê theo phòng ban
  thongKePhongBan: (phongBanId: number) =>
    api.get(`/phu-cap-nhan-vien/thong-ke/phong-ban/${phongBanId}`).then((res) => res.data),
}

// ==================== NGÀY CÔNG ====================
export interface NgayCongBangLuong {
  id: number
  bangLuongId: number
  nhanVienId: number
  ngayCongLyThuyet: number
  soCongThucTe: number
  soNgayNghiPhep: number
  soNgayNghiKhongPhep: number
  ngayCongDieuChinh?: number | null
  ghiChu?: string | null
  nhanVien?: {
    id: number
    maNhanVien: string
    hoTen: string
  }
}

export const ngayCongApi = {
  // Lấy tất cả ngày công của bảng lương
  layTatCa: (bangLuongId: number) =>
    api.get(`/bang-luong/${bangLuongId}/ngay-cong`).then((res) => res.data as NgayCongBangLuong[]),
  
  // Lấy ngày công của nhân viên
  layTheoNhanVien: (bangLuongId: number, nhanVienId: number) =>
    api.get(`/bang-luong/${bangLuongId}/ngay-cong/${nhanVienId}`).then((res) => res.data as NgayCongBangLuong),
  
  // Khởi tạo ngày công từ chấm công
  khoiTao: (bangLuongId: number) =>
    api.post(`/bang-luong/${bangLuongId}/ngay-cong/khoi-tao`).then((res) => res.data),
  
  // Điều chỉnh ngày công thủ công
  dieuChinh: (bangLuongId: number, nhanVienId: number, data: { ngayCongMoi: number; ghiChu?: string }) =>
    api.put(`/bang-luong/${bangLuongId}/ngay-cong/${nhanVienId}/dieu-chinh`, data).then((res) => res.data),
  
  // Xóa điều chỉnh (trở về tính tự động)
  xoaDieuChinh: (bangLuongId: number, nhanVienId: number) =>
    api.delete(`/bang-luong/${bangLuongId}/ngay-cong/${nhanVienId}/dieu-chinh`).then((res) => res.data),
}

// ==================== THÔNG TIN CÔNG TY ====================
export interface ThongTinCongTy {
  id: number
  tenCongTy: string
  maSoThue?: string
  diaChi?: string
  dienThoai?: string
  email?: string
  website?: string
  logo?: string
  nguoiDaiDien?: string
  chucVuDaiDien?: string
}

export const thongTinCongTyApi = {
  // Lấy thông tin công ty
  lay: () => api.get('/thong-tin-cong-ty').then((res) => res.data as ThongTinCongTy),
  
  // Cập nhật thông tin công ty
  capNhat: (data: Partial<ThongTinCongTy>) =>
    api.put('/thong-tin-cong-ty', data).then((res) => res.data),
}

export default api
