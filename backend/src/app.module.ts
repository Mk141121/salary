// App Module - Module chính của ứng dụng
import { Module, Global } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { PrismaModule } from './prisma/prisma.module';
import { CacheModule } from './common/cache/cache.module';
import { JwtAuthGuard, RolesGuard, PermissionsGuard } from './common/guards';
import { AuditLogService } from './common/services/audit-log.service';
import { PhongBanModule } from './modules/phong-ban/phong-ban.module';
import { NhanVienModule } from './modules/nhan-vien/nhan-vien.module';
import { KhoanLuongModule } from './modules/khoan-luong/khoan-luong.module';
import { BangLuongModule } from './modules/bang-luong/bang-luong.module';
import { ImportExcelModule } from './modules/import-excel/import-excel.module';
import { PhuCapNhanVienModule } from './modules/phu-cap-nhan-vien/phu-cap-nhan-vien.module';
import { BHXHThueModule } from './modules/bhxh-thue/bhxh-thue.module';
import { SnapshotDieuChinhModule } from './modules/snapshot-dieu-chinh/snapshot-dieu-chinh.module';
import { RuleEngineModule } from './modules/rule-engine/rule-engine.module';
import { ChamCongModule } from './modules/cham-cong/cham-cong.module';
import { KPIModule } from './modules/kpi/kpi.module';
import { RBACModule } from './modules/rbac/rbac.module';
import { EmailModule } from './modules/email/email.module';
import { ThongTinCongTyModule } from './modules/thong-tin-cong-ty/thong-tin-cong-ty.module';
import { SanLuongModule } from './modules/san-luong/san-luong.module';
import { HopDongModule } from './modules/hop-dong/hop-dong.module';
import { NganHangModule } from './modules/ngan-hang/ngan-hang.module';
import { NhomNhanVienModule } from './modules/nhom-nhan-vien/nhom-nhan-vien.module';
import { ThueBHModule } from './modules/thue-bh/thue-bh.module';
import { UngLuongModule } from './modules/ung-luong/ung-luong.module';
import { SoLuongModule } from './modules/so-luong/so-luong.module';
import { NghiPhepModule } from './modules/nghi-phep/nghi-phep.module';
import { CaLamViecModule } from './modules/ca-lam-viec/ca-lam-viec.module';
import { PhanCaModule } from './modules/phan-ca/phan-ca.module';
import { YeuCauModule } from './modules/yeu-cau/yeu-cau.module';
import { EmployeePortalModule } from './modules/employee-portal/employee-portal.module';
import { ThongBaoModule } from './modules/thong-bao/thong-bao.module';
import { AntiFraudModule } from './modules/anti-fraud/anti-fraud.module';
import { TimesheetModule } from './modules/timesheet/timesheet.module';
import { PayrollSyncModule } from './modules/payroll-sync/payroll-sync.module';
import { ReportsModule } from './modules/reports/reports.module';
import { ApprovalDashboardModule } from './modules/approval-dashboard/approval-dashboard.module';
import { HealthController } from './health.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // Rate limiting - chống brute force
    ThrottlerModule.forRoot([
      {
        name: 'short', // Cho API bình thường
        ttl: 1000,     // 1 giây
        limit: 10,     // Tối đa 10 requests/giây
      },
      {
        name: 'medium',
        ttl: 10000,    // 10 giây
        limit: 50,     // Tối đa 50 requests/10 giây
      },
      {
        name: 'long',
        ttl: 60000,    // 1 phút
        limit: 100,    // Tối đa 100 requests/phút
      },
    ]),
    CacheModule,
    PrismaModule,
    PhongBanModule,
    NhanVienModule,
    KhoanLuongModule,
    BangLuongModule,
    ImportExcelModule,
    PhuCapNhanVienModule,
    BHXHThueModule,
    SnapshotDieuChinhModule,
    RuleEngineModule,
    ChamCongModule,
    KPIModule,
    RBACModule,
    EmailModule,
    ThongTinCongTyModule,
    SanLuongModule,
    HopDongModule,
    NganHangModule,
    NhomNhanVienModule,
    ThueBHModule,
    UngLuongModule,
    SoLuongModule,
    NghiPhepModule,
    // Phase 2: Module Xếp Ca (Scheduling)
    CaLamViecModule,
    PhanCaModule,
    // Sprint 4: Module Yêu cầu (OT/Trễ/Sớm/Công tác)
    YeuCauModule,
    // Sprint 5: Employee Portal
    EmployeePortalModule,
    // Sprint 6: Thông báo (Notification)
    ThongBaoModule,
    // Sprint 7: Anti-fraud GPS + Geofence
    AntiFraudModule,
    // Sprint 9: Timesheet Management (Bảng công tháng + Sửa công)
    TimesheetModule,
    // Sprint 10: Payroll Sync Pipeline + Rule Trace
    PayrollSyncModule,
    // Sprint 11 & 12: Reports & Dashboard
    ReportsModule,
    // Sprint 13: Approval Dashboard & Auto-Escalation
    ApprovalDashboardModule,

  ],
  controllers: [HealthController],
  providers: [
    // Rate Limiting Guard - Áp dụng cho tất cả routes
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    // Global Guards - Áp dụng cho tất cả routes
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_GUARD,
      useClass: PermissionsGuard,
    },
    // Audit Log Service - Global provider
    AuditLogService,
  ],
  exports: [AuditLogService],
})
export class AppModule { }
