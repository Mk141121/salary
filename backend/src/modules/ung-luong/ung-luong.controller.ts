// Controller Bảng Ứng Lương
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
  UseGuards,
  Request,
} from '@nestjs/common';
import { UngLuongService } from './ung-luong.service';
import {
  TaoBangUngLuongDto,
  CapNhatBangUngLuongDto,
  SinhDanhSachNVDto,
  CapNhatBulkChiTietDto,
  SetTheoTiLeDto,
  SetSoTienCoDinhDto,
  GhiNhanKhauTruDto,
  MoKhoaBangUngLuongDto,
  LocBangUngLuongDto,
} from './dto';
import { CongKhai, Quyen } from '../../common/decorators';

@Controller('ung-luong')
export class UngLuongController {
  constructor(private readonly ungLuongService: UngLuongService) {}

  // ============================================
  // CRUD BẢNG ỨNG LƯƠNG
  // ============================================

  @Get('bang')
  @Quyen('UNG_LUONG_VIEW')
  async layDanhSach(@Query() dto: LocBangUngLuongDto) {
    return this.ungLuongService.layDanhSach(dto);
  }

  @Get('bang/:id')
  @Quyen('UNG_LUONG_VIEW')
  async layTheoId(@Param('id', ParseIntPipe) id: number) {
    return this.ungLuongService.layTheoId(id);
  }

  @Post('bang')
  @Quyen('UNG_LUONG_CREATE')
  async taoMoi(@Body() dto: TaoBangUngLuongDto, @Request() req: { user?: { tenDangNhap?: string } }) {
    const nguoiTao = req.user?.tenDangNhap || 'system';
    return this.ungLuongService.taoMoi(dto, nguoiTao);
  }

  @Put('bang/:id')
  @Quyen('UNG_LUONG_EDIT')
  async capNhat(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CapNhatBangUngLuongDto,
    @Request() req: { user?: { tenDangNhap?: string } },
  ) {
    const nguoiCapNhat = req.user?.tenDangNhap || 'system';
    return this.ungLuongService.capNhat(id, dto, nguoiCapNhat);
  }

  @Delete('bang/:id')
  @Quyen('UNG_LUONG_EDIT')
  async xoa(
    @Param('id', ParseIntPipe) id: number,
    @Request() req: { user?: { tenDangNhap?: string } },
  ) {
    const nguoiXoa = req.user?.tenDangNhap || 'system';
    return this.ungLuongService.xoa(id, nguoiXoa);
  }

  // ============================================
  // SINH DANH SÁCH NHÂN VIÊN
  // ============================================

  @Post('bang/:id/generate-danh-sach')
  @Quyen('UNG_LUONG_EDIT')
  async sinhDanhSachNV(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: SinhDanhSachNVDto,
    @Request() req: { user?: { tenDangNhap?: string } },
  ) {
    const nguoiTao = req.user?.tenDangNhap || 'system';
    return this.ungLuongService.sinhDanhSachNV(id, dto, nguoiTao);
  }

  // ============================================
  // CẬP NHẬT CHI TIẾT
  // ============================================

  @Put('bang/:id/rows/bulk')
  @Quyen('UNG_LUONG_EDIT')
  async capNhatBulk(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CapNhatBulkChiTietDto,
    @Request() req: { user?: { tenDangNhap?: string } },
  ) {
    const nguoiCapNhat = req.user?.tenDangNhap || 'system';
    return this.ungLuongService.capNhatBulkChiTiet(id, dto, nguoiCapNhat);
  }

  @Post('bang/:id/set-theo-ti-le')
  @Quyen('UNG_LUONG_EDIT')
  async setTheoTiLe(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: SetTheoTiLeDto,
    @Request() req: { user?: { tenDangNhap?: string } },
  ) {
    const nguoiCapNhat = req.user?.tenDangNhap || 'system';
    return this.ungLuongService.setTheoTiLe(id, dto, nguoiCapNhat);
  }

  @Post('bang/:id/set-so-tien-co-dinh')
  @Quyen('UNG_LUONG_EDIT')
  async setSoTienCoDinh(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: SetSoTienCoDinhDto,
    @Request() req: { user?: { tenDangNhap?: string } },
  ) {
    const nguoiCapNhat = req.user?.tenDangNhap || 'system';
    return this.ungLuongService.setSoTienCoDinh(id, dto, nguoiCapNhat);
  }

  // ============================================
  // WORKFLOW: CHỐT / KHÓA / MỞ KHÓA
  // ============================================

  @Post('bang/:id/chot')
  @Quyen('UNG_LUONG_CHOT')
  async chotBang(
    @Param('id', ParseIntPipe) id: number,
    @Request() req: { user?: { tenDangNhap?: string } },
  ) {
    const nguoiChot = req.user?.tenDangNhap || 'system';
    return this.ungLuongService.chotBang(id, nguoiChot);
  }

  @Post('bang/:id/khoa')
  @Quyen('UNG_LUONG_KHOA')
  async khoaBang(
    @Param('id', ParseIntPipe) id: number,
    @Request() req: { user?: { tenDangNhap?: string } },
  ) {
    const nguoiKhoa = req.user?.tenDangNhap || 'system';
    return this.ungLuongService.khoaBang(id, nguoiKhoa);
  }

  @Post('bang/:id/mo-khoa')
  @Quyen('UNG_LUONG_KHOA') // Admin permission
  async moKhoaBang(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: MoKhoaBangUngLuongDto,
    @Request() req: { user?: { tenDangNhap?: string } },
  ) {
    const nguoiMoKhoa = req.user?.tenDangNhap || 'system';
    return this.ungLuongService.moKhoaBang(id, dto, nguoiMoKhoa);
  }

  // ============================================
  // GHI NHẬN KHẤU TRỪ
  // ============================================

  @Post('bang/:id/ghi-nhan-khau-tru')
  @Quyen('UNG_LUONG_CHOT')
  async ghiNhanKhauTru(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: GhiNhanKhauTruDto,
    @Request() req: { user?: { tenDangNhap?: string } },
  ) {
    const nguoiThucHien = req.user?.tenDangNhap || 'system';
    return this.ungLuongService.ghiNhanKhauTru(id, dto, nguoiThucHien);
  }

  // ============================================
  // SNAPSHOT / TRACE
  // ============================================

  @Get('bang/:id/snapshot')
  @Quyen('UNG_LUONG_VIEW')
  async laySnapshot(@Param('id', ParseIntPipe) id: number) {
    return this.ungLuongService.laySnapshot(id);
  }
}
