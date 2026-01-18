import { PrismaService } from '../../prisma/prisma.service';
import { KieuDuLieu } from '@prisma/client';
export interface BienSoGiaTri {
    [key: string]: number | string;
}
export interface KetQuaTinhCongThuc {
    congThuc: string;
    bienSo: BienSoGiaTri;
    ketQua: number;
    chiTiet: string;
}
export declare class RuleEngineService {
    private prisma;
    constructor(prisma: PrismaService);
    layDanhSachCongThuc(phongBanId?: number): Promise<({
        bienSos: {
            id: number;
            moTa: string | null;
            ngayTao: Date;
            giaTriMacDinh: string | null;
            tenBien: string;
            kieuDuLieu: import(".prisma/client").$Enums.KieuDuLieu;
            nguonDuLieu: string | null;
            congThucId: number;
        }[];
    } & {
        id: number;
        moTa: string | null;
        trangThai: boolean;
        ngayTao: Date;
        ngayCapNhat: Date;
        phongBanId: number | null;
        tuNgay: Date;
        denNgay: Date | null;
        nguoiTao: string | null;
        phienBan: number;
        maCongThuc: string;
        tenCongThuc: string;
        congThuc: string;
    })[]>;
    layCongThuc(id: number): Promise<{
        bienSos: {
            id: number;
            moTa: string | null;
            ngayTao: Date;
            giaTriMacDinh: string | null;
            tenBien: string;
            kieuDuLieu: import(".prisma/client").$Enums.KieuDuLieu;
            nguonDuLieu: string | null;
            congThucId: number;
        }[];
    } & {
        id: number;
        moTa: string | null;
        trangThai: boolean;
        ngayTao: Date;
        ngayCapNhat: Date;
        phongBanId: number | null;
        tuNgay: Date;
        denNgay: Date | null;
        nguoiTao: string | null;
        phienBan: number;
        maCongThuc: string;
        tenCongThuc: string;
        congThuc: string;
    }>;
    taoCongThuc(data: {
        maCongThuc: string;
        tenCongThuc: string;
        moTa?: string;
        phongBanId?: number;
        congThuc: string;
        tuNgay: Date;
        denNgay?: Date;
        nguoiTao?: string;
        bienSos?: {
            tenBien: string;
            moTa?: string;
            kieuDuLieu?: KieuDuLieu;
            nguonDuLieu?: string;
            giaTriMacDinh?: string;
        }[];
    }): Promise<{
        bienSos: {
            id: number;
            moTa: string | null;
            ngayTao: Date;
            giaTriMacDinh: string | null;
            tenBien: string;
            kieuDuLieu: import(".prisma/client").$Enums.KieuDuLieu;
            nguonDuLieu: string | null;
            congThucId: number;
        }[];
    } & {
        id: number;
        moTa: string | null;
        trangThai: boolean;
        ngayTao: Date;
        ngayCapNhat: Date;
        phongBanId: number | null;
        tuNgay: Date;
        denNgay: Date | null;
        nguoiTao: string | null;
        phienBan: number;
        maCongThuc: string;
        tenCongThuc: string;
        congThuc: string;
    }>;
    capNhatCongThuc(id: number, data: {
        congThuc: string;
        lyDoThayDoi?: string;
        nguoiThayDoi: string;
    }): Promise<{
        bienSos: {
            id: number;
            moTa: string | null;
            ngayTao: Date;
            giaTriMacDinh: string | null;
            tenBien: string;
            kieuDuLieu: import(".prisma/client").$Enums.KieuDuLieu;
            nguonDuLieu: string | null;
            congThucId: number;
        }[];
    } & {
        id: number;
        moTa: string | null;
        trangThai: boolean;
        ngayTao: Date;
        ngayCapNhat: Date;
        phongBanId: number | null;
        tuNgay: Date;
        denNgay: Date | null;
        nguoiTao: string | null;
        phienBan: number;
        maCongThuc: string;
        tenCongThuc: string;
        congThuc: string;
    }>;
    themBienSo(congThucId: number, data: {
        tenBien: string;
        moTa?: string;
        kieuDuLieu?: KieuDuLieu;
        nguonDuLieu?: string;
        giaTriMacDinh?: string;
    }): Promise<{
        id: number;
        moTa: string | null;
        ngayTao: Date;
        giaTriMacDinh: string | null;
        tenBien: string;
        kieuDuLieu: import(".prisma/client").$Enums.KieuDuLieu;
        nguonDuLieu: string | null;
        congThucId: number;
    }>;
    xoaBienSo(id: number): Promise<{
        id: number;
        moTa: string | null;
        ngayTao: Date;
        giaTriMacDinh: string | null;
        tenBien: string;
        kieuDuLieu: import(".prisma/client").$Enums.KieuDuLieu;
        nguonDuLieu: string | null;
        congThucId: number;
    }>;
    layLichSuCongThuc(maCongThuc: string): Promise<{
        id: number;
        phienBan: number;
        nguoiThayDoi: string;
        ngayThayDoi: Date;
        maCongThuc: string;
        congThucCu: string;
        congThucMoi: string;
        lyDoThayDoi: string | null;
    }[]>;
    private validateCongThuc;
    tinhCongThuc(congThuc: string, bienSo: BienSoGiaTri): Promise<KetQuaTinhCongThuc>;
    private formatTien;
    layGiaTriBienSo(nhanVienId: number, thang: number, nam: number, bienSos: {
        tenBien: string;
        nguonDuLieu?: string | null;
        giaTriMacDinh?: string | null;
    }[]): Promise<BienSoGiaTri>;
    tinhLuongTheoCongThuc(nhanVienId: number, congThucId: number, thang: number, nam: number): Promise<KetQuaTinhCongThuc>;
    khoiTaoCongThucMau(): Promise<{
        message: string;
    }>;
    testCongThuc(congThuc: string, bienSo: BienSoGiaTri): Promise<KetQuaTinhCongThuc>;
}
