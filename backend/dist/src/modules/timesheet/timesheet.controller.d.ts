import { TimesheetService } from './timesheet.service';
import { TimesheetQueryDto, TaoYeuCauSuaCongDto, DuyetYeuCauSuaCongDto, SuaCongTrucTiepDto, YeuCauSuaCongQueryDto, LichSuSuaCongQueryDto } from './timesheet.dto';
import { ThongTinNguoiDung } from '../../common/decorators/nguoi-dung-hien-tai.decorator';
export declare class TimesheetController {
    private readonly timesheetService;
    constructor(timesheetService: TimesheetService);
    layBangCongThang(query: TimesheetQueryDto): Promise<{
        data: import("./timesheet.dto").TimesheetNhanVien[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
        thongKe: import("./timesheet.dto").ThongKeTimesheet;
    }>;
    layBangCongNhanVien(id: number, thang: number, nam: number): Promise<import("./timesheet.dto").TimesheetNhanVien | null>;
    layThongKe(thang: number, nam: number, phongBanId?: string): Promise<import("./timesheet.dto").ThongKeTimesheet>;
    layDanhSachYeuCauSuaCong(query: YeuCauSuaCongQueryDto): Promise<{
        data: import("./timesheet.dto").YeuCauSuaCongResponse[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    taoYeuCauSuaCong(dto: TaoYeuCauSuaCongDto, user: ThongTinNguoiDung): Promise<import("./timesheet.dto").YeuCauSuaCongResponse>;
    duyetYeuCauSuaCong(id: number, dto: DuyetYeuCauSuaCongDto, user: ThongTinNguoiDung): Promise<import("./timesheet.dto").YeuCauSuaCongResponse>;
    suaCongTrucTiep(dto: SuaCongTrucTiepDto, user: ThongTinNguoiDung): Promise<import("./timesheet.dto").TimesheetNgay>;
    layLichSuSuaCong(query: LichSuSuaCongQueryDto): Promise<{
        data: import("./timesheet.dto").LichSuSuaCongResponse[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    layLichSuSuaCongNhanVien(id: number, query: LichSuSuaCongQueryDto): Promise<{
        data: import("./timesheet.dto").LichSuSuaCongResponse[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
}
