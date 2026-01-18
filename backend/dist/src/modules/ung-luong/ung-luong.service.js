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
var UngLuongService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UngLuongService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const ung_luong_calculator_service_1 = require("./ung-luong-calculator.service");
const audit_log_service_1 = require("../../common/services/audit-log.service");
let UngLuongService = UngLuongService_1 = class UngLuongService {
    constructor(prisma, calculatorService, auditLogService) {
        this.prisma = prisma;
        this.calculatorService = calculatorService;
        this.auditLogService = auditLogService;
        this.logger = new common_1.Logger(UngLuongService_1.name);
    }
    async sinhMaBangUngLuong(thangNam) {
        const count = await this.prisma.bangUngLuong.count({
            where: { thangNam },
        });
        const stt = String(count + 1).padStart(2, '0');
        return `UL-${thangNam.replace('-', '')}-${stt}`;
    }
    async layDanhSach(dto) {
        const { thangNam, phongBanId, trangThai, trang = 1, soLuong = 20 } = dto;
        const where = {};
        if (thangNam)
            where.thangNam = thangNam;
        if (phongBanId)
            where.phongBanId = phongBanId;
        if (trangThai)
            where.trangThai = trangThai;
        const skip = (trang - 1) * soLuong;
        const [bangUngLuongs, tongSo] = await Promise.all([
            this.prisma.bangUngLuong.findMany({
                where,
                include: {
                    _count: { select: { chiTiets: true } },
                },
                orderBy: [{ thangNam: 'desc' }, { ngayTao: 'desc' }],
                skip,
                take: soLuong,
            }),
            this.prisma.bangUngLuong.count({ where }),
        ]);
        const phongBanIds = bangUngLuongs.map(b => b.phongBanId).filter((id) => id !== null);
        const phongBans = await this.prisma.phongBan.findMany({
            where: { id: { in: phongBanIds } },
            select: { id: true, maPhongBan: true, tenPhongBan: true },
        });
        const phongBanMap = new Map(phongBans.map(pb => [pb.id, pb]));
        const data = bangUngLuongs.map(b => ({
            ...b,
            phongBan: b.phongBanId ? phongBanMap.get(b.phongBanId) || null : null,
        }));
        return {
            data,
            meta: {
                tongSo,
                trang,
                soLuong,
                tongTrang: Math.ceil(tongSo / soLuong),
            },
        };
    }
    async layTheoId(id) {
        const bangUngLuong = await this.prisma.bangUngLuong.findUnique({
            where: { id },
            include: {
                chiTiets: {
                    orderBy: { nhanVienId: 'asc' },
                },
            },
        });
        if (!bangUngLuong) {
            throw new common_1.NotFoundException(`Không tìm thấy bảng ứng lương với ID: ${id}`);
        }
        const nhanVienIds = bangUngLuong.chiTiets.map((ct) => ct.nhanVienId);
        const nhanViens = await this.prisma.nhanVien.findMany({
            where: { id: { in: nhanVienIds } },
            include: { phongBan: true },
        });
        const nhanVienMap = new Map(nhanViens.map((nv) => [nv.id, nv]));
        const nhomIds = bangUngLuong.chiTiets
            .map((ct) => ct.nhomNhanVienId)
            .filter((id) => id !== null);
        const nhoms = await this.prisma.nhomNhanVien.findMany({
            where: { id: { in: nhomIds } },
        });
        const nhomMap = new Map(nhoms.map((n) => [n.id, n]));
        const chiTietsEnriched = bangUngLuong.chiTiets.map((ct) => {
            const nv = nhanVienMap.get(ct.nhanVienId);
            const nhom = ct.nhomNhanVienId ? nhomMap.get(ct.nhomNhanVienId) : null;
            return {
                ...ct,
                nhanVien: nv
                    ? {
                        id: nv.id,
                        maNhanVien: nv.maNhanVien,
                        hoTen: nv.hoTen,
                    }
                    : null,
                phongBan: nv?.phongBan
                    ? {
                        id: nv.phongBan.id,
                        tenPhongBan: nv.phongBan.tenPhongBan,
                    }
                    : null,
                nhomNhanVien: nhom
                    ? {
                        id: nhom.id,
                        tenNhom: nhom.tenNhom,
                    }
                    : null,
            };
        });
        return {
            ...bangUngLuong,
            chiTiets: chiTietsEnriched,
        };
    }
    async taoMoi(dto, nguoiTao) {
        const existing = await this.prisma.bangUngLuong.findFirst({
            where: {
                thangNam: dto.thangNam,
                tuNgay: new Date(dto.tuNgay),
                denNgay: new Date(dto.denNgay),
                phongBanId: dto.phongBanId || null,
            },
        });
        if (existing) {
            throw new common_1.ConflictException('Đã tồn tại bảng ứng lương cho kỳ này');
        }
        const maBangUngLuong = await this.sinhMaBangUngLuong(dto.thangNam);
        const cauHinhJson = dto.cauHinhJson
            ? JSON.stringify({ ...ung_luong_calculator_service_1.CAU_HINH_MAC_DINH, ...dto.cauHinhJson })
            : JSON.stringify(ung_luong_calculator_service_1.CAU_HINH_MAC_DINH);
        const bangUngLuong = await this.prisma.bangUngLuong.create({
            data: {
                maBangUngLuong,
                thangNam: dto.thangNam,
                tuNgay: new Date(dto.tuNgay),
                denNgay: new Date(dto.denNgay),
                ngayChiTra: dto.ngayChiTra ? new Date(dto.ngayChiTra) : null,
                phongBanId: dto.phongBanId,
                cauHinhJson,
                ghiChu: dto.ghiChu,
                nguoiTao,
            },
        });
        await this.auditLogService.ghiLog({
            tenDangNhap: nguoiTao,
            hanhDong: 'TAO_MOI',
            bangDuLieu: 'BangUngLuong',
            banGhiId: String(bangUngLuong.id),
            duLieuMoi: JSON.stringify(bangUngLuong),
            moTa: `Tạo bảng ứng lương ${maBangUngLuong}`,
        });
        return bangUngLuong;
    }
    async capNhat(id, dto, nguoiCapNhat) {
        const bangUngLuong = await this.prisma.bangUngLuong.findUnique({
            where: { id },
        });
        if (!bangUngLuong) {
            throw new common_1.NotFoundException(`Không tìm thấy bảng ứng lương với ID: ${id}`);
        }
        if (bangUngLuong.trangThai !== 'NHAP') {
            throw new common_1.BadRequestException('Chỉ có thể cập nhật bảng ứng lương ở trạng thái NHẬP');
        }
        const updateData = {};
        if (dto.ngayChiTra)
            updateData.ngayChiTra = new Date(dto.ngayChiTra);
        if (dto.ghiChu !== undefined)
            updateData.ghiChu = dto.ghiChu;
        if (dto.cauHinhJson) {
            const currentCauHinh = bangUngLuong.cauHinhJson
                ? JSON.parse(bangUngLuong.cauHinhJson)
                : ung_luong_calculator_service_1.CAU_HINH_MAC_DINH;
            updateData.cauHinhJson = JSON.stringify({
                ...currentCauHinh,
                ...dto.cauHinhJson,
            });
        }
        const updated = await this.prisma.bangUngLuong.update({
            where: { id },
            data: updateData,
        });
        return updated;
    }
    async sinhDanhSachNV(id, dto, nguoiTao) {
        const bangUngLuong = await this.prisma.bangUngLuong.findUnique({
            where: { id },
        });
        if (!bangUngLuong) {
            throw new common_1.NotFoundException(`Không tìm thấy bảng ứng lương với ID: ${id}`);
        }
        if (bangUngLuong.trangThai !== 'NHAP') {
            throw new common_1.BadRequestException('Chỉ có thể sinh danh sách khi bảng ở trạng thái NHẬP');
        }
        const whereNhanVien = {
            trangThai: 'DANG_LAM',
        };
        if (dto.phongBanId) {
            whereNhanVien.phongBanId = dto.phongBanId;
        }
        else if (bangUngLuong.phongBanId) {
            whereNhanVien.phongBanId = bangUngLuong.phongBanId;
        }
        if (dto.nhanVienIds && dto.nhanVienIds.length > 0) {
            whereNhanVien.id = { in: dto.nhanVienIds };
        }
        let nhanVienIdsFromNhom = [];
        if (dto.nhomNhanVienId) {
            const thanhViens = await this.prisma.nhanVienThuocNhom.findMany({
                where: {
                    nhomId: dto.nhomNhanVienId,
                    OR: [
                        { denNgay: null },
                        { denNgay: { gte: bangUngLuong.denNgay } },
                    ],
                },
                select: { nhanVienId: true },
            });
            nhanVienIdsFromNhom = thanhViens.map((tv) => tv.nhanVienId);
            if (nhanVienIdsFromNhom.length > 0) {
                whereNhanVien.id = { in: nhanVienIdsFromNhom };
            }
        }
        const nhanViens = await this.prisma.nhanVien.findMany({
            where: whereNhanVien,
            include: { phongBan: true },
        });
        if (nhanViens.length === 0) {
            throw new common_1.BadRequestException('Không tìm thấy nhân viên phù hợp');
        }
        const cauHinh = bangUngLuong.cauHinhJson
            ? JSON.parse(bangUngLuong.cauHinhJson)
            : ung_luong_calculator_service_1.CAU_HINH_MAC_DINH;
        const tuNgay = new Date(bangUngLuong.tuNgay.getFullYear(), bangUngLuong.tuNgay.getMonth(), 1);
        const denNgay = bangUngLuong.denNgay;
        const chiTietData = [];
        for (const nv of nhanViens) {
            const thuocNhom = await this.prisma.nhanVienThuocNhom.findFirst({
                where: {
                    nhanVienId: nv.id,
                    OR: [{ denNgay: null }, { denNgay: { gte: denNgay } }],
                },
                orderBy: { ngayTao: 'desc' },
            });
            const { luyKe, dieuKien } = await this.calculatorService.tinhToanDayDu(nv.id, tuNgay, denNgay, cauHinh);
            chiTietData.push({
                bangUngLuongId: id,
                nhanVienId: nv.id,
                phongBanId: nv.phongBanId,
                nhomNhanVienId: thuocNhom?.nhomId || null,
                tienCongLuyKe: luyKe.tienCongLuyKe,
                mucToiDaDuocUng: dieuKien.mucToiDaDuocUng,
                soNgayCong: luyKe.soNgayCong,
                soNgayNghi: luyKe.soNgayNghi,
                soNgayNghiKhongPhep: luyKe.soNgayNghiKhongPhep,
                laTamTinh: luyKe.laTamTinh,
                duocPhepUng: dieuKien.duocPhepUng,
                lyDoKhongDat: dieuKien.lyDoKhongDat,
                soTienUngDeXuat: 0,
                soTienUngDuyet: 0,
            });
        }
        await this.prisma.chiTietBangUngLuong.deleteMany({
            where: { bangUngLuongId: id },
        });
        await this.prisma.chiTietBangUngLuong.createMany({
            data: chiTietData,
        });
        await this.auditLogService.ghiLog({
            tenDangNhap: nguoiTao,
            hanhDong: 'CAP_NHAT',
            bangDuLieu: 'BangUngLuong',
            banGhiId: String(id),
            moTa: `Sinh danh sách ${chiTietData.length} nhân viên cho bảng ứng lương`,
        });
        return {
            message: 'Sinh danh sách thành công',
            soNhanVien: chiTietData.length,
            soDuocUng: chiTietData.filter((ct) => ct.duocPhepUng).length,
            soKhongDuocUng: chiTietData.filter((ct) => !ct.duocPhepUng).length,
        };
    }
    async capNhatBulkChiTiet(id, dto, nguoiCapNhat) {
        const bangUngLuong = await this.prisma.bangUngLuong.findUnique({
            where: { id },
        });
        if (!bangUngLuong) {
            throw new common_1.NotFoundException(`Không tìm thấy bảng ứng lương với ID: ${id}`);
        }
        if (bangUngLuong.trangThai !== 'NHAP') {
            throw new common_1.BadRequestException('Chỉ có thể cập nhật khi bảng ở trạng thái NHẬP');
        }
        const chiTiets = await this.prisma.chiTietBangUngLuong.findMany({
            where: { bangUngLuongId: id },
        });
        const chiTietMap = new Map(chiTiets.map((ct) => [ct.id, ct]));
        const errors = [];
        const updatePromises = [];
        for (const item of dto.chiTiets) {
            const chiTiet = chiTietMap.get(item.id);
            if (!chiTiet) {
                errors.push(`Chi tiết ID ${item.id} không tồn tại`);
                continue;
            }
            const soTienDuyet = item.soTienUngDuyet ?? chiTiet.soTienUngDuyet;
            if (Number(soTienDuyet) > Number(chiTiet.mucToiDaDuocUng)) {
                errors.push(`NV ID ${chiTiet.nhanVienId}: Số tiền ${soTienDuyet} vượt mức tối đa ${chiTiet.mucToiDaDuocUng}`);
                continue;
            }
            if (!chiTiet.duocPhepUng && Number(soTienDuyet) > 0) {
                errors.push(`NV ID ${chiTiet.nhanVienId}: Không đủ điều kiện ứng lương`);
                continue;
            }
            const updateData = {};
            if (item.soTienUngDeXuat !== undefined) {
                updateData.soTienUngDeXuat = item.soTienUngDeXuat;
            }
            if (item.soTienUngDuyet !== undefined) {
                updateData.soTienUngDuyet = item.soTienUngDuyet;
            }
            if (item.ghiChu !== undefined) {
                updateData.ghiChu = item.ghiChu;
            }
            if (Object.keys(updateData).length > 0) {
                updatePromises.push(this.prisma.chiTietBangUngLuong.update({
                    where: { id: item.id },
                    data: updateData,
                }));
            }
        }
        await Promise.all(updatePromises);
        await this.capNhatTong(id);
        return {
            message: 'Cập nhật thành công',
            soCapNhat: updatePromises.length,
            errors,
        };
    }
    async setTheoTiLe(id, dto, nguoiCapNhat) {
        const bangUngLuong = await this.prisma.bangUngLuong.findUnique({
            where: { id },
        });
        if (!bangUngLuong) {
            throw new common_1.NotFoundException(`Không tìm thấy bảng ứng lương với ID: ${id}`);
        }
        if (bangUngLuong.trangThai !== 'NHAP') {
            throw new common_1.BadRequestException('Chỉ có thể cập nhật khi bảng ở trạng thái NHẬP');
        }
        const whereChiTiet = {
            bangUngLuongId: id,
            duocPhepUng: true,
        };
        if (dto.nhanVienIds && dto.nhanVienIds.length > 0) {
            whereChiTiet.nhanVienId = { in: dto.nhanVienIds };
        }
        const chiTiets = await this.prisma.chiTietBangUngLuong.findMany({
            where: whereChiTiet,
        });
        const tiLe = dto.tiLe / 100;
        const lamTron = dto.lamTron || 10000;
        for (const ct of chiTiets) {
            let soTien = Math.floor(Number(ct.mucToiDaDuocUng) * tiLe);
            soTien = Math.floor(soTien / lamTron) * lamTron;
            await this.prisma.chiTietBangUngLuong.update({
                where: { id: ct.id },
                data: { soTienUngDuyet: soTien },
            });
        }
        await this.capNhatTong(id);
        return {
            message: `Đã set ${chiTiets.length} nhân viên theo ${dto.tiLe}% mức tối đa`,
            soNhanVien: chiTiets.length,
        };
    }
    async setSoTienCoDinh(id, dto, nguoiCapNhat) {
        const bangUngLuong = await this.prisma.bangUngLuong.findUnique({
            where: { id },
        });
        if (!bangUngLuong) {
            throw new common_1.NotFoundException(`Không tìm thấy bảng ứng lương với ID: ${id}`);
        }
        if (bangUngLuong.trangThai !== 'NHAP') {
            throw new common_1.BadRequestException('Chỉ có thể cập nhật khi bảng ở trạng thái NHẬP');
        }
        const whereChiTiet = {
            bangUngLuongId: id,
            duocPhepUng: true,
            mucToiDaDuocUng: { gte: dto.soTien },
        };
        if (dto.nhanVienIds && dto.nhanVienIds.length > 0) {
            whereChiTiet.nhanVienId = { in: dto.nhanVienIds };
        }
        const result = await this.prisma.chiTietBangUngLuong.updateMany({
            where: whereChiTiet,
            data: { soTienUngDuyet: dto.soTien },
        });
        await this.capNhatTong(id);
        return {
            message: `Đã set ${result.count} nhân viên với số tiền ${dto.soTien}`,
            soNhanVien: result.count,
        };
    }
    async capNhatTong(id) {
        const chiTiets = await this.prisma.chiTietBangUngLuong.findMany({
            where: { bangUngLuongId: id },
        });
        const tongSoTienUng = chiTiets.reduce((sum, ct) => sum + Number(ct.soTienUngDuyet), 0);
        const soNhanVienUng = chiTiets.filter((ct) => Number(ct.soTienUngDuyet) > 0).length;
        await this.prisma.bangUngLuong.update({
            where: { id },
            data: { tongSoTienUng, soNhanVienUng },
        });
    }
    async chotBang(id, nguoiChot) {
        const bangUngLuong = await this.prisma.bangUngLuong.findUnique({
            where: { id },
            include: { chiTiets: true },
        });
        if (!bangUngLuong) {
            throw new common_1.NotFoundException(`Không tìm thấy bảng ứng lương với ID: ${id}`);
        }
        if (bangUngLuong.trangThai !== 'NHAP') {
            throw new common_1.BadRequestException('Bảng ứng lương không ở trạng thái NHẬP');
        }
        if (bangUngLuong.chiTiets.length === 0) {
            throw new common_1.BadRequestException('Bảng ứng lương chưa có chi tiết');
        }
        const ngayChot = new Date();
        await this.capNhatTong(id);
        const bangUngLuongUpdated = await this.prisma.bangUngLuong.findUnique({
            where: { id },
            include: { chiTiets: true },
        });
        const snapshotHeader = await this.prisma.snapshotBangUngLuong.create({
            data: {
                bangUngLuongId: id,
                maBangUngLuong: bangUngLuongUpdated.maBangUngLuong,
                thangNam: bangUngLuongUpdated.thangNam,
                tuNgay: bangUngLuongUpdated.tuNgay,
                denNgay: bangUngLuongUpdated.denNgay,
                cauHinhJson: bangUngLuongUpdated.cauHinhJson,
                tongSoTienUng: bangUngLuongUpdated.tongSoTienUng,
                soNhanVienUng: bangUngLuongUpdated.soNhanVienUng,
                ngayChot,
                nguoiChot,
            },
        });
        const nhanVienIds = bangUngLuongUpdated.chiTiets.map((ct) => ct.nhanVienId);
        const nhanViens = await this.prisma.nhanVien.findMany({
            where: { id: { in: nhanVienIds } },
            include: { phongBan: true },
        });
        const nhanVienMap = new Map(nhanViens.map((nv) => [nv.id, nv]));
        const nhomIds = bangUngLuongUpdated.chiTiets
            .map((ct) => ct.nhomNhanVienId)
            .filter((id) => id !== null);
        const nhoms = await this.prisma.nhomNhanVien.findMany({
            where: { id: { in: nhomIds } },
        });
        const nhomMap = new Map(nhoms.map((n) => [n.id, n]));
        const snapshotChiTiets = bangUngLuongUpdated.chiTiets.map((ct) => {
            const nv = nhanVienMap.get(ct.nhanVienId);
            const nhom = ct.nhomNhanVienId ? nhomMap.get(ct.nhomNhanVienId) : null;
            return {
                snapshotId: snapshotHeader.id,
                nhanVienId: ct.nhanVienId,
                maNhanVien: nv?.maNhanVien || '',
                hoTen: nv?.hoTen || '',
                phongBan: nv?.phongBan?.tenPhongBan || '',
                nhomNhanVien: nhom?.tenNhom || null,
                tienCongLuyKe: ct.tienCongLuyKe,
                mucToiDaDuocUng: ct.mucToiDaDuocUng,
                soNgayCong: ct.soNgayCong,
                soNgayNghi: ct.soNgayNghi,
                soNgayNghiKhongPhep: ct.soNgayNghiKhongPhep,
                duocPhepUng: ct.duocPhepUng,
                lyDoKhongDat: ct.lyDoKhongDat,
                soTienUngDeXuat: ct.soTienUngDeXuat,
                soTienUngDuyet: ct.soTienUngDuyet,
                ghiChu: ct.ghiChu,
            };
        });
        await this.prisma.snapshotChiTietBangUngLuong.createMany({
            data: snapshotChiTiets,
        });
        await this.prisma.bangUngLuong.update({
            where: { id },
            data: {
                trangThai: 'DA_CHOT',
                ngayChot,
                nguoiChot,
            },
        });
        await this.prisma.chiTietBangUngLuong.updateMany({
            where: { bangUngLuongId: id },
            data: { lockedBySnapshot: true },
        });
        await this.auditLogService.ghiLog({
            tenDangNhap: nguoiChot,
            hanhDong: 'CHOT_LUONG',
            bangDuLieu: 'BangUngLuong',
            banGhiId: String(id),
            moTa: `Chốt bảng ứng lương ${bangUngLuongUpdated.maBangUngLuong}`,
        });
        return {
            message: 'Chốt bảng ứng lương thành công',
            id,
            ngayChot,
            snapshotId: snapshotHeader.id,
        };
    }
    async khoaBang(id, nguoiKhoa) {
        const bangUngLuong = await this.prisma.bangUngLuong.findUnique({
            where: { id },
        });
        if (!bangUngLuong) {
            throw new common_1.NotFoundException(`Không tìm thấy bảng ứng lương với ID: ${id}`);
        }
        if (bangUngLuong.trangThai !== 'DA_CHOT') {
            throw new common_1.BadRequestException('Chỉ có thể khóa bảng ứng lương đã chốt');
        }
        await this.prisma.bangUngLuong.update({
            where: { id },
            data: {
                trangThai: 'DA_KHOA',
                nguoiKhoa,
                ngayKhoa: new Date(),
            },
        });
        await this.auditLogService.ghiLog({
            tenDangNhap: nguoiKhoa,
            hanhDong: 'CHOT_LUONG',
            bangDuLieu: 'BangUngLuong',
            banGhiId: String(id),
            moTa: `Khóa bảng ứng lương ${bangUngLuong.maBangUngLuong}`,
        });
        return { message: 'Khóa bảng ứng lương thành công' };
    }
    async moKhoaBang(id, dto, nguoiMoKhoa) {
        const bangUngLuong = await this.prisma.bangUngLuong.findUnique({
            where: { id },
        });
        if (!bangUngLuong) {
            throw new common_1.NotFoundException(`Không tìm thấy bảng ứng lương với ID: ${id}`);
        }
        if (bangUngLuong.trangThai === 'NHAP') {
            throw new common_1.BadRequestException('Bảng ứng lương đang ở trạng thái NHẬP');
        }
        await this.prisma.bangUngLuong.update({
            where: { id },
            data: {
                trangThai: 'NHAP',
                nguoiChot: null,
                ngayChot: null,
                nguoiKhoa: null,
                ngayKhoa: null,
            },
        });
        await this.prisma.chiTietBangUngLuong.updateMany({
            where: { bangUngLuongId: id },
            data: { lockedBySnapshot: false },
        });
        await this.auditLogService.ghiLog({
            tenDangNhap: nguoiMoKhoa,
            hanhDong: 'MO_KHOA',
            bangDuLieu: 'BangUngLuong',
            banGhiId: String(id),
            moTa: `Mở khóa bảng ứng lương ${bangUngLuong.maBangUngLuong}. Lý do: ${dto.lyDo}`,
        });
        return { message: 'Mở khóa bảng ứng lương thành công' };
    }
    async ghiNhanKhauTru(id, dto, nguoiThucHien) {
        const bangUngLuong = await this.prisma.bangUngLuong.findUnique({
            where: { id },
            include: { chiTiets: true },
        });
        if (!bangUngLuong) {
            throw new common_1.NotFoundException(`Không tìm thấy bảng ứng lương với ID: ${id}`);
        }
        if (bangUngLuong.trangThai === 'NHAP') {
            throw new common_1.BadRequestException('Bảng ứng lương phải được chốt trước khi ghi nhận khấu trừ');
        }
        if (bangUngLuong.daGhiNhanKhauTru) {
            return {
                message: 'Bảng ứng lương đã được ghi nhận khấu trừ trước đó',
                phieuDCId: bangUngLuong.refPhieuDCId,
            };
        }
        const bangLuong = await this.prisma.bangLuong.findUnique({
            where: { id: dto.bangLuongApDungId },
        });
        if (!bangLuong) {
            throw new common_1.NotFoundException(`Không tìm thấy bảng lương với ID: ${dto.bangLuongApDungId}`);
        }
        let khoanKhauTru = await this.prisma.khoanLuong.findFirst({
            where: { maKhoan: 'KHAU_TRU_UNG_LUONG' },
        });
        if (!khoanKhauTru) {
            khoanKhauTru = await this.prisma.khoanLuong.create({
                data: {
                    maKhoan: 'KHAU_TRU_UNG_LUONG',
                    tenKhoan: 'Khấu trừ ứng lương',
                    loai: 'KHAU_TRU',
                    cachTinh: 'LUONG_THANG_CO_DINH',
                    chiuThue: false,
                    moTa: 'Khoản khấu trừ từ ứng lương giữa tháng',
                    thuTu: 900,
                },
            });
        }
        const chiTietsCoUng = bangUngLuong.chiTiets.filter((ct) => Number(ct.soTienUngDuyet) > 0);
        const phieuDCIds = [];
        for (const ct of chiTietsCoUng) {
            const count = await this.prisma.phieuDieuChinh.count();
            const maPhieu = `DC-UL-${String(count + 1).padStart(5, '0')}`;
            const phieuDC = await this.prisma.phieuDieuChinh.create({
                data: {
                    maPhieu,
                    bangLuongId: dto.bangLuongApDungId,
                    nhanVienId: ct.nhanVienId,
                    loaiDieuChinh: 'GIAM',
                    lyDo: `Khấu trừ ứng lương kỳ ${bangUngLuong.thangNam} (${bangUngLuong.maBangUngLuong})`,
                    ghiChu: dto.lyDo || null,
                    trangThai: 'DA_DUYET',
                    nguoiTao: nguoiThucHien,
                    nguoiDuyet: nguoiThucHien,
                    ngayDuyet: new Date(),
                    chiTiets: {
                        create: {
                            khoanLuongId: khoanKhauTru.id,
                            soTienCu: 0,
                            soTienMoi: Number(ct.soTienUngDuyet),
                            chenhLech: Number(ct.soTienUngDuyet),
                            ghiChu: `Từ bảng ứng lương ${bangUngLuong.maBangUngLuong}`,
                        },
                    },
                },
            });
            phieuDCIds.push(phieuDC.id);
            const soTienKhauTru = Number(ct.soTienUngDuyet);
            const existingChiTiet = await this.prisma.chiTietBangLuong.findUnique({
                where: {
                    bangLuongId_nhanVienId_khoanLuongId: {
                        bangLuongId: dto.bangLuongApDungId,
                        nhanVienId: ct.nhanVienId,
                        khoanLuongId: khoanKhauTru.id,
                    },
                },
            });
            if (existingChiTiet) {
                await this.prisma.chiTietBangLuong.update({
                    where: { id: existingChiTiet.id },
                    data: {
                        soTien: Number(existingChiTiet.soTien) + soTienKhauTru,
                    },
                });
            }
            else {
                await this.prisma.chiTietBangLuong.create({
                    data: {
                        bangLuongId: dto.bangLuongApDungId,
                        nhanVienId: ct.nhanVienId,
                        khoanLuongId: khoanKhauTru.id,
                        soTien: soTienKhauTru,
                        nguon: 'DIEU_CHINH',
                        ghiChu: `Khấu trừ ứng lương: ${bangUngLuong.maBangUngLuong}`,
                    },
                });
            }
            await this.prisma.lichSuChinhSua.create({
                data: {
                    bangLuongId: dto.bangLuongApDungId,
                    nhanVienId: ct.nhanVienId,
                    khoanLuongId: khoanKhauTru.id,
                    giaTriCu: existingChiTiet ? Number(existingChiTiet.soTien) : 0,
                    giaTriMoi: existingChiTiet ? Number(existingChiTiet.soTien) + soTienKhauTru : soTienKhauTru,
                    loaiThayDoi: 'DIEU_CHINH',
                    nguoiThayDoi: nguoiThucHien,
                    lyDo: `Khấu trừ ứng lương từ ${bangUngLuong.maBangUngLuong}`,
                },
            });
        }
        await this.prisma.bangUngLuong.update({
            where: { id },
            data: {
                daGhiNhanKhauTru: true,
                refPhieuDCId: phieuDCIds[0] || null,
            },
        });
        await this.auditLogService.ghiLog({
            tenDangNhap: nguoiThucHien,
            hanhDong: 'CAP_NHAT',
            bangDuLieu: 'BangUngLuong',
            banGhiId: String(id),
            moTa: `Ghi nhận khấu trừ ${chiTietsCoUng.length} nhân viên vào bảng lương ${bangLuong.id}`,
        });
        return {
            message: `Ghi nhận khấu trừ thành công cho ${chiTietsCoUng.length} nhân viên`,
            soPhieuDC: phieuDCIds.length,
            phieuDCIds,
        };
    }
    async laySnapshot(id) {
        const snapshots = await this.prisma.snapshotBangUngLuong.findMany({
            where: { bangUngLuongId: id },
            include: { chiTiets: true },
            orderBy: { ngayChot: 'desc' },
        });
        if (snapshots.length === 0) {
            throw new common_1.NotFoundException(`Không tìm thấy snapshot cho bảng ứng lương ID: ${id}`);
        }
        return snapshots;
    }
    async xoa(id, forceDelete = false, nguoiXoa) {
        const bangUngLuong = await this.prisma.bangUngLuong.findUnique({
            where: { id },
        });
        if (!bangUngLuong) {
            throw new common_1.NotFoundException(`Không tìm thấy bảng ứng lương với ID: ${id}`);
        }
        if (bangUngLuong.trangThai !== 'NHAP' && !forceDelete) {
            throw new common_1.BadRequestException('Chỉ có thể xóa bảng ứng lương ở trạng thái NHẬP');
        }
        await this.prisma.chiTietBangUngLuong.deleteMany({
            where: { bangUngLuongId: id },
        });
        await this.prisma.bangUngLuong.delete({
            where: { id },
        });
        await this.auditLogService.ghiLog({
            tenDangNhap: nguoiXoa || 'system',
            hanhDong: 'XOA',
            bangDuLieu: 'BangUngLuong',
            banGhiId: String(id),
            duLieuCu: JSON.stringify(bangUngLuong),
            moTa: forceDelete
                ? `[ADMIN FORCE DELETE] Xóa cưỡng chế bảng ứng lương ${bangUngLuong.maBangUngLuong} (trạng thái: ${bangUngLuong.trangThai})`
                : `Xóa bảng ứng lương ${bangUngLuong.maBangUngLuong}`,
        });
        return { message: forceDelete ? 'Xóa cưỡng chế bảng ứng lương thành công' : 'Xóa bảng ứng lương thành công' };
    }
};
exports.UngLuongService = UngLuongService;
exports.UngLuongService = UngLuongService = UngLuongService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        ung_luong_calculator_service_1.UngLuongCalculatorService,
        audit_log_service_1.AuditLogService])
], UngLuongService);
//# sourceMappingURL=ung-luong.service.js.map