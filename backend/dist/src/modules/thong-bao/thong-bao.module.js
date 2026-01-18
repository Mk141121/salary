"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThongBaoModule = void 0;
const common_1 = require("@nestjs/common");
const thong_bao_controller_1 = require("./thong-bao.controller");
const thong_bao_service_1 = require("./thong-bao.service");
const prisma_module_1 = require("../../prisma/prisma.module");
let ThongBaoModule = class ThongBaoModule {
};
exports.ThongBaoModule = ThongBaoModule;
exports.ThongBaoModule = ThongBaoModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule],
        controllers: [thong_bao_controller_1.ThongBaoController],
        providers: [thong_bao_service_1.ThongBaoService],
        exports: [thong_bao_service_1.ThongBaoService],
    })
], ThongBaoModule);
//# sourceMappingURL=thong-bao.module.js.map