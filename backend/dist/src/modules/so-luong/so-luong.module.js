"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SoLuongModule = void 0;
const common_1 = require("@nestjs/common");
const so_luong_controller_1 = require("./so-luong.controller");
const so_luong_service_1 = require("./so-luong.service");
const prisma_module_1 = require("../../prisma/prisma.module");
let SoLuongModule = class SoLuongModule {
};
exports.SoLuongModule = SoLuongModule;
exports.SoLuongModule = SoLuongModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule],
        controllers: [so_luong_controller_1.SoLuongController],
        providers: [so_luong_service_1.SoLuongService],
        exports: [so_luong_service_1.SoLuongService],
    })
], SoLuongModule);
//# sourceMappingURL=so-luong.module.js.map