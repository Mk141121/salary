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
exports.ImportExcelController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const import_excel_service_1 = require("./import-excel.service");
let ImportExcelController = class ImportExcelController {
    constructor(importExcelService) {
        this.importExcelService = importExcelService;
    }
    async docHeader(file) {
        if (!file) {
            throw new common_1.BadRequestException('Vui lòng upload file Excel');
        }
        return this.importExcelService.docHeaderExcel(file.buffer);
    }
    async goiYMapping(file) {
        if (!file) {
            throw new common_1.BadRequestException('Vui lòng upload file Excel');
        }
        const { headers } = await this.importExcelService.docHeaderExcel(file.buffer);
        return this.importExcelService.goiYMapping(headers);
    }
    async layDanhSachMapping() {
        return this.importExcelService.layDanhSachMapping();
    }
    async importExcel(file, thang, nam, phongBanId, mappingsJson) {
        if (!file) {
            throw new common_1.BadRequestException('Vui lòng upload file Excel');
        }
        if (!thang || !nam || !phongBanId || !mappingsJson) {
            throw new common_1.BadRequestException('Thiếu thông tin: thang, nam, phongBanId, mappings');
        }
        let mappings;
        try {
            mappings = JSON.parse(mappingsJson);
        }
        catch {
            throw new common_1.BadRequestException('Mappings không đúng định dạng JSON');
        }
        return this.importExcelService.importExcel(file.buffer, parseInt(thang, 10), parseInt(nam, 10), parseInt(phongBanId, 10), mappings);
    }
    async exportExcel(bangLuongId, res) {
        const buffer = await this.importExcelService.exportExcel(bangLuongId);
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', `attachment; filename=bang-luong-${bangLuongId}.xlsx`);
        res.send(buffer);
    }
};
exports.ImportExcelController = ImportExcelController;
__decorate([
    (0, common_1.Post)('doc-header'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    (0, swagger_1.ApiOperation)({ summary: 'Đọc header từ file Excel để mapping' }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                file: { type: 'string', format: 'binary' },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Đọc header thành công' }),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ImportExcelController.prototype, "docHeader", null);
__decorate([
    (0, common_1.Post)('goi-y-mapping'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    (0, swagger_1.ApiOperation)({ summary: 'Gợi ý mapping tự động từ tên cột' }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Gợi ý mapping thành công' }),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ImportExcelController.prototype, "goiYMapping", null);
__decorate([
    (0, common_1.Get)('mapping'),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy danh sách mapping đã lưu' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Thành công' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ImportExcelController.prototype, "layDanhSachMapping", null);
__decorate([
    (0, common_1.Post)('import'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    (0, swagger_1.ApiOperation)({ summary: 'Import dữ liệu từ Excel vào bảng lương' }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                file: { type: 'string', format: 'binary' },
                thang: { type: 'number' },
                nam: { type: 'number' },
                phongBanId: { type: 'number' },
                mappings: { type: 'string', description: 'JSON string của CotExcel[]' },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Import thành công' }),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)('thang')),
    __param(2, (0, common_1.Body)('nam')),
    __param(3, (0, common_1.Body)('phongBanId')),
    __param(4, (0, common_1.Body)('mappings')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String, String]),
    __metadata("design:returntype", Promise)
], ImportExcelController.prototype, "importExcel", null);
__decorate([
    (0, common_1.Get)('export/:bangLuongId'),
    (0, swagger_1.ApiOperation)({ summary: 'Export bảng lương ra file Excel' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Export thành công' }),
    __param(0, (0, common_1.Param)('bangLuongId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ImportExcelController.prototype, "exportExcel", null);
exports.ImportExcelController = ImportExcelController = __decorate([
    (0, swagger_1.ApiTags)('import-excel'),
    (0, common_1.Controller)('import-excel'),
    __metadata("design:paramtypes", [import_excel_service_1.ImportExcelService])
], ImportExcelController);
//# sourceMappingURL=import-excel.controller.js.map