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
exports.CapNhatNganHangDto = exports.TaoNganHangDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class TaoNganHangDto {
}
exports.TaoNganHangDto = TaoNganHangDto;
__decorate([
    (0, class_validator_1.IsString)({ message: 'Tên ngân hàng không được trống' }),
    __metadata("design:type", String)
], TaoNganHangDto.prototype, "tenNganHang", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Số tài khoản không được trống' }),
    __metadata("design:type", String)
], TaoNganHangDto.prototype, "soTaiKhoan", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Chủ tài khoản không được trống' }),
    __metadata("design:type", String)
], TaoNganHangDto.prototype, "chuTaiKhoan", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TaoNganHangDto.prototype, "chiNhanh", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    (0, class_transformer_1.Type)(() => Boolean),
    __metadata("design:type", Boolean)
], TaoNganHangDto.prototype, "laMacDinh", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)({}, { message: 'Ngày bắt đầu không hợp lệ' }),
    __metadata("design:type", String)
], TaoNganHangDto.prototype, "tuNgay", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)({}, { message: 'Ngày kết thúc không hợp lệ' }),
    __metadata("design:type", String)
], TaoNganHangDto.prototype, "denNgay", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TaoNganHangDto.prototype, "ghiChu", void 0);
class CapNhatNganHangDto {
}
exports.CapNhatNganHangDto = CapNhatNganHangDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Tên ngân hàng không được trống' }),
    __metadata("design:type", String)
], CapNhatNganHangDto.prototype, "tenNganHang", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Số tài khoản không được trống' }),
    __metadata("design:type", String)
], CapNhatNganHangDto.prototype, "soTaiKhoan", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Chủ tài khoản không được trống' }),
    __metadata("design:type", String)
], CapNhatNganHangDto.prototype, "chuTaiKhoan", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CapNhatNganHangDto.prototype, "chiNhanh", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    (0, class_transformer_1.Type)(() => Boolean),
    __metadata("design:type", Boolean)
], CapNhatNganHangDto.prototype, "laMacDinh", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)({}, { message: 'Ngày bắt đầu không hợp lệ' }),
    __metadata("design:type", String)
], CapNhatNganHangDto.prototype, "tuNgay", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)({}, { message: 'Ngày kết thúc không hợp lệ' }),
    __metadata("design:type", String)
], CapNhatNganHangDto.prototype, "denNgay", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CapNhatNganHangDto.prototype, "ghiChu", void 0);
//# sourceMappingURL=ngan-hang.dto.js.map