// Controller Sản Lượng - Chia hàng & Giao hàng
import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  Query,
  UseGuards,
  ParseIntPipe,
  Req,
} from '@nestjs/common';
import { SanLuongService } from './san-luong.service';
import {
  ChiaHangRowDto,
  GiaoHangRowDto,
  ConfirmChiaHangDto,
  ConfirmGiaoHangDto,
  AdminSuaChiaHangDto,
  AdminSuaGiaoHangDto,
  QuerySanLuongDto,
  QueryLichSuImportDto,
} from './san-luong.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { VaiTro } from '../../common/decorators/vai-tro.decorator';

@Controller('san-luong')
@UseGuards(JwtAuthGuard, RolesGuard)
export class SanLuongController {
  constructor(private readonly sanLuongService: SanLuongService) {}

  // =============== EMPLOYEE PORTAL ===============

  /**
   * GET /api/san-luong/my-stats
   * [Employee Portal] Lấy sản lượng của nhân viên hiện tại
   */
  @Get('my-stats')
  async laySanLuongCuaToi(
    @Query('thang') thang: number,
    @Query('nam') nam: number,
    @Req() req: any,
  ) {
    const nhanVienId = req.user?.nhanVienId;
    if (!nhanVienId) return { data: null };
    return this.sanLuongService.laySanLuongNhanVien(nhanVienId, thang || new Date().getMonth() + 1, nam || new Date().getFullYear());
  }

  // =============== CHIA HÀNG ===============

  /**
   * Preview import chia hàng
   */
  @Post('chia-hang/preview')
  @VaiTro('ADMIN', 'HR', 'IMPORT_CHIA_HANG')
  async previewChiaHang(
    @Body('rows') rows: ChiaHangRowDto[],
    @Body('thang') thang: number,
    @Body('nam') nam: number,
  ) {
    return this.sanLuongService.previewChiaHang(rows, thang, nam);
  }

  /**
   * Confirm import chia hàng
   */
  @Post('chia-hang/confirm')
  @VaiTro('ADMIN', 'HR', 'IMPORT_CHIA_HANG')
  async confirmChiaHang(@Body() dto: ConfirmChiaHangDto, @Req() req: any) {
    const nguoiImportId = req.user?.id || 1;
    return this.sanLuongService.confirmChiaHang(
      dto.rows,
      dto.tenFile,
      dto.fileHash,
      nguoiImportId,
    );
  }

  /**
   * Lấy danh sách sản lượng chia hàng
   */
  @Get('chia-hang')
  @VaiTro('ADMIN', 'HR', 'IMPORT_CHIA_HANG', 'PAYROLL_OPERATOR')
  async layDanhSachChiaHang(@Query() query: QuerySanLuongDto) {
    return this.sanLuongService.layDanhSachChiaHang(query);
  }

  /**
   * Admin sửa sản lượng chia hàng
   */
  @Put('admin/chia-hang/:id')
  @VaiTro('ADMIN')
  async adminSuaChiaHang(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: AdminSuaChiaHangDto,
    @Req() req: any,
  ) {
    const nguoiSuaId = req.user?.id || 1;
    return this.sanLuongService.adminSuaChiaHang(id, dto, nguoiSuaId);
  }

  // =============== GIAO HÀNG ===============

  /**
   * Preview import giao hàng
   */
  @Post('giao-hang/preview')
  @VaiTro('ADMIN', 'HR', 'IMPORT_GIAO_HANG')
  async previewGiaoHang(
    @Body('rows') rows: GiaoHangRowDto[],
    @Body('thang') thang: number,
    @Body('nam') nam: number,
  ) {
    return this.sanLuongService.previewGiaoHang(rows, thang, nam);
  }

  /**
   * Confirm import giao hàng
   */
  @Post('giao-hang/confirm')
  @VaiTro('ADMIN', 'HR', 'IMPORT_GIAO_HANG')
  async confirmGiaoHang(@Body() dto: ConfirmGiaoHangDto, @Req() req: any) {
    const nguoiImportId = req.user?.id || 1;
    return this.sanLuongService.confirmGiaoHang(
      dto.rows,
      dto.tenFile,
      dto.fileHash,
      nguoiImportId,
    );
  }

  /**
   * Lấy danh sách giao hàng
   */
  @Get('giao-hang')
  @VaiTro('ADMIN', 'HR', 'IMPORT_GIAO_HANG', 'PAYROLL_OPERATOR')
  async layDanhSachGiaoHang(@Query() query: QuerySanLuongDto) {
    return this.sanLuongService.layDanhSachGiaoHang(query);
  }

  /**
   * Admin sửa giao hàng
   */
  @Put('admin/giao-hang/:id')
  @VaiTro('ADMIN')
  async adminSuaGiaoHang(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: AdminSuaGiaoHangDto,
    @Req() req: any,
  ) {
    const nguoiSuaId = req.user?.id || 1;
    return this.sanLuongService.adminSuaGiaoHang(id, dto, nguoiSuaId);
  }

  // =============== LỊCH SỬ IMPORT ===============

  /**
   * Lấy lịch sử import
   */
  @Get('lich-su-import')
  @VaiTro('ADMIN', 'HR', 'IMPORT_CHIA_HANG', 'IMPORT_GIAO_HANG', 'PAYROLL_OPERATOR')
  async layLichSuImport(@Query() query: QueryLichSuImportDto) {
    return this.sanLuongService.layLichSuImport(query);
  }

  /**
   * Lấy chi tiết lịch sử import
   */
  @Get('lich-su-import/:id')
  @VaiTro('ADMIN', 'HR', 'IMPORT_CHIA_HANG', 'IMPORT_GIAO_HANG', 'PAYROLL_OPERATOR')
  async layLichSuImportTheoId(@Param('id', ParseIntPipe) id: number) {
    return this.sanLuongService.layLichSuImportTheoId(id);
  }

  // =============== SNAPSHOT ===============

  /**
   * Tạo snapshot sản lượng cho bảng lương
   */
  @Post('snapshot/:bangLuongId')
  @VaiTro('ADMIN', 'HR', 'PAYROLL_OPERATOR')
  async taoSnapshot(
    @Param('bangLuongId', ParseIntPipe) bangLuongId: number,
    @Body('thang') thang: number,
    @Body('nam') nam: number,
  ) {
    return this.sanLuongService.taoSnapshotSanLuong(bangLuongId, thang, nam);
  }

  /**
   * Lấy snapshot sản lượng cho Rule Engine
   */
  @Get('snapshot/:bangLuongId/:nhanVienId')
  @VaiTro('ADMIN', 'HR', 'PAYROLL_OPERATOR')
  async laySnapshot(
    @Param('bangLuongId', ParseIntPipe) bangLuongId: number,
    @Param('nhanVienId', ParseIntPipe) nhanVienId: number,
  ) {
    return this.sanLuongService.laySnapshotSanLuong(bangLuongId, nhanVienId);
  }
}
