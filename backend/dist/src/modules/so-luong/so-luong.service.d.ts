import { PrismaService } from '../../prisma/prisma.service';
import { LocSoLuongDto, TimKiemSoLuongDto } from './dto';
export interface BangLuongItem {
    bangLuongId: number;
    thangNam: string;
    thang: number;
    nam: number;
    luongCoBan: number;
    phuCapTong: number;
    thuongKPI: number;
    thuongThuNhap: number;
    khauTruTong: number;
    ungLuong: number;
    bhxh: number;
    bhyt: number;
    bhtn: number;
    thueTNCN: number;
    thucLanh: number;
    ngayCong: number;
    nghiCoPhep: number;
    nghiKhongPhep: number;
    chotNgay?: string;
}
export interface DieuChinhItem {
    phieuDieuChinhId: number;
    ngayTao: string;
    loaiPhieu: string;
    tenKhoanLuong: string;
    loaiKhoan: string;
    soTien: number;
    ghiChu?: string;
}
export interface UngLuongItem {
    bangUngLuongId: number;
    maBang: string;
    thangNam: string;
    soTienDuyet: number;
    trangThai: string;
    ngayChot?: string;
}
export interface KPIItem {
    kyDanhGiaId: number;
    thang: number;
    nam: number;
    tongDiem: number;
    xepLoai: string;
    tienThuong: number;
}
export interface ThuongPhatItem {
    suKienId: number;
    loai: 'THUONG' | 'PHAT';
    ten: string;
    soTien: number;
    ngay: string;
    lyDo?: string;
}
export interface TongKetNV {
    tongLuong: number;
    tongThuong: number;
    tongPhat: number;
    tongKhauTru: number;
    tongUng: number;
    tongThucNhan: number;
}
export interface TongHopPhongBan {
    tongThuNhap: number;
    tongKhauTru: number;
    tongThuong: number;
    tongPhat: number;
    thucLinh: number;
}
export declare class SoLuongService {
    private prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    laySoLuongNhanVien(nhanVienId: number, dto: LocSoLuongDto): Promise<{
        nhanVien: {
            id: number;
            maNhanVien: string;
            hoTen: string;
            phongBan: {
                tenPhongBan: string;
            } | undefined;
        };
        bangLuongs: BangLuongItem[];
        dieuChinhs: DieuChinhItem[];
        ungLuongs: UngLuongItem[];
        kpis: KPIItem[];
        thuongPhats: ThuongPhatItem[];
        tongKet: TongKetNV;
    }>;
    private layBangLuongs;
    private layDieuChinhs;
    private layUngLuongs;
    private layKPIs;
    private layThuongPhats;
    private tinhTongKetNV;
    private buildMonthRangeCondition;
    laySoLuongPhongBan(phongBanId: number, dto: LocSoLuongDto): Promise<{
        phongBan: {
            id: number;
            maPhongBan: string;
            tenPhongBan: string;
        };
        tongHop: TongHopPhongBan;
        theoNhanVien: {
            nhanVien: {
                id: number;
                maNhanVien: string;
                hoTen: string;
            };
            tongHop: TongHopPhongBan;
        }[];
    }>;
    laySoLuongTatCaPhongBan(dto: LocSoLuongDto): Promise<{
        tongHop: TongHopPhongBan;
        theoPhongBan: {
            phongBan: {
                id: number;
                maPhongBan: string;
                tenPhongBan: string;
            };
            tongHop: TongHopPhongBan;
            soNhanVien: number;
        }[];
    }>;
    timKiem(dto: TimKiemSoLuongDto): Promise<{
        data: {
            nhanVien: {
                id: number;
                maNhanVien: string;
                hoTen: string;
                phongBan: {
                    tenPhongBan: string;
                } | undefined;
            };
            tongKet: TongKetNV;
            soBangLuong: number;
        }[];
        meta: {
            tongSo: number;
            trang: number;
            soLuong: number;
            tongTrang: number;
        };
    }>;
    layChiTietEntry(refType: string, refId: number): Promise<({
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
        chiTiets: {
            id: number;
            ngayTao: Date;
            ngayCapNhat: Date;
            nhanVienId: number;
            khoanLuongId: number;
            soTien: import("@prisma/client/runtime/library").Decimal;
            ghiChu: string | null;
            bangLuongId: number;
            nguon: import(".prisma/client").$Enums.NguonChiTiet;
        }[];
        ngayCong: {
            id: number;
            ngayTao: Date;
            ngayCapNhat: Date;
            nhanVienId: number;
            ghiChu: string | null;
            bangLuongId: number;
            soCongThucTe: import("@prisma/client/runtime/library").Decimal;
            soNgayNghiPhep: import("@prisma/client/runtime/library").Decimal;
            soNgayNghiKhongLuong: import("@prisma/client/runtime/library").Decimal;
            ngayCongLyThuyet: import("@prisma/client/runtime/library").Decimal;
            soNgayNghiKhongPhep: import("@prisma/client/runtime/library").Decimal;
            soNgayNghiCoPhep: import("@prisma/client/runtime/library").Decimal;
            soNgayNghiCoLuong: import("@prisma/client/runtime/library").Decimal;
            ngayCongDieuChinh: import("@prisma/client/runtime/library").Decimal | null;
        }[];
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
    }) | ({
        chiTiets: {
            id: number;
            ngayTao: Date;
            khoanLuongId: number;
            ghiChu: string | null;
            chenhLech: import("@prisma/client/runtime/library").Decimal;
            soTienCu: import("@prisma/client/runtime/library").Decimal;
            soTienMoi: import("@prisma/client/runtime/library").Decimal;
            phieuDieuChinhId: number;
        }[];
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
    }) | ({
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
        bangUngLuong: {
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
        };
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
    }) | ({
        ketQuaKPIs: {
            id: number;
            ngayTao: Date;
            ghiChu: string | null;
            chiTieuId: number;
            ketQuaDat: import("@prisma/client/runtime/library").Decimal | null;
            tyLeDat: import("@prisma/client/runtime/library").Decimal | null;
            diemQuyDoi: import("@prisma/client/runtime/library").Decimal | null;
            danhGiaId: number;
        }[];
        kyDanhGia: {
            id: number;
            trangThai: import(".prisma/client").$Enums.TrangThaiKyDanhGia;
            ngayTao: Date;
            ngayCapNhat: Date;
            nam: number;
            tuNgay: Date;
            denNgay: Date;
            ghiChu: string | null;
            thang: number | null;
            maKy: string;
            tenKy: string;
            loaiKy: import(".prisma/client").$Enums.LoaiKyDanhGia;
            quy: number | null;
            hanNopKetQua: Date;
        };
    } & {
        id: number;
        trangThai: import(".prisma/client").$Enums.TrangThaiDanhGiaKPI;
        ngayTao: Date;
        ngayCapNhat: Date;
        nhanVienId: number;
        xepLoai: import(".prisma/client").$Enums.XepLoaiKPI | null;
        heSoThuong: import("@prisma/client/runtime/library").Decimal;
        templateId: number;
        nguoiDuyet: string | null;
        ngayDuyet: Date | null;
        kyDanhGiaId: number;
        nhanXetChung: string | null;
        nguoiDanhGia: string | null;
        diemTongKet: import("@prisma/client/runtime/library").Decimal | null;
        soTienThuong: import("@prisma/client/runtime/library").Decimal;
        ngayDanhGia: Date | null;
    }) | ({
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
        giaTri: import("@prisma/client/runtime/library").Decimal;
        ngay: Date;
        maSuKien: string;
        loaiSuKien: import(".prisma/client").$Enums.LoaiSuKien;
        duyetBoi: string | null;
        duyetLuc: Date | null;
    }) | null>;
}
