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
exports.NhanVienController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const nhan_vien_service_1 = require("./nhan-vien.service");
const nhan_vien_dto_1 = require("./dto/nhan-vien.dto");
const common_2 = require("../../common");
let NhanVienController = class NhanVienController {
    constructor(nhanVienService) {
        this.nhanVienService = nhanVienService;
    }
    async layMaTuDong() {
        const maNhanVien = await this.nhanVienService.taoMaNhanVienTuDong();
        return { maNhanVien };
    }
    async layTatCa(query) {
        return this.nhanVienService.layTatCa(query);
    }
    async layTheoId(id) {
        return this.nhanVienService.layTheoId(id);
    }
    async layTheoMa(maNhanVien) {
        return this.nhanVienService.layTheoMa(maNhanVien);
    }
    async taoMoi(dto) {
        return this.nhanVienService.taoMoi(dto);
    }
    async capNhat(id, dto) {
        return this.nhanVienService.capNhat(id, dto);
    }
    async xoa(id) {
        return this.nhanVienService.xoa(id);
    }
    async thongKeTheoPhongBan() {
        return this.nhanVienService.demTheoPhongBan();
    }
};
exports.NhanVienController = NhanVienController;
__decorate([
    (0, common_2.Quyen)('NHANVIEN_XEM'),
    (0, common_1.Get)('ma-tu-dong'),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy mã nhân viên tự động tiếp theo' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Thành công' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], NhanVienController.prototype, "layMaTuDong", null);
__decorate([
    (0, common_2.Quyen)('NHANVIEN_XEM'),
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy danh sách nhân viên' }),
    (0, swagger_1.ApiQuery)({ name: 'phongBanId', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'tuKhoa', required: false, type: String }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Thành công' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [nhan_vien_dto_1.TimKiemNhanVienDto]),
    __metadata("design:returntype", Promise)
], NhanVienController.prototype, "layTatCa", null);
__decorate([
    (0, common_2.Quyen)('NHANVIEN_XEM'),
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy thông tin nhân viên theo ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Thành công' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Không tìm thấy nhân viên' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], NhanVienController.prototype, "layTheoId", null);
__decorate([
    (0, common_2.Quyen)('NHANVIEN_XEM'),
    (0, common_1.Get)('ma/:maNhanVien'),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy thông tin nhân viên theo mã' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Thành công' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Không tìm thấy nhân viên' }),
    __param(0, (0, common_1.Param)('maNhanVien')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NhanVienController.prototype, "layTheoMa", null);
__decorate([
    (0, common_2.Quyen)('NHANVIEN_THEM'),
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Tạo nhân viên mới' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Tạo thành công' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [nhan_vien_dto_1.TaoNhanVienDto]),
    __metadata("design:returntype", Promise)
], NhanVienController.prototype, "taoMoi", null);
__decorate([
    (0, common_2.Quyen)('NHANVIEN_SUA'),
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Cập nhật thông tin nhân viên' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Cập nhật thành công' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Không tìm thấy nhân viên' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, nhan_vien_dto_1.CapNhatNhanVienDto]),
    __metadata("design:returntype", Promise)
], NhanVienController.prototype, "capNhat", null);
__decorate([
    (0, common_2.Quyen)('NHANVIEN_XOA'),
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Xóa nhân viên (chuyển trạng thái nghỉ việc)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Xóa thành công' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Không tìm thấy nhân viên' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], NhanVienController.prototype, "xoa", null);
__decorate([
    (0, common_2.Quyen)('NHANVIEN_XEM'),
    (0, common_1.Get)('thong-ke/theo-phong-ban'),
    (0, swagger_1.ApiOperation)({ summary: 'Thống kê số nhân viên theo phòng ban' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], NhanVienController.prototype, "thongKeTheoPhongBan", null);
exports.NhanVienController = NhanVienController = __decorate([
    (0, swagger_1.ApiTags)('nhan-vien'),
    (0, common_1.Controller)('nhan-vien'),
    __metadata("design:paramtypes", [nhan_vien_service_1.NhanVienService])
], NhanVienController);
//# sourceMappingURL=nhan-vien.controller.js.map