"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApprovalDashboardModule = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const config_1 = require("@nestjs/config");
const approval_dashboard_controller_1 = require("./approval-dashboard.controller");
const approval_dashboard_service_1 = require("./approval-dashboard.service");
const auto_escalation_service_1 = require("./auto-escalation.service");
const prisma_module_1 = require("../../prisma/prisma.module");
let ApprovalDashboardModule = class ApprovalDashboardModule {
};
exports.ApprovalDashboardModule = ApprovalDashboardModule;
exports.ApprovalDashboardModule = ApprovalDashboardModule = __decorate([
    (0, common_1.Module)({
        imports: [
            prisma_module_1.PrismaModule,
            schedule_1.ScheduleModule.forRoot(),
            config_1.ConfigModule,
        ],
        controllers: [approval_dashboard_controller_1.ApprovalDashboardController],
        providers: [approval_dashboard_service_1.ApprovalDashboardService, auto_escalation_service_1.AutoEscalationService],
        exports: [approval_dashboard_service_1.ApprovalDashboardService, auto_escalation_service_1.AutoEscalationService],
    })
], ApprovalDashboardModule);
//# sourceMappingURL=approval-dashboard.module.js.map