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
  Req,
  Res,
  ParseIntPipe,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiHeader } from '@nestjs/swagger';
import type { Request, Response } from 'express';
import { RBACService } from './rbac.service';
import { CongKhai, VaiTro, ThrottleLogin } from '../../common/decorators';
import {
  AUTH_COOKIE_NAME,
  CSRF_COOKIE_NAME,
  extractAuthTokenFromRequest,
  generateOpaqueToken,
} from '../../common/utils/http-auth.util';
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

  private ensureBootstrapAllowed() {
    const isProduction = process.env.NODE_ENV === 'production';
    const allowBootstrap = process.env.ALLOW_RBAC_BOOTSTRAP === 'true';

    if (isProduction && !allowBootstrap) {
      throw new ForbiddenException('RBAC bootstrap bị chặn trên production');
    }
  }

  // ============================================
  // XÁC THỰC
  // ============================================

  @CongKhai()
  @ThrottleLogin() // Rate limit: 5 lần/phút chống brute force
  @Post('dang-nhap')
  @ApiOperation({ summary: 'Đăng nhập' })
  dangNhap(
    @Body() dto: DangNhapDto,
    @Ip() ip: string,
    @Headers('user-agent') userAgent: string,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.rbacService.dangNhap(dto, ip, userAgent).then((data) => {
      const forwardedProto = req.headers['x-forwarded-proto'];
      const isHttps = req.secure || forwardedProto === 'https';
      const secure = process.env.NODE_ENV === 'production' ? isHttps : false;
      const sameSite = secure ? 'none' : 'lax';
      const csrfToken = generateOpaqueToken(24);
      const expires = new Date(data.hetHan);

      res.cookie(AUTH_COOKIE_NAME, data.token, {
        httpOnly: true,
        secure,
        sameSite,
        expires,
        path: '/',
      });

      res.cookie(CSRF_COOKIE_NAME, csrfToken, {
        httpOnly: false,
        secure,
        sameSite,
        expires,
        path: '/',
      });

      return data;
    });
  }

  @Post('dang-xuat')
  @ApiOperation({ summary: 'Đăng xuất' })
  @ApiHeader({ name: 'Authorization', description: 'Bearer token' })
  dangXuat(
    @Req() req: Request,
    @Headers('authorization') auth: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    const token = extractAuthTokenFromRequest({
      headers: {
        authorization: auth,
        cookie: req.headers.cookie,
      },
    });

    if (!token) {
      throw new UnauthorizedException('Token không hợp lệ');
    }

    const forwardedProto = req.headers['x-forwarded-proto'];
    const isHttps = req.secure || forwardedProto === 'https';
    const secure = process.env.NODE_ENV === 'production' ? isHttps : false;
    const sameSite = secure ? 'none' : 'lax';

    res.cookie(AUTH_COOKIE_NAME, '', {
      httpOnly: true,
      secure,
      sameSite,
      expires: new Date(0),
      path: '/',
    });

    res.cookie(CSRF_COOKIE_NAME, '', {
      httpOnly: false,
      secure,
      sameSite,
      expires: new Date(0),
      path: '/',
    });

    return this.rbacService.dangXuat(token);
  }

  @Get('kiem-tra-token')
  @ApiOperation({ summary: 'Kiểm tra token' })
  @ApiHeader({ name: 'Authorization', description: 'Bearer token' })
  kiemTraToken(@Req() req: Request, @Headers('authorization') auth: string) {
    const token = extractAuthTokenFromRequest({
      headers: {
        authorization: auth,
        cookie: req.headers.cookie,
      },
    });

    if (!token) {
      throw new UnauthorizedException('Token không hợp lệ');
    }

    return this.rbacService.kiemTraToken(token);
  }

  // ============================================
  // NGƯỜI DÙNG
  // ============================================

  @VaiTro('ADMIN')
  @Get('nguoi-dung')
  @ApiOperation({ summary: 'Lấy danh sách người dùng' })
  layDanhSachNguoiDung() {
    return this.rbacService.layDanhSachNguoiDung();
  }

  @VaiTro('ADMIN')
  @Get('nguoi-dung/:id')
  @ApiOperation({ summary: 'Lấy thông tin người dùng' })
  layNguoiDungTheoId(@Param('id', ParseIntPipe) id: number) {
    return this.rbacService.layNguoiDungTheoId(id);
  }

  @VaiTro('ADMIN')
  @Post('nguoi-dung')
  @ApiOperation({ summary: 'Tạo người dùng mới' })
  taoNguoiDung(@Body() dto: TaoNguoiDungDto) {
    return this.rbacService.taoNguoiDung(dto);
  }

  @VaiTro('ADMIN')
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

  @VaiTro('ADMIN')
  @Get('vai-tro')
  @ApiOperation({ summary: 'Lấy danh sách vai trò' })
  layDanhSachVaiTro() {
    return this.rbacService.layDanhSachVaiTro();
  }

  @VaiTro('ADMIN')
  @Get('vai-tro/:id')
  @ApiOperation({ summary: 'Lấy thông tin vai trò' })
  layVaiTroTheoId(@Param('id', ParseIntPipe) id: number) {
    return this.rbacService.layVaiTroTheoId(id);
  }

  @VaiTro('ADMIN')
  @Post('vai-tro')
  @ApiOperation({ summary: 'Tạo vai trò mới' })
  taoVaiTro(@Body() dto: TaoVaiTroDto) {
    return this.rbacService.taoVaiTro(dto);
  }

  @VaiTro('ADMIN')
  @Put('vai-tro/:id')
  @ApiOperation({ summary: 'Cập nhật vai trò' })
  capNhatVaiTro(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CapNhatVaiTroDto,
  ) {
    return this.rbacService.capNhatVaiTro(id, dto);
  }

  @VaiTro('ADMIN')
  @Post('vai-tro/gan')
  @ApiOperation({ summary: 'Gán vai trò cho người dùng' })
  ganVaiTroChoNguoiDung(@Body() dto: GanVaiTroDto) {
    return this.rbacService.ganVaiTroChoNguoiDung(dto);
  }

  @VaiTro('ADMIN')
  @Delete('vai-tro/go')
  @ApiOperation({ summary: 'Gỡ vai trò khỏi người dùng' })
  goVaiTroKhoiNguoiDung(@Body() dto: GanVaiTroDto) {
    return this.rbacService.goVaiTroKhoiNguoiDung(dto);
  }

  // ============================================
  // QUYỀN
  // ============================================

  @VaiTro('ADMIN')
  @Get('quyen')
  @ApiOperation({ summary: 'Lấy danh sách quyền' })
  layDanhSachQuyen() {
    return this.rbacService.layDanhSachQuyen();
  }

  @VaiTro('ADMIN')
  @Get('quyen/theo-nhom')
  @ApiOperation({ summary: 'Lấy quyền theo nhóm' })
  layQuyenTheoNhom() {
    return this.rbacService.layQuyenTheoNhom();
  }

  @VaiTro('ADMIN')
  @Post('quyen')
  @ApiOperation({ summary: 'Tạo quyền mới' })
  taoQuyen(@Body() dto: TaoQuyenDto) {
    return this.rbacService.taoQuyen(dto);
  }

  @VaiTro('ADMIN')
  @Post('quyen/gan-cho-vai-tro')
  @ApiOperation({ summary: 'Gán quyền cho vai trò' })
  ganQuyenChoVaiTro(@Body() dto: GanQuyenChoVaiTroDto) {
    return this.rbacService.ganQuyenChoVaiTro(dto);
  }

  @VaiTro('ADMIN')
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

  @VaiTro('ADMIN')
  @Get('audit-log')
  @ApiOperation({ summary: 'Tìm kiếm audit log' })
  timKiemAuditLog(@Query() dto: TimKiemAuditLogDto) {
    return this.rbacService.timKiemAuditLog(dto);
  }

  @VaiTro('ADMIN')
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

  @VaiTro('ADMIN')
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

  @VaiTro('ADMIN')
  @Post('khoi-tao/quyen')
  @ApiOperation({ summary: 'Khởi tạo quyền mặc định' })
  khoiTaoQuyenMacDinh() {
    this.ensureBootstrapAllowed();
    return this.rbacService.khoiTaoQuyenMacDinh();
  }

  @VaiTro('ADMIN')
  @Post('khoi-tao/vai-tro')
  @ApiOperation({ summary: 'Khởi tạo vai trò mặc định' })
  khoiTaoVaiTroMacDinh() {
    this.ensureBootstrapAllowed();
    return this.rbacService.khoiTaoVaiTroMacDinh();
  }

  @VaiTro('ADMIN')
  @Post('khoi-tao/admin')
  @ApiOperation({ summary: 'Khởi tạo admin mặc định' })
  khoiTaoAdminMacDinh() {
    this.ensureBootstrapAllowed();
    return this.rbacService.khoiTaoAdminMacDinh();
  }

  @VaiTro('ADMIN')
  @Post('khoi-tao/tat-ca')
  @ApiOperation({ summary: 'Khởi tạo tất cả dữ liệu mặc định' })
  async khoiTaoTatCa() {
    this.ensureBootstrapAllowed();
    await this.rbacService.khoiTaoQuyenMacDinh();
    await this.rbacService.khoiTaoVaiTroMacDinh();
    const admin = await this.rbacService.khoiTaoAdminMacDinh();
    return {
      message: 'Đã khởi tạo xong Quyền, Vai trò và Admin',
      admin,
    };
  }
}
