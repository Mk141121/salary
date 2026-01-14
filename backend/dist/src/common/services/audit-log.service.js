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
exports.AuditLogService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let AuditLogService = class AuditLogService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async ghiLog(dto) {
        return this.prisma.auditLog.create({
            data: {
                nguoiDungId: dto.nguoiDungId,
                tenDangNhap: dto.tenDangNhap || 'SYSTEM',
                hanhDong: dto.hanhDong,
                bangDuLieu: dto.bangDuLieu,
                banGhiId: dto.banGhiId,
                duLieuCu: dto.duLieuCu,
                duLieuMoi: dto.duLieuMoi,
                diaChiIP: dto.diaChiIP,
                userAgent: dto.userAgent,
                moTa: dto.moTa,
            },
        });
    }
    async ghiLogRuleEngine(params) {
        return this.ghiLog({
            nguoiDungId: params.nguoiDungId,
            tenDangNhap: params.tenDangNhap,
            hanhDong: 'CHAY_RULE_ENGINE',
            bangDuLieu: 'bang_luong',
            banGhiId: params.bangLuongId.toString(),
            duLieuMoi: JSON.stringify({
                quyCheId: params.quyCheId,
                soNhanVien: params.soNhanVien,
                thoiGianXuLy: params.thoiGianXuLy,
            }),
            moTa: params.moTa || `Chạy Rule Engine cho bảng lương ${params.bangLuongId}`,
        });
    }
    async ghiLogChotBangLuong(params) {
        return this.ghiLog({
            nguoiDungId: params.nguoiDungId,
            tenDangNhap: params.tenDangNhap,
            hanhDong: 'CHOT_BANG_LUONG',
            bangDuLieu: 'bang_luong',
            banGhiId: params.bangLuongId.toString(),
            duLieuMoi: JSON.stringify({
                thang: params.thang,
                nam: params.nam,
                phongBan: params.phongBan,
            }),
            moTa: `Chốt bảng lương ${params.phongBan} tháng ${params.thang}/${params.nam}`,
        });
    }
    async ghiLogMoKhoaBangLuong(params) {
        return this.ghiLog({
            nguoiDungId: params.nguoiDungId,
            tenDangNhap: params.tenDangNhap,
            hanhDong: 'MO_KHOA_BANG_LUONG',
            bangDuLieu: 'bang_luong',
            banGhiId: params.bangLuongId.toString(),
            moTa: `Mở khóa bảng lương: ${params.lyDo}`,
        });
    }
    async ghiLogKhoaBangLuong(params) {
        return this.ghiLog({
            nguoiDungId: params.nguoiDungId,
            tenDangNhap: params.tenDangNhap,
            hanhDong: 'KHOA_BANG_LUONG',
            bangDuLieu: 'bang_luong',
            banGhiId: params.bangLuongId.toString(),
            moTa: `Khóa vĩnh viễn bảng lương ${params.bangLuongId}`,
        });
    }
    async ghiLogImportExcel(params) {
        return this.ghiLog({
            nguoiDungId: params.nguoiDungId,
            tenDangNhap: params.tenDangNhap,
            hanhDong: 'IMPORT_EXCEL',
            bangDuLieu: params.loaiImport,
            duLieuMoi: JSON.stringify({
                tenFile: params.tenFile,
                soLuong: params.soLuong,
                thanhCong: params.thanhCong,
                loi: params.loi,
            }),
            moTa: `Import ${params.loaiImport}: ${params.thanhCong}/${params.soLuong} thành công`,
        });
    }
    async ghiLogQuyChe(params) {
        return this.ghiLog({
            nguoiDungId: params.nguoiDungId,
            tenDangNhap: params.tenDangNhap,
            hanhDong: `${params.hanhDong}_QUY_CHE`,
            bangDuLieu: 'quy_che_luong',
            banGhiId: params.quyCheId.toString(),
            duLieuCu: params.duLieuCu ? JSON.stringify(params.duLieuCu) : undefined,
            duLieuMoi: params.duLieuMoi ? JSON.stringify(params.duLieuMoi) : undefined,
            moTa: `${params.hanhDong} quy chế: ${params.tenQuyChe}`,
        });
    }
    async timKiem(dto) {
        const where = {};
        if (dto.nguoiDungId)
            where.nguoiDungId = dto.nguoiDungId;
        if (dto.tenDangNhap)
            where.tenDangNhap = { contains: dto.tenDangNhap };
        if (dto.hanhDong)
            where.hanhDong = dto.hanhDong;
        if (dto.bangDuLieu)
            where.bangDuLieu = dto.bangDuLieu;
        if (dto.tuNgay || dto.denNgay) {
            where.ngayTao = {};
            if (dto.tuNgay)
                where.ngayTao.gte = new Date(dto.tuNgay);
            if (dto.denNgay)
                where.ngayTao.lte = new Date(dto.denNgay);
        }
        const trang = dto.trang || 1;
        const soLuong = dto.soLuong || 20;
        const [items, total] = await Promise.all([
            this.prisma.auditLog.findMany({
                where,
                include: {
                    nguoiDung: {
                        select: { hoTen: true },
                    },
                },
                orderBy: { ngayTao: 'desc' },
                skip: (trang - 1) * soLuong,
                take: soLuong,
            }),
            this.prisma.auditLog.count({ where }),
        ]);
        return {
            items,
            total,
            trang,
            soLuong,
            tongTrang: Math.ceil(total / soLuong),
        };
    }
};
exports.AuditLogService = AuditLogService;
exports.AuditLogService = AuditLogService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AuditLogService);
//# sourceMappingURL=audit-log.service.js.map