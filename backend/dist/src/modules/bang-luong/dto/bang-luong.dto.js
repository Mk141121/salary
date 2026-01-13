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
exports.ChotBangLuongDto = exports.CapNhatNhieuChiTietDto = exports.CapNhatChiTietLuongDto = exports.CapNhatBangLuongDto = exports.TaoBangLuongDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
class TaoBangLuongDto {
}
exports.TaoBangLuongDto = TaoBangLuongDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Tháng', example: 1, minimum: 1, maximum: 12 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(12),
    __metadata("design:type", Number)
], TaoBangLuongDto.prototype, "thang", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Năm', example: 2026 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(2020),
    __metadata("design:type", Number)
], TaoBangLuongDto.prototype, "nam", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID phòng ban', example: 1 }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], TaoBangLuongDto.prototype, "phongBanId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Tên bảng lương' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TaoBangLuongDto.prototype, "tenBangLuong", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Tự động tạo chi tiết từ cơ cấu lương',
        default: true,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], TaoBangLuongDto.prototype, "tuDongTaoChiTiet", void 0);
class CapNhatBangLuongDto extends (0, swagger_1.PartialType)(TaoBangLuongDto) {
}
exports.CapNhatBangLuongDto = CapNhatBangLuongDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Ghi chú' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CapNhatBangLuongDto.prototype, "ghiChu", void 0);
class CapNhatChiTietLuongDto {
}
exports.CapNhatChiTietLuongDto = CapNhatChiTietLuongDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID bảng lương' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CapNhatChiTietLuongDto.prototype, "bangLuongId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID nhân viên' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CapNhatChiTietLuongDto.prototype, "nhanVienId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID khoản lương' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CapNhatChiTietLuongDto.prototype, "khoanLuongId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Số tiền', example: 10000000 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CapNhatChiTietLuongDto.prototype, "soTien", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Ghi chú' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CapNhatChiTietLuongDto.prototype, "ghiChu", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Người thay đổi' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CapNhatChiTietLuongDto.prototype, "nguoiThayDoi", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Lý do thay đổi' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CapNhatChiTietLuongDto.prototype, "lyDo", void 0);
class CapNhatNhieuChiTietDto {
}
exports.CapNhatNhieuChiTietDto = CapNhatNhieuChiTietDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Danh sách chi tiết cần cập nhật',
        type: [CapNhatChiTietLuongDto],
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => CapNhatChiTietLuongDto),
    __metadata("design:type", Array)
], CapNhatNhieuChiTietDto.prototype, "danhSach", void 0);
class ChotBangLuongDto {
}
exports.ChotBangLuongDto = ChotBangLuongDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Người chốt', example: 'Nguyễn Văn A' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ChotBangLuongDto.prototype, "nguoiChot", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Ghi chú' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ChotBangLuongDto.prototype, "ghiChu", void 0);
//# sourceMappingURL=bang-luong.dto.js.map