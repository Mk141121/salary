// Approval Dashboard Controller - Quản lý tất cả đơn chờ duyệt tập trung
// Sprint 7 - Cải tiến quy trình duyệt
import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Param,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApprovalDashboardService } from './approval-dashboard.service';
import { AutoEscalationService } from './auto-escalation.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { Quyen } from '../../common/decorators/quyen.decorator';

@Controller('approval-dashboard')
@UseGuards(JwtAuthGuard)
export class ApprovalDashboardController {
  constructor(
    private readonly approvalService: ApprovalDashboardService,
    private readonly escalationService: AutoEscalationService,
  ) {}

  /**
   * GET /api/approval-dashboard/summary
   * Lấy tổng quan các đơn chờ duyệt
   */
  @Get('summary')
  @Quyen('YEU_CAU_DUYET_CAP_1', 'YEU_CAU_DUYET_CAP_2', 'ADMIN')
  async laySummary(@Request() req: any) {
    return this.approvalService.laySummary(req.user?.id);
  }

  /**
   * GET /api/approval-dashboard/pending
   * Lấy tất cả đơn chờ duyệt
   */
  @Get('pending')
  @Quyen('YEU_CAU_DUYET_CAP_1', 'YEU_CAU_DUYET_CAP_2', 'ADMIN')
  async layDanhSachChoDuyet(
    @Query('loai') loai?: string, // YEU_CAU | NGHI_PHEP | ALL
    @Query('cap') cap?: string, // 1 | 2 | ALL
    @Query('phongBanId') phongBanId?: string,
    @Query('tuNgay') tuNgay?: string,
    @Query('denNgay') denNgay?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Request() req?: any,
  ) {
    return this.approvalService.layDanhSachChoDuyet({
      nguoiDuyetId: req.user?.id,
      loai: loai || 'ALL',
      cap: cap === '1' ? 1 : cap === '2' ? 2 : undefined,
      phongBanId: phongBanId ? parseInt(phongBanId) : undefined,
      tuNgay,
      denNgay,
      page: page ? parseInt(page) : 1,
      limit: limit ? parseInt(limit) : 20,
    });
  }

  /**
   * GET /api/approval-dashboard/overdue
   * Lấy các đơn quá hạn duyệt
   */
  @Get('overdue')
  @Quyen('YEU_CAU_DUYET_CAP_1', 'YEU_CAU_DUYET_CAP_2', 'ADMIN')
  async layDanhSachQuaHan(
    @Query('soNgay') soNgay?: string, // Số ngày quá hạn (default: 3)
    @Request() req?: any,
  ) {
    const ngay = soNgay ? parseInt(soNgay) : 3;
    return this.approvalService.layDanhSachQuaHan(req.user?.id, ngay);
  }

  /**
   * POST /api/approval-dashboard/batch-approve
   * Duyệt hàng loạt nhiều loại đơn
   */
  @Post('batch-approve')
  @Quyen('YEU_CAU_DUYET_CAP_1', 'YEU_CAU_DUYET_CAP_2', 'ADMIN')
  async duyetHangLoat(
    @Body() dto: {
      donYeuCauIds?: number[];
      donNghiPhepIds?: number[];
      ghiChu?: string;
    },
    @Request() req: any,
  ) {
    return this.approvalService.duyetHangLoat(
      dto.donYeuCauIds || [],
      dto.donNghiPhepIds || [],
      req.user?.id,
      dto.ghiChu,
    );
  }

  /**
   * GET /api/approval-dashboard/stats
   * Thống kê duyệt đơn theo thời gian
   */
  @Get('stats')
  @Quyen('ADMIN')
  async layThongKe(
    @Query('thang') thang?: string,
    @Query('nam') nam?: string,
  ) {
    const t = thang ? parseInt(thang) : new Date().getMonth() + 1;
    const n = nam ? parseInt(nam) : new Date().getFullYear();
    return this.approvalService.layThongKeDuyet(t, n);
  }

  /**
   * GET /api/approval-dashboard/my-approvals
   * Lịch sử duyệt của tôi
   */
  @Get('my-approvals')
  async layLichSuDuyetCuaToi(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Request() req?: any,
  ) {
    return this.approvalService.layLichSuDuyet(
      req.user?.id,
      page ? parseInt(page) : 1,
      limit ? parseInt(limit) : 20,
    );
  }

  /**
   * POST /api/approval-dashboard/run-job/:job
   * Chạy thủ công các scheduled job (ADMIN only)
   */
  @Post('run-job/:job')
  @Quyen('ADMIN')
  async runJob(
    @Param('job') job: 'remind' | 'escalate' | 'auto-approve' | 'report',
  ) {
    return this.escalationService.runManually(job);
  }
}
