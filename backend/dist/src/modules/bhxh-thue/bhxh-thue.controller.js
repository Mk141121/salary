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
exports.BHXHThueController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const bhxh_thue_service_1 = require("./bhxh-thue.service");
const bhxh_thue_dto_1 = require("./dto/bhxh-thue.dto");
let BHXHThueController = class BHXHThueController {
    constructor(bhxhThueService) {
        this.bhxhThueService = bhxhThueService;
    }
    async layCauHinhBHXH(nam) {
        return this.bhxhThueService.layCauHinhBHXH(nam);
    }
    async luuCauHinhBHXH(dto) {
        return this.bhxhThueService.luuCauHinhBHXH(dto);
    }
    async khoiTaoCauHinhMacDinh() {
        return this.bhxhThueService.khoiTaoCauHinhMacDinh();
    }
    async layCauHinhThue(nam) {
        return this.bhxhThueService.layCauHinhThue(nam);
    }
    async layNguoiPhuThuoc(nhanVienId) {
        return this.bhxhThueService.layNguoiPhuThuoc(nhanVienId);
    }
    async themNguoiPhuThuoc(dto) {
        return this.bhxhThueService.themNguoiPhuThuoc(dto);
    }
    async capNhatNguoiPhuThuoc(id, dto) {
        return this.bhxhThueService.capNhatNguoiPhuThuoc(id, dto);
    }
    async tinhChoToBoNhanVien(bangLuongId) {
        return this.bhxhThueService.tinhChoToBoNhanVien(bangLuongId);
    }
    async layKetQuaTinh(bangLuongId) {
        return this.bhxhThueService.layKetQuaTinh(bangLuongId);
    }
};
exports.BHXHThueController = BHXHThueController;
__decorate([
    (0, common_1.Get)('cau-hinh-bhxh/:nam'),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy cấu hình BHXH theo năm' }),
    __param(0, (0, common_1.Param)('nam', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BHXHThueController.prototype, "layCauHinhBHXH", null);
__decorate([
    (0, common_1.Post)('cau-hinh-bhxh'),
    (0, swagger_1.ApiOperation)({ summary: 'Lưu cấu hình BHXH' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [bhxh_thue_dto_1.LuuCauHinhBHXHDto]),
    __metadata("design:returntype", Promise)
], BHXHThueController.prototype, "luuCauHinhBHXH", null);
__decorate([
    (0, common_1.Post)('khoi-tao-mac-dinh'),
    (0, swagger_1.ApiOperation)({ summary: 'Khởi tạo cấu hình BHXH/Thuế mặc định' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BHXHThueController.prototype, "khoiTaoCauHinhMacDinh", null);
__decorate([
    (0, common_1.Get)('cau-hinh-thue/:nam'),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy cấu hình thuế TNCN theo năm' }),
    __param(0, (0, common_1.Param)('nam', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BHXHThueController.prototype, "layCauHinhThue", null);
__decorate([
    (0, common_1.Get)('nguoi-phu-thuoc/:nhanVienId'),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy danh sách người phụ thuộc của nhân viên' }),
    __param(0, (0, common_1.Param)('nhanVienId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BHXHThueController.prototype, "layNguoiPhuThuoc", null);
__decorate([
    (0, common_1.Post)('nguoi-phu-thuoc'),
    (0, swagger_1.ApiOperation)({ summary: 'Thêm người phụ thuộc' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [bhxh_thue_dto_1.ThemNguoiPhuThuocDto]),
    __metadata("design:returntype", Promise)
], BHXHThueController.prototype, "themNguoiPhuThuoc", null);
__decorate([
    (0, common_1.Put)('nguoi-phu-thuoc/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Cập nhật người phụ thuộc' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, bhxh_thue_dto_1.CapNhatNguoiPhuThuocDto]),
    __metadata("design:returntype", Promise)
], BHXHThueController.prototype, "capNhatNguoiPhuThuoc", null);
__decorate([
    (0, common_1.Post)('tinh-cho-bang-luong/:bangLuongId'),
    (0, swagger_1.ApiOperation)({ summary: 'Tính BHXH/Thuế cho toàn bộ bảng lương' }),
    __param(0, (0, common_1.Param)('bangLuongId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BHXHThueController.prototype, "tinhChoToBoNhanVien", null);
__decorate([
    (0, common_1.Get)('ket-qua-tinh/:bangLuongId'),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy kết quả tính BHXH/Thuế của bảng lương' }),
    __param(0, (0, common_1.Param)('bangLuongId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BHXHThueController.prototype, "layKetQuaTinh", null);
exports.BHXHThueController = BHXHThueController = __decorate([
    (0, swagger_1.ApiTags)('BHXH & Thuế TNCN'),
    (0, common_1.Controller)('bhxh-thue'),
    __metadata("design:paramtypes", [bhxh_thue_service_1.BHXHThueService])
], BHXHThueController);
//# sourceMappingURL=bhxh-thue.controller.js.map