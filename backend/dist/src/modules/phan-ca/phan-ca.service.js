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
exports.PhanCaService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const ca_lam_viec_service_1 = require("../ca-lam-viec/ca-lam-viec.service");
let PhanCaService = class PhanCaService {
    constructor(prisma, caLamViecService) {
        this.prisma = prisma;
        this.caLamViecService = caLamViecService;
    }
    async layDanhSach(filter) {
        const where = {};
        if (filter.thangNam) {
            where.thangNam = filter.thangNam;
        }
        if (filter.phongBanId !== undefined) {
            where.phongBanId = filter.phongBanId;
        }
        if (filter.nhomId !== undefined) {
            where.nhomId = filter.nhomId;
        }
        if (filter.trangThai) {
            where.trangThai = filter.trangThai;
        }
        const danhSach = await this.prisma.lichPhanCa.findMany({
            where,
            orderBy: [{ thangNam: 'desc' }, { ngayTao: 'desc' }],
            include: {
                _count: {
                    select: { chiTiets: true },
                },
            },
        });
        return {
            data: danhSach,
            total: danhSach.length,
        };
    }
    async layChiTiet(id) {
        const lich = await this.prisma.lichPhanCa.findUnique({
            where: { id },
            include: {
                chiTiets: {
                    include: {
                        caLamViec: {
                            select: {
                                id: true,
                                maCa: true,
                                tenCa: true,
                                gioVao: true,
                                gioRa: true,
                                mauHienThi: true,
                                isCaDem: true,
                            },
                        },
                    },
                    orderBy: [{ ngay: 'asc' }, { nhanVienId: 'asc' }],
                },
            },
        });
        if (!lich) {
            throw new common_1.NotFoundException(`Không tìm thấy lịch phân ca với ID: ${id}`);
        }
        return lich;
    }
    async tao(dto, nguoiTaoId) {
        if (!dto.phongBanId && !dto.nhomId) {
            throw new common_1.BadRequestException('Phải chọn phòng ban hoặc nhóm nhân viên');
        }
        const existing = await this.prisma.lichPhanCa.findFirst({
            where: {
                thangNam: dto.thangNam,
                phongBanId: dto.phongBanId || null,
                nhomId: dto.nhomId || null,
                trangThai: { not: 'HUY' },
            },
        });
        if (existing) {
            throw new common_1.ConflictException(`Đã tồn tại lịch phân ca cho tháng ${dto.thangNam} với phòng ban/nhóm này`);
        }
        const lich = await this.prisma.lichPhanCa.create({
            data: {
                thangNam: dto.thangNam,
                phongBanId: dto.phongBanId,
                nhomId: dto.nhomId,
                tenLich: dto.tenLich || `Lịch phân ca ${dto.thangNam}`,
                ghiChu: dto.ghiChu,
                taoBoi: nguoiTaoId,
            },
        });
        return lich;
    }
    async capNhat(id, dto, nguoiCapNhatId) {
        const lich = await this.layChiTiet(id);
        if (lich.trangThai === 'DA_CONG_BO') {
            throw new common_1.BadRequestException('Không thể sửa lịch đã công bố');
        }
        return this.prisma.lichPhanCa.update({
            where: { id },
            data: {
                ...dto,
                capNhatBoi: nguoiCapNhatId,
            },
        });
    }
    async assignNgay(lichId, dto, nguoiTaoId) {
        const lich = await this.layChiTiet(lichId);
        if (lich.trangThai === 'DA_CONG_BO') {
            throw new common_1.BadRequestException('Không thể sửa lịch đã công bố');
        }
        const ngay = new Date(dto.ngay);
        const thangNamNgay = `${ngay.getFullYear()}-${String(ngay.getMonth() + 1).padStart(2, '0')}`;
        if (thangNamNgay !== lich.thangNam) {
            throw new common_1.BadRequestException(`Ngày ${dto.ngay} không thuộc tháng ${lich.thangNam}`);
        }
        await this.caLamViecService.layChiTiet(dto.caLamViecId);
        const result = await this.prisma.lichPhanCaChiTiet.upsert({
            where: {
                nhanVienId_ngay: {
                    nhanVienId: dto.nhanVienId,
                    ngay: ngay,
                },
            },
            update: {
                caLamViecId: dto.caLamViecId,
                ghiChu: dto.ghiChu,
            },
            create: {
                lichPhanCaId: lichId,
                nhanVienId: dto.nhanVienId,
                ngay: ngay,
                caLamViecId: dto.caLamViecId,
                ghiChu: dto.ghiChu,
                taoBoi: nguoiTaoId,
            },
            include: {
                caLamViec: true,
            },
        });
        return result;
    }
    async assignBatch(lichId, dto, nguoiTaoId) {
        const lich = await this.layChiTiet(lichId);
        if (lich.trangThai === 'DA_CONG_BO') {
            throw new common_1.BadRequestException('Không thể sửa lịch đã công bố');
        }
        await this.caLamViecService.layChiTiet(dto.caLamViecId);
        const tuNgay = new Date(dto.tuNgay);
        const denNgay = new Date(dto.denNgay);
        const ngoaiTruThu = new Set(dto.ngoaiTruThu || []);
        const ngays = [];
        const current = new Date(tuNgay);
        while (current <= denNgay) {
            const thu = current.getDay();
            if (!ngoaiTruThu.has(thu)) {
                ngays.push(new Date(current));
            }
            current.setDate(current.getDate() + 1);
        }
        for (const ngay of ngays) {
            const thangNamNgay = `${ngay.getFullYear()}-${String(ngay.getMonth() + 1).padStart(2, '0')}`;
            if (thangNamNgay !== lich.thangNam) {
                throw new common_1.BadRequestException(`Ngày không thuộc tháng ${lich.thangNam}`);
            }
        }
        const dataToUpsert = [];
        for (const nhanVienId of dto.nhanVienIds) {
            for (const ngay of ngays) {
                dataToUpsert.push({
                    nhanVienId,
                    ngay,
                    caLamViecId: dto.caLamViecId,
                    ghiChu: dto.ghiChu,
                });
            }
        }
        let created = 0;
        let updated = 0;
        await this.prisma.$transaction(async (tx) => {
            for (const item of dataToUpsert) {
                const existing = await tx.lichPhanCaChiTiet.findUnique({
                    where: {
                        nhanVienId_ngay: {
                            nhanVienId: item.nhanVienId,
                            ngay: item.ngay,
                        },
                    },
                });
                if (existing) {
                    await tx.lichPhanCaChiTiet.update({
                        where: { id: existing.id },
                        data: {
                            caLamViecId: item.caLamViecId,
                            ghiChu: item.ghiChu,
                        },
                    });
                    updated++;
                }
                else {
                    await tx.lichPhanCaChiTiet.create({
                        data: {
                            lichPhanCaId: lichId,
                            nhanVienId: item.nhanVienId,
                            ngay: item.ngay,
                            caLamViecId: item.caLamViecId,
                            ghiChu: item.ghiChu,
                            taoBoi: nguoiTaoId,
                        },
                    });
                    created++;
                }
            }
        });
        return {
            message: `Đã phân ca thành công`,
            created,
            updated,
            total: created + updated,
        };
    }
    async copyTuan(lichId, dto, nguoiTaoId) {
        const lich = await this.layChiTiet(lichId);
        if (lich.trangThai === 'DA_CONG_BO') {
            throw new common_1.BadRequestException('Không thể sửa lịch đã công bố');
        }
        const tuanNguonDate = new Date(dto.tuanNguon);
        const tuanDichDate = new Date(dto.tuanDich);
        const getMondayOfWeek = (date) => {
            const d = new Date(date);
            const day = d.getDay();
            const diff = d.getDate() - day + (day === 0 ? -6 : 1);
            return new Date(d.setDate(diff));
        };
        const mondayNguon = getMondayOfWeek(tuanNguonDate);
        const mondayDich = getMondayOfWeek(tuanDichDate);
        const sundayNguon = new Date(mondayNguon);
        sundayNguon.setDate(sundayNguon.getDate() + 6);
        const whereNguon = {
            lichPhanCaId: lichId,
            ngay: {
                gte: mondayNguon,
                lte: sundayNguon,
            },
        };
        if (dto.nhanVienIds && dto.nhanVienIds.length > 0) {
            whereNguon.nhanVienId = { in: dto.nhanVienIds };
        }
        const dataNguon = await this.prisma.lichPhanCaChiTiet.findMany({
            where: whereNguon,
        });
        if (dataNguon.length === 0) {
            throw new common_1.BadRequestException('Không có dữ liệu phân ca trong tuần nguồn');
        }
        const offsetDays = Math.round((mondayDich.getTime() - mondayNguon.getTime()) / (1000 * 60 * 60 * 24));
        let created = 0;
        let updated = 0;
        await this.prisma.$transaction(async (tx) => {
            for (const item of dataNguon) {
                const ngayDich = new Date(item.ngay);
                ngayDich.setDate(ngayDich.getDate() + offsetDays);
                const thangNamDich = `${ngayDich.getFullYear()}-${String(ngayDich.getMonth() + 1).padStart(2, '0')}`;
                if (thangNamDich !== lich.thangNam) {
                    continue;
                }
                const existing = await tx.lichPhanCaChiTiet.findUnique({
                    where: {
                        nhanVienId_ngay: {
                            nhanVienId: item.nhanVienId,
                            ngay: ngayDich,
                        },
                    },
                });
                if (existing) {
                    await tx.lichPhanCaChiTiet.update({
                        where: { id: existing.id },
                        data: {
                            caLamViecId: item.caLamViecId,
                            ghiChu: item.ghiChu,
                        },
                    });
                    updated++;
                }
                else {
                    await tx.lichPhanCaChiTiet.create({
                        data: {
                            lichPhanCaId: lichId,
                            nhanVienId: item.nhanVienId,
                            ngay: ngayDich,
                            caLamViecId: item.caLamViecId,
                            ghiChu: item.ghiChu,
                            taoBoi: nguoiTaoId,
                        },
                    });
                    created++;
                }
            }
        });
        return {
            message: 'Đã copy tuần thành công',
            created,
            updated,
            total: created + updated,
        };
    }
    async layCalendarView(dto) {
        const whereNhanVien = { trangThai: 'DANG_LAM' };
        if (dto.phongBanId) {
            whereNhanVien.phongBanId = dto.phongBanId;
        }
        if (dto.nhanVienIds && dto.nhanVienIds.length > 0) {
            whereNhanVien.id = { in: dto.nhanVienIds };
        }
        const nhanViens = await this.prisma.nhanVien.findMany({
            where: whereNhanVien,
            select: {
                id: true,
                maNhanVien: true,
                hoTen: true,
                phongBanId: true,
            },
            orderBy: { hoTen: 'asc' },
        });
        const [year, month] = dto.thangNam.split('-').map(Number);
        const ngayDau = new Date(year, month - 1, 1);
        const ngayCuoi = new Date(year, month, 0);
        const phanCas = await this.prisma.lichPhanCaChiTiet.findMany({
            where: {
                nhanVienId: { in: nhanViens.map((nv) => nv.id) },
                ngay: {
                    gte: ngayDau,
                    lte: ngayCuoi,
                },
            },
            include: {
                caLamViec: {
                    select: {
                        id: true,
                        maCa: true,
                        tenCa: true,
                        gioVao: true,
                        gioRa: true,
                        mauHienThi: true,
                    },
                },
            },
        });
        const calendarData = nhanViens.map((nv) => {
            const phanCaNV = phanCas.filter((pc) => pc.nhanVienId === nv.id);
            const ngays = {};
            for (const pc of phanCaNV) {
                const ngayKey = pc.ngay.toISOString().split('T')[0];
                ngays[ngayKey] = {
                    caLamViecId: pc.caLamViecId,
                    maCa: pc.caLamViec.maCa,
                    tenCa: pc.caLamViec.tenCa,
                    gioVao: pc.caLamViec.gioVao,
                    gioRa: pc.caLamViec.gioRa,
                    mauHienThi: pc.caLamViec.mauHienThi,
                    ghiChu: pc.ghiChu,
                };
            }
            return {
                nhanVienId: nv.id,
                maNhanVien: nv.maNhanVien,
                hoTen: nv.hoTen,
                phongBanId: nv.phongBanId,
                ngays,
            };
        });
        const danhSachCa = await this.caLamViecService.layDanhSachActive(dto.phongBanId);
        return {
            thangNam: dto.thangNam,
            soNgayTrongThang: ngayCuoi.getDate(),
            ngayDauThang: ngayDau.getDay(),
            nhanViens: calendarData,
            danhSachCa,
        };
    }
    async publish(id, nguoiCongBoId) {
        const lich = await this.layChiTiet(id);
        if (lich.trangThai === 'DA_CONG_BO') {
            throw new common_1.BadRequestException('Lịch đã được công bố trước đó');
        }
        if (lich.trangThai === 'HUY') {
            throw new common_1.BadRequestException('Không thể công bố lịch đã hủy');
        }
        if (lich.chiTiets.length === 0) {
            throw new common_1.BadRequestException('Lịch chưa có phân ca nào');
        }
        let mapped = 0;
        let skipped = 0;
        await this.prisma.$transaction(async (tx) => {
            for (const ct of lich.chiTiets) {
                const ca = ct.caLamViec;
                const [gioVaoH, gioVaoM] = ca.gioVao.split(':').map(Number);
                const [gioRaH, gioRaM] = ca.gioRa.split(':').map(Number);
                const gioVaoDuKien = new Date(ct.ngay);
                gioVaoDuKien.setHours(gioVaoH, gioVaoM, 0, 0);
                const gioRaDuKien = new Date(ct.ngay);
                gioRaDuKien.setHours(gioRaH, gioRaM, 0, 0);
                if (ca.isCaDem && gioRaH < gioVaoH) {
                    gioRaDuKien.setDate(gioRaDuKien.getDate() + 1);
                }
                const existing = await tx.chiTietChamCong.findUnique({
                    where: {
                        nhanVienId_ngay: {
                            nhanVienId: ct.nhanVienId,
                            ngay: ct.ngay,
                        },
                    },
                });
                if (existing) {
                    if (!existing.gioVao && !existing.gioRa) {
                        await tx.chiTietChamCong.update({
                            where: { id: existing.id },
                            data: {
                                caLamViecId: ct.caLamViecId,
                                gioVaoDuKien,
                                gioRaDuKien,
                            },
                        });
                        mapped++;
                    }
                    else {
                        await tx.chiTietChamCong.update({
                            where: { id: existing.id },
                            data: {
                                caLamViecId: ct.caLamViecId,
                                gioVaoDuKien,
                                gioRaDuKien,
                            },
                        });
                        skipped++;
                    }
                }
                else {
                    await tx.chiTietChamCong.create({
                        data: {
                            nhanVienId: ct.nhanVienId,
                            ngay: ct.ngay,
                            caLamViecId: ct.caLamViecId,
                            gioVaoDuKien,
                            gioRaDuKien,
                            trangThai: 'DI_LAM',
                            loaiNgay: 'NGAY_THUONG',
                        },
                    });
                    mapped++;
                }
            }
            await tx.lichPhanCa.update({
                where: { id },
                data: {
                    trangThai: 'DA_CONG_BO',
                    ngayCongBo: new Date(),
                    nguoiCongBo: nguoiCongBoId,
                },
            });
        });
        return {
            message: 'Đã công bố lịch và mapping sang chấm công thành công',
            mapped,
            skipped,
            total: lich.chiTiets.length,
        };
    }
    async unpublish(id, nguoiCapNhatId) {
        const lich = await this.layChiTiet(id);
        if (lich.trangThai !== 'DA_CONG_BO') {
            throw new common_1.BadRequestException('Chỉ có thể hủy công bố lịch đã công bố');
        }
        const [year, month] = lich.thangNam.split('-').map(Number);
        const ngayDau = new Date(year, month - 1, 1);
        const ngayCuoi = new Date(year, month, 0);
        const coChamCongThucTe = await this.prisma.chiTietChamCong.count({
            where: {
                ngay: { gte: ngayDau, lte: ngayCuoi },
                caLamViecId: { not: null },
                OR: [{ gioVao: { not: null } }, { gioRa: { not: null } }],
            },
        });
        if (coChamCongThucTe > 0) {
            throw new common_1.BadRequestException(`Có ${coChamCongThucTe} record chấm công thực tế. Không thể hủy công bố.`);
        }
        await this.prisma.$transaction(async (tx) => {
            await tx.chiTietChamCong.deleteMany({
                where: {
                    caLamViecId: { not: null },
                    ngay: { gte: ngayDau, lte: ngayCuoi },
                    gioVao: null,
                    gioRa: null,
                },
            });
            await tx.lichPhanCa.update({
                where: { id },
                data: {
                    trangThai: 'NHAP',
                    ngayCongBo: null,
                    nguoiCongBo: null,
                    capNhatBoi: nguoiCapNhatId,
                },
            });
        });
        return { message: 'Đã hủy công bố lịch thành công' };
    }
    async xoa(id) {
        const lich = await this.layChiTiet(id);
        if (lich.trangThai === 'DA_CONG_BO') {
            throw new common_1.BadRequestException('Không thể xóa lịch đã công bố. Hãy hủy công bố trước.');
        }
        await this.prisma.lichPhanCa.delete({
            where: { id },
        });
        return { message: 'Đã xóa lịch phân ca thành công' };
    }
    async xoaChiTiet(lichId, chiTietIds) {
        const lich = await this.layChiTiet(lichId);
        if (lich.trangThai === 'DA_CONG_BO') {
            throw new common_1.BadRequestException('Không thể sửa lịch đã công bố');
        }
        const result = await this.prisma.lichPhanCaChiTiet.deleteMany({
            where: {
                id: { in: chiTietIds },
                lichPhanCaId: lichId,
            },
        });
        return {
            message: `Đã xóa ${result.count} phân ca`,
            deleted: result.count,
        };
    }
    async layLichCuaToi(nhanVienId, tuNgay, denNgay) {
        const from = new Date(tuNgay);
        const to = new Date(denNgay);
        const phanCas = await this.prisma.lichPhanCaChiTiet.findMany({
            where: {
                nhanVienId,
                ngay: { gte: from, lte: to },
                lichPhanCa: { trangThai: 'DA_CONG_BO' },
            },
            include: {
                caLamViec: {
                    select: {
                        id: true,
                        maCa: true,
                        tenCa: true,
                        gioVao: true,
                        gioRa: true,
                        isCaDem: true,
                        mauHienThi: true,
                    },
                },
            },
            orderBy: { ngay: 'asc' },
        });
        return phanCas.map((pc) => ({
            ngay: pc.ngay.toISOString().split('T')[0],
            ca: pc.caLamViec,
            ghiChu: pc.ghiChu,
        }));
    }
};
exports.PhanCaService = PhanCaService;
exports.PhanCaService = PhanCaService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        ca_lam_viec_service_1.CaLamViecService])
], PhanCaService);
//# sourceMappingURL=phan-ca.service.js.map