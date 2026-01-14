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
exports.QuyCheService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const client_1 = require("@prisma/client");
let QuyCheService = class QuyCheService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async layDanhSach(filter) {
        const where = {};
        if (filter.phongBanId) {
            where.phongBanId = filter.phongBanId;
        }
        if (filter.trangThai) {
            where.trangThai = filter.trangThai;
        }
        if (filter.thang && filter.nam) {
            const dauThang = new Date(filter.nam, filter.thang - 1, 1);
            const cuoiThang = new Date(filter.nam, filter.thang, 0);
            where.tuNgay = { lte: cuoiThang };
            where.OR = [
                { denNgay: null },
                { denNgay: { gte: dauThang } },
            ];
        }
        return this.prisma.quyChe.findMany({
            where,
            include: {
                phongBan: {
                    select: {
                        id: true,
                        maPhongBan: true,
                        tenPhongBan: true,
                    },
                },
                rules: {
                    orderBy: { thuTuUuTien: 'asc' },
                    include: {
                        khoanLuong: {
                            select: {
                                id: true,
                                maKhoan: true,
                                tenKhoan: true,
                                loai: true,
                            },
                        },
                    },
                },
                _count: {
                    select: {
                        rules: true,
                        bangLuongs: true,
                    },
                },
            },
            orderBy: [
                { phongBanId: 'asc' },
                { phienBan: 'desc' },
            ],
        });
    }
    async layChiTiet(id) {
        const quyChe = await this.prisma.quyChe.findUnique({
            where: { id },
            include: {
                phongBan: true,
                rules: {
                    where: { trangThai: true },
                    orderBy: { thuTuUuTien: 'asc' },
                    include: {
                        khoanLuong: true,
                    },
                },
                bangLuongs: {
                    include: {
                        bangLuong: {
                            select: {
                                id: true,
                                thang: true,
                                nam: true,
                                trangThai: true,
                            },
                        },
                    },
                },
            },
        });
        if (!quyChe) {
            throw new common_1.NotFoundException(`Không tìm thấy quy chế với ID: ${id}`);
        }
        const daChotLuong = quyChe.bangLuongs.some((bl) => bl.bangLuong.trangThai !== client_1.TrangThaiBangLuong.NHAP);
        return {
            ...quyChe,
            daChotLuong,
            coDuocSua: !daChotLuong || quyChe.trangThai === client_1.TrangThaiQuyChe.NHAP,
        };
    }
    async tao(dto) {
        const phongBan = await this.prisma.phongBan.findUnique({
            where: { id: dto.phongBanId },
        });
        if (!phongBan) {
            throw new common_1.NotFoundException(`Không tìm thấy phòng ban với ID: ${dto.phongBanId}`);
        }
        await this.kiemTraOverlapQuyChe(dto.phongBanId, dto.tuNgay, dto.denNgay);
        const quyCheHienTai = await this.prisma.quyChe.findFirst({
            where: { phongBanId: dto.phongBanId },
            orderBy: { phienBan: 'desc' },
        });
        const phienBan = (quyCheHienTai?.phienBan || 0) + 1;
        return this.prisma.quyChe.create({
            data: {
                phongBanId: dto.phongBanId,
                tenQuyChe: dto.tenQuyChe,
                moTa: dto.moTa,
                tuNgay: dto.tuNgay,
                denNgay: dto.denNgay,
                phienBan,
                trangThai: client_1.TrangThaiQuyChe.NHAP,
                nguoiTao: dto.nguoiTao,
            },
            include: {
                phongBan: true,
            },
        });
    }
    async kiemTraOverlapQuyChe(phongBanId, tuNgay, denNgay, excludeId) {
        const tuNgayDate = new Date(tuNgay);
        const denNgayDate = denNgay ? new Date(denNgay) : null;
        const overlapping = await this.prisma.quyChe.findFirst({
            where: {
                phongBanId,
                id: excludeId ? { not: excludeId } : undefined,
                trangThai: client_1.TrangThaiQuyChe.HIEU_LUC,
                OR: [
                    {
                        tuNgay: { lte: tuNgayDate },
                        OR: [
                            { denNgay: null },
                            { denNgay: { gte: tuNgayDate } },
                        ],
                    },
                    denNgayDate ? {
                        tuNgay: { gte: tuNgayDate, lte: denNgayDate },
                    } : {},
                ],
            },
        });
        if (overlapping) {
            throw new common_1.BadRequestException(`Thời gian quy chế bị trùng với quy chế "${overlapping.tenQuyChe}" (${overlapping.tuNgay.toLocaleDateString('vi-VN')} - ${overlapping.denNgay?.toLocaleDateString('vi-VN') || 'không giới hạn'})`);
        }
    }
    async capNhat(id, dto) {
        const quyChe = await this.layChiTiet(id);
        if (quyChe.daChotLuong && quyChe.trangThai !== client_1.TrangThaiQuyChe.NHAP) {
            throw new common_1.BadRequestException('Không thể sửa quy chế đã áp dụng cho bảng lương đã chốt. Vui lòng tạo phiên bản mới.');
        }
        if (dto.tuNgay || dto.denNgay) {
            await this.kiemTraOverlapQuyChe(quyChe.phongBanId, dto.tuNgay || quyChe.tuNgay, dto.denNgay !== undefined ? dto.denNgay : quyChe.denNgay, id);
        }
        return this.prisma.quyChe.update({
            where: { id },
            data: {
                tenQuyChe: dto.tenQuyChe,
                moTa: dto.moTa,
                tuNgay: dto.tuNgay,
                denNgay: dto.denNgay,
                trangThai: dto.trangThai,
            },
            include: {
                phongBan: true,
                rules: {
                    orderBy: { thuTuUuTien: 'asc' },
                },
            },
        });
    }
    async nhanBan(id, dto) {
        const quyCheGoc = await this.prisma.quyChe.findUnique({
            where: { id },
            include: {
                rules: true,
            },
        });
        if (!quyCheGoc) {
            throw new common_1.NotFoundException(`Không tìm thấy quy chế với ID: ${id}`);
        }
        const quyChePhienBanCao = await this.prisma.quyChe.findFirst({
            where: { phongBanId: quyCheGoc.phongBanId },
            orderBy: { phienBan: 'desc' },
        });
        const phienBan = (quyChePhienBanCao?.phienBan || 0) + 1;
        const quyCheMotừ = await this.prisma.quyChe.create({
            data: {
                phongBanId: quyCheGoc.phongBanId,
                tenQuyChe: dto.tenQuyChe || `${quyCheGoc.tenQuyChe} (v${phienBan})`,
                moTa: quyCheGoc.moTa,
                tuNgay: dto.tuNgay,
                denNgay: null,
                phienBan,
                trangThai: client_1.TrangThaiQuyChe.NHAP,
                nguoiTao: dto.nguoiTao,
                rules: {
                    create: quyCheGoc.rules.map((rule) => ({
                        khoanLuongId: rule.khoanLuongId,
                        tenRule: rule.tenRule,
                        moTa: rule.moTa,
                        loaiRule: rule.loaiRule,
                        dieuKienJson: rule.dieuKienJson,
                        congThucJson: rule.congThucJson,
                        thuTuUuTien: rule.thuTuUuTien,
                        cheDoGop: rule.cheDoGop,
                        choPhepChinhTay: rule.choPhepChinhTay,
                        trangThai: true,
                        nguoiTao: dto.nguoiTao,
                    })),
                },
            },
            include: {
                phongBan: true,
                rules: {
                    orderBy: { thuTuUuTien: 'asc' },
                    include: {
                        khoanLuong: true,
                    },
                },
            },
        });
        if (quyCheGoc.trangThai === client_1.TrangThaiQuyChe.HIEU_LUC) {
            await this.prisma.quyChe.update({
                where: { id },
                data: {
                    denNgay: new Date(dto.tuNgay.getTime() - 24 * 60 * 60 * 1000),
                },
            });
        }
        return quyCheMotừ;
    }
    async kichHoat(id) {
        const quyChe = await this.layChiTiet(id);
        if (quyChe.rules.length === 0) {
            throw new common_1.BadRequestException('Không thể kích hoạt quy chế không có rule nào');
        }
        await this.prisma.quyChe.updateMany({
            where: {
                phongBanId: quyChe.phongBanId,
                id: { not: id },
                trangThai: client_1.TrangThaiQuyChe.HIEU_LUC,
            },
            data: {
                trangThai: client_1.TrangThaiQuyChe.NGUNG,
                denNgay: new Date(),
            },
        });
        return this.prisma.quyChe.update({
            where: { id },
            data: {
                trangThai: client_1.TrangThaiQuyChe.HIEU_LUC,
            },
            include: {
                phongBan: true,
                rules: {
                    orderBy: { thuTuUuTien: 'asc' },
                },
            },
        });
    }
    async ngung(id) {
        return this.prisma.quyChe.update({
            where: { id },
            data: {
                trangThai: client_1.TrangThaiQuyChe.NGUNG,
                denNgay: new Date(),
            },
        });
    }
    async layQuyCheHieuLuc(phongBanId, thang, nam) {
        const dauThang = new Date(nam, thang - 1, 1);
        const cuoiThang = new Date(nam, thang, 0);
        const quyChe = await this.prisma.quyChe.findFirst({
            where: {
                phongBanId,
                trangThai: client_1.TrangThaiQuyChe.HIEU_LUC,
                tuNgay: { lte: cuoiThang },
                OR: [
                    { denNgay: null },
                    { denNgay: { gte: dauThang } },
                ],
            },
            orderBy: { phienBan: 'desc' },
            include: {
                rules: {
                    where: { trangThai: true },
                    orderBy: { thuTuUuTien: 'asc' },
                    include: {
                        khoanLuong: true,
                    },
                },
            },
        });
        return quyChe;
    }
    async xoa(id) {
        const quyChe = await this.layChiTiet(id);
        if (quyChe.trangThai !== client_1.TrangThaiQuyChe.NHAP) {
            throw new common_1.BadRequestException('Chỉ có thể xóa quy chế đang ở trạng thái Nháp');
        }
        if (quyChe.bangLuongs.length > 0) {
            throw new common_1.BadRequestException('Không thể xóa quy chế đã được áp dụng cho bảng lương');
        }
        return this.prisma.quyChe.delete({
            where: { id },
        });
    }
};
exports.QuyCheService = QuyCheService;
exports.QuyCheService = QuyCheService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], QuyCheService);
//# sourceMappingURL=quy-che.service.js.map