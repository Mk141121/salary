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
exports.PhieuLuongService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const email_service_1 = require("../email/email.service");
const tinh_luong_service_1 = require("./tinh-luong.service");
let PhieuLuongService = class PhieuLuongService {
    constructor(prisma, emailService, tinhLuongService) {
        this.prisma = prisma;
        this.emailService = emailService;
        this.tinhLuongService = tinhLuongService;
    }
    tinhSoNgayCongLyThuyet(thang, nam) {
        const soNgayTrongThang = new Date(nam, thang, 0).getDate();
        let soNgayThuBay = 0;
        let soNgayChuNhat = 0;
        for (let ngay = 1; ngay <= soNgayTrongThang; ngay++) {
            const date = new Date(nam, thang - 1, ngay);
            const thuTrongTuan = date.getDay();
            if (thuTrongTuan === 0)
                soNgayChuNhat++;
            if (thuTrongTuan === 6)
                soNgayThuBay++;
        }
        return soNgayTrongThang - soNgayChuNhat - (soNgayThuBay * 0.5);
    }
    async layPhieuLuong(bangLuongId, nhanVienId) {
        const bangLuong = await this.prisma.bangLuong.findUnique({
            where: { id: bangLuongId },
            include: { phongBan: true },
        });
        if (!bangLuong) {
            throw new common_1.NotFoundException(`Không tìm thấy bảng lương ID: ${bangLuongId}`);
        }
        const nhanVien = await this.prisma.nhanVien.findUnique({
            where: { id: nhanVienId },
        });
        if (!nhanVien) {
            throw new common_1.NotFoundException(`Không tìm thấy nhân viên ID: ${nhanVienId}`);
        }
        const chiTiets = await this.prisma.chiTietBangLuong.findMany({
            where: {
                bangLuongId,
                nhanVienId,
            },
            include: {
                khoanLuong: true,
            },
            orderBy: {
                khoanLuong: { thuTu: 'asc' },
            },
        });
        let tongThuNhap = 0;
        let tongKhauTru = 0;
        const cacKhoanLuong = chiTiets.map((ct) => {
            const soTien = Number(ct.soTien);
            if (ct.khoanLuong.loai === 'THU_NHAP') {
                tongThuNhap += soTien;
            }
            else {
                tongKhauTru += soTien;
            }
            return {
                tenKhoan: ct.khoanLuong.tenKhoan,
                loai: ct.khoanLuong.loai,
                soTien,
            };
        });
        const ngayCongLyThuyet = this.tinhSoNgayCongLyThuyet(bangLuong.thang, bangLuong.nam);
        const ngayCongRecord = await this.prisma.ngayCongBangLuong.findFirst({
            where: {
                bangLuongId,
                nhanVienId,
            },
        });
        let ngayCongThucTe = ngayCongLyThuyet;
        if (ngayCongRecord) {
            if (ngayCongRecord.ngayCongDieuChinh !== null) {
                ngayCongThucTe = Number(ngayCongRecord.ngayCongDieuChinh);
            }
            else {
                ngayCongThucTe = Number(ngayCongRecord.soCongThucTe) + Number(ngayCongRecord.soNgayNghiPhep);
            }
        }
        return {
            hoTen: nhanVien.hoTen,
            maNhanVien: nhanVien.maNhanVien,
            email: nhanVien.email || '',
            phongBan: bangLuong.phongBan.tenPhongBan,
            chucVu: nhanVien.chucVu || '',
            thang: bangLuong.thang,
            nam: bangLuong.nam,
            ngayCongThucTe,
            ngayCongLyThuyet,
            cacKhoanLuong,
            tongThuNhap,
            tongKhauTru,
            thucLinh: tongThuNhap - tongKhauTru,
        };
    }
    async layPhieuLuongHtml(bangLuongId, nhanVienId) {
        const data = await this.layPhieuLuong(bangLuongId, nhanVienId);
        const html = this.emailService.getPayslipHtml(data);
        return { html, data };
    }
    async guiPhieuLuong(bangLuongId, nhanVienId) {
        const data = await this.layPhieuLuong(bangLuongId, nhanVienId);
        return this.emailService.sendPayslip(data);
    }
    async guiTatCaPhieuLuong(bangLuongId) {
        const chiTiets = await this.prisma.chiTietBangLuong.findMany({
            where: { bangLuongId },
            select: { nhanVienId: true },
            distinct: ['nhanVienId'],
        });
        const nhanVienIds = [...new Set(chiTiets.map((ct) => ct.nhanVienId))];
        const dataList = [];
        for (const nhanVienId of nhanVienIds) {
            try {
                const data = await this.layPhieuLuong(bangLuongId, nhanVienId);
                dataList.push(data);
            }
            catch (error) {
                console.error(`Không lấy được phiếu lương NV ${nhanVienId}:`, error);
            }
        }
        return this.emailService.sendPayslipBulk(dataList);
    }
};
exports.PhieuLuongService = PhieuLuongService;
exports.PhieuLuongService = PhieuLuongService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        email_service_1.EmailService,
        tinh_luong_service_1.TinhLuongService])
], PhieuLuongService);
//# sourceMappingURL=phieu-luong.service.js.map