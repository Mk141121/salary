import { LoaiRule, CheDoGop, TrangThaiAiAudit } from '@prisma/client';
export declare class GoiYRuleDto {
    phongBanId: number;
    quyCheId: number;
    noiDungTiengViet: string;
}
export declare class DieuKienApDungDeXuat {
    tatCa?: boolean;
    vaiTro?: string[];
    capTrachNhiem?: number[];
    nhanVienIds?: number[];
    phongBanIds?: number[];
}
export declare class DieuKienJsonDeXuat {
    apDungCho?: DieuKienApDungDeXuat;
}
export declare class BacThangDeXuat {
    from: number;
    to: number;
    soTien?: number;
    soTienMoiLan?: number;
    heSo?: number;
}
export declare class CongThucCoDinhDeXuat {
    soTien: number;
}
export declare class CongThucTheoHeSoDeXuat {
    base: string;
    heSo: number;
    congThem?: number;
}
export declare class CongThucBacThangDeXuat {
    field: string;
    bac: BacThangDeXuat[];
}
export declare class CongThucTheoSuKienDeXuat {
    maSuKien: string;
    cachTinh: 'CO_DINH' | 'BAC_THANG';
    soTienMoiLan?: number;
    bac?: BacThangDeXuat[];
}
export declare class CongThucBieuThucDeXuat {
    bieuThuc: string;
}
export type CongThucJsonDeXuat = CongThucCoDinhDeXuat | CongThucTheoHeSoDeXuat | CongThucBacThangDeXuat | CongThucTheoSuKienDeXuat | CongThucBieuThucDeXuat;
export declare class RuleDeXuat {
    tenRule: string;
    khoanLuongMa: string;
    khoanLuongId?: number;
    loaiRule: LoaiRule;
    thuTuUuTien: number;
    cheDoGop: CheDoGop;
    choPhepChinhTay: boolean;
    dieuKienJson?: DieuKienJsonDeXuat;
    congThucJson: CongThucJsonDeXuat;
}
export declare class GoiYRuleResponseDto {
    hopLeSoBo: boolean;
    canLamRo: string[];
    tomTatRule?: string;
    ruleDeXuat?: RuleDeXuat;
    giaiThich?: string[];
    canhBao?: string[];
}
export declare class AiContextDto {
    phongBan: {
        id: number;
        maPhongBan: string;
        tenPhongBan: string;
    };
    quyChe: {
        id: number;
        tenQuyChe: string;
        phienBan: number;
    };
    khoanLuongs: Array<{
        id: number;
        maKhoan: string;
        tenKhoan: string;
        loai: string;
    }>;
    danhMucSuKien: Array<{
        maSuKien: string;
        tenSuKien: string;
        loai: string;
        soTienMacDinh: number;
    }>;
    capTrachNhiems: number[];
}
export declare class ApDungRuleDeXuatDto {
    auditId: number;
    ruleDeXuat?: RuleDeXuat;
}
export declare class AiRuleAuditDto {
    id: number;
    nguoiTaoId?: number;
    phongBanId?: number;
    quyCheId?: number;
    promptGoc: string;
    responseJson: string;
    trangThai: TrangThaiAiAudit;
    ruleApDungId?: number;
    taoLuc: Date;
}
export interface TuDienAlias {
    [key: string]: {
        maKhoan?: string;
        maSuKien?: string;
        loaiRule?: LoaiRule;
    };
}
export declare const TU_DIEN_ALIAS: TuDienAlias;
export declare const PATTERN_LOAI_RULE: {
    BAC_THANG: RegExp[];
    CO_DINH: RegExp[];
    THEO_HE_SO: RegExp[];
    THEO_SU_KIEN: RegExp[];
    CONG_THUC: RegExp[];
};
