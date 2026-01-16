// DTO cho module Sổ Lương
import {
  IsOptional,
  IsString,
  IsNumber,
  IsDateString,
} from 'class-validator';

// ============================================
// DTO LỌC SỔ LƯƠNG
// ============================================
export class LocSoLuongDto {
  @IsOptional()
  @IsDateString()
  tuNgay?: string;

  @IsOptional()
  @IsDateString()
  denNgay?: string;

  @IsOptional()
  @IsNumber()
  trang?: number;

  @IsOptional()
  @IsNumber()
  soLuong?: number;
}

// ============================================
// DTO TÌM KIẾM SỔ LƯƠNG
// ============================================
export class TimKiemSoLuongDto {
  @IsOptional()
  @IsString()
  keyword?: string;

  @IsOptional()
  @IsDateString()
  tuNgay?: string;

  @IsOptional()
  @IsDateString()
  denNgay?: string;

  @IsOptional()
  @IsNumber()
  phongBanId?: number;

  @IsOptional()
  @IsNumber()
  trang?: number;

  @IsOptional()
  @IsNumber()
  soLuong?: number;
}
