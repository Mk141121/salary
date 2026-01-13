// DTOs cho module BHXH & Thuế TNCN
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNumber,
  IsString,
  IsOptional,
  IsDate,
  IsBoolean,
  Min,
  Max,
} from 'class-validator';
import { Type } from 'class-transformer';

// DTO lưu cấu hình BHXH
export class LuuCauHinhBHXHDto {
  @ApiProperty({ description: 'Năm áp dụng', example: 2025 })
  @IsNumber()
  nam: number;

  @ApiProperty({ description: 'Tỷ lệ BHXH nhân viên đóng (%)', example: 8 })
  @IsNumber()
  @Min(0)
  @Max(100)
  tyLeBHXH_NV: number;

  @ApiProperty({ description: 'Tỷ lệ BHXH doanh nghiệp đóng (%)', example: 17.5 })
  @IsNumber()
  @Min(0)
  @Max(100)
  tyLeBHXH_DN: number;

  @ApiProperty({ description: 'Tỷ lệ BHYT nhân viên đóng (%)', example: 1.5 })
  @IsNumber()
  @Min(0)
  @Max(100)
  tyLeBHYT_NV: number;

  @ApiProperty({ description: 'Tỷ lệ BHYT doanh nghiệp đóng (%)', example: 3 })
  @IsNumber()
  @Min(0)
  @Max(100)
  tyLeBHYT_DN: number;

  @ApiProperty({ description: 'Tỷ lệ BHTN nhân viên đóng (%)', example: 1 })
  @IsNumber()
  @Min(0)
  @Max(100)
  tyLeBHTN_NV: number;

  @ApiProperty({ description: 'Tỷ lệ BHTN doanh nghiệp đóng (%)', example: 1 })
  @IsNumber()
  @Min(0)
  @Max(100)
  tyLeBHTN_DN: number;

  @ApiProperty({ description: 'Lương cơ bản tối thiểu vùng', example: 4680000 })
  @IsNumber()
  @Min(0)
  luongCoBanToiThieu: number;

  @ApiProperty({ description: 'Trần đóng BHXH', example: 46800000 })
  @IsNumber()
  @Min(0)
  tranDongBHXH: number;

  @ApiProperty({ description: 'Lương cơ sở', example: 2340000 })
  @IsNumber()
  @Min(0)
  luongCoSo: number;
}

// DTO thêm người phụ thuộc
export class ThemNguoiPhuThuocDto {
  @ApiProperty({ description: 'ID nhân viên' })
  @IsNumber()
  nhanVienId: number;

  @ApiProperty({ description: 'Họ tên người phụ thuộc' })
  @IsString()
  hoTen: string;

  @ApiPropertyOptional({ description: 'Ngày sinh' })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  ngaySinh?: Date;

  @ApiProperty({ description: 'Quan hệ (Con, Bố, Mẹ, Vợ/Chồng...)' })
  @IsString()
  quanHe: string;

  @ApiPropertyOptional({ description: 'Mã số thuế' })
  @IsOptional()
  @IsString()
  maSoThue?: string;

  @ApiPropertyOptional({ description: 'Số CCCD' })
  @IsOptional()
  @IsString()
  soCCCD?: string;

  @ApiProperty({ description: 'Ngày bắt đầu tính giảm trừ' })
  @IsDate()
  @Type(() => Date)
  tuNgay: Date;

  @ApiPropertyOptional({ description: 'Ngày kết thúc' })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  denNgay?: Date;

  @ApiPropertyOptional({ description: 'Ghi chú' })
  @IsOptional()
  @IsString()
  ghiChu?: string;
}

// DTO cập nhật người phụ thuộc
export class CapNhatNguoiPhuThuocDto {
  @ApiPropertyOptional({ description: 'Họ tên người phụ thuộc' })
  @IsOptional()
  @IsString()
  hoTen?: string;

  @ApiPropertyOptional({ description: 'Ngày sinh' })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  ngaySinh?: Date;

  @ApiPropertyOptional({ description: 'Quan hệ' })
  @IsOptional()
  @IsString()
  quanHe?: string;

  @ApiPropertyOptional({ description: 'Mã số thuế' })
  @IsOptional()
  @IsString()
  maSoThue?: string;

  @ApiPropertyOptional({ description: 'Số CCCD' })
  @IsOptional()
  @IsString()
  soCCCD?: string;

  @ApiPropertyOptional({ description: 'Ngày bắt đầu' })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  tuNgay?: Date;

  @ApiPropertyOptional({ description: 'Ngày kết thúc' })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  denNgay?: Date;

  @ApiPropertyOptional({ description: 'Trạng thái' })
  @IsOptional()
  @IsBoolean()
  trangThai?: boolean;

  @ApiPropertyOptional({ description: 'Ghi chú' })
  @IsOptional()
  @IsString()
  ghiChu?: string;
}
