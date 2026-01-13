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
exports.CapNhatCauHinhPhatDto = exports.ImportChamCongDto = exports.DuLieuChamCongDto = exports.KhoiTaoChamCongDto = exports.LuuChiTietChamCongDto = exports.LuuChamCongDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const client_1 = require("@prisma/client");
class LuuChamCongDto {
}
exports.LuuChamCongDto = LuuChamCongDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID nhân viên' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], LuuChamCongDto.prototype, "nhanVienId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Tháng (1-12)' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(12),
    __metadata("design:type", Number)
], LuuChamCongDto.prototype, "thang", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Năm' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], LuuChamCongDto.prototype, "nam", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Số công chuẩn', default: 26 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], LuuChamCongDto.prototype, "soCongChuan", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Số công thực tế' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], LuuChamCongDto.prototype, "soCongThucTe", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Số ngày nghỉ phép' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], LuuChamCongDto.prototype, "soNgayNghiPhep", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Số ngày nghỉ không lương' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], LuuChamCongDto.prototype, "soNgayNghiKhongLuong", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Số giờ OT' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], LuuChamCongDto.prototype, "soGioOT", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Số giờ OT đêm' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], LuuChamCongDto.prototype, "soGioOTDem", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Số giờ OT chủ nhật' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], LuuChamCongDto.prototype, "soGioOTChuNhat", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Số giờ OT ngày lễ' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], LuuChamCongDto.prototype, "soGioOTLe", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Số lần đi muộn' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], LuuChamCongDto.prototype, "soLanDiMuon", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Số lần về sớm' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], LuuChamCongDto.prototype, "soLanVeSom", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Ghi chú' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], LuuChamCongDto.prototype, "ghiChu", void 0);
class LuuChiTietChamCongDto {
}
exports.LuuChiTietChamCongDto = LuuChiTietChamCongDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID nhân viên' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], LuuChiTietChamCongDto.prototype, "nhanVienId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Ngày' }),
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], LuuChiTietChamCongDto.prototype, "ngay", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Giờ vào' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], LuuChiTietChamCongDto.prototype, "gioVao", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Giờ ra' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], LuuChiTietChamCongDto.prototype, "gioRa", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Loại ngày', enum: client_1.LoaiNgayCong }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(client_1.LoaiNgayCong),
    __metadata("design:type", String)
], LuuChiTietChamCongDto.prototype, "loaiNgay", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Trạng thái', enum: client_1.TrangThaiChamCong }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(client_1.TrangThaiChamCong),
    __metadata("design:type", String)
], LuuChiTietChamCongDto.prototype, "trangThai", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Số giờ làm' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], LuuChiTietChamCongDto.prototype, "soGioLam", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Số giờ OT' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], LuuChiTietChamCongDto.prototype, "soGioOT", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Ghi chú' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], LuuChiTietChamCongDto.prototype, "ghiChu", void 0);
class KhoiTaoChamCongDto {
}
exports.KhoiTaoChamCongDto = KhoiTaoChamCongDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Tháng (1-12)' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(12),
    __metadata("design:type", Number)
], KhoiTaoChamCongDto.prototype, "thang", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Năm' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], KhoiTaoChamCongDto.prototype, "nam", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Số công chuẩn', default: 26 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], KhoiTaoChamCongDto.prototype, "soCongChuan", void 0);
class DuLieuChamCongDto {
}
exports.DuLieuChamCongDto = DuLieuChamCongDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Mã nhân viên' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DuLieuChamCongDto.prototype, "maNhanVien", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Số công thực tế' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], DuLieuChamCongDto.prototype, "soCongThucTe", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Số ngày nghỉ phép' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], DuLieuChamCongDto.prototype, "soNgayNghiPhep", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Số ngày nghỉ không lương' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], DuLieuChamCongDto.prototype, "soNgayNghiKhongLuong", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Số giờ OT' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], DuLieuChamCongDto.prototype, "soGioOT", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Số giờ OT đêm' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], DuLieuChamCongDto.prototype, "soGioOTDem", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Số giờ OT chủ nhật' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], DuLieuChamCongDto.prototype, "soGioOTChuNhat", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Số giờ OT ngày lễ' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], DuLieuChamCongDto.prototype, "soGioOTLe", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Số lần đi muộn' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], DuLieuChamCongDto.prototype, "soLanDiMuon", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Số lần về sớm' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], DuLieuChamCongDto.prototype, "soLanVeSom", void 0);
class ImportChamCongDto {
}
exports.ImportChamCongDto = ImportChamCongDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Tháng (1-12)' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(12),
    __metadata("design:type", Number)
], ImportChamCongDto.prototype, "thang", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Năm' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ImportChamCongDto.prototype, "nam", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Dữ liệu chấm công', type: [DuLieuChamCongDto] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => DuLieuChamCongDto),
    __metadata("design:type", Array)
], ImportChamCongDto.prototype, "duLieu", void 0);
class CapNhatCauHinhPhatDto {
}
exports.CapNhatCauHinhPhatDto = CapNhatCauHinhPhatDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Phạt đi muộn 1-3 lần/tháng' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CapNhatCauHinhPhatDto.prototype, "phatDiMuon1_3Lan", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Phạt đi muộn 4-6 lần/tháng' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CapNhatCauHinhPhatDto.prototype, "phatDiMuon4_6Lan", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Phạt đi muộn >6 lần/tháng' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CapNhatCauHinhPhatDto.prototype, "phatDiMuonTren6Lan", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Phạt về sớm 1-3 lần/tháng' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CapNhatCauHinhPhatDto.prototype, "phatVeSom1_3Lan", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Phạt về sớm 4-6 lần/tháng' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CapNhatCauHinhPhatDto.prototype, "phatVeSom4_6Lan", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Phạt về sớm >6 lần/tháng' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CapNhatCauHinhPhatDto.prototype, "phatVeSomTren6Lan", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Phạt nghỉ không phép (VNĐ/ngày)' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CapNhatCauHinhPhatDto.prototype, "phatNghiKhongPhep", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Có trừ lương theo ngày công không?' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CapNhatCauHinhPhatDto.prototype, "truLuongNghiKhongPhep", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Giờ vào chuẩn (HH:mm)', example: '08:00' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CapNhatCauHinhPhatDto.prototype, "gioVaoChuan", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Giờ ra chuẩn (HH:mm)', example: '17:00' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CapNhatCauHinhPhatDto.prototype, "gioRaChuan", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Số phút được phép trễ' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CapNhatCauHinhPhatDto.prototype, "phutChoPhepTre", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Mô tả' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CapNhatCauHinhPhatDto.prototype, "moTa", void 0);
//# sourceMappingURL=cham-cong.dto.js.map