import { SanLuongService } from './san-luong.service';
import { ChiaHangRowDto, GiaoHangRowDto, ConfirmChiaHangDto, ConfirmGiaoHangDto, AdminSuaChiaHangDto, AdminSuaGiaoHangDto, QuerySanLuongDto, QueryLichSuImportDto } from './san-luong.dto';
export declare class SanLuongController {
    private readonly sanLuongService;
    constructor(sanLuongService: SanLuongService);
    laySanLuongCuaToi(thang: number, nam: number, req: any): Promise<{
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
    } | {
        data: null;
    }>;
    previewChiaHang(rows: ChiaHangRowDto[], thang: number, nam: number): Promise<import("./san-luong.dto").PreviewChiaHangResponse>;
    confirmChiaHang(dto: ConfirmChiaHangDto, req: any): Promise<{
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
    adminSuaChiaHang(id: number, dto: AdminSuaChiaHangDto, req: any): Promise<{
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
    previewGiaoHang(rows: GiaoHangRowDto[], thang: number, nam: number): Promise<import("./san-luong.dto").PreviewGiaoHangResponse>;
    confirmGiaoHang(dto: ConfirmGiaoHangDto, req: any): Promise<{
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
    adminSuaGiaoHang(id: number, dto: AdminSuaGiaoHangDto, req: any): Promise<{
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
    taoSnapshot(bangLuongId: number, thang: number, nam: number): Promise<{
        snapshotChiaHang: number;
        snapshotGiaoHang: number;
    }>;
    laySnapshot(bangLuongId: number, nhanVienId: number): Promise<{
        TONG_SP_DAT: number;
        TONG_SP_LOI: number;
        TONG_KHOI_LUONG_THANH_CONG: number;
        TONG_SO_LAN_TRE_GIO: number;
        TONG_SO_LAN_KHONG_LAY_PHIEU: number;
    }>;
}
