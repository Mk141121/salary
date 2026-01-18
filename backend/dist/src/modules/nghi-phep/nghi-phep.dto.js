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
exports.ThongKeMappingResponse = exports.LichNghiNhanVienResponse = exports.ChiTietNghiPhepNgayResponse = exports.DonNghiPhepResponse = exports.LoaiNghiResponse = exports.LocLichNghiDto = exports.LocDonNghiPhepDto = exports.HuyDonNghiPhepDto = exports.TuChoiDonNghiPhepDto = exports.DuyetDonNghiPhepDto = exports.CapNhatDonNghiPhepDto = exports.TaoDonNghiPhepDto = exports.CapNhatLoaiNghiDto = exports.TaoLoaiNghiDto = exports.NhomLoaiNghi = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const client_1 = require("@prisma/client");
var NhomLoaiNghi;
(function (NhomLoaiNghi) {
    NhomLoaiNghi["CO_PHEP"] = "CO_PHEP";
    NhomLoaiNghi["KHONG_PHEP"] = "KHONG_PHEP";
})(NhomLoaiNghi || (exports.NhomLoaiNghi = NhomLoaiNghi = {}));
class TaoLoaiNghiDto {
}
exports.TaoLoaiNghiDto = TaoLoaiNghiDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], TaoLoaiNghiDto.prototype, "maLoaiNghi", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], TaoLoaiNghiDto.prototype, "tenLoaiNghi", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(NhomLoaiNghi),
    __metadata("design:type", String)
], TaoLoaiNghiDto.prototype, "nhomLoai", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], TaoLoaiNghiDto.prototype, "coTinhLuong", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], TaoLoaiNghiDto.prototype, "coTinhChuyenCan", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], TaoLoaiNghiDto.prototype, "thuTuHienThi", void 0);
class CapNhatLoaiNghiDto {
}
exports.CapNhatLoaiNghiDto = CapNhatLoaiNghiDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], CapNhatLoaiNghiDto.prototype, "tenLoaiNghi", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(NhomLoaiNghi),
    __metadata("design:type", String)
], CapNhatLoaiNghiDto.prototype, "nhomLoai", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CapNhatLoaiNghiDto.prototype, "coTinhLuong", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CapNhatLoaiNghiDto.prototype, "coTinhChuyenCan", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CapNhatLoaiNghiDto.prototype, "thuTuHienThi", void 0);
class TaoDonNghiPhepDto {
}
exports.TaoDonNghiPhepDto = TaoDonNghiPhepDto;
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], TaoDonNghiPhepDto.prototype, "nhanVienId", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], TaoDonNghiPhepDto.prototype, "loaiNghiId", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], TaoDonNghiPhepDto.prototype, "tuNgay", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], TaoDonNghiPhepDto.prototype, "denNgay", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(500),
    __metadata("design:type", String)
], TaoDonNghiPhepDto.prototype, "lyDo", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TaoDonNghiPhepDto.prototype, "tepDinhKemUrl", void 0);
class CapNhatDonNghiPhepDto {
}
exports.CapNhatDonNghiPhepDto = CapNhatDonNghiPhepDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CapNhatDonNghiPhepDto.prototype, "loaiNghiId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CapNhatDonNghiPhepDto.prototype, "tuNgay", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CapNhatDonNghiPhepDto.prototype, "denNgay", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(500),
    __metadata("design:type", String)
], CapNhatDonNghiPhepDto.prototype, "lyDo", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CapNhatDonNghiPhepDto.prototype, "tepDinhKemUrl", void 0);
class DuyetDonNghiPhepDto {
}
exports.DuyetDonNghiPhepDto = DuyetDonNghiPhepDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(500),
    __metadata("design:type", String)
], DuyetDonNghiPhepDto.prototype, "ghiChu", void 0);
class TuChoiDonNghiPhepDto {
}
exports.TuChoiDonNghiPhepDto = TuChoiDonNghiPhepDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(500),
    __metadata("design:type", String)
], TuChoiDonNghiPhepDto.prototype, "lyDoTuChoi", void 0);
class HuyDonNghiPhepDto {
}
exports.HuyDonNghiPhepDto = HuyDonNghiPhepDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(500),
    __metadata("design:type", String)
], HuyDonNghiPhepDto.prototype, "lyDo", void 0);
class LocDonNghiPhepDto {
    constructor() {
        this.page = 1;
        this.limit = 20;
    }
}
exports.LocDonNghiPhepDto = LocDonNghiPhepDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], LocDonNghiPhepDto.prototype, "phongBanId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], LocDonNghiPhepDto.prototype, "nhanVienId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], LocDonNghiPhepDto.prototype, "loaiNghiId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(client_1.TrangThaiDonNghiPhep),
    __metadata("design:type", String)
], LocDonNghiPhepDto.prototype, "trangThai", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], LocDonNghiPhepDto.prototype, "tuNgay", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], LocDonNghiPhepDto.prototype, "denNgay", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], LocDonNghiPhepDto.prototype, "page", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], LocDonNghiPhepDto.prototype, "limit", void 0);
class LocLichNghiDto {
}
exports.LocLichNghiDto = LocLichNghiDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], LocLichNghiDto.prototype, "nhanVienId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], LocLichNghiDto.prototype, "phongBanId", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], LocLichNghiDto.prototype, "tuNgay", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], LocLichNghiDto.prototype, "denNgay", void 0);
class LoaiNghiResponse {
}
exports.LoaiNghiResponse = LoaiNghiResponse;
class DonNghiPhepResponse {
}
exports.DonNghiPhepResponse = DonNghiPhepResponse;
class ChiTietNghiPhepNgayResponse {
}
exports.ChiTietNghiPhepNgayResponse = ChiTietNghiPhepNgayResponse;
class LichNghiNhanVienResponse {
}
exports.LichNghiNhanVienResponse = LichNghiNhanVienResponse;
class ThongKeMappingResponse {
}
exports.ThongKeMappingResponse = ThongKeMappingResponse;
//# sourceMappingURL=nghi-phep.dto.js.map