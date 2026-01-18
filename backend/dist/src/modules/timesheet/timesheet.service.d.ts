import { PrismaService } from '../../prisma/prisma.service';
import { TimesheetQueryDto, TaoYeuCauSuaCongDto, DuyetYeuCauSuaCongDto, SuaCongTrucTiepDto, YeuCauSuaCongQueryDto, LichSuSuaCongQueryDto, TimesheetNhanVien, TimesheetNgay, YeuCauSuaCongResponse, LichSuSuaCongResponse, ThongKeTimesheet } from './timesheet.dto';
export declare class TimesheetService {
    private prisma;
    constructor(prisma: PrismaService);
    layBangCongThang(query: TimesheetQueryDto): Promise<{
        data: TimesheetNhanVien[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
        thongKe: ThongKeTimesheet;
    }>;
    layBangCongNhanVien(nhanVienId: number, thang: number, nam: number): Promise<TimesheetNhanVien | null>;
    taoYeuCauSuaCong(dto: TaoYeuCauSuaCongDto, nguoiTaoId: number): Promise<YeuCauSuaCongResponse>;
    duyetYeuCauSuaCong(id: number, dto: DuyetYeuCauSuaCongDto, nguoiDuyetId: number): Promise<YeuCauSuaCongResponse>;
    layDanhSachYeuCauSuaCong(query: YeuCauSuaCongQueryDto): Promise<{
        data: YeuCauSuaCongResponse[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    suaCongTrucTiep(dto: SuaCongTrucTiepDto, nguoiThucHienId: number): Promise<TimesheetNgay>;
    layLichSuSuaCong(query: LichSuSuaCongQueryDto): Promise<{
        data: LichSuSuaCongResponse[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    layThongKeTimesheet(thang: number, nam: number, phongBanId?: number): Promise<ThongKeTimesheet>;
    private applyYeuCauSuaCong;
    private xacDinhLoaiNgay;
    private mapYeuCauSuaCongResponse;
}
