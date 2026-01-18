"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const crypto = require("crypto");
const prisma_service_1 = require("../../prisma/prisma.service");
const cong_khai_decorator_1 = require("../decorators/cong-khai.decorator");
let JwtAuthGuard = class JwtAuthGuard {
    constructor(reflector, prisma) {
        this.reflector = reflector;
        this.prisma = prisma;
    }
    hashToken(token) {
        return crypto.createHash('sha256').update(token).digest('hex');
    }
    async canActivate(context) {
        const congKhai = this.reflector.getAllAndOverride(cong_khai_decorator_1.CONG_KHAI_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (congKhai) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new common_1.UnauthorizedException('Yêu cầu đăng nhập để truy cập');
        }
        try {
            const tokenHash = this.hashToken(token);
            const phien = await this.prisma.phienDangNhap.findFirst({
                where: {
                    token: tokenHash,
                    trangThai: 'HOAT_DONG',
                    thoiGianHetHan: {
                        gt: new Date(),
                    },
                },
                include: {
                    nguoiDung: {
                        include: {
                            vaiTros: {
                                include: {
                                    vaiTro: {
                                        include: {
                                            quyens: {
                                                include: {
                                                    quyen: true,
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            });
            if (!phien) {
                throw new common_1.UnauthorizedException('Phiên đăng nhập không hợp lệ hoặc đã hết hạn');
            }
            if (phien.nguoiDung.trangThai !== 'HOAT_DONG') {
                throw new common_1.UnauthorizedException('Tài khoản đã bị khóa hoặc vô hiệu hóa');
            }
            const vaiTros = [];
            const quyens = [];
            for (const ndvt of phien.nguoiDung.vaiTros) {
                vaiTros.push(ndvt.vaiTro.maVaiTro);
                for (const vtq of ndvt.vaiTro.quyens) {
                    if (!quyens.includes(vtq.quyen.maQuyen)) {
                        quyens.push(vtq.quyen.maQuyen);
                    }
                }
            }
            request.nguoiDung = {
                id: phien.nguoiDung.id,
                tenDangNhap: phien.nguoiDung.tenDangNhap,
                hoTen: phien.nguoiDung.hoTen,
                email: phien.nguoiDung.email,
                vaiTros,
                quyens,
            };
            request.user = request.nguoiDung;
            return true;
        }
        catch (error) {
            if (error instanceof common_1.UnauthorizedException) {
                throw error;
            }
            throw new common_1.UnauthorizedException('Lỗi xác thực');
        }
    }
    extractTokenFromHeader(request) {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
};
exports.JwtAuthGuard = JwtAuthGuard;
exports.JwtAuthGuard = JwtAuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector,
        prisma_service_1.PrismaService])
], JwtAuthGuard);
//# sourceMappingURL=jwt-auth.guard.js.map