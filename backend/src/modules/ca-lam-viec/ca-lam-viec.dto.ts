import {
  IsString,
  IsOptional,
  IsBoolean,
  IsInt,
  Min,
  Max,
  Matches,
  MaxLength,
  IsNotEmpty,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';

// DTO tạo ca làm việc
export class TaoCaLamViecDto {
  @IsString()
  @IsNotEmpty({ message: 'Mã ca không được để trống' })
  @MaxLength(50, { message: 'Mã ca tối đa 50 ký tự' })
  @Matches(/^[A-Z0-9_]+$/, { message: 'Mã ca chỉ chứa chữ in hoa, số và dấu gạch dưới' })
  maCa: string;

  @IsString()
  @IsNotEmpty({ message: 'Tên ca không được để trống' })
  @MaxLength(100, { message: 'Tên ca tối đa 100 ký tự' })
  tenCa: string;

  @IsString()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: 'Giờ vào phải có định dạng HH:mm' })
  gioVao: string;

  @IsString()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: 'Giờ ra phải có định dạng HH:mm' })
  gioRa: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(120)
  @Type(() => Number)
  nghiGiuaCaPhut?: number = 60;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(60)
  @Type(() => Number)
  graceInPhut?: number = 5;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(60)
  @Type(() => Number)
  graceLatePhut?: number = 5;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true')
  isCaDem?: boolean = false;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  phongBanId?: number;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  moTa?: string;

  @IsOptional()
  @IsString()
  @Matches(/^#[0-9A-Fa-f]{6}$/, { message: 'Màu hiển thị phải có định dạng hex (#RRGGBB)' })
  mauHienThi?: string;
}

// DTO cập nhật ca làm việc
export class CapNhatCaLamViecDto {
  @IsOptional()
  @IsString()
  @MaxLength(100, { message: 'Tên ca tối đa 100 ký tự' })
  tenCa?: string;

  @IsOptional()
  @IsString()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: 'Giờ vào phải có định dạng HH:mm' })
  gioVao?: string;

  @IsOptional()
  @IsString()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: 'Giờ ra phải có định dạng HH:mm' })
  gioRa?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(120)
  @Type(() => Number)
  nghiGiuaCaPhut?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(60)
  @Type(() => Number)
  graceInPhut?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(60)
  @Type(() => Number)
  graceLatePhut?: number;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true')
  isCaDem?: boolean;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  phongBanId?: number;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  moTa?: string;

  @IsOptional()
  @IsString()
  @Matches(/^#[0-9A-Fa-f]{6}$/, { message: 'Màu hiển thị phải có định dạng hex (#RRGGBB)' })
  mauHienThi?: string;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true')
  trangThai?: boolean;
}

// DTO filter danh sách ca
export class LocCaLamViecDto {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  phongBanId?: number;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true')
  trangThai?: boolean;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true')
  isCaDem?: boolean;

  @IsOptional()
  @IsString()
  tuKhoa?: string; // Search by maCa or tenCa
}
