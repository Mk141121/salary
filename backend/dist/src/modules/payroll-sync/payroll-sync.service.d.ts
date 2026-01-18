import { PrismaService } from '../../prisma/prisma.service';
import { SyncPayrollDto, RuleTraceQueryDto, SyncProgress, EnhancedRuleTrace, PipelineStatus } from './payroll-sync.dto';
export declare class PayrollSyncService {
    private prisma;
    private readonly logger;
    private progressMap;
    constructor(prisma: PrismaService);
    syncPayroll(dto: SyncPayrollDto): Promise<SyncProgress>;
    getProgress(bangLuongId: number): SyncProgress | null;
    private syncNgayCong;
    private syncNghiPhep;
    private syncOT;
    private syncYeuCau;
    private syncKPI;
    private triggerRuleEngine;
    getEnhancedRuleTrace(query: RuleTraceQueryDto): Promise<EnhancedRuleTrace[]>;
    private enhanceTrace;
    getPipelineStatus(thang: number, nam: number): Promise<PipelineStatus>;
    private initSteps;
    private runStep;
    private buildSummary;
    private buildWarnings;
    private tinhNgayCongLyThuyet;
    private mapTrangThai;
}
