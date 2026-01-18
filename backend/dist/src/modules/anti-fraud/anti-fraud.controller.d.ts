import { AntiFraudService } from './anti-fraud.service';
import { TaoGeofenceDto, CapNhatGeofenceDto, GPSCheckinDto, GeofenceQueryDto, GPSLogQueryDto, BindDeviceDto, ResetDeviceDto, DeviceQueryDto, LichSuThietBiQueryDto } from './anti-fraud.dto';
export declare class AntiFraudController {
    private readonly service;
    constructor(service: AntiFraudService);
    layDanhSachGeofence(query: GeofenceQueryDto): Promise<import("./anti-fraud.dto").GeofenceResponse[]>;
    layGeofence(id: number): Promise<import("./anti-fraud.dto").GeofenceResponse>;
    taoGeofence(dto: TaoGeofenceDto, req: any): Promise<import("./anti-fraud.dto").GeofenceResponse>;
    capNhatGeofence(id: number, dto: CapNhatGeofenceDto, req: any): Promise<import("./anti-fraud.dto").GeofenceResponse>;
    xoaGeofence(id: number): Promise<{
        success: boolean;
    }>;
    layGeofenceCuaToi(req: any): Promise<import("./anti-fraud.dto").GeofenceResponse[]>;
    gpsCheckin(dto: GPSCheckinDto, req: any, userAgent: string, ipAddress: string): Promise<import("./anti-fraud.dto").GPSCheckinResponse>;
    layLichSuGPS(query: GPSLogQueryDto): Promise<{
        data: import("./anti-fraud.dto").GPSLogResponse[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    layLichSuGPSCuaToi(req: any, query: GPSLogQueryDto): Promise<{
        data: import("./anti-fraud.dto").GPSLogResponse[];
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
    layDanhSachThietBi(query: DeviceQueryDto): Promise<{
        data: import("./anti-fraud.dto").ThietBiNhanVienResponse[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    layThietBiNhanVien(nhanVienId: number): Promise<import("./anti-fraud.dto").ThietBiNhanVienResponse | null>;
    layThietBiCuaToi(req: any): Promise<import("./anti-fraud.dto").ThietBiNhanVienResponse | null>;
    kiemTraDevice(deviceId: string, req: any): Promise<import("./anti-fraud.dto").DeviceCheckResult>;
    bindDevice(dto: BindDeviceDto, req: any, userAgent: string, ipAddress: string): Promise<import("./anti-fraud.dto").ThietBiNhanVienResponse>;
    resetDevice(dto: ResetDeviceDto, req: any, ipAddress: string, userAgent: string): Promise<{
        success: boolean;
        message: string;
    }>;
    blockDevice(nhanVienId: number, lyDo: string, req: any, ipAddress: string, userAgent: string): Promise<{
        success: boolean;
        message: string;
    }>;
    layLichSuThietBi(query: LichSuThietBiQueryDto): Promise<{
        data: import("./anti-fraud.dto").LichSuThietBiResponse[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    layLichSuThietBiNhanVien(nhanVienId: number, query: LichSuThietBiQueryDto): Promise<{
        data: import("./anti-fraud.dto").LichSuThietBiResponse[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
}
