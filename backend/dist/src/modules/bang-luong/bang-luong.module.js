"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BangLuongModule = void 0;
const common_1 = require("@nestjs/common");
const bang_luong_controller_1 = require("./bang-luong.controller");
const bang_luong_service_1 = require("./bang-luong.service");
const tinh_luong_service_1 = require("./tinh-luong.service");
const phieu_luong_service_1 = require("./phieu-luong.service");
const ngay_cong_service_1 = require("./ngay-cong.service");
const phu_cap_nhan_vien_module_1 = require("../phu-cap-nhan-vien/phu-cap-nhan-vien.module");
const bhxh_thue_module_1 = require("../bhxh-thue/bhxh-thue.module");
const snapshot_dieu_chinh_module_1 = require("../snapshot-dieu-chinh/snapshot-dieu-chinh.module");
const cham_cong_module_1 = require("../cham-cong/cham-cong.module");
const email_module_1 = require("../email/email.module");
let BangLuongModule = class BangLuongModule {
};
exports.BangLuongModule = BangLuongModule;
exports.BangLuongModule = BangLuongModule = __decorate([
    (0, common_1.Module)({
        imports: [
            phu_cap_nhan_vien_module_1.PhuCapNhanVienModule,
            bhxh_thue_module_1.BHXHThueModule,
            snapshot_dieu_chinh_module_1.SnapshotDieuChinhModule,
            cham_cong_module_1.ChamCongModule,
            email_module_1.EmailModule,
        ],
        controllers: [bang_luong_controller_1.BangLuongController],
        providers: [bang_luong_service_1.BangLuongService, tinh_luong_service_1.TinhLuongService, phieu_luong_service_1.PhieuLuongService, ngay_cong_service_1.NgayCongService],
        exports: [bang_luong_service_1.BangLuongService, tinh_luong_service_1.TinhLuongService, phieu_luong_service_1.PhieuLuongService, ngay_cong_service_1.NgayCongService],
    })
], BangLuongModule);
//# sourceMappingURL=bang-luong.module.js.map