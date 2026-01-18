// Service Anti-fraud - Sprint 7 & 8
// Xử lý logic GPS check-in/out, Geofence validation, và Device Binding
import { Injectable, BadRequestException, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Decimal } from '@prisma/client/runtime/library';
import {
  TaoGeofenceDto,
  CapNhatGeofenceDto,
  GPSCheckinDto,
  GeofenceQueryDto,
  GPSLogQueryDto,
  GeofenceResponse,
  GPSCheckinResponse,
  GPSLogResponse,
  BindDeviceDto,
  ResetDeviceDto,
  DeviceQueryDto,
  LichSuThietBiQueryDto,
  ThietBiNhanVienResponse,
  LichSuThietBiResponse,
  DeviceCheckResult,
} from './anti-fraud.dto';

@Injectable()
export class AntiFraudService {
  constructor(private prisma: PrismaService) {}

  // =============== GEOFENCE MANAGEMENT ===============

  /**
   * Lấy danh sách geofence
   */
  async layDanhSachGeofence(query: GeofenceQueryDto): Promise<GeofenceResponse[]> {
    const where: any = {};
    
    if (query.phongBanId !== undefined) {
      where.OR = [
        { phongBanId: query.phongBanId },
        { apDungTatCa: true },
      ];
    }
    
    if (query.trangThai !== undefined) {
      where.trangThai = query.trangThai;
    }

    const geofences = await this.prisma.cauHinhGeofence.findMany({
      where,
      orderBy: { tenDiaDiem: 'asc' },
    });

    return geofences.map(this.mapGeofenceResponse);
  }

  /**
   * Lấy chi tiết 1 geofence
   */
  async layGeofence(id: number): Promise<GeofenceResponse> {
    const geofence = await this.prisma.cauHinhGeofence.findUnique({
      where: { id },
    });

    if (!geofence) {
      throw new NotFoundException('Không tìm thấy geofence');
    }

    return this.mapGeofenceResponse(geofence);
  }

  /**
   * Tạo geofence mới
   */
  async taoGeofence(dto: TaoGeofenceDto, taoBoi?: number): Promise<GeofenceResponse> {
    const geofence = await this.prisma.cauHinhGeofence.create({
      data: {
        tenDiaDiem: dto.tenDiaDiem,
        diaChi: dto.diaChi,
        viDo: new Decimal(dto.viDo),
        kinhDo: new Decimal(dto.kinhDo),
        banKinhMet: dto.banKinhMet,
        phongBanId: dto.phongBanId,
        apDungTatCa: dto.apDungTatCa,
        batBuocGPS: dto.batBuocGPS,
        chanNgoaiVung: dto.chanNgoaiVung,
        taoBoi,
      },
    });

    return this.mapGeofenceResponse(geofence);
  }

  /**
   * Cập nhật geofence
   */
  async capNhatGeofence(
    id: number,
    dto: CapNhatGeofenceDto,
    capNhatBoi?: number,
  ): Promise<GeofenceResponse> {
    await this.layGeofence(id);

    const data: any = { ...dto, capNhatBoi };
    if (dto.viDo !== undefined) data.viDo = new Decimal(dto.viDo);
    if (dto.kinhDo !== undefined) data.kinhDo = new Decimal(dto.kinhDo);

    const updated = await this.prisma.cauHinhGeofence.update({
      where: { id },
      data,
    });

    return this.mapGeofenceResponse(updated);
  }

  /**
   * Xóa geofence
   */
  async xoaGeofence(id: number): Promise<{ success: boolean }> {
    await this.layGeofence(id);

    await this.prisma.cauHinhGeofence.delete({ where: { id } });

    return { success: true };
  }

  // =============== GPS CHECK-IN/OUT ===============

  /**
   * Lấy geofence áp dụng cho nhân viên
   */
  async layGeofenceChoNhanVien(nhanVienId: number): Promise<GeofenceResponse[]> {
    const nhanVien = await this.prisma.nhanVien.findUnique({
      where: { id: nhanVienId },
      select: { phongBanId: true },
    });

    if (!nhanVien) {
      throw new NotFoundException('Không tìm thấy nhân viên');
    }

    const geofences = await this.prisma.cauHinhGeofence.findMany({
      where: {
        trangThai: true,
        OR: [
          { apDungTatCa: true },
          { phongBanId: nhanVien.phongBanId },
        ],
      },
    });

    return geofences.map(this.mapGeofenceResponse);
  }

  /**
   * GPS Check-in/Check-out với validation geofence
   */
  async gpsCheckin(
    nhanVienId: number,
    dto: GPSCheckinDto,
    requestInfo: { userAgent?: string; ipAddress?: string },
  ): Promise<GPSCheckinResponse> {
    const thoiGian = new Date();

    // Lấy geofences áp dụng cho nhân viên
    const geofences = await this.layGeofenceChoNhanVien(nhanVienId);
    
    let trangThai = 'HOP_LE';
    let matchedGeofence: any = null;
    let khoangCachMet: number | undefined;
    let trongVung: boolean | undefined;
    let ghiChu: string | undefined;

    // Kiểm tra GPS
    if (dto.viDo === undefined || dto.kinhDo === undefined) {
      // Không có GPS
      const requireGPS = geofences.some((g) => g.batBuocGPS);
      if (requireGPS) {
        trangThai = 'KHONG_CO_GPS';
        ghiChu = 'Không có thông tin GPS';
      }
    } else if (geofences.length > 0) {
      // Có GPS - kiểm tra từng geofence
      let minDistance = Infinity;
      
      for (const gf of geofences) {
        const distance = this.tinhKhoangCach(
          dto.viDo,
          dto.kinhDo,
          gf.viDo,
          gf.kinhDo,
        );

        if (distance < minDistance) {
          minDistance = distance;
          matchedGeofence = gf;
        }

        // Nếu trong bán kính cho phép
        if (distance <= gf.banKinhMet) {
          trongVung = true;
          matchedGeofence = gf;
          khoangCachMet = Math.round(distance);
          break;
        }
      }

      khoangCachMet = Math.round(minDistance);

      if (!trongVung) {
        trongVung = false;
        
        // Kiểm tra có chặn không
        const shouldBlock = matchedGeofence?.chanNgoaiVung;
        if (shouldBlock) {
          trangThai = 'NGOAI_VUNG';
          ghiChu = `Ngoài vùng cho phép (cách ${khoangCachMet}m)`;
        } else {
          trangThai = 'CANH_BAO';
          ghiChu = `Cảnh báo: Ngoài vùng (cách ${khoangCachMet}m)`;
        }
      }
    }

    // Nếu bị chặn, không cho check-in
    if (trangThai === 'NGOAI_VUNG') {
      throw new BadRequestException(
        `Không thể ${dto.loaiChamCong === 'CHECK_IN' ? 'check-in' : 'check-out'}: ${ghiChu}`,
      );
    }

    // Lưu bản ghi GPS
    const bangGhi = await this.prisma.bangGhiChamCongGPS.create({
      data: {
        nhanVienId,
        thoiGian,
        loaiChamCong: dto.loaiChamCong,
        viDo: dto.viDo !== undefined ? new Decimal(dto.viDo) : null,
        kinhDo: dto.kinhDo !== undefined ? new Decimal(dto.kinhDo) : null,
        doChinhXacMet: dto.doChinhXacMet,
        geofenceId: matchedGeofence?.id,
        khoangCachMet,
        trongVung,
        trangThai,
        ghiChu,
        deviceId: dto.deviceId,
        userAgent: requestInfo.userAgent,
        ipAddress: requestInfo.ipAddress,
      },
    });

    return {
      success: true,
      message: dto.loaiChamCong === 'CHECK_IN' 
        ? 'Check-in thành công' 
        : 'Check-out thành công',
      trangThai: trangThai as any,
      trongVung,
      khoangCachMet,
      geofence: matchedGeofence ? {
        id: matchedGeofence.id,
        tenDiaDiem: matchedGeofence.tenDiaDiem,
        banKinhMet: matchedGeofence.banKinhMet,
      } : undefined,
      bangGhi: {
        id: bangGhi.id,
        thoiGian: bangGhi.thoiGian,
        loaiChamCong: bangGhi.loaiChamCong,
      },
    };
  }

  // =============== GPS LOGS ===============

  /**
   * Lấy lịch sử GPS logs
   */
  async layLichSuGPS(query: GPSLogQueryDto) {
    const { nhanVienId, tuNgay, denNgay, trangThai, page = 1, limit = 20 } = query;
    const skip = (page - 1) * limit;

    const where: any = {};

    if (nhanVienId) {
      where.nhanVienId = nhanVienId;
    }

    if (tuNgay) {
      where.thoiGian = { ...where.thoiGian, gte: new Date(tuNgay) };
    }

    if (denNgay) {
      where.thoiGian = { ...where.thoiGian, lte: new Date(denNgay + 'T23:59:59') };
    }

    if (trangThai) {
      where.trangThai = trangThai;
    }

    const [data, total] = await Promise.all([
      this.prisma.bangGhiChamCongGPS.findMany({
        where,
        include: {
          geofence: {
            select: { id: true, tenDiaDiem: true },
          },
        },
        orderBy: { thoiGian: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.bangGhiChamCongGPS.count({ where }),
    ]);

    return {
      data: data.map(this.mapGPSLogResponse),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  /**
   * Thống kê GPS logs
   */
  async thongKeGPS(tuNgay: string, denNgay: string, phongBanId?: number) {
    const whereNV: any = {};
    if (phongBanId) {
      whereNV.phongBanId = phongBanId;
    }

    const nhanVienIds = await this.prisma.nhanVien.findMany({
      where: whereNV,
      select: { id: true },
    });

    const nhanVienIdList = nhanVienIds.map((nv) => nv.id);

    const where: any = {
      nhanVienId: { in: nhanVienIdList },
      thoiGian: {
        gte: new Date(tuNgay),
        lte: new Date(denNgay + 'T23:59:59'),
      },
    };

    const [tongBanGhi, hopLe, ngoaiVung, canhBao, khongGPS] = await Promise.all([
      this.prisma.bangGhiChamCongGPS.count({ where }),
      this.prisma.bangGhiChamCongGPS.count({ where: { ...where, trangThai: 'HOP_LE' } }),
      this.prisma.bangGhiChamCongGPS.count({ where: { ...where, trangThai: 'NGOAI_VUNG' } }),
      this.prisma.bangGhiChamCongGPS.count({ where: { ...where, trangThai: 'CANH_BAO' } }),
      this.prisma.bangGhiChamCongGPS.count({ where: { ...where, trangThai: 'KHONG_CO_GPS' } }),
    ]);

    return {
      tuNgay,
      denNgay,
      phongBanId,
      thongKe: {
        tongBanGhi,
        hopLe,
        ngoaiVung,
        canhBao,
        khongGPS,
        tyLeHopLe: tongBanGhi > 0 ? Math.round((hopLe / tongBanGhi) * 100) : 0,
      },
    };
  }

  // =============== HELPER METHODS ===============

  /**
   * Tính khoảng cách giữa 2 điểm GPS (Haversine formula)
   * @returns Khoảng cách tính bằng mét
   */
  private tinhKhoangCach(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
  ): number {
    const R = 6371000; // Bán kính trái đất (mét)
    const dLat = this.toRad(lat2 - lat1);
    const dLon = this.toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRad(lat1)) *
        Math.cos(this.toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  private toRad(deg: number): number {
    return deg * (Math.PI / 180);
  }

  private mapGeofenceResponse(geofence: any): GeofenceResponse {
    return {
      id: geofence.id,
      tenDiaDiem: geofence.tenDiaDiem,
      diaChi: geofence.diaChi,
      viDo: Number(geofence.viDo),
      kinhDo: Number(geofence.kinhDo),
      banKinhMet: geofence.banKinhMet,
      phongBanId: geofence.phongBanId,
      apDungTatCa: geofence.apDungTatCa,
      batBuocGPS: geofence.batBuocGPS,
      chanNgoaiVung: geofence.chanNgoaiVung,
      trangThai: geofence.trangThai,
      ngayTao: geofence.ngayTao,
      ngayCapNhat: geofence.ngayCapNhat,
    };
  }

  private mapGPSLogResponse(log: any): GPSLogResponse {
    return {
      id: log.id,
      nhanVienId: log.nhanVienId,
      thoiGian: log.thoiGian,
      loaiChamCong: log.loaiChamCong,
      viDo: log.viDo ? Number(log.viDo) : undefined,
      kinhDo: log.kinhDo ? Number(log.kinhDo) : undefined,
      doChinhXacMet: log.doChinhXacMet,
      geofenceId: log.geofenceId,
      khoangCachMet: log.khoangCachMet,
      trongVung: log.trongVung,
      trangThai: log.trangThai,
      ghiChu: log.ghiChu,
      deviceId: log.deviceId,
      geofence: log.geofence,
    };
  }

  // =============== SPRINT 8: DEVICE BINDING ===============

  /**
   * Kiểm tra device có hợp lệ không
   * Trả về: isValid, isBound, message
   */
  async kiemTraDevice(nhanVienId: number, deviceId: string): Promise<DeviceCheckResult> {
    const thietBi = await this.prisma.thietBiNhanVien.findUnique({
      where: { nhanVienId },
    });

    // Chưa bind device nào
    if (!thietBi) {
      return {
        isValid: true,
        isBound: false,
        message: 'Chưa đăng ký thiết bị. Sẽ tự động bind khi login.',
      };
    }

    // Đã bind device
    if (thietBi.deviceId === deviceId) {
      // Cùng device - OK
      if (thietBi.trangThai === 'BLOCKED') {
        return {
          isValid: false,
          isBound: true,
          message: 'Thiết bị đã bị khóa. Liên hệ HR để được hỗ trợ.',
          thietBi: this.mapThietBiResponse(thietBi),
        };
      }
      return {
        isValid: true,
        isBound: true,
        message: 'Thiết bị hợp lệ',
        thietBi: this.mapThietBiResponse(thietBi),
      };
    }

    // Device khác - BLOCK
    return {
      isValid: false,
      isBound: true,
      message: 'Đăng nhập từ thiết bị khác không được phép. Liên hệ HR để reset thiết bị.',
      thietBi: this.mapThietBiResponse(thietBi),
    };
  }

  /**
   * Bind device cho nhân viên (lần đầu login hoặc sau reset)
   */
  async bindDevice(
    nhanVienId: number,
    dto: BindDeviceDto,
    context?: { userAgent?: string; ipAddress?: string },
  ): Promise<ThietBiNhanVienResponse> {
    // Kiểm tra xem đã có device chưa
    const existing = await this.prisma.thietBiNhanVien.findUnique({
      where: { nhanVienId },
    });

    if (existing && existing.trangThai === 'ACTIVE') {
      throw new BadRequestException('Nhân viên đã đăng ký thiết bị. Cần reset trước khi bind mới.');
    }

    // Nếu đang PENDING_RESET thì cho phép bind mới
    const thietBi = await this.prisma.thietBiNhanVien.upsert({
      where: { nhanVienId },
      create: {
        nhanVienId,
        deviceId: dto.deviceId,
        tenThietBi: dto.tenThietBi,
        platform: dto.platform,
        userAgent: context?.userAgent,
        ipAddress: context?.ipAddress,
        trangThai: 'ACTIVE',
        ngayDangKy: new Date(),
        lanDangNhapCuoi: new Date(),
      },
      update: {
        deviceId: dto.deviceId,
        tenThietBi: dto.tenThietBi,
        platform: dto.platform,
        userAgent: context?.userAgent,
        ipAddress: context?.ipAddress,
        trangThai: 'ACTIVE',
        ngayDangKy: new Date(),
        lanDangNhapCuoi: new Date(),
        nguoiResetId: null,
        lyDoReset: null,
        ngayReset: null,
      },
    });

    // Ghi log
    await this.ghiLichSuThietBi({
      nhanVienId,
      hanhDong: 'BIND',
      deviceIdMoi: dto.deviceId,
      deviceIdCu: existing?.deviceId,
      ipAddress: context?.ipAddress,
      userAgent: context?.userAgent,
    });

    return this.mapThietBiResponse(thietBi);
  }

  /**
   * Reset device cho nhân viên (HR/Admin thực hiện)
   */
  async resetDevice(
    dto: ResetDeviceDto,
    nguoiThucHienId: number,
    context?: { ipAddress?: string; userAgent?: string },
  ): Promise<{ success: boolean; message: string }> {
    const thietBi = await this.prisma.thietBiNhanVien.findUnique({
      where: { nhanVienId: dto.nhanVienId },
    });

    if (!thietBi) {
      throw new NotFoundException('Nhân viên chưa đăng ký thiết bị nào');
    }

    const deviceIdCu = thietBi.deviceId;

    // Cập nhật trạng thái thành PENDING_RESET
    await this.prisma.thietBiNhanVien.update({
      where: { nhanVienId: dto.nhanVienId },
      data: {
        trangThai: 'PENDING_RESET',
        nguoiResetId: nguoiThucHienId,
        lyDoReset: dto.lyDo,
        ngayReset: new Date(),
      },
    });

    // Ghi log
    await this.ghiLichSuThietBi({
      nhanVienId: dto.nhanVienId,
      hanhDong: 'RESET',
      deviceIdCu,
      nguoiThucHienId,
      lyDo: dto.lyDo,
      ipAddress: context?.ipAddress,
      userAgent: context?.userAgent,
    });

    return {
      success: true,
      message: 'Đã reset thiết bị. Nhân viên có thể đăng nhập từ thiết bị mới.',
    };
  }

  /**
   * Block device
   */
  async blockDevice(
    nhanVienId: number,
    lyDo: string,
    nguoiThucHienId: number,
    context?: { ipAddress?: string; userAgent?: string },
  ): Promise<{ success: boolean; message: string }> {
    const thietBi = await this.prisma.thietBiNhanVien.findUnique({
      where: { nhanVienId },
    });

    if (!thietBi) {
      throw new NotFoundException('Nhân viên chưa đăng ký thiết bị nào');
    }

    await this.prisma.thietBiNhanVien.update({
      where: { nhanVienId },
      data: { trangThai: 'BLOCKED' },
    });

    await this.ghiLichSuThietBi({
      nhanVienId,
      hanhDong: 'BLOCK',
      deviceIdCu: thietBi.deviceId,
      nguoiThucHienId,
      lyDo,
      ipAddress: context?.ipAddress,
      userAgent: context?.userAgent,
    });

    return { success: true, message: 'Đã khóa thiết bị' };
  }

  /**
   * Lấy danh sách thiết bị đã đăng ký
   */
  async layDanhSachThietBi(query: DeviceQueryDto): Promise<{
    data: ThietBiNhanVienResponse[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    const page = query.page || 1;
    const limit = query.limit || 20;
    const skip = (page - 1) * limit;

    const where: any = {};

    if (query.trangThai) {
      where.trangThai = query.trangThai;
    }

    // Nếu search theo tên/mã NV, cần join
    const whereNhanVien: any = {};
    if (query.phongBanId) {
      whereNhanVien.phongBanId = query.phongBanId;
    }
    if (query.search) {
      whereNhanVien.OR = [
        { hoTen: { contains: query.search, mode: 'insensitive' } },
        { maNhanVien: { contains: query.search, mode: 'insensitive' } },
      ];
    }

    const [data, total] = await Promise.all([
      this.prisma.thietBiNhanVien.findMany({
        where,
        skip,
        take: limit,
        orderBy: { ngayDangKy: 'desc' },
      }),
      this.prisma.thietBiNhanVien.count({ where }),
    ]);

    // Lấy thông tin nhân viên
    const nhanVienIds = data.map((d) => d.nhanVienId);
    const nhanViens = await this.prisma.nhanVien.findMany({
      where: { id: { in: nhanVienIds } },
      select: {
        id: true,
        hoTen: true,
        maNhanVien: true,
        phongBan: { select: { id: true, tenPhongBan: true } },
      },
    });

    const nhanVienMap = new Map(nhanViens.map((nv) => [nv.id, nv]));

    return {
      data: data.map((d) => ({
        ...this.mapThietBiResponse(d),
        nhanVien: nhanVienMap.get(d.nhanVienId) as any,
      })),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  /**
   * Lấy thiết bị của 1 nhân viên
   */
  async layThietBiNhanVien(nhanVienId: number): Promise<ThietBiNhanVienResponse | null> {
    const thietBi = await this.prisma.thietBiNhanVien.findUnique({
      where: { nhanVienId },
    });

    if (!thietBi) return null;

    return this.mapThietBiResponse(thietBi);
  }

  /**
   * Lấy lịch sử thiết bị
   */
  async layLichSuThietBi(query: LichSuThietBiQueryDto): Promise<{
    data: LichSuThietBiResponse[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    const page = query.page || 1;
    const limit = query.limit || 20;
    const skip = (page - 1) * limit;

    const where: any = {};

    if (query.nhanVienId) {
      where.nhanVienId = query.nhanVienId;
    }
    if (query.hanhDong) {
      where.hanhDong = query.hanhDong;
    }
    if (query.tuNgay || query.denNgay) {
      where.ngayTao = {};
      if (query.tuNgay) {
        where.ngayTao.gte = new Date(query.tuNgay);
      }
      if (query.denNgay) {
        where.ngayTao.lte = new Date(query.denNgay + 'T23:59:59');
      }
    }

    const [data, total] = await Promise.all([
      this.prisma.lichSuThietBi.findMany({
        where,
        skip,
        take: limit,
        orderBy: { ngayTao: 'desc' },
      }),
      this.prisma.lichSuThietBi.count({ where }),
    ]);

    // Lấy thông tin nhân viên và người thực hiện
    const allIds = new Set<number>();
    data.forEach((d) => {
      allIds.add(d.nhanVienId);
      if (d.nguoiThucHienId) allIds.add(d.nguoiThucHienId);
    });

    const nhanViens = await this.prisma.nhanVien.findMany({
      where: { id: { in: Array.from(allIds) } },
      select: { id: true, hoTen: true, maNhanVien: true },
    });
    const nhanVienMap = new Map(nhanViens.map((nv) => [nv.id, nv]));

    return {
      data: data.map((d) => ({
        ...this.mapLichSuThietBiResponse(d),
        nhanVien: nhanVienMap.get(d.nhanVienId) as any,
        nguoiThucHien: d.nguoiThucHienId
          ? (nhanVienMap.get(d.nguoiThucHienId) as any)
          : undefined,
      })),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  /**
   * Cập nhật thời gian đăng nhập cuối
   */
  async capNhatLanDangNhapCuoi(nhanVienId: number): Promise<void> {
    await this.prisma.thietBiNhanVien.updateMany({
      where: { nhanVienId },
      data: { lanDangNhapCuoi: new Date() },
    });
  }

  // =============== PRIVATE HELPERS ===============

  private async ghiLichSuThietBi(data: {
    nhanVienId: number;
    hanhDong: string;
    deviceIdCu?: string;
    deviceIdMoi?: string;
    nguoiThucHienId?: number;
    lyDo?: string;
    ipAddress?: string;
    userAgent?: string;
  }): Promise<void> {
    await this.prisma.lichSuThietBi.create({ data });
  }

  private mapThietBiResponse(thietBi: any): ThietBiNhanVienResponse {
    return {
      id: thietBi.id,
      nhanVienId: thietBi.nhanVienId,
      deviceId: thietBi.deviceId,
      tenThietBi: thietBi.tenThietBi,
      userAgent: thietBi.userAgent,
      platform: thietBi.platform,
      ipAddress: thietBi.ipAddress,
      trangThai: thietBi.trangThai,
      ngayDangKy: thietBi.ngayDangKy,
      lanDangNhapCuoi: thietBi.lanDangNhapCuoi,
      nguoiResetId: thietBi.nguoiResetId,
      lyDoReset: thietBi.lyDoReset,
      ngayReset: thietBi.ngayReset,
    };
  }

  private mapLichSuThietBiResponse(log: any): LichSuThietBiResponse {
    return {
      id: log.id,
      nhanVienId: log.nhanVienId,
      hanhDong: log.hanhDong,
      deviceIdCu: log.deviceIdCu,
      deviceIdMoi: log.deviceIdMoi,
      nguoiThucHienId: log.nguoiThucHienId,
      lyDo: log.lyDo,
      ipAddress: log.ipAddress,
      userAgent: log.userAgent,
      ngayTao: log.ngayTao,
    };
  }
}
