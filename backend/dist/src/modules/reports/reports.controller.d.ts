import { ReportsService } from './reports.service';
import { ReportFilterDto } from './reports.dto';
export declare class ReportsController {
    private readonly reportsService;
    constructor(reportsService: ReportsService);
    getDiTreVeSom(filter: ReportFilterDto): Promise<import("./reports.dto").DiTreVeSomReport>;
    getOT(filter: ReportFilterDto): Promise<import("./reports.dto").OTReport>;
    getNghiPhep(filter: ReportFilterDto): Promise<import("./reports.dto").NghiPhepReport>;
    getQuyLuong(filter: ReportFilterDto): Promise<import("./reports.dto").QuyLuongReport>;
    getHeadcount(filter: ReportFilterDto): Promise<import("./reports.dto").HeadcountReport>;
    getChamCong(filter: ReportFilterDto): Promise<import("./reports.dto").ChamCongReport>;
    getDashboard(thang?: number, nam?: number): Promise<import("./reports.dto").DashboardReport>;
}
