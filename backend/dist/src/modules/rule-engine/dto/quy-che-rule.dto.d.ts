import { LoaiRule, CheDoGop } from '@prisma/client';
export declare class DieuKienApDung {
    vaiTro?: string[];
    capTrachNhiem?: number[];
    nhanVienIds?: number[];
    phongBanIds?: number[];
}
export declare class DieuKienJson {
    apDungCho?: DieuKienApDung;
}
export declare class BacThang {
    from: number;
    to: number;
    soTien?: number;
    soTienMoiLan?: number;
    heSo?: number;
}
export declare class CongThucCoDinh {
    soTien: number;
}
export declare class CongThucTheoHeSo {
    base: string;
    heSo: number;
    congThem?: number;
}
export declare class CongThucBacThang {
    field: string;
    bac: BacThang[];
}
export declare class CongThucTheoSuKien {
    maSuKien: string;
    cachTinh: 'CO_DINH' | 'BAC_THANG';
    soTienMoiLan?: number;
    bac?: BacThang[];
}
export declare class CongThucBieuThuc {
    bieuThuc: string;
}
export declare class TaoQuyCheRuleDto {
    quyCheId: number;
    khoanLuongId: number;
    tenRule: string;
    moTa?: string;
    loaiRule: LoaiRule;
    dieuKienJson?: DieuKienJson;
    congThucJson: CongThucCoDinh | CongThucTheoHeSo | CongThucBacThang | CongThucTheoSuKien | CongThucBieuThuc;
    thuTuUuTien?: number;
    cheDoGop?: CheDoGop;
    choPhepChinhTay?: boolean;
    nguoiTao?: string;
}
export declare class CapNhatQuyCheRuleDto {
    tenRule?: string;
    moTa?: string;
    loaiRule?: LoaiRule;
    dieuKienJson?: DieuKienJson;
    congThucJson?: CongThucCoDinh | CongThucTheoHeSo | CongThucBacThang | CongThucTheoSuKien | CongThucBieuThuc;
    thuTuUuTien?: number;
    cheDoGop?: CheDoGop;
    choPhepChinhTay?: boolean;
    trangThai?: boolean;
}
export declare class ValidateRuleDto {
    loaiRule: LoaiRule;
    dieuKienJson?: DieuKienJson;
    congThucJson: CongThucCoDinh | CongThucTheoHeSo | CongThucBacThang | CongThucTheoSuKien | CongThucBieuThuc;
}
export declare class KetQuaValidate {
    hopLe: boolean;
    danhSachLoi: string[];
    canhBao?: string[];
}
export declare class PreviewRuleDto {
    nhanVienId?: number;
    quyCheId: number;
    duLieuGiaLap?: Record<string, number>;
}
export declare class KetQuaPreview {
    tongTien: number;
    chiTiet: {
        khoanLuong: string;
        soTien: number;
        giaiThich: string;
    }[];
    trace: {
        ruleName: string;
        input: Record<string, unknown>;
        output: number;
        message: string;
    }[];
}
export declare class SapXepRuleDto {
    danhSachRuleId: number[];
}
