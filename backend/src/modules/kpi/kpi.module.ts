import { Module } from '@nestjs/common';
import { KPIService } from './kpi.service';
import { KPIController } from './kpi.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [KPIController],
  providers: [KPIService],
  exports: [KPIService],
})
export class KPIModule {}
