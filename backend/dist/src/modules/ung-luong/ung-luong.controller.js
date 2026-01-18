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
exports.UngLuongController = void 0;
const common_1 = require("@nestjs/common");
const ung_luong_service_1 = require("./ung-luong.service");
const dto_1 = require("./dto");
const decorators_1 = require("../../common/decorators");
let UngLuongController = class UngLuongController {
    constructor(ungLuongService) {
        this.ungLuongService = ungLuongService;
    }
    async layDanhSach(dto) {
        return this.ungLuongService.layDanhSach(dto);
    }
    async layTheoId(id) {
        return this.ungLuongService.layTheoId(id);
    }
    async taoMoi(dto, req) {
        const nguoiTao = req.user?.tenDangNhap || 'system';
        return this.ungLuongService.taoMoi(dto, nguoiTao);
    }
    async capNhat(id, dto, req) {
        const nguoiCapNhat = req.user?.tenDangNhap || 'system';
        return this.ungLuongService.capNhat(id, dto, nguoiCapNhat);
    }
    async xoa(id, force, nguoiDung) {
        const nguoiXoa = nguoiDung?.tenDangNhap || 'system';
        const isAdmin = nguoiDung?.vaiTros?.includes('ADMIN') || nguoiDung?.tenDangNhap === 'admin';
        const forceDelete = force === 'true' && isAdmin;
        return this.ungLuongService.xoa(id, forceDelete, nguoiXoa);
    }
    async sinhDanhSachNV(id, dto, req) {
        const nguoiTao = req.user?.tenDangNhap || 'system';
        return this.ungLuongService.sinhDanhSachNV(id, dto, nguoiTao);
    }
    async capNhatBulk(id, dto, req) {
        const nguoiCapNhat = req.user?.tenDangNhap || 'system';
        return this.ungLuongService.capNhatBulkChiTiet(id, dto, nguoiCapNhat);
    }
    async setTheoTiLe(id, dto, req) {
        const nguoiCapNhat = req.user?.tenDangNhap || 'system';
        return this.ungLuongService.setTheoTiLe(id, dto, nguoiCapNhat);
    }
    async setSoTienCoDinh(id, dto, req) {
        const nguoiCapNhat = req.user?.tenDangNhap || 'system';
        return this.ungLuongService.setSoTienCoDinh(id, dto, nguoiCapNhat);
    }
    async chotBang(id, req) {
        const nguoiChot = req.user?.tenDangNhap || 'system';
        return this.ungLuongService.chotBang(id, nguoiChot);
    }
    async khoaBang(id, req) {
        const nguoiKhoa = req.user?.tenDangNhap || 'system';
        return this.ungLuongService.khoaBang(id, nguoiKhoa);
    }
    async moKhoaBang(id, dto, req) {
        const nguoiMoKhoa = req.user?.tenDangNhap || 'system';
        return this.ungLuongService.moKhoaBang(id, dto, nguoiMoKhoa);
    }
    async ghiNhanKhauTru(id, dto, req) {
        const nguoiThucHien = req.user?.tenDangNhap || 'system';
        return this.ungLuongService.ghiNhanKhauTru(id, dto, nguoiThucHien);
    }
    async laySnapshot(id) {
        return this.ungLuongService.laySnapshot(id);
    }
};
exports.UngLuongController = UngLuongController;
__decorate([
    (0, common_1.Get)('bang'),
    (0, decorators_1.Quyen)('UNG_LUONG_VIEW'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.LocBangUngLuongDto]),
    __metadata("design:returntype", Promise)
], UngLuongController.prototype, "layDanhSach", null);
__decorate([
    (0, common_1.Get)('bang/:id'),
    (0, decorators_1.Quyen)('UNG_LUONG_VIEW'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UngLuongController.prototype, "layTheoId", null);
__decorate([
    (0, common_1.Post)('bang'),
    (0, decorators_1.Quyen)('UNG_LUONG_CREATE'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.TaoBangUngLuongDto, Object]),
    __metadata("design:returntype", Promise)
], UngLuongController.prototype, "taoMoi", null);
__decorate([
    (0, common_1.Put)('bang/:id'),
    (0, decorators_1.Quyen)('UNG_LUONG_EDIT'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, dto_1.CapNhatBangUngLuongDto, Object]),
    __metadata("design:returntype", Promise)
], UngLuongController.prototype, "capNhat", null);
__decorate([
    (0, common_1.Delete)('bang/:id'),
    (0, decorators_1.Quyen)('UNG_LUONG_EDIT'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('force')),
    __param(2, (0, decorators_1.NguoiDungHienTai)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, Object]),
    __metadata("design:returntype", Promise)
], UngLuongController.prototype, "xoa", null);
__decorate([
    (0, common_1.Post)('bang/:id/generate-danh-sach'),
    (0, decorators_1.Quyen)('UNG_LUONG_EDIT'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, dto_1.SinhDanhSachNVDto, Object]),
    __metadata("design:returntype", Promise)
], UngLuongController.prototype, "sinhDanhSachNV", null);
__decorate([
    (0, common_1.Put)('bang/:id/rows/bulk'),
    (0, decorators_1.Quyen)('UNG_LUONG_EDIT'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, dto_1.CapNhatBulkChiTietDto, Object]),
    __metadata("design:returntype", Promise)
], UngLuongController.prototype, "capNhatBulk", null);
__decorate([
    (0, common_1.Post)('bang/:id/set-theo-ti-le'),
    (0, decorators_1.Quyen)('UNG_LUONG_EDIT'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, dto_1.SetTheoTiLeDto, Object]),
    __metadata("design:returntype", Promise)
], UngLuongController.prototype, "setTheoTiLe", null);
__decorate([
    (0, common_1.Post)('bang/:id/set-so-tien-co-dinh'),
    (0, decorators_1.Quyen)('UNG_LUONG_EDIT'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, dto_1.SetSoTienCoDinhDto, Object]),
    __metadata("design:returntype", Promise)
], UngLuongController.prototype, "setSoTienCoDinh", null);
__decorate([
    (0, common_1.Post)('bang/:id/chot'),
    (0, decorators_1.Quyen)('UNG_LUONG_CHOT'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], UngLuongController.prototype, "chotBang", null);
__decorate([
    (0, common_1.Post)('bang/:id/khoa'),
    (0, decorators_1.Quyen)('UNG_LUONG_KHOA'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], UngLuongController.prototype, "khoaBang", null);
__decorate([
    (0, common_1.Post)('bang/:id/mo-khoa'),
    (0, decorators_1.Quyen)('UNG_LUONG_KHOA'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, dto_1.MoKhoaBangUngLuongDto, Object]),
    __metadata("design:returntype", Promise)
], UngLuongController.prototype, "moKhoaBang", null);
__decorate([
    (0, common_1.Post)('bang/:id/ghi-nhan-khau-tru'),
    (0, decorators_1.Quyen)('UNG_LUONG_CHOT'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, dto_1.GhiNhanKhauTruDto, Object]),
    __metadata("design:returntype", Promise)
], UngLuongController.prototype, "ghiNhanKhauTru", null);
__decorate([
    (0, common_1.Get)('bang/:id/snapshot'),
    (0, decorators_1.Quyen)('UNG_LUONG_VIEW'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UngLuongController.prototype, "laySnapshot", null);
exports.UngLuongController = UngLuongController = __decorate([
    (0, common_1.Controller)('ung-luong'),
    __metadata("design:paramtypes", [ung_luong_service_1.UngLuongService])
], UngLuongController);
//# sourceMappingURL=ung-luong.controller.js.map