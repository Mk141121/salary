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
exports.SanLuongService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let SanLuongService = class SanLuongService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async previewChiaHang(rows, thang, nam) {
        await this.kiemTraKyLuongChotChua(thang, nam, 'CH');
        const nhanViens = await this.prisma.nhanVien.findMany({
            where: {
                phongBan: { maPhongBan: 'CH' },
                trangThai: 'DANG_LAM',
            },
            select: { id: true, maNhanVien: true, hoTen: true },
        });
        const mapNhanVien = new Map(nhanViens.map(nv => [nv.maNhanVien, nv]));
        const hopLe = [];
        const loi = [];
        for (let i = 0; i < rows.length; i++) {
            const row = rows[i];
            const errors = [];
            const dongSo = i + 2;
            const ngay = new Date(row.ngay);
            if (isNaN(ngay.getTime())) {
                errors.push(`Ngày không hợp lệ: ${row.ngay}`);
            }
            else {
                if (ngay.getMonth() + 1 !== thang || ngay.getFullYear() !== nam) {
                    errors.push(`Ngày ${row.ngay} không thuộc tháng ${thang}/${nam}`);
                }
            }
            if (!row.maNhanVien) {
                errors.push('Thiếu mã nhân viên');
            }
            else if (!mapNhanVien.has(row.maNhanVien)) {
                errors.push(`Mã nhân viên không tồn tại hoặc không thuộc phòng Chia hàng: ${row.maNhanVien}`);
            }
            if (row.soLuongSpDat < 0) {
                errors.push('Số lượng SP đạt không được âm');
            }
            if (row.soLuongSpLoi < 0) {
                errors.push('Số lượng SP lỗi không được âm');
            }
            if (errors.length > 0) {
                loi.push({ hopLe: false, dong: dongSo, data: row, loi: errors });
            }
            else {
                hopLe.push({ hopLe: true, dong: dongSo, data: row });
            }
        }
        return {
            hopLe,
            loi,
            tongDong: rows.length,
            tongHopLe: hopLe.length,
            tongLoi: loi.length,
        };
    }
    async confirmChiaHang(rows, tenFile, fileHash, nguoiImportId) {
        const nhanViens = await this.prisma.nhanVien.findMany({
            where: { phongBan: { maPhongBan: 'CH' } },
            select: { id: true, maNhanVien: true },
        });
        const mapNhanVien = new Map(nhanViens.map(nv => [nv.maNhanVien, nv.id]));
        const ngayDuLieu = rows.length > 0 ? new Date(rows[0].ngay) : new Date();
        return this.prisma.$transaction(async (tx) => {
            const lichSuImport = await tx.lichSuImport.create({
                data: {
                    loaiImport: 'CHIA_HANG',
                    ngayDuLieu,
                    tenFile,
                    fileHash,
                    soDong: rows.length,
                    soDongHopLe: rows.length,
                    soDongLoi: 0,
                    trangThai: 'THANH_CONG',
                    nguoiImportId,
                },
            });
            for (const row of rows) {
                const nhanVienId = mapNhanVien.get(row.maNhanVien);
                if (!nhanVienId)
                    continue;
                const ngay = new Date(row.ngay);
                ngay.setHours(0, 0, 0, 0);
                await tx.sanLuongChiaHang.upsert({
                    where: {
                        ngay_nhanVienId: { ngay, nhanVienId },
                    },
                    create: {
                        ngay,
                        nhanVienId,
                        soLuongSpDat: row.soLuongSpDat,
                        soLuongSpLoi: row.soLuongSpLoi,
                        ghiChu: row.ghiChu,
                        nguonDuLieu: 'IMPORT_EXCEL',
                        importId: lichSuImport.id,
                        khoaSua: true,
                        taoBoi: nguoiImportId,
                    },
                    update: {
                        soLuongSpDat: row.soLuongSpDat,
                        soLuongSpLoi: row.soLuongSpLoi,
                        ghiChu: row.ghiChu,
                        nguonDuLieu: 'IMPORT_EXCEL',
                        importId: lichSuImport.id,
                        capNhatBoi: nguoiImportId,
                    },
                });
            }
            return {
                success: true,
                importId: lichSuImport.id,
                soDong: rows.length,
            };
        });
    }
    async layDanhSachChiaHang(query) {
        const where = {};
        if (query.tuNgay) {
            where.ngay = { ...where.ngay, gte: new Date(query.tuNgay) };
        }
        if (query.denNgay) {
            where.ngay = { ...where.ngay, lte: new Date(query.denNgay) };
        }
        if (query.nhanVienId) {
            where.nhanVienId = query.nhanVienId;
        }
        return this.prisma.sanLuongChiaHang.findMany({
            where,
            include: {
                lichSuImport: {
                    select: { id: true, tenFile: true, importLuc: true },
                },
            },
            orderBy: [{ ngay: 'desc' }, { nhanVienId: 'asc' }],
        });
    }
    async adminSuaChiaHang(id, dto, nguoiSuaId) {
        const record = await this.prisma.sanLuongChiaHang.findUnique({ where: { id } });
        if (!record) {
            throw new common_1.NotFoundException('Không tìm thấy bản ghi');
        }
        const duLieuTruoc = {
            soLuongSpDat: record.soLuongSpDat,
            soLuongSpLoi: record.soLuongSpLoi,
            ghiChu: record.ghiChu,
        };
        const duLieuMoi = {};
        if (dto.soLuongSpDat !== undefined)
            duLieuMoi.soLuongSpDat = dto.soLuongSpDat;
        if (dto.soLuongSpLoi !== undefined)
            duLieuMoi.soLuongSpLoi = dto.soLuongSpLoi;
        if (dto.ghiChu !== undefined)
            duLieuMoi.ghiChu = dto.ghiChu;
        return this.prisma.$transaction(async (tx) => {
            await tx.auditSuaDuLieu.create({
                data: {
                    loaiDuLieu: 'CHIA_HANG',
                    banGhiId: id,
                    duLieuTruocJson: JSON.stringify(duLieuTruoc),
                    duLieuSauJson: JSON.stringify({ ...duLieuTruoc, ...duLieuMoi }),
                    lyDo: dto.lyDo,
                    suaBoi: nguoiSuaId,
                },
            });
            return tx.sanLuongChiaHang.update({
                where: { id },
                data: {
                    ...duLieuMoi,
                    nguonDuLieu: 'ADMIN_SUA',
                    capNhatBoi: nguoiSuaId,
                },
            });
        });
    }
    async previewGiaoHang(rows, thang, nam) {
        await this.kiemTraKyLuongChotChua(thang, nam, 'GIAO_HANG');
        const nhanViens = await this.prisma.nhanVien.findMany({
            where: {
                phongBan: { maPhongBan: { in: ['SHIP', 'GIAO_HANG'] } },
                trangThai: 'DANG_LAM',
            },
            select: { id: true, maNhanVien: true, hoTen: true },
        });
        const mapNhanVien = new Map(nhanViens.map(nv => [nv.maNhanVien, nv]));
        const hopLe = [];
        const loi = [];
        for (let i = 0; i < rows.length; i++) {
            const row = rows[i];
            const errors = [];
            const dongSo = i + 2;
            const ngay = new Date(row.ngay);
            if (isNaN(ngay.getTime())) {
                errors.push(`Ngày không hợp lệ: ${row.ngay}`);
            }
            else {
                if (ngay.getMonth() + 1 !== thang || ngay.getFullYear() !== nam) {
                    errors.push(`Ngày ${row.ngay} không thuộc tháng ${thang}/${nam}`);
                }
            }
            if (!row.maNhanVien) {
                errors.push('Thiếu mã nhân viên');
            }
            else if (!mapNhanVien.has(row.maNhanVien)) {
                errors.push(`Mã nhân viên không tồn tại hoặc không thuộc phòng Giao hàng: ${row.maNhanVien}`);
            }
            if (row.khoiLuongThanhCong < 0) {
                errors.push('Khối lượng thành công không được âm');
            }
            if (row.soLanTreGio < 0) {
                errors.push('Số lần trễ giờ không được âm');
            }
            if (row.soLanKhongLayPhieu < 0) {
                errors.push('Số lần không lấy phiếu không được âm');
            }
            if (errors.length > 0) {
                loi.push({ hopLe: false, dong: dongSo, data: row, loi: errors });
            }
            else {
                hopLe.push({ hopLe: true, dong: dongSo, data: row });
            }
        }
        return {
            hopLe,
            loi,
            tongDong: rows.length,
            tongHopLe: hopLe.length,
            tongLoi: loi.length,
        };
    }
    async confirmGiaoHang(rows, tenFile, fileHash, nguoiImportId) {
        const nhanViens = await this.prisma.nhanVien.findMany({
            where: { phongBan: { maPhongBan: { in: ['SHIP', 'GIAO_HANG'] } } },
            select: { id: true, maNhanVien: true },
        });
        const mapNhanVien = new Map(nhanViens.map(nv => [nv.maNhanVien, nv.id]));
        const ngayDuLieu = rows.length > 0 ? new Date(rows[0].ngay) : new Date();
        return this.prisma.$transaction(async (tx) => {
            const lichSuImport = await tx.lichSuImport.create({
                data: {
                    loaiImport: 'GIAO_HANG',
                    ngayDuLieu,
                    tenFile,
                    fileHash,
                    soDong: rows.length,
                    soDongHopLe: rows.length,
                    soDongLoi: 0,
                    trangThai: 'THANH_CONG',
                    nguoiImportId,
                },
            });
            for (const row of rows) {
                const nhanVienId = mapNhanVien.get(row.maNhanVien);
                if (!nhanVienId)
                    continue;
                const ngay = new Date(row.ngay);
                ngay.setHours(0, 0, 0, 0);
                await tx.giaoHang.upsert({
                    where: {
                        ngay_nhanVienId: { ngay, nhanVienId },
                    },
                    create: {
                        ngay,
                        nhanVienId,
                        khoiLuongThanhCong: row.khoiLuongThanhCong,
                        soLanTreGio: row.soLanTreGio,
                        soLanKhongLayPhieu: row.soLanKhongLayPhieu,
                        ghiChu: row.ghiChu,
                        nguonDuLieu: 'IMPORT_EXCEL',
                        importId: lichSuImport.id,
                        khoaSua: true,
                        taoBoi: nguoiImportId,
                    },
                    update: {
                        khoiLuongThanhCong: row.khoiLuongThanhCong,
                        soLanTreGio: row.soLanTreGio,
                        soLanKhongLayPhieu: row.soLanKhongLayPhieu,
                        ghiChu: row.ghiChu,
                        nguonDuLieu: 'IMPORT_EXCEL',
                        importId: lichSuImport.id,
                        capNhatBoi: nguoiImportId,
                    },
                });
            }
            return {
                success: true,
                importId: lichSuImport.id,
                soDong: rows.length,
            };
        });
    }
    async layDanhSachGiaoHang(query) {
        const where = {};
        if (query.tuNgay) {
            where.ngay = { ...where.ngay, gte: new Date(query.tuNgay) };
        }
        if (query.denNgay) {
            where.ngay = { ...where.ngay, lte: new Date(query.denNgay) };
        }
        if (query.nhanVienId) {
            where.nhanVienId = query.nhanVienId;
        }
        return this.prisma.giaoHang.findMany({
            where,
            include: {
                lichSuImport: {
                    select: { id: true, tenFile: true, importLuc: true },
                },
            },
            orderBy: [{ ngay: 'desc' }, { nhanVienId: 'asc' }],
        });
    }
    async adminSuaGiaoHang(id, dto, nguoiSuaId) {
        const record = await this.prisma.giaoHang.findUnique({ where: { id } });
        if (!record) {
            throw new common_1.NotFoundException('Không tìm thấy bản ghi');
        }
        const duLieuTruoc = {
            khoiLuongThanhCong: record.khoiLuongThanhCong,
            soLanTreGio: record.soLanTreGio,
            soLanKhongLayPhieu: record.soLanKhongLayPhieu,
            ghiChu: record.ghiChu,
        };
        const duLieuMoi = {};
        if (dto.khoiLuongThanhCong !== undefined)
            duLieuMoi.khoiLuongThanhCong = dto.khoiLuongThanhCong;
        if (dto.soLanTreGio !== undefined)
            duLieuMoi.soLanTreGio = dto.soLanTreGio;
        if (dto.soLanKhongLayPhieu !== undefined)
            duLieuMoi.soLanKhongLayPhieu = dto.soLanKhongLayPhieu;
        if (dto.ghiChu !== undefined)
            duLieuMoi.ghiChu = dto.ghiChu;
        return this.prisma.$transaction(async (tx) => {
            await tx.auditSuaDuLieu.create({
                data: {
                    loaiDuLieu: 'GIAO_HANG',
                    banGhiId: id,
                    duLieuTruocJson: JSON.stringify(duLieuTruoc),
                    duLieuSauJson: JSON.stringify({ ...duLieuTruoc, ...duLieuMoi }),
                    lyDo: dto.lyDo,
                    suaBoi: nguoiSuaId,
                },
            });
            return tx.giaoHang.update({
                where: { id },
                data: {
                    ...duLieuMoi,
                    nguonDuLieu: 'ADMIN_SUA',
                    capNhatBoi: nguoiSuaId,
                },
            });
        });
    }
    async layLichSuImport(query) {
        const where = {};
        if (query.loaiImport) {
            where.loaiImport = query.loaiImport;
        }
        if (query.tuNgay) {
            where.importLuc = { ...where.importLuc, gte: new Date(query.tuNgay) };
        }
        if (query.denNgay) {
            where.importLuc = { ...where.importLuc, lte: new Date(query.denNgay) };
        }
        return this.prisma.lichSuImport.findMany({
            where,
            include: {
                nguoiImport: {
                    select: { id: true, hoTen: true, tenDangNhap: true },
                },
            },
            orderBy: { importLuc: 'desc' },
        });
    }
    async layLichSuImportTheoId(id) {
        return this.prisma.lichSuImport.findUnique({
            where: { id },
            include: {
                nguoiImport: {
                    select: { id: true, hoTen: true, tenDangNhap: true },
                },
                sanLuongChiaHangs: true,
                giaoHangs: true,
            },
        });
    }
    async taoSnapshotSanLuong(bangLuongId, thang, nam) {
        const tuNgay = new Date(nam, thang - 1, 1);
        const denNgay = new Date(nam, thang, 0);
        const sanLuongChiaHang = await this.prisma.sanLuongChiaHang.groupBy({
            by: ['nhanVienId'],
            where: {
                ngay: { gte: tuNgay, lte: denNgay },
            },
            _sum: {
                soLuongSpDat: true,
                soLuongSpLoi: true,
            },
        });
        const giaoHang = await this.prisma.giaoHang.groupBy({
            by: ['nhanVienId'],
            where: {
                ngay: { gte: tuNgay, lte: denNgay },
            },
            _sum: {
                khoiLuongThanhCong: true,
                soLanTreGio: true,
                soLanKhongLayPhieu: true,
            },
        });
        await this.prisma.$transaction(async (tx) => {
            await tx.snapshotSanLuongChiaHang.deleteMany({ where: { bangLuongId } });
            await tx.snapshotGiaoHang.deleteMany({ where: { bangLuongId } });
            for (const item of sanLuongChiaHang) {
                await tx.snapshotSanLuongChiaHang.create({
                    data: {
                        bangLuongId,
                        nhanVienId: item.nhanVienId,
                        tongSpDat: item._sum.soLuongSpDat || 0,
                        tongSpLoi: item._sum.soLuongSpLoi || 0,
                    },
                });
            }
            for (const item of giaoHang) {
                await tx.snapshotGiaoHang.create({
                    data: {
                        bangLuongId,
                        nhanVienId: item.nhanVienId,
                        tongKhoiLuongThanhCong: item._sum.khoiLuongThanhCong || 0,
                        tongSoLanTreGio: item._sum.soLanTreGio || 0,
                        tongSoLanKhongLayPhieu: item._sum.soLanKhongLayPhieu || 0,
                    },
                });
            }
        });
        return {
            snapshotChiaHang: sanLuongChiaHang.length,
            snapshotGiaoHang: giaoHang.length,
        };
    }
    async laySnapshotSanLuong(bangLuongId, nhanVienId) {
        const [chiaHang, giaoHang] = await Promise.all([
            this.prisma.snapshotSanLuongChiaHang.findUnique({
                where: { bangLuongId_nhanVienId: { bangLuongId, nhanVienId } },
            }),
            this.prisma.snapshotGiaoHang.findUnique({
                where: { bangLuongId_nhanVienId: { bangLuongId, nhanVienId } },
            }),
        ]);
        return {
            TONG_SP_DAT: chiaHang?.tongSpDat || 0,
            TONG_SP_LOI: chiaHang?.tongSpLoi || 0,
            TONG_KHOI_LUONG_THANH_CONG: giaoHang ? Number(giaoHang.tongKhoiLuongThanhCong) : 0,
            TONG_SO_LAN_TRE_GIO: giaoHang?.tongSoLanTreGio || 0,
            TONG_SO_LAN_KHONG_LAY_PHIEU: giaoHang?.tongSoLanKhongLayPhieu || 0,
        };
    }
    async kiemTraKyLuongChotChua(thang, nam, maPhongBan) {
        const bangLuong = await this.prisma.bangLuong.findFirst({
            where: {
                thang,
                nam,
                phongBan: { maPhongBan },
                trangThai: { in: ['DA_CHOT', 'KHOA'] },
            },
        });
        if (bangLuong) {
            throw new common_1.BadRequestException(`Kỳ lương tháng ${thang}/${nam} đã chốt, không thể import dữ liệu`);
        }
    }
};
exports.SanLuongService = SanLuongService;
exports.SanLuongService = SanLuongService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SanLuongService);
//# sourceMappingURL=san-luong.service.js.map