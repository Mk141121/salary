// DTOs cho module Phụ cấp Nhân viên
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNumber,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsDateString,
  Min,
} from 'class-validator';

export class TaoPhuCapDto {
  @ApiProperty({ description: 'ID nhân viên' })
  @IsNumber()
  @IsNotEmpty()
  nhanVienId: number;

  @ApiProperty({ description: 'ID khoản lương (chỉ loại THU_NHAP)' })
  @IsNumber()
  @IsNotEmpty()
  khoanLuongId: number;

  @ApiProperty({ description: 'Số tiền phụ cấp' })
  @IsNumber()
  @Min(0)
  soTien: number;

  @ApiProperty({ description: 'Ngày bắt đầu hiệu lực (YYYY-MM-DD)' })
  @IsDateString()
  @IsNotEmpty()
  tuNgay: string;

  @ApiPropertyOptional({ description: 'Ngày kết thúc hiệu lực (YYYY-MM-DD)' })
  @IsDateString()
  @IsOptional()
  denNgay?: string;

  @ApiPropertyOptional({ description: 'Ghi chú' })
  @IsString()
  @IsOptional()
  ghiChu?: string;

  @ApiPropertyOptional({ description: 'Người tạo' })
  @IsString()
  @IsOptional()
  nguoiTao?: string;
}

export class KetThucPhuCapDto {
  @ApiProperty({ description: 'Ngày kết thúc (YYYY-MM-DD)' })
  @IsDateString()
  @IsNotEmpty()
  denNgay: string;

  @ApiPropertyOptional({ description: 'Người cập nhật' })
  @IsString()
  @IsOptional()
  nguoiCapNhat?: string;
}

export class TangPhuCapDto {
  @ApiProperty({ description: 'Số tiền mới' })
  @IsNumber()
  @Min(0)
  soTienMoi: number;

  @ApiProperty({ description: 'Ngày bắt đầu hiệu lực mới (YYYY-MM-DD)' })
  @IsDateString()
  @IsNotEmpty()
  tuNgay: string;

  @ApiPropertyOptional({ description: 'Ghi chú' })
  @IsString()
  @IsOptional()
  ghiChu?: string;

  @ApiPropertyOptional({ description: 'Người tạo' })
  @IsString()
  @IsOptional()
  nguoiTao?: string;
}
