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
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { KPIService } from './kpi.service';
import {
  TaoTemplateKPIDto,
  CapNhatTemplateKPIDto,
  TaoChiTieuKPIDto,
  TaoKyDanhGiaDto,
  CapNhatTrangThaiKyDto,
  TaoDanhGiaKPIDto,
  CapNhatKetQuaKPIDto,
  DuyetDanhGiaKPIDto,
  TuChoiDanhGiaKPIDto,
  TaoCauHinhThuongDto,
  TinhThuongKPIDto,
} from './dto/kpi.dto';
import { Quyen, VaiTro } from '../../common';

@ApiTags('KPI & Thưởng')
@Controller('kpi')
@Quyen('KPI_XEM') // Mặc định cần quyền xem KPI
export class KPIController {
  constructor(private readonly kpiService: KPIService) {}

  // ============================================
  // TEMPLATE KPI
  // ============================================

  @Get('template')
  @ApiOperation({ summary: 'Lấy danh sách template KPI' })
  @ApiQuery({ name: 'phongBanId', required: false })
  layDanhSachTemplate(@Query('phongBanId') phongBanId?: string) {
    return this.kpiService.layDanhSachTemplate(
      phongBanId ? parseInt(phongBanId) : undefined,
    );
  }

  @Get('template/:id')
  @ApiOperation({ summary: 'Lấy template KPI theo ID' })
  layTemplateTheoId(@Param('id', ParseIntPipe) id: number) {
    return this.kpiService.layTemplateTheoId(id);
  }

  @Post('template')
  @ApiOperation({ summary: 'Tạo template KPI mới' })
  taoTemplate(@Body() dto: TaoTemplateKPIDto) {
    return this.kpiService.taoTemplate(dto);
  }

  @Put('template/:id')
  @ApiOperation({ summary: 'Cập nhật template KPI' })
  capNhatTemplate(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CapNhatTemplateKPIDto,
  ) {
    return this.kpiService.capNhatTemplate(id, dto);
  }

  @Post('template/:id/chi-tieu')
  @ApiOperation({ summary: 'Thêm chỉ tiêu vào template' })
  themChiTieu(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: TaoChiTieuKPIDto,
  ) {
    return this.kpiService.themChiTieu(id, dto);
  }

  @Delete('chi-tieu/:id')
  @ApiOperation({ summary: 'Xóa chỉ tiêu KPI' })
  xoaChiTieu(@Param('id', ParseIntPipe) id: number) {
    return this.kpiService.xoaChiTieu(id);
  }

  // ============================================
  // KỲ ĐÁNH GIÁ
  // ============================================

  @Get('ky-danh-gia')
  @ApiOperation({ summary: 'Lấy danh sách kỳ đánh giá' })
  @ApiQuery({ name: 'nam', required: false })
  layDanhSachKyDanhGia(@Query('nam') nam?: string) {
    return this.kpiService.layDanhSachKyDanhGia(nam ? parseInt(nam) : undefined);
  }

  @Get('ky-danh-gia/:id')
  @ApiOperation({ summary: 'Lấy chi tiết kỳ đánh giá' })
  layKyDanhGiaTheoId(@Param('id', ParseIntPipe) id: number) {
    return this.kpiService.layKyDanhGiaTheoId(id);
  }

  @Post('ky-danh-gia')
  @ApiOperation({ summary: 'Tạo kỳ đánh giá mới' })
  taoKyDanhGia(@Body() dto: TaoKyDanhGiaDto) {
    return this.kpiService.taoKyDanhGia(dto);
  }

  @Put('ky-danh-gia/:id/trang-thai')
  @ApiOperation({ summary: 'Cập nhật trạng thái kỳ đánh giá' })
  capNhatTrangThaiKy(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CapNhatTrangThaiKyDto,
  ) {
    return this.kpiService.capNhatTrangThaiKy(id, dto);
  }

  // ============================================
  // ĐÁNH GIÁ NHÂN VIÊN
  // ============================================

  @Post('danh-gia')
  @ApiOperation({ summary: 'Tạo đánh giá KPI cho nhân viên' })
  taoDanhGiaKPI(@Body() dto: TaoDanhGiaKPIDto) {
    return this.kpiService.taoDanhGiaKPI(dto);
  }

  @Put('danh-gia/:id')
  @ApiOperation({ summary: 'Cập nhật kết quả KPI' })
  capNhatKetQuaKPI(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CapNhatKetQuaKPIDto,
  ) {
    return this.kpiService.capNhatKetQuaKPI(id, dto);
  }

  @Post('danh-gia/:id/gui-duyet')
  @ApiOperation({ summary: 'Gửi đánh giá để duyệt' })
  guiDuyet(@Param('id', ParseIntPipe) id: number) {
    return this.kpiService.guiDuyet(id);
  }

  @Put('danh-gia/:id/duyet')
  @ApiOperation({ summary: 'Duyệt đánh giá KPI' })
  duyetDanhGia(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: DuyetDanhGiaKPIDto,
  ) {
    return this.kpiService.duyetDanhGia(id, dto);
  }

  @Put('danh-gia/:id/tu-choi')
  @ApiOperation({ summary: 'Từ chối đánh giá KPI' })
  tuChoiDanhGia(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: TuChoiDanhGiaKPIDto,
  ) {
    return this.kpiService.tuChoiDanhGia(id, dto.lyDoTuChoi);
  }

  // ============================================
  // CẤU HÌNH THƯỞNG
  // ============================================

  @Get('cau-hinh-thuong/:nam')
  @ApiOperation({ summary: 'Lấy cấu hình thưởng theo năm' })
  layCauHinhThuong(@Param('nam', ParseIntPipe) nam: number) {
    return this.kpiService.layCauHinhThuong(nam);
  }

  @Post('cau-hinh-thuong')
  @ApiOperation({ summary: 'Lưu cấu hình thưởng' })
  luuCauHinhThuong(@Body() dto: TaoCauHinhThuongDto) {
    return this.kpiService.luuCauHinhThuong(dto);
  }

  @Post('cau-hinh-thuong/khoi-tao/:nam')
  @ApiOperation({ summary: 'Khởi tạo cấu hình thưởng mặc định' })
  khoiTaoCauHinhThuongMacDinh(@Param('nam', ParseIntPipe) nam: number) {
    return this.kpiService.khoiTaoCauHinhThuongMacDinh(nam);
  }

  // ============================================
  // TÍNH THƯỞNG
  // ============================================

  @Post('tinh-thuong')
  @ApiOperation({ summary: 'Tính thưởng KPI cho kỳ đánh giá' })
  tinhThuongKPI(@Body() dto: TinhThuongKPIDto) {
    return this.kpiService.tinhThuongKPI(dto);
  }

  // ============================================
  // BÁO CÁO
  // ============================================

  @Get('bao-cao/theo-phong-ban/:kyDanhGiaId')
  @ApiOperation({ summary: 'Báo cáo KPI theo phòng ban' })
  baoCaoKPITheoPhongBan(@Param('kyDanhGiaId', ParseIntPipe) kyDanhGiaId: number) {
    return this.kpiService.baoCaoKPITheoPhongBan(kyDanhGiaId);
  }
}
