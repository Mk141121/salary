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
exports.CapNhatThuTuDto = exports.CapNhatKhoanLuongDto = exports.TaoKhoanLuongDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
const client_1 = require("@prisma/client");
class TaoKhoanLuongDto {
}
exports.TaoKhoanLuongDto = TaoKhoanLuongDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Mã khoản lương', example: 'LUONG_CO_BAN' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    __metadata("design:type", String)
], TaoKhoanLuongDto.prototype, "maKhoan", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Tên khoản lương', example: 'Lương cơ bản' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    __metadata("design:type", String)
], TaoKhoanLuongDto.prototype, "tenKhoan", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Loại khoản lương',
        enum: client_1.LoaiKhoanLuong,
        default: 'THU_NHAP',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(client_1.LoaiKhoanLuong),
    __metadata("design:type", String)
], TaoKhoanLuongDto.prototype, "loai", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Khoản này có chịu thuế không', default: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], TaoKhoanLuongDto.prototype, "chiuThue", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Phạm vi áp dụng (null = toàn công ty)' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TaoKhoanLuongDto.prototype, "phamViApDung", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Mô tả khoản lương' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TaoKhoanLuongDto.prototype, "moTa", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Thứ tự hiển thị' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], TaoKhoanLuongDto.prototype, "thuTu", void 0);
class CapNhatKhoanLuongDto extends (0, swagger_1.PartialType)(TaoKhoanLuongDto) {
}
exports.CapNhatKhoanLuongDto = CapNhatKhoanLuongDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Trạng thái hoạt động' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CapNhatKhoanLuongDto.prototype, "trangThai", void 0);
class ThuTuItem {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID khoản lương' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ThuTuItem.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Thứ tự mới' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ThuTuItem.prototype, "thuTu", void 0);
class CapNhatThuTuDto {
}
exports.CapNhatThuTuDto = CapNhatThuTuDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Danh sách ID và thứ tự mới', type: [ThuTuItem] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => ThuTuItem),
    __metadata("design:type", Array)
], CapNhatThuTuDto.prototype, "danhSach", void 0);
//# sourceMappingURL=khoan-luong.dto.js.map