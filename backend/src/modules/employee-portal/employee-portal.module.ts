// Module Employee Portal - Sprint 5
import { Module } from '@nestjs/common';
import { EmployeePortalController } from './employee-portal.controller';
import { EmployeePortalService } from './employee-portal.service';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [EmployeePortalController],
  providers: [EmployeePortalService],
  exports: [EmployeePortalService],
})
export class EmployeePortalModule {}
