// Timesheet API Service - Sprint 9
import api from './api';

// ===== TYPES =====

export interface TimesheetQueryParams {
  thang: number;
  nam: number;
  phongBanId?: number;
  nhanVienId?: number;
  search?: string;
  page?: number;
  limit?: number;
}

export interface TimesheetNgay {
  ngay: string;
  thuTrongTuan: number;
  loaiNgay: string;
  trangThai: string;
  gioVao?: string;
  gioRa?: string;
  gioVaoDuKien?: string;
  gioRaDuKien?: string;
  caLamViec?: { id: number; tenCa: string };
  soGioLam: number;
  soGioOT: number;
  phutDiTre?: number;
  phutVeSom?: number;
  ghiChu?: string;
  coYeuCauSuaCong?: boolean;
}

export interface TongKetTimesheet {
  soNgayDiLam: number;
  soNgayNghi: number;
  soNgayPhep: number;
  soGioLam: number;
  soGioOT: number;
  soLanDiTre: number;
  soLanVeSom: number;
  tongPhutDiTre: number;
  tongPhutVeSom: number;
}

export interface TimesheetNhanVien {
  nhanVienId: number;
  hoTen: string;
  maNhanVien: string;
  phongBan?: { id: number; tenPhongBan: string };
  chiTiet: TimesheetNgay[];
  tongKet: TongKetTimesheet;
}

export interface ThongKeTimesheet {
  thang: number;
  nam: number;
  tongNhanVien: number;
  tongNgayCong: number;
  tongNgayNghi: number;
  tongNgayPhep: number;
  tongGioOT: number;
  tongLanDiTre: number;
  tongLanVeSom: number;
  yeuCauSuaCong: {
    choDuyet: number;
    daDuyet: number;
    tuChoi: number;
  };
}

export interface TimesheetResponse {
  data: TimesheetNhanVien[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  thongKe: ThongKeTimesheet;
}

export interface YeuCauSuaCong {
  id: number;
  nhanVienId: number;
  ngayChamCong: string;
  gioVaoCu?: string;
  gioRaCu?: string;
  trangThaiCu?: string;
  gioVaoMoi?: string;
  gioRaMoi?: string;
  trangThaiMoi?: string;
  lyDo: string;
  bangChung?: string[];
  trangThaiDuyet: 'CHO_DUYET' | 'DA_DUYET' | 'TU_CHOI';
  nguoiDuyetId?: number;
  ngayDuyet?: string;
  lyDoTuChoi?: string;
  nguoiTaoId: number;
  ngayTao: string;
  nhanVien?: { id: number; hoTen: string; maNhanVien: string };
  nguoiTao?: { id: number; hoTen: string };
  nguoiDuyet?: { id: number; hoTen: string };
}

export interface TaoYeuCauSuaCongPayload {
  nhanVienId: number;
  ngayChamCong: string;
  gioVaoMoi?: string;
  gioRaMoi?: string;
  trangThaiMoi?: string;
  lyDo: string;
  bangChung?: string[];
}

export interface DuyetYeuCauSuaCongPayload {
  trangThaiDuyet: 'DA_DUYET' | 'TU_CHOI';
  lyDoTuChoi?: string;
}

export interface SuaCongTrucTiepPayload {
  nhanVienId: number;
  ngayChamCong: string;
  gioVao?: string;
  gioRa?: string;
  trangThai?: string;
  loaiNgay?: string;
  ghiChu?: string;
}

export interface LichSuSuaCong {
  id: number;
  nhanVienId: number;
  ngayChamCong: string;
  truongThayDoi: string;
  giaTriCu?: string;
  giaTriMoi?: string;
  nguonThayDoi: string;
  yeuCauSuaCongId?: number;
  nguoiThucHienId: number;
  ghiChu?: string;
  ngayTao: string;
  nhanVien?: { id: number; hoTen: string; maNhanVien: string };
  nguoiThucHien?: { id: number; hoTen: string };
}

// ===== API FUNCTIONS =====

/**
 * Lấy bảng công tháng
 */
export const layBangCongThang = async (params: TimesheetQueryParams): Promise<TimesheetResponse> => {
  const response = await api.get('/timesheet', { params });
  return response.data;
};

/**
 * Lấy bảng công của 1 nhân viên
 */
export const layBangCongNhanVien = async (
  nhanVienId: number,
  thang: number,
  nam: number
): Promise<TimesheetNhanVien> => {
  const response = await api.get(`/timesheet/nhan-vien/${nhanVienId}`, {
    params: { thang, nam },
  });
  return response.data;
};

/**
 * Lấy thống kê timesheet
 */
export const layThongKeTimesheet = async (
  thang: number,
  nam: number,
  phongBanId?: number
): Promise<ThongKeTimesheet> => {
  const response = await api.get('/timesheet/thong-ke', {
    params: { thang, nam, phongBanId },
  });
  return response.data;
};

/**
 * Lấy danh sách yêu cầu sửa công
 */
export const layDanhSachYeuCauSuaCong = async (params: {
  nhanVienId?: number;
  phongBanId?: number;
  trangThaiDuyet?: string;
  tuNgay?: string;
  denNgay?: string;
  page?: number;
  limit?: number;
}): Promise<{
  data: YeuCauSuaCong[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}> => {
  const response = await api.get('/timesheet/yeu-cau-sua-cong', { params });
  return response.data;
};

/**
 * Tạo yêu cầu sửa công
 */
export const taoYeuCauSuaCong = async (payload: TaoYeuCauSuaCongPayload): Promise<YeuCauSuaCong> => {
  const response = await api.post('/timesheet/yeu-cau-sua-cong', payload);
  return response.data;
};

/**
 * Duyệt yêu cầu sửa công
 */
export const duyetYeuCauSuaCong = async (
  id: number,
  payload: DuyetYeuCauSuaCongPayload
): Promise<YeuCauSuaCong> => {
  const response = await api.post(`/timesheet/yeu-cau-sua-cong/${id}/duyet`, payload);
  return response.data;
};

/**
 * Sửa công trực tiếp (HR)
 */
export const suaCongTrucTiep = async (payload: SuaCongTrucTiepPayload): Promise<TimesheetNgay> => {
  const response = await api.put('/timesheet/sua-cong-truc-tiep', payload);
  return response.data;
};

/**
 * Lấy lịch sử sửa công
 */
export const layLichSuSuaCong = async (params: {
  nhanVienId?: number;
  tuNgay?: string;
  denNgay?: string;
  page?: number;
  limit?: number;
}): Promise<{
  data: LichSuSuaCong[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}> => {
  const response = await api.get('/timesheet/lich-su-sua-cong', { params });
  return response.data;
};

/**
 * Lấy lịch sử sửa công của 1 nhân viên
 */
export const layLichSuSuaCongNhanVien = async (
  nhanVienId: number,
  params: {
    tuNgay?: string;
    denNgay?: string;
    page?: number;
    limit?: number;
  }
): Promise<{
  data: LichSuSuaCong[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}> => {
  const response = await api.get(`/timesheet/lich-su-sua-cong/nhan-vien/${nhanVienId}`, { params });
  return response.data;
};

export default {
  layBangCongThang,
  layBangCongNhanVien,
  layThongKeTimesheet,
  layDanhSachYeuCauSuaCong,
  taoYeuCauSuaCong,
  duyetYeuCauSuaCong,
  suaCongTrucTiep,
  layLichSuSuaCong,
  layLichSuSuaCongNhanVien,
};
