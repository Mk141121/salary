/**
 * Scheduling Module - Xếp Ca
 * PRD-01: Module quản lý ca làm việc và phân ca
 */

import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { SchedulingController } from './scheduling.controller';
import { SchedulingService } from './scheduling.service';

@Module({
  imports: [PrismaModule],
  controllers: [SchedulingController],
  providers: [SchedulingService],
  exports: [SchedulingService],
})
export class SchedulingModule {}
