import { UngLuongService } from './ung-luong.service';
import { TaoBangUngLuongDto, CapNhatBangUngLuongDto, SinhDanhSachNVDto, CapNhatBulkChiTietDto, SetTheoTiLeDto, SetSoTienCoDinhDto, GhiNhanKhauTruDto, MoKhoaBangUngLuongDto, LocBangUngLuongDto } from './dto';
import { ThongTinNguoiDung } from '../../common/decorators';
export declare class UngLuongController {
    private readonly ungLuongService;
    constructor(ungLuongService: UngLuongService);
    layDanhSach(dto: LocBangUngLuongDto): Promise<{
        data: {
            phongBan: {
                id: number;
                maPhongBan: string;
                tenPhongBan: string;
            } | null;
            _count: {
                chiTiets: number;
            };
            id: number;
            trangThai: import(".prisma/client").$Enums.TrangThaiBangUngLuong;
            ngayTao: Date;
            ngayCapNhat: Date;
            phongBanId: number | null;
            tuNgay: Date;
            denNgay: Date;
            ghiChu: string | null;
            nguoiTao: string | null;
            ngayChot: Date | null;
            nguoiChot: string | null;
            thangNam: string;
            ngayChiTra: Date | null;
            cauHinhJson: string | null;
            maBangUngLuong: string;
            tongSoTienUng: import("@prisma/client/runtime/library").Decimal;
            soNhanVienUng: number;
            daGhiNhanKhauTru: boolean;
            refPhieuDCId: number | null;
            nguoiKhoa: string | null;
            ngayKhoa: Date | null;
        }[];
        meta: {
            tongSo: number;
            trang: number;
            soLuong: number;
            tongTrang: number;
        };
    }>;
    layTheoId(id: number): Promise<{
        chiTiets: {
            nhanVien: {
                id: number;
                maNhanVien: string;
                hoTen: string;
            } | null;
            phongBan: {
                id: number;
                tenPhongBan: string;
            } | null;
            nhomNhanVien: {
                id: number;
                tenNhom: string;
            } | null;
            id: number;
            ngayTao: Date;
            ngayCapNhat: Date;
            phongBanId: number;
            nhanVienId: number;
            ghiChu: string | null;
            soNgayNghiKhongPhep: import("@prisma/client/runtime/library").Decimal;
            soNgayCong: import("@prisma/client/runtime/library").Decimal;
            soNgayNghi: import("@prisma/client/runtime/library").Decimal;
            laTamTinh: boolean;
            tienCongLuyKe: import("@prisma/client/runtime/library").Decimal;
            duocPhepUng: boolean;
            lyDoKhongDat: string | null;
            mucToiDaDuocUng: import("@prisma/client/runtime/library").Decimal;
            nhomNhanVienId: number | null;
            soTienUngDeXuat: import("@prisma/client/runtime/library").Decimal;
            soTienUngDuyet: import("@prisma/client/runtime/library").Decimal;
            bangUngLuongId: number;
            lockedBySnapshot: boolean;
        }[];
        id: number;
        trangThai: import(".prisma/client").$Enums.TrangThaiBangUngLuong;
        ngayTao: Date;
        ngayCapNhat: Date;
        phongBanId: number | null;
        tuNgay: Date;
        denNgay: Date;
        ghiChu: string | null;
        nguoiTao: string | null;
        ngayChot: Date | null;
        nguoiChot: string | null;
        thangNam: string;
        ngayChiTra: Date | null;
        cauHinhJson: string | null;
        maBangUngLuong: string;
        tongSoTienUng: import("@prisma/client/runtime/library").Decimal;
        soNhanVienUng: number;
        daGhiNhanKhauTru: boolean;
        refPhieuDCId: number | null;
        nguoiKhoa: string | null;
        ngayKhoa: Date | null;
    }>;
    taoMoi(dto: TaoBangUngLuongDto, req: {
        user?: {
            tenDangNhap?: string;
        };
    }): Promise<{
        id: number;
        trangThai: import(".prisma/client").$Enums.TrangThaiBangUngLuong;
        ngayTao: Date;
        ngayCapNhat: Date;
        phongBanId: number | null;
        tuNgay: Date;
        denNgay: Date;
        ghiChu: string | null;
        nguoiTao: string | null;
        ngayChot: Date | null;
        nguoiChot: string | null;
        thangNam: string;
        ngayChiTra: Date | null;
        cauHinhJson: string | null;
        maBangUngLuong: string;
        tongSoTienUng: import("@prisma/client/runtime/library").Decimal;
        soNhanVienUng: number;
        daGhiNhanKhauTru: boolean;
        refPhieuDCId: number | null;
        nguoiKhoa: string | null;
        ngayKhoa: Date | null;
    }>;
    capNhat(id: number, dto: CapNhatBangUngLuongDto, req: {
        user?: {
            tenDangNhap?: string;
        };
    }): Promise<{
        id: number;
        trangThai: import(".prisma/client").$Enums.TrangThaiBangUngLuong;
        ngayTao: Date;
        ngayCapNhat: Date;
        phongBanId: number | null;
        tuNgay: Date;
        denNgay: Date;
        ghiChu: string | null;
        nguoiTao: string | null;
        ngayChot: Date | null;
        nguoiChot: string | null;
        thangNam: string;
        ngayChiTra: Date | null;
        cauHinhJson: string | null;
        maBangUngLuong: string;
        tongSoTienUng: import("@prisma/client/runtime/library").Decimal;
        soNhanVienUng: number;
        daGhiNhanKhauTru: boolean;
        refPhieuDCId: number | null;
        nguoiKhoa: string | null;
        ngayKhoa: Date | null;
    }>;
    xoa(id: number, force?: string, nguoiDung?: ThongTinNguoiDung): Promise<{
        message: string;
    }>;
    sinhDanhSachNV(id: number, dto: SinhDanhSachNVDto, req: {
        user?: {
            tenDangNhap?: string;
        };
    }): Promise<{
        message: string;
        soNhanVien: number;
        soDuocUng: number;
        soKhongDuocUng: number;
    }>;
    capNhatBulk(id: number, dto: CapNhatBulkChiTietDto, req: {
        user?: {
            tenDangNhap?: string;
        };
    }): Promise<{
        message: string;
        soCapNhat: number;
        errors: string[];
    }>;
    setTheoTiLe(id: number, dto: SetTheoTiLeDto, req: {
        user?: {
            tenDangNhap?: string;
        };
    }): Promise<{
        message: string;
        soNhanVien: number;
    }>;
    setSoTienCoDinh(id: number, dto: SetSoTienCoDinhDto, req: {
        user?: {
            tenDangNhap?: string;
        };
    }): Promise<{
        message: string;
        soNhanVien: number;
    }>;
    chotBang(id: number, req: {
        user?: {
            tenDangNhap?: string;
        };
    }): Promise<{
        message: string;
        id: number;
        ngayChot: Date;
        snapshotId: number;
    }>;
    khoaBang(id: number, req: {
        user?: {
            tenDangNhap?: string;
        };
    }): Promise<{
        message: string;
    }>;
    moKhoaBang(id: number, dto: MoKhoaBangUngLuongDto, req: {
        user?: {
            tenDangNhap?: string;
        };
    }): Promise<{
        message: string;
    }>;
    ghiNhanKhauTru(id: number, dto: GhiNhanKhauTruDto, req: {
        user?: {
            tenDangNhap?: string;
        };
    }): Promise<{
        message: string;
        phieuDCId: number | null;
        soPhieuDC?: undefined;
        phieuDCIds?: undefined;
    } | {
        message: string;
        soPhieuDC: number;
        phieuDCIds: number[];
        phieuDCId?: undefined;
    }>;
    laySnapshot(id: number): Promise<({
        chiTiets: {
            id: number;
            ngayTao: Date;
            phongBan: string;
            maNhanVien: string;
            hoTen: string;
            nhanVienId: number;
            ghiChu: string | null;
            nhomNhanVien: string | null;
            soNgayNghiKhongPhep: import("@prisma/client/runtime/library").Decimal;
            soNgayCong: import("@prisma/client/runtime/library").Decimal;
            soNgayNghi: import("@prisma/client/runtime/library").Decimal;
            tienCongLuyKe: import("@prisma/client/runtime/library").Decimal;
            inputDataJson: string | null;
            duocPhepUng: boolean;
            lyDoKhongDat: string | null;
            mucToiDaDuocUng: import("@prisma/client/runtime/library").Decimal;
            soTienUngDeXuat: import("@prisma/client/runtime/library").Decimal;
            soTienUngDuyet: import("@prisma/client/runtime/library").Decimal;
            snapshotId: number;
        }[];
    } & {
        id: number;
        ngayTao: Date;
        tuNgay: Date;
        denNgay: Date;
        ngayChot: Date;
        nguoiChot: string;
        thangNam: string;
        cauHinhJson: string | null;
        maBangUngLuong: string;
        tongSoTienUng: import("@prisma/client/runtime/library").Decimal;
        soNhanVienUng: number;
        bangUngLuongId: number;
    })[]>;
}
