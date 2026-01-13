"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImportExcelModule = void 0;
const common_1 = require("@nestjs/common");
const import_excel_controller_1 = require("./import-excel.controller");
const import_excel_service_1 = require("./import-excel.service");
const bang_luong_module_1 = require("../bang-luong/bang-luong.module");
let ImportExcelModule = class ImportExcelModule {
};
exports.ImportExcelModule = ImportExcelModule;
exports.ImportExcelModule = ImportExcelModule = __decorate([
    (0, common_1.Module)({
        imports: [bang_luong_module_1.BangLuongModule],
        controllers: [import_excel_controller_1.ImportExcelController],
        providers: [import_excel_service_1.ImportExcelService],
        exports: [import_excel_service_1.ImportExcelService],
    })
], ImportExcelModule);
//# sourceMappingURL=import-excel.module.js.map