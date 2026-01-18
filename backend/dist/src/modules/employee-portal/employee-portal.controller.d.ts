import { EmployeePortalService } from './employee-portal.service';
import { LichLamViecQueryDto, ChamCongQueryDto, PhieuLuongQueryDto } from './employee-portal.dto';
export declare class EmployeePortalController {
    private readonly service;
    constructor(service: EmployeePortalService);
    getDashboard(req: any): Promise<import("./employee-portal.dto").DashboardResponse>;
    getLichLamViec(req: any, query: LichLamViecQueryDto): Promise<import("./employee-portal.dto").LichLamViecItem[]>;
    getChamCong(req: any, query: ChamCongQueryDto): Promise<import("./employee-portal.dto").ChamCongItem[]>;
    getPhieuLuong(req: any, query: PhieuLuongQueryDto): Promise<{
        data: import("./employee-portal.dto").PhieuLuongItem[];
        total: number;
    }>;
    getSoDuPhep(req: any): Promise<import("./employee-portal.dto").SoDuPhepResponse>;
    getHoSo(req: any): Promise<{
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
    checkIn(req: any): Promise<{
        success: boolean;
        message: string;
        data: {
            gioVao: string;
            phutDiTre: number | null;
            chamCongId: number;
        };
    }>;
    checkOut(req: any): Promise<{
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
}
