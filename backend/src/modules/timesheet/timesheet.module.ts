// Timesheet Module - Sprint 9
// Bảng công tháng + Sửa công/Giải trình
import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { TimesheetController } from './timesheet.controller';
import { TimesheetService } from './timesheet.service';

@Module({
  imports: [PrismaModule],
  controllers: [TimesheetController],
  providers: [TimesheetService],
  exports: [TimesheetService],
})
export class TimesheetModule {}
