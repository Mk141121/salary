import { IsBoolean, IsOptional, IsString, IsDateString, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class TaoNhomDto {
  @IsString({ message: 'Mã nhóm không được trống' })
  maNhom: string;

  @IsString({ message: 'Tên nhóm không được trống' })
  tenNhom: string;

  @IsOptional()
  @IsString()
  moTa?: string;

  @IsOptional()
  @IsString()
  mauSac?: string;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  trangThai?: boolean;
}

export class CapNhatNhomDto {
  @IsOptional()
  @IsString({ message: 'Mã nhóm không được trống' })
  maNhom?: string;

  @IsOptional()
  @IsString({ message: 'Tên nhóm không được trống' })
  tenNhom?: string;

  @IsOptional()
  @IsString()
  moTa?: string;

  @IsOptional()
  @IsString()
  mauSac?: string;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  trangThai?: boolean;
}

export class ThemVaoNhomDto {
  @IsInt({ message: 'ID nhóm phải là số' })
  @Type(() => Number)
  nhomId: number;

  @IsOptional()
  @IsDateString({}, { message: 'Ngày bắt đầu không hợp lệ' })
  tuNgay?: string;

  @IsOptional()
  @IsDateString({}, { message: 'Ngày kết thúc không hợp lệ' })
  denNgay?: string;
}

export class GoKhoiNhomDto {
  @IsInt({ message: 'ID nhóm phải là số' })
  @Type(() => Number)
  nhomId: number;

  @IsOptional()
  @IsDateString({}, { message: 'Ngày kết thúc không hợp lệ' })
  denNgay?: string;
}
