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
exports.TroLyAiController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const tro_ly_ai_service_1 = require("./tro-ly-ai.service");
const tro_ly_ai_dto_1 = require("./dto/tro-ly-ai.dto");
let TroLyAiController = class TroLyAiController {
    constructor(troLyAiService) {
        this.troLyAiService = troLyAiService;
    }
    async goiYRule(dto) {
        const nguoiTaoId = undefined;
        return this.troLyAiService.goiYRule(dto, nguoiTaoId);
    }
    async layContext(phongBanId, quyCheId) {
        return this.troLyAiService.layContext(phongBanId, quyCheId);
    }
    async apDungRule(quyCheId, dto) {
        const nguoiTaoId = undefined;
        return this.troLyAiService.apDungRule(dto, quyCheId, nguoiTaoId);
    }
    async huyDeXuat(auditId) {
        return this.troLyAiService.huyDeXuat(auditId);
    }
    async lichSuDeXuat(quyCheId) {
        return this.troLyAiService.lichSuDeXuat(quyCheId);
    }
};
exports.TroLyAiController = TroLyAiController;
__decorate([
    (0, common_1.Post)('goi-y-rule'),
    (0, swagger_1.ApiOperation)({
        summary: 'Gợi ý rule từ mô tả tiếng Việt',
        description: 'AI phân tích nội dung tiếng Việt và đề xuất rule JSON hợp lệ',
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Trả về rule đề xuất hoặc danh sách câu hỏi cần làm rõ',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [tro_ly_ai_dto_1.GoiYRuleDto]),
    __metadata("design:returntype", Promise)
], TroLyAiController.prototype, "goiYRule", null);
__decorate([
    (0, common_1.Get)('context/:phongBanId/:quyCheId'),
    (0, swagger_1.ApiOperation)({
        summary: 'Lấy context cho AI',
        description: 'Lấy thông tin phòng ban, quy chế, khoản lương, sự kiện để AI có thể gợi ý chính xác',
    }),
    __param(0, (0, common_1.Param)('phongBanId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('quyCheId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], TroLyAiController.prototype, "layContext", null);
__decorate([
    (0, common_1.Post)('ap-dung/:quyCheId'),
    (0, swagger_1.ApiOperation)({
        summary: 'Áp dụng rule từ đề xuất AI',
        description: 'Tạo rule mới từ đề xuất AI đã được user xác nhận',
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Rule đã được tạo thành công',
    }),
    __param(0, (0, common_1.Param)('quyCheId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, tro_ly_ai_dto_1.ApDungRuleDeXuatDto]),
    __metadata("design:returntype", Promise)
], TroLyAiController.prototype, "apDungRule", null);
__decorate([
    (0, common_1.Post)('huy/:auditId'),
    (0, swagger_1.ApiOperation)({
        summary: 'Hủy đề xuất AI',
        description: 'Đánh dấu đề xuất AI là đã hủy',
    }),
    __param(0, (0, common_1.Param)('auditId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TroLyAiController.prototype, "huyDeXuat", null);
__decorate([
    (0, common_1.Get)('lich-su/:quyCheId'),
    (0, swagger_1.ApiOperation)({
        summary: 'Lịch sử đề xuất AI',
        description: 'Lấy danh sách các đề xuất AI của quy chế',
    }),
    __param(0, (0, common_1.Param)('quyCheId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TroLyAiController.prototype, "lichSuDeXuat", null);
exports.TroLyAiController = TroLyAiController = __decorate([
    (0, swagger_1.ApiTags)('Trợ lý AI gợi ý Rule'),
    (0, common_1.Controller)('tro-ly-ai'),
    __metadata("design:paramtypes", [tro_ly_ai_service_1.TroLyAiService])
], TroLyAiController);
//# sourceMappingURL=tro-ly-ai.controller.js.map