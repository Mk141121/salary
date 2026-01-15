import { PrismaService } from '../../prisma/prisma.service';
import { TaoNhanVienDto, CapNhatNhanVienDto, TimKiemNhanVienDto } from './dto/nhan-vien.dto';
import { PaginatedResult } from '../../common/dto/pagination.dto';
export declare class NhanVienService {
    private prisma;
    constructor(prisma: PrismaService);
    taoMaNhanVienTuDong(): Promise<string>;
    layTatCa(query?: TimKiemNhanVienDto): Promise<PaginatedResult<any>>;
    layTheoId(id: number): Promise<{
        phongBan: {
            id: number;
            maPhongBan: string;
            tenPhongBan: string;
            moTa: string | null;
            trangThai: boolean;
            gioVaoChuan: string;
            gioRaChuan: string;
            phutChoPhepTre: number;
            ngayTao: Date;
            ngayCapNhat: Date;
        };
        chiTietBangLuongs: ({
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
            bangLuong: {
                id: number;
                trangThai: import(".prisma/client").$Enums.TrangThaiBangLuong;
                ngayTao: Date;
                ngayCapNhat: Date;
                phongBanId: number;
                nam: number;
                ghiChu: string | null;
                thang: number;
                tenBangLuong: string | null;
                ngayChot: Date | null;
                nguoiChot: string | null;
            };
        } & {
            id: number;
            ngayTao: Date;
            ngayCapNhat: Date;
            nhanVienId: number;
            khoanLuongId: number;
            soTien: import("@prisma/client/runtime/library").Decimal;
            ghiChu: string | null;
            bangLuongId: number;
            nguon: import(".prisma/client").$Enums.NguonChiTiet;
        })[];
    } & {
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
        ngayNghiViec: Date | null;
        gioiTinh: import(".prisma/client").$Enums.GioiTinh | null;
        ngaySinh: Date | null;
        diaChi: string | null;
        taoBoi: number | null;
        capNhatBoi: number | null;
    }>;
    layTheoMa(maNhanVien: string): Promise<{
        phongBan: {
            id: number;
            maPhongBan: string;
            tenPhongBan: string;
            moTa: string | null;
            trangThai: boolean;
            gioVaoChuan: string;
            gioRaChuan: string;
            phutChoPhepTre: number;
            ngayTao: Date;
            ngayCapNhat: Date;
        };
    } & {
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
        ngayNghiViec: Date | null;
        gioiTinh: import(".prisma/client").$Enums.GioiTinh | null;
        ngaySinh: Date | null;
        diaChi: string | null;
        taoBoi: number | null;
        capNhatBoi: number | null;
    }>;
    taoMoi(dto: TaoNhanVienDto): Promise<{
        phongBan: {
            id: number;
            maPhongBan: string;
            tenPhongBan: string;
            moTa: string | null;
            trangThai: boolean;
            gioVaoChuan: string;
            gioRaChuan: string;
            phutChoPhepTre: number;
            ngayTao: Date;
            ngayCapNhat: Date;
        };
    } & {
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
        ngayNghiViec: Date | null;
        gioiTinh: import(".prisma/client").$Enums.GioiTinh | null;
        ngaySinh: Date | null;
        diaChi: string | null;
        taoBoi: number | null;
        capNhatBoi: number | null;
    }>;
    capNhat(id: number, dto: CapNhatNhanVienDto): Promise<{
        phongBan: {
            id: number;
            maPhongBan: string;
            tenPhongBan: string;
            moTa: string | null;
            trangThai: boolean;
            gioVaoChuan: string;
            gioRaChuan: string;
            phutChoPhepTre: number;
            ngayTao: Date;
            ngayCapNhat: Date;
        };
    } & {
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
        ngayNghiViec: Date | null;
        gioiTinh: import(".prisma/client").$Enums.GioiTinh | null;
        ngaySinh: Date | null;
        diaChi: string | null;
        taoBoi: number | null;
        capNhatBoi: number | null;
    }>;
    xoa(id: number): Promise<{
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
        ngayNghiViec: Date | null;
        gioiTinh: import(".prisma/client").$Enums.GioiTinh | null;
        ngaySinh: Date | null;
        diaChi: string | null;
        taoBoi: number | null;
        capNhatBoi: number | null;
    }>;
    demTheoPhongBan(): Promise<(import(".prisma/client").Prisma.PickEnumerable<import(".prisma/client").Prisma.NhanVienGroupByOutputType, "phongBanId"[]> & {
        _count: {
            id: number;
        };
    })[]>;
}
