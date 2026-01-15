import { PrismaService } from '../../prisma/prisma.service';
import { LoaiSuKien } from '@prisma/client';
import { TaoSuKienDto, CapNhatSuKienDto, DuyetSuKienDto, DuyetNhieuSuKienDto, LocSuKienDto, TaoDanhMucSuKienDto } from './dto/su-kien.dto';
export declare class SuKienThuongPhatService {
    private prisma;
    constructor(prisma: PrismaService);
    layDanhSach(filter: LocSuKienDto): Promise<({
        phongBan: {
            id: number;
            maPhongBan: string;
            tenPhongBan: string;
        };
        nhanVien: {
            id: number;
            maNhanVien: string;
            hoTen: string;
        };
    } & {
        id: number;
        trangThai: import(".prisma/client").$Enums.TrangThaiSuKien;
        ngayTao: Date;
        ngayCapNhat: Date;
        phongBanId: number;
        nhanVienId: number;
        soTien: import("@prisma/client/runtime/library").Decimal;
        ghiChu: string | null;
        nguoiTao: string | null;
        ngay: Date;
        giaTri: import("@prisma/client/runtime/library").Decimal;
        maSuKien: string;
        loaiSuKien: import(".prisma/client").$Enums.LoaiSuKien;
        duyetBoi: string | null;
        duyetLuc: Date | null;
    })[]>;
    layChiTiet(id: number): Promise<{
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
            ngayNghiViec: Date | null;
            gioiTinh: import(".prisma/client").$Enums.GioiTinh | null;
            ngaySinh: Date | null;
            diaChi: string | null;
            taoBoi: number | null;
            capNhatBoi: number | null;
        };
    } & {
        id: number;
        trangThai: import(".prisma/client").$Enums.TrangThaiSuKien;
        ngayTao: Date;
        ngayCapNhat: Date;
        phongBanId: number;
        nhanVienId: number;
        soTien: import("@prisma/client/runtime/library").Decimal;
        ghiChu: string | null;
        nguoiTao: string | null;
        ngay: Date;
        giaTri: import("@prisma/client/runtime/library").Decimal;
        maSuKien: string;
        loaiSuKien: import(".prisma/client").$Enums.LoaiSuKien;
        duyetBoi: string | null;
        duyetLuc: Date | null;
    }>;
    tao(dto: TaoSuKienDto): Promise<{
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
            ngayNghiViec: Date | null;
            gioiTinh: import(".prisma/client").$Enums.GioiTinh | null;
            ngaySinh: Date | null;
            diaChi: string | null;
            taoBoi: number | null;
            capNhatBoi: number | null;
        };
    } & {
        id: number;
        trangThai: import(".prisma/client").$Enums.TrangThaiSuKien;
        ngayTao: Date;
        ngayCapNhat: Date;
        phongBanId: number;
        nhanVienId: number;
        soTien: import("@prisma/client/runtime/library").Decimal;
        ghiChu: string | null;
        nguoiTao: string | null;
        ngay: Date;
        giaTri: import("@prisma/client/runtime/library").Decimal;
        maSuKien: string;
        loaiSuKien: import(".prisma/client").$Enums.LoaiSuKien;
        duyetBoi: string | null;
        duyetLuc: Date | null;
    }>;
    taoNhieu(dtos: TaoSuKienDto[]): Promise<{
        thanhCong: number;
        thatBai: number;
        loi: string[];
    }>;
    capNhat(id: number, dto: CapNhatSuKienDto): Promise<{
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
            ngayNghiViec: Date | null;
            gioiTinh: import(".prisma/client").$Enums.GioiTinh | null;
            ngaySinh: Date | null;
            diaChi: string | null;
            taoBoi: number | null;
            capNhatBoi: number | null;
        };
    } & {
        id: number;
        trangThai: import(".prisma/client").$Enums.TrangThaiSuKien;
        ngayTao: Date;
        ngayCapNhat: Date;
        phongBanId: number;
        nhanVienId: number;
        soTien: import("@prisma/client/runtime/library").Decimal;
        ghiChu: string | null;
        nguoiTao: string | null;
        ngay: Date;
        giaTri: import("@prisma/client/runtime/library").Decimal;
        maSuKien: string;
        loaiSuKien: import(".prisma/client").$Enums.LoaiSuKien;
        duyetBoi: string | null;
        duyetLuc: Date | null;
    }>;
    duyet(id: number, dto: DuyetSuKienDto): Promise<{
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
            ngayNghiViec: Date | null;
            gioiTinh: import(".prisma/client").$Enums.GioiTinh | null;
            ngaySinh: Date | null;
            diaChi: string | null;
            taoBoi: number | null;
            capNhatBoi: number | null;
        };
    } & {
        id: number;
        trangThai: import(".prisma/client").$Enums.TrangThaiSuKien;
        ngayTao: Date;
        ngayCapNhat: Date;
        phongBanId: number;
        nhanVienId: number;
        soTien: import("@prisma/client/runtime/library").Decimal;
        ghiChu: string | null;
        nguoiTao: string | null;
        ngay: Date;
        giaTri: import("@prisma/client/runtime/library").Decimal;
        maSuKien: string;
        loaiSuKien: import(".prisma/client").$Enums.LoaiSuKien;
        duyetBoi: string | null;
        duyetLuc: Date | null;
    }>;
    duyetNhieu(dto: DuyetNhieuSuKienDto): Promise<import(".prisma/client").Prisma.BatchPayload>;
    tuChoi(id: number, lyDo: string, nguoiTuChoi: string): Promise<{
        id: number;
        trangThai: import(".prisma/client").$Enums.TrangThaiSuKien;
        ngayTao: Date;
        ngayCapNhat: Date;
        phongBanId: number;
        nhanVienId: number;
        soTien: import("@prisma/client/runtime/library").Decimal;
        ghiChu: string | null;
        nguoiTao: string | null;
        ngay: Date;
        giaTri: import("@prisma/client/runtime/library").Decimal;
        maSuKien: string;
        loaiSuKien: import(".prisma/client").$Enums.LoaiSuKien;
        duyetBoi: string | null;
        duyetLuc: Date | null;
    }>;
    huy(id: number): Promise<{
        id: number;
        trangThai: import(".prisma/client").$Enums.TrangThaiSuKien;
        ngayTao: Date;
        ngayCapNhat: Date;
        phongBanId: number;
        nhanVienId: number;
        soTien: import("@prisma/client/runtime/library").Decimal;
        ghiChu: string | null;
        nguoiTao: string | null;
        ngay: Date;
        giaTri: import("@prisma/client/runtime/library").Decimal;
        maSuKien: string;
        loaiSuKien: import(".prisma/client").$Enums.LoaiSuKien;
        duyetBoi: string | null;
        duyetLuc: Date | null;
    }>;
    thongKeTheoNhanVien(nhanVienId: number, thang: number, nam: number): Promise<{
        chiTiet: (import(".prisma/client").Prisma.PickEnumerable<import(".prisma/client").Prisma.SuKienThuongPhatGroupByOutputType, ("maSuKien" | "loaiSuKien")[]> & {
            _count: number;
            _sum: {
                giaTri: import("@prisma/client/runtime/library").Decimal | null;
                soTien: import("@prisma/client/runtime/library").Decimal | null;
            };
        })[];
        tongThuong: number;
        tongPhat: number;
        chenh: number;
    }>;
    laySuKienChoRuleEngine(nhanVienId: number, phongBanId: number, thang: number, nam: number): Promise<Record<string, {
        soLan: number;
        tongGiaTri: number;
        tongTien: number;
    }>>;
    layDanhMuc(loai?: LoaiSuKien): Promise<{
        id: number;
        moTa: string | null;
        trangThai: boolean;
        ngayTao: Date;
        ngayCapNhat: Date;
        loai: import(".prisma/client").$Enums.LoaiSuKien;
        maSuKien: string;
        tenSuKien: string;
        soTienMacDinh: import("@prisma/client/runtime/library").Decimal | null;
    }[]>;
    taoDanhMuc(dto: TaoDanhMucSuKienDto): Promise<{
        id: number;
        moTa: string | null;
        trangThai: boolean;
        ngayTao: Date;
        ngayCapNhat: Date;
        loai: import(".prisma/client").$Enums.LoaiSuKien;
        maSuKien: string;
        tenSuKien: string;
        soTienMacDinh: import("@prisma/client/runtime/library").Decimal | null;
    }>;
    khoiTaoDanhMucMau(): Promise<{
        message: string;
    }>;
}
