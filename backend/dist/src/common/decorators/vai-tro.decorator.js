"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VaiTro = exports.VAI_TRO_KEY = void 0;
const common_1 = require("@nestjs/common");
exports.VAI_TRO_KEY = 'vaiTro';
const VaiTro = (...vaiTros) => (0, common_1.SetMetadata)(exports.VAI_TRO_KEY, vaiTros);
exports.VaiTro = VaiTro;
//# sourceMappingURL=vai-tro.decorator.js.map