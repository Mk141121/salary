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
exports.HopDongController = void 0;
const common_1 = require("@nestjs/common");
const hop_dong_service_1 = require("./hop-dong.service");
const hop_dong_dto_1 = require("./hop-dong.dto");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../common/guards/roles.guard");
const vai_tro_decorator_1 = require("../../common/decorators/vai-tro.decorator");
let HopDongController = class HopDongController {
    constructor(hopDongService) {
        this.hopDongService = hopDongService;
    }
    async layDanhSachHopDong(nhanVienId) {
        return this.hopDongService.layDanhSachHopDong(nhanVienId);
    }
    async taoHopDong(nhanVienId, dto, req) {
        const taoBoi = req.user?.id;
        return this.hopDongService.taoHopDong(nhanVienId, dto, taoBoi);
    }
    async layHopDongTheoId(id) {
        return this.hopDongService.layHopDongTheoId(id);
    }
    async capNhatHopDong(id, dto) {
        return this.hopDongService.capNhatHopDong(id, dto);
    }
    async ngungHopDong(id, dto) {
        return this.hopDongService.ngungHopDong(id, dto);
    }
    async xoaHopDong(id) {
        return this.hopDongService.xoaHopDong(id);
    }
};
exports.HopDongController = HopDongController;
__decorate([
    (0, common_1.Get)(':nhanVienId/hop-dong'),
    (0, vai_tro_decorator_1.VaiTro)('ADMIN', 'HR', 'PAYROLL_OPERATOR'),
    __param(0, (0, common_1.Param)('nhanVienId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], HopDongController.prototype, "layDanhSachHopDong", null);
__decorate([
    (0, common_1.Post)(':nhanVienId/hop-dong'),
    (0, vai_tro_decorator_1.VaiTro)('ADMIN', 'HR'),
    __param(0, (0, common_1.Param)('nhanVienId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, hop_dong_dto_1.TaoHopDongDto, Object]),
    __metadata("design:returntype", Promise)
], HopDongController.prototype, "taoHopDong", null);
__decorate([
    (0, common_1.Get)('hop-dong/:id'),
    (0, vai_tro_decorator_1.VaiTro)('ADMIN', 'HR', 'PAYROLL_OPERATOR'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], HopDongController.prototype, "layHopDongTheoId", null);
__decorate([
    (0, common_1.Put)('hop-dong/:id'),
    (0, vai_tro_decorator_1.VaiTro)('ADMIN', 'HR'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, hop_dong_dto_1.CapNhatHopDongDto]),
    __metadata("design:returntype", Promise)
], HopDongController.prototype, "capNhatHopDong", null);
__decorate([
    (0, common_1.Post)('hop-dong/:id/ngung'),
    (0, vai_tro_decorator_1.VaiTro)('ADMIN', 'HR'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, hop_dong_dto_1.NgungHopDongDto]),
    __metadata("design:returntype", Promise)
], HopDongController.prototype, "ngungHopDong", null);
__decorate([
    (0, common_1.Delete)('hop-dong/:id'),
    (0, vai_tro_decorator_1.VaiTro)('ADMIN'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], HopDongController.prototype, "xoaHopDong", null);
exports.HopDongController = HopDongController = __decorate([
    (0, common_1.Controller)('nhan-vien'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [hop_dong_service_1.HopDongService])
], HopDongController);
//# sourceMappingURL=hop-dong.controller.js.map