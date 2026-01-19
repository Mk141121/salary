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
var AutoEscalationService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutoEscalationService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const prisma_service_1 = require("../../prisma/prisma.service");
const thong_bao_service_1 = require("../thong-bao/thong-bao.service");
const config_1 = require("@nestjs/config");
let AutoEscalationService = AutoEscalationService_1 = class AutoEscalationService {
    constructor(prisma, thongBaoService, configService) {
        this.prisma = prisma;
        this.thongBaoService = thongBaoService;
        this.configService = configService;
        this.logger = new common_1.Logger(AutoEscalationService_1.name);
        this.config = {
            soNgayNhacNho: parseInt(this.configService.get('ESCALATION_REMIND_DAYS', '2')),
            soNgayEscalate: parseInt(this.configService.get('ESCALATION_DAYS', '5')),
            soNgayTuDongDuyet: parseInt(this.configService.get('AUTO_APPROVE_DAYS', '7')),
            tuDongDuyet: this.configService.get('AUTO_APPROVE_ENABLED', 'false') === 'true',
            guiEmailNhacNho: this.configService.get('ESCALATION_EMAIL_ENABLED', 'true') === 'true',
        };
    }
    onModuleInit() {
        this.logger.log('Auto-Escalation Service initialized');
        this.logger.log(`Config: Remind after ${this.config.soNgayNhacNho} days, Escalate after ${this.config.soNgayEscalate} days`);
    }
    async nhacNhoDonQuaHan() {
        this.logger.log('Running: Nhắc nhở đơn quá hạn');
        try {
            const ngayNhacNho = new Date();
            ngayNhacNho.setDate(ngayNhacNho.getDate() - this.config.soNgayNhacNho);
            const donQuaHan = await this.prisma.donYeuCau.findMany({
                where: {
                    trangThai: { in: ['CHO_DUYET_1', 'CHO_DUYET_2'] },
                    ngayTao: { lt: ngayNhacNho },
                },
                include: {
                    nhanVien: { select: { hoTen: true, phongBanId: true } },
                    loaiYeuCau: { select: { tenLoai: true } },
                },
            });
            if (donQuaHan.length === 0) {
                this.logger.log('Không có đơn quá hạn cần nhắc nhở');
                return;
            }
            const nhomTheoNguoiDuyet = new Map();
            for (const don of donQuaHan) {
                const phongBan = await this.prisma.phongBan.findFirst({
                    where: { id: don.nhanVien?.phongBanId || 0 },
                    select: { nguoiQuanLyId: true },
                });
                const nguoiDuyetId = don.trangThai === 'CHO_DUYET_1'
                    ? phongBan?.nguoiQuanLyId
                    : await this.layNguoiDuyetCap2();
                if (nguoiDuyetId) {
                    if (!nhomTheoNguoiDuyet.has(nguoiDuyetId)) {
                        nhomTheoNguoiDuyet.set(nguoiDuyetId, []);
                    }
                    nhomTheoNguoiDuyet.get(nguoiDuyetId).push(don);
                }
            }
            for (const [nguoiDuyetId, danhSachDon] of nhomTheoNguoiDuyet) {
                const nguoiDung = await this.prisma.nguoiDung.findFirst({
                    where: { nhanVienId: nguoiDuyetId },
                });
                if (nguoiDung) {
                    await this.thongBaoService.guiThongBaoNhacNhoDuyet(nguoiDung.id, danhSachDon.length, this.config.soNgayNhacNho);
                    this.logger.log(`Đã gửi nhắc nhở ${danhSachDon.length} đơn cho người duyệt #${nguoiDuyetId}`);
                }
            }
            this.logger.log(`Hoàn thành nhắc nhở: ${donQuaHan.length} đơn`);
        }
        catch (error) {
            this.logger.error(`Lỗi nhắc nhở đơn quá hạn: ${error.message}`);
        }
    }
    async escalateDonQuaHan() {
        this.logger.log('Running: Escalate đơn quá hạn');
        try {
            const ngayEscalate = new Date();
            ngayEscalate.setDate(ngayEscalate.getDate() - this.config.soNgayEscalate);
            const donCanEscalate = await this.prisma.donYeuCau.findMany({
                where: {
                    trangThai: 'CHO_DUYET_1',
                    ngayTao: { lt: ngayEscalate },
                },
                include: {
                    nhanVien: { select: { hoTen: true } },
                    loaiYeuCau: { select: { tenLoai: true } },
                },
            });
            let escalated = 0;
            for (const don of donCanEscalate) {
                const workflow = await this.prisma.requestWorkflowConfig.findFirst({
                    where: { loaiYeuCauId: don.loaiYeuCauId, isActive: true },
                });
                if (workflow?.soCap === 2) {
                    await this.prisma.donYeuCau.update({
                        where: { id: don.id },
                        data: {
                            trangThai: 'CHO_DUYET_2',
                            ghiChuDuyet1: `[AUTO-ESCALATE] Tự động chuyển cấp sau ${this.config.soNgayEscalate} ngày`,
                            ngayDuyet1: new Date(),
                        },
                    });
                    const nguoiDuyetCap2Id = await this.layNguoiDuyetCap2();
                    if (nguoiDuyetCap2Id) {
                        const nguoiDung = await this.prisma.nguoiDung.findFirst({
                            where: { nhanVienId: nguoiDuyetCap2Id },
                        });
                        if (nguoiDung) {
                            await this.thongBaoService.guiThongBaoYeuCauMoi(nguoiDung.id, don.nhanVien?.hoTen || 'Nhân viên', `${don.loaiYeuCau?.tenLoai} (AUTO-ESCALATE)`, don.id);
                        }
                    }
                    escalated++;
                    this.logger.log(`Escalated đơn #${don.id} từ cấp 1 lên cấp 2`);
                }
            }
            this.logger.log(`Hoàn thành escalate: ${escalated}/${donCanEscalate.length} đơn`);
        }
        catch (error) {
            this.logger.error(`Lỗi escalate đơn: ${error.message}`);
        }
    }
    async tuDongDuyetDonQuaHan() {
        if (!this.config.tuDongDuyet) {
            return;
        }
        this.logger.log('Running: Tự động duyệt đơn quá hạn');
        try {
            const ngayTuDongDuyet = new Date();
            ngayTuDongDuyet.setDate(ngayTuDongDuyet.getDate() - this.config.soNgayTuDongDuyet);
            const donCanDuyet = await this.prisma.donYeuCau.findMany({
                where: {
                    trangThai: { in: ['CHO_DUYET_1', 'CHO_DUYET_2'] },
                    ngayTao: { lt: ngayTuDongDuyet },
                },
                include: {
                    loaiYeuCau: true,
                },
            });
            let approved = 0;
            for (const don of donCanDuyet) {
                const workflow = await this.prisma.requestWorkflowConfig.findFirst({
                    where: {
                        loaiYeuCauId: don.loaiYeuCauId,
                        isActive: true,
                    },
                });
                await this.prisma.donYeuCau.update({
                    where: { id: don.id },
                    data: {
                        trangThai: 'DA_DUYET',
                        ghiChuDuyet2: `[AUTO-APPROVE] Tự động duyệt sau ${this.config.soNgayTuDongDuyet} ngày không xử lý`,
                        ngayDuyet2: new Date(),
                    },
                });
                const nguoiDung = await this.prisma.nguoiDung.findFirst({
                    where: { nhanVienId: don.nhanVienId },
                });
                if (nguoiDung) {
                    await this.thongBaoService.guiThongBaoYeuCauDaDuyet(nguoiDung.id, `${don.loaiYeuCau?.tenLoai} (tự động)`, don.id);
                }
                approved++;
                this.logger.log(`Auto-approved đơn #${don.id}`);
            }
            this.logger.log(`Hoàn thành tự động duyệt: ${approved} đơn`);
        }
        catch (error) {
            this.logger.error(`Lỗi tự động duyệt: ${error.message}`);
        }
    }
    async baoCaoTuanMoi() {
        this.logger.log('Running: Báo cáo tuần mới');
        try {
            const [yeuCauCho, nghiPhepCho] = await Promise.all([
                this.prisma.donYeuCau.count({
                    where: { trangThai: { in: ['CHO_DUYET_1', 'CHO_DUYET_2'] } },
                }),
                this.prisma.donNghiPhep.count({
                    where: { trangThai: 'GUI_DUYET' },
                }),
            ]);
            const tongCho = yeuCauCho + nghiPhepCho;
            if (tongCho > 0) {
                const nguoiQuanLyList = await this.prisma.phongBan.findMany({
                    where: { nguoiQuanLyId: { not: null } },
                    select: { nguoiQuanLyId: true },
                });
                const nguoiQuanLyIds = [...new Set(nguoiQuanLyList.map(p => p.nguoiQuanLyId).filter(Boolean))];
                const nguoiCoDuyet = await this.prisma.nguoiDung.findMany({
                    where: {
                        nhanVienId: { in: nguoiQuanLyIds },
                    },
                });
                for (const nguoiDuyet of nguoiCoDuyet) {
                    await this.thongBaoService.taoThongBao({
                        nguoiNhanId: nguoiDuyet.id,
                        loaiThongBao: 'NHAC_NHO',
                        tieuDe: `📊 Báo cáo tuần: ${tongCho} đơn chờ duyệt`,
                        noiDung: `Hiện có ${yeuCauCho} đơn yêu cầu và ${nghiPhepCho} đơn nghỉ phép đang chờ duyệt. Vui lòng kiểm tra và xử lý.`,
                        link: '/approval-dashboard',
                    });
                }
                this.logger.log(`Đã gửi báo cáo tuần cho ${nguoiCoDuyet.length} người`);
            }
        }
        catch (error) {
            this.logger.error(`Lỗi báo cáo tuần: ${error.message}`);
        }
    }
    async layNguoiDuyetCap2() {
        const phongHR = await this.prisma.phongBan.findFirst({
            where: { maPhongBan: { in: ['HR', 'NHAN_SU', 'HC-NS'] } },
            select: { nguoiQuanLyId: true },
        });
        return phongHR?.nguoiQuanLyId || null;
    }
    async runManually(job) {
        switch (job) {
            case 'remind':
                await this.nhacNhoDonQuaHan();
                break;
            case 'escalate':
                await this.escalateDonQuaHan();
                break;
            case 'auto-approve':
                await this.tuDongDuyetDonQuaHan();
                break;
            case 'report':
                await this.baoCaoTuanMoi();
                break;
        }
        return { message: `Job ${job} executed` };
    }
};
exports.AutoEscalationService = AutoEscalationService;
__decorate([
    (0, schedule_1.Cron)('0 8 * * 1-5'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AutoEscalationService.prototype, "nhacNhoDonQuaHan", null);
__decorate([
    (0, schedule_1.Cron)('0 9 * * 1-5'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AutoEscalationService.prototype, "escalateDonQuaHan", null);
__decorate([
    (0, schedule_1.Cron)('0 10 * * 1-5'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AutoEscalationService.prototype, "tuDongDuyetDonQuaHan", null);
__decorate([
    (0, schedule_1.Cron)('0 7 * * 1'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AutoEscalationService.prototype, "baoCaoTuanMoi", null);
exports.AutoEscalationService = AutoEscalationService = AutoEscalationService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        thong_bao_service_1.ThongBaoService,
        config_1.ConfigService])
], AutoEscalationService);
//# sourceMappingURL=auto-escalation.service.js.map