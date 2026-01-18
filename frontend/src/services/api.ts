// API Service - Kết nối với Backend
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

// Interceptor để xử lý lỗi 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token hết hạn hoặc không hợp lệ
      localStorage.removeItem(AUTH_STORAGE_KEY)
      if (window.location.pathname !== '/dang-nhap') {
        window.location.href = '/dang-nhap?expired=1'
      }
    }
    return Promise.reject(error)
  }
)

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
export interface PhongBan {
  id: number
  maPhongBan: string
  tenPhongBan: string
  moTa?: string
  trangThai: string
  phongBanChaId?: number
  capDo: number
  loaiPhongBan?: string
  nguoiQuanLyId?: number
  gioVaoChuan?: string
  gioRaChuan?: string
  phutChoPhepTre?: number
  phongBanCha?: { id: number; tenPhongBan: string }
  phongBanCons?: PhongBan[]
  children?: PhongBan[] // For tree view
  _count?: { nhanViens: number; phongBanCons: number; donViCons: number }
}

export interface DonViCon {
  id: number
  phongBanId: number
  maDonVi: string
  tenDonVi: string
  loaiDonVi: string
  trangThai: string
}

export interface NhanVienPhongBan {
  id: number
  nhanVienId: number
  phongBanId: number
  donViConId?: number
  tuNgay: string
  denNgay?: string
  ghiChu?: string
  phongBan?: { id: number; maPhongBan: string; tenPhongBan: string }
  donViCon?: { id: number; maDonVi: string; tenDonVi: string; loaiDonVi: string }
}

export const phongBanApi = {
  // Phòng ban cơ bản
  layTatCa: () => api.get('/phong-ban').then((res) => res.data),
  layCayPhongBan: () => api.get<PhongBan[]>('/phong-ban/cay').then((res) => res.data),
  layTheoId: (id: number) => api.get(`/phong-ban/${id}`).then((res) => res.data),
  taoMoi: (data: { 
    maPhongBan: string; 
    tenPhongBan: string; 
    moTa?: string;
    phongBanChaId?: number;
    loaiPhongBan?: string;
    nguoiQuanLyId?: number;
    gioVaoChuan?: string;
    gioRaChuan?: string;
    phutChoPhepTre?: number;
  }) =>
    api.post('/phong-ban', data).then((res) => res.data),
  capNhat: (id: number, data: Partial<{ 
    maPhongBan: string; 
    tenPhongBan: string; 
    moTa: string;
    trangThai: string;
    loaiPhongBan: string;
    nguoiQuanLyId: number;
    gioVaoChuan: string;
    gioRaChuan: string;
    phutChoPhepTre: number;
  }>) =>
    api.put(`/phong-ban/${id}`, data).then((res) => res.data),
  doiPhongBanCha: (id: number, phongBanChaId: number | null) =>
    api.put(`/phong-ban/${id}/doi-phong-ban-cha`, { phongBanChaId }).then((res) => res.data),
  ngungHoatDong: (id: number) =>
    api.post(`/phong-ban/${id}/ngung-hoat-dong`).then((res) => res.data),
  kichHoat: (id: number) =>
    api.post(`/phong-ban/${id}/kich-hoat`).then((res) => res.data),
  xoa: (id: number) => api.delete(`/phong-ban/${id}`).then((res) => res.data),

  // Đơn vị con (Tổ/Ca)
  layDonViCon: (phongBanId: number) =>
    api.get<DonViCon[]>(`/phong-ban/${phongBanId}/don-vi-con`).then((res) => res.data),
  taoDonViCon: (phongBanId: number, data: { maDonVi: string; tenDonVi: string; loaiDonVi: string }) =>
    api.post(`/phong-ban/${phongBanId}/don-vi-con`, data).then((res) => res.data),
  capNhatDonViCon: (id: number, data: Partial<{ maDonVi: string; tenDonVi: string; loaiDonVi: string; trangThai: string }>) =>
    api.put(`/don-vi-con/${id}`, data).then((res) => res.data),
  ngungDonViCon: (id: number) =>
    api.post(`/don-vi-con/${id}/ngung-hoat-dong`).then((res) => res.data),
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

  // Lịch sử phòng ban
  layLichSuPhongBan: (nhanVienId: number) =>
    api.get<NhanVienPhongBan[]>(`/nhan-vien/${nhanVienId}/lich-su-phong-ban`).then((res) => res.data),
  chuyenPhongBan: (nhanVienId: number, data: { phongBanId: number; donViConId?: number; tuNgay: string; ghiChu?: string }) =>
    api.post(`/nhan-vien/${nhanVienId}/chuyen-phong-ban`, data).then((res) => res.data),
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
  id: number
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
  
  xoa: (id: number, force = false) => api.delete(`/bang-luong/${id}`, { params: { force: force ? 'true' : undefined } }).then((res) => res.data),
  
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

// ==================== CẤU HÌNH ĐƠN GIÁ ====================
export interface CauHinhDonGia {
  id: number
  maBien: string
  tenBien: string
  moTa?: string
  giaTri: number
  donVi?: string
  phongBanId?: number
  trangThai: boolean
  phongBan?: {
    id: number
    tenPhongBan: string
  }
  ngayTao?: string
  ngayCapNhat?: string
}

export const cauHinhDonGiaApi = {
  // Lấy danh sách đơn giá
  layTatCa: (phongBanId?: number) => 
    api.get('/thong-tin-cong-ty/don-gia', { params: { phongBanId } }).then((res) => res.data as CauHinhDonGia[]),
  
  // Lấy chi tiết đơn giá
  layTheoId: (id: number) => 
    api.get(`/thong-tin-cong-ty/don-gia/${id}`).then((res) => res.data as CauHinhDonGia),
  
  // Tạo đơn giá mới
  taoMoi: (data: Partial<CauHinhDonGia>) => 
    api.post('/thong-tin-cong-ty/don-gia', data).then((res) => res.data as CauHinhDonGia),
  
  // Cập nhật đơn giá
  capNhat: (id: number, data: Partial<CauHinhDonGia>) => 
    api.put(`/thong-tin-cong-ty/don-gia/${id}`, data).then((res) => res.data as CauHinhDonGia),
  
  // Xóa đơn giá
  xoa: (id: number) => 
    api.delete(`/thong-tin-cong-ty/don-gia/${id}`).then((res) => res.data),
  
  // Khởi tạo đơn giá mẫu
  khoiTaoMau: () => 
    api.post('/thong-tin-cong-ty/don-gia/khoi-tao-mau').then((res) => res.data),
}

// ==================== ỨNG LƯƠNG ====================
export type TrangThaiBangUngLuong = 'NHAP' | 'DA_CHOT' | 'DA_KHOA'

export interface BangUngLuong {
  id: number
  maBangUngLuong: string
  thangNam: string
  tuNgay: string
  denNgay: string
  phongBanId?: number
  trangThai: TrangThaiBangUngLuong
  ghiChu?: string
  ngayTao: string
  ngayChot?: string
  ngayKhoa?: string
  daGhiNhanKhauTru: boolean
  phongBan?: {
    id: number
    tenPhongBan: string
  }
  chiTiets?: ChiTietBangUngLuong[]
}

export interface ChiTietBangUngLuong {
  id: number
  bangUngLuongId: number
  nhanVienId: number
  phongBanId: number
  tienCongLuyKe: number
  mucToiDaDuocUng: number
  soNgayCong: number
  soNgayNghi: number
  soNgayNghiKhongPhep: number
  duocPhepUng: boolean
  lyDoKhongDat?: string
  soTienUngDeXuat: number
  soTienUngDuyet: number
  ghiChu?: string
  nhanVien?: {
    id: number
    maNhanVien: string
    hoTen: string
  }
  phongBan?: {
    id: number
    tenPhongBan: string
  }
  nhomNhanVien?: {
    id: number
    tenNhom: string
  }
}

export const ungLuongApi = {
  // Danh sách bảng ứng lương
  layDanhSach: (params?: { thangNam?: string; phongBanId?: number; trangThai?: TrangThaiBangUngLuong; trang?: number; soLuong?: number }) =>
    api.get('/ung-luong/bang', { params }).then((res) => res.data),
  
  // Chi tiết bảng ứng lương
  layTheoId: (id: number) =>
    api.get(`/ung-luong/bang/${id}`).then((res) => res.data as BangUngLuong),
  
  // Tạo mới
  taoMoi: (data: { thangNam: string; tuNgay: string; denNgay: string; phongBanId?: number; ghiChu?: string }) =>
    api.post('/ung-luong/bang', data).then((res) => res.data),
  
  // Cập nhật
  capNhat: (id: number, data: { ghiChu?: string }) =>
    api.put(`/ung-luong/bang/${id}`, data).then((res) => res.data),
  
  // Xóa
  xoa: (id: number, force = false) =>
    api.delete(`/ung-luong/bang/${id}`, { params: { force: force ? 'true' : undefined } }).then((res) => res.data),
  
  // Sinh danh sách nhân viên
  sinhDanhSach: (id: number, data?: { phongBanId?: number; nhomNhanVienId?: number }) =>
    api.post(`/ung-luong/bang/${id}/generate-danh-sach`, data || {}).then((res) => res.data as { soNhanVien: number; soDuocUng: number }),
  
  // Cập nhật bulk
  capNhatBulk: (id: number, data: { chiTiets: Array<{ id: number; soTienUngDeXuat?: number; soTienUngDuyet?: number; ghiChu?: string }> }) =>
    api.put(`/ung-luong/bang/${id}/rows/bulk`, data).then((res) => res.data as { soCapNhat: number; errors?: string[] }),
  
  // Set theo tỉ lệ
  setTheoTiLe: (id: number, data: { tiLe: number; lamTron?: number }) =>
    api.post(`/ung-luong/bang/${id}/set-ti-le`, data).then((res) => res.data as { message: string }),
  
  // Set số tiền cố định
  setSoTienCoDinh: (id: number, data: { soTien: number }) =>
    api.post(`/ung-luong/bang/${id}/set-so-tien`, data).then((res) => res.data as { message: string }),
  
  // Chốt
  chot: (id: number) =>
    api.post(`/ung-luong/bang/${id}/chot`).then((res) => res.data),
  
  // Khóa
  khoa: (id: number) =>
    api.post(`/ung-luong/bang/${id}/khoa`).then((res) => res.data),
  
  // Mở khóa
  moKhoa: (id: number, data: { lyDo: string }) =>
    api.post(`/ung-luong/bang/${id}/mo-khoa`, data).then((res) => res.data),
  
  // Ghi nhận khấu trừ
  ghiNhanKhauTru: (id: number, data: { bangLuongApDungId: number }) =>
    api.post(`/ung-luong/bang/${id}/ghi-nhan-khau-tru`, data).then((res) => res.data as { message: string }),
}

// ==================== SỔ LƯƠNG ====================
export interface SoLuongNhanVienData {
  nhanVien: {
    id: number
    maNhanVien: string
    hoTen: string
    phongBan?: { tenPhongBan: string }
  }
  bangLuongs: Array<{
    bangLuongId: number
    thangNam: string
    thang: number
    nam: number
    luongCoBan: number
    phuCapTong: number
    thuongKPI: number
    thuongThuNhap: number
    khauTruTong: number
    ungLuong: number
    bhxh: number
    bhyt: number
    bhtn: number
    thueTNCN: number
    thucLanh: number
    ngayCong: number
    nghiCoPhep: number
    nghiKhongPhep: number
    chotNgay?: string
  }>
  dieuChinhs: Array<{
    phieuDieuChinhId: number
    ngayTao: string
    loaiPhieu: string
    tenKhoanLuong: string
    loaiKhoan: string
    soTien: number
    ghiChu?: string
  }>
  ungLuongs: Array<{
    bangUngLuongId: number
    maBang: string
    thangNam: string
    soTienDuyet: number
    trangThai: string
    ngayChot?: string
  }>
  kpis: Array<{
    kyDanhGiaId: number
    thang: number
    nam: number
    tongDiem: number
    xepLoai: string
    tienThuong: number
  }>
  thuongPhats: Array<{
    suKienId: number
    loai: 'THUONG' | 'PHAT'
    ten: string
    soTien: number
    ngay: string
    lyDo?: string
  }>
  tongKet: {
    tongLuong: number
    tongThuong: number
    tongPhat: number
    tongKhauTru: number
    tongUng: number
    tongThucNhan: number
  }
}

export interface SoLuongPhongBanData {
  phongBan: {
    id: number
    maPhongBan: string
    tenPhongBan: string
  }
  tongHop: {
    tongThuNhap: number
    tongKhauTru: number
    tongThuong: number
    tongPhat: number
    thucLinh: number
  }
  theoNhanVien: Array<{
    nhanVien: {
      id: number
      maNhanVien: string
      hoTen: string
    }
    tongHop: {
      tongThuNhap: number
      tongKhauTru: number
      tongThuong: number
      tongPhat: number
      thucLinh: number
    }
  }>
}

export const soLuongApi = {
  // Sổ lương nhân viên
  layNhanVien: (nhanVienId: number, params: { tuThang: number; tuNam: number; denThang: number; denNam: number }) => {
    // Chuyển đổi tháng/năm thành tuNgay/denNgay
    const tuNgay = `${params.tuNam}-${String(params.tuThang).padStart(2, '0')}-01`
    const denNgay = new Date(params.denNam, params.denThang, 0).toISOString().split('T')[0] // Ngày cuối tháng
    return api.get(`/so-luong/nhan-vien/${nhanVienId}`, { params: { tuNgay, denNgay } }).then((res) => res.data as SoLuongNhanVienData)
  },
  
  // Sổ lương phòng ban
  layPhongBan: (phongBanId: number, params: { tuThang: number; tuNam: number; denThang: number; denNam: number }) => {
    const tuNgay = `${params.tuNam}-${String(params.tuThang).padStart(2, '0')}-01`
    const denNgay = new Date(params.denNam, params.denThang, 0).toISOString().split('T')[0]
    return api.get(`/so-luong/phong-ban/${phongBanId}`, { params: { tuNgay, denNgay } }).then((res) => res.data as SoLuongPhongBanData)
  },
  
  // Tìm kiếm
  timKiem: (params: { tuKhoa: string; loai?: 'TAT_CA' | 'BANG_LUONG' | 'UNG_LUONG' | 'DIEU_CHINH'; tuNam?: number; denNam?: number }) =>
    api.get('/so-luong/tim-kiem', { params }).then((res) => res.data),
}

export default api
