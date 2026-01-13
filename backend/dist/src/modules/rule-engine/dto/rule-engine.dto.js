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
exports.TinhLuongDto = exports.TestCongThucDto = exports.ThemBienSoDto = exports.CapNhatCongThucDto = exports.TaoCongThucDto = exports.BienSoDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const client_1 = require("@prisma/client");
class BienSoDto {
}
exports.BienSoDto = BienSoDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Tên biến' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BienSoDto.prototype, "tenBien", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Mô tả' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BienSoDto.prototype, "moTa", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Kiểu dữ liệu', enum: client_1.KieuDuLieu }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(client_1.KieuDuLieu),
    __metadata("design:type", String)
], BienSoDto.prototype, "kieuDuLieu", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Nguồn dữ liệu' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BienSoDto.prototype, "nguonDuLieu", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Giá trị mặc định' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BienSoDto.prototype, "giaTriMacDinh", void 0);
class TaoCongThucDto {
}
exports.TaoCongThucDto = TaoCongThucDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Mã công thức' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TaoCongThucDto.prototype, "maCongThuc", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Tên công thức' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TaoCongThucDto.prototype, "tenCongThuc", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Mô tả' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TaoCongThucDto.prototype, "moTa", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'ID phòng ban (null = toàn công ty)' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], TaoCongThucDto.prototype, "phongBanId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Biểu thức công thức', example: 'LUONG_CO_BAN * (CONG_THUC_TE / CONG_CHUAN)' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TaoCongThucDto.prototype, "congThuc", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Ngày bắt đầu áp dụng' }),
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], TaoCongThucDto.prototype, "tuNgay", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Ngày kết thúc' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], TaoCongThucDto.prototype, "denNgay", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Người tạo' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TaoCongThucDto.prototype, "nguoiTao", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Danh sách biến số', type: [BienSoDto] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => BienSoDto),
    __metadata("design:type", Array)
], TaoCongThucDto.prototype, "bienSos", void 0);
class CapNhatCongThucDto {
}
exports.CapNhatCongThucDto = CapNhatCongThucDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Biểu thức công thức mới' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CapNhatCongThucDto.prototype, "congThuc", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Lý do thay đổi' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CapNhatCongThucDto.prototype, "lyDoThayDoi", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Người thay đổi' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CapNhatCongThucDto.prototype, "nguoiThayDoi", void 0);
class ThemBienSoDto {
}
exports.ThemBienSoDto = ThemBienSoDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Tên biến' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ThemBienSoDto.prototype, "tenBien", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Mô tả' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ThemBienSoDto.prototype, "moTa", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Kiểu dữ liệu', enum: client_1.KieuDuLieu }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(client_1.KieuDuLieu),
    __metadata("design:type", String)
], ThemBienSoDto.prototype, "kieuDuLieu", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Nguồn dữ liệu' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ThemBienSoDto.prototype, "nguonDuLieu", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Giá trị mặc định' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ThemBienSoDto.prototype, "giaTriMacDinh", void 0);
class TestCongThucDto {
}
exports.TestCongThucDto = TestCongThucDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Biểu thức công thức', example: 'LUONG_CO_BAN * 1.5' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TestCongThucDto.prototype, "congThuc", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Giá trị biến số', example: { LUONG_CO_BAN: 10000000 } }),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], TestCongThucDto.prototype, "bienSo", void 0);
class TinhLuongDto {
}
exports.TinhLuongDto = TinhLuongDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID nhân viên' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], TinhLuongDto.prototype, "nhanVienId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID công thức' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], TinhLuongDto.prototype, "congThucId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Tháng (1-12)' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], TinhLuongDto.prototype, "thang", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Năm' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], TinhLuongDto.prototype, "nam", void 0);
//# sourceMappingURL=rule-engine.dto.js.map