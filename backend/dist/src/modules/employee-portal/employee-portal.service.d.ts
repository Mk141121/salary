import { PrismaService } from '../../prisma/prisma.service';
import { LichLamViecQueryDto, ChamCongQueryDto, PhieuLuongQueryDto, DashboardResponse, LichLamViecItem, ChamCongItem, PhieuLuongItem, SoDuPhepResponse } from './employee-portal.dto';
export declare class EmployeePortalService {
    private prisma;
    constructor(prisma: PrismaService);
    private getNhanVienFromUser;
    getDashboard(userId: number): Promise<DashboardResponse>;
    getLichLamViec(userId: number, query: LichLamViecQueryDto): Promise<LichLamViecItem[]>;
    getChamCong(userId: number, query: ChamCongQueryDto): Promise<ChamCongItem[]>;
    getPhieuLuong(userId: number, query: PhieuLuongQueryDto): Promise<{
        data: PhieuLuongItem[];
        total: number;
    }>;
    getSoDuPhep(userId: number): Promise<SoDuPhepResponse>;
    getHoSo(userId: number): Promise<{
        id: number;
        maNhanVien: string;
        hoTen: string;
        email: string | null;
        soDienThoai: string | null;
        ngaySinh: string | null;
        gioiTinh: import(".prisma/client").$Enums.GioiTinh | null;
        diaChi: string | null;
        ngayVaoLam: string | null;
        chucVu: string | null;
        phongBan: {
            id: number;
            tenPhongBan: string;
        };
        nganHang: {
            id: number;
            tenNganHang: string;
        } | null;
        soTaiKhoan: string | null;
        trangThai: import(".prisma/client").$Enums.TrangThaiNhanVien;
    }>;
    checkIn(userId: number): Promise<{
        success: boolean;
        message: string;
        data: {
            gioVao: string;
            phutDiTre: number | null;
            chamCongId: number;
        };
    }>;
    checkOut(userId: number): Promise<{
        success: boolean;
        message: string;
        data: {
            gioVao: string;
            gioRa: string;
            soGioLam: number;
            phutVeSom: number | null;
            chamCongId: number;
        };
    }>;
    private getLoaiNgay;
}
