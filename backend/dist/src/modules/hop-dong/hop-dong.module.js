"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HopDongModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_module_1 = require("../../prisma/prisma.module");
const hop_dong_controller_1 = require("./hop-dong.controller");
const hop_dong_service_1 = require("./hop-dong.service");
let HopDongModule = class HopDongModule {
};
exports.HopDongModule = HopDongModule;
exports.HopDongModule = HopDongModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule],
        controllers: [hop_dong_controller_1.HopDongController],
        providers: [hop_dong_service_1.HopDongService],
        exports: [hop_dong_service_1.HopDongService],
    })
], HopDongModule);
//# sourceMappingURL=hop-dong.module.js.map