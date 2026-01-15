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
exports.NhomNhanVienController = void 0;
const common_1 = require("@nestjs/common");
const nhom_nhan_vien_service_1 = require("./nhom-nhan-vien.service");
const nhom_nhan_vien_dto_1 = require("./nhom-nhan-vien.dto");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../common/guards/roles.guard");
const vai_tro_decorator_1 = require("../../common/decorators/vai-tro.decorator");
let NhomNhanVienController = class NhomNhanVienController {
    constructor(nhomNhanVienService) {
        this.nhomNhanVienService = nhomNhanVienService;
    }
    async layDanhSachNhom() {
        return this.nhomNhanVienService.layDanhSachNhom();
    }
    async layNhomTheoId(id) {
        return this.nhomNhanVienService.layNhomTheoId(id);
    }
    async taoNhom(dto) {
        return this.nhomNhanVienService.taoNhom(dto);
    }
    async capNhatNhom(id, dto) {
        return this.nhomNhanVienService.capNhatNhom(id, dto);
    }
    async xoaNhom(id) {
        return this.nhomNhanVienService.xoaNhom(id);
    }
    async layNhomCuaNhanVien(nhanVienId) {
        return this.nhomNhanVienService.layNhomCuaNhanVien(nhanVienId);
    }
    async themVaoNhom(nhanVienId, dto) {
        return this.nhomNhanVienService.themVaoNhom(nhanVienId, dto);
    }
    async goKhoiNhom(nhanVienId, dto) {
        return this.nhomNhanVienService.goKhoiNhom(nhanVienId, dto);
    }
};
exports.NhomNhanVienController = NhomNhanVienController;
__decorate([
    (0, common_1.Get)('nhom-nhan-vien'),
    (0, vai_tro_decorator_1.VaiTro)('ADMIN', 'HR', 'PAYROLL_OPERATOR'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], NhomNhanVienController.prototype, "layDanhSachNhom", null);
__decorate([
    (0, common_1.Get)('nhom-nhan-vien/:id'),
    (0, vai_tro_decorator_1.VaiTro)('ADMIN', 'HR', 'PAYROLL_OPERATOR'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], NhomNhanVienController.prototype, "layNhomTheoId", null);
__decorate([
    (0, common_1.Post)('nhom-nhan-vien'),
    (0, vai_tro_decorator_1.VaiTro)('ADMIN', 'HR'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [nhom_nhan_vien_dto_1.TaoNhomDto]),
    __metadata("design:returntype", Promise)
], NhomNhanVienController.prototype, "taoNhom", null);
__decorate([
    (0, common_1.Put)('nhom-nhan-vien/:id'),
    (0, vai_tro_decorator_1.VaiTro)('ADMIN', 'HR'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, nhom_nhan_vien_dto_1.CapNhatNhomDto]),
    __metadata("design:returntype", Promise)
], NhomNhanVienController.prototype, "capNhatNhom", null);
__decorate([
    (0, common_1.Delete)('nhom-nhan-vien/:id'),
    (0, vai_tro_decorator_1.VaiTro)('ADMIN'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], NhomNhanVienController.prototype, "xoaNhom", null);
__decorate([
    (0, common_1.Get)('nhan-vien/:nhanVienId/nhom'),
    (0, vai_tro_decorator_1.VaiTro)('ADMIN', 'HR', 'PAYROLL_OPERATOR'),
    __param(0, (0, common_1.Param)('nhanVienId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], NhomNhanVienController.prototype, "layNhomCuaNhanVien", null);
__decorate([
    (0, common_1.Post)('nhan-vien/:nhanVienId/them-vao-nhom'),
    (0, vai_tro_decorator_1.VaiTro)('ADMIN', 'HR'),
    __param(0, (0, common_1.Param)('nhanVienId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, nhom_nhan_vien_dto_1.ThemVaoNhomDto]),
    __metadata("design:returntype", Promise)
], NhomNhanVienController.prototype, "themVaoNhom", null);
__decorate([
    (0, common_1.Post)('nhan-vien/:nhanVienId/go-khoi-nhom'),
    (0, vai_tro_decorator_1.VaiTro)('ADMIN', 'HR'),
    __param(0, (0, common_1.Param)('nhanVienId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, nhom_nhan_vien_dto_1.GoKhoiNhomDto]),
    __metadata("design:returntype", Promise)
], NhomNhanVienController.prototype, "goKhoiNhom", null);
exports.NhomNhanVienController = NhomNhanVienController = __decorate([
    (0, common_1.Controller)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [nhom_nhan_vien_service_1.NhomNhanVienService])
], NhomNhanVienController);
//# sourceMappingURL=nhom-nhan-vien.controller.js.map