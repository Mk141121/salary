// Reports DTOs - Sprint 12
import { IsOptional, IsInt, IsDateString, IsEnum, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// ===================== ENUMS =====================
export enum LoaiBaoCao {
  DI_TRE = 'DI_TRE',
  VE_SOM = 'VE_SOM',
  NGHI_PHEP = 'NGHI_PHEP',
  OT = 'OT',
  QUY_LUONG = 'QUY_LUONG',
  HEADCOUNT = 'HEADCOUNT',
  CHAM_CONG = 'CHAM_CONG',
  TONG_HOP = 'TONG_HOP',
}

export enum DinhDangXuat {
  JSON = 'JSON',
  EXCEL = 'EXCEL',
  PDF = 'PDF',
}

// ===================== DTOs =====================
export class ReportFilterDto {
  @ApiPropertyOptional({ description: 'Tháng báo cáo (1-12)' })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(12)
  @Type(() => Number)
  thang?: number;

  @ApiPropertyOptional({ description: 'Năm báo cáo' })
  @IsOptional()
  @IsInt()
  @Min(2020)
  @Type(() => Number)
  nam?: number;

  @ApiPropertyOptional({ description: 'Từ ngày' })
  @IsOptional()
  @IsDateString()
  tuNgay?: string;

  @ApiPropertyOptional({ description: 'Đến ngày' })
  @IsOptional()
  @IsDateString()
  denNgay?: string;

  @ApiPropertyOptional({ description: 'ID phòng ban' })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  phongBanId?: number;

  @ApiPropertyOptional({ description: 'ID nhân viên' })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  nhanVienId?: number;

  @ApiPropertyOptional({ enum: DinhDangXuat, description: 'Định dạng xuất' })
  @IsOptional()
  @IsEnum(DinhDangXuat)
  dinhDang?: DinhDangXuat = DinhDangXuat.JSON;
}

// ===================== RESPONSE INTERFACES =====================

// Báo cáo đi trễ/về sớm
export interface DiTreVeSomItem {
  nhanVienId: number;
  maNhanVien: string;
  hoTen: string;
  phongBan: string;
  ngay: Date;
  gioVao: string | null;
  gioRa: string | null;
  soPhutTre: number;
  soPhutVeSom: number;
  lyDo: string | null;
  coGiaiTrinh: boolean;
}

export interface DiTreVeSomSummary {
  tongNhanVien: number;
  tongLuotDiTre: number;
  tongLuotVeSom: number;
  tongPhutTre: number;
  tongPhutVeSom: number;
  topDiTre: { nhanVienId: number; hoTen: string; soLan: number }[];
}

export interface DiTreVeSomReport {
  filter: ReportFilterDto;
  summary: DiTreVeSomSummary;
  chiTiet: DiTreVeSomItem[];
}

// Báo cáo OT
export interface OTItem {
  nhanVienId: number;
  maNhanVien: string;
  hoTen: string;
  phongBan: string;
  ngay: Date;
  soGioOT: number;
  heSoOT: number;
  tienOT: number;
  trangThai: string;
}

export interface OTSummary {
  tongNhanVien: number;
  tongGioOT: number;
  tongTienOT: number;
  trungBinhGioOTNgay: number;
  phongBanNhieuOTNhat: { phongBan: string; tongGio: number }[];
}

export interface OTReport {
  filter: ReportFilterDto;
  summary: OTSummary;
  chiTiet: OTItem[];
}

// Báo cáo nghỉ phép
export interface NghiPhepItem {
  nhanVienId: number;
  maNhanVien: string;
  hoTen: string;
  phongBan: string;
  loaiNghi: string;
  tuNgay: Date;
  denNgay: Date;
  soNgay: number;
  trangThai: string;
  lyDo: string | null;
}

export interface NghiPhepSummary {
  tongDon: number;
  tongNgayNghi: number;
  daDuyet: number;
  choDuyet: number;
  tuChoi: number;
  theoLoai: { loai: string; soNgay: number; soDon: number }[];
}

export interface NghiPhepReport {
  filter: ReportFilterDto;
  summary: NghiPhepSummary;
  chiTiet: NghiPhepItem[];
}

// Báo cáo quỹ lương
export interface QuyLuongPhongBan {
  phongBanId: number;
  tenPhongBan: string;
  tongNhanVien: number;
  tongLuongCoBan: number;
  tongPhuCap: number;
  tongThuong: number;
  tongKhauTru: number;
  tongThucLinh: number;
  tyLeQuyLuong: number; // % so với tổng
}

export interface QuyLuongKhoan {
  maKhoan: string;
  tenKhoan: string;
  loai: string;
  tongSoTien: number;
  soNguoiNhan: number;
}

export interface QuyLuongSummary {
  thang: number;
  nam: number;
  tongQuyLuong: number;
  tongNhanVien: number;
  luongTrungBinh: number;
  luongCaoNhat: number;
  luongThapNhat: number;
  tongBHXH_NLD: number;
  tongBHXH_DN: number;
  tongThueTNCN: number;
}

export interface QuyLuongReport {
  filter: ReportFilterDto;
  summary: QuyLuongSummary;
  theoPhongBan: QuyLuongPhongBan[];
  theoKhoan: QuyLuongKhoan[];
}

// Báo cáo Headcount
export interface HeadcountPhongBan {
  phongBanId: number;
  tenPhongBan: string;
  tongNhanVien: number;
  dangLam: number;
  nghiViec: number;
  thuViec: number;
  moiTuyen: number; // Trong tháng
  nghiMoi: number; // Trong tháng
}

export interface HeadcountSummary {
  tongNhanVien: number;
  dangLam: number;
  nghiViec: number;
  thuViec: number;
  tyLeNghiViec: number; // % turnover
  moiTuyenThang: number;
  nghiViecThang: number;
  theoGioiTinh: { nam: number; nu: number };
  theoDoTuoi: { duoi25: number; tu25den35: number; tu35den45: number; tren45: number };
}

export interface HeadcountReport {
  filter: ReportFilterDto;
  summary: HeadcountSummary;
  theoPhongBan: HeadcountPhongBan[];
}

// Báo cáo chấm công tổng hợp
export interface ChamCongNhanVien {
  nhanVienId: number;
  maNhanVien: string;
  hoTen: string;
  phongBan: string;
  ngayCongChuan: number;
  ngayCongThuc: number;
  ngayNghi: number;
  ngayPhep: number;
  soLanDiTre: number;
  soLanVeSom: number;
  tongGioOT: number;
  tyLeDiLam: number; // %
}

export interface ChamCongSummary {
  thang: number;
  nam: number;
  ngayCongChuan: number;
  tongNhanVien: number;
  trungBinhNgayCong: number;
  tyLeDiLamTrungBinh: number;
  tongNgayNghi: number;
  tongNgayPhep: number;
  tongGioOT: number;
}

export interface ChamCongReport {
  filter: ReportFilterDto;
  summary: ChamCongSummary;
  chiTiet: ChamCongNhanVien[];
}

// Báo cáo tổng hợp dashboard
export interface DashboardKPI {
  label: string;
  value: number;
  unit: string;
  trend: number; // % so với tháng trước
  trendDirection: 'up' | 'down' | 'stable';
}

export interface DashboardAlert {
  loai: 'WARNING' | 'ERROR' | 'INFO';
  tieuDe: string;
  moTa: string;
  soLuong: number;
  link?: string;
}

export interface DashboardReport {
  thang: number;
  nam: number;
  kpis: DashboardKPI[];
  alerts: DashboardAlert[];
  quyLuongThang: number;
  headcount: number;
  tyLeDiLam: number;
  tyLeTurnover: number;
}
