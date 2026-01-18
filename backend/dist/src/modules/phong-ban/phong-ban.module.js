"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhongBanModule = void 0;
const common_1 = require("@nestjs/common");
const phong_ban_controller_1 = require("./phong-ban.controller");
const phong_ban_service_1 = require("./phong-ban.service");
let PhongBanModule = class PhongBanModule {
};
exports.PhongBanModule = PhongBanModule;
exports.PhongBanModule = PhongBanModule = __decorate([
    (0, common_1.Module)({
        controllers: [
            phong_ban_controller_1.PhongBanController,
            phong_ban_controller_1.DonViConController,
            phong_ban_controller_1.NhanVienPhongBanController,
            phong_ban_controller_1.PhanQuyenPhongBanController,
        ],
        providers: [phong_ban_service_1.PhongBanService],
        exports: [phong_ban_service_1.PhongBanService],
    })
], PhongBanModule);
//# sourceMappingURL=phong-ban.module.js.map