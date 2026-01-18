export declare enum SyncStep {
    CHUA_BAT_DAU = "CHUA_BAT_DAU",
    SYNC_NGAY_CONG = "SYNC_NGAY_CONG",
    SYNC_NGHI_PHEP = "SYNC_NGHI_PHEP",
    SYNC_OT = "SYNC_OT",
    SYNC_YEU_CAU = "SYNC_YEU_CAU",
    SYNC_KPI = "SYNC_KPI",
    TINH_LUONG = "TINH_LUONG",
    HOAN_THANH = "HOAN_THANH",
    LOI = "LOI"
}
export declare enum NguonDuLieu {
    CHAM_CONG = "CHAM_CONG",
    YEU_CAU = "YEU_CAU",
    NGHI_PHEP = "NGHI_PHEP",
    PHAN_CA = "PHAN_CA",
    GPS = "GPS",
    KPI = "KPI",
    MANUAL = "MANUAL",
    RULE_ENGINE = "RULE_ENGINE"
}
export declare class SyncPayrollDto {
    bangLuongId: number;
    forceRecalc?: boolean;
    dryRun?: boolean;
}
export declare class SyncBatchDto {
    thang: number;
    nam: number;
    phongBanId?: number;
    forceRecalc?: boolean;
}
export declare class RuleTraceQueryDto {
    bangLuongId: number;
    nhanVienId?: number;
    khoanLuongId?: number;
    nguon?: string;
}
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
    link?: string;
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
