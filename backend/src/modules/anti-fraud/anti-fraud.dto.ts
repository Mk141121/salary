// DTOs cho Anti-fraud module - Sprint 7 & 8
import { IsString, IsNumber, IsOptional, IsBoolean, IsEnum, Min, Max, MinLength, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// =============== GEOFENCE DTOs ===============

export class TaoGeofenceDto {
  @ApiProperty({ description: 'Tên địa điểm' })
  @IsString()
  tenDiaDiem: string;

  @ApiPropertyOptional({ description: 'Địa chỉ đầy đủ' })
  @IsOptional()
  @IsString()
  diaChi?: string;

  @ApiProperty({ description: 'Vĩ độ (Latitude)' })
  @IsNumber()
  @Min(-90)
  @Max(90)
  viDo: number;

  @ApiProperty({ description: 'Kinh độ (Longitude)' })
  @IsNumber()
  @Min(-180)
  @Max(180)
  kinhDo: number;

  @ApiProperty({ description: 'Bán kính cho phép (mét)', default: 100 })
  @IsNumber()
  @Min(10)
  @Max(5000)
  banKinhMet: number;

  @ApiPropertyOptional({ description: 'ID phòng ban áp dụng (null = toàn công ty)' })
  @IsOptional()
  @IsNumber()
  phongBanId?: number;

  @ApiProperty({ description: 'Áp dụng cho toàn công ty', default: false })
  @IsBoolean()
  apDungTatCa: boolean;

  @ApiProperty({ description: 'Bắt buộc bật GPS', default: true })
  @IsBoolean()
  batBuocGPS: boolean;

  @ApiProperty({ description: 'Chặn check-in ngoài vùng', default: false })
  @IsBoolean()
  chanNgoaiVung: boolean;
}

export class CapNhatGeofenceDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  tenDiaDiem?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  diaChi?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Min(-90)
  @Max(90)
  viDo?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Min(-180)
  @Max(180)
  kinhDo?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Min(10)
  @Max(5000)
  banKinhMet?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  phongBanId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  apDungTatCa?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  batBuocGPS?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  chanNgoaiVung?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  trangThai?: boolean;
}

// =============== GPS CHECK-IN/OUT DTOs ===============

export class GPSCheckinDto {
  @ApiProperty({ description: 'Loại chấm công', enum: ['CHECK_IN', 'CHECK_OUT'] })
  @IsEnum(['CHECK_IN', 'CHECK_OUT'])
  loaiChamCong: 'CHECK_IN' | 'CHECK_OUT';

  @ApiPropertyOptional({ description: 'Vĩ độ (Latitude)' })
  @IsOptional()
  @IsNumber()
  @Min(-90)
  @Max(90)
  viDo?: number;

  @ApiPropertyOptional({ description: 'Kinh độ (Longitude)' })
  @IsOptional()
  @IsNumber()
  @Min(-180)
  @Max(180)
  kinhDo?: number;

  @ApiPropertyOptional({ description: 'Độ chính xác GPS (mét)' })
  @IsOptional()
  @IsNumber()
  doChinhXacMet?: number;

  @ApiPropertyOptional({ description: 'Device ID' })
  @IsOptional()
  @IsString()
  deviceId?: string;
}

// =============== QUERY DTOs ===============

export class GeofenceQueryDto {
  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  phongBanId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  trangThai?: boolean;
}

export class GPSLogQueryDto {
  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  nhanVienId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  tuNgay?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  denNgay?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  trangThai?: string;

  @ApiPropertyOptional({ default: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  page?: number;

  @ApiPropertyOptional({ default: 20 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  limit?: number;
}

// =============== RESPONSE DTOs ===============

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

// =============== SPRINT 8: DEVICE BINDING DTOs ===============

export class BindDeviceDto {
  @ApiProperty({ description: 'Device ID/Fingerprint' })
  @IsString()
  @MinLength(10)
  @MaxLength(255)
  deviceId: string;

  @ApiPropertyOptional({ description: 'Tên thiết bị (e.g. iPhone 15 Pro)' })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  tenThietBi?: string;

  @ApiPropertyOptional({ description: 'Nền tảng (iOS/Android/Web)' })
  @IsOptional()
  @IsString()
  platform?: string;
}

export class ResetDeviceDto {
  @ApiProperty({ description: 'ID nhân viên cần reset device' })
  @IsNumber()
  nhanVienId: number;

  @ApiProperty({ description: 'Lý do reset' })
  @IsString()
  @MinLength(5)
  @MaxLength(500)
  lyDo: string;
}

export class DeviceQueryDto {
  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  phongBanId?: number;

  @ApiPropertyOptional({ description: 'Trạng thái: ACTIVE | BLOCKED | PENDING_RESET' })
  @IsOptional()
  @IsString()
  trangThai?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({ default: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  page?: number;

  @ApiPropertyOptional({ default: 20 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  limit?: number;
}

export class LichSuThietBiQueryDto {
  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  nhanVienId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  hanhDong?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  tuNgay?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  denNgay?: string;

  @ApiPropertyOptional({ default: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  page?: number;

  @ApiPropertyOptional({ default: 20 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  limit?: number;
}

// =============== SPRINT 8 RESPONSE INTERFACES ===============

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
    phongBan?: { id: number; tenPhongBan: string };
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
  nhanVien?: { id: number; hoTen: string; maNhanVien: string };
  nguoiThucHien?: { id: number; hoTen: string };
}

export interface DeviceCheckResult {
  isValid: boolean;
  isBound: boolean;
  message: string;
  thietBi?: ThietBiNhanVienResponse;
}
