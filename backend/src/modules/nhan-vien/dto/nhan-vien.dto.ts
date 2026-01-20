// DTO cho Nhân Viên
import {
  IsString,
  IsOptional,
  IsNumber,
  IsEmail,
  IsEnum,
  IsDateString,
  IsBoolean,
  MinLength,
  ValidateIf,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { TrangThaiNhanVien, GioiTinh, LoaiNhanVien } from '@prisma/client';

export class TaoNhanVienDto {
  @ApiPropertyOptional({ description: 'Mã nhân viên (tự động tạo nếu bỏ trống)', example: 'NV001' })
  @IsOptional()
  @IsString()
  maNhanVien?: string;

  @ApiProperty({ description: 'Họ tên nhân viên', example: 'Nguyễn Văn An' })
  @IsString()
  @MinLength(2)
  hoTen: string;

  @ApiPropertyOptional({ description: 'Email', example: 'an.nv@company.vn' })
  @IsOptional()
  @IsEmail({}, { message: 'Email không hợp lệ' })
  @ValidateIf((o) => o.email !== '' && o.email !== null)
  email?: string;

  @ApiPropertyOptional({ description: 'Số điện thoại', example: '0901234567' })
  @IsOptional()
  @IsString()
  @ValidateIf((o) => o.soDienThoai !== '' && o.soDienThoai !== null)
  soDienThoai?: string;

  @ApiProperty({ description: 'ID phòng ban', example: 1 })
  @IsNumber()
  phongBanId: number;

  @ApiPropertyOptional({ description: 'Chức vụ', example: 'Nhân viên' })
  @IsOptional()
  @IsString()
  chucVu?: string;

  @ApiPropertyOptional({ description: 'Lương cơ bản', example: 10000000 })
  @IsOptional()
  @IsNumber()
  luongCoBan?: number;

  @ApiPropertyOptional({ description: 'Ngày vào làm', example: '2024-01-15' })
  @IsOptional()
  @IsDateString()
  ngayVaoLam?: string;

  @ApiPropertyOptional({ description: 'Giới tính', enum: GioiTinh })
  @IsOptional()
  @IsEnum(GioiTinh)
  @ValidateIf((o) => o.gioiTinh !== '' && o.gioiTinh !== null)
  gioiTinh?: GioiTinh;

  @ApiPropertyOptional({ description: 'Ngày sinh', example: '1990-01-15' })
  @IsOptional()
  @IsDateString()
  @ValidateIf((o) => o.ngaySinh !== '' && o.ngaySinh !== null)
  ngaySinh?: string;

  @ApiPropertyOptional({ description: 'Địa chỉ', example: '123 Nguyễn Huệ, Q1, TP.HCM' })
  @IsOptional()
  @IsString()
  diaChi?: string;

  @ApiPropertyOptional({ 
    description: 'Loại nhân viên', 
    enum: ['THU_VIEC', 'CHINH_THUC', 'HOC_VIEC', 'THUC_TAP', 'CONG_TAC_VIEN', 'THOI_VU'],
    example: 'CHINH_THUC'
  })
  @IsOptional()
  @IsString()
  loaiNhanVien?: string;

  @ApiPropertyOptional({ description: 'Có đóng BHXH không', example: true })
  @IsOptional()
  @IsBoolean()
  dongBHXH?: boolean;
}

export class CapNhatNhanVienDto extends PartialType(TaoNhanVienDto) {
  @ApiPropertyOptional({
    description: 'Trạng thái nhân viên',
    enum: TrangThaiNhanVien,
  })
  @IsOptional()
  @IsEnum(TrangThaiNhanVien)
  trangThai?: TrangThaiNhanVien;
}

export class TimKiemNhanVienDto {
  @ApiPropertyOptional({ description: 'ID phòng ban' })
  @IsOptional()
  @IsNumber()
  phongBanId?: number;

  @ApiPropertyOptional({ description: 'Từ khóa tìm kiếm' })
  @IsOptional()
  @IsString()
  tuKhoa?: string;

  @ApiPropertyOptional({
    description: 'Trạng thái nhân viên',
    enum: TrangThaiNhanVien,
  })
  @IsOptional()
  @IsEnum(TrangThaiNhanVien)
  trangThai?: TrangThaiNhanVien;

  // Pagination params
  @ApiPropertyOptional({ description: 'Số trang', default: 1 })
  @IsOptional()
  @IsNumber()
  trang?: number;

  @ApiPropertyOptional({ description: 'Số bản ghi mỗi trang', default: 50 })
  @IsOptional()
  @IsNumber()
  soLuong?: number;
}
