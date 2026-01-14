"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const throttler_1 = require("@nestjs/throttler");
const prisma_module_1 = require("./prisma/prisma.module");
const cache_module_1 = require("./common/cache/cache.module");
const guards_1 = require("./common/guards");
const audit_log_service_1 = require("./common/services/audit-log.service");
const phong_ban_module_1 = require("./modules/phong-ban/phong-ban.module");
const nhan_vien_module_1 = require("./modules/nhan-vien/nhan-vien.module");
const khoan_luong_module_1 = require("./modules/khoan-luong/khoan-luong.module");
const bang_luong_module_1 = require("./modules/bang-luong/bang-luong.module");
const import_excel_module_1 = require("./modules/import-excel/import-excel.module");
const phu_cap_nhan_vien_module_1 = require("./modules/phu-cap-nhan-vien/phu-cap-nhan-vien.module");
const bhxh_thue_module_1 = require("./modules/bhxh-thue/bhxh-thue.module");
const snapshot_dieu_chinh_module_1 = require("./modules/snapshot-dieu-chinh/snapshot-dieu-chinh.module");
const rule_engine_module_1 = require("./modules/rule-engine/rule-engine.module");
const cham_cong_module_1 = require("./modules/cham-cong/cham-cong.module");
const kpi_module_1 = require("./modules/kpi/kpi.module");
const rbac_module_1 = require("./modules/rbac/rbac.module");
const email_module_1 = require("./modules/email/email.module");
const thong_tin_cong_ty_module_1 = require("./modules/thong-tin-cong-ty/thong-tin-cong-ty.module");
const health_controller_1 = require("./health.controller");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            throttler_1.ThrottlerModule.forRoot([
                {
                    name: 'short',
                    ttl: 1000,
                    limit: 10,
                },
                {
                    name: 'medium',
                    ttl: 10000,
                    limit: 50,
                },
                {
                    name: 'long',
                    ttl: 60000,
                    limit: 100,
                },
            ]),
            cache_module_1.CacheModule,
            prisma_module_1.PrismaModule,
            phong_ban_module_1.PhongBanModule,
            nhan_vien_module_1.NhanVienModule,
            khoan_luong_module_1.KhoanLuongModule,
            bang_luong_module_1.BangLuongModule,
            import_excel_module_1.ImportExcelModule,
            phu_cap_nhan_vien_module_1.PhuCapNhanVienModule,
            bhxh_thue_module_1.BHXHThueModule,
            snapshot_dieu_chinh_module_1.SnapshotDieuChinhModule,
            rule_engine_module_1.RuleEngineModule,
            cham_cong_module_1.ChamCongModule,
            kpi_module_1.KPIModule,
            rbac_module_1.RBACModule,
            email_module_1.EmailModule,
            thong_tin_cong_ty_module_1.ThongTinCongTyModule,
        ],
        controllers: [health_controller_1.HealthController],
        providers: [
            {
                provide: core_1.APP_GUARD,
                useClass: throttler_1.ThrottlerGuard,
            },
            {
                provide: core_1.APP_GUARD,
                useClass: guards_1.JwtAuthGuard,
            },
            {
                provide: core_1.APP_GUARD,
                useClass: guards_1.RolesGuard,
            },
            {
                provide: core_1.APP_GUARD,
                useClass: guards_1.PermissionsGuard,
            },
            audit_log_service_1.AuditLogService,
        ],
        exports: [audit_log_service_1.AuditLogService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map