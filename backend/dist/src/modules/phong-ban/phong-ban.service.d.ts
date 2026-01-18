import { PrismaService } from '../../prisma/prisma.service';
import { TaoPhongBanDto, CapNhatPhongBanDto, DoiPhongBanChaDto, TaoDonViConDto, CapNhatDonViConDto, ChuyenPhongBanDto, TaoPhanQuyenPhongBanDto } from './dto/phong-ban.dto';
export declare class PhongBanService {
    private prisma;
    constructor(prisma: PrismaService);
    layTatCa(): Promise<({
        phongBanCha: {
            id: number;
            tenPhongBan: string;
        } | null;
        _count: {
            phongBanCons: number;
            nhanViens: number;
            donViCons: number;
        };
    } & {
        id: number;
        maPhongBan: string;
        tenPhongBan: string;
        moTa: string | null;
        trangThai: string;
        phongBanChaId: number | null;
        capDo: number;
        loaiPhongBan: string | null;
        nguoiQuanLyId: number | null;
        gioVaoChuan: string;
        gioRaChuan: string;
        phutChoPhepTre: number;
        taoBoi: number | null;
        capNhatBoi: number | null;
        ngayTao: Date;
        ngayCapNhat: Date;
    })[]>;
    layCayPhongBan(): Promise<any[]>;
    layTheoId(id: number): Promise<{
        phongBanCha: {
            id: number;
            maPhongBan: string;
            tenPhongBan: string;
        } | null;
        phongBanCons: {
            id: number;
            maPhongBan: string;
            tenPhongBan: string;
            capDo: number;
        }[];
        nhanViens: {
            id: number;
            maNhanVien: string;
            hoTen: string;
            chucVu: string | null;
        }[];
        donViCons: {
            id: number;
            trangThai: string;
            taoBoi: number | null;
            ngayTao: Date;
            phongBanId: number;
            maDonVi: string;
            tenDonVi: string;
            loaiDonVi: string;
        }[];
        _count: {
            nhanViens: number;
            bangLuongs: number;
            donViCons: number;
        };
    } & {
        id: number;
        maPhongBan: string;
        tenPhongBan: string;
        moTa: string | null;
        trangThai: string;
        phongBanChaId: number | null;
        capDo: number;
        loaiPhongBan: string | null;
        nguoiQuanLyId: number | null;
        gioVaoChuan: string;
        gioRaChuan: string;
        phutChoPhepTre: number;
        taoBoi: number | null;
        capNhatBoi: number | null;
        ngayTao: Date;
        ngayCapNhat: Date;
    }>;
    taoMoi(dto: TaoPhongBanDto, taoBoi?: number): Promise<{
        id: number;
        maPhongBan: string;
        tenPhongBan: string;
        moTa: string | null;
        trangThai: string;
        phongBanChaId: number | null;
        capDo: number;
        loaiPhongBan: string | null;
        nguoiQuanLyId: number | null;
        gioVaoChuan: string;
        gioRaChuan: string;
        phutChoPhepTre: number;
        taoBoi: number | null;
        capNhatBoi: number | null;
        ngayTao: Date;
        ngayCapNhat: Date;
    }>;
    capNhat(id: number, dto: CapNhatPhongBanDto, capNhatBoi?: number): Promise<{
        id: number;
        maPhongBan: string;
        tenPhongBan: string;
        moTa: string | null;
        trangThai: string;
        phongBanChaId: number | null;
        capDo: number;
        loaiPhongBan: string | null;
        nguoiQuanLyId: number | null;
        gioVaoChuan: string;
        gioRaChuan: string;
        phutChoPhepTre: number;
        taoBoi: number | null;
        capNhatBoi: number | null;
        ngayTao: Date;
        ngayCapNhat: Date;
    }>;
    doiPhongBanCha(id: number, dto: DoiPhongBanChaDto, capNhatBoi?: number): Promise<{
        id: number;
        maPhongBan: string;
        tenPhongBan: string;
        moTa: string | null;
        trangThai: string;
        phongBanChaId: number | null;
        capDo: number;
        loaiPhongBan: string | null;
        nguoiQuanLyId: number | null;
        gioVaoChuan: string;
        gioRaChuan: string;
        phutChoPhepTre: number;
        taoBoi: number | null;
        capNhatBoi: number | null;
        ngayTao: Date;
        ngayCapNhat: Date;
    }>;
    private kiemTraVongLap;
    private capNhatCapDoDeQuy;
    ngungHoatDong(id: number, capNhatBoi?: number): Promise<{
        id: number;
        maPhongBan: string;
        tenPhongBan: string;
        moTa: string | null;
        trangThai: string;
        phongBanChaId: number | null;
        capDo: number;
        loaiPhongBan: string | null;
        nguoiQuanLyId: number | null;
        gioVaoChuan: string;
        gioRaChuan: string;
        phutChoPhepTre: number;
        taoBoi: number | null;
        capNhatBoi: number | null;
        ngayTao: Date;
        ngayCapNhat: Date;
    }>;
    kichHoat(id: number, capNhatBoi?: number): Promise<{
        id: number;
        maPhongBan: string;
        tenPhongBan: string;
        moTa: string | null;
        trangThai: string;
        phongBanChaId: number | null;
        capDo: number;
        loaiPhongBan: string | null;
        nguoiQuanLyId: number | null;
        gioVaoChuan: string;
        gioRaChuan: string;
        phutChoPhepTre: number;
        taoBoi: number | null;
        capNhatBoi: number | null;
        ngayTao: Date;
        ngayCapNhat: Date;
    }>;
    xoa(id: number): Promise<{
        id: number;
        maPhongBan: string;
        tenPhongBan: string;
        moTa: string | null;
        trangThai: string;
        phongBanChaId: number | null;
        capDo: number;
        loaiPhongBan: string | null;
        nguoiQuanLyId: number | null;
        gioVaoChuan: string;
        gioRaChuan: string;
        phutChoPhepTre: number;
        taoBoi: number | null;
        capNhatBoi: number | null;
        ngayTao: Date;
        ngayCapNhat: Date;
    }>;
    layNhanVienTheoPhongBan(id: number): Promise<{
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
    }[]>;
    layDonViCon(phongBanId: number): Promise<{
        id: number;
        trangThai: string;
        taoBoi: number | null;
        ngayTao: Date;
        phongBanId: number;
        maDonVi: string;
        tenDonVi: string;
        loaiDonVi: string;
    }[]>;
    taoDonViCon(phongBanId: number, dto: TaoDonViConDto, taoBoi?: number): Promise<{
        id: number;
        trangThai: string;
        taoBoi: number | null;
        ngayTao: Date;
        phongBanId: number;
        maDonVi: string;
        tenDonVi: string;
        loaiDonVi: string;
    }>;
    capNhatDonViCon(donViConId: number, dto: CapNhatDonViConDto): Promise<{
        id: number;
        trangThai: string;
        taoBoi: number | null;
        ngayTao: Date;
        phongBanId: number;
        maDonVi: string;
        tenDonVi: string;
        loaiDonVi: string;
    }>;
    ngungDonViCon(donViConId: number): Promise<{
        id: number;
        trangThai: string;
        taoBoi: number | null;
        ngayTao: Date;
        phongBanId: number;
        maDonVi: string;
        tenDonVi: string;
        loaiDonVi: string;
    }>;
    layLichSuPhongBan(nhanVienId: number): Promise<({
        phongBan: {
            id: number;
            maPhongBan: string;
            tenPhongBan: string;
        };
        donViCon: {
            id: number;
            maDonVi: string;
            tenDonVi: string;
            loaiDonVi: string;
        } | null;
    } & {
        id: number;
        taoBoi: number | null;
        ngayTao: Date;
        phongBanId: number;
        nhanVienId: number;
        tuNgay: Date;
        denNgay: Date | null;
        ghiChu: string | null;
        donViConId: number | null;
    })[]>;
    layPhongBanHienTai(nhanVienId: number, ngay?: Date): Promise<({
        phongBan: {
            id: number;
            maPhongBan: string;
            tenPhongBan: string;
            moTa: string | null;
            trangThai: string;
            phongBanChaId: number | null;
            capDo: number;
            loaiPhongBan: string | null;
            nguoiQuanLyId: number | null;
            gioVaoChuan: string;
            gioRaChuan: string;
            phutChoPhepTre: number;
            taoBoi: number | null;
            capNhatBoi: number | null;
            ngayTao: Date;
            ngayCapNhat: Date;
        };
        donViCon: {
            id: number;
            trangThai: string;
            taoBoi: number | null;
            ngayTao: Date;
            phongBanId: number;
            maDonVi: string;
            tenDonVi: string;
            loaiDonVi: string;
        } | null;
    } & {
        id: number;
        taoBoi: number | null;
        ngayTao: Date;
        phongBanId: number;
        nhanVienId: number;
        tuNgay: Date;
        denNgay: Date | null;
        ghiChu: string | null;
        donViConId: number | null;
    }) | null>;
    chuyenPhongBan(nhanVienId: number, dto: ChuyenPhongBanDto, taoBoi?: number): Promise<{
        phongBan: {
            id: number;
            tenPhongBan: string;
        };
        donViCon: {
            id: number;
            tenDonVi: string;
        } | null;
    } & {
        id: number;
        taoBoi: number | null;
        ngayTao: Date;
        phongBanId: number;
        nhanVienId: number;
        tuNgay: Date;
        denNgay: Date | null;
        ghiChu: string | null;
        donViConId: number | null;
    }>;
    layPhanQuyenNguoiDung(nguoiDungId: number): Promise<({
        phongBan: {
            id: number;
            maPhongBan: string;
            tenPhongBan: string;
        };
    } & {
        id: number;
        taoBoi: number | null;
        ngayTao: Date;
        phongBanId: number;
        quyen: string;
        nguoiDungId: number;
    })[]>;
    layPhanQuyenPhongBan(phongBanId: number): Promise<{
        id: number;
        taoBoi: number | null;
        ngayTao: Date;
        phongBanId: number;
        quyen: string;
        nguoiDungId: number;
    }[]>;
    taoPhanQuyen(dto: TaoPhanQuyenPhongBanDto, taoBoi?: number): Promise<{
        id: number;
        taoBoi: number | null;
        ngayTao: Date;
        phongBanId: number;
        quyen: string;
        nguoiDungId: number;
    }>;
    xoaPhanQuyen(id: number): Promise<{
        id: number;
        taoBoi: number | null;
        ngayTao: Date;
        phongBanId: number;
        quyen: string;
        nguoiDungId: number;
    }>;
    kiemTraQuyen(nguoiDungId: number, phongBanId: number, quyen: string): Promise<boolean>;
}
