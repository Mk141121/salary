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
exports.TaoDanhMucSuKienDto = exports.LocSuKienDto = exports.DuyetNhieuSuKienDto = exports.DuyetSuKienDto = exports.CapNhatSuKienDto = exports.TaoSuKienDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const client_1 = require("@prisma/client");
class TaoSuKienDto {
}
exports.TaoSuKienDto = TaoSuKienDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID nhân viên' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], TaoSuKienDto.prototype, "nhanVienId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID phòng ban' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], TaoSuKienDto.prototype, "phongBanId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Ngày xảy ra sự kiện' }),
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], TaoSuKienDto.prototype, "ngay", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Loại sự kiện', enum: client_1.LoaiSuKien }),
    (0, class_validator_1.IsEnum)(client_1.LoaiSuKien),
    __metadata("design:type", String)
], TaoSuKienDto.prototype, "loaiSuKien", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Mã sự kiện', example: 'DI_TRE' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TaoSuKienDto.prototype, "maSuKien", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Giá trị (số lần/điểm)' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], TaoSuKienDto.prototype, "giaTri", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Số tiền quy đổi' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], TaoSuKienDto.prototype, "soTien", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Ghi chú' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TaoSuKienDto.prototype, "ghiChu", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Người tạo' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TaoSuKienDto.prototype, "nguoiTao", void 0);
class CapNhatSuKienDto {
}
exports.CapNhatSuKienDto = CapNhatSuKienDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Ngày xảy ra sự kiện' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], CapNhatSuKienDto.prototype, "ngay", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Loại sự kiện', enum: client_1.LoaiSuKien }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(client_1.LoaiSuKien),
    __metadata("design:type", String)
], CapNhatSuKienDto.prototype, "loaiSuKien", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Mã sự kiện' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CapNhatSuKienDto.prototype, "maSuKien", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Giá trị' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CapNhatSuKienDto.prototype, "giaTri", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Số tiền quy đổi' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CapNhatSuKienDto.prototype, "soTien", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Ghi chú' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CapNhatSuKienDto.prototype, "ghiChu", void 0);
class DuyetSuKienDto {
}
exports.DuyetSuKienDto = DuyetSuKienDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Người duyệt' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DuyetSuKienDto.prototype, "duyetBoi", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Ghi chú duyệt' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DuyetSuKienDto.prototype, "ghiChu", void 0);
class DuyetNhieuSuKienDto {
}
exports.DuyetNhieuSuKienDto = DuyetNhieuSuKienDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Danh sách ID sự kiện' }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsNumber)({}, { each: true }),
    __metadata("design:type", Array)
], DuyetNhieuSuKienDto.prototype, "ids", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Người duyệt' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DuyetNhieuSuKienDto.prototype, "duyetBoi", void 0);
class LocSuKienDto {
}
exports.LocSuKienDto = LocSuKienDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'ID nhân viên' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], LocSuKienDto.prototype, "nhanVienId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'ID phòng ban' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], LocSuKienDto.prototype, "phongBanId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Loại sự kiện', enum: client_1.LoaiSuKien }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(client_1.LoaiSuKien),
    __metadata("design:type", String)
], LocSuKienDto.prototype, "loaiSuKien", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Mã sự kiện' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], LocSuKienDto.prototype, "maSuKien", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Trạng thái', enum: client_1.TrangThaiSuKien }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(client_1.TrangThaiSuKien),
    __metadata("design:type", String)
], LocSuKienDto.prototype, "trangThai", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Tháng' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], LocSuKienDto.prototype, "thang", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Năm' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], LocSuKienDto.prototype, "nam", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Từ ngày' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], LocSuKienDto.prototype, "tuNgay", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Đến ngày' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], LocSuKienDto.prototype, "denNgay", void 0);
class TaoDanhMucSuKienDto {
}
exports.TaoDanhMucSuKienDto = TaoDanhMucSuKienDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Mã sự kiện' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TaoDanhMucSuKienDto.prototype, "maSuKien", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Tên sự kiện' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TaoDanhMucSuKienDto.prototype, "tenSuKien", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Loại', enum: client_1.LoaiSuKien }),
    (0, class_validator_1.IsEnum)(client_1.LoaiSuKien),
    __metadata("design:type", String)
], TaoDanhMucSuKienDto.prototype, "loai", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Mô tả' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TaoDanhMucSuKienDto.prototype, "moTa", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Số tiền mặc định' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], TaoDanhMucSuKienDto.prototype, "soTienMacDinh", void 0);
//# sourceMappingURL=su-kien.dto.js.map