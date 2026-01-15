// DTO cho Phòng Ban - Hỗ trợ cây phân cấp
import { IsString, IsOptional, IsInt, Min, Max, Matches, IsIn } from 'class-validator';
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';

// Các giá trị enum cho trạng thái và loại phòng ban
export const TRANG_THAI_PHONG_BAN = ['HOAT_DONG', 'NGUNG_HOAT_DONG'] as const;
export const LOAI_PHONG_BAN = ['VAN_HANH', 'KINH_DOANH', 'VAN_PHONG', 'SAN_XUAT'] as const;

export class TaoPhongBanDto {
  @ApiProperty({ description: 'Mã phòng ban', example: 'KT' })
  @IsString()
  maPhongBan: string;

  @ApiProperty({ description: 'Tên phòng ban', example: 'Kế toán' })
  @IsString()
  tenPhongBan: string;

  @ApiPropertyOptional({ description: 'Mô tả phòng ban' })
  @IsOptional()
  @IsString()
  moTa?: string;

  @ApiPropertyOptional({ description: 'ID phòng ban cha (để tạo cấu trúc cây)' })
  @IsOptional()
  @IsInt()
  phongBanChaId?: number;

  @ApiPropertyOptional({ description: 'Loại phòng ban', enum: LOAI_PHONG_BAN })
  @IsOptional()
  @IsString()
  @IsIn(LOAI_PHONG_BAN)
  loaiPhongBan?: string;

  @ApiPropertyOptional({ description: 'ID nhân viên quản lý phòng ban' })
  @IsOptional()
  @IsInt()
  nguoiQuanLyId?: number;

  @ApiPropertyOptional({ description: 'Giờ vào chuẩn (HH:mm)', example: '08:00' })
  @IsOptional()
  @IsString()
  @Matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, { message: 'Giờ vào phải có định dạng HH:mm' })
  gioVaoChuan?: string;

  @ApiPropertyOptional({ description: 'Giờ ra chuẩn (HH:mm)', example: '17:00' })
  @IsOptional()
  @IsString()
  @Matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, { message: 'Giờ ra phải có định dạng HH:mm' })
  gioRaChuan?: string;

  @ApiPropertyOptional({ description: 'Số phút cho phép đi trễ', example: 5 })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(60)
  phutChoPhepTre?: number;
}

export class CapNhatPhongBanDto extends PartialType(TaoPhongBanDto) {
  @ApiPropertyOptional({ description: 'Trạng thái hoạt động', enum: TRANG_THAI_PHONG_BAN })
  @IsOptional()
  @IsString()
  @IsIn(TRANG_THAI_PHONG_BAN)
  trangThai?: string;
}

// DTO cho đổi phòng ban cha
export class DoiPhongBanChaDto {
  @ApiProperty({ description: 'ID phòng ban cha mới (null để đưa lên gốc)' })
  @IsOptional()
  @IsInt()
  phongBanChaId?: number | null;
}

// DTO cho đơn vị con (Tổ/Ca/Nhóm)
export const LOAI_DON_VI_CON = ['TO', 'NHOM', 'CA'] as const;

export class TaoDonViConDto {
  @ApiProperty({ description: 'Mã đơn vị', example: 'TO_A' })
  @IsString()
  maDonVi: string;

  @ApiProperty({ description: 'Tên đơn vị', example: 'Tổ A' })
  @IsString()
  tenDonVi: string;

  @ApiProperty({ description: 'Loại đơn vị', enum: LOAI_DON_VI_CON })
  @IsString()
  @IsIn(LOAI_DON_VI_CON)
  loaiDonVi: string;
}

export class CapNhatDonViConDto extends PartialType(TaoDonViConDto) {
  @ApiPropertyOptional({ description: 'Trạng thái', enum: TRANG_THAI_PHONG_BAN })
  @IsOptional()
  @IsString()
  @IsIn(TRANG_THAI_PHONG_BAN)
  trangThai?: string;
}

// DTO cho chuyển phòng ban nhân viên
export class ChuyenPhongBanDto {
  @ApiProperty({ description: 'ID phòng ban mới' })
  @IsInt()
  phongBanId: number;

  @ApiPropertyOptional({ description: 'ID đơn vị con (tổ/ca)' })
  @IsOptional()
  @IsInt()
  donViConId?: number;

  @ApiProperty({ description: 'Ngày bắt đầu hiệu lực', example: '2026-01-01' })
  @IsString()
  tuNgay: string;

  @ApiPropertyOptional({ description: 'Ghi chú' })
  @IsOptional()
  @IsString()
  ghiChu?: string;
}

// DTO cho phân quyền phòng ban
export const QUYEN_PHONG_BAN = ['IMPORT', 'XEM', 'PAYROLL', 'QUAN_TRI'] as const;

export class TaoPhanQuyenPhongBanDto {
  @ApiProperty({ description: 'ID người dùng' })
  @IsInt()
  nguoiDungId: number;

  @ApiProperty({ description: 'ID phòng ban' })
  @IsInt()
  phongBanId: number;

  @ApiProperty({ description: 'Quyền', enum: QUYEN_PHONG_BAN })
  @IsString()
  @IsIn(QUYEN_PHONG_BAN)
  quyen: string;
}
