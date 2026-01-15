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
exports.ThueBHService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let ThueBHService = class ThueBHService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async layTheoNhanVien(nhanVienId) {
        const nhanVien = await this.prisma.nhanVien.findUnique({
            where: { id: nhanVienId },
        });
        if (!nhanVien) {
            throw new common_1.NotFoundException(`Không tìm thấy nhân viên với ID ${nhanVienId}`);
        }
        const thueBH = await this.prisma.nhanVienThueBH.findFirst({
            where: { nhanVienId },
        });
        return thueBH;
    }
    async taoHoacCapNhat(nhanVienId, dto) {
        const nhanVien = await this.prisma.nhanVien.findUnique({
            where: { id: nhanVienId },
        });
        if (!nhanVien) {
            throw new common_1.NotFoundException(`Không tìm thấy nhân viên với ID ${nhanVienId}`);
        }
        const existing = await this.prisma.nhanVienThueBH.findFirst({
            where: { nhanVienId },
        });
        const data = {
            mstCaNhan: dto.mstCaNhan?.trim() || null,
            soCmndCccd: dto.soCmndCccd?.trim() || null,
            ngayCap: dto.ngayCap ? new Date(dto.ngayCap) : null,
            noiCap: dto.noiCap?.trim() || null,
            soNguoiPhuThuoc: dto.soNguoiPhuThuoc ?? 0,
            ghiChu: dto.ghiChu?.trim() || null,
        };
        if (existing) {
            return this.prisma.nhanVienThueBH.update({
                where: { id: existing.id },
                data,
            });
        }
        else {
            return this.prisma.nhanVienThueBH.create({
                data: {
                    nhanVienId,
                    ...data,
                },
            });
        }
    }
    async capNhat(id, dto) {
        const thueBH = await this.prisma.nhanVienThueBH.findUnique({
            where: { id },
        });
        if (!thueBH) {
            throw new common_1.NotFoundException(`Không tìm thấy thông tin thuế/BHXH với ID ${id}`);
        }
        return this.prisma.nhanVienThueBH.update({
            where: { id },
            data: {
                mstCaNhan: dto.mstCaNhan?.trim() || null,
                soCmndCccd: dto.soCmndCccd?.trim() || null,
                ngayCap: dto.ngayCap ? new Date(dto.ngayCap) : null,
                noiCap: dto.noiCap?.trim() || null,
                soNguoiPhuThuoc: dto.soNguoiPhuThuoc ?? thueBH.soNguoiPhuThuoc,
                ghiChu: dto.ghiChu?.trim() || null,
            },
        });
    }
    async xoa(id) {
        const thueBH = await this.prisma.nhanVienThueBH.findUnique({
            where: { id },
        });
        if (!thueBH) {
            throw new common_1.NotFoundException(`Không tìm thấy thông tin thuế/BHXH với ID ${id}`);
        }
        await this.prisma.nhanVienThueBH.delete({
            where: { id },
        });
        return { message: 'Đã xóa thông tin thuế/BHXH' };
    }
};
exports.ThueBHService = ThueBHService;
exports.ThueBHService = ThueBHService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ThueBHService);
//# sourceMappingURL=thue-bh.service.js.map