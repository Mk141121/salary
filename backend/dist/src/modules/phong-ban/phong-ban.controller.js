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
exports.PhanQuyenPhongBanController = exports.NhanVienPhongBanController = exports.DonViConController = exports.PhongBanController = void 0;
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
    async layCayPhongBan() {
        return this.phongBanService.layCayPhongBan();
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
    async doiPhongBanCha(id, dto) {
        return this.phongBanService.doiPhongBanCha(id, dto);
    }
    async ngungHoatDong(id) {
        return this.phongBanService.ngungHoatDong(id);
    }
    async kichHoat(id) {
        return this.phongBanService.kichHoat(id);
    }
    async xoa(id) {
        return this.phongBanService.xoa(id);
    }
    async layNhanVien(id) {
        return this.phongBanService.layNhanVienTheoPhongBan(id);
    }
    async layDonViCon(id) {
        return this.phongBanService.layDonViCon(id);
    }
    async taoDonViCon(id, dto) {
        return this.phongBanService.taoDonViCon(id, dto);
    }
};
exports.PhongBanController = PhongBanController;
__decorate([
    (0, common_2.Quyen)('PHONGBAN_XEM'),
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy danh sách tất cả phòng ban (phẳng)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Thành công' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PhongBanController.prototype, "layTatCa", null);
__decorate([
    (0, common_2.Quyen)('PHONGBAN_XEM'),
    (0, common_1.Get)('cay'),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy cây phòng ban (hierarchical tree)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Thành công' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PhongBanController.prototype, "layCayPhongBan", null);
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
    (0, common_2.Quyen)('PHONGBAN_SUA'),
    (0, common_1.Put)(':id/doi-phong-ban-cha'),
    (0, swagger_1.ApiOperation)({ summary: 'Đổi phòng ban cha (di chuyển trong cây)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Thành công' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Không thể tạo vòng lặp' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, phong_ban_dto_1.DoiPhongBanChaDto]),
    __metadata("design:returntype", Promise)
], PhongBanController.prototype, "doiPhongBanCha", null);
__decorate([
    (0, common_2.Quyen)('PHONGBAN_SUA'),
    (0, common_1.Post)(':id/ngung-hoat-dong'),
    (0, swagger_1.ApiOperation)({ summary: 'Ngừng hoạt động phòng ban' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Thành công' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Không thể ngừng (còn nhân viên/phòng ban con)' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PhongBanController.prototype, "ngungHoatDong", null);
__decorate([
    (0, common_2.Quyen)('PHONGBAN_SUA'),
    (0, common_1.Post)(':id/kich-hoat'),
    (0, swagger_1.ApiOperation)({ summary: 'Kích hoạt lại phòng ban' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Thành công' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PhongBanController.prototype, "kichHoat", null);
__decorate([
    (0, common_2.Quyen)('PHONGBAN_XOA'),
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Xóa phòng ban (ngừng hoạt động)' }),
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
__decorate([
    (0, common_2.Quyen)('PHONGBAN_XEM'),
    (0, common_1.Get)(':id/don-vi-con'),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy danh sách đơn vị con (tổ/ca) của phòng ban' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Thành công' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PhongBanController.prototype, "layDonViCon", null);
__decorate([
    (0, common_2.Quyen)('PHONGBAN_THEM'),
    (0, common_1.Post)(':id/don-vi-con'),
    (0, swagger_1.ApiOperation)({ summary: 'Tạo đơn vị con mới cho phòng ban' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Tạo thành công' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, phong_ban_dto_1.TaoDonViConDto]),
    __metadata("design:returntype", Promise)
], PhongBanController.prototype, "taoDonViCon", null);
exports.PhongBanController = PhongBanController = __decorate([
    (0, swagger_1.ApiTags)('phong-ban'),
    (0, common_1.Controller)('phong-ban'),
    __metadata("design:paramtypes", [phong_ban_service_1.PhongBanService])
], PhongBanController);
let DonViConController = class DonViConController {
    constructor(phongBanService) {
        this.phongBanService = phongBanService;
    }
    async capNhat(id, dto) {
        return this.phongBanService.capNhatDonViCon(id, dto);
    }
    async ngungHoatDong(id) {
        return this.phongBanService.ngungDonViCon(id);
    }
};
exports.DonViConController = DonViConController;
__decorate([
    (0, common_2.Quyen)('PHONGBAN_SUA'),
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Cập nhật đơn vị con' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Thành công' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, phong_ban_dto_1.CapNhatDonViConDto]),
    __metadata("design:returntype", Promise)
], DonViConController.prototype, "capNhat", null);
__decorate([
    (0, common_2.Quyen)('PHONGBAN_SUA'),
    (0, common_1.Post)(':id/ngung-hoat-dong'),
    (0, swagger_1.ApiOperation)({ summary: 'Ngừng hoạt động đơn vị con' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Thành công' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], DonViConController.prototype, "ngungHoatDong", null);
exports.DonViConController = DonViConController = __decorate([
    (0, swagger_1.ApiTags)('don-vi-con'),
    (0, common_1.Controller)('don-vi-con'),
    __metadata("design:paramtypes", [phong_ban_service_1.PhongBanService])
], DonViConController);
let NhanVienPhongBanController = class NhanVienPhongBanController {
    constructor(phongBanService) {
        this.phongBanService = phongBanService;
    }
    async layLichSuPhongBan(id) {
        return this.phongBanService.layLichSuPhongBan(id);
    }
    async chuyenPhongBan(id, dto) {
        return this.phongBanService.chuyenPhongBan(id, dto);
    }
};
exports.NhanVienPhongBanController = NhanVienPhongBanController;
__decorate([
    (0, common_2.Quyen)('NHANVIEN_XEM'),
    (0, common_1.Get)(':id/lich-su-phong-ban'),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy lịch sử phòng ban của nhân viên' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Thành công' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], NhanVienPhongBanController.prototype, "layLichSuPhongBan", null);
__decorate([
    (0, common_2.Quyen)('NHANVIEN_SUA'),
    (0, common_1.Post)(':id/chuyen-phong-ban'),
    (0, swagger_1.ApiOperation)({ summary: 'Chuyển nhân viên sang phòng ban/tổ/ca khác' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Thành công' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Đơn vị con không thuộc phòng ban' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, phong_ban_dto_1.ChuyenPhongBanDto]),
    __metadata("design:returntype", Promise)
], NhanVienPhongBanController.prototype, "chuyenPhongBan", null);
exports.NhanVienPhongBanController = NhanVienPhongBanController = __decorate([
    (0, swagger_1.ApiTags)('nhan-vien'),
    (0, common_1.Controller)('nhan-vien'),
    __metadata("design:paramtypes", [phong_ban_service_1.PhongBanService])
], NhanVienPhongBanController);
let PhanQuyenPhongBanController = class PhanQuyenPhongBanController {
    constructor(phongBanService) {
        this.phongBanService = phongBanService;
    }
    async layPhanQuyen(nguoiDungId, phongBanId) {
        if (nguoiDungId) {
            return this.phongBanService.layPhanQuyenNguoiDung(parseInt(nguoiDungId));
        }
        if (phongBanId) {
            return this.phongBanService.layPhanQuyenPhongBan(parseInt(phongBanId));
        }
        return [];
    }
    async taoPhanQuyen(dto) {
        return this.phongBanService.taoPhanQuyen(dto);
    }
    async xoaPhanQuyen(id) {
        return this.phongBanService.xoaPhanQuyen(id);
    }
};
exports.PhanQuyenPhongBanController = PhanQuyenPhongBanController;
__decorate([
    (0, common_2.Quyen)('ADMIN'),
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy phân quyền theo người dùng hoặc phòng ban' }),
    (0, swagger_1.ApiQuery)({ name: 'nguoiDungId', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'phongBanId', required: false }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Thành công' }),
    __param(0, (0, common_1.Query)('nguoiDungId')),
    __param(1, (0, common_1.Query)('phongBanId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], PhanQuyenPhongBanController.prototype, "layPhanQuyen", null);
__decorate([
    (0, common_2.Quyen)('ADMIN'),
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Tạo phân quyền phòng ban cho người dùng' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Thành công' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [phong_ban_dto_1.TaoPhanQuyenPhongBanDto]),
    __metadata("design:returntype", Promise)
], PhanQuyenPhongBanController.prototype, "taoPhanQuyen", null);
__decorate([
    (0, common_2.Quyen)('ADMIN'),
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Xóa phân quyền' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Thành công' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PhanQuyenPhongBanController.prototype, "xoaPhanQuyen", null);
exports.PhanQuyenPhongBanController = PhanQuyenPhongBanController = __decorate([
    (0, swagger_1.ApiTags)('phan-quyen-phong-ban'),
    (0, common_1.Controller)('phan-quyen-phong-ban'),
    __metadata("design:paramtypes", [phong_ban_service_1.PhongBanService])
], PhanQuyenPhongBanController);
//# sourceMappingURL=phong-ban.controller.js.map