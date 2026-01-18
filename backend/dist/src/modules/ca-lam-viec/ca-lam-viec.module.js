"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CaLamViecModule = void 0;
const common_1 = require("@nestjs/common");
const ca_lam_viec_controller_1 = require("./ca-lam-viec.controller");
const ca_lam_viec_service_1 = require("./ca-lam-viec.service");
const prisma_module_1 = require("../../prisma/prisma.module");
let CaLamViecModule = class CaLamViecModule {
};
exports.CaLamViecModule = CaLamViecModule;
exports.CaLamViecModule = CaLamViecModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule],
        controllers: [ca_lam_viec_controller_1.CaLamViecController],
        providers: [ca_lam_viec_service_1.CaLamViecService],
        exports: [ca_lam_viec_service_1.CaLamViecService],
    })
], CaLamViecModule);
//# sourceMappingURL=ca-lam-viec.module.js.map