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
exports.SnapshotDieuChinhController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const snapshot_dieu_chinh_service_1 = require("./snapshot-dieu-chinh.service");
const snapshot_dieu_chinh_dto_1 = require("./dto/snapshot-dieu-chinh.dto");
const client_1 = require("@prisma/client");
const common_2 = require("../../common");
let SnapshotDieuChinhController = class SnapshotDieuChinhController {
    constructor(service) {
        this.service = service;
    }
    async taoSnapshot(bangLuongId, dto) {
        return this.service.taoSnapshot(bangLuongId, dto.nguoiChot);
    }
    async laySnapshot(bangLuongId) {
        return this.service.laySnapshot(bangLuongId);
    }
    async soSanhSnapshot(bangLuongId) {
        return this.service.soSanhSnapshot(bangLuongId);
    }
    async taoPhieuDieuChinh(dto) {
        return this.service.taoPhieuDieuChinh(dto);
    }
    async layDanhSachPhieu(bangLuongId, trangThai) {
        return this.service.layDanhSachPhieu(bangLuongId ? parseInt(bangLuongId, 10) : undefined, trangThai);
    }
    async layChiTietPhieu(id) {
        return this.service.layChiTietPhieu(id);
    }
    async duyetPhieu(id, dto) {
        return this.service.duyetPhieu(id, dto.nguoiDuyet);
    }
    async tuChoiPhieu(id, dto) {
        return this.service.tuChoiPhieu(id, dto.nguoiTuChoi, dto.lyDoTuChoi);
    }
    async huyPhieu(id) {
        return this.service.huyPhieu(id);
    }
};
exports.SnapshotDieuChinhController = SnapshotDieuChinhController;
__decorate([
    (0, common_1.Post)('snapshot/:bangLuongId'),
    (0, swagger_1.ApiOperation)({ summary: 'Tạo snapshot khi chốt bảng lương' }),
    __param(0, (0, common_1.Param)('bangLuongId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, snapshot_dieu_chinh_dto_1.TaoSnapshotDto]),
    __metadata("design:returntype", Promise)
], SnapshotDieuChinhController.prototype, "taoSnapshot", null);
__decorate([
    (0, common_1.Get)('snapshot/:bangLuongId'),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy snapshot của bảng lương' }),
    __param(0, (0, common_1.Param)('bangLuongId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SnapshotDieuChinhController.prototype, "laySnapshot", null);
__decorate([
    (0, common_1.Get)('snapshot/:bangLuongId/so-sanh'),
    (0, swagger_1.ApiOperation)({ summary: 'So sánh snapshot với dữ liệu hiện tại' }),
    __param(0, (0, common_1.Param)('bangLuongId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SnapshotDieuChinhController.prototype, "soSanhSnapshot", null);
__decorate([
    (0, common_1.Post)('phieu-dieu-chinh'),
    (0, swagger_1.ApiOperation)({ summary: 'Tạo phiếu điều chỉnh' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [snapshot_dieu_chinh_dto_1.TaoPhieuDieuChinhDto]),
    __metadata("design:returntype", Promise)
], SnapshotDieuChinhController.prototype, "taoPhieuDieuChinh", null);
__decorate([
    (0, common_1.Get)('phieu-dieu-chinh'),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy danh sách phiếu điều chỉnh' }),
    (0, swagger_1.ApiQuery)({ name: 'bangLuongId', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'trangThai', required: false, enum: client_1.TrangThaiPhieuDC }),
    __param(0, (0, common_1.Query)('bangLuongId')),
    __param(1, (0, common_1.Query)('trangThai')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], SnapshotDieuChinhController.prototype, "layDanhSachPhieu", null);
__decorate([
    (0, common_1.Get)('phieu-dieu-chinh/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy chi tiết phiếu điều chỉnh' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SnapshotDieuChinhController.prototype, "layChiTietPhieu", null);
__decorate([
    (0, common_1.Put)('phieu-dieu-chinh/:id/duyet'),
    (0, swagger_1.ApiOperation)({ summary: 'Duyệt phiếu điều chỉnh' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, snapshot_dieu_chinh_dto_1.DuyetPhieuDto]),
    __metadata("design:returntype", Promise)
], SnapshotDieuChinhController.prototype, "duyetPhieu", null);
__decorate([
    (0, common_1.Put)('phieu-dieu-chinh/:id/tu-choi'),
    (0, swagger_1.ApiOperation)({ summary: 'Từ chối phiếu điều chỉnh' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, snapshot_dieu_chinh_dto_1.TuChoiPhieuDto]),
    __metadata("design:returntype", Promise)
], SnapshotDieuChinhController.prototype, "tuChoiPhieu", null);
__decorate([
    (0, common_1.Put)('phieu-dieu-chinh/:id/huy'),
    (0, swagger_1.ApiOperation)({ summary: 'Hủy phiếu điều chỉnh' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SnapshotDieuChinhController.prototype, "huyPhieu", null);
exports.SnapshotDieuChinhController = SnapshotDieuChinhController = __decorate([
    (0, swagger_1.ApiTags)('Snapshot & Phiếu Điều Chỉnh'),
    (0, common_1.Controller)('snapshot-dieu-chinh'),
    (0, common_2.VaiTro)('ADMIN', 'KETOAN'),
    __metadata("design:paramtypes", [snapshot_dieu_chinh_service_1.SnapshotDieuChinhService])
], SnapshotDieuChinhController);
//# sourceMappingURL=snapshot-dieu-chinh.controller.js.map