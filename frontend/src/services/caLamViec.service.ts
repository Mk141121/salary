import api from './api';

// Types
export interface CaLamViec {
  id: number;
  maCa: string;
  tenCa: string;
  gioVao: string;
  gioRa: string;
  nghiGiuaCaPhut: number;
  graceInPhut: number;
  graceLatePhut: number;
  isCaDem: boolean;
  phongBanId: number | null;
  moTa: string | null;
  mauHienThi: string | null;
  trangThai: boolean;
  ngayTao: string;
  ngayCapNhat: string;
}

export interface TaoCaLamViecPayload {
  maCa: string;
  tenCa: string;
  gioVao: string;
  gioRa: string;
  nghiGiuaCaPhut?: number;
  graceInPhut?: number;
  graceLatePhut?: number;
  isCaDem?: boolean;
  phongBanId?: number;
  moTa?: string;
  mauHienThi?: string;
}

export interface CapNhatCaLamViecPayload {
  tenCa?: string;
  gioVao?: string;
  gioRa?: string;
  nghiGiuaCaPhut?: number;
  graceInPhut?: number;
  graceLatePhut?: number;
  isCaDem?: boolean;
  phongBanId?: number;
  moTa?: string;
  mauHienThi?: string;
  trangThai?: boolean;
}

export interface LocCaLamViecParams {
  phongBanId?: number;
  trangThai?: boolean;
  isCaDem?: boolean;
  tuKhoa?: string;
}

// API functions
export const caLamViecService = {
  // Lấy danh sách ca làm việc
  layDanhSach: async (params?: LocCaLamViecParams) => {
    const response = await api.get<{ data: CaLamViec[]; total: number }>('/ca-lam-viec', {
      params,
    });
    return response.data;
  },

  // Lấy danh sách ca active cho dropdown
  layDanhSachActive: async (phongBanId?: number) => {
    const response = await api.get<CaLamViec[]>('/ca-lam-viec/active', {
      params: { phongBanId },
    });
    return response.data;
  },

  // Lấy chi tiết ca
  layChiTiet: async (id: number) => {
    const response = await api.get<CaLamViec>(`/ca-lam-viec/${id}`);
    return response.data;
  },

  // Tạo ca mới
  tao: async (payload: TaoCaLamViecPayload) => {
    const response = await api.post<CaLamViec>('/ca-lam-viec', payload);
    return response.data;
  },

  // Cập nhật ca
  capNhat: async (id: number, payload: CapNhatCaLamViecPayload) => {
    const response = await api.put<CaLamViec>(`/ca-lam-viec/${id}`, payload);
    return response.data;
  },

  // Xóa ca
  xoa: async (id: number) => {
    const response = await api.delete(`/ca-lam-viec/${id}`);
    return response.data;
  },

  // Toggle trạng thái
  toggleTrangThai: async (id: number) => {
    const response = await api.patch<CaLamViec>(`/ca-lam-viec/${id}/toggle`);
    return response.data;
  },
};
