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
exports.SoLuongController = void 0;
const common_1 = require("@nestjs/common");
const so_luong_service_1 = require("./so-luong.service");
const dto_1 = require("./dto");
const decorators_1 = require("../../common/decorators");
let SoLuongController = class SoLuongController {
    constructor(soLuongService) {
        this.soLuongService = soLuongService;
    }
    async laySoLuongNhanVien(id, dto) {
        return this.soLuongService.laySoLuongNhanVien(id, dto);
    }
    async laySoLuongPhongBan(id, dto) {
        return this.soLuongService.laySoLuongPhongBan(id, dto);
    }
    async timKiem(dto) {
        return this.soLuongService.timKiem(dto);
    }
    async layChiTietEntry(refType, refId) {
        return this.soLuongService.layChiTietEntry(refType, refId);
    }
};
exports.SoLuongController = SoLuongController;
__decorate([
    (0, common_1.Get)('nhan-vien/:id'),
    (0, decorators_1.Quyen)('SO_LUONG_VIEW'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, dto_1.LocSoLuongDto]),
    __metadata("design:returntype", Promise)
], SoLuongController.prototype, "laySoLuongNhanVien", null);
__decorate([
    (0, common_1.Get)('phong-ban/:id'),
    (0, decorators_1.Quyen)('SO_LUONG_VIEW'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, dto_1.LocSoLuongDto]),
    __metadata("design:returntype", Promise)
], SoLuongController.prototype, "laySoLuongPhongBan", null);
__decorate([
    (0, common_1.Get)('search'),
    (0, decorators_1.Quyen)('SO_LUONG_VIEW'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.TimKiemSoLuongDto]),
    __metadata("design:returntype", Promise)
], SoLuongController.prototype, "timKiem", null);
__decorate([
    (0, common_1.Get)('entry/:refType/:refId'),
    (0, decorators_1.Quyen)('SO_LUONG_VIEW'),
    __param(0, (0, common_1.Param)('refType')),
    __param(1, (0, common_1.Param)('refId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], SoLuongController.prototype, "layChiTietEntry", null);
exports.SoLuongController = SoLuongController = __decorate([
    (0, common_1.Controller)('so-luong'),
    __metadata("design:paramtypes", [so_luong_service_1.SoLuongService])
], SoLuongController);
//# sourceMappingURL=so-luong.controller.js.map