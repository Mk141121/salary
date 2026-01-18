import { PrismaService } from '../../prisma/prisma.service';
import { TaoHopDongDto, CapNhatHopDongDto, NgungHopDongDto } from './hop-dong.dto';
export declare class HopDongService {
    private prisma;
    constructor(prisma: PrismaService);
    layDanhSachHopDong(nhanVienId: number): Promise<{
        id: number;
        trangThai: import(".prisma/client").$Enums.TrangThaiHopDong;
        taoBoi: number | null;
        ngayTao: Date;
        luongCoBan: import("@prisma/client/runtime/library").Decimal;
        nhanVienId: number;
        tuNgay: Date;
        denNgay: Date | null;
        ghiChu: string | null;
        loaiHopDong: import(".prisma/client").$Enums.LoaiHopDong;
        luongDongBH: import("@prisma/client/runtime/library").Decimal | null;
        heSoLuong: import("@prisma/client/runtime/library").Decimal | null;
    }[]>;
    layHopDongTheoId(id: number): Promise<{
        nhanVien: {
            maNhanVien: string;
            hoTen: string;
        };
    } & {
        id: number;
        trangThai: import(".prisma/client").$Enums.TrangThaiHopDong;
        taoBoi: number | null;
        ngayTao: Date;
        luongCoBan: import("@prisma/client/runtime/library").Decimal;
        nhanVienId: number;
        tuNgay: Date;
        denNgay: Date | null;
        ghiChu: string | null;
        loaiHopDong: import(".prisma/client").$Enums.LoaiHopDong;
        luongDongBH: import("@prisma/client/runtime/library").Decimal | null;
        heSoLuong: import("@prisma/client/runtime/library").Decimal | null;
    }>;
    layHopDongHieuLuc(nhanVienId: number, ngay: Date): Promise<{
        id: number;
        trangThai: import(".prisma/client").$Enums.TrangThaiHopDong;
        taoBoi: number | null;
        ngayTao: Date;
        luongCoBan: import("@prisma/client/runtime/library").Decimal;
        nhanVienId: number;
        tuNgay: Date;
        denNgay: Date | null;
        ghiChu: string | null;
        loaiHopDong: import(".prisma/client").$Enums.LoaiHopDong;
        luongDongBH: import("@prisma/client/runtime/library").Decimal | null;
        heSoLuong: import("@prisma/client/runtime/library").Decimal | null;
    } | null>;
    taoHopDong(nhanVienId: number, dto: TaoHopDongDto, taoBoi?: number): Promise<{
        id: number;
        trangThai: import(".prisma/client").$Enums.TrangThaiHopDong;
        taoBoi: number | null;
        ngayTao: Date;
        luongCoBan: import("@prisma/client/runtime/library").Decimal;
        nhanVienId: number;
        tuNgay: Date;
        denNgay: Date | null;
        ghiChu: string | null;
        loaiHopDong: import(".prisma/client").$Enums.LoaiHopDong;
        luongDongBH: import("@prisma/client/runtime/library").Decimal | null;
        heSoLuong: import("@prisma/client/runtime/library").Decimal | null;
    }>;
    capNhatHopDong(id: number, dto: CapNhatHopDongDto): Promise<{
        id: number;
        trangThai: import(".prisma/client").$Enums.TrangThaiHopDong;
        taoBoi: number | null;
        ngayTao: Date;
        luongCoBan: import("@prisma/client/runtime/library").Decimal;
        nhanVienId: number;
        tuNgay: Date;
        denNgay: Date | null;
        ghiChu: string | null;
        loaiHopDong: import(".prisma/client").$Enums.LoaiHopDong;
        luongDongBH: import("@prisma/client/runtime/library").Decimal | null;
        heSoLuong: import("@prisma/client/runtime/library").Decimal | null;
    }>;
    ngungHopDong(id: number, dto: NgungHopDongDto): Promise<{
        id: number;
        trangThai: import(".prisma/client").$Enums.TrangThaiHopDong;
        taoBoi: number | null;
        ngayTao: Date;
        luongCoBan: import("@prisma/client/runtime/library").Decimal;
        nhanVienId: number;
        tuNgay: Date;
        denNgay: Date | null;
        ghiChu: string | null;
        loaiHopDong: import(".prisma/client").$Enums.LoaiHopDong;
        luongDongBH: import("@prisma/client/runtime/library").Decimal | null;
        heSoLuong: import("@prisma/client/runtime/library").Decimal | null;
    }>;
    xoaHopDong(id: number): Promise<{
        id: number;
        trangThai: import(".prisma/client").$Enums.TrangThaiHopDong;
        taoBoi: number | null;
        ngayTao: Date;
        luongCoBan: import("@prisma/client/runtime/library").Decimal;
        nhanVienId: number;
        tuNgay: Date;
        denNgay: Date | null;
        ghiChu: string | null;
        loaiHopDong: import(".prisma/client").$Enums.LoaiHopDong;
        luongDongBH: import("@prisma/client/runtime/library").Decimal | null;
        heSoLuong: import("@prisma/client/runtime/library").Decimal | null;
    }>;
    private kiemTraOverlap;
    layLuongCoBanHieuLuc(nhanVienId: number, ngay: Date): Promise<number>;
}
