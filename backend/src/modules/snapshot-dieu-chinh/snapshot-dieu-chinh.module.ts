// Module Snapshot & Phiếu Điều Chỉnh
import { Module } from '@nestjs/common';
import { SnapshotDieuChinhService } from './snapshot-dieu-chinh.service';
import { SnapshotDieuChinhController } from './snapshot-dieu-chinh.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [SnapshotDieuChinhController],
  providers: [SnapshotDieuChinhService],
  exports: [SnapshotDieuChinhService],
})
export class SnapshotDieuChinhModule {}
