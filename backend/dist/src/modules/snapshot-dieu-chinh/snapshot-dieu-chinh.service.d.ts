import { PrismaService } from '../../prisma/prisma.service';
import { LoaiDieuChinh, TrangThaiPhieuDC } from '@prisma/client';
export declare class SnapshotDieuChinhService {
    private prisma;
    constructor(prisma: PrismaService);
    taoSnapshot(bangLuongId: number, nguoiChot: string): Promise<{
        message: string;
        bangLuongId: number;
        soChiTiet: number;
        ngayChot: Date;
        nguoiChot: string;
    }>;
    laySnapshot(bangLuongId: number): Promise<{
        bangLuongId: number;
        ngayChot: Date;
        nguoiChot: string;
        danhSach: {
            nhanVienId: number;
            maNhanVien: string;
            hoTen: string;
            phongBan: string;
            chiTiets: {
                id: number;
                ngayTao: Date;
                phongBan: string;
                maKhoan: string;
                tenKhoan: string;
                maNhanVien: string;
                hoTen: string;
                nhanVienId: number;
                khoanLuongId: number;
                soTien: import("@prisma/client/runtime/library").Decimal;
                ngayChot: Date;
                nguoiChot: string;
                bangLuongId: number;
                nguon: import(".prisma/client").$Enums.NguonChiTiet;
                loaiKhoan: import(".prisma/client").$Enums.LoaiKhoanLuong;
            }[];
            tongThuNhap: number;
            tongKhauTru: number;
            thucLinh: number;
        }[];
    }>;
    soSanhSnapshot(bangLuongId: number): Promise<{
        bangLuongId: number;
        coKhacBiet: boolean;
        soKhacBiet: number;
        chiTiet: {
            nhanVienId: number;
            hoTen: string;
            khoanLuong: string;
            soTienSnapshot: number;
            soTienHienTai: number;
            chenhLech: number;
        }[];
    }>;
    private sinhMaPhieu;
    taoPhieuDieuChinh(data: {
        bangLuongId: number;
        nhanVienId: number;
        loaiDieuChinh: LoaiDieuChinh;
        lyDo: string;
        ghiChu?: string;
        nguoiTao: string;
        chiTiets: {
            khoanLuongId: number;
            soTienCu: number;
            soTienMoi: number;
            ghiChu?: string;
        }[];
    }): Promise<{
        nhanVien: {
            id: number;
            trangThai: import(".prisma/client").$Enums.TrangThaiNhanVien;
            ngayTao: Date;
            ngayCapNhat: Date;
            maNhanVien: string;
            email: string | null;
            hoTen: string;
            soDienThoai: string | null;
            phongBanId: number;
            chucVu: string | null;
            luongCoBan: import("@prisma/client/runtime/library").Decimal;
            ngayVaoLam: Date;
        };
        chiTiets: ({
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
            ngayTao: Date;
            khoanLuongId: number;
            ghiChu: string | null;
            chenhLech: import("@prisma/client/runtime/library").Decimal;
            soTienCu: import("@prisma/client/runtime/library").Decimal;
            soTienMoi: import("@prisma/client/runtime/library").Decimal;
            phieuDieuChinhId: number;
        })[];
    } & {
        id: number;
        trangThai: import(".prisma/client").$Enums.TrangThaiPhieuDC;
        ngayTao: Date;
        nhanVienId: number;
        ghiChu: string | null;
        nguoiTao: string;
        bangLuongId: number;
        maPhieu: string;
        loaiDieuChinh: import(".prisma/client").$Enums.LoaiDieuChinh;
        lyDo: string;
        nguoiDuyet: string | null;
        ngayDuyet: Date | null;
        nguoiTuChoi: string | null;
        ngayTuChoi: Date | null;
        lyDoTuChoi: string | null;
    }>;
    layDanhSachPhieu(bangLuongId?: number, trangThai?: TrangThaiPhieuDC): Promise<({
        nhanVien: {
            maNhanVien: string;
            hoTen: string;
        };
        chiTiets: ({
            khoanLuong: {
                maKhoan: string;
                tenKhoan: string;
            };
        } & {
            id: number;
            ngayTao: Date;
            khoanLuongId: number;
            ghiChu: string | null;
            chenhLech: import("@prisma/client/runtime/library").Decimal;
            soTienCu: import("@prisma/client/runtime/library").Decimal;
            soTienMoi: import("@prisma/client/runtime/library").Decimal;
            phieuDieuChinhId: number;
        })[];
    } & {
        id: number;
        trangThai: import(".prisma/client").$Enums.TrangThaiPhieuDC;
        ngayTao: Date;
        nhanVienId: number;
        ghiChu: string | null;
        nguoiTao: string;
        bangLuongId: number;
        maPhieu: string;
        loaiDieuChinh: import(".prisma/client").$Enums.LoaiDieuChinh;
        lyDo: string;
        nguoiDuyet: string | null;
        ngayDuyet: Date | null;
        nguoiTuChoi: string | null;
        ngayTuChoi: Date | null;
        lyDoTuChoi: string | null;
    })[]>;
    layChiTietPhieu(id: number): Promise<{
        nhanVien: {
            id: number;
            trangThai: import(".prisma/client").$Enums.TrangThaiNhanVien;
            ngayTao: Date;
            ngayCapNhat: Date;
            maNhanVien: string;
            email: string | null;
            hoTen: string;
            soDienThoai: string | null;
            phongBanId: number;
            chucVu: string | null;
            luongCoBan: import("@prisma/client/runtime/library").Decimal;
            ngayVaoLam: Date;
        };
        chiTiets: ({
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
            ngayTao: Date;
            khoanLuongId: number;
            ghiChu: string | null;
            chenhLech: import("@prisma/client/runtime/library").Decimal;
            soTienCu: import("@prisma/client/runtime/library").Decimal;
            soTienMoi: import("@prisma/client/runtime/library").Decimal;
            phieuDieuChinhId: number;
        })[];
    } & {
        id: number;
        trangThai: import(".prisma/client").$Enums.TrangThaiPhieuDC;
        ngayTao: Date;
        nhanVienId: number;
        ghiChu: string | null;
        nguoiTao: string;
        bangLuongId: number;
        maPhieu: string;
        loaiDieuChinh: import(".prisma/client").$Enums.LoaiDieuChinh;
        lyDo: string;
        nguoiDuyet: string | null;
        ngayDuyet: Date | null;
        nguoiTuChoi: string | null;
        ngayTuChoi: Date | null;
        lyDoTuChoi: string | null;
    }>;
    duyetPhieu(id: number, nguoiDuyet: string): Promise<{
        message: string;
        maPhieu: string;
        nguoiDuyet: string;
        ngayDuyet: Date;
    }>;
    tuChoiPhieu(id: number, nguoiTuChoi: string, lyDoTuChoi: string): Promise<{
        id: number;
        trangThai: import(".prisma/client").$Enums.TrangThaiPhieuDC;
        ngayTao: Date;
        nhanVienId: number;
        ghiChu: string | null;
        nguoiTao: string;
        bangLuongId: number;
        maPhieu: string;
        loaiDieuChinh: import(".prisma/client").$Enums.LoaiDieuChinh;
        lyDo: string;
        nguoiDuyet: string | null;
        ngayDuyet: Date | null;
        nguoiTuChoi: string | null;
        ngayTuChoi: Date | null;
        lyDoTuChoi: string | null;
    }>;
    huyPhieu(id: number): Promise<{
        id: number;
        trangThai: import(".prisma/client").$Enums.TrangThaiPhieuDC;
        ngayTao: Date;
        nhanVienId: number;
        ghiChu: string | null;
        nguoiTao: string;
        bangLuongId: number;
        maPhieu: string;
        loaiDieuChinh: import(".prisma/client").$Enums.LoaiDieuChinh;
        lyDo: string;
        nguoiDuyet: string | null;
        ngayDuyet: Date | null;
        nguoiTuChoi: string | null;
        ngayTuChoi: Date | null;
        lyDoTuChoi: string | null;
    }>;
}
