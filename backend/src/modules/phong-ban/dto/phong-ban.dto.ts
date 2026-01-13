// DTO cho Phòng Ban
import { IsString, IsOptional, IsBoolean, MinLength, IsInt, Min, Max, Matches } from 'class-validator';
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';

export class TaoPhongBanDto {
  @ApiProperty({ description: 'Mã phòng ban', example: 'KT' })
  @IsString()
  @MinLength(1)
  maPhongBan: string;

  @ApiProperty({ description: 'Tên phòng ban', example: 'Kế toán' })
  @IsString()
  @MinLength(2)
  tenPhongBan: string;

  @ApiPropertyOptional({ description: 'Mô tả phòng ban' })
  @IsOptional()
  @IsString()
  moTa?: string;

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
  @ApiPropertyOptional({ description: 'Trạng thái hoạt động' })
  @IsOptional()
  @IsBoolean()
  trangThai?: boolean;
}
