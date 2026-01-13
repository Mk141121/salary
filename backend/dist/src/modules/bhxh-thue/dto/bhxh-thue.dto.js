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
exports.CapNhatNguoiPhuThuocDto = exports.ThemNguoiPhuThuocDto = exports.LuuCauHinhBHXHDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class LuuCauHinhBHXHDto {
}
exports.LuuCauHinhBHXHDto = LuuCauHinhBHXHDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Năm áp dụng', example: 2025 }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], LuuCauHinhBHXHDto.prototype, "nam", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Tỷ lệ BHXH nhân viên đóng (%)', example: 8 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(100),
    __metadata("design:type", Number)
], LuuCauHinhBHXHDto.prototype, "tyLeBHXH_NV", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Tỷ lệ BHXH doanh nghiệp đóng (%)', example: 17.5 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(100),
    __metadata("design:type", Number)
], LuuCauHinhBHXHDto.prototype, "tyLeBHXH_DN", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Tỷ lệ BHYT nhân viên đóng (%)', example: 1.5 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(100),
    __metadata("design:type", Number)
], LuuCauHinhBHXHDto.prototype, "tyLeBHYT_NV", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Tỷ lệ BHYT doanh nghiệp đóng (%)', example: 3 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(100),
    __metadata("design:type", Number)
], LuuCauHinhBHXHDto.prototype, "tyLeBHYT_DN", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Tỷ lệ BHTN nhân viên đóng (%)', example: 1 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(100),
    __metadata("design:type", Number)
], LuuCauHinhBHXHDto.prototype, "tyLeBHTN_NV", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Tỷ lệ BHTN doanh nghiệp đóng (%)', example: 1 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(100),
    __metadata("design:type", Number)
], LuuCauHinhBHXHDto.prototype, "tyLeBHTN_DN", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Lương cơ bản tối thiểu vùng', example: 4680000 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], LuuCauHinhBHXHDto.prototype, "luongCoBanToiThieu", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Trần đóng BHXH', example: 46800000 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], LuuCauHinhBHXHDto.prototype, "tranDongBHXH", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Lương cơ sở', example: 2340000 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], LuuCauHinhBHXHDto.prototype, "luongCoSo", void 0);
class ThemNguoiPhuThuocDto {
}
exports.ThemNguoiPhuThuocDto = ThemNguoiPhuThuocDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID nhân viên' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ThemNguoiPhuThuocDto.prototype, "nhanVienId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Họ tên người phụ thuộc' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ThemNguoiPhuThuocDto.prototype, "hoTen", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Ngày sinh' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], ThemNguoiPhuThuocDto.prototype, "ngaySinh", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Quan hệ (Con, Bố, Mẹ, Vợ/Chồng...)' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ThemNguoiPhuThuocDto.prototype, "quanHe", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Mã số thuế' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ThemNguoiPhuThuocDto.prototype, "maSoThue", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Số CCCD' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ThemNguoiPhuThuocDto.prototype, "soCCCD", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Ngày bắt đầu tính giảm trừ' }),
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], ThemNguoiPhuThuocDto.prototype, "tuNgay", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Ngày kết thúc' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], ThemNguoiPhuThuocDto.prototype, "denNgay", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Ghi chú' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ThemNguoiPhuThuocDto.prototype, "ghiChu", void 0);
class CapNhatNguoiPhuThuocDto {
}
exports.CapNhatNguoiPhuThuocDto = CapNhatNguoiPhuThuocDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Họ tên người phụ thuộc' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CapNhatNguoiPhuThuocDto.prototype, "hoTen", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Ngày sinh' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], CapNhatNguoiPhuThuocDto.prototype, "ngaySinh", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Quan hệ' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CapNhatNguoiPhuThuocDto.prototype, "quanHe", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Mã số thuế' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CapNhatNguoiPhuThuocDto.prototype, "maSoThue", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Số CCCD' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CapNhatNguoiPhuThuocDto.prototype, "soCCCD", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Ngày bắt đầu' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], CapNhatNguoiPhuThuocDto.prototype, "tuNgay", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Ngày kết thúc' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], CapNhatNguoiPhuThuocDto.prototype, "denNgay", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Trạng thái' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CapNhatNguoiPhuThuocDto.prototype, "trangThai", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Ghi chú' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CapNhatNguoiPhuThuocDto.prototype, "ghiChu", void 0);
//# sourceMappingURL=bhxh-thue.dto.js.map