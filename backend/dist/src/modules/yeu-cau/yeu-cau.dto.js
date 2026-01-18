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
exports.CapNhatWorkflowConfigDto = exports.TaoWorkflowConfigDto = exports.LocDonYeuCauDto = exports.OverrideDonYeuCauDto = exports.TuChoiDonYeuCauDto = exports.DuyetDonYeuCauDto = exports.CapNhatDonYeuCauDto = exports.TaoDonYeuCauDto = exports.CapNhatLoaiYeuCauDto = exports.TaoLoaiYeuCauDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class TaoLoaiYeuCauDto {
}
exports.TaoLoaiYeuCauDto = TaoLoaiYeuCauDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TaoLoaiYeuCauDto.prototype, "maLoai", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TaoLoaiYeuCauDto.prototype, "tenLoai", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TaoLoaiYeuCauDto.prototype, "moTa", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TaoLoaiYeuCauDto.prototype, "nhomLoai", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], TaoLoaiYeuCauDto.prototype, "yeuCauGioBatDau", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], TaoLoaiYeuCauDto.prototype, "yeuCauGioKetThuc", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], TaoLoaiYeuCauDto.prototype, "yeuCauDiaDiem", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], TaoLoaiYeuCauDto.prototype, "coTinhOT", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], TaoLoaiYeuCauDto.prototype, "thuTuHienThi", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TaoLoaiYeuCauDto.prototype, "mauHienThi", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TaoLoaiYeuCauDto.prototype, "icon", void 0);
class CapNhatLoaiYeuCauDto {
}
exports.CapNhatLoaiYeuCauDto = CapNhatLoaiYeuCauDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CapNhatLoaiYeuCauDto.prototype, "tenLoai", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CapNhatLoaiYeuCauDto.prototype, "moTa", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CapNhatLoaiYeuCauDto.prototype, "yeuCauGioBatDau", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CapNhatLoaiYeuCauDto.prototype, "yeuCauGioKetThuc", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CapNhatLoaiYeuCauDto.prototype, "yeuCauDiaDiem", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CapNhatLoaiYeuCauDto.prototype, "coTinhOT", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CapNhatLoaiYeuCauDto.prototype, "thuTuHienThi", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CapNhatLoaiYeuCauDto.prototype, "mauHienThi", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CapNhatLoaiYeuCauDto.prototype, "icon", void 0);
class TaoDonYeuCauDto {
}
exports.TaoDonYeuCauDto = TaoDonYeuCauDto;
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], TaoDonYeuCauDto.prototype, "nhanVienId", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], TaoDonYeuCauDto.prototype, "loaiYeuCauId", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], TaoDonYeuCauDto.prototype, "ngayYeuCau", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
        message: 'gioBatDau phải có format HH:mm',
    }),
    __metadata("design:type", String)
], TaoDonYeuCauDto.prototype, "gioBatDau", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
        message: 'gioKetThuc phải có format HH:mm',
    }),
    __metadata("design:type", String)
], TaoDonYeuCauDto.prototype, "gioKetThuc", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TaoDonYeuCauDto.prototype, "diaDiem", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TaoDonYeuCauDto.prototype, "lyDo", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TaoDonYeuCauDto.prototype, "tepDinhKemUrl", void 0);
class CapNhatDonYeuCauDto {
}
exports.CapNhatDonYeuCauDto = CapNhatDonYeuCauDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CapNhatDonYeuCauDto.prototype, "ngayYeuCau", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
        message: 'gioBatDau phải có format HH:mm',
    }),
    __metadata("design:type", String)
], CapNhatDonYeuCauDto.prototype, "gioBatDau", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
        message: 'gioKetThuc phải có format HH:mm',
    }),
    __metadata("design:type", String)
], CapNhatDonYeuCauDto.prototype, "gioKetThuc", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CapNhatDonYeuCauDto.prototype, "diaDiem", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CapNhatDonYeuCauDto.prototype, "lyDo", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CapNhatDonYeuCauDto.prototype, "tepDinhKemUrl", void 0);
class DuyetDonYeuCauDto {
}
exports.DuyetDonYeuCauDto = DuyetDonYeuCauDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DuyetDonYeuCauDto.prototype, "ghiChu", void 0);
class TuChoiDonYeuCauDto {
}
exports.TuChoiDonYeuCauDto = TuChoiDonYeuCauDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TuChoiDonYeuCauDto.prototype, "lyDoTuChoi", void 0);
class OverrideDonYeuCauDto {
}
exports.OverrideDonYeuCauDto = OverrideDonYeuCauDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], OverrideDonYeuCauDto.prototype, "lyDoOverride", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], OverrideDonYeuCauDto.prototype, "duyet", void 0);
class LocDonYeuCauDto {
    constructor() {
        this.page = 1;
        this.limit = 20;
    }
}
exports.LocDonYeuCauDto = LocDonYeuCauDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], LocDonYeuCauDto.prototype, "nhanVienId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], LocDonYeuCauDto.prototype, "phongBanId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], LocDonYeuCauDto.prototype, "loaiYeuCauId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], LocDonYeuCauDto.prototype, "trangThai", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], LocDonYeuCauDto.prototype, "tuNgay", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], LocDonYeuCauDto.prototype, "denNgay", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], LocDonYeuCauDto.prototype, "nguoiDuyet1Id", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], LocDonYeuCauDto.prototype, "nguoiDuyet2Id", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], LocDonYeuCauDto.prototype, "page", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(100),
    __metadata("design:type", Number)
], LocDonYeuCauDto.prototype, "limit", void 0);
class TaoWorkflowConfigDto {
}
exports.TaoWorkflowConfigDto = TaoWorkflowConfigDto;
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], TaoWorkflowConfigDto.prototype, "loaiYeuCauId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], TaoWorkflowConfigDto.prototype, "phongBanId", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(2),
    __metadata("design:type", Number)
], TaoWorkflowConfigDto.prototype, "soCap", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TaoWorkflowConfigDto.prototype, "nguoiDuyet1", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], TaoWorkflowConfigDto.prototype, "nguoiDuyetCuThe1Id", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TaoWorkflowConfigDto.prototype, "nguoiDuyet2", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], TaoWorkflowConfigDto.prototype, "nguoiDuyetCuThe2Id", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], TaoWorkflowConfigDto.prototype, "tuDongDuyetNeuQuaHan", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], TaoWorkflowConfigDto.prototype, "soNgayQuaHan", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], TaoWorkflowConfigDto.prototype, "yeuCauLyDoTuChoi", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], TaoWorkflowConfigDto.prototype, "yeuCauLyDoOverride", void 0);
class CapNhatWorkflowConfigDto {
}
exports.CapNhatWorkflowConfigDto = CapNhatWorkflowConfigDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(2),
    __metadata("design:type", Number)
], CapNhatWorkflowConfigDto.prototype, "soCap", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CapNhatWorkflowConfigDto.prototype, "nguoiDuyet1", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CapNhatWorkflowConfigDto.prototype, "nguoiDuyetCuThe1Id", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CapNhatWorkflowConfigDto.prototype, "nguoiDuyet2", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CapNhatWorkflowConfigDto.prototype, "nguoiDuyetCuThe2Id", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CapNhatWorkflowConfigDto.prototype, "tuDongDuyetNeuQuaHan", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CapNhatWorkflowConfigDto.prototype, "soNgayQuaHan", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CapNhatWorkflowConfigDto.prototype, "yeuCauLyDoTuChoi", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CapNhatWorkflowConfigDto.prototype, "yeuCauLyDoOverride", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CapNhatWorkflowConfigDto.prototype, "isActive", void 0);
//# sourceMappingURL=yeu-cau.dto.js.map