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
exports.TaoPhanQuyenPhongBanDto = exports.QUYEN_PHONG_BAN = exports.ChuyenPhongBanDto = exports.CapNhatDonViConDto = exports.TaoDonViConDto = exports.LOAI_DON_VI_CON = exports.DoiPhongBanChaDto = exports.CapNhatPhongBanDto = exports.TaoPhongBanDto = exports.LOAI_PHONG_BAN = exports.TRANG_THAI_PHONG_BAN = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
exports.TRANG_THAI_PHONG_BAN = ['HOAT_DONG', 'NGUNG_HOAT_DONG'];
exports.LOAI_PHONG_BAN = ['VAN_HANH', 'KINH_DOANH', 'VAN_PHONG', 'SAN_XUAT'];
class TaoPhongBanDto {
}
exports.TaoPhongBanDto = TaoPhongBanDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Mã phòng ban', example: 'KT' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TaoPhongBanDto.prototype, "maPhongBan", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Tên phòng ban', example: 'Kế toán' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TaoPhongBanDto.prototype, "tenPhongBan", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Mô tả phòng ban' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TaoPhongBanDto.prototype, "moTa", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'ID phòng ban cha (để tạo cấu trúc cây)' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], TaoPhongBanDto.prototype, "phongBanChaId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Loại phòng ban', enum: exports.LOAI_PHONG_BAN }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(exports.LOAI_PHONG_BAN),
    __metadata("design:type", String)
], TaoPhongBanDto.prototype, "loaiPhongBan", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'ID nhân viên quản lý phòng ban' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], TaoPhongBanDto.prototype, "nguoiQuanLyId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Giờ vào chuẩn (HH:mm)', example: '08:00' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, { message: 'Giờ vào phải có định dạng HH:mm' }),
    __metadata("design:type", String)
], TaoPhongBanDto.prototype, "gioVaoChuan", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Giờ ra chuẩn (HH:mm)', example: '17:00' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, { message: 'Giờ ra phải có định dạng HH:mm' }),
    __metadata("design:type", String)
], TaoPhongBanDto.prototype, "gioRaChuan", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Số phút cho phép đi trễ', example: 5 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(60),
    __metadata("design:type", Number)
], TaoPhongBanDto.prototype, "phutChoPhepTre", void 0);
class CapNhatPhongBanDto extends (0, swagger_1.PartialType)(TaoPhongBanDto) {
}
exports.CapNhatPhongBanDto = CapNhatPhongBanDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Trạng thái hoạt động', enum: exports.TRANG_THAI_PHONG_BAN }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(exports.TRANG_THAI_PHONG_BAN),
    __metadata("design:type", String)
], CapNhatPhongBanDto.prototype, "trangThai", void 0);
class DoiPhongBanChaDto {
}
exports.DoiPhongBanChaDto = DoiPhongBanChaDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID phòng ban cha mới (null để đưa lên gốc)' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Object)
], DoiPhongBanChaDto.prototype, "phongBanChaId", void 0);
exports.LOAI_DON_VI_CON = ['TO', 'NHOM', 'CA'];
class TaoDonViConDto {
}
exports.TaoDonViConDto = TaoDonViConDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Mã đơn vị', example: 'TO_A' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TaoDonViConDto.prototype, "maDonVi", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Tên đơn vị', example: 'Tổ A' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TaoDonViConDto.prototype, "tenDonVi", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Loại đơn vị', enum: exports.LOAI_DON_VI_CON }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(exports.LOAI_DON_VI_CON),
    __metadata("design:type", String)
], TaoDonViConDto.prototype, "loaiDonVi", void 0);
class CapNhatDonViConDto extends (0, swagger_1.PartialType)(TaoDonViConDto) {
}
exports.CapNhatDonViConDto = CapNhatDonViConDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Trạng thái', enum: exports.TRANG_THAI_PHONG_BAN }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(exports.TRANG_THAI_PHONG_BAN),
    __metadata("design:type", String)
], CapNhatDonViConDto.prototype, "trangThai", void 0);
class ChuyenPhongBanDto {
}
exports.ChuyenPhongBanDto = ChuyenPhongBanDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID phòng ban mới' }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], ChuyenPhongBanDto.prototype, "phongBanId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'ID đơn vị con (tổ/ca)' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], ChuyenPhongBanDto.prototype, "donViConId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Ngày bắt đầu hiệu lực', example: '2026-01-01' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ChuyenPhongBanDto.prototype, "tuNgay", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Ghi chú' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ChuyenPhongBanDto.prototype, "ghiChu", void 0);
exports.QUYEN_PHONG_BAN = ['IMPORT', 'XEM', 'PAYROLL', 'QUAN_TRI'];
class TaoPhanQuyenPhongBanDto {
}
exports.TaoPhanQuyenPhongBanDto = TaoPhanQuyenPhongBanDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID người dùng' }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], TaoPhanQuyenPhongBanDto.prototype, "nguoiDungId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID phòng ban' }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], TaoPhanQuyenPhongBanDto.prototype, "phongBanId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Quyền', enum: exports.QUYEN_PHONG_BAN }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(exports.QUYEN_PHONG_BAN),
    __metadata("design:type", String)
], TaoPhanQuyenPhongBanDto.prototype, "quyen", void 0);
//# sourceMappingURL=phong-ban.dto.js.map