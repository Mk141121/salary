import api from './api';

// Types
export interface ChiaHangRow {
  maNhanVien: string;
  ngay: string; // YYYY-MM-DD
  sanPhamDat: number;
  sanPhamLoi: number;
  tongSanPham: number;
}

export interface GiaoHangRow {
  maNhanVien: string;
  ngay: string; // YYYY-MM-DD
  khoiLuong: number;
  donGia: number;
  phatTre: number;
  phatKhongLayPhieu: number;
}

export interface PreviewResult<T> {
  hopLe: T[];
  khongHopLe: { row: T; lyDo: string }[];
  tongHopLe: number;
  tongKhongHopLe: number;
}

export interface ConfirmResult {
  success: boolean;
  inserted: number;
  updated: number;
  lichSuImportId: number;
}

export interface SanLuongChiaHang {
  id: number;
  nhanVienId: number;
  nhanVien: { maNhanVien: string; hoTen: string };
  ngay: string;
  sanPhamDat: number;
  sanPhamLoi: number;
  tongSanPham: number;
  quyDoiSanPham: number;
  tienSanLuong: number;
  nguon: string;
  lichSuImportId?: number;
  createdAt: string;
  updatedAt: string;
}

export interface GiaoHang {
  id: number;
  nhanVienId: number;
  nhanVien: { maNhanVien: string; hoTen: string };
  ngay: string;
  khoiLuong: number;
  donGia: number;
  phatTre: number;
  phatKhongLayPhieu: number;
  tienGiaoHang: number;
  nguon: string;
  lichSuImportId?: number;
  createdAt: string;
  updatedAt: string;
}

export interface LichSuImport {
  id: number;
  loai: 'CHIA_HANG' | 'GIAO_HANG';
  tenFile: string;
  thoiGianImport: string;
  nguoiImportId: number;
  nguoiImport: { hoTen: string };
  soLuongDong: number;
  soDongThanhCong: number;
  soDongThatBai: number;
  trangThai: 'THANH_CONG' | 'THAT_BAI';
  fileHash?: string;
  ghiChu?: string;
}

export interface QuerySanLuongParams {
  nhanVienId?: number;
  tuNgay?: string;
  denNgay?: string;
  thang?: number;
  nam?: number;
  page?: number;
  limit?: number;
}

export interface QueryLichSuImportParams {
  loai?: 'CHIA_HANG' | 'GIAO_HANG';
  tuNgay?: string;
  denNgay?: string;
  trangThai?: 'THANH_CONG' | 'THAT_BAI';
  page?: number;
  limit?: number;
}

// =============== CHIA HÀNG ===============

/**
 * Preview import chia hàng
 */
export const previewChiaHang = async (
  rows: ChiaHangRow[],
  thang: number,
  nam: number,
): Promise<PreviewResult<ChiaHangRow>> => {
  const res = await api.post('/san-luong/chia-hang/preview', { rows, thang, nam });
  return res.data;
};

/**
 * Confirm import chia hàng
 */
export const confirmChiaHang = async (
  rows: ChiaHangRow[],
  tenFile: string,
  fileHash: string,
): Promise<ConfirmResult> => {
  const res = await api.post('/san-luong/chia-hang/confirm', { rows, tenFile, fileHash });
  return res.data;
};

/**
 * Lấy danh sách sản lượng chia hàng
 */
export const layDanhSachChiaHang = async (
  params: QuerySanLuongParams,
): Promise<{ items: SanLuongChiaHang[]; total: number }> => {
  const res = await api.get('/san-luong/chia-hang', { params });
  return res.data;
};

/**
 * Admin sửa sản lượng chia hàng
 */
export const adminSuaChiaHang = async (
  id: number,
  data: { sanPhamDat?: number; sanPhamLoi?: number; tongSanPham?: number; lyDo: string },
): Promise<SanLuongChiaHang> => {
  const res = await api.put(`/san-luong/admin/chia-hang/${id}`, data);
  return res.data;
};

// =============== GIAO HÀNG ===============

/**
 * Preview import giao hàng
 */
export const previewGiaoHang = async (
  rows: GiaoHangRow[],
  thang: number,
  nam: number,
): Promise<PreviewResult<GiaoHangRow>> => {
  const res = await api.post('/san-luong/giao-hang/preview', { rows, thang, nam });
  return res.data;
};

/**
 * Confirm import giao hàng
 */
export const confirmGiaoHang = async (
  rows: GiaoHangRow[],
  tenFile: string,
  fileHash: string,
): Promise<ConfirmResult> => {
  const res = await api.post('/san-luong/giao-hang/confirm', { rows, tenFile, fileHash });
  return res.data;
};

/**
 * Lấy danh sách giao hàng
 */
export const layDanhSachGiaoHang = async (
  params: QuerySanLuongParams,
): Promise<{ items: GiaoHang[]; total: number }> => {
  const res = await api.get('/san-luong/giao-hang', { params });
  return res.data;
};

/**
 * Admin sửa giao hàng
 */
export const adminSuaGiaoHang = async (
  id: number,
  data: {
    khoiLuong?: number;
    donGia?: number;
    phatTre?: number;
    phatKhongLayPhieu?: number;
    lyDo: string;
  },
): Promise<GiaoHang> => {
  const res = await api.put(`/san-luong/admin/giao-hang/${id}`, data);
  return res.data;
};

// =============== LỊCH SỬ IMPORT ===============

/**
 * Lấy lịch sử import
 */
export const layLichSuImport = async (
  params: QueryLichSuImportParams,
): Promise<{ items: LichSuImport[]; total: number }> => {
  const res = await api.get('/san-luong/lich-su-import', { params });
  return res.data;
};

/**
 * Lấy chi tiết lịch sử import
 */
export const layLichSuImportTheoId = async (id: number): Promise<LichSuImport> => {
  const res = await api.get(`/san-luong/lich-su-import/${id}`);
  return res.data;
};

// =============== SNAPSHOT ===============

/**
 * Tạo snapshot sản lượng cho bảng lương
 */
export const taoSnapshotSanLuong = async (
  bangLuongId: number,
  thang: number,
  nam: number,
): Promise<{ chiaHang: number; giaoHang: number }> => {
  const res = await api.post(`/san-luong/snapshot/${bangLuongId}`, { thang, nam });
  return res.data;
};

/**
 * Lấy snapshot sản lượng cho Rule Engine
 */
export const laySnapshotSanLuong = async (
  bangLuongId: number,
  nhanVienId: number,
): Promise<{
  chiaHang: SanLuongChiaHang[];
  giaoHang: GiaoHang[];
  tongTienChiaHang: number;
  tongTienGiaoHang: number;
}> => {
  const res = await api.get(`/san-luong/snapshot/${bangLuongId}/${nhanVienId}`);
  return res.data;
};

// =============== UTILS ===============

/**
 * Parse Excel file to JSON using xlsx library
 */
export const parseExcelToChiaHang = async (file: File): Promise<ChiaHangRow[]> => {
  const { read, utils } = await import('xlsx');
  const buffer = await file.arrayBuffer();
  const wb = read(buffer, { type: 'array' });
  const ws = wb.Sheets[wb.SheetNames[0]];
  const data = utils.sheet_to_json<Record<string, unknown>>(ws);

  return data.map((row) => ({
    maNhanVien: String(row['Mã NV'] || row['MaNhanVien'] || row['maNhanVien'] || ''),
    ngay: parseExcelDate(row['Ngày'] || row['ngay']),
    sanPhamDat: Number(row['SP Đạt'] || row['sanPhamDat'] || 0),
    sanPhamLoi: Number(row['SP Lỗi'] || row['sanPhamLoi'] || 0),
    tongSanPham: Number(row['Tổng SP'] || row['tongSanPham'] || 0),
  }));
};

/**
 * Parse Excel file to JSON for Giao Hàng
 */
export const parseExcelToGiaoHang = async (file: File): Promise<GiaoHangRow[]> => {
  const { read, utils } = await import('xlsx');
  const buffer = await file.arrayBuffer();
  const wb = read(buffer, { type: 'array' });
  const ws = wb.Sheets[wb.SheetNames[0]];
  const data = utils.sheet_to_json<Record<string, unknown>>(ws);

  return data.map((row) => ({
    maNhanVien: String(row['Mã NV'] || row['MaNhanVien'] || row['maNhanVien'] || ''),
    ngay: parseExcelDate(row['Ngày'] || row['ngay']),
    khoiLuong: Number(row['Khối lượng'] || row['khoiLuong'] || 0),
    donGia: Number(row['Đơn giá'] || row['donGia'] || 0),
    phatTre: Number(row['Phạt trễ'] || row['phatTre'] || 0),
    phatKhongLayPhieu: Number(row['Phạt KL phiếu'] || row['phatKhongLayPhieu'] || 0),
  }));
};

/**
 * Parse Excel date value
 */
function parseExcelDate(value: unknown): string {
  if (!value) return '';
  if (typeof value === 'number') {
    // Excel serial date
    const date = new Date((value - 25569) * 86400 * 1000);
    return date.toISOString().split('T')[0];
  }
  if (typeof value === 'string') {
    // Try to parse dd/MM/yyyy
    const parts = value.split('/');
    if (parts.length === 3) {
      const [day, month, year] = parts;
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    }
    // Already yyyy-MM-dd format
    if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
      return value;
    }
  }
  return String(value);
}

/**
 * Calculate file hash for duplicate detection
 */
export const calculateFileHash = async (file: File): Promise<string> => {
  const buffer = await file.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
};
