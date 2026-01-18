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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThongTinCongTyController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const thong_tin_cong_ty_service_1 = require("./thong-tin-cong-ty.service");
const common_2 = require("../../common");
let ThongTinCongTyController = class ThongTinCongTyController {
    constructor(service) {
        this.service = service;
    }
    async layThongTin() {
        return this.service.layThongTinCongTy();
    }
    async capNhat(dto) {
        return this.service.capNhatThongTinCongTy(dto);
    }
    async layDanhSachDonGia(phongBanId) {
        return this.service.layDanhSachDonGia(phongBanId ? parseInt(phongBanId, 10) : undefined);
    }
    async layDonGia(id) {
        return this.service.layDonGia(id);
    }
    async taoDonGia(dto) {
        return this.service.taoDonGia(dto);
    }
    async capNhatDonGia(id, dto) {
        return this.service.capNhatDonGia(id, dto);
    }
    async xoaDonGia(id) {
        return this.service.xoaDonGia(id);
    }
    async khoiTaoDonGiaMau() {
        return this.service.khoiTaoDonGiaMau();
    }
};
exports.ThongTinCongTyController = ThongTinCongTyController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy thông tin công ty' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Thành công' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ThongTinCongTyController.prototype, "layThongTin", null);
__decorate([
    (0, common_2.VaiTro)('ADMIN'),
    (0, common_1.Put)(),
    (0, swagger_1.ApiOperation)({ summary: 'Cập nhật thông tin công ty' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Cập nhật thành công' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ThongTinCongTyController.prototype, "capNhat", null);
__decorate([
    (0, common_1.Get)('don-gia'),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy danh sách đơn giá' }),
    (0, swagger_1.ApiQuery)({ name: 'phongBanId', required: false }),
    __param(0, (0, common_1.Query)('phongBanId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ThongTinCongTyController.prototype, "layDanhSachDonGia", null);
__decorate([
    (0, common_1.Get)('don-gia/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy chi tiết đơn giá' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ThongTinCongTyController.prototype, "layDonGia", null);
__decorate([
    (0, common_2.VaiTro)('ADMIN'),
    (0, common_1.Post)('don-gia'),
    (0, swagger_1.ApiOperation)({ summary: 'Tạo đơn giá mới' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ThongTinCongTyController.prototype, "taoDonGia", null);
__decorate([
    (0, common_2.VaiTro)('ADMIN'),
    (0, common_1.Put)('don-gia/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Cập nhật đơn giá' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ThongTinCongTyController.prototype, "capNhatDonGia", null);
__decorate([
    (0, common_2.VaiTro)('ADMIN'),
    (0, common_1.Delete)('don-gia/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Xóa đơn giá' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ThongTinCongTyController.prototype, "xoaDonGia", null);
__decorate([
    (0, common_2.VaiTro)('ADMIN'),
    (0, common_1.Post)('don-gia/khoi-tao-mau'),
    (0, swagger_1.ApiOperation)({ summary: 'Khởi tạo đơn giá mẫu' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ThongTinCongTyController.prototype, "khoiTaoDonGiaMau", null);
exports.ThongTinCongTyController = ThongTinCongTyController = __decorate([
    (0, swagger_1.ApiTags)('thong-tin-cong-ty'),
    (0, common_1.Controller)('thong-tin-cong-ty'),
    __metadata("design:paramtypes", [thong_tin_cong_ty_service_1.ThongTinCongTyService])
], ThongTinCongTyController);
//# sourceMappingURL=thong-tin-cong-ty.controller.js.map