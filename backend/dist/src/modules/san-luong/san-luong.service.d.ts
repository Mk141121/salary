import { PrismaService } from '../../prisma/prisma.service';
import { ChiaHangRowDto, GiaoHangRowDto, PreviewChiaHangResponse, PreviewGiaoHangResponse, AdminSuaChiaHangDto, AdminSuaGiaoHangDto, QuerySanLuongDto, QueryLichSuImportDto } from './san-luong.dto';
export declare class SanLuongService {
    private prisma;
    constructor(prisma: PrismaService);
    laySanLuongNhanVien(nhanVienId: number, thang: number, nam: number): Promise<{
        data: {
            chiaHang: {
                tongSanPham: number;
                sanPhamLoi: number;
                soNgayLam: number;
            } | null;
            giaoHang: {
                tongKhoiLuong: number;
                soLuotGiao: number;
            } | null;
            diemKPI: number;
        };
    }>;
    previewChiaHang(rows: ChiaHangRowDto[], thang: number, nam: number): Promise<PreviewChiaHangResponse>;
    confirmChiaHang(rows: ChiaHangRowDto[], tenFile: string, fileHash: string | undefined, nguoiImportId: number): Promise<{
        success: boolean;
        importId: number;
        soDong: number;
    }>;
    layDanhSachChiaHang(query: QuerySanLuongDto): Promise<({
        lichSuImport: {
            id: number;
            tenFile: string;
            importLuc: Date;
        } | null;
    } & {
        id: number;
        taoBoi: number | null;
        capNhatBoi: number | null;
        nhanVienId: number;
        ghiChu: string | null;
        ngay: Date;
        nguonDuLieu: import(".prisma/client").$Enums.NguonDuLieu;
        taoLuc: Date;
        soLuongSpDat: number;
        soLuongSpLoi: number;
        importId: number | null;
        khoaSua: boolean;
        capNhatLuc: Date;
    })[]>;
    adminSuaChiaHang(id: number, dto: AdminSuaChiaHangDto, nguoiSuaId: number): Promise<{
        id: number;
        taoBoi: number | null;
        capNhatBoi: number | null;
        nhanVienId: number;
        ghiChu: string | null;
        ngay: Date;
        nguonDuLieu: import(".prisma/client").$Enums.NguonDuLieu;
        taoLuc: Date;
        soLuongSpDat: number;
        soLuongSpLoi: number;
        importId: number | null;
        khoaSua: boolean;
        capNhatLuc: Date;
    }>;
    previewGiaoHang(rows: GiaoHangRowDto[], thang: number, nam: number): Promise<PreviewGiaoHangResponse>;
    confirmGiaoHang(rows: GiaoHangRowDto[], tenFile: string, fileHash: string | undefined, nguoiImportId: number): Promise<{
        success: boolean;
        importId: number;
        soDong: number;
    }>;
    layDanhSachGiaoHang(query: QuerySanLuongDto): Promise<({
        lichSuImport: {
            id: number;
            tenFile: string;
            importLuc: Date;
        } | null;
    } & {
        id: number;
        taoBoi: number | null;
        capNhatBoi: number | null;
        nhanVienId: number;
        ghiChu: string | null;
        ngay: Date;
        nguonDuLieu: import(".prisma/client").$Enums.NguonDuLieu;
        taoLuc: Date;
        khoiLuongThanhCong: import("@prisma/client/runtime/library").Decimal;
        soLanTreGio: number;
        soLanKhongLayPhieu: number;
        importId: number | null;
        khoaSua: boolean;
        capNhatLuc: Date;
    })[]>;
    adminSuaGiaoHang(id: number, dto: AdminSuaGiaoHangDto, nguoiSuaId: number): Promise<{
        id: number;
        taoBoi: number | null;
        capNhatBoi: number | null;
        nhanVienId: number;
        ghiChu: string | null;
        ngay: Date;
        nguonDuLieu: import(".prisma/client").$Enums.NguonDuLieu;
        taoLuc: Date;
        khoiLuongThanhCong: import("@prisma/client/runtime/library").Decimal;
        soLanTreGio: number;
        soLanKhongLayPhieu: number;
        importId: number | null;
        khoaSua: boolean;
        capNhatLuc: Date;
    }>;
    layLichSuImport(query: QueryLichSuImportDto): Promise<({
        nguoiImport: {
            id: number;
            hoTen: string;
            tenDangNhap: string;
        };
    } & {
        id: number;
        trangThai: import(".prisma/client").$Enums.TrangThaiImport;
        tenFile: string;
        fileHash: string | null;
        loaiImport: import(".prisma/client").$Enums.LoaiImport;
        soDong: number;
        ngayDuLieu: Date;
        soDongHopLe: number;
        soDongLoi: number;
        importLuc: Date;
        noiDungLoiJson: string | null;
        nguoiImportId: number;
    })[]>;
    layLichSuImportTheoId(id: number): Promise<({
        nguoiImport: {
            id: number;
            hoTen: string;
            tenDangNhap: string;
        };
        sanLuongChiaHangs: {
            id: number;
            taoBoi: number | null;
            capNhatBoi: number | null;
            nhanVienId: number;
            ghiChu: string | null;
            ngay: Date;
            nguonDuLieu: import(".prisma/client").$Enums.NguonDuLieu;
            taoLuc: Date;
            soLuongSpDat: number;
            soLuongSpLoi: number;
            importId: number | null;
            khoaSua: boolean;
            capNhatLuc: Date;
        }[];
        giaoHangs: {
            id: number;
            taoBoi: number | null;
            capNhatBoi: number | null;
            nhanVienId: number;
            ghiChu: string | null;
            ngay: Date;
            nguonDuLieu: import(".prisma/client").$Enums.NguonDuLieu;
            taoLuc: Date;
            khoiLuongThanhCong: import("@prisma/client/runtime/library").Decimal;
            soLanTreGio: number;
            soLanKhongLayPhieu: number;
            importId: number | null;
            khoaSua: boolean;
            capNhatLuc: Date;
        }[];
    } & {
        id: number;
        trangThai: import(".prisma/client").$Enums.TrangThaiImport;
        tenFile: string;
        fileHash: string | null;
        loaiImport: import(".prisma/client").$Enums.LoaiImport;
        soDong: number;
        ngayDuLieu: Date;
        soDongHopLe: number;
        soDongLoi: number;
        importLuc: Date;
        noiDungLoiJson: string | null;
        nguoiImportId: number;
    }) | null>;
    taoSnapshotSanLuong(bangLuongId: number, thang: number, nam: number): Promise<{
        snapshotChiaHang: number;
        snapshotGiaoHang: number;
    }>;
    laySnapshotSanLuong(bangLuongId: number, nhanVienId: number): Promise<{
        TONG_SP_DAT: number;
        TONG_SP_LOI: number;
        TONG_KHOI_LUONG_THANH_CONG: number;
        TONG_SO_LAN_TRE_GIO: number;
        TONG_SO_LAN_KHONG_LAY_PHIEU: number;
    }>;
    private kiemTraKyLuongChotChua;
}
