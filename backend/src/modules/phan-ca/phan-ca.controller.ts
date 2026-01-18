import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  ParseIntPipe,
  Request,
  UseGuards,
} from '@nestjs/common';
import { PhanCaService } from './phan-ca.service';
import {
  TaoLichPhanCaDto,
  CapNhatLichPhanCaDto,
  AssignBatchDto,
  CopyTuanDto,
  LocLichPhanCaDto,
  CalendarViewDto,
  ChiTietPhanCaNgayDto,
  XoaPhanCaDto,
} from './phan-ca.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@Controller('phan-ca')
@UseGuards(JwtAuthGuard)
export class PhanCaController {
  constructor(private readonly phanCaService: PhanCaService) {}

  /**
   * GET /api/phan-ca
   * Lấy danh sách lịch phân ca
   */
  @Get()
  async layDanhSach(@Query() filter: LocLichPhanCaDto) {
    return this.phanCaService.layDanhSach(filter);
  }

  /**
   * GET /api/phan-ca/calendar
   * Lấy calendar view cho phân ca
   */
  @Get('calendar')
  async layCalendarView(@Query() dto: CalendarViewDto) {
    return this.phanCaService.layCalendarView(dto);
  }

  /**
   * GET /api/phan-ca/lich-cua-toi
   * Lấy lịch làm việc của nhân viên đang đăng nhập
   */
  @Get('lich-cua-toi')
  async layLichCuaToi(
    @Query('tuNgay') tuNgay: string,
    @Query('denNgay') denNgay: string,
    @Request() req: any,
  ) {
    // TODO: Lấy nhanVienId từ user đang đăng nhập
    const nhanVienId = req.user?.nhanVienId;
    if (!nhanVienId) {
      return [];
    }
    return this.phanCaService.layLichCuaToi(nhanVienId, tuNgay, denNgay);
  }

  /**
   * GET /api/phan-ca/:id
   * Lấy chi tiết lịch phân ca
   */
  @Get(':id')
  async layChiTiet(@Param('id', ParseIntPipe) id: number) {
    return this.phanCaService.layChiTiet(id);
  }

  /**
   * POST /api/phan-ca
   * Tạo lịch phân ca mới
   */
  @Post()
  async tao(@Body() dto: TaoLichPhanCaDto, @Request() req: any) {
    return this.phanCaService.tao(dto, req.user?.id);
  }

  /**
   * PUT /api/phan-ca/:id
   * Cập nhật lịch phân ca
   */
  @Put(':id')
  async capNhat(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CapNhatLichPhanCaDto,
    @Request() req: any,
  ) {
    return this.phanCaService.capNhat(id, dto, req.user?.id);
  }

  /**
   * POST /api/phan-ca/:id/assign
   * Assign ca cho 1 ngày cụ thể
   */
  @Post(':id/assign')
  async assignNgay(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: ChiTietPhanCaNgayDto,
    @Request() req: any,
  ) {
    return this.phanCaService.assignNgay(id, dto, req.user?.id);
  }

  /**
   * POST /api/phan-ca/:id/assign-batch
   * Assign batch cho nhiều nhân viên nhiều ngày
   */
  @Post(':id/assign-batch')
  async assignBatch(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: AssignBatchDto,
    @Request() req: any,
  ) {
    return this.phanCaService.assignBatch(id, dto, req.user?.id);
  }

  /**
   * POST /api/phan-ca/:id/copy-week
   * Copy tuần
   */
  @Post(':id/copy-week')
  async copyTuan(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CopyTuanDto,
    @Request() req: any,
  ) {
    return this.phanCaService.copyTuan(id, dto, req.user?.id);
  }

  /**
   * POST /api/phan-ca/:id/publish
   * Công bố lịch phân ca
   */
  @Post(':id/publish')
  async publish(@Param('id', ParseIntPipe) id: number, @Request() req: any) {
    return this.phanCaService.publish(id, req.user?.id);
  }

  /**
   * POST /api/phan-ca/:id/unpublish
   * Hủy công bố lịch
   */
  @Post(':id/unpublish')
  async unpublish(@Param('id', ParseIntPipe) id: number, @Request() req: any) {
    return this.phanCaService.unpublish(id, req.user?.id);
  }

  /**
   * DELETE /api/phan-ca/:id
   * Xóa lịch phân ca
   */
  @Delete(':id')
  async xoa(@Param('id', ParseIntPipe) id: number) {
    return this.phanCaService.xoa(id);
  }

  /**
   * POST /api/phan-ca/:id/xoa-chi-tiet
   * Xóa chi tiết phân ca
   */
  @Post(':id/xoa-chi-tiet')
  async xoaChiTiet(@Param('id', ParseIntPipe) id: number, @Body() dto: XoaPhanCaDto) {
    return this.phanCaService.xoaChiTiet(id, dto.chiTietIds);
  }
}
