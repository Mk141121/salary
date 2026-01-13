// DTO cho Khoản Lương
import {
  IsString,
  IsOptional,
  IsBoolean,
  IsEnum,
  IsNumber,
  IsArray,
  ValidateNested,
  MinLength,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { LoaiKhoanLuong } from '@prisma/client';

export class TaoKhoanLuongDto {
  @ApiProperty({ description: 'Mã khoản lương', example: 'LUONG_CO_BAN' })
  @IsString()
  @MinLength(1)
  maKhoan: string;

  @ApiProperty({ description: 'Tên khoản lương', example: 'Lương cơ bản' })
  @IsString()
  @MinLength(2)
  tenKhoan: string;

  @ApiPropertyOptional({
    description: 'Loại khoản lương',
    enum: LoaiKhoanLuong,
    default: 'THU_NHAP',
  })
  @IsOptional()
  @IsEnum(LoaiKhoanLuong)
  loai?: LoaiKhoanLuong;

  @ApiPropertyOptional({ description: 'Khoản này có chịu thuế không', default: false })
  @IsOptional()
  @IsBoolean()
  chiuThue?: boolean;

  @ApiPropertyOptional({ description: 'Phạm vi áp dụng (null = toàn công ty)' })
  @IsOptional()
  @IsString()
  phamViApDung?: string;

  @ApiPropertyOptional({ description: 'Mô tả khoản lương' })
  @IsOptional()
  @IsString()
  moTa?: string;

  @ApiPropertyOptional({ description: 'Thứ tự hiển thị' })
  @IsOptional()
  @IsNumber()
  thuTu?: number;
}

export class CapNhatKhoanLuongDto extends PartialType(TaoKhoanLuongDto) {
  @ApiPropertyOptional({ description: 'Trạng thái hoạt động' })
  @IsOptional()
  @IsBoolean()
  trangThai?: boolean;
}

// DTO cho cập nhật thứ tự
class ThuTuItem {
  @ApiProperty({ description: 'ID khoản lương' })
  @IsNumber()
  id: number;

  @ApiProperty({ description: 'Thứ tự mới' })
  @IsNumber()
  thuTu: number;
}

export class CapNhatThuTuDto {
  @ApiProperty({ description: 'Danh sách ID và thứ tự mới', type: [ThuTuItem] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ThuTuItem)
  danhSach: ThuTuItem[];
}
