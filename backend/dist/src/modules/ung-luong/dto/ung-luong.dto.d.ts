export declare class CauHinhUngLuongDto {
    chuyen_can?: {
        so_ngay_nghi_toi_da: number;
        cam_neu_nghi_khong_phep: boolean;
    };
    ung_luong?: {
        ti_le_toi_da: number;
        lam_tron: number;
    };
}
export declare class TaoBangUngLuongDto {
    thangNam: string;
    tuNgay: string;
    denNgay: string;
    ngayChiTra?: string;
    phongBanId?: number;
    ghiChu?: string;
    cauHinhJson?: CauHinhUngLuongDto;
}
export declare class CapNhatBangUngLuongDto {
    ngayChiTra?: string;
    ghiChu?: string;
    cauHinhJson?: CauHinhUngLuongDto;
}
export declare class SinhDanhSachNVDto {
    phongBanId?: number;
    nhomNhanVienId?: number;
    nhanVienIds?: number[];
}
export declare class CapNhatChiTietUngLuongDto {
    id: number;
    soTienUngDeXuat?: number;
    soTienUngDuyet?: number;
    ghiChu?: string;
}
export declare class CapNhatBulkChiTietDto {
    chiTiets: CapNhatChiTietUngLuongDto[];
}
export declare class SetTheoTiLeDto {
    tiLe: number;
    lamTron?: number;
    nhanVienIds?: number[];
}
export declare class SetSoTienCoDinhDto {
    soTien: number;
    nhanVienIds?: number[];
}
export declare class GhiNhanKhauTruDto {
    bangLuongApDungId: number;
    lyDo?: string;
}
export declare class MoKhoaBangUngLuongDto {
    lyDo: string;
}
export declare class LocBangUngLuongDto {
    thangNam?: string;
    phongBanId?: number;
    trangThai?: 'NHAP' | 'DA_CHOT' | 'DA_KHOA';
    trang?: number;
    soLuong?: number;
}
