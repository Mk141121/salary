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
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryLichSuImportDto = exports.QuerySanLuongDto = exports.AdminSuaGiaoHangDto = exports.AdminSuaChiaHangDto = exports.ConfirmGiaoHangDto = exports.PreviewGiaoHangResponse = exports.GiaoHangValidationResult = exports.ImportGiaoHangPreviewDto = exports.GiaoHangRowDto = exports.ConfirmChiaHangDto = exports.PreviewChiaHangResponse = exports.ChiaHangValidationResult = exports.ImportChiaHangPreviewDto = exports.ChiaHangRowDto = exports.LoaiImport = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
var LoaiImport;
(function (LoaiImport) {
    LoaiImport["CHIA_HANG"] = "CHIA_HANG";
    LoaiImport["GIAO_HANG"] = "GIAO_HANG";
})(LoaiImport || (exports.LoaiImport = LoaiImport = {}));
class ChiaHangRowDto {
}
exports.ChiaHangRowDto = ChiaHangRowDto;
__decorate([
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], ChiaHangRowDto.prototype, "ngay", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ChiaHangRowDto.prototype, "maNhanVien", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], ChiaHangRowDto.prototype, "soLuongSpDat", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], ChiaHangRowDto.prototype, "soLuongSpLoi", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ChiaHangRowDto.prototype, "hoTen", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ChiaHangRowDto.prototype, "ghiChu", void 0);
class ImportChiaHangPreviewDto {
}
exports.ImportChiaHangPreviewDto = ImportChiaHangPreviewDto;
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => ChiaHangRowDto),
    __metadata("design:type", Array)
], ImportChiaHangPreviewDto.prototype, "rows", void 0);
class ChiaHangValidationResult {
}
exports.ChiaHangValidationResult = ChiaHangValidationResult;
class PreviewChiaHangResponse {
}
exports.PreviewChiaHangResponse = PreviewChiaHangResponse;
class ConfirmChiaHangDto {
}
exports.ConfirmChiaHangDto = ConfirmChiaHangDto;
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => ChiaHangRowDto),
    (0, class_validator_1.ArrayMinSize)(1),
    __metadata("design:type", Array)
], ConfirmChiaHangDto.prototype, "rows", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ConfirmChiaHangDto.prototype, "tenFile", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ConfirmChiaHangDto.prototype, "fileHash", void 0);
class GiaoHangRowDto {
}
exports.GiaoHangRowDto = GiaoHangRowDto;
__decorate([
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], GiaoHangRowDto.prototype, "ngay", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GiaoHangRowDto.prototype, "maNhanVien", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], GiaoHangRowDto.prototype, "khoiLuongThanhCong", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], GiaoHangRowDto.prototype, "soLanTreGio", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], GiaoHangRowDto.prototype, "soLanKhongLayPhieu", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GiaoHangRowDto.prototype, "hoTen", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GiaoHangRowDto.prototype, "ghiChu", void 0);
class ImportGiaoHangPreviewDto {
}
exports.ImportGiaoHangPreviewDto = ImportGiaoHangPreviewDto;
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => GiaoHangRowDto),
    __metadata("design:type", Array)
], ImportGiaoHangPreviewDto.prototype, "rows", void 0);
class GiaoHangValidationResult {
}
exports.GiaoHangValidationResult = GiaoHangValidationResult;
class PreviewGiaoHangResponse {
}
exports.PreviewGiaoHangResponse = PreviewGiaoHangResponse;
class ConfirmGiaoHangDto {
}
exports.ConfirmGiaoHangDto = ConfirmGiaoHangDto;
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => GiaoHangRowDto),
    (0, class_validator_1.ArrayMinSize)(1),
    __metadata("design:type", Array)
], ConfirmGiaoHangDto.prototype, "rows", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ConfirmGiaoHangDto.prototype, "tenFile", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ConfirmGiaoHangDto.prototype, "fileHash", void 0);
class AdminSuaChiaHangDto {
}
exports.AdminSuaChiaHangDto = AdminSuaChiaHangDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], AdminSuaChiaHangDto.prototype, "soLuongSpDat", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], AdminSuaChiaHangDto.prototype, "soLuongSpLoi", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AdminSuaChiaHangDto.prototype, "ghiChu", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AdminSuaChiaHangDto.prototype, "lyDo", void 0);
class AdminSuaGiaoHangDto {
}
exports.AdminSuaGiaoHangDto = AdminSuaGiaoHangDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], AdminSuaGiaoHangDto.prototype, "khoiLuongThanhCong", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], AdminSuaGiaoHangDto.prototype, "soLanTreGio", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], AdminSuaGiaoHangDto.prototype, "soLanKhongLayPhieu", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AdminSuaGiaoHangDto.prototype, "ghiChu", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AdminSuaGiaoHangDto.prototype, "lyDo", void 0);
class QuerySanLuongDto {
}
exports.QuerySanLuongDto = QuerySanLuongDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], QuerySanLuongDto.prototype, "tuNgay", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], QuerySanLuongDto.prototype, "denNgay", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], QuerySanLuongDto.prototype, "nhanVienId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], QuerySanLuongDto.prototype, "phongBanId", void 0);
class QueryLichSuImportDto {
}
exports.QueryLichSuImportDto = QueryLichSuImportDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(LoaiImport),
    __metadata("design:type", String)
], QueryLichSuImportDto.prototype, "loaiImport", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], QueryLichSuImportDto.prototype, "tuNgay", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], QueryLichSuImportDto.prototype, "denNgay", void 0);
//# sourceMappingURL=san-luong.dto.js.map