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
exports.NgungHopDongDto = exports.CapNhatHopDongDto = exports.TaoHopDongDto = exports.TrangThaiHopDongDto = exports.LoaiHopDongDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
var LoaiHopDongDto;
(function (LoaiHopDongDto) {
    LoaiHopDongDto["THU_VIEC"] = "THU_VIEC";
    LoaiHopDongDto["MOT_NAM"] = "MOT_NAM";
    LoaiHopDongDto["BA_NAM"] = "BA_NAM";
    LoaiHopDongDto["VO_THOI_HAN"] = "VO_THOI_HAN";
})(LoaiHopDongDto || (exports.LoaiHopDongDto = LoaiHopDongDto = {}));
var TrangThaiHopDongDto;
(function (TrangThaiHopDongDto) {
    TrangThaiHopDongDto["HIEU_LUC"] = "HIEU_LUC";
    TrangThaiHopDongDto["HET_HAN"] = "HET_HAN";
    TrangThaiHopDongDto["HUY_BO"] = "HUY_BO";
})(TrangThaiHopDongDto || (exports.TrangThaiHopDongDto = TrangThaiHopDongDto = {}));
class TaoHopDongDto {
}
exports.TaoHopDongDto = TaoHopDongDto;
__decorate([
    (0, class_validator_1.IsEnum)(LoaiHopDongDto, { message: 'Loại hợp đồng không hợp lệ' }),
    __metadata("design:type", String)
], TaoHopDongDto.prototype, "loaiHopDong", void 0);
__decorate([
    (0, class_validator_1.IsDateString)({}, { message: 'Ngày bắt đầu không hợp lệ' }),
    __metadata("design:type", String)
], TaoHopDongDto.prototype, "tuNgay", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)({}, { message: 'Ngày kết thúc không hợp lệ' }),
    __metadata("design:type", String)
], TaoHopDongDto.prototype, "denNgay", void 0);
__decorate([
    (0, class_validator_1.IsNumber)({}, { message: 'Lương cơ bản phải là số' }),
    (0, class_validator_1.Min)(0, { message: 'Lương cơ bản không được âm' }),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], TaoHopDongDto.prototype, "luongCoBan", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)({}, { message: 'Lương đóng BH phải là số' }),
    (0, class_validator_1.Min)(0, { message: 'Lương đóng BH không được âm' }),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], TaoHopDongDto.prototype, "luongDongBH", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)({}, { message: 'Hệ số lương phải là số' }),
    (0, class_validator_1.Min)(0, { message: 'Hệ số lương không được âm' }),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], TaoHopDongDto.prototype, "heSoLuong", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TaoHopDongDto.prototype, "ghiChu", void 0);
class CapNhatHopDongDto {
}
exports.CapNhatHopDongDto = CapNhatHopDongDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(LoaiHopDongDto, { message: 'Loại hợp đồng không hợp lệ' }),
    __metadata("design:type", String)
], CapNhatHopDongDto.prototype, "loaiHopDong", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)({}, { message: 'Ngày bắt đầu không hợp lệ' }),
    __metadata("design:type", String)
], CapNhatHopDongDto.prototype, "tuNgay", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)({}, { message: 'Ngày kết thúc không hợp lệ' }),
    __metadata("design:type", String)
], CapNhatHopDongDto.prototype, "denNgay", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)({}, { message: 'Lương cơ bản phải là số' }),
    (0, class_validator_1.Min)(0, { message: 'Lương cơ bản không được âm' }),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], CapNhatHopDongDto.prototype, "luongCoBan", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)({}, { message: 'Lương đóng BH phải là số' }),
    (0, class_validator_1.Min)(0, { message: 'Lương đóng BH không được âm' }),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], CapNhatHopDongDto.prototype, "luongDongBH", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)({}, { message: 'Hệ số lương phải là số' }),
    (0, class_validator_1.Min)(0, { message: 'Hệ số lương không được âm' }),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], CapNhatHopDongDto.prototype, "heSoLuong", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(TrangThaiHopDongDto, { message: 'Trạng thái không hợp lệ' }),
    __metadata("design:type", String)
], CapNhatHopDongDto.prototype, "trangThai", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CapNhatHopDongDto.prototype, "ghiChu", void 0);
class NgungHopDongDto {
}
exports.NgungHopDongDto = NgungHopDongDto;
__decorate([
    (0, class_validator_1.IsDateString)({}, { message: 'Ngày kết thúc không hợp lệ' }),
    __metadata("design:type", String)
], NgungHopDongDto.prototype, "ngayKetThuc", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], NgungHopDongDto.prototype, "lyDo", void 0);
//# sourceMappingURL=hop-dong.dto.js.map