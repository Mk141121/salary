// Payroll Sync API - Sprint 10
import axios from 'axios'

const AUTH_STORAGE_KEY = 'tinh_luong_auth'

const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
})

api.interceptors.request.use((config) => {
  const stored = localStorage.getItem(AUTH_STORAGE_KEY)
  if (stored) {
    try {
      const data = JSON.parse(stored)
      if (data.token) config.headers.Authorization = `Bearer ${data.token}`
    } catch { /* ignore */ }
  }
  return config
})

// Enums
export type SyncStep =
  | 'CHUA_BAT_DAU'
  | 'SYNC_NGAY_CONG'
  | 'SYNC_NGHI_PHEP'
  | 'SYNC_OT'
  | 'SYNC_YEU_CAU'
  | 'SYNC_KPI'
  | 'TINH_LUONG'
  | 'HOAN_THANH'
  | 'LOI'

export type NguonDuLieu =
  | 'CHAM_CONG'
  | 'YEU_CAU'
  | 'NGHI_PHEP'
  | 'PHAN_CA'
  | 'GPS'
  | 'KPI'
  | 'MANUAL'
  | 'RULE_ENGINE'

// Interfaces
export interface SyncPayrollDto {
  bangLuongId: number
  forceSync?: boolean
}

export interface SyncProgress {
  bangLuongId: number
  currentStep: SyncStep
  steps: SyncStepInfo[]
  summary?: SyncSummary
  errors: string[]
  startedAt: Date
  completedAt?: Date
}

export interface SyncStepInfo {
  step: SyncStep
  label: string
  status: 'pending' | 'in-progress' | 'done' | 'error'
  count?: number
  changes?: SyncChangeDetail[]
  nguonDuLieu?: NguonDuLieu
}

export interface SyncSummary {
  tongNgayCong: number
  tongNghiPhep: number
  tongOT: number
  tongYeuCau: number
  tongKPI: number
  tongThayDoi: number
}

export interface SyncChangeDetail {
  nhanVienId: number
  hoTen: string
  field: string
  oldValue: string | number
  newValue: string | number
  nguonDuLieu: NguonDuLieu
}

export interface NguonDuLieuInfo {
  type: NguonDuLieu
  label: string
  sourceId: string
  timestamp: Date
  value: number | string
  meta?: Record<string, unknown>
}

export interface EnhancedRuleTrace {
  ruleId: number
  ruleName: string
  nhanVienId: number
  hoTen: string
  bangLuongId: number
  thang: number
  nam: number
  ketQua: number
  chiTiet: string
  nguonDuLieu: NguonDuLieuInfo[]
  ngayChay: Date
}

export interface PipelineStatus {
  thang: number
  nam: number
  phongBans: PhongBanSyncStatus[]
  tongNhanVien: number
  tongDaSyncHoanThanh: number
  warnings: PipelineWarning[]
}

export interface PhongBanSyncStatus {
  phongBanId: number
  tenPhongBan: string
  bangLuongId?: number
  trangThai: 'CHUA_TAO' | 'NHAP' | 'DA_TINH' | 'DA_KHOA' | 'DA_DUYET'
  lastSyncAt?: Date
  tongNhanVien: number
  tongLuong: number
}

export interface PipelineWarning {
  loai: 'THIEU_CHAM_CONG' | 'YEU_CAU_CHUA_DUYET' | 'RULE_ERROR' | 'DATA_MISMATCH'
  nhanVienId?: number
  hoTen?: string
  phongBanId?: number
  moTa: string
}

// API functions
export const payrollSyncApi = {
  // Sync payroll
  sync: (data: SyncPayrollDto) =>
    api.post<SyncProgress>('/payroll-sync/sync', data).then(r => r.data),

  // Get sync progress
  getProgress: (bangLuongId: number) =>
    api.get<SyncProgress>(`/payroll-sync/progress/${bangLuongId}`).then(r => r.data),

  // Get pipeline status
  getStatus: (thang: number, nam: number) =>
    api.get<PipelineStatus>('/payroll-sync/status', { params: { thang, nam } }).then(r => r.data),

  // Get enhanced rule trace
  getRuleTrace: (params: { thang: number; nam: number; phongBanId?: number }) =>
    api.get<EnhancedRuleTrace[]>('/payroll-sync/rule-trace', { params }).then(r => r.data),

  // Get rule trace for specific employee
  getRuleTraceByEmployee: (nhanVienId: number, thang: number, nam: number) =>
    api.get<EnhancedRuleTrace[]>(`/payroll-sync/rule-trace/nhan-vien/${nhanVienId}`, {
      params: { thang, nam },
    }).then(r => r.data),
}

export default payrollSyncApi
