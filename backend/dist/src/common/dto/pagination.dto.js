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
exports.PaginationDto = void 0;
exports.tinhPagination = tinhPagination;
exports.taoPaginatedResult = taoPaginatedResult;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
class PaginationDto {
    constructor() {
        this.trang = 1;
        this.soLuong = 20;
        this.huongSapXep = 'desc';
    }
}
exports.PaginationDto = PaginationDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Số trang (bắt đầu từ 1)',
        default: 1,
        minimum: 1,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], PaginationDto.prototype, "trang", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Số bản ghi mỗi trang',
        default: 20,
        minimum: 1,
        maximum: 100,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(100),
    __metadata("design:type", Number)
], PaginationDto.prototype, "soLuong", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Trường sắp xếp',
        example: 'ngayTao',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PaginationDto.prototype, "sapXepTheo", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Hướng sắp xếp (asc hoặc desc)',
        default: 'desc',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PaginationDto.prototype, "huongSapXep", void 0);
function tinhPagination(trang = 1, soLuong = 20) {
    const skip = (trang - 1) * soLuong;
    return { skip, take: soLuong };
}
function taoPaginatedResult(data, tongSo, trang = 1, soLuong = 20) {
    const tongTrang = Math.ceil(tongSo / soLuong);
    return {
        data,
        meta: {
            tongSo,
            trang,
            soLuong,
            tongTrang,
            coTrangTruoc: trang > 1,
            coTrangSau: trang < tongTrang,
        },
    };
}
//# sourceMappingURL=pagination.dto.js.map