// DTOs cho Rule Engine
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNumber,
  IsString,
  IsOptional,
  IsDate,
  IsArray,
  ValidateNested,
  IsEnum,
  IsObject,
} from 'class-validator';
import { Type } from 'class-transformer';
import { KieuDuLieu } from '@prisma/client';

// DTO biến số
export class BienSoDto {
  @ApiProperty({ description: 'Tên biến' })
  @IsString()
  tenBien: string;

  @ApiPropertyOptional({ description: 'Mô tả' })
  @IsOptional()
  @IsString()
  moTa?: string;

  @ApiPropertyOptional({ description: 'Kiểu dữ liệu', enum: KieuDuLieu })
  @IsOptional()
  @IsEnum(KieuDuLieu)
  kieuDuLieu?: KieuDuLieu;

  @ApiPropertyOptional({ description: 'Nguồn dữ liệu' })
  @IsOptional()
  @IsString()
  nguonDuLieu?: string;

  @ApiPropertyOptional({ description: 'Giá trị mặc định' })
  @IsOptional()
  @IsString()
  giaTriMacDinh?: string;
}

// DTO tạo công thức
export class TaoCongThucDto {
  @ApiProperty({ description: 'Mã công thức' })
  @IsString()
  maCongThuc: string;

  @ApiProperty({ description: 'Tên công thức' })
  @IsString()
  tenCongThuc: string;

  @ApiPropertyOptional({ description: 'Mô tả' })
  @IsOptional()
  @IsString()
  moTa?: string;

  @ApiPropertyOptional({ description: 'ID phòng ban (null = toàn công ty)' })
  @IsOptional()
  @IsNumber()
  phongBanId?: number;

  @ApiProperty({ description: 'Biểu thức công thức', example: 'LUONG_CO_BAN * (CONG_THUC_TE / CONG_CHUAN)' })
  @IsString()
  congThuc: string;

  @ApiProperty({ description: 'Ngày bắt đầu áp dụng' })
  @IsDate()
  @Type(() => Date)
  tuNgay: Date;

  @ApiPropertyOptional({ description: 'Ngày kết thúc' })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  denNgay?: Date;

  @ApiPropertyOptional({ description: 'Người tạo' })
  @IsOptional()
  @IsString()
  nguoiTao?: string;

  @ApiPropertyOptional({ description: 'Danh sách biến số', type: [BienSoDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BienSoDto)
  bienSos?: BienSoDto[];
}

// DTO cập nhật công thức
export class CapNhatCongThucDto {
  @ApiProperty({ description: 'Biểu thức công thức mới' })
  @IsString()
  congThuc: string;

  @ApiPropertyOptional({ description: 'Lý do thay đổi' })
  @IsOptional()
  @IsString()
  lyDoThayDoi?: string;

  @ApiProperty({ description: 'Người thay đổi' })
  @IsString()
  nguoiThayDoi: string;
}

// DTO thêm biến số
export class ThemBienSoDto {
  @ApiProperty({ description: 'Tên biến' })
  @IsString()
  tenBien: string;

  @ApiPropertyOptional({ description: 'Mô tả' })
  @IsOptional()
  @IsString()
  moTa?: string;

  @ApiPropertyOptional({ description: 'Kiểu dữ liệu', enum: KieuDuLieu })
  @IsOptional()
  @IsEnum(KieuDuLieu)
  kieuDuLieu?: KieuDuLieu;

  @ApiPropertyOptional({ description: 'Nguồn dữ liệu' })
  @IsOptional()
  @IsString()
  nguonDuLieu?: string;

  @ApiPropertyOptional({ description: 'Giá trị mặc định' })
  @IsOptional()
  @IsString()
  giaTriMacDinh?: string;
}

// DTO test công thức
export class TestCongThucDto {
  @ApiProperty({ description: 'Biểu thức công thức', example: 'LUONG_CO_BAN * 1.5' })
  @IsString()
  congThuc: string;

  @ApiProperty({ description: 'Giá trị biến số', example: { LUONG_CO_BAN: 10000000 } })
  @IsObject()
  bienSo: Record<string, number | string>;
}

// DTO tính lương
export class TinhLuongDto {
  @ApiProperty({ description: 'ID nhân viên' })
  @IsNumber()
  nhanVienId: number;

  @ApiProperty({ description: 'ID công thức' })
  @IsNumber()
  congThucId: number;

  @ApiProperty({ description: 'Tháng (1-12)' })
  @IsNumber()
  thang: number;

  @ApiProperty({ description: 'Năm' })
  @IsNumber()
  nam: number;
}
