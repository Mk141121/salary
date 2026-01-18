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
exports.LocCaLamViecDto = exports.CapNhatCaLamViecDto = exports.TaoCaLamViecDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class TaoCaLamViecDto {
    constructor() {
        this.nghiGiuaCaPhut = 60;
        this.graceInPhut = 5;
        this.graceLatePhut = 5;
        this.isCaDem = false;
    }
}
exports.TaoCaLamViecDto = TaoCaLamViecDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Mã ca không được để trống' }),
    (0, class_validator_1.MaxLength)(50, { message: 'Mã ca tối đa 50 ký tự' }),
    (0, class_validator_1.Matches)(/^[A-Z0-9_]+$/, { message: 'Mã ca chỉ chứa chữ in hoa, số và dấu gạch dưới' }),
    __metadata("design:type", String)
], TaoCaLamViecDto.prototype, "maCa", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Tên ca không được để trống' }),
    (0, class_validator_1.MaxLength)(100, { message: 'Tên ca tối đa 100 ký tự' }),
    __metadata("design:type", String)
], TaoCaLamViecDto.prototype, "tenCa", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: 'Giờ vào phải có định dạng HH:mm' }),
    __metadata("design:type", String)
], TaoCaLamViecDto.prototype, "gioVao", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: 'Giờ ra phải có định dạng HH:mm' }),
    __metadata("design:type", String)
], TaoCaLamViecDto.prototype, "gioRa", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(120),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], TaoCaLamViecDto.prototype, "nghiGiuaCaPhut", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(60),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], TaoCaLamViecDto.prototype, "graceInPhut", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(60),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], TaoCaLamViecDto.prototype, "graceLatePhut", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    (0, class_transformer_1.Transform)(({ value }) => value === true || value === 'true'),
    __metadata("design:type", Boolean)
], TaoCaLamViecDto.prototype, "isCaDem", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], TaoCaLamViecDto.prototype, "phongBanId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(500),
    __metadata("design:type", String)
], TaoCaLamViecDto.prototype, "moTa", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^#[0-9A-Fa-f]{6}$/, { message: 'Màu hiển thị phải có định dạng hex (#RRGGBB)' }),
    __metadata("design:type", String)
], TaoCaLamViecDto.prototype, "mauHienThi", void 0);
class CapNhatCaLamViecDto {
}
exports.CapNhatCaLamViecDto = CapNhatCaLamViecDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100, { message: 'Tên ca tối đa 100 ký tự' }),
    __metadata("design:type", String)
], CapNhatCaLamViecDto.prototype, "tenCa", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: 'Giờ vào phải có định dạng HH:mm' }),
    __metadata("design:type", String)
], CapNhatCaLamViecDto.prototype, "gioVao", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: 'Giờ ra phải có định dạng HH:mm' }),
    __metadata("design:type", String)
], CapNhatCaLamViecDto.prototype, "gioRa", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(120),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], CapNhatCaLamViecDto.prototype, "nghiGiuaCaPhut", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(60),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], CapNhatCaLamViecDto.prototype, "graceInPhut", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(60),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], CapNhatCaLamViecDto.prototype, "graceLatePhut", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    (0, class_transformer_1.Transform)(({ value }) => value === true || value === 'true'),
    __metadata("design:type", Boolean)
], CapNhatCaLamViecDto.prototype, "isCaDem", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], CapNhatCaLamViecDto.prototype, "phongBanId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(500),
    __metadata("design:type", String)
], CapNhatCaLamViecDto.prototype, "moTa", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^#[0-9A-Fa-f]{6}$/, { message: 'Màu hiển thị phải có định dạng hex (#RRGGBB)' }),
    __metadata("design:type", String)
], CapNhatCaLamViecDto.prototype, "mauHienThi", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    (0, class_transformer_1.Transform)(({ value }) => value === true || value === 'true'),
    __metadata("design:type", Boolean)
], CapNhatCaLamViecDto.prototype, "trangThai", void 0);
class LocCaLamViecDto {
}
exports.LocCaLamViecDto = LocCaLamViecDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], LocCaLamViecDto.prototype, "phongBanId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    (0, class_transformer_1.Transform)(({ value }) => value === true || value === 'true'),
    __metadata("design:type", Boolean)
], LocCaLamViecDto.prototype, "trangThai", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    (0, class_transformer_1.Transform)(({ value }) => value === true || value === 'true'),
    __metadata("design:type", Boolean)
], LocCaLamViecDto.prototype, "isCaDem", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], LocCaLamViecDto.prototype, "tuKhoa", void 0);
//# sourceMappingURL=ca-lam-viec.dto.js.map