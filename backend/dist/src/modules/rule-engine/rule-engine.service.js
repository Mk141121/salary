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
exports.RuleEngineService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const client_1 = require("@prisma/client");
let RuleEngineService = class RuleEngineService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async layDanhSachCongThuc(phongBanId) {
        const where = { trangThai: true };
        if (phongBanId) {
            where.OR = [{ phongBanId }, { phongBanId: null }];
        }
        return this.prisma.congThucLuong.findMany({
            where,
            include: {
                bienSos: true,
            },
            orderBy: { ngayTao: 'desc' },
        });
    }
    async layCongThuc(id) {
        const congThuc = await this.prisma.congThucLuong.findUnique({
            where: { id },
            include: {
                bienSos: true,
            },
        });
        if (!congThuc) {
            throw new common_1.NotFoundException(`Không tìm thấy công thức với ID: ${id}`);
        }
        return congThuc;
    }
    async taoCongThuc(data) {
        this.validateCongThuc(data.congThuc);
        return this.prisma.congThucLuong.create({
            data: {
                maCongThuc: data.maCongThuc,
                tenCongThuc: data.tenCongThuc,
                moTa: data.moTa,
                phongBanId: data.phongBanId,
                congThuc: data.congThuc,
                tuNgay: data.tuNgay,
                denNgay: data.denNgay,
                nguoiTao: data.nguoiTao,
                bienSos: data.bienSos
                    ? {
                        create: data.bienSos,
                    }
                    : undefined,
            },
            include: {
                bienSos: true,
            },
        });
    }
    async capNhatCongThuc(id, data) {
        const congThucHienTai = await this.layCongThuc(id);
        this.validateCongThuc(data.congThuc);
        await this.prisma.lichSuCongThuc.create({
            data: {
                maCongThuc: congThucHienTai.maCongThuc,
                phienBan: congThucHienTai.phienBan,
                congThucCu: congThucHienTai.congThuc,
                congThucMoi: data.congThuc,
                lyDoThayDoi: data.lyDoThayDoi,
                nguoiThayDoi: data.nguoiThayDoi,
            },
        });
        return this.prisma.congThucLuong.update({
            where: { id },
            data: {
                congThuc: data.congThuc,
                phienBan: { increment: 1 },
            },
            include: {
                bienSos: true,
            },
        });
    }
    async themBienSo(congThucId, data) {
        return this.prisma.bienSoCongThuc.create({
            data: {
                congThucId,
                ...data,
            },
        });
    }
    async xoaBienSo(id) {
        return this.prisma.bienSoCongThuc.delete({
            where: { id },
        });
    }
    async layLichSuCongThuc(maCongThuc) {
        return this.prisma.lichSuCongThuc.findMany({
            where: { maCongThuc },
            orderBy: { phienBan: 'desc' },
        });
    }
    validateCongThuc(congThuc) {
        const invalidChars = /[;`'"]/g;
        if (invalidChars.test(congThuc)) {
            throw new common_1.BadRequestException('Công thức chứa ký tự không hợp lệ');
        }
        const dangerousKeywords = ['eval', 'function', 'require', 'import', 'export', 'window', 'document', 'process'];
        for (const keyword of dangerousKeywords) {
            if (congThuc.toLowerCase().includes(keyword)) {
                throw new common_1.BadRequestException(`Công thức chứa từ khóa không được phép: ${keyword}`);
            }
        }
        return true;
    }
    tinhCongThuc(congThuc, bienSo) {
        try {
            let bieuThuc = congThuc;
            const chiTiet = [];
            for (const [ten, giaTri] of Object.entries(bienSo)) {
                const regex = new RegExp(`\\b${ten}\\b`, 'g');
                bieuThuc = bieuThuc.replace(regex, String(giaTri));
                chiTiet.push(`${ten} = ${this.formatTien(Number(giaTri))}`);
            }
            const safeExpression = bieuThuc
                .replace(/[^0-9+\-*/().,%\s]/g, '')
                .replace(/,/g, '');
            const calculate = new Function(`return ${safeExpression}`);
            const ketQua = calculate();
            if (typeof ketQua !== 'number' || isNaN(ketQua)) {
                throw new Error('Kết quả không hợp lệ');
            }
            return {
                congThuc,
                bienSo,
                ketQua: Math.round(ketQua),
                chiTiet: chiTiet.join(', '),
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(`Lỗi tính công thức: ${error.message}`);
        }
    }
    formatTien(so) {
        return new Intl.NumberFormat('vi-VN').format(so);
    }
    async layGiaTriBienSo(nhanVienId, thang, nam, bienSos) {
        const giaTri = {};
        const nhanVien = await this.prisma.nhanVien.findUnique({
            where: { id: nhanVienId },
            include: {
                phongBan: true,
                phuCaps: {
                    where: {
                        trangThai: 'HIEU_LUC',
                        tuNgay: { lte: new Date(nam, thang - 1, 28) },
                        OR: [
                            { denNgay: null },
                            { denNgay: { gte: new Date(nam, thang - 1, 1) } },
                        ],
                    },
                    include: {
                        khoanLuong: true,
                    },
                },
            },
        });
        if (!nhanVien) {
            throw new common_1.NotFoundException(`Không tìm thấy nhân viên với ID: ${nhanVienId}`);
        }
        const chamCong = await this.prisma.chamCong.findUnique({
            where: {
                nhanVienId_thang_nam: {
                    nhanVienId,
                    thang,
                    nam,
                },
            },
        });
        for (const bs of bienSos) {
            switch (bs.tenBien) {
                case 'LUONG_CO_BAN':
                    giaTri[bs.tenBien] = Number(nhanVien.luongCoBan);
                    break;
                case 'CONG_CHUAN':
                    giaTri[bs.tenBien] = chamCong ? Number(chamCong.soCongChuan) : 26;
                    break;
                case 'CONG_THUC_TE':
                    giaTri[bs.tenBien] = chamCong ? Number(chamCong.soCongThucTe) : 26;
                    break;
                case 'SO_GIO_OT':
                    giaTri[bs.tenBien] = chamCong ? Number(chamCong.soGioOT) : 0;
                    break;
                case 'SO_GIO_OT_DEM':
                    giaTri[bs.tenBien] = chamCong ? Number(chamCong.soGioOTDem) : 0;
                    break;
                case 'SO_GIO_OT_CN':
                    giaTri[bs.tenBien] = chamCong ? Number(chamCong.soGioOTChuNhat) : 0;
                    break;
                case 'SO_GIO_OT_LE':
                    giaTri[bs.tenBien] = chamCong ? Number(chamCong.soGioOTLe) : 0;
                    break;
                case 'SO_LAN_DI_MUON':
                    giaTri[bs.tenBien] = chamCong ? chamCong.soLanDiMuon : 0;
                    break;
                case 'TONG_PHU_CAP':
                    giaTri[bs.tenBien] = nhanVien.phuCaps.reduce((sum, pc) => sum + Number(pc.soTien), 0);
                    break;
                default:
                    const phuCap = nhanVien.phuCaps.find((pc) => pc.khoanLuong.maKhoan === bs.tenBien);
                    if (phuCap) {
                        giaTri[bs.tenBien] = Number(phuCap.soTien);
                    }
                    else if (bs.giaTriMacDinh) {
                        giaTri[bs.tenBien] = parseFloat(bs.giaTriMacDinh);
                    }
                    else {
                        giaTri[bs.tenBien] = 0;
                    }
            }
        }
        return giaTri;
    }
    async tinhLuongTheoCongThuc(nhanVienId, congThucId, thang, nam) {
        const congThuc = await this.layCongThuc(congThucId);
        const bienSo = await this.layGiaTriBienSo(nhanVienId, thang, nam, congThuc.bienSos);
        return this.tinhCongThuc(congThuc.congThuc, bienSo);
    }
    async khoiTaoCongThucMau() {
        const congThucMau = [
            {
                maCongThuc: 'CT_LUONG_CO_BAN',
                tenCongThuc: 'Công thức lương cơ bản theo công',
                moTa: 'Lương = Lương cơ bản × (Công thực tế / Công chuẩn)',
                congThuc: 'LUONG_CO_BAN * (CONG_THUC_TE / CONG_CHUAN)',
                tuNgay: new Date(),
                nguoiTao: 'Hệ thống',
                bienSos: [
                    { tenBien: 'LUONG_CO_BAN', moTa: 'Lương cơ bản theo hợp đồng', kieuDuLieu: client_1.KieuDuLieu.TIEN },
                    { tenBien: 'CONG_THUC_TE', moTa: 'Số công thực tế', kieuDuLieu: client_1.KieuDuLieu.SO, giaTriMacDinh: '26' },
                    { tenBien: 'CONG_CHUAN', moTa: 'Số công chuẩn', kieuDuLieu: client_1.KieuDuLieu.SO, giaTriMacDinh: '26' },
                ],
            },
            {
                maCongThuc: 'CT_LUONG_OT',
                tenCongThuc: 'Công thức tính OT',
                moTa: 'OT = (Lương cơ bản / 26 / 8) × Số giờ OT × Hệ số',
                congThuc: '(LUONG_CO_BAN / 26 / 8) * SO_GIO_OT * 1.5 + (LUONG_CO_BAN / 26 / 8) * SO_GIO_OT_DEM * 2.0 + (LUONG_CO_BAN / 26 / 8) * SO_GIO_OT_CN * 2.0 + (LUONG_CO_BAN / 26 / 8) * SO_GIO_OT_LE * 3.0',
                tuNgay: new Date(),
                nguoiTao: 'Hệ thống',
                bienSos: [
                    { tenBien: 'LUONG_CO_BAN', moTa: 'Lương cơ bản', kieuDuLieu: client_1.KieuDuLieu.TIEN },
                    { tenBien: 'SO_GIO_OT', moTa: 'Số giờ OT thường', kieuDuLieu: client_1.KieuDuLieu.SO, giaTriMacDinh: '0' },
                    { tenBien: 'SO_GIO_OT_DEM', moTa: 'Số giờ OT đêm', kieuDuLieu: client_1.KieuDuLieu.SO, giaTriMacDinh: '0' },
                    { tenBien: 'SO_GIO_OT_CN', moTa: 'Số giờ OT chủ nhật', kieuDuLieu: client_1.KieuDuLieu.SO, giaTriMacDinh: '0' },
                    { tenBien: 'SO_GIO_OT_LE', moTa: 'Số giờ OT ngày lễ', kieuDuLieu: client_1.KieuDuLieu.SO, giaTriMacDinh: '0' },
                ],
            },
            {
                maCongThuc: 'CT_PHAT_DI_MUON',
                tenCongThuc: 'Công thức phạt đi muộn',
                moTa: 'Phạt = Số lần đi muộn × 50,000',
                congThuc: 'SO_LAN_DI_MUON * 50000',
                tuNgay: new Date(),
                nguoiTao: 'Hệ thống',
                bienSos: [
                    { tenBien: 'SO_LAN_DI_MUON', moTa: 'Số lần đi muộn', kieuDuLieu: client_1.KieuDuLieu.SO, giaTriMacDinh: '0' },
                ],
            },
            {
                maCongThuc: 'CT_LUONG_KINH_DOANH',
                tenCongThuc: 'Công thức lương kinh doanh',
                moTa: 'Lương = Lương cơ bản + Doanh số × Hoa hồng',
                congThuc: 'LUONG_CO_BAN + DOANH_SO * TY_LE_HOA_HONG / 100',
                tuNgay: new Date(),
                nguoiTao: 'Hệ thống',
                bienSos: [
                    { tenBien: 'LUONG_CO_BAN', moTa: 'Lương cơ bản', kieuDuLieu: client_1.KieuDuLieu.TIEN },
                    { tenBien: 'DOANH_SO', moTa: 'Doanh số tháng', kieuDuLieu: client_1.KieuDuLieu.TIEN, giaTriMacDinh: '0' },
                    { tenBien: 'TY_LE_HOA_HONG', moTa: 'Tỷ lệ hoa hồng (%)', kieuDuLieu: client_1.KieuDuLieu.PHAN_TRAM, giaTriMacDinh: '2' },
                ],
            },
        ];
        for (const ct of congThucMau) {
            const existing = await this.prisma.congThucLuong.findUnique({
                where: { maCongThuc: ct.maCongThuc },
            });
            if (!existing) {
                await this.prisma.congThucLuong.create({
                    data: {
                        maCongThuc: ct.maCongThuc,
                        tenCongThuc: ct.tenCongThuc,
                        moTa: ct.moTa,
                        congThuc: ct.congThuc,
                        tuNgay: ct.tuNgay,
                        nguoiTao: ct.nguoiTao,
                        bienSos: {
                            create: ct.bienSos,
                        },
                    },
                });
            }
        }
        return { message: 'Đã khởi tạo công thức mẫu' };
    }
    async testCongThuc(congThuc, bienSo) {
        this.validateCongThuc(congThuc);
        return this.tinhCongThuc(congThuc, bienSo);
    }
};
exports.RuleEngineService = RuleEngineService;
exports.RuleEngineService = RuleEngineService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], RuleEngineService);
//# sourceMappingURL=rule-engine.service.js.map