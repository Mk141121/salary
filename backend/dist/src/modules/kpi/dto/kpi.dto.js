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
exports.KetQuaTinhThuongDto = exports.TinhThuongKPIDto = exports.TaoCauHinhThuongDto = exports.TuChoiDanhGiaKPIDto = exports.DuyetDanhGiaKPIDto = exports.CapNhatKetQuaKPIDto = exports.TaoDanhGiaKPIDto = exports.NhapKetQuaKPIDto = exports.CapNhatTrangThaiKyDto = exports.TaoKyDanhGiaDto = exports.CapNhatTemplateKPIDto = exports.TaoTemplateKPIDto = exports.TaoChiTieuKPIDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class TaoChiTieuKPIDto {
}
exports.TaoChiTieuKPIDto = TaoChiTieuKPIDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'DOANH_SO' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TaoChiTieuKPIDto.prototype, "maChiTieu", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Doanh số bán hàng' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TaoChiTieuKPIDto.prototype, "tenChiTieu", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TaoChiTieuKPIDto.prototype, "moTa", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'VNĐ' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TaoChiTieuKPIDto.prototype, "donViTinh", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 30, description: 'Trọng số %' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(100),
    __metadata("design:type", Number)
], TaoChiTieuKPIDto.prototype, "trongSo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: ['SO', 'PHAN_TRAM', 'TIEN', 'THOI_GIAN', 'DANH_GIA'] }),
    (0, class_validator_1.IsEnum)(['SO', 'PHAN_TRAM', 'TIEN', 'THOI_GIAN', 'DANH_GIA']),
    __metadata("design:type", String)
], TaoChiTieuKPIDto.prototype, "loaiChiTieu", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 50000000 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], TaoChiTieuKPIDto.prototype, "chiTieuToiThieu", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 100000000 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], TaoChiTieuKPIDto.prototype, "chiTieuMucTieu", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 150000000 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], TaoChiTieuKPIDto.prototype, "chiTieuVuotMuc", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 1 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], TaoChiTieuKPIDto.prototype, "thuTu", void 0);
class TaoTemplateKPIDto {
}
exports.TaoTemplateKPIDto = TaoTemplateKPIDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'TPL-SALES' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TaoTemplateKPIDto.prototype, "maTemplate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Template KPI Phòng Kinh doanh' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TaoTemplateKPIDto.prototype, "tenTemplate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], TaoTemplateKPIDto.prototype, "phongBanId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TaoTemplateKPIDto.prototype, "moTa", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: [TaoChiTieuKPIDto] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => TaoChiTieuKPIDto),
    __metadata("design:type", Array)
], TaoTemplateKPIDto.prototype, "chiTieuKPIs", void 0);
class CapNhatTemplateKPIDto {
}
exports.CapNhatTemplateKPIDto = CapNhatTemplateKPIDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CapNhatTemplateKPIDto.prototype, "tenTemplate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CapNhatTemplateKPIDto.prototype, "phongBanId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CapNhatTemplateKPIDto.prototype, "moTa", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CapNhatTemplateKPIDto.prototype, "trangThai", void 0);
class TaoKyDanhGiaDto {
}
exports.TaoKyDanhGiaDto = TaoKyDanhGiaDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'KPI-2025-01' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TaoKyDanhGiaDto.prototype, "maKy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Đánh giá KPI tháng 01/2025' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TaoKyDanhGiaDto.prototype, "tenKy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: ['THANG', 'QUY', 'NAM'] }),
    (0, class_validator_1.IsEnum)(['THANG', 'QUY', 'NAM']),
    __metadata("design:type", String)
], TaoKyDanhGiaDto.prototype, "loaiKy", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 1 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], TaoKyDanhGiaDto.prototype, "thang", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 1 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], TaoKyDanhGiaDto.prototype, "quy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2025 }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], TaoKyDanhGiaDto.prototype, "nam", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2025-01-01' }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], TaoKyDanhGiaDto.prototype, "tuNgay", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2025-01-31' }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], TaoKyDanhGiaDto.prototype, "denNgay", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2025-02-05' }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], TaoKyDanhGiaDto.prototype, "hanNopKetQua", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TaoKyDanhGiaDto.prototype, "ghiChu", void 0);
class CapNhatTrangThaiKyDto {
}
exports.CapNhatTrangThaiKyDto = CapNhatTrangThaiKyDto;
__decorate([
    (0, swagger_1.ApiProperty)({ enum: ['MO', 'DONG', 'DUYET', 'HOAN_THANH'] }),
    (0, class_validator_1.IsEnum)(['MO', 'DONG', 'DUYET', 'HOAN_THANH']),
    __metadata("design:type", String)
], CapNhatTrangThaiKyDto.prototype, "trangThai", void 0);
class NhapKetQuaKPIDto {
}
exports.NhapKetQuaKPIDto = NhapKetQuaKPIDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], NhapKetQuaKPIDto.prototype, "chiTieuId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 85000000 }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], NhapKetQuaKPIDto.prototype, "ketQuaDat", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], NhapKetQuaKPIDto.prototype, "ghiChu", void 0);
class TaoDanhGiaKPIDto {
}
exports.TaoDanhGiaKPIDto = TaoDanhGiaKPIDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], TaoDanhGiaKPIDto.prototype, "kyDanhGiaId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], TaoDanhGiaKPIDto.prototype, "nhanVienId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], TaoDanhGiaKPIDto.prototype, "templateId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: [NhapKetQuaKPIDto] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => NhapKetQuaKPIDto),
    __metadata("design:type", Array)
], TaoDanhGiaKPIDto.prototype, "ketQuaKPIs", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TaoDanhGiaKPIDto.prototype, "nhanXetChung", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TaoDanhGiaKPIDto.prototype, "nguoiDanhGia", void 0);
class CapNhatKetQuaKPIDto {
}
exports.CapNhatKetQuaKPIDto = CapNhatKetQuaKPIDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: [NhapKetQuaKPIDto] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => NhapKetQuaKPIDto),
    __metadata("design:type", Array)
], CapNhatKetQuaKPIDto.prototype, "ketQuaKPIs", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CapNhatKetQuaKPIDto.prototype, "nhanXetChung", void 0);
class DuyetDanhGiaKPIDto {
}
exports.DuyetDanhGiaKPIDto = DuyetDanhGiaKPIDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DuyetDanhGiaKPIDto.prototype, "nguoiDuyet", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DuyetDanhGiaKPIDto.prototype, "nhanXet", void 0);
class TuChoiDanhGiaKPIDto {
}
exports.TuChoiDanhGiaKPIDto = TuChoiDanhGiaKPIDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Số liệu chưa chính xác' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TuChoiDanhGiaKPIDto.prototype, "lyDoTuChoi", void 0);
class TaoCauHinhThuongDto {
}
exports.TaoCauHinhThuongDto = TaoCauHinhThuongDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2025 }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], TaoCauHinhThuongDto.prototype, "nam", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: ['XUAT_SAC', 'TOT', 'KHA', 'TRUNG_BINH', 'YEU'] }),
    (0, class_validator_1.IsEnum)(['XUAT_SAC', 'TOT', 'KHA', 'TRUNG_BINH', 'YEU']),
    __metadata("design:type", String)
], TaoCauHinhThuongDto.prototype, "xepLoai", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 95 }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], TaoCauHinhThuongDto.prototype, "diemToiThieu", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 100 }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], TaoCauHinhThuongDto.prototype, "diemToiDa", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2, description: 'Hệ số thưởng (1x, 1.5x, 2x...)' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], TaoCauHinhThuongDto.prototype, "heSoThuong", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TaoCauHinhThuongDto.prototype, "moTa", void 0);
class TinhThuongKPIDto {
}
exports.TinhThuongKPIDto = TinhThuongKPIDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], TinhThuongKPIDto.prototype, "kyDanhGiaId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 5000000, description: 'Mức thưởng cơ bản' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], TinhThuongKPIDto.prototype, "mucThuongCoBan", void 0);
class KetQuaTinhThuongDto {
}
exports.KetQuaTinhThuongDto = KetQuaTinhThuongDto;
//# sourceMappingURL=kpi.dto.js.map