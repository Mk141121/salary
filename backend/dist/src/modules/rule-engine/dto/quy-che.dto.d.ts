import { TrangThaiQuyChe } from '@prisma/client';
export declare class TaoQuyCheDto {
    phongBanId: number;
    tenQuyChe: string;
    moTa?: string;
    tuNgay: Date;
    denNgay?: Date;
    nguoiTao?: string;
}
export declare class CapNhatQuyCheDto {
    tenQuyChe?: string;
    moTa?: string;
    tuNgay?: Date;
    denNgay?: Date;
    trangThai?: TrangThaiQuyChe;
}
export declare class NhanBanQuyCheDto {
    tenQuyChe?: string;
    tuNgay: Date;
    nguoiTao?: string;
}
export declare class LocQuyCheDto {
    phongBanId?: number;
    trangThai?: TrangThaiQuyChe;
    thang?: number;
    nam?: number;
}
