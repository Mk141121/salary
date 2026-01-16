// Module Ứng Lương
import { Module } from '@nestjs/common';
import { UngLuongController } from './ung-luong.controller';
import { UngLuongService } from './ung-luong.service';
import { UngLuongCalculatorService } from './ung-luong-calculator.service';
import { PrismaModule } from '../../prisma/prisma.module';
import { AuditLogService } from '../../common/services/audit-log.service';

@Module({
  imports: [PrismaModule],
  controllers: [UngLuongController],
  providers: [UngLuongService, UngLuongCalculatorService, AuditLogService],
  exports: [UngLuongService, UngLuongCalculatorService],
})
export class UngLuongModule {}
