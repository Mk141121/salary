import { IsBoolean, IsOptional, IsString, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';

export class TaoNganHangDto {
  @IsString({ message: 'Tên ngân hàng không được trống' })
  tenNganHang: string;

  @IsString({ message: 'Số tài khoản không được trống' })
  soTaiKhoan: string;

  @IsString({ message: 'Chủ tài khoản không được trống' })
  chuTaiKhoan: string;

  @IsOptional()
  @IsString()
  chiNhanh?: string;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  laMacDinh?: boolean;

  @IsOptional()
  @IsDateString({}, { message: 'Ngày bắt đầu không hợp lệ' })
  tuNgay?: string;

  @IsOptional()
  @IsDateString({}, { message: 'Ngày kết thúc không hợp lệ' })
  denNgay?: string;

  @IsOptional()
  @IsString()
  ghiChu?: string;
}

export class CapNhatNganHangDto {
  @IsOptional()
  @IsString({ message: 'Tên ngân hàng không được trống' })
  tenNganHang?: string;

  @IsOptional()
  @IsString({ message: 'Số tài khoản không được trống' })
  soTaiKhoan?: string;

  @IsOptional()
  @IsString({ message: 'Chủ tài khoản không được trống' })
  chuTaiKhoan?: string;

  @IsOptional()
  @IsString()
  chiNhanh?: string;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  laMacDinh?: boolean;

  @IsOptional()
  @IsDateString({}, { message: 'Ngày bắt đầu không hợp lệ' })
  tuNgay?: string;

  @IsOptional()
  @IsDateString({}, { message: 'Ngày kết thúc không hợp lệ' })
  denNgay?: string;

  @IsOptional()
  @IsString()
  ghiChu?: string;
}
