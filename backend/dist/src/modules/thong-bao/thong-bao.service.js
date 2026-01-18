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
exports.ThongBaoService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const client_1 = require("@prisma/client");
let ThongBaoService = class ThongBaoService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async layDanhSach(nguoiDungId, query) {
        const { daDoc, loaiThongBao, page = 1, limit = 20 } = query;
        const skip = (page - 1) * limit;
        const where = { nguoiNhanId: nguoiDungId };
        if (daDoc !== undefined) {
            where.daDoc = daDoc;
        }
        if (loaiThongBao) {
            where.loaiThongBao = loaiThongBao;
        }
        const [data, total, chuaDoc] = await Promise.all([
            this.prisma.thongBao.findMany({
                where,
                orderBy: { ngayTao: 'desc' },
                skip,
                take: limit,
            }),
            this.prisma.thongBao.count({ where }),
            this.prisma.thongBao.count({
                where: { nguoiNhanId: nguoiDungId, daDoc: false },
            }),
        ]);
        return {
            data: data.map((tb) => this.mapToResponse(tb)),
            total,
            page,
            limit,
            chuaDoc,
        };
    }
    async demChuaDoc(nguoiDungId) {
        return this.prisma.thongBao.count({
            where: { nguoiNhanId: nguoiDungId, daDoc: false },
        });
    }
    async danhDauDaDoc(nguoiDungId, thongBaoId) {
        const thongBao = await this.prisma.thongBao.findFirst({
            where: { id: thongBaoId, nguoiNhanId: nguoiDungId },
        });
        if (!thongBao) {
            throw new common_1.NotFoundException('Không tìm thấy thông báo');
        }
        const updated = await this.prisma.thongBao.update({
            where: { id: thongBaoId },
            data: { daDoc: true, ngayDoc: new Date() },
        });
        return this.mapToResponse(updated);
    }
    async danhDauTatCaDaDoc(nguoiDungId) {
        const result = await this.prisma.thongBao.updateMany({
            where: { nguoiNhanId: nguoiDungId, daDoc: false },
            data: { daDoc: true, ngayDoc: new Date() },
        });
        return { count: result.count };
    }
    async xoaThongBaoCu() {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        const result = await this.prisma.thongBao.deleteMany({
            where: {
                daDoc: true,
                ngayDoc: { lt: thirtyDaysAgo },
            },
        });
        return { count: result.count };
    }
    async taoThongBao(dto) {
        const thongBao = await this.prisma.thongBao.create({
            data: {
                nguoiNhanId: dto.nguoiNhanId,
                loaiThongBao: dto.loaiThongBao,
                tieuDe: dto.tieuDe,
                noiDung: dto.noiDung,
                link: dto.link,
                duLieuThem: dto.duLieuThem,
            },
        });
        return this.mapToResponse(thongBao);
    }
    async taoThongBaoNhieuNguoi(nguoiNhanIds, loaiThongBao, tieuDe, noiDung, link, duLieuThem) {
        const result = await this.prisma.thongBao.createMany({
            data: nguoiNhanIds.map((nguoiNhanId) => ({
                nguoiNhanId,
                loaiThongBao,
                tieuDe,
                noiDung,
                link,
                duLieuThem,
            })),
        });
        return { count: result.count };
    }
    async guiThongBaoYeuCauMoi(nguoiDuyetId, nhanVienTen, loaiYeuCau, donYeuCauId) {
        await this.taoThongBao({
            nguoiNhanId: nguoiDuyetId,
            loaiThongBao: client_1.LoaiThongBao.YEU_CAU_MOI,
            tieuDe: `Yêu cầu ${loaiYeuCau} mới`,
            noiDung: `${nhanVienTen} đã gửi yêu cầu ${loaiYeuCau} cần duyệt`,
            link: `/yeu-cau/duyet/${donYeuCauId}`,
            duLieuThem: { donYeuCauId },
        });
    }
    async guiThongBaoYeuCauDaDuyet(nguoiNhanId, loaiYeuCau, donYeuCauId) {
        await this.taoThongBao({
            nguoiNhanId,
            loaiThongBao: client_1.LoaiThongBao.YEU_CAU_DA_DUYET,
            tieuDe: `Yêu cầu ${loaiYeuCau} đã được duyệt`,
            noiDung: `Yêu cầu ${loaiYeuCau} của bạn đã được duyệt`,
            link: `/portal/yeu-cau`,
            duLieuThem: { donYeuCauId },
        });
    }
    async guiThongBaoYeuCauTuChoi(nguoiNhanId, loaiYeuCau, donYeuCauId, lyDo) {
        await this.taoThongBao({
            nguoiNhanId,
            loaiThongBao: client_1.LoaiThongBao.YEU_CAU_TU_CHOI,
            tieuDe: `Yêu cầu ${loaiYeuCau} bị từ chối`,
            noiDung: `Yêu cầu ${loaiYeuCau} của bạn bị từ chối. Lý do: ${lyDo || 'Không có'}`,
            link: `/portal/yeu-cau`,
            duLieuThem: { donYeuCauId, lyDo },
        });
    }
    async guiThongBaoNghiPhepDaDuyet(nguoiNhanId, loaiNghi, donNghiPhepId) {
        await this.taoThongBao({
            nguoiNhanId,
            loaiThongBao: client_1.LoaiThongBao.NGHI_PHEP_DA_DUYET,
            tieuDe: `Đơn ${loaiNghi} đã được duyệt`,
            noiDung: `Đơn xin ${loaiNghi} của bạn đã được duyệt`,
            link: `/portal/yeu-cau`,
            duLieuThem: { donNghiPhepId },
        });
    }
    async guiThongBaoLichPhanCa(nguoiNhanIds, tuNgay, denNgay, lichPhanCaId) {
        await this.taoThongBaoNhieuNguoi(nguoiNhanIds, client_1.LoaiThongBao.LICH_PHAN_CA, 'Lịch làm việc mới', `Lịch làm việc từ ${tuNgay} đến ${denNgay} đã được công bố`, '/portal/lich-lam', { lichPhanCaId, tuNgay, denNgay });
    }
    async guiThongBaoPhieuLuong(nguoiNhanId, kyLuong, bangLuongId) {
        await this.taoThongBao({
            nguoiNhanId,
            loaiThongBao: client_1.LoaiThongBao.PHIEU_LUONG,
            tieuDe: `Phiếu lương ${kyLuong}`,
            noiDung: `Phiếu lương kỳ ${kyLuong} của bạn đã sẵn sàng`,
            link: '/portal/ca-nhan',
            duLieuThem: { bangLuongId, kyLuong },
        });
    }
    mapToResponse(thongBao) {
        return {
            id: thongBao.id,
            loaiThongBao: thongBao.loaiThongBao,
            tieuDe: thongBao.tieuDe,
            noiDung: thongBao.noiDung,
            link: thongBao.link,
            daDoc: thongBao.daDoc,
            ngayDoc: thongBao.ngayDoc,
            duLieuThem: thongBao.duLieuThem,
            ngayTao: thongBao.ngayTao,
        };
    }
};
exports.ThongBaoService = ThongBaoService;
exports.ThongBaoService = ThongBaoService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ThongBaoService);
//# sourceMappingURL=thong-bao.service.js.map