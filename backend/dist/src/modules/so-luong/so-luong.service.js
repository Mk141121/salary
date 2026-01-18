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
var SoLuongService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SoLuongService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let SoLuongService = SoLuongService_1 = class SoLuongService {
    constructor(prisma) {
        this.prisma = prisma;
        this.logger = new common_1.Logger(SoLuongService_1.name);
    }
    async laySoLuongNhanVien(nhanVienId, dto) {
        const nhanVien = await this.prisma.nhanVien.findUnique({
            where: { id: nhanVienId },
            include: { phongBan: true },
        });
        if (!nhanVien) {
            throw new common_1.NotFoundException(`Khong tim thay nhan vien voi ID: ${nhanVienId}`);
        }
        const tuNgay = dto.tuNgay ? new Date(dto.tuNgay) : new Date(new Date().getFullYear(), 0, 1);
        const denNgay = dto.denNgay ? new Date(dto.denNgay) : new Date();
        const tuThang = tuNgay.getMonth() + 1;
        const tuNam = tuNgay.getFullYear();
        const denThangVal = denNgay.getMonth() + 1;
        const denNamVal = denNgay.getFullYear();
        const bangLuongs = await this.layBangLuongs(nhanVienId, tuThang, tuNam, denThangVal, denNamVal);
        const dieuChinhs = await this.layDieuChinhs(nhanVienId, tuNgay, denNgay);
        const ungLuongs = await this.layUngLuongs(nhanVienId, tuNgay, denNgay);
        const kpis = await this.layKPIs(nhanVienId, tuThang, tuNam, denThangVal, denNamVal);
        const thuongPhats = await this.layThuongPhats(nhanVienId, tuNgay, denNgay);
        const tongKet = this.tinhTongKetNV(bangLuongs, dieuChinhs, ungLuongs, kpis, thuongPhats);
        return {
            nhanVien: {
                id: nhanVien.id,
                maNhanVien: nhanVien.maNhanVien,
                hoTen: nhanVien.hoTen,
                phongBan: nhanVien.phongBan ? { tenPhongBan: nhanVien.phongBan.tenPhongBan } : undefined,
            },
            bangLuongs,
            dieuChinhs,
            ungLuongs,
            kpis,
            thuongPhats,
            tongKet,
        };
    }
    async layBangLuongs(nhanVienId, tuThang, tuNam, denThang, denNam) {
        const orConditions = this.buildMonthRangeCondition(tuThang, tuNam, denThang, denNam);
        const bangLuongs = await this.prisma.bangLuong.findMany({
            where: {
                trangThai: 'DA_CHOT',
                OR: orConditions,
            },
            select: { id: true, thang: true, nam: true, ngayChot: true },
            orderBy: [{ nam: 'desc' }, { thang: 'desc' }],
        });
        const result = [];
        for (const bl of bangLuongs) {
            const snapshots = await this.prisma.snapshotBangLuong.findMany({
                where: {
                    bangLuongId: bl.id,
                    nhanVienId,
                },
            });
            if (snapshots.length === 0)
                continue;
            let luongCoBan = 0;
            let phuCapTong = 0;
            let thuongKPI = 0;
            let thuongThuNhap = 0;
            let khauTruTong = 0;
            let bhxh = 0;
            let bhyt = 0;
            let bhtn = 0;
            let thueTNCN = 0;
            for (const ss of snapshots) {
                const soTien = Number(ss.soTien);
                const tenKhoan = ss.tenKhoan.toLowerCase();
                if (ss.loaiKhoan === 'THU_NHAP') {
                    if (tenKhoan.includes('luong co ban') || tenKhoan.includes('lương cơ bản')) {
                        luongCoBan += soTien;
                    }
                    else if (tenKhoan.includes('thuong kpi') || tenKhoan.includes('thưởng kpi')) {
                        thuongKPI += soTien;
                    }
                    else if (tenKhoan.includes('thuong') || tenKhoan.includes('thưởng')) {
                        thuongThuNhap += soTien;
                    }
                    else {
                        phuCapTong += soTien;
                    }
                }
                else if (ss.loaiKhoan === 'KHAU_TRU') {
                    if (tenKhoan.includes('bhxh')) {
                        bhxh += soTien;
                    }
                    else if (tenKhoan.includes('bhyt')) {
                        bhyt += soTien;
                    }
                    else if (tenKhoan.includes('bhtn')) {
                        bhtn += soTien;
                    }
                    else if (tenKhoan.includes('thue') || tenKhoan.includes('thuế') || tenKhoan.includes('tncn')) {
                        thueTNCN += soTien;
                    }
                    else {
                        khauTruTong += soTien;
                    }
                }
            }
            const ngayCong = 26;
            const thucLanh = luongCoBan + phuCapTong + thuongKPI + thuongThuNhap
                - khauTruTong - bhxh - bhyt - bhtn - thueTNCN;
            result.push({
                bangLuongId: bl.id,
                thangNam: `T${bl.thang}/${bl.nam}`,
                thang: bl.thang,
                nam: bl.nam,
                luongCoBan,
                phuCapTong,
                thuongKPI,
                thuongThuNhap,
                khauTruTong,
                ungLuong: 0,
                bhxh,
                bhyt,
                bhtn,
                thueTNCN,
                thucLanh,
                ngayCong,
                nghiCoPhep: 0,
                nghiKhongPhep: 0,
                chotNgay: bl.ngayChot?.toISOString(),
            });
        }
        return result;
    }
    async layDieuChinhs(nhanVienId, tuNgay, denNgay) {
        const phieuDCs = await this.prisma.phieuDieuChinh.findMany({
            where: {
                nhanVienId,
                trangThai: 'DA_DUYET',
                ngayDuyet: { gte: tuNgay, lte: denNgay },
            },
            include: {
                chiTiets: {
                    include: { khoanLuong: true },
                },
            },
            orderBy: { ngayDuyet: 'desc' },
        });
        const result = [];
        for (const pdc of phieuDCs) {
            for (const ct of pdc.chiTiets) {
                result.push({
                    phieuDieuChinhId: pdc.id,
                    ngayTao: pdc.ngayTao.toISOString(),
                    loaiPhieu: pdc.loaiDieuChinh,
                    tenKhoanLuong: ct.khoanLuong.tenKhoan,
                    loaiKhoan: pdc.loaiDieuChinh === 'TANG' ? 'CONG_THEM' : 'TRU_BOT',
                    soTien: Number(ct.chenhLech),
                    ghiChu: pdc.lyDo,
                });
            }
        }
        return result;
    }
    async layUngLuongs(nhanVienId, tuNgay, denNgay) {
        const snapshotUngs = await this.prisma.snapshotChiTietBangUngLuong.findMany({
            where: {
                nhanVienId,
                ngayTao: { gte: tuNgay, lte: denNgay },
                soTienUngDuyet: { gt: 0 },
            },
            include: {
                snapshot: {
                    include: { bangUngLuong: true },
                },
            },
            orderBy: { ngayTao: 'desc' },
        });
        return snapshotUngs.map((su) => ({
            bangUngLuongId: su.snapshot.bangUngLuongId,
            maBang: su.snapshot.bangUngLuong.maBangUngLuong,
            thangNam: su.snapshot.thangNam,
            soTienDuyet: Number(su.soTienUngDuyet),
            trangThai: su.snapshot.bangUngLuong.trangThai,
            ngayChot: su.snapshot.ngayChot.toISOString(),
        }));
    }
    async layKPIs(nhanVienId, tuThang, tuNam, denThang, denNam) {
        const orConditions = this.buildMonthRangeCondition(tuThang, tuNam, denThang, denNam);
        const kpiDanhGias = await this.prisma.danhGiaKPINhanVien.findMany({
            where: {
                nhanVienId,
                trangThai: 'DA_DUYET',
                soTienThuong: { gt: 0 },
                kyDanhGia: { OR: orConditions },
            },
            include: { kyDanhGia: true },
            orderBy: { ngayDuyet: 'desc' },
        });
        return kpiDanhGias.map((kpi) => ({
            kyDanhGiaId: kpi.kyDanhGiaId,
            thang: kpi.kyDanhGia.thang || 0,
            nam: kpi.kyDanhGia.nam,
            tongDiem: Number(kpi.diemTongKet || 0),
            xepLoai: kpi.xepLoai || 'D',
            tienThuong: Number(kpi.soTienThuong),
        }));
    }
    async layThuongPhats(nhanVienId, tuNgay, denNgay) {
        const suKiens = await this.prisma.suKienThuongPhat.findMany({
            where: {
                nhanVienId,
                trangThai: 'DA_DUYET',
                duyetLuc: { gte: tuNgay, lte: denNgay },
            },
            orderBy: { duyetLuc: 'desc' },
        });
        return suKiens.map((sk) => ({
            suKienId: sk.id,
            loai: sk.loaiSuKien,
            ten: sk.maSuKien,
            soTien: Number(sk.soTien),
            ngay: sk.duyetLuc.toISOString(),
            lyDo: sk.ghiChu || undefined,
        }));
    }
    tinhTongKetNV(bangLuongs, dieuChinhs, ungLuongs, kpis, thuongPhats) {
        let tongLuong = 0;
        let tongThuong = 0;
        let tongPhat = 0;
        let tongKhauTru = 0;
        let tongUng = 0;
        for (const bl of bangLuongs) {
            tongLuong += bl.luongCoBan + bl.phuCapTong;
            tongThuong += bl.thuongKPI + bl.thuongThuNhap;
            tongKhauTru += bl.khauTruTong + bl.bhxh + bl.bhyt + bl.bhtn + bl.thueTNCN;
        }
        for (const dc of dieuChinhs) {
            if (dc.loaiKhoan === 'CONG_THEM') {
                tongLuong += dc.soTien;
            }
            else {
                tongKhauTru += dc.soTien;
            }
        }
        for (const ul of ungLuongs) {
            tongUng += ul.soTienDuyet;
        }
        for (const kpi of kpis) {
            tongThuong += kpi.tienThuong;
        }
        for (const tp of thuongPhats) {
            if (tp.loai === 'THUONG') {
                tongThuong += tp.soTien;
            }
            else {
                tongPhat += tp.soTien;
            }
        }
        const tongThucNhan = tongLuong + tongThuong - tongPhat - tongKhauTru;
        return {
            tongLuong,
            tongThuong,
            tongPhat,
            tongKhauTru,
            tongUng,
            tongThucNhan,
        };
    }
    buildMonthRangeCondition(tuThang, tuNam, denThang, denNam) {
        if (tuNam === denNam) {
            return [{ nam: tuNam, thang: { gte: tuThang, lte: denThang } }];
        }
        else if (denNam - tuNam === 1) {
            return [
                { nam: tuNam, thang: { gte: tuThang } },
                { nam: denNam, thang: { lte: denThang } },
            ];
        }
        else {
            return [
                { nam: tuNam, thang: { gte: tuThang } },
                { nam: { gt: tuNam, lt: denNam } },
                { nam: denNam, thang: { lte: denThang } },
            ];
        }
    }
    async laySoLuongPhongBan(phongBanId, dto) {
        const phongBan = await this.prisma.phongBan.findUnique({
            where: { id: phongBanId },
        });
        if (!phongBan) {
            throw new common_1.NotFoundException(`Khong tim thay phong ban voi ID: ${phongBanId}`);
        }
        const nhanViens = await this.prisma.nhanVien.findMany({
            where: { phongBanId, trangThai: 'DANG_LAM' },
        });
        const theoNhanVien = [];
        const tongHopPB = {
            tongThuNhap: 0,
            tongKhauTru: 0,
            tongThuong: 0,
            tongPhat: 0,
            thucLinh: 0,
        };
        for (const nv of nhanViens) {
            const result = await this.laySoLuongNhanVien(nv.id, dto);
            const nvTongHop = {
                tongThuNhap: result.tongKet.tongLuong,
                tongKhauTru: result.tongKet.tongKhauTru,
                tongThuong: result.tongKet.tongThuong,
                tongPhat: result.tongKet.tongPhat,
                thucLinh: result.tongKet.tongThucNhan,
            };
            theoNhanVien.push({
                nhanVien: {
                    id: result.nhanVien.id,
                    maNhanVien: result.nhanVien.maNhanVien,
                    hoTen: result.nhanVien.hoTen,
                },
                tongHop: nvTongHop,
            });
            tongHopPB.tongThuNhap += nvTongHop.tongThuNhap;
            tongHopPB.tongKhauTru += nvTongHop.tongKhauTru;
            tongHopPB.tongThuong += nvTongHop.tongThuong;
            tongHopPB.tongPhat += nvTongHop.tongPhat;
            tongHopPB.thucLinh += nvTongHop.thucLinh;
        }
        return {
            phongBan: {
                id: phongBan.id,
                maPhongBan: phongBan.maPhongBan,
                tenPhongBan: phongBan.tenPhongBan,
            },
            tongHop: tongHopPB,
            theoNhanVien,
        };
    }
    async laySoLuongTatCaPhongBan(dto) {
        const phongBans = await this.prisma.phongBan.findMany({
            where: { trangThai: 'ACTIVE' },
            orderBy: { tenPhongBan: 'asc' },
        });
        const theoPhongBan = [];
        const tongHopAll = {
            tongThuNhap: 0,
            tongKhauTru: 0,
            tongThuong: 0,
            tongPhat: 0,
            thucLinh: 0,
        };
        for (const pb of phongBans) {
            try {
                const result = await this.laySoLuongPhongBan(pb.id, dto);
                theoPhongBan.push({
                    phongBan: result.phongBan,
                    tongHop: result.tongHop,
                    soNhanVien: result.theoNhanVien.length,
                });
                tongHopAll.tongThuNhap += result.tongHop.tongThuNhap;
                tongHopAll.tongKhauTru += result.tongHop.tongKhauTru;
                tongHopAll.tongThuong += result.tongHop.tongThuong;
                tongHopAll.tongPhat += result.tongHop.tongPhat;
                tongHopAll.thucLinh += result.tongHop.thucLinh;
            }
            catch {
            }
        }
        return {
            tongHop: tongHopAll,
            theoPhongBan,
        };
    }
    async timKiem(dto) {
        const { keyword, tuNgay, denNgay, phongBanId, trang = 1, soLuong = 20 } = dto;
        const whereNhanVien = {
            trangThai: 'DANG_LAM',
        };
        if (keyword) {
            whereNhanVien.OR = [
                { maNhanVien: { contains: keyword, mode: 'insensitive' } },
                { hoTen: { contains: keyword, mode: 'insensitive' } },
            ];
        }
        if (phongBanId) {
            whereNhanVien.phongBanId = phongBanId;
        }
        const skip = (trang - 1) * soLuong;
        const [nhanViens, tongSo] = await Promise.all([
            this.prisma.nhanVien.findMany({
                where: whereNhanVien,
                include: { phongBan: true },
                skip,
                take: soLuong,
                orderBy: { maNhanVien: 'asc' },
            }),
            this.prisma.nhanVien.count({ where: whereNhanVien }),
        ]);
        const locDto = { tuNgay, denNgay };
        const results = await Promise.all(nhanViens.map(async (nv) => {
            const soLuongData = await this.laySoLuongNhanVien(nv.id, locDto);
            return {
                nhanVien: soLuongData.nhanVien,
                tongKet: soLuongData.tongKet,
                soBangLuong: soLuongData.bangLuongs.length,
            };
        }));
        return {
            data: results,
            meta: {
                tongSo,
                trang,
                soLuong,
                tongTrang: Math.ceil(tongSo / soLuong),
            },
        };
    }
    async layChiTietEntry(refType, refId) {
        switch (refType) {
            case 'LUONG':
                return this.prisma.bangLuong.findUnique({
                    where: { id: refId },
                    include: {
                        phongBan: true,
                        chiTiets: true,
                        ngayCong: true,
                    },
                });
            case 'DIEU_CHINH':
                return this.prisma.phieuDieuChinh.findUnique({
                    where: { id: refId },
                    include: {
                        chiTiets: true,
                    },
                });
            case 'UNG_LUONG':
                return this.prisma.snapshotBangUngLuong.findUnique({
                    where: { id: refId },
                    include: {
                        bangUngLuong: true,
                        chiTiets: true,
                    },
                });
            case 'KPI':
                return this.prisma.danhGiaKPINhanVien.findUnique({
                    where: { id: refId },
                    include: {
                        kyDanhGia: true,
                        ketQuaKPIs: true,
                    },
                });
            case 'THUONG_PHAT':
                return this.prisma.suKienThuongPhat.findUnique({
                    where: { id: refId },
                    include: {
                        nhanVien: true,
                        phongBan: true,
                    },
                });
            default:
                return null;
        }
    }
};
exports.SoLuongService = SoLuongService;
exports.SoLuongService = SoLuongService = SoLuongService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SoLuongService);
//# sourceMappingURL=so-luong.service.js.map