// DTOs cho Employee Portal - Sprint 5
import { IsOptional, IsDateString, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class LichLamViecQueryDto {
  @IsOptional()
  @IsDateString()
  tuNgay?: string;

  @IsOptional()
  @IsDateString()
  denNgay?: string;
}

export class ChamCongQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  thang?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  nam?: number;
}

export class PhieuLuongQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  nam?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  limit?: number = 12;
}

// Response types
export interface DashboardResponse {
  nhanVien: {
    id: number;
    maNhanVien: string;
    hoTen: string;
    avatar?: string;
    phongBan: string;
    chucVu?: string;
  };
  caHomNay?: {
    id: number;
    maCa: string;
    tenCa: string;
    gioVao: string;
    gioRa: string;
    mauHienThi?: string;
  };
  chamCongHomNay?: {
    gioVao?: string;
    gioRa?: string;
    trangThai: string;
  };
  thongKe: {
    soDonChoDuyet: number;
    soNgayPhepConLai: number;
    soNgayCongThang: number;
  };
  thongBaoMoi: number;
}

export interface LichLamViecItem {
  ngay: string;
  thuTrongTuan: number;
  ca?: {
    id: number;
    maCa: string;
    tenCa: string;
    gioVao: string;
    gioRa: string;
    mauHienThi?: string;
  };
  nghiPhep?: {
    loaiNghi: string;
    trangThai: string;
  };
  yeuCau?: {
    loaiYeuCau: string;
    trangThai: string;
  };
}

export interface ChamCongItem {
  ngay: string;
  gioVaoThucTe?: string;
  gioRaThucTe?: string;
  gioVaoDuKien?: string;
  gioRaDuKien?: string;
  trangThai: string;
  phutDiTre?: number;
  phutVeSom?: number;
  soGioLam?: number;
  ca?: {
    maCa: string;
    tenCa: string;
  };
}

export interface PhieuLuongItem {
  id: number;
  bangLuongId: number;
  kyLuong: string;
  thang: number;
  nam: number;
  tongThuNhap: number;
  tongKhauTru: number;
  thucLinh: number;
  trangThai: string;
  ngayChot?: string;
}

export interface SoDuPhepResponse {
  phepNam: {
    tongSo: number;
    daSuDung: number;
    conLai: number;
  };
  danhSachLoaiNghi: {
    maLoai: string;
    tenLoai: string;
    soNgayDaSuDung: number;
  }[];
}
