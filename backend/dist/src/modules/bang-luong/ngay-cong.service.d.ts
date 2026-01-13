import { PrismaService } from '../../prisma/prisma.service';
import { Decimal } from '@prisma/client/runtime/library';
export declare class NgayCongService {
    private prisma;
    constructor(prisma: PrismaService);
    tinhLaiKhoanLuongTheoNgayCong(bangLuongId: number, nhanVienId: number, ngayCongMoi: number): Promise<void>;
    khoiTaoNgayCongTuChamCong(bangLuongId: number): Promise<{
        bangLuongId: number;
        nhanVienId: number;
        ngayCongLyThuyet: Decimal;
        soCongThucTe: Decimal;
        soNgayNghiPhep: Decimal;
        soNgayNghiKhongPhep: Decimal;
        ngayCongDieuChinh: null;
        ghiChu: null;
    }[]>;
    layNgayCongTheoNhanVien(bangLuongId: number, nhanVienId: number): Promise<{
        id: number;
        ngayTao: Date;
        ngayCapNhat: Date;
        nhanVienId: number;
        ghiChu: string | null;
        bangLuongId: number;
        soCongThucTe: Decimal;
        soNgayNghiPhep: Decimal;
        ngayCongLyThuyet: Decimal;
        soNgayNghiKhongPhep: Decimal;
        ngayCongDieuChinh: Decimal | null;
    } | null>;
    layTatCaNgayCong(bangLuongId: number): Promise<({
        nhanVien: {
            id: number;
            maNhanVien: string;
            hoTen: string;
        };
    } & {
        id: number;
        ngayTao: Date;
        ngayCapNhat: Date;
        nhanVienId: number;
        ghiChu: string | null;
        bangLuongId: number;
        soCongThucTe: Decimal;
        soNgayNghiPhep: Decimal;
        ngayCongLyThuyet: Decimal;
        soNgayNghiKhongPhep: Decimal;
        ngayCongDieuChinh: Decimal | null;
    })[]>;
    capNhatNgayCongDieuChinh(bangLuongId: number, nhanVienId: number, ngayCongMoi: number, ghiChu?: string): Promise<{
        id: number;
        ngayTao: Date;
        ngayCapNhat: Date;
        nhanVienId: number;
        ghiChu: string | null;
        bangLuongId: number;
        soCongThucTe: Decimal;
        soNgayNghiPhep: Decimal;
        ngayCongLyThuyet: Decimal;
        soNgayNghiKhongPhep: Decimal;
        ngayCongDieuChinh: Decimal | null;
    }>;
    tinhNgayCongThucTe(ngayCong: any): number;
    private tinhNgayCongLyThuyet;
    xoaDieuChinh(bangLuongId: number, nhanVienId: number): Promise<{
        id: number;
        ngayTao: Date;
        ngayCapNhat: Date;
        nhanVienId: number;
        ghiChu: string | null;
        bangLuongId: number;
        soCongThucTe: Decimal;
        soNgayNghiPhep: Decimal;
        ngayCongLyThuyet: Decimal;
        soNgayNghiKhongPhep: Decimal;
        ngayCongDieuChinh: Decimal | null;
    }>;
}
