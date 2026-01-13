import { LoaiSuKien, TrangThaiSuKien } from '@prisma/client';
export declare class TaoSuKienDto {
    nhanVienId: number;
    phongBanId: number;
    ngay: Date;
    loaiSuKien: LoaiSuKien;
    maSuKien: string;
    giaTri?: number;
    soTien?: number;
    ghiChu?: string;
    nguoiTao?: string;
}
export declare class CapNhatSuKienDto {
    ngay?: Date;
    loaiSuKien?: LoaiSuKien;
    maSuKien?: string;
    giaTri?: number;
    soTien?: number;
    ghiChu?: string;
}
export declare class DuyetSuKienDto {
    duyetBoi: string;
    ghiChu?: string;
}
export declare class DuyetNhieuSuKienDto {
    ids: number[];
    duyetBoi: string;
}
export declare class LocSuKienDto {
    nhanVienId?: number;
    phongBanId?: number;
    loaiSuKien?: LoaiSuKien;
    maSuKien?: string;
    trangThai?: TrangThaiSuKien;
    thang?: number;
    nam?: number;
    tuNgay?: Date;
    denNgay?: Date;
}
export declare class TaoDanhMucSuKienDto {
    maSuKien: string;
    tenSuKien: string;
    loai: LoaiSuKien;
    moTa?: string;
    soTienMacDinh?: number;
}
