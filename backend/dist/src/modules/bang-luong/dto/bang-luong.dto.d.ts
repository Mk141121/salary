export declare class TaoBangLuongDto {
    thang: number;
    nam: number;
    phongBanId: number;
    tenBangLuong?: string;
    tuDongTaoChiTiet?: boolean;
}
declare const CapNhatBangLuongDto_base: import("@nestjs/common").Type<Partial<TaoBangLuongDto>>;
export declare class CapNhatBangLuongDto extends CapNhatBangLuongDto_base {
    ghiChu?: string;
}
export declare class CapNhatChiTietLuongDto {
    bangLuongId: number;
    nhanVienId: number;
    khoanLuongId: number;
    soTien: number;
    ghiChu?: string;
    nguoiThayDoi?: string;
    lyDo?: string;
}
export declare class CapNhatNhieuChiTietDto {
    danhSach: CapNhatChiTietLuongDto[];
}
export declare class ChotBangLuongDto {
    nguoiChot: string;
    ghiChu?: string;
}
export {};
