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
exports.NgayCongService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const library_1 = require("@prisma/client/runtime/library");
const client_1 = require("@prisma/client");
let NgayCongService = class NgayCongService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async tinhLaiKhoanLuongTheoNgayCong(bangLuongId, nhanVienId, ngayCongMoi) {
        const bangLuong = await this.prisma.bangLuong.findUnique({
            where: { id: bangLuongId },
        });
        if (!bangLuong)
            return;
        const ngayCongLyThuyet = await this.tinhNgayCongLyThuyet(bangLuong.thang, bangLuong.nam);
        if (ngayCongLyThuyet <= 0)
            return;
        const nhanVien = await this.prisma.nhanVien.findUnique({
            where: { id: nhanVienId },
        });
        if (!nhanVien)
            return;
        const luongCoBan = await this.prisma.khoanLuong.findFirst({
            where: { maKhoan: 'LUONG_CO_BAN' },
        });
        const chiTiets = await this.prisma.chiTietBangLuong.findMany({
            where: {
                bangLuongId,
                nhanVienId,
            },
            include: {
                khoanLuong: true,
            },
        });
        for (const ct of chiTiets) {
            let soTienMoi = null;
            if (luongCoBan && ct.khoanLuongId === luongCoBan.id) {
                soTienMoi = Math.round(Number(nhanVien.luongCoBan) * (ngayCongMoi / ngayCongLyThuyet));
            }
            else if (ct.khoanLuong.cachTinh === client_1.CachTinhLuong.THEO_NGAY_CONG) {
                const phuCap = await this.prisma.phuCapNhanVien.findFirst({
                    where: {
                        nhanVienId,
                        khoanLuongId: ct.khoanLuongId,
                        trangThai: 'HIEU_LUC',
                    },
                });
                if (phuCap) {
                    soTienMoi = Math.round(Number(phuCap.soTien) * (ngayCongMoi / ngayCongLyThuyet));
                }
            }
            if (soTienMoi !== null) {
                await this.prisma.chiTietBangLuong.update({
                    where: { id: ct.id },
                    data: { soTien: new library_1.Decimal(soTienMoi) },
                });
            }
        }
    }
    async khoiTaoNgayCongTuChamCong(bangLuongId) {
        const bangLuong = await this.prisma.bangLuong.findUnique({
            where: { id: bangLuongId },
        });
        if (!bangLuong) {
            throw new Error('Không tìm thấy bảng lương');
        }
        const nhanViens = await this.prisma.nhanVien.findMany({
            where: {
                phongBanId: bangLuong.phongBanId,
                trangThai: 'DANG_LAM',
            },
        });
        const ngayCongLyThuyet = await this.tinhNgayCongLyThuyet(bangLuong.thang, bangLuong.nam);
        const records = [];
        for (const nv of nhanViens) {
            const chamCong = await this.prisma.chamCong.findFirst({
                where: {
                    nhanVienId: nv.id,
                    thang: bangLuong.thang,
                    nam: bangLuong.nam,
                },
            });
            if (chamCong) {
                records.push({
                    bangLuongId: bangLuongId,
                    nhanVienId: nv.id,
                    ngayCongLyThuyet: new library_1.Decimal(ngayCongLyThuyet),
                    soCongThucTe: chamCong.soCongThucTe,
                    soNgayNghiPhep: chamCong.soNgayNghiPhep,
                    soNgayNghiKhongPhep: chamCong.soNgayNghiKhongLuong,
                    ngayCongDieuChinh: null,
                    ghiChu: null,
                });
            }
        }
        await this.prisma.ngayCongBangLuong.deleteMany({
            where: { bangLuongId },
        });
        if (records.length > 0) {
            await this.prisma.ngayCongBangLuong.createMany({
                data: records,
            });
        }
        return records;
    }
    async layNgayCongTheoNhanVien(bangLuongId, nhanVienId) {
        return this.prisma.ngayCongBangLuong.findUnique({
            where: {
                bangLuongId_nhanVienId: {
                    bangLuongId,
                    nhanVienId,
                },
            },
        });
    }
    async layTatCaNgayCong(bangLuongId) {
        return this.prisma.ngayCongBangLuong.findMany({
            where: { bangLuongId },
            include: {
                nhanVien: {
                    select: {
                        id: true,
                        maNhanVien: true,
                        hoTen: true,
                    },
                },
            },
        });
    }
    async capNhatNgayCongDieuChinh(bangLuongId, nhanVienId, ngayCongMoi, ghiChu) {
        const bangLuong = await this.prisma.bangLuong.findUnique({
            where: { id: bangLuongId },
        });
        if (!bangLuong) {
            throw new Error('Không tìm thấy bảng lương');
        }
        if (bangLuong.trangThai === 'KHOA') {
            throw new Error('Không thể sửa bảng lương đã khóa');
        }
        const result = await this.prisma.ngayCongBangLuong.upsert({
            where: {
                bangLuongId_nhanVienId: {
                    bangLuongId,
                    nhanVienId,
                },
            },
            update: {
                ngayCongDieuChinh: new library_1.Decimal(ngayCongMoi),
                ghiChu: ghiChu || null,
                ngayCapNhat: new Date(),
            },
            create: {
                bangLuongId,
                nhanVienId,
                ngayCongLyThuyet: new library_1.Decimal(0),
                soCongThucTe: new library_1.Decimal(0),
                soNgayNghiPhep: new library_1.Decimal(0),
                soNgayNghiKhongPhep: new library_1.Decimal(0),
                ngayCongDieuChinh: new library_1.Decimal(ngayCongMoi),
                ghiChu: ghiChu || null,
            },
        });
        await this.tinhLaiKhoanLuongTheoNgayCong(bangLuongId, nhanVienId, ngayCongMoi);
        return result;
    }
    tinhNgayCongThucTe(ngayCong) {
        if (ngayCong.ngayCongDieuChinh) {
            return Number(ngayCong.ngayCongDieuChinh);
        }
        return (Number(ngayCong.soCongThucTe) + Number(ngayCong.soNgayNghiPhep));
    }
    async tinhNgayCongLyThuyet(thang, nam) {
        const soNgayTrongThang = new Date(nam, thang, 0).getDate();
        let soNgayCuoiTuan = 0;
        for (let ngay = 1; ngay <= soNgayTrongThang; ngay++) {
            const date = new Date(nam, thang - 1, ngay);
            const dayOfWeek = date.getDay();
            if (dayOfWeek === 0 || dayOfWeek === 6) {
                soNgayCuoiTuan++;
            }
        }
        return soNgayTrongThang - soNgayCuoiTuan;
    }
    async xoaDieuChinh(bangLuongId, nhanVienId) {
        return this.prisma.ngayCongBangLuong.update({
            where: {
                bangLuongId_nhanVienId: {
                    bangLuongId,
                    nhanVienId,
                },
            },
            data: {
                ngayCongDieuChinh: null,
                ghiChu: null,
                ngayCapNhat: new Date(),
            },
        });
    }
};
exports.NgayCongService = NgayCongService;
exports.NgayCongService = NgayCongService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], NgayCongService);
//# sourceMappingURL=ngay-cong.service.js.map