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
exports.NganHangService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let NganHangService = class NganHangService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async layDanhSachNganHang(nhanVienId) {
        return this.prisma.nhanVienNganHang.findMany({
            where: { nhanVienId },
            orderBy: [{ laMacDinh: 'desc' }, { ngayTao: 'desc' }],
        });
    }
    async layNganHangMacDinh(nhanVienId) {
        return this.prisma.nhanVienNganHang.findFirst({
            where: {
                nhanVienId,
                laMacDinh: true,
            },
        });
    }
    async layNganHangHieuLuc(nhanVienId, ngay) {
        return this.prisma.nhanVienNganHang.findFirst({
            where: {
                nhanVienId,
                laMacDinh: true,
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
            orderBy: { ngayTao: 'desc' },
        });
    }
    async taoNganHang(nhanVienId, dto) {
        const nhanVien = await this.prisma.nhanVien.findUnique({
            where: { id: nhanVienId },
        });
        if (!nhanVien) {
            throw new common_1.NotFoundException('Không tìm thấy nhân viên');
        }
        if (dto.laMacDinh) {
            await this.prisma.nhanVienNganHang.updateMany({
                where: { nhanVienId, laMacDinh: true },
                data: { laMacDinh: false },
            });
        }
        const count = await this.prisma.nhanVienNganHang.count({
            where: { nhanVienId },
        });
        const laMacDinh = count === 0 ? true : dto.laMacDinh ?? false;
        return this.prisma.nhanVienNganHang.create({
            data: {
                nhanVienId,
                tenNganHang: dto.tenNganHang,
                soTaiKhoan: dto.soTaiKhoan,
                chuTaiKhoan: dto.chuTaiKhoan,
                chiNhanh: dto.chiNhanh,
                laMacDinh,
                tuNgay: dto.tuNgay ? new Date(dto.tuNgay) : null,
                denNgay: dto.denNgay ? new Date(dto.denNgay) : null,
                ghiChu: dto.ghiChu,
            },
        });
    }
    async capNhatNganHang(id, dto) {
        const nganHang = await this.prisma.nhanVienNganHang.findUnique({
            where: { id },
        });
        if (!nganHang) {
            throw new common_1.NotFoundException('Không tìm thấy tài khoản ngân hàng');
        }
        if (dto.laMacDinh) {
            await this.prisma.nhanVienNganHang.updateMany({
                where: { nhanVienId: nganHang.nhanVienId, laMacDinh: true, id: { not: id } },
                data: { laMacDinh: false },
            });
        }
        return this.prisma.nhanVienNganHang.update({
            where: { id },
            data: {
                tenNganHang: dto.tenNganHang,
                soTaiKhoan: dto.soTaiKhoan,
                chuTaiKhoan: dto.chuTaiKhoan,
                chiNhanh: dto.chiNhanh,
                laMacDinh: dto.laMacDinh,
                tuNgay: dto.tuNgay ? new Date(dto.tuNgay) : undefined,
                denNgay: dto.denNgay ? new Date(dto.denNgay) : undefined,
                ghiChu: dto.ghiChu,
            },
        });
    }
    async datMacDinh(id) {
        const nganHang = await this.prisma.nhanVienNganHang.findUnique({
            where: { id },
        });
        if (!nganHang) {
            throw new common_1.NotFoundException('Không tìm thấy tài khoản ngân hàng');
        }
        await this.prisma.nhanVienNganHang.updateMany({
            where: { nhanVienId: nganHang.nhanVienId, laMacDinh: true },
            data: { laMacDinh: false },
        });
        return this.prisma.nhanVienNganHang.update({
            where: { id },
            data: { laMacDinh: true },
        });
    }
    async xoaNganHang(id) {
        const nganHang = await this.prisma.nhanVienNganHang.findUnique({
            where: { id },
        });
        if (!nganHang) {
            throw new common_1.NotFoundException('Không tìm thấy tài khoản ngân hàng');
        }
        if (nganHang.laMacDinh) {
            throw new common_1.BadRequestException('Không thể xóa tài khoản mặc định. Hãy đặt TK khác làm mặc định trước.');
        }
        return this.prisma.nhanVienNganHang.delete({
            where: { id },
        });
    }
    maskSoTaiKhoan(soTaiKhoan) {
        if (soTaiKhoan.length <= 4)
            return '****';
        return '*'.repeat(soTaiKhoan.length - 4) + soTaiKhoan.slice(-4);
    }
};
exports.NganHangService = NganHangService;
exports.NganHangService = NganHangService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], NganHangService);
//# sourceMappingURL=ngan-hang.service.js.map