"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var ThongBaoService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThongBaoService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const client_1 = require("@prisma/client");
const config_1 = require("@nestjs/config");
const nodemailer = require("nodemailer");
let ThongBaoService = ThongBaoService_1 = class ThongBaoService {
    constructor(prisma, configService) {
        this.prisma = prisma;
        this.configService = configService;
        this.logger = new common_1.Logger(ThongBaoService_1.name);
        this.emailEnabled = false;
        this.initEmailTransporter();
    }
    initEmailTransporter() {
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
        }
        else {
            this.logger.warn('Email notification disabled - SMTP not configured');
        }
    }
    async sendEmailNotification(toEmail, subject, content) {
        if (!this.emailEnabled || !toEmail)
            return false;
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
        }
        catch (error) {
            this.logger.error(`Failed to send email to ${toEmail}: ${error.message}`);
            return false;
        }
    }
    generateNotificationHtml(title, content, baseUrl) {
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
    async layDanhSach(nguoiDungId, query) {
        const { daDoc, loaiThongBao, page = 1, limit = 20 } = query;
        const skip = (page - 1) * limit;
        const where = { nguoiNhanId: nguoiDungId };
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
    async demChuaDoc(nguoiDungId) {
        return this.prisma.thongBao.count({
            where: { nguoiNhanId: nguoiDungId, daDoc: false },
        });
    }
    async danhDauDaDoc(nguoiDungId, thongBaoId) {
        const thongBao = await this.prisma.thongBao.findFirst({
            where: { id: thongBaoId, nguoiNhanId: nguoiDungId },
        });
        if (!thongBao) {
            throw new common_1.NotFoundException('Không tìm thấy thông báo');
        }
        const updated = await this.prisma.thongBao.update({
            where: { id: thongBaoId },
            data: { daDoc: true, ngayDoc: new Date() },
        });
        return this.mapToResponse(updated);
    }
    async danhDauTatCaDaDoc(nguoiDungId) {
        const result = await this.prisma.thongBao.updateMany({
            where: { nguoiNhanId: nguoiDungId, daDoc: false },
            data: { daDoc: true, ngayDoc: new Date() },
        });
        return { count: result.count };
    }
    async xoaThongBaoCu() {
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
    async taoThongBao(dto) {
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
    async taoThongBaoNhieuNguoi(nguoiNhanIds, loaiThongBao, tieuDe, noiDung, link, duLieuThem) {
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
    async guiThongBaoYeuCauMoi(nguoiDuyetId, nhanVienTen, loaiYeuCau, donYeuCauId) {
        const thongBao = await this.taoThongBao({
            nguoiNhanId: nguoiDuyetId,
            loaiThongBao: client_1.LoaiThongBao.YEU_CAU_MOI,
            tieuDe: `Yêu cầu ${loaiYeuCau} mới`,
            noiDung: `${nhanVienTen} đã gửi yêu cầu ${loaiYeuCau} cần duyệt`,
            link: `/yeu-cau/duyet/${donYeuCauId}`,
            duLieuThem: { donYeuCauId },
        });
        const nguoiDuyet = await this.prisma.nguoiDung.findUnique({
            where: { id: nguoiDuyetId },
        });
        if (nguoiDuyet?.email) {
            await this.sendEmailNotification(nguoiDuyet.email, `Yêu cầu ${loaiYeuCau} mới cần duyệt`, `<strong>${nhanVienTen}</strong> đã gửi yêu cầu <strong>${loaiYeuCau}</strong> cần bạn duyệt. Vui lòng đăng nhập hệ thống để xem chi tiết.`);
        }
    }
    async guiThongBaoYeuCauDaDuyet(nguoiNhanId, loaiYeuCau, donYeuCauId) {
        const thongBao = await this.taoThongBao({
            nguoiNhanId,
            loaiThongBao: client_1.LoaiThongBao.YEU_CAU_DA_DUYET,
            tieuDe: `Yêu cầu ${loaiYeuCau} đã được duyệt`,
            noiDung: `Yêu cầu ${loaiYeuCau} của bạn đã được duyệt`,
            link: `/portal/yeu-cau`,
            duLieuThem: { donYeuCauId },
        });
        const nguoiDung = await this.prisma.nguoiDung.findUnique({
            where: { id: nguoiNhanId },
        });
        if (nguoiDung?.email) {
            await this.sendEmailNotification(nguoiDung.email, `Yêu cầu ${loaiYeuCau} đã được duyệt`, `Xin chào <strong>${nguoiDung.hoTen}</strong>,<br><br>Yêu cầu <strong>${loaiYeuCau}</strong> của bạn đã được <span style="color: #28a745; font-weight: bold;">DUYỆT</span>.<br><br>Vui lòng đăng nhập hệ thống để xem chi tiết.`);
        }
    }
    async guiThongBaoYeuCauTuChoi(nguoiNhanId, loaiYeuCau, donYeuCauId, lyDo) {
        const thongBao = await this.taoThongBao({
            nguoiNhanId,
            loaiThongBao: client_1.LoaiThongBao.YEU_CAU_TU_CHOI,
            tieuDe: `Yêu cầu ${loaiYeuCau} bị từ chối`,
            noiDung: `Yêu cầu ${loaiYeuCau} của bạn bị từ chối. Lý do: ${lyDo || 'Không có'}`,
            link: `/portal/yeu-cau`,
            duLieuThem: { donYeuCauId, lyDo },
        });
        const nguoiDung = await this.prisma.nguoiDung.findUnique({
            where: { id: nguoiNhanId },
        });
        if (nguoiDung?.email) {
            await this.sendEmailNotification(nguoiDung.email, `Yêu cầu ${loaiYeuCau} bị từ chối`, `Xin chào <strong>${nguoiDung.hoTen}</strong>,<br><br>Yêu cầu <strong>${loaiYeuCau}</strong> của bạn đã bị <span style="color: #dc3545; font-weight: bold;">TỪ CHỐI</span>.<br><br><strong>Lý do:</strong> ${lyDo || 'Không có lý do'}<br><br>Bạn có thể chỉnh sửa và gửi lại đơn.`);
        }
    }
    async guiThongBaoNghiPhepDaDuyet(nguoiNhanId, loaiNghi, donNghiPhepId) {
        const thongBao = await this.taoThongBao({
            nguoiNhanId,
            loaiThongBao: client_1.LoaiThongBao.NGHI_PHEP_DA_DUYET,
            tieuDe: `Đơn ${loaiNghi} đã được duyệt`,
            noiDung: `Đơn xin ${loaiNghi} của bạn đã được duyệt`,
            link: `/portal/yeu-cau`,
            duLieuThem: { donNghiPhepId },
        });
        const nguoiDung = await this.prisma.nguoiDung.findUnique({
            where: { id: nguoiNhanId },
        });
        if (nguoiDung?.email) {
            await this.sendEmailNotification(nguoiDung.email, `Đơn ${loaiNghi} đã được duyệt`, `Xin chào <strong>${nguoiDung.hoTen}</strong>,<br><br>Đơn xin <strong>${loaiNghi}</strong> của bạn đã được <span style="color: #28a745; font-weight: bold;">DUYỆT</span>.<br><br>Vui lòng đăng nhập hệ thống để xem chi tiết.`);
        }
    }
    async guiThongBaoNhacNhoDuyet(nguoiDuyetId, soDonQuaHan, soNgayQuaHan) {
        const thongBao = await this.taoThongBao({
            nguoiNhanId: nguoiDuyetId,
            loaiThongBao: client_1.LoaiThongBao.NHAC_NHO,
            tieuDe: `Nhắc nhở: ${soDonQuaHan} đơn chờ duyệt`,
            noiDung: `Bạn có ${soDonQuaHan} đơn yêu cầu chờ duyệt đã quá ${soNgayQuaHan} ngày. Vui lòng xử lý sớm.`,
            link: `/yeu-cau/inbox`,
            duLieuThem: { soDonQuaHan, soNgayQuaHan },
        });
        const nguoiDuyet = await this.prisma.nguoiDung.findUnique({
            where: { id: nguoiDuyetId },
        });
        if (nguoiDuyet?.email) {
            await this.sendEmailNotification(nguoiDuyet.email, `⚠️ Nhắc nhở: ${soDonQuaHan} đơn chờ duyệt`, `Xin chào <strong>${nguoiDuyet.hoTen}</strong>,<br><br>Bạn có <strong>${soDonQuaHan}</strong> đơn yêu cầu đang chờ duyệt đã quá <strong>${soNgayQuaHan} ngày</strong>.<br><br>Vui lòng đăng nhập hệ thống để xử lý sớm nhất có thể.`);
        }
    }
    async guiThongBaoLichPhanCa(nguoiNhanIds, tuNgay, denNgay, lichPhanCaId) {
        await this.taoThongBaoNhieuNguoi(nguoiNhanIds, client_1.LoaiThongBao.LICH_PHAN_CA, 'Lịch làm việc mới', `Lịch làm việc từ ${tuNgay} đến ${denNgay} đã được công bố`, '/portal/lich-lam', { lichPhanCaId, tuNgay, denNgay });
    }
    async guiThongBaoPhieuLuong(nguoiNhanId, kyLuong, bangLuongId) {
        await this.taoThongBao({
            nguoiNhanId,
            loaiThongBao: client_1.LoaiThongBao.PHIEU_LUONG,
            tieuDe: `Phiếu lương ${kyLuong}`,
            noiDung: `Phiếu lương kỳ ${kyLuong} của bạn đã sẵn sàng`,
            link: '/portal/ca-nhan',
            duLieuThem: { bangLuongId, kyLuong },
        });
    }
    mapToResponse(thongBao) {
        return {
            id: thongBao.id,
            loaiThongBao: thongBao.loaiThongBao,
            tieuDe: thongBao.tieuDe,
            noiDung: thongBao.noiDung,
            link: thongBao.link,
            daDoc: thongBao.daDoc,
            ngayDoc: thongBao.ngayDoc,
            duLieuThem: thongBao.duLieuThem,
            ngayTao: thongBao.ngayTao,
        };
    }
};
exports.ThongBaoService = ThongBaoService;
exports.ThongBaoService = ThongBaoService = ThongBaoService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        config_1.ConfigService])
], ThongBaoService);
//# sourceMappingURL=thong-bao.service.js.map