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
exports.RuleEngineController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const rule_engine_service_1 = require("./rule-engine.service");
const rule_engine_dto_1 = require("./dto/rule-engine.dto");
let RuleEngineController = class RuleEngineController {
    constructor(ruleEngineService) {
        this.ruleEngineService = ruleEngineService;
    }
    async layDanhSachCongThuc(phongBanId) {
        return this.ruleEngineService.layDanhSachCongThuc(phongBanId ? parseInt(phongBanId, 10) : undefined);
    }
    async layCongThuc(id) {
        return this.ruleEngineService.layCongThuc(id);
    }
    async taoCongThuc(dto) {
        return this.ruleEngineService.taoCongThuc(dto);
    }
    async capNhatCongThuc(id, dto) {
        return this.ruleEngineService.capNhatCongThuc(id, dto);
    }
    async layLichSuCongThuc(maCongThuc) {
        return this.ruleEngineService.layLichSuCongThuc(maCongThuc);
    }
    async themBienSo(congThucId, dto) {
        return this.ruleEngineService.themBienSo(congThucId, dto);
    }
    async xoaBienSo(id) {
        return this.ruleEngineService.xoaBienSo(id);
    }
    async testCongThuc(dto) {
        return this.ruleEngineService.testCongThuc(dto.congThuc, dto.bienSo);
    }
    async tinhLuong(dto) {
        return this.ruleEngineService.tinhLuongTheoCongThuc(dto.nhanVienId, dto.congThucId, dto.thang, dto.nam);
    }
    async khoiTaoCongThucMau() {
        return this.ruleEngineService.khoiTaoCongThucMau();
    }
};
exports.RuleEngineController = RuleEngineController;
__decorate([
    (0, common_1.Get)('cong-thuc'),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy danh sách công thức' }),
    (0, swagger_1.ApiQuery)({ name: 'phongBanId', required: false }),
    __param(0, (0, common_1.Query)('phongBanId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RuleEngineController.prototype, "layDanhSachCongThuc", null);
__decorate([
    (0, common_1.Get)('cong-thuc/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy chi tiết công thức' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RuleEngineController.prototype, "layCongThuc", null);
__decorate([
    (0, common_1.Post)('cong-thuc'),
    (0, swagger_1.ApiOperation)({ summary: 'Tạo công thức mới' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [rule_engine_dto_1.TaoCongThucDto]),
    __metadata("design:returntype", Promise)
], RuleEngineController.prototype, "taoCongThuc", null);
__decorate([
    (0, common_1.Put)('cong-thuc/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Cập nhật công thức' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, rule_engine_dto_1.CapNhatCongThucDto]),
    __metadata("design:returntype", Promise)
], RuleEngineController.prototype, "capNhatCongThuc", null);
__decorate([
    (0, common_1.Get)('cong-thuc/:maCongThuc/lich-su'),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy lịch sử công thức' }),
    __param(0, (0, common_1.Param)('maCongThuc')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RuleEngineController.prototype, "layLichSuCongThuc", null);
__decorate([
    (0, common_1.Post)('cong-thuc/:congThucId/bien-so'),
    (0, swagger_1.ApiOperation)({ summary: 'Thêm biến số vào công thức' }),
    __param(0, (0, common_1.Param)('congThucId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, rule_engine_dto_1.ThemBienSoDto]),
    __metadata("design:returntype", Promise)
], RuleEngineController.prototype, "themBienSo", null);
__decorate([
    (0, common_1.Delete)('bien-so/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Xóa biến số' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RuleEngineController.prototype, "xoaBienSo", null);
__decorate([
    (0, common_1.Post)('test'),
    (0, swagger_1.ApiOperation)({ summary: 'Test công thức' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [rule_engine_dto_1.TestCongThucDto]),
    __metadata("design:returntype", Promise)
], RuleEngineController.prototype, "testCongThuc", null);
__decorate([
    (0, common_1.Post)('tinh-luong'),
    (0, swagger_1.ApiOperation)({ summary: 'Tính lương theo công thức' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [rule_engine_dto_1.TinhLuongDto]),
    __metadata("design:returntype", Promise)
], RuleEngineController.prototype, "tinhLuong", null);
__decorate([
    (0, common_1.Post)('khoi-tao-mau'),
    (0, swagger_1.ApiOperation)({ summary: 'Khởi tạo công thức mẫu' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RuleEngineController.prototype, "khoiTaoCongThucMau", null);
exports.RuleEngineController = RuleEngineController = __decorate([
    (0, swagger_1.ApiTags)('Rule Engine - Công thức lương'),
    (0, common_1.Controller)('rule-engine'),
    __metadata("design:paramtypes", [rule_engine_service_1.RuleEngineService])
], RuleEngineController);
//# sourceMappingURL=rule-engine.controller.js.map