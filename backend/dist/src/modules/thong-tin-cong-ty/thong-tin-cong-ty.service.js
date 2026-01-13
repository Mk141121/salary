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
exports.ThongTinCongTyService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let ThongTinCongTyService = class ThongTinCongTyService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async layThongTinCongTy() {
        const thongTin = await this.prisma.thongTinCongTy.findFirst();
        if (!thongTin) {
            return this.prisma.thongTinCongTy.create({
                data: {
                    tenCongTy: 'Công ty chưa cấu hình',
                    maSoThue: '',
                    diaChi: '',
                    dienThoai: '',
                    email: '',
                    website: '',
                    logo: '',
                    nguoiDaiDien: '',
                    chucVuDaiDien: '',
                },
            });
        }
        return thongTin;
    }
    async capNhatThongTinCongTy(dto) {
        const existing = await this.prisma.thongTinCongTy.findFirst();
        if (existing) {
            return this.prisma.thongTinCongTy.update({
                where: { id: existing.id },
                data: {
                    ...dto,
                    ngayCapNhat: new Date(),
                },
            });
        }
        else {
            return this.prisma.thongTinCongTy.create({
                data: dto,
            });
        }
    }
    async capNhatLogo(logoPath) {
        const existing = await this.prisma.thongTinCongTy.findFirst();
        if (!existing) {
            throw new common_1.NotFoundException('Chưa có thông tin công ty');
        }
        return this.prisma.thongTinCongTy.update({
            where: { id: existing.id },
            data: {
                logo: logoPath,
                ngayCapNhat: new Date(),
            },
        });
    }
};
exports.ThongTinCongTyService = ThongTinCongTyService;
exports.ThongTinCongTyService = ThongTinCongTyService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ThongTinCongTyService);
//# sourceMappingURL=thong-tin-cong-ty.service.js.map