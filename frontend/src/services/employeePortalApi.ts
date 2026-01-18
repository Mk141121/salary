// Service API cho Employee Portal - Sprint 5
import api from './api';

// =============== TYPES ===============

export interface DashboardData {
  nhanVien: {
    id: number;
    maNhanVien: string;
    hoTen: string;
    avatar?: string;
    phongBan: string;
    chucVu?: string;
  };
  caHomNay?: {
    id: number;
    maCa: string;
    tenCa: string;
    gioVao: string;
    gioRa: string;
    mauHienThi?: string;
  };
  chamCongHomNay?: {
    gioVao?: string;
    gioRa?: string;
    trangThai: 'CHUA_VAO' | 'DA_VAO' | 'DA_RA';
  };
  thongKe: {
    soDonChoDuyet: number;
    soNgayPhepConLai: number;
    soNgayCongThang: number;
  };
  thongBaoMoi: number;
}

export interface LichLamViecItem {
  ngay: string;
  thuTrongTuan: number;
  ca?: {
    id: number;
    maCa: string;
    tenCa: string;
    gioVao: string;
    gioRa: string;
    mauHienThi?: string;
  };
  nghiPhep?: {
    loaiNghi: string;
    trangThai: string;
  };
  yeuCau?: {
    loaiYeuCau: string;
    trangThai: string;
  };
}

export interface ChamCongItem {
  ngay: string;
  gioVaoThucTe?: string;
  gioRaThucTe?: string;
  gioVaoDuKien?: string;
  gioRaDuKien?: string;
  trangThai: string;
  phutDiTre?: number;
  phutVeSom?: number;
  soGioLam?: number;
  ca?: {
    maCa: string;
    tenCa: string;
  };
}

export interface PhieuLuongItem {
  id: number;
  bangLuongId: number;
  kyLuong: string;
  thang: number;
  nam: number;
  tongThuNhap: number;
  tongKhauTru: number;
  thucLinh: number;
  trangThai: string;
  ngayChot?: string;
}

export interface SoDuPhep {
  phepNam: {
    tongSo: number;
    daSuDung: number;
    conLai: number;
  };
  danhSachLoaiNghi: {
    maLoai: string;
    tenLoai: string;
    soNgayDaSuDung: number;
  }[];
}

export interface HoSoNhanVien {
  id: number;
  maNhanVien: string;
  hoTen: string;
  email?: string;
  soDienThoai?: string;
  avatar?: string;
  ngaySinh?: string;
  gioiTinh?: string;
  diaChi?: string;
  cccd?: string;
  ngayVaoLam?: string;
  chucVu?: string;
  phongBan?: { id: number; tenPhongBan: string };
  nganHang?: { id: number; tenNganHang: string };
  soTaiKhoan?: string;
  trangThai: string;
}

// =============== API CALLS ===============

export const employeePortalApi = {
  // Dashboard
  getDashboard: async (): Promise<DashboardData> => {
    const res = await api.get('/employee-portal/dashboard');
    return res.data;
  },

  // Lịch làm việc
  getLichLamViec: async (params?: {
    tuNgay?: string;
    denNgay?: string;
  }): Promise<LichLamViecItem[]> => {
    const res = await api.get('/employee-portal/lich-lam-viec', { params });
    return res.data;
  },

  // Chấm công
  getChamCong: async (params?: {
    thang?: number;
    nam?: number;
  }): Promise<ChamCongItem[]> => {
    const res = await api.get('/employee-portal/cham-cong', { params });
    return res.data;
  },

  // Phiếu lương
  getPhieuLuong: async (params?: {
    nam?: number;
    page?: number;
    limit?: number;
  }): Promise<{ data: PhieuLuongItem[]; total: number }> => {
    const res = await api.get('/employee-portal/phieu-luong', { params });
    return res.data;
  },

  // Chi tiết phiếu lương
  getChiTietPhieuLuong: async (id: number) => {
    const res = await api.get(`/employee-portal/phieu-luong/${id}`);
    return res.data;
  },

  // Số dư phép
  getSoDuPhep: async (): Promise<SoDuPhep> => {
    const res = await api.get('/employee-portal/so-du-phep');
    return res.data;
  },

  // Hồ sơ
  getHoSo: async (): Promise<HoSoNhanVien> => {
    const res = await api.get('/employee-portal/ho-so');
    return res.data;
  },

  // Check-in
  checkIn: async (): Promise<{
    success: boolean;
    message: string;
    data: { gioVao: string; phutDiTre?: number; chamCongId: number };
  }> => {
    const res = await api.post('/employee-portal/check-in');
    return res.data;
  },

  // Check-out
  checkOut: async (): Promise<{
    success: boolean;
    message: string;
    data: { gioVao?: string; gioRa: string; soGioLam: number; phutVeSom?: number; chamCongId: number };
  }> => {
    const res = await api.post('/employee-portal/check-out');
    return res.data;
  },
};

// =============== HELPERS ===============

export const getThuLabel = (thu: number): string => {
  const labels = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
  return labels[thu] || '';
};

export const getThuFullLabel = (thu: number): string => {
  const labels = ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'];
  return labels[thu] || '';
};

export const formatTime = (isoString?: string): string => {
  if (!isoString) return '--:--';
  const date = new Date(isoString);
  return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
};

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('vi-VN').format(value) + 'đ';
};
