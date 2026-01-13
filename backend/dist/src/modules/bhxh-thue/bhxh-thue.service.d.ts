import { PrismaService } from '../../prisma/prisma.service';
import { CacheService } from '../../common/cache/cache.service';
import { Decimal } from '@prisma/client/runtime/library';
export interface KetQuaTinhBHXH {
    luongDongBHXH: number;
    bhxhNV: number;
    bhytNV: number;
    bhtnNV: number;
    tongBHNV: number;
    bhxhDN: number;
    bhytDN: number;
    bhtnDN: number;
    tongBHDN: number;
}
export interface KetQuaTinhThue {
    thuNhapChiuThue: number;
    giamTruBanThan: number;
    soPhuThuoc: number;
    giamTruPhuThuoc: number;
    giamTruBHXH: number;
    thuNhapTinhThue: number;
    thueTNCN: number;
    bacThueApDung: number | null;
}
export declare class BHXHThueService {
    private prisma;
    private cacheService;
    constructor(prisma: PrismaService, cacheService: CacheService);
    layCauHinhBHXH(nam: number): Promise<{
        id: number;
        trangThai: boolean;
        ngayTao: Date;
        ngayCapNhat: Date;
        nam: number;
        tyLeBHXH_NV: Decimal;
        tyLeBHXH_DN: Decimal;
        tyLeBHYT_NV: Decimal;
        tyLeBHYT_DN: Decimal;
        tyLeBHTN_NV: Decimal;
        tyLeBHTN_DN: Decimal;
        luongCoBanToiThieu: Decimal;
        tranDongBHXH: Decimal;
        luongCoSo: Decimal;
    }>;
    luuCauHinhBHXH(data: {
        nam: number;
        tyLeBHXH_NV: number;
        tyLeBHXH_DN: number;
        tyLeBHYT_NV: number;
        tyLeBHYT_DN: number;
        tyLeBHTN_NV: number;
        tyLeBHTN_DN: number;
        luongCoBanToiThieu: number;
        tranDongBHXH: number;
        luongCoSo: number;
    }): Promise<{
        id: number;
        trangThai: boolean;
        ngayTao: Date;
        ngayCapNhat: Date;
        nam: number;
        tyLeBHXH_NV: Decimal;
        tyLeBHXH_DN: Decimal;
        tyLeBHYT_NV: Decimal;
        tyLeBHYT_DN: Decimal;
        tyLeBHTN_NV: Decimal;
        tyLeBHTN_DN: Decimal;
        luongCoBanToiThieu: Decimal;
        tranDongBHXH: Decimal;
        luongCoSo: Decimal;
    }>;
    khoiTaoCauHinhMacDinh(): Promise<{
        message: string;
    }>;
    layNguoiPhuThuoc(nhanVienId: number): Promise<{
        id: number;
        trangThai: boolean;
        ngayTao: Date;
        ngayCapNhat: Date;
        hoTen: string;
        nhanVienId: number;
        tuNgay: Date;
        denNgay: Date | null;
        ghiChu: string | null;
        ngaySinh: Date | null;
        quanHe: string;
        maSoThue: string | null;
        soCCCD: string | null;
    }[]>;
    themNguoiPhuThuoc(data: {
        nhanVienId: number;
        hoTen: string;
        ngaySinh?: Date;
        quanHe: string;
        maSoThue?: string;
        soCCCD?: string;
        tuNgay: Date;
        denNgay?: Date;
        ghiChu?: string;
    }): Promise<{
        id: number;
        trangThai: boolean;
        ngayTao: Date;
        ngayCapNhat: Date;
        hoTen: string;
        nhanVienId: number;
        tuNgay: Date;
        denNgay: Date | null;
        ghiChu: string | null;
        ngaySinh: Date | null;
        quanHe: string;
        maSoThue: string | null;
        soCCCD: string | null;
    }>;
    capNhatNguoiPhuThuoc(id: number, data: {
        hoTen?: string;
        ngaySinh?: Date;
        quanHe?: string;
        maSoThue?: string;
        soCCCD?: string;
        tuNgay?: Date;
        denNgay?: Date;
        trangThai?: boolean;
        ghiChu?: string;
    }): Promise<{
        id: number;
        trangThai: boolean;
        ngayTao: Date;
        ngayCapNhat: Date;
        hoTen: string;
        nhanVienId: number;
        tuNgay: Date;
        denNgay: Date | null;
        ghiChu: string | null;
        ngaySinh: Date | null;
        quanHe: string;
        maSoThue: string | null;
        soCCCD: string | null;
    }>;
    demNguoiPhuThuocHopLe(nhanVienId: number, thang: number, nam: number): Promise<number>;
    tinhBHXH(luongDongBHXH: number, nam: number): Promise<KetQuaTinhBHXH>;
    layCauHinhThue(nam: number): Promise<{
        bacThue: {
            id: number;
            ngayTao: Date;
            cauHinhThueId: number;
            bac: number;
            tuMuc: Decimal;
            denMuc: Decimal | null;
            thueSuat: Decimal;
            soTienTruNhanh: Decimal;
        }[];
    } & {
        id: number;
        trangThai: boolean;
        ngayTao: Date;
        ngayCapNhat: Date;
        nam: number;
        giamTruBanThan: Decimal;
        giamTruPhuThuoc: Decimal;
    }>;
    luuCauHinhThue(data: {
        nam: number;
        giamTruBanThan: number;
        giamTruPhuThuoc: number;
    }): Promise<{
        id: number;
        trangThai: boolean;
        ngayTao: Date;
        ngayCapNhat: Date;
        nam: number;
        giamTruBanThan: Decimal;
        giamTruPhuThuoc: Decimal;
    }>;
    tinhThueTNCN(thuNhapChiuThue: number, giamTruBHXH: number, soPhuThuoc: number, nam: number): Promise<KetQuaTinhThue>;
    tinhChoToBoNhanVien(bangLuongId: number): Promise<{
        nhanVienId: number;
        hoTen: string;
        bhxh: KetQuaTinhBHXH;
        thue: KetQuaTinhThue;
    }[]>;
    layKetQuaTinh(bangLuongId: number): Promise<{
        bhxh: {
            id: number;
            ngayTao: Date;
            nhanVienId: number;
            bangLuongId: number;
            luongDongBHXH: Decimal;
            bhxhNV: Decimal;
            bhytNV: Decimal;
            bhtnNV: Decimal;
            tongBHNV: Decimal;
            bhxhDN: Decimal;
            bhytDN: Decimal;
            bhtnDN: Decimal;
            tongBHDN: Decimal;
        }[];
        thue: {
            id: number;
            ngayTao: Date;
            giamTruBanThan: Decimal;
            giamTruPhuThuoc: Decimal;
            nhanVienId: number;
            bangLuongId: number;
            thuNhapChiuThue: Decimal;
            soPhuThuoc: number;
            giamTruBHXH: Decimal;
            thuNhapTinhThue: Decimal;
            thueTNCN: Decimal;
            bacThueApDung: number | null;
        }[];
    }>;
}
