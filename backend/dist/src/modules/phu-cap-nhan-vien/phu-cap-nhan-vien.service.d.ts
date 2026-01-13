import { PrismaService } from '../../prisma/prisma.service';
import { Prisma, TrangThaiPhuCap } from '@prisma/client';
export interface TaoPhuCapDto {
    nhanVienId: number;
    khoanLuongId: number;
    soTien: number;
    tuNgay: Date;
    denNgay?: Date;
    ghiChu?: string;
    nguoiTao?: string;
}
export interface CapNhatPhuCapDto {
    denNgay?: Date;
    ghiChu?: string;
    trangThai?: TrangThaiPhuCap;
}
export interface TangPhuCapDto {
    soTienMoi: number;
    tuNgay: Date;
    ghiChu?: string;
    nguoiTao?: string;
}
export declare class PhuCapNhanVienService {
    private prisma;
    constructor(prisma: PrismaService);
    layTheoNhanVien(nhanVienId: number): Promise<({
        khoanLuong: {
            id: number;
            moTa: string | null;
            trangThai: boolean;
            ngayTao: Date;
            ngayCapNhat: Date;
            maKhoan: string;
            tenKhoan: string;
            loai: import(".prisma/client").$Enums.LoaiKhoanLuong;
            cachTinh: import(".prisma/client").$Enums.CachTinhLuong;
            chiuThue: boolean;
            phamViApDung: string | null;
            thuTu: number;
        };
    } & {
        id: number;
        trangThai: import(".prisma/client").$Enums.TrangThaiPhuCap;
        ngayTao: Date;
        ngayCapNhat: Date;
        nhanVienId: number;
        khoanLuongId: number;
        soTien: Prisma.Decimal;
        tuNgay: Date;
        denNgay: Date | null;
        ghiChu: string | null;
        nguoiTao: string | null;
    })[]>;
    layPhuCapHieuLuc(nhanVienId: number): Promise<({
        khoanLuong: {
            id: number;
            moTa: string | null;
            trangThai: boolean;
            ngayTao: Date;
            ngayCapNhat: Date;
            maKhoan: string;
            tenKhoan: string;
            loai: import(".prisma/client").$Enums.LoaiKhoanLuong;
            cachTinh: import(".prisma/client").$Enums.CachTinhLuong;
            chiuThue: boolean;
            phamViApDung: string | null;
            thuTu: number;
        };
    } & {
        id: number;
        trangThai: import(".prisma/client").$Enums.TrangThaiPhuCap;
        ngayTao: Date;
        ngayCapNhat: Date;
        nhanVienId: number;
        khoanLuongId: number;
        soTien: Prisma.Decimal;
        tuNgay: Date;
        denNgay: Date | null;
        ghiChu: string | null;
        nguoiTao: string | null;
    })[]>;
    layPhuCapTheoThang(nhanVienId: number, thang: number, nam: number): Promise<({
        khoanLuong: {
            id: number;
            moTa: string | null;
            trangThai: boolean;
            ngayTao: Date;
            ngayCapNhat: Date;
            maKhoan: string;
            tenKhoan: string;
            loai: import(".prisma/client").$Enums.LoaiKhoanLuong;
            cachTinh: import(".prisma/client").$Enums.CachTinhLuong;
            chiuThue: boolean;
            phamViApDung: string | null;
            thuTu: number;
        };
    } & {
        id: number;
        trangThai: import(".prisma/client").$Enums.TrangThaiPhuCap;
        ngayTao: Date;
        ngayCapNhat: Date;
        nhanVienId: number;
        khoanLuongId: number;
        soTien: Prisma.Decimal;
        tuNgay: Date;
        denNgay: Date | null;
        ghiChu: string | null;
        nguoiTao: string | null;
    })[]>;
    layPhuCapTheoThangBatch(nhanVienIds: number[], thang: number, nam: number): Promise<({
        khoanLuong: {
            id: number;
            moTa: string | null;
            trangThai: boolean;
            ngayTao: Date;
            ngayCapNhat: Date;
            maKhoan: string;
            tenKhoan: string;
            loai: import(".prisma/client").$Enums.LoaiKhoanLuong;
            cachTinh: import(".prisma/client").$Enums.CachTinhLuong;
            chiuThue: boolean;
            phamViApDung: string | null;
            thuTu: number;
        };
        nhanVien: {
            id: number;
            maNhanVien: string;
            hoTen: string;
        };
    } & {
        id: number;
        trangThai: import(".prisma/client").$Enums.TrangThaiPhuCap;
        ngayTao: Date;
        ngayCapNhat: Date;
        nhanVienId: number;
        khoanLuongId: number;
        soTien: Prisma.Decimal;
        tuNgay: Date;
        denNgay: Date | null;
        ghiChu: string | null;
        nguoiTao: string | null;
    })[]>;
    taoPhuCap(dto: TaoPhuCapDto): Promise<{
        khoanLuong: {
            id: number;
            moTa: string | null;
            trangThai: boolean;
            ngayTao: Date;
            ngayCapNhat: Date;
            maKhoan: string;
            tenKhoan: string;
            loai: import(".prisma/client").$Enums.LoaiKhoanLuong;
            cachTinh: import(".prisma/client").$Enums.CachTinhLuong;
            chiuThue: boolean;
            phamViApDung: string | null;
            thuTu: number;
        };
    } & {
        id: number;
        trangThai: import(".prisma/client").$Enums.TrangThaiPhuCap;
        ngayTao: Date;
        ngayCapNhat: Date;
        nhanVienId: number;
        khoanLuongId: number;
        soTien: Prisma.Decimal;
        tuNgay: Date;
        denNgay: Date | null;
        ghiChu: string | null;
        nguoiTao: string | null;
    }>;
    ketThucPhuCap(id: number, denNgay: Date, nguoiCapNhat?: string): Promise<{
        khoanLuong: {
            id: number;
            moTa: string | null;
            trangThai: boolean;
            ngayTao: Date;
            ngayCapNhat: Date;
            maKhoan: string;
            tenKhoan: string;
            loai: import(".prisma/client").$Enums.LoaiKhoanLuong;
            cachTinh: import(".prisma/client").$Enums.CachTinhLuong;
            chiuThue: boolean;
            phamViApDung: string | null;
            thuTu: number;
        };
    } & {
        id: number;
        trangThai: import(".prisma/client").$Enums.TrangThaiPhuCap;
        ngayTao: Date;
        ngayCapNhat: Date;
        nhanVienId: number;
        khoanLuongId: number;
        soTien: Prisma.Decimal;
        tuNgay: Date;
        denNgay: Date | null;
        ghiChu: string | null;
        nguoiTao: string | null;
    }>;
    tangPhuCap(id: number, dto: TangPhuCapDto): Promise<{
        khoanLuong: {
            id: number;
            moTa: string | null;
            trangThai: boolean;
            ngayTao: Date;
            ngayCapNhat: Date;
            maKhoan: string;
            tenKhoan: string;
            loai: import(".prisma/client").$Enums.LoaiKhoanLuong;
            cachTinh: import(".prisma/client").$Enums.CachTinhLuong;
            chiuThue: boolean;
            phamViApDung: string | null;
            thuTu: number;
        };
    } & {
        id: number;
        trangThai: import(".prisma/client").$Enums.TrangThaiPhuCap;
        ngayTao: Date;
        ngayCapNhat: Date;
        nhanVienId: number;
        khoanLuongId: number;
        soTien: Prisma.Decimal;
        tuNgay: Date;
        denNgay: Date | null;
        ghiChu: string | null;
        nguoiTao: string | null;
    }>;
    tamDungPhuCap(id: number): Promise<{
        khoanLuong: {
            id: number;
            moTa: string | null;
            trangThai: boolean;
            ngayTao: Date;
            ngayCapNhat: Date;
            maKhoan: string;
            tenKhoan: string;
            loai: import(".prisma/client").$Enums.LoaiKhoanLuong;
            cachTinh: import(".prisma/client").$Enums.CachTinhLuong;
            chiuThue: boolean;
            phamViApDung: string | null;
            thuTu: number;
        };
    } & {
        id: number;
        trangThai: import(".prisma/client").$Enums.TrangThaiPhuCap;
        ngayTao: Date;
        ngayCapNhat: Date;
        nhanVienId: number;
        khoanLuongId: number;
        soTien: Prisma.Decimal;
        tuNgay: Date;
        denNgay: Date | null;
        ghiChu: string | null;
        nguoiTao: string | null;
    }>;
    kichHoatLai(id: number): Promise<{
        khoanLuong: {
            id: number;
            moTa: string | null;
            trangThai: boolean;
            ngayTao: Date;
            ngayCapNhat: Date;
            maKhoan: string;
            tenKhoan: string;
            loai: import(".prisma/client").$Enums.LoaiKhoanLuong;
            cachTinh: import(".prisma/client").$Enums.CachTinhLuong;
            chiuThue: boolean;
            phamViApDung: string | null;
            thuTu: number;
        };
    } & {
        id: number;
        trangThai: import(".prisma/client").$Enums.TrangThaiPhuCap;
        ngayTao: Date;
        ngayCapNhat: Date;
        nhanVienId: number;
        khoanLuongId: number;
        soTien: Prisma.Decimal;
        tuNgay: Date;
        denNgay: Date | null;
        ghiChu: string | null;
        nguoiTao: string | null;
    }>;
    layLichSuPhuCap(nhanVienId: number, khoanLuongId?: number): Promise<({
        khoanLuong: {
            id: number;
            moTa: string | null;
            trangThai: boolean;
            ngayTao: Date;
            ngayCapNhat: Date;
            maKhoan: string;
            tenKhoan: string;
            loai: import(".prisma/client").$Enums.LoaiKhoanLuong;
            cachTinh: import(".prisma/client").$Enums.CachTinhLuong;
            chiuThue: boolean;
            phamViApDung: string | null;
            thuTu: number;
        };
    } & {
        id: number;
        trangThai: import(".prisma/client").$Enums.TrangThaiPhuCap;
        ngayTao: Date;
        ngayCapNhat: Date;
        nhanVienId: number;
        khoanLuongId: number;
        soTien: Prisma.Decimal;
        tuNgay: Date;
        denNgay: Date | null;
        ghiChu: string | null;
        nguoiTao: string | null;
    })[]>;
    private kiemTraTrungLap;
    thongKeTheoPhongBan(phongBanId: number): Promise<{
        khoanLuong: {
            id: number;
            moTa: string | null;
            trangThai: boolean;
            ngayTao: Date;
            ngayCapNhat: Date;
            maKhoan: string;
            tenKhoan: string;
            loai: import(".prisma/client").$Enums.LoaiKhoanLuong;
            cachTinh: import(".prisma/client").$Enums.CachTinhLuong;
            chiuThue: boolean;
            phamViApDung: string | null;
            thuTu: number;
        } | undefined;
        tongTien: Prisma.Decimal | null;
        soNhanVien: number;
    }[]>;
}
