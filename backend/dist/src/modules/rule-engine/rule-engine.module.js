"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RuleEngineModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_module_1 = require("../../prisma/prisma.module");
const rule_engine_service_1 = require("./rule-engine.service");
const quy_che_service_1 = require("./quy-che.service");
const quy_che_rule_service_1 = require("./quy-che-rule.service");
const su_kien_thuong_phat_service_1 = require("./su-kien-thuong-phat.service");
const rule_engine_executor_service_1 = require("./rule-engine-executor.service");
const tro_ly_ai_service_1 = require("./tro-ly-ai.service");
const rule_engine_controller_1 = require("./rule-engine.controller");
const quy_che_controller_1 = require("./quy-che.controller");
const tro_ly_ai_controller_1 = require("./tro-ly-ai.controller");
let RuleEngineModule = class RuleEngineModule {
};
exports.RuleEngineModule = RuleEngineModule;
exports.RuleEngineModule = RuleEngineModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule],
        controllers: [
            rule_engine_controller_1.RuleEngineController,
            quy_che_controller_1.QuyCheController,
            quy_che_controller_1.QuyCheRuleController,
            quy_che_controller_1.SuKienThuongPhatController,
            quy_che_controller_1.RuleEngineExecutorController,
            tro_ly_ai_controller_1.TroLyAiController,
        ],
        providers: [
            rule_engine_service_1.RuleEngineService,
            quy_che_service_1.QuyCheService,
            quy_che_rule_service_1.QuyCheRuleService,
            su_kien_thuong_phat_service_1.SuKienThuongPhatService,
            rule_engine_executor_service_1.RuleEngineExecutor,
            tro_ly_ai_service_1.TroLyAiService,
        ],
        exports: [
            rule_engine_service_1.RuleEngineService,
            quy_che_service_1.QuyCheService,
            quy_che_rule_service_1.QuyCheRuleService,
            su_kien_thuong_phat_service_1.SuKienThuongPhatService,
            rule_engine_executor_service_1.RuleEngineExecutor,
            tro_ly_ai_service_1.TroLyAiService,
        ],
    })
], RuleEngineModule);
//# sourceMappingURL=rule-engine.module.js.map