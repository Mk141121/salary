export declare enum TrangThaiLichCaEnum {
    NHAP = "NHAP",
    DA_CONG_BO = "DA_CONG_BO",
    HUY = "HUY"
}
export declare class TaoLichPhanCaDto {
    thangNam: string;
    phongBanId?: number;
    nhomId?: number;
    tenLich?: string;
    ghiChu?: string;
}
export declare class CapNhatLichPhanCaDto {
    tenLich?: string;
    ghiChu?: string;
}
export declare class ChiTietPhanCaNgayDto {
    nhanVienId: number;
    ngay: string;
    caLamViecId: number;
    ghiChu?: string;
}
export declare class AssignBatchDto {
    nhanVienIds: number[];
    caLamViecId: number;
    tuNgay: string;
    denNgay: string;
    ngoaiTruThu?: number[];
    ghiChu?: string;
}
export declare class CopyTuanDto {
    tuanNguon: string;
    tuanDich: string;
    nhanVienIds?: number[];
}
export declare class LocLichPhanCaDto {
    thangNam?: string;
    phongBanId?: number;
    nhomId?: number;
    trangThai?: TrangThaiLichCaEnum;
}
export declare class CalendarViewDto {
    thangNam: string;
    phongBanId?: number;
    nhomId?: number;
    nhanVienIds?: number[];
}
export declare class XoaPhanCaDto {
    chiTietIds: number[];
}
