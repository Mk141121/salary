/**
 * Scheduling DTOs - Xếp Ca
 * PRD-01: Data Transfer Objects cho module xếp ca
 */

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsNumber, IsBoolean, IsEnum, IsDateString, Min, Max, Matches, IsArray } from 'class-validator';
import { Type } from 'class-transformer';

// ============== CA LAM VIEC ==============

/**
 * DTO tạo ca làm việc
 */
export class CreateCaLamViecDto {
  @ApiProperty({ example: 'CA01', description: 'Mã ca (unique)' })
  @IsString()
  @IsNotEmpty()
  @Matches(/^[A-Z0-9_]+$/, { message: 'Mã ca chỉ chứa chữ hoa, số và underscore' })
  maCa: string;

  @ApiProperty({ example: 'Ca hành chính', description: 'Tên ca' })
  @IsString()
  @IsNotEmpty()
  tenCa: string;

  @ApiProperty({ example: '08:00', description: 'Giờ vào (HH:mm)' })
  @IsString()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: 'Giờ vào phải có định dạng HH:mm' })
  gioVao: string;

  @ApiProperty({ example: '17:00', description: 'Giờ ra (HH:mm)' })
  @IsString()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: 'Giờ ra phải có định dạng HH:mm' })
  gioRa: string;

  @ApiPropertyOptional({ example: 60, description: 'Nghỉ giữa ca (phút)' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(120)
  nghiGiuaCaPhut?: number;

  @ApiPropertyOptional({ example: 15, description: 'Cho phép check-in sớm (phút)' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(60)
  graceInPhut?: number;

  @ApiPropertyOptional({ example: 15, description: 'Dung sai đi muộn (phút)' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(60)
  graceLatePhut?: number;

  @ApiPropertyOptional({ example: false, description: 'Là ca đêm (qua ngày)' })
  @IsOptional()
  @IsBoolean()
  isCaDem?: boolean;

  @ApiPropertyOptional({ example: 1, description: 'ID phòng ban (nếu ca riêng cho phòng ban)' })
  @IsOptional()
  @IsNumber()
  phongBanId?: number;
}

export class UpdateCaLamViecDto {
  @ApiPropertyOptional({ example: 'Ca hành chính sáng', description: 'Tên ca' })
  @IsOptional()
  @IsString()
  tenCa?: string;

  @ApiPropertyOptional({ example: '08:30', description: 'Giờ vào (HH:mm)' })
  @IsOptional()
  @IsString()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: 'Giờ vào phải có định dạng HH:mm' })
  gioVao?: string;

  @ApiPropertyOptional({ example: '17:30', description: 'Giờ ra (HH:mm)' })
  @IsOptional()
  @IsString()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: 'Giờ ra phải có định dạng HH:mm' })
  gioRa?: string;

  @ApiPropertyOptional({ example: 60, description: 'Nghỉ giữa ca (phút)' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(120)
  nghiGiuaCaPhut?: number;

  @ApiPropertyOptional({ example: 15, description: 'Cho phép check-in sớm (phút)' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(60)
  graceInPhut?: number;

  @ApiPropertyOptional({ example: 15, description: 'Dung sai đi muộn (phút)' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(60)
  graceLatePhut?: number;

  @ApiPropertyOptional({ example: false, description: 'Là ca đêm (qua ngày)' })
  @IsOptional()
  @IsBoolean()
  isCaDem?: boolean;
}

// ============== LICH PHAN CA ==============

export enum TrangThaiLichPhanCa {
  NHAP = 'NHAP',
  DA_CONG_BO = 'DA_CONG_BO',
  HUY = 'HUY',
}

/**
 * DTO tạo lịch phân ca theo tháng
 */
export class CreateLichPhanCaDto {
  @ApiProperty({ example: '2026-02', description: 'Tháng năm (YYYY-MM)' })
  @IsString()
  @Matches(/^\d{4}-(0[1-9]|1[0-2])$/, { message: 'Tháng năm phải có định dạng YYYY-MM' })
  thangNam: string;

  @ApiPropertyOptional({ example: 1, description: 'ID phòng ban' })
  @IsOptional()
  @IsNumber()
  phongBanId?: number;

  @ApiPropertyOptional({ example: 'Lịch ca tháng 2', description: 'Ghi chú' })
  @IsOptional()
  @IsString()
  ghiChu?: string;
}

/**
 * DTO assign ca hàng loạt
 */
export class AssignCaBatchDto {
  @ApiProperty({ example: [1, 2, 3], description: 'Danh sách ID nhân viên' })
  @IsArray()
  @IsNumber({}, { each: true })
  nhanVienIds: number[];

  @ApiProperty({ example: 1, description: 'ID ca làm việc' })
  @IsNumber()
  caLamViecId: number;

  @ApiProperty({ example: ['2026-02-01', '2026-02-02'], description: 'Danh sách ngày (YYYY-MM-DD)' })
  @IsArray()
  @IsString({ each: true })
  ngays: string[];

  @ApiPropertyOptional({ description: 'Ghi chú' })
  @IsOptional()
  @IsString()
  ghiChu?: string;
}

/**
 * DTO copy lịch tuần
 */
export class CopyWeekDto {
  @ApiProperty({ example: '2026-02-01', description: 'Ngày bắt đầu tuần nguồn' })
  @IsDateString()
  tuanNguon: string;

  @ApiProperty({ example: '2026-02-08', description: 'Ngày bắt đầu tuần đích' })
  @IsDateString()
  tuanDich: string;

  @ApiPropertyOptional({ example: [1, 2, 3], description: 'Chỉ copy cho nhân viên cụ thể (optional)' })
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  nhanVienIds?: number[];
}

// ============== RESPONSE ==============

export class CaLamViecResponse {
  @ApiProperty() id: number;
  @ApiProperty() maCa: string;
  @ApiProperty() tenCa: string;
  @ApiProperty() gioVao: string;
  @ApiProperty() gioRa: string;
  @ApiProperty() nghiGiuaCaPhut: number;
  @ApiProperty() graceInPhut: number;
  @ApiProperty() graceLatePhut: number;
  @ApiProperty() isCaDem: boolean;
  @ApiPropertyOptional() phongBanId?: number;
}

export class LichPhanCaResponse {
  @ApiProperty() id: number;
  @ApiProperty() thangNam: string;
  @ApiProperty() phongBanId?: number;
  @ApiProperty({ enum: TrangThaiLichPhanCa }) trangThai: TrangThaiLichPhanCa;
  @ApiProperty() ghiChu?: string;
  @ApiProperty() createdAt: Date;
}

export class CalendarDayResponse {
  @ApiProperty() ngay: string;
  @ApiProperty() nhanVienId: number;
  @ApiProperty() hoTen: string;
  @ApiProperty() maCa: string;
  @ApiProperty() tenCa: string;
  @ApiProperty() gioVao: string;
  @ApiProperty() gioRa: string;
}
