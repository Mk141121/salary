// Timesheet Service - Sprint 9
// Xử lý logic bảng công tháng, sửa công, và audit
import { Injectable, BadRequestException, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { TrangThaiChamCong, LoaiNgayCong } from '@prisma/client';
import {
  TimesheetQueryDto,
  TaoYeuCauSuaCongDto,
  DuyetYeuCauSuaCongDto,
  SuaCongTrucTiepDto,
  YeuCauSuaCongQueryDto,
  LichSuSuaCongQueryDto,
  TimesheetNhanVien,
  TimesheetNgay,
  YeuCauSuaCongResponse,
  LichSuSuaCongResponse,
  ThongKeTimesheet,
} from './timesheet.dto';

@Injectable()
export class TimesheetService {
  constructor(private prisma: PrismaService) { }

  // =============== BẢNG CÔNG THÁNG ===============

  /**
   * Lấy bảng công tháng - tổng hợp theo nhân viên
   */
  async layBangCongThang(query: TimesheetQueryDto): Promise<{
    data: TimesheetNhanVien[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    thongKe: ThongKeTimesheet;
  }> {
    const { thang, nam, phongBanId, nhanVienId, search, page = 1, limit = 20 } = query;
    const skip = (page - 1) * limit;

    // Tính ngày đầu và cuối tháng
    const ngayDau = new Date(nam, thang - 1, 1);
    const ngayCuoi = new Date(nam, thang, 0);

    // Build where clause cho nhân viên
    const whereNhanVien: any = {
      trangThai: 'DANG_LAM',
    };

    if (phongBanId) {
      whereNhanVien.phongBanId = phongBanId;
    }

    if (nhanVienId) {
      whereNhanVien.id = nhanVienId;
    }

    if (search) {
      whereNhanVien.OR = [
        { hoTen: { contains: search, mode: 'insensitive' } },
        { maNhanVien: { contains: search, mode: 'insensitive' } },
      ];
    }

    // Đếm tổng và lấy danh sách nhân viên
    const [totalNhanVien, nhanViens] = await Promise.all([
      this.prisma.nhanVien.count({ where: whereNhanVien }),
      this.prisma.nhanVien.findMany({
        where: whereNhanVien,
        skip,
        take: limit,
        orderBy: [{ phongBanId: 'asc' }, { hoTen: 'asc' }],
        select: {
          id: true,
          hoTen: true,
          maNhanVien: true,
          phongBan: { select: { id: true, tenPhongBan: true } },
        },
      }),
    ]);

    const nhanVienIds = nhanViens.map((nv) => nv.id);

    // Lấy chi tiết chấm công của các nhân viên trong tháng
    const chiTietChamCongs = await this.prisma.chiTietChamCong.findMany({
      where: {
        nhanVienId: { in: nhanVienIds },
        ngay: { gte: ngayDau, lte: ngayCuoi },
      },
      include: {
        caLamViec: { select: { id: true, tenCa: true } },
      },
      orderBy: { ngay: 'asc' },
    });

    // Lấy yêu cầu sửa công đang chờ duyệt
    const yeuCauSuaCongs = await this.prisma.yeuCauSuaCong.findMany({
      where: {
        nhanVienId: { in: nhanVienIds },
        ngayChamCong: { gte: ngayDau, lte: ngayCuoi },
        trangThaiDuyet: 'CHO_DUYET',
      },
      select: { nhanVienId: true, ngayChamCong: true },
    });

    // Tạo map để check nhanh
    const yeuCauMap = new Set(
      yeuCauSuaCongs.map((yc) => `${yc.nhanVienId}-${yc.ngayChamCong.toISOString().slice(0, 10)}`)
    );

    // Group chi tiết theo nhân viên
    const chiTietMap = new Map<number, typeof chiTietChamCongs>();
    for (const ct of chiTietChamCongs) {
      if (!chiTietMap.has(ct.nhanVienId)) {
        chiTietMap.set(ct.nhanVienId, []);
      }
      chiTietMap.get(ct.nhanVienId)!.push(ct);
    }

    // Build response
    const data: TimesheetNhanVien[] = nhanViens.map((nv) => {
      const chiTiets = chiTietMap.get(nv.id) || [];
      const tongKet = {
        soNgayDiLam: 0,
        soNgayNghi: 0,
        soNgayPhep: 0,
        soGioLam: 0,
        soGioOT: 0,
        soLanDiTre: 0,
        soLanVeSom: 0,
        tongPhutDiTre: 0,
        tongPhutVeSom: 0,
      };

      const chiTietNgays: TimesheetNgay[] = [];

      // Duyệt qua tất cả ngày trong tháng
      for (let d = 1; d <= ngayCuoi.getDate(); d++) {
        const ngay = new Date(nam, thang - 1, d);
        const ngayStr = ngay.toISOString().slice(0, 10);
        const thuTrongTuan = ngay.getDay();

        // Tìm chi tiết chấm công cho ngày này
        const ct = chiTiets.find(
          (c) => c.ngay.toISOString().slice(0, 10) === ngayStr
        );

        const timesheetNgay: TimesheetNgay = {
          ngay: ngayStr,
          thuTrongTuan,
          loaiNgay: ct?.loaiNgay || this.xacDinhLoaiNgay(thuTrongTuan),
          trangThai: ct?.trangThai || 'CHUA_XAC_DINH',
          gioVao: ct?.gioVao?.toISOString(),
          gioRa: ct?.gioRa?.toISOString(),
          gioVaoDuKien: ct?.gioVaoDuKien?.toISOString(),
          gioRaDuKien: ct?.gioRaDuKien?.toISOString(),
          caLamViec: ct?.caLamViec || undefined,
          soGioLam: Number(ct?.soGioLam || 0),
          soGioOT: Number(ct?.soGioOT || 0),
          phutDiTre: ct?.phutDiTre || undefined,
          phutVeSom: ct?.phutVeSom || undefined,
          ghiChu: ct?.ghiChu || undefined,
          coYeuCauSuaCong: yeuCauMap.has(`${nv.id}-${ngayStr}`),
        };

        chiTietNgays.push(timesheetNgay);

        // Cập nhật tổng kết
        if (ct) {
          if (ct.trangThai === 'DI_LAM') {
            tongKet.soNgayDiLam++;
          } else if (ct.trangThai === 'NGHI_PHEP') {
            tongKet.soNgayPhep++;
          } else if (['NGHI_KHONG_LUONG', 'NGHI_BENH'].includes(ct.trangThai)) {
            tongKet.soNgayNghi++;
          }
          tongKet.soGioLam += Number(ct.soGioLam || 0);
          tongKet.soGioOT += Number(ct.soGioOT || 0);
          if (ct.phutDiTre && ct.phutDiTre > 0) {
            tongKet.soLanDiTre++;
            tongKet.tongPhutDiTre += ct.phutDiTre;
          }
          if (ct.phutVeSom && ct.phutVeSom > 0) {
            tongKet.soLanVeSom++;
            tongKet.tongPhutVeSom += ct.phutVeSom;
          }
        }
      }

      return {
        nhanVienId: nv.id,
        hoTen: nv.hoTen,
        maNhanVien: nv.maNhanVien,
        phongBan: nv.phongBan || undefined,
        chiTiet: chiTietNgays,
        tongKet,
      };
    });

    // Thống kê tổng
    const thongKe = await this.layThongKeTimesheet(thang, nam, phongBanId);

    return {
      data,
      total: totalNhanVien,
      page,
      limit,
      totalPages: Math.ceil(totalNhanVien / limit),
      thongKe,
    };
  }

  /**
   * Lấy bảng công của 1 nhân viên
   */
  async layBangCongNhanVien(
    nhanVienId: number,
    thang: number,
    nam: number
  ): Promise<TimesheetNhanVien | null> {
    const result = await this.layBangCongThang({
      thang,
      nam,
      nhanVienId,
      page: 1,
      limit: 1,
    });

    return result.data[0] || null;
  }

  // =============== YÊU CẦU SỬA CÔNG ===============

  /**
   * Tạo yêu cầu sửa công
   */
  async taoYeuCauSuaCong(
    dto: TaoYeuCauSuaCongDto,
    nguoiTaoId: number
  ): Promise<YeuCauSuaCongResponse> {
    const ngay = new Date(dto.ngayChamCong);
    const thang = ngay.getMonth() + 1;
    const nam = ngay.getFullYear();

    // Lấy phòng ban của nhân viên để check bảng lương
    const nhanVien = await this.prisma.nhanVien.findUnique({
      where: { id: dto.nhanVienId },
      select: { phongBanId: true },
    });

    if (nhanVien?.phongBanId) {
      // Kiểm tra bảng lương đã chốt/khóa chưa
      const bangLuong = await this.prisma.bangLuong.findFirst({
        where: {
          thang,
          nam,
          phongBanId: nhanVien.phongBanId,
          trangThai: { in: ['DA_CHOT', 'KHOA'] },
        },
      });

      if (bangLuong) {
        throw new BadRequestException(
          `Không thể sửa công ngày ${dto.ngayChamCong}. Bảng lương tháng ${thang}/${nam} đã chốt.`
        );
      }
    }

    // Lấy chi tiết chấm công hiện tại
    const chiTiet = await this.prisma.chiTietChamCong.findUnique({
      where: {
        nhanVienId_ngay: {
          nhanVienId: dto.nhanVienId,
          ngay,
        },
      },
    });

    // Tạo yêu cầu
    const yeuCau = await this.prisma.yeuCauSuaCong.create({
      data: {
        nhanVienId: dto.nhanVienId,
        ngayChamCong: ngay,
        gioVaoCu: chiTiet?.gioVao,
        gioRaCu: chiTiet?.gioRa,
        trangThaiCu: chiTiet?.trangThai,
        gioVaoMoi: dto.gioVaoMoi ? new Date(dto.gioVaoMoi) : null,
        gioRaMoi: dto.gioRaMoi ? new Date(dto.gioRaMoi) : null,
        trangThaiMoi: dto.trangThaiMoi,
        lyDo: dto.lyDo,
        bangChung: dto.bangChung,
        nguoiTaoId,
      },
    });

    return this.mapYeuCauSuaCongResponse(yeuCau);
  }

  /**
   * Duyệt yêu cầu sửa công
   */
  async duyetYeuCauSuaCong(
    id: number,
    dto: DuyetYeuCauSuaCongDto,
    nguoiDuyetId: number
  ): Promise<YeuCauSuaCongResponse> {
    const yeuCau = await this.prisma.yeuCauSuaCong.findUnique({
      where: { id },
    });

    if (!yeuCau) {
      throw new NotFoundException('Không tìm thấy yêu cầu sửa công');
    }

    if (yeuCau.trangThaiDuyet !== 'CHO_DUYET') {
      throw new BadRequestException('Yêu cầu đã được xử lý');
    }

    if (dto.trangThaiDuyet === 'TU_CHOI' && !dto.lyDoTuChoi) {
      throw new BadRequestException('Vui lòng nhập lý do từ chối');
    }

    // Cập nhật yêu cầu
    const updated = await this.prisma.yeuCauSuaCong.update({
      where: { id },
      data: {
        trangThaiDuyet: dto.trangThaiDuyet,
        nguoiDuyetId,
        ngayDuyet: new Date(),
        lyDoTuChoi: dto.lyDoTuChoi,
      },
    });

    // Nếu duyệt, apply thay đổi vào bảng công
    if (dto.trangThaiDuyet === 'DA_DUYET') {
      await this.applyYeuCauSuaCong(yeuCau, nguoiDuyetId);
    }

    return this.mapYeuCauSuaCongResponse(updated);
  }

  /**
   * Lấy danh sách yêu cầu sửa công
   */
  async layDanhSachYeuCauSuaCong(query: YeuCauSuaCongQueryDto): Promise<{
    data: YeuCauSuaCongResponse[];
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

    if (query.trangThaiDuyet) {
      where.trangThaiDuyet = query.trangThaiDuyet;
    }

    if (query.tuNgay || query.denNgay) {
      where.ngayChamCong = {};
      if (query.tuNgay) {
        where.ngayChamCong.gte = new Date(query.tuNgay);
      }
      if (query.denNgay) {
        where.ngayChamCong.lte = new Date(query.denNgay);
      }
    }

    // Nếu có phongBanId, cần filter qua nhân viên
    if (query.phongBanId) {
      const nhanVienIds = await this.prisma.nhanVien.findMany({
        where: { phongBanId: query.phongBanId },
        select: { id: true },
      });
      where.nhanVienId = { in: nhanVienIds.map((nv) => nv.id) };
    }

    const [data, total] = await Promise.all([
      this.prisma.yeuCauSuaCong.findMany({
        where,
        skip,
        take: limit,
        orderBy: { ngayTao: 'desc' },
      }),
      this.prisma.yeuCauSuaCong.count({ where }),
    ]);

    // Lấy thông tin nhân viên
    const nhanVienIds = [...new Set(data.flatMap((d) => [d.nhanVienId, d.nguoiTaoId, d.nguoiDuyetId].filter(Boolean)))];
    const nhanViens = await this.prisma.nhanVien.findMany({
      where: { id: { in: nhanVienIds as number[] } },
      select: { id: true, hoTen: true, maNhanVien: true },
    });
    const nhanVienMap = new Map(nhanViens.map((nv) => [nv.id, nv]));

    return {
      data: data.map((d) => ({
        ...this.mapYeuCauSuaCongResponse(d),
        nhanVien: nhanVienMap.get(d.nhanVienId) as any,
        nguoiTao: nhanVienMap.get(d.nguoiTaoId) as any,
        nguoiDuyet: d.nguoiDuyetId ? (nhanVienMap.get(d.nguoiDuyetId) as any) : undefined,
      })),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  // =============== SỬA CÔNG TRỰC TIẾP (HR) ===============

  /**
   * HR sửa công trực tiếp (không cần workflow)
   */
  async suaCongTrucTiep(
    dto: SuaCongTrucTiepDto,
    nguoiThucHienId: number
  ): Promise<TimesheetNgay> {
    const ngay = new Date(dto.ngayChamCong);
    const thang = ngay.getMonth() + 1;
    const nam = ngay.getFullYear();

    // Lấy phòng ban của nhân viên để check bảng lương
    const nhanVien = await this.prisma.nhanVien.findUnique({
      where: { id: dto.nhanVienId },
      select: { phongBanId: true },
    });

    if (nhanVien?.phongBanId) {
      // Kiểm tra bảng lương đã chốt/khóa chưa
      const bangLuong = await this.prisma.bangLuong.findFirst({
        where: {
          thang,
          nam,
          phongBanId: nhanVien.phongBanId,
          trangThai: { in: ['DA_CHOT', 'KHOA'] },
        },
      });

      if (bangLuong) {
        throw new BadRequestException(
          `Không thể sửa công ngày ${dto.ngayChamCong}. Bảng lương tháng ${thang}/${nam} đã chốt.`
        );
      }
    }

    // Lấy chi tiết chấm công hiện tại
    const chiTietCu = await this.prisma.chiTietChamCong.findUnique({
      where: {
        nhanVienId_ngay: {
          nhanVienId: dto.nhanVienId,
          ngay,
        },
      },
    });

    // Build data update
    const updateData: any = {};
    const lichSuItems: any[] = [];

    if (dto.gioVao !== undefined) {
      const giaTriMoi = dto.gioVao ? new Date(dto.gioVao) : null;
      updateData.gioVao = giaTriMoi;
      lichSuItems.push({
        nhanVienId: dto.nhanVienId,
        ngayChamCong: ngay,
        truongThayDoi: 'gioVao',
        giaTriCu: chiTietCu?.gioVao?.toISOString() || null,
        giaTriMoi: giaTriMoi?.toISOString() || null,
        nguonThayDoi: 'MANUAL',
        nguoiThucHienId,
        ghiChu: dto.ghiChu,
      });
    }

    if (dto.gioRa !== undefined) {
      const giaTriMoi = dto.gioRa ? new Date(dto.gioRa) : null;
      updateData.gioRa = giaTriMoi;
      lichSuItems.push({
        nhanVienId: dto.nhanVienId,
        ngayChamCong: ngay,
        truongThayDoi: 'gioRa',
        giaTriCu: chiTietCu?.gioRa?.toISOString() || null,
        giaTriMoi: giaTriMoi?.toISOString() || null,
        nguonThayDoi: 'MANUAL',
        nguoiThucHienId,
        ghiChu: dto.ghiChu,
      });
    }

    if (dto.trangThai !== undefined) {
      updateData.trangThai = dto.trangThai as TrangThaiChamCong;
      lichSuItems.push({
        nhanVienId: dto.nhanVienId,
        ngayChamCong: ngay,
        truongThayDoi: 'trangThai',
        giaTriCu: chiTietCu?.trangThai || null,
        giaTriMoi: dto.trangThai,
        nguonThayDoi: 'MANUAL',
        nguoiThucHienId,
        ghiChu: dto.ghiChu,
      });
    }

    if (dto.loaiNgay !== undefined) {
      updateData.loaiNgay = dto.loaiNgay as LoaiNgayCong;
      lichSuItems.push({
        nhanVienId: dto.nhanVienId,
        ngayChamCong: ngay,
        truongThayDoi: 'loaiNgay',
        giaTriCu: chiTietCu?.loaiNgay || null,
        giaTriMoi: dto.loaiNgay,
        nguonThayDoi: 'MANUAL',
        nguoiThucHienId,
        ghiChu: dto.ghiChu,
      });
    }

    updateData.ghiChu = dto.ghiChu;

    // Upsert chi tiết chấm công
    const chiTiet = await this.prisma.chiTietChamCong.upsert({
      where: {
        nhanVienId_ngay: {
          nhanVienId: dto.nhanVienId,
          ngay,
        },
      },
      create: {
        nhanVienId: dto.nhanVienId,
        ngay,
        ...updateData,
        loaiNgay: (dto.loaiNgay as LoaiNgayCong) || this.xacDinhLoaiNgay(ngay.getDay()) as LoaiNgayCong,
        trangThai: (dto.trangThai as TrangThaiChamCong) || 'DI_LAM',
      },
      update: updateData,
      include: {
        caLamViec: { select: { id: true, tenCa: true } },
      },
    });

    // Ghi lịch sử
    if (lichSuItems.length > 0) {
      await this.prisma.lichSuSuaCong.createMany({ data: lichSuItems });
    }

    return {
      ngay: chiTiet.ngay.toISOString().slice(0, 10),
      thuTrongTuan: chiTiet.ngay.getDay(),
      loaiNgay: chiTiet.loaiNgay,
      trangThai: chiTiet.trangThai,
      gioVao: chiTiet.gioVao?.toISOString(),
      gioRa: chiTiet.gioRa?.toISOString(),
      gioVaoDuKien: chiTiet.gioVaoDuKien?.toISOString(),
      gioRaDuKien: chiTiet.gioRaDuKien?.toISOString(),
      caLamViec: chiTiet.caLamViec || undefined,
      soGioLam: Number(chiTiet.soGioLam),
      soGioOT: Number(chiTiet.soGioOT),
      phutDiTre: chiTiet.phutDiTre || undefined,
      phutVeSom: chiTiet.phutVeSom || undefined,
      ghiChu: chiTiet.ghiChu || undefined,
    };
  }

  // =============== LỊCH SỬ SỬA CÔNG ===============

  /**
   * Lấy lịch sử sửa công
   */
  async layLichSuSuaCong(query: LichSuSuaCongQueryDto): Promise<{
    data: LichSuSuaCongResponse[];
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

    if (query.tuNgay || query.denNgay) {
      where.ngayChamCong = {};
      if (query.tuNgay) {
        where.ngayChamCong.gte = new Date(query.tuNgay);
      }
      if (query.denNgay) {
        where.ngayChamCong.lte = new Date(query.denNgay);
      }
    }

    const [data, total] = await Promise.all([
      this.prisma.lichSuSuaCong.findMany({
        where,
        skip,
        take: limit,
        orderBy: { ngayTao: 'desc' },
      }),
      this.prisma.lichSuSuaCong.count({ where }),
    ]);

    // Lấy thông tin nhân viên
    const allIds = new Set<number>();
    data.forEach((d) => {
      allIds.add(d.nhanVienId);
      allIds.add(d.nguoiThucHienId);
    });

    const nhanViens = await this.prisma.nhanVien.findMany({
      where: { id: { in: Array.from(allIds) } },
      select: { id: true, hoTen: true, maNhanVien: true },
    });
    const nhanVienMap = new Map(nhanViens.map((nv) => [nv.id, nv]));

    return {
      data: data.map((d) => ({
        id: d.id,
        nhanVienId: d.nhanVienId,
        ngayChamCong: d.ngayChamCong,
        truongThayDoi: d.truongThayDoi,
        giaTriCu: d.giaTriCu || undefined,
        giaTriMoi: d.giaTriMoi || undefined,
        nguonThayDoi: d.nguonThayDoi,
        yeuCauSuaCongId: d.yeuCauSuaCongId || undefined,
        nguoiThucHienId: d.nguoiThucHienId,
        ghiChu: d.ghiChu || undefined,
        ngayTao: d.ngayTao,
        nhanVien: nhanVienMap.get(d.nhanVienId) as any,
        nguoiThucHien: nhanVienMap.get(d.nguoiThucHienId) as any,
      })),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  // =============== THỐNG KÊ ===============

  /**
   * Lấy thống kê timesheet
   */
  async layThongKeTimesheet(
    thang: number,
    nam: number,
    phongBanId?: number
  ): Promise<ThongKeTimesheet> {
    const ngayDau = new Date(nam, thang - 1, 1);
    const ngayCuoi = new Date(nam, thang, 0);

    // Build where cho nhân viên
    const whereNhanVien: any = { trangThai: 'DANG_LAM' };
    if (phongBanId) {
      whereNhanVien.phongBanId = phongBanId;
    }

    // Đếm nhân viên
    const tongNhanVien = await this.prisma.nhanVien.count({ where: whereNhanVien });

    // Lấy ID nhân viên
    const nhanVienIds = await this.prisma.nhanVien.findMany({
      where: whereNhanVien,
      select: { id: true },
    }).then((nvs) => nvs.map((nv) => nv.id));

    // Thống kê chấm công
    const chamCongs = await this.prisma.chiTietChamCong.groupBy({
      by: ['trangThai'],
      where: {
        nhanVienId: { in: nhanVienIds },
        ngay: { gte: ngayDau, lte: ngayCuoi },
      },
      _count: { _all: true },
    });

    const aggregates = await this.prisma.chiTietChamCong.aggregate({
      where: {
        nhanVienId: { in: nhanVienIds },
        ngay: { gte: ngayDau, lte: ngayCuoi },
      },
      _sum: {
        soGioOT: true,
        phutDiTre: true,
        phutVeSom: true,
      },
      _count: {
        _all: true,
      },
    });

    // Đếm đi trễ/về sớm
    const diTre = await this.prisma.chiTietChamCong.count({
      where: {
        nhanVienId: { in: nhanVienIds },
        ngay: { gte: ngayDau, lte: ngayCuoi },
        phutDiTre: { gt: 0 },
      },
    });

    const veSom = await this.prisma.chiTietChamCong.count({
      where: {
        nhanVienId: { in: nhanVienIds },
        ngay: { gte: ngayDau, lte: ngayCuoi },
        phutVeSom: { gt: 0 },
      },
    });

    // Thống kê yêu cầu sửa công
    const yeuCauStats = await this.prisma.yeuCauSuaCong.groupBy({
      by: ['trangThaiDuyet'],
      where: {
        nhanVienId: { in: nhanVienIds },
        ngayChamCong: { gte: ngayDau, lte: ngayCuoi },
      },
      _count: { _all: true },
    });

    const tongNgayCong = chamCongs.find((c) => c.trangThai === 'DI_LAM')?._count._all || 0;
    const tongNgayNghi =
      (chamCongs.find((c) => c.trangThai === 'NGHI_KHONG_LUONG')?._count._all || 0) +
      (chamCongs.find((c) => c.trangThai === 'NGHI_BENH')?._count._all || 0);
    const tongNgayPhep = chamCongs.find((c) => c.trangThai === 'NGHI_PHEP')?._count._all || 0;

    return {
      thang,
      nam,
      tongNhanVien,
      tongNgayCong,
      tongNgayNghi,
      tongNgayPhep,
      tongGioOT: Number(aggregates._sum.soGioOT || 0),
      tongLanDiTre: diTre,
      tongLanVeSom: veSom,
      yeuCauSuaCong: {
        choDuyet: yeuCauStats.find((y) => y.trangThaiDuyet === 'CHO_DUYET')?._count._all || 0,
        daDuyet: yeuCauStats.find((y) => y.trangThaiDuyet === 'DA_DUYET')?._count._all || 0,
        tuChoi: yeuCauStats.find((y) => y.trangThaiDuyet === 'TU_CHOI')?._count._all || 0,
      },
    };
  }

  // =============== PRIVATE HELPERS ===============

  private async applyYeuCauSuaCong(yeuCau: any, nguoiThucHienId: number): Promise<void> {
    const ngay = new Date(yeuCau.ngayChamCong);

    const updateData: any = {};
    const lichSuItems: any[] = [];

    if (yeuCau.gioVaoMoi !== null) {
      updateData.gioVao = yeuCau.gioVaoMoi;
      lichSuItems.push({
        nhanVienId: yeuCau.nhanVienId,
        ngayChamCong: ngay,
        truongThayDoi: 'gioVao',
        giaTriCu: yeuCau.gioVaoCu?.toISOString() || null,
        giaTriMoi: yeuCau.gioVaoMoi?.toISOString() || null,
        nguonThayDoi: 'YEU_CAU',
        yeuCauSuaCongId: yeuCau.id,
        nguoiThucHienId,
        ghiChu: yeuCau.lyDo,
      });
    }

    if (yeuCau.gioRaMoi !== null) {
      updateData.gioRa = yeuCau.gioRaMoi;
      lichSuItems.push({
        nhanVienId: yeuCau.nhanVienId,
        ngayChamCong: ngay,
        truongThayDoi: 'gioRa',
        giaTriCu: yeuCau.gioRaCu?.toISOString() || null,
        giaTriMoi: yeuCau.gioRaMoi?.toISOString() || null,
        nguonThayDoi: 'YEU_CAU',
        yeuCauSuaCongId: yeuCau.id,
        nguoiThucHienId,
        ghiChu: yeuCau.lyDo,
      });
    }

    if (yeuCau.trangThaiMoi) {
      updateData.trangThai = yeuCau.trangThaiMoi as TrangThaiChamCong;
      lichSuItems.push({
        nhanVienId: yeuCau.nhanVienId,
        ngayChamCong: ngay,
        truongThayDoi: 'trangThai',
        giaTriCu: yeuCau.trangThaiCu || null,
        giaTriMoi: yeuCau.trangThaiMoi,
        nguonThayDoi: 'YEU_CAU',
        yeuCauSuaCongId: yeuCau.id,
        nguoiThucHienId,
        ghiChu: yeuCau.lyDo,
      });
    }

    // Upsert chi tiết chấm công
    await this.prisma.chiTietChamCong.upsert({
      where: {
        nhanVienId_ngay: {
          nhanVienId: yeuCau.nhanVienId,
          ngay,
        },
      },
      create: {
        nhanVienId: yeuCau.nhanVienId,
        ngay,
        ...updateData,
        loaiNgay: this.xacDinhLoaiNgay(ngay.getDay()) as LoaiNgayCong,
        trangThai: (yeuCau.trangThaiMoi as TrangThaiChamCong) || 'DI_LAM',
      },
      update: updateData,
    });

    // Ghi lịch sử
    if (lichSuItems.length > 0) {
      await this.prisma.lichSuSuaCong.createMany({ data: lichSuItems });
    }
  }

  private xacDinhLoaiNgay(thuTrongTuan: number): string {
    if (thuTrongTuan === 0) return 'CHU_NHAT';
    if (thuTrongTuan === 6) return 'THU_BAY';
    return 'NGAY_THUONG';
  }

  private mapYeuCauSuaCongResponse(yeuCau: any): YeuCauSuaCongResponse {
    return {
      id: yeuCau.id,
      nhanVienId: yeuCau.nhanVienId,
      ngayChamCong: yeuCau.ngayChamCong,
      gioVaoCu: yeuCau.gioVaoCu,
      gioRaCu: yeuCau.gioRaCu,
      trangThaiCu: yeuCau.trangThaiCu,
      gioVaoMoi: yeuCau.gioVaoMoi,
      gioRaMoi: yeuCau.gioRaMoi,
      trangThaiMoi: yeuCau.trangThaiMoi,
      lyDo: yeuCau.lyDo,
      bangChung: yeuCau.bangChung,
      trangThaiDuyet: yeuCau.trangThaiDuyet,
      nguoiDuyetId: yeuCau.nguoiDuyetId,
      ngayDuyet: yeuCau.ngayDuyet,
      lyDoTuChoi: yeuCau.lyDoTuChoi,
      nguoiTaoId: yeuCau.nguoiTaoId,
      ngayTao: yeuCau.ngayTao,
    };
  }
}
