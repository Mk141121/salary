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
exports.CapNhatPhongBanDto = exports.TaoPhongBanDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class TaoPhongBanDto {
}
exports.TaoPhongBanDto = TaoPhongBanDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Mã phòng ban', example: 'KT' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    __metadata("design:type", String)
], TaoPhongBanDto.prototype, "maPhongBan", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Tên phòng ban', example: 'Kế toán' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    __metadata("design:type", String)
], TaoPhongBanDto.prototype, "tenPhongBan", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Mô tả phòng ban' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TaoPhongBanDto.prototype, "moTa", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Giờ vào chuẩn (HH:mm)', example: '08:00' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, { message: 'Giờ vào phải có định dạng HH:mm' }),
    __metadata("design:type", String)
], TaoPhongBanDto.prototype, "gioVaoChuan", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Giờ ra chuẩn (HH:mm)', example: '17:00' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, { message: 'Giờ ra phải có định dạng HH:mm' }),
    __metadata("design:type", String)
], TaoPhongBanDto.prototype, "gioRaChuan", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Số phút cho phép đi trễ', example: 5 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(60),
    __metadata("design:type", Number)
], TaoPhongBanDto.prototype, "phutChoPhepTre", void 0);
class CapNhatPhongBanDto extends (0, swagger_1.PartialType)(TaoPhongBanDto) {
}
exports.CapNhatPhongBanDto = CapNhatPhongBanDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Trạng thái hoạt động' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CapNhatPhongBanDto.prototype, "trangThai", void 0);
//# sourceMappingURL=phong-ban.dto.js.map