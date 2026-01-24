// DTOs cho module Yêu cầu (Request) - Sprint 4
import {
  IsString,
  IsOptional,
  IsInt,
  IsBoolean,
  IsEnum,
  IsDateString,
  IsArray,
  Min,
  Max,
  Matches,
} from 'class-validator';
import { Type, Transform } from 'class-transformer';

// =============== DANH MỤC LOẠI YÊU CẦU ===============

export class TaoLoaiYeuCauDto {
  @IsString()
  maLoai: string; // OT, TRE_GIO, VE_SOM, CONG_TAC, LAM_TU_XA

  @IsString()
  tenLoai: string;

  @IsOptional()
  @IsString()
  moTa?: string;

  @IsString()
  nhomLoai: string; // THOI_GIAN | DI_CHUYEN | KHAC

  @IsOptional()
  @IsBoolean()
  yeuCauGioBatDau?: boolean;

  @IsOptional()
  @IsBoolean()
  yeuCauGioKetThuc?: boolean;

  @IsOptional()
  @IsBoolean()
  yeuCauDiaDiem?: boolean;

  @IsOptional()
  @IsBoolean()
  coTinhOT?: boolean;

  @IsOptional()
  @IsInt()
  thuTuHienThi?: number;

  @IsOptional()
  @IsString()
  mauHienThi?: string;

  @IsOptional()
  @IsString()
  icon?: string;
}

export class CapNhatLoaiYeuCauDto {
  @IsOptional()
  @IsString()
  tenLoai?: string;

  @IsOptional()
  @IsString()
  moTa?: string;

  @IsOptional()
  @IsBoolean()
  yeuCauGioBatDau?: boolean;

  @IsOptional()
  @IsBoolean()
  yeuCauGioKetThuc?: boolean;

  @IsOptional()
  @IsBoolean()
  yeuCauDiaDiem?: boolean;

  @IsOptional()
  @IsBoolean()
  coTinhOT?: boolean;

  @IsOptional()
  @IsInt()
  thuTuHienThi?: number;

  @IsOptional()
  @IsString()
  mauHienThi?: string;

  @IsOptional()
  @IsString()
  icon?: string;
}

// =============== ĐƠN YÊU CẦU ===============

export class TaoDonYeuCauDto {
  @IsOptional()
  @IsInt()
  nhanVienId?: number;

  @IsInt()
  loaiYeuCauId: number;

  @IsDateString()
  ngayYeuCau: string; // Format: YYYY-MM-DD

  @IsOptional()
  @IsString()
  @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: 'gioBatDau phải có format HH:mm',
  })
  gioBatDau?: string;

  @IsOptional()
  @IsString()
  @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: 'gioKetThuc phải có format HH:mm',
  })
  gioKetThuc?: string;

  @IsOptional()
  @IsString()
  diaDiem?: string;

  @IsString()
  lyDo: string;

  @IsOptional()
  @IsString()
  tepDinhKemUrl?: string;
}

export class CapNhatDonYeuCauDto {
  @IsOptional()
  @IsDateString()
  ngayYeuCau?: string;

  @IsOptional()
  @IsString()
  @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: 'gioBatDau phải có format HH:mm',
  })
  gioBatDau?: string;

  @IsOptional()
  @IsString()
  @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: 'gioKetThuc phải có format HH:mm',
  })
  gioKetThuc?: string;

  @IsOptional()
  @IsString()
  diaDiem?: string;

  @IsOptional()
  @IsString()
  lyDo?: string;

  @IsOptional()
  @IsString()
  tepDinhKemUrl?: string;
}

export class DuyetDonYeuCauDto {
  @IsOptional()
  @IsString()
  ghiChu?: string;
}

export class TuChoiDonYeuCauDto {
  @IsString()
  lyDoTuChoi: string;
}

export class OverrideDonYeuCauDto {
  @IsString()
  lyDoOverride: string;

  @IsBoolean()
  duyet: boolean; // true = override duyệt, false = override từ chối
}

export class LocDonYeuCauDto {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  nhanVienId?: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  phongBanId?: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  loaiYeuCauId?: number;

  @IsOptional()
  @IsString()
  trangThai?: string;

  @IsOptional()
  @IsDateString()
  tuNgay?: string;

  @IsOptional()
  @IsDateString()
  denNgay?: string;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  nguoiDuyet1Id?: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  nguoiDuyet2Id?: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Min(1)
  @Max(100)
  limit?: number = 20;
}

// =============== WORKFLOW CONFIG ===============

export class TaoWorkflowConfigDto {
  @IsInt()
  loaiYeuCauId: number;

  @IsOptional()
  @IsInt()
  phongBanId?: number;

  @IsInt()
  @Min(1)
  @Max(2)
  soCap: number;

  @IsString()
  nguoiDuyet1: string; // QUAN_LY_TRUC_TIEP | TRUONG_PHONG | NGUOI_DUNG_CU_THE

  @IsOptional()
  @IsInt()
  nguoiDuyetCuThe1Id?: number;

  @IsOptional()
  @IsString()
  nguoiDuyet2?: string; // HR | NGUOI_DUNG_CU_THE

  @IsOptional()
  @IsInt()
  nguoiDuyetCuThe2Id?: number;

  @IsOptional()
  @IsBoolean()
  tuDongDuyetNeuQuaHan?: boolean;

  @IsOptional()
  @IsInt()
  soNgayQuaHan?: number;

  @IsOptional()
  @IsBoolean()
  yeuCauLyDoTuChoi?: boolean;

  @IsOptional()
  @IsBoolean()
  yeuCauLyDoOverride?: boolean;
}

export class CapNhatWorkflowConfigDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(2)
  soCap?: number;

  @IsOptional()
  @IsString()
  nguoiDuyet1?: string;

  @IsOptional()
  @IsInt()
  nguoiDuyetCuThe1Id?: number;

  @IsOptional()
  @IsString()
  nguoiDuyet2?: string;

  @IsOptional()
  @IsInt()
  nguoiDuyetCuThe2Id?: number;

  @IsOptional()
  @IsBoolean()
  tuDongDuyetNeuQuaHan?: boolean;

  @IsOptional()
  @IsInt()
  soNgayQuaHan?: number;

  @IsOptional()
  @IsBoolean()
  yeuCauLyDoTuChoi?: boolean;

  @IsOptional()
  @IsBoolean()
  yeuCauLyDoOverride?: boolean;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
