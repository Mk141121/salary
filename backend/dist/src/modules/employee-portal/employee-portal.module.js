"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeePortalModule = void 0;
const common_1 = require("@nestjs/common");
const employee_portal_controller_1 = require("./employee-portal.controller");
const employee_portal_service_1 = require("./employee-portal.service");
const prisma_module_1 = require("../../prisma/prisma.module");
let EmployeePortalModule = class EmployeePortalModule {
};
exports.EmployeePortalModule = EmployeePortalModule;
exports.EmployeePortalModule = EmployeePortalModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule],
        controllers: [employee_portal_controller_1.EmployeePortalController],
        providers: [employee_portal_service_1.EmployeePortalService],
        exports: [employee_portal_service_1.EmployeePortalService],
    })
], EmployeePortalModule);
//# sourceMappingURL=employee-portal.module.js.map