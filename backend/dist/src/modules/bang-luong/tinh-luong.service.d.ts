import { PrismaService } from '../../prisma/prisma.service';
import { ChamCongService } from '../cham-cong/cham-cong.service';
export interface SanLuongNhanVien {
    chiaHang?: {
        tongSpDat: number;
        tongSpLoi: number;
    };
    giaoHang?: {
        tongKhoiLuongThanhCong: number;
        tongSoLanTreGio: number;
        tongSoLanKhongLayPhieu: number;
    };
}
export interface ChiTietLuongNhanVien {
    nhanVienId: number;
    maNhanVien: string;
    hoTen: string;
    chucVu: string | null;
    phongBan: string;
    ngayCongThucTe: number;
    sanLuong?: SanLuongNhanVien;
    cacKhoanLuong: {
        khoanLuongId: number;
        maKhoan: string;
        tenKhoan: string;
        loai: string;
        soTien: number;
    }[];
    tongThuNhap: number;
    tongKhauTru: number;
    thucLinh: number;
}
export interface BangLuongChiTiet {
    bangLuongId: number;
    thang: number;
    nam: number;
    ngayCongLyThuyet: number;
    phongBan: {
        id: number;
        maPhongBan: string;
        tenPhongBan: string;
    };
    trangThai: string;
    coSanLuong: boolean;
    loaiSanLuong?: 'CHIA_HANG' | 'GIAO_HANG' | 'CA_HAI';
    danhSachKhoanLuong: {
        id: number;
        maKhoan: string;
        tenKhoan: string;
        loai: string;
    }[];
    danhSachNhanVien: ChiTietLuongNhanVien[];
    tongCong: {
        tongThuNhap: number;
        tongKhauTru: number;
        thucLinh: number;
    };
}
export declare class TinhLuongService {
    private prisma;
    private chamCongService;
    constructor(prisma: PrismaService, chamCongService: ChamCongService);
    tinhTongLuongNhanVien(bangLuongId: number, nhanVienId: number): Promise<{
        tongThuNhap: number;
        tongKhauTru: number;
        thucLinh: number;
    }>;
    layBangLuongChiTiet(bangLuongId: number): Promise<BangLuongChiTiet>;
    tinhTongBangLuong(bangLuongId: number): Promise<{
        tongThuNhap: number;
        tongKhauTru: number;
        thucLinh: number;
        soNhanVien: number;
    }>;
    soSanhVoiExcel(bangLuongId: number, tongExcel: number): Promise<{
        khop: boolean;
        tongHeThong: number;
        tongExcel: number;
        chenhLech: number;
    }>;
}
