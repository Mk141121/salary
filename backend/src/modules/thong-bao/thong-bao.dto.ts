// DTOs cho module Thông báo - Sprint 6
import { IsEnum, IsOptional, IsNumber, IsString, IsBoolean, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';
import { LoaiThongBao } from '@prisma/client';

// Query params cho danh sách thông báo
export class ThongBaoQueryDto {
  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  daDoc?: boolean;

  @IsOptional()
  @IsEnum(LoaiThongBao)
  loaiThongBao?: LoaiThongBao;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(1)
  @Max(100)
  limit?: number = 20;
}

// DTO tạo thông báo (internal use)
export class TaoThongBaoDto {
  nguoiNhanId: number;
  loaiThongBao: LoaiThongBao;
  tieuDe: string;
  noiDung: string;
  link?: string;
  duLieuThem?: Record<string, any>;
}

// Response thông báo
export interface ThongBaoResponse {
  id: number;
  loaiThongBao: LoaiThongBao;
  tieuDe: string;
  noiDung: string;
  link?: string | null;
  daDoc: boolean;
  ngayDoc?: Date | null;
  duLieuThem?: Record<string, any> | null;
  ngayTao: Date;
}

// Response danh sách thông báo
export interface DanhSachThongBaoResponse {
  data: ThongBaoResponse[];
  total: number;
  page: number;
  limit: number;
  chuaDoc: number;
}

// Response đếm thông báo chưa đọc
export interface DemChuaDocResponse {
  chuaDoc: number;
}
