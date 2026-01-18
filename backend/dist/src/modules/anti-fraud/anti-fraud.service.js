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
exports.AntiFraudService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const library_1 = require("@prisma/client/runtime/library");
let AntiFraudService = class AntiFraudService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async layDanhSachGeofence(query) {
        const where = {};
        if (query.phongBanId !== undefined) {
            where.OR = [
                { phongBanId: query.phongBanId },
                { apDungTatCa: true },
            ];
        }
        if (query.trangThai !== undefined) {
            where.trangThai = query.trangThai;
        }
        const geofences = await this.prisma.cauHinhGeofence.findMany({
            where,
            orderBy: { tenDiaDiem: 'asc' },
        });
        return geofences.map(this.mapGeofenceResponse);
    }
    async layGeofence(id) {
        const geofence = await this.prisma.cauHinhGeofence.findUnique({
            where: { id },
        });
        if (!geofence) {
            throw new common_1.NotFoundException('Không tìm thấy geofence');
        }
        return this.mapGeofenceResponse(geofence);
    }
    async taoGeofence(dto, taoBoi) {
        const geofence = await this.prisma.cauHinhGeofence.create({
            data: {
                tenDiaDiem: dto.tenDiaDiem,
                diaChi: dto.diaChi,
                viDo: new library_1.Decimal(dto.viDo),
                kinhDo: new library_1.Decimal(dto.kinhDo),
                banKinhMet: dto.banKinhMet,
                phongBanId: dto.phongBanId,
                apDungTatCa: dto.apDungTatCa,
                batBuocGPS: dto.batBuocGPS,
                chanNgoaiVung: dto.chanNgoaiVung,
                taoBoi,
            },
        });
        return this.mapGeofenceResponse(geofence);
    }
    async capNhatGeofence(id, dto, capNhatBoi) {
        await this.layGeofence(id);
        const data = { ...dto, capNhatBoi };
        if (dto.viDo !== undefined)
            data.viDo = new library_1.Decimal(dto.viDo);
        if (dto.kinhDo !== undefined)
            data.kinhDo = new library_1.Decimal(dto.kinhDo);
        const updated = await this.prisma.cauHinhGeofence.update({
            where: { id },
            data,
        });
        return this.mapGeofenceResponse(updated);
    }
    async xoaGeofence(id) {
        await this.layGeofence(id);
        await this.prisma.cauHinhGeofence.delete({ where: { id } });
        return { success: true };
    }
    async layGeofenceChoNhanVien(nhanVienId) {
        const nhanVien = await this.prisma.nhanVien.findUnique({
            where: { id: nhanVienId },
            select: { phongBanId: true },
        });
        if (!nhanVien) {
            throw new common_1.NotFoundException('Không tìm thấy nhân viên');
        }
        const geofences = await this.prisma.cauHinhGeofence.findMany({
            where: {
                trangThai: true,
                OR: [
                    { apDungTatCa: true },
                    { phongBanId: nhanVien.phongBanId },
                ],
            },
        });
        return geofences.map(this.mapGeofenceResponse);
    }
    async gpsCheckin(nhanVienId, dto, requestInfo) {
        const thoiGian = new Date();
        const geofences = await this.layGeofenceChoNhanVien(nhanVienId);
        let trangThai = 'HOP_LE';
        let matchedGeofence = null;
        let khoangCachMet;
        let trongVung;
        let ghiChu;
        if (dto.viDo === undefined || dto.kinhDo === undefined) {
            const requireGPS = geofences.some((g) => g.batBuocGPS);
            if (requireGPS) {
                trangThai = 'KHONG_CO_GPS';
                ghiChu = 'Không có thông tin GPS';
            }
        }
        else if (geofences.length > 0) {
            let minDistance = Infinity;
            for (const gf of geofences) {
                const distance = this.tinhKhoangCach(dto.viDo, dto.kinhDo, gf.viDo, gf.kinhDo);
                if (distance < minDistance) {
                    minDistance = distance;
                    matchedGeofence = gf;
                }
                if (distance <= gf.banKinhMet) {
                    trongVung = true;
                    matchedGeofence = gf;
                    khoangCachMet = Math.round(distance);
                    break;
                }
            }
            khoangCachMet = Math.round(minDistance);
            if (!trongVung) {
                trongVung = false;
                const shouldBlock = matchedGeofence?.chanNgoaiVung;
                if (shouldBlock) {
                    trangThai = 'NGOAI_VUNG';
                    ghiChu = `Ngoài vùng cho phép (cách ${khoangCachMet}m)`;
                }
                else {
                    trangThai = 'CANH_BAO';
                    ghiChu = `Cảnh báo: Ngoài vùng (cách ${khoangCachMet}m)`;
                }
            }
        }
        if (trangThai === 'NGOAI_VUNG') {
            throw new common_1.BadRequestException(`Không thể ${dto.loaiChamCong === 'CHECK_IN' ? 'check-in' : 'check-out'}: ${ghiChu}`);
        }
        const bangGhi = await this.prisma.bangGhiChamCongGPS.create({
            data: {
                nhanVienId,
                thoiGian,
                loaiChamCong: dto.loaiChamCong,
                viDo: dto.viDo !== undefined ? new library_1.Decimal(dto.viDo) : null,
                kinhDo: dto.kinhDo !== undefined ? new library_1.Decimal(dto.kinhDo) : null,
                doChinhXacMet: dto.doChinhXacMet,
                geofenceId: matchedGeofence?.id,
                khoangCachMet,
                trongVung,
                trangThai,
                ghiChu,
                deviceId: dto.deviceId,
                userAgent: requestInfo.userAgent,
                ipAddress: requestInfo.ipAddress,
            },
        });
        return {
            success: true,
            message: dto.loaiChamCong === 'CHECK_IN'
                ? 'Check-in thành công'
                : 'Check-out thành công',
            trangThai: trangThai,
            trongVung,
            khoangCachMet,
            geofence: matchedGeofence ? {
                id: matchedGeofence.id,
                tenDiaDiem: matchedGeofence.tenDiaDiem,
                banKinhMet: matchedGeofence.banKinhMet,
            } : undefined,
            bangGhi: {
                id: bangGhi.id,
                thoiGian: bangGhi.thoiGian,
                loaiChamCong: bangGhi.loaiChamCong,
            },
        };
    }
    async layLichSuGPS(query) {
        const { nhanVienId, tuNgay, denNgay, trangThai, page = 1, limit = 20 } = query;
        const skip = (page - 1) * limit;
        const where = {};
        if (nhanVienId) {
            where.nhanVienId = nhanVienId;
        }
        if (tuNgay) {
            where.thoiGian = { ...where.thoiGian, gte: new Date(tuNgay) };
        }
        if (denNgay) {
            where.thoiGian = { ...where.thoiGian, lte: new Date(denNgay + 'T23:59:59') };
        }
        if (trangThai) {
            where.trangThai = trangThai;
        }
        const [data, total] = await Promise.all([
            this.prisma.bangGhiChamCongGPS.findMany({
                where,
                include: {
                    geofence: {
                        select: { id: true, tenDiaDiem: true },
                    },
                },
                orderBy: { thoiGian: 'desc' },
                skip,
                take: limit,
            }),
            this.prisma.bangGhiChamCongGPS.count({ where }),
        ]);
        return {
            data: data.map(this.mapGPSLogResponse),
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }
    async thongKeGPS(tuNgay, denNgay, phongBanId) {
        const whereNV = {};
        if (phongBanId) {
            whereNV.phongBanId = phongBanId;
        }
        const nhanVienIds = await this.prisma.nhanVien.findMany({
            where: whereNV,
            select: { id: true },
        });
        const nhanVienIdList = nhanVienIds.map((nv) => nv.id);
        const where = {
            nhanVienId: { in: nhanVienIdList },
            thoiGian: {
                gte: new Date(tuNgay),
                lte: new Date(denNgay + 'T23:59:59'),
            },
        };
        const [tongBanGhi, hopLe, ngoaiVung, canhBao, khongGPS] = await Promise.all([
            this.prisma.bangGhiChamCongGPS.count({ where }),
            this.prisma.bangGhiChamCongGPS.count({ where: { ...where, trangThai: 'HOP_LE' } }),
            this.prisma.bangGhiChamCongGPS.count({ where: { ...where, trangThai: 'NGOAI_VUNG' } }),
            this.prisma.bangGhiChamCongGPS.count({ where: { ...where, trangThai: 'CANH_BAO' } }),
            this.prisma.bangGhiChamCongGPS.count({ where: { ...where, trangThai: 'KHONG_CO_GPS' } }),
        ]);
        return {
            tuNgay,
            denNgay,
            phongBanId,
            thongKe: {
                tongBanGhi,
                hopLe,
                ngoaiVung,
                canhBao,
                khongGPS,
                tyLeHopLe: tongBanGhi > 0 ? Math.round((hopLe / tongBanGhi) * 100) : 0,
            },
        };
    }
    tinhKhoangCach(lat1, lon1, lat2, lon2) {
        const R = 6371000;
        const dLat = this.toRad(lat2 - lat1);
        const dLon = this.toRad(lon2 - lon1);
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.toRad(lat1)) *
                Math.cos(this.toRad(lat2)) *
                Math.sin(dLon / 2) *
                Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }
    toRad(deg) {
        return deg * (Math.PI / 180);
    }
    mapGeofenceResponse(geofence) {
        return {
            id: geofence.id,
            tenDiaDiem: geofence.tenDiaDiem,
            diaChi: geofence.diaChi,
            viDo: Number(geofence.viDo),
            kinhDo: Number(geofence.kinhDo),
            banKinhMet: geofence.banKinhMet,
            phongBanId: geofence.phongBanId,
            apDungTatCa: geofence.apDungTatCa,
            batBuocGPS: geofence.batBuocGPS,
            chanNgoaiVung: geofence.chanNgoaiVung,
            trangThai: geofence.trangThai,
            ngayTao: geofence.ngayTao,
            ngayCapNhat: geofence.ngayCapNhat,
        };
    }
    mapGPSLogResponse(log) {
        return {
            id: log.id,
            nhanVienId: log.nhanVienId,
            thoiGian: log.thoiGian,
            loaiChamCong: log.loaiChamCong,
            viDo: log.viDo ? Number(log.viDo) : undefined,
            kinhDo: log.kinhDo ? Number(log.kinhDo) : undefined,
            doChinhXacMet: log.doChinhXacMet,
            geofenceId: log.geofenceId,
            khoangCachMet: log.khoangCachMet,
            trongVung: log.trongVung,
            trangThai: log.trangThai,
            ghiChu: log.ghiChu,
            deviceId: log.deviceId,
            geofence: log.geofence,
        };
    }
    async kiemTraDevice(nhanVienId, deviceId) {
        const thietBi = await this.prisma.thietBiNhanVien.findUnique({
            where: { nhanVienId },
        });
        if (!thietBi) {
            return {
                isValid: true,
                isBound: false,
                message: 'Chưa đăng ký thiết bị. Sẽ tự động bind khi login.',
            };
        }
        if (thietBi.deviceId === deviceId) {
            if (thietBi.trangThai === 'BLOCKED') {
                return {
                    isValid: false,
                    isBound: true,
                    message: 'Thiết bị đã bị khóa. Liên hệ HR để được hỗ trợ.',
                    thietBi: this.mapThietBiResponse(thietBi),
                };
            }
            return {
                isValid: true,
                isBound: true,
                message: 'Thiết bị hợp lệ',
                thietBi: this.mapThietBiResponse(thietBi),
            };
        }
        return {
            isValid: false,
            isBound: true,
            message: 'Đăng nhập từ thiết bị khác không được phép. Liên hệ HR để reset thiết bị.',
            thietBi: this.mapThietBiResponse(thietBi),
        };
    }
    async bindDevice(nhanVienId, dto, context) {
        const existing = await this.prisma.thietBiNhanVien.findUnique({
            where: { nhanVienId },
        });
        if (existing && existing.trangThai === 'ACTIVE') {
            throw new common_1.BadRequestException('Nhân viên đã đăng ký thiết bị. Cần reset trước khi bind mới.');
        }
        const thietBi = await this.prisma.thietBiNhanVien.upsert({
            where: { nhanVienId },
            create: {
                nhanVienId,
                deviceId: dto.deviceId,
                tenThietBi: dto.tenThietBi,
                platform: dto.platform,
                userAgent: context?.userAgent,
                ipAddress: context?.ipAddress,
                trangThai: 'ACTIVE',
                ngayDangKy: new Date(),
                lanDangNhapCuoi: new Date(),
            },
            update: {
                deviceId: dto.deviceId,
                tenThietBi: dto.tenThietBi,
                platform: dto.platform,
                userAgent: context?.userAgent,
                ipAddress: context?.ipAddress,
                trangThai: 'ACTIVE',
                ngayDangKy: new Date(),
                lanDangNhapCuoi: new Date(),
                nguoiResetId: null,
                lyDoReset: null,
                ngayReset: null,
            },
        });
        await this.ghiLichSuThietBi({
            nhanVienId,
            hanhDong: 'BIND',
            deviceIdMoi: dto.deviceId,
            deviceIdCu: existing?.deviceId,
            ipAddress: context?.ipAddress,
            userAgent: context?.userAgent,
        });
        return this.mapThietBiResponse(thietBi);
    }
    async resetDevice(dto, nguoiThucHienId, context) {
        const thietBi = await this.prisma.thietBiNhanVien.findUnique({
            where: { nhanVienId: dto.nhanVienId },
        });
        if (!thietBi) {
            throw new common_1.NotFoundException('Nhân viên chưa đăng ký thiết bị nào');
        }
        const deviceIdCu = thietBi.deviceId;
        await this.prisma.thietBiNhanVien.update({
            where: { nhanVienId: dto.nhanVienId },
            data: {
                trangThai: 'PENDING_RESET',
                nguoiResetId: nguoiThucHienId,
                lyDoReset: dto.lyDo,
                ngayReset: new Date(),
            },
        });
        await this.ghiLichSuThietBi({
            nhanVienId: dto.nhanVienId,
            hanhDong: 'RESET',
            deviceIdCu,
            nguoiThucHienId,
            lyDo: dto.lyDo,
            ipAddress: context?.ipAddress,
            userAgent: context?.userAgent,
        });
        return {
            success: true,
            message: 'Đã reset thiết bị. Nhân viên có thể đăng nhập từ thiết bị mới.',
        };
    }
    async blockDevice(nhanVienId, lyDo, nguoiThucHienId, context) {
        const thietBi = await this.prisma.thietBiNhanVien.findUnique({
            where: { nhanVienId },
        });
        if (!thietBi) {
            throw new common_1.NotFoundException('Nhân viên chưa đăng ký thiết bị nào');
        }
        await this.prisma.thietBiNhanVien.update({
            where: { nhanVienId },
            data: { trangThai: 'BLOCKED' },
        });
        await this.ghiLichSuThietBi({
            nhanVienId,
            hanhDong: 'BLOCK',
            deviceIdCu: thietBi.deviceId,
            nguoiThucHienId,
            lyDo,
            ipAddress: context?.ipAddress,
            userAgent: context?.userAgent,
        });
        return { success: true, message: 'Đã khóa thiết bị' };
    }
    async layDanhSachThietBi(query) {
        const page = query.page || 1;
        const limit = query.limit || 20;
        const skip = (page - 1) * limit;
        const where = {};
        if (query.trangThai) {
            where.trangThai = query.trangThai;
        }
        const whereNhanVien = {};
        if (query.phongBanId) {
            whereNhanVien.phongBanId = query.phongBanId;
        }
        if (query.search) {
            whereNhanVien.OR = [
                { hoTen: { contains: query.search, mode: 'insensitive' } },
                { maNhanVien: { contains: query.search, mode: 'insensitive' } },
            ];
        }
        const [data, total] = await Promise.all([
            this.prisma.thietBiNhanVien.findMany({
                where,
                skip,
                take: limit,
                orderBy: { ngayDangKy: 'desc' },
            }),
            this.prisma.thietBiNhanVien.count({ where }),
        ]);
        const nhanVienIds = data.map((d) => d.nhanVienId);
        const nhanViens = await this.prisma.nhanVien.findMany({
            where: { id: { in: nhanVienIds } },
            select: {
                id: true,
                hoTen: true,
                maNhanVien: true,
                phongBan: { select: { id: true, tenPhongBan: true } },
            },
        });
        const nhanVienMap = new Map(nhanViens.map((nv) => [nv.id, nv]));
        return {
            data: data.map((d) => ({
                ...this.mapThietBiResponse(d),
                nhanVien: nhanVienMap.get(d.nhanVienId),
            })),
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }
    async layThietBiNhanVien(nhanVienId) {
        const thietBi = await this.prisma.thietBiNhanVien.findUnique({
            where: { nhanVienId },
        });
        if (!thietBi)
            return null;
        return this.mapThietBiResponse(thietBi);
    }
    async layLichSuThietBi(query) {
        const page = query.page || 1;
        const limit = query.limit || 20;
        const skip = (page - 1) * limit;
        const where = {};
        if (query.nhanVienId) {
            where.nhanVienId = query.nhanVienId;
        }
        if (query.hanhDong) {
            where.hanhDong = query.hanhDong;
        }
        if (query.tuNgay || query.denNgay) {
            where.ngayTao = {};
            if (query.tuNgay) {
                where.ngayTao.gte = new Date(query.tuNgay);
            }
            if (query.denNgay) {
                where.ngayTao.lte = new Date(query.denNgay + 'T23:59:59');
            }
        }
        const [data, total] = await Promise.all([
            this.prisma.lichSuThietBi.findMany({
                where,
                skip,
                take: limit,
                orderBy: { ngayTao: 'desc' },
            }),
            this.prisma.lichSuThietBi.count({ where }),
        ]);
        const allIds = new Set();
        data.forEach((d) => {
            allIds.add(d.nhanVienId);
            if (d.nguoiThucHienId)
                allIds.add(d.nguoiThucHienId);
        });
        const nhanViens = await this.prisma.nhanVien.findMany({
            where: { id: { in: Array.from(allIds) } },
            select: { id: true, hoTen: true, maNhanVien: true },
        });
        const nhanVienMap = new Map(nhanViens.map((nv) => [nv.id, nv]));
        return {
            data: data.map((d) => ({
                ...this.mapLichSuThietBiResponse(d),
                nhanVien: nhanVienMap.get(d.nhanVienId),
                nguoiThucHien: d.nguoiThucHienId
                    ? nhanVienMap.get(d.nguoiThucHienId)
                    : undefined,
            })),
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }
    async capNhatLanDangNhapCuoi(nhanVienId) {
        await this.prisma.thietBiNhanVien.updateMany({
            where: { nhanVienId },
            data: { lanDangNhapCuoi: new Date() },
        });
    }
    async ghiLichSuThietBi(data) {
        await this.prisma.lichSuThietBi.create({ data });
    }
    mapThietBiResponse(thietBi) {
        return {
            id: thietBi.id,
            nhanVienId: thietBi.nhanVienId,
            deviceId: thietBi.deviceId,
            tenThietBi: thietBi.tenThietBi,
            userAgent: thietBi.userAgent,
            platform: thietBi.platform,
            ipAddress: thietBi.ipAddress,
            trangThai: thietBi.trangThai,
            ngayDangKy: thietBi.ngayDangKy,
            lanDangNhapCuoi: thietBi.lanDangNhapCuoi,
            nguoiResetId: thietBi.nguoiResetId,
            lyDoReset: thietBi.lyDoReset,
            ngayReset: thietBi.ngayReset,
        };
    }
    mapLichSuThietBiResponse(log) {
        return {
            id: log.id,
            nhanVienId: log.nhanVienId,
            hanhDong: log.hanhDong,
            deviceIdCu: log.deviceIdCu,
            deviceIdMoi: log.deviceIdMoi,
            nguoiThucHienId: log.nguoiThucHienId,
            lyDo: log.lyDo,
            ipAddress: log.ipAddress,
            userAgent: log.userAgent,
            ngayTao: log.ngayTao,
        };
    }
};
exports.AntiFraudService = AntiFraudService;
exports.AntiFraudService = AntiFraudService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AntiFraudService);
//# sourceMappingURL=anti-fraud.service.js.map