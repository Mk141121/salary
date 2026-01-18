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
var UngLuongCalculatorService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UngLuongCalculatorService = exports.CAU_HINH_MAC_DINH = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
exports.CAU_HINH_MAC_DINH = {
    chuyen_can: {
        so_ngay_nghi_toi_da: 2,
        cam_neu_nghi_khong_phep: true,
    },
    ung_luong: {
        ti_le_toi_da: 0.7,
        lam_tron: 10000,
    },
};
let UngLuongCalculatorService = UngLuongCalculatorService_1 = class UngLuongCalculatorService {
    constructor(prisma) {
        this.prisma = prisma;
        this.logger = new common_1.Logger(UngLuongCalculatorService_1.name);
    }
    async layLuongCoBanHieuLuc(nhanVienId, ngay) {
        const hopDong = await this.prisma.nhanVienHopDong.findFirst({
            where: {
                nhanVienId,
                trangThai: 'HIEU_LUC',
                tuNgay: { lte: ngay },
                OR: [{ denNgay: null }, { denNgay: { gte: ngay } }],
            },
            orderBy: { tuNgay: 'desc' },
        });
        if (hopDong) {
            return Number(hopDong.luongCoBan);
        }
        const nhanVien = await this.prisma.nhanVien.findUnique({
            where: { id: nhanVienId },
        });
        return Number(nhanVien?.luongCoBan || 0);
    }
    async tinhSanLuongChiaHang(nhanVienId, tuNgay, denNgay) {
        const sanLuongs = await this.prisma.sanLuongChiaHang.findMany({
            where: {
                nhanVienId,
                ngay: { gte: tuNgay, lte: denNgay },
            },
        });
        const tongSpDat = sanLuongs.reduce((sum, sl) => sum + sl.soLuongSpDat, 0);
        const tongSpLoi = sanLuongs.reduce((sum, sl) => sum + sl.soLuongSpLoi, 0);
        const donGia = await this.prisma.cauHinhDonGia.findFirst({
            where: { maBien: 'DON_GIA_SP', trangThai: true },
        });
        const heSoLoi = await this.prisma.cauHinhDonGia.findFirst({
            where: { maBien: 'HE_SO_LOI_SP', trangThai: true },
        });
        const giaTriDonGia = donGia ? Number(donGia.giaTri) : 1000;
        const giaTriHeSoLoi = heSoLoi ? Number(heSoLoi.giaTri) : 0.5;
        const soTien = tongSpDat * giaTriDonGia - tongSpLoi * giaTriDonGia * giaTriHeSoLoi;
        return { tongSpDat, tongSpLoi, soTien: Math.max(0, soTien) };
    }
    async tinhGiaoHang(nhanVienId, tuNgay, denNgay) {
        const giaoHangs = await this.prisma.giaoHang.findMany({
            where: {
                nhanVienId,
                ngay: { gte: tuNgay, lte: denNgay },
            },
        });
        const tongKhoiLuong = giaoHangs.reduce((sum, gh) => sum + Number(gh.khoiLuongThanhCong), 0);
        const tongLanTreGio = giaoHangs.reduce((sum, gh) => sum + gh.soLanTreGio, 0);
        const donGia = await this.prisma.cauHinhDonGia.findFirst({
            where: { maBien: 'DON_GIA_KHOI_LUONG', trangThai: true },
        });
        const phatTre = await this.prisma.cauHinhDonGia.findFirst({
            where: { maBien: 'DON_GIA_PHAT_TRE', trangThai: true },
        });
        const giaTriDonGia = donGia ? Number(donGia.giaTri) : 5000;
        const giaTriPhatTre = phatTre ? Number(phatTre.giaTri) : 50000;
        const soTien = tongKhoiLuong * giaTriDonGia - tongLanTreGio * giaTriPhatTre;
        return { tongKhoiLuong, tongLanTreGio, soTien: Math.max(0, soTien) };
    }
    async tinhPhatChamCong(nhanVienId, thang, nam) {
        const chamCong = await this.prisma.chamCong.findFirst({
            where: { nhanVienId, thang, nam },
        });
        if (!chamCong)
            return 0;
        const cauHinhPhat = await this.prisma.cauHinhPhatChamCong.findFirst({
            where: { nam },
        });
        if (!cauHinhPhat)
            return 0;
        let tongPhat = 0;
        const lanDiMuon = chamCong.soLanDiMuon;
        if (lanDiMuon >= 1 && lanDiMuon <= 3) {
            tongPhat += Number(cauHinhPhat.phatDiMuon1_3Lan);
        }
        else if (lanDiMuon >= 4 && lanDiMuon <= 6) {
            tongPhat += Number(cauHinhPhat.phatDiMuon4_6Lan);
        }
        else if (lanDiMuon > 6) {
            tongPhat += Number(cauHinhPhat.phatDiMuonTren6Lan);
        }
        const lanVeSom = chamCong.soLanVeSom;
        if (lanVeSom >= 1 && lanVeSom <= 3) {
            tongPhat += Number(cauHinhPhat.phatVeSom1_3Lan);
        }
        else if (lanVeSom >= 4 && lanVeSom <= 6) {
            tongPhat += Number(cauHinhPhat.phatVeSom4_6Lan);
        }
        else if (lanVeSom > 6) {
            tongPhat += Number(cauHinhPhat.phatVeSomTren6Lan);
        }
        return tongPhat;
    }
    tinhNgayLamViecTheoLich(tuNgay, denNgay) {
        let soNgay = 0;
        const currentDate = new Date(tuNgay);
        while (currentDate <= denNgay) {
            const dayOfWeek = currentDate.getDay();
            if (dayOfWeek !== 0 && dayOfWeek !== 6) {
                soNgay += 1;
            }
            currentDate.setDate(currentDate.getDate() + 1);
        }
        return soNgay;
    }
    tinhSoCongChuanTheoLich(thang, nam) {
        const tuNgay = new Date(nam, thang - 1, 1);
        const denNgay = new Date(nam, thang, 0);
        return this.tinhNgayLamViecTheoLich(tuNgay, denNgay);
    }
    async tinhNgayCong(nhanVienId, tuNgay, denNgay) {
        const thang = tuNgay.getMonth() + 1;
        const nam = tuNgay.getFullYear();
        const chiTietChamCongs = await this.prisma.chiTietChamCong.findMany({
            where: {
                nhanVienId,
                ngay: { gte: tuNgay, lte: denNgay },
            },
        });
        const chamCong = await this.prisma.chamCong.findFirst({
            where: { nhanVienId, thang, nam },
        });
        const soCongChuan = chamCong
            ? Number(chamCong.soCongChuan)
            : this.tinhSoCongChuanTheoLich(thang, nam);
        if (chiTietChamCongs.length > 0) {
            let soNgayCong = 0;
            let soNgayNghi = 0;
            let soNgayNghiKhongPhep = 0;
            for (const cc of chiTietChamCongs) {
                switch (cc.trangThai) {
                    case 'DI_LAM':
                    case 'LAM_TU_XA':
                    case 'CONG_TAC':
                        soNgayCong += 1;
                        break;
                    case 'NGHI_PHEP':
                    case 'NGHI_LE':
                    case 'NGHI_BENH':
                        soNgayNghi += 1;
                        break;
                    case 'NGHI_KHONG_LUONG':
                        soNgayNghi += 1;
                        soNgayNghiKhongPhep += 1;
                        break;
                }
            }
            return { soNgayCong, soNgayNghi, soNgayNghiKhongPhep, soCongChuan, laTamTinh: false };
        }
        const ngayHienTai = new Date();
        const denNgayThucTe = denNgay > ngayHienTai ? ngayHienTai : denNgay;
        const soNgayCong = this.tinhNgayLamViecTheoLich(tuNgay, denNgayThucTe);
        this.logger.log(`[Tạm tính] NV ${nhanVienId}: ${soNgayCong} ngày công từ ${tuNgay.toISOString().split('T')[0]} đến ${denNgayThucTe.toISOString().split('T')[0]}`);
        return {
            soNgayCong,
            soNgayNghi: 0,
            soNgayNghiKhongPhep: 0,
            soCongChuan,
            laTamTinh: true,
        };
    }
    async tinhThuongPhat(nhanVienId, tuNgay, denNgay) {
        const suKiens = await this.prisma.suKienThuongPhat.findMany({
            where: {
                nhanVienId,
                ngay: { gte: tuNgay, lte: denNgay },
                trangThai: 'DA_DUYET',
            },
        });
        let thuong = 0;
        let phat = 0;
        for (const sk of suKiens) {
            if (sk.loaiSuKien === 'THUONG') {
                thuong += Number(sk.soTien);
            }
            else {
                phat += Number(sk.soTien);
            }
        }
        return { thuong, phat };
    }
    async tinhTienCongLuyKe(nhanVienId, tuNgay, denNgay) {
        const thang = tuNgay.getMonth() + 1;
        const nam = tuNgay.getFullYear();
        const luongCoBan = await this.layLuongCoBanHieuLuc(nhanVienId, denNgay);
        const ngayCong = await this.tinhNgayCong(nhanVienId, tuNgay, denNgay);
        const luongTheoNgayCong = ngayCong.soCongChuan > 0
            ? Math.round((luongCoBan * ngayCong.soNgayCong) / ngayCong.soCongChuan)
            : 0;
        const sanLuong = await this.tinhSanLuongChiaHang(nhanVienId, tuNgay, denNgay);
        const giaoHang = await this.tinhGiaoHang(nhanVienId, tuNgay, denNgay);
        const phatChamCong = await this.tinhPhatChamCong(nhanVienId, thang, nam);
        const thuongPhat = await this.tinhThuongPhat(nhanVienId, tuNgay, denNgay);
        const tienCongLuyKe = luongTheoNgayCong +
            sanLuong.soTien +
            giaoHang.soTien +
            thuongPhat.thuong -
            thuongPhat.phat -
            phatChamCong;
        return {
            tienCongLuyKe: Math.max(0, tienCongLuyKe),
            luongCoBan,
            luongTheoNgayCong,
            sanLuongChiaHang: sanLuong.soTien,
            giaoHang: giaoHang.soTien,
            phatChamCong,
            thuongPhat: thuongPhat.thuong - thuongPhat.phat,
            soNgayCong: ngayCong.soNgayCong,
            soNgayNghi: ngayCong.soNgayNghi,
            soNgayNghiKhongPhep: ngayCong.soNgayNghiKhongPhep,
            laTamTinh: ngayCong.laTamTinh,
            inputDataJson: {
                luongCoBan,
                ngayCong,
                sanLuong,
                giaoHang,
                phatChamCong,
                thuongPhat,
            },
        };
    }
    async kiemTraDieuKien(nhanVienId, tienCongLuyKe, soNgayNghi, soNgayNghiKhongPhep, cauHinhJson) {
        const cauHinh = { ...exports.CAU_HINH_MAC_DINH, ...cauHinhJson };
        const nhanVien = await this.prisma.nhanVien.findUnique({
            where: { id: nhanVienId },
        });
        const nhanVienKhongHoatDong = nhanVien?.trangThai !== 'DANG_LAM';
        const viPhamChuyenCan = soNgayNghi > cauHinh.chuyen_can.so_ngay_nghi_toi_da;
        const viPhamNghiKhongPhep = cauHinh.chuyen_can.cam_neu_nghi_khong_phep && soNgayNghiKhongPhep > 0;
        const duocPhepUng = !nhanVienKhongHoatDong && !viPhamChuyenCan && !viPhamNghiKhongPhep;
        let lyDoKhongDat = null;
        if (nhanVienKhongHoatDong) {
            lyDoKhongDat = 'KHONG_HOAT_DONG';
        }
        else if (viPhamNghiKhongPhep) {
            lyDoKhongDat = 'NGHI_KHONG_PHEP';
        }
        else if (viPhamChuyenCan) {
            lyDoKhongDat = 'NGHI_QUA_NHIEU';
        }
        let mucToiDaDuocUng = 0;
        if (duocPhepUng) {
            mucToiDaDuocUng = Math.floor(tienCongLuyKe * cauHinh.ung_luong.ti_le_toi_da);
            if (cauHinh.ung_luong.lam_tron > 0) {
                mucToiDaDuocUng =
                    Math.floor(mucToiDaDuocUng / cauHinh.ung_luong.lam_tron) *
                        cauHinh.ung_luong.lam_tron;
            }
        }
        return {
            duocPhepUng,
            lyDoKhongDat,
            mucToiDaDuocUng,
            chiTiet: {
                viPhamChuyenCan,
                viPhamNghiKhongPhep,
                nhanVienKhongHoatDong,
            },
        };
    }
    async tinhToanDayDu(nhanVienId, tuNgay, denNgay, cauHinhJson) {
        const luyKe = await this.tinhTienCongLuyKe(nhanVienId, tuNgay, denNgay);
        const dieuKien = await this.kiemTraDieuKien(nhanVienId, luyKe.tienCongLuyKe, luyKe.soNgayNghi, luyKe.soNgayNghiKhongPhep, cauHinhJson);
        return { luyKe, dieuKien };
    }
};
exports.UngLuongCalculatorService = UngLuongCalculatorService;
exports.UngLuongCalculatorService = UngLuongCalculatorService = UngLuongCalculatorService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UngLuongCalculatorService);
//# sourceMappingURL=ung-luong-calculator.service.js.map