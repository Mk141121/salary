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
exports.GoKhoiNhomDto = exports.ThemVaoNhomDto = exports.CapNhatNhomDto = exports.TaoNhomDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class TaoNhomDto {
}
exports.TaoNhomDto = TaoNhomDto;
__decorate([
    (0, class_validator_1.IsString)({ message: 'Mã nhóm không được trống' }),
    __metadata("design:type", String)
], TaoNhomDto.prototype, "maNhom", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Tên nhóm không được trống' }),
    __metadata("design:type", String)
], TaoNhomDto.prototype, "tenNhom", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TaoNhomDto.prototype, "moTa", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TaoNhomDto.prototype, "mauSac", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    (0, class_transformer_1.Type)(() => Boolean),
    __metadata("design:type", Boolean)
], TaoNhomDto.prototype, "trangThai", void 0);
class CapNhatNhomDto {
}
exports.CapNhatNhomDto = CapNhatNhomDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Mã nhóm không được trống' }),
    __metadata("design:type", String)
], CapNhatNhomDto.prototype, "maNhom", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Tên nhóm không được trống' }),
    __metadata("design:type", String)
], CapNhatNhomDto.prototype, "tenNhom", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CapNhatNhomDto.prototype, "moTa", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CapNhatNhomDto.prototype, "mauSac", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    (0, class_transformer_1.Type)(() => Boolean),
    __metadata("design:type", Boolean)
], CapNhatNhomDto.prototype, "trangThai", void 0);
class ThemVaoNhomDto {
}
exports.ThemVaoNhomDto = ThemVaoNhomDto;
__decorate([
    (0, class_validator_1.IsInt)({ message: 'ID nhóm phải là số' }),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], ThemVaoNhomDto.prototype, "nhomId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)({}, { message: 'Ngày bắt đầu không hợp lệ' }),
    __metadata("design:type", String)
], ThemVaoNhomDto.prototype, "tuNgay", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)({}, { message: 'Ngày kết thúc không hợp lệ' }),
    __metadata("design:type", String)
], ThemVaoNhomDto.prototype, "denNgay", void 0);
class GoKhoiNhomDto {
}
exports.GoKhoiNhomDto = GoKhoiNhomDto;
__decorate([
    (0, class_validator_1.IsInt)({ message: 'ID nhóm phải là số' }),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], GoKhoiNhomDto.prototype, "nhomId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)({}, { message: 'Ngày kết thúc không hợp lệ' }),
    __metadata("design:type", String)
], GoKhoiNhomDto.prototype, "denNgay", void 0);
//# sourceMappingURL=nhom-nhan-vien.dto.js.map