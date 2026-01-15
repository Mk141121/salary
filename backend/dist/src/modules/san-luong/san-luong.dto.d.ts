export declare enum LoaiImport {
    CHIA_HANG = "CHIA_HANG",
    GIAO_HANG = "GIAO_HANG"
}
export declare class ChiaHangRowDto {
    ngay: string;
    maNhanVien: string;
    soLuongSpDat: number;
    soLuongSpLoi: number;
    hoTen?: string;
    ghiChu?: string;
}
export declare class ImportChiaHangPreviewDto {
    rows: ChiaHangRowDto[];
}
export declare class ChiaHangValidationResult {
    hopLe: boolean;
    dong: number;
    data?: ChiaHangRowDto;
    loi?: string[];
}
export declare class PreviewChiaHangResponse {
    hopLe: ChiaHangValidationResult[];
    loi: ChiaHangValidationResult[];
    tongDong: number;
    tongHopLe: number;
    tongLoi: number;
}
export declare class ConfirmChiaHangDto {
    rows: ChiaHangRowDto[];
    tenFile: string;
    fileHash?: string;
}
export declare class GiaoHangRowDto {
    ngay: string;
    maNhanVien: string;
    khoiLuongThanhCong: number;
    soLanTreGio: number;
    soLanKhongLayPhieu: number;
    hoTen?: string;
    ghiChu?: string;
}
export declare class ImportGiaoHangPreviewDto {
    rows: GiaoHangRowDto[];
}
export declare class GiaoHangValidationResult {
    hopLe: boolean;
    dong: number;
    data?: GiaoHangRowDto;
    loi?: string[];
}
export declare class PreviewGiaoHangResponse {
    hopLe: GiaoHangValidationResult[];
    loi: GiaoHangValidationResult[];
    tongDong: number;
    tongHopLe: number;
    tongLoi: number;
}
export declare class ConfirmGiaoHangDto {
    rows: GiaoHangRowDto[];
    tenFile: string;
    fileHash?: string;
}
export declare class AdminSuaChiaHangDto {
    soLuongSpDat?: number;
    soLuongSpLoi?: number;
    ghiChu?: string;
    lyDo: string;
}
export declare class AdminSuaGiaoHangDto {
    khoiLuongThanhCong?: number;
    soLanTreGio?: number;
    soLanKhongLayPhieu?: number;
    ghiChu?: string;
    lyDo: string;
}
export declare class QuerySanLuongDto {
    tuNgay?: string;
    denNgay?: string;
    nhanVienId?: number;
    phongBanId?: number;
}
export declare class QueryLichSuImportDto {
    loaiImport?: LoaiImport;
    tuNgay?: string;
    denNgay?: string;
}
