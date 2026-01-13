"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KhoanLuongModule = void 0;
const common_1 = require("@nestjs/common");
const khoan_luong_controller_1 = require("./khoan-luong.controller");
const khoan_luong_service_1 = require("./khoan-luong.service");
let KhoanLuongModule = class KhoanLuongModule {
};
exports.KhoanLuongModule = KhoanLuongModule;
exports.KhoanLuongModule = KhoanLuongModule = __decorate([
    (0, common_1.Module)({
        controllers: [khoan_luong_controller_1.KhoanLuongController],
        providers: [khoan_luong_service_1.KhoanLuongService],
        exports: [khoan_luong_service_1.KhoanLuongService],
    })
], KhoanLuongModule);
//# sourceMappingURL=khoan-luong.module.js.map