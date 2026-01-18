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
exports.LichSuThietBiQueryDto = exports.DeviceQueryDto = exports.ResetDeviceDto = exports.BindDeviceDto = exports.GPSLogQueryDto = exports.GeofenceQueryDto = exports.GPSCheckinDto = exports.CapNhatGeofenceDto = exports.TaoGeofenceDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
class TaoGeofenceDto {
}
exports.TaoGeofenceDto = TaoGeofenceDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Tên địa điểm' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TaoGeofenceDto.prototype, "tenDiaDiem", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Địa chỉ đầy đủ' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TaoGeofenceDto.prototype, "diaChi", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Vĩ độ (Latitude)' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(-90),
    (0, class_validator_1.Max)(90),
    __metadata("design:type", Number)
], TaoGeofenceDto.prototype, "viDo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Kinh độ (Longitude)' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(-180),
    (0, class_validator_1.Max)(180),
    __metadata("design:type", Number)
], TaoGeofenceDto.prototype, "kinhDo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Bán kính cho phép (mét)', default: 100 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(10),
    (0, class_validator_1.Max)(5000),
    __metadata("design:type", Number)
], TaoGeofenceDto.prototype, "banKinhMet", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'ID phòng ban áp dụng (null = toàn công ty)' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], TaoGeofenceDto.prototype, "phongBanId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Áp dụng cho toàn công ty', default: false }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], TaoGeofenceDto.prototype, "apDungTatCa", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Bắt buộc bật GPS', default: true }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], TaoGeofenceDto.prototype, "batBuocGPS", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Chặn check-in ngoài vùng', default: false }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], TaoGeofenceDto.prototype, "chanNgoaiVung", void 0);
class CapNhatGeofenceDto {
}
exports.CapNhatGeofenceDto = CapNhatGeofenceDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CapNhatGeofenceDto.prototype, "tenDiaDiem", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CapNhatGeofenceDto.prototype, "diaChi", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(-90),
    (0, class_validator_1.Max)(90),
    __metadata("design:type", Number)
], CapNhatGeofenceDto.prototype, "viDo", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(-180),
    (0, class_validator_1.Max)(180),
    __metadata("design:type", Number)
], CapNhatGeofenceDto.prototype, "kinhDo", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(10),
    (0, class_validator_1.Max)(5000),
    __metadata("design:type", Number)
], CapNhatGeofenceDto.prototype, "banKinhMet", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CapNhatGeofenceDto.prototype, "phongBanId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CapNhatGeofenceDto.prototype, "apDungTatCa", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CapNhatGeofenceDto.prototype, "batBuocGPS", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CapNhatGeofenceDto.prototype, "chanNgoaiVung", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CapNhatGeofenceDto.prototype, "trangThai", void 0);
class GPSCheckinDto {
}
exports.GPSCheckinDto = GPSCheckinDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Loại chấm công', enum: ['CHECK_IN', 'CHECK_OUT'] }),
    (0, class_validator_1.IsEnum)(['CHECK_IN', 'CHECK_OUT']),
    __metadata("design:type", String)
], GPSCheckinDto.prototype, "loaiChamCong", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Vĩ độ (Latitude)' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(-90),
    (0, class_validator_1.Max)(90),
    __metadata("design:type", Number)
], GPSCheckinDto.prototype, "viDo", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Kinh độ (Longitude)' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(-180),
    (0, class_validator_1.Max)(180),
    __metadata("design:type", Number)
], GPSCheckinDto.prototype, "kinhDo", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Độ chính xác GPS (mét)' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], GPSCheckinDto.prototype, "doChinhXacMet", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Device ID' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GPSCheckinDto.prototype, "deviceId", void 0);
class GeofenceQueryDto {
}
exports.GeofenceQueryDto = GeofenceQueryDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], GeofenceQueryDto.prototype, "phongBanId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Boolean),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], GeofenceQueryDto.prototype, "trangThai", void 0);
class GPSLogQueryDto {
}
exports.GPSLogQueryDto = GPSLogQueryDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], GPSLogQueryDto.prototype, "nhanVienId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GPSLogQueryDto.prototype, "tuNgay", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GPSLogQueryDto.prototype, "denNgay", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GPSLogQueryDto.prototype, "trangThai", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ default: 1 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], GPSLogQueryDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ default: 20 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], GPSLogQueryDto.prototype, "limit", void 0);
class BindDeviceDto {
}
exports.BindDeviceDto = BindDeviceDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Device ID/Fingerprint' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(10),
    (0, class_validator_1.MaxLength)(255),
    __metadata("design:type", String)
], BindDeviceDto.prototype, "deviceId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Tên thiết bị (e.g. iPhone 15 Pro)' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(255),
    __metadata("design:type", String)
], BindDeviceDto.prototype, "tenThietBi", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Nền tảng (iOS/Android/Web)' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BindDeviceDto.prototype, "platform", void 0);
class ResetDeviceDto {
}
exports.ResetDeviceDto = ResetDeviceDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID nhân viên cần reset device' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ResetDeviceDto.prototype, "nhanVienId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Lý do reset' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(5),
    (0, class_validator_1.MaxLength)(500),
    __metadata("design:type", String)
], ResetDeviceDto.prototype, "lyDo", void 0);
class DeviceQueryDto {
}
exports.DeviceQueryDto = DeviceQueryDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], DeviceQueryDto.prototype, "phongBanId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Trạng thái: ACTIVE | BLOCKED | PENDING_RESET' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DeviceQueryDto.prototype, "trangThai", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DeviceQueryDto.prototype, "search", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ default: 1 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], DeviceQueryDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ default: 20 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], DeviceQueryDto.prototype, "limit", void 0);
class LichSuThietBiQueryDto {
}
exports.LichSuThietBiQueryDto = LichSuThietBiQueryDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], LichSuThietBiQueryDto.prototype, "nhanVienId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], LichSuThietBiQueryDto.prototype, "hanhDong", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], LichSuThietBiQueryDto.prototype, "tuNgay", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], LichSuThietBiQueryDto.prototype, "denNgay", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ default: 1 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], LichSuThietBiQueryDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ default: 20 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], LichSuThietBiQueryDto.prototype, "limit", void 0);
//# sourceMappingURL=anti-fraud.dto.js.map