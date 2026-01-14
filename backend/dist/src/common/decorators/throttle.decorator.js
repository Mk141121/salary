"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoThrottle = exports.ThrottleStrict = exports.ThrottleLogin = void 0;
const throttler_1 = require("@nestjs/throttler");
const ThrottleLogin = () => (0, throttler_1.Throttle)({ default: { limit: 5, ttl: 60000 } });
exports.ThrottleLogin = ThrottleLogin;
const ThrottleStrict = () => (0, throttler_1.Throttle)({ default: { limit: 3, ttl: 60000 } });
exports.ThrottleStrict = ThrottleStrict;
const NoThrottle = () => (0, throttler_1.SkipThrottle)();
exports.NoThrottle = NoThrottle;
//# sourceMappingURL=throttle.decorator.js.map