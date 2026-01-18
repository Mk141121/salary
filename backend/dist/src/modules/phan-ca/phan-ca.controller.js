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
exports.PhanCaController = void 0;
const common_1 = require("@nestjs/common");
const phan_ca_service_1 = require("./phan-ca.service");
const phan_ca_dto_1 = require("./phan-ca.dto");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
let PhanCaController = class PhanCaController {
    constructor(phanCaService) {
        this.phanCaService = phanCaService;
    }
    async layDanhSach(filter) {
        return this.phanCaService.layDanhSach(filter);
    }
    async layCalendarView(dto) {
        return this.phanCaService.layCalendarView(dto);
    }
    async layLichCuaToi(tuNgay, denNgay, req) {
        const nhanVienId = req.user?.nhanVienId;
        if (!nhanVienId) {
            return [];
        }
        return this.phanCaService.layLichCuaToi(nhanVienId, tuNgay, denNgay);
    }
    async layChiTiet(id) {
        return this.phanCaService.layChiTiet(id);
    }
    async tao(dto, req) {
        return this.phanCaService.tao(dto, req.user?.id);
    }
    async capNhat(id, dto, req) {
        return this.phanCaService.capNhat(id, dto, req.user?.id);
    }
    async assignNgay(id, dto, req) {
        return this.phanCaService.assignNgay(id, dto, req.user?.id);
    }
    async assignBatch(id, dto, req) {
        return this.phanCaService.assignBatch(id, dto, req.user?.id);
    }
    async copyTuan(id, dto, req) {
        return this.phanCaService.copyTuan(id, dto, req.user?.id);
    }
    async publish(id, req) {
        return this.phanCaService.publish(id, req.user?.id);
    }
    async unpublish(id, req) {
        return this.phanCaService.unpublish(id, req.user?.id);
    }
    async xoa(id) {
        return this.phanCaService.xoa(id);
    }
    async xoaChiTiet(id, dto) {
        return this.phanCaService.xoaChiTiet(id, dto.chiTietIds);
    }
};
exports.PhanCaController = PhanCaController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [phan_ca_dto_1.LocLichPhanCaDto]),
    __metadata("design:returntype", Promise)
], PhanCaController.prototype, "layDanhSach", null);
__decorate([
    (0, common_1.Get)('calendar'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [phan_ca_dto_1.CalendarViewDto]),
    __metadata("design:returntype", Promise)
], PhanCaController.prototype, "layCalendarView", null);
__decorate([
    (0, common_1.Get)('lich-cua-toi'),
    __param(0, (0, common_1.Query)('tuNgay')),
    __param(1, (0, common_1.Query)('denNgay')),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], PhanCaController.prototype, "layLichCuaToi", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PhanCaController.prototype, "layChiTiet", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [phan_ca_dto_1.TaoLichPhanCaDto, Object]),
    __metadata("design:returntype", Promise)
], PhanCaController.prototype, "tao", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, phan_ca_dto_1.CapNhatLichPhanCaDto, Object]),
    __metadata("design:returntype", Promise)
], PhanCaController.prototype, "capNhat", null);
__decorate([
    (0, common_1.Post)(':id/assign'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, phan_ca_dto_1.ChiTietPhanCaNgayDto, Object]),
    __metadata("design:returntype", Promise)
], PhanCaController.prototype, "assignNgay", null);
__decorate([
    (0, common_1.Post)(':id/assign-batch'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, phan_ca_dto_1.AssignBatchDto, Object]),
    __metadata("design:returntype", Promise)
], PhanCaController.prototype, "assignBatch", null);
__decorate([
    (0, common_1.Post)(':id/copy-week'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, phan_ca_dto_1.CopyTuanDto, Object]),
    __metadata("design:returntype", Promise)
], PhanCaController.prototype, "copyTuan", null);
__decorate([
    (0, common_1.Post)(':id/publish'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], PhanCaController.prototype, "publish", null);
__decorate([
    (0, common_1.Post)(':id/unpublish'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], PhanCaController.prototype, "unpublish", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PhanCaController.prototype, "xoa", null);
__decorate([
    (0, common_1.Post)(':id/xoa-chi-tiet'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, phan_ca_dto_1.XoaPhanCaDto]),
    __metadata("design:returntype", Promise)
], PhanCaController.prototype, "xoaChiTiet", null);
exports.PhanCaController = PhanCaController = __decorate([
    (0, common_1.Controller)('phan-ca'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [phan_ca_service_1.PhanCaService])
], PhanCaController);
//# sourceMappingURL=phan-ca.controller.js.map