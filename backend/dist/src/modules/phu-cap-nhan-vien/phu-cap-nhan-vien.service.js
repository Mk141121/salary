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
exports.PhuCapNhanVienService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const client_1 = require("@prisma/client");
let PhuCapNhanVienService = class PhuCapNhanVienService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async layTheoNhanVien(nhanVienId) {
        return this.prisma.phuCapNhanVien.findMany({
            where: { nhanVienId },
            include: {
                khoanLuong: true,
            },
            orderBy: [{ tuNgay: 'desc' }, { ngayTao: 'desc' }],
        });
    }
    async layPhuCapHieuLuc(nhanVienId) {
        const now = new Date();
        return this.prisma.phuCapNhanVien.findMany({
            where: {
                nhanVienId,
                trangThai: client_1.TrangThaiPhuCap.HIEU_LUC,
                tuNgay: { lte: now },
                OR: [{ denNgay: null }, { denNgay: { gte: now } }],
            },
            include: {
                khoanLuong: true,
            },
            orderBy: { khoanLuong: { thuTu: 'asc' } },
        });
    }
    async layPhuCapTheoThang(nhanVienId, thang, nam) {
        const ngayDauThang = new Date(nam, thang - 1, 1);
        const ngayCuoiThang = new Date(nam, thang, 0);
        return this.prisma.phuCapNhanVien.findMany({
            where: {
                nhanVienId,
                trangThai: client_1.TrangThaiPhuCap.HIEU_LUC,
                tuNgay: { lte: ngayCuoiThang },
                OR: [{ denNgay: null }, { denNgay: { gte: ngayDauThang } }],
            },
            include: {
                khoanLuong: true,
            },
            orderBy: { khoanLuong: { thuTu: 'asc' } },
        });
    }
    async layPhuCapTheoThangBatch(nhanVienIds, thang, nam) {
        const ngayDauThang = new Date(nam, thang - 1, 1);
        const ngayCuoiThang = new Date(nam, thang, 0);
        return this.prisma.phuCapNhanVien.findMany({
            where: {
                nhanVienId: { in: nhanVienIds },
                trangThai: client_1.TrangThaiPhuCap.HIEU_LUC,
                tuNgay: { lte: ngayCuoiThang },
                OR: [{ denNgay: null }, { denNgay: { gte: ngayDauThang } }],
            },
            include: {
                khoanLuong: true,
                nhanVien: {
                    select: { id: true, maNhanVien: true, hoTen: true },
                },
            },
            orderBy: [{ nhanVienId: 'asc' }, { khoanLuong: { thuTu: 'asc' } }],
        });
    }
    async taoPhuCap(dto) {
        const khoanLuong = await this.prisma.khoanLuong.findUnique({
            where: { id: dto.khoanLuongId },
        });
        if (!khoanLuong) {
            throw new common_1.NotFoundException('Không tìm thấy khoản lương');
        }
        if (khoanLuong.loai !== client_1.LoaiKhoanLuong.THU_NHAP) {
            throw new common_1.BadRequestException('Chỉ khoản lương loại THU_NHAP mới được dùng làm phụ cấp');
        }
        const nhanVien = await this.prisma.nhanVien.findUnique({
            where: { id: dto.nhanVienId },
        });
        if (!nhanVien) {
            throw new common_1.NotFoundException('Không tìm thấy nhân viên');
        }
        if (dto.soTien < 0) {
            throw new common_1.BadRequestException('Số tiền phụ cấp phải >= 0');
        }
        if (dto.denNgay && dto.tuNgay > dto.denNgay) {
            throw new common_1.BadRequestException('Ngày bắt đầu phải <= ngày kết thúc');
        }
        await this.kiemTraTrungLap(dto.nhanVienId, dto.khoanLuongId, dto.tuNgay, dto.denNgay);
        return this.prisma.phuCapNhanVien.create({
            data: {
                nhanVienId: dto.nhanVienId,
                khoanLuongId: dto.khoanLuongId,
                soTien: new client_1.Prisma.Decimal(dto.soTien),
                tuNgay: dto.tuNgay,
                denNgay: dto.denNgay,
                ghiChu: dto.ghiChu,
                nguoiTao: dto.nguoiTao,
                trangThai: client_1.TrangThaiPhuCap.HIEU_LUC,
            },
            include: {
                khoanLuong: true,
            },
        });
    }
    async ketThucPhuCap(id, denNgay, nguoiCapNhat) {
        const phuCap = await this.prisma.phuCapNhanVien.findUnique({
            where: { id },
        });
        if (!phuCap) {
            throw new common_1.NotFoundException('Không tìm thấy phụ cấp');
        }
        if (denNgay < phuCap.tuNgay) {
            throw new common_1.BadRequestException('Ngày kết thúc phải >= ngày bắt đầu phụ cấp');
        }
        return this.prisma.phuCapNhanVien.update({
            where: { id },
            data: {
                denNgay,
                trangThai: client_1.TrangThaiPhuCap.KET_THUC,
                ghiChu: phuCap.ghiChu
                    ? `${phuCap.ghiChu} | Kết thúc bởi ${nguoiCapNhat || 'Hệ thống'}`
                    : `Kết thúc bởi ${nguoiCapNhat || 'Hệ thống'}`,
            },
            include: {
                khoanLuong: true,
            },
        });
    }
    async tangPhuCap(id, dto) {
        const phuCapCu = await this.prisma.phuCapNhanVien.findUnique({
            where: { id },
            include: { khoanLuong: true },
        });
        if (!phuCapCu) {
            throw new common_1.NotFoundException('Không tìm thấy phụ cấp');
        }
        if (dto.soTienMoi < 0) {
            throw new common_1.BadRequestException('Số tiền mới phải >= 0');
        }
        if (dto.tuNgay <= phuCapCu.tuNgay) {
            throw new common_1.BadRequestException('Ngày hiệu lực mới phải sau ngày bắt đầu phụ cấp hiện tại');
        }
        const ngayKetThucCu = new Date(dto.tuNgay);
        ngayKetThucCu.setDate(ngayKetThucCu.getDate() - 1);
        return this.prisma.$transaction(async (tx) => {
            await tx.phuCapNhanVien.update({
                where: { id },
                data: {
                    denNgay: ngayKetThucCu,
                    ghiChu: phuCapCu.ghiChu
                        ? `${phuCapCu.ghiChu} | Điều chỉnh sang ${dto.soTienMoi.toLocaleString()}`
                        : `Điều chỉnh sang ${dto.soTienMoi.toLocaleString()}`,
                },
            });
            return tx.phuCapNhanVien.create({
                data: {
                    nhanVienId: phuCapCu.nhanVienId,
                    khoanLuongId: phuCapCu.khoanLuongId,
                    soTien: new client_1.Prisma.Decimal(dto.soTienMoi),
                    tuNgay: dto.tuNgay,
                    denNgay: phuCapCu.denNgay,
                    ghiChu: dto.ghiChu ||
                        `Điều chỉnh từ ${Number(phuCapCu.soTien).toLocaleString()}`,
                    nguoiTao: dto.nguoiTao,
                    trangThai: client_1.TrangThaiPhuCap.HIEU_LUC,
                },
                include: {
                    khoanLuong: true,
                },
            });
        });
    }
    async tamDungPhuCap(id) {
        const phuCap = await this.prisma.phuCapNhanVien.findUnique({
            where: { id },
        });
        if (!phuCap) {
            throw new common_1.NotFoundException('Không tìm thấy phụ cấp');
        }
        return this.prisma.phuCapNhanVien.update({
            where: { id },
            data: { trangThai: client_1.TrangThaiPhuCap.TAM_DUNG },
            include: { khoanLuong: true },
        });
    }
    async kichHoatLai(id) {
        const phuCap = await this.prisma.phuCapNhanVien.findUnique({
            where: { id },
        });
        if (!phuCap) {
            throw new common_1.NotFoundException('Không tìm thấy phụ cấp');
        }
        if (phuCap.trangThai !== client_1.TrangThaiPhuCap.TAM_DUNG) {
            throw new common_1.BadRequestException('Chỉ kích hoạt lại phụ cấp đang tạm dừng');
        }
        return this.prisma.phuCapNhanVien.update({
            where: { id },
            data: { trangThai: client_1.TrangThaiPhuCap.HIEU_LUC },
            include: { khoanLuong: true },
        });
    }
    async layLichSuPhuCap(nhanVienId, khoanLuongId) {
        const where = { nhanVienId };
        if (khoanLuongId) {
            where.khoanLuongId = khoanLuongId;
        }
        return this.prisma.phuCapNhanVien.findMany({
            where,
            include: {
                khoanLuong: true,
            },
            orderBy: [{ khoanLuongId: 'asc' }, { tuNgay: 'asc' }],
        });
    }
    async kiemTraTrungLap(nhanVienId, khoanLuongId, tuNgay, denNgay, excludeId) {
        const existing = await this.prisma.phuCapNhanVien.findMany({
            where: {
                nhanVienId,
                khoanLuongId,
                trangThai: { not: client_1.TrangThaiPhuCap.KET_THUC },
                id: excludeId ? { not: excludeId } : undefined,
            },
        });
        for (const pc of existing) {
            const pcDenNgay = pc.denNgay || new Date('2099-12-31');
            const newDenNgay = denNgay || new Date('2099-12-31');
            const overlap = tuNgay <= pcDenNgay && newDenNgay >= pc.tuNgay;
            if (overlap) {
                throw new common_1.BadRequestException(`Khoản phụ cấp này đã tồn tại trong khoảng thời gian chồng chéo (từ ${pc.tuNgay.toLocaleDateString('vi-VN')})`);
            }
        }
    }
    async thongKeTheoPhongBan(phongBanId) {
        const now = new Date();
        const result = await this.prisma.phuCapNhanVien.groupBy({
            by: ['khoanLuongId'],
            where: {
                nhanVien: { phongBanId },
                trangThai: client_1.TrangThaiPhuCap.HIEU_LUC,
                tuNgay: { lte: now },
                OR: [{ denNgay: null }, { denNgay: { gte: now } }],
            },
            _sum: { soTien: true },
            _count: { nhanVienId: true },
        });
        const khoanLuongIds = result.map((r) => r.khoanLuongId);
        const khoanLuongs = await this.prisma.khoanLuong.findMany({
            where: { id: { in: khoanLuongIds } },
        });
        return result.map((r) => ({
            khoanLuong: khoanLuongs.find((kl) => kl.id === r.khoanLuongId),
            tongTien: r._sum.soTien,
            soNhanVien: r._count.nhanVienId,
        }));
    }
};
exports.PhuCapNhanVienService = PhuCapNhanVienService;
exports.PhuCapNhanVienService = PhuCapNhanVienService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PhuCapNhanVienService);
//# sourceMappingURL=phu-cap-nhan-vien.service.js.map