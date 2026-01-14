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
exports.PhongBanController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const phong_ban_service_1 = require("./phong-ban.service");
const phong_ban_dto_1 = require("./dto/phong-ban.dto");
const common_2 = require("../../common");
let PhongBanController = class PhongBanController {
    constructor(phongBanService) {
        this.phongBanService = phongBanService;
    }
    async layTatCa() {
        return this.phongBanService.layTatCa();
    }
    async layTheoId(id) {
        return this.phongBanService.layTheoId(id);
    }
    async taoMoi(dto) {
        return this.phongBanService.taoMoi(dto);
    }
    async capNhat(id, dto) {
        return this.phongBanService.capNhat(id, dto);
    }
    async xoa(id) {
        return this.phongBanService.xoa(id);
    }
    async layNhanVien(id) {
        return this.phongBanService.layNhanVienTheoPhongBan(id);
    }
};
exports.PhongBanController = PhongBanController;
__decorate([
    (0, common_2.Quyen)('PHONGBAN_XEM'),
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy danh sách tất cả phòng ban' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Thành công' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PhongBanController.prototype, "layTatCa", null);
__decorate([
    (0, common_2.Quyen)('PHONGBAN_XEM'),
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy thông tin phòng ban theo ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Thành công' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Không tìm thấy phòng ban' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PhongBanController.prototype, "layTheoId", null);
__decorate([
    (0, common_2.Quyen)('PHONGBAN_THEM'),
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Tạo phòng ban mới' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Tạo thành công' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [phong_ban_dto_1.TaoPhongBanDto]),
    __metadata("design:returntype", Promise)
], PhongBanController.prototype, "taoMoi", null);
__decorate([
    (0, common_2.Quyen)('PHONGBAN_SUA'),
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Cập nhật thông tin phòng ban' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Cập nhật thành công' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Không tìm thấy phòng ban' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, phong_ban_dto_1.CapNhatPhongBanDto]),
    __metadata("design:returntype", Promise)
], PhongBanController.prototype, "capNhat", null);
__decorate([
    (0, common_2.Quyen)('PHONGBAN_XOA'),
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Xóa phòng ban' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Xóa thành công' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Không tìm thấy phòng ban' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PhongBanController.prototype, "xoa", null);
__decorate([
    (0, common_2.Quyen)('PHONGBAN_XEM'),
    (0, common_1.Get)(':id/nhan-vien'),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy danh sách nhân viên theo phòng ban' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Thành công' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PhongBanController.prototype, "layNhanVien", null);
exports.PhongBanController = PhongBanController = __decorate([
    (0, swagger_1.ApiTags)('phong-ban'),
    (0, common_1.Controller)('phong-ban'),
    __metadata("design:paramtypes", [phong_ban_service_1.PhongBanService])
], PhongBanController);
//# sourceMappingURL=phong-ban.controller.js.map