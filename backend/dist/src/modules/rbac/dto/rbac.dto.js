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
exports.ThongTinPhienDangNhapDto = exports.KiemTraQuyenResponseDto = exports.TimKiemAuditLogDto = exports.TaoAuditLogDto = exports.GanQuyenChoVaiTroDto = exports.TaoQuyenDto = exports.GoVaiTroDto = exports.GanVaiTroDto = exports.CapNhatVaiTroDto = exports.TaoVaiTroDto = exports.DangNhapDto = exports.DoiMatKhauDto = exports.CapNhatNguoiDungDto = exports.TaoNguoiDungDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class TaoNguoiDungDto {
}
exports.TaoNguoiDungDto = TaoNguoiDungDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'admin' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(3),
    __metadata("design:type", String)
], TaoNguoiDungDto.prototype, "tenDangNhap", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'password123' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(6),
    __metadata("design:type", String)
], TaoNguoiDungDto.prototype, "matKhau", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'admin@company.com' }),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], TaoNguoiDungDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Nguyễn Văn Admin' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TaoNguoiDungDto.prototype, "hoTen", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 1 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], TaoNguoiDungDto.prototype, "nhanVienId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: [1, 2] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsNumber)({}, { each: true }),
    __metadata("design:type", Array)
], TaoNguoiDungDto.prototype, "vaiTroIds", void 0);
class CapNhatNguoiDungDto {
}
exports.CapNhatNguoiDungDto = CapNhatNguoiDungDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], CapNhatNguoiDungDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CapNhatNguoiDungDto.prototype, "hoTen", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: ['HOAT_DONG', 'TAM_KHOA', 'VO_HIEU_HOA'] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(['HOAT_DONG', 'TAM_KHOA', 'VO_HIEU_HOA']),
    __metadata("design:type", String)
], CapNhatNguoiDungDto.prototype, "trangThai", void 0);
class DoiMatKhauDto {
}
exports.DoiMatKhauDto = DoiMatKhauDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DoiMatKhauDto.prototype, "matKhauCu", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(6),
    __metadata("design:type", String)
], DoiMatKhauDto.prototype, "matKhauMoi", void 0);
class DangNhapDto {
}
exports.DangNhapDto = DangNhapDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'admin' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DangNhapDto.prototype, "tenDangNhap", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'password123' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DangNhapDto.prototype, "matKhau", void 0);
class TaoVaiTroDto {
}
exports.TaoVaiTroDto = TaoVaiTroDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'HR' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TaoVaiTroDto.prototype, "maVaiTro", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Nhân sự' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TaoVaiTroDto.prototype, "tenVaiTro", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TaoVaiTroDto.prototype, "moTa", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 50 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], TaoVaiTroDto.prototype, "capDo", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: [1, 2, 3] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsNumber)({}, { each: true }),
    __metadata("design:type", Array)
], TaoVaiTroDto.prototype, "quyenIds", void 0);
class CapNhatVaiTroDto {
}
exports.CapNhatVaiTroDto = CapNhatVaiTroDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CapNhatVaiTroDto.prototype, "tenVaiTro", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CapNhatVaiTroDto.prototype, "moTa", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CapNhatVaiTroDto.prototype, "capDo", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CapNhatVaiTroDto.prototype, "trangThai", void 0);
class GanVaiTroDto {
}
exports.GanVaiTroDto = GanVaiTroDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], GanVaiTroDto.prototype, "nguoiDungId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], GanVaiTroDto.prototype, "vaiTroId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 1, description: 'Phòng ban (null = toàn công ty)' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], GanVaiTroDto.prototype, "phongBanId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], GanVaiTroDto.prototype, "denNgay", void 0);
class GoVaiTroDto {
}
exports.GoVaiTroDto = GoVaiTroDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], GoVaiTroDto.prototype, "nguoiDungId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], GoVaiTroDto.prototype, "vaiTroId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], GoVaiTroDto.prototype, "phongBanId", void 0);
class TaoQuyenDto {
}
exports.TaoQuyenDto = TaoQuyenDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'LUONG_XEM' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TaoQuyenDto.prototype, "maQuyen", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Xem bảng lương' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TaoQuyenDto.prototype, "tenQuyen", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'LUONG' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TaoQuyenDto.prototype, "nhomQuyen", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TaoQuyenDto.prototype, "moTa", void 0);
class GanQuyenChoVaiTroDto {
}
exports.GanQuyenChoVaiTroDto = GanQuyenChoVaiTroDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], GanQuyenChoVaiTroDto.prototype, "vaiTroId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: [1, 2, 3] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsNumber)({}, { each: true }),
    __metadata("design:type", Array)
], GanQuyenChoVaiTroDto.prototype, "quyenIds", void 0);
class TaoAuditLogDto {
}
exports.TaoAuditLogDto = TaoAuditLogDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], TaoAuditLogDto.prototype, "nguoiDungId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'admin' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TaoAuditLogDto.prototype, "tenDangNhap", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: ['TAO_MOI', 'CAP_NHAT', 'XOA', 'DANG_NHAP', 'DANG_XUAT', 'CHOT_LUONG', 'MO_KHOA', 'DUYET', 'TU_CHOI', 'IMPORT', 'EXPORT'] }),
    (0, class_validator_1.IsEnum)(['TAO_MOI', 'CAP_NHAT', 'XOA', 'DANG_NHAP', 'DANG_XUAT', 'CHOT_LUONG', 'MO_KHOA', 'DUYET', 'TU_CHOI', 'IMPORT', 'EXPORT']),
    __metadata("design:type", String)
], TaoAuditLogDto.prototype, "hanhDong", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'bang_luong' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TaoAuditLogDto.prototype, "bangDuLieu", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '123' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TaoAuditLogDto.prototype, "banGhiId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TaoAuditLogDto.prototype, "duLieuCu", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TaoAuditLogDto.prototype, "duLieuMoi", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TaoAuditLogDto.prototype, "diaChiIP", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TaoAuditLogDto.prototype, "userAgent", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TaoAuditLogDto.prototype, "moTa", void 0);
class TimKiemAuditLogDto {
}
exports.TimKiemAuditLogDto = TimKiemAuditLogDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], TimKiemAuditLogDto.prototype, "nguoiDungId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TimKiemAuditLogDto.prototype, "tenDangNhap", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TimKiemAuditLogDto.prototype, "hanhDong", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TimKiemAuditLogDto.prototype, "bangDuLieu", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], TimKiemAuditLogDto.prototype, "tuNgay", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], TimKiemAuditLogDto.prototype, "denNgay", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 50 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], TimKiemAuditLogDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 0 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], TimKiemAuditLogDto.prototype, "offset", void 0);
class KiemTraQuyenResponseDto {
}
exports.KiemTraQuyenResponseDto = KiemTraQuyenResponseDto;
class ThongTinPhienDangNhapDto {
}
exports.ThongTinPhienDangNhapDto = ThongTinPhienDangNhapDto;
//# sourceMappingURL=rbac.dto.js.map