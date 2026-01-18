// Payroll Sync DTOs - Sprint 10
import { IsInt, IsOptional, IsBoolean, IsEnum, IsString } from 'class-validator';
import { Type } from 'class-transformer';

// ============================================
// ENUMS
// ============================================

export enum SyncStep {
  CHUA_BAT_DAU = 'CHUA_BAT_DAU',
  SYNC_NGAY_CONG = 'SYNC_NGAY_CONG',
  SYNC_NGHI_PHEP = 'SYNC_NGHI_PHEP',
  SYNC_OT = 'SYNC_OT',
  SYNC_YEU_CAU = 'SYNC_YEU_CAU',
  SYNC_KPI = 'SYNC_KPI',
  TINH_LUONG = 'TINH_LUONG',
  HOAN_THANH = 'HOAN_THANH',
  LOI = 'LOI',
}

export enum NguonDuLieu {
  CHAM_CONG = 'CHAM_CONG',
  YEU_CAU = 'YEU_CAU',
  NGHI_PHEP = 'NGHI_PHEP',
  PHAN_CA = 'PHAN_CA',
  GPS = 'GPS',
  KPI = 'KPI',
  MANUAL = 'MANUAL',
  RULE_ENGINE = 'RULE_ENGINE',
}

// ============================================
// REQUEST DTOs
// ============================================

export class SyncPayrollDto {
  @IsInt()
  @Type(() => Number)
  bangLuongId: number;

  @IsBoolean()
  @IsOptional()
  forceRecalc?: boolean; // Bỏ qua cache, tính lại từ đầu

  @IsBoolean()
  @IsOptional()
  dryRun?: boolean; // Chỉ preview, không lưu
}

export class SyncBatchDto {
  @IsInt()
  @Type(() => Number)
  thang: number;

  @IsInt()
  @Type(() => Number)
  nam: number;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  phongBanId?: number;

  @IsBoolean()
  @IsOptional()
  forceRecalc?: boolean;
}

export class RuleTraceQueryDto {
  @IsInt()
  @Type(() => Number)
  bangLuongId: number;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  nhanVienId?: number;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  khoanLuongId?: number;

  @IsString()
  @IsOptional()
  nguon?: string; // Filter theo nguồn
}

// ============================================
// RESPONSE INTERFACES
// ============================================

export interface SyncProgress {
  bangLuongId: number;
  currentStep: SyncStep;
  steps: SyncStepInfo[];
  startedAt: Date;
  completedAt?: Date;
  error?: string;
  summary?: SyncSummary;
}

export interface SyncStepInfo {
  step: SyncStep;
  label: string;
  status: 'pending' | 'running' | 'completed' | 'error' | 'skipped';
  startedAt?: Date;
  completedAt?: Date;
  recordsProcessed?: number;
  error?: string;
}

export interface SyncSummary {
  tongNhanVien: number;
  tongNgayCong: number;
  tongGioOT: number;
  tongNgayNghiPhep: number;
  tongNgayNghiKhongLuong: number;
  tongSoTienTruocSync: number;
  tongSoTienSauSync: number;
  chenhLech: number;
  chiTietThayDoi: SyncChangeDetail[];
}

export interface SyncChangeDetail {
  nhanVienId: number;
  hoTen: string;
  maNhanVien: string;
  thayDoi: {
    truong: string;
    giaTriCu: number | string;
    giaTriMoi: number | string;
    nguon: NguonDuLieu;
  }[];
}

// ============================================
// ENHANCED RULE TRACE
// ============================================

export interface EnhancedRuleTrace {
  id: number;
  bangLuongId: number;
  nhanVienId: number;
  nhanVien: {
    id: number;
    hoTen: string;
    maNhanVien: string;
  };
  quyCheId: number;
  quyChe: {
    id: number;
    tenQuyChe: string;
  };
  quyCheRuleId?: number;
  khoanLuongId: number;
  khoanLuong: {
    id: number;
    tenKhoan: string;
    maKhoan: string;
  };
  inputJson: string;
  inputParsed: RuleTraceInput;
  outputSoTien: number;
  messageGiaiThich: string;
  nguonDuLieu: NguonDuLieuInfo[];
  taoLuc: Date;
}

export interface RuleTraceInput {
  ngayCong?: number;
  ngayCongLyThuyet?: number;
  luongCoBan?: number;
  soGioOT?: number;
  heSoOT?: number;
  soNgayNghiPhep?: number;
  soNgayDiTre?: number;
  tongPhutDiTre?: number;
  diemKPI?: number;
  [key: string]: any;
}

export interface NguonDuLieuInfo {
  nguon: NguonDuLieu;
  label: string;
  chiTiet: string;
  soLuong?: number;
  link?: string; // Link để xem chi tiết
}

export interface PipelineStatus {
  thang: number;
  nam: number;
  phongBans: {
    phongBanId: number;
    tenPhongBan: string;
    bangLuongId?: number;
    trangThai: 'CHUA_TAO' | 'NHAP' | 'DA_SYNC' | 'DA_CHOT' | 'KHOA';
    lastSyncAt?: Date;
    tongNhanVien: number;
    tongLuong: number;
  }[];
  tongLuongToanCongTy: number;
  canhBao: PipelineWarning[];
}

export interface PipelineWarning {
  loai: 'THIEU_CHAM_CONG' | 'THIEU_PHAN_CA' | 'YEU_CAU_CHUA_DUYET' | 'CHUA_TINH_KPI';
  phongBanId?: number;
  nhanVienId?: number;
  hoTen?: string;
  moTa: string;
}
