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
exports.ChamCongService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const constants_1 = require("../../common/constants");
let ChamCongService = class ChamCongService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    tinhSoNgayCongLyThuyet(thang, nam) {
        const soNgayTrongThang = new Date(nam, thang, 0).getDate();
        let soNgayChuNhat = 0;
        let soNgayThuBay = 0;
        for (let ngay = 1; ngay <= soNgayTrongThang; ngay++) {
            const date = new Date(nam, thang - 1, ngay);
            const thuTrongTuan = date.getDay();
            if (thuTrongTuan === 0) {
                soNgayChuNhat++;
            }
            else if (thuTrongTuan === 6) {
                soNgayThuBay++;
            }
        }
        const ngayCongLyThuyet = soNgayTrongThang - soNgayChuNhat - (soNgayThuBay * 0.5);
        return ngayCongLyThuyet;
    }
    layThongTinNgayCongLyThuyet(thang, nam) {
        const soNgayTrongThang = new Date(nam, thang, 0).getDate();
        let soNgayChuNhat = 0;
        let soNgayThuBay = 0;
        let soNgayThuong = 0;
        for (let ngay = 1; ngay <= soNgayTrongThang; ngay++) {
            const date = new Date(nam, thang - 1, ngay);
            const thuTrongTuan = date.getDay();
            if (thuTrongTuan === 0) {
                soNgayChuNhat++;
            }
            else if (thuTrongTuan === 6) {
                soNgayThuBay++;
            }
            else {
                soNgayThuong++;
            }
        }
        const ngayCongLyThuyet = soNgayTrongThang - soNgayChuNhat - (soNgayThuBay * 0.5);
        return {
            thang,
            nam,
            soNgayTrongThang,
            soNgayChuNhat,
            soNgayThuBay,
            soNgayThuong,
            ngayCongLyThuyet,
            moTa: `${soNgayTrongThang} ngày - ${soNgayChuNhat} CN - (${soNgayThuBay} T7 × 0.5) = ${ngayCongLyThuyet} ngày`,
        };
    }
    async layCauHinhPhat(nam) {
        let cauHinh = await this.prisma.cauHinhPhatChamCong.findUnique({
            where: { nam },
        });
        if (!cauHinh) {
            cauHinh = await this.prisma.cauHinhPhatChamCong.create({
                data: {
                    nam,
                    phatDiMuon1_3Lan: 100000,
                    phatDiMuon4_6Lan: 300000,
                    phatDiMuonTren6Lan: 500000,
                    phatVeSom1_3Lan: 100000,
                    phatVeSom4_6Lan: 300000,
                    phatVeSomTren6Lan: 500000,
                    phatNghiKhongPhep: 200000,
                    truLuongNghiKhongPhep: true,
                    gioVaoChuan: '08:00',
                    gioRaChuan: '17:00',
                    phutChoPhepTre: 5,
                },
            });
        }
        return cauHinh;
    }
    async capNhatCauHinhPhat(nam, data) {
        return this.prisma.cauHinhPhatChamCong.upsert({
            where: { nam },
            update: data,
            create: { nam, ...data },
        });
    }
    async tinhTienPhat(nhanVienId, thang, nam) {
        const chamCong = await this.layChamCongNhanVien(nhanVienId, thang, nam);
        if (!chamCong) {
            return { tienPhatDiMuon: 0, tienPhatVeSom: 0, tienPhatNghiKhongPhep: 0, truLuongNgayCong: 0, tongPhat: 0 };
        }
        const cauHinh = await this.layCauHinhPhat(nam);
        const nhanVien = await this.prisma.nhanVien.findUnique({
            where: { id: nhanVienId },
        });
        let tienPhatDiMuon = 0;
        let tienPhatVeSom = 0;
        let tienPhatNghiKhongPhep = 0;
        let truLuongNgayCong = 0;
        const soLanDiMuon = chamCong.soLanDiMuon || 0;
        if (soLanDiMuon > 0) {
            if (soLanDiMuon <= 3) {
                tienPhatDiMuon = Number(cauHinh.phatDiMuon1_3Lan);
            }
            else if (soLanDiMuon <= 6) {
                tienPhatDiMuon = Number(cauHinh.phatDiMuon4_6Lan);
            }
            else {
                tienPhatDiMuon = Number(cauHinh.phatDiMuonTren6Lan);
            }
        }
        const soLanVeSom = chamCong.soLanVeSom || 0;
        if (soLanVeSom > 0) {
            if (soLanVeSom <= 3) {
                tienPhatVeSom = Number(cauHinh.phatVeSom1_3Lan);
            }
            else if (soLanVeSom <= 6) {
                tienPhatVeSom = Number(cauHinh.phatVeSom4_6Lan);
            }
            else {
                tienPhatVeSom = Number(cauHinh.phatVeSomTren6Lan);
            }
        }
        const soNgayNghiKhongLuong = Number(chamCong.soNgayNghiKhongLuong) || 0;
        if (soNgayNghiKhongLuong > 0) {
            tienPhatNghiKhongPhep = soNgayNghiKhongLuong * Number(cauHinh.phatNghiKhongPhep);
            if (cauHinh.truLuongNghiKhongPhep && nhanVien) {
                const luongNgay = Number(nhanVien.luongCoBan) / Number(chamCong.soCongChuan);
                truLuongNgayCong = soNgayNghiKhongLuong * luongNgay;
            }
        }
        const tongPhat = tienPhatDiMuon + tienPhatVeSom + tienPhatNghiKhongPhep + truLuongNgayCong;
        return {
            soLanDiMuon,
            soLanVeSom,
            soNgayNghiKhongLuong,
            tienPhatDiMuon,
            tienPhatVeSom,
            tienPhatNghiKhongPhep,
            truLuongNgayCong: Math.round(truLuongNgayCong),
            tongPhat: Math.round(tongPhat),
        };
    }
    async layDanhSachChamCong(thang, nam, phongBanId) {
        const where = { thang, nam };
        const chamCongs = await this.prisma.chamCong.findMany({
            where,
            include: {
                nhanVien: {
                    include: {
                        phongBan: true,
                    },
                },
            },
            orderBy: [
                { nhanVien: { phongBan: { tenPhongBan: 'asc' } } },
                { nhanVien: { hoTen: 'asc' } },
            ],
        });
        if (phongBanId) {
            return chamCongs.filter((cc) => cc.nhanVien.phongBanId === phongBanId);
        }
        return chamCongs;
    }
    async layChamCongNhanVien(nhanVienId, thang, nam) {
        return this.prisma.chamCong.findUnique({
            where: {
                nhanVienId_thang_nam: {
                    nhanVienId,
                    thang,
                    nam,
                },
            },
            include: {
                nhanVien: true,
            },
        });
    }
    async layChamCongNhieuNhanVien(nhanVienIds, thang, nam) {
        const chamCongs = await this.prisma.chamCong.findMany({
            where: {
                nhanVienId: { in: nhanVienIds },
                thang,
                nam,
            },
            include: {
                nhanVien: true,
            },
        });
        const map = new Map();
        for (const cc of chamCongs) {
            map.set(cc.nhanVienId, cc);
        }
        return map;
    }
    async luuChamCong(data) {
        return this.prisma.chamCong.upsert({
            where: {
                nhanVienId_thang_nam: {
                    nhanVienId: data.nhanVienId,
                    thang: data.thang,
                    nam: data.nam,
                },
            },
            update: {
                soCongChuan: data.soCongChuan,
                soCongThucTe: data.soCongThucTe,
                soNgayNghiPhep: data.soNgayNghiPhep,
                soNgayNghiKhongLuong: data.soNgayNghiKhongLuong,
                soGioOT: data.soGioOT,
                soGioOTDem: data.soGioOTDem,
                soGioOTChuNhat: data.soGioOTChuNhat,
                soGioOTLe: data.soGioOTLe,
                soLanDiMuon: data.soLanDiMuon,
                soLanVeSom: data.soLanVeSom,
                ghiChu: data.ghiChu,
            },
            create: data,
            include: {
                nhanVien: true,
            },
        });
    }
    async khoiTaoChamCongThang(thang, nam, soCongChuan = constants_1.NGAY_CONG_CHUAN_MAC_DINH) {
        const nhanViens = await this.prisma.nhanVien.findMany({
            where: { trangThai: 'DANG_LAM' },
        });
        const ketQua = { created: 0, skipped: 0 };
        for (const nv of nhanViens) {
            const existing = await this.prisma.chamCong.findUnique({
                where: {
                    nhanVienId_thang_nam: {
                        nhanVienId: nv.id,
                        thang,
                        nam,
                    },
                },
            });
            if (!existing) {
                await this.prisma.chamCong.create({
                    data: {
                        nhanVienId: nv.id,
                        thang,
                        nam,
                        soCongChuan,
                        soCongThucTe: soCongChuan,
                    },
                });
                ketQua.created++;
            }
            else {
                ketQua.skipped++;
            }
        }
        return {
            message: `Đã khởi tạo chấm công tháng ${thang}/${nam}`,
            ...ketQua,
        };
    }
    async layChiTietChamCong(nhanVienId, thang, nam) {
        const ngayDau = new Date(nam, thang - 1, 1);
        const ngayCuoi = new Date(nam, thang, 0);
        return this.prisma.chiTietChamCong.findMany({
            where: {
                nhanVienId,
                ngay: {
                    gte: ngayDau,
                    lte: ngayCuoi,
                },
            },
            orderBy: { ngay: 'asc' },
        });
    }
    async luuChiTietChamCong(data) {
        return this.prisma.chiTietChamCong.upsert({
            where: {
                nhanVienId_ngay: {
                    nhanVienId: data.nhanVienId,
                    ngay: data.ngay,
                },
            },
            update: data,
            create: data,
        });
    }
    async tongHopChamCong(nhanVienId, thang, nam) {
        const chiTiets = await this.layChiTietChamCong(nhanVienId, thang, nam);
        let soCongThucTe = 0;
        let soNgayNghiPhep = 0;
        let soNgayNghiKhongLuong = 0;
        let soGioOT = 0;
        let soGioOTDem = 0;
        let soGioOTChuNhat = 0;
        let soGioOTLe = 0;
        let soLanDiMuon = 0;
        let soLanVeSom = 0;
        for (const ct of chiTiets) {
            switch (ct.trangThai) {
                case 'DI_LAM':
                case 'CONG_TAC':
                case 'LAM_TU_XA':
                    soCongThucTe += 1;
                    break;
                case 'NGHI_PHEP':
                    soNgayNghiPhep += 1;
                    soCongThucTe += 1;
                    break;
                case 'NGHI_KHONG_LUONG':
                    soNgayNghiKhongLuong += 1;
                    break;
                case 'NGHI_LE':
                case 'NGHI_BENH':
                    soCongThucTe += 1;
                    break;
            }
            soGioOT += Number(ct.soGioOT);
            switch (ct.loaiNgay) {
                case 'CHU_NHAT':
                    soGioOTChuNhat += Number(ct.soGioOT);
                    break;
                case 'NGAY_LE':
                    soGioOTLe += Number(ct.soGioOT);
                    break;
            }
            if (ct.gioVao) {
                const gioVao = new Date(ct.gioVao);
                if (gioVao.getHours() > 8 || (gioVao.getHours() === 8 && gioVao.getMinutes() > 0)) {
                    soLanDiMuon++;
                }
            }
            if (ct.gioRa) {
                const gioRa = new Date(ct.gioRa);
                if (gioRa.getHours() < 17) {
                    soLanVeSom++;
                }
            }
        }
        return this.luuChamCong({
            nhanVienId,
            thang,
            nam,
            soCongThucTe,
            soNgayNghiPhep,
            soNgayNghiKhongLuong,
            soGioOT,
            soGioOTDem,
            soGioOTChuNhat,
            soGioOTLe,
            soLanDiMuon,
            soLanVeSom,
        });
    }
    async importChamCong(thang, nam, duLieu) {
        const ketQua = { success: 0, failed: 0, errors: [] };
        for (const row of duLieu) {
            try {
                const nhanVien = await this.prisma.nhanVien.findUnique({
                    where: { maNhanVien: row.maNhanVien },
                });
                if (!nhanVien) {
                    ketQua.failed++;
                    ketQua.errors.push({
                        maNhanVien: row.maNhanVien,
                        lyDo: 'Không tìm thấy nhân viên',
                    });
                    continue;
                }
                await this.luuChamCong({
                    nhanVienId: nhanVien.id,
                    thang,
                    nam,
                    soCongThucTe: row.soCongThucTe,
                    soNgayNghiPhep: row.soNgayNghiPhep,
                    soNgayNghiKhongLuong: row.soNgayNghiKhongLuong,
                    soGioOT: row.soGioOT,
                    soGioOTDem: row.soGioOTDem,
                    soGioOTChuNhat: row.soGioOTChuNhat,
                    soGioOTLe: row.soGioOTLe,
                    soLanDiMuon: row.soLanDiMuon,
                    soLanVeSom: row.soLanVeSom,
                });
                ketQua.success++;
            }
            catch (error) {
                ketQua.failed++;
                ketQua.errors.push({
                    maNhanVien: row.maNhanVien,
                    lyDo: error.message,
                });
            }
        }
        return ketQua;
    }
    async dongBoChamCongCSV(csvContent) {
        const allNhanVien = await this.prisma.nhanVien.findMany({
            include: { phongBan: true },
        });
        const nhanVienMap = new Map(allNhanVien.map(nv => [nv.maNhanVien, nv]));
        const lines = csvContent.split('\n').filter(line => line.trim());
        const dataLines = lines.slice(4);
        const chamCongMap = new Map();
        for (const line of dataLines) {
            const cols = line.split(',');
            if (cols.length < 6)
                continue;
            const maNhanVien = cols[2]?.trim();
            const ngayStr = cols[4]?.trim();
            const thoiGianStr = cols[5]?.trim();
            if (!maNhanVien || !ngayStr || !thoiGianStr)
                continue;
            const [day, month, year] = ngayStr.split('/').map(Number);
            if (!day || !month || !year)
                continue;
            const ngay = new Date(year, month - 1, day);
            const [gio, phut] = thoiGianStr.split(':').map(Number);
            if (isNaN(gio) || isNaN(phut))
                continue;
            const thoiGian = new Date(year, month - 1, day, gio, phut);
            const key = `${maNhanVien}_${ngayStr}`;
            if (!chamCongMap.has(key)) {
                chamCongMap.set(key, {
                    maNhanVien,
                    ngay,
                    thoiGians: [],
                });
            }
            chamCongMap.get(key).thoiGians.push(thoiGian);
        }
        const ketQua = {
            tongBanGhi: dataLines.length,
            tongNgay: chamCongMap.size,
            chiTiet: [],
            thongKe: [],
            luuThanhCong: 0,
            luuThatBai: 0,
            loi: [],
        };
        const thongKeMap = new Map();
        for (const [, data] of chamCongMap) {
            const { maNhanVien, ngay, thoiGians } = data;
            const nhanVien = nhanVienMap.get(maNhanVien);
            if (!nhanVien) {
                ketQua.loi.push(`Không tìm thấy nhân viên: ${maNhanVien}`);
                continue;
            }
            const gioVaoChuan = nhanVien.phongBan?.gioVaoChuan || '08:00';
            const gioRaChuan = nhanVien.phongBan?.gioRaChuan || '17:00';
            const phutChoPhep = nhanVien.phongBan?.phutChoPhepTre || 5;
            const [gioVaoH, gioVaoM] = gioVaoChuan.split(':').map(Number);
            const [gioRaH, gioRaM] = gioRaChuan.split(':').map(Number);
            thoiGians.sort((a, b) => a.getTime() - b.getTime());
            const soLanQuet = thoiGians.length;
            if (soLanQuet === 0)
                continue;
            const gioVao = thoiGians[0];
            const gioRa = soLanQuet > 1 ? thoiGians[soLanQuet - 1] : null;
            let diMuon = false;
            let phutMuon = 0;
            if (gioVao) {
                const gioVaoPhut = gioVao.getHours() * 60 + gioVao.getMinutes();
                const gioChuanPhut = gioVaoH * 60 + gioVaoM + phutChoPhep;
                if (gioVaoPhut > gioChuanPhut) {
                    diMuon = true;
                    phutMuon = gioVaoPhut - gioChuanPhut;
                }
            }
            let veSom = false;
            let phutSom = 0;
            if (gioRa) {
                const gioRaPhut = gioRa.getHours() * 60 + gioRa.getMinutes();
                const gioChuanRaPhut = gioRaH * 60 + gioRaM;
                if (gioRaPhut < gioChuanRaPhut) {
                    veSom = true;
                    phutSom = gioChuanRaPhut - gioRaPhut;
                }
            }
            ketQua.chiTiet.push({
                maNhanVien,
                ngay: ngay.toISOString().split('T')[0],
                gioVao: gioVao ? `${String(gioVao.getHours()).padStart(2, '0')}:${String(gioVao.getMinutes()).padStart(2, '0')}` : null,
                gioRa: gioRa ? `${String(gioRa.getHours()).padStart(2, '0')}:${String(gioRa.getMinutes()).padStart(2, '0')}` : null,
                diMuon,
                veSom,
                phutMuon,
                phutSom,
                soLanQuet,
                gioChuanVao: gioVaoChuan,
                gioChuanRa: gioRaChuan,
            });
            const thang = ngay.getMonth() + 1;
            const namNV = ngay.getFullYear();
            const thongKeKey = `${maNhanVien}_${thang}_${namNV}`;
            if (!thongKeMap.has(thongKeKey)) {
                thongKeMap.set(thongKeKey, {
                    maNhanVien,
                    thang,
                    nam: namNV,
                    soCongThucTe: 0,
                    soLanDiMuon: 0,
                    soLanVeSom: 0,
                });
            }
            const tk = thongKeMap.get(thongKeKey);
            tk.soCongThucTe += 1;
            if (diMuon)
                tk.soLanDiMuon += 1;
            if (veSom)
                tk.soLanVeSom += 1;
            try {
                const nhanVien = await this.prisma.nhanVien.findUnique({
                    where: { maNhanVien },
                });
                if (nhanVien) {
                    await this.luuChiTietChamCong({
                        nhanVienId: nhanVien.id,
                        ngay,
                        gioVao: gioVao || undefined,
                        gioRa: gioRa || undefined,
                        trangThai: 'DI_LAM',
                        soGioLam: gioVao && gioRa
                            ? (gioRa.getTime() - gioVao.getTime()) / 1000 / 60 / 60
                            : 0,
                    });
                }
            }
            catch (e) {
            }
        }
        for (const [, tk] of thongKeMap) {
            ketQua.thongKe.push(tk);
            try {
                const nhanVien = await this.prisma.nhanVien.findUnique({
                    where: { maNhanVien: tk.maNhanVien },
                });
                if (nhanVien) {
                    const ccHienTai = await this.layChamCongNhanVien(nhanVien.id, tk.thang, tk.nam);
                    await this.luuChamCong({
                        nhanVienId: nhanVien.id,
                        thang: tk.thang,
                        nam: tk.nam,
                        soCongThucTe: tk.soCongThucTe,
                        soLanDiMuon: tk.soLanDiMuon,
                        soLanVeSom: tk.soLanVeSom,
                        soNgayNghiPhep: ccHienTai ? Number(ccHienTai.soNgayNghiPhep) : 0,
                        soNgayNghiKhongLuong: ccHienTai ? Number(ccHienTai.soNgayNghiKhongLuong) : 0,
                        soGioOT: ccHienTai ? Number(ccHienTai.soGioOT) : 0,
                    });
                    ketQua.luuThanhCong++;
                }
                else {
                    ketQua.loi.push(`Không tìm thấy nhân viên: ${tk.maNhanVien}`);
                    ketQua.luuThatBai++;
                }
            }
            catch (e) {
                ketQua.loi.push(`Lỗi lưu ${tk.maNhanVien}: ${e.message}`);
                ketQua.luuThatBai++;
            }
        }
        return ketQua;
    }
};
exports.ChamCongService = ChamCongService;
exports.ChamCongService = ChamCongService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ChamCongService);
//# sourceMappingURL=cham-cong.service.js.map