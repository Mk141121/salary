import { KieuDuLieu } from '@prisma/client';
export declare class BienSoDto {
    tenBien: string;
    moTa?: string;
    kieuDuLieu?: KieuDuLieu;
    nguonDuLieu?: string;
    giaTriMacDinh?: string;
}
export declare class TaoCongThucDto {
    maCongThuc: string;
    tenCongThuc: string;
    moTa?: string;
    phongBanId?: number;
    congThuc: string;
    tuNgay: Date;
    denNgay?: Date;
    nguoiTao?: string;
    bienSos?: BienSoDto[];
}
export declare class CapNhatCongThucDto {
    congThuc: string;
    lyDoThayDoi?: string;
    nguoiThayDoi: string;
}
export declare class ThemBienSoDto {
    tenBien: string;
    moTa?: string;
    kieuDuLieu?: KieuDuLieu;
    nguonDuLieu?: string;
    giaTriMacDinh?: string;
}
export declare class TestCongThucDto {
    congThuc: string;
    bienSo: Record<string, number | string>;
}
export declare class TinhLuongDto {
    nhanVienId: number;
    congThucId: number;
    thang: number;
    nam: number;
}
