// DTO cho module Ứng Lương
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsOptional,
  IsDateString,
  IsArray,
  ValidateNested,
  IsBoolean,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

// ============================================
// DTO CẤU HÌNH ỨNG LƯƠNG (JSON)
// Đặt trước để tránh circular dependency
// ============================================
export class CauHinhUngLuongDto {
  @IsOptional()
  chuyen_can?: {
    so_ngay_nghi_toi_da: number;
    cam_neu_nghi_khong_phep: boolean;
  };

  @IsOptional()
  ung_luong?: {
    ti_le_toi_da: number;
    lam_tron: number;
  };
}

// ============================================
// DTO TẠO BẢNG ỨNG LƯƠNG
// ============================================
export class TaoBangUngLuongDto {
  @IsNotEmpty({ message: 'Tháng năm không được để trống' })
  @IsString()
  thangNam: string; // YYYY-MM

  @IsNotEmpty({ message: 'Từ ngày không được để trống' })
  @IsDateString()
  tuNgay: string;

  @IsNotEmpty({ message: 'Đến ngày không được để trống' })
  @IsDateString()
  denNgay: string;

  @IsOptional()
  @IsDateString()
  ngayChiTra?: string;

  @IsOptional()
  @IsNumber()
  phongBanId?: number;

  @IsOptional()
  @IsString()
  ghiChu?: string;

  @IsOptional()
  cauHinhJson?: CauHinhUngLuongDto;
}

// ============================================
// DTO CẬP NHẬT BẢNG ỨNG LƯƠNG
// ============================================
export class CapNhatBangUngLuongDto {
  @IsOptional()
  @IsDateString()
  ngayChiTra?: string;

  @IsOptional()
  @IsString()
  ghiChu?: string;

  @IsOptional()
  cauHinhJson?: CauHinhUngLuongDto;
}

// ============================================
// DTO SINH DANH SÁCH NHÂN VIÊN
// ============================================
export class SinhDanhSachNVDto {
  @IsOptional()
  @IsNumber()
  phongBanId?: number;

  @IsOptional()
  @IsNumber()
  nhomNhanVienId?: number;

  @IsOptional()
  @IsArray()
  nhanVienIds?: number[];
}

// ============================================
// DTO CẬP NHẬT 1 DÒNG CHI TIẾT
// ============================================
export class CapNhatChiTietUngLuongDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsOptional()
  @IsNumber()
  @Min(0, { message: 'Số tiền đề xuất không được âm' })
  soTienUngDeXuat?: number;

  @IsOptional()
  @IsNumber()
  @Min(0, { message: 'Số tiền duyệt không được âm' })
  soTienUngDuyet?: number;

  @IsOptional()
  @IsString()
  ghiChu?: string;
}

// ============================================
// DTO CẬP NHẬT NHIỀU DÒNG (BULK)
// ============================================
export class CapNhatBulkChiTietDto {
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CapNhatChiTietUngLuongDto)
  chiTiets: CapNhatChiTietUngLuongDto[];
}

// ============================================
// DTO SET THEO % MỨC TỐI ĐA
// ============================================
export class SetTheoTiLeDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  tiLe: number; // 0-100

  @IsOptional()
  @IsNumber()
  lamTron?: number; // làm tròn theo bội số

  @IsOptional()
  @IsArray()
  nhanVienIds?: number[]; // Nếu null thì áp dụng cho tất cả
}

// ============================================
// DTO SET SỐ TIỀN CỐ ĐỊNH
// ============================================
export class SetSoTienCoDinhDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  soTien: number;

  @IsOptional()
  @IsArray()
  nhanVienIds?: number[];
}

// ============================================
// DTO GHI NHẬN KHẤU TRỪ
// ============================================
export class GhiNhanKhauTruDto {
  @IsNotEmpty()
  @IsNumber()
  bangLuongApDungId: number; // ID bảng lương sẽ khấu trừ

  @IsOptional()
  @IsString()
  lyDo?: string;
}

// ============================================
// DTO MỞ KHÓA (admin only)
// ============================================
export class MoKhoaBangUngLuongDto {
  @IsNotEmpty({ message: 'Lý do mở khóa không được để trống' })
  @IsString()
  lyDo: string;
}

// ============================================
// DTO LỌC DANH SÁCH
// ============================================
export class LocBangUngLuongDto {
  @IsOptional()
  @IsString()
  thangNam?: string;

  @IsOptional()
  @IsNumber()
  phongBanId?: number;

  @IsOptional()
  @IsString()
  trangThai?: 'NHAP' | 'DA_CHOT' | 'DA_KHOA';

  @IsOptional()
  @IsNumber()
  trang?: number;

  @IsOptional()
  @IsNumber()
  soLuong?: number;
}
