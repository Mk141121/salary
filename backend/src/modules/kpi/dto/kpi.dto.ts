import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsOptional,
  IsArray,
  IsEnum,
  IsDateString,
  ValidateNested,
  Min,
  Max,
} from 'class-validator';
import { Type } from 'class-transformer';

// ============================================
// TEMPLATE KPI DTOs
// ============================================

export class TaoChiTieuKPIDto {
  @ApiProperty({ example: 'DOANH_SO' })
  @IsString()
  maChiTieu: string;

  @ApiProperty({ example: 'Doanh số bán hàng' })
  @IsString()
  tenChiTieu: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  moTa?: string;

  @ApiProperty({ example: 'VNĐ' })
  @IsString()
  donViTinh: string;

  @ApiProperty({ example: 30, description: 'Trọng số %' })
  @IsNumber()
  @Min(0)
  @Max(100)
  trongSo: number;

  @ApiProperty({ enum: ['SO', 'PHAN_TRAM', 'TIEN', 'THOI_GIAN', 'DANH_GIA'] })
  @IsEnum(['SO', 'PHAN_TRAM', 'TIEN', 'THOI_GIAN', 'DANH_GIA'])
  loaiChiTieu: string;

  @ApiPropertyOptional({ example: 50000000 })
  @IsOptional()
  @IsNumber()
  chiTieuToiThieu?: number;

  @ApiPropertyOptional({ example: 100000000 })
  @IsOptional()
  @IsNumber()
  chiTieuMucTieu?: number;

  @ApiPropertyOptional({ example: 150000000 })
  @IsOptional()
  @IsNumber()
  chiTieuVuotMuc?: number;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsNumber()
  thuTu?: number;
}

export class TaoTemplateKPIDto {
  @ApiProperty({ example: 'TPL-SALES' })
  @IsString()
  maTemplate: string;

  @ApiProperty({ example: 'Template KPI Phòng Kinh doanh' })
  @IsString()
  tenTemplate: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  phongBanId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  moTa?: string;

  @ApiPropertyOptional({ type: [TaoChiTieuKPIDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TaoChiTieuKPIDto)
  chiTieuKPIs?: TaoChiTieuKPIDto[];
}

export class CapNhatTemplateKPIDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  tenTemplate?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  phongBanId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  moTa?: string;

  @ApiPropertyOptional()
  @IsOptional()
  trangThai?: boolean;
}

// ============================================
// KỲ ĐÁNH GIÁ DTOs
// ============================================

export class TaoKyDanhGiaDto {
  @ApiProperty({ example: 'KPI-2025-01' })
  @IsString()
  maKy: string;

  @ApiProperty({ example: 'Đánh giá KPI tháng 01/2025' })
  @IsString()
  tenKy: string;

  @ApiProperty({ enum: ['THANG', 'QUY', 'NAM'] })
  @IsEnum(['THANG', 'QUY', 'NAM'])
  loaiKy: string;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsNumber()
  thang?: number;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsNumber()
  quy?: number;

  @ApiProperty({ example: 2025 })
  @IsNumber()
  nam: number;

  @ApiProperty({ example: '2025-01-01' })
  @IsDateString()
  tuNgay: string;

  @ApiProperty({ example: '2025-01-31' })
  @IsDateString()
  denNgay: string;

  @ApiProperty({ example: '2025-02-05' })
  @IsDateString()
  hanNopKetQua: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  ghiChu?: string;
}

export class CapNhatTrangThaiKyDto {
  @ApiProperty({ enum: ['MO', 'DONG', 'DUYET', 'HOAN_THANH'] })
  @IsEnum(['MO', 'DONG', 'DUYET', 'HOAN_THANH'])
  trangThai: string;
}

// ============================================
// ĐÁNH GIÁ NHÂN VIÊN DTOs
// ============================================

export class NhapKetQuaKPIDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  chiTieuId: number;

  @ApiProperty({ example: 85000000 })
  @IsNumber()
  ketQuaDat: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  ghiChu?: string;
}

export class TaoDanhGiaKPIDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  kyDanhGiaId: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  nhanVienId: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  templateId: number;

  @ApiPropertyOptional({ type: [NhapKetQuaKPIDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => NhapKetQuaKPIDto)
  ketQuaKPIs?: NhapKetQuaKPIDto[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  nhanXetChung?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  nguoiDanhGia?: string;
}

export class CapNhatKetQuaKPIDto {
  @ApiProperty({ type: [NhapKetQuaKPIDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => NhapKetQuaKPIDto)
  ketQuaKPIs: NhapKetQuaKPIDto[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  nhanXetChung?: string;
}

export class DuyetDanhGiaKPIDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  nguoiDuyet?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  nhanXet?: string;
}

export class TuChoiDanhGiaKPIDto {
  @ApiProperty({ example: 'Số liệu chưa chính xác' })
  @IsString()
  lyDoTuChoi: string;
}

// ============================================
// CẤU HÌNH THƯỞNG DTOs
// ============================================

export class TaoCauHinhThuongDto {
  @ApiProperty({ example: 2025 })
  @IsNumber()
  nam: number;

  @ApiProperty({ enum: ['XUAT_SAC', 'TOT', 'KHA', 'TRUNG_BINH', 'YEU'] })
  @IsEnum(['XUAT_SAC', 'TOT', 'KHA', 'TRUNG_BINH', 'YEU'])
  xepLoai: string;

  @ApiProperty({ example: 95 })
  @IsNumber()
  diemToiThieu: number;

  @ApiProperty({ example: 100 })
  @IsNumber()
  diemToiDa: number;

  @ApiProperty({ example: 2, description: 'Hệ số thưởng (1x, 1.5x, 2x...)' })
  @IsNumber()
  heSoThuong: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  moTa?: string;
}

export class TinhThuongKPIDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  kyDanhGiaId: number;

  @ApiProperty({ example: 5000000, description: 'Mức thưởng cơ bản' })
  @IsNumber()
  mucThuongCoBan: number;
}

// ============================================
// RESPONSE DTOs
// ============================================

export class KetQuaTinhThuongDto {
  nhanVienId: number;
  maNhanVien: string;
  hoTen: string;
  diemTongKet: number;
  xepLoai: string;
  heSoThuong: number;
  soTienThuong: number;
}
