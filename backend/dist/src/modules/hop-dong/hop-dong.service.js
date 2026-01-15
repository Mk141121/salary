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
exports.HopDongService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let HopDongService = class HopDongService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async layDanhSachHopDong(nhanVienId) {
        return this.prisma.nhanVienHopDong.findMany({
            where: { nhanVienId },
            orderBy: { tuNgay: 'desc' },
        });
    }
    async layHopDongTheoId(id) {
        const hopDong = await this.prisma.nhanVienHopDong.findUnique({
            where: { id },
            include: {
                nhanVien: {
                    select: { maNhanVien: true, hoTen: true },
                },
            },
        });
        if (!hopDong) {
            throw new common_1.NotFoundException('Không tìm thấy hợp đồng');
        }
        return hopDong;
    }
    async layHopDongHieuLuc(nhanVienId, ngay) {
        return this.prisma.nhanVienHopDong.findFirst({
            where: {
                nhanVienId,
                trangThai: 'HIEU_LUC',
                tuNgay: { lte: ngay },
                OR: [{ denNgay: null }, { denNgay: { gte: ngay } }],
            },
            orderBy: { tuNgay: 'desc' },
        });
    }
    async taoHopDong(nhanVienId, dto, taoBoi) {
        const nhanVien = await this.prisma.nhanVien.findUnique({
            where: { id: nhanVienId },
        });
        if (!nhanVien) {
            throw new common_1.NotFoundException('Không tìm thấy nhân viên');
        }
        const tuNgay = new Date(dto.tuNgay);
        const denNgay = dto.denNgay ? new Date(dto.denNgay) : null;
        const overlap = await this.kiemTraOverlap(nhanVienId, tuNgay, denNgay);
        if (overlap) {
            throw new common_1.BadRequestException(`Thời gian hợp đồng bị trùng với hợp đồng từ ${overlap.tuNgay.toISOString().split('T')[0]} đến ${overlap.denNgay?.toISOString().split('T')[0] || 'vô thời hạn'}`);
        }
        return this.prisma.nhanVienHopDong.create({
            data: {
                nhanVienId,
                loaiHopDong: dto.loaiHopDong,
                tuNgay,
                denNgay,
                luongCoBan: dto.luongCoBan,
                luongDongBH: dto.luongDongBH,
                heSoLuong: dto.heSoLuong,
                ghiChu: dto.ghiChu,
                taoBoi,
            },
        });
    }
    async capNhatHopDong(id, dto) {
        const hopDong = await this.prisma.nhanVienHopDong.findUnique({
            where: { id },
        });
        if (!hopDong) {
            throw new common_1.NotFoundException('Không tìm thấy hợp đồng');
        }
        if (dto.tuNgay || dto.denNgay) {
            const tuNgay = dto.tuNgay ? new Date(dto.tuNgay) : hopDong.tuNgay;
            const denNgay = dto.denNgay ? new Date(dto.denNgay) : hopDong.denNgay;
            const overlap = await this.kiemTraOverlap(hopDong.nhanVienId, tuNgay, denNgay, id);
            if (overlap) {
                throw new common_1.BadRequestException(`Thời gian hợp đồng bị trùng với hợp đồng khác`);
            }
        }
        return this.prisma.nhanVienHopDong.update({
            where: { id },
            data: {
                loaiHopDong: dto.loaiHopDong,
                tuNgay: dto.tuNgay ? new Date(dto.tuNgay) : undefined,
                denNgay: dto.denNgay ? new Date(dto.denNgay) : undefined,
                luongCoBan: dto.luongCoBan,
                luongDongBH: dto.luongDongBH,
                heSoLuong: dto.heSoLuong,
                trangThai: dto.trangThai,
                ghiChu: dto.ghiChu,
            },
        });
    }
    async ngungHopDong(id, dto) {
        const hopDong = await this.prisma.nhanVienHopDong.findUnique({
            where: { id },
        });
        if (!hopDong) {
            throw new common_1.NotFoundException('Không tìm thấy hợp đồng');
        }
        if (hopDong.trangThai !== 'HIEU_LUC') {
            throw new common_1.BadRequestException('Hợp đồng không ở trạng thái hiệu lực');
        }
        const ngayKetThuc = new Date(dto.ngayKetThuc);
        if (ngayKetThuc < hopDong.tuNgay) {
            throw new common_1.BadRequestException('Ngày kết thúc không được trước ngày bắt đầu');
        }
        return this.prisma.nhanVienHopDong.update({
            where: { id },
            data: {
                denNgay: ngayKetThuc,
                trangThai: 'HET_HAN',
                ghiChu: dto.lyDo
                    ? `${hopDong.ghiChu || ''}\n[Ngừng sớm] ${dto.lyDo}`.trim()
                    : hopDong.ghiChu,
            },
        });
    }
    async xoaHopDong(id) {
        const hopDong = await this.prisma.nhanVienHopDong.findUnique({
            where: { id },
        });
        if (!hopDong) {
            throw new common_1.NotFoundException('Không tìm thấy hợp đồng');
        }
        return this.prisma.nhanVienHopDong.delete({
            where: { id },
        });
    }
    async kiemTraOverlap(nhanVienId, tuNgay, denNgay, excludeId) {
        const whereCondition = {
            nhanVienId,
            trangThai: { not: 'HUY_BO' },
        };
        if (excludeId) {
            whereCondition.id = { not: excludeId };
        }
        const hopDongs = await this.prisma.nhanVienHopDong.findMany({
            where: whereCondition,
        });
        for (const hd of hopDongs) {
            const hdDenNgay = hd.denNgay || new Date('9999-12-31');
            const newDenNgay = denNgay || new Date('9999-12-31');
            if (tuNgay <= hdDenNgay && newDenNgay >= hd.tuNgay) {
                return hd;
            }
        }
        return null;
    }
    async layLuongCoBanHieuLuc(nhanVienId, ngay) {
        const hopDong = await this.layHopDongHieuLuc(nhanVienId, ngay);
        if (!hopDong) {
            const nhanVien = await this.prisma.nhanVien.findUnique({
                where: { id: nhanVienId },
                select: { luongCoBan: true },
            });
            return Number(nhanVien?.luongCoBan || 0);
        }
        return Number(hopDong.luongCoBan);
    }
};
exports.HopDongService = HopDongService;
exports.HopDongService = HopDongService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], HopDongService);
//# sourceMappingURL=hop-dong.service.js.map