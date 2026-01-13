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
exports.RuleEngineExecutorController = exports.SuKienThuongPhatController = exports.QuyCheRuleController = exports.QuyCheController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const quy_che_service_1 = require("./quy-che.service");
const quy_che_rule_service_1 = require("./quy-che-rule.service");
const su_kien_thuong_phat_service_1 = require("./su-kien-thuong-phat.service");
const rule_engine_executor_service_1 = require("./rule-engine-executor.service");
const quy_che_dto_1 = require("./dto/quy-che.dto");
const quy_che_rule_dto_1 = require("./dto/quy-che-rule.dto");
const su_kien_dto_1 = require("./dto/su-kien.dto");
const client_1 = require("@prisma/client");
let QuyCheController = class QuyCheController {
    constructor(quyCheService, quyCheRuleService) {
        this.quyCheService = quyCheService;
        this.quyCheRuleService = quyCheRuleService;
    }
    async layDanhSach(filter) {
        return this.quyCheService.layDanhSach(filter);
    }
    async layChiTiet(id) {
        return this.quyCheService.layChiTiet(id);
    }
    async tao(dto) {
        return this.quyCheService.tao(dto);
    }
    async capNhat(id, dto) {
        return this.quyCheService.capNhat(id, dto);
    }
    async nhanBan(id, dto) {
        return this.quyCheService.nhanBan(id, dto);
    }
    async kichHoat(id) {
        return this.quyCheService.kichHoat(id);
    }
    async ngung(id) {
        return this.quyCheService.ngung(id);
    }
    async xoa(id) {
        return this.quyCheService.xoa(id);
    }
    async layDanhSachRule(quyCheId) {
        return this.quyCheRuleService.layDanhSachTheoQuyChe(quyCheId);
    }
    async taoRule(quyCheId, dto) {
        return this.quyCheRuleService.tao({ ...dto, quyCheId });
    }
    async sapXepRule(quyCheId, dto) {
        return this.quyCheRuleService.sapXep(quyCheId, dto);
    }
};
exports.QuyCheController = QuyCheController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy danh sách quy chế' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [quy_che_dto_1.LocQuyCheDto]),
    __metadata("design:returntype", Promise)
], QuyCheController.prototype, "layDanhSach", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy chi tiết quy chế' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], QuyCheController.prototype, "layChiTiet", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Tạo quy chế mới' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [quy_che_dto_1.TaoQuyCheDto]),
    __metadata("design:returntype", Promise)
], QuyCheController.prototype, "tao", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Cập nhật quy chế' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, quy_che_dto_1.CapNhatQuyCheDto]),
    __metadata("design:returntype", Promise)
], QuyCheController.prototype, "capNhat", null);
__decorate([
    (0, common_1.Post)(':id/nhan-ban'),
    (0, swagger_1.ApiOperation)({ summary: 'Nhân bản quy chế (tạo phiên bản mới)' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, quy_che_dto_1.NhanBanQuyCheDto]),
    __metadata("design:returntype", Promise)
], QuyCheController.prototype, "nhanBan", null);
__decorate([
    (0, common_1.Post)(':id/kich-hoat'),
    (0, swagger_1.ApiOperation)({ summary: 'Kích hoạt quy chế' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], QuyCheController.prototype, "kichHoat", null);
__decorate([
    (0, common_1.Post)(':id/ngung'),
    (0, swagger_1.ApiOperation)({ summary: 'Ngưng quy chế' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], QuyCheController.prototype, "ngung", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Xóa quy chế (chỉ khi ở trạng thái Nháp)' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], QuyCheController.prototype, "xoa", null);
__decorate([
    (0, common_1.Get)(':quyCheId/rules'),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy danh sách rule của quy chế' }),
    __param(0, (0, common_1.Param)('quyCheId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], QuyCheController.prototype, "layDanhSachRule", null);
__decorate([
    (0, common_1.Post)(':quyCheId/rule'),
    (0, swagger_1.ApiOperation)({ summary: 'Thêm rule vào quy chế' }),
    __param(0, (0, common_1.Param)('quyCheId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], QuyCheController.prototype, "taoRule", null);
__decorate([
    (0, common_1.Put)(':quyCheId/sap-xep-rule'),
    (0, swagger_1.ApiOperation)({ summary: 'Sắp xếp thứ tự rule (drag-drop)' }),
    __param(0, (0, common_1.Param)('quyCheId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, quy_che_rule_dto_1.SapXepRuleDto]),
    __metadata("design:returntype", Promise)
], QuyCheController.prototype, "sapXepRule", null);
exports.QuyCheController = QuyCheController = __decorate([
    (0, swagger_1.ApiTags)('Quy chế lương'),
    (0, common_1.Controller)('quy-che-luong'),
    __metadata("design:paramtypes", [quy_che_service_1.QuyCheService,
        quy_che_rule_service_1.QuyCheRuleService])
], QuyCheController);
let QuyCheRuleController = class QuyCheRuleController {
    constructor(quyCheRuleService) {
        this.quyCheRuleService = quyCheRuleService;
    }
    async layChiTiet(id) {
        return this.quyCheRuleService.layChiTiet(id);
    }
    async capNhat(id, dto) {
        return this.quyCheRuleService.capNhat(id, dto);
    }
    async xoa(id) {
        return this.quyCheRuleService.xoa(id);
    }
    async validate(dto) {
        return this.quyCheRuleService.validate(dto);
    }
    async preview(dto) {
        return this.quyCheRuleService.preview(dto);
    }
};
exports.QuyCheRuleController = QuyCheRuleController;
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy chi tiết rule' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], QuyCheRuleController.prototype, "layChiTiet", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Cập nhật rule' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, quy_che_rule_dto_1.CapNhatQuyCheRuleDto]),
    __metadata("design:returntype", Promise)
], QuyCheRuleController.prototype, "capNhat", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Xóa rule (soft delete)' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], QuyCheRuleController.prototype, "xoa", null);
__decorate([
    (0, common_1.Post)('validate'),
    (0, swagger_1.ApiOperation)({ summary: 'Validate rule JSON' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [quy_che_rule_dto_1.ValidateRuleDto]),
    __metadata("design:returntype", Promise)
], QuyCheRuleController.prototype, "validate", null);
__decorate([
    (0, common_1.Post)('preview'),
    (0, swagger_1.ApiOperation)({ summary: 'Preview/Chạy thử rule' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [quy_che_rule_dto_1.PreviewRuleDto]),
    __metadata("design:returntype", Promise)
], QuyCheRuleController.prototype, "preview", null);
exports.QuyCheRuleController = QuyCheRuleController = __decorate([
    (0, swagger_1.ApiTags)('Quy chế Rule'),
    (0, common_1.Controller)('quy-che-rule'),
    __metadata("design:paramtypes", [quy_che_rule_service_1.QuyCheRuleService])
], QuyCheRuleController);
let SuKienThuongPhatController = class SuKienThuongPhatController {
    constructor(suKienService) {
        this.suKienService = suKienService;
    }
    async layDanhSach(filter) {
        return this.suKienService.layDanhSach(filter);
    }
    async layDanhMuc(loai) {
        return this.suKienService.layDanhMuc(loai);
    }
    async taoDanhMuc(dto) {
        return this.suKienService.taoDanhMuc(dto);
    }
    async khoiTaoDanhMucMau() {
        return this.suKienService.khoiTaoDanhMucMau();
    }
    async layChiTiet(id) {
        return this.suKienService.layChiTiet(id);
    }
    async tao(dto) {
        return this.suKienService.tao(dto);
    }
    async taoNhieu(dtos) {
        return this.suKienService.taoNhieu(dtos);
    }
    async capNhat(id, dto) {
        return this.suKienService.capNhat(id, dto);
    }
    async duyet(id, dto) {
        return this.suKienService.duyet(id, dto);
    }
    async duyetNhieu(dto) {
        return this.suKienService.duyetNhieu(dto);
    }
    async huy(id) {
        return this.suKienService.huy(id);
    }
    async thongKe(nhanVienId, thang, nam) {
        return this.suKienService.thongKeTheoNhanVien(nhanVienId, thang, nam);
    }
};
exports.SuKienThuongPhatController = SuKienThuongPhatController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy danh sách sự kiện' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [su_kien_dto_1.LocSuKienDto]),
    __metadata("design:returntype", Promise)
], SuKienThuongPhatController.prototype, "layDanhSach", null);
__decorate([
    (0, common_1.Get)('danh-muc'),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy danh mục sự kiện' }),
    (0, swagger_1.ApiQuery)({ name: 'loai', required: false, enum: client_1.LoaiSuKien }),
    __param(0, (0, common_1.Query)('loai')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SuKienThuongPhatController.prototype, "layDanhMuc", null);
__decorate([
    (0, common_1.Post)('danh-muc'),
    (0, swagger_1.ApiOperation)({ summary: 'Tạo danh mục sự kiện' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [su_kien_dto_1.TaoDanhMucSuKienDto]),
    __metadata("design:returntype", Promise)
], SuKienThuongPhatController.prototype, "taoDanhMuc", null);
__decorate([
    (0, common_1.Post)('khoi-tao-danh-muc-mau'),
    (0, swagger_1.ApiOperation)({ summary: 'Khởi tạo danh mục sự kiện mẫu' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SuKienThuongPhatController.prototype, "khoiTaoDanhMucMau", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy chi tiết sự kiện' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SuKienThuongPhatController.prototype, "layChiTiet", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Tạo sự kiện mới' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [su_kien_dto_1.TaoSuKienDto]),
    __metadata("design:returntype", Promise)
], SuKienThuongPhatController.prototype, "tao", null);
__decorate([
    (0, common_1.Post)('tao-nhieu'),
    (0, swagger_1.ApiOperation)({ summary: 'Tạo nhiều sự kiện (import)' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], SuKienThuongPhatController.prototype, "taoNhieu", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Cập nhật sự kiện' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, su_kien_dto_1.CapNhatSuKienDto]),
    __metadata("design:returntype", Promise)
], SuKienThuongPhatController.prototype, "capNhat", null);
__decorate([
    (0, common_1.Post)(':id/duyet'),
    (0, swagger_1.ApiOperation)({ summary: 'Duyệt sự kiện' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, su_kien_dto_1.DuyetSuKienDto]),
    __metadata("design:returntype", Promise)
], SuKienThuongPhatController.prototype, "duyet", null);
__decorate([
    (0, common_1.Post)('duyet-nhieu'),
    (0, swagger_1.ApiOperation)({ summary: 'Duyệt nhiều sự kiện' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [su_kien_dto_1.DuyetNhieuSuKienDto]),
    __metadata("design:returntype", Promise)
], SuKienThuongPhatController.prototype, "duyetNhieu", null);
__decorate([
    (0, common_1.Post)(':id/huy'),
    (0, swagger_1.ApiOperation)({ summary: 'Hủy sự kiện' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SuKienThuongPhatController.prototype, "huy", null);
__decorate([
    (0, common_1.Get)('thong-ke/:nhanVienId'),
    (0, swagger_1.ApiOperation)({ summary: 'Thống kê sự kiện theo nhân viên' }),
    (0, swagger_1.ApiQuery)({ name: 'thang', required: true }),
    (0, swagger_1.ApiQuery)({ name: 'nam', required: true }),
    __param(0, (0, common_1.Param)('nhanVienId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('thang', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Query)('nam', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number]),
    __metadata("design:returntype", Promise)
], SuKienThuongPhatController.prototype, "thongKe", null);
exports.SuKienThuongPhatController = SuKienThuongPhatController = __decorate([
    (0, swagger_1.ApiTags)('Sự kiện thưởng/phạt'),
    (0, common_1.Controller)('su-kien-thuong-phat'),
    __metadata("design:paramtypes", [su_kien_thuong_phat_service_1.SuKienThuongPhatService])
], SuKienThuongPhatController);
let RuleEngineExecutorController = class RuleEngineExecutorController {
    constructor(ruleEngineExecutor) {
        this.ruleEngineExecutor = ruleEngineExecutor;
    }
    async chayRuleEngine(id, nguoiThucHien) {
        return this.ruleEngineExecutor.chayRuleEngine(id, nguoiThucHien);
    }
    async xemTrace(id, nhanVienId) {
        return this.ruleEngineExecutor.xemTrace(id, nhanVienId ? parseInt(nhanVienId, 10) : undefined);
    }
};
exports.RuleEngineExecutorController = RuleEngineExecutorController;
__decorate([
    (0, common_1.Post)(':id/chay-rule-engine'),
    (0, swagger_1.ApiOperation)({ summary: 'Chạy Rule Engine cho bảng lương' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)('nguoiThucHien')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], RuleEngineExecutorController.prototype, "chayRuleEngine", null);
__decorate([
    (0, common_1.Get)(':id/rule-trace'),
    (0, swagger_1.ApiOperation)({ summary: 'Xem trace giải trình' }),
    (0, swagger_1.ApiQuery)({ name: 'nhanVienId', required: false }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('nhanVienId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], RuleEngineExecutorController.prototype, "xemTrace", null);
exports.RuleEngineExecutorController = RuleEngineExecutorController = __decorate([
    (0, swagger_1.ApiTags)('Rule Engine Executor'),
    (0, common_1.Controller)('bang-luong'),
    __metadata("design:paramtypes", [rule_engine_executor_service_1.RuleEngineExecutor])
], RuleEngineExecutorController);
//# sourceMappingURL=quy-che.controller.js.map