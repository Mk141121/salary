// DTOs cho Quy chế Rule
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNumber,
  IsString,
  IsOptional,
  IsEnum,
  IsBoolean,
  IsObject,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { LoaiRule, CheDoGop } from '@prisma/client';

// ============================================
// CHUẨN JSON RULE
// ============================================

// Điều kiện áp dụng
export class DieuKienApDung {
  @ApiPropertyOptional({ description: 'Danh sách vai trò áp dụng' })
  @IsOptional()
  @IsArray()
  vaiTro?: string[];

  @ApiPropertyOptional({ description: 'Danh sách cấp trách nhiệm áp dụng' })
  @IsOptional()
  @IsArray()
  capTrachNhiem?: number[];

  @ApiPropertyOptional({ description: 'Danh sách ID nhân viên áp dụng' })
  @IsOptional()
  @IsArray()
  nhanVienIds?: number[];

  @ApiPropertyOptional({ description: 'Danh sách ID phòng ban áp dụng' })
  @IsOptional()
  @IsArray()
  phongBanIds?: number[];
}

export class DieuKienJson {
  @ApiPropertyOptional({ description: 'Điều kiện áp dụng', type: DieuKienApDung })
  @IsOptional()
  @ValidateNested()
  @Type(() => DieuKienApDung)
  apDungCho?: DieuKienApDung;
}

// Bậc thang
export class BacThang {
  @ApiProperty({ description: 'Từ giá trị' })
  @IsNumber()
  from: number;

  @ApiProperty({ description: 'Đến giá trị' })
  @IsNumber()
  to: number;

  @ApiPropertyOptional({ description: 'Số tiền cố định' })
  @IsOptional()
  @IsNumber()
  soTien?: number;

  @ApiPropertyOptional({ description: 'Số tiền mỗi lần (cho sự kiện)' })
  @IsOptional()
  @IsNumber()
  soTienMoiLan?: number;

  @ApiPropertyOptional({ description: 'Hệ số' })
  @IsOptional()
  @IsNumber()
  heSo?: number;
}

// Công thức JSON cho các loại rule
export class CongThucCoDinh {
  @ApiProperty({ description: 'Số tiền cố định' })
  @IsNumber()
  soTien: number;
}

export class CongThucTheoHeSo {
  @ApiProperty({ description: 'Nguồn base', example: 'LUONG_CO_BAN' })
  @IsString()
  base: string;

  @ApiProperty({ description: 'Hệ số' })
  @IsNumber()
  heSo: number;

  @ApiPropertyOptional({ description: 'Cộng thêm' })
  @IsOptional()
  @IsNumber()
  congThem?: number;
}

export class CongThucBacThang {
  @ApiProperty({ description: 'Trường dữ liệu để so sánh', example: 'cap_trach_nhiem' })
  @IsString()
  field: string;

  @ApiProperty({ description: 'Danh sách bậc thang', type: [BacThang] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BacThang)
  bac: BacThang[];
}

export class CongThucTheoSuKien {
  @ApiProperty({ description: 'Mã sự kiện', example: 'DI_TRE' })
  @IsString()
  maSuKien: string;

  @ApiProperty({ description: 'Cách tính', example: 'BAC_THANG' })
  @IsString()
  cachTinh: 'CO_DINH' | 'BAC_THANG';

  @ApiPropertyOptional({ description: 'Số tiền cố định mỗi lần (nếu cachTinh = CO_DINH)' })
  @IsOptional()
  @IsNumber()
  soTienMoiLan?: number;

  @ApiPropertyOptional({ description: 'Bậc thang (nếu cachTinh = BAC_THANG)', type: [BacThang] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BacThang)
  bac?: BacThang[];
}

export class CongThucBieuThuc {
  @ApiProperty({ description: 'Biểu thức công thức', example: 'LUONG_CO_BAN * HE_SO_TRACH_NHIEM + 200000' })
  @IsString()
  bieuThuc: string;
}

// ============================================
// DTO TẠO RULE
// ============================================
export class TaoQuyCheRuleDto {
  @ApiProperty({ description: 'ID quy chế' })
  @IsNumber()
  quyCheId: number;

  @ApiProperty({ description: 'ID khoản lương' })
  @IsNumber()
  khoanLuongId: number;

  @ApiProperty({ description: 'Tên rule' })
  @IsString()
  tenRule: string;

  @ApiPropertyOptional({ description: 'Mô tả' })
  @IsOptional()
  @IsString()
  moTa?: string;

  @ApiProperty({ description: 'Loại rule', enum: LoaiRule })
  @IsEnum(LoaiRule)
  loaiRule: LoaiRule;

  @ApiPropertyOptional({ description: 'Điều kiện JSON' })
  @IsOptional()
  @IsObject()
  dieuKienJson?: DieuKienJson;

  @ApiProperty({ description: 'Công thức JSON' })
  @IsObject()
  congThucJson: CongThucCoDinh | CongThucTheoHeSo | CongThucBacThang | CongThucTheoSuKien | CongThucBieuThuc;

  @ApiPropertyOptional({ description: 'Thứ tự ưu tiên (nhỏ = cao)' })
  @IsOptional()
  @IsNumber()
  thuTuUuTien?: number;

  @ApiPropertyOptional({ description: 'Chế độ gộp', enum: CheDoGop })
  @IsOptional()
  @IsEnum(CheDoGop)
  cheDoGop?: CheDoGop;

  @ApiPropertyOptional({ description: 'Cho phép chỉnh tay' })
  @IsOptional()
  @IsBoolean()
  choPhepChinhTay?: boolean;

  @ApiPropertyOptional({ description: 'Người tạo' })
  @IsOptional()
  @IsString()
  nguoiTao?: string;
}

// DTO cập nhật rule
export class CapNhatQuyCheRuleDto {
  @ApiPropertyOptional({ description: 'Tên rule' })
  @IsOptional()
  @IsString()
  tenRule?: string;

  @ApiPropertyOptional({ description: 'Mô tả' })
  @IsOptional()
  @IsString()
  moTa?: string;

  @ApiPropertyOptional({ description: 'Loại rule', enum: LoaiRule })
  @IsOptional()
  @IsEnum(LoaiRule)
  loaiRule?: LoaiRule;

  @ApiPropertyOptional({ description: 'Điều kiện JSON' })
  @IsOptional()
  @IsObject()
  dieuKienJson?: DieuKienJson;

  @ApiPropertyOptional({ description: 'Công thức JSON' })
  @IsOptional()
  @IsObject()
  congThucJson?: CongThucCoDinh | CongThucTheoHeSo | CongThucBacThang | CongThucTheoSuKien | CongThucBieuThuc;

  @ApiPropertyOptional({ description: 'Thứ tự ưu tiên' })
  @IsOptional()
  @IsNumber()
  thuTuUuTien?: number;

  @ApiPropertyOptional({ description: 'Chế độ gộp', enum: CheDoGop })
  @IsOptional()
  @IsEnum(CheDoGop)
  cheDoGop?: CheDoGop;

  @ApiPropertyOptional({ description: 'Cho phép chỉnh tay' })
  @IsOptional()
  @IsBoolean()
  choPhepChinhTay?: boolean;

  @ApiPropertyOptional({ description: 'Trạng thái' })
  @IsOptional()
  @IsBoolean()
  trangThai?: boolean;
}

// DTO validate rule
export class ValidateRuleDto {
  @ApiProperty({ description: 'Loại rule', enum: LoaiRule })
  @IsEnum(LoaiRule)
  loaiRule: LoaiRule;

  @ApiPropertyOptional({ description: 'Điều kiện JSON' })
  @IsOptional()
  @IsObject()
  dieuKienJson?: DieuKienJson;

  @ApiProperty({ description: 'Công thức JSON' })
  @IsObject()
  congThucJson: CongThucCoDinh | CongThucTheoHeSo | CongThucBacThang | CongThucTheoSuKien | CongThucBieuThuc;
}

// Kết quả validate
export class KetQuaValidate {
  hopLe: boolean;
  danhSachLoi: string[];
  canhBao?: string[];
}

// DTO preview rule
export class PreviewRuleDto {
  @ApiPropertyOptional({ description: 'ID nhân viên để test' })
  @IsOptional()
  @IsNumber()
  nhanVienId?: number;

  @ApiProperty({ description: 'ID quy chế' })
  @IsNumber()
  quyCheId: number;

  @ApiPropertyOptional({ description: 'Dữ liệu giả lập' })
  @IsOptional()
  @IsObject()
  duLieuGiaLap?: Record<string, number>;
}

// Kết quả preview
export class KetQuaPreview {
  tongTien: number;
  chiTiet: {
    khoanLuong: string;
    soTien: number;
    giaiThich: string;
  }[];
  trace: {
    ruleName: string;
    input: Record<string, unknown>;
    output: number;
    message: string;
  }[];
}

// DTO sắp xếp rule (drag-drop)
export class SapXepRuleDto {
  @ApiProperty({ description: 'Danh sách ID rule theo thứ tự mới' })
  @IsArray()
  @IsNumber({}, { each: true })
  danhSachRuleId: number[];
}
