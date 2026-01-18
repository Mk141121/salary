import { PrismaService } from '../../prisma/prisma.service';
import { TaoGeofenceDto, CapNhatGeofenceDto, GPSCheckinDto, GeofenceQueryDto, GPSLogQueryDto, GeofenceResponse, GPSCheckinResponse, GPSLogResponse, BindDeviceDto, ResetDeviceDto, DeviceQueryDto, LichSuThietBiQueryDto, ThietBiNhanVienResponse, LichSuThietBiResponse, DeviceCheckResult } from './anti-fraud.dto';
export declare class AntiFraudService {
    private prisma;
    constructor(prisma: PrismaService);
    layDanhSachGeofence(query: GeofenceQueryDto): Promise<GeofenceResponse[]>;
    layGeofence(id: number): Promise<GeofenceResponse>;
    taoGeofence(dto: TaoGeofenceDto, taoBoi?: number): Promise<GeofenceResponse>;
    capNhatGeofence(id: number, dto: CapNhatGeofenceDto, capNhatBoi?: number): Promise<GeofenceResponse>;
    xoaGeofence(id: number): Promise<{
        success: boolean;
    }>;
    layGeofenceChoNhanVien(nhanVienId: number): Promise<GeofenceResponse[]>;
    gpsCheckin(nhanVienId: number, dto: GPSCheckinDto, requestInfo: {
        userAgent?: string;
        ipAddress?: string;
    }): Promise<GPSCheckinResponse>;
    layLichSuGPS(query: GPSLogQueryDto): Promise<{
        data: GPSLogResponse[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    thongKeGPS(tuNgay: string, denNgay: string, phongBanId?: number): Promise<{
        tuNgay: string;
        denNgay: string;
        phongBanId: number | undefined;
        thongKe: {
            tongBanGhi: number;
            hopLe: number;
            ngoaiVung: number;
            canhBao: number;
            khongGPS: number;
            tyLeHopLe: number;
        };
    }>;
    private tinhKhoangCach;
    private toRad;
    private mapGeofenceResponse;
    private mapGPSLogResponse;
    kiemTraDevice(nhanVienId: number, deviceId: string): Promise<DeviceCheckResult>;
    bindDevice(nhanVienId: number, dto: BindDeviceDto, context?: {
        userAgent?: string;
        ipAddress?: string;
    }): Promise<ThietBiNhanVienResponse>;
    resetDevice(dto: ResetDeviceDto, nguoiThucHienId: number, context?: {
        ipAddress?: string;
        userAgent?: string;
    }): Promise<{
        success: boolean;
        message: string;
    }>;
    blockDevice(nhanVienId: number, lyDo: string, nguoiThucHienId: number, context?: {
        ipAddress?: string;
        userAgent?: string;
    }): Promise<{
        success: boolean;
        message: string;
    }>;
    layDanhSachThietBi(query: DeviceQueryDto): Promise<{
        data: ThietBiNhanVienResponse[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    layThietBiNhanVien(nhanVienId: number): Promise<ThietBiNhanVienResponse | null>;
    layLichSuThietBi(query: LichSuThietBiQueryDto): Promise<{
        data: LichSuThietBiResponse[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    capNhatLanDangNhapCuoi(nhanVienId: number): Promise<void>;
    private ghiLichSuThietBi;
    private mapThietBiResponse;
    private mapLichSuThietBiResponse;
}
