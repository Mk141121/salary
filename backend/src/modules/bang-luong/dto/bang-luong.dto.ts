// DTO cho Bảng Lương
import {
  IsString,
  IsOptional,
  IsNumber,
  IsBoolean,
  IsArray,
  ValidateNested,
  Min,
  Max,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';

export class TaoBangLuongDto {
  @ApiProperty({ description: 'Tháng', example: 1, minimum: 1, maximum: 12 })
  @IsNumber()
  @Min(1)
  @Max(12)
  thang: number;

  @ApiProperty({ description: 'Năm', example: 2026 })
  @IsNumber()
  @Min(2020)
  nam: number;

  @ApiProperty({ description: 'ID phòng ban', example: 1 })
  @IsNumber()
  phongBanId: number;

  @ApiPropertyOptional({ description: 'Tên bảng lương' })
  @IsOptional()
  @IsString()
  tenBangLuong?: string;

  @ApiPropertyOptional({
    description: 'Tự động tạo chi tiết từ cơ cấu lương',
    default: true,
  })
  @IsOptional()
  @IsBoolean()
  tuDongTaoChiTiet?: boolean;
}

export class CapNhatBangLuongDto extends PartialType(TaoBangLuongDto) {
  @ApiPropertyOptional({ description: 'Ghi chú' })
  @IsOptional()
  @IsString()
  ghiChu?: string;
}

export class CapNhatChiTietLuongDto {
  @ApiProperty({ description: 'ID bảng lương' })
  @IsNumber()
  bangLuongId: number;

  @ApiProperty({ description: 'ID nhân viên' })
  @IsNumber()
  nhanVienId: number;

  @ApiProperty({ description: 'ID khoản lương' })
  @IsNumber()
  khoanLuongId: number;

  @ApiProperty({ description: 'Số tiền', example: 10000000 })
  @IsNumber()
  @Min(0)
  soTien: number;

  @ApiPropertyOptional({ description: 'Ghi chú' })
  @IsOptional()
  @IsString()
  ghiChu?: string;

  @ApiPropertyOptional({ description: 'Người thay đổi' })
  @IsOptional()
  @IsString()
  nguoiThayDoi?: string;

  @ApiPropertyOptional({ description: 'Lý do thay đổi' })
  @IsOptional()
  @IsString()
  lyDo?: string;
}

export class CapNhatNhieuChiTietDto {
  @ApiProperty({
    description: 'Danh sách chi tiết cần cập nhật',
    type: [CapNhatChiTietLuongDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CapNhatChiTietLuongDto)
  danhSach: CapNhatChiTietLuongDto[];
}

export class ChotBangLuongDto {
  @ApiProperty({ description: 'Người chốt', example: 'Nguyễn Văn A' })
  @IsString()
  nguoiChot: string;

  @ApiPropertyOptional({ description: 'Ghi chú' })
  @IsOptional()
  @IsString()
  ghiChu?: string;
}
