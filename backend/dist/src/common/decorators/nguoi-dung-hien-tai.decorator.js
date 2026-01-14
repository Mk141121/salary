"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NguoiDungHienTai = void 0;
const common_1 = require("@nestjs/common");
exports.NguoiDungHienTai = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const nguoiDung = request.nguoiDung;
    if (data) {
        return nguoiDung?.[data];
    }
    return nguoiDung;
});
//# sourceMappingURL=nguoi-dung-hien-tai.decorator.js.map