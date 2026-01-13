// DTOs cho Chấm công
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNumber,
  IsString,
  IsOptional,
  IsDate,
  IsArray,
  ValidateNested,
  IsEnum,
  Min,
  Max,
} from 'class-validator';
import { Type } from 'class-transformer';
import { LoaiNgayCong, TrangThaiChamCong } from '@prisma/client';

// DTO lưu chấm công
export class LuuChamCongDto {
  @ApiProperty({ description: 'ID nhân viên' })
  @IsNumber()
  nhanVienId: number;

  @ApiProperty({ description: 'Tháng (1-12)' })
  @IsNumber()
  @Min(1)
  @Max(12)
  thang: number;

  @ApiProperty({ description: 'Năm' })
  @IsNumber()
  nam: number;

  @ApiPropertyOptional({ description: 'Số công chuẩn', default: 26 })
  @IsOptional()
  @IsNumber()
  soCongChuan?: number;

  @ApiPropertyOptional({ description: 'Số công thực tế' })
  @IsOptional()
  @IsNumber()
  soCongThucTe?: number;

  @ApiPropertyOptional({ description: 'Số ngày nghỉ phép' })
  @IsOptional()
  @IsNumber()
  soNgayNghiPhep?: number;

  @ApiPropertyOptional({ description: 'Số ngày nghỉ không lương' })
  @IsOptional()
  @IsNumber()
  soNgayNghiKhongLuong?: number;

  @ApiPropertyOptional({ description: 'Số giờ OT' })
  @IsOptional()
  @IsNumber()
  soGioOT?: number;

  @ApiPropertyOptional({ description: 'Số giờ OT đêm' })
  @IsOptional()
  @IsNumber()
  soGioOTDem?: number;

  @ApiPropertyOptional({ description: 'Số giờ OT chủ nhật' })
  @IsOptional()
  @IsNumber()
  soGioOTChuNhat?: number;

  @ApiPropertyOptional({ description: 'Số giờ OT ngày lễ' })
  @IsOptional()
  @IsNumber()
  soGioOTLe?: number;

  @ApiPropertyOptional({ description: 'Số lần đi muộn' })
  @IsOptional()
  @IsNumber()
  soLanDiMuon?: number;

  @ApiPropertyOptional({ description: 'Số lần về sớm' })
  @IsOptional()
  @IsNumber()
  soLanVeSom?: number;

  @ApiPropertyOptional({ description: 'Ghi chú' })
  @IsOptional()
  @IsString()
  ghiChu?: string;
}

// DTO lưu chi tiết chấm công
export class LuuChiTietChamCongDto {
  @ApiProperty({ description: 'ID nhân viên' })
  @IsNumber()
  nhanVienId: number;

  @ApiProperty({ description: 'Ngày' })
  @IsDate()
  @Type(() => Date)
  ngay: Date;

  @ApiPropertyOptional({ description: 'Giờ vào' })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  gioVao?: Date;

  @ApiPropertyOptional({ description: 'Giờ ra' })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  gioRa?: Date;

  @ApiPropertyOptional({ description: 'Loại ngày', enum: LoaiNgayCong })
  @IsOptional()
  @IsEnum(LoaiNgayCong)
  loaiNgay?: LoaiNgayCong;

  @ApiPropertyOptional({ description: 'Trạng thái', enum: TrangThaiChamCong })
  @IsOptional()
  @IsEnum(TrangThaiChamCong)
  trangThai?: TrangThaiChamCong;

  @ApiPropertyOptional({ description: 'Số giờ làm' })
  @IsOptional()
  @IsNumber()
  soGioLam?: number;

  @ApiPropertyOptional({ description: 'Số giờ OT' })
  @IsOptional()
  @IsNumber()
  soGioOT?: number;

  @ApiPropertyOptional({ description: 'Ghi chú' })
  @IsOptional()
  @IsString()
  ghiChu?: string;
}

// DTO khởi tạo chấm công
export class KhoiTaoChamCongDto {
  @ApiProperty({ description: 'Tháng (1-12)' })
  @IsNumber()
  @Min(1)
  @Max(12)
  thang: number;

  @ApiProperty({ description: 'Năm' })
  @IsNumber()
  nam: number;

  @ApiPropertyOptional({ description: 'Số công chuẩn', default: 26 })
  @IsOptional()
  @IsNumber()
  soCongChuan?: number;
}

// Dữ liệu import chấm công
export class DuLieuChamCongDto {
  @ApiProperty({ description: 'Mã nhân viên' })
  @IsString()
  maNhanVien: string;

  @ApiPropertyOptional({ description: 'Số công thực tế' })
  @IsOptional()
  @IsNumber()
  soCongThucTe?: number;

  @ApiPropertyOptional({ description: 'Số ngày nghỉ phép' })
  @IsOptional()
  @IsNumber()
  soNgayNghiPhep?: number;

  @ApiPropertyOptional({ description: 'Số ngày nghỉ không lương' })
  @IsOptional()
  @IsNumber()
  soNgayNghiKhongLuong?: number;

  @ApiPropertyOptional({ description: 'Số giờ OT' })
  @IsOptional()
  @IsNumber()
  soGioOT?: number;

  @ApiPropertyOptional({ description: 'Số giờ OT đêm' })
  @IsOptional()
  @IsNumber()
  soGioOTDem?: number;

  @ApiPropertyOptional({ description: 'Số giờ OT chủ nhật' })
  @IsOptional()
  @IsNumber()
  soGioOTChuNhat?: number;

  @ApiPropertyOptional({ description: 'Số giờ OT ngày lễ' })
  @IsOptional()
  @IsNumber()
  soGioOTLe?: number;

  @ApiPropertyOptional({ description: 'Số lần đi muộn' })
  @IsOptional()
  @IsNumber()
  soLanDiMuon?: number;

  @ApiPropertyOptional({ description: 'Số lần về sớm' })
  @IsOptional()
  @IsNumber()
  soLanVeSom?: number;
}

// DTO import chấm công
export class ImportChamCongDto {
  @ApiProperty({ description: 'Tháng (1-12)' })
  @IsNumber()
  @Min(1)
  @Max(12)
  thang: number;

  @ApiProperty({ description: 'Năm' })
  @IsNumber()
  nam: number;

  @ApiProperty({ description: 'Dữ liệu chấm công', type: [DuLieuChamCongDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DuLieuChamCongDto)
  duLieu: DuLieuChamCongDto[];
}

// DTO cập nhật cấu hình phạt chấm công
export class CapNhatCauHinhPhatDto {
  @ApiPropertyOptional({ description: 'Phạt đi muộn 1-3 lần/tháng' })
  @IsOptional()
  @IsNumber()
  phatDiMuon1_3Lan?: number;

  @ApiPropertyOptional({ description: 'Phạt đi muộn 4-6 lần/tháng' })
  @IsOptional()
  @IsNumber()
  phatDiMuon4_6Lan?: number;

  @ApiPropertyOptional({ description: 'Phạt đi muộn >6 lần/tháng' })
  @IsOptional()
  @IsNumber()
  phatDiMuonTren6Lan?: number;

  @ApiPropertyOptional({ description: 'Phạt về sớm 1-3 lần/tháng' })
  @IsOptional()
  @IsNumber()
  phatVeSom1_3Lan?: number;

  @ApiPropertyOptional({ description: 'Phạt về sớm 4-6 lần/tháng' })
  @IsOptional()
  @IsNumber()
  phatVeSom4_6Lan?: number;

  @ApiPropertyOptional({ description: 'Phạt về sớm >6 lần/tháng' })
  @IsOptional()
  @IsNumber()
  phatVeSomTren6Lan?: number;

  @ApiPropertyOptional({ description: 'Phạt nghỉ không phép (VNĐ/ngày)' })
  @IsOptional()
  @IsNumber()
  phatNghiKhongPhep?: number;

  @ApiPropertyOptional({ description: 'Có trừ lương theo ngày công không?' })
  @IsOptional()
  truLuongNghiKhongPhep?: boolean;

  @ApiPropertyOptional({ description: 'Giờ vào chuẩn (HH:mm)', example: '08:00' })
  @IsOptional()
  @IsString()
  gioVaoChuan?: string;

  @ApiPropertyOptional({ description: 'Giờ ra chuẩn (HH:mm)', example: '17:00' })
  @IsOptional()
  @IsString()
  gioRaChuan?: string;

  @ApiPropertyOptional({ description: 'Số phút được phép trễ' })
  @IsOptional()
  @IsNumber()
  phutChoPhepTre?: number;

  @ApiPropertyOptional({ description: 'Mô tả' })
  @IsOptional()
  @IsString()
  moTa?: string;
}
