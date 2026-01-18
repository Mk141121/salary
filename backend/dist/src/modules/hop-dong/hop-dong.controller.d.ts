import { HopDongService } from './hop-dong.service';
import { TaoHopDongDto, CapNhatHopDongDto, NgungHopDongDto } from './hop-dong.dto';
export declare class HopDongController {
    private readonly hopDongService;
    constructor(hopDongService: HopDongService);
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
    taoHopDong(nhanVienId: number, dto: TaoHopDongDto, req: any): Promise<{
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
}
