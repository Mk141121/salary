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
exports.TimKiemNhanVienDto = exports.CapNhatNhanVienDto = exports.TaoNhanVienDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const client_1 = require("@prisma/client");
class TaoNhanVienDto {
}
exports.TaoNhanVienDto = TaoNhanVienDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Mã nhân viên (tự động tạo nếu bỏ trống)', example: 'NV001' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TaoNhanVienDto.prototype, "maNhanVien", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Họ tên nhân viên', example: 'Nguyễn Văn An' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    __metadata("design:type", String)
], TaoNhanVienDto.prototype, "hoTen", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Email', example: 'an.nv@company.vn' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)({}, { message: 'Email không hợp lệ' }),
    (0, class_validator_1.ValidateIf)((o) => o.email !== '' && o.email !== null),
    __metadata("design:type", String)
], TaoNhanVienDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Số điện thoại', example: '0901234567' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.ValidateIf)((o) => o.soDienThoai !== '' && o.soDienThoai !== null),
    __metadata("design:type", String)
], TaoNhanVienDto.prototype, "soDienThoai", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID phòng ban', example: 1 }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], TaoNhanVienDto.prototype, "phongBanId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Chức vụ', example: 'Nhân viên' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TaoNhanVienDto.prototype, "chucVu", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Lương cơ bản', example: 10000000 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], TaoNhanVienDto.prototype, "luongCoBan", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Ngày vào làm', example: '2024-01-15' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], TaoNhanVienDto.prototype, "ngayVaoLam", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Giới tính', enum: client_1.GioiTinh }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(client_1.GioiTinh),
    (0, class_validator_1.ValidateIf)((o) => o.gioiTinh !== '' && o.gioiTinh !== null),
    __metadata("design:type", String)
], TaoNhanVienDto.prototype, "gioiTinh", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Ngày sinh', example: '1990-01-15' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.ValidateIf)((o) => o.ngaySinh !== '' && o.ngaySinh !== null),
    __metadata("design:type", String)
], TaoNhanVienDto.prototype, "ngaySinh", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Địa chỉ', example: '123 Nguyễn Huệ, Q1, TP.HCM' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TaoNhanVienDto.prototype, "diaChi", void 0);
class CapNhatNhanVienDto extends (0, swagger_1.PartialType)(TaoNhanVienDto) {
}
exports.CapNhatNhanVienDto = CapNhatNhanVienDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Trạng thái nhân viên',
        enum: client_1.TrangThaiNhanVien,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(client_1.TrangThaiNhanVien),
    __metadata("design:type", String)
], CapNhatNhanVienDto.prototype, "trangThai", void 0);
class TimKiemNhanVienDto {
}
exports.TimKiemNhanVienDto = TimKiemNhanVienDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'ID phòng ban' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], TimKiemNhanVienDto.prototype, "phongBanId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Từ khóa tìm kiếm' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TimKiemNhanVienDto.prototype, "tuKhoa", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Trạng thái nhân viên',
        enum: client_1.TrangThaiNhanVien,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(client_1.TrangThaiNhanVien),
    __metadata("design:type", String)
], TimKiemNhanVienDto.prototype, "trangThai", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Số trang', default: 1 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], TimKiemNhanVienDto.prototype, "trang", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Số bản ghi mỗi trang', default: 50 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], TimKiemNhanVienDto.prototype, "soLuong", void 0);
//# sourceMappingURL=nhan-vien.dto.js.map