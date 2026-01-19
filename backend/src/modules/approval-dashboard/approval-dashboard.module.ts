// Module Approval Dashboard - Quản lý duyệt tập trung
// Sprint 7 - Cải tiến quy trình duyệt
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule } from '@nestjs/config';
import { ApprovalDashboardController } from './approval-dashboard.controller';
import { ApprovalDashboardService } from './approval-dashboard.service';
import { AutoEscalationService } from './auto-escalation.service';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [
    PrismaModule,
    ScheduleModule.forRoot(),
    ConfigModule,
  ],
  controllers: [ApprovalDashboardController],
  providers: [ApprovalDashboardService, AutoEscalationService],
  exports: [ApprovalDashboardService, AutoEscalationService],
})
export class ApprovalDashboardModule {}
