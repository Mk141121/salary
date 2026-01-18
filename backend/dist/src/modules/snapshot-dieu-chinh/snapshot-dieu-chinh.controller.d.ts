import { SnapshotDieuChinhService } from './snapshot-dieu-chinh.service';
import { TaoSnapshotDto, TaoPhieuDieuChinhDto, DuyetPhieuDto, TuChoiPhieuDto } from './dto/snapshot-dieu-chinh.dto';
import { TrangThaiPhieuDC } from '@prisma/client';
export declare class SnapshotDieuChinhController {
    private readonly service;
    constructor(service: SnapshotDieuChinhService);
    taoSnapshot(bangLuongId: number, dto: TaoSnapshotDto): Promise<{
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
                phongBanId: number | null;
                nhanVienId: number;
                khoanLuongId: number;
                soTien: import("@prisma/client/runtime/library").Decimal;
                ngayChot: Date;
                nguoiChot: string;
                bangLuongId: number;
                nguon: import(".prisma/client").$Enums.NguonChiTiet;
                donViConId: number | null;
                donViCon: string | null;
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
    taoPhieuDieuChinh(dto: TaoPhieuDieuChinhDto): Promise<{
        nhanVien: {
            id: number;
            trangThai: import(".prisma/client").$Enums.TrangThaiNhanVien;
            taoBoi: number | null;
            capNhatBoi: number | null;
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
            ngayNghiViec: Date | null;
            gioiTinh: import(".prisma/client").$Enums.GioiTinh | null;
            ngaySinh: Date | null;
            diaChi: string | null;
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
    layDanhSachPhieu(bangLuongId?: string, trangThai?: TrangThaiPhieuDC): Promise<({
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
            taoBoi: number | null;
            capNhatBoi: number | null;
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
            ngayNghiViec: Date | null;
            gioiTinh: import(".prisma/client").$Enums.GioiTinh | null;
            ngaySinh: Date | null;
            diaChi: string | null;
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
    duyetPhieu(id: number, dto: DuyetPhieuDto): Promise<{
        message: string;
        maPhieu: string;
        nguoiDuyet: string;
        ngayDuyet: Date;
    }>;
    tuChoiPhieu(id: number, dto: TuChoiPhieuDto): Promise<{
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
