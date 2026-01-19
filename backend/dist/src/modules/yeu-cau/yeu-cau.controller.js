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
exports.YeuCauController = void 0;
const common_1 = require("@nestjs/common");
const yeu_cau_service_1 = require("./yeu-cau.service");
const yeu_cau_dto_1 = require("./yeu-cau.dto");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const quyen_decorator_1 = require("../../common/decorators/quyen.decorator");
let YeuCauController = class YeuCauController {
    constructor(yeuCauService) {
        this.yeuCauService = yeuCauService;
    }
    async layDanhSachLoaiYeuCau(all) {
        const chiActive = all !== 'true';
        return this.yeuCauService.layDanhSachLoaiYeuCau(chiActive);
    }
    async layLoaiYeuCau(id) {
        return this.yeuCauService.layLoaiYeuCau(id);
    }
    async taoLoaiYeuCau(dto, req) {
        return this.yeuCauService.taoLoaiYeuCau(dto, req.user?.id);
    }
    async capNhatLoaiYeuCau(id, dto, req) {
        return this.yeuCauService.capNhatLoaiYeuCau(id, dto, req.user?.id);
    }
    async toggleLoaiYeuCau(id, req) {
        return this.yeuCauService.toggleLoaiYeuCau(id, req.user?.id);
    }
    async layDanhSachDon(filter) {
        return this.yeuCauService.layDanhSachDon(filter);
    }
    async layDonCuaToi(filter, req) {
        const nhanVienId = req.user?.nhanVienId;
        if (!nhanVienId)
            return { data: [], pagination: { page: 1, limit: 20, total: 0, totalPages: 0 } };
        return this.yeuCauService.layDanhSachDon({ ...filter, nhanVienId });
    }
    async layYeuCauCuaToi(trangThai, req) {
        const nhanVienId = req.user?.nhanVienId;
        if (!nhanVienId)
            return { data: [] };
        let mappedTrangThai;
        if (trangThai === 'CHO_DUYET') {
            mappedTrangThai = ['CHO_DUYET_1', 'CHO_DUYET_2', 'NHAP'];
        }
        else if (trangThai === 'DA_DUYET') {
            mappedTrangThai = trangThai;
        }
        else if (trangThai === 'TU_CHOI') {
            mappedTrangThai = ['TU_CHOI_1', 'TU_CHOI_2'];
        }
        const result = await this.yeuCauService.layDanhSachDonPortal(nhanVienId, mappedTrangThai);
        return { data: result || [] };
    }
    async layChiTietDon(id) {
        return this.yeuCauService.layChiTietDon(id);
    }
    async taoDon(dto, req) {
        return this.yeuCauService.taoDon(dto, req.user?.id);
    }
    async capNhatDon(id, dto, req) {
        return this.yeuCauService.capNhatDon(id, dto, req.user?.id);
    }
    async guiDuyet(id, req) {
        return this.yeuCauService.guiDuyet(id, req.user?.id);
    }
    async duyetCap1(id, dto, req) {
        return this.yeuCauService.duyetCap1(id, dto, req.user?.id);
    }
    async duyetCap2(id, dto, req) {
        return this.yeuCauService.duyetCap2(id, dto, req.user?.id);
    }
    async tuChoiCap1(id, dto, req) {
        return this.yeuCauService.tuChoi(id, dto, req.user?.id, 1);
    }
    async tuChoiCap2(id, dto, req) {
        return this.yeuCauService.tuChoi(id, dto, req.user?.id, 2);
    }
    async override(id, dto, req) {
        return this.yeuCauService.override(id, dto, req.user?.id);
    }
    async huyDon(id, req) {
        return this.yeuCauService.huyDon(id, req.user?.id);
    }
    async layInboxCap1(filter, req) {
        return this.yeuCauService.layInboxDuyetCap1(req.user?.id, filter);
    }
    async layInboxCap2(filter, req) {
        return this.yeuCauService.layInboxDuyetCap2(req.user?.id, filter);
    }
    async duyetBatch(body, req) {
        return this.yeuCauService.duyetBatch(body.ids, req.user?.id, body.cap, body.ghiChu);
    }
    async layDanhSachWorkflowConfig(loaiYeuCauId, phongBanId) {
        return this.yeuCauService.layDanhSachWorkflowConfig(loaiYeuCauId ? parseInt(loaiYeuCauId, 10) : undefined, phongBanId ? parseInt(phongBanId, 10) : undefined);
    }
    async taoWorkflowConfig(dto, req) {
        return this.yeuCauService.taoWorkflowConfig(dto, req.user?.id);
    }
    async capNhatWorkflowConfig(id, dto, req) {
        return this.yeuCauService.capNhatWorkflowConfig(id, dto, req.user?.id);
    }
};
exports.YeuCauController = YeuCauController;
__decorate([
    (0, common_1.Get)('loai'),
    __param(0, (0, common_1.Query)('all')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], YeuCauController.prototype, "layDanhSachLoaiYeuCau", null);
__decorate([
    (0, common_1.Get)('loai/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], YeuCauController.prototype, "layLoaiYeuCau", null);
__decorate([
    (0, common_1.Post)('loai'),
    (0, quyen_decorator_1.Quyen)('YEU_CAU_ADMIN'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [yeu_cau_dto_1.TaoLoaiYeuCauDto, Object]),
    __metadata("design:returntype", Promise)
], YeuCauController.prototype, "taoLoaiYeuCau", null);
__decorate([
    (0, common_1.Put)('loai/:id'),
    (0, quyen_decorator_1.Quyen)('YEU_CAU_ADMIN'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, yeu_cau_dto_1.CapNhatLoaiYeuCauDto, Object]),
    __metadata("design:returntype", Promise)
], YeuCauController.prototype, "capNhatLoaiYeuCau", null);
__decorate([
    (0, common_1.Post)('loai/:id/toggle'),
    (0, quyen_decorator_1.Quyen)('YEU_CAU_ADMIN'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], YeuCauController.prototype, "toggleLoaiYeuCau", null);
__decorate([
    (0, common_1.Get)('don'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [yeu_cau_dto_1.LocDonYeuCauDto]),
    __metadata("design:returntype", Promise)
], YeuCauController.prototype, "layDanhSachDon", null);
__decorate([
    (0, common_1.Get)('don/cua-toi'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [yeu_cau_dto_1.LocDonYeuCauDto, Object]),
    __metadata("design:returntype", Promise)
], YeuCauController.prototype, "layDonCuaToi", null);
__decorate([
    (0, common_1.Get)('my-requests'),
    __param(0, (0, common_1.Query)('trangThai')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], YeuCauController.prototype, "layYeuCauCuaToi", null);
__decorate([
    (0, common_1.Get)('don/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], YeuCauController.prototype, "layChiTietDon", null);
__decorate([
    (0, common_1.Post)('don'),
    (0, quyen_decorator_1.Quyen)('YEU_CAU_TAO_DON'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [yeu_cau_dto_1.TaoDonYeuCauDto, Object]),
    __metadata("design:returntype", Promise)
], YeuCauController.prototype, "taoDon", null);
__decorate([
    (0, common_1.Put)('don/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, yeu_cau_dto_1.CapNhatDonYeuCauDto, Object]),
    __metadata("design:returntype", Promise)
], YeuCauController.prototype, "capNhatDon", null);
__decorate([
    (0, common_1.Post)('don/:id/gui-duyet'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], YeuCauController.prototype, "guiDuyet", null);
__decorate([
    (0, common_1.Post)('don/:id/duyet-cap-1'),
    (0, quyen_decorator_1.Quyen)('YEU_CAU_DUYET_CAP_1'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, yeu_cau_dto_1.DuyetDonYeuCauDto, Object]),
    __metadata("design:returntype", Promise)
], YeuCauController.prototype, "duyetCap1", null);
__decorate([
    (0, common_1.Post)('don/:id/duyet-cap-2'),
    (0, quyen_decorator_1.Quyen)('YEU_CAU_DUYET_CAP_2'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, yeu_cau_dto_1.DuyetDonYeuCauDto, Object]),
    __metadata("design:returntype", Promise)
], YeuCauController.prototype, "duyetCap2", null);
__decorate([
    (0, common_1.Post)('don/:id/tu-choi-cap-1'),
    (0, quyen_decorator_1.Quyen)('YEU_CAU_DUYET_CAP_1'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, yeu_cau_dto_1.TuChoiDonYeuCauDto, Object]),
    __metadata("design:returntype", Promise)
], YeuCauController.prototype, "tuChoiCap1", null);
__decorate([
    (0, common_1.Post)('don/:id/tu-choi-cap-2'),
    (0, quyen_decorator_1.Quyen)('YEU_CAU_DUYET_CAP_2'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, yeu_cau_dto_1.TuChoiDonYeuCauDto, Object]),
    __metadata("design:returntype", Promise)
], YeuCauController.prototype, "tuChoiCap2", null);
__decorate([
    (0, common_1.Post)('don/:id/override'),
    (0, quyen_decorator_1.Quyen)('YEU_CAU_OVERRIDE'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, yeu_cau_dto_1.OverrideDonYeuCauDto, Object]),
    __metadata("design:returntype", Promise)
], YeuCauController.prototype, "override", null);
__decorate([
    (0, common_1.Post)('don/:id/huy'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], YeuCauController.prototype, "huyDon", null);
__decorate([
    (0, common_1.Get)('inbox/cap-1'),
    (0, quyen_decorator_1.Quyen)('YEU_CAU_DUYET_CAP_1'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [yeu_cau_dto_1.LocDonYeuCauDto, Object]),
    __metadata("design:returntype", Promise)
], YeuCauController.prototype, "layInboxCap1", null);
__decorate([
    (0, common_1.Get)('inbox/cap-2'),
    (0, quyen_decorator_1.Quyen)('YEU_CAU_DUYET_CAP_2'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [yeu_cau_dto_1.LocDonYeuCauDto, Object]),
    __metadata("design:returntype", Promise)
], YeuCauController.prototype, "layInboxCap2", null);
__decorate([
    (0, common_1.Post)('inbox/duyet-batch'),
    (0, quyen_decorator_1.Quyen)('YEU_CAU_DUYET_CAP_1'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], YeuCauController.prototype, "duyetBatch", null);
__decorate([
    (0, common_1.Get)('workflow-config'),
    (0, quyen_decorator_1.Quyen)('YEU_CAU_ADMIN'),
    __param(0, (0, common_1.Query)('loaiYeuCauId')),
    __param(1, (0, common_1.Query)('phongBanId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], YeuCauController.prototype, "layDanhSachWorkflowConfig", null);
__decorate([
    (0, common_1.Post)('workflow-config'),
    (0, quyen_decorator_1.Quyen)('YEU_CAU_ADMIN'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [yeu_cau_dto_1.TaoWorkflowConfigDto, Object]),
    __metadata("design:returntype", Promise)
], YeuCauController.prototype, "taoWorkflowConfig", null);
__decorate([
    (0, common_1.Put)('workflow-config/:id'),
    (0, quyen_decorator_1.Quyen)('YEU_CAU_ADMIN'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, yeu_cau_dto_1.CapNhatWorkflowConfigDto, Object]),
    __metadata("design:returntype", Promise)
], YeuCauController.prototype, "capNhatWorkflowConfig", null);
exports.YeuCauController = YeuCauController = __decorate([
    (0, common_1.Controller)('yeu-cau'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [yeu_cau_service_1.YeuCauService])
], YeuCauController);
//# sourceMappingURL=yeu-cau.controller.js.map