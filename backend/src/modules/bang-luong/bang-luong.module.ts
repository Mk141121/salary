// Module Bảng Lương
import { Module, forwardRef } from '@nestjs/common';
import { BangLuongController } from './bang-luong.controller';
import { BangLuongService } from './bang-luong.service';
import { TinhLuongService } from './tinh-luong.service';
import { PhieuLuongService } from './phieu-luong.service';
import { NgayCongService } from './ngay-cong.service';
import { PhuCapNhanVienModule } from '../phu-cap-nhan-vien/phu-cap-nhan-vien.module';
import { BHXHThueModule } from '../bhxh-thue/bhxh-thue.module';
import { SnapshotDieuChinhModule } from '../snapshot-dieu-chinh/snapshot-dieu-chinh.module';
import { ChamCongModule } from '../cham-cong/cham-cong.module';
import { EmailModule } from '../email/email.module';
import { AuditLogService } from '../../common/services/audit-log.service';

@Module({
  imports: [
    PhuCapNhanVienModule,
    BHXHThueModule,
    SnapshotDieuChinhModule,
    ChamCongModule,
    EmailModule,
  ],
  controllers: [BangLuongController],
  providers: [BangLuongService, TinhLuongService, PhieuLuongService, NgayCongService, AuditLogService],
  exports: [BangLuongService, TinhLuongService, PhieuLuongService, NgayCongService],
})
export class BangLuongModule {}
