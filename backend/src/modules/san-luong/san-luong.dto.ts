// DTOs cho module Sản Lượng
import { IsDateString, IsInt, IsNumber, IsOptional, IsString, Min, IsEnum, IsArray, ValidateNested, ArrayMinSize } from 'class-validator';
import { Type, Transform } from 'class-transformer';

// =============== ENUMS ===============
export enum LoaiImport {
  CHIA_HANG = 'CHIA_HANG',
  GIAO_HANG = 'GIAO_HANG',
}

// =============== CHIA HÀNG DTOs ===============
export class ChiaHangRowDto {
  @IsDateString()
  ngay: string;

  @IsString()
  maNhanVien: string;

  @IsInt()
  @Min(0)
  soLuongSpDat: number;

  @IsInt()
  @Min(0)
  soLuongSpLoi: number;

  @IsOptional()
  @IsString()
  hoTen?: string;

  @IsOptional()
  @IsString()
  ghiChu?: string;
}

export class ImportChiaHangPreviewDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ChiaHangRowDto)
  rows: ChiaHangRowDto[];
}

export class ChiaHangValidationResult {
  hopLe: boolean;
  dong: number;
  data?: ChiaHangRowDto;
  loi?: string[];
}

export class PreviewChiaHangResponse {
  hopLe: ChiaHangValidationResult[];
  loi: ChiaHangValidationResult[];
  tongDong: number;
  tongHopLe: number;
  tongLoi: number;
}

export class ConfirmChiaHangDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ChiaHangRowDto)
  @ArrayMinSize(1)
  rows: ChiaHangRowDto[];

  @IsString()
  tenFile: string;

  @IsOptional()
  @IsString()
  fileHash?: string;
}

// =============== GIAO HÀNG DTOs ===============
export class GiaoHangRowDto {
  @IsDateString()
  ngay: string;

  @IsString()
  maNhanVien: string;

  @IsNumber()
  @Min(0)
  khoiLuongThanhCong: number;

  @IsInt()
  @Min(0)
  soLanTreGio: number;

  @IsInt()
  @Min(0)
  soLanKhongLayPhieu: number;

  @IsOptional()
  @IsString()
  hoTen?: string;

  @IsOptional()
  @IsString()
  ghiChu?: string;
}

export class ImportGiaoHangPreviewDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => GiaoHangRowDto)
  rows: GiaoHangRowDto[];
}

export class GiaoHangValidationResult {
  hopLe: boolean;
  dong: number;
  data?: GiaoHangRowDto;
  loi?: string[];
}

export class PreviewGiaoHangResponse {
  hopLe: GiaoHangValidationResult[];
  loi: GiaoHangValidationResult[];
  tongDong: number;
  tongHopLe: number;
  tongLoi: number;
}

export class ConfirmGiaoHangDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => GiaoHangRowDto)
  @ArrayMinSize(1)
  rows: GiaoHangRowDto[];

  @IsString()
  tenFile: string;

  @IsOptional()
  @IsString()
  fileHash?: string;
}

// =============== ADMIN SỬA DTOs ===============
export class AdminSuaChiaHangDto {
  @IsOptional()
  @IsInt()
  @Min(0)
  soLuongSpDat?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  soLuongSpLoi?: number;

  @IsOptional()
  @IsString()
  ghiChu?: string;

  @IsString()
  lyDo: string;
}

export class AdminSuaGiaoHangDto {
  @IsOptional()
  @IsNumber()
  @Min(0)
  khoiLuongThanhCong?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  soLanTreGio?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  soLanKhongLayPhieu?: number;

  @IsOptional()
  @IsString()
  ghiChu?: string;

  @IsString()
  lyDo: string;
}

// =============== QUERY DTOs ===============
export class QuerySanLuongDto {
  @IsOptional()
  @IsDateString()
  tuNgay?: string;

  @IsOptional()
  @IsDateString()
  denNgay?: string;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  nhanVienId?: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  phongBanId?: number;
}

export class QueryLichSuImportDto {
  @IsOptional()
  @IsEnum(LoaiImport)
  loaiImport?: LoaiImport;

  @IsOptional()
  @IsDateString()
  tuNgay?: string;

  @IsOptional()
  @IsDateString()
  denNgay?: string;
}
