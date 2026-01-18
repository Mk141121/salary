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
exports.CaLamViecService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let CaLamViecService = class CaLamViecService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async layDanhSach(filter) {
        const where = {};
        if (filter.phongBanId !== undefined) {
            where.phongBanId = filter.phongBanId;
        }
        if (filter.trangThai !== undefined) {
            where.trangThai = filter.trangThai;
        }
        if (filter.isCaDem !== undefined) {
            where.isCaDem = filter.isCaDem;
        }
        if (filter.tuKhoa) {
            where.OR = [
                { maCa: { contains: filter.tuKhoa, mode: 'insensitive' } },
                { tenCa: { contains: filter.tuKhoa, mode: 'insensitive' } },
            ];
        }
        const danhSach = await this.prisma.caLamViec.findMany({
            where,
            orderBy: [{ trangThai: 'desc' }, { tenCa: 'asc' }],
        });
        return {
            data: danhSach,
            total: danhSach.length,
        };
    }
    async layChiTiet(id) {
        const ca = await this.prisma.caLamViec.findUnique({
            where: { id },
        });
        if (!ca) {
            throw new common_1.NotFoundException(`Không tìm thấy ca làm việc với ID: ${id}`);
        }
        return ca;
    }
    async layTheoMa(maCa) {
        return this.prisma.caLamViec.findUnique({
            where: { maCa },
        });
    }
    async tao(dto, nguoiTaoId) {
        const existing = await this.layTheoMa(dto.maCa);
        if (existing) {
            throw new common_1.ConflictException(`Mã ca "${dto.maCa}" đã tồn tại`);
        }
        if (dto.phongBanId) {
            const phongBan = await this.prisma.phongBan.findUnique({
                where: { id: dto.phongBanId },
            });
            if (!phongBan) {
                throw new common_1.NotFoundException(`Không tìm thấy phòng ban với ID: ${dto.phongBanId}`);
            }
        }
        const isCaDem = dto.isCaDem ?? this.kiemTraCaDem(dto.gioVao, dto.gioRa);
        const ca = await this.prisma.caLamViec.create({
            data: {
                maCa: dto.maCa,
                tenCa: dto.tenCa,
                gioVao: dto.gioVao,
                gioRa: dto.gioRa,
                nghiGiuaCaPhut: dto.nghiGiuaCaPhut ?? 60,
                graceInPhut: dto.graceInPhut ?? 5,
                graceLatePhut: dto.graceLatePhut ?? 5,
                isCaDem,
                phongBanId: dto.phongBanId,
                moTa: dto.moTa,
                mauHienThi: dto.mauHienThi,
                taoBoi: nguoiTaoId,
            },
        });
        return ca;
    }
    async capNhat(id, dto, nguoiCapNhatId) {
        await this.layChiTiet(id);
        if (dto.phongBanId) {
            const phongBan = await this.prisma.phongBan.findUnique({
                where: { id: dto.phongBanId },
            });
            if (!phongBan) {
                throw new common_1.NotFoundException(`Không tìm thấy phòng ban với ID: ${dto.phongBanId}`);
            }
        }
        let isCaDem = dto.isCaDem;
        if (dto.gioVao && dto.gioRa && isCaDem === undefined) {
            isCaDem = this.kiemTraCaDem(dto.gioVao, dto.gioRa);
        }
        const updated = await this.prisma.caLamViec.update({
            where: { id },
            data: {
                ...dto,
                isCaDem,
                capNhatBoi: nguoiCapNhatId,
            },
        });
        return updated;
    }
    async xoa(id) {
        await this.layChiTiet(id);
        const dangSuDung = await this.prisma.lichPhanCaChiTiet.count({
            where: { caLamViecId: id },
        });
        if (dangSuDung > 0) {
            throw new common_1.ConflictException(`Ca này đang được sử dụng trong ${dangSuDung} lịch phân ca. Không thể xóa.`);
        }
        await this.prisma.caLamViec.delete({
            where: { id },
        });
        return { message: 'Đã xóa ca làm việc thành công' };
    }
    async toggleTrangThai(id, nguoiCapNhatId) {
        const ca = await this.layChiTiet(id);
        const updated = await this.prisma.caLamViec.update({
            where: { id },
            data: {
                trangThai: !ca.trangThai,
                capNhatBoi: nguoiCapNhatId,
            },
        });
        return updated;
    }
    async layDanhSachActive(phongBanId) {
        const where = { trangThai: true };
        if (phongBanId) {
            where.OR = [{ phongBanId: null }, { phongBanId }];
        }
        return this.prisma.caLamViec.findMany({
            where,
            orderBy: { tenCa: 'asc' },
            select: {
                id: true,
                maCa: true,
                tenCa: true,
                gioVao: true,
                gioRa: true,
                isCaDem: true,
                mauHienThi: true,
            },
        });
    }
    tinhSoGioLam(gioVao, gioRa, nghiGiuaCaPhut, isCaDem) {
        const [vaoH, vaoM] = gioVao.split(':').map(Number);
        const [raH, raM] = gioRa.split(':').map(Number);
        let phutVao = vaoH * 60 + vaoM;
        let phutRa = raH * 60 + raM;
        if (isCaDem && phutRa < phutVao) {
            phutRa += 24 * 60;
        }
        const tongPhut = phutRa - phutVao - nghiGiuaCaPhut;
        return Math.max(0, tongPhut / 60);
    }
    kiemTraCaDem(gioVao, gioRa) {
        const [vaoH, vaoM] = gioVao.split(':').map(Number);
        const [raH, raM] = gioRa.split(':').map(Number);
        const phutVao = vaoH * 60 + vaoM;
        const phutRa = raH * 60 + raM;
        return phutRa < phutVao;
    }
};
exports.CaLamViecService = CaLamViecService;
exports.CaLamViecService = CaLamViecService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CaLamViecService);
//# sourceMappingURL=ca-lam-viec.service.js.map