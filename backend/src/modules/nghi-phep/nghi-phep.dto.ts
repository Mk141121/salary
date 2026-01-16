// DTOs cho module Nghỉ phép
import {
  IsDateString,
  IsInt,
  IsOptional,
  IsString,
  IsBoolean,
  IsEnum,
  Min,
  IsNumber,
  MaxLength,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { TrangThaiDonNghiPhep } from '@prisma/client';

// =============== ENUMS ===============
export enum NhomLoaiNghi {
  CO_PHEP = 'CO_PHEP',
  KHONG_PHEP = 'KHONG_PHEP',
}

// =============== DANH MỤC LOẠI NGHỈ DTOs ===============
export class TaoLoaiNghiDto {
  @IsString()
  @MaxLength(50)
  maLoaiNghi: string;

  @IsString()
  @MaxLength(100)
  tenLoaiNghi: string;

  @IsEnum(NhomLoaiNghi)
  nhomLoai: NhomLoaiNghi;

  @IsBoolean()
  coTinhLuong: boolean;

  @IsBoolean()
  coTinhChuyenCan: boolean;

  @IsOptional()
  @IsInt()
  @Min(0)
  thuTuHienThi?: number;
}

export class CapNhatLoaiNghiDto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  tenLoaiNghi?: string;

  @IsOptional()
  @IsEnum(NhomLoaiNghi)
  nhomLoai?: NhomLoaiNghi;

  @IsOptional()
  @IsBoolean()
  coTinhLuong?: boolean;

  @IsOptional()
  @IsBoolean()
  coTinhChuyenCan?: boolean;

  @IsOptional()
  @IsInt()
  @Min(0)
  thuTuHienThi?: number;
}

// =============== ĐƠN NGHỈ PHÉP DTOs ===============
export class TaoDonNghiPhepDto {
  @IsInt()
  nhanVienId: number;

  @IsInt()
  loaiNghiId: number;

  @IsDateString()
  tuNgay: string;

  @IsDateString()
  denNgay: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  lyDo?: string;

  @IsOptional()
  @IsString()
  tepDinhKemUrl?: string;
}

export class CapNhatDonNghiPhepDto {
  @IsOptional()
  @IsInt()
  loaiNghiId?: number;

  @IsOptional()
  @IsDateString()
  tuNgay?: string;

  @IsOptional()
  @IsDateString()
  denNgay?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  lyDo?: string;

  @IsOptional()
  @IsString()
  tepDinhKemUrl?: string;
}

export class DuyetDonNghiPhepDto {
  @IsOptional()
  @IsString()
  @MaxLength(500)
  ghiChu?: string;
}

export class TuChoiDonNghiPhepDto {
  @IsString()
  @MaxLength(500)
  lyDoTuChoi: string;
}

export class HuyDonNghiPhepDto {
  @IsOptional()
  @IsString()
  @MaxLength(500)
  lyDo?: string;
}

// =============== FILTER & PAGINATION DTOs ===============
export class LocDonNghiPhepDto {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  phongBanId?: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  nhanVienId?: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  loaiNghiId?: number;

  @IsOptional()
  @IsEnum(TrangThaiDonNghiPhep)
  trangThai?: TrangThaiDonNghiPhep;

  @IsOptional()
  @IsDateString()
  tuNgay?: string;

  @IsOptional()
  @IsDateString()
  denNgay?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  page?: number = 1;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  limit?: number = 20;
}

export class LocLichNghiDto {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  nhanVienId?: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  phongBanId?: number;

  @IsDateString()
  tuNgay: string;

  @IsDateString()
  denNgay: string;
}

// =============== RESPONSE DTOs ===============
export class LoaiNghiResponse {
  id: number;
  maLoaiNghi: string;
  tenLoaiNghi: string;
  nhomLoai: string;
  coTinhLuong: boolean;
  coTinhChuyenCan: boolean;
  thuTuHienThi: number;
  isActive: boolean;
}

export class DonNghiPhepResponse {
  id: number;
  maDon: string;
  nhanVien: {
    id: number;
    maNhanVien: string;
    hoTen: string;
  };
  phongBan: {
    id: number;
    tenPhongBan: string;
  };
  loaiNghi: LoaiNghiResponse;
  tuNgay: Date;
  denNgay: Date;
  soNgayNghi: number;
  lyDo: string | null;
  tepDinhKemUrl: string | null;
  trangThai: TrangThaiDonNghiPhep;
  nguoiDuyet?: {
    id: number;
    hoTen: string;
  };
  ngayDuyet: Date | null;
  lyDoTuChoi: string | null;
  ngayTao: Date;
}

export class ChiTietNghiPhepNgayResponse {
  id: number;
  ngay: Date;
  soGioNghi: number;
  loaiNghi: LoaiNghiResponse;
  coTinhLuong: boolean;
  coTinhChuyenCan: boolean;
}

export class LichNghiNhanVienResponse {
  nhanVienId: number;
  maNhanVien: string;
  hoTen: string;
  phongBan: string;
  chiTietNgays: ChiTietNghiPhepNgayResponse[];
}

export class ThongKeMappingResponse {
  soNgayNghiCoPhep: number;
  soNgayNghiKhongPhep: number;
  soNgayNghiCoLuong: number;
  soNgayNghiKhongLuong: number;
  tongSoNgayNghi: number;
  chiTiet: ChiTietNghiPhepNgayResponse[];
}
