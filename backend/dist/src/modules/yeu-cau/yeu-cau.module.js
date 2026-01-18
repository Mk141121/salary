"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.YeuCauModule = void 0;
const common_1 = require("@nestjs/common");
const yeu_cau_controller_1 = require("./yeu-cau.controller");
const yeu_cau_service_1 = require("./yeu-cau.service");
const prisma_module_1 = require("../../prisma/prisma.module");
let YeuCauModule = class YeuCauModule {
};
exports.YeuCauModule = YeuCauModule;
exports.YeuCauModule = YeuCauModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule],
        controllers: [yeu_cau_controller_1.YeuCauController],
        providers: [yeu_cau_service_1.YeuCauService],
        exports: [yeu_cau_service_1.YeuCauService],
    })
], YeuCauModule);
//# sourceMappingURL=yeu-cau.module.js.map