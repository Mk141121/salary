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
exports.KhoanLuongService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let KhoanLuongService = class KhoanLuongService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async layTatCa() {
        return this.prisma.khoanLuong.findMany({
            where: { trangThai: true },
            orderBy: { thuTu: 'asc' },
        });
    }
    async layTheoLoai(loai) {
        return this.prisma.khoanLuong.findMany({
            where: {
                loai,
                trangThai: true,
            },
            orderBy: { thuTu: 'asc' },
        });
    }
    async layTheoId(id) {
        const khoanLuong = await this.prisma.khoanLuong.findUnique({
            where: { id },
            include: {
                _count: {
                    select: { chiTietBangLuongs: true, coCauLuongChiTiets: true },
                },
            },
        });
        if (!khoanLuong) {
            throw new common_1.NotFoundException(`Không tìm thấy khoản lương với ID: ${id}`);
        }
        return khoanLuong;
    }
    async layTheoMa(maKhoan) {
        const khoanLuong = await this.prisma.khoanLuong.findUnique({
            where: { maKhoan },
        });
        if (!khoanLuong) {
            throw new common_1.NotFoundException(`Không tìm thấy khoản lương với mã: ${maKhoan}`);
        }
        return khoanLuong;
    }
    async taoMoi(dto) {
        const existing = await this.prisma.khoanLuong.findUnique({
            where: { maKhoan: dto.maKhoan },
        });
        if (existing) {
            throw new common_1.ConflictException(`Mã khoản lương "${dto.maKhoan}" đã tồn tại`);
        }
        const maxThuTu = await this.prisma.khoanLuong.aggregate({
            _max: { thuTu: true },
        });
        return this.prisma.khoanLuong.create({
            data: {
                ...dto,
                thuTu: dto.thuTu ?? (maxThuTu._max.thuTu || 0) + 1,
            },
        });
    }
    async capNhat(id, dto) {
        await this.layTheoId(id);
        if (dto.maKhoan) {
            const existing = await this.prisma.khoanLuong.findFirst({
                where: {
                    maKhoan: dto.maKhoan,
                    id: { not: id },
                },
            });
            if (existing) {
                throw new common_1.ConflictException(`Mã khoản lương "${dto.maKhoan}" đã tồn tại`);
            }
        }
        return this.prisma.khoanLuong.update({
            where: { id },
            data: dto,
        });
    }
    async xoa(id) {
        const khoanLuong = await this.layTheoId(id);
        if (khoanLuong._count.chiTietBangLuongs > 0) {
            throw new common_1.ConflictException(`Không thể xóa khoản lương này vì đang được sử dụng trong ${khoanLuong._count.chiTietBangLuongs} bảng lương`);
        }
        return this.prisma.khoanLuong.update({
            where: { id },
            data: { trangThai: false },
        });
    }
    async capNhatThuTu(danhSach) {
        const updates = danhSach.map((item) => this.prisma.khoanLuong.update({
            where: { id: item.id },
            data: { thuTu: item.thuTu },
        }));
        return this.prisma.$transaction(updates);
    }
};
exports.KhoanLuongService = KhoanLuongService;
exports.KhoanLuongService = KhoanLuongService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], KhoanLuongService);
//# sourceMappingURL=khoan-luong.service.js.map