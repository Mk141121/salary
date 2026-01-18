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
exports.TimesheetService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let TimesheetService = class TimesheetService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async layBangCongThang(query) {
        const { thang, nam, phongBanId, nhanVienId, search, page = 1, limit = 20 } = query;
        const skip = (page - 1) * limit;
        const ngayDau = new Date(nam, thang - 1, 1);
        const ngayCuoi = new Date(nam, thang, 0);
        const whereNhanVien = {
            trangThai: 'DANG_LAM',
        };
        if (phongBanId) {
            whereNhanVien.phongBanId = phongBanId;
        }
        if (nhanVienId) {
            whereNhanVien.id = nhanVienId;
        }
        if (search) {
            whereNhanVien.OR = [
                { hoTen: { contains: search, mode: 'insensitive' } },
                { maNhanVien: { contains: search, mode: 'insensitive' } },
            ];
        }
        const [totalNhanVien, nhanViens] = await Promise.all([
            this.prisma.nhanVien.count({ where: whereNhanVien }),
            this.prisma.nhanVien.findMany({
                where: whereNhanVien,
                skip,
                take: limit,
                orderBy: [{ phongBanId: 'asc' }, { hoTen: 'asc' }],
                select: {
                    id: true,
                    hoTen: true,
                    maNhanVien: true,
                    phongBan: { select: { id: true, tenPhongBan: true } },
                },
            }),
        ]);
        const nhanVienIds = nhanViens.map((nv) => nv.id);
        const chiTietChamCongs = await this.prisma.chiTietChamCong.findMany({
            where: {
                nhanVienId: { in: nhanVienIds },
                ngay: { gte: ngayDau, lte: ngayCuoi },
            },
            include: {
                caLamViec: { select: { id: true, tenCa: true } },
            },
            orderBy: { ngay: 'asc' },
        });
        const yeuCauSuaCongs = await this.prisma.yeuCauSuaCong.findMany({
            where: {
                nhanVienId: { in: nhanVienIds },
                ngayChamCong: { gte: ngayDau, lte: ngayCuoi },
                trangThaiDuyet: 'CHO_DUYET',
            },
            select: { nhanVienId: true, ngayChamCong: true },
        });
        const yeuCauMap = new Set(yeuCauSuaCongs.map((yc) => `${yc.nhanVienId}-${yc.ngayChamCong.toISOString().slice(0, 10)}`));
        const chiTietMap = new Map();
        for (const ct of chiTietChamCongs) {
            if (!chiTietMap.has(ct.nhanVienId)) {
                chiTietMap.set(ct.nhanVienId, []);
            }
            chiTietMap.get(ct.nhanVienId).push(ct);
        }
        const data = nhanViens.map((nv) => {
            const chiTiets = chiTietMap.get(nv.id) || [];
            const tongKet = {
                soNgayDiLam: 0,
                soNgayNghi: 0,
                soNgayPhep: 0,
                soGioLam: 0,
                soGioOT: 0,
                soLanDiTre: 0,
                soLanVeSom: 0,
                tongPhutDiTre: 0,
                tongPhutVeSom: 0,
            };
            const chiTietNgays = [];
            for (let d = 1; d <= ngayCuoi.getDate(); d++) {
                const ngay = new Date(nam, thang - 1, d);
                const ngayStr = ngay.toISOString().slice(0, 10);
                const thuTrongTuan = ngay.getDay();
                const ct = chiTiets.find((c) => c.ngay.toISOString().slice(0, 10) === ngayStr);
                const timesheetNgay = {
                    ngay: ngayStr,
                    thuTrongTuan,
                    loaiNgay: ct?.loaiNgay || this.xacDinhLoaiNgay(thuTrongTuan),
                    trangThai: ct?.trangThai || 'CHUA_XAC_DINH',
                    gioVao: ct?.gioVao?.toISOString(),
                    gioRa: ct?.gioRa?.toISOString(),
                    gioVaoDuKien: ct?.gioVaoDuKien?.toISOString(),
                    gioRaDuKien: ct?.gioRaDuKien?.toISOString(),
                    caLamViec: ct?.caLamViec || undefined,
                    soGioLam: Number(ct?.soGioLam || 0),
                    soGioOT: Number(ct?.soGioOT || 0),
                    phutDiTre: ct?.phutDiTre || undefined,
                    phutVeSom: ct?.phutVeSom || undefined,
                    ghiChu: ct?.ghiChu || undefined,
                    coYeuCauSuaCong: yeuCauMap.has(`${nv.id}-${ngayStr}`),
                };
                chiTietNgays.push(timesheetNgay);
                if (ct) {
                    if (ct.trangThai === 'DI_LAM') {
                        tongKet.soNgayDiLam++;
                    }
                    else if (ct.trangThai === 'NGHI_PHEP') {
                        tongKet.soNgayPhep++;
                    }
                    else if (['NGHI_KHONG_LUONG', 'NGHI_BENH'].includes(ct.trangThai)) {
                        tongKet.soNgayNghi++;
                    }
                    tongKet.soGioLam += Number(ct.soGioLam || 0);
                    tongKet.soGioOT += Number(ct.soGioOT || 0);
                    if (ct.phutDiTre && ct.phutDiTre > 0) {
                        tongKet.soLanDiTre++;
                        tongKet.tongPhutDiTre += ct.phutDiTre;
                    }
                    if (ct.phutVeSom && ct.phutVeSom > 0) {
                        tongKet.soLanVeSom++;
                        tongKet.tongPhutVeSom += ct.phutVeSom;
                    }
                }
            }
            return {
                nhanVienId: nv.id,
                hoTen: nv.hoTen,
                maNhanVien: nv.maNhanVien,
                phongBan: nv.phongBan || undefined,
                chiTiet: chiTietNgays,
                tongKet,
            };
        });
        const thongKe = await this.layThongKeTimesheet(thang, nam, phongBanId);
        return {
            data,
            total: totalNhanVien,
            page,
            limit,
            totalPages: Math.ceil(totalNhanVien / limit),
            thongKe,
        };
    }
    async layBangCongNhanVien(nhanVienId, thang, nam) {
        const result = await this.layBangCongThang({
            thang,
            nam,
            nhanVienId,
            page: 1,
            limit: 1,
        });
        return result.data[0] || null;
    }
    async taoYeuCauSuaCong(dto, nguoiTaoId) {
        const ngay = new Date(dto.ngayChamCong);
        const thang = ngay.getMonth() + 1;
        const nam = ngay.getFullYear();
        const nhanVien = await this.prisma.nhanVien.findUnique({
            where: { id: dto.nhanVienId },
            select: { phongBanId: true },
        });
        if (nhanVien?.phongBanId) {
            const bangLuong = await this.prisma.bangLuong.findFirst({
                where: {
                    thang,
                    nam,
                    phongBanId: nhanVien.phongBanId,
                    trangThai: { in: ['DA_CHOT', 'KHOA'] },
                },
            });
            if (bangLuong) {
                throw new common_1.BadRequestException(`Không thể sửa công ngày ${dto.ngayChamCong}. Bảng lương tháng ${thang}/${nam} đã chốt.`);
            }
        }
        const chiTiet = await this.prisma.chiTietChamCong.findUnique({
            where: {
                nhanVienId_ngay: {
                    nhanVienId: dto.nhanVienId,
                    ngay,
                },
            },
        });
        const yeuCau = await this.prisma.yeuCauSuaCong.create({
            data: {
                nhanVienId: dto.nhanVienId,
                ngayChamCong: ngay,
                gioVaoCu: chiTiet?.gioVao,
                gioRaCu: chiTiet?.gioRa,
                trangThaiCu: chiTiet?.trangThai,
                gioVaoMoi: dto.gioVaoMoi ? new Date(dto.gioVaoMoi) : null,
                gioRaMoi: dto.gioRaMoi ? new Date(dto.gioRaMoi) : null,
                trangThaiMoi: dto.trangThaiMoi,
                lyDo: dto.lyDo,
                bangChung: dto.bangChung,
                nguoiTaoId,
            },
        });
        return this.mapYeuCauSuaCongResponse(yeuCau);
    }
    async duyetYeuCauSuaCong(id, dto, nguoiDuyetId) {
        const yeuCau = await this.prisma.yeuCauSuaCong.findUnique({
            where: { id },
        });
        if (!yeuCau) {
            throw new common_1.NotFoundException('Không tìm thấy yêu cầu sửa công');
        }
        if (yeuCau.trangThaiDuyet !== 'CHO_DUYET') {
            throw new common_1.BadRequestException('Yêu cầu đã được xử lý');
        }
        if (dto.trangThaiDuyet === 'TU_CHOI' && !dto.lyDoTuChoi) {
            throw new common_1.BadRequestException('Vui lòng nhập lý do từ chối');
        }
        const updated = await this.prisma.yeuCauSuaCong.update({
            where: { id },
            data: {
                trangThaiDuyet: dto.trangThaiDuyet,
                nguoiDuyetId,
                ngayDuyet: new Date(),
                lyDoTuChoi: dto.lyDoTuChoi,
            },
        });
        if (dto.trangThaiDuyet === 'DA_DUYET') {
            await this.applyYeuCauSuaCong(yeuCau, nguoiDuyetId);
        }
        return this.mapYeuCauSuaCongResponse(updated);
    }
    async layDanhSachYeuCauSuaCong(query) {
        const page = query.page || 1;
        const limit = query.limit || 20;
        const skip = (page - 1) * limit;
        const where = {};
        if (query.nhanVienId) {
            where.nhanVienId = query.nhanVienId;
        }
        if (query.trangThaiDuyet) {
            where.trangThaiDuyet = query.trangThaiDuyet;
        }
        if (query.tuNgay || query.denNgay) {
            where.ngayChamCong = {};
            if (query.tuNgay) {
                where.ngayChamCong.gte = new Date(query.tuNgay);
            }
            if (query.denNgay) {
                where.ngayChamCong.lte = new Date(query.denNgay);
            }
        }
        if (query.phongBanId) {
            const nhanVienIds = await this.prisma.nhanVien.findMany({
                where: { phongBanId: query.phongBanId },
                select: { id: true },
            });
            where.nhanVienId = { in: nhanVienIds.map((nv) => nv.id) };
        }
        const [data, total] = await Promise.all([
            this.prisma.yeuCauSuaCong.findMany({
                where,
                skip,
                take: limit,
                orderBy: { ngayTao: 'desc' },
            }),
            this.prisma.yeuCauSuaCong.count({ where }),
        ]);
        const nhanVienIds = [...new Set(data.flatMap((d) => [d.nhanVienId, d.nguoiTaoId, d.nguoiDuyetId].filter(Boolean)))];
        const nhanViens = await this.prisma.nhanVien.findMany({
            where: { id: { in: nhanVienIds } },
            select: { id: true, hoTen: true, maNhanVien: true },
        });
        const nhanVienMap = new Map(nhanViens.map((nv) => [nv.id, nv]));
        return {
            data: data.map((d) => ({
                ...this.mapYeuCauSuaCongResponse(d),
                nhanVien: nhanVienMap.get(d.nhanVienId),
                nguoiTao: nhanVienMap.get(d.nguoiTaoId),
                nguoiDuyet: d.nguoiDuyetId ? nhanVienMap.get(d.nguoiDuyetId) : undefined,
            })),
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }
    async suaCongTrucTiep(dto, nguoiThucHienId) {
        const ngay = new Date(dto.ngayChamCong);
        const thang = ngay.getMonth() + 1;
        const nam = ngay.getFullYear();
        const nhanVien = await this.prisma.nhanVien.findUnique({
            where: { id: dto.nhanVienId },
            select: { phongBanId: true },
        });
        if (nhanVien?.phongBanId) {
            const bangLuong = await this.prisma.bangLuong.findFirst({
                where: {
                    thang,
                    nam,
                    phongBanId: nhanVien.phongBanId,
                    trangThai: { in: ['DA_CHOT', 'KHOA'] },
                },
            });
            if (bangLuong) {
                throw new common_1.BadRequestException(`Không thể sửa công ngày ${dto.ngayChamCong}. Bảng lương tháng ${thang}/${nam} đã chốt.`);
            }
        }
        const chiTietCu = await this.prisma.chiTietChamCong.findUnique({
            where: {
                nhanVienId_ngay: {
                    nhanVienId: dto.nhanVienId,
                    ngay,
                },
            },
        });
        const updateData = {};
        const lichSuItems = [];
        if (dto.gioVao !== undefined) {
            const giaTriMoi = dto.gioVao ? new Date(dto.gioVao) : null;
            updateData.gioVao = giaTriMoi;
            lichSuItems.push({
                nhanVienId: dto.nhanVienId,
                ngayChamCong: ngay,
                truongThayDoi: 'gioVao',
                giaTriCu: chiTietCu?.gioVao?.toISOString() || null,
                giaTriMoi: giaTriMoi?.toISOString() || null,
                nguonThayDoi: 'MANUAL',
                nguoiThucHienId,
                ghiChu: dto.ghiChu,
            });
        }
        if (dto.gioRa !== undefined) {
            const giaTriMoi = dto.gioRa ? new Date(dto.gioRa) : null;
            updateData.gioRa = giaTriMoi;
            lichSuItems.push({
                nhanVienId: dto.nhanVienId,
                ngayChamCong: ngay,
                truongThayDoi: 'gioRa',
                giaTriCu: chiTietCu?.gioRa?.toISOString() || null,
                giaTriMoi: giaTriMoi?.toISOString() || null,
                nguonThayDoi: 'MANUAL',
                nguoiThucHienId,
                ghiChu: dto.ghiChu,
            });
        }
        if (dto.trangThai !== undefined) {
            updateData.trangThai = dto.trangThai;
            lichSuItems.push({
                nhanVienId: dto.nhanVienId,
                ngayChamCong: ngay,
                truongThayDoi: 'trangThai',
                giaTriCu: chiTietCu?.trangThai || null,
                giaTriMoi: dto.trangThai,
                nguonThayDoi: 'MANUAL',
                nguoiThucHienId,
                ghiChu: dto.ghiChu,
            });
        }
        if (dto.loaiNgay !== undefined) {
            updateData.loaiNgay = dto.loaiNgay;
            lichSuItems.push({
                nhanVienId: dto.nhanVienId,
                ngayChamCong: ngay,
                truongThayDoi: 'loaiNgay',
                giaTriCu: chiTietCu?.loaiNgay || null,
                giaTriMoi: dto.loaiNgay,
                nguonThayDoi: 'MANUAL',
                nguoiThucHienId,
                ghiChu: dto.ghiChu,
            });
        }
        updateData.ghiChu = dto.ghiChu;
        const chiTiet = await this.prisma.chiTietChamCong.upsert({
            where: {
                nhanVienId_ngay: {
                    nhanVienId: dto.nhanVienId,
                    ngay,
                },
            },
            create: {
                nhanVienId: dto.nhanVienId,
                ngay,
                ...updateData,
                loaiNgay: dto.loaiNgay || this.xacDinhLoaiNgay(ngay.getDay()),
                trangThai: dto.trangThai || 'DI_LAM',
            },
            update: updateData,
            include: {
                caLamViec: { select: { id: true, tenCa: true } },
            },
        });
        if (lichSuItems.length > 0) {
            await this.prisma.lichSuSuaCong.createMany({ data: lichSuItems });
        }
        return {
            ngay: chiTiet.ngay.toISOString().slice(0, 10),
            thuTrongTuan: chiTiet.ngay.getDay(),
            loaiNgay: chiTiet.loaiNgay,
            trangThai: chiTiet.trangThai,
            gioVao: chiTiet.gioVao?.toISOString(),
            gioRa: chiTiet.gioRa?.toISOString(),
            gioVaoDuKien: chiTiet.gioVaoDuKien?.toISOString(),
            gioRaDuKien: chiTiet.gioRaDuKien?.toISOString(),
            caLamViec: chiTiet.caLamViec || undefined,
            soGioLam: Number(chiTiet.soGioLam),
            soGioOT: Number(chiTiet.soGioOT),
            phutDiTre: chiTiet.phutDiTre || undefined,
            phutVeSom: chiTiet.phutVeSom || undefined,
            ghiChu: chiTiet.ghiChu || undefined,
        };
    }
    async layLichSuSuaCong(query) {
        const page = query.page || 1;
        const limit = query.limit || 20;
        const skip = (page - 1) * limit;
        const where = {};
        if (query.nhanVienId) {
            where.nhanVienId = query.nhanVienId;
        }
        if (query.tuNgay || query.denNgay) {
            where.ngayChamCong = {};
            if (query.tuNgay) {
                where.ngayChamCong.gte = new Date(query.tuNgay);
            }
            if (query.denNgay) {
                where.ngayChamCong.lte = new Date(query.denNgay);
            }
        }
        const [data, total] = await Promise.all([
            this.prisma.lichSuSuaCong.findMany({
                where,
                skip,
                take: limit,
                orderBy: { ngayTao: 'desc' },
            }),
            this.prisma.lichSuSuaCong.count({ where }),
        ]);
        const allIds = new Set();
        data.forEach((d) => {
            allIds.add(d.nhanVienId);
            allIds.add(d.nguoiThucHienId);
        });
        const nhanViens = await this.prisma.nhanVien.findMany({
            where: { id: { in: Array.from(allIds) } },
            select: { id: true, hoTen: true, maNhanVien: true },
        });
        const nhanVienMap = new Map(nhanViens.map((nv) => [nv.id, nv]));
        return {
            data: data.map((d) => ({
                id: d.id,
                nhanVienId: d.nhanVienId,
                ngayChamCong: d.ngayChamCong,
                truongThayDoi: d.truongThayDoi,
                giaTriCu: d.giaTriCu || undefined,
                giaTriMoi: d.giaTriMoi || undefined,
                nguonThayDoi: d.nguonThayDoi,
                yeuCauSuaCongId: d.yeuCauSuaCongId || undefined,
                nguoiThucHienId: d.nguoiThucHienId,
                ghiChu: d.ghiChu || undefined,
                ngayTao: d.ngayTao,
                nhanVien: nhanVienMap.get(d.nhanVienId),
                nguoiThucHien: nhanVienMap.get(d.nguoiThucHienId),
            })),
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }
    async layThongKeTimesheet(thang, nam, phongBanId) {
        const ngayDau = new Date(nam, thang - 1, 1);
        const ngayCuoi = new Date(nam, thang, 0);
        const whereNhanVien = { trangThai: 'DANG_LAM' };
        if (phongBanId) {
            whereNhanVien.phongBanId = phongBanId;
        }
        const tongNhanVien = await this.prisma.nhanVien.count({ where: whereNhanVien });
        const nhanVienIds = await this.prisma.nhanVien.findMany({
            where: whereNhanVien,
            select: { id: true },
        }).then((nvs) => nvs.map((nv) => nv.id));
        const chamCongs = await this.prisma.chiTietChamCong.groupBy({
            by: ['trangThai'],
            where: {
                nhanVienId: { in: nhanVienIds },
                ngay: { gte: ngayDau, lte: ngayCuoi },
            },
            _count: { _all: true },
        });
        const aggregates = await this.prisma.chiTietChamCong.aggregate({
            where: {
                nhanVienId: { in: nhanVienIds },
                ngay: { gte: ngayDau, lte: ngayCuoi },
            },
            _sum: {
                soGioOT: true,
                phutDiTre: true,
                phutVeSom: true,
            },
            _count: {
                _all: true,
            },
        });
        const diTre = await this.prisma.chiTietChamCong.count({
            where: {
                nhanVienId: { in: nhanVienIds },
                ngay: { gte: ngayDau, lte: ngayCuoi },
                phutDiTre: { gt: 0 },
            },
        });
        const veSom = await this.prisma.chiTietChamCong.count({
            where: {
                nhanVienId: { in: nhanVienIds },
                ngay: { gte: ngayDau, lte: ngayCuoi },
                phutVeSom: { gt: 0 },
            },
        });
        const yeuCauStats = await this.prisma.yeuCauSuaCong.groupBy({
            by: ['trangThaiDuyet'],
            where: {
                nhanVienId: { in: nhanVienIds },
                ngayChamCong: { gte: ngayDau, lte: ngayCuoi },
            },
            _count: { _all: true },
        });
        const tongNgayCong = chamCongs.find((c) => c.trangThai === 'DI_LAM')?._count._all || 0;
        const tongNgayNghi = (chamCongs.find((c) => c.trangThai === 'NGHI_KHONG_LUONG')?._count._all || 0) +
            (chamCongs.find((c) => c.trangThai === 'NGHI_BENH')?._count._all || 0);
        const tongNgayPhep = chamCongs.find((c) => c.trangThai === 'NGHI_PHEP')?._count._all || 0;
        return {
            thang,
            nam,
            tongNhanVien,
            tongNgayCong,
            tongNgayNghi,
            tongNgayPhep,
            tongGioOT: Number(aggregates._sum.soGioOT || 0),
            tongLanDiTre: diTre,
            tongLanVeSom: veSom,
            yeuCauSuaCong: {
                choDuyet: yeuCauStats.find((y) => y.trangThaiDuyet === 'CHO_DUYET')?._count._all || 0,
                daDuyet: yeuCauStats.find((y) => y.trangThaiDuyet === 'DA_DUYET')?._count._all || 0,
                tuChoi: yeuCauStats.find((y) => y.trangThaiDuyet === 'TU_CHOI')?._count._all || 0,
            },
        };
    }
    async applyYeuCauSuaCong(yeuCau, nguoiThucHienId) {
        const ngay = new Date(yeuCau.ngayChamCong);
        const updateData = {};
        const lichSuItems = [];
        if (yeuCau.gioVaoMoi !== null) {
            updateData.gioVao = yeuCau.gioVaoMoi;
            lichSuItems.push({
                nhanVienId: yeuCau.nhanVienId,
                ngayChamCong: ngay,
                truongThayDoi: 'gioVao',
                giaTriCu: yeuCau.gioVaoCu?.toISOString() || null,
                giaTriMoi: yeuCau.gioVaoMoi?.toISOString() || null,
                nguonThayDoi: 'YEU_CAU',
                yeuCauSuaCongId: yeuCau.id,
                nguoiThucHienId,
                ghiChu: yeuCau.lyDo,
            });
        }
        if (yeuCau.gioRaMoi !== null) {
            updateData.gioRa = yeuCau.gioRaMoi;
            lichSuItems.push({
                nhanVienId: yeuCau.nhanVienId,
                ngayChamCong: ngay,
                truongThayDoi: 'gioRa',
                giaTriCu: yeuCau.gioRaCu?.toISOString() || null,
                giaTriMoi: yeuCau.gioRaMoi?.toISOString() || null,
                nguonThayDoi: 'YEU_CAU',
                yeuCauSuaCongId: yeuCau.id,
                nguoiThucHienId,
                ghiChu: yeuCau.lyDo,
            });
        }
        if (yeuCau.trangThaiMoi) {
            updateData.trangThai = yeuCau.trangThaiMoi;
            lichSuItems.push({
                nhanVienId: yeuCau.nhanVienId,
                ngayChamCong: ngay,
                truongThayDoi: 'trangThai',
                giaTriCu: yeuCau.trangThaiCu || null,
                giaTriMoi: yeuCau.trangThaiMoi,
                nguonThayDoi: 'YEU_CAU',
                yeuCauSuaCongId: yeuCau.id,
                nguoiThucHienId,
                ghiChu: yeuCau.lyDo,
            });
        }
        await this.prisma.chiTietChamCong.upsert({
            where: {
                nhanVienId_ngay: {
                    nhanVienId: yeuCau.nhanVienId,
                    ngay,
                },
            },
            create: {
                nhanVienId: yeuCau.nhanVienId,
                ngay,
                ...updateData,
                loaiNgay: this.xacDinhLoaiNgay(ngay.getDay()),
                trangThai: yeuCau.trangThaiMoi || 'DI_LAM',
            },
            update: updateData,
        });
        if (lichSuItems.length > 0) {
            await this.prisma.lichSuSuaCong.createMany({ data: lichSuItems });
        }
    }
    xacDinhLoaiNgay(thuTrongTuan) {
        if (thuTrongTuan === 0)
            return 'CHU_NHAT';
        if (thuTrongTuan === 6)
            return 'THU_BAY';
        return 'NGAY_THUONG';
    }
    mapYeuCauSuaCongResponse(yeuCau) {
        return {
            id: yeuCau.id,
            nhanVienId: yeuCau.nhanVienId,
            ngayChamCong: yeuCau.ngayChamCong,
            gioVaoCu: yeuCau.gioVaoCu,
            gioRaCu: yeuCau.gioRaCu,
            trangThaiCu: yeuCau.trangThaiCu,
            gioVaoMoi: yeuCau.gioVaoMoi,
            gioRaMoi: yeuCau.gioRaMoi,
            trangThaiMoi: yeuCau.trangThaiMoi,
            lyDo: yeuCau.lyDo,
            bangChung: yeuCau.bangChung,
            trangThaiDuyet: yeuCau.trangThaiDuyet,
            nguoiDuyetId: yeuCau.nguoiDuyetId,
            ngayDuyet: yeuCau.ngayDuyet,
            lyDoTuChoi: yeuCau.lyDoTuChoi,
            nguoiTaoId: yeuCau.nguoiTaoId,
            ngayTao: yeuCau.ngayTao,
        };
    }
};
exports.TimesheetService = TimesheetService;
exports.TimesheetService = TimesheetService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TimesheetService);
//# sourceMappingURL=timesheet.service.js.map