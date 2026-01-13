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
exports.TuChoiPhieuDto = exports.DuyetPhieuDto = exports.TaoPhieuDieuChinhDto = exports.ChiTietDieuChinhDto = exports.TaoSnapshotDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const client_1 = require("@prisma/client");
class TaoSnapshotDto {
}
exports.TaoSnapshotDto = TaoSnapshotDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Người chốt bảng lương' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TaoSnapshotDto.prototype, "nguoiChot", void 0);
class ChiTietDieuChinhDto {
}
exports.ChiTietDieuChinhDto = ChiTietDieuChinhDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID khoản lương' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ChiTietDieuChinhDto.prototype, "khoanLuongId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Số tiền cũ' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ChiTietDieuChinhDto.prototype, "soTienCu", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Số tiền mới' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ChiTietDieuChinhDto.prototype, "soTienMoi", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Ghi chú' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ChiTietDieuChinhDto.prototype, "ghiChu", void 0);
class TaoPhieuDieuChinhDto {
}
exports.TaoPhieuDieuChinhDto = TaoPhieuDieuChinhDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID bảng lương' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], TaoPhieuDieuChinhDto.prototype, "bangLuongId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID nhân viên' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], TaoPhieuDieuChinhDto.prototype, "nhanVienId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Loại điều chỉnh', enum: client_1.LoaiDieuChinh }),
    (0, class_validator_1.IsEnum)(client_1.LoaiDieuChinh),
    __metadata("design:type", String)
], TaoPhieuDieuChinhDto.prototype, "loaiDieuChinh", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Lý do điều chỉnh' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TaoPhieuDieuChinhDto.prototype, "lyDo", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Ghi chú' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TaoPhieuDieuChinhDto.prototype, "ghiChu", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Người tạo phiếu' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TaoPhieuDieuChinhDto.prototype, "nguoiTao", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Chi tiết điều chỉnh', type: [ChiTietDieuChinhDto] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => ChiTietDieuChinhDto),
    __metadata("design:type", Array)
], TaoPhieuDieuChinhDto.prototype, "chiTiets", void 0);
class DuyetPhieuDto {
}
exports.DuyetPhieuDto = DuyetPhieuDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Người duyệt' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DuyetPhieuDto.prototype, "nguoiDuyet", void 0);
class TuChoiPhieuDto {
}
exports.TuChoiPhieuDto = TuChoiPhieuDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Người từ chối' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TuChoiPhieuDto.prototype, "nguoiTuChoi", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Lý do từ chối' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TuChoiPhieuDto.prototype, "lyDoTuChoi", void 0);
//# sourceMappingURL=snapshot-dieu-chinh.dto.js.map