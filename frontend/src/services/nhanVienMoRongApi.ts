import api from './api';

// =============== TYPES ===============

export interface NhanVienHopDong {
  id: number;
  nhanVienId: number;
  loaiHopDong: 'THU_VIEC' | 'MOT_NAM' | 'BA_NAM' | 'VO_THOI_HAN';
  tuNgay: string;
  denNgay?: string;
  luongCoBan: number;
  luongDongBH?: number;
  heSoLuong?: number;
  trangThai: 'HIEU_LUC' | 'HET_HAN' | 'HUY_BO';
  ghiChu?: string;
  ngayTao: string;
  nhanVien?: { maNhanVien: string; hoTen: string };
}

export interface NhanVienNganHang {
  id: number;
  nhanVienId: number;
  tenNganHang: string;
  soTaiKhoan: string;
  chuTaiKhoan: string;
  chiNhanh?: string;
  laMacDinh: boolean;
  tuNgay?: string;
  denNgay?: string;
  ghiChu?: string;
  ngayTao: string;
}

export interface NhomNhanVien {
  id: number;
  maNhom: string;
  tenNhom: string;
  moTa?: string;
  mauSac?: string;
  trangThai: boolean;
  _count?: { thanhViens: number };
}

export interface NhanVienThuocNhom {
  id: number;
  nhanVienId: number;
  nhomId: number;
  tuNgay?: string;
  denNgay?: string;
  nhom: NhomNhanVien;
}

// =============== HỢP ĐỒNG API ===============

export const layDanhSachHopDong = async (nhanVienId: number): Promise<NhanVienHopDong[]> => {
  const res = await api.get(`/nhan-vien/${nhanVienId}/hop-dong`);
  return res.data;
};

export const layHopDongTheoId = async (id: number): Promise<NhanVienHopDong> => {
  const res = await api.get(`/nhan-vien/hop-dong/${id}`);
  return res.data;
};

export const taoHopDong = async (
  nhanVienId: number,
  data: {
    loaiHopDong: string;
    tuNgay: string;
    denNgay?: string;
    luongCoBan: number;
    luongDongBH?: number;
    heSoLuong?: number;
    ghiChu?: string;
  },
): Promise<NhanVienHopDong> => {
  const res = await api.post(`/nhan-vien/${nhanVienId}/hop-dong`, data);
  return res.data;
};

export const capNhatHopDong = async (
  id: number,
  data: Partial<{
    loaiHopDong: string;
    tuNgay: string;
    denNgay: string;
    luongCoBan: number;
    luongDongBH: number;
    heSoLuong: number;
    trangThai: string;
    ghiChu: string;
  }>,
): Promise<NhanVienHopDong> => {
  const res = await api.put(`/nhan-vien/hop-dong/${id}`, data);
  return res.data;
};

export const ngungHopDong = async (
  id: number,
  data: { ngayKetThuc: string; lyDo?: string },
): Promise<NhanVienHopDong> => {
  const res = await api.post(`/nhan-vien/hop-dong/${id}/ngung`, data);
  return res.data;
};

export const xoaHopDong = async (id: number): Promise<void> => {
  await api.delete(`/nhan-vien/hop-dong/${id}`);
};

// =============== NGÂN HÀNG API ===============

export const layDanhSachNganHang = async (nhanVienId: number): Promise<NhanVienNganHang[]> => {
  const res = await api.get(`/nhan-vien/${nhanVienId}/ngan-hang`);
  return res.data;
};

export const taoNganHang = async (
  nhanVienId: number,
  data: {
    tenNganHang: string;
    soTaiKhoan: string;
    chuTaiKhoan: string;
    chiNhanh?: string;
    laMacDinh?: boolean;
    tuNgay?: string;
    denNgay?: string;
    ghiChu?: string;
  },
): Promise<NhanVienNganHang> => {
  const res = await api.post(`/nhan-vien/${nhanVienId}/ngan-hang`, data);
  return res.data;
};

export const capNhatNganHang = async (
  id: number,
  data: Partial<{
    tenNganHang: string;
    soTaiKhoan: string;
    chuTaiKhoan: string;
    chiNhanh: string;
    laMacDinh: boolean;
  }>,
): Promise<NhanVienNganHang> => {
  const res = await api.put(`/nhan-vien/ngan-hang/${id}`, data);
  return res.data;
};

export const datNganHangMacDinh = async (id: number): Promise<NhanVienNganHang> => {
  const res = await api.post(`/nhan-vien/ngan-hang/${id}/dat-mac-dinh`);
  return res.data;
};

export const xoaNganHang = async (id: number): Promise<void> => {
  await api.delete(`/nhan-vien/ngan-hang/${id}`);
};

// =============== NHÓM NHÂN VIÊN API ===============

export const layDanhSachNhom = async (): Promise<NhomNhanVien[]> => {
  const res = await api.get('/nhom-nhan-vien');
  return res.data;
};

export const layNhomTheoId = async (id: number): Promise<NhomNhanVien> => {
  const res = await api.get(`/nhom-nhan-vien/${id}`);
  return res.data;
};

export const taoNhom = async (data: {
  maNhom: string;
  tenNhom: string;
  moTa?: string;
}): Promise<NhomNhanVien> => {
  const res = await api.post('/nhom-nhan-vien', data);
  return res.data;
};

export const capNhatNhom = async (
  id: number,
  data: Partial<{ maNhom: string; tenNhom: string; moTa: string; trangThai: boolean }>,
): Promise<NhomNhanVien> => {
  const res = await api.put(`/nhom-nhan-vien/${id}`, data);
  return res.data;
};

export const xoaNhom = async (id: number): Promise<void> => {
  await api.delete(`/nhom-nhan-vien/${id}`);
};

// Nhân viên thuộc nhóm
export const layNhomCuaNhanVien = async (nhanVienId: number): Promise<NhanVienThuocNhom[]> => {
  const res = await api.get(`/nhan-vien/${nhanVienId}/nhom`);
  return res.data;
};

export const themVaoNhom = async (
  nhanVienId: number,
  data: { nhomId: number; tuNgay?: string; denNgay?: string },
): Promise<NhanVienThuocNhom> => {
  const res = await api.post(`/nhan-vien/${nhanVienId}/them-vao-nhom`, data);
  return res.data;
};

export const goKhoiNhom = async (
  nhanVienId: number,
  data: { nhomId: number; denNgay?: string },
): Promise<void> => {
  await api.post(`/nhan-vien/${nhanVienId}/go-khoi-nhom`, data);
};

// =============== UTILS ===============

export const loaiHopDongLabel: Record<string, string> = {
  THU_VIEC: 'Thử việc',
  MOT_NAM: '1 năm',
  BA_NAM: '3 năm',
  VO_THOI_HAN: 'Vô thời hạn',
};

export const trangThaiHopDongLabel: Record<string, string> = {
  HIEU_LUC: 'Hiệu lực',
  HET_HAN: 'Hết hạn',
  HUY_BO: 'Hủy bỏ',
};

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
};
