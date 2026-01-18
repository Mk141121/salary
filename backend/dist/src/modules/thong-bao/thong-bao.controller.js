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
exports.ThongBaoController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const thong_bao_service_1 = require("./thong-bao.service");
const thong_bao_dto_1 = require("./thong-bao.dto");
let ThongBaoController = class ThongBaoController {
    constructor(service) {
        this.service = service;
    }
    async layDanhSach(req, query) {
        return this.service.layDanhSach(req.user.id, query);
    }
    async demChuaDoc(req) {
        const chuaDoc = await this.service.demChuaDoc(req.user.id);
        return { chuaDoc };
    }
    async danhDauDaDoc(req, id) {
        return this.service.danhDauDaDoc(req.user.id, id);
    }
    async danhDauTatCaDaDoc(req) {
        return this.service.danhDauTatCaDaDoc(req.user.id);
    }
};
exports.ThongBaoController = ThongBaoController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy danh sách thông báo' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, thong_bao_dto_1.ThongBaoQueryDto]),
    __metadata("design:returntype", Promise)
], ThongBaoController.prototype, "layDanhSach", null);
__decorate([
    (0, common_1.Get)('chua-doc'),
    (0, swagger_1.ApiOperation)({ summary: 'Đếm thông báo chưa đọc' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ThongBaoController.prototype, "demChuaDoc", null);
__decorate([
    (0, common_1.Put)(':id/da-doc'),
    (0, swagger_1.ApiOperation)({ summary: 'Đánh dấu đã đọc' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], ThongBaoController.prototype, "danhDauDaDoc", null);
__decorate([
    (0, common_1.Post)('da-doc-tat-ca'),
    (0, swagger_1.ApiOperation)({ summary: 'Đánh dấu tất cả đã đọc' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ThongBaoController.prototype, "danhDauTatCaDaDoc", null);
exports.ThongBaoController = ThongBaoController = __decorate([
    (0, swagger_1.ApiTags)('Thông báo'),
    (0, common_1.Controller)('thong-bao'),
    __metadata("design:paramtypes", [thong_bao_service_1.ThongBaoService])
], ThongBaoController);
//# sourceMappingURL=thong-bao.controller.js.map