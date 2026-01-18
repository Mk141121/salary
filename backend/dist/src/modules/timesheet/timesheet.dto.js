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
exports.LichSuSuaCongQueryDto = exports.YeuCauSuaCongQueryDto = exports.SuaCongTrucTiepDto = exports.DuyetYeuCauSuaCongDto = exports.TaoYeuCauSuaCongDto = exports.TimesheetQueryDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
class TimesheetQueryDto {
}
exports.TimesheetQueryDto = TimesheetQueryDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Tháng (1-12)' }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], TimesheetQueryDto.prototype, "thang", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Năm' }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], TimesheetQueryDto.prototype, "nam", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'ID phòng ban' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], TimesheetQueryDto.prototype, "phongBanId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'ID nhân viên cụ thể' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], TimesheetQueryDto.prototype, "nhanVienId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Tìm kiếm theo tên/mã NV' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TimesheetQueryDto.prototype, "search", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ default: 1 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], TimesheetQueryDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ default: 20 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], TimesheetQueryDto.prototype, "limit", void 0);
class TaoYeuCauSuaCongDto {
}
exports.TaoYeuCauSuaCongDto = TaoYeuCauSuaCongDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID nhân viên' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], TaoYeuCauSuaCongDto.prototype, "nhanVienId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Ngày cần sửa (YYYY-MM-DD)' }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], TaoYeuCauSuaCongDto.prototype, "ngayChamCong", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Giờ vào mới (ISO string)' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], TaoYeuCauSuaCongDto.prototype, "gioVaoMoi", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Giờ ra mới (ISO string)' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], TaoYeuCauSuaCongDto.prototype, "gioRaMoi", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Trạng thái mới' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TaoYeuCauSuaCongDto.prototype, "trangThaiMoi", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Lý do sửa công' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(10),
    (0, class_validator_1.MaxLength)(500),
    __metadata("design:type", String)
], TaoYeuCauSuaCongDto.prototype, "lyDo", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Link bằng chứng/minh chứng' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TaoYeuCauSuaCongDto.prototype, "bangChung", void 0);
class DuyetYeuCauSuaCongDto {
}
exports.DuyetYeuCauSuaCongDto = DuyetYeuCauSuaCongDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Phê duyệt hay từ chối', enum: ['DA_DUYET', 'TU_CHOI'] }),
    (0, class_validator_1.IsEnum)(['DA_DUYET', 'TU_CHOI']),
    __metadata("design:type", String)
], DuyetYeuCauSuaCongDto.prototype, "trangThaiDuyet", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Lý do từ chối (bắt buộc nếu từ chối)' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DuyetYeuCauSuaCongDto.prototype, "lyDoTuChoi", void 0);
class SuaCongTrucTiepDto {
}
exports.SuaCongTrucTiepDto = SuaCongTrucTiepDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID nhân viên' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], SuaCongTrucTiepDto.prototype, "nhanVienId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Ngày cần sửa (YYYY-MM-DD)' }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], SuaCongTrucTiepDto.prototype, "ngayChamCong", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Giờ vào' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], SuaCongTrucTiepDto.prototype, "gioVao", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Giờ ra' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], SuaCongTrucTiepDto.prototype, "gioRa", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Trạng thái' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SuaCongTrucTiepDto.prototype, "trangThai", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Loại ngày' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SuaCongTrucTiepDto.prototype, "loaiNgay", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Ghi chú/Lý do sửa' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(5),
    __metadata("design:type", String)
], SuaCongTrucTiepDto.prototype, "ghiChu", void 0);
class YeuCauSuaCongQueryDto {
}
exports.YeuCauSuaCongQueryDto = YeuCauSuaCongQueryDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], YeuCauSuaCongQueryDto.prototype, "nhanVienId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], YeuCauSuaCongQueryDto.prototype, "phongBanId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'CHO_DUYET | DA_DUYET | TU_CHOI' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], YeuCauSuaCongQueryDto.prototype, "trangThaiDuyet", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], YeuCauSuaCongQueryDto.prototype, "tuNgay", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], YeuCauSuaCongQueryDto.prototype, "denNgay", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ default: 1 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], YeuCauSuaCongQueryDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ default: 20 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], YeuCauSuaCongQueryDto.prototype, "limit", void 0);
class LichSuSuaCongQueryDto {
}
exports.LichSuSuaCongQueryDto = LichSuSuaCongQueryDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], LichSuSuaCongQueryDto.prototype, "nhanVienId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], LichSuSuaCongQueryDto.prototype, "tuNgay", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], LichSuSuaCongQueryDto.prototype, "denNgay", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ default: 1 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], LichSuSuaCongQueryDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ default: 20 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], LichSuSuaCongQueryDto.prototype, "limit", void 0);
//# sourceMappingURL=timesheet.dto.js.map