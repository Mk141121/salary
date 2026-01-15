"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SanLuongModule = void 0;
const common_1 = require("@nestjs/common");
const san_luong_controller_1 = require("./san-luong.controller");
const san_luong_service_1 = require("./san-luong.service");
const prisma_module_1 = require("../../prisma/prisma.module");
let SanLuongModule = class SanLuongModule {
};
exports.SanLuongModule = SanLuongModule;
exports.SanLuongModule = SanLuongModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule],
        controllers: [san_luong_controller_1.SanLuongController],
        providers: [san_luong_service_1.SanLuongService],
        exports: [san_luong_service_1.SanLuongService],
    })
], SanLuongModule);
//# sourceMappingURL=san-luong.module.js.map