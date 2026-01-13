import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsOptional,
  IsArray,
  IsEnum,
  IsDateString,
  MinLength,
  IsEmail,
} from 'class-validator';

// ============================================
// NGƯỜI DÙNG DTOs
// ============================================

export class TaoNguoiDungDto {
  @ApiProperty({ example: 'admin' })
  @IsString()
  @MinLength(3)
  tenDangNhap: string;

  @ApiProperty({ example: 'password123' })
  @IsString()
  @MinLength(6)
  matKhau: string;

  @ApiProperty({ example: 'admin@company.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Nguyễn Văn Admin' })
  @IsString()
  hoTen: string;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsNumber()
  nhanVienId?: number;

  @ApiPropertyOptional({ example: [1, 2] })
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  vaiTroIds?: number[];
}

export class CapNhatNguoiDungDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  hoTen?: string;

  @ApiPropertyOptional({ enum: ['HOAT_DONG', 'TAM_KHOA', 'VO_HIEU_HOA'] })
  @IsOptional()
  @IsEnum(['HOAT_DONG', 'TAM_KHOA', 'VO_HIEU_HOA'])
  trangThai?: string;
}

export class DoiMatKhauDto {
  @ApiProperty()
  @IsString()
  matKhauCu: string;

  @ApiProperty()
  @IsString()
  @MinLength(6)
  matKhauMoi: string;
}

export class DangNhapDto {
  @ApiProperty({ example: 'admin' })
  @IsString()
  tenDangNhap: string;

  @ApiProperty({ example: 'password123' })
  @IsString()
  matKhau: string;
}

// ============================================
// VAI TRÒ DTOs
// ============================================

export class TaoVaiTroDto {
  @ApiProperty({ example: 'HR' })
  @IsString()
  maVaiTro: string;

  @ApiProperty({ example: 'Nhân sự' })
  @IsString()
  tenVaiTro: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  moTa?: string;

  @ApiPropertyOptional({ example: 50 })
  @IsOptional()
  @IsNumber()
  capDo?: number;

  @ApiPropertyOptional({ example: [1, 2, 3] })
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  quyenIds?: number[];
}

export class CapNhatVaiTroDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  tenVaiTro?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  moTa?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  capDo?: number;

  @ApiPropertyOptional()
  @IsOptional()
  trangThai?: boolean;
}

export class GanVaiTroDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  nguoiDungId: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  vaiTroId: number;

  @ApiPropertyOptional({ example: 1, description: 'Phòng ban (null = toàn công ty)' })
  @IsOptional()
  @IsNumber()
  phongBanId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  denNgay?: string;
}

export class GoVaiTroDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  nguoiDungId: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  vaiTroId: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  phongBanId?: number;
}

// ============================================
// QUYỀN DTOs
// ============================================

export class TaoQuyenDto {
  @ApiProperty({ example: 'LUONG_XEM' })
  @IsString()
  maQuyen: string;

  @ApiProperty({ example: 'Xem bảng lương' })
  @IsString()
  tenQuyen: string;

  @ApiProperty({ example: 'LUONG' })
  @IsString()
  nhomQuyen: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  moTa?: string;
}

export class GanQuyenChoVaiTroDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  vaiTroId: number;

  @ApiProperty({ example: [1, 2, 3] })
  @IsArray()
  @IsNumber({}, { each: true })
  quyenIds: number[];
}

// ============================================
// AUDIT LOG DTOs
// ============================================

export class TaoAuditLogDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  nguoiDungId?: number;

  @ApiProperty({ example: 'admin' })
  @IsString()
  tenDangNhap: string;

  @ApiProperty({ enum: ['TAO_MOI', 'CAP_NHAT', 'XOA', 'DANG_NHAP', 'DANG_XUAT', 'CHOT_LUONG', 'MO_KHOA', 'DUYET', 'TU_CHOI', 'IMPORT', 'EXPORT'] })
  @IsEnum(['TAO_MOI', 'CAP_NHAT', 'XOA', 'DANG_NHAP', 'DANG_XUAT', 'CHOT_LUONG', 'MO_KHOA', 'DUYET', 'TU_CHOI', 'IMPORT', 'EXPORT'])
  hanhDong: string;

  @ApiProperty({ example: 'bang_luong' })
  @IsString()
  bangDuLieu: string;

  @ApiPropertyOptional({ example: '123' })
  @IsOptional()
  @IsString()
  banGhiId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  duLieuCu?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  duLieuMoi?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  diaChiIP?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  userAgent?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  moTa?: string;
}

export class TimKiemAuditLogDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  nguoiDungId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  tenDangNhap?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  hanhDong?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  bangDuLieu?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  tuNgay?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  denNgay?: string;

  @ApiPropertyOptional({ example: 50 })
  @IsOptional()
  @IsNumber()
  limit?: number;

  @ApiPropertyOptional({ example: 0 })
  @IsOptional()
  @IsNumber()
  offset?: number;
}

// ============================================
// RESPONSE DTOs
// ============================================

export class KiemTraQuyenResponseDto {
  coQuyen: boolean;
  quyens: string[];
}

export class ThongTinPhienDangNhapDto {
  token: string;
  nguoiDung: {
    id: number;
    tenDangNhap: string;
    hoTen: string;
    email: string;
  };
  vaiTros: string[];
  quyens: string[];
  hetHan: Date;
}
