// Service Thông báo - Sprint 6
// Xử lý logic tạo, đọc, đánh dấu đã đọc thông báo
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { LoaiThongBao } from '@prisma/client';
import {
  ThongBaoQueryDto,
  TaoThongBaoDto,
  ThongBaoResponse,
  DanhSachThongBaoResponse,
} from './thong-bao.dto';

@Injectable()
export class ThongBaoService {
  constructor(private prisma: PrismaService) {}

  /**
   * Lấy danh sách thông báo của user
   */
  async layDanhSach(
    nguoiDungId: number,
    query: ThongBaoQueryDto,
  ): Promise<DanhSachThongBaoResponse> {
    const { daDoc, loaiThongBao, page = 1, limit = 20 } = query;
    const skip = (page - 1) * limit;

    const where: any = { nguoiNhanId: nguoiDungId };
    if (daDoc !== undefined) {
      where.daDoc = daDoc;
    }
    if (loaiThongBao) {
      where.loaiThongBao = loaiThongBao;
    }

    const [data, total, chuaDoc] = await Promise.all([
      this.prisma.thongBao.findMany({
        where,
        orderBy: { ngayTao: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.thongBao.count({ where }),
      this.prisma.thongBao.count({
        where: { nguoiNhanId: nguoiDungId, daDoc: false },
      }),
    ]);

    return {
      data: data.map((tb) => this.mapToResponse(tb)),
      total,
      page,
      limit,
      chuaDoc,
    };
  }

  /**
   * Đếm số thông báo chưa đọc
   */
  async demChuaDoc(nguoiDungId: number): Promise<number> {
    return this.prisma.thongBao.count({
      where: { nguoiNhanId: nguoiDungId, daDoc: false },
    });
  }

  /**
   * Đánh dấu 1 thông báo đã đọc
   */
  async danhDauDaDoc(nguoiDungId: number, thongBaoId: number): Promise<ThongBaoResponse> {
    const thongBao = await this.prisma.thongBao.findFirst({
      where: { id: thongBaoId, nguoiNhanId: nguoiDungId },
    });

    if (!thongBao) {
      throw new NotFoundException('Không tìm thấy thông báo');
    }

    const updated = await this.prisma.thongBao.update({
      where: { id: thongBaoId },
      data: { daDoc: true, ngayDoc: new Date() },
    });

    return this.mapToResponse(updated);
  }

  /**
   * Đánh dấu tất cả thông báo đã đọc
   */
  async danhDauTatCaDaDoc(nguoiDungId: number): Promise<{ count: number }> {
    const result = await this.prisma.thongBao.updateMany({
      where: { nguoiNhanId: nguoiDungId, daDoc: false },
      data: { daDoc: true, ngayDoc: new Date() },
    });

    return { count: result.count };
  }

  /**
   * Xóa thông báo cũ (cleanup job)
   * Xóa thông báo đã đọc > 30 ngày
   */
  async xoaThongBaoCu(): Promise<{ count: number }> {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const result = await this.prisma.thongBao.deleteMany({
      where: {
        daDoc: true,
        ngayDoc: { lt: thirtyDaysAgo },
      },
    });

    return { count: result.count };
  }

  // ============================================
  // INTERNAL METHODS: Tạo thông báo
  // ============================================

  /**
   * Tạo thông báo (internal use)
   */
  async taoThongBao(dto: TaoThongBaoDto): Promise<ThongBaoResponse> {
    const thongBao = await this.prisma.thongBao.create({
      data: {
        nguoiNhanId: dto.nguoiNhanId,
        loaiThongBao: dto.loaiThongBao,
        tieuDe: dto.tieuDe,
        noiDung: dto.noiDung,
        link: dto.link,
        duLieuThem: dto.duLieuThem,
      },
    });

    return this.mapToResponse(thongBao);
  }

  /**
   * Tạo thông báo cho nhiều người (batch)
   */
  async taoThongBaoNhieuNguoi(
    nguoiNhanIds: number[],
    loaiThongBao: LoaiThongBao,
    tieuDe: string,
    noiDung: string,
    link?: string,
    duLieuThem?: Record<string, any>,
  ): Promise<{ count: number }> {
    const result = await this.prisma.thongBao.createMany({
      data: nguoiNhanIds.map((nguoiNhanId) => ({
        nguoiNhanId,
        loaiThongBao,
        tieuDe,
        noiDung,
        link,
        duLieuThem,
      })),
    });

    return { count: result.count };
  }

  // ============================================
  // EVENT HOOKS: Gửi thông báo tự động
  // ============================================

  /**
   * Gửi thông báo khi có yêu cầu mới cần duyệt
   */
  async guiThongBaoYeuCauMoi(
    nguoiDuyetId: number,
    nhanVienTen: string,
    loaiYeuCau: string,
    donYeuCauId: number,
  ) {
    await this.taoThongBao({
      nguoiNhanId: nguoiDuyetId,
      loaiThongBao: LoaiThongBao.YEU_CAU_MOI,
      tieuDe: `Yêu cầu ${loaiYeuCau} mới`,
      noiDung: `${nhanVienTen} đã gửi yêu cầu ${loaiYeuCau} cần duyệt`,
      link: `/yeu-cau/duyet/${donYeuCauId}`,
      duLieuThem: { donYeuCauId },
    });
  }

  /**
   * Gửi thông báo khi yêu cầu được duyệt
   */
  async guiThongBaoYeuCauDaDuyet(
    nguoiNhanId: number,
    loaiYeuCau: string,
    donYeuCauId: number,
  ) {
    await this.taoThongBao({
      nguoiNhanId,
      loaiThongBao: LoaiThongBao.YEU_CAU_DA_DUYET,
      tieuDe: `Yêu cầu ${loaiYeuCau} đã được duyệt`,
      noiDung: `Yêu cầu ${loaiYeuCau} của bạn đã được duyệt`,
      link: `/portal/yeu-cau`,
      duLieuThem: { donYeuCauId },
    });
  }

  /**
   * Gửi thông báo khi yêu cầu bị từ chối
   */
  async guiThongBaoYeuCauTuChoi(
    nguoiNhanId: number,
    loaiYeuCau: string,
    donYeuCauId: number,
    lyDo: string,
  ) {
    await this.taoThongBao({
      nguoiNhanId,
      loaiThongBao: LoaiThongBao.YEU_CAU_TU_CHOI,
      tieuDe: `Yêu cầu ${loaiYeuCau} bị từ chối`,
      noiDung: `Yêu cầu ${loaiYeuCau} của bạn bị từ chối. Lý do: ${lyDo || 'Không có'}`,
      link: `/portal/yeu-cau`,
      duLieuThem: { donYeuCauId, lyDo },
    });
  }

  /**
   * Gửi thông báo khi nghỉ phép được duyệt
   */
  async guiThongBaoNghiPhepDaDuyet(
    nguoiNhanId: number,
    loaiNghi: string,
    donNghiPhepId: number,
  ) {
    await this.taoThongBao({
      nguoiNhanId,
      loaiThongBao: LoaiThongBao.NGHI_PHEP_DA_DUYET,
      tieuDe: `Đơn ${loaiNghi} đã được duyệt`,
      noiDung: `Đơn xin ${loaiNghi} của bạn đã được duyệt`,
      link: `/portal/yeu-cau`,
      duLieuThem: { donNghiPhepId },
    });
  }

  /**
   * Gửi thông báo khi lịch phân ca được công bố
   */
  async guiThongBaoLichPhanCa(
    nguoiNhanIds: number[],
    tuNgay: string,
    denNgay: string,
    lichPhanCaId: number,
  ) {
    await this.taoThongBaoNhieuNguoi(
      nguoiNhanIds,
      LoaiThongBao.LICH_PHAN_CA,
      'Lịch làm việc mới',
      `Lịch làm việc từ ${tuNgay} đến ${denNgay} đã được công bố`,
      '/portal/lich-lam',
      { lichPhanCaId, tuNgay, denNgay },
    );
  }

  /**
   * Gửi thông báo khi phiếu lương sẵn sàng
   */
  async guiThongBaoPhieuLuong(
    nguoiNhanId: number,
    kyLuong: string,
    bangLuongId: number,
  ) {
    await this.taoThongBao({
      nguoiNhanId,
      loaiThongBao: LoaiThongBao.PHIEU_LUONG,
      tieuDe: `Phiếu lương ${kyLuong}`,
      noiDung: `Phiếu lương kỳ ${kyLuong} của bạn đã sẵn sàng`,
      link: '/portal/ca-nhan',
      duLieuThem: { bangLuongId, kyLuong },
    });
  }

  // ============================================
  // HELPER
  // ============================================

  private mapToResponse(thongBao: any): ThongBaoResponse {
    return {
      id: thongBao.id,
      loaiThongBao: thongBao.loaiThongBao,
      tieuDe: thongBao.tieuDe,
      noiDung: thongBao.noiDung,
      link: thongBao.link,
      daDoc: thongBao.daDoc,
      ngayDoc: thongBao.ngayDoc,
      duLieuThem: thongBao.duLieuThem as Record<string, any> | null,
      ngayTao: thongBao.ngayTao,
    };
  }
}
