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
exports.ThueBHController = void 0;
const common_1 = require("@nestjs/common");
const thue_bh_service_1 = require("./thue-bh.service");
const thue_bh_dto_1 = require("./thue-bh.dto");
let ThueBHController = class ThueBHController {
    constructor(thueBHService) {
        this.thueBHService = thueBHService;
    }
    async layTheoNhanVien(nhanVienId) {
        return this.thueBHService.layTheoNhanVien(nhanVienId);
    }
    async taoHoacCapNhat(nhanVienId, dto) {
        return this.thueBHService.taoHoacCapNhat(nhanVienId, dto);
    }
    async capNhat(id, dto) {
        return this.thueBHService.capNhat(id, dto);
    }
    async xoa(id) {
        return this.thueBHService.xoa(id);
    }
};
exports.ThueBHController = ThueBHController;
__decorate([
    (0, common_1.Get)(':id/thue-bh'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ThueBHController.prototype, "layTheoNhanVien", null);
__decorate([
    (0, common_1.Post)(':id/thue-bh'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, thue_bh_dto_1.TaoThueBHDto]),
    __metadata("design:returntype", Promise)
], ThueBHController.prototype, "taoHoacCapNhat", null);
__decorate([
    (0, common_1.Put)('thue-bh/:thueBhId'),
    __param(0, (0, common_1.Param)('thueBhId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, thue_bh_dto_1.CapNhatThueBHDto]),
    __metadata("design:returntype", Promise)
], ThueBHController.prototype, "capNhat", null);
__decorate([
    (0, common_1.Delete)('thue-bh/:thueBhId'),
    __param(0, (0, common_1.Param)('thueBhId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ThueBHController.prototype, "xoa", null);
exports.ThueBHController = ThueBHController = __decorate([
    (0, common_1.Controller)('nhan-vien'),
    __metadata("design:paramtypes", [thue_bh_service_1.ThueBHService])
], ThueBHController);
//# sourceMappingURL=thue-bh.controller.js.map