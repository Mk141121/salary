import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsDateString,
  Min,
  ValidateIf,
} from 'class-validator';
import { Type } from 'class-transformer';

export enum LoaiHopDongDto {
  THU_VIEC = 'THU_VIEC',
  MOT_NAM = 'MOT_NAM',
  BA_NAM = 'BA_NAM',
  VO_THOI_HAN = 'VO_THOI_HAN',
}

export enum TrangThaiHopDongDto {
  HIEU_LUC = 'HIEU_LUC',
  HET_HAN = 'HET_HAN',
  HUY_BO = 'HUY_BO',
}

export class TaoHopDongDto {
  @IsEnum(LoaiHopDongDto, { message: 'Loại hợp đồng không hợp lệ' })
  loaiHopDong: LoaiHopDongDto;

  @IsDateString({}, { message: 'Ngày bắt đầu không hợp lệ' })
  tuNgay: string;

  @IsOptional()
  @ValidateIf((o) => o.denNgay !== '' && o.denNgay !== null)
  @IsDateString({}, { message: 'Ngày kết thúc không hợp lệ - để trống nếu vô thời hạn' })
  denNgay?: string;

  @IsNumber({}, { message: 'Lương cơ bản phải là số' })
  @Min(0, { message: 'Lương cơ bản không được âm' })
  @Type(() => Number)
  luongCoBan: number;

  @IsOptional()
  @IsNumber({}, { message: 'Lương đóng BH phải là số' })
  @Min(0, { message: 'Lương đóng BH không được âm' })
  @Type(() => Number)
  luongDongBH?: number;

  @IsOptional()
  @IsNumber({}, { message: 'Hệ số lương phải là số' })
  @Min(0, { message: 'Hệ số lương không được âm' })
  @Type(() => Number)
  heSoLuong?: number;

  @IsOptional()
  @IsString()
  ghiChu?: string;
}

export class CapNhatHopDongDto {
  @IsOptional()
  @IsEnum(LoaiHopDongDto, { message: 'Loại hợp đồng không hợp lệ' })
  loaiHopDong?: LoaiHopDongDto;

  @IsOptional()
  @IsDateString({}, { message: 'Ngày bắt đầu không hợp lệ' })
  tuNgay?: string;

  @IsOptional()
  @ValidateIf((o) => o.denNgay !== '' && o.denNgay !== null)
  @IsDateString({}, { message: 'Ngày kết thúc không hợp lệ - để trống nếu vô thời hạn' })
  denNgay?: string;

  @IsOptional()
  @IsNumber({}, { message: 'Lương cơ bản phải là số' })
  @Min(0, { message: 'Lương cơ bản không được âm' })
  @Type(() => Number)
  luongCoBan?: number;

  @IsOptional()
  @IsNumber({}, { message: 'Lương đóng BH phải là số' })
  @Min(0, { message: 'Lương đóng BH không được âm' })
  @Type(() => Number)
  luongDongBH?: number;

  @IsOptional()
  @IsNumber({}, { message: 'Hệ số lương phải là số' })
  @Min(0, { message: 'Hệ số lương không được âm' })
  @Type(() => Number)
  heSoLuong?: number;

  @IsOptional()
  @IsEnum(TrangThaiHopDongDto, { message: 'Trạng thái không hợp lệ' })
  trangThai?: TrangThaiHopDongDto;

  @IsOptional()
  @IsString()
  ghiChu?: string;
}

export class NgungHopDongDto {
  @IsDateString({}, { message: 'Ngày kết thúc không hợp lệ' })
  ngayKetThuc: string;

  @IsOptional()
  @IsString()
  lyDo?: string;
}
