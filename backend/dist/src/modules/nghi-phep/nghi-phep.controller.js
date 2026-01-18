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
exports.NghiPhepController = void 0;
const common_1 = require("@nestjs/common");
const nghi_phep_service_1 = require("./nghi-phep.service");
const nghi_phep_mapping_service_1 = require("./nghi-phep-mapping.service");
const nghi_phep_dto_1 = require("./nghi-phep.dto");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const quyen_decorator_1 = require("../../common/decorators/quyen.decorator");
let NghiPhepController = class NghiPhepController {
    constructor(nghiPhepService, mappingService) {
        this.nghiPhepService = nghiPhepService;
        this.mappingService = mappingService;
    }
    async layDanhSachLoaiNghi(all) {
        const chiActive = all !== 'true';
        return this.nghiPhepService.layDanhSachLoaiNghi(chiActive);
    }
    async layLoaiNghi(id) {
        return this.nghiPhepService.layLoaiNghi(id);
    }
    async taoLoaiNghi(dto, req) {
        return this.nghiPhepService.taoLoaiNghi(dto, req.user?.id);
    }
    async capNhatLoaiNghi(id, dto, req) {
        return this.nghiPhepService.capNhatLoaiNghi(id, dto, req.user?.id);
    }
    async toggleLoaiNghi(id, req) {
        return this.nghiPhepService.toggleLoaiNghi(id, req.user?.id);
    }
    async layDanhSachDon(filter) {
        return this.nghiPhepService.layDanhSachDon(filter);
    }
    async layChiTietDon(id) {
        return this.nghiPhepService.layChiTietDon(id);
    }
    async taoDonNghiPhep(dto, req) {
        return this.nghiPhepService.taoDonNghiPhep(dto, req.user?.id);
    }
    async capNhatDonNghiPhep(id, dto, req) {
        return this.nghiPhepService.capNhatDonNghiPhep(id, dto, req.user?.id);
    }
    async guiDuyet(id, req) {
        return this.nghiPhepService.guiDuyet(id, req.user?.id);
    }
    async duyetDon(id, dto, req) {
        return this.nghiPhepService.duyetDon(id, dto, req.user?.id);
    }
    async tuChoiDon(id, dto, req) {
        return this.nghiPhepService.tuChoiDon(id, dto, req.user?.id);
    }
    async huyDon(id, dto, req) {
        return this.nghiPhepService.huyDon(id, req.user?.id);
    }
    async rebuildMapping(id) {
        return this.nghiPhepService.rebuildMapping(id);
    }
    async layLichNghi(filter) {
        return this.nghiPhepService.layLichNghi(filter);
    }
    async layLichNghiNhanVien(nhanVienId, tuNgay, denNgay) {
        return this.mappingService.layLichNghiNhanVien(nhanVienId, new Date(tuNgay), new Date(denNgay));
    }
};
exports.NghiPhepController = NghiPhepController;
__decorate([
    (0, common_1.Get)('loai-nghi'),
    __param(0, (0, common_1.Query)('all')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NghiPhepController.prototype, "layDanhSachLoaiNghi", null);
__decorate([
    (0, common_1.Get)('loai-nghi/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], NghiPhepController.prototype, "layLoaiNghi", null);
__decorate([
    (0, common_1.Post)('loai-nghi'),
    (0, quyen_decorator_1.Quyen)('NGHI_PHEP_ADMIN'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [nghi_phep_dto_1.TaoLoaiNghiDto, Object]),
    __metadata("design:returntype", Promise)
], NghiPhepController.prototype, "taoLoaiNghi", null);
__decorate([
    (0, common_1.Put)('loai-nghi/:id'),
    (0, quyen_decorator_1.Quyen)('NGHI_PHEP_ADMIN'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, nghi_phep_dto_1.CapNhatLoaiNghiDto, Object]),
    __metadata("design:returntype", Promise)
], NghiPhepController.prototype, "capNhatLoaiNghi", null);
__decorate([
    (0, common_1.Post)('loai-nghi/:id/toggle'),
    (0, quyen_decorator_1.Quyen)('NGHI_PHEP_ADMIN'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], NghiPhepController.prototype, "toggleLoaiNghi", null);
__decorate([
    (0, common_1.Get)('don'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [nghi_phep_dto_1.LocDonNghiPhepDto]),
    __metadata("design:returntype", Promise)
], NghiPhepController.prototype, "layDanhSachDon", null);
__decorate([
    (0, common_1.Get)('don/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], NghiPhepController.prototype, "layChiTietDon", null);
__decorate([
    (0, common_1.Post)('don'),
    (0, quyen_decorator_1.Quyen)('NGHI_PHEP_TAO_DON'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [nghi_phep_dto_1.TaoDonNghiPhepDto, Object]),
    __metadata("design:returntype", Promise)
], NghiPhepController.prototype, "taoDonNghiPhep", null);
__decorate([
    (0, common_1.Put)('don/:id'),
    (0, quyen_decorator_1.Quyen)('NGHI_PHEP_SUA_DON'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, nghi_phep_dto_1.CapNhatDonNghiPhepDto, Object]),
    __metadata("design:returntype", Promise)
], NghiPhepController.prototype, "capNhatDonNghiPhep", null);
__decorate([
    (0, common_1.Post)('don/:id/gui-duyet'),
    (0, quyen_decorator_1.Quyen)('NGHI_PHEP_GUI_DUYET'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], NghiPhepController.prototype, "guiDuyet", null);
__decorate([
    (0, common_1.Post)('don/:id/duyet'),
    (0, quyen_decorator_1.Quyen)('NGHI_PHEP_DUYET'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, nghi_phep_dto_1.DuyetDonNghiPhepDto, Object]),
    __metadata("design:returntype", Promise)
], NghiPhepController.prototype, "duyetDon", null);
__decorate([
    (0, common_1.Post)('don/:id/tu-choi'),
    (0, quyen_decorator_1.Quyen)('NGHI_PHEP_DUYET'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, nghi_phep_dto_1.TuChoiDonNghiPhepDto, Object]),
    __metadata("design:returntype", Promise)
], NghiPhepController.prototype, "tuChoiDon", null);
__decorate([
    (0, common_1.Post)('don/:id/huy'),
    (0, quyen_decorator_1.Quyen)('NGHI_PHEP_HUY_DON'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, nghi_phep_dto_1.HuyDonNghiPhepDto, Object]),
    __metadata("design:returntype", Promise)
], NghiPhepController.prototype, "huyDon", null);
__decorate([
    (0, common_1.Post)('don/:id/mapping/rebuild'),
    (0, quyen_decorator_1.Quyen)('NGHI_PHEP_ADMIN'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], NghiPhepController.prototype, "rebuildMapping", null);
__decorate([
    (0, common_1.Get)('lich'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [nghi_phep_dto_1.LocLichNghiDto]),
    __metadata("design:returntype", Promise)
], NghiPhepController.prototype, "layLichNghi", null);
__decorate([
    (0, common_1.Get)('nhan-vien/:id/lich'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('tuNgay')),
    __param(2, (0, common_1.Query)('denNgay')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, String]),
    __metadata("design:returntype", Promise)
], NghiPhepController.prototype, "layLichNghiNhanVien", null);
exports.NghiPhepController = NghiPhepController = __decorate([
    (0, common_1.Controller)('nghi-phep'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [nghi_phep_service_1.NghiPhepService,
        nghi_phep_mapping_service_1.NghiPhepMappingService])
], NghiPhepController);
//# sourceMappingURL=nghi-phep.controller.js.map