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
exports.CaLamViecController = void 0;
const common_1 = require("@nestjs/common");
const ca_lam_viec_service_1 = require("./ca-lam-viec.service");
const ca_lam_viec_dto_1 = require("./ca-lam-viec.dto");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
let CaLamViecController = class CaLamViecController {
    constructor(caLamViecService) {
        this.caLamViecService = caLamViecService;
    }
    async layDanhSach(filter) {
        return this.caLamViecService.layDanhSach(filter);
    }
    async layDanhSachActive(phongBanId) {
        return this.caLamViecService.layDanhSachActive(phongBanId ? parseInt(phongBanId, 10) : undefined);
    }
    async layChiTiet(id) {
        return this.caLamViecService.layChiTiet(id);
    }
    async tao(dto, req) {
        return this.caLamViecService.tao(dto, req.user?.id);
    }
    async capNhat(id, dto, req) {
        return this.caLamViecService.capNhat(id, dto, req.user?.id);
    }
    async xoa(id) {
        return this.caLamViecService.xoa(id);
    }
    async toggleTrangThai(id, req) {
        return this.caLamViecService.toggleTrangThai(id, req.user?.id);
    }
};
exports.CaLamViecController = CaLamViecController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ca_lam_viec_dto_1.LocCaLamViecDto]),
    __metadata("design:returntype", Promise)
], CaLamViecController.prototype, "layDanhSach", null);
__decorate([
    (0, common_1.Get)('active'),
    __param(0, (0, common_1.Query)('phongBanId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CaLamViecController.prototype, "layDanhSachActive", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CaLamViecController.prototype, "layChiTiet", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ca_lam_viec_dto_1.TaoCaLamViecDto, Object]),
    __metadata("design:returntype", Promise)
], CaLamViecController.prototype, "tao", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, ca_lam_viec_dto_1.CapNhatCaLamViecDto, Object]),
    __metadata("design:returntype", Promise)
], CaLamViecController.prototype, "capNhat", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CaLamViecController.prototype, "xoa", null);
__decorate([
    (0, common_1.Patch)(':id/toggle'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], CaLamViecController.prototype, "toggleTrangThai", null);
exports.CaLamViecController = CaLamViecController = __decorate([
    (0, common_1.Controller)('ca-lam-viec'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [ca_lam_viec_service_1.CaLamViecService])
], CaLamViecController);
//# sourceMappingURL=ca-lam-viec.controller.js.map