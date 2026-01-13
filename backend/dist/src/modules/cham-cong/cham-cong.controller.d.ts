import { ChamCongService } from './cham-cong.service';
import { LuuChamCongDto, LuuChiTietChamCongDto, KhoiTaoChamCongDto, ImportChamCongDto, CapNhatCauHinhPhatDto } from './dto/cham-cong.dto';
export declare class ChamCongController {
    private readonly chamCongService;
    constructor(chamCongService: ChamCongService);
    layNgayCongLyThuyet(thang: number, nam: number): Promise<{
        thang: number;
        nam: number;
        soNgayTrongThang: number;
        soNgayChuNhat: number;
        soNgayThuBay: number;
        soNgayThuong: number;
        ngayCongLyThuyet: number;
        moTa: string;
    }>;
    layCauHinhPhat(nam: number): Promise<{
        id: number;
        moTa: string | null;
        gioVaoChuan: string;
        gioRaChuan: string;
        phutChoPhepTre: number;
        ngayTao: Date;
        ngayCapNhat: Date;
        nam: number;
        phatDiMuon1_3Lan: import("@prisma/client/runtime/library").Decimal;
        phatDiMuon4_6Lan: import("@prisma/client/runtime/library").Decimal;
        phatDiMuonTren6Lan: import("@prisma/client/runtime/library").Decimal;
        phatVeSom1_3Lan: import("@prisma/client/runtime/library").Decimal;
        phatVeSom4_6Lan: import("@prisma/client/runtime/library").Decimal;
        phatVeSomTren6Lan: import("@prisma/client/runtime/library").Decimal;
        phatNghiKhongPhep: import("@prisma/client/runtime/library").Decimal;
        truLuongNghiKhongPhep: boolean;
    }>;
    capNhatCauHinhPhat(nam: number, dto: CapNhatCauHinhPhatDto): Promise<{
        id: number;
        moTa: string | null;
        gioVaoChuan: string;
        gioRaChuan: string;
        phutChoPhepTre: number;
        ngayTao: Date;
        ngayCapNhat: Date;
        nam: number;
        phatDiMuon1_3Lan: import("@prisma/client/runtime/library").Decimal;
        phatDiMuon4_6Lan: import("@prisma/client/runtime/library").Decimal;
        phatDiMuonTren6Lan: import("@prisma/client/runtime/library").Decimal;
        phatVeSom1_3Lan: import("@prisma/client/runtime/library").Decimal;
        phatVeSom4_6Lan: import("@prisma/client/runtime/library").Decimal;
        phatVeSomTren6Lan: import("@prisma/client/runtime/library").Decimal;
        phatNghiKhongPhep: import("@prisma/client/runtime/library").Decimal;
        truLuongNghiKhongPhep: boolean;
    }>;
    tinhTienPhat(nhanVienId: number, thang: number, nam: number): Promise<{
        tienPhatDiMuon: number;
        tienPhatVeSom: number;
        tienPhatNghiKhongPhep: number;
        truLuongNgayCong: number;
        tongPhat: number;
        soLanDiMuon?: undefined;
        soLanVeSom?: undefined;
        soNgayNghiKhongLuong?: undefined;
    } | {
        soLanDiMuon: number;
        soLanVeSom: number;
        soNgayNghiKhongLuong: number;
        tienPhatDiMuon: number;
        tienPhatVeSom: number;
        tienPhatNghiKhongPhep: number;
        truLuongNgayCong: number;
        tongPhat: number;
    }>;
    layDanhSachChamCong(thang: number, nam: number, phongBanId?: string): Promise<({
        nhanVien: {
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
        };
    } & {
        id: number;
        ngayTao: Date;
        ngayCapNhat: Date;
        nam: number;
        nhanVienId: number;
        ghiChu: string | null;
        thang: number;
        soCongChuan: import("@prisma/client/runtime/library").Decimal;
        soCongThucTe: import("@prisma/client/runtime/library").Decimal;
        soNgayNghiPhep: import("@prisma/client/runtime/library").Decimal;
        soNgayNghiKhongLuong: import("@prisma/client/runtime/library").Decimal;
        soGioOT: import("@prisma/client/runtime/library").Decimal;
        soGioOTDem: import("@prisma/client/runtime/library").Decimal;
        soGioOTChuNhat: import("@prisma/client/runtime/library").Decimal;
        soGioOTLe: import("@prisma/client/runtime/library").Decimal;
        soLanDiMuon: number;
        soLanVeSom: number;
    })[]>;
    layChamCongNhanVien(nhanVienId: number, thang: number, nam: number): Promise<({
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
        nam: number;
        nhanVienId: number;
        ghiChu: string | null;
        thang: number;
        soCongChuan: import("@prisma/client/runtime/library").Decimal;
        soCongThucTe: import("@prisma/client/runtime/library").Decimal;
        soNgayNghiPhep: import("@prisma/client/runtime/library").Decimal;
        soNgayNghiKhongLuong: import("@prisma/client/runtime/library").Decimal;
        soGioOT: import("@prisma/client/runtime/library").Decimal;
        soGioOTDem: import("@prisma/client/runtime/library").Decimal;
        soGioOTChuNhat: import("@prisma/client/runtime/library").Decimal;
        soGioOTLe: import("@prisma/client/runtime/library").Decimal;
        soLanDiMuon: number;
        soLanVeSom: number;
    }) | null>;
    luuChamCong(dto: LuuChamCongDto): Promise<{
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
        nam: number;
        nhanVienId: number;
        ghiChu: string | null;
        thang: number;
        soCongChuan: import("@prisma/client/runtime/library").Decimal;
        soCongThucTe: import("@prisma/client/runtime/library").Decimal;
        soNgayNghiPhep: import("@prisma/client/runtime/library").Decimal;
        soNgayNghiKhongLuong: import("@prisma/client/runtime/library").Decimal;
        soGioOT: import("@prisma/client/runtime/library").Decimal;
        soGioOTDem: import("@prisma/client/runtime/library").Decimal;
        soGioOTChuNhat: import("@prisma/client/runtime/library").Decimal;
        soGioOTLe: import("@prisma/client/runtime/library").Decimal;
        soLanDiMuon: number;
        soLanVeSom: number;
    }>;
    khoiTaoChamCongThang(dto: KhoiTaoChamCongDto): Promise<{
        created: number;
        skipped: number;
        message: string;
    }>;
    layChiTietChamCong(nhanVienId: number, thang: number, nam: number): Promise<{
        id: number;
        trangThai: import(".prisma/client").$Enums.TrangThaiChamCong;
        ngayTao: Date;
        nhanVienId: number;
        ghiChu: string | null;
        soGioOT: import("@prisma/client/runtime/library").Decimal;
        ngay: Date;
        gioVao: Date | null;
        gioRa: Date | null;
        loaiNgay: import(".prisma/client").$Enums.LoaiNgayCong;
        soGioLam: import("@prisma/client/runtime/library").Decimal;
    }[]>;
    luuChiTietChamCong(dto: LuuChiTietChamCongDto): Promise<{
        id: number;
        trangThai: import(".prisma/client").$Enums.TrangThaiChamCong;
        ngayTao: Date;
        nhanVienId: number;
        ghiChu: string | null;
        soGioOT: import("@prisma/client/runtime/library").Decimal;
        ngay: Date;
        gioVao: Date | null;
        gioRa: Date | null;
        loaiNgay: import(".prisma/client").$Enums.LoaiNgayCong;
        soGioLam: import("@prisma/client/runtime/library").Decimal;
    }>;
    tongHopChamCong(nhanVienId: number, thang: number, nam: number): Promise<{
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
        nam: number;
        nhanVienId: number;
        ghiChu: string | null;
        thang: number;
        soCongChuan: import("@prisma/client/runtime/library").Decimal;
        soCongThucTe: import("@prisma/client/runtime/library").Decimal;
        soNgayNghiPhep: import("@prisma/client/runtime/library").Decimal;
        soNgayNghiKhongLuong: import("@prisma/client/runtime/library").Decimal;
        soGioOT: import("@prisma/client/runtime/library").Decimal;
        soGioOTDem: import("@prisma/client/runtime/library").Decimal;
        soGioOTChuNhat: import("@prisma/client/runtime/library").Decimal;
        soGioOTLe: import("@prisma/client/runtime/library").Decimal;
        soLanDiMuon: number;
        soLanVeSom: number;
    }>;
    importChamCong(dto: ImportChamCongDto): Promise<{
        success: number;
        failed: number;
        errors: {
            maNhanVien: string;
            lyDo: string;
        }[];
    }>;
    dongBoChamCongCSV(dto: {
        csvContent: string;
    }): Promise<{
        tongBanGhi: number;
        tongNgay: number;
        chiTiet: {
            maNhanVien: string;
            ngay: string;
            gioVao: string | null;
            gioRa: string | null;
            diMuon: boolean;
            veSom: boolean;
            phutMuon: number;
            phutSom: number;
            soLanQuet: number;
        }[];
        thongKe: {
            maNhanVien: string;
            thang: number;
            nam: number;
            soCongThucTe: number;
            soLanDiMuon: number;
            soLanVeSom: number;
        }[];
        luuThanhCong: number;
        luuThatBai: number;
        loi: string[];
    }>;
}
