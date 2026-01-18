// Timesheet Controller - Sprint 9
// Endpoints quản lý bảng công tháng, sửa công, audit
import {
  Controller,
  Get,
  Post,
  Put,
  Param,
  Query,
  Body,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { TimesheetService } from './timesheet.service';
import {
  TimesheetQueryDto,
  TaoYeuCauSuaCongDto,
  DuyetYeuCauSuaCongDto,
  SuaCongTrucTiepDto,
  YeuCauSuaCongQueryDto,
  LichSuSuaCongQueryDto,
} from './timesheet.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { NguoiDungHienTai, ThongTinNguoiDung } from '../../common/decorators/nguoi-dung-hien-tai.decorator';

@Controller('timesheet')
@UseGuards(JwtAuthGuard)
export class TimesheetController {
  constructor(private readonly timesheetService: TimesheetService) {}

  // =============== BẢNG CÔNG THÁNG ===============

  /**
   * GET /timesheet
   * Lấy bảng công tháng - danh sách nhân viên với chi tiết từng ngày
   */
  @Get()
  async layBangCongThang(@Query() query: TimesheetQueryDto) {
    return this.timesheetService.layBangCongThang(query);
  }

  /**
   * GET /timesheet/nhan-vien/:id
   * Lấy bảng công của 1 nhân viên
   */
  @Get('nhan-vien/:id')
  async layBangCongNhanVien(
    @Param('id', ParseIntPipe) id: number,
    @Query('thang', ParseIntPipe) thang: number,
    @Query('nam', ParseIntPipe) nam: number,
  ) {
    return this.timesheetService.layBangCongNhanVien(id, thang, nam);
  }

  /**
   * GET /timesheet/thong-ke
   * Lấy thống kê timesheet
   */
  @Get('thong-ke')
  async layThongKe(
    @Query('thang', ParseIntPipe) thang: number,
    @Query('nam', ParseIntPipe) nam: number,
    @Query('phongBanId') phongBanId?: string,
  ) {
    const pbId = phongBanId ? parseInt(phongBanId, 10) : undefined;
    return this.timesheetService.layThongKeTimesheet(thang, nam, pbId);
  }

  // =============== YÊU CẦU SỬA CÔNG ===============

  /**
   * GET /timesheet/yeu-cau-sua-cong
   * Lấy danh sách yêu cầu sửa công
   */
  @Get('yeu-cau-sua-cong')
  async layDanhSachYeuCauSuaCong(@Query() query: YeuCauSuaCongQueryDto) {
    return this.timesheetService.layDanhSachYeuCauSuaCong(query);
  }

  /**
   * POST /timesheet/yeu-cau-sua-cong
   * Tạo yêu cầu sửa công
   */
  @Post('yeu-cau-sua-cong')
  async taoYeuCauSuaCong(
    @Body() dto: TaoYeuCauSuaCongDto,
    @NguoiDungHienTai() user: ThongTinNguoiDung,
  ) {
    return this.timesheetService.taoYeuCauSuaCong(dto, user.id);
  }

  /**
   * POST /timesheet/yeu-cau-sua-cong/:id/duyet
   * Duyệt hoặc từ chối yêu cầu sửa công
   */
  @Post('yeu-cau-sua-cong/:id/duyet')
  async duyetYeuCauSuaCong(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: DuyetYeuCauSuaCongDto,
    @NguoiDungHienTai() user: ThongTinNguoiDung,
  ) {
    return this.timesheetService.duyetYeuCauSuaCong(id, dto, user.id);
  }

  // =============== SỬA CÔNG TRỰC TIẾP ===============

  /**
   * PUT /timesheet/sua-cong-truc-tiep
   * HR sửa công trực tiếp (không cần workflow)
   */
  @Put('sua-cong-truc-tiep')
  async suaCongTrucTiep(
    @Body() dto: SuaCongTrucTiepDto,
    @NguoiDungHienTai() user: ThongTinNguoiDung,
  ) {
    return this.timesheetService.suaCongTrucTiep(dto, user.id);
  }

  // =============== LỊCH SỬ SỬA CÔNG ===============

  /**
   * GET /timesheet/lich-su-sua-cong
   * Lấy lịch sử sửa công
   */
  @Get('lich-su-sua-cong')
  async layLichSuSuaCong(@Query() query: LichSuSuaCongQueryDto) {
    return this.timesheetService.layLichSuSuaCong(query);
  }

  /**
   * GET /timesheet/lich-su-sua-cong/nhan-vien/:id
   * Lấy lịch sử sửa công của 1 nhân viên
   */
  @Get('lich-su-sua-cong/nhan-vien/:id')
  async layLichSuSuaCongNhanVien(
    @Param('id', ParseIntPipe) id: number,
    @Query() query: LichSuSuaCongQueryDto,
  ) {
    return this.timesheetService.layLichSuSuaCong({
      ...query,
      nhanVienId: id,
    });
  }
}
