import { PhuCapNhanVienService } from './phu-cap-nhan-vien.service';
import { TaoPhuCapDto, KetThucPhuCapDto, TangPhuCapDto } from './phu-cap-nhan-vien.dto';
export declare class PhuCapNhanVienController {
    private readonly phuCapService;
    constructor(phuCapService: PhuCapNhanVienService);
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
        soTien: import("@prisma/client/runtime/library").Decimal;
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
        soTien: import("@prisma/client/runtime/library").Decimal;
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
        soTien: import("@prisma/client/runtime/library").Decimal;
        tuNgay: Date;
        denNgay: Date | null;
        ghiChu: string | null;
        nguoiTao: string | null;
    })[]>;
    layLichSuPhuCap(nhanVienId: number, khoanLuongId?: string): Promise<({
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
        soTien: import("@prisma/client/runtime/library").Decimal;
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
        soTien: import("@prisma/client/runtime/library").Decimal;
        tuNgay: Date;
        denNgay: Date | null;
        ghiChu: string | null;
        nguoiTao: string | null;
    }>;
    ketThucPhuCap(id: number, dto: KetThucPhuCapDto): Promise<{
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
        soTien: import("@prisma/client/runtime/library").Decimal;
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
        soTien: import("@prisma/client/runtime/library").Decimal;
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
        soTien: import("@prisma/client/runtime/library").Decimal;
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
        soTien: import("@prisma/client/runtime/library").Decimal;
        tuNgay: Date;
        denNgay: Date | null;
        ghiChu: string | null;
        nguoiTao: string | null;
    }>;
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
        tongTien: import("@prisma/client/runtime/library").Decimal | null;
        soNhanVien: number;
    }[]>;
}
