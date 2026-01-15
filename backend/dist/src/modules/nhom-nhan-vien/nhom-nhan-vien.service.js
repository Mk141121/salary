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
exports.NhomNhanVienService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let NhomNhanVienService = class NhomNhanVienService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async layDanhSachNhom() {
        return this.prisma.nhomNhanVien.findMany({
            include: {
                _count: {
                    select: { thanhViens: true },
                },
            },
            orderBy: { maNhom: 'asc' },
        });
    }
    async layNhomTheoId(id) {
        const nhom = await this.prisma.nhomNhanVien.findUnique({
            where: { id },
            include: {
                thanhViens: {
                    include: {
                        nhanVien: {
                            select: { maNhanVien: true, hoTen: true, trangThai: true },
                        },
                    },
                    orderBy: { ngayTao: 'desc' },
                },
            },
        });
        if (!nhom) {
            throw new common_1.NotFoundException('Không tìm thấy nhóm');
        }
        return nhom;
    }
    async taoNhom(dto) {
        const existing = await this.prisma.nhomNhanVien.findUnique({
            where: { maNhom: dto.maNhom },
        });
        if (existing) {
            throw new common_1.ConflictException(`Mã nhóm "${dto.maNhom}" đã tồn tại`);
        }
        return this.prisma.nhomNhanVien.create({
            data: {
                maNhom: dto.maNhom,
                tenNhom: dto.tenNhom,
                moTa: dto.moTa,
                mauSac: dto.mauSac,
                trangThai: dto.trangThai ?? true,
            },
        });
    }
    async capNhatNhom(id, dto) {
        const nhom = await this.prisma.nhomNhanVien.findUnique({
            where: { id },
        });
        if (!nhom) {
            throw new common_1.NotFoundException('Không tìm thấy nhóm');
        }
        if (dto.maNhom && dto.maNhom !== nhom.maNhom) {
            const existing = await this.prisma.nhomNhanVien.findUnique({
                where: { maNhom: dto.maNhom },
            });
            if (existing) {
                throw new common_1.ConflictException(`Mã nhóm "${dto.maNhom}" đã tồn tại`);
            }
        }
        return this.prisma.nhomNhanVien.update({
            where: { id },
            data: {
                maNhom: dto.maNhom,
                tenNhom: dto.tenNhom,
                moTa: dto.moTa,
                mauSac: dto.mauSac,
                trangThai: dto.trangThai,
            },
        });
    }
    async xoaNhom(id) {
        const nhom = await this.prisma.nhomNhanVien.findUnique({
            where: { id },
            include: { _count: { select: { thanhViens: true } } },
        });
        if (!nhom) {
            throw new common_1.NotFoundException('Không tìm thấy nhóm');
        }
        if (nhom._count.thanhViens > 0) {
            throw new common_1.BadRequestException(`Nhóm đang có ${nhom._count.thanhViens} thành viên. Hãy gỡ hết thành viên trước khi xóa.`);
        }
        return this.prisma.nhomNhanVien.delete({
            where: { id },
        });
    }
    async layNhomCuaNhanVien(nhanVienId) {
        return this.prisma.nhanVienThuocNhom.findMany({
            where: { nhanVienId },
            include: {
                nhom: true,
            },
            orderBy: { ngayTao: 'desc' },
        });
    }
    async layNhomHieuLuc(nhanVienId, ngay) {
        return this.prisma.nhanVienThuocNhom.findMany({
            where: {
                nhanVienId,
                nhom: { trangThai: true },
                OR: [
                    { tuNgay: null },
                    { tuNgay: { lte: ngay } },
                ],
                AND: [
                    {
                        OR: [{ denNgay: null }, { denNgay: { gte: ngay } }],
                    },
                ],
            },
            include: {
                nhom: true,
            },
        });
    }
    async themVaoNhom(nhanVienId, dto) {
        const nhanVien = await this.prisma.nhanVien.findUnique({
            where: { id: nhanVienId },
        });
        if (!nhanVien) {
            throw new common_1.NotFoundException('Không tìm thấy nhân viên');
        }
        const nhom = await this.prisma.nhomNhanVien.findUnique({
            where: { id: dto.nhomId },
        });
        if (!nhom) {
            throw new common_1.NotFoundException('Không tìm thấy nhóm');
        }
        const tuNgay = dto.tuNgay ? new Date(dto.tuNgay) : null;
        const denNgay = dto.denNgay ? new Date(dto.denNgay) : null;
        const existing = await this.prisma.nhanVienThuocNhom.findFirst({
            where: {
                nhanVienId,
                nhomId: dto.nhomId,
                OR: [
                    { tuNgay: null, denNgay: null },
                    {
                        AND: [
                            { OR: [{ tuNgay: null }, { tuNgay: { lte: denNgay || new Date('9999-12-31') } }] },
                            { OR: [{ denNgay: null }, { denNgay: { gte: tuNgay || new Date('1900-01-01') } }] },
                        ],
                    },
                ],
            },
        });
        if (existing) {
            throw new common_1.ConflictException('Nhân viên đã thuộc nhóm này trong khoảng thời gian này');
        }
        return this.prisma.nhanVienThuocNhom.create({
            data: {
                nhanVienId,
                nhomId: dto.nhomId,
                tuNgay,
                denNgay,
            },
            include: {
                nhom: true,
            },
        });
    }
    async goKhoiNhom(nhanVienId, dto) {
        const membership = await this.prisma.nhanVienThuocNhom.findFirst({
            where: {
                nhanVienId,
                nhomId: dto.nhomId,
                denNgay: null,
            },
        });
        if (!membership) {
            throw new common_1.NotFoundException('Nhân viên không thuộc nhóm này hoặc đã kết thúc');
        }
        if (dto.denNgay) {
            return this.prisma.nhanVienThuocNhom.update({
                where: { id: membership.id },
                data: { denNgay: new Date(dto.denNgay) },
                include: { nhom: true },
            });
        }
        return this.prisma.nhanVienThuocNhom.delete({
            where: { id: membership.id },
        });
    }
};
exports.NhomNhanVienService = NhomNhanVienService;
exports.NhomNhanVienService = NhomNhanVienService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], NhomNhanVienService);
//# sourceMappingURL=nhom-nhan-vien.service.js.map