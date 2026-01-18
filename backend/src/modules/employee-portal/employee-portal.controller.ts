// Controller Employee Portal - Sprint 5
// API cho nhân viên tự xem thông tin cá nhân
import { Controller, Get, Post, Query, UseGuards, Request } from '@nestjs/common';
import { EmployeePortalService } from './employee-portal.service';
import { LichLamViecQueryDto, ChamCongQueryDto, PhieuLuongQueryDto } from './employee-portal.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@Controller('employee-portal')
@UseGuards(JwtAuthGuard)
export class EmployeePortalController {
  constructor(private readonly service: EmployeePortalService) {}

  /**
   * GET /api/employee-portal/dashboard
   * Dashboard tổng quan cho nhân viên
   */
  @Get('dashboard')
  async getDashboard(@Request() req: any) {
    return this.service.getDashboard(req.user.id);
  }

  /**
   * GET /api/employee-portal/lich-lam-viec
   * Lấy lịch làm việc của nhân viên (tuần/tháng)
   */
  @Get('lich-lam-viec')
  async getLichLamViec(@Request() req: any, @Query() query: LichLamViecQueryDto) {
    return this.service.getLichLamViec(req.user.id, query);
  }

  /**
   * GET /api/employee-portal/cham-cong
   * Lấy chấm công của nhân viên (tháng)
   */
  @Get('cham-cong')
  async getChamCong(@Request() req: any, @Query() query: ChamCongQueryDto) {
    return this.service.getChamCong(req.user.id, query);
  }

  /**
   * GET /api/employee-portal/phieu-luong
   * Lấy danh sách phiếu lương
   */
  @Get('phieu-luong')
  async getPhieuLuong(@Request() req: any, @Query() query: PhieuLuongQueryDto) {
    return this.service.getPhieuLuong(req.user.id, query);
  }

  /**
   * GET /api/employee-portal/so-du-phep
   * Lấy số dư phép của nhân viên
   */
  @Get('so-du-phep')
  async getSoDuPhep(@Request() req: any) {
    return this.service.getSoDuPhep(req.user.id);
  }

  /**
   * GET /api/employee-portal/ho-so
   * Lấy hồ sơ nhân viên
   */
  @Get('ho-so')
  async getHoSo(@Request() req: any) {
    return this.service.getHoSo(req.user.id);
  }

  /**
   * POST /api/employee-portal/check-in
   * Chấm công vào
   */
  @Post('check-in')
  async checkIn(@Request() req: any) {
    return this.service.checkIn(req.user.id);
  }

  /**
   * POST /api/employee-portal/check-out
   * Chấm công ra
   */
  @Post('check-out')
  async checkOut(@Request() req: any) {
    return this.service.checkOut(req.user.id);
  }
}
