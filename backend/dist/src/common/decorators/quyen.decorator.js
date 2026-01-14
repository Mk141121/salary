"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Quyen = exports.QUYEN_KEY = void 0;
const common_1 = require("@nestjs/common");
exports.QUYEN_KEY = 'quyen';
const Quyen = (...quyens) => (0, common_1.SetMetadata)(exports.QUYEN_KEY, quyens);
exports.Quyen = Quyen;
//# sourceMappingURL=quyen.decorator.js.map