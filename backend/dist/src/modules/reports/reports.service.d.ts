import { PrismaService } from '../../prisma/prisma.service';
import { ReportFilterDto, DiTreVeSomReport, OTReport, NghiPhepReport, QuyLuongReport, HeadcountReport, ChamCongReport, DashboardReport } from './reports.dto';
export declare class ReportsService {
    private prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    getDiTreVeSom(filter: ReportFilterDto): Promise<DiTreVeSomReport>;
    getOT(filter: ReportFilterDto): Promise<OTReport>;
    getNghiPhep(filter: ReportFilterDto): Promise<NghiPhepReport>;
    getQuyLuong(filter: ReportFilterDto): Promise<QuyLuongReport>;
    getHeadcount(filter: ReportFilterDto): Promise<HeadcountReport>;
    getChamCong(filter: ReportFilterDto): Promise<ChamCongReport>;
    getDashboard(thang?: number, nam?: number): Promise<DashboardReport>;
}
