import { PrismaService } from '../../prisma/prisma.service';
import { TaoNganHangDto, CapNhatNganHangDto } from './ngan-hang.dto';
export declare class NganHangService {
    private prisma;
    constructor(prisma: PrismaService);
    layDanhSachNganHang(nhanVienId: number): Promise<{
        id: number;
        ngayTao: Date;
        nhanVienId: number;
        tuNgay: Date | null;
        denNgay: Date | null;
        ghiChu: string | null;
        tenNganHang: string;
        soTaiKhoan: string;
        chuTaiKhoan: string;
        chiNhanh: string | null;
        laMacDinh: boolean;
    }[]>;
    layNganHangMacDinh(nhanVienId: number): Promise<{
        id: number;
        ngayTao: Date;
        nhanVienId: number;
        tuNgay: Date | null;
        denNgay: Date | null;
        ghiChu: string | null;
        tenNganHang: string;
        soTaiKhoan: string;
        chuTaiKhoan: string;
        chiNhanh: string | null;
        laMacDinh: boolean;
    } | null>;
    layNganHangHieuLuc(nhanVienId: number, ngay: Date): Promise<{
        id: number;
        ngayTao: Date;
        nhanVienId: number;
        tuNgay: Date | null;
        denNgay: Date | null;
        ghiChu: string | null;
        tenNganHang: string;
        soTaiKhoan: string;
        chuTaiKhoan: string;
        chiNhanh: string | null;
        laMacDinh: boolean;
    } | null>;
    taoNganHang(nhanVienId: number, dto: TaoNganHangDto): Promise<{
        id: number;
        ngayTao: Date;
        nhanVienId: number;
        tuNgay: Date | null;
        denNgay: Date | null;
        ghiChu: string | null;
        tenNganHang: string;
        soTaiKhoan: string;
        chuTaiKhoan: string;
        chiNhanh: string | null;
        laMacDinh: boolean;
    }>;
    capNhatNganHang(id: number, dto: CapNhatNganHangDto): Promise<{
        id: number;
        ngayTao: Date;
        nhanVienId: number;
        tuNgay: Date | null;
        denNgay: Date | null;
        ghiChu: string | null;
        tenNganHang: string;
        soTaiKhoan: string;
        chuTaiKhoan: string;
        chiNhanh: string | null;
        laMacDinh: boolean;
    }>;
    datMacDinh(id: number): Promise<{
        id: number;
        ngayTao: Date;
        nhanVienId: number;
        tuNgay: Date | null;
        denNgay: Date | null;
        ghiChu: string | null;
        tenNganHang: string;
        soTaiKhoan: string;
        chuTaiKhoan: string;
        chiNhanh: string | null;
        laMacDinh: boolean;
    }>;
    xoaNganHang(id: number): Promise<{
        id: number;
        ngayTao: Date;
        nhanVienId: number;
        tuNgay: Date | null;
        denNgay: Date | null;
        ghiChu: string | null;
        tenNganHang: string;
        soTaiKhoan: string;
        chuTaiKhoan: string;
        chiNhanh: string | null;
        laMacDinh: boolean;
    }>;
    maskSoTaiKhoan(soTaiKhoan: string): string;
}
