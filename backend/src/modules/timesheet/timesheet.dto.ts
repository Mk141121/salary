// DTOs cho Timesheet module - Sprint 9
import { IsString, IsNumber, IsOptional, IsDateString, IsEnum, MinLength, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// =============== QUERY DTOs ===============

export class TimesheetQueryDto {
  @ApiProperty({ description: 'Tháng (1-12)' })
  @Type(() => Number)
  @IsNumber()
  thang: number;

  @ApiProperty({ description: 'Năm' })
  @Type(() => Number)
  @IsNumber()
  nam: number;

  @ApiPropertyOptional({ description: 'ID phòng ban' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  phongBanId?: number;

  @ApiPropertyOptional({ description: 'ID nhân viên cụ thể' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  nhanVienId?: number;

  @ApiPropertyOptional({ description: 'Tìm kiếm theo tên/mã NV' })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({ default: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  page?: number;

  @ApiPropertyOptional({ default: 20 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  limit?: number;
}

// =============== SỬA CÔNG DTOs ===============

export class TaoYeuCauSuaCongDto {
  @ApiProperty({ description: 'ID nhân viên' })
  @IsNumber()
  nhanVienId: number;

  @ApiProperty({ description: 'Ngày cần sửa (YYYY-MM-DD)' })
  @IsDateString()
  ngayChamCong: string;

  @ApiPropertyOptional({ description: 'Giờ vào mới (ISO string)' })
  @IsOptional()
  @IsDateString()
  gioVaoMoi?: string;

  @ApiPropertyOptional({ description: 'Giờ ra mới (ISO string)' })
  @IsOptional()
  @IsDateString()
  gioRaMoi?: string;

  @ApiPropertyOptional({ description: 'Trạng thái mới' })
  @IsOptional()
  @IsString()
  trangThaiMoi?: string;

  @ApiProperty({ description: 'Lý do sửa công' })
  @IsString()
  @MinLength(10)
  @MaxLength(500)
  lyDo: string;

  @ApiPropertyOptional({ description: 'Link bằng chứng/minh chứng' })
  @IsOptional()
  @IsString()
  bangChung?: string;
}

export class DuyetYeuCauSuaCongDto {
  @ApiProperty({ description: 'Phê duyệt hay từ chối', enum: ['DA_DUYET', 'TU_CHOI'] })
  @IsEnum(['DA_DUYET', 'TU_CHOI'])
  trangThaiDuyet: 'DA_DUYET' | 'TU_CHOI';

  @ApiPropertyOptional({ description: 'Lý do từ chối (bắt buộc nếu từ chối)' })
  @IsOptional()
  @IsString()
  lyDoTuChoi?: string;
}

export class SuaCongTrucTiepDto {
  @ApiProperty({ description: 'ID nhân viên' })
  @IsNumber()
  nhanVienId: number;

  @ApiProperty({ description: 'Ngày cần sửa (YYYY-MM-DD)' })
  @IsDateString()
  ngayChamCong: string;

  @ApiPropertyOptional({ description: 'Giờ vào' })
  @IsOptional()
  @IsDateString()
  gioVao?: string;

  @ApiPropertyOptional({ description: 'Giờ ra' })
  @IsOptional()
  @IsDateString()
  gioRa?: string;

  @ApiPropertyOptional({ description: 'Trạng thái' })
  @IsOptional()
  @IsString()
  trangThai?: string;

  @ApiPropertyOptional({ description: 'Loại ngày' })
  @IsOptional()
  @IsString()
  loaiNgay?: string;

  @ApiProperty({ description: 'Ghi chú/Lý do sửa' })
  @IsString()
  @MinLength(5)
  ghiChu: string;
}

export class YeuCauSuaCongQueryDto {
  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  nhanVienId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  phongBanId?: number;

  @ApiPropertyOptional({ description: 'CHO_DUYET | DA_DUYET | TU_CHOI' })
  @IsOptional()
  @IsString()
  trangThaiDuyet?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  tuNgay?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  denNgay?: string;

  @ApiPropertyOptional({ default: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  page?: number;

  @ApiPropertyOptional({ default: 20 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  limit?: number;
}

export class LichSuSuaCongQueryDto {
  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  nhanVienId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  tuNgay?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  denNgay?: string;

  @ApiPropertyOptional({ default: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  page?: number;

  @ApiPropertyOptional({ default: 20 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  limit?: number;
}

// =============== RESPONSE INTERFACES ===============

export interface TimesheetNhanVien {
  nhanVienId: number;
  hoTen: string;
  maNhanVien: string;
  phongBan?: { id: number; tenPhongBan: string };
  chiTiet: TimesheetNgay[];
  tongKet: {
    soNgayDiLam: number;
    soNgayNghi: number;
    soNgayPhep: number;
    soGioLam: number;
    soGioOT: number;
    soLanDiTre: number;
    soLanVeSom: number;
    tongPhutDiTre: number;
    tongPhutVeSom: number;
  };
}

export interface TimesheetNgay {
  ngay: string;
  thuTrongTuan: number;
  loaiNgay: string;
  trangThai: string;
  gioVao?: string;
  gioRa?: string;
  gioVaoDuKien?: string;
  gioRaDuKien?: string;
  caLamViec?: { id: number; tenCa: string };
  soGioLam: number;
  soGioOT: number;
  phutDiTre?: number;
  phutVeSom?: number;
  ghiChu?: string;
  coYeuCauSuaCong?: boolean;
}

export interface YeuCauSuaCongResponse {
  id: number;
  nhanVienId: number;
  ngayChamCong: Date;
  gioVaoCu?: Date;
  gioRaCu?: Date;
  trangThaiCu?: string;
  gioVaoMoi?: Date;
  gioRaMoi?: Date;
  trangThaiMoi?: string;
  lyDo: string;
  bangChung?: string;
  trangThaiDuyet: string;
  nguoiDuyetId?: number;
  ngayDuyet?: Date;
  lyDoTuChoi?: string;
  nguoiTaoId: number;
  ngayTao: Date;
  nhanVien?: { id: number; hoTen: string; maNhanVien: string };
  nguoiDuyet?: { id: number; hoTen: string };
  nguoiTao?: { id: number; hoTen: string };
}

export interface LichSuSuaCongResponse {
  id: number;
  nhanVienId: number;
  ngayChamCong: Date;
  truongThayDoi: string;
  giaTriCu?: string;
  giaTriMoi?: string;
  nguonThayDoi: string;
  yeuCauSuaCongId?: number;
  nguoiThucHienId: number;
  ghiChu?: string;
  ngayTao: Date;
  nhanVien?: { id: number; hoTen: string; maNhanVien: string };
  nguoiThucHien?: { id: number; hoTen: string };
}

export interface ThongKeTimesheet {
  thang: number;
  nam: number;
  tongNhanVien: number;
  tongNgayCong: number;
  tongNgayNghi: number;
  tongNgayPhep: number;
  tongGioOT: number;
  tongLanDiTre: number;
  tongLanVeSom: number;
  yeuCauSuaCong: {
    choDuyet: number;
    daDuyet: number;
    tuChoi: number;
  };
}
