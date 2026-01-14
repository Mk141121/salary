import { BangLuongService } from './bang-luong.service';
import { TinhLuongService } from './tinh-luong.service';
import { PhieuLuongService } from './phieu-luong.service';
import { NgayCongService } from './ngay-cong.service';
import { TaoBangLuongDto, CapNhatBangLuongDto, CapNhatChiTietLuongDto, ChotBangLuongDto, CapNhatNhieuChiTietDto } from './dto/bang-luong.dto';
export declare class BangLuongController {
    private readonly bangLuongService;
    private readonly tinhLuongService;
    private readonly phieuLuongService;
    private readonly ngayCongService;
    constructor(bangLuongService: BangLuongService, tinhLuongService: TinhLuongService, phieuLuongService: PhieuLuongService, ngayCongService: NgayCongService);
    layDanhSach(thang?: number, nam?: number, phongBanId?: number): Promise<{
        data: {
            tongThuNhap: number;
            tongKhauTru: number;
            thucLinh: number;
            soNhanVien: number;
            phongBan: {
                id: number;
                maPhongBan: string;
                tenPhongBan: string;
            };
            _count: {
                chiTiets: number;
            };
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
        }[];
        meta: {
            tongSo: number;
            trang: number;
            soLuong: number;
            tongTrang: number;
            coTrangTruoc: boolean;
            coTrangSau: boolean;
        };
    }>;
    layTheoId(id: number): Promise<import("./tinh-luong.service").BangLuongChiTiet>;
    layTongLuong(id: number): Promise<{
        tongThuNhap: number;
        tongKhauTru: number;
        thucLinh: number;
        soNhanVien: number;
    }>;
    layTongLuongNhanVien(id: number, nhanVienId: number): Promise<{
        tongThuNhap: number;
        tongKhauTru: number;
        thucLinh: number;
    }>;
    layLichSu(id: number): Promise<({
        khoanLuong: {
            maKhoan: string;
            tenKhoan: string;
        } | null;
        nhanVien: {
            maNhanVien: string;
            hoTen: string;
        } | null;
    } & {
        id: number;
        nhanVienId: number | null;
        khoanLuongId: number | null;
        bangLuongId: number | null;
        lyDo: string | null;
        giaTriCu: import("@prisma/client/runtime/library").Decimal | null;
        giaTriMoi: import("@prisma/client/runtime/library").Decimal | null;
        loaiThayDoi: string;
        nguoiThayDoi: string;
        ngayThayDoi: Date;
    })[]>;
    taoMoi(dto: TaoBangLuongDto): Promise<{
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
    }>;
    capNhat(id: number, dto: CapNhatBangLuongDto): Promise<{
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
    }>;
    capNhatChiTiet(dto: CapNhatChiTietLuongDto): Promise<{
        chiTiet: {
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
        };
        tongLuong: {
            tongThuNhap: number;
            tongKhauTru: number;
            thucLinh: number;
        };
    }>;
    capNhatNhieuChiTiet(dto: CapNhatNhieuChiTietDto): Promise<{
        chiTiet: {
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
        };
        tongLuong: {
            tongThuNhap: number;
            tongKhauTru: number;
            thucLinh: number;
        };
    }[]>;
    chotBangLuong(id: number, dto: ChotBangLuongDto, nguoiDung: {
        id: number;
        tenDangNhap: string;
    }): Promise<{
        ghiChu: string | undefined;
        message: string;
        bangLuongId: number;
        soChiTiet: number;
        ngayChot: Date;
        nguoiChot: string;
    }>;
    moKhoa(id: number, lyDo: string, nguoiDung: {
        id: number;
        tenDangNhap: string;
    }): Promise<{
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
    }>;
    khoa(id: number, nguoiDung: {
        id: number;
        tenDangNhap: string;
    }): Promise<{
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
    }>;
    xoa(id: number): Promise<{
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
    }>;
    soSanhExcel(id: number, tongExcel: number): Promise<{
        khop: boolean;
        tongHeThong: number;
        tongExcel: number;
        chenhLech: number;
    }>;
    layPhieuLuong(id: number, nhanVienId: number): Promise<import("../email/email.service").PhieuLuongData>;
    layPhieuLuongHtml(id: number, nhanVienId: number): Promise<{
        html: string;
        data: import("../email/email.service").PhieuLuongData;
    }>;
    guiPhieuLuong(id: number, nhanVienId: number): Promise<{
        success: boolean;
        message: string;
    }>;
    guiTatCa(id: number): Promise<{
        success: number;
        failed: number;
        errors: string[];
    }>;
    layTatCaNgayCong(id: number): Promise<({
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
        soCongThucTe: import("@prisma/client/runtime/library").Decimal;
        soNgayNghiPhep: import("@prisma/client/runtime/library").Decimal;
        ngayCongLyThuyet: import("@prisma/client/runtime/library").Decimal;
        soNgayNghiKhongPhep: import("@prisma/client/runtime/library").Decimal;
        ngayCongDieuChinh: import("@prisma/client/runtime/library").Decimal | null;
    })[]>;
    layNgayCongNhanVien(id: number, nhanVienId: number): Promise<{
        id: number;
        ngayTao: Date;
        ngayCapNhat: Date;
        nhanVienId: number;
        ghiChu: string | null;
        bangLuongId: number;
        soCongThucTe: import("@prisma/client/runtime/library").Decimal;
        soNgayNghiPhep: import("@prisma/client/runtime/library").Decimal;
        ngayCongLyThuyet: import("@prisma/client/runtime/library").Decimal;
        soNgayNghiKhongPhep: import("@prisma/client/runtime/library").Decimal;
        ngayCongDieuChinh: import("@prisma/client/runtime/library").Decimal | null;
    } | null>;
    khoiTaoNgayCong(id: number): Promise<{
        bangLuongId: number;
        nhanVienId: number;
        ngayCongLyThuyet: import("@prisma/client/runtime/library").Decimal;
        soCongThucTe: import("@prisma/client/runtime/library").Decimal;
        soNgayNghiPhep: import("@prisma/client/runtime/library").Decimal;
        soNgayNghiKhongPhep: import("@prisma/client/runtime/library").Decimal;
        ngayCongDieuChinh: null;
        ghiChu: null;
    }[]>;
    tinhLaiLuong(id: number): Promise<{
        success: boolean;
        message: string;
        soNhanVien: number;
    }>;
    dieuChinhNgayCong(id: number, nhanVienId: number, body: {
        ngayCongMoi: number;
        ghiChu?: string;
    }): Promise<{
        id: number;
        ngayTao: Date;
        ngayCapNhat: Date;
        nhanVienId: number;
        ghiChu: string | null;
        bangLuongId: number;
        soCongThucTe: import("@prisma/client/runtime/library").Decimal;
        soNgayNghiPhep: import("@prisma/client/runtime/library").Decimal;
        ngayCongLyThuyet: import("@prisma/client/runtime/library").Decimal;
        soNgayNghiKhongPhep: import("@prisma/client/runtime/library").Decimal;
        ngayCongDieuChinh: import("@prisma/client/runtime/library").Decimal | null;
    }>;
    xoaDieuChinhNgayCong(id: number, nhanVienId: number): Promise<{
        id: number;
        ngayTao: Date;
        ngayCapNhat: Date;
        nhanVienId: number;
        ghiChu: string | null;
        bangLuongId: number;
        soCongThucTe: import("@prisma/client/runtime/library").Decimal;
        soNgayNghiPhep: import("@prisma/client/runtime/library").Decimal;
        ngayCongLyThuyet: import("@prisma/client/runtime/library").Decimal;
        soNgayNghiKhongPhep: import("@prisma/client/runtime/library").Decimal;
        ngayCongDieuChinh: import("@prisma/client/runtime/library").Decimal | null;
    }>;
}
