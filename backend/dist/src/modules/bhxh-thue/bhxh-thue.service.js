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
exports.BHXHThueService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const cache_service_1 = require("../../common/cache/cache.service");
let BHXHThueService = class BHXHThueService {
    constructor(prisma, cacheService) {
        this.prisma = prisma;
        this.cacheService = cacheService;
    }
    async layCauHinhBHXH(nam) {
        const cacheKey = cache_service_1.CACHE_KEYS.CAU_HINH_BHXH(nam);
        return this.cacheService.getOrSet(cacheKey, async () => {
            const cauHinh = await this.prisma.cauHinhBHXH.findUnique({
                where: { nam },
            });
            if (!cauHinh) {
                throw new common_1.NotFoundException(`Không tìm thấy cấu hình BHXH năm ${nam}`);
            }
            return cauHinh;
        }, cache_service_1.CACHE_TTL.LONG);
    }
    async luuCauHinhBHXH(data) {
        const result = await this.prisma.cauHinhBHXH.upsert({
            where: { nam: data.nam },
            update: data,
            create: data,
        });
        await this.cacheService.del(cache_service_1.CACHE_KEYS.CAU_HINH_BHXH(data.nam));
        await this.cacheService.del(cache_service_1.CACHE_KEYS.CAU_HINH_BHXH_ALL);
        return result;
    }
    async khoiTaoCauHinhMacDinh() {
        await this.prisma.cauHinhBHXH.upsert({
            where: { nam: 2025 },
            update: {},
            create: {
                nam: 2025,
                tyLeBHXH_NV: 8,
                tyLeBHXH_DN: 17.5,
                tyLeBHYT_NV: 1.5,
                tyLeBHYT_DN: 3,
                tyLeBHTN_NV: 1,
                tyLeBHTN_DN: 1,
                luongCoBanToiThieu: 4680000,
                tranDongBHXH: 46800000,
                luongCoSo: 2340000,
            },
        });
        await this.prisma.cauHinhBHXH.upsert({
            where: { nam: 2026 },
            update: {},
            create: {
                nam: 2026,
                tyLeBHXH_NV: 8,
                tyLeBHXH_DN: 17.5,
                tyLeBHYT_NV: 1.5,
                tyLeBHYT_DN: 3,
                tyLeBHTN_NV: 1,
                tyLeBHTN_DN: 1,
                luongCoBanToiThieu: 4960000,
                tranDongBHXH: 49600000,
                luongCoSo: 2480000,
            },
        });
        const cauHinhThue2025 = await this.prisma.cauHinhThueTNCN.upsert({
            where: { nam: 2025 },
            update: {},
            create: {
                nam: 2025,
                giamTruBanThan: 11000000,
                giamTruPhuThuoc: 4400000,
            },
        });
        const bacThue = [
            { bac: 1, tuMuc: 0, denMuc: 5000000, thueSuat: 5, soTienTruNhanh: 0 },
            { bac: 2, tuMuc: 5000000, denMuc: 10000000, thueSuat: 10, soTienTruNhanh: 250000 },
            { bac: 3, tuMuc: 10000000, denMuc: 18000000, thueSuat: 15, soTienTruNhanh: 750000 },
            { bac: 4, tuMuc: 18000000, denMuc: 32000000, thueSuat: 20, soTienTruNhanh: 1650000 },
            { bac: 5, tuMuc: 32000000, denMuc: 52000000, thueSuat: 25, soTienTruNhanh: 3250000 },
            { bac: 6, tuMuc: 52000000, denMuc: 80000000, thueSuat: 30, soTienTruNhanh: 5850000 },
            { bac: 7, tuMuc: 80000000, denMuc: null, thueSuat: 35, soTienTruNhanh: 9850000 },
        ];
        for (const bt of bacThue) {
            await this.prisma.bacThueTNCN.upsert({
                where: {
                    cauHinhThueId_bac: {
                        cauHinhThueId: cauHinhThue2025.id,
                        bac: bt.bac,
                    },
                },
                update: bt,
                create: {
                    cauHinhThueId: cauHinhThue2025.id,
                    ...bt,
                },
            });
        }
        const cauHinhThue2026 = await this.prisma.cauHinhThueTNCN.upsert({
            where: { nam: 2026 },
            update: {},
            create: {
                nam: 2026,
                giamTruBanThan: 11000000,
                giamTruPhuThuoc: 4400000,
            },
        });
        for (const bt of bacThue) {
            await this.prisma.bacThueTNCN.upsert({
                where: {
                    cauHinhThueId_bac: {
                        cauHinhThueId: cauHinhThue2026.id,
                        bac: bt.bac,
                    },
                },
                update: bt,
                create: {
                    cauHinhThueId: cauHinhThue2026.id,
                    ...bt,
                },
            });
        }
        return { message: 'Đã khởi tạo cấu hình BHXH/Thuế mặc định' };
    }
    async layNguoiPhuThuoc(nhanVienId) {
        return this.prisma.nguoiPhuThuoc.findMany({
            where: { nhanVienId, trangThai: true },
            orderBy: { ngayTao: 'asc' },
        });
    }
    async themNguoiPhuThuoc(data) {
        return this.prisma.nguoiPhuThuoc.create({
            data,
        });
    }
    async capNhatNguoiPhuThuoc(id, data) {
        return this.prisma.nguoiPhuThuoc.update({
            where: { id },
            data,
        });
    }
    async demNguoiPhuThuocHopLe(nhanVienId, thang, nam) {
        const ngayDauThang = new Date(nam, thang - 1, 1);
        const ngayCuoiThang = new Date(nam, thang, 0);
        const count = await this.prisma.nguoiPhuThuoc.count({
            where: {
                nhanVienId,
                trangThai: true,
                tuNgay: { lte: ngayCuoiThang },
                OR: [
                    { denNgay: null },
                    { denNgay: { gte: ngayDauThang } },
                ],
            },
        });
        return count;
    }
    async tinhBHXH(luongDongBHXH, nam) {
        const cauHinh = await this.layCauHinhBHXH(nam);
        const luongTinhBH = Math.min(luongDongBHXH, Number(cauHinh.tranDongBHXH));
        const bhxhNV = Math.round(luongTinhBH * Number(cauHinh.tyLeBHXH_NV) / 100);
        const bhytNV = Math.round(luongTinhBH * Number(cauHinh.tyLeBHYT_NV) / 100);
        const bhtnNV = Math.round(luongTinhBH * Number(cauHinh.tyLeBHTN_NV) / 100);
        const tongBHNV = bhxhNV + bhytNV + bhtnNV;
        const bhxhDN = Math.round(luongTinhBH * Number(cauHinh.tyLeBHXH_DN) / 100);
        const bhytDN = Math.round(luongTinhBH * Number(cauHinh.tyLeBHYT_DN) / 100);
        const bhtnDN = Math.round(luongTinhBH * Number(cauHinh.tyLeBHTN_DN) / 100);
        const tongBHDN = bhxhDN + bhytDN + bhtnDN;
        return {
            luongDongBHXH: luongTinhBH,
            bhxhNV,
            bhytNV,
            bhtnNV,
            tongBHNV,
            bhxhDN,
            bhytDN,
            bhtnDN,
            tongBHDN,
        };
    }
    async layCauHinhThue(nam) {
        const cacheKey = cache_service_1.CACHE_KEYS.CAU_HINH_THUE(nam);
        return this.cacheService.getOrSet(cacheKey, async () => {
            const cauHinh = await this.prisma.cauHinhThueTNCN.findUnique({
                where: { nam },
                include: {
                    bacThue: {
                        orderBy: { bac: 'asc' },
                    },
                },
            });
            if (!cauHinh) {
                throw new common_1.NotFoundException(`Không tìm thấy cấu hình thuế TNCN năm ${nam}`);
            }
            return cauHinh;
        }, cache_service_1.CACHE_TTL.LONG);
    }
    async luuCauHinhThue(data) {
        const result = await this.prisma.cauHinhThueTNCN.upsert({
            where: { nam: data.nam },
            update: data,
            create: data,
        });
        await this.cacheService.del(cache_service_1.CACHE_KEYS.CAU_HINH_THUE(data.nam));
        await this.cacheService.del(cache_service_1.CACHE_KEYS.CAU_HINH_THUE_ALL);
        await this.cacheService.del(cache_service_1.CACHE_KEYS.BAC_THUE(data.nam));
        return result;
    }
    async tinhThueTNCN(thuNhapChiuThue, giamTruBHXH, soPhuThuoc, nam) {
        const cauHinh = await this.layCauHinhThue(nam);
        const giamTruBanThan = Number(cauHinh.giamTruBanThan);
        const giamTruPhuThuoc = soPhuThuoc * Number(cauHinh.giamTruPhuThuoc);
        let thuNhapTinhThue = thuNhapChiuThue - giamTruBanThan - giamTruPhuThuoc - giamTruBHXH;
        thuNhapTinhThue = Math.max(0, thuNhapTinhThue);
        let thueTNCN = 0;
        let bacThueApDung = null;
        if (thuNhapTinhThue > 0 && cauHinh.bacThue.length > 0) {
            for (const bac of cauHinh.bacThue) {
                const denMuc = bac.denMuc ? Number(bac.denMuc) : Infinity;
                if (thuNhapTinhThue <= denMuc) {
                    thueTNCN = Math.round(thuNhapTinhThue * Number(bac.thueSuat) / 100 - Number(bac.soTienTruNhanh));
                    bacThueApDung = bac.bac;
                    break;
                }
            }
        }
        thueTNCN = Math.max(0, thueTNCN);
        return {
            thuNhapChiuThue,
            giamTruBanThan,
            soPhuThuoc,
            giamTruPhuThuoc,
            giamTruBHXH,
            thuNhapTinhThue,
            thueTNCN,
            bacThueApDung,
        };
    }
    async tinhChoToBoNhanVien(bangLuongId) {
        const bangLuong = await this.prisma.bangLuong.findUnique({
            where: { id: bangLuongId },
            include: {
                chiTiets: {
                    include: {
                        nhanVien: true,
                        khoanLuong: true,
                    },
                },
            },
        });
        if (!bangLuong) {
            throw new common_1.NotFoundException(`Không tìm thấy bảng lương với ID: ${bangLuongId}`);
        }
        const chiTietTheoNV = new Map();
        for (const ct of bangLuong.chiTiets) {
            if (!chiTietTheoNV.has(ct.nhanVienId)) {
                chiTietTheoNV.set(ct.nhanVienId, []);
            }
            chiTietTheoNV.get(ct.nhanVienId).push(ct);
        }
        const ketQua = [];
        let khoanBHXH = await this.prisma.khoanLuong.findUnique({
            where: { maKhoan: 'BHXH_NV' },
        });
        if (!khoanBHXH) {
            khoanBHXH = await this.prisma.khoanLuong.create({
                data: {
                    maKhoan: 'BHXH_NV',
                    tenKhoan: 'BHXH/BHYT/BHTN (NV đóng)',
                    loai: 'KHAU_TRU',
                    chiuThue: false,
                    thuTu: 100,
                },
            });
        }
        let khoanThue = await this.prisma.khoanLuong.findUnique({
            where: { maKhoan: 'THUE_TNCN' },
        });
        if (!khoanThue) {
            khoanThue = await this.prisma.khoanLuong.create({
                data: {
                    maKhoan: 'THUE_TNCN',
                    tenKhoan: 'Thuế TNCN',
                    loai: 'KHAU_TRU',
                    chiuThue: false,
                    thuTu: 101,
                },
            });
        }
        for (const [nhanVienId, chiTiets] of chiTietTheoNV) {
            const nhanVien = chiTiets[0].nhanVien;
            let tongThuNhap = 0;
            let luongDongBHXH = 0;
            for (const ct of chiTiets) {
                const soTien = Number(ct.soTien);
                if (ct.khoanLuong.loai === 'THU_NHAP') {
                    tongThuNhap += soTien;
                    if (ct.khoanLuong.maKhoan === 'LUONG_CO_BAN') {
                        luongDongBHXH = soTien;
                    }
                }
            }
            if (luongDongBHXH === 0) {
                luongDongBHXH = Number(nhanVien.luongCoBan);
            }
            const bhxh = await this.tinhBHXH(luongDongBHXH, bangLuong.nam);
            const soPhuThuoc = await this.demNguoiPhuThuocHopLe(nhanVienId, bangLuong.thang, bangLuong.nam);
            const thue = await this.tinhThueTNCN(tongThuNhap, bhxh.tongBHNV, soPhuThuoc, bangLuong.nam);
            await this.prisma.bangTinhBHXH.upsert({
                where: {
                    bangLuongId_nhanVienId: {
                        bangLuongId,
                        nhanVienId,
                    },
                },
                update: {
                    luongDongBHXH: bhxh.luongDongBHXH,
                    bhxhNV: bhxh.bhxhNV,
                    bhytNV: bhxh.bhytNV,
                    bhtnNV: bhxh.bhtnNV,
                    tongBHNV: bhxh.tongBHNV,
                    bhxhDN: bhxh.bhxhDN,
                    bhytDN: bhxh.bhytDN,
                    bhtnDN: bhxh.bhtnDN,
                    tongBHDN: bhxh.tongBHDN,
                },
                create: {
                    bangLuongId,
                    nhanVienId,
                    luongDongBHXH: bhxh.luongDongBHXH,
                    bhxhNV: bhxh.bhxhNV,
                    bhytNV: bhxh.bhytNV,
                    bhtnNV: bhxh.bhtnNV,
                    tongBHNV: bhxh.tongBHNV,
                    bhxhDN: bhxh.bhxhDN,
                    bhytDN: bhxh.bhytDN,
                    bhtnDN: bhxh.bhtnDN,
                    tongBHDN: bhxh.tongBHDN,
                },
            });
            await this.prisma.bangTinhThue.upsert({
                where: {
                    bangLuongId_nhanVienId: {
                        bangLuongId,
                        nhanVienId,
                    },
                },
                update: {
                    thuNhapChiuThue: thue.thuNhapChiuThue,
                    giamTruBanThan: thue.giamTruBanThan,
                    soPhuThuoc: thue.soPhuThuoc,
                    giamTruPhuThuoc: thue.giamTruPhuThuoc,
                    giamTruBHXH: thue.giamTruBHXH,
                    thuNhapTinhThue: thue.thuNhapTinhThue,
                    thueTNCN: thue.thueTNCN,
                    bacThueApDung: thue.bacThueApDung,
                },
                create: {
                    bangLuongId,
                    nhanVienId,
                    thuNhapChiuThue: thue.thuNhapChiuThue,
                    giamTruBanThan: thue.giamTruBanThan,
                    soPhuThuoc: thue.soPhuThuoc,
                    giamTruPhuThuoc: thue.giamTruPhuThuoc,
                    giamTruBHXH: thue.giamTruBHXH,
                    thuNhapTinhThue: thue.thuNhapTinhThue,
                    thueTNCN: thue.thueTNCN,
                    bacThueApDung: thue.bacThueApDung,
                },
            });
            if (bhxh.tongBHNV > 0) {
                await this.prisma.chiTietBangLuong.upsert({
                    where: {
                        bangLuongId_nhanVienId_khoanLuongId: {
                            bangLuongId,
                            nhanVienId,
                            khoanLuongId: khoanBHXH.id,
                        },
                    },
                    update: { soTien: bhxh.tongBHNV },
                    create: {
                        bangLuongId,
                        nhanVienId,
                        khoanLuongId: khoanBHXH.id,
                        soTien: bhxh.tongBHNV,
                        nguon: 'NHAP_TAY',
                    },
                });
            }
            if (thue.thueTNCN > 0) {
                await this.prisma.chiTietBangLuong.upsert({
                    where: {
                        bangLuongId_nhanVienId_khoanLuongId: {
                            bangLuongId,
                            nhanVienId,
                            khoanLuongId: khoanThue.id,
                        },
                    },
                    update: { soTien: thue.thueTNCN },
                    create: {
                        bangLuongId,
                        nhanVienId,
                        khoanLuongId: khoanThue.id,
                        soTien: thue.thueTNCN,
                        nguon: 'NHAP_TAY',
                    },
                });
            }
            ketQua.push({
                nhanVienId,
                hoTen: nhanVien.hoTen,
                bhxh,
                thue,
            });
        }
        return ketQua;
    }
    async layKetQuaTinh(bangLuongId) {
        const [bhxhList, thueList] = await Promise.all([
            this.prisma.bangTinhBHXH.findMany({
                where: { bangLuongId },
            }),
            this.prisma.bangTinhThue.findMany({
                where: { bangLuongId },
            }),
        ]);
        return {
            bhxh: bhxhList,
            thue: thueList,
        };
    }
};
exports.BHXHThueService = BHXHThueService;
exports.BHXHThueService = BHXHThueService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        cache_service_1.CacheService])
], BHXHThueService);
//# sourceMappingURL=bhxh-thue.service.js.map