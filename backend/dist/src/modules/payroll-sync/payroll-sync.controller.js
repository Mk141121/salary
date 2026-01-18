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
exports.PayrollSyncController = void 0;
const common_1 = require("@nestjs/common");
const payroll_sync_service_1 = require("./payroll-sync.service");
const payroll_sync_dto_1 = require("./payroll-sync.dto");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
let PayrollSyncController = class PayrollSyncController {
    constructor(payrollSyncService) {
        this.payrollSyncService = payrollSyncService;
    }
    async syncPayroll(dto) {
        return this.payrollSyncService.syncPayroll(dto);
    }
    async getProgress(bangLuongId) {
        return this.payrollSyncService.getProgress(bangLuongId);
    }
    async getPipelineStatus(thang, nam) {
        return this.payrollSyncService.getPipelineStatus(thang, nam);
    }
    async getRuleTrace(query) {
        return this.payrollSyncService.getEnhancedRuleTrace(query);
    }
    async getRuleTraceByNhanVien(nhanVienId, bangLuongId) {
        return this.payrollSyncService.getEnhancedRuleTrace({
            bangLuongId,
            nhanVienId,
        });
    }
};
exports.PayrollSyncController = PayrollSyncController;
__decorate([
    (0, common_1.Post)('sync'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [payroll_sync_dto_1.SyncPayrollDto]),
    __metadata("design:returntype", Promise)
], PayrollSyncController.prototype, "syncPayroll", null);
__decorate([
    (0, common_1.Get)('progress/:bangLuongId'),
    __param(0, (0, common_1.Param)('bangLuongId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PayrollSyncController.prototype, "getProgress", null);
__decorate([
    (0, common_1.Get)('status'),
    __param(0, (0, common_1.Query)('thang', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('nam', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], PayrollSyncController.prototype, "getPipelineStatus", null);
__decorate([
    (0, common_1.Get)('rule-trace'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [payroll_sync_dto_1.RuleTraceQueryDto]),
    __metadata("design:returntype", Promise)
], PayrollSyncController.prototype, "getRuleTrace", null);
__decorate([
    (0, common_1.Get)('rule-trace/nhan-vien/:nhanVienId'),
    __param(0, (0, common_1.Param)('nhanVienId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('bangLuongId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], PayrollSyncController.prototype, "getRuleTraceByNhanVien", null);
exports.PayrollSyncController = PayrollSyncController = __decorate([
    (0, common_1.Controller)('payroll-sync'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [payroll_sync_service_1.PayrollSyncService])
], PayrollSyncController);
//# sourceMappingURL=payroll-sync.controller.js.map