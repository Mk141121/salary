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
exports.RBACController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const rbac_service_1 = require("./rbac.service");
const decorators_1 = require("../../common/decorators");
const rbac_dto_1 = require("./dto/rbac.dto");
let RBACController = class RBACController {
    constructor(rbacService) {
        this.rbacService = rbacService;
    }
    dangNhap(dto, ip, userAgent) {
        return this.rbacService.dangNhap(dto, ip, userAgent);
    }
    dangXuat(auth) {
        const token = auth?.replace('Bearer ', '');
        return this.rbacService.dangXuat(token);
    }
    kiemTraToken(auth) {
        const token = auth?.replace('Bearer ', '');
        return this.rbacService.kiemTraToken(token);
    }
    layDanhSachNguoiDung() {
        return this.rbacService.layDanhSachNguoiDung();
    }
    layNguoiDungTheoId(id) {
        return this.rbacService.layNguoiDungTheoId(id);
    }
    taoNguoiDung(dto) {
        return this.rbacService.taoNguoiDung(dto);
    }
    capNhatNguoiDung(id, dto) {
        return this.rbacService.capNhatNguoiDung(id, dto);
    }
    doiMatKhau(id, dto) {
        return this.rbacService.doiMatKhau(id, dto);
    }
    layDanhSachVaiTro() {
        return this.rbacService.layDanhSachVaiTro();
    }
    layVaiTroTheoId(id) {
        return this.rbacService.layVaiTroTheoId(id);
    }
    taoVaiTro(dto) {
        return this.rbacService.taoVaiTro(dto);
    }
    capNhatVaiTro(id, dto) {
        return this.rbacService.capNhatVaiTro(id, dto);
    }
    ganVaiTroChoNguoiDung(dto) {
        return this.rbacService.ganVaiTroChoNguoiDung(dto);
    }
    goVaiTroKhoiNguoiDung(dto) {
        return this.rbacService.goVaiTroKhoiNguoiDung(dto);
    }
    layDanhSachQuyen() {
        return this.rbacService.layDanhSachQuyen();
    }
    layQuyenTheoNhom() {
        return this.rbacService.layQuyenTheoNhom();
    }
    taoQuyen(dto) {
        return this.rbacService.taoQuyen(dto);
    }
    ganQuyenChoVaiTro(dto) {
        return this.rbacService.ganQuyenChoVaiTro(dto);
    }
    async kiemTraQuyen(nguoiDungId, maQuyen) {
        const coQuyen = await this.rbacService.kiemTraQuyen(nguoiDungId, maQuyen);
        return { coQuyen };
    }
    timKiemAuditLog(dto) {
        return this.rbacService.timKiemAuditLog(dto);
    }
    layAuditLogTheoNguoiDung(nguoiDungId, limit) {
        return this.rbacService.layAuditLogTheoNguoiDung(nguoiDungId, limit ? parseInt(limit) : 50);
    }
    layAuditLogTheoBanGhi(bangDuLieu, banGhiId) {
        return this.rbacService.layAuditLogTheoBanGhi(bangDuLieu, banGhiId);
    }
    khoiTaoQuyenMacDinh() {
        return this.rbacService.khoiTaoQuyenMacDinh();
    }
    khoiTaoVaiTroMacDinh() {
        return this.rbacService.khoiTaoVaiTroMacDinh();
    }
    khoiTaoAdminMacDinh() {
        return this.rbacService.khoiTaoAdminMacDinh();
    }
    async khoiTaoTatCa() {
        await this.rbacService.khoiTaoQuyenMacDinh();
        await this.rbacService.khoiTaoVaiTroMacDinh();
        const admin = await this.rbacService.khoiTaoAdminMacDinh();
        return {
            message: 'Đã khởi tạo xong Quyền, Vai trò và Admin',
            admin,
        };
    }
};
exports.RBACController = RBACController;
__decorate([
    (0, decorators_1.CongKhai)(),
    (0, decorators_1.ThrottleLogin)(),
    (0, common_1.Post)('dang-nhap'),
    (0, swagger_1.ApiOperation)({ summary: 'Đăng nhập' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Ip)()),
    __param(2, (0, common_1.Headers)('user-agent')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [rbac_dto_1.DangNhapDto, String, String]),
    __metadata("design:returntype", void 0)
], RBACController.prototype, "dangNhap", null);
__decorate([
    (0, common_1.Post)('dang-xuat'),
    (0, swagger_1.ApiOperation)({ summary: 'Đăng xuất' }),
    (0, swagger_1.ApiHeader)({ name: 'Authorization', description: 'Bearer token' }),
    __param(0, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RBACController.prototype, "dangXuat", null);
__decorate([
    (0, common_1.Get)('kiem-tra-token'),
    (0, swagger_1.ApiOperation)({ summary: 'Kiểm tra token' }),
    (0, swagger_1.ApiHeader)({ name: 'Authorization', description: 'Bearer token' }),
    __param(0, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RBACController.prototype, "kiemTraToken", null);
__decorate([
    (0, decorators_1.VaiTro)('ADMIN'),
    (0, common_1.Get)('nguoi-dung'),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy danh sách người dùng' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RBACController.prototype, "layDanhSachNguoiDung", null);
__decorate([
    (0, decorators_1.VaiTro)('ADMIN'),
    (0, common_1.Get)('nguoi-dung/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy thông tin người dùng' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], RBACController.prototype, "layNguoiDungTheoId", null);
__decorate([
    (0, decorators_1.VaiTro)('ADMIN'),
    (0, common_1.Post)('nguoi-dung'),
    (0, swagger_1.ApiOperation)({ summary: 'Tạo người dùng mới' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [rbac_dto_1.TaoNguoiDungDto]),
    __metadata("design:returntype", void 0)
], RBACController.prototype, "taoNguoiDung", null);
__decorate([
    (0, decorators_1.VaiTro)('ADMIN'),
    (0, common_1.Put)('nguoi-dung/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Cập nhật người dùng' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, rbac_dto_1.CapNhatNguoiDungDto]),
    __metadata("design:returntype", void 0)
], RBACController.prototype, "capNhatNguoiDung", null);
__decorate([
    (0, common_1.Put)('nguoi-dung/:id/doi-mat-khau'),
    (0, swagger_1.ApiOperation)({ summary: 'Đổi mật khẩu' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, rbac_dto_1.DoiMatKhauDto]),
    __metadata("design:returntype", void 0)
], RBACController.prototype, "doiMatKhau", null);
__decorate([
    (0, decorators_1.VaiTro)('ADMIN'),
    (0, common_1.Get)('vai-tro'),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy danh sách vai trò' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RBACController.prototype, "layDanhSachVaiTro", null);
__decorate([
    (0, decorators_1.VaiTro)('ADMIN'),
    (0, common_1.Get)('vai-tro/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy thông tin vai trò' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], RBACController.prototype, "layVaiTroTheoId", null);
__decorate([
    (0, decorators_1.VaiTro)('ADMIN'),
    (0, common_1.Post)('vai-tro'),
    (0, swagger_1.ApiOperation)({ summary: 'Tạo vai trò mới' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [rbac_dto_1.TaoVaiTroDto]),
    __metadata("design:returntype", void 0)
], RBACController.prototype, "taoVaiTro", null);
__decorate([
    (0, decorators_1.VaiTro)('ADMIN'),
    (0, common_1.Put)('vai-tro/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Cập nhật vai trò' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, rbac_dto_1.CapNhatVaiTroDto]),
    __metadata("design:returntype", void 0)
], RBACController.prototype, "capNhatVaiTro", null);
__decorate([
    (0, decorators_1.VaiTro)('ADMIN'),
    (0, common_1.Post)('vai-tro/gan'),
    (0, swagger_1.ApiOperation)({ summary: 'Gán vai trò cho người dùng' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [rbac_dto_1.GanVaiTroDto]),
    __metadata("design:returntype", void 0)
], RBACController.prototype, "ganVaiTroChoNguoiDung", null);
__decorate([
    (0, decorators_1.VaiTro)('ADMIN'),
    (0, common_1.Delete)('vai-tro/go'),
    (0, swagger_1.ApiOperation)({ summary: 'Gỡ vai trò khỏi người dùng' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [rbac_dto_1.GanVaiTroDto]),
    __metadata("design:returntype", void 0)
], RBACController.prototype, "goVaiTroKhoiNguoiDung", null);
__decorate([
    (0, decorators_1.VaiTro)('ADMIN'),
    (0, common_1.Get)('quyen'),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy danh sách quyền' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RBACController.prototype, "layDanhSachQuyen", null);
__decorate([
    (0, decorators_1.VaiTro)('ADMIN'),
    (0, common_1.Get)('quyen/theo-nhom'),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy quyền theo nhóm' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RBACController.prototype, "layQuyenTheoNhom", null);
__decorate([
    (0, decorators_1.VaiTro)('ADMIN'),
    (0, common_1.Post)('quyen'),
    (0, swagger_1.ApiOperation)({ summary: 'Tạo quyền mới' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [rbac_dto_1.TaoQuyenDto]),
    __metadata("design:returntype", void 0)
], RBACController.prototype, "taoQuyen", null);
__decorate([
    (0, decorators_1.VaiTro)('ADMIN'),
    (0, common_1.Post)('quyen/gan-cho-vai-tro'),
    (0, swagger_1.ApiOperation)({ summary: 'Gán quyền cho vai trò' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [rbac_dto_1.GanQuyenChoVaiTroDto]),
    __metadata("design:returntype", void 0)
], RBACController.prototype, "ganQuyenChoVaiTro", null);
__decorate([
    (0, decorators_1.VaiTro)('ADMIN'),
    (0, common_1.Get)('kiem-tra-quyen/:nguoiDungId/:maQuyen'),
    (0, swagger_1.ApiOperation)({ summary: 'Kiểm tra quyền của người dùng' }),
    __param(0, (0, common_1.Param)('nguoiDungId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('maQuyen')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], RBACController.prototype, "kiemTraQuyen", null);
__decorate([
    (0, decorators_1.VaiTro)('ADMIN'),
    (0, common_1.Get)('audit-log'),
    (0, swagger_1.ApiOperation)({ summary: 'Tìm kiếm audit log' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [rbac_dto_1.TimKiemAuditLogDto]),
    __metadata("design:returntype", void 0)
], RBACController.prototype, "timKiemAuditLog", null);
__decorate([
    (0, decorators_1.VaiTro)('ADMIN'),
    (0, common_1.Get)('audit-log/nguoi-dung/:nguoiDungId'),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy audit log theo người dùng' }),
    __param(0, (0, common_1.Param)('nguoiDungId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", void 0)
], RBACController.prototype, "layAuditLogTheoNguoiDung", null);
__decorate([
    (0, decorators_1.VaiTro)('ADMIN'),
    (0, common_1.Get)('audit-log/ban-ghi/:bangDuLieu/:banGhiId'),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy audit log theo bản ghi' }),
    __param(0, (0, common_1.Param)('bangDuLieu')),
    __param(1, (0, common_1.Param)('banGhiId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], RBACController.prototype, "layAuditLogTheoBanGhi", null);
__decorate([
    (0, decorators_1.CongKhai)(),
    (0, common_1.Post)('khoi-tao/quyen'),
    (0, swagger_1.ApiOperation)({ summary: 'Khởi tạo quyền mặc định' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RBACController.prototype, "khoiTaoQuyenMacDinh", null);
__decorate([
    (0, decorators_1.CongKhai)(),
    (0, common_1.Post)('khoi-tao/vai-tro'),
    (0, swagger_1.ApiOperation)({ summary: 'Khởi tạo vai trò mặc định' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RBACController.prototype, "khoiTaoVaiTroMacDinh", null);
__decorate([
    (0, decorators_1.CongKhai)(),
    (0, common_1.Post)('khoi-tao/admin'),
    (0, swagger_1.ApiOperation)({ summary: 'Khởi tạo admin mặc định' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RBACController.prototype, "khoiTaoAdminMacDinh", null);
__decorate([
    (0, decorators_1.CongKhai)(),
    (0, common_1.Post)('khoi-tao/tat-ca'),
    (0, swagger_1.ApiOperation)({ summary: 'Khởi tạo tất cả dữ liệu mặc định' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RBACController.prototype, "khoiTaoTatCa", null);
exports.RBACController = RBACController = __decorate([
    (0, swagger_1.ApiTags)('RBAC & Audit'),
    (0, common_1.Controller)('rbac'),
    __metadata("design:paramtypes", [rbac_service_1.RBACService])
], RBACController);
//# sourceMappingURL=rbac.controller.js.map