// Payroll Sync Controller - Sprint 10
// API endpoints cho pipeline sync và rule trace
import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { PayrollSyncService } from './payroll-sync.service';
import {
  SyncPayrollDto,
  SyncBatchDto,
  RuleTraceQueryDto,
} from './payroll-sync.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@Controller('payroll-sync')
@UseGuards(JwtAuthGuard)
export class PayrollSyncController {
  constructor(private readonly payrollSyncService: PayrollSyncService) {}

  // =============== SYNC PIPELINE ===============

  /**
   * POST /payroll-sync/sync
   * Sync toàn bộ pipeline cho 1 bảng lương
   */
  @Post('sync')
  async syncPayroll(@Body() dto: SyncPayrollDto) {
    return this.payrollSyncService.syncPayroll(dto);
  }

  /**
   * GET /payroll-sync/progress/:bangLuongId
   * Lấy progress của sync
   */
  @Get('progress/:bangLuongId')
  async getProgress(@Param('bangLuongId', ParseIntPipe) bangLuongId: number) {
    return this.payrollSyncService.getProgress(bangLuongId);
  }

  /**
   * GET /payroll-sync/status
   * Lấy trạng thái pipeline toàn công ty
   */
  @Get('status')
  async getPipelineStatus(
    @Query('thang', ParseIntPipe) thang: number,
    @Query('nam', ParseIntPipe) nam: number,
  ) {
    return this.payrollSyncService.getPipelineStatus(thang, nam);
  }

  // =============== ENHANCED RULE TRACE ===============

  /**
   * GET /payroll-sync/rule-trace
   * Lấy rule trace với thông tin nguồn dữ liệu
   */
  @Get('rule-trace')
  async getRuleTrace(@Query() query: RuleTraceQueryDto) {
    return this.payrollSyncService.getEnhancedRuleTrace(query);
  }

  /**
   * GET /payroll-sync/rule-trace/nhan-vien/:nhanVienId
   * Lấy rule trace của 1 nhân viên trong bảng lương
   */
  @Get('rule-trace/nhan-vien/:nhanVienId')
  async getRuleTraceByNhanVien(
    @Param('nhanVienId', ParseIntPipe) nhanVienId: number,
    @Query('bangLuongId', ParseIntPipe) bangLuongId: number,
  ) {
    return this.payrollSyncService.getEnhancedRuleTrace({
      bangLuongId,
      nhanVienId,
    });
  }
}
