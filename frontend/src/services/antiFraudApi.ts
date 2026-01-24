// API Service cho Anti-fraud - Sprint 7
// GPS + Geofence management
import axios from 'axios';

const AUTH_STORAGE_KEY = 'tinh_luong_auth';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor để tự động thêm token vào header
api.interceptors.request.use(
  (config) => {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY);
    if (stored) {
      try {
        const data = JSON.parse(stored);
        if (data.token) {
          config.headers.Authorization = `Bearer ${data.token}`;
        }
      } catch {
        // Ignore parse errors
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// =============== INTERFACES ===============

export interface Geofence {
  id: number;
  tenDiaDiem: string;
  diaChi?: string;
  viDo: number;
  kinhDo: number;
  banKinhMet: number;
  phongBanId?: number;
  apDungTatCa: boolean;
  batBuocGPS: boolean;
  chanNgoaiVung: boolean;
  trangThai: boolean;
  ngayTao: string;
  ngayCapNhat: string;
}

export interface TaoGeofenceDto {
  tenDiaDiem: string;
  diaChi?: string;
  viDo: number;
  kinhDo: number;
  banKinhMet: number;
  phongBanId?: number;
  apDungTatCa: boolean;
  batBuocGPS: boolean;
  chanNgoaiVung: boolean;
}

export interface CapNhatGeofenceDto {
  tenDiaDiem?: string;
  diaChi?: string;
  viDo?: number;
  kinhDo?: number;
  banKinhMet?: number;
  phongBanId?: number;
  apDungTatCa?: boolean;
  batBuocGPS?: boolean;
  chanNgoaiVung?: boolean;
  trangThai?: boolean;
}

export interface GPSCheckinDto {
  loaiChamCong: 'CHECK_IN' | 'CHECK_OUT';
  viDo?: number;
  kinhDo?: number;
  doChinhXacMet?: number;
  deviceId?: string;
}

export interface GPSCheckinResponse {
  success: boolean;
  message: string;
  trangThai: 'HOP_LE' | 'NGOAI_VUNG' | 'KHONG_CO_GPS' | 'CANH_BAO';
  trongVung?: boolean;
  khoangCachMet?: number;
  geofence?: {
    id: number;
    tenDiaDiem: string;
    banKinhMet: number;
  };
  bangGhi: {
    id: number;
    thoiGian: string;
    loaiChamCong: string;
  };
}

export interface GPSLog {
  id: number;
  nhanVienId: number;
  thoiGian: string;
  loaiChamCong: string;
  viDo?: number;
  kinhDo?: number;
  doChinhXacMet?: number;
  geofenceId?: number;
  khoangCachMet?: number;
  trongVung?: boolean;
  trangThai: string;
  ghiChu?: string;
  deviceId?: string;
  geofence?: {
    id: number;
    tenDiaDiem: string;
  };
}

export interface GPSLogQuery {
  nhanVienId?: number;
  tuNgay?: string;
  denNgay?: string;
  trangThai?: string;
  page?: number;
  limit?: number;
}

export interface GPSThongKe {
  tuNgay: string;
  denNgay: string;
  phongBanId?: number;
  thongKe: {
    tongBanGhi: number;
    hopLe: number;
    ngoaiVung: number;
    canhBao: number;
    khongGPS: number;
    tyLeHopLe: number;
  };
}

// =============== SPRINT 8: DEVICE BINDING INTERFACES ===============

export interface ThietBiNhanVien {
  id: number;
  nhanVienId: number;
  deviceId: string;
  tenThietBi?: string;
  userAgent?: string;
  platform?: string;
  ipAddress?: string;
  trangThai: string;
  ngayDangKy: string;
  lanDangNhapCuoi?: string;
  nguoiResetId?: number;
  lyDoReset?: string;
  ngayReset?: string;
  nhanVien?: {
    id: number;
    hoTen: string;
    maNhanVien: string;
    phongBan?: { id: number; tenPhongBan: string };
  };
}

export interface BindDeviceDto {
  deviceId: string;
  tenThietBi?: string;
  platform?: string;
}

export interface ResetDeviceDto {
  nhanVienId: number;
  lyDo: string;
}

export interface DeviceQuery {
  phongBanId?: number;
  trangThai?: string;
  search?: string;
  page?: number;
  limit?: number;
}

export interface LichSuThietBi {
  id: number;
  nhanVienId: number;
  hanhDong: string;
  deviceIdCu?: string;
  deviceIdMoi?: string;
  nguoiThucHienId?: number;
  lyDo?: string;
  ipAddress?: string;
  userAgent?: string;
  ngayTao: string;
  nhanVien?: { id: number; hoTen: string; maNhanVien: string };
  nguoiThucHien?: { id: number; hoTen: string };
}

export interface LichSuThietBiQuery {
  nhanVienId?: number;
  hanhDong?: string;
  tuNgay?: string;
  denNgay?: string;
  page?: number;
  limit?: number;
}

export interface DeviceCheckResult {
  isValid: boolean;
  isBound: boolean;
  message: string;
  thietBi?: ThietBiNhanVien;
}

// =============== API CALLS ===============

export const antiFraudApi = {
  // Geofence CRUD
  layDanhSachGeofence: (params?: { phongBanId?: number; trangThai?: boolean }) =>
    api.get<Geofence[]>('/anti-fraud/geofence', { params }).then((res) => res.data),

  layGeofence: (id: number) =>
    api.get<Geofence>(`/anti-fraud/geofence/${id}`).then((res) => res.data),

  taoGeofence: (data: TaoGeofenceDto) =>
    api.post<Geofence>('/anti-fraud/geofence', data).then((res) => res.data),

  capNhatGeofence: (id: number, data: CapNhatGeofenceDto) =>
    api.put<Geofence>(`/anti-fraud/geofence/${id}`, data).then((res) => res.data),

  xoaGeofence: (id: number) =>
    api.delete(`/anti-fraud/geofence/${id}`).then((res) => res.data),

  // GPS Check-in/out
  layGeofenceCuaToi: () =>
    api.get<Geofence[]>('/anti-fraud/my-geofence').then((res) => res.data),

  gpsCheckin: (data: GPSCheckinDto) =>
    api.post<GPSCheckinResponse>('/anti-fraud/gps-checkin', data).then((res) => res.data),

  // GPS Logs
  layLichSuGPS: (params: GPSLogQuery) =>
    api.get<{ data: GPSLog[]; total: number; page: number; limit: number; totalPages: number }>(
      '/anti-fraud/gps-logs',
      { params }
    ).then((res) => res.data),

  layLichSuGPSCuaToi: (params?: Omit<GPSLogQuery, 'nhanVienId'>) =>
    api.get<{ data: GPSLog[]; total: number; page: number; limit: number; totalPages: number }>(
      '/anti-fraud/my-gps-logs',
      { params }
    ).then((res) => res.data),

  thongKeGPS: (tuNgay: string, denNgay: string, phongBanId?: number) =>
    api.get<GPSThongKe>('/anti-fraud/thong-ke', {
      params: { tuNgay, denNgay, phongBanId },
    }).then((res) => res.data),

  // =============== SPRINT 8: DEVICE BINDING ===============

  // Danh sách thiết bị
  layDanhSachThietBi: (params?: DeviceQuery) =>
    api.get<{ data: ThietBiNhanVien[]; total: number; page: number; limit: number; totalPages: number }>(
      '/anti-fraud/devices',
      { params }
    ).then((res) => res.data),

  // Thiết bị của 1 nhân viên
  layThietBiNhanVien: (nhanVienId: number) =>
    api.get<ThietBiNhanVien>(`/anti-fraud/devices/${nhanVienId}`).then((res) => res.data),

  // Thiết bị của tôi
  layThietBiCuaToi: () =>
    api.get<ThietBiNhanVien | null>('/anti-fraud/my-device').then((res) => res.data),

  // Kiểm tra device
  kiemTraDevice: (deviceId: string) =>
    api.post<DeviceCheckResult>('/anti-fraud/check-device', { deviceId }).then((res) => res.data),

  // Bind device
  bindDevice: (data: BindDeviceDto) =>
    api.post<ThietBiNhanVien>('/anti-fraud/bind-device', data).then((res) => res.data),

  // Reset device
  resetDevice: (data: ResetDeviceDto) =>
    api.post<{ success: boolean; message: string }>('/anti-fraud/reset-device', data).then((res) => res.data),

  // Block device
  blockDevice: (nhanVienId: number, lyDo: string) =>
    api.post<{ success: boolean; message: string }>(`/anti-fraud/block-device/${nhanVienId}`, { lyDo }).then((res) => res.data),

  // Lịch sử thiết bị
  layLichSuThietBi: (params?: LichSuThietBiQuery) =>
    api.get<{ data: LichSuThietBi[]; total: number; page: number; limit: number; totalPages: number }>(
      '/anti-fraud/device-history',
      { params }
    ).then((res) => res.data),
};

// =============== HELPER FUNCTIONS ===============

/**
 * Lấy vị trí GPS hiện tại
 * @returns Promise với tọa độ GPS
 */
export const getCurrentPosition = (): Promise<{
  viDo: number;
  kinhDo: number;
  doChinhXacMet: number;
}> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Trình duyệt không hỗ trợ GPS'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          viDo: position.coords.latitude,
          kinhDo: position.coords.longitude,
          doChinhXacMet: Math.round(position.coords.accuracy),
        });
      },
      (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            // Hướng dẫn cụ thể cho iOS/Android
            const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
            const isAndroid = /Android/.test(navigator.userAgent);
            
            let message = 'Bạn đã từ chối quyền truy cập GPS. ';
            if (isIOS) {
              message += 'Vào Cài đặt > Safari > Vị trí > Cho phép (hoặc Cài đặt > Quyền riêng tư > Dịch vụ vị trí > Safari)';
            } else if (isAndroid) {
              message += 'Vào Cài đặt > Ứng dụng > Trình duyệt > Quyền > Vị trí > Cho phép';
            } else {
              message += 'Vui lòng bật quyền GPS trong cài đặt trình duyệt và làm mới trang.';
            }
            reject(new Error(message));
            break;
          case error.POSITION_UNAVAILABLE:
            reject(new Error('Không thể xác định vị trí'));
            break;
          case error.TIMEOUT:
            reject(new Error('Quá thời gian chờ GPS'));
            break;
          default:
            reject(new Error('Lỗi GPS không xác định'));
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  });
};

/**
 * Tính khoảng cách giữa 2 điểm GPS (Haversine formula)
 * @returns Khoảng cách tính bằng mét
 */
export const tinhKhoangCach = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const R = 6371000; // Bán kính trái đất (mét)
  const toRad = (deg: number) => deg * (Math.PI / 180);

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

/**
 * Lấy device ID từ local storage hoặc tạo mới
 */
export const getDeviceId = (): string => {
  const DEVICE_ID_KEY = 'tinh_luong_device_id';
  let deviceId = localStorage.getItem(DEVICE_ID_KEY);
  
  if (!deviceId) {
    deviceId = `WEB-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem(DEVICE_ID_KEY, deviceId);
  }
  
  return deviceId;
};
