"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NghiPhepModule = void 0;
const common_1 = require("@nestjs/common");
const nghi_phep_controller_1 = require("./nghi-phep.controller");
const nghi_phep_service_1 = require("./nghi-phep.service");
const nghi_phep_mapping_service_1 = require("./nghi-phep-mapping.service");
const prisma_module_1 = require("../../prisma/prisma.module");
let NghiPhepModule = class NghiPhepModule {
};
exports.NghiPhepModule = NghiPhepModule;
exports.NghiPhepModule = NghiPhepModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule],
        controllers: [nghi_phep_controller_1.NghiPhepController],
        providers: [nghi_phep_service_1.NghiPhepService, nghi_phep_mapping_service_1.NghiPhepMappingService],
        exports: [nghi_phep_service_1.NghiPhepService, nghi_phep_mapping_service_1.NghiPhepMappingService],
    })
], NghiPhepModule);
//# sourceMappingURL=nghi-phep.module.js.map