// Controller Nghỉ phép - API endpoints cho quản lý nghỉ phép
import {
  Controller,
  Get,
  Post,
  Put,
  Param,
  Body,
  Query,
  ParseIntPipe,
  UseGuards,
  Request,
} from '@nestjs/common';
import { NghiPhepService } from './nghi-phep.service';
import { NghiPhepMappingService } from './nghi-phep-mapping.service';
import {
  TaoLoaiNghiDto,
  CapNhatLoaiNghiDto,
  TaoDonNghiPhepDto,
  CapNhatDonNghiPhepDto,
  DuyetDonNghiPhepDto,
  TuChoiDonNghiPhepDto,
  HuyDonNghiPhepDto,
  LocDonNghiPhepDto,
  LocLichNghiDto,
} from './nghi-phep.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { Quyen } from '../../common/decorators/quyen.decorator';

@Controller('nghi-phep')
@UseGuards(JwtAuthGuard)
export class NghiPhepController {
  constructor(
    private readonly nghiPhepService: NghiPhepService,
    private readonly mappingService: NghiPhepMappingService,
  ) {}

  // =============== LOẠI NGHỈ ===============

  /**
   * GET /api/nghi-phep/loai-nghi
   * Lấy danh sách loại nghỉ
   */
  @Get('loai-nghi')
  async layDanhSachLoaiNghi(@Query('all') all?: string) {
    const chiActive = all !== 'true';
    return this.nghiPhepService.layDanhSachLoaiNghi(chiActive);
  }

  /**
   * GET /api/nghi-phep/loai-nghi/:id
   * Lấy chi tiết loại nghỉ
   */
  @Get('loai-nghi/:id')
  async layLoaiNghi(@Param('id', ParseIntPipe) id: number) {
    return this.nghiPhepService.layLoaiNghi(id);
  }

  /**
   * POST /api/nghi-phep/loai-nghi
   * Tạo loại nghỉ mới
   */
  @Post('loai-nghi')
  @Quyen('NGHI_PHEP_ADMIN')
  async taoLoaiNghi(@Body() dto: TaoLoaiNghiDto, @Request() req: any) {
    return this.nghiPhepService.taoLoaiNghi(dto, req.user?.id);
  }

  /**
   * PUT /api/nghi-phep/loai-nghi/:id
   * Cập nhật loại nghỉ
   */
  @Put('loai-nghi/:id')
  @Quyen('NGHI_PHEP_ADMIN')
  async capNhatLoaiNghi(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CapNhatLoaiNghiDto,
    @Request() req: any,
  ) {
    return this.nghiPhepService.capNhatLoaiNghi(id, dto, req.user?.id);
  }

  /**
   * POST /api/nghi-phep/loai-nghi/:id/toggle
   * Toggle trạng thái loại nghỉ
   */
  @Post('loai-nghi/:id/toggle')
  @Quyen('NGHI_PHEP_ADMIN')
  async toggleLoaiNghi(@Param('id', ParseIntPipe) id: number, @Request() req: any) {
    return this.nghiPhepService.toggleLoaiNghi(id, req.user?.id);
  }

  // =============== ĐƠN NGHỈ PHÉP ===============

  /**
   * GET /api/nghi-phep/don
   * Lấy danh sách đơn nghỉ phép
   */
  @Get('don')
  async layDanhSachDon(@Query() filter: LocDonNghiPhepDto) {
    return this.nghiPhepService.layDanhSachDon(filter);
  }

  /**
   * GET /api/nghi-phep/don/:id
   * Lấy chi tiết đơn nghỉ phép
   */
  @Get('don/:id')
  async layChiTietDon(@Param('id', ParseIntPipe) id: number) {
    return this.nghiPhepService.layChiTietDon(id);
  }

  /**
   * POST /api/nghi-phep/don
   * Tạo đơn nghỉ phép mới
   */
  @Post('don')
  @Quyen('NGHI_PHEP_TAO_DON')
  async taoDonNghiPhep(@Body() dto: TaoDonNghiPhepDto, @Request() req: any) {
    return this.nghiPhepService.taoDonNghiPhep(dto, req.user?.id);
  }

  /**
   * PUT /api/nghi-phep/don/:id
   * Cập nhật đơn nghỉ phép
   */
  @Put('don/:id')
  @Quyen('NGHI_PHEP_SUA_DON')
  async capNhatDonNghiPhep(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CapNhatDonNghiPhepDto,
    @Request() req: any,
  ) {
    return this.nghiPhepService.capNhatDonNghiPhep(id, dto, req.user?.id);
  }

  /**
   * POST /api/nghi-phep/don/:id/gui-duyet
   * Gửi đơn nghỉ phép để duyệt
   */
  @Post('don/:id/gui-duyet')
  @Quyen('NGHI_PHEP_GUI_DUYET')
  async guiDuyet(@Param('id', ParseIntPipe) id: number, @Request() req: any) {
    return this.nghiPhepService.guiDuyet(id, req.user?.id);
  }

  /**
   * POST /api/nghi-phep/don/:id/duyet
   * Duyệt đơn nghỉ phép
   */
  @Post('don/:id/duyet')
  @Quyen('NGHI_PHEP_DUYET')
  async duyetDon(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: DuyetDonNghiPhepDto,
    @Request() req: any,
  ) {
    return this.nghiPhepService.duyetDon(id, dto, req.user?.id);
  }

  /**
   * POST /api/nghi-phep/don/:id/tu-choi
   * Từ chối đơn nghỉ phép
   */
  @Post('don/:id/tu-choi')
  @Quyen('NGHI_PHEP_DUYET')
  async tuChoiDon(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: TuChoiDonNghiPhepDto,
    @Request() req: any,
  ) {
    return this.nghiPhepService.tuChoiDon(id, dto, req.user?.id);
  }

  /**
   * POST /api/nghi-phep/don/:id/huy
   * Hủy đơn nghỉ phép
   */
  @Post('don/:id/huy')
  @Quyen('NGHI_PHEP_HUY_DON')
  async huyDon(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: HuyDonNghiPhepDto,
    @Request() req: any,
  ) {
    return this.nghiPhepService.huyDon(id, req.user?.id);
  }

  /**
   * POST /api/nghi-phep/don/:id/mapping/rebuild
   * Rebuild mapping cho đơn nghỉ (admin only)
   */
  @Post('don/:id/mapping/rebuild')
  @Quyen('NGHI_PHEP_ADMIN')
  async rebuildMapping(@Param('id', ParseIntPipe) id: number) {
    return this.nghiPhepService.rebuildMapping(id);
  }

  // =============== LỊCH NGHỈ ===============

  /**
   * GET /api/nghi-phep/lich
   * Lấy lịch nghỉ phép (calendar view)
   */
  @Get('lich')
  async layLichNghi(@Query() filter: LocLichNghiDto) {
    return this.nghiPhepService.layLichNghi(filter);
  }

  /**
   * GET /api/nghi-phep/nhan-vien/:id/lich
   * Lấy lịch nghỉ phép của nhân viên
   */
  @Get('nhan-vien/:id/lich')
  async layLichNghiNhanVien(
    @Param('id', ParseIntPipe) nhanVienId: number,
    @Query('tuNgay') tuNgay: string,
    @Query('denNgay') denNgay: string,
  ) {
    return this.mappingService.layLichNghiNhanVien(
      nhanVienId,
      new Date(tuNgay),
      new Date(denNgay),
    );
  }
}
