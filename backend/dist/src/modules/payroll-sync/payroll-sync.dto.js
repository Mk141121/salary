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
exports.RuleTraceQueryDto = exports.SyncBatchDto = exports.SyncPayrollDto = exports.NguonDuLieu = exports.SyncStep = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
var SyncStep;
(function (SyncStep) {
    SyncStep["CHUA_BAT_DAU"] = "CHUA_BAT_DAU";
    SyncStep["SYNC_NGAY_CONG"] = "SYNC_NGAY_CONG";
    SyncStep["SYNC_NGHI_PHEP"] = "SYNC_NGHI_PHEP";
    SyncStep["SYNC_OT"] = "SYNC_OT";
    SyncStep["SYNC_YEU_CAU"] = "SYNC_YEU_CAU";
    SyncStep["SYNC_KPI"] = "SYNC_KPI";
    SyncStep["TINH_LUONG"] = "TINH_LUONG";
    SyncStep["HOAN_THANH"] = "HOAN_THANH";
    SyncStep["LOI"] = "LOI";
})(SyncStep || (exports.SyncStep = SyncStep = {}));
var NguonDuLieu;
(function (NguonDuLieu) {
    NguonDuLieu["CHAM_CONG"] = "CHAM_CONG";
    NguonDuLieu["YEU_CAU"] = "YEU_CAU";
    NguonDuLieu["NGHI_PHEP"] = "NGHI_PHEP";
    NguonDuLieu["PHAN_CA"] = "PHAN_CA";
    NguonDuLieu["GPS"] = "GPS";
    NguonDuLieu["KPI"] = "KPI";
    NguonDuLieu["MANUAL"] = "MANUAL";
    NguonDuLieu["RULE_ENGINE"] = "RULE_ENGINE";
})(NguonDuLieu || (exports.NguonDuLieu = NguonDuLieu = {}));
class SyncPayrollDto {
}
exports.SyncPayrollDto = SyncPayrollDto;
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], SyncPayrollDto.prototype, "bangLuongId", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], SyncPayrollDto.prototype, "forceRecalc", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], SyncPayrollDto.prototype, "dryRun", void 0);
class SyncBatchDto {
}
exports.SyncBatchDto = SyncBatchDto;
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], SyncBatchDto.prototype, "thang", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], SyncBatchDto.prototype, "nam", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], SyncBatchDto.prototype, "phongBanId", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], SyncBatchDto.prototype, "forceRecalc", void 0);
class RuleTraceQueryDto {
}
exports.RuleTraceQueryDto = RuleTraceQueryDto;
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], RuleTraceQueryDto.prototype, "bangLuongId", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], RuleTraceQueryDto.prototype, "nhanVienId", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], RuleTraceQueryDto.prototype, "khoanLuongId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], RuleTraceQueryDto.prototype, "nguon", void 0);
//# sourceMappingURL=payroll-sync.dto.js.map