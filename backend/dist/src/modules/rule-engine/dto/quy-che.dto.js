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
exports.LocQuyCheDto = exports.NhanBanQuyCheDto = exports.CapNhatQuyCheDto = exports.TaoQuyCheDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const client_1 = require("@prisma/client");
class TaoQuyCheDto {
}
exports.TaoQuyCheDto = TaoQuyCheDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID phòng ban' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], TaoQuyCheDto.prototype, "phongBanId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Tên quy chế' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TaoQuyCheDto.prototype, "tenQuyChe", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Mô tả' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TaoQuyCheDto.prototype, "moTa", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Ngày bắt đầu áp dụng' }),
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], TaoQuyCheDto.prototype, "tuNgay", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Ngày kết thúc' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], TaoQuyCheDto.prototype, "denNgay", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Người tạo' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TaoQuyCheDto.prototype, "nguoiTao", void 0);
class CapNhatQuyCheDto {
}
exports.CapNhatQuyCheDto = CapNhatQuyCheDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Tên quy chế' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CapNhatQuyCheDto.prototype, "tenQuyChe", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Mô tả' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CapNhatQuyCheDto.prototype, "moTa", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Ngày bắt đầu' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], CapNhatQuyCheDto.prototype, "tuNgay", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Ngày kết thúc' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], CapNhatQuyCheDto.prototype, "denNgay", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Trạng thái', enum: client_1.TrangThaiQuyChe }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(client_1.TrangThaiQuyChe),
    __metadata("design:type", String)
], CapNhatQuyCheDto.prototype, "trangThai", void 0);
class NhanBanQuyCheDto {
}
exports.NhanBanQuyCheDto = NhanBanQuyCheDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Tên quy chế mới' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], NhanBanQuyCheDto.prototype, "tenQuyChe", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Ngày bắt đầu áp dụng' }),
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], NhanBanQuyCheDto.prototype, "tuNgay", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Người tạo' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], NhanBanQuyCheDto.prototype, "nguoiTao", void 0);
class LocQuyCheDto {
}
exports.LocQuyCheDto = LocQuyCheDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'ID phòng ban' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], LocQuyCheDto.prototype, "phongBanId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Trạng thái', enum: client_1.TrangThaiQuyChe }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(client_1.TrangThaiQuyChe),
    __metadata("design:type", String)
], LocQuyCheDto.prototype, "trangThai", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Tháng hiệu lực' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], LocQuyCheDto.prototype, "thang", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Năm hiệu lực' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], LocQuyCheDto.prototype, "nam", void 0);
//# sourceMappingURL=quy-che.dto.js.map