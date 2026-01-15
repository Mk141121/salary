import { PrismaService } from '../../prisma/prisma.service';
import { TinhLuongService } from './tinh-luong.service';
import { NgayCongService } from './ngay-cong.service';
import { PhuCapNhanVienService } from '../phu-cap-nhan-vien/phu-cap-nhan-vien.service';
import { BHXHThueService } from '../bhxh-thue/bhxh-thue.service';
import { SnapshotDieuChinhService } from '../snapshot-dieu-chinh/snapshot-dieu-chinh.service';
import { ChamCongService } from '../cham-cong/cham-cong.service';
import { AuditLogService } from '../../common/services/audit-log.service';
import { TaoBangLuongDto, CapNhatBangLuongDto, CapNhatChiTietLuongDto, ChotBangLuongDto } from './dto/bang-luong.dto';
export declare class BangLuongService {
    private prisma;
    private tinhLuongService;
    private ngayCongService;
    private phuCapNhanVienService;
    private bhxhThueService;
    private snapshotService;
    private chamCongService;
    private auditLogService;
    private readonly logger;
    constructor(prisma: PrismaService, tinhLuongService: TinhLuongService, ngayCongService: NgayCongService, phuCapNhanVienService: PhuCapNhanVienService, bhxhThueService: BHXHThueService, snapshotService: SnapshotDieuChinhService, chamCongService: ChamCongService, auditLogService: AuditLogService);
    private layLuongCoBanHieuLuc;
    private layLuongCoBanBatch;
    layDanhSach(thang?: number, nam?: number, phongBanId?: number, trang?: number, soLuong?: number): Promise<{
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
    private taoChiTietTuDong;
    private tinhGiaTriTheoRule;
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
                ngayNghiViec: Date | null;
                gioiTinh: import(".prisma/client").$Enums.GioiTinh | null;
                ngaySinh: Date | null;
                diaChi: string | null;
                taoBoi: number | null;
                capNhatBoi: number | null;
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
    capNhatNhieuChiTiet(danhSach: CapNhatChiTietLuongDto[]): Promise<{
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
                ngayNghiViec: Date | null;
                gioiTinh: import(".prisma/client").$Enums.GioiTinh | null;
                ngaySinh: Date | null;
                diaChi: string | null;
                taoBoi: number | null;
                capNhatBoi: number | null;
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
    chotBangLuong(id: number, dto: ChotBangLuongDto, nguoiDungId?: number): Promise<{
        ghiChu: string | undefined;
        message: string;
        bangLuongId: number;
        soChiTiet: number;
        ngayChot: Date;
        nguoiChot: string;
    }>;
    moKhoaBangLuong(id: number, lyDo: string, nguoiDungId?: number, tenDangNhap?: string): Promise<{
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
    khoaBangLuong(id: number, nguoiDungId?: number, tenDangNhap?: string): Promise<{
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
    layLichSuChinhSua(bangLuongId: number): Promise<({
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
    tinhLaiTatCaKhoanLuong(bangLuongId: number): Promise<{
        success: boolean;
        message: string;
        soNhanVien: number;
    }>;
}
