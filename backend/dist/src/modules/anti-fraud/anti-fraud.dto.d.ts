export declare class TaoGeofenceDto {
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
export declare class CapNhatGeofenceDto {
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
export declare class GPSCheckinDto {
    loaiChamCong: 'CHECK_IN' | 'CHECK_OUT';
    viDo?: number;
    kinhDo?: number;
    doChinhXacMet?: number;
    deviceId?: string;
}
export declare class GeofenceQueryDto {
    phongBanId?: number;
    trangThai?: boolean;
}
export declare class GPSLogQueryDto {
    nhanVienId?: number;
    tuNgay?: string;
    denNgay?: string;
    trangThai?: string;
    page?: number;
    limit?: number;
}
export interface GeofenceResponse {
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
    ngayTao: Date;
    ngayCapNhat: Date;
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
        thoiGian: Date;
        loaiChamCong: string;
    };
}
export interface GPSLogResponse {
    id: number;
    nhanVienId: number;
    thoiGian: Date;
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
export declare class BindDeviceDto {
    deviceId: string;
    tenThietBi?: string;
    platform?: string;
}
export declare class ResetDeviceDto {
    nhanVienId: number;
    lyDo: string;
}
export declare class DeviceQueryDto {
    phongBanId?: number;
    trangThai?: string;
    search?: string;
    page?: number;
    limit?: number;
}
export declare class LichSuThietBiQueryDto {
    nhanVienId?: number;
    hanhDong?: string;
    tuNgay?: string;
    denNgay?: string;
    page?: number;
    limit?: number;
}
export interface ThietBiNhanVienResponse {
    id: number;
    nhanVienId: number;
    deviceId: string;
    tenThietBi?: string;
    userAgent?: string;
    platform?: string;
    ipAddress?: string;
    trangThai: string;
    ngayDangKy: Date;
    lanDangNhapCuoi?: Date;
    nguoiResetId?: number;
    lyDoReset?: string;
    ngayReset?: Date;
    nhanVien?: {
        id: number;
        hoTen: string;
        maNhanVien: string;
        phongBan?: {
            id: number;
            tenPhongBan: string;
        };
    };
}
export interface LichSuThietBiResponse {
    id: number;
    nhanVienId: number;
    hanhDong: string;
    deviceIdCu?: string;
    deviceIdMoi?: string;
    nguoiThucHienId?: number;
    lyDo?: string;
    ipAddress?: string;
    userAgent?: string;
    ngayTao: Date;
    nhanVien?: {
        id: number;
        hoTen: string;
        maNhanVien: string;
    };
    nguoiThucHien?: {
        id: number;
        hoTen: string;
    };
}
export interface DeviceCheckResult {
    isValid: boolean;
    isBound: boolean;
    message: string;
    thietBi?: ThietBiNhanVienResponse;
}
