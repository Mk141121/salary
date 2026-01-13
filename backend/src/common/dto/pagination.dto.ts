// DTO Pagination chuẩn cho toàn bộ ứng dụng
import { IsOptional, IsNumber, IsString, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

// DTO chung cho pagination
export class PaginationDto {
  @ApiPropertyOptional({
    description: 'Số trang (bắt đầu từ 1)',
    default: 1,
    minimum: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  trang?: number = 1;

  @ApiPropertyOptional({
    description: 'Số bản ghi mỗi trang',
    default: 20,
    minimum: 1,
    maximum: 100,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(100)
  soLuong?: number = 20;

  @ApiPropertyOptional({
    description: 'Trường sắp xếp',
    example: 'ngayTao',
  })
  @IsOptional()
  @IsString()
  sapXepTheo?: string;

  @ApiPropertyOptional({
    description: 'Hướng sắp xếp (asc hoặc desc)',
    default: 'desc',
  })
  @IsOptional()
  @IsString()
  huongSapXep?: 'asc' | 'desc' = 'desc';
}

// Interface kết quả pagination
export interface PaginatedResult<T> {
  data: T[];
  meta: {
    tongSo: number;
    trang: number;
    soLuong: number;
    tongTrang: number;
    coTrangTruoc: boolean;
    coTrangSau: boolean;
  };
}

// Helper function để tính pagination
export function tinhPagination(trang: number = 1, soLuong: number = 20) {
  const skip = (trang - 1) * soLuong;
  return { skip, take: soLuong };
}

// Helper function để tạo kết quả pagination
export function taoPaginatedResult<T>(
  data: T[],
  tongSo: number,
  trang: number = 1,
  soLuong: number = 20,
): PaginatedResult<T> {
  const tongTrang = Math.ceil(tongSo / soLuong);
  return {
    data,
    meta: {
      tongSo,
      trang,
      soLuong,
      tongTrang,
      coTrangTruoc: trang > 1,
      coTrangSau: trang < tongTrang,
    },
  };
}
