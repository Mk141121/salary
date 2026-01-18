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
exports.ReportsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const reports_service_1 = require("./reports.service");
const reports_dto_1 = require("./reports.dto");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../common/guards/roles.guard");
const vai_tro_decorator_1 = require("../../common/decorators/vai-tro.decorator");
let ReportsController = class ReportsController {
    constructor(reportsService) {
        this.reportsService = reportsService;
    }
    async getDiTreVeSom(filter) {
        return this.reportsService.getDiTreVeSom(filter);
    }
    async getOT(filter) {
        return this.reportsService.getOT(filter);
    }
    async getNghiPhep(filter) {
        return this.reportsService.getNghiPhep(filter);
    }
    async getQuyLuong(filter) {
        return this.reportsService.getQuyLuong(filter);
    }
    async getHeadcount(filter) {
        return this.reportsService.getHeadcount(filter);
    }
    async getChamCong(filter) {
        return this.reportsService.getChamCong(filter);
    }
    async getDashboard(thang, nam) {
        return this.reportsService.getDashboard(thang ? Number(thang) : undefined, nam ? Number(nam) : undefined);
    }
};
exports.ReportsController = ReportsController;
__decorate([
    (0, common_1.Get)('di-tre-ve-som'),
    (0, vai_tro_decorator_1.VaiTro)('ADMIN', 'HR', 'MANAGER'),
    (0, swagger_1.ApiOperation)({ summary: 'Báo cáo đi trễ / về sớm' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [reports_dto_1.ReportFilterDto]),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "getDiTreVeSom", null);
__decorate([
    (0, common_1.Get)('ot'),
    (0, vai_tro_decorator_1.VaiTro)('ADMIN', 'HR', 'MANAGER'),
    (0, swagger_1.ApiOperation)({ summary: 'Báo cáo OT' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [reports_dto_1.ReportFilterDto]),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "getOT", null);
__decorate([
    (0, common_1.Get)('nghi-phep'),
    (0, vai_tro_decorator_1.VaiTro)('ADMIN', 'HR', 'MANAGER'),
    (0, swagger_1.ApiOperation)({ summary: 'Báo cáo nghỉ phép' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [reports_dto_1.ReportFilterDto]),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "getNghiPhep", null);
__decorate([
    (0, common_1.Get)('quy-luong'),
    (0, vai_tro_decorator_1.VaiTro)('ADMIN', 'HR'),
    (0, swagger_1.ApiOperation)({ summary: 'Báo cáo quỹ lương theo phòng ban/khoản' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [reports_dto_1.ReportFilterDto]),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "getQuyLuong", null);
__decorate([
    (0, common_1.Get)('headcount'),
    (0, vai_tro_decorator_1.VaiTro)('ADMIN', 'HR', 'MANAGER'),
    (0, swagger_1.ApiOperation)({ summary: 'Báo cáo Headcount' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [reports_dto_1.ReportFilterDto]),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "getHeadcount", null);
__decorate([
    (0, common_1.Get)('cham-cong'),
    (0, vai_tro_decorator_1.VaiTro)('ADMIN', 'HR', 'MANAGER'),
    (0, swagger_1.ApiOperation)({ summary: 'Báo cáo chấm công tổng hợp' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [reports_dto_1.ReportFilterDto]),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "getChamCong", null);
__decorate([
    (0, common_1.Get)('dashboard'),
    (0, vai_tro_decorator_1.VaiTro)('ADMIN', 'HR', 'MANAGER'),
    (0, swagger_1.ApiOperation)({ summary: 'Dashboard tổng hợp với KPIs và Alerts' }),
    (0, swagger_1.ApiQuery)({ name: 'thang', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'nam', required: false, type: Number }),
    __param(0, (0, common_1.Query)('thang')),
    __param(1, (0, common_1.Query)('nam')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "getDashboard", null);
exports.ReportsController = ReportsController = __decorate([
    (0, swagger_1.ApiTags)('Reports'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('reports'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [reports_service_1.ReportsService])
], ReportsController);
//# sourceMappingURL=reports.controller.js.map