"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhanCaModule = void 0;
const common_1 = require("@nestjs/common");
const phan_ca_controller_1 = require("./phan-ca.controller");
const phan_ca_service_1 = require("./phan-ca.service");
const prisma_module_1 = require("../../prisma/prisma.module");
const ca_lam_viec_module_1 = require("../ca-lam-viec/ca-lam-viec.module");
let PhanCaModule = class PhanCaModule {
};
exports.PhanCaModule = PhanCaModule;
exports.PhanCaModule = PhanCaModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule, ca_lam_viec_module_1.CaLamViecModule],
        controllers: [phan_ca_controller_1.PhanCaController],
        providers: [phan_ca_service_1.PhanCaService],
        exports: [phan_ca_service_1.PhanCaService],
    })
], PhanCaModule);
//# sourceMappingURL=phan-ca.module.js.map