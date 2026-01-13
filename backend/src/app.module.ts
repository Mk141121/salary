// App Module - Module chính của ứng dụng
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { CacheModule } from './common/cache/cache.module';
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

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
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
  ],
})
export class AppModule {}
