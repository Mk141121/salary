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
var NghiPhepService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NghiPhepService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const nghi_phep_mapping_service_1 = require("./nghi-phep-mapping.service");
const client_1 = require("@prisma/client");
let NghiPhepService = NghiPhepService_1 = class NghiPhepService {
    constructor(prisma, mappingService) {
        this.prisma = prisma;
        this.mappingService = mappingService;
        this.logger = new common_1.Logger(NghiPhepService_1.name);
    }
    async layDanhSachLoaiNghi(chiActive = true) {
        const where = chiActive ? { isActive: true } : {};
        return this.prisma.danhMucLoaiNghi.findMany({
            where,
            orderBy: { thuTuHienThi: 'asc' },
        });
    }
    async layLoaiNghi(id) {
        const loaiNghi = await this.prisma.danhMucLoaiNghi.findUnique({
            where: { id },
        });
        if (!loaiNghi) {
            throw new common_1.NotFoundException(`Không tìm thấy loại nghỉ #${id}`);
        }
        return loaiNghi;
    }
    async taoLoaiNghi(dto, taoBoi) {
        const existing = await this.prisma.danhMucLoaiNghi.findUnique({
            where: { maLoaiNghi: dto.maLoaiNghi },
        });
        if (existing) {
            throw new common_1.BadRequestException(`Mã loại nghỉ "${dto.maLoaiNghi}" đã tồn tại`);
        }
        return this.prisma.danhMucLoaiNghi.create({
            data: {
                maLoaiNghi: dto.maLoaiNghi,
                tenLoaiNghi: dto.tenLoaiNghi,
                nhomLoai: dto.nhomLoai,
                coTinhLuong: dto.coTinhLuong,
                coTinhChuyenCan: dto.coTinhChuyenCan,
                thuTuHienThi: dto.thuTuHienThi ?? 0,
                taoBoi,
            },
        });
    }
    async capNhatLoaiNghi(id, dto, capNhatBoi) {
        await this.layLoaiNghi(id);
        return this.prisma.danhMucLoaiNghi.update({
            where: { id },
            data: {
                ...dto,
                capNhatBoi,
            },
        });
    }
    async toggleLoaiNghi(id, capNhatBoi) {
        const loaiNghi = await this.layLoaiNghi(id);
        return this.prisma.danhMucLoaiNghi.update({
            where: { id },
            data: {
                isActive: !loaiNghi.isActive,
                capNhatBoi,
            },
        });
    }
    async taoMaDon() {
        const now = new Date();
        const prefix = `NP-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}`;
        const count = await this.prisma.donNghiPhep.count({
            where: {
                maDon: { startsWith: prefix },
            },
        });
        return `${prefix}-${String(count + 1).padStart(5, '0')}`;
    }
    tinhSoNgayNghi(tuNgay, denNgay) {
        let count = 0;
        for (let d = new Date(tuNgay); d <= denNgay; d.setDate(d.getDate() + 1)) {
            const dayOfWeek = d.getDay();
            if (dayOfWeek !== 0 && dayOfWeek !== 6) {
                count++;
            }
        }
        return count;
    }
    async taoDonNghiPhep(dto, taoBoi) {
        const nhanVien = await this.prisma.nhanVien.findUnique({
            where: { id: dto.nhanVienId },
        });
        if (!nhanVien) {
            throw new common_1.NotFoundException(`Không tìm thấy nhân viên #${dto.nhanVienId}`);
        }
        const loaiNghi = await this.prisma.danhMucLoaiNghi.findUnique({
            where: { id: dto.loaiNghiId },
        });
        if (!loaiNghi || !loaiNghi.isActive) {
            throw new common_1.BadRequestException('Loại nghỉ không hợp lệ hoặc đã bị vô hiệu hóa');
        }
        const tuNgay = new Date(dto.tuNgay);
        const denNgay = new Date(dto.denNgay);
        if (tuNgay > denNgay) {
            throw new common_1.BadRequestException('Ngày bắt đầu phải nhỏ hơn hoặc bằng ngày kết thúc');
        }
        const maDon = await this.taoMaDon();
        const soNgayNghi = this.tinhSoNgayNghi(tuNgay, denNgay);
        return this.prisma.donNghiPhep.create({
            data: {
                maDon,
                nhanVienId: dto.nhanVienId,
                phongBanId: nhanVien.phongBanId,
                loaiNghiId: dto.loaiNghiId,
                tuNgay,
                denNgay,
                soNgayNghi,
                lyDo: dto.lyDo,
                tepDinhKemUrl: dto.tepDinhKemUrl,
                trangThai: client_1.TrangThaiDonNghiPhep.NHAP,
                taoBoi,
            },
            include: {
                nhanVien: { select: { id: true, maNhanVien: true, hoTen: true } },
                phongBan: { select: { id: true, tenPhongBan: true } },
                loaiNghi: true,
            },
        });
    }
    async capNhatDonNghiPhep(id, dto, nguoiCapNhat) {
        const donNghi = await this.prisma.donNghiPhep.findUnique({
            where: { id },
        });
        if (!donNghi) {
            throw new common_1.NotFoundException(`Không tìm thấy đơn nghỉ phép #${id}`);
        }
        if (donNghi.trangThai !== client_1.TrangThaiDonNghiPhep.NHAP &&
            donNghi.trangThai !== client_1.TrangThaiDonNghiPhep.TU_CHOI) {
            throw new common_1.BadRequestException('Chỉ có thể sửa đơn ở trạng thái Nháp hoặc Từ chối');
        }
        let soNgayNghi = Number(donNghi.soNgayNghi);
        if (dto.tuNgay || dto.denNgay) {
            const tuNgay = dto.tuNgay ? new Date(dto.tuNgay) : donNghi.tuNgay;
            const denNgay = dto.denNgay ? new Date(dto.denNgay) : donNghi.denNgay;
            if (tuNgay > denNgay) {
                throw new common_1.BadRequestException('Ngày bắt đầu phải nhỏ hơn hoặc bằng ngày kết thúc');
            }
            soNgayNghi = this.tinhSoNgayNghi(tuNgay, denNgay);
        }
        return this.prisma.donNghiPhep.update({
            where: { id },
            data: {
                ...dto,
                tuNgay: dto.tuNgay ? new Date(dto.tuNgay) : undefined,
                denNgay: dto.denNgay ? new Date(dto.denNgay) : undefined,
                soNgayNghi,
                trangThai: donNghi.trangThai === client_1.TrangThaiDonNghiPhep.TU_CHOI
                    ? client_1.TrangThaiDonNghiPhep.NHAP
                    : undefined,
            },
            include: {
                nhanVien: { select: { id: true, maNhanVien: true, hoTen: true } },
                phongBan: { select: { id: true, tenPhongBan: true } },
                loaiNghi: true,
            },
        });
    }
    async guiDuyet(id, nguoiGui) {
        const donNghi = await this.prisma.donNghiPhep.findUnique({
            where: { id },
        });
        if (!donNghi) {
            throw new common_1.NotFoundException(`Không tìm thấy đơn nghỉ phép #${id}`);
        }
        if (donNghi.trangThai !== client_1.TrangThaiDonNghiPhep.NHAP &&
            donNghi.trangThai !== client_1.TrangThaiDonNghiPhep.TU_CHOI) {
            throw new common_1.BadRequestException('Chỉ có thể gửi duyệt đơn ở trạng thái Nháp hoặc Từ chối');
        }
        return this.prisma.donNghiPhep.update({
            where: { id },
            data: {
                trangThai: client_1.TrangThaiDonNghiPhep.GUI_DUYET,
            },
            include: {
                nhanVien: { select: { id: true, maNhanVien: true, hoTen: true } },
                phongBan: { select: { id: true, tenPhongBan: true } },
                loaiNghi: true,
            },
        });
    }
    async duyetDon(id, dto, nguoiDuyetId) {
        const donNghi = await this.prisma.donNghiPhep.findUnique({
            where: { id },
        });
        if (!donNghi) {
            throw new common_1.NotFoundException(`Không tìm thấy đơn nghỉ phép #${id}`);
        }
        if (donNghi.trangThai !== client_1.TrangThaiDonNghiPhep.GUI_DUYET) {
            throw new common_1.BadRequestException('Chỉ có thể duyệt đơn ở trạng thái Chờ duyệt');
        }
        const donNghiUpdated = await this.prisma.donNghiPhep.update({
            where: { id },
            data: {
                trangThai: client_1.TrangThaiDonNghiPhep.DA_DUYET,
                nguoiDuyetId,
                ngayDuyet: new Date(),
            },
            include: {
                nhanVien: { select: { id: true, maNhanVien: true, hoTen: true } },
                phongBan: { select: { id: true, tenPhongBan: true } },
                loaiNghi: true,
                nguoiDuyet: { select: { id: true, hoTen: true } },
            },
        });
        try {
            await this.mappingService.rebuildMapping(id);
        }
        catch (error) {
            this.logger.error(`Lỗi khi tạo mapping cho đơn #${id}:`, error);
        }
        return donNghiUpdated;
    }
    async tuChoiDon(id, dto, nguoiDuyetId) {
        const donNghi = await this.prisma.donNghiPhep.findUnique({
            where: { id },
        });
        if (!donNghi) {
            throw new common_1.NotFoundException(`Không tìm thấy đơn nghỉ phép #${id}`);
        }
        if (donNghi.trangThai !== client_1.TrangThaiDonNghiPhep.GUI_DUYET) {
            throw new common_1.BadRequestException('Chỉ có thể từ chối đơn ở trạng thái Chờ duyệt');
        }
        return this.prisma.donNghiPhep.update({
            where: { id },
            data: {
                trangThai: client_1.TrangThaiDonNghiPhep.TU_CHOI,
                nguoiDuyetId,
                ngayDuyet: new Date(),
                lyDoTuChoi: dto.lyDoTuChoi,
            },
            include: {
                nhanVien: { select: { id: true, maNhanVien: true, hoTen: true } },
                phongBan: { select: { id: true, tenPhongBan: true } },
                loaiNghi: true,
                nguoiDuyet: { select: { id: true, hoTen: true } },
            },
        });
    }
    async huyDon(id, nguoiHuy) {
        const donNghi = await this.prisma.donNghiPhep.findUnique({
            where: { id },
        });
        if (!donNghi) {
            throw new common_1.NotFoundException(`Không tìm thấy đơn nghỉ phép #${id}`);
        }
        if (donNghi.trangThai === client_1.TrangThaiDonNghiPhep.HUY) {
            throw new common_1.BadRequestException('Đơn đã bị hủy');
        }
        if (donNghi.trangThai === client_1.TrangThaiDonNghiPhep.DA_DUYET) {
            await this.mappingService.xoaMapping(id);
        }
        return this.prisma.donNghiPhep.update({
            where: { id },
            data: {
                trangThai: client_1.TrangThaiDonNghiPhep.HUY,
            },
            include: {
                nhanVien: { select: { id: true, maNhanVien: true, hoTen: true } },
                phongBan: { select: { id: true, tenPhongBan: true } },
                loaiNghi: true,
            },
        });
    }
    async layChiTietDon(id) {
        const donNghi = await this.prisma.donNghiPhep.findUnique({
            where: { id },
            include: {
                nhanVien: { select: { id: true, maNhanVien: true, hoTen: true } },
                phongBan: { select: { id: true, tenPhongBan: true } },
                loaiNghi: true,
                nguoiDuyet: { select: { id: true, hoTen: true } },
                chiTietNgays: {
                    include: { loaiNghi: true },
                    orderBy: { ngay: 'asc' },
                },
            },
        });
        if (!donNghi) {
            throw new common_1.NotFoundException(`Không tìm thấy đơn nghỉ phép #${id}`);
        }
        return donNghi;
    }
    async layDanhSachDon(filter) {
        const where = {};
        if (filter.phongBanId) {
            where.phongBanId = filter.phongBanId;
        }
        if (filter.nhanVienId) {
            where.nhanVienId = filter.nhanVienId;
        }
        if (filter.loaiNghiId) {
            where.loaiNghiId = filter.loaiNghiId;
        }
        if (filter.trangThai) {
            where.trangThai = filter.trangThai;
        }
        if (filter.tuNgay) {
            where.tuNgay = { gte: new Date(filter.tuNgay) };
        }
        if (filter.denNgay) {
            where.denNgay = { lte: new Date(filter.denNgay) };
        }
        const page = filter.page ?? 1;
        const limit = filter.limit ?? 20;
        const skip = (page - 1) * limit;
        const [items, total] = await Promise.all([
            this.prisma.donNghiPhep.findMany({
                where,
                include: {
                    nhanVien: { select: { id: true, maNhanVien: true, hoTen: true } },
                    phongBan: { select: { id: true, tenPhongBan: true } },
                    loaiNghi: true,
                    nguoiDuyet: { select: { id: true, hoTen: true } },
                },
                orderBy: { ngayTao: 'desc' },
                skip,
                take: limit,
            }),
            this.prisma.donNghiPhep.count({ where }),
        ]);
        return {
            items,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    async layLichNghi(filter) {
        const tuNgay = new Date(filter.tuNgay);
        const denNgay = new Date(filter.denNgay);
        const where = {
            ngay: {
                gte: tuNgay,
                lte: denNgay,
            },
            donNghiPhep: {
                trangThai: client_1.TrangThaiDonNghiPhep.DA_DUYET,
            },
        };
        if (filter.nhanVienId) {
            where.nhanVienId = filter.nhanVienId;
        }
        if (filter.phongBanId) {
            where.donNghiPhep = {
                ...where.donNghiPhep,
                phongBanId: filter.phongBanId,
            };
        }
        const chiTietNgays = await this.prisma.chiTietNghiPhepNgay.findMany({
            where,
            include: {
                nhanVien: { select: { id: true, maNhanVien: true, hoTen: true } },
                loaiNghi: true,
                donNghiPhep: {
                    select: { id: true, maDon: true, trangThai: true },
                },
            },
            orderBy: [{ nhanVienId: 'asc' }, { ngay: 'asc' }],
        });
        const grouped = new Map();
        for (const ct of chiTietNgays) {
            if (!grouped.has(ct.nhanVienId)) {
                grouped.set(ct.nhanVienId, []);
            }
            grouped.get(ct.nhanVienId).push(ct);
        }
        return Array.from(grouped.entries()).map(([nhanVienId, items]) => ({
            nhanVien: items[0].nhanVien,
            chiTietNgays: items.map((ct) => ({
                ngay: ct.ngay,
                soGioNghi: Number(ct.soGioNghi),
                loaiNghi: ct.loaiNghi,
                coTinhLuong: ct.coTinhLuong,
                coTinhChuyenCan: ct.coTinhChuyenCan,
                donNghiPhep: ct.donNghiPhep,
            })),
        }));
    }
    async rebuildMapping(id) {
        const donNghi = await this.prisma.donNghiPhep.findUnique({
            where: { id },
        });
        if (!donNghi) {
            throw new common_1.NotFoundException(`Không tìm thấy đơn nghỉ phép #${id}`);
        }
        if (donNghi.trangThai !== client_1.TrangThaiDonNghiPhep.DA_DUYET) {
            throw new common_1.BadRequestException('Chỉ có thể rebuild mapping cho đơn đã duyệt');
        }
        return this.mappingService.rebuildMapping(id);
    }
};
exports.NghiPhepService = NghiPhepService;
exports.NghiPhepService = NghiPhepService = NghiPhepService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        nghi_phep_mapping_service_1.NghiPhepMappingService])
], NghiPhepService);
//# sourceMappingURL=nghi-phep.service.js.map