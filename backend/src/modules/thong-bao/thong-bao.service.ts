// Service Thông báo - Sprint 6
// Xử lý logic tạo, đọc, đánh dấu đã đọc thông báo
// Tích hợp Email Notification
import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { LoaiThongBao } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import {
  ThongBaoQueryDto,
  TaoThongBaoDto,
  ThongBaoResponse,
  DanhSachThongBaoResponse,
} from './thong-bao.dto';

@Injectable()
export class ThongBaoService {
  private readonly logger = new Logger(ThongBaoService.name);
  private transporter: nodemailer.Transporter;
  private emailEnabled: boolean = false;

  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
  ) {
    this.initEmailTransporter();
  }

  /**
   * Khởi tạo email transporter
   */
  private initEmailTransporter() {
    const host = this.configService.get('SMTP_HOST');
    const port = this.configService.get('SMTP_PORT', 587);
    const user = this.configService.get('SMTP_USER');
    const pass = this.configService.get('SMTP_PASS');

    if (host && user && pass) {
      this.transporter = nodemailer.createTransport({
        host,
        port,
        secure: port === 465,
        auth: { user, pass },
      });
      this.emailEnabled = true;
      this.logger.log(`Email notification enabled: ${host}:${port}`);
    } else {
      this.logger.warn('Email notification disabled - SMTP not configured');
    }
  }

  /**
   * Gửi email thông báo
   */
  private async sendEmailNotification(
    toEmail: string,
    subject: string,
    content: string,
  ): Promise<boolean> {
    if (!this.emailEnabled || !toEmail) return false;

    try {
      const fromEmail = this.configService.get('SMTP_FROM', 'noreply@company.vn');
      const companyName = this.configService.get('COMPANY_NAME', 'HRM Lite');
      const baseUrl = this.configService.get('FRONTEND_URL', 'http://localhost');

      const html = this.generateNotificationHtml(subject, content, baseUrl);

      await this.transporter.sendMail({
        from: `"${companyName}" <${fromEmail}>`,
        to: toEmail,
        subject: `[${companyName}] ${subject}`,
        html,
      });

      this.logger.log(`Email sent to ${toEmail}: ${subject}`);
      return true;
    } catch (error: any) {
      this.logger.error(`Failed to send email to ${toEmail}: ${error.message}`);
      return false;
    }
  }

  /**
   * Generate HTML template for notification email
   */
  private generateNotificationHtml(title: string, content: string, baseUrl: string): string {
    return `
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #f5f5f5; padding: 20px; margin: 0; }
    .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); overflow: hidden; }
    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; }
    .header h1 { font-size: 24px; margin: 0; }
    .content { padding: 30px; }
    .content p { color: #333; font-size: 16px; line-height: 1.6; }
    .button { display: inline-block; background: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin-top: 20px; }
    .footer { text-align: center; padding: 20px; color: #888; font-size: 13px; border-top: 1px solid #e0e0e0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>HRM Lite</h1>
    </div>
    <div class="content">
      <h2>${title}</h2>
      <p>${content}</p>
      <a href="${baseUrl}" class="button">Xem chi tiết</a>
    </div>
    <div class="footer">
      <p>Email này được gửi tự động. Vui lòng không trả lời.</p>
    </div>
  </div>
</body>
</html>
    `;
  }

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
    const thongBao = await this.taoThongBao({
      nguoiNhanId: nguoiDuyetId,
      loaiThongBao: LoaiThongBao.YEU_CAU_MOI,
      tieuDe: `Yêu cầu ${loaiYeuCau} mới`,
      noiDung: `${nhanVienTen} đã gửi yêu cầu ${loaiYeuCau} cần duyệt`,
      link: `/yeu-cau/duyet/${donYeuCauId}`,
      duLieuThem: { donYeuCauId },
    });

    // Gửi email cho người duyệt - NguoiDung đã có email trực tiếp
    const nguoiDuyet = await this.prisma.nguoiDung.findUnique({
      where: { id: nguoiDuyetId },
    });
    if (nguoiDuyet?.email) {
      await this.sendEmailNotification(
        nguoiDuyet.email,
        `Yêu cầu ${loaiYeuCau} mới cần duyệt`,
        `<strong>${nhanVienTen}</strong> đã gửi yêu cầu <strong>${loaiYeuCau}</strong> cần bạn duyệt. Vui lòng đăng nhập hệ thống để xem chi tiết.`,
      );
    }
  }

  /**
   * Gửi thông báo khi yêu cầu được duyệt
   */
  async guiThongBaoYeuCauDaDuyet(
    nguoiNhanId: number,
    loaiYeuCau: string,
    donYeuCauId: number,
  ) {
    const thongBao = await this.taoThongBao({
      nguoiNhanId,
      loaiThongBao: LoaiThongBao.YEU_CAU_DA_DUYET,
      tieuDe: `Yêu cầu ${loaiYeuCau} đã được duyệt`,
      noiDung: `Yêu cầu ${loaiYeuCau} của bạn đã được duyệt`,
      link: `/portal/yeu-cau`,
      duLieuThem: { donYeuCauId },
    });

    // Gửi email cho nhân viên - NguoiDung đã có email và hoTen trực tiếp
    const nguoiDung = await this.prisma.nguoiDung.findUnique({
      where: { id: nguoiNhanId },
    });
    if (nguoiDung?.email) {
      await this.sendEmailNotification(
        nguoiDung.email,
        `Yêu cầu ${loaiYeuCau} đã được duyệt`,
        `Xin chào <strong>${nguoiDung.hoTen}</strong>,<br><br>Yêu cầu <strong>${loaiYeuCau}</strong> của bạn đã được <span style="color: #28a745; font-weight: bold;">DUYỆT</span>.<br><br>Vui lòng đăng nhập hệ thống để xem chi tiết.`,
      );
    }
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
    const thongBao = await this.taoThongBao({
      nguoiNhanId,
      loaiThongBao: LoaiThongBao.YEU_CAU_TU_CHOI,
      tieuDe: `Yêu cầu ${loaiYeuCau} bị từ chối`,
      noiDung: `Yêu cầu ${loaiYeuCau} của bạn bị từ chối. Lý do: ${lyDo || 'Không có'}`,
      link: `/portal/yeu-cau`,
      duLieuThem: { donYeuCauId, lyDo },
    });

    // Gửi email cho nhân viên
    const nguoiDung = await this.prisma.nguoiDung.findUnique({
      where: { id: nguoiNhanId },
    });
    if (nguoiDung?.email) {
      await this.sendEmailNotification(
        nguoiDung.email,
        `Yêu cầu ${loaiYeuCau} bị từ chối`,
        `Xin chào <strong>${nguoiDung.hoTen}</strong>,<br><br>Yêu cầu <strong>${loaiYeuCau}</strong> của bạn đã bị <span style="color: #dc3545; font-weight: bold;">TỪ CHỐI</span>.<br><br><strong>Lý do:</strong> ${lyDo || 'Không có lý do'}<br><br>Bạn có thể chỉnh sửa và gửi lại đơn.`,
      );
    }
  }

  /**
   * Gửi thông báo khi nghỉ phép được duyệt
   */
  async guiThongBaoNghiPhepDaDuyet(
    nguoiNhanId: number,
    loaiNghi: string,
    donNghiPhepId: number,
  ) {
    const thongBao = await this.taoThongBao({
      nguoiNhanId,
      loaiThongBao: LoaiThongBao.NGHI_PHEP_DA_DUYET,
      tieuDe: `Đơn ${loaiNghi} đã được duyệt`,
      noiDung: `Đơn xin ${loaiNghi} của bạn đã được duyệt`,
      link: `/portal/yeu-cau`,
      duLieuThem: { donNghiPhepId },
    });

    // Gửi email cho nhân viên
    const nguoiDung = await this.prisma.nguoiDung.findUnique({
      where: { id: nguoiNhanId },
    });
    if (nguoiDung?.email) {
      await this.sendEmailNotification(
        nguoiDung.email,
        `Đơn ${loaiNghi} đã được duyệt`,
        `Xin chào <strong>${nguoiDung.hoTen}</strong>,<br><br>Đơn xin <strong>${loaiNghi}</strong> của bạn đã được <span style="color: #28a745; font-weight: bold;">DUYỆT</span>.<br><br>Vui lòng đăng nhập hệ thống để xem chi tiết.`,
      );
    }
  }

  /**
   * Gửi thông báo nhắc nhở duyệt đơn (auto-escalation)
   */
  async guiThongBaoNhacNhoDuyet(
    nguoiDuyetId: number,
    soDonQuaHan: number,
    soNgayQuaHan: number,
  ) {
    const thongBao = await this.taoThongBao({
      nguoiNhanId: nguoiDuyetId,
      loaiThongBao: LoaiThongBao.NHAC_NHO,
      tieuDe: `Nhắc nhở: ${soDonQuaHan} đơn chờ duyệt`,
      noiDung: `Bạn có ${soDonQuaHan} đơn yêu cầu chờ duyệt đã quá ${soNgayQuaHan} ngày. Vui lòng xử lý sớm.`,
      link: `/yeu-cau/inbox`,
      duLieuThem: { soDonQuaHan, soNgayQuaHan },
    });

    // Gửi email nhắc nhở
    const nguoiDuyet = await this.prisma.nguoiDung.findUnique({
      where: { id: nguoiDuyetId },
    });
    if (nguoiDuyet?.email) {
      await this.sendEmailNotification(
        nguoiDuyet.email,
        `⚠️ Nhắc nhở: ${soDonQuaHan} đơn chờ duyệt`,
        `Xin chào <strong>${nguoiDuyet.hoTen}</strong>,<br><br>Bạn có <strong>${soDonQuaHan}</strong> đơn yêu cầu đang chờ duyệt đã quá <strong>${soNgayQuaHan} ngày</strong>.<br><br>Vui lòng đăng nhập hệ thống để xử lý sớm nhất có thể.`,
      );
    }
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
