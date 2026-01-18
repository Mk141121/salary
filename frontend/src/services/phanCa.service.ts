import api from './api';

// Types
export interface LichPhanCa {
  id: number;
  thangNam: string;
  phongBanId: number | null;
  nhomId: number | null;
  tenLich: string | null;
  ghiChu: string | null;
  trangThai: 'NHAP' | 'DA_CONG_BO' | 'HUY';
  ngayCongBo: string | null;
  nguoiCongBo: number | null;
  ngayTao: string;
  _count?: {
    chiTiets: number;
  };
}

export interface LichPhanCaChiTiet {
  id: number;
  lichPhanCaId: number;
  nhanVienId: number;
  ngay: string;
  caLamViecId: number;
  ghiChu: string | null;
  caLamViec: {
    id: number;
    maCa: string;
    tenCa: string;
    gioVao: string;
    gioRa: string;
    mauHienThi: string | null;
  };
}

export interface TaoLichPhanCaPayload {
  thangNam: string;
  phongBanId?: number;
  nhomId?: number;
  tenLich?: string;
  ghiChu?: string;
}

export interface AssignBatchPayload {
  nhanVienIds: number[];
  caLamViecId: number;
  tuNgay: string;
  denNgay: string;
  ngoaiTruThu?: number[];
  ghiChu?: string;
}

export interface CopyTuanPayload {
  tuanNguon: string;
  tuanDich: string;
  nhanVienIds?: number[];
}

export interface CalendarViewParams {
  thangNam: string;
  phongBanId?: number;
  nhomId?: number;
  nhanVienIds?: number[];
}

export interface CalendarViewResponse {
  thangNam: string;
  soNgayTrongThang: number;
  ngayDauThang: number;
  nhanViens: {
    nhanVienId: number;
    maNhanVien: string;
    hoTen: string;
    phongBanId: number;
    ngays: Record<
      string,
      {
        caLamViecId: number;
        maCa: string;
        tenCa: string;
        gioVao: string;
        gioRa: string;
        mauHienThi: string | null;
        ghiChu: string | null;
      }
    >;
  }[];
  danhSachCa: {
    id: number;
    maCa: string;
    tenCa: string;
    gioVao: string;
    gioRa: string;
    isCaDem: boolean;
    mauHienThi: string | null;
  }[];
}

// API functions
export const phanCaService = {
  // Lấy danh sách lịch phân ca
  layDanhSach: async (params?: {
    thangNam?: string;
    phongBanId?: number;
    nhomId?: number;
    trangThai?: string;
  }) => {
    const response = await api.get<{ data: LichPhanCa[]; total: number }>('/phan-ca', {
      params,
    });
    return response.data;
  },

  // Lấy chi tiết lịch phân ca
  layChiTiet: async (id: number) => {
    const response = await api.get<LichPhanCa & { chiTiets: LichPhanCaChiTiet[] }>(
      `/phan-ca/${id}`,
    );
    return response.data;
  },

  // Lấy calendar view
  layCalendarView: async (params: CalendarViewParams) => {
    const response = await api.get<CalendarViewResponse>('/phan-ca/calendar', { params });
    return response.data;
  },

  // Tạo lịch phân ca mới
  tao: async (payload: TaoLichPhanCaPayload) => {
    const response = await api.post<LichPhanCa>('/phan-ca', payload);
    return response.data;
  },

  // Cập nhật lịch phân ca
  capNhat: async (id: number, payload: { tenLich?: string; ghiChu?: string }) => {
    const response = await api.put<LichPhanCa>(`/phan-ca/${id}`, payload);
    return response.data;
  },

  // Assign ca cho 1 ngày
  assignNgay: async (
    lichId: number,
    payload: {
      nhanVienId: number;
      ngay: string;
      caLamViecId: number;
      ghiChu?: string;
    },
  ) => {
    const response = await api.post(`/phan-ca/${lichId}/assign`, payload);
    return response.data;
  },

  // Assign batch
  assignBatch: async (lichId: number, payload: AssignBatchPayload) => {
    const response = await api.post<{ message: string; created: number; updated: number }>(
      `/phan-ca/${lichId}/assign-batch`,
      payload,
    );
    return response.data;
  },

  // Copy tuần
  copyTuan: async (lichId: number, payload: CopyTuanPayload) => {
    const response = await api.post<{ message: string; created: number; updated: number }>(
      `/phan-ca/${lichId}/copy-week`,
      payload,
    );
    return response.data;
  },

  // Publish lịch
  publish: async (id: number) => {
    const response = await api.post<{ message: string; mapped: number; skipped: number }>(
      `/phan-ca/${id}/publish`,
    );
    return response.data;
  },

  // Unpublish
  unpublish: async (id: number) => {
    const response = await api.post(`/phan-ca/${id}/unpublish`);
    return response.data;
  },

  // Xóa lịch
  xoa: async (id: number) => {
    const response = await api.delete(`/phan-ca/${id}`);
    return response.data;
  },

  // Xóa chi tiết
  xoaChiTiet: async (lichId: number, chiTietIds: number[]) => {
    const response = await api.post(`/phan-ca/${lichId}/xoa-chi-tiet`, { chiTietIds });
    return response.data;
  },

  // Lấy lịch làm việc của tôi
  layLichCuaToi: async (tuNgay: string, denNgay: string) => {
    const response = await api.get('/phan-ca/lich-cua-toi', {
      params: { tuNgay, denNgay },
    });
    return response.data;
  },
};
