import { PhongBanService } from './phong-ban.service';
import { TaoPhongBanDto, CapNhatPhongBanDto, DoiPhongBanChaDto, TaoDonViConDto, CapNhatDonViConDto, ChuyenPhongBanDto, TaoPhanQuyenPhongBanDto } from './dto/phong-ban.dto';
export declare class PhongBanController {
    private readonly phongBanService;
    constructor(phongBanService: PhongBanService);
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
    taoMoi(dto: TaoPhongBanDto): Promise<{
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
    capNhat(id: number, dto: CapNhatPhongBanDto): Promise<{
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
    doiPhongBanCha(id: number, dto: DoiPhongBanChaDto): Promise<{
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
    ngungHoatDong(id: number): Promise<{
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
    kichHoat(id: number): Promise<{
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
    layNhanVien(id: number): Promise<{
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
    layDonViCon(id: number): Promise<{
        id: number;
        trangThai: string;
        taoBoi: number | null;
        ngayTao: Date;
        phongBanId: number;
        maDonVi: string;
        tenDonVi: string;
        loaiDonVi: string;
    }[]>;
    taoDonViCon(id: number, dto: TaoDonViConDto): Promise<{
        id: number;
        trangThai: string;
        taoBoi: number | null;
        ngayTao: Date;
        phongBanId: number;
        maDonVi: string;
        tenDonVi: string;
        loaiDonVi: string;
    }>;
}
export declare class DonViConController {
    private readonly phongBanService;
    constructor(phongBanService: PhongBanService);
    capNhat(id: number, dto: CapNhatDonViConDto): Promise<{
        id: number;
        trangThai: string;
        taoBoi: number | null;
        ngayTao: Date;
        phongBanId: number;
        maDonVi: string;
        tenDonVi: string;
        loaiDonVi: string;
    }>;
    ngungHoatDong(id: number): Promise<{
        id: number;
        trangThai: string;
        taoBoi: number | null;
        ngayTao: Date;
        phongBanId: number;
        maDonVi: string;
        tenDonVi: string;
        loaiDonVi: string;
    }>;
}
export declare class NhanVienPhongBanController {
    private readonly phongBanService;
    constructor(phongBanService: PhongBanService);
    layLichSuPhongBan(id: number): Promise<({
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
    chuyenPhongBan(id: number, dto: ChuyenPhongBanDto): Promise<{
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
}
export declare class PhanQuyenPhongBanController {
    private readonly phongBanService;
    constructor(phongBanService: PhongBanService);
    layPhanQuyen(nguoiDungId?: string, phongBanId?: string): Promise<{
        id: number;
        taoBoi: number | null;
        ngayTao: Date;
        phongBanId: number;
        quyen: string;
        nguoiDungId: number;
    }[]>;
    taoPhanQuyen(dto: TaoPhanQuyenPhongBanDto): Promise<{
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
}
