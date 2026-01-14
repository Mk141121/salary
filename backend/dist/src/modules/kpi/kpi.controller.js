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
exports.KPIController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const kpi_service_1 = require("./kpi.service");
const kpi_dto_1 = require("./dto/kpi.dto");
const common_2 = require("../../common");
let KPIController = class KPIController {
    constructor(kpiService) {
        this.kpiService = kpiService;
    }
    layDanhSachTemplate(phongBanId) {
        return this.kpiService.layDanhSachTemplate(phongBanId ? parseInt(phongBanId) : undefined);
    }
    layTemplateTheoId(id) {
        return this.kpiService.layTemplateTheoId(id);
    }
    taoTemplate(dto) {
        return this.kpiService.taoTemplate(dto);
    }
    capNhatTemplate(id, dto) {
        return this.kpiService.capNhatTemplate(id, dto);
    }
    themChiTieu(id, dto) {
        return this.kpiService.themChiTieu(id, dto);
    }
    xoaChiTieu(id) {
        return this.kpiService.xoaChiTieu(id);
    }
    layDanhSachKyDanhGia(nam) {
        return this.kpiService.layDanhSachKyDanhGia(nam ? parseInt(nam) : undefined);
    }
    layKyDanhGiaTheoId(id) {
        return this.kpiService.layKyDanhGiaTheoId(id);
    }
    taoKyDanhGia(dto) {
        return this.kpiService.taoKyDanhGia(dto);
    }
    capNhatTrangThaiKy(id, dto) {
        return this.kpiService.capNhatTrangThaiKy(id, dto);
    }
    taoDanhGiaKPI(dto) {
        return this.kpiService.taoDanhGiaKPI(dto);
    }
    capNhatKetQuaKPI(id, dto) {
        return this.kpiService.capNhatKetQuaKPI(id, dto);
    }
    guiDuyet(id) {
        return this.kpiService.guiDuyet(id);
    }
    duyetDanhGia(id, dto) {
        return this.kpiService.duyetDanhGia(id, dto);
    }
    tuChoiDanhGia(id, dto) {
        return this.kpiService.tuChoiDanhGia(id, dto.lyDoTuChoi);
    }
    layCauHinhThuong(nam) {
        return this.kpiService.layCauHinhThuong(nam);
    }
    luuCauHinhThuong(dto) {
        return this.kpiService.luuCauHinhThuong(dto);
    }
    khoiTaoCauHinhThuongMacDinh(nam) {
        return this.kpiService.khoiTaoCauHinhThuongMacDinh(nam);
    }
    tinhThuongKPI(dto) {
        return this.kpiService.tinhThuongKPI(dto);
    }
    baoCaoKPITheoPhongBan(kyDanhGiaId) {
        return this.kpiService.baoCaoKPITheoPhongBan(kyDanhGiaId);
    }
};
exports.KPIController = KPIController;
__decorate([
    (0, common_1.Get)('template'),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy danh sách template KPI' }),
    (0, swagger_1.ApiQuery)({ name: 'phongBanId', required: false }),
    __param(0, (0, common_1.Query)('phongBanId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], KPIController.prototype, "layDanhSachTemplate", null);
__decorate([
    (0, common_1.Get)('template/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy template KPI theo ID' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], KPIController.prototype, "layTemplateTheoId", null);
__decorate([
    (0, common_1.Post)('template'),
    (0, swagger_1.ApiOperation)({ summary: 'Tạo template KPI mới' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [kpi_dto_1.TaoTemplateKPIDto]),
    __metadata("design:returntype", void 0)
], KPIController.prototype, "taoTemplate", null);
__decorate([
    (0, common_1.Put)('template/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Cập nhật template KPI' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, kpi_dto_1.CapNhatTemplateKPIDto]),
    __metadata("design:returntype", void 0)
], KPIController.prototype, "capNhatTemplate", null);
__decorate([
    (0, common_1.Post)('template/:id/chi-tieu'),
    (0, swagger_1.ApiOperation)({ summary: 'Thêm chỉ tiêu vào template' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, kpi_dto_1.TaoChiTieuKPIDto]),
    __metadata("design:returntype", void 0)
], KPIController.prototype, "themChiTieu", null);
__decorate([
    (0, common_1.Delete)('chi-tieu/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Xóa chỉ tiêu KPI' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], KPIController.prototype, "xoaChiTieu", null);
__decorate([
    (0, common_1.Get)('ky-danh-gia'),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy danh sách kỳ đánh giá' }),
    (0, swagger_1.ApiQuery)({ name: 'nam', required: false }),
    __param(0, (0, common_1.Query)('nam')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], KPIController.prototype, "layDanhSachKyDanhGia", null);
__decorate([
    (0, common_1.Get)('ky-danh-gia/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy chi tiết kỳ đánh giá' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], KPIController.prototype, "layKyDanhGiaTheoId", null);
__decorate([
    (0, common_1.Post)('ky-danh-gia'),
    (0, swagger_1.ApiOperation)({ summary: 'Tạo kỳ đánh giá mới' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [kpi_dto_1.TaoKyDanhGiaDto]),
    __metadata("design:returntype", void 0)
], KPIController.prototype, "taoKyDanhGia", null);
__decorate([
    (0, common_1.Put)('ky-danh-gia/:id/trang-thai'),
    (0, swagger_1.ApiOperation)({ summary: 'Cập nhật trạng thái kỳ đánh giá' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, kpi_dto_1.CapNhatTrangThaiKyDto]),
    __metadata("design:returntype", void 0)
], KPIController.prototype, "capNhatTrangThaiKy", null);
__decorate([
    (0, common_1.Post)('danh-gia'),
    (0, swagger_1.ApiOperation)({ summary: 'Tạo đánh giá KPI cho nhân viên' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [kpi_dto_1.TaoDanhGiaKPIDto]),
    __metadata("design:returntype", void 0)
], KPIController.prototype, "taoDanhGiaKPI", null);
__decorate([
    (0, common_1.Put)('danh-gia/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Cập nhật kết quả KPI' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, kpi_dto_1.CapNhatKetQuaKPIDto]),
    __metadata("design:returntype", void 0)
], KPIController.prototype, "capNhatKetQuaKPI", null);
__decorate([
    (0, common_1.Post)('danh-gia/:id/gui-duyet'),
    (0, swagger_1.ApiOperation)({ summary: 'Gửi đánh giá để duyệt' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], KPIController.prototype, "guiDuyet", null);
__decorate([
    (0, common_1.Put)('danh-gia/:id/duyet'),
    (0, swagger_1.ApiOperation)({ summary: 'Duyệt đánh giá KPI' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, kpi_dto_1.DuyetDanhGiaKPIDto]),
    __metadata("design:returntype", void 0)
], KPIController.prototype, "duyetDanhGia", null);
__decorate([
    (0, common_1.Put)('danh-gia/:id/tu-choi'),
    (0, swagger_1.ApiOperation)({ summary: 'Từ chối đánh giá KPI' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, kpi_dto_1.TuChoiDanhGiaKPIDto]),
    __metadata("design:returntype", void 0)
], KPIController.prototype, "tuChoiDanhGia", null);
__decorate([
    (0, common_1.Get)('cau-hinh-thuong/:nam'),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy cấu hình thưởng theo năm' }),
    __param(0, (0, common_1.Param)('nam', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], KPIController.prototype, "layCauHinhThuong", null);
__decorate([
    (0, common_1.Post)('cau-hinh-thuong'),
    (0, swagger_1.ApiOperation)({ summary: 'Lưu cấu hình thưởng' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [kpi_dto_1.TaoCauHinhThuongDto]),
    __metadata("design:returntype", void 0)
], KPIController.prototype, "luuCauHinhThuong", null);
__decorate([
    (0, common_1.Post)('cau-hinh-thuong/khoi-tao/:nam'),
    (0, swagger_1.ApiOperation)({ summary: 'Khởi tạo cấu hình thưởng mặc định' }),
    __param(0, (0, common_1.Param)('nam', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], KPIController.prototype, "khoiTaoCauHinhThuongMacDinh", null);
__decorate([
    (0, common_1.Post)('tinh-thuong'),
    (0, swagger_1.ApiOperation)({ summary: 'Tính thưởng KPI cho kỳ đánh giá' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [kpi_dto_1.TinhThuongKPIDto]),
    __metadata("design:returntype", void 0)
], KPIController.prototype, "tinhThuongKPI", null);
__decorate([
    (0, common_1.Get)('bao-cao/theo-phong-ban/:kyDanhGiaId'),
    (0, swagger_1.ApiOperation)({ summary: 'Báo cáo KPI theo phòng ban' }),
    __param(0, (0, common_1.Param)('kyDanhGiaId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], KPIController.prototype, "baoCaoKPITheoPhongBan", null);
exports.KPIController = KPIController = __decorate([
    (0, swagger_1.ApiTags)('KPI & Thưởng'),
    (0, common_1.Controller)('kpi'),
    (0, common_2.Quyen)('KPI_XEM'),
    __metadata("design:paramtypes", [kpi_service_1.KPIService])
], KPIController);
//# sourceMappingURL=kpi.controller.js.map