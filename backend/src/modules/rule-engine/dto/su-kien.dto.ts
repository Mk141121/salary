// DTOs cho Sự kiện thưởng/phạt
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNumber,
  IsString,
  IsOptional,
  IsDate,
  IsEnum,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';
import { LoaiSuKien, TrangThaiSuKien } from '@prisma/client';

// DTO tạo sự kiện
export class TaoSuKienDto {
  @ApiProperty({ description: 'ID nhân viên' })
  @IsNumber()
  nhanVienId: number;

  @ApiProperty({ description: 'ID phòng ban' })
  @IsNumber()
  phongBanId: number;

  @ApiProperty({ description: 'Ngày xảy ra sự kiện' })
  @IsDate()
  @Type(() => Date)
  ngay: Date;

  @ApiProperty({ description: 'Loại sự kiện', enum: LoaiSuKien })
  @IsEnum(LoaiSuKien)
  loaiSuKien: LoaiSuKien;

  @ApiProperty({ description: 'Mã sự kiện', example: 'DI_TRE' })
  @IsString()
  maSuKien: string;

  @ApiPropertyOptional({ description: 'Giá trị (số lần/điểm)' })
  @IsOptional()
  @IsNumber()
  giaTri?: number;

  @ApiPropertyOptional({ description: 'Số tiền quy đổi' })
  @IsOptional()
  @IsNumber()
  soTien?: number;

  @ApiPropertyOptional({ description: 'Ghi chú' })
  @IsOptional()
  @IsString()
  ghiChu?: string;

  @ApiPropertyOptional({ description: 'Người tạo' })
  @IsOptional()
  @IsString()
  nguoiTao?: string;
}

// DTO cập nhật sự kiện
export class CapNhatSuKienDto {
  @ApiPropertyOptional({ description: 'Ngày xảy ra sự kiện' })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  ngay?: Date;

  @ApiPropertyOptional({ description: 'Loại sự kiện', enum: LoaiSuKien })
  @IsOptional()
  @IsEnum(LoaiSuKien)
  loaiSuKien?: LoaiSuKien;

  @ApiPropertyOptional({ description: 'Mã sự kiện' })
  @IsOptional()
  @IsString()
  maSuKien?: string;

  @ApiPropertyOptional({ description: 'Giá trị' })
  @IsOptional()
  @IsNumber()
  giaTri?: number;

  @ApiPropertyOptional({ description: 'Số tiền quy đổi' })
  @IsOptional()
  @IsNumber()
  soTien?: number;

  @ApiPropertyOptional({ description: 'Ghi chú' })
  @IsOptional()
  @IsString()
  ghiChu?: string;
}

// DTO duyệt sự kiện
export class DuyetSuKienDto {
  @ApiProperty({ description: 'Người duyệt' })
  @IsString()
  duyetBoi: string;

  @ApiPropertyOptional({ description: 'Ghi chú duyệt' })
  @IsOptional()
  @IsString()
  ghiChu?: string;
}

// DTO duyệt hàng loạt
export class DuyetNhieuSuKienDto {
  @ApiProperty({ description: 'Danh sách ID sự kiện' })
  @IsArray()
  @IsNumber({}, { each: true })
  ids: number[];

  @ApiProperty({ description: 'Người duyệt' })
  @IsString()
  duyetBoi: string;
}

// DTO lọc sự kiện
export class LocSuKienDto {
  @ApiPropertyOptional({ description: 'ID nhân viên' })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  nhanVienId?: number;

  @ApiPropertyOptional({ description: 'ID phòng ban' })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  phongBanId?: number;

  @ApiPropertyOptional({ description: 'Loại sự kiện', enum: LoaiSuKien })
  @IsOptional()
  @IsEnum(LoaiSuKien)
  loaiSuKien?: LoaiSuKien;

  @ApiPropertyOptional({ description: 'Mã sự kiện' })
  @IsOptional()
  @IsString()
  maSuKien?: string;

  @ApiPropertyOptional({ description: 'Trạng thái', enum: TrangThaiSuKien })
  @IsOptional()
  @IsEnum(TrangThaiSuKien)
  trangThai?: TrangThaiSuKien;

  @ApiPropertyOptional({ description: 'Tháng' })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  thang?: number;

  @ApiPropertyOptional({ description: 'Năm' })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  nam?: number;

  @ApiPropertyOptional({ description: 'Từ ngày' })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  tuNgay?: Date;

  @ApiPropertyOptional({ description: 'Đến ngày' })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  denNgay?: Date;
}

// DTO danh mục sự kiện
export class TaoDanhMucSuKienDto {
  @ApiProperty({ description: 'Mã sự kiện' })
  @IsString()
  maSuKien: string;

  @ApiProperty({ description: 'Tên sự kiện' })
  @IsString()
  tenSuKien: string;

  @ApiProperty({ description: 'Loại', enum: LoaiSuKien })
  @IsEnum(LoaiSuKien)
  loai: LoaiSuKien;

  @ApiPropertyOptional({ description: 'Mô tả' })
  @IsOptional()
  @IsString()
  moTa?: string;

  @ApiPropertyOptional({ description: 'Số tiền mặc định' })
  @IsOptional()
  @IsNumber()
  soTienMacDinh?: number;
}
