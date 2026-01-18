export declare const TRANG_THAI_PHONG_BAN: readonly ["HOAT_DONG", "NGUNG_HOAT_DONG"];
export declare const LOAI_PHONG_BAN: readonly ["VAN_HANH", "KINH_DOANH", "VAN_PHONG", "SAN_XUAT"];
export declare class TaoPhongBanDto {
    maPhongBan: string;
    tenPhongBan: string;
    moTa?: string;
    phongBanChaId?: number;
    loaiPhongBan?: string;
    nguoiQuanLyId?: number;
    gioVaoChuan?: string;
    gioRaChuan?: string;
    phutChoPhepTre?: number;
}
declare const CapNhatPhongBanDto_base: import("@nestjs/common").Type<Partial<TaoPhongBanDto>>;
export declare class CapNhatPhongBanDto extends CapNhatPhongBanDto_base {
    trangThai?: string;
}
export declare class DoiPhongBanChaDto {
    phongBanChaId?: number | null;
}
export declare const LOAI_DON_VI_CON: readonly ["TO", "NHOM", "CA"];
export declare class TaoDonViConDto {
    maDonVi: string;
    tenDonVi: string;
    loaiDonVi: string;
}
declare const CapNhatDonViConDto_base: import("@nestjs/common").Type<Partial<TaoDonViConDto>>;
export declare class CapNhatDonViConDto extends CapNhatDonViConDto_base {
    trangThai?: string;
}
export declare class ChuyenPhongBanDto {
    phongBanId: number;
    donViConId?: number;
    tuNgay: string;
    ghiChu?: string;
}
export declare const QUYEN_PHONG_BAN: readonly ["IMPORT", "XEM", "PAYROLL", "QUAN_TRI"];
export declare class TaoPhanQuyenPhongBanDto {
    nguoiDungId: number;
    phongBanId: number;
    quyen: string;
}
export {};
