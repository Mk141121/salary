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
exports.LocBangUngLuongDto = exports.MoKhoaBangUngLuongDto = exports.GhiNhanKhauTruDto = exports.SetSoTienCoDinhDto = exports.SetTheoTiLeDto = exports.CapNhatBulkChiTietDto = exports.CapNhatChiTietUngLuongDto = exports.SinhDanhSachNVDto = exports.CapNhatBangUngLuongDto = exports.TaoBangUngLuongDto = exports.CauHinhUngLuongDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class CauHinhUngLuongDto {
}
exports.CauHinhUngLuongDto = CauHinhUngLuongDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CauHinhUngLuongDto.prototype, "chuyen_can", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CauHinhUngLuongDto.prototype, "ung_luong", void 0);
class TaoBangUngLuongDto {
}
exports.TaoBangUngLuongDto = TaoBangUngLuongDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Tháng năm không được để trống' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TaoBangUngLuongDto.prototype, "thangNam", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Từ ngày không được để trống' }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], TaoBangUngLuongDto.prototype, "tuNgay", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Đến ngày không được để trống' }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], TaoBangUngLuongDto.prototype, "denNgay", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], TaoBangUngLuongDto.prototype, "ngayChiTra", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], TaoBangUngLuongDto.prototype, "phongBanId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TaoBangUngLuongDto.prototype, "ghiChu", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", CauHinhUngLuongDto)
], TaoBangUngLuongDto.prototype, "cauHinhJson", void 0);
class CapNhatBangUngLuongDto {
}
exports.CapNhatBangUngLuongDto = CapNhatBangUngLuongDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CapNhatBangUngLuongDto.prototype, "ngayChiTra", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CapNhatBangUngLuongDto.prototype, "ghiChu", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", CauHinhUngLuongDto)
], CapNhatBangUngLuongDto.prototype, "cauHinhJson", void 0);
class SinhDanhSachNVDto {
}
exports.SinhDanhSachNVDto = SinhDanhSachNVDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], SinhDanhSachNVDto.prototype, "phongBanId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], SinhDanhSachNVDto.prototype, "nhomNhanVienId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], SinhDanhSachNVDto.prototype, "nhanVienIds", void 0);
class CapNhatChiTietUngLuongDto {
}
exports.CapNhatChiTietUngLuongDto = CapNhatChiTietUngLuongDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CapNhatChiTietUngLuongDto.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0, { message: 'Số tiền đề xuất không được âm' }),
    __metadata("design:type", Number)
], CapNhatChiTietUngLuongDto.prototype, "soTienUngDeXuat", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0, { message: 'Số tiền duyệt không được âm' }),
    __metadata("design:type", Number)
], CapNhatChiTietUngLuongDto.prototype, "soTienUngDuyet", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CapNhatChiTietUngLuongDto.prototype, "ghiChu", void 0);
class CapNhatBulkChiTietDto {
}
exports.CapNhatBulkChiTietDto = CapNhatBulkChiTietDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => CapNhatChiTietUngLuongDto),
    __metadata("design:type", Array)
], CapNhatBulkChiTietDto.prototype, "chiTiets", void 0);
class SetTheoTiLeDto {
}
exports.SetTheoTiLeDto = SetTheoTiLeDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], SetTheoTiLeDto.prototype, "tiLe", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], SetTheoTiLeDto.prototype, "lamTron", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], SetTheoTiLeDto.prototype, "nhanVienIds", void 0);
class SetSoTienCoDinhDto {
}
exports.SetSoTienCoDinhDto = SetSoTienCoDinhDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], SetSoTienCoDinhDto.prototype, "soTien", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], SetSoTienCoDinhDto.prototype, "nhanVienIds", void 0);
class GhiNhanKhauTruDto {
}
exports.GhiNhanKhauTruDto = GhiNhanKhauTruDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], GhiNhanKhauTruDto.prototype, "bangLuongApDungId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GhiNhanKhauTruDto.prototype, "lyDo", void 0);
class MoKhoaBangUngLuongDto {
}
exports.MoKhoaBangUngLuongDto = MoKhoaBangUngLuongDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Lý do mở khóa không được để trống' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], MoKhoaBangUngLuongDto.prototype, "lyDo", void 0);
class LocBangUngLuongDto {
}
exports.LocBangUngLuongDto = LocBangUngLuongDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], LocBangUngLuongDto.prototype, "thangNam", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], LocBangUngLuongDto.prototype, "phongBanId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], LocBangUngLuongDto.prototype, "trangThai", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], LocBangUngLuongDto.prototype, "trang", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], LocBangUngLuongDto.prototype, "soLuong", void 0);
//# sourceMappingURL=ung-luong.dto.js.map