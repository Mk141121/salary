import { IsOptional, IsString, IsInt, Min, IsDateString, ValidateIf } from 'class-validator';

export class TaoThueBHDto {
  @IsOptional()
  @IsString()
  mstCaNhan?: string;

  @IsOptional()
  @IsString()
  soCmndCccd?: string;

  @IsOptional()
  @ValidateIf((o) => o.ngayCap !== '')
  @IsDateString()
  ngayCap?: string;

  @IsOptional()
  @IsString()
  noiCap?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  soNguoiPhuThuoc?: number;

  @IsOptional()
  @IsString()
  ghiChu?: string;
}

export class CapNhatThueBHDto extends TaoThueBHDto {}
