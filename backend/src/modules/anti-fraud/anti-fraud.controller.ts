// Controller Anti-fraud - Sprint 7 & 8
// API endpoints cho GPS + Geofence + Device Binding
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
  Headers,
  Ip,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AntiFraudService } from './anti-fraud.service';
import {
  TaoGeofenceDto,
  CapNhatGeofenceDto,
  GPSCheckinDto,
  GeofenceQueryDto,
  GPSLogQueryDto,
  BindDeviceDto,
  ResetDeviceDto,
  DeviceQueryDto,
  LichSuThietBiQueryDto,
} from './anti-fraud.dto';

@ApiTags('Anti-fraud (GPS & Geofence)')
@ApiBearerAuth()
@Controller('anti-fraud')
export class AntiFraudController {
  constructor(private readonly service: AntiFraudService) {}

  // =============== GEOFENCE ENDPOINTS ===============

  /**
   * GET /api/anti-fraud/geofence
   * Lấy danh sách cấu hình geofence
   */
  @Get('geofence')
  @ApiOperation({ summary: 'Lấy danh sách geofence' })
  async layDanhSachGeofence(@Query() query: GeofenceQueryDto) {
    return this.service.layDanhSachGeofence(query);
  }

  /**
   * GET /api/anti-fraud/geofence/:id
   * Lấy chi tiết 1 geofence
   */
  @Get('geofence/:id')
  @ApiOperation({ summary: 'Lấy chi tiết geofence' })
  async layGeofence(@Param('id', ParseIntPipe) id: number) {
    return this.service.layGeofence(id);
  }

  /**
   * POST /api/anti-fraud/geofence
   * Tạo geofence mới
   */
  @Post('geofence')
  @ApiOperation({ summary: 'Tạo geofence mới' })
  async taoGeofence(@Body() dto: TaoGeofenceDto, @Request() req: any) {
    return this.service.taoGeofence(dto, req.user?.id);
  }

  /**
   * PUT /api/anti-fraud/geofence/:id
   * Cập nhật geofence
   */
  @Put('geofence/:id')
  @ApiOperation({ summary: 'Cập nhật geofence' })
  async capNhatGeofence(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CapNhatGeofenceDto,
    @Request() req: any,
  ) {
    return this.service.capNhatGeofence(id, dto, req.user?.id);
  }

  /**
   * DELETE /api/anti-fraud/geofence/:id
   * Xóa geofence
   */
  @Delete('geofence/:id')
  @ApiOperation({ summary: 'Xóa geofence' })
  async xoaGeofence(@Param('id', ParseIntPipe) id: number) {
    return this.service.xoaGeofence(id);
  }

  // =============== GPS CHECK-IN/OUT ENDPOINTS ===============

  /**
   * GET /api/anti-fraud/my-geofence
   * Lấy danh sách geofence áp dụng cho nhân viên đang đăng nhập
   */
  @Get('my-geofence')
  @ApiOperation({ summary: 'Lấy geofence của tôi' })
  async layGeofenceCuaToi(@Request() req: any) {
    // Lấy nhanVienId từ nguoiDung
    const nguoiDung = await this.service['prisma'].nguoiDung.findUnique({
      where: { id: req.user.id },
      select: { nhanVienId: true },
    });

    if (!nguoiDung?.nhanVienId) {
      return [];
    }

    return this.service.layGeofenceChoNhanVien(nguoiDung.nhanVienId);
  }

  /**
   * POST /api/anti-fraud/gps-checkin
   * GPS Check-in hoặc Check-out
   */
  @Post('gps-checkin')
  @ApiOperation({ summary: 'GPS Check-in/Check-out' })
  async gpsCheckin(
    @Body() dto: GPSCheckinDto,
    @Request() req: any,
    @Headers('user-agent') userAgent: string,
    @Ip() ipAddress: string,
  ) {
    // Lấy nhanVienId từ nguoiDung
    const nguoiDung = await this.service['prisma'].nguoiDung.findUnique({
      where: { id: req.user.id },
      select: { nhanVienId: true },
    });

    if (!nguoiDung?.nhanVienId) {
      throw new Error('Tài khoản chưa liên kết với nhân viên');
    }

    return this.service.gpsCheckin(nguoiDung.nhanVienId, dto, {
      userAgent,
      ipAddress,
    });
  }

  // =============== GPS LOGS ENDPOINTS ===============

  /**
   * GET /api/anti-fraud/gps-logs
   * Lấy lịch sử GPS logs (dành cho HR/Admin)
   */
  @Get('gps-logs')
  @ApiOperation({ summary: 'Lấy lịch sử GPS logs' })
  async layLichSuGPS(@Query() query: GPSLogQueryDto) {
    return this.service.layLichSuGPS(query);
  }

  /**
   * GET /api/anti-fraud/my-gps-logs
   * Lấy lịch sử GPS logs của nhân viên đang đăng nhập
   */
  @Get('my-gps-logs')
  @ApiOperation({ summary: 'Lấy lịch sử GPS của tôi' })
  async layLichSuGPSCuaToi(@Request() req: any, @Query() query: GPSLogQueryDto) {
    const nguoiDung = await this.service['prisma'].nguoiDung.findUnique({
      where: { id: req.user.id },
      select: { nhanVienId: true },
    });

    if (!nguoiDung?.nhanVienId) {
      return { data: [], total: 0, page: 1, limit: 20, totalPages: 0 };
    }

    return this.service.layLichSuGPS({
      ...query,
      nhanVienId: nguoiDung.nhanVienId,
    });
  }

  /**
   * GET /api/anti-fraud/thong-ke
   * Thống kê GPS logs
   */
  @Get('thong-ke')
  @ApiOperation({ summary: 'Thống kê GPS' })
  async thongKeGPS(
    @Query('tuNgay') tuNgay: string,
    @Query('denNgay') denNgay: string,
    @Query('phongBanId') phongBanId?: number,
  ) {
    return this.service.thongKeGPS(tuNgay, denNgay, phongBanId);
  }

  // =============== SPRINT 8: DEVICE BINDING ENDPOINTS ===============

  /**
   * GET /api/anti-fraud/devices
   * Lấy danh sách thiết bị đã đăng ký (HR/Admin)
   */
  @Get('devices')
  @ApiOperation({ summary: 'Lấy danh sách thiết bị đã đăng ký' })
  async layDanhSachThietBi(@Query() query: DeviceQueryDto) {
    return this.service.layDanhSachThietBi(query);
  }

  /**
   * GET /api/anti-fraud/devices/:nhanVienId
   * Lấy thiết bị của 1 nhân viên
   */
  @Get('devices/:nhanVienId')
  @ApiOperation({ summary: 'Lấy thiết bị của nhân viên' })
  async layThietBiNhanVien(@Param('nhanVienId', ParseIntPipe) nhanVienId: number) {
    return this.service.layThietBiNhanVien(nhanVienId);
  }

  /**
   * GET /api/anti-fraud/my-device
   * Lấy thiết bị của tôi
   */
  @Get('my-device')
  @ApiOperation({ summary: 'Lấy thiết bị của tôi' })
  async layThietBiCuaToi(@Request() req: any) {
    const nguoiDung = await this.service['prisma'].nguoiDung.findUnique({
      where: { id: req.user.id },
      select: { nhanVienId: true },
    });

    if (!nguoiDung?.nhanVienId) {
      return null;
    }

    return this.service.layThietBiNhanVien(nguoiDung.nhanVienId);
  }

  /**
   * POST /api/anti-fraud/check-device
   * Kiểm tra device có hợp lệ không (gọi khi login)
   */
  @Post('check-device')
  @ApiOperation({ summary: 'Kiểm tra thiết bị có hợp lệ không' })
  async kiemTraDevice(
    @Body('deviceId') deviceId: string,
    @Request() req: any,
  ) {
    const nguoiDung = await this.service['prisma'].nguoiDung.findUnique({
      where: { id: req.user.id },
      select: { nhanVienId: true },
    });

    if (!nguoiDung?.nhanVienId) {
      return { isValid: true, isBound: false, message: 'Tài khoản không liên kết nhân viên' };
    }

    return this.service.kiemTraDevice(nguoiDung.nhanVienId, deviceId);
  }

  /**
   * POST /api/anti-fraud/bind-device
   * Đăng ký thiết bị (lần đầu login hoặc sau reset)
   */
  @Post('bind-device')
  @ApiOperation({ summary: 'Đăng ký thiết bị' })
  async bindDevice(
    @Body() dto: BindDeviceDto,
    @Request() req: any,
    @Headers('user-agent') userAgent: string,
    @Ip() ipAddress: string,
  ) {
    const nguoiDung = await this.service['prisma'].nguoiDung.findUnique({
      where: { id: req.user.id },
      select: { nhanVienId: true },
    });

    if (!nguoiDung?.nhanVienId) {
      throw new Error('Tài khoản chưa liên kết với nhân viên');
    }

    return this.service.bindDevice(nguoiDung.nhanVienId, dto, { userAgent, ipAddress });
  }

  /**
   * POST /api/anti-fraud/reset-device
   * Reset thiết bị cho nhân viên (HR/Admin)
   */
  @Post('reset-device')
  @ApiOperation({ summary: 'Reset thiết bị cho nhân viên' })
  async resetDevice(
    @Body() dto: ResetDeviceDto,
    @Request() req: any,
    @Ip() ipAddress: string,
    @Headers('user-agent') userAgent: string,
  ) {
    // Lấy nhanVienId của người thực hiện (HR/Admin)
    const nguoiDung = await this.service['prisma'].nguoiDung.findUnique({
      where: { id: req.user.id },
      select: { nhanVienId: true },
    });

    const nguoiThucHienId = nguoiDung?.nhanVienId || req.user.id;

    return this.service.resetDevice(dto, nguoiThucHienId, { ipAddress, userAgent });
  }

  /**
   * POST /api/anti-fraud/block-device/:nhanVienId
   * Khóa thiết bị
   */
  @Post('block-device/:nhanVienId')
  @ApiOperation({ summary: 'Khóa thiết bị' })
  async blockDevice(
    @Param('nhanVienId', ParseIntPipe) nhanVienId: number,
    @Body('lyDo') lyDo: string,
    @Request() req: any,
    @Ip() ipAddress: string,
    @Headers('user-agent') userAgent: string,
  ) {
    const nguoiDung = await this.service['prisma'].nguoiDung.findUnique({
      where: { id: req.user.id },
      select: { nhanVienId: true },
    });

    return this.service.blockDevice(nhanVienId, lyDo, nguoiDung?.nhanVienId || req.user.id, {
      ipAddress,
      userAgent,
    });
  }

  /**
   * GET /api/anti-fraud/device-history
   * Lấy lịch sử thiết bị (audit log)
   */
  @Get('device-history')
  @ApiOperation({ summary: 'Lấy lịch sử thiết bị' })
  async layLichSuThietBi(@Query() query: LichSuThietBiQueryDto) {
    return this.service.layLichSuThietBi(query);
  }

  /**
   * GET /api/anti-fraud/device-history/:nhanVienId
   * Lấy lịch sử thiết bị của 1 nhân viên
   */
  @Get('device-history/:nhanVienId')
  @ApiOperation({ summary: 'Lấy lịch sử thiết bị của nhân viên' })
  async layLichSuThietBiNhanVien(
    @Param('nhanVienId', ParseIntPipe) nhanVienId: number,
    @Query() query: LichSuThietBiQueryDto,
  ) {
    return this.service.layLichSuThietBi({ ...query, nhanVienId });
  }
}
