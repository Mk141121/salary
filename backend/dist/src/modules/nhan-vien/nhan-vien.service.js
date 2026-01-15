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
exports.NhanVienService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const pagination_dto_1 = require("../../common/dto/pagination.dto");
let NhanVienService = class NhanVienService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async taoMaNhanVienTuDong() {
        const lastNv = await this.prisma.nhanVien.findFirst({
            where: {
                maNhanVien: {
                    startsWith: 'NV',
                },
            },
            orderBy: {
                maNhanVien: 'desc',
            },
            select: {
                maNhanVien: true,
            },
        });
        let nextNumber = 1;
        if (lastNv) {
            const match = lastNv.maNhanVien.match(/NV(\d+)/);
            if (match) {
                nextNumber = parseInt(match[1], 10) + 1;
            }
        }
        return `NV${nextNumber.toString().padStart(4, '0')}`;
    }
    async layTatCa(query) {
        const where = {};
        if (query?.phongBanId) {
            where.phongBanId = query.phongBanId;
        }
        if (query?.trangThai) {
            where.trangThai = query.trangThai;
        }
        else {
            where.trangThai = 'DANG_LAM';
        }
        if (query?.tuKhoa) {
            where.OR = [
                { hoTen: { contains: query.tuKhoa, mode: 'insensitive' } },
                { maNhanVien: { contains: query.tuKhoa, mode: 'insensitive' } },
                { email: { contains: query.tuKhoa, mode: 'insensitive' } },
            ];
        }
        const trang = query?.trang || 1;
        const soLuong = query?.soLuong || 50;
        const { skip, take } = (0, pagination_dto_1.tinhPagination)(trang, soLuong);
        const [data, tongSo] = await Promise.all([
            this.prisma.nhanVien.findMany({
                where,
                include: {
                    phongBan: {
                        select: { id: true, maPhongBan: true, tenPhongBan: true },
                    },
                },
                orderBy: [{ phongBanId: 'asc' }, { hoTen: 'asc' }],
                skip,
                take,
            }),
            this.prisma.nhanVien.count({ where }),
        ]);
        return (0, pagination_dto_1.taoPaginatedResult)(data, tongSo, trang, soLuong);
    }
    async layTheoId(id) {
        const nhanVien = await this.prisma.nhanVien.findUnique({
            where: { id },
            include: {
                phongBan: true,
                chiTietBangLuongs: {
                    include: {
                        bangLuong: true,
                        khoanLuong: true,
                    },
                    orderBy: { bangLuong: { nam: 'desc' } },
                    take: 12,
                },
            },
        });
        if (!nhanVien) {
            throw new common_1.NotFoundException(`Không tìm thấy nhân viên với ID: ${id}`);
        }
        return nhanVien;
    }
    async layTheoMa(maNhanVien) {
        const nhanVien = await this.prisma.nhanVien.findUnique({
            where: { maNhanVien },
            include: {
                phongBan: true,
            },
        });
        if (!nhanVien) {
            throw new common_1.NotFoundException(`Không tìm thấy nhân viên với mã: ${maNhanVien}`);
        }
        return nhanVien;
    }
    async taoMoi(dto) {
        const maNhanVien = dto.maNhanVien || await this.taoMaNhanVienTuDong();
        const email = dto.email?.trim() || null;
        const soDienThoai = dto.soDienThoai?.trim() || null;
        const gioiTinh = dto.gioiTinh || null;
        const ngaySinh = dto.ngaySinh ? new Date(dto.ngaySinh) : null;
        const diaChi = dto.diaChi?.trim() || null;
        return this.prisma.nhanVien.create({
            data: {
                ...dto,
                maNhanVien,
                email,
                soDienThoai,
                gioiTinh,
                ngaySinh,
                diaChi,
                ngayVaoLam: dto.ngayVaoLam ? new Date(dto.ngayVaoLam) : new Date(),
            },
            include: {
                phongBan: true,
            },
        });
    }
    async capNhat(id, dto) {
        await this.layTheoId(id);
        const updateData = { ...dto };
        if (dto.email !== undefined) {
            updateData.email = dto.email?.trim() || null;
        }
        if (dto.soDienThoai !== undefined) {
            updateData.soDienThoai = dto.soDienThoai?.trim() || null;
        }
        if (dto.ngayVaoLam) {
            updateData.ngayVaoLam = new Date(dto.ngayVaoLam);
        }
        if (dto.gioiTinh !== undefined) {
            updateData.gioiTinh = dto.gioiTinh || null;
        }
        if (dto.ngaySinh !== undefined) {
            updateData.ngaySinh = dto.ngaySinh ? new Date(dto.ngaySinh) : null;
        }
        if (dto.diaChi !== undefined) {
            updateData.diaChi = dto.diaChi?.trim() || null;
        }
        return this.prisma.nhanVien.update({
            where: { id },
            data: updateData,
            include: {
                phongBan: true,
            },
        });
    }
    async xoa(id) {
        await this.layTheoId(id);
        return this.prisma.nhanVien.update({
            where: { id },
            data: { trangThai: 'NGHI_VIEC' },
        });
    }
    async demTheoPhongBan() {
        return this.prisma.nhanVien.groupBy({
            by: ['phongBanId'],
            where: { trangThai: 'DANG_LAM' },
            _count: { id: true },
        });
    }
};
exports.NhanVienService = NhanVienService;
exports.NhanVienService = NhanVienService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], NhanVienService);
//# sourceMappingURL=nhan-vien.service.js.map