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
exports.TangPhuCapDto = exports.KetThucPhuCapDto = exports.TaoPhuCapDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class TaoPhuCapDto {
}
exports.TaoPhuCapDto = TaoPhuCapDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID nhân viên' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], TaoPhuCapDto.prototype, "nhanVienId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID khoản lương (chỉ loại THU_NHAP)' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], TaoPhuCapDto.prototype, "khoanLuongId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Số tiền phụ cấp' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], TaoPhuCapDto.prototype, "soTien", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Ngày bắt đầu hiệu lực (YYYY-MM-DD)' }),
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], TaoPhuCapDto.prototype, "tuNgay", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Ngày kết thúc hiệu lực (YYYY-MM-DD)' }),
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], TaoPhuCapDto.prototype, "denNgay", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Ghi chú' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], TaoPhuCapDto.prototype, "ghiChu", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Người tạo' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], TaoPhuCapDto.prototype, "nguoiTao", void 0);
class KetThucPhuCapDto {
}
exports.KetThucPhuCapDto = KetThucPhuCapDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Ngày kết thúc (YYYY-MM-DD)' }),
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], KetThucPhuCapDto.prototype, "denNgay", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Người cập nhật' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], KetThucPhuCapDto.prototype, "nguoiCapNhat", void 0);
class TangPhuCapDto {
}
exports.TangPhuCapDto = TangPhuCapDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Số tiền mới' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], TangPhuCapDto.prototype, "soTienMoi", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Ngày bắt đầu hiệu lực mới (YYYY-MM-DD)' }),
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], TangPhuCapDto.prototype, "tuNgay", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Ghi chú' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], TangPhuCapDto.prototype, "ghiChu", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Người tạo' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], TangPhuCapDto.prototype, "nguoiTao", void 0);
//# sourceMappingURL=phu-cap-nhan-vien.dto.js.map