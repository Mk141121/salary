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
exports.SanLuongController = void 0;
const common_1 = require("@nestjs/common");
const san_luong_service_1 = require("./san-luong.service");
const san_luong_dto_1 = require("./san-luong.dto");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../common/guards/roles.guard");
const vai_tro_decorator_1 = require("../../common/decorators/vai-tro.decorator");
let SanLuongController = class SanLuongController {
    constructor(sanLuongService) {
        this.sanLuongService = sanLuongService;
    }
    async laySanLuongCuaToi(thang, nam, req) {
        const nhanVienId = req.user?.nhanVienId;
        if (!nhanVienId)
            return { data: null };
        return this.sanLuongService.laySanLuongNhanVien(nhanVienId, thang || new Date().getMonth() + 1, nam || new Date().getFullYear());
    }
    async previewChiaHang(rows, thang, nam) {
        return this.sanLuongService.previewChiaHang(rows, thang, nam);
    }
    async confirmChiaHang(dto, req) {
        const nguoiImportId = req.user?.id || 1;
        return this.sanLuongService.confirmChiaHang(dto.rows, dto.tenFile, dto.fileHash, nguoiImportId);
    }
    async layDanhSachChiaHang(query) {
        return this.sanLuongService.layDanhSachChiaHang(query);
    }
    async adminSuaChiaHang(id, dto, req) {
        const nguoiSuaId = req.user?.id || 1;
        return this.sanLuongService.adminSuaChiaHang(id, dto, nguoiSuaId);
    }
    async previewGiaoHang(rows, thang, nam) {
        return this.sanLuongService.previewGiaoHang(rows, thang, nam);
    }
    async confirmGiaoHang(dto, req) {
        const nguoiImportId = req.user?.id || 1;
        return this.sanLuongService.confirmGiaoHang(dto.rows, dto.tenFile, dto.fileHash, nguoiImportId);
    }
    async layDanhSachGiaoHang(query) {
        return this.sanLuongService.layDanhSachGiaoHang(query);
    }
    async adminSuaGiaoHang(id, dto, req) {
        const nguoiSuaId = req.user?.id || 1;
        return this.sanLuongService.adminSuaGiaoHang(id, dto, nguoiSuaId);
    }
    async layLichSuImport(query) {
        return this.sanLuongService.layLichSuImport(query);
    }
    async layLichSuImportTheoId(id) {
        return this.sanLuongService.layLichSuImportTheoId(id);
    }
    async taoSnapshot(bangLuongId, thang, nam) {
        return this.sanLuongService.taoSnapshotSanLuong(bangLuongId, thang, nam);
    }
    async laySnapshot(bangLuongId, nhanVienId) {
        return this.sanLuongService.laySnapshotSanLuong(bangLuongId, nhanVienId);
    }
};
exports.SanLuongController = SanLuongController;
__decorate([
    (0, common_1.Get)('my-stats'),
    __param(0, (0, common_1.Query)('thang')),
    __param(1, (0, common_1.Query)('nam')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object]),
    __metadata("design:returntype", Promise)
], SanLuongController.prototype, "laySanLuongCuaToi", null);
__decorate([
    (0, common_1.Post)('chia-hang/preview'),
    (0, vai_tro_decorator_1.VaiTro)('ADMIN', 'HR', 'IMPORT_CHIA_HANG'),
    __param(0, (0, common_1.Body)('rows')),
    __param(1, (0, common_1.Body)('thang')),
    __param(2, (0, common_1.Body)('nam')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, Number, Number]),
    __metadata("design:returntype", Promise)
], SanLuongController.prototype, "previewChiaHang", null);
__decorate([
    (0, common_1.Post)('chia-hang/confirm'),
    (0, vai_tro_decorator_1.VaiTro)('ADMIN', 'HR', 'IMPORT_CHIA_HANG'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [san_luong_dto_1.ConfirmChiaHangDto, Object]),
    __metadata("design:returntype", Promise)
], SanLuongController.prototype, "confirmChiaHang", null);
__decorate([
    (0, common_1.Get)('chia-hang'),
    (0, vai_tro_decorator_1.VaiTro)('ADMIN', 'HR', 'IMPORT_CHIA_HANG', 'PAYROLL_OPERATOR'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [san_luong_dto_1.QuerySanLuongDto]),
    __metadata("design:returntype", Promise)
], SanLuongController.prototype, "layDanhSachChiaHang", null);
__decorate([
    (0, common_1.Put)('admin/chia-hang/:id'),
    (0, vai_tro_decorator_1.VaiTro)('ADMIN'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, san_luong_dto_1.AdminSuaChiaHangDto, Object]),
    __metadata("design:returntype", Promise)
], SanLuongController.prototype, "adminSuaChiaHang", null);
__decorate([
    (0, common_1.Post)('giao-hang/preview'),
    (0, vai_tro_decorator_1.VaiTro)('ADMIN', 'HR', 'IMPORT_GIAO_HANG'),
    __param(0, (0, common_1.Body)('rows')),
    __param(1, (0, common_1.Body)('thang')),
    __param(2, (0, common_1.Body)('nam')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, Number, Number]),
    __metadata("design:returntype", Promise)
], SanLuongController.prototype, "previewGiaoHang", null);
__decorate([
    (0, common_1.Post)('giao-hang/confirm'),
    (0, vai_tro_decorator_1.VaiTro)('ADMIN', 'HR', 'IMPORT_GIAO_HANG'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [san_luong_dto_1.ConfirmGiaoHangDto, Object]),
    __metadata("design:returntype", Promise)
], SanLuongController.prototype, "confirmGiaoHang", null);
__decorate([
    (0, common_1.Get)('giao-hang'),
    (0, vai_tro_decorator_1.VaiTro)('ADMIN', 'HR', 'IMPORT_GIAO_HANG', 'PAYROLL_OPERATOR'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [san_luong_dto_1.QuerySanLuongDto]),
    __metadata("design:returntype", Promise)
], SanLuongController.prototype, "layDanhSachGiaoHang", null);
__decorate([
    (0, common_1.Put)('admin/giao-hang/:id'),
    (0, vai_tro_decorator_1.VaiTro)('ADMIN'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, san_luong_dto_1.AdminSuaGiaoHangDto, Object]),
    __metadata("design:returntype", Promise)
], SanLuongController.prototype, "adminSuaGiaoHang", null);
__decorate([
    (0, common_1.Get)('lich-su-import'),
    (0, vai_tro_decorator_1.VaiTro)('ADMIN', 'HR', 'IMPORT_CHIA_HANG', 'IMPORT_GIAO_HANG', 'PAYROLL_OPERATOR'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [san_luong_dto_1.QueryLichSuImportDto]),
    __metadata("design:returntype", Promise)
], SanLuongController.prototype, "layLichSuImport", null);
__decorate([
    (0, common_1.Get)('lich-su-import/:id'),
    (0, vai_tro_decorator_1.VaiTro)('ADMIN', 'HR', 'IMPORT_CHIA_HANG', 'IMPORT_GIAO_HANG', 'PAYROLL_OPERATOR'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SanLuongController.prototype, "layLichSuImportTheoId", null);
__decorate([
    (0, common_1.Post)('snapshot/:bangLuongId'),
    (0, vai_tro_decorator_1.VaiTro)('ADMIN', 'HR', 'PAYROLL_OPERATOR'),
    __param(0, (0, common_1.Param)('bangLuongId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)('thang')),
    __param(2, (0, common_1.Body)('nam')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number]),
    __metadata("design:returntype", Promise)
], SanLuongController.prototype, "taoSnapshot", null);
__decorate([
    (0, common_1.Get)('snapshot/:bangLuongId/:nhanVienId'),
    (0, vai_tro_decorator_1.VaiTro)('ADMIN', 'HR', 'PAYROLL_OPERATOR'),
    __param(0, (0, common_1.Param)('bangLuongId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('nhanVienId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], SanLuongController.prototype, "laySnapshot", null);
exports.SanLuongController = SanLuongController = __decorate([
    (0, common_1.Controller)('san-luong'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [san_luong_service_1.SanLuongService])
], SanLuongController);
//# sourceMappingURL=san-luong.controller.js.map