import { Module } from '@nestjs/common';
import { KPIService } from './kpi.service';
import { KPIController } from './kpi.controller';
import { KPIRuleEngineService } from './kpi-rule-engine.service';
import { KPIRuleEngineController } from './kpi-rule-engine.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [KPIController, KPIRuleEngineController],
  providers: [KPIService, KPIRuleEngineService],
  exports: [KPIService, KPIRuleEngineService],
})
export class KPIModule {}
