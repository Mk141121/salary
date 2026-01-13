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
exports.SapXepRuleDto = exports.KetQuaPreview = exports.PreviewRuleDto = exports.KetQuaValidate = exports.ValidateRuleDto = exports.CapNhatQuyCheRuleDto = exports.TaoQuyCheRuleDto = exports.CongThucBieuThuc = exports.CongThucTheoSuKien = exports.CongThucBacThang = exports.CongThucTheoHeSo = exports.CongThucCoDinh = exports.BacThang = exports.DieuKienJson = exports.DieuKienApDung = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const client_1 = require("@prisma/client");
class DieuKienApDung {
}
exports.DieuKienApDung = DieuKienApDung;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Danh sách vai trò áp dụng' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], DieuKienApDung.prototype, "vaiTro", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Danh sách cấp trách nhiệm áp dụng' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], DieuKienApDung.prototype, "capTrachNhiem", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Danh sách ID nhân viên áp dụng' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], DieuKienApDung.prototype, "nhanVienIds", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Danh sách ID phòng ban áp dụng' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], DieuKienApDung.prototype, "phongBanIds", void 0);
class DieuKienJson {
}
exports.DieuKienJson = DieuKienJson;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Điều kiện áp dụng', type: DieuKienApDung }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => DieuKienApDung),
    __metadata("design:type", DieuKienApDung)
], DieuKienJson.prototype, "apDungCho", void 0);
class BacThang {
}
exports.BacThang = BacThang;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Từ giá trị' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], BacThang.prototype, "from", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Đến giá trị' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], BacThang.prototype, "to", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Số tiền cố định' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], BacThang.prototype, "soTien", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Số tiền mỗi lần (cho sự kiện)' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], BacThang.prototype, "soTienMoiLan", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Hệ số' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], BacThang.prototype, "heSo", void 0);
class CongThucCoDinh {
}
exports.CongThucCoDinh = CongThucCoDinh;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Số tiền cố định' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CongThucCoDinh.prototype, "soTien", void 0);
class CongThucTheoHeSo {
}
exports.CongThucTheoHeSo = CongThucTheoHeSo;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Nguồn base', example: 'LUONG_CO_BAN' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CongThucTheoHeSo.prototype, "base", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Hệ số' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CongThucTheoHeSo.prototype, "heSo", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Cộng thêm' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CongThucTheoHeSo.prototype, "congThem", void 0);
class CongThucBacThang {
}
exports.CongThucBacThang = CongThucBacThang;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Trường dữ liệu để so sánh', example: 'cap_trach_nhiem' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CongThucBacThang.prototype, "field", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Danh sách bậc thang', type: [BacThang] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => BacThang),
    __metadata("design:type", Array)
], CongThucBacThang.prototype, "bac", void 0);
class CongThucTheoSuKien {
}
exports.CongThucTheoSuKien = CongThucTheoSuKien;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Mã sự kiện', example: 'DI_TRE' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CongThucTheoSuKien.prototype, "maSuKien", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Cách tính', example: 'BAC_THANG' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CongThucTheoSuKien.prototype, "cachTinh", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Số tiền cố định mỗi lần (nếu cachTinh = CO_DINH)' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CongThucTheoSuKien.prototype, "soTienMoiLan", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Bậc thang (nếu cachTinh = BAC_THANG)', type: [BacThang] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => BacThang),
    __metadata("design:type", Array)
], CongThucTheoSuKien.prototype, "bac", void 0);
class CongThucBieuThuc {
}
exports.CongThucBieuThuc = CongThucBieuThuc;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Biểu thức công thức', example: 'LUONG_CO_BAN * HE_SO_TRACH_NHIEM + 200000' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CongThucBieuThuc.prototype, "bieuThuc", void 0);
class TaoQuyCheRuleDto {
}
exports.TaoQuyCheRuleDto = TaoQuyCheRuleDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID quy chế' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], TaoQuyCheRuleDto.prototype, "quyCheId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID khoản lương' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], TaoQuyCheRuleDto.prototype, "khoanLuongId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Tên rule' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TaoQuyCheRuleDto.prototype, "tenRule", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Mô tả' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TaoQuyCheRuleDto.prototype, "moTa", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Loại rule', enum: client_1.LoaiRule }),
    (0, class_validator_1.IsEnum)(client_1.LoaiRule),
    __metadata("design:type", String)
], TaoQuyCheRuleDto.prototype, "loaiRule", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Điều kiện JSON' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", DieuKienJson)
], TaoQuyCheRuleDto.prototype, "dieuKienJson", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Công thức JSON' }),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], TaoQuyCheRuleDto.prototype, "congThucJson", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Thứ tự ưu tiên (nhỏ = cao)' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], TaoQuyCheRuleDto.prototype, "thuTuUuTien", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Chế độ gộp', enum: client_1.CheDoGop }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(client_1.CheDoGop),
    __metadata("design:type", String)
], TaoQuyCheRuleDto.prototype, "cheDoGop", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Cho phép chỉnh tay' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], TaoQuyCheRuleDto.prototype, "choPhepChinhTay", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Người tạo' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TaoQuyCheRuleDto.prototype, "nguoiTao", void 0);
class CapNhatQuyCheRuleDto {
}
exports.CapNhatQuyCheRuleDto = CapNhatQuyCheRuleDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Tên rule' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CapNhatQuyCheRuleDto.prototype, "tenRule", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Mô tả' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CapNhatQuyCheRuleDto.prototype, "moTa", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Loại rule', enum: client_1.LoaiRule }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(client_1.LoaiRule),
    __metadata("design:type", String)
], CapNhatQuyCheRuleDto.prototype, "loaiRule", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Điều kiện JSON' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", DieuKienJson)
], CapNhatQuyCheRuleDto.prototype, "dieuKienJson", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Công thức JSON' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], CapNhatQuyCheRuleDto.prototype, "congThucJson", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Thứ tự ưu tiên' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CapNhatQuyCheRuleDto.prototype, "thuTuUuTien", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Chế độ gộp', enum: client_1.CheDoGop }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(client_1.CheDoGop),
    __metadata("design:type", String)
], CapNhatQuyCheRuleDto.prototype, "cheDoGop", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Cho phép chỉnh tay' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CapNhatQuyCheRuleDto.prototype, "choPhepChinhTay", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Trạng thái' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CapNhatQuyCheRuleDto.prototype, "trangThai", void 0);
class ValidateRuleDto {
}
exports.ValidateRuleDto = ValidateRuleDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Loại rule', enum: client_1.LoaiRule }),
    (0, class_validator_1.IsEnum)(client_1.LoaiRule),
    __metadata("design:type", String)
], ValidateRuleDto.prototype, "loaiRule", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Điều kiện JSON' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", DieuKienJson)
], ValidateRuleDto.prototype, "dieuKienJson", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Công thức JSON' }),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], ValidateRuleDto.prototype, "congThucJson", void 0);
class KetQuaValidate {
}
exports.KetQuaValidate = KetQuaValidate;
class PreviewRuleDto {
}
exports.PreviewRuleDto = PreviewRuleDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'ID nhân viên để test' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], PreviewRuleDto.prototype, "nhanVienId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID quy chế' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], PreviewRuleDto.prototype, "quyCheId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Dữ liệu giả lập' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], PreviewRuleDto.prototype, "duLieuGiaLap", void 0);
class KetQuaPreview {
}
exports.KetQuaPreview = KetQuaPreview;
class SapXepRuleDto {
}
exports.SapXepRuleDto = SapXepRuleDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Danh sách ID rule theo thứ tự mới' }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsNumber)({}, { each: true }),
    __metadata("design:type", Array)
], SapXepRuleDto.prototype, "danhSachRuleId", void 0);
//# sourceMappingURL=quy-che-rule.dto.js.map