import {
  IsString,
  IsOptional,
  IsInt,
  IsArray,
  IsDateString,
  IsEnum,
  ValidateNested,
  ArrayMinSize,
  Matches,
  MaxLength,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';

// Enum trạng thái lịch
export enum TrangThaiLichCaEnum {
  NHAP = 'NHAP',
  DA_CONG_BO = 'DA_CONG_BO',
  HUY = 'HUY',
}

// DTO tạo lịch phân ca
export class TaoLichPhanCaDto {
  @IsString()
  @Matches(/^\d{4}-(0[1-9]|1[0-2])$/, { message: 'Tháng năm phải có định dạng YYYY-MM' })
  thangNam: string;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  phongBanId?: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  nhomId?: number;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  tenLich?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  ghiChu?: string;
}

// DTO cập nhật lịch phân ca
export class CapNhatLichPhanCaDto {
  @IsOptional()
  @IsString()
  @MaxLength(200)
  tenLich?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  ghiChu?: string;
}

// DTO chi tiết phân ca 1 ngày
export class ChiTietPhanCaNgayDto {
  @IsInt()
  @Type(() => Number)
  nhanVienId: number;

  @IsDateString()
  ngay: string; // YYYY-MM-DD

  @IsInt()
  @Type(() => Number)
  caLamViecId: number;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  ghiChu?: string;
}

// DTO assign batch nhiều nhân viên
export class AssignBatchDto {
  @IsArray()
  @ArrayMinSize(1, { message: 'Phải có ít nhất 1 nhân viên' })
  @Type(() => Number)
  nhanVienIds: number[];

  @IsInt()
  @Type(() => Number)
  caLamViecId: number;

  @IsDateString()
  tuNgay: string; // YYYY-MM-DD

  @IsDateString()
  denNgay: string; // YYYY-MM-DD

  @IsOptional()
  @IsArray()
  @Type(() => Number)
  ngoaiTruThu?: number[]; // Loại trừ các thứ (0=CN, 1=T2, ..., 6=T7)

  @IsOptional()
  @IsString()
  ghiChu?: string;
}

// DTO copy tuần
export class CopyTuanDto {
  @IsDateString()
  tuanNguon: string; // Ngày bất kỳ trong tuần nguồn (YYYY-MM-DD)

  @IsDateString()
  tuanDich: string; // Ngày bất kỳ trong tuần đích (YYYY-MM-DD)

  @IsOptional()
  @IsArray()
  @Type(() => Number)
  nhanVienIds?: number[]; // Nếu không có thì copy toàn bộ
}

// DTO filter lịch phân ca
export class LocLichPhanCaDto {
  @IsOptional()
  @IsString()
  @Matches(/^\d{4}-(0[1-9]|1[0-2])$/)
  thangNam?: string;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  phongBanId?: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  nhomId?: number;

  @IsOptional()
  @IsEnum(TrangThaiLichCaEnum)
  trangThai?: TrangThaiLichCaEnum;
}

// DTO lấy calendar view
export class CalendarViewDto {
  @IsString()
  @Matches(/^\d{4}-(0[1-9]|1[0-2])$/, { message: 'Tháng năm phải có định dạng YYYY-MM' })
  thangNam: string;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  phongBanId?: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  nhomId?: number;

  @IsOptional()
  @IsArray()
  @Type(() => Number)
  nhanVienIds?: number[];
}

// DTO xóa phân ca
export class XoaPhanCaDto {
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => Number)
  chiTietIds: number[];
}
