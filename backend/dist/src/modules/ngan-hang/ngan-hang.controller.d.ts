import { NganHangService } from './ngan-hang.service';
import { TaoNganHangDto, CapNhatNganHangDto } from './ngan-hang.dto';
export declare class NganHangController {
    private readonly nganHangService;
    constructor(nganHangService: NganHangService);
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
}
