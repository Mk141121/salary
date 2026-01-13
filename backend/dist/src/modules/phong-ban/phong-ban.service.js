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
exports.PhongBanService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let PhongBanService = class PhongBanService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async layTatCa() {
        return this.prisma.phongBan.findMany({
            where: { trangThai: true },
            include: {
                _count: {
                    select: { nhanViens: true },
                },
            },
            orderBy: { tenPhongBan: 'asc' },
        });
    }
    async layTheoId(id) {
        const phongBan = await this.prisma.phongBan.findUnique({
            where: { id },
            include: {
                nhanViens: {
                    where: { trangThai: 'DANG_LAM' },
                    orderBy: { hoTen: 'asc' },
                },
                coCauLuongs: {
                    include: {
                        chiTiets: {
                            include: {
                                khoanLuong: true,
                            },
                        },
                    },
                },
                _count: {
                    select: { nhanViens: true, bangLuongs: true },
                },
            },
        });
        if (!phongBan) {
            throw new common_1.NotFoundException(`Không tìm thấy phòng ban với ID: ${id}`);
        }
        return phongBan;
    }
    async taoMoi(dto) {
        return this.prisma.phongBan.create({
            data: dto,
        });
    }
    async capNhat(id, dto) {
        await this.layTheoId(id);
        return this.prisma.phongBan.update({
            where: { id },
            data: dto,
        });
    }
    async xoa(id) {
        await this.layTheoId(id);
        return this.prisma.phongBan.update({
            where: { id },
            data: { trangThai: false },
        });
    }
    async layNhanVienTheoPhongBan(id) {
        await this.layTheoId(id);
        return this.prisma.nhanVien.findMany({
            where: {
                phongBanId: id,
                trangThai: 'DANG_LAM',
            },
            orderBy: { hoTen: 'asc' },
        });
    }
};
exports.PhongBanService = PhongBanService;
exports.PhongBanService = PhongBanService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PhongBanService);
//# sourceMappingURL=phong-ban.service.js.map