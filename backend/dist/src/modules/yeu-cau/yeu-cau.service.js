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
exports.YeuCauService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const library_1 = require("@prisma/client/runtime/library");
const thong_bao_service_1 = require("../thong-bao/thong-bao.service");
let YeuCauService = class YeuCauService {
    constructor(prisma, thongBaoService) {
        this.prisma = prisma;
        this.thongBaoService = thongBaoService;
    }
    async layDanhSachLoaiYeuCau(chiActive = true) {
        const where = chiActive ? { isActive: true } : {};
        return this.prisma.danhMucLoaiYeuCau.findMany({
            where,
            orderBy: { thuTuHienThi: 'asc' },
        });
    }
    async layLoaiYeuCau(id) {
        const loai = await this.prisma.danhMucLoaiYeuCau.findUnique({ where: { id } });
        if (!loai)
            throw new common_1.NotFoundException('Không tìm thấy loại yêu cầu');
        return loai;
    }
    async taoLoaiYeuCau(dto, taoBoi) {
        const existing = await this.prisma.danhMucLoaiYeuCau.findUnique({
            where: { maLoai: dto.maLoai },
        });
        if (existing)
            throw new common_1.BadRequestException('Mã loại yêu cầu đã tồn tại');
        return this.prisma.danhMucLoaiYeuCau.create({
            data: { ...dto, taoBoi },
        });
    }
    async capNhatLoaiYeuCau(id, dto, capNhatBoi) {
        await this.layLoaiYeuCau(id);
        return this.prisma.danhMucLoaiYeuCau.update({
            where: { id },
            data: { ...dto, capNhatBoi },
        });
    }
    async toggleLoaiYeuCau(id, capNhatBoi) {
        const loai = await this.layLoaiYeuCau(id);
        return this.prisma.danhMucLoaiYeuCau.update({
            where: { id },
            data: { isActive: !loai.isActive, capNhatBoi },
        });
    }
    async layDanhSachDon(filter) {
        const { nhanVienId, phongBanId, loaiYeuCauId, trangThai, tuNgay, denNgay, nguoiDuyet1Id, nguoiDuyet2Id, page = 1, limit = 20, } = filter;
        const where = {};
        if (nhanVienId)
            where.nhanVienId = nhanVienId;
        if (phongBanId)
            where.phongBanId = phongBanId;
        if (loaiYeuCauId)
            where.loaiYeuCauId = loaiYeuCauId;
        if (trangThai)
            where.trangThai = trangThai;
        if (nguoiDuyet1Id)
            where.nguoiDuyet1Id = nguoiDuyet1Id;
        if (nguoiDuyet2Id)
            where.nguoiDuyet2Id = nguoiDuyet2Id;
        if (tuNgay || denNgay) {
            where.ngayYeuCau = {};
            if (tuNgay)
                where.ngayYeuCau.gte = new Date(tuNgay);
            if (denNgay)
                where.ngayYeuCau.lte = new Date(denNgay);
        }
        const [data, total] = await Promise.all([
            this.prisma.donYeuCau.findMany({
                where,
                include: {
                    nhanVien: {
                        select: { id: true, maNhanVien: true, hoTen: true },
                    },
                    phongBan: {
                        select: { id: true, maPhongBan: true, tenPhongBan: true },
                    },
                    loaiYeuCau: {
                        select: { id: true, maLoai: true, tenLoai: true, mauHienThi: true, icon: true },
                    },
                    nguoiDuyet1: {
                        select: { id: true, hoTen: true },
                    },
                    nguoiDuyet2: {
                        select: { id: true, hoTen: true },
                    },
                },
                orderBy: { ngayTao: 'desc' },
                skip: (page - 1) * limit,
                take: limit,
            }),
            this.prisma.donYeuCau.count({ where }),
        ]);
        return {
            data,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    async layChiTietDon(id) {
        const don = await this.prisma.donYeuCau.findUnique({
            where: { id },
            include: {
                nhanVien: {
                    select: { id: true, maNhanVien: true, hoTen: true, email: true, chucVu: true },
                },
                phongBan: {
                    select: { id: true, maPhongBan: true, tenPhongBan: true },
                },
                loaiYeuCau: true,
                nguoiDuyet1: { select: { id: true, hoTen: true } },
                nguoiDuyet2: { select: { id: true, hoTen: true } },
                nguoiOverride: { select: { id: true, hoTen: true } },
                mappingChamCong: true,
            },
        });
        if (!don)
            throw new common_1.NotFoundException('Không tìm thấy đơn yêu cầu');
        return don;
    }
    async taoDon(dto, taoBoi) {
        const nhanVien = await this.prisma.nhanVien.findUnique({
            where: { id: dto.nhanVienId },
            select: { id: true, phongBanId: true },
        });
        if (!nhanVien)
            throw new common_1.BadRequestException('Không tìm thấy nhân viên');
        const loaiYeuCau = await this.prisma.danhMucLoaiYeuCau.findUnique({
            where: { id: dto.loaiYeuCauId },
        });
        if (!loaiYeuCau || !loaiYeuCau.isActive) {
            throw new common_1.BadRequestException('Loại yêu cầu không hợp lệ');
        }
        if (loaiYeuCau.yeuCauGioBatDau && !dto.gioBatDau) {
            throw new common_1.BadRequestException('Loại yêu cầu này yêu cầu nhập giờ bắt đầu');
        }
        if (loaiYeuCau.yeuCauGioKetThuc && !dto.gioKetThuc) {
            throw new common_1.BadRequestException('Loại yêu cầu này yêu cầu nhập giờ kết thúc');
        }
        if (loaiYeuCau.yeuCauDiaDiem && !dto.diaDiem) {
            throw new common_1.BadRequestException('Loại yêu cầu này yêu cầu nhập địa điểm');
        }
        let soGio = null;
        if (dto.gioBatDau && dto.gioKetThuc) {
            const [h1, m1] = dto.gioBatDau.split(':').map(Number);
            const [h2, m2] = dto.gioKetThuc.split(':').map(Number);
            let minutes = (h2 * 60 + m2) - (h1 * 60 + m1);
            if (minutes < 0)
                minutes += 24 * 60;
            soGio = new library_1.Decimal(Math.round((minutes / 60) * 100) / 100);
        }
        const now = new Date();
        const prefix = `REQ-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}`;
        const count = await this.prisma.donYeuCau.count({
            where: { maDon: { startsWith: prefix } },
        });
        const maDon = `${prefix}-${String(count + 1).padStart(5, '0')}`;
        return this.prisma.donYeuCau.create({
            data: {
                maDon,
                nhanVienId: dto.nhanVienId,
                phongBanId: nhanVien.phongBanId,
                loaiYeuCauId: dto.loaiYeuCauId,
                ngayYeuCau: new Date(dto.ngayYeuCau),
                gioBatDau: dto.gioBatDau,
                gioKetThuc: dto.gioKetThuc,
                soGio,
                diaDiem: dto.diaDiem,
                lyDo: dto.lyDo,
                tepDinhKemUrl: dto.tepDinhKemUrl,
                trangThai: 'NHAP',
                taoBoi,
            },
            include: {
                loaiYeuCau: { select: { maLoai: true, tenLoai: true } },
            },
        });
    }
    async capNhatDon(id, dto, capNhatBoi) {
        const don = await this.layChiTietDon(id);
        if (!['NHAP', 'TU_CHOI'].includes(don.trangThai)) {
            throw new common_1.BadRequestException('Không thể sửa đơn đã gửi duyệt');
        }
        let soGio = don.soGio;
        const gioBatDau = dto.gioBatDau ?? don.gioBatDau;
        const gioKetThuc = dto.gioKetThuc ?? don.gioKetThuc;
        if (gioBatDau && gioKetThuc) {
            const [h1, m1] = gioBatDau.split(':').map(Number);
            const [h2, m2] = gioKetThuc.split(':').map(Number);
            let minutes = (h2 * 60 + m2) - (h1 * 60 + m1);
            if (minutes < 0)
                minutes += 24 * 60;
            soGio = new library_1.Decimal(Math.round((minutes / 60) * 100) / 100);
        }
        return this.prisma.donYeuCau.update({
            where: { id },
            data: {
                ...dto,
                ngayYeuCau: dto.ngayYeuCau ? new Date(dto.ngayYeuCau) : undefined,
                soGio,
            },
        });
    }
    async guiDuyet(id, guiBoi) {
        const don = await this.layChiTietDon(id);
        if (!['NHAP', 'TU_CHOI'].includes(don.trangThai)) {
            throw new common_1.BadRequestException('Đơn không ở trạng thái có thể gửi duyệt');
        }
        const workflow = await this.layWorkflowConfig(don.loaiYeuCauId, don.phongBanId);
        return this.prisma.donYeuCau.update({
            where: { id },
            data: {
                trangThai: 'CHO_DUYET_1',
                lyDoTuChoi: null,
            },
        });
    }
    async duyetCap1(id, dto, nguoiDuyetId) {
        const don = await this.layChiTietDon(id);
        if (don.trangThai !== 'CHO_DUYET_1') {
            throw new common_1.BadRequestException('Đơn không ở trạng thái chờ duyệt cấp 1');
        }
        const workflow = await this.layWorkflowConfig(don.loaiYeuCauId, don.phongBanId);
        const trangThaiMoi = workflow?.soCap === 2 ? 'CHO_DUYET_2' : 'DA_DUYET';
        const updated = await this.prisma.donYeuCau.update({
            where: { id },
            data: {
                trangThai: trangThaiMoi,
                nguoiDuyet1Id: nguoiDuyetId,
                ngayDuyet1: new Date(),
                ghiChuDuyet1: dto.ghiChu,
                ...(trangThaiMoi === 'DA_DUYET' && {
                    nguoiDuyet2Id: nguoiDuyetId,
                    ngayDuyet2: new Date(),
                }),
            },
        });
        if (trangThaiMoi === 'DA_DUYET') {
            await this.taoMappingChamCong(updated);
            const nguoiDung = await this.prisma.nguoiDung.findUnique({
                where: { nhanVienId: don.nhanVienId },
            });
            if (nguoiDung) {
                await this.thongBaoService.guiThongBaoYeuCauDaDuyet(nguoiDung.id, don.loaiYeuCau?.tenLoai || 'yêu cầu', id);
            }
        }
        return updated;
    }
    async duyetCap2(id, dto, nguoiDuyetId) {
        const don = await this.layChiTietDon(id);
        if (don.trangThai !== 'CHO_DUYET_2') {
            throw new common_1.BadRequestException('Đơn không ở trạng thái chờ duyệt cấp 2');
        }
        const updated = await this.prisma.donYeuCau.update({
            where: { id },
            data: {
                trangThai: 'DA_DUYET',
                nguoiDuyet2Id: nguoiDuyetId,
                ngayDuyet2: new Date(),
                ghiChuDuyet2: dto.ghiChu,
            },
        });
        await this.taoMappingChamCong(updated);
        const nguoiDung = await this.prisma.nguoiDung.findUnique({
            where: { nhanVienId: don.nhanVienId },
        });
        if (nguoiDung) {
            await this.thongBaoService.guiThongBaoYeuCauDaDuyet(nguoiDung.id, don.loaiYeuCau?.tenLoai || 'yêu cầu', id);
        }
        return updated;
    }
    async tuChoi(id, dto, nguoiDuyetId, cap) {
        const don = await this.layChiTietDon(id);
        const expectedTrangThai = cap === 1 ? 'CHO_DUYET_1' : 'CHO_DUYET_2';
        if (don.trangThai !== expectedTrangThai) {
            throw new common_1.BadRequestException(`Đơn không ở trạng thái chờ duyệt cấp ${cap}`);
        }
        const updated = await this.prisma.donYeuCau.update({
            where: { id },
            data: {
                trangThai: 'TU_CHOI',
                lyDoTuChoi: dto.lyDoTuChoi,
                ...(cap === 1
                    ? { nguoiDuyet1Id: nguoiDuyetId, ngayDuyet1: new Date() }
                    : { nguoiDuyet2Id: nguoiDuyetId, ngayDuyet2: new Date() }),
            },
        });
        const nguoiDung = await this.prisma.nguoiDung.findUnique({
            where: { nhanVienId: don.nhanVienId },
        });
        if (nguoiDung) {
            await this.thongBaoService.guiThongBaoYeuCauTuChoi(nguoiDung.id, don.loaiYeuCau?.tenLoai || 'yêu cầu', id, dto.lyDoTuChoi);
        }
        return updated;
    }
    async override(id, dto, nguoiOverrideId) {
        const don = await this.layChiTietDon(id);
        if (!['DA_DUYET', 'TU_CHOI', 'CHO_DUYET_1', 'CHO_DUYET_2'].includes(don.trangThai)) {
            throw new common_1.BadRequestException('Không thể override đơn này');
        }
        const trangThaiMoi = dto.duyet ? 'DA_DUYET' : 'TU_CHOI';
        const updated = await this.prisma.donYeuCau.update({
            where: { id },
            data: {
                trangThai: trangThaiMoi,
                isOverride: true,
                lyDoOverride: dto.lyDoOverride,
                nguoiOverrideId,
                nguoiDuyet1Id: don.nguoiDuyet1Id ?? nguoiOverrideId,
                ngayDuyet1: don.ngayDuyet1 ?? new Date(),
                nguoiDuyet2Id: nguoiOverrideId,
                ngayDuyet2: new Date(),
            },
        });
        if (dto.duyet) {
            await this.taoMappingChamCong(updated);
        }
        else {
            await this.prisma.requestMappingChamCong.deleteMany({
                where: { donYeuCauId: id, isLocked: false },
            });
        }
        return updated;
    }
    async huyDon(id, huyBoi) {
        const don = await this.layChiTietDon(id);
        if (!['NHAP', 'CHO_DUYET_1', 'CHO_DUYET_2', 'TU_CHOI'].includes(don.trangThai)) {
            throw new common_1.BadRequestException('Không thể hủy đơn đã duyệt');
        }
        return this.prisma.donYeuCau.update({
            where: { id },
            data: { trangThai: 'HUY' },
        });
    }
    async layDanhSachWorkflowConfig(loaiYeuCauId, phongBanId) {
        const where = {};
        if (loaiYeuCauId)
            where.loaiYeuCauId = loaiYeuCauId;
        if (phongBanId)
            where.phongBanId = phongBanId;
        return this.prisma.requestWorkflowConfig.findMany({
            where,
            include: {
                loaiYeuCau: { select: { maLoai: true, tenLoai: true } },
            },
            orderBy: { loaiYeuCauId: 'asc' },
        });
    }
    async layWorkflowConfig(loaiYeuCauId, phongBanId) {
        let config = await this.prisma.requestWorkflowConfig.findFirst({
            where: { loaiYeuCauId, phongBanId, isActive: true },
        });
        if (!config) {
            config = await this.prisma.requestWorkflowConfig.findFirst({
                where: { loaiYeuCauId, phongBanId: null, isActive: true },
            });
        }
        return config || { soCap: 1, nguoiDuyet1: 'QUAN_LY_TRUC_TIEP' };
    }
    async taoWorkflowConfig(dto, taoBoi) {
        return this.prisma.requestWorkflowConfig.create({
            data: { ...dto, taoBoi },
        });
    }
    async capNhatWorkflowConfig(id, dto, capNhatBoi) {
        return this.prisma.requestWorkflowConfig.update({
            where: { id },
            data: { ...dto, capNhatBoi },
        });
    }
    async taoMappingChamCong(don) {
        const loaiYeuCau = await this.prisma.danhMucLoaiYeuCau.findUnique({
            where: { id: don.loaiYeuCauId },
        });
        const loaiMapping = this.getLoaiMapping(loaiYeuCau?.maLoai || '');
        await this.prisma.requestMappingChamCong.upsert({
            where: {
                donYeuCauId_ngay: {
                    donYeuCauId: don.id,
                    ngay: don.ngayYeuCau,
                },
            },
            create: {
                donYeuCauId: don.id,
                nhanVienId: don.nhanVienId,
                ngay: don.ngayYeuCau,
                loaiMapping,
                soGioApDung: don.soGio,
                ghiChu: `Từ đơn ${don.maDon}`,
            },
            update: {
                loaiMapping,
                soGioApDung: don.soGio,
            },
        });
    }
    getLoaiMapping(maLoai) {
        const mappings = {
            'OT': 'OT',
            'TRE_GIO': 'HOP_THUC_TRE',
            'VE_SOM': 'HOP_THUC_SOM',
            'CONG_TAC': 'CONG_TAC',
            'LAM_TU_XA': 'LAM_TU_XA',
        };
        return mappings[maLoai] || 'KHAC';
    }
    async layInboxDuyetCap1(nguoiDuyetId, filter) {
        return this.layDanhSachDon({
            ...filter,
            trangThai: 'CHO_DUYET_1',
        });
    }
    async layInboxDuyetCap2(nguoiDuyetId, filter) {
        return this.layDanhSachDon({
            ...filter,
            trangThai: 'CHO_DUYET_2',
        });
    }
    async duyetBatch(ids, nguoiDuyetId, cap, ghiChu) {
        const results = { success: 0, failed: 0, errors: [] };
        for (const id of ids) {
            try {
                if (cap === 1) {
                    await this.duyetCap1(id, { ghiChu }, nguoiDuyetId);
                }
                else {
                    await this.duyetCap2(id, { ghiChu }, nguoiDuyetId);
                }
                results.success++;
            }
            catch (error) {
                results.failed++;
                results.errors.push(`Đơn #${id}: ${error.message}`);
            }
        }
        return results;
    }
};
exports.YeuCauService = YeuCauService;
exports.YeuCauService = YeuCauService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        thong_bao_service_1.ThongBaoService])
], YeuCauService);
//# sourceMappingURL=yeu-cau.service.js.map