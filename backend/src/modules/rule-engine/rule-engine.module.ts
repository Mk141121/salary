// Module Rule Engine - Công thức tính lương động & Quy chế lương
import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';

// Services
import { RuleEngineService } from './rule-engine.service';
import { QuyCheService } from './quy-che.service';
import { QuyCheRuleService } from './quy-che-rule.service';
import { SuKienThuongPhatService } from './su-kien-thuong-phat.service';
import { RuleEngineExecutor } from './rule-engine-executor.service';
import { TroLyAiService } from './tro-ly-ai.service';

// Controllers
import { RuleEngineController } from './rule-engine.controller';
import {
  QuyCheController,
  QuyCheRuleController,
  SuKienThuongPhatController,
  RuleEngineExecutorController,
} from './quy-che.controller';
import { TroLyAiController } from './tro-ly-ai.controller';

@Module({
  imports: [PrismaModule],
  controllers: [
    RuleEngineController,
    QuyCheController,
    QuyCheRuleController,
    SuKienThuongPhatController,
    RuleEngineExecutorController,
    TroLyAiController,
  ],
  providers: [
    RuleEngineService,
    QuyCheService,
    QuyCheRuleService,
    SuKienThuongPhatService,
    RuleEngineExecutor,
    TroLyAiService,
  ],
  exports: [
    RuleEngineService,
    QuyCheService,
    QuyCheRuleService,
    SuKienThuongPhatService,
    RuleEngineExecutor,
    TroLyAiService,
  ],
})
export class RuleEngineModule {}
