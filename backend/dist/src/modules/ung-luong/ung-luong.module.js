"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UngLuongModule = void 0;
const common_1 = require("@nestjs/common");
const ung_luong_controller_1 = require("./ung-luong.controller");
const ung_luong_service_1 = require("./ung-luong.service");
const ung_luong_calculator_service_1 = require("./ung-luong-calculator.service");
const prisma_module_1 = require("../../prisma/prisma.module");
const audit_log_service_1 = require("../../common/services/audit-log.service");
let UngLuongModule = class UngLuongModule {
};
exports.UngLuongModule = UngLuongModule;
exports.UngLuongModule = UngLuongModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule],
        controllers: [ung_luong_controller_1.UngLuongController],
        providers: [ung_luong_service_1.UngLuongService, ung_luong_calculator_service_1.UngLuongCalculatorService, audit_log_service_1.AuditLogService],
        exports: [ung_luong_service_1.UngLuongService, ung_luong_calculator_service_1.UngLuongCalculatorService],
    })
], UngLuongModule);
//# sourceMappingURL=ung-luong.module.js.map