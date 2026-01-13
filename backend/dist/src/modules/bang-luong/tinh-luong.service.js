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
exports.TinhLuongService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const cham_cong_service_1 = require("../cham-cong/cham-cong.service");
let TinhLuongService = class TinhLuongService {
    constructor(prisma, chamCongService) {
        this.prisma = prisma;
        this.chamCongService = chamCongService;
    }
    async tinhTongLuongNhanVien(bangLuongId, nhanVienId) {
        const chiTietLuong = await this.prisma.chiTietBangLuong.findMany({
            where: {
                bangLuongId,
                nhanVienId,
            },
            include: {
                khoanLuong: true,
            },
        });
        let tongThuNhap = 0;
        let tongKhauTru = 0;
        for (const ct of chiTietLuong) {
            const soTien = Number(ct.soTien);
            if (ct.khoanLuong.loai === 'THU_NHAP') {
                tongThuNhap += soTien;
            }
            else {
                tongKhauTru += soTien;
            }
        }
        return {
            tongThuNhap,
            tongKhauTru,
            thucLinh: tongThuNhap - tongKhauTru,
        };
    }
    async layBangLuongChiTiet(bangLuongId) {
        const bangLuong = await this.prisma.bangLuong.findUnique({
            where: { id: bangLuongId },
            include: {
                phongBan: true,
                chiTiets: {
                    include: {
                        nhanVien: {
                            include: {
                                phongBan: true,
                            },
                        },
                        khoanLuong: true,
                    },
                },
            },
        });
        if (!bangLuong) {
            throw new Error(`Không tìm thấy bảng lương với ID: ${bangLuongId}`);
        }
        const danhSachKhoanLuong = await this.prisma.khoanLuong.findMany({
            where: { trangThai: true },
            orderBy: { thuTu: 'asc' },
        });
        const ngayCongLyThuyet = this.chamCongService.tinhSoNgayCongLyThuyet(bangLuong.thang, bangLuong.nam);
        const chiTietTheoNhanVien = new Map();
        const nhanViens = await this.prisma.nhanVien.findMany({
            where: {
                phongBanId: bangLuong.phongBanId,
                trangThai: 'DANG_LAM',
            },
            include: {
                phongBan: true,
            },
            orderBy: { hoTen: 'asc' },
        });
        const chamCongMap = new Map();
        for (const nv of nhanViens) {
            try {
                const cc = await this.chamCongService.layChamCongNhanVien(nv.id, bangLuong.thang, bangLuong.nam);
                if (cc) {
                    const ngayCongThucTe = Number(cc.soCongThucTe || 0) + Number(cc.soNgayNghiPhep || 0);
                    chamCongMap.set(nv.id, ngayCongThucTe);
                }
                else {
                    chamCongMap.set(nv.id, ngayCongLyThuyet);
                }
            }
            catch {
                chamCongMap.set(nv.id, ngayCongLyThuyet);
            }
        }
        for (const nv of nhanViens) {
            const ngayCongThucTe = chamCongMap.get(nv.id) || ngayCongLyThuyet;
            chiTietTheoNhanVien.set(nv.id, {
                nhanVienId: nv.id,
                maNhanVien: nv.maNhanVien,
                hoTen: nv.hoTen,
                chucVu: nv.chucVu,
                phongBan: nv.phongBan.tenPhongBan,
                ngayCongThucTe,
                cacKhoanLuong: [],
                tongThuNhap: 0,
                tongKhauTru: 0,
                thucLinh: 0,
            });
        }
        for (const ct of bangLuong.chiTiets) {
            const nhanVienData = chiTietTheoNhanVien.get(ct.nhanVienId);
            if (nhanVienData) {
                const soTien = Number(ct.soTien);
                nhanVienData.cacKhoanLuong.push({
                    khoanLuongId: ct.khoanLuongId,
                    maKhoan: ct.khoanLuong.maKhoan,
                    tenKhoan: ct.khoanLuong.tenKhoan,
                    loai: ct.khoanLuong.loai,
                    soTien,
                });
                if (ct.khoanLuong.loai === 'THU_NHAP') {
                    nhanVienData.tongThuNhap += soTien;
                }
                else {
                    nhanVienData.tongKhauTru += soTien;
                }
            }
        }
        const danhSachNhanVien = [];
        let tongCongThuNhap = 0;
        let tongCongKhauTru = 0;
        for (const nv of chiTietTheoNhanVien.values()) {
            nv.thucLinh = nv.tongThuNhap - nv.tongKhauTru;
            danhSachNhanVien.push(nv);
            tongCongThuNhap += nv.tongThuNhap;
            tongCongKhauTru += nv.tongKhauTru;
        }
        return {
            bangLuongId: bangLuong.id,
            thang: bangLuong.thang,
            nam: bangLuong.nam,
            ngayCongLyThuyet,
            phongBan: {
                id: bangLuong.phongBan.id,
                maPhongBan: bangLuong.phongBan.maPhongBan,
                tenPhongBan: bangLuong.phongBan.tenPhongBan,
            },
            trangThai: bangLuong.trangThai,
            danhSachKhoanLuong: danhSachKhoanLuong.map((kl) => ({
                id: kl.id,
                maKhoan: kl.maKhoan,
                tenKhoan: kl.tenKhoan,
                loai: kl.loai,
            })),
            danhSachNhanVien,
            tongCong: {
                tongThuNhap: tongCongThuNhap,
                tongKhauTru: tongCongKhauTru,
                thucLinh: tongCongThuNhap - tongCongKhauTru,
            },
        };
    }
    async tinhTongBangLuong(bangLuongId) {
        const chiTietLuong = await this.prisma.chiTietBangLuong.findMany({
            where: { bangLuongId },
            include: {
                khoanLuong: true,
            },
        });
        const nhanVienIds = new Set();
        let tongThuNhap = 0;
        let tongKhauTru = 0;
        for (const ct of chiTietLuong) {
            nhanVienIds.add(ct.nhanVienId);
            const soTien = Number(ct.soTien);
            if (ct.khoanLuong.loai === 'THU_NHAP') {
                tongThuNhap += soTien;
            }
            else {
                tongKhauTru += soTien;
            }
        }
        return {
            tongThuNhap,
            tongKhauTru,
            thucLinh: tongThuNhap - tongKhauTru,
            soNhanVien: nhanVienIds.size,
        };
    }
    async soSanhVoiExcel(bangLuongId, tongExcel) {
        const tongHeThong = await this.tinhTongBangLuong(bangLuongId);
        return {
            khop: tongHeThong.thucLinh === tongExcel,
            tongHeThong: tongHeThong.thucLinh,
            tongExcel,
            chenhLech: tongHeThong.thucLinh - tongExcel,
        };
    }
};
exports.TinhLuongService = TinhLuongService;
exports.TinhLuongService = TinhLuongService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        cham_cong_service_1.ChamCongService])
], TinhLuongService);
//# sourceMappingURL=tinh-luong.service.js.map