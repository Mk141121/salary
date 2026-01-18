// Service API cho module Yêu cầu (Request) - Sprint 4
import api from './api';

// =============== TYPES ===============

export type TrangThaiDonYeuCau =
  | 'NHAP'
  | 'CHO_DUYET_1'
  | 'CHO_DUYET_2'
  | 'DA_DUYET'
  | 'TU_CHOI'
  | 'HUY';

export interface LoaiYeuCau {
  id: number;
  maLoai: string;
  tenLoai: string;
  moTa: string | null;
  nhomLoai: string;
  yeuCauGioBatDau: boolean;
  yeuCauGioKetThuc: boolean;
  yeuCauDiaDiem: boolean;
  coTinhOT: boolean;
  thuTuHienThi: number;
  isActive: boolean;
  mauHienThi: string | null;
  icon: string | null;
}

export interface DonYeuCau {
  id: number;
  maDon: string;
  nhanVienId: number;
  phongBanId: number;
  loaiYeuCauId: number;
  ngayYeuCau: string;
  gioBatDau: string | null;
  gioKetThuc: string | null;
  soGio: number | null;
  diaDiem: string | null;
  lyDo: string;
  tepDinhKemUrl: string | null;
  trangThai: TrangThaiDonYeuCau;
  nguoiDuyet1Id: number | null;
  ngayDuyet1: string | null;
  ghiChuDuyet1: string | null;
  nguoiDuyet2Id: number | null;
  ngayDuyet2: string | null;
  ghiChuDuyet2: string | null;
  lyDoTuChoi: string | null;
  isOverride: boolean;
  lyDoOverride: string | null;
  ngayTao: string;
  // Relations
  nhanVien?: {
    id: number;
    maNhanVien: string;
    hoTen: string;
    email?: string;
  };
  phongBan?: {
    id: number;
    maPhongBan: string;
    tenPhongBan: string;
  };
  loaiYeuCau?: {
    id: number;
    maLoai: string;
    tenLoai: string;
    mauHienThi: string | null;
    icon: string | null;
  };
  nguoiDuyet1?: { id: number; hoTen: string };
  nguoiDuyet2?: { id: number; hoTen: string };
  nguoiOverride?: { id: number; hoTen: string };
}

export interface WorkflowConfig {
  id: number;
  loaiYeuCauId: number;
  phongBanId: number | null;
  soCap: number;
  nguoiDuyet1: string;
  nguoiDuyetCuThe1Id: number | null;
  nguoiDuyet2: string | null;
  nguoiDuyetCuThe2Id: number | null;
  tuDongDuyetNeuQuaHan: boolean;
  soNgayQuaHan: number | null;
  yeuCauLyDoTuChoi: boolean;
  yeuCauLyDoOverride: boolean;
  isActive: boolean;
  loaiYeuCau?: {
    maLoai: string;
    tenLoai: string;
  };
}

export interface TaoDonYeuCauPayload {
  nhanVienId: number;
  loaiYeuCauId: number;
  ngayYeuCau: string;
  gioBatDau?: string;
  gioKetThuc?: string;
  diaDiem?: string;
  lyDo: string;
  tepDinhKemUrl?: string;
}

export interface LocDonYeuCauParams {
  nhanVienId?: number;
  phongBanId?: number;
  loaiYeuCauId?: number;
  trangThai?: TrangThaiDonYeuCau;
  tuNgay?: string;
  denNgay?: string;
  page?: number;
  limit?: number;
}

// =============== HELPERS ===============

export const getTrangThaiLabel = (trangThai: TrangThaiDonYeuCau): string => {
  const labels: Record<TrangThaiDonYeuCau, string> = {
    NHAP: 'Nháp',
    CHO_DUYET_1: 'Chờ duyệt (Cấp 1)',
    CHO_DUYET_2: 'Chờ duyệt (Cấp 2)',
    DA_DUYET: 'Đã duyệt',
    TU_CHOI: 'Từ chối',
    HUY: 'Đã hủy',
  };
  return labels[trangThai] || trangThai;
};

export const getTrangThaiColor = (trangThai: TrangThaiDonYeuCau): string => {
  const colors: Record<TrangThaiDonYeuCau, string> = {
    NHAP: 'bg-gray-100 text-gray-700',
    CHO_DUYET_1: 'bg-yellow-100 text-yellow-700',
    CHO_DUYET_2: 'bg-orange-100 text-orange-700',
    DA_DUYET: 'bg-green-100 text-green-700',
    TU_CHOI: 'bg-red-100 text-red-700',
    HUY: 'bg-gray-100 text-gray-500',
  };
  return colors[trangThai] || 'bg-gray-100 text-gray-700';
};

export const getLoaiYeuCauIcon = (maLoai: string): string => {
  const icons: Record<string, string> = {
    OT: '⏰',
    TRE_GIO: '🕐',
    VE_SOM: '🕑',
    CONG_TAC: '🚗',
    LAM_TU_XA: '🏠',
  };
  return icons[maLoai] || '📋';
};

// =============== API ===============

export const yeuCauApi = {
  // ===== Loại yêu cầu =====
  layDanhSachLoai: async (all?: boolean) => {
    const response = await api.get<LoaiYeuCau[]>('/yeu-cau/loai', {
      params: { all: all ? 'true' : undefined },
    });
    return response.data;
  },

  layLoai: async (id: number) => {
    const response = await api.get<LoaiYeuCau>(`/yeu-cau/loai/${id}`);
    return response.data;
  },

  taoLoai: async (data: Partial<LoaiYeuCau>) => {
    const response = await api.post<LoaiYeuCau>('/yeu-cau/loai', data);
    return response.data;
  },

  capNhatLoai: async (id: number, data: Partial<LoaiYeuCau>) => {
    const response = await api.put<LoaiYeuCau>(`/yeu-cau/loai/${id}`, data);
    return response.data;
  },

  toggleLoai: async (id: number) => {
    const response = await api.post<LoaiYeuCau>(`/yeu-cau/loai/${id}/toggle`);
    return response.data;
  },

  // ===== Đơn yêu cầu =====
  layDanhSachDon: async (params?: LocDonYeuCauParams) => {
    const response = await api.get<{
      data: DonYeuCau[];
      pagination: { page: number; limit: number; total: number; totalPages: number };
    }>('/yeu-cau/don', { params });
    return response.data;
  },

  layDonCuaToi: async (params?: LocDonYeuCauParams) => {
    const response = await api.get<{
      data: DonYeuCau[];
      pagination: { page: number; limit: number; total: number; totalPages: number };
    }>('/yeu-cau/don/cua-toi', { params });
    return response.data;
  },

  layChiTietDon: async (id: number) => {
    const response = await api.get<DonYeuCau>(`/yeu-cau/don/${id}`);
    return response.data;
  },

  taoDon: async (data: TaoDonYeuCauPayload) => {
    const response = await api.post<DonYeuCau>('/yeu-cau/don', data);
    return response.data;
  },

  capNhatDon: async (id: number, data: Partial<TaoDonYeuCauPayload>) => {
    const response = await api.put<DonYeuCau>(`/yeu-cau/don/${id}`, data);
    return response.data;
  },

  guiDuyet: async (id: number) => {
    const response = await api.post<DonYeuCau>(`/yeu-cau/don/${id}/gui-duyet`);
    return response.data;
  },

  duyetCap1: async (id: number, ghiChu?: string) => {
    const response = await api.post<DonYeuCau>(`/yeu-cau/don/${id}/duyet-cap-1`, { ghiChu });
    return response.data;
  },

  duyetCap2: async (id: number, ghiChu?: string) => {
    const response = await api.post<DonYeuCau>(`/yeu-cau/don/${id}/duyet-cap-2`, { ghiChu });
    return response.data;
  },

  tuChoiCap1: async (id: number, lyDoTuChoi: string) => {
    const response = await api.post<DonYeuCau>(`/yeu-cau/don/${id}/tu-choi-cap-1`, { lyDoTuChoi });
    return response.data;
  },

  tuChoiCap2: async (id: number, lyDoTuChoi: string) => {
    const response = await api.post<DonYeuCau>(`/yeu-cau/don/${id}/tu-choi-cap-2`, { lyDoTuChoi });
    return response.data;
  },

  override: async (id: number, lyDoOverride: string, duyet: boolean) => {
    const response = await api.post<DonYeuCau>(`/yeu-cau/don/${id}/override`, {
      lyDoOverride,
      duyet,
    });
    return response.data;
  },

  huyDon: async (id: number) => {
    const response = await api.post<DonYeuCau>(`/yeu-cau/don/${id}/huy`);
    return response.data;
  },

  // ===== Inbox =====
  layInboxCap1: async (params?: LocDonYeuCauParams) => {
    const response = await api.get<{
      data: DonYeuCau[];
      pagination: { page: number; limit: number; total: number; totalPages: number };
    }>('/yeu-cau/inbox/cap-1', { params });
    return response.data;
  },

  layInboxCap2: async (params?: LocDonYeuCauParams) => {
    const response = await api.get<{
      data: DonYeuCau[];
      pagination: { page: number; limit: number; total: number; totalPages: number };
    }>('/yeu-cau/inbox/cap-2', { params });
    return response.data;
  },

  duyetBatch: async (ids: number[], cap: 1 | 2, ghiChu?: string) => {
    const response = await api.post<{ success: number; failed: number; errors: string[] }>(
      '/yeu-cau/inbox/duyet-batch',
      { ids, cap, ghiChu },
    );
    return response.data;
  },

  // ===== Workflow Config =====
  layDanhSachWorkflowConfig: async (loaiYeuCauId?: number, phongBanId?: number) => {
    const response = await api.get<WorkflowConfig[]>('/yeu-cau/workflow-config', {
      params: { loaiYeuCauId, phongBanId },
    });
    return response.data;
  },

  taoWorkflowConfig: async (data: Partial<WorkflowConfig>) => {
    const response = await api.post<WorkflowConfig>('/yeu-cau/workflow-config', data);
    return response.data;
  },

  capNhatWorkflowConfig: async (id: number, data: Partial<WorkflowConfig>) => {
    const response = await api.put<WorkflowConfig>(`/yeu-cau/workflow-config/${id}`, data);
    return response.data;
  },
};

export default yeuCauApi;
