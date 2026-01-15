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
exports.NganHangController = void 0;
const common_1 = require("@nestjs/common");
const ngan_hang_service_1 = require("./ngan-hang.service");
const ngan_hang_dto_1 = require("./ngan-hang.dto");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../common/guards/roles.guard");
const vai_tro_decorator_1 = require("../../common/decorators/vai-tro.decorator");
let NganHangController = class NganHangController {
    constructor(nganHangService) {
        this.nganHangService = nganHangService;
    }
    async layDanhSachNganHang(nhanVienId) {
        return this.nganHangService.layDanhSachNganHang(nhanVienId);
    }
    async taoNganHang(nhanVienId, dto) {
        return this.nganHangService.taoNganHang(nhanVienId, dto);
    }
    async capNhatNganHang(id, dto) {
        return this.nganHangService.capNhatNganHang(id, dto);
    }
    async datMacDinh(id) {
        return this.nganHangService.datMacDinh(id);
    }
    async xoaNganHang(id) {
        return this.nganHangService.xoaNganHang(id);
    }
};
exports.NganHangController = NganHangController;
__decorate([
    (0, common_1.Get)(':nhanVienId/ngan-hang'),
    (0, vai_tro_decorator_1.VaiTro)('ADMIN', 'HR', 'PAYROLL_OPERATOR'),
    __param(0, (0, common_1.Param)('nhanVienId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], NganHangController.prototype, "layDanhSachNganHang", null);
__decorate([
    (0, common_1.Post)(':nhanVienId/ngan-hang'),
    (0, vai_tro_decorator_1.VaiTro)('ADMIN', 'HR'),
    __param(0, (0, common_1.Param)('nhanVienId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, ngan_hang_dto_1.TaoNganHangDto]),
    __metadata("design:returntype", Promise)
], NganHangController.prototype, "taoNganHang", null);
__decorate([
    (0, common_1.Put)('ngan-hang/:id'),
    (0, vai_tro_decorator_1.VaiTro)('ADMIN', 'HR'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, ngan_hang_dto_1.CapNhatNganHangDto]),
    __metadata("design:returntype", Promise)
], NganHangController.prototype, "capNhatNganHang", null);
__decorate([
    (0, common_1.Post)('ngan-hang/:id/dat-mac-dinh'),
    (0, vai_tro_decorator_1.VaiTro)('ADMIN', 'HR'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], NganHangController.prototype, "datMacDinh", null);
__decorate([
    (0, common_1.Delete)('ngan-hang/:id'),
    (0, vai_tro_decorator_1.VaiTro)('ADMIN', 'HR'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], NganHangController.prototype, "xoaNganHang", null);
exports.NganHangController = NganHangController = __decorate([
    (0, common_1.Controller)('nhan-vien'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [ngan_hang_service_1.NganHangService])
], NganHangController);
//# sourceMappingURL=ngan-hang.controller.js.map