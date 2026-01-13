// DTOs cho Snapshot & Phiếu Điều Chỉnh
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNumber,
  IsString,
  IsOptional,
  IsArray,
  ValidateNested,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';
import { LoaiDieuChinh } from '@prisma/client';

// DTO tạo snapshot
export class TaoSnapshotDto {
  @ApiProperty({ description: 'Người chốt bảng lương' })
  @IsString()
  nguoiChot: string;
}

// Chi tiết điều chỉnh
export class ChiTietDieuChinhDto {
  @ApiProperty({ description: 'ID khoản lương' })
  @IsNumber()
  khoanLuongId: number;

  @ApiProperty({ description: 'Số tiền cũ' })
  @IsNumber()
  soTienCu: number;

  @ApiProperty({ description: 'Số tiền mới' })
  @IsNumber()
  soTienMoi: number;

  @ApiPropertyOptional({ description: 'Ghi chú' })
  @IsOptional()
  @IsString()
  ghiChu?: string;
}

// DTO tạo phiếu điều chỉnh
export class TaoPhieuDieuChinhDto {
  @ApiProperty({ description: 'ID bảng lương' })
  @IsNumber()
  bangLuongId: number;

  @ApiProperty({ description: 'ID nhân viên' })
  @IsNumber()
  nhanVienId: number;

  @ApiProperty({ description: 'Loại điều chỉnh', enum: LoaiDieuChinh })
  @IsEnum(LoaiDieuChinh)
  loaiDieuChinh: LoaiDieuChinh;

  @ApiProperty({ description: 'Lý do điều chỉnh' })
  @IsString()
  lyDo: string;

  @ApiPropertyOptional({ description: 'Ghi chú' })
  @IsOptional()
  @IsString()
  ghiChu?: string;

  @ApiProperty({ description: 'Người tạo phiếu' })
  @IsString()
  nguoiTao: string;

  @ApiProperty({ description: 'Chi tiết điều chỉnh', type: [ChiTietDieuChinhDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ChiTietDieuChinhDto)
  chiTiets: ChiTietDieuChinhDto[];
}

// DTO duyệt phiếu
export class DuyetPhieuDto {
  @ApiProperty({ description: 'Người duyệt' })
  @IsString()
  nguoiDuyet: string;
}

// DTO từ chối phiếu
export class TuChoiPhieuDto {
  @ApiProperty({ description: 'Người từ chối' })
  @IsString()
  nguoiTuChoi: string;

  @ApiProperty({ description: 'Lý do từ chối' })
  @IsString()
  lyDoTuChoi: string;
}
