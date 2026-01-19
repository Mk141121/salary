import { ApprovalDashboardService } from './approval-dashboard.service';
import { AutoEscalationService } from './auto-escalation.service';
export declare class ApprovalDashboardController {
    private readonly approvalService;
    private readonly escalationService;
    constructor(approvalService: ApprovalDashboardService, escalationService: AutoEscalationService);
    laySummary(req: any): Promise<import("./approval-dashboard.service").SummaryResult>;
    layDanhSachChoDuyet(loai?: string, cap?: string, phongBanId?: string, tuNgay?: string, denNgay?: string, page?: string, limit?: string, req?: any): Promise<{
        data: any[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    layDanhSachQuaHan(soNgay?: string, req?: any): Promise<{
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
            soGio: import("@prisma/client/runtime/library").Decimal | null;
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
            soNgayNghi: import("@prisma/client/runtime/library").Decimal;
            maDon: string;
            loaiNghiId: number;
            tepDinhKemUrl: string | null;
            nguoiDuyetId: number | null;
        }[];
        tongQuaHan: number;
    }>;
    duyetHangLoat(dto: {
        donYeuCauIds?: number[];
        donNghiPhepIds?: number[];
        ghiChu?: string;
    }, req: any): Promise<{
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
    layThongKe(thang?: string, nam?: string): Promise<{
        thang: number;
        nam: number;
        yeuCau: {};
        nghiPhep: {};
        thoiGianDuyetTrungBinhGio: string | null;
    }>;
    layLichSuDuyetCuaToi(page?: string, limit?: string, req?: any): Promise<{
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
    runJob(job: 'remind' | 'escalate' | 'auto-approve' | 'report'): Promise<{
        message: string;
    }>;
}
