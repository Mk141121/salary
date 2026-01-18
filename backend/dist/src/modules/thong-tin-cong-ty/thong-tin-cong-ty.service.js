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
    async layDanhSachDonGia(phongBanId) {
        const where = { trangThai: true };
        if (phongBanId !== undefined) {
            where.OR = [{ phongBanId }, { phongBanId: null }];
        }
        return this.prisma.cauHinhDonGia.findMany({
            where,
            include: {
                phongBan: {
                    select: { id: true, tenPhongBan: true },
                },
            },
            orderBy: { maBien: 'asc' },
        });
    }
    async layDonGia(id) {
        const donGia = await this.prisma.cauHinhDonGia.findUnique({
            where: { id },
            include: {
                phongBan: {
                    select: { id: true, tenPhongBan: true },
                },
            },
        });
        if (!donGia) {
            throw new common_1.NotFoundException(`Không tìm thấy đơn giá với ID: ${id}`);
        }
        return donGia;
    }
    async taoDonGia(dto) {
        return this.prisma.cauHinhDonGia.create({
            data: {
                maBien: dto.maBien.toUpperCase(),
                tenBien: dto.tenBien,
                moTa: dto.moTa,
                giaTri: dto.giaTri,
                donVi: dto.donVi || 'VND',
                phongBanId: dto.phongBanId,
            },
            include: {
                phongBan: {
                    select: { id: true, tenPhongBan: true },
                },
            },
        });
    }
    async capNhatDonGia(id, dto) {
        const existing = await this.prisma.cauHinhDonGia.findUnique({
            where: { id },
        });
        if (!existing) {
            throw new common_1.NotFoundException(`Không tìm thấy đơn giá với ID: ${id}`);
        }
        return this.prisma.cauHinhDonGia.update({
            where: { id },
            data: dto,
            include: {
                phongBan: {
                    select: { id: true, tenPhongBan: true },
                },
            },
        });
    }
    async xoaDonGia(id) {
        const existing = await this.prisma.cauHinhDonGia.findUnique({
            where: { id },
        });
        if (!existing) {
            throw new common_1.NotFoundException(`Không tìm thấy đơn giá với ID: ${id}`);
        }
        return this.prisma.cauHinhDonGia.delete({
            where: { id },
        });
    }
    async khoiTaoDonGiaMau() {
        const donGiaMau = [
            {
                maBien: 'DON_GIA_SP',
                tenBien: 'Đơn giá sản phẩm',
                moTa: 'Số tiền thưởng trên mỗi sản phẩm đạt',
                giaTri: 1000,
                donVi: 'VND',
            },
            {
                maBien: 'DON_GIA_KHOI_LUONG',
                tenBien: 'Đơn giá khối lượng giao hàng',
                moTa: 'Số tiền thưởng trên mỗi đơn vị khối lượng giao hàng thành công',
                giaTri: 500,
                donVi: 'VND',
            },
            {
                maBien: 'DON_GIA_PHAT_TRE',
                tenBien: 'Đơn giá phạt trễ giờ',
                moTa: 'Số tiền phạt cho mỗi lần trễ giờ',
                giaTri: 50000,
                donVi: 'VND',
            },
            {
                maBien: 'HE_SO_LOI_SP',
                tenBien: 'Hệ số phạt lỗi sản phẩm',
                moTa: 'Hệ số nhân để tính phạt khi có sản phẩm lỗi',
                giaTri: 1.5,
                donVi: 'lần',
            },
        ];
        const results = [];
        for (const dg of donGiaMau) {
            const existing = await this.prisma.cauHinhDonGia.findFirst({
                where: { maBien: dg.maBien, phongBanId: null },
            });
            if (!existing) {
                results.push(await this.prisma.cauHinhDonGia.create({
                    data: dg,
                }));
            }
        }
        return {
            message: `Đã khởi tạo ${results.length} đơn giá mẫu`,
            data: results,
        };
    }
};
exports.ThongTinCongTyService = ThongTinCongTyService;
exports.ThongTinCongTyService = ThongTinCongTyService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ThongTinCongTyService);
//# sourceMappingURL=thong-tin-cong-ty.service.js.map