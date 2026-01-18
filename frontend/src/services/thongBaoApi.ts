// API service cho Thông báo - Sprint 6
import api from './api';

// Types
export interface ThongBao {
  id: number;
  loaiThongBao: string;
  tieuDe: string;
  noiDung: string;
  link?: string | null;
  daDoc: boolean;
  ngayDoc?: string | null;
  duLieuThem?: Record<string, any> | null;
  ngayTao: string;
}

export interface DanhSachThongBaoResponse {
  data: ThongBao[];
  total: number;
  page: number;
  limit: number;
  chuaDoc: number;
}

// API calls
export const thongBaoApi = {
  // Lấy danh sách thông báo
  layDanhSach: async (params?: {
    daDoc?: boolean;
    loaiThongBao?: string;
    page?: number;
    limit?: number;
  }): Promise<DanhSachThongBaoResponse> => {
    const res = await api.get('/thong-bao', { params });
    return res.data;
  },

  // Đếm số chưa đọc
  demChuaDoc: async (): Promise<{ chuaDoc: number }> => {
    const res = await api.get('/thong-bao/chua-doc');
    return res.data;
  },

  // Đánh dấu đã đọc
  danhDauDaDoc: async (id: number): Promise<ThongBao> => {
    const res = await api.put(`/thong-bao/${id}/da-doc`);
    return res.data;
  },

  // Đánh dấu tất cả đã đọc
  danhDauTatCaDaDoc: async (): Promise<{ count: number }> => {
    const res = await api.post('/thong-bao/da-doc-tat-ca');
    return res.data;
  },
};

// Helper: Format thời gian tương đối
export const formatTimeAgo = (dateStr: string): string => {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Vừa xong';
  if (diffMins < 60) return `${diffMins} phút trước`;
  if (diffHours < 24) return `${diffHours} giờ trước`;
  if (diffDays < 7) return `${diffDays} ngày trước`;
  
  return date.toLocaleDateString('vi-VN');
};

// Helper: Icon cho loại thông báo
export const getThongBaoIcon = (loai: string): { icon: string; color: string } => {
  switch (loai) {
    case 'YEU_CAU_MOI':
      return { icon: '📋', color: 'text-blue-600' };
    case 'YEU_CAU_DA_DUYET':
      return { icon: '✅', color: 'text-green-600' };
    case 'YEU_CAU_TU_CHOI':
      return { icon: '❌', color: 'text-red-600' };
    case 'NGHI_PHEP_MOI':
      return { icon: '🏖️', color: 'text-blue-600' };
    case 'NGHI_PHEP_DA_DUYET':
      return { icon: '✅', color: 'text-green-600' };
    case 'NGHI_PHEP_TU_CHOI':
      return { icon: '❌', color: 'text-red-600' };
    case 'LICH_PHAN_CA':
      return { icon: '📅', color: 'text-purple-600' };
    case 'PHIEU_LUONG':
      return { icon: '💰', color: 'text-green-600' };
    case 'HE_THONG':
    default:
      return { icon: '🔔', color: 'text-gray-600' };
  }
};
