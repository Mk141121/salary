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
exports.PhuCapNhanVienController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const phu_cap_nhan_vien_service_1 = require("./phu-cap-nhan-vien.service");
const phu_cap_nhan_vien_dto_1 = require("./phu-cap-nhan-vien.dto");
const common_2 = require("../../common");
let PhuCapNhanVienController = class PhuCapNhanVienController {
    constructor(phuCapService) {
        this.phuCapService = phuCapService;
    }
    async layTheoNhanVien(nhanVienId) {
        return this.phuCapService.layTheoNhanVien(nhanVienId);
    }
    async layPhuCapHieuLuc(nhanVienId) {
        return this.phuCapService.layPhuCapHieuLuc(nhanVienId);
    }
    async layPhuCapTheoThang(nhanVienId, thang, nam) {
        return this.phuCapService.layPhuCapTheoThang(nhanVienId, thang, nam);
    }
    async layLichSuPhuCap(nhanVienId, khoanLuongId) {
        return this.phuCapService.layLichSuPhuCap(nhanVienId, khoanLuongId ? parseInt(khoanLuongId) : undefined);
    }
    async taoPhuCap(dto) {
        return this.phuCapService.taoPhuCap({
            nhanVienId: dto.nhanVienId,
            khoanLuongId: dto.khoanLuongId,
            soTien: dto.soTien,
            tuNgay: new Date(dto.tuNgay),
            denNgay: dto.denNgay ? new Date(dto.denNgay) : undefined,
            ghiChu: dto.ghiChu,
            nguoiTao: dto.nguoiTao,
        });
    }
    async ketThucPhuCap(id, dto) {
        return this.phuCapService.ketThucPhuCap(id, new Date(dto.denNgay), dto.nguoiCapNhat);
    }
    async tangPhuCap(id, dto) {
        return this.phuCapService.tangPhuCap(id, {
            soTienMoi: dto.soTienMoi,
            tuNgay: new Date(dto.tuNgay),
            ghiChu: dto.ghiChu,
            nguoiTao: dto.nguoiTao,
        });
    }
    async tamDungPhuCap(id) {
        return this.phuCapService.tamDungPhuCap(id);
    }
    async kichHoatLai(id) {
        return this.phuCapService.kichHoatLai(id);
    }
    async thongKeTheoPhongBan(phongBanId) {
        return this.phuCapService.thongKeTheoPhongBan(phongBanId);
    }
};
exports.PhuCapNhanVienController = PhuCapNhanVienController;
__decorate([
    (0, common_1.Get)('nhan-vien/:nhanVienId'),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy tất cả phụ cấp của nhân viên' }),
    __param(0, (0, common_1.Param)('nhanVienId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PhuCapNhanVienController.prototype, "layTheoNhanVien", null);
__decorate([
    (0, common_1.Get)('nhan-vien/:nhanVienId/hieu-luc'),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy phụ cấp đang hiệu lực của nhân viên' }),
    __param(0, (0, common_1.Param)('nhanVienId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PhuCapNhanVienController.prototype, "layPhuCapHieuLuc", null);
__decorate([
    (0, common_1.Get)('nhan-vien/:nhanVienId/theo-thang'),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy phụ cấp hợp lệ cho 1 tháng lương' }),
    (0, swagger_1.ApiQuery)({ name: 'thang', type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'nam', type: Number }),
    __param(0, (0, common_1.Param)('nhanVienId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('thang', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Query)('nam', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number]),
    __metadata("design:returntype", Promise)
], PhuCapNhanVienController.prototype, "layPhuCapTheoThang", null);
__decorate([
    (0, common_1.Get)('nhan-vien/:nhanVienId/lich-su'),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy lịch sử thay đổi phụ cấp' }),
    (0, swagger_1.ApiQuery)({ name: 'khoanLuongId', required: false, type: Number }),
    __param(0, (0, common_1.Param)('nhanVienId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('khoanLuongId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], PhuCapNhanVienController.prototype, "layLichSuPhuCap", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Thêm phụ cấp mới cho nhân viên' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [phu_cap_nhan_vien_dto_1.TaoPhuCapDto]),
    __metadata("design:returntype", Promise)
], PhuCapNhanVienController.prototype, "taoPhuCap", null);
__decorate([
    (0, common_1.Put)(':id/ket-thuc'),
    (0, swagger_1.ApiOperation)({ summary: 'Kết thúc phụ cấp' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, phu_cap_nhan_vien_dto_1.KetThucPhuCapDto]),
    __metadata("design:returntype", Promise)
], PhuCapNhanVienController.prototype, "ketThucPhuCap", null);
__decorate([
    (0, common_1.Post)(':id/tang'),
    (0, swagger_1.ApiOperation)({ summary: 'Tăng/Điều chỉnh phụ cấp (tạo bản ghi mới)' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, phu_cap_nhan_vien_dto_1.TangPhuCapDto]),
    __metadata("design:returntype", Promise)
], PhuCapNhanVienController.prototype, "tangPhuCap", null);
__decorate([
    (0, common_1.Put)(':id/tam-dung'),
    (0, swagger_1.ApiOperation)({ summary: 'Tạm dừng phụ cấp' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PhuCapNhanVienController.prototype, "tamDungPhuCap", null);
__decorate([
    (0, common_1.Put)(':id/kich-hoat'),
    (0, swagger_1.ApiOperation)({ summary: 'Kích hoạt lại phụ cấp đang tạm dừng' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PhuCapNhanVienController.prototype, "kichHoatLai", null);
__decorate([
    (0, common_1.Get)('thong-ke/phong-ban/:phongBanId'),
    (0, swagger_1.ApiOperation)({ summary: 'Thống kê tổng phụ cấp theo phòng ban' }),
    __param(0, (0, common_1.Param)('phongBanId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PhuCapNhanVienController.prototype, "thongKeTheoPhongBan", null);
exports.PhuCapNhanVienController = PhuCapNhanVienController = __decorate([
    (0, swagger_1.ApiTags)('Phụ cấp nhân viên'),
    (0, common_1.Controller)('phu-cap-nhan-vien'),
    (0, common_2.Quyen)('PHUCAP_XEM'),
    __metadata("design:paramtypes", [phu_cap_nhan_vien_service_1.PhuCapNhanVienService])
], PhuCapNhanVienController);
//# sourceMappingURL=phu-cap-nhan-vien.controller.js.map