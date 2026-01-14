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
exports.KhoanLuongController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const khoan_luong_service_1 = require("./khoan-luong.service");
const khoan_luong_dto_1 = require("./dto/khoan-luong.dto");
const common_2 = require("../../common");
let KhoanLuongController = class KhoanLuongController {
    constructor(khoanLuongService) {
        this.khoanLuongService = khoanLuongService;
    }
    async layTatCa(loai) {
        if (loai) {
            return this.khoanLuongService.layTheoLoai(loai);
        }
        return this.khoanLuongService.layTatCa();
    }
    async layTheoId(id) {
        return this.khoanLuongService.layTheoId(id);
    }
    async layTheoMa(maKhoan) {
        return this.khoanLuongService.layTheoMa(maKhoan);
    }
    async taoMoi(dto) {
        return this.khoanLuongService.taoMoi(dto);
    }
    async capNhat(id, dto) {
        return this.khoanLuongService.capNhat(id, dto);
    }
    async xoa(id) {
        return this.khoanLuongService.xoa(id);
    }
    async capNhatThuTu(dto) {
        return this.khoanLuongService.capNhatThuTu(dto.danhSach);
    }
};
exports.KhoanLuongController = KhoanLuongController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy danh sách tất cả khoản lương' }),
    (0, swagger_1.ApiQuery)({ name: 'loai', required: false, enum: ['THU_NHAP', 'KHAU_TRU'] }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Thành công' }),
    __param(0, (0, common_1.Query)('loai')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], KhoanLuongController.prototype, "layTatCa", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy thông tin khoản lương theo ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Thành công' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Không tìm thấy khoản lương' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], KhoanLuongController.prototype, "layTheoId", null);
__decorate([
    (0, common_1.Get)('ma/:maKhoan'),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy thông tin khoản lương theo mã' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Thành công' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Không tìm thấy khoản lương' }),
    __param(0, (0, common_1.Param)('maKhoan')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], KhoanLuongController.prototype, "layTheoMa", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Tạo khoản lương mới' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Tạo thành công' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Mã khoản lương đã tồn tại' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [khoan_luong_dto_1.TaoKhoanLuongDto]),
    __metadata("design:returntype", Promise)
], KhoanLuongController.prototype, "taoMoi", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Cập nhật thông tin khoản lương' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Cập nhật thành công' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Không tìm thấy khoản lương' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, khoan_luong_dto_1.CapNhatKhoanLuongDto]),
    __metadata("design:returntype", Promise)
], KhoanLuongController.prototype, "capNhat", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Xóa khoản lương' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Xóa thành công' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Không tìm thấy khoản lương' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Khoản lương đang được sử dụng' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], KhoanLuongController.prototype, "xoa", null);
__decorate([
    (0, common_1.Put)('thu-tu/cap-nhat'),
    (0, swagger_1.ApiOperation)({ summary: 'Cập nhật thứ tự hiển thị các khoản lương' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Cập nhật thành công' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [khoan_luong_dto_1.CapNhatThuTuDto]),
    __metadata("design:returntype", Promise)
], KhoanLuongController.prototype, "capNhatThuTu", null);
exports.KhoanLuongController = KhoanLuongController = __decorate([
    (0, swagger_1.ApiTags)('khoan-luong'),
    (0, common_1.Controller)('khoan-luong'),
    (0, common_2.VaiTro)('ADMIN', 'KETOAN'),
    __metadata("design:paramtypes", [khoan_luong_service_1.KhoanLuongService])
], KhoanLuongController);
//# sourceMappingURL=khoan-luong.controller.js.map