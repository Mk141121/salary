// Approval Dashboard Service - Quản lý tất cả đơn chờ duyệt tập trung
// Sprint 7 - Cải tiến quy trình duyệt
import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '@prisma/client';

interface PendingFilter {
  nguoiDuyetId: number;
  loai?: string;
  cap?: 1 | 2;
  phongBanId?: number;
  tuNgay?: string;
  denNgay?: string;
  page?: number;
  limit?: number;
}

export interface SummaryResult {
  tongSoDon: number;
  yeuCauCap1: number;
  yeuCauCap2: number;
  nghiPhep: number;
  quaHan: number;
  quaHan3Ngay: number;
  quaHan7Ngay: number;
}

@Injectable()
export class ApprovalDashboardService {
  private readonly logger = new Logger(ApprovalDashboardService.name);

  constructor(private prisma: PrismaService) {}

  /**
   * Lấy tổng quan các đơn chờ duyệt
   */
  async laySummary(nguoiDuyetId: number): Promise<SummaryResult> {
    const now = new Date();
    const ba_ngay_truoc = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000);
    const bay_ngay_truoc = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    // Đếm các loại đơn
    const [yeuCauCap1, yeuCauCap2, nghiPhep, quaHan3Ngay, quaHan7Ngay] = await Promise.all([
      // Đơn yêu cầu chờ duyệt cấp 1
      this.prisma.donYeuCau.count({
        where: { trangThai: 'CHO_DUYET_1' },
      }),
      // Đơn yêu cầu chờ duyệt cấp 2
      this.prisma.donYeuCau.count({
        where: { trangThai: 'CHO_DUYET_2' },
      }),
      // Đơn nghỉ phép chờ duyệt
      this.prisma.donNghiPhep.count({
        where: { trangThai: 'GUI_DUYET' },
      }),
      // Đơn quá 3 ngày
      this.prisma.donYeuCau.count({
        where: {
          trangThai: { in: ['CHO_DUYET_1', 'CHO_DUYET_2'] },
          ngayTao: { lt: ba_ngay_truoc },
        },
      }),
      // Đơn quá 7 ngày
      this.prisma.donYeuCau.count({
        where: {
          trangThai: { in: ['CHO_DUYET_1', 'CHO_DUYET_2'] },
          ngayTao: { lt: bay_ngay_truoc },
        },
      }),
    ]);

    const tongSoDon = yeuCauCap1 + yeuCauCap2 + nghiPhep;

    return {
      tongSoDon,
      yeuCauCap1,
      yeuCauCap2,
      nghiPhep,
      quaHan: quaHan3Ngay,
      quaHan3Ngay,
      quaHan7Ngay,
    };
  }

  /**
   * Lấy danh sách tất cả đơn chờ duyệt
   */
  async layDanhSachChoDuyet(filter: PendingFilter) {
    const { loai, cap, phongBanId, tuNgay, denNgay, page = 1, limit = 20 } = filter;
    const skip = (page - 1) * limit;

    const results: any[] = [];

    // Lấy đơn yêu cầu nếu loại = YEU_CAU hoặc ALL
    if (loai === 'YEU_CAU' || loai === 'ALL') {
      const yeuCauWhere: any = {};
      
      if (cap === 1) {
        yeuCauWhere.trangThai = 'CHO_DUYET_1';
      } else if (cap === 2) {
        yeuCauWhere.trangThai = 'CHO_DUYET_2';
      } else {
        yeuCauWhere.trangThai = { in: ['CHO_DUYET_1', 'CHO_DUYET_2'] };
      }
      
      if (phongBanId) yeuCauWhere.phongBanId = phongBanId;
      if (tuNgay || denNgay) {
        yeuCauWhere.ngayYeuCau = {};
        if (tuNgay) yeuCauWhere.ngayYeuCau.gte = new Date(tuNgay);
        if (denNgay) yeuCauWhere.ngayYeuCau.lte = new Date(denNgay);
      }

      const yeuCauList = await this.prisma.donYeuCau.findMany({
        where: yeuCauWhere,
        include: {
          nhanVien: { select: { id: true, maNhanVien: true, hoTen: true } },
          phongBan: { select: { id: true, tenPhongBan: true } },
          loaiYeuCau: { select: { maLoai: true, tenLoai: true, icon: true, mauHienThi: true } },
        },
        orderBy: { ngayTao: 'asc' }, // FIFO - đơn cũ trước
        skip: loai === 'YEU_CAU' ? skip : 0,
        take: loai === 'YEU_CAU' ? limit : 100,
      });

      results.push(
        ...yeuCauList.map((d) => ({
          id: d.id,
          loaiDon: 'YEU_CAU',
          maDon: d.maDon,
          tenLoai: d.loaiYeuCau?.tenLoai,
          maLoai: d.loaiYeuCau?.maLoai,
          icon: d.loaiYeuCau?.icon,
          mau: d.loaiYeuCau?.mauHienThi,
          nhanVien: d.nhanVien,
          phongBan: d.phongBan,
          ngayYeuCau: d.ngayYeuCau,
          lyDo: d.lyDo,
          soGio: d.soGio ? Number(d.soGio) : null,
          trangThai: d.trangThai,
          capDuyet: d.trangThai === 'CHO_DUYET_1' ? 1 : 2,
          ngayTao: d.ngayTao,
          soNgaycho: this.tinhSoNgayCho(d.ngayTao),
        })),
      );
    }

    // Lấy đơn nghỉ phép nếu loại = NGHI_PHEP hoặc ALL
    if (loai === 'NGHI_PHEP' || loai === 'ALL') {
      const nghiPhepWhere: any = { trangThai: 'GUI_DUYET' };
      
      if (phongBanId) nghiPhepWhere.phongBanId = phongBanId;
      if (tuNgay || denNgay) {
        nghiPhepWhere.ngayBatDau = {};
        if (tuNgay) nghiPhepWhere.ngayBatDau.gte = new Date(tuNgay);
        if (denNgay) nghiPhepWhere.ngayBatDau.lte = new Date(denNgay);
      }

      const nghiPhepList = await this.prisma.donNghiPhep.findMany({
        where: nghiPhepWhere,
        include: {
          nhanVien: { select: { id: true, maNhanVien: true, hoTen: true } },
          phongBan: { select: { id: true, tenPhongBan: true } },
          loaiNghi: { select: { maLoaiNghi: true, tenLoaiNghi: true } },
        },
        orderBy: { ngayTao: 'asc' },
        skip: loai === 'NGHI_PHEP' ? skip : 0,
        take: loai === 'NGHI_PHEP' ? limit : 100,
      });

      results.push(
        ...nghiPhepList.map((d) => ({
          id: d.id,
          loaiDon: 'NGHI_PHEP',
          maDon: d.maDon,
          tenLoai: d.loaiNghi?.tenLoaiNghi || 'Nghỉ phép',
          maLoai: d.loaiNghi?.maLoaiNghi || 'NGHI_PHEP',
          icon: 'calendar-off',
          mau: '#6366f1',
          nhanVien: d.nhanVien,
          phongBan: d.phongBan,
          ngayYeuCau: d.tuNgay,
          ngayKetThuc: d.denNgay,
          lyDo: d.lyDo,
          soNgay: d.soNgayNghi ? Number(d.soNgayNghi) : null,
          trangThai: d.trangThai,
          capDuyet: 1,
          ngayTao: d.ngayTao,
          soNgaycho: this.tinhSoNgayCho(d.ngayTao),
        })),
      );
    }

    // Sắp xếp theo ngày tạo (FIFO)
    results.sort((a, b) => new Date(a.ngayTao).getTime() - new Date(b.ngayTao).getTime());

    // Phân trang nếu ALL
    const paginatedResults = loai === 'ALL' ? results.slice(skip, skip + limit) : results;
    const total = loai === 'ALL' ? results.length : paginatedResults.length;

    return {
      data: paginatedResults,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Lấy danh sách đơn quá hạn
   */
  async layDanhSachQuaHan(nguoiDuyetId: number, soNgay: number = 3) {
    const ngayQuaHan = new Date();
    ngayQuaHan.setDate(ngayQuaHan.getDate() - soNgay);

    const [yeuCauQuaHan, nghiPhepQuaHan] = await Promise.all([
      this.prisma.donYeuCau.findMany({
        where: {
          trangThai: { in: ['CHO_DUYET_1', 'CHO_DUYET_2'] },
          ngayTao: { lt: ngayQuaHan },
        },
        include: {
          nhanVien: { select: { id: true, maNhanVien: true, hoTen: true } },
          phongBan: { select: { id: true, tenPhongBan: true } },
          loaiYeuCau: { select: { maLoai: true, tenLoai: true } },
        },
        orderBy: { ngayTao: 'asc' },
      }),
      this.prisma.donNghiPhep.findMany({
        where: {
          trangThai: 'GUI_DUYET',
          ngayTao: { lt: ngayQuaHan },
        },
        include: {
          nhanVien: { select: { id: true, maNhanVien: true, hoTen: true } },
          phongBan: { select: { id: true, tenPhongBan: true } },
        },
        orderBy: { ngayTao: 'asc' },
      }),
    ]);

    return {
      soNgayQuaHan: soNgay,
      yeuCau: yeuCauQuaHan.map((d) => ({
        ...d,
        soNgayCho: this.tinhSoNgayCho(d.ngayTao),
      })),
      nghiPhep: nghiPhepQuaHan.map((d) => ({
        ...d,
        soNgayCho: this.tinhSoNgayCho(d.ngayTao),
      })),
      tongQuaHan: yeuCauQuaHan.length + nghiPhepQuaHan.length,
    };
  }

  /**
   * Duyệt hàng loạt nhiều loại đơn
   */
  async duyetHangLoat(
    donYeuCauIds: number[],
    donNghiPhepIds: number[],
    nguoiDuyetId: number,
    ghiChu?: string,
  ) {
    const results = {
      yeuCau: { success: 0, failed: 0, errors: [] as string[] },
      nghiPhep: { success: 0, failed: 0, errors: [] as string[] },
    };

    // Duyệt đơn yêu cầu
    for (const id of donYeuCauIds) {
      try {
        const don = await this.prisma.donYeuCau.findUnique({ where: { id } });
        if (!don) {
          results.yeuCau.failed++;
          results.yeuCau.errors.push(`Đơn #${id}: Không tìm thấy`);
          continue;
        }

        if (don.trangThai === 'CHO_DUYET_1') {
          // Kiểm tra workflow có 2 cấp không
          const workflow = await this.prisma.requestWorkflowConfig.findFirst({
            where: { loaiYeuCauId: don.loaiYeuCauId, isActive: true },
          });

          const trangThaiMoi = workflow?.soCap === 2 ? 'CHO_DUYET_2' : 'DA_DUYET';
          await this.prisma.donYeuCau.update({
            where: { id },
            data: {
              trangThai: trangThaiMoi,
              nguoiDuyet1Id: nguoiDuyetId,
              ngayDuyet1: new Date(),
              ghiChuDuyet1: ghiChu,
            },
          });
        } else if (don.trangThai === 'CHO_DUYET_2') {
          await this.prisma.donYeuCau.update({
            where: { id },
            data: {
              trangThai: 'DA_DUYET',
              nguoiDuyet2Id: nguoiDuyetId,
              ngayDuyet2: new Date(),
              ghiChuDuyet2: ghiChu,
            },
          });
        }
        results.yeuCau.success++;
      } catch (error: any) {
        results.yeuCau.failed++;
        results.yeuCau.errors.push(`Đơn #${id}: ${error.message}`);
      }
    }

    // Duyệt đơn nghỉ phép
    for (const id of donNghiPhepIds) {
      try {
        await this.prisma.donNghiPhep.update({
          where: { id },
          data: {
            trangThai: 'DA_DUYET',
            nguoiDuyetId: nguoiDuyetId,
            ngayDuyet: new Date(),
            // ghiChu stored in lyDo field for nghiPhep
          },
        });
        results.nghiPhep.success++;
      } catch (error: any) {
        results.nghiPhep.failed++;
        results.nghiPhep.errors.push(`Đơn nghỉ phép #${id}: ${error.message}`);
      }
    }

    return {
      ...results,
      tongDuyet: results.yeuCau.success + results.nghiPhep.success,
      tongLoi: results.yeuCau.failed + results.nghiPhep.failed,
    };
  }

  /**
   * Thống kê duyệt đơn theo tháng
   */
  async layThongKeDuyet(thang: number, nam: number) {
    const startDate = new Date(nam, thang - 1, 1);
    const endDate = new Date(nam, thang, 0, 23, 59, 59);

    const [yeuCauStats, nghiPhepStats] = await Promise.all([
      this.prisma.donYeuCau.groupBy({
        by: ['trangThai'],
        where: {
          ngayTao: { gte: startDate, lte: endDate },
        },
        _count: true,
      }),
      this.prisma.donNghiPhep.groupBy({
        by: ['trangThai'],
        where: {
          ngayTao: { gte: startDate, lte: endDate },
        },
        _count: true,
      }),
    ]);

    // Tính thời gian duyệt trung bình
    const avgApprovalTime = await this.prisma.$queryRaw<any[]>`
      SELECT 
        AVG(EXTRACT(EPOCH FROM (ngay_duyet_1 - ngay_tao)) / 3600) as avg_hours
      FROM don_yeu_cau
      WHERE trang_thai = 'DA_DUYET'
        AND ngay_tao >= ${startDate}
        AND ngay_tao <= ${endDate}
    `;

    return {
      thang,
      nam,
      yeuCau: yeuCauStats.reduce((acc, s) => ({ ...acc, [s.trangThai]: s._count }), {}),
      nghiPhep: nghiPhepStats.reduce((acc, s) => ({ ...acc, [s.trangThai]: s._count }), {}),
      thoiGianDuyetTrungBinhGio: avgApprovalTime[0]?.avg_hours 
        ? parseFloat(avgApprovalTime[0].avg_hours).toFixed(1) 
        : null,
    };
  }

  /**
   * Lịch sử duyệt của người dùng
   */
  async layLichSuDuyet(nguoiDuyetId: number, page: number = 1, limit: number = 20) {
    const skip = (page - 1) * limit;

    const [cap1, cap2, nghiPhep] = await Promise.all([
      this.prisma.donYeuCau.findMany({
        where: { nguoiDuyet1Id: nguoiDuyetId },
        include: {
          nhanVien: { select: { hoTen: true } },
          loaiYeuCau: { select: { tenLoai: true } },
        },
        orderBy: { ngayDuyet1: 'desc' },
        take: limit,
      }),
      this.prisma.donYeuCau.findMany({
        where: { nguoiDuyet2Id: nguoiDuyetId },
        include: {
          nhanVien: { select: { hoTen: true } },
          loaiYeuCau: { select: { tenLoai: true } },
        },
        orderBy: { ngayDuyet2: 'desc' },
        take: limit,
      }),
      this.prisma.donNghiPhep.findMany({
        where: { nguoiDuyetId: nguoiDuyetId },
        include: {
          nhanVien: { select: { hoTen: true } },
        },
        orderBy: { ngayDuyet: 'desc' },
        take: limit,
      }),
    ]);

    // Merge và sắp xếp
    const all = [
      ...cap1.map((d) => ({
        id: d.id,
        loaiDon: 'YEU_CAU',
        tenLoai: d.loaiYeuCau?.tenLoai,
        nhanVien: d.nhanVien?.hoTen,
        ngayDuyet: d.ngayDuyet1,
        trangThai: d.trangThai,
        cap: 1,
      })),
      ...cap2.map((d) => ({
        id: d.id,
        loaiDon: 'YEU_CAU',
        tenLoai: d.loaiYeuCau?.tenLoai,
        nhanVien: d.nhanVien?.hoTen,
        ngayDuyet: d.ngayDuyet2,
        trangThai: d.trangThai,
        cap: 2,
      })),
      ...nghiPhep.map((d) => ({
        id: d.id,
        loaiDon: 'NGHI_PHEP',
        tenLoai: 'Nghỉ phép',
        nhanVien: d.nhanVien?.hoTen,
        ngayDuyet: d.ngayDuyet,
        trangThai: d.trangThai,
        cap: 1,
      })),
    ].sort((a, b) => {
      const dateA = a.ngayDuyet ? new Date(a.ngayDuyet).getTime() : 0;
      const dateB = b.ngayDuyet ? new Date(b.ngayDuyet).getTime() : 0;
      return dateB - dateA;
    });

    return {
      data: all.slice(skip, skip + limit),
      pagination: {
        page,
        limit,
        total: all.length,
        totalPages: Math.ceil(all.length / limit),
      },
    };
  }

  /**
   * Tính số ngày chờ duyệt
   */
  private tinhSoNgayCho(ngayTao: Date): number {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - ngayTao.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }
}
