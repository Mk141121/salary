// DTOs cho Quy chế lương
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNumber,
  IsString,
  IsOptional,
  IsDate,
  IsEnum,
  IsBoolean,
} from 'class-validator';
import { Type } from 'class-transformer';
import { TrangThaiQuyChe } from '@prisma/client';

// DTO tạo quy chế
export class TaoQuyCheDto {
  @ApiProperty({ description: 'ID phòng ban' })
  @IsNumber()
  phongBanId: number;

  @ApiProperty({ description: 'Tên quy chế' })
  @IsString()
  tenQuyChe: string;

  @ApiPropertyOptional({ description: 'Mô tả' })
  @IsOptional()
  @IsString()
  moTa?: string;

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
}

// DTO cập nhật quy chế
export class CapNhatQuyCheDto {
  @ApiPropertyOptional({ description: 'Tên quy chế' })
  @IsOptional()
  @IsString()
  tenQuyChe?: string;

  @ApiPropertyOptional({ description: 'Mô tả' })
  @IsOptional()
  @IsString()
  moTa?: string;

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

  @ApiPropertyOptional({ description: 'Trạng thái', enum: TrangThaiQuyChe })
  @IsOptional()
  @IsEnum(TrangThaiQuyChe)
  trangThai?: TrangThaiQuyChe;
}

// DTO nhân bản quy chế
export class NhanBanQuyCheDto {
  @ApiPropertyOptional({ description: 'Tên quy chế mới' })
  @IsOptional()
  @IsString()
  tenQuyChe?: string;

  @ApiProperty({ description: 'Ngày bắt đầu áp dụng' })
  @IsDate()
  @Type(() => Date)
  tuNgay: Date;

  @ApiPropertyOptional({ description: 'Người tạo' })
  @IsOptional()
  @IsString()
  nguoiTao?: string;
}

// DTO lọc quy chế
export class LocQuyCheDto {
  @ApiPropertyOptional({ description: 'ID phòng ban' })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  phongBanId?: number;

  @ApiPropertyOptional({ description: 'Trạng thái', enum: TrangThaiQuyChe })
  @IsOptional()
  @IsEnum(TrangThaiQuyChe)
  trangThai?: TrangThaiQuyChe;

  @ApiPropertyOptional({ description: 'Tháng hiệu lực' })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  thang?: number;

  @ApiPropertyOptional({ description: 'Năm hiệu lực' })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  nam?: number;
}
