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
export class AppModule {}
