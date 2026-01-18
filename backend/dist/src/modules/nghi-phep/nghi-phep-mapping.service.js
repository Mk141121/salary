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
var NghiPhepMappingService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NghiPhepMappingService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const client_1 = require("@prisma/client");
let NghiPhepMappingService = NghiPhepMappingService_1 = class NghiPhepMappingService {
    constructor(prisma) {
        this.prisma = prisma;
        this.logger = new common_1.Logger(NghiPhepMappingService_1.name);
    }
    async taoChiTietNgayNghi(donNghiPhepId) {
        const donNghi = await this.prisma.donNghiPhep.findUnique({
            where: { id: donNghiPhepId },
            include: { loaiNghi: true },
        });
        if (!donNghi) {
            throw new common_1.NotFoundException(`Không tìm thấy đơn nghỉ phép #${donNghiPhepId}`);
        }
        if (donNghi.trangThai !== 'DA_DUYET') {
            throw new common_1.BadRequestException('Chỉ có thể tạo chi tiết ngày nghỉ cho đơn đã duyệt');
        }
        await this.prisma.chiTietNghiPhepNgay.deleteMany({
            where: { donNghiPhepId },
        });
        const tuNgay = new Date(donNghi.tuNgay);
        const denNgay = new Date(donNghi.denNgay);
        const chiTietNgays = [];
        for (let d = new Date(tuNgay); d <= denNgay; d.setDate(d.getDate() + 1)) {
            const dayOfWeek = d.getDay();
            if (dayOfWeek === 0 || dayOfWeek === 6) {
                continue;
            }
            chiTietNgays.push({
                donNghiPhepId,
                nhanVienId: donNghi.nhanVienId,
                ngay: new Date(d),
                soGioNghi: 8,
                loaiNghiId: donNghi.loaiNghiId,
                coTinhLuong: donNghi.loaiNghi.coTinhLuong,
                coTinhChuyenCan: donNghi.loaiNghi.coTinhChuyenCan,
            });
        }
        if (chiTietNgays.length > 0) {
            await this.prisma.chiTietNghiPhepNgay.createMany({
                data: chiTietNgays,
            });
        }
        this.logger.log(`Đã tạo ${chiTietNgays.length} chi tiết ngày nghỉ cho đơn #${donNghiPhepId}`);
        return { soNgayTao: chiTietNgays.length };
    }
    async dongBoChamCong(donNghiPhepId) {
        const donNghi = await this.prisma.donNghiPhep.findUnique({
            where: { id: donNghiPhepId },
            include: {
                loaiNghi: true,
                chiTietNgays: true,
            },
        });
        if (!donNghi) {
            throw new common_1.NotFoundException(`Không tìm thấy đơn nghỉ phép #${donNghiPhepId}`);
        }
        if (donNghi.trangThai !== 'DA_DUYET') {
            throw new common_1.BadRequestException('Chỉ có thể đồng bộ chấm công cho đơn đã duyệt');
        }
        let soNgayCapNhat = 0;
        const trangThaiNghi = donNghi.loaiNghi.coTinhLuong
            ? client_1.TrangThaiChamCong.NGHI_PHEP
            : client_1.TrangThaiChamCong.NGHI_KHONG_LUONG;
        for (const chiTiet of donNghi.chiTietNgays) {
            await this.prisma.chiTietChamCong.upsert({
                where: {
                    nhanVienId_ngay: {
                        nhanVienId: donNghi.nhanVienId,
                        ngay: chiTiet.ngay,
                    },
                },
                update: {
                    trangThai: trangThaiNghi,
                    ghiChu: `Nghỉ phép - Đơn #${donNghi.maDon}`,
                },
                create: {
                    nhanVienId: donNghi.nhanVienId,
                    ngay: chiTiet.ngay,
                    trangThai: trangThaiNghi,
                    ghiChu: `Nghỉ phép - Đơn #${donNghi.maDon}`,
                },
            });
            soNgayCapNhat++;
        }
        this.logger.log(`Đã đồng bộ ${soNgayCapNhat} ngày chấm công cho đơn #${donNghiPhepId}`);
        return { soNgayCapNhat };
    }
    async capNhatNgayCongBangLuong(thangNam, nhanVienId) {
        const [year, month] = thangNam.split('-').map(Number);
        const tuNgay = new Date(year, month - 1, 1);
        const denNgay = new Date(year, month, 0);
        const chiTietNgays = await this.prisma.chiTietNghiPhepNgay.findMany({
            where: {
                nhanVienId,
                ngay: {
                    gte: tuNgay,
                    lte: denNgay,
                },
                donNghiPhep: {
                    trangThai: 'DA_DUYET',
                },
            },
            include: {
                loaiNghi: true,
            },
        });
        let soNgayNghiCoPhep = 0;
        let soNgayNghiKhongPhep = 0;
        let soNgayNghiCoLuong = 0;
        let soNgayNghiKhongLuong = 0;
        for (const ct of chiTietNgays) {
            const soNgay = Number(ct.soGioNghi) / 8;
            if (ct.loaiNghi.nhomLoai === 'CO_PHEP') {
                soNgayNghiCoPhep += soNgay;
            }
            else {
                soNgayNghiKhongPhep += soNgay;
            }
            if (ct.coTinhLuong) {
                soNgayNghiCoLuong += soNgay;
            }
            else {
                soNgayNghiKhongLuong += soNgay;
            }
        }
        await this.prisma.ngayCongBangLuong.updateMany({
            where: {
                nhanVienId,
                bangLuong: {
                    thang: month,
                    nam: year,
                },
            },
            data: {
                soNgayNghiCoPhep,
                soNgayNghiCoLuong,
                soNgayNghiKhongLuong,
                soNgayNghiPhep: soNgayNghiCoPhep,
                soNgayNghiKhongPhep,
            },
        });
        this.logger.log(`Cập nhật NgayCongBangLuong tháng ${thangNam} cho NV #${nhanVienId}: ` +
            `nghỉ có phép=${soNgayNghiCoPhep}, không phép=${soNgayNghiKhongPhep}`);
        return {
            soNgayNghiCoPhep,
            soNgayNghiKhongPhep,
            soNgayNghiCoLuong,
            soNgayNghiKhongLuong,
        };
    }
    async rebuildMapping(donNghiPhepId) {
        const donNghi = await this.prisma.donNghiPhep.findUnique({
            where: { id: donNghiPhepId },
        });
        if (!donNghi) {
            throw new common_1.NotFoundException(`Không tìm thấy đơn nghỉ phép #${donNghiPhepId}`);
        }
        const { soNgayTao } = await this.taoChiTietNgayNghi(donNghiPhepId);
        const { soNgayCapNhat: soNgayCapNhatChamCong } = await this.dongBoChamCong(donNghiPhepId);
        const tuNgay = new Date(donNghi.tuNgay);
        const denNgay = new Date(donNghi.denNgay);
        const thangNams = new Set();
        for (let d = new Date(tuNgay); d <= denNgay; d.setMonth(d.getMonth() + 1)) {
            thangNams.add(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`);
        }
        let thongKeNgayCong = {
            soNgayNghiCoPhep: 0,
            soNgayNghiKhongPhep: 0,
            soNgayNghiCoLuong: 0,
            soNgayNghiKhongLuong: 0,
        };
        for (const thangNam of thangNams) {
            const thongKe = await this.capNhatNgayCongBangLuong(thangNam, donNghi.nhanVienId);
            thongKeNgayCong = {
                soNgayNghiCoPhep: thongKeNgayCong.soNgayNghiCoPhep + thongKe.soNgayNghiCoPhep,
                soNgayNghiKhongPhep: thongKeNgayCong.soNgayNghiKhongPhep + thongKe.soNgayNghiKhongPhep,
                soNgayNghiCoLuong: thongKeNgayCong.soNgayNghiCoLuong + thongKe.soNgayNghiCoLuong,
                soNgayNghiKhongLuong: thongKeNgayCong.soNgayNghiKhongLuong + thongKe.soNgayNghiKhongLuong,
            };
        }
        return {
            soNgayTao,
            soNgayCapNhatChamCong,
            thongKeNgayCong,
        };
    }
    async xoaMapping(donNghiPhepId) {
        const donNghi = await this.prisma.donNghiPhep.findUnique({
            where: { id: donNghiPhepId },
            include: { chiTietNgays: true },
        });
        if (!donNghi) {
            throw new common_1.NotFoundException(`Không tìm thấy đơn nghỉ phép #${donNghiPhepId}`);
        }
        const soNgayXoa = donNghi.chiTietNgays.length;
        await this.prisma.chiTietNghiPhepNgay.deleteMany({
            where: { donNghiPhepId },
        });
        const tuNgay = new Date(donNghi.tuNgay);
        const denNgay = new Date(donNghi.denNgay);
        const thangNams = new Set();
        for (let d = new Date(tuNgay); d <= denNgay; d.setMonth(d.getMonth() + 1)) {
            thangNams.add(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`);
        }
        for (const thangNam of thangNams) {
            await this.capNhatNgayCongBangLuong(thangNam, donNghi.nhanVienId);
        }
        this.logger.log(`Đã xóa ${soNgayXoa} chi tiết ngày nghỉ cho đơn #${donNghiPhepId}`);
        return { soNgayXoa };
    }
    async layLichNghiNhanVien(nhanVienId, tuNgay, denNgay) {
        const chiTietNgays = await this.prisma.chiTietNghiPhepNgay.findMany({
            where: {
                nhanVienId,
                ngay: {
                    gte: tuNgay,
                    lte: denNgay,
                },
                donNghiPhep: {
                    trangThai: 'DA_DUYET',
                },
            },
            include: {
                loaiNghi: {
                    select: {
                        id: true,
                        maLoaiNghi: true,
                        tenLoaiNghi: true,
                    },
                },
                donNghiPhep: {
                    select: {
                        id: true,
                        maDon: true,
                        trangThai: true,
                    },
                },
            },
            orderBy: { ngay: 'asc' },
        });
        return {
            chiTietNgays: chiTietNgays.map((ct) => ({
                ngay: ct.ngay,
                soGioNghi: Number(ct.soGioNghi),
                loaiNghi: ct.loaiNghi,
                coTinhLuong: ct.coTinhLuong,
                coTinhChuyenCan: ct.coTinhChuyenCan,
                donNghiPhep: ct.donNghiPhep,
            })),
        };
    }
};
exports.NghiPhepMappingService = NghiPhepMappingService;
exports.NghiPhepMappingService = NghiPhepMappingService = NghiPhepMappingService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], NghiPhepMappingService);
//# sourceMappingURL=nghi-phep-mapping.service.js.map