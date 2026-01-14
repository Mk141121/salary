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
exports.ChamCongController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const cham_cong_service_1 = require("./cham-cong.service");
const cham_cong_dto_1 = require("./dto/cham-cong.dto");
const common_2 = require("../../common");
let ChamCongController = class ChamCongController {
    constructor(chamCongService) {
        this.chamCongService = chamCongService;
    }
    async layNgayCongLyThuyet(thang, nam) {
        return this.chamCongService.layThongTinNgayCongLyThuyet(thang, nam);
    }
    async layCauHinhPhat(nam) {
        return this.chamCongService.layCauHinhPhat(nam);
    }
    async capNhatCauHinhPhat(nam, dto) {
        return this.chamCongService.capNhatCauHinhPhat(nam, dto);
    }
    async tinhTienPhat(nhanVienId, thang, nam) {
        return this.chamCongService.tinhTienPhat(nhanVienId, thang, nam);
    }
    async layDanhSachChamCong(thang, nam, phongBanId) {
        return this.chamCongService.layDanhSachChamCong(thang, nam, phongBanId ? parseInt(phongBanId, 10) : undefined);
    }
    async layChamCongNhanVien(nhanVienId, thang, nam) {
        return this.chamCongService.layChamCongNhanVien(nhanVienId, thang, nam);
    }
    async luuChamCong(dto) {
        return this.chamCongService.luuChamCong(dto);
    }
    async khoiTaoChamCongThang(dto) {
        return this.chamCongService.khoiTaoChamCongThang(dto.thang, dto.nam, dto.soCongChuan);
    }
    async layChiTietChamCong(nhanVienId, thang, nam) {
        return this.chamCongService.layChiTietChamCong(nhanVienId, thang, nam);
    }
    async luuChiTietChamCong(dto) {
        return this.chamCongService.luuChiTietChamCong(dto);
    }
    async tongHopChamCong(nhanVienId, thang, nam) {
        return this.chamCongService.tongHopChamCong(nhanVienId, thang, nam);
    }
    async importChamCong(dto) {
        return this.chamCongService.importChamCong(dto.thang, dto.nam, dto.duLieu);
    }
    async dongBoChamCongCSV(dto) {
        return this.chamCongService.dongBoChamCongCSV(dto.csvContent);
    }
};
exports.ChamCongController = ChamCongController;
__decorate([
    (0, common_1.Get)('ngay-cong-ly-thuyet'),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy thông tin ngày công lý thuyết trong tháng' }),
    (0, swagger_1.ApiQuery)({ name: 'thang', required: true }),
    (0, swagger_1.ApiQuery)({ name: 'nam', required: true }),
    __param(0, (0, common_1.Query)('thang', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('nam', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], ChamCongController.prototype, "layNgayCongLyThuyet", null);
__decorate([
    (0, common_1.Get)('cau-hinh-phat/:nam'),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy cấu hình phạt theo năm' }),
    __param(0, (0, common_1.Param)('nam', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ChamCongController.prototype, "layCauHinhPhat", null);
__decorate([
    (0, common_1.Put)('cau-hinh-phat/:nam'),
    (0, swagger_1.ApiOperation)({ summary: 'Cập nhật cấu hình phạt' }),
    __param(0, (0, common_1.Param)('nam', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, cham_cong_dto_1.CapNhatCauHinhPhatDto]),
    __metadata("design:returntype", Promise)
], ChamCongController.prototype, "capNhatCauHinhPhat", null);
__decorate([
    (0, common_1.Get)('tinh-phat/:nhanVienId'),
    (0, swagger_1.ApiOperation)({ summary: 'Tính tiền phạt cho nhân viên trong tháng' }),
    (0, swagger_1.ApiQuery)({ name: 'thang', required: true }),
    (0, swagger_1.ApiQuery)({ name: 'nam', required: true }),
    __param(0, (0, common_1.Param)('nhanVienId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('thang', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Query)('nam', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number]),
    __metadata("design:returntype", Promise)
], ChamCongController.prototype, "tinhTienPhat", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy danh sách chấm công theo tháng' }),
    (0, swagger_1.ApiQuery)({ name: 'thang', required: true }),
    (0, swagger_1.ApiQuery)({ name: 'nam', required: true }),
    (0, swagger_1.ApiQuery)({ name: 'phongBanId', required: false }),
    __param(0, (0, common_1.Query)('thang', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('nam', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Query)('phongBanId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String]),
    __metadata("design:returntype", Promise)
], ChamCongController.prototype, "layDanhSachChamCong", null);
__decorate([
    (0, common_1.Get)('nhan-vien/:nhanVienId'),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy chấm công của nhân viên' }),
    (0, swagger_1.ApiQuery)({ name: 'thang', required: true }),
    (0, swagger_1.ApiQuery)({ name: 'nam', required: true }),
    __param(0, (0, common_1.Param)('nhanVienId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('thang', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Query)('nam', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number]),
    __metadata("design:returntype", Promise)
], ChamCongController.prototype, "layChamCongNhanVien", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Lưu chấm công' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cham_cong_dto_1.LuuChamCongDto]),
    __metadata("design:returntype", Promise)
], ChamCongController.prototype, "luuChamCong", null);
__decorate([
    (0, common_1.Post)('khoi-tao'),
    (0, swagger_1.ApiOperation)({ summary: 'Khởi tạo chấm công cho tất cả nhân viên' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cham_cong_dto_1.KhoiTaoChamCongDto]),
    __metadata("design:returntype", Promise)
], ChamCongController.prototype, "khoiTaoChamCongThang", null);
__decorate([
    (0, common_1.Get)('chi-tiet/:nhanVienId'),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy chi tiết chấm công theo ngày' }),
    (0, swagger_1.ApiQuery)({ name: 'thang', required: true }),
    (0, swagger_1.ApiQuery)({ name: 'nam', required: true }),
    __param(0, (0, common_1.Param)('nhanVienId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('thang', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Query)('nam', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number]),
    __metadata("design:returntype", Promise)
], ChamCongController.prototype, "layChiTietChamCong", null);
__decorate([
    (0, common_1.Post)('chi-tiet'),
    (0, swagger_1.ApiOperation)({ summary: 'Lưu chi tiết chấm công' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cham_cong_dto_1.LuuChiTietChamCongDto]),
    __metadata("design:returntype", Promise)
], ChamCongController.prototype, "luuChiTietChamCong", null);
__decorate([
    (0, common_1.Post)('tong-hop/:nhanVienId'),
    (0, swagger_1.ApiOperation)({ summary: 'Tổng hợp chi tiết thành chấm công tháng' }),
    (0, swagger_1.ApiQuery)({ name: 'thang', required: true }),
    (0, swagger_1.ApiQuery)({ name: 'nam', required: true }),
    __param(0, (0, common_1.Param)('nhanVienId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('thang', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Query)('nam', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number]),
    __metadata("design:returntype", Promise)
], ChamCongController.prototype, "tongHopChamCong", null);
__decorate([
    (0, common_1.Post)('import'),
    (0, swagger_1.ApiOperation)({ summary: 'Import chấm công từ dữ liệu' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cham_cong_dto_1.ImportChamCongDto]),
    __metadata("design:returntype", Promise)
], ChamCongController.prototype, "importChamCong", null);
__decorate([
    (0, common_1.Post)('dong-bo-csv'),
    (0, swagger_1.ApiOperation)({ summary: 'Đồng bộ chấm công từ file CSV máy chấm công' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ChamCongController.prototype, "dongBoChamCongCSV", null);
exports.ChamCongController = ChamCongController = __decorate([
    (0, swagger_1.ApiTags)('Chấm công'),
    (0, common_1.Controller)('cham-cong'),
    (0, common_2.Quyen)('CHAMCONG_XEM'),
    __metadata("design:paramtypes", [cham_cong_service_1.ChamCongService])
], ChamCongController);
//# sourceMappingURL=cham-cong.controller.js.map