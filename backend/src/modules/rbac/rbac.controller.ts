import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  Headers,
  Ip,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiHeader } from '@nestjs/swagger';
import { RBACService } from './rbac.service';
import {
  TaoNguoiDungDto,
  CapNhatNguoiDungDto,
  DoiMatKhauDto,
  DangNhapDto,
  TaoVaiTroDto,
  CapNhatVaiTroDto,
  GanVaiTroDto,
  TaoQuyenDto,
  GanQuyenChoVaiTroDto,
  TimKiemAuditLogDto,
} from './dto/rbac.dto';

@ApiTags('RBAC & Audit')
@Controller('rbac')
export class RBACController {
  constructor(private readonly rbacService: RBACService) {}

  // ============================================
  // XÁC THỰC
  // ============================================

  @Post('dang-nhap')
  @ApiOperation({ summary: 'Đăng nhập' })
  dangNhap(
    @Body() dto: DangNhapDto,
    @Ip() ip: string,
    @Headers('user-agent') userAgent: string,
  ) {
    return this.rbacService.dangNhap(dto, ip, userAgent);
  }

  @Post('dang-xuat')
  @ApiOperation({ summary: 'Đăng xuất' })
  @ApiHeader({ name: 'Authorization', description: 'Bearer token' })
  dangXuat(@Headers('authorization') auth: string) {
    const token = auth?.replace('Bearer ', '');
    return this.rbacService.dangXuat(token);
  }

  @Get('kiem-tra-token')
  @ApiOperation({ summary: 'Kiểm tra token' })
  @ApiHeader({ name: 'Authorization', description: 'Bearer token' })
  kiemTraToken(@Headers('authorization') auth: string) {
    const token = auth?.replace('Bearer ', '');
    return this.rbacService.kiemTraToken(token);
  }

  // ============================================
  // NGƯỜI DÙNG
  // ============================================

  @Get('nguoi-dung')
  @ApiOperation({ summary: 'Lấy danh sách người dùng' })
  layDanhSachNguoiDung() {
    return this.rbacService.layDanhSachNguoiDung();
  }

  @Get('nguoi-dung/:id')
  @ApiOperation({ summary: 'Lấy thông tin người dùng' })
  layNguoiDungTheoId(@Param('id', ParseIntPipe) id: number) {
    return this.rbacService.layNguoiDungTheoId(id);
  }

  @Post('nguoi-dung')
  @ApiOperation({ summary: 'Tạo người dùng mới' })
  taoNguoiDung(@Body() dto: TaoNguoiDungDto) {
    return this.rbacService.taoNguoiDung(dto);
  }

  @Put('nguoi-dung/:id')
  @ApiOperation({ summary: 'Cập nhật người dùng' })
  capNhatNguoiDung(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CapNhatNguoiDungDto,
  ) {
    return this.rbacService.capNhatNguoiDung(id, dto);
  }

  @Put('nguoi-dung/:id/doi-mat-khau')
  @ApiOperation({ summary: 'Đổi mật khẩu' })
  doiMatKhau(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: DoiMatKhauDto,
  ) {
    return this.rbacService.doiMatKhau(id, dto);
  }

  // ============================================
  // VAI TRÒ
  // ============================================

  @Get('vai-tro')
  @ApiOperation({ summary: 'Lấy danh sách vai trò' })
  layDanhSachVaiTro() {
    return this.rbacService.layDanhSachVaiTro();
  }

  @Get('vai-tro/:id')
  @ApiOperation({ summary: 'Lấy thông tin vai trò' })
  layVaiTroTheoId(@Param('id', ParseIntPipe) id: number) {
    return this.rbacService.layVaiTroTheoId(id);
  }

  @Post('vai-tro')
  @ApiOperation({ summary: 'Tạo vai trò mới' })
  taoVaiTro(@Body() dto: TaoVaiTroDto) {
    return this.rbacService.taoVaiTro(dto);
  }

  @Put('vai-tro/:id')
  @ApiOperation({ summary: 'Cập nhật vai trò' })
  capNhatVaiTro(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CapNhatVaiTroDto,
  ) {
    return this.rbacService.capNhatVaiTro(id, dto);
  }

  @Post('vai-tro/gan')
  @ApiOperation({ summary: 'Gán vai trò cho người dùng' })
  ganVaiTroChoNguoiDung(@Body() dto: GanVaiTroDto) {
    return this.rbacService.ganVaiTroChoNguoiDung(dto);
  }

  @Delete('vai-tro/go')
  @ApiOperation({ summary: 'Gỡ vai trò khỏi người dùng' })
  goVaiTroKhoiNguoiDung(@Body() dto: GanVaiTroDto) {
    return this.rbacService.goVaiTroKhoiNguoiDung(dto);
  }

  // ============================================
  // QUYỀN
  // ============================================

  @Get('quyen')
  @ApiOperation({ summary: 'Lấy danh sách quyền' })
  layDanhSachQuyen() {
    return this.rbacService.layDanhSachQuyen();
  }

  @Get('quyen/theo-nhom')
  @ApiOperation({ summary: 'Lấy quyền theo nhóm' })
  layQuyenTheoNhom() {
    return this.rbacService.layQuyenTheoNhom();
  }

  @Post('quyen')
  @ApiOperation({ summary: 'Tạo quyền mới' })
  taoQuyen(@Body() dto: TaoQuyenDto) {
    return this.rbacService.taoQuyen(dto);
  }

  @Post('quyen/gan-cho-vai-tro')
  @ApiOperation({ summary: 'Gán quyền cho vai trò' })
  ganQuyenChoVaiTro(@Body() dto: GanQuyenChoVaiTroDto) {
    return this.rbacService.ganQuyenChoVaiTro(dto);
  }

  @Get('kiem-tra-quyen/:nguoiDungId/:maQuyen')
  @ApiOperation({ summary: 'Kiểm tra quyền của người dùng' })
  async kiemTraQuyen(
    @Param('nguoiDungId', ParseIntPipe) nguoiDungId: number,
    @Param('maQuyen') maQuyen: string,
  ) {
    const coQuyen = await this.rbacService.kiemTraQuyen(nguoiDungId, maQuyen);
    return { coQuyen };
  }

  // ============================================
  // AUDIT LOG
  // ============================================

  @Get('audit-log')
  @ApiOperation({ summary: 'Tìm kiếm audit log' })
  timKiemAuditLog(@Query() dto: TimKiemAuditLogDto) {
    return this.rbacService.timKiemAuditLog(dto);
  }

  @Get('audit-log/nguoi-dung/:nguoiDungId')
  @ApiOperation({ summary: 'Lấy audit log theo người dùng' })
  layAuditLogTheoNguoiDung(
    @Param('nguoiDungId', ParseIntPipe) nguoiDungId: number,
    @Query('limit') limit?: string,
  ) {
    return this.rbacService.layAuditLogTheoNguoiDung(
      nguoiDungId,
      limit ? parseInt(limit) : 50,
    );
  }

  @Get('audit-log/ban-ghi/:bangDuLieu/:banGhiId')
  @ApiOperation({ summary: 'Lấy audit log theo bản ghi' })
  layAuditLogTheoBanGhi(
    @Param('bangDuLieu') bangDuLieu: string,
    @Param('banGhiId') banGhiId: string,
  ) {
    return this.rbacService.layAuditLogTheoBanGhi(bangDuLieu, banGhiId);
  }

  // ============================================
  // KHỞI TẠO
  // ============================================

  @Post('khoi-tao/quyen')
  @ApiOperation({ summary: 'Khởi tạo quyền mặc định' })
  khoiTaoQuyenMacDinh() {
    return this.rbacService.khoiTaoQuyenMacDinh();
  }

  @Post('khoi-tao/vai-tro')
  @ApiOperation({ summary: 'Khởi tạo vai trò mặc định' })
  khoiTaoVaiTroMacDinh() {
    return this.rbacService.khoiTaoVaiTroMacDinh();
  }

  @Post('khoi-tao/admin')
  @ApiOperation({ summary: 'Khởi tạo admin mặc định' })
  khoiTaoAdminMacDinh() {
    return this.rbacService.khoiTaoAdminMacDinh();
  }

  @Post('khoi-tao/tat-ca')
  @ApiOperation({ summary: 'Khởi tạo tất cả dữ liệu mặc định' })
  async khoiTaoTatCa() {
    await this.rbacService.khoiTaoQuyenMacDinh();
    await this.rbacService.khoiTaoVaiTroMacDinh();
    const admin = await this.rbacService.khoiTaoAdminMacDinh();
    return {
      message: 'Đã khởi tạo xong Quyền, Vai trò và Admin',
      admin,
    };
  }
}
