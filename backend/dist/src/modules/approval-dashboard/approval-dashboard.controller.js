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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApprovalDashboardController = void 0;
const common_1 = require("@nestjs/common");
const approval_dashboard_service_1 = require("./approval-dashboard.service");
const auto_escalation_service_1 = require("./auto-escalation.service");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const quyen_decorator_1 = require("../../common/decorators/quyen.decorator");
let ApprovalDashboardController = class ApprovalDashboardController {
    constructor(approvalService, escalationService) {
        this.approvalService = approvalService;
        this.escalationService = escalationService;
    }
    async laySummary(req) {
        return this.approvalService.laySummary(req.user?.id);
    }
    async layDanhSachChoDuyet(loai, cap, phongBanId, tuNgay, denNgay, page, limit, req) {
        return this.approvalService.layDanhSachChoDuyet({
            nguoiDuyetId: req.user?.id,
            loai: loai || 'ALL',
            cap: cap === '1' ? 1 : cap === '2' ? 2 : undefined,
            phongBanId: phongBanId ? parseInt(phongBanId) : undefined,
            tuNgay,
            denNgay,
            page: page ? parseInt(page) : 1,
            limit: limit ? parseInt(limit) : 20,
        });
    }
    async layDanhSachQuaHan(soNgay, req) {
        const ngay = soNgay ? parseInt(soNgay) : 3;
        return this.approvalService.layDanhSachQuaHan(req.user?.id, ngay);
    }
    async duyetHangLoat(dto, req) {
        return this.approvalService.duyetHangLoat(dto.donYeuCauIds || [], dto.donNghiPhepIds || [], req.user?.id, dto.ghiChu);
    }
    async layThongKe(thang, nam) {
        const t = thang ? parseInt(thang) : new Date().getMonth() + 1;
        const n = nam ? parseInt(nam) : new Date().getFullYear();
        return this.approvalService.layThongKeDuyet(t, n);
    }
    async layLichSuDuyetCuaToi(page, limit, req) {
        return this.approvalService.layLichSuDuyet(req.user?.id, page ? parseInt(page) : 1, limit ? parseInt(limit) : 20);
    }
    async runJob(job) {
        return this.escalationService.runManually(job);
    }
};
exports.ApprovalDashboardController = ApprovalDashboardController;
__decorate([
    (0, common_1.Get)('summary'),
    (0, quyen_decorator_1.Quyen)('YEU_CAU_DUYET_CAP_1', 'YEU_CAU_DUYET_CAP_2', 'ADMIN'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ApprovalDashboardController.prototype, "laySummary", null);
__decorate([
    (0, common_1.Get)('pending'),
    (0, quyen_decorator_1.Quyen)('YEU_CAU_DUYET_CAP_1', 'YEU_CAU_DUYET_CAP_2', 'ADMIN'),
    __param(0, (0, common_1.Query)('loai')),
    __param(1, (0, common_1.Query)('cap')),
    __param(2, (0, common_1.Query)('phongBanId')),
    __param(3, (0, common_1.Query)('tuNgay')),
    __param(4, (0, common_1.Query)('denNgay')),
    __param(5, (0, common_1.Query)('page')),
    __param(6, (0, common_1.Query)('limit')),
    __param(7, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String, String, String, Object]),
    __metadata("design:returntype", Promise)
], ApprovalDashboardController.prototype, "layDanhSachChoDuyet", null);
__decorate([
    (0, common_1.Get)('overdue'),
    (0, quyen_decorator_1.Quyen)('YEU_CAU_DUYET_CAP_1', 'YEU_CAU_DUYET_CAP_2', 'ADMIN'),
    __param(0, (0, common_1.Query)('soNgay')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ApprovalDashboardController.prototype, "layDanhSachQuaHan", null);
__decorate([
    (0, common_1.Post)('batch-approve'),
    (0, quyen_decorator_1.Quyen)('YEU_CAU_DUYET_CAP_1', 'YEU_CAU_DUYET_CAP_2', 'ADMIN'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ApprovalDashboardController.prototype, "duyetHangLoat", null);
__decorate([
    (0, common_1.Get)('stats'),
    (0, quyen_decorator_1.Quyen)('ADMIN'),
    __param(0, (0, common_1.Query)('thang')),
    __param(1, (0, common_1.Query)('nam')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ApprovalDashboardController.prototype, "layThongKe", null);
__decorate([
    (0, common_1.Get)('my-approvals'),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], ApprovalDashboardController.prototype, "layLichSuDuyetCuaToi", null);
__decorate([
    (0, common_1.Post)('run-job/:job'),
    (0, quyen_decorator_1.Quyen)('ADMIN'),
    __param(0, (0, common_1.Param)('job')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ApprovalDashboardController.prototype, "runJob", null);
exports.ApprovalDashboardController = ApprovalDashboardController = __decorate([
    (0, common_1.Controller)('approval-dashboard'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [approval_dashboard_service_1.ApprovalDashboardService,
        auto_escalation_service_1.AutoEscalationService])
], ApprovalDashboardController);
//# sourceMappingURL=approval-dashboard.controller.js.map