/**
 * Scheduling Controller - Xếp Ca
 * PRD-01: REST API endpoints cho module xếp ca
 */

import { Controller, Get, Post, Put, Delete, Body, Param, Query, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { SchedulingService } from './scheduling.service';
import {
  CreateCaLamViecDto,
  UpdateCaLamViecDto,
  CreateLichPhanCaDto,
  AssignCaBatchDto,
  CopyWeekDto,
} from './dto/scheduling.dto';
import { CongKhai } from '../../common/decorators/cong-khai.decorator';

@ApiTags('Xếp Ca / Scheduling')
@ApiBearerAuth()
@Controller()
export class SchedulingController {
  constructor(private readonly schedulingService: SchedulingService) {}

  // ============== CA LAM VIEC ==============

  @Get('ca-lam-viec')
  @CongKhai()
  @ApiOperation({ summary: 'Lấy danh sách ca làm việc' })
  @ApiQuery({ name: 'phongBanId', required: false })
  async getAllCaLamViec(@Query('phongBanId') phongBanId?: string) {
    const data = await this.schedulingService.getAllCaLamViec(phongBanId ? parseInt(phongBanId) : undefined);
    return { success: true, data };
  }

  @Get('ca-lam-viec/:id')
  @CongKhai()
  @ApiOperation({ summary: 'Lấy chi tiết ca làm việc' })
  async getCaLamViecById(@Param('id', ParseIntPipe) id: number) {
    const data = await this.schedulingService.getCaLamViecById(id);
    return { success: true, data };
  }

  @Post('ca-lam-viec')
  @ApiOperation({ summary: 'Tạo ca làm việc mới' })
  async createCaLamViec(@Body() dto: CreateCaLamViecDto) {
    const data = await this.schedulingService.createCaLamViec(dto);
    return { success: true, data };
  }

  @Put('ca-lam-viec/:id')
  @ApiOperation({ summary: 'Cập nhật ca làm việc' })
  async updateCaLamViec(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCaLamViecDto,
  ) {
    const data = await this.schedulingService.updateCaLamViec(id, dto);
    return { success: true, data };
  }

  @Delete('ca-lam-viec/:id')
  @ApiOperation({ summary: 'Xóa ca làm việc' })
  async deleteCaLamViec(@Param('id', ParseIntPipe) id: number) {
    await this.schedulingService.deleteCaLamViec(id);
    return { success: true, message: 'Đã xóa ca làm việc' };
  }

  // ============== LICH PHAN CA ==============

  @Get('phan-ca')
  @CongKhai()
  @ApiOperation({ summary: 'Lấy lịch phân ca theo tháng' })
  @ApiQuery({ name: 'thangNam', required: true, example: '2026-02' })
  @ApiQuery({ name: 'phongBanId', required: false })
  async getLichPhanCa(
    @Query('thangNam') thangNam: string,
    @Query('phongBanId') phongBanId?: string,
  ) {
    const data = await this.schedulingService.getLichPhanCa(
      thangNam,
      phongBanId ? parseInt(phongBanId) : undefined,
    );
    return { success: true, data };
  }

  @Post('phan-ca')
  @ApiOperation({ summary: 'Tạo lịch phân ca mới' })
  async createLichPhanCa(@Body() dto: CreateLichPhanCaDto) {
    // TODO: Get createdBy from auth token
    const data = await this.schedulingService.createLichPhanCa(dto, 1);
    return { success: true, data };
  }

  @Post('phan-ca/:id/assign-batch')
  @ApiOperation({ summary: 'Assign ca hàng loạt cho nhiều nhân viên' })
  async assignCaBatch(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: AssignCaBatchDto,
  ) {
    const data = await this.schedulingService.assignCaBatch(id, dto);
    return { success: true, data };
  }

  @Post('phan-ca/:id/copy-week')
  @ApiOperation({ summary: 'Copy lịch từ tuần này sang tuần khác' })
  async copyWeek(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CopyWeekDto,
  ) {
    const data = await this.schedulingService.copyWeek(id, dto);
    return { success: true, data };
  }

  @Post('phan-ca/:id/publish')
  @ApiOperation({ summary: 'Công bố lịch phân ca' })
  async publishLichPhanCa(@Param('id', ParseIntPipe) id: number) {
    const data = await this.schedulingService.publishLichPhanCa(id);
    return { success: true, data };
  }

  @Post('phan-ca/:id/unpublish')
  @ApiOperation({ summary: 'Hủy công bố lịch phân ca' })
  async unpublishLichPhanCa(@Param('id', ParseIntPipe) id: number) {
    const data = await this.schedulingService.unpublishLichPhanCa(id);
    return { success: true, data };
  }

  @Get('phan-ca/:id/calendar')
  @CongKhai()
  @ApiOperation({ summary: 'Lấy calendar view của lịch phân ca' })
  async getCalendar(@Param('id', ParseIntPipe) id: number) {
    const data = await this.schedulingService.getCalendar(id);
    return { success: true, data };
  }

  // ============== PERSONAL SCHEDULE ==============

  @Get('lich-lam-viec/toi')
  @ApiOperation({ summary: 'Lấy lịch làm việc cá nhân' })
  @ApiQuery({ name: 'from', required: true, example: '2026-02-01' })
  @ApiQuery({ name: 'to', required: true, example: '2026-02-28' })
  async getMySchedule(
    @Query('from') from: string,
    @Query('to') to: string,
    // TODO: Get nhanVienId from auth token
  ) {
    // Mock nhanVienId = 1 for now
    const data = await this.schedulingService.getMySchedule(1, from, to);
    return { success: true, data };
  }
}
