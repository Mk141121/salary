import { LoaiDieuChinh } from '@prisma/client';
export declare class TaoSnapshotDto {
    nguoiChot: string;
}
export declare class ChiTietDieuChinhDto {
    khoanLuongId: number;
    soTienCu: number;
    soTienMoi: number;
    ghiChu?: string;
}
export declare class TaoPhieuDieuChinhDto {
    bangLuongId: number;
    nhanVienId: number;
    loaiDieuChinh: LoaiDieuChinh;
    lyDo: string;
    ghiChu?: string;
    nguoiTao: string;
    chiTiets: ChiTietDieuChinhDto[];
}
export declare class DuyetPhieuDto {
    nguoiDuyet: string;
}
export declare class TuChoiPhieuDto {
    nguoiTuChoi: string;
    lyDoTuChoi: string;
}
