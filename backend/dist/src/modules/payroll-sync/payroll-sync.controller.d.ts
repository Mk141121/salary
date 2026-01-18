import { PayrollSyncService } from './payroll-sync.service';
import { SyncPayrollDto, RuleTraceQueryDto } from './payroll-sync.dto';
export declare class PayrollSyncController {
    private readonly payrollSyncService;
    constructor(payrollSyncService: PayrollSyncService);
    syncPayroll(dto: SyncPayrollDto): Promise<import("./payroll-sync.dto").SyncProgress>;
    getProgress(bangLuongId: number): Promise<import("./payroll-sync.dto").SyncProgress | null>;
    getPipelineStatus(thang: number, nam: number): Promise<import("./payroll-sync.dto").PipelineStatus>;
    getRuleTrace(query: RuleTraceQueryDto): Promise<import("./payroll-sync.dto").EnhancedRuleTrace[]>;
    getRuleTraceByNhanVien(nhanVienId: number, bangLuongId: number): Promise<import("./payroll-sync.dto").EnhancedRuleTrace[]>;
}
