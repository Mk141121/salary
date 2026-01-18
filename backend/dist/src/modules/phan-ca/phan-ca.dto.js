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
exports.XoaPhanCaDto = exports.CalendarViewDto = exports.LocLichPhanCaDto = exports.CopyTuanDto = exports.AssignBatchDto = exports.ChiTietPhanCaNgayDto = exports.CapNhatLichPhanCaDto = exports.TaoLichPhanCaDto = exports.TrangThaiLichCaEnum = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
var TrangThaiLichCaEnum;
(function (TrangThaiLichCaEnum) {
    TrangThaiLichCaEnum["NHAP"] = "NHAP";
    TrangThaiLichCaEnum["DA_CONG_BO"] = "DA_CONG_BO";
    TrangThaiLichCaEnum["HUY"] = "HUY";
})(TrangThaiLichCaEnum || (exports.TrangThaiLichCaEnum = TrangThaiLichCaEnum = {}));
class TaoLichPhanCaDto {
}
exports.TaoLichPhanCaDto = TaoLichPhanCaDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^\d{4}-(0[1-9]|1[0-2])$/, { message: 'Tháng năm phải có định dạng YYYY-MM' }),
    __metadata("design:type", String)
], TaoLichPhanCaDto.prototype, "thangNam", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], TaoLichPhanCaDto.prototype, "phongBanId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], TaoLichPhanCaDto.prototype, "nhomId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(200),
    __metadata("design:type", String)
], TaoLichPhanCaDto.prototype, "tenLich", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(500),
    __metadata("design:type", String)
], TaoLichPhanCaDto.prototype, "ghiChu", void 0);
class CapNhatLichPhanCaDto {
}
exports.CapNhatLichPhanCaDto = CapNhatLichPhanCaDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(200),
    __metadata("design:type", String)
], CapNhatLichPhanCaDto.prototype, "tenLich", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(500),
    __metadata("design:type", String)
], CapNhatLichPhanCaDto.prototype, "ghiChu", void 0);
class ChiTietPhanCaNgayDto {
}
exports.ChiTietPhanCaNgayDto = ChiTietPhanCaNgayDto;
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], ChiTietPhanCaNgayDto.prototype, "nhanVienId", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], ChiTietPhanCaNgayDto.prototype, "ngay", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], ChiTietPhanCaNgayDto.prototype, "caLamViecId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(200),
    __metadata("design:type", String)
], ChiTietPhanCaNgayDto.prototype, "ghiChu", void 0);
class AssignBatchDto {
}
exports.AssignBatchDto = AssignBatchDto;
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayMinSize)(1, { message: 'Phải có ít nhất 1 nhân viên' }),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Array)
], AssignBatchDto.prototype, "nhanVienIds", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], AssignBatchDto.prototype, "caLamViecId", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], AssignBatchDto.prototype, "tuNgay", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], AssignBatchDto.prototype, "denNgay", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Array)
], AssignBatchDto.prototype, "ngoaiTruThu", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AssignBatchDto.prototype, "ghiChu", void 0);
class CopyTuanDto {
}
exports.CopyTuanDto = CopyTuanDto;
__decorate([
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CopyTuanDto.prototype, "tuanNguon", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CopyTuanDto.prototype, "tuanDich", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Array)
], CopyTuanDto.prototype, "nhanVienIds", void 0);
class LocLichPhanCaDto {
}
exports.LocLichPhanCaDto = LocLichPhanCaDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^\d{4}-(0[1-9]|1[0-2])$/),
    __metadata("design:type", String)
], LocLichPhanCaDto.prototype, "thangNam", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], LocLichPhanCaDto.prototype, "phongBanId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], LocLichPhanCaDto.prototype, "nhomId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(TrangThaiLichCaEnum),
    __metadata("design:type", String)
], LocLichPhanCaDto.prototype, "trangThai", void 0);
class CalendarViewDto {
}
exports.CalendarViewDto = CalendarViewDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^\d{4}-(0[1-9]|1[0-2])$/, { message: 'Tháng năm phải có định dạng YYYY-MM' }),
    __metadata("design:type", String)
], CalendarViewDto.prototype, "thangNam", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], CalendarViewDto.prototype, "phongBanId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], CalendarViewDto.prototype, "nhomId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Array)
], CalendarViewDto.prototype, "nhanVienIds", void 0);
class XoaPhanCaDto {
}
exports.XoaPhanCaDto = XoaPhanCaDto;
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayMinSize)(1),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Array)
], XoaPhanCaDto.prototype, "chiTietIds", void 0);
//# sourceMappingURL=phan-ca.dto.js.map