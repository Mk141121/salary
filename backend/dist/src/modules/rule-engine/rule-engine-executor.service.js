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
exports.RuleEngineExecutor = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const client_1 = require("@prisma/client");
const quy_che_service_1 = require("./quy-che.service");
const su_kien_thuong_phat_service_1 = require("./su-kien-thuong-phat.service");
let RuleEngineExecutor = class RuleEngineExecutor {
    constructor(prisma, quyCheService, suKienService) {
        this.prisma = prisma;
        this.quyCheService = quyCheService;
        this.suKienService = suKienService;
        this.BIEN_CHO_PHEP = [
            'LUONG_CO_BAN', 'HE_SO_TRACH_NHIEM', 'CAP_TRACH_NHIEM',
            'CONG_CHUAN', 'CONG_THUC_TE', 'SO_GIO_OT', 'SO_GIO_OT_DEM',
            'SO_GIO_OT_CN', 'SO_GIO_OT_LE', 'SO_LAN_DI_MUON', 'SO_LAN_VE_SOM',
            'DOANH_SO', 'TY_LE_HOA_HONG', 'DIEM_KPI', 'HE_SO_KPI',
        ];
    }
    async chayRuleEngine(bangLuongId, nguoiThucHien) {
        const batDau = Date.now();
        const bangLuong = await this.prisma.bangLuong.findUnique({
            where: { id: bangLuongId },
            include: {
                phongBan: true,
            },
        });
        if (!bangLuong) {
            throw new common_1.NotFoundException(`Không tìm thấy bảng lương với ID: ${bangLuongId}`);
        }
        if (bangLuong.trangThai !== client_1.TrangThaiBangLuong.NHAP) {
            throw new common_1.BadRequestException('Chỉ có thể chạy Rule Engine cho bảng lương đang ở trạng thái Nhập');
        }
        const quyChe = await this.quyCheService.layQuyCheHieuLuc(bangLuong.phongBanId, bangLuong.thang, bangLuong.nam);
        if (!quyChe) {
            throw new common_1.BadRequestException(`Không tìm thấy quy chế hiệu lực cho phòng ban ${bangLuong.phongBan.tenPhongBan} tháng ${bangLuong.thang}/${bangLuong.nam}`);
        }
        if (quyChe.rules.length === 0) {
            throw new common_1.BadRequestException('Quy chế không có rule nào');
        }
        const nhanViens = await this.prisma.nhanVien.findMany({
            where: {
                phongBanId: bangLuong.phongBanId,
                trangThai: 'DANG_LAM',
            },
            include: {
                nhanVienTrachNhiems: {
                    where: {
                        tuNgay: { lte: new Date(bangLuong.nam, bangLuong.thang - 1, 28) },
                        OR: [
                            { denNgay: null },
                            { denNgay: { gte: new Date(bangLuong.nam, bangLuong.thang - 1, 1) } },
                        ],
                    },
                    orderBy: { tuNgay: 'desc' },
                    take: 1,
                },
            },
        });
        await this.prisma.chiTietBangLuong.deleteMany({
            where: {
                bangLuongId,
                nguon: client_1.NguonChiTiet.RULE,
            },
        });
        await this.prisma.ruleTrace.deleteMany({
            where: { bangLuongId },
        });
        const ketQuaChiTiet = [];
        let soDongTao = 0;
        let soTraceGhi = 0;
        for (const nhanVien of nhanViens) {
            const duLieu = await this.chuanBiDuLieuNhanVien(nhanVien, bangLuong.thang, bangLuong.nam);
            const ketQuaTheoKhoan = new Map();
            for (const rule of quyChe.rules) {
                try {
                    if (!this.kiemTraDieuKien(rule, duLieu)) {
                        continue;
                    }
                    const congThuc = JSON.parse(rule.congThucJson);
                    const ketQua = this.tinhToanRule(rule.loaiRule, congThuc, duLieu, rule.id);
                    if (ketQua.soTien !== 0) {
                        if (!ketQuaTheoKhoan.has(rule.khoanLuongId)) {
                            ketQuaTheoKhoan.set(rule.khoanLuongId, []);
                        }
                        ketQuaTheoKhoan.get(rule.khoanLuongId).push(ketQua);
                        await this.prisma.ruleTrace.create({
                            data: {
                                bangLuongId,
                                nhanVienId: nhanVien.id,
                                quyCheId: quyChe.id,
                                quyCheRuleId: rule.id,
                                khoanLuongId: rule.khoanLuongId,
                                inputJson: JSON.stringify(ketQua.input),
                                outputSoTien: ketQua.soTien,
                                messageGiaiThich: ketQua.giaiThich,
                            },
                        });
                        soTraceGhi++;
                    }
                }
                catch (error) {
                    await this.prisma.ruleTrace.create({
                        data: {
                            bangLuongId,
                            nhanVienId: nhanVien.id,
                            quyCheId: quyChe.id,
                            quyCheRuleId: rule.id,
                            khoanLuongId: rule.khoanLuongId,
                            inputJson: JSON.stringify({ error: error.message }),
                            outputSoTien: 0,
                            messageGiaiThich: `Lỗi: ${error.message}`,
                        },
                    });
                    soTraceGhi++;
                }
            }
            const cacKhoan = [];
            let tongThuNhap = 0;
            let tongKhauTru = 0;
            for (const [khoanLuongId, ketQuas] of ketQuaTheoKhoan) {
                const ruleCuoi = quyChe.rules.find((r) => r.khoanLuongId === khoanLuongId);
                const cheDoGop = ruleCuoi?.cheDoGop || client_1.CheDoGop.GHI_DE;
                let soTienCuoiCung = 0;
                let ghiChu = '';
                if (cheDoGop === client_1.CheDoGop.CONG_DON) {
                    soTienCuoiCung = ketQuas.reduce((sum, kq) => sum + kq.soTien, 0);
                    ghiChu = ketQuas.map((kq) => kq.giaiThich).join(' + ');
                }
                else {
                    const kqCuoi = ketQuas[ketQuas.length - 1];
                    soTienCuoiCung = kqCuoi.soTien;
                    ghiChu = kqCuoi.giaiThich;
                }
                const chiTietCu = await this.prisma.chiTietBangLuong.findUnique({
                    where: {
                        bangLuongId_nhanVienId_khoanLuongId: {
                            bangLuongId,
                            nhanVienId: nhanVien.id,
                            khoanLuongId,
                        },
                    },
                });
                if (chiTietCu) {
                    if (chiTietCu.nguon === client_1.NguonChiTiet.NHAP_TAY) {
                    }
                    else {
                        await this.prisma.chiTietBangLuong.update({
                            where: { id: chiTietCu.id },
                            data: {
                                soTien: soTienCuoiCung,
                                nguon: client_1.NguonChiTiet.RULE,
                                ghiChu,
                            },
                        });
                    }
                }
                else {
                    await this.prisma.chiTietBangLuong.create({
                        data: {
                            bangLuongId,
                            nhanVienId: nhanVien.id,
                            khoanLuongId,
                            soTien: soTienCuoiCung,
                            nguon: client_1.NguonChiTiet.RULE,
                            ghiChu,
                        },
                    });
                    soDongTao++;
                }
                const khoanLuong = quyChe.rules.find((r) => r.khoanLuongId === khoanLuongId)?.khoanLuong;
                if (khoanLuong) {
                    cacKhoan.push({
                        khoanLuong: khoanLuong.tenKhoan,
                        soTien: soTienCuoiCung,
                    });
                    if (khoanLuong.loai === 'THU_NHAP') {
                        tongThuNhap += soTienCuoiCung;
                    }
                    else {
                        tongKhauTru += soTienCuoiCung;
                    }
                }
            }
            ketQuaChiTiet.push({
                nhanVienId: nhanVien.id,
                hoTen: nhanVien.hoTen,
                tongThuNhap,
                tongKhauTru,
                thucNhan: tongThuNhap - tongKhauTru,
                cacKhoan,
            });
        }
        await this.prisma.bangLuongQuyChe.upsert({
            where: {
                bangLuongId_quyCheId: {
                    bangLuongId,
                    quyCheId: quyChe.id,
                },
            },
            update: {
                ngayApDung: new Date(),
                nguoiApDung: nguoiThucHien,
            },
            create: {
                bangLuongId,
                quyCheId: quyChe.id,
                nguoiApDung: nguoiThucHien,
            },
        });
        return {
            bangLuongId,
            quyCheId: quyChe.id,
            soNhanVien: nhanViens.length,
            soDongTao,
            soTraceGhi,
            chiTiet: ketQuaChiTiet,
            thoiGianXuLy: Date.now() - batDau,
        };
    }
    async chuanBiDuLieuNhanVien(nhanVien, thang, nam) {
        const chamCong = await this.prisma.chamCong.findUnique({
            where: {
                nhanVienId_thang_nam: {
                    nhanVienId: nhanVien.id,
                    thang,
                    nam,
                },
            },
        });
        const ngayCong = await this.prisma.ngayCongBangLuong.findFirst({
            where: {
                nhanVienId: nhanVien.id,
                bangLuong: {
                    thang,
                    nam,
                    phongBanId: nhanVien.phongBanId,
                },
            },
        });
        const suKien = await this.suKienService.laySuKienChoRuleEngine(nhanVien.id, nhanVien.phongBanId, thang, nam);
        const trachNhiem = nhanVien.nhanVienTrachNhiems[0];
        return {
            nhanVienId: nhanVien.id,
            maNhanVien: nhanVien.maNhanVien,
            hoTen: nhanVien.hoTen,
            luongCoBan: Number(nhanVien.luongCoBan),
            capTrachNhiem: trachNhiem?.capTrachNhiem || 0,
            heSoTrachNhiem: Number(trachNhiem?.heSoTrachNhiem || 1),
            vaiTro: trachNhiem?.vaiTro || null,
            congChuan: ngayCong ? Number(ngayCong.ngayCongLyThuyet) : (chamCong ? Number(chamCong.soCongChuan) : 26),
            congThucTe: ngayCong ? Number(ngayCong.soCongThucTe) : (chamCong ? Number(chamCong.soCongThucTe) : 26),
            soGioOT: chamCong ? Number(chamCong.soGioOT) : 0,
            soGioOTDem: chamCong ? Number(chamCong.soGioOTDem) : 0,
            soGioOTChuNhat: chamCong ? Number(chamCong.soGioOTChuNhat) : 0,
            soGioOTLe: chamCong ? Number(chamCong.soGioOTLe) : 0,
            soLanDiMuon: chamCong ? chamCong.soLanDiMuon : 0,
            soLanVeSom: chamCong ? chamCong.soLanVeSom : 0,
            suKien,
        };
    }
    kiemTraDieuKien(rule, duLieu) {
        if (!rule.dieuKienJson) {
            return true;
        }
        try {
            const dieuKien = JSON.parse(rule.dieuKienJson);
            const apDungCho = dieuKien.apDungCho;
            if (!apDungCho) {
                return true;
            }
            if (apDungCho.vaiTro && apDungCho.vaiTro.length > 0) {
                if (!duLieu.vaiTro || !apDungCho.vaiTro.includes(duLieu.vaiTro)) {
                    return false;
                }
            }
            if (apDungCho.capTrachNhiem && apDungCho.capTrachNhiem.length > 0) {
                if (!apDungCho.capTrachNhiem.includes(duLieu.capTrachNhiem)) {
                    return false;
                }
            }
            if (apDungCho.nhanVienIds && apDungCho.nhanVienIds.length > 0) {
                if (!apDungCho.nhanVienIds.includes(duLieu.nhanVienId)) {
                    return false;
                }
            }
            return true;
        }
        catch {
            return true;
        }
    }
    tinhToanRule(loaiRule, congThuc, duLieu, ruleId) {
        const input = {
            luongCoBan: duLieu.luongCoBan,
            capTrachNhiem: duLieu.capTrachNhiem,
            heSoTrachNhiem: duLieu.heSoTrachNhiem,
        };
        switch (loaiRule) {
            case client_1.LoaiRule.CO_DINH: {
                const ct = congThuc;
                return {
                    khoanLuongId: 0,
                    soTien: ct.soTien,
                    nguon: client_1.NguonChiTiet.RULE,
                    thamChieuId: ruleId,
                    giaiThich: `Số tiền cố định: ${this.formatTien(ct.soTien)}`,
                    input,
                };
            }
            case client_1.LoaiRule.THEO_HE_SO: {
                const ct = congThuc;
                const base = this.layGiaTriBien(ct.base, duLieu);
                input[ct.base] = base;
                const soTien = Math.round(base * ct.heSo + (ct.congThem || 0));
                return {
                    khoanLuongId: 0,
                    soTien,
                    nguon: client_1.NguonChiTiet.RULE,
                    thamChieuId: ruleId,
                    giaiThich: `${ct.base}(${this.formatTien(base)}) × ${ct.heSo}${ct.congThem ? ` + ${this.formatTien(ct.congThem)}` : ''} = ${this.formatTien(soTien)}`,
                    input,
                };
            }
            case client_1.LoaiRule.BAC_THANG: {
                const ct = congThuc;
                const giaTriField = this.layGiaTriBien(ct.field, duLieu);
                input[ct.field] = giaTriField;
                const bacPhuHop = ct.bac.find((b) => giaTriField >= b.from && giaTriField <= b.to);
                if (!bacPhuHop) {
                    return {
                        khoanLuongId: 0,
                        soTien: 0,
                        nguon: client_1.NguonChiTiet.RULE,
                        thamChieuId: ruleId,
                        giaiThich: `${ct.field} = ${giaTriField}, không thuộc bậc nào`,
                        input,
                    };
                }
                const soTien = bacPhuHop.soTien || (bacPhuHop.heSo ? Math.round(duLieu.luongCoBan * bacPhuHop.heSo) : 0);
                return {
                    khoanLuongId: 0,
                    soTien,
                    nguon: client_1.NguonChiTiet.RULE,
                    thamChieuId: ruleId,
                    giaiThich: `${ct.field} = ${giaTriField} thuộc bậc ${bacPhuHop.from}-${bacPhuHop.to} → ${this.formatTien(soTien)}`,
                    input,
                };
            }
            case client_1.LoaiRule.THEO_SU_KIEN: {
                const ct = congThuc;
                const suKien = duLieu.suKien[ct.maSuKien];
                const soLan = suKien?.soLan || 0;
                input.maSuKien = ct.maSuKien;
                input.soLan = soLan;
                if (soLan === 0) {
                    return {
                        khoanLuongId: 0,
                        soTien: 0,
                        nguon: client_1.NguonChiTiet.RULE,
                        thamChieuId: ruleId,
                        giaiThich: `Không có sự kiện ${ct.maSuKien}`,
                        input,
                    };
                }
                let soTien = 0;
                if (ct.cachTinh === 'CO_DINH') {
                    soTien = (ct.soTienMoiLan || 0) * soLan;
                }
                else if (ct.cachTinh === 'BAC_THANG' && ct.bac) {
                    const bacPhuHop = ct.bac.find((b) => soLan >= b.from && soLan <= b.to);
                    if (bacPhuHop) {
                        soTien = (bacPhuHop.soTienMoiLan || 0) * soLan;
                    }
                }
                return {
                    khoanLuongId: 0,
                    soTien,
                    nguon: client_1.NguonChiTiet.RULE,
                    thamChieuId: ruleId,
                    giaiThich: `${ct.maSuKien}: ${soLan} lần → ${this.formatTien(soTien)}`,
                    input,
                };
            }
            case client_1.LoaiRule.CONG_THUC: {
                const ct = congThuc;
                let bieuThuc = ct.bieuThuc;
                const bienGiaTri = {
                    LUONG_CO_BAN: duLieu.luongCoBan,
                    HE_SO_TRACH_NHIEM: duLieu.heSoTrachNhiem,
                    CAP_TRACH_NHIEM: duLieu.capTrachNhiem,
                    CONG_CHUAN: duLieu.congChuan,
                    CONG_THUC_TE: duLieu.congThucTe,
                    SO_GIO_OT: duLieu.soGioOT,
                    SO_GIO_OT_DEM: duLieu.soGioOTDem,
                    SO_GIO_OT_CN: duLieu.soGioOTChuNhat,
                    SO_GIO_OT_LE: duLieu.soGioOTLe,
                    SO_LAN_DI_MUON: duLieu.soLanDiMuon,
                    SO_LAN_VE_SOM: duLieu.soLanVeSom,
                };
                for (const [ten, giaTri] of Object.entries(bienGiaTri)) {
                    const regex = new RegExp(`\\b${ten}\\b`, 'g');
                    bieuThuc = bieuThuc.replace(regex, String(giaTri));
                    input[ten] = giaTri;
                }
                try {
                    const safeExpression = bieuThuc.replace(/[^0-9+\-*/().]/g, '');
                    const calculate = new Function(`return ${safeExpression}`);
                    const soTien = Math.round(calculate());
                    return {
                        khoanLuongId: 0,
                        soTien,
                        nguon: client_1.NguonChiTiet.RULE,
                        thamChieuId: ruleId,
                        giaiThich: `${ct.bieuThuc} = ${this.formatTien(soTien)}`,
                        input,
                    };
                }
                catch (error) {
                    throw new Error(`Lỗi tính biểu thức: ${ct.bieuThuc} - ${error.message}`);
                }
            }
            default:
                return {
                    khoanLuongId: 0,
                    soTien: 0,
                    nguon: client_1.NguonChiTiet.RULE,
                    thamChieuId: ruleId,
                    giaiThich: 'Loại rule không hỗ trợ',
                    input,
                };
        }
    }
    layGiaTriBien(tenBien, duLieu) {
        const mapping = {
            LUONG_CO_BAN: 'luongCoBan',
            luong_co_ban: 'luongCoBan',
            HE_SO_TRACH_NHIEM: 'heSoTrachNhiem',
            he_so_trach_nhiem: 'heSoTrachNhiem',
            CAP_TRACH_NHIEM: 'capTrachNhiem',
            cap_trach_nhiem: 'capTrachNhiem',
            CONG_CHUAN: 'congChuan',
            CONG_THUC_TE: 'congThucTe',
            SO_GIO_OT: 'soGioOT',
            SO_LAN_DI_MUON: 'soLanDiMuon',
            SO_LAN_VE_SOM: 'soLanVeSom',
        };
        const key = mapping[tenBien] || tenBien;
        const giaTri = duLieu[key];
        if (typeof giaTri === 'number') {
            return giaTri;
        }
        return 0;
    }
    async xemTrace(bangLuongId, nhanVienId) {
        const where = { bangLuongId };
        if (nhanVienId) {
            where.nhanVienId = nhanVienId;
        }
        return this.prisma.ruleTrace.findMany({
            where,
            include: {
                nhanVien: {
                    select: {
                        id: true,
                        maNhanVien: true,
                        hoTen: true,
                    },
                },
                quyChe: {
                    select: {
                        id: true,
                        tenQuyChe: true,
                        phienBan: true,
                    },
                },
                quyCheRule: {
                    select: {
                        id: true,
                        tenRule: true,
                        loaiRule: true,
                    },
                },
                khoanLuong: {
                    select: {
                        id: true,
                        maKhoan: true,
                        tenKhoan: true,
                        loai: true,
                    },
                },
            },
            orderBy: [
                { nhanVienId: 'asc' },
                { taoLuc: 'asc' },
            ],
        });
    }
    formatTien(so) {
        return new Intl.NumberFormat('vi-VN').format(so) + 'đ';
    }
};
exports.RuleEngineExecutor = RuleEngineExecutor;
exports.RuleEngineExecutor = RuleEngineExecutor = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        quy_che_service_1.QuyCheService,
        su_kien_thuong_phat_service_1.SuKienThuongPhatService])
], RuleEngineExecutor);
//# sourceMappingURL=rule-engine-executor.service.js.map