// Controller Yêu cầu (Request) - Sprint 4
// API endpoints cho quản lý đơn yêu cầu: OT, Trễ giờ, Về sớm, Công tác
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
import { YeuCauService } from './yeu-cau.service';
import {
  TaoLoaiYeuCauDto,
  CapNhatLoaiYeuCauDto,
  TaoDonYeuCauDto,
  CapNhatDonYeuCauDto,
  DuyetDonYeuCauDto,
  TuChoiDonYeuCauDto,
  OverrideDonYeuCauDto,
  LocDonYeuCauDto,
  TaoWorkflowConfigDto,
  CapNhatWorkflowConfigDto,
} from './yeu-cau.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { Quyen } from '../../common/decorators/quyen.decorator';

@Controller('yeu-cau')
@UseGuards(JwtAuthGuard)
export class YeuCauController {
  constructor(private readonly yeuCauService: YeuCauService) {}

  // =============== LOẠI YÊU CẦU ===============

  /**
   * GET /api/yeu-cau/loai
   * Lấy danh sách loại yêu cầu
   */
  @Get('loai')
  async layDanhSachLoaiYeuCau(@Query('all') all?: string) {
    const chiActive = all !== 'true';
    return this.yeuCauService.layDanhSachLoaiYeuCau(chiActive);
  }

  /**
   * GET /api/yeu-cau/loai/:id
   * Lấy chi tiết loại yêu cầu
   */
  @Get('loai/:id')
  async layLoaiYeuCau(@Param('id', ParseIntPipe) id: number) {
    return this.yeuCauService.layLoaiYeuCau(id);
  }

  /**
   * POST /api/yeu-cau/loai
   * Tạo loại yêu cầu mới
   */
  @Post('loai')
  @Quyen('YEU_CAU_ADMIN')
  async taoLoaiYeuCau(@Body() dto: TaoLoaiYeuCauDto, @Request() req: any) {
    return this.yeuCauService.taoLoaiYeuCau(dto, req.user?.id);
  }

  /**
   * PUT /api/yeu-cau/loai/:id
   * Cập nhật loại yêu cầu
   */
  @Put('loai/:id')
  @Quyen('YEU_CAU_ADMIN')
  async capNhatLoaiYeuCau(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CapNhatLoaiYeuCauDto,
    @Request() req: any,
  ) {
    return this.yeuCauService.capNhatLoaiYeuCau(id, dto, req.user?.id);
  }

  /**
   * POST /api/yeu-cau/loai/:id/toggle
   * Toggle trạng thái loại yêu cầu
   */
  @Post('loai/:id/toggle')
  @Quyen('YEU_CAU_ADMIN')
  async toggleLoaiYeuCau(@Param('id', ParseIntPipe) id: number, @Request() req: any) {
    return this.yeuCauService.toggleLoaiYeuCau(id, req.user?.id);
  }

  // =============== ĐƠN YÊU CẦU ===============

  /**
   * GET /api/yeu-cau/don
   * Lấy danh sách đơn yêu cầu
   */
  @Get('don')
  async layDanhSachDon(@Query() filter: LocDonYeuCauDto) {
    return this.yeuCauService.layDanhSachDon(filter);
  }

  /**
   * GET /api/yeu-cau/don/cua-toi
   * Lấy đơn yêu cầu của tôi
   */
  @Get('don/cua-toi')
  async layDonCuaToi(@Query() filter: LocDonYeuCauDto, @Request() req: any) {
    const nhanVienId = req.user?.nhanVienId;
    if (!nhanVienId) return { data: [], pagination: { page: 1, limit: 20, total: 0, totalPages: 0 } };
    return this.yeuCauService.layDanhSachDon({ ...filter, nhanVienId });
  }

  /**
   * GET /api/yeu-cau/my-requests
   * [Employee Portal] Lấy yêu cầu của nhân viên hiện tại
   */
  @Get('my-requests')
  async layYeuCauCuaToi(@Query('trangThai') trangThai: string, @Request() req: any) {
    const nhanVienId = req.user?.nhanVienId;
    if (!nhanVienId) return { data: [] };
    
    // Map frontend filter to backend filter
    let mappedTrangThai: string[] | string | undefined;
    if (trangThai === 'CHO_DUYET') {
      // CHO_DUYET includes both CHO_DUYET_1 and CHO_DUYET_2
      mappedTrangThai = ['CHO_DUYET_1', 'CHO_DUYET_2', 'NHAP'];
    } else if (trangThai === 'DA_DUYET') {
      mappedTrangThai = trangThai;
    } else if (trangThai === 'TU_CHOI') {
      mappedTrangThai = ['TU_CHOI_1', 'TU_CHOI_2'];
    }
    
    const result = await this.yeuCauService.layDanhSachDonPortal(nhanVienId, mappedTrangThai);
    return { data: result || [] };
  }

  /**
   * GET /api/yeu-cau/don/:id
   * Lấy chi tiết đơn yêu cầu
   */
  @Get('don/:id')
  async layChiTietDon(@Param('id', ParseIntPipe) id: number) {
    return this.yeuCauService.layChiTietDon(id);
  }

  /**
   * POST /api/yeu-cau/don
   * Tạo đơn yêu cầu mới
   * Không cần quyền đặc biệt - mọi nhân viên đăng nhập đều có thể tạo đơn
   * Nếu không gửi nhanVienId, tự động lấy từ user đăng nhập
   */
  @Post('don')
  async taoDon(@Body() dto: TaoDonYeuCauDto, @Request() req: any) {
    // Auto-fill nhanVienId from user if not provided
    if (!dto.nhanVienId && req.user?.nhanVienId) {
      dto.nhanVienId = req.user.nhanVienId;
    }
    return this.yeuCauService.taoDon(dto, req.user?.id);
  }

  /**
   * PUT /api/yeu-cau/don/:id
   * Cập nhật đơn yêu cầu
   */
  @Put('don/:id')
  async capNhatDon(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CapNhatDonYeuCauDto,
    @Request() req: any,
  ) {
    return this.yeuCauService.capNhatDon(id, dto, req.user?.id);
  }

  /**
   * POST /api/yeu-cau/don/:id/gui-duyet
   * Gửi đơn để duyệt
   */
  @Post('don/:id/gui-duyet')
  async guiDuyet(@Param('id', ParseIntPipe) id: number, @Request() req: any) {
    return this.yeuCauService.guiDuyet(id, req.user?.id);
  }

  /**
   * POST /api/yeu-cau/don/:id/duyet-cap-1
   * Duyệt đơn cấp 1 (Manager)
   */
  @Post('don/:id/duyet-cap-1')
  @Quyen('YEU_CAU_DUYET_CAP_1')
  async duyetCap1(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: DuyetDonYeuCauDto,
    @Request() req: any,
  ) {
    return this.yeuCauService.duyetCap1(id, dto, req.user?.id);
  }

  /**
   * POST /api/yeu-cau/don/:id/duyet-cap-2
   * Duyệt đơn cấp 2 (HR)
   */
  @Post('don/:id/duyet-cap-2')
  @Quyen('YEU_CAU_DUYET_CAP_2')
  async duyetCap2(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: DuyetDonYeuCauDto,
    @Request() req: any,
  ) {
    return this.yeuCauService.duyetCap2(id, dto, req.user?.id);
  }

  /**
   * POST /api/yeu-cau/don/:id/tu-choi-cap-1
   * Từ chối đơn cấp 1
   */
  @Post('don/:id/tu-choi-cap-1')
  @Quyen('YEU_CAU_DUYET_CAP_1')
  async tuChoiCap1(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: TuChoiDonYeuCauDto,
    @Request() req: any,
  ) {
    return this.yeuCauService.tuChoi(id, dto, req.user?.id, 1);
  }

  /**
   * POST /api/yeu-cau/don/:id/tu-choi-cap-2
   * Từ chối đơn cấp 2
   */
  @Post('don/:id/tu-choi-cap-2')
  @Quyen('YEU_CAU_DUYET_CAP_2')
  async tuChoiCap2(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: TuChoiDonYeuCauDto,
    @Request() req: any,
  ) {
    return this.yeuCauService.tuChoi(id, dto, req.user?.id, 2);
  }

  /**
   * POST /api/yeu-cau/don/:id/override
   * Override quyết định (HR only)
   */
  @Post('don/:id/override')
  @Quyen('YEU_CAU_OVERRIDE')
  async override(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: OverrideDonYeuCauDto,
    @Request() req: any,
  ) {
    return this.yeuCauService.override(id, dto, req.user?.id);
  }

  /**
   * POST /api/yeu-cau/don/:id/huy
   * Hủy đơn yêu cầu
   */
  @Post('don/:id/huy')
  async huyDon(@Param('id', ParseIntPipe) id: number, @Request() req: any) {
    return this.yeuCauService.huyDon(id, req.user?.id);
  }

  // =============== INBOX ===============

  /**
   * GET /api/yeu-cau/inbox/cap-1
   * Inbox duyệt cấp 1 (Manager)
   */
  @Get('inbox/cap-1')
  @Quyen('YEU_CAU_DUYET_CAP_1')
  async layInboxCap1(@Query() filter: LocDonYeuCauDto, @Request() req: any) {
    return this.yeuCauService.layInboxDuyetCap1(req.user?.id, filter);
  }

  /**
   * GET /api/yeu-cau/inbox/cap-2
   * Inbox duyệt cấp 2 (HR)
   */
  @Get('inbox/cap-2')
  @Quyen('YEU_CAU_DUYET_CAP_2')
  async layInboxCap2(@Query() filter: LocDonYeuCauDto, @Request() req: any) {
    return this.yeuCauService.layInboxDuyetCap2(req.user?.id, filter);
  }

  /**
   * POST /api/yeu-cau/inbox/duyet-batch
   * Duyệt hàng loạt
   */
  @Post('inbox/duyet-batch')
  @Quyen('YEU_CAU_DUYET_CAP_1')
  async duyetBatch(
    @Body() body: { ids: number[]; cap: 1 | 2; ghiChu?: string },
    @Request() req: any,
  ) {
    return this.yeuCauService.duyetBatch(body.ids, req.user?.id, body.cap, body.ghiChu);
  }

  // =============== WORKFLOW CONFIG ===============

  /**
   * GET /api/yeu-cau/workflow-config
   * Lấy danh sách cấu hình workflow
   */
  @Get('workflow-config')
  @Quyen('YEU_CAU_ADMIN')
  async layDanhSachWorkflowConfig(
    @Query('loaiYeuCauId') loaiYeuCauId?: string,
    @Query('phongBanId') phongBanId?: string,
  ) {
    return this.yeuCauService.layDanhSachWorkflowConfig(
      loaiYeuCauId ? parseInt(loaiYeuCauId, 10) : undefined,
      phongBanId ? parseInt(phongBanId, 10) : undefined,
    );
  }

  /**
   * POST /api/yeu-cau/workflow-config
   * Tạo cấu hình workflow
   */
  @Post('workflow-config')
  @Quyen('YEU_CAU_ADMIN')
  async taoWorkflowConfig(@Body() dto: TaoWorkflowConfigDto, @Request() req: any) {
    return this.yeuCauService.taoWorkflowConfig(dto, req.user?.id);
  }

  /**
   * PUT /api/yeu-cau/workflow-config/:id
   * Cập nhật cấu hình workflow
   */
  @Put('workflow-config/:id')
  @Quyen('YEU_CAU_ADMIN')
  async capNhatWorkflowConfig(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CapNhatWorkflowConfigDto,
    @Request() req: any,
  ) {
    return this.yeuCauService.capNhatWorkflowConfig(id, dto, req.user?.id);
  }
}
