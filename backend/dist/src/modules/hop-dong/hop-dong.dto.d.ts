export declare enum LoaiHopDongDto {
    THU_VIEC = "THU_VIEC",
    MOT_NAM = "MOT_NAM",
    BA_NAM = "BA_NAM",
    VO_THOI_HAN = "VO_THOI_HAN"
}
export declare enum TrangThaiHopDongDto {
    HIEU_LUC = "HIEU_LUC",
    HET_HAN = "HET_HAN",
    HUY_BO = "HUY_BO"
}
export declare class TaoHopDongDto {
    loaiHopDong: LoaiHopDongDto;
    tuNgay: string;
    denNgay?: string;
    luongCoBan: number;
    luongDongBH?: number;
    heSoLuong?: number;
    ghiChu?: string;
}
export declare class CapNhatHopDongDto {
    loaiHopDong?: LoaiHopDongDto;
    tuNgay?: string;
    denNgay?: string;
    luongCoBan?: number;
    luongDongBH?: number;
    heSoLuong?: number;
    trangThai?: TrangThaiHopDongDto;
    ghiChu?: string;
}
export declare class NgungHopDongDto {
    ngayKetThuc: string;
    lyDo?: string;
}
