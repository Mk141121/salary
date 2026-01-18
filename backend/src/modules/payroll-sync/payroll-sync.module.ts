// Payroll Sync Module - Sprint 10
// Pipeline: Scheduling → Attendance → Timesheet → Payroll
import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { PayrollSyncController } from './payroll-sync.controller';
import { PayrollSyncService } from './payroll-sync.service';

@Module({
  imports: [PrismaModule],
  controllers: [PayrollSyncController],
  providers: [PayrollSyncService],
  exports: [PayrollSyncService],
})
export class PayrollSyncModule {}
