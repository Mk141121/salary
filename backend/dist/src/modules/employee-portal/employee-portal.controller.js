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
exports.EmployeePortalController = void 0;
const common_1 = require("@nestjs/common");
const employee_portal_service_1 = require("./employee-portal.service");
const employee_portal_dto_1 = require("./employee-portal.dto");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
let EmployeePortalController = class EmployeePortalController {
    constructor(service) {
        this.service = service;
    }
    async getDashboard(req) {
        return this.service.getDashboard(req.user.id);
    }
    async getLichLamViec(req, query) {
        return this.service.getLichLamViec(req.user.id, query);
    }
    async getChamCong(req, query) {
        return this.service.getChamCong(req.user.id, query);
    }
    async getPhieuLuong(req, query) {
        return this.service.getPhieuLuong(req.user.id, query);
    }
    async getSoDuPhep(req) {
        return this.service.getSoDuPhep(req.user.id);
    }
    async getHoSo(req) {
        return this.service.getHoSo(req.user.id);
    }
    async checkIn(req) {
        return this.service.checkIn(req.user.id);
    }
    async checkOut(req) {
        return this.service.checkOut(req.user.id);
    }
};
exports.EmployeePortalController = EmployeePortalController;
__decorate([
    (0, common_1.Get)('dashboard'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EmployeePortalController.prototype, "getDashboard", null);
__decorate([
    (0, common_1.Get)('lich-lam-viec'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, employee_portal_dto_1.LichLamViecQueryDto]),
    __metadata("design:returntype", Promise)
], EmployeePortalController.prototype, "getLichLamViec", null);
__decorate([
    (0, common_1.Get)('cham-cong'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, employee_portal_dto_1.ChamCongQueryDto]),
    __metadata("design:returntype", Promise)
], EmployeePortalController.prototype, "getChamCong", null);
__decorate([
    (0, common_1.Get)('phieu-luong'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, employee_portal_dto_1.PhieuLuongQueryDto]),
    __metadata("design:returntype", Promise)
], EmployeePortalController.prototype, "getPhieuLuong", null);
__decorate([
    (0, common_1.Get)('so-du-phep'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EmployeePortalController.prototype, "getSoDuPhep", null);
__decorate([
    (0, common_1.Get)('ho-so'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EmployeePortalController.prototype, "getHoSo", null);
__decorate([
    (0, common_1.Post)('check-in'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EmployeePortalController.prototype, "checkIn", null);
__decorate([
    (0, common_1.Post)('check-out'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EmployeePortalController.prototype, "checkOut", null);
exports.EmployeePortalController = EmployeePortalController = __decorate([
    (0, common_1.Controller)('employee-portal'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [employee_portal_service_1.EmployeePortalService])
], EmployeePortalController);
//# sourceMappingURL=employee-portal.controller.js.map