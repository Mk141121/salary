"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThongTinCongTyModule = void 0;
const common_1 = require("@nestjs/common");
const thong_tin_cong_ty_controller_1 = require("./thong-tin-cong-ty.controller");
const thong_tin_cong_ty_service_1 = require("./thong-tin-cong-ty.service");
const prisma_module_1 = require("../../prisma/prisma.module");
let ThongTinCongTyModule = class ThongTinCongTyModule {
};
exports.ThongTinCongTyModule = ThongTinCongTyModule;
exports.ThongTinCongTyModule = ThongTinCongTyModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule],
        controllers: [thong_tin_cong_ty_controller_1.ThongTinCongTyController],
        providers: [thong_tin_cong_ty_service_1.ThongTinCongTyService],
        exports: [thong_tin_cong_ty_service_1.ThongTinCongTyService],
    })
], ThongTinCongTyModule);
//# sourceMappingURL=thong-tin-cong-ty.module.js.map