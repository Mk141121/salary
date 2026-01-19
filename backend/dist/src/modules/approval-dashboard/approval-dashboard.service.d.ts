import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '@prisma/client';
interface PendingFilter {
    nguoiDuyetId: number;
    loai?: string;
    cap?: 1 | 2;
    phongBanId?: number;
    tuNgay?: string;
    denNgay?: string;
    page?: number;
    limit?: number;
}
export interface SummaryResult {
    tongSoDon: number;
    yeuCauCap1: number;
    yeuCauCap2: number;
    nghiPhep: number;
    quaHan: number;
    quaHan3Ngay: number;
    quaHan7Ngay: number;
}
export declare class ApprovalDashboardService {
    private prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    laySummary(nguoiDuyetId: number): Promise<SummaryResult>;
    layDanhSachChoDuyet(filter: PendingFilter): Promise<{
        data: any[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    layDanhSachQuaHan(nguoiDuyetId: number, soNgay?: number): Promise<{
        soNgayQuaHan: number;
        yeuCau: {
            soNgayCho: number;
            phongBan: {
                id: number;
                tenPhongBan: string;
            };
            nhanVien: {
                id: number;
                maNhanVien: string;
                hoTen: string;
            };
            loaiYeuCau: {
                maLoai: string;
                tenLoai: string;
            };
            id: number;
            trangThai: import(".prisma/client").$Enums.TrangThaiDonYeuCau;
            taoBoi: number | null;
            ngayTao: Date;
            ngayCapNhat: Date;
            phongBanId: number;
            nhanVienId: number;
            lyDo: string;
            lyDoTuChoi: string | null;
            maDon: string;
            tepDinhKemUrl: string | null;
            loaiYeuCauId: number;
            ngayYeuCau: Date;
            gioBatDau: string | null;
            gioKetThuc: string | null;
            diaDiem: string | null;
            lyDoOverride: string | null;
            nguoiDuyet1Id: number | null;
            nguoiDuyet2Id: number | null;
            soGio: Prisma.Decimal | null;
            ngayDuyet1: Date | null;
            ghiChuDuyet1: string | null;
            ngayDuyet2: Date | null;
            ghiChuDuyet2: string | null;
            isOverride: boolean;
            nguoiOverrideId: number | null;
        }[];
        nghiPhep: {
            soNgayCho: number;
            phongBan: {
                id: number;
                tenPhongBan: string;
            };
            nhanVien: {
                id: number;
                maNhanVien: string;
                hoTen: string;
            };
            id: number;
            trangThai: import(".prisma/client").$Enums.TrangThaiDonNghiPhep;
            taoBoi: number | null;
            ngayTao: Date;
            ngayCapNhat: Date;
            phongBanId: number;
            nhanVienId: number;
            tuNgay: Date;
            denNgay: Date;
            lyDo: string | null;
            ngayDuyet: Date | null;
            lyDoTuChoi: string | null;
            soNgayNghi: Prisma.Decimal;
            maDon: string;
            loaiNghiId: number;
            tepDinhKemUrl: string | null;
            nguoiDuyetId: number | null;
        }[];
        tongQuaHan: number;
    }>;
    duyetHangLoat(donYeuCauIds: number[], donNghiPhepIds: number[], nguoiDuyetId: number, ghiChu?: string): Promise<{
        tongDuyet: number;
        tongLoi: number;
        yeuCau: {
            success: number;
            failed: number;
            errors: string[];
        };
        nghiPhep: {
            success: number;
            failed: number;
            errors: string[];
        };
    }>;
    layThongKeDuyet(thang: number, nam: number): Promise<{
        thang: number;
        nam: number;
        yeuCau: {};
        nghiPhep: {};
        thoiGianDuyetTrungBinhGio: string | null;
    }>;
    layLichSuDuyet(nguoiDuyetId: number, page?: number, limit?: number): Promise<{
        data: ({
            id: number;
            loaiDon: string;
            tenLoai: string;
            nhanVien: string;
            ngayDuyet: Date | null;
            trangThai: import(".prisma/client").$Enums.TrangThaiDonYeuCau;
            cap: number;
        } | {
            id: number;
            loaiDon: string;
            tenLoai: string;
            nhanVien: string;
            ngayDuyet: Date | null;
            trangThai: import(".prisma/client").$Enums.TrangThaiDonNghiPhep;
            cap: number;
        })[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    private tinhSoNgayCho;
}
export {};
