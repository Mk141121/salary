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
exports.TimesheetController = void 0;
const common_1 = require("@nestjs/common");
const timesheet_service_1 = require("./timesheet.service");
const timesheet_dto_1 = require("./timesheet.dto");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const nguoi_dung_hien_tai_decorator_1 = require("../../common/decorators/nguoi-dung-hien-tai.decorator");
let TimesheetController = class TimesheetController {
    constructor(timesheetService) {
        this.timesheetService = timesheetService;
    }
    async layBangCongThang(query) {
        return this.timesheetService.layBangCongThang(query);
    }
    async layBangCongNhanVien(id, thang, nam) {
        return this.timesheetService.layBangCongNhanVien(id, thang, nam);
    }
    async layThongKe(thang, nam, phongBanId) {
        const pbId = phongBanId ? parseInt(phongBanId, 10) : undefined;
        return this.timesheetService.layThongKeTimesheet(thang, nam, pbId);
    }
    async layDanhSachYeuCauSuaCong(query) {
        return this.timesheetService.layDanhSachYeuCauSuaCong(query);
    }
    async taoYeuCauSuaCong(dto, user) {
        return this.timesheetService.taoYeuCauSuaCong(dto, user.id);
    }
    async duyetYeuCauSuaCong(id, dto, user) {
        return this.timesheetService.duyetYeuCauSuaCong(id, dto, user.id);
    }
    async suaCongTrucTiep(dto, user) {
        return this.timesheetService.suaCongTrucTiep(dto, user.id);
    }
    async layLichSuSuaCong(query) {
        return this.timesheetService.layLichSuSuaCong(query);
    }
    async layLichSuSuaCongNhanVien(id, query) {
        return this.timesheetService.layLichSuSuaCong({
            ...query,
            nhanVienId: id,
        });
    }
};
exports.TimesheetController = TimesheetController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [timesheet_dto_1.TimesheetQueryDto]),
    __metadata("design:returntype", Promise)
], TimesheetController.prototype, "layBangCongThang", null);
__decorate([
    (0, common_1.Get)('nhan-vien/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('thang', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Query)('nam', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number]),
    __metadata("design:returntype", Promise)
], TimesheetController.prototype, "layBangCongNhanVien", null);
__decorate([
    (0, common_1.Get)('thong-ke'),
    __param(0, (0, common_1.Query)('thang', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('nam', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Query)('phongBanId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String]),
    __metadata("design:returntype", Promise)
], TimesheetController.prototype, "layThongKe", null);
__decorate([
    (0, common_1.Get)('yeu-cau-sua-cong'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [timesheet_dto_1.YeuCauSuaCongQueryDto]),
    __metadata("design:returntype", Promise)
], TimesheetController.prototype, "layDanhSachYeuCauSuaCong", null);
__decorate([
    (0, common_1.Post)('yeu-cau-sua-cong'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, nguoi_dung_hien_tai_decorator_1.NguoiDungHienTai)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [timesheet_dto_1.TaoYeuCauSuaCongDto, Object]),
    __metadata("design:returntype", Promise)
], TimesheetController.prototype, "taoYeuCauSuaCong", null);
__decorate([
    (0, common_1.Post)('yeu-cau-sua-cong/:id/duyet'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, nguoi_dung_hien_tai_decorator_1.NguoiDungHienTai)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, timesheet_dto_1.DuyetYeuCauSuaCongDto, Object]),
    __metadata("design:returntype", Promise)
], TimesheetController.prototype, "duyetYeuCauSuaCong", null);
__decorate([
    (0, common_1.Put)('sua-cong-truc-tiep'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, nguoi_dung_hien_tai_decorator_1.NguoiDungHienTai)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [timesheet_dto_1.SuaCongTrucTiepDto, Object]),
    __metadata("design:returntype", Promise)
], TimesheetController.prototype, "suaCongTrucTiep", null);
__decorate([
    (0, common_1.Get)('lich-su-sua-cong'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [timesheet_dto_1.LichSuSuaCongQueryDto]),
    __metadata("design:returntype", Promise)
], TimesheetController.prototype, "layLichSuSuaCong", null);
__decorate([
    (0, common_1.Get)('lich-su-sua-cong/nhan-vien/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, timesheet_dto_1.LichSuSuaCongQueryDto]),
    __metadata("design:returntype", Promise)
], TimesheetController.prototype, "layLichSuSuaCongNhanVien", null);
exports.TimesheetController = TimesheetController = __decorate([
    (0, common_1.Controller)('timesheet'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [timesheet_service_1.TimesheetService])
], TimesheetController);
//# sourceMappingURL=timesheet.controller.js.map