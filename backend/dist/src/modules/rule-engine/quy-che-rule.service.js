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
exports.QuyCheRuleService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const client_1 = require("@prisma/client");
let QuyCheRuleService = class QuyCheRuleService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async layDanhSachTheoQuyChe(quyCheId) {
        return this.prisma.quyCheRule.findMany({
            where: { quyCheId },
            orderBy: { thuTuUuTien: 'asc' },
            include: {
                khoanLuong: {
                    select: {
                        id: true,
                        maKhoan: true,
                        tenKhoan: true,
                        loai: true,
                    },
                },
            },
        });
    }
    async layChiTiet(id) {
        const rule = await this.prisma.quyCheRule.findUnique({
            where: { id },
            include: {
                quyChe: {
                    include: {
                        phongBan: true,
                        bangLuongs: {
                            include: {
                                bangLuong: true,
                            },
                        },
                    },
                },
                khoanLuong: true,
            },
        });
        if (!rule) {
            throw new common_1.NotFoundException(`Không tìm thấy rule với ID: ${id}`);
        }
        const daChotLuong = rule.quyChe.bangLuongs.some((bl) => bl.bangLuong.trangThai !== client_1.TrangThaiBangLuong.NHAP);
        return {
            ...rule,
            daChotLuong,
            coDuocSua: !daChotLuong || rule.quyChe.trangThai === client_1.TrangThaiQuyChe.NHAP,
        };
    }
    async tao(dto) {
        const validateResult = this.validate({
            loaiRule: dto.loaiRule,
            dieuKienJson: dto.dieuKienJson,
            congThucJson: dto.congThucJson,
        });
        if (!validateResult.hopLe) {
            throw new common_1.BadRequestException({
                message: 'Rule không hợp lệ',
                loi: validateResult.danhSachLoi,
            });
        }
        const quyChe = await this.prisma.quyChe.findUnique({
            where: { id: dto.quyCheId },
            include: {
                bangLuongs: {
                    include: {
                        bangLuong: true,
                    },
                },
            },
        });
        if (!quyChe) {
            throw new common_1.NotFoundException(`Không tìm thấy quy chế với ID: ${dto.quyCheId}`);
        }
        const daChotLuong = quyChe.bangLuongs.some((bl) => bl.bangLuong.trangThai !== client_1.TrangThaiBangLuong.NHAP);
        if (daChotLuong && quyChe.trangThai !== client_1.TrangThaiQuyChe.NHAP) {
            throw new common_1.BadRequestException('Không thể thêm rule vào quy chế đã áp dụng cho bảng lương đã chốt');
        }
        const khoanLuong = await this.prisma.khoanLuong.findUnique({
            where: { id: dto.khoanLuongId },
        });
        if (!khoanLuong) {
            throw new common_1.NotFoundException(`Không tìm thấy khoản lương với ID: ${dto.khoanLuongId}`);
        }
        let thuTuUuTien = dto.thuTuUuTien;
        if (thuTuUuTien === undefined) {
            const ruleMax = await this.prisma.quyCheRule.findFirst({
                where: { quyCheId: dto.quyCheId },
                orderBy: { thuTuUuTien: 'desc' },
            });
            thuTuUuTien = (ruleMax?.thuTuUuTien || 0) + 10;
        }
        return this.prisma.quyCheRule.create({
            data: {
                quyCheId: dto.quyCheId,
                khoanLuongId: dto.khoanLuongId,
                tenRule: dto.tenRule,
                moTa: dto.moTa,
                loaiRule: dto.loaiRule,
                dieuKienJson: dto.dieuKienJson ? JSON.stringify(dto.dieuKienJson) : null,
                congThucJson: JSON.stringify(dto.congThucJson),
                thuTuUuTien,
                cheDoGop: dto.cheDoGop || client_1.CheDoGop.GHI_DE,
                choPhepChinhTay: dto.choPhepChinhTay ?? true,
                trangThai: true,
                nguoiTao: dto.nguoiTao,
            },
            include: {
                khoanLuong: true,
            },
        });
    }
    async capNhat(id, dto) {
        const rule = await this.layChiTiet(id);
        if (!rule.coDuocSua) {
            throw new common_1.BadRequestException('Không thể sửa rule thuộc quy chế đã áp dụng cho bảng lương đã chốt');
        }
        if (dto.congThucJson || dto.loaiRule) {
            const validateResult = this.validate({
                loaiRule: dto.loaiRule || rule.loaiRule,
                dieuKienJson: dto.dieuKienJson || (rule.dieuKienJson ? JSON.parse(rule.dieuKienJson) : undefined),
                congThucJson: dto.congThucJson || JSON.parse(rule.congThucJson),
            });
            if (!validateResult.hopLe) {
                throw new common_1.BadRequestException({
                    message: 'Rule không hợp lệ',
                    loi: validateResult.danhSachLoi,
                });
            }
        }
        return this.prisma.quyCheRule.update({
            where: { id },
            data: {
                tenRule: dto.tenRule,
                moTa: dto.moTa,
                loaiRule: dto.loaiRule,
                dieuKienJson: dto.dieuKienJson !== undefined
                    ? (dto.dieuKienJson ? JSON.stringify(dto.dieuKienJson) : null)
                    : undefined,
                congThucJson: dto.congThucJson
                    ? JSON.stringify(dto.congThucJson)
                    : undefined,
                thuTuUuTien: dto.thuTuUuTien,
                cheDoGop: dto.cheDoGop,
                choPhepChinhTay: dto.choPhepChinhTay,
                trangThai: dto.trangThai,
            },
            include: {
                khoanLuong: true,
            },
        });
    }
    async xoa(id) {
        const rule = await this.layChiTiet(id);
        if (!rule.coDuocSua) {
            throw new common_1.BadRequestException('Không thể xóa rule thuộc quy chế đã áp dụng cho bảng lương đã chốt');
        }
        return this.prisma.quyCheRule.update({
            where: { id },
            data: {
                trangThai: false,
            },
        });
    }
    async sapXep(quyCheId, dto) {
        const quyChe = await this.prisma.quyChe.findUnique({
            where: { id: quyCheId },
            include: {
                bangLuongs: {
                    include: {
                        bangLuong: true,
                    },
                },
            },
        });
        if (!quyChe) {
            throw new common_1.NotFoundException(`Không tìm thấy quy chế với ID: ${quyCheId}`);
        }
        const daChotLuong = quyChe.bangLuongs.some((bl) => bl.bangLuong.trangThai !== client_1.TrangThaiBangLuong.NHAP);
        if (daChotLuong && quyChe.trangThai !== client_1.TrangThaiQuyChe.NHAP) {
            throw new common_1.BadRequestException('Không thể sắp xếp rule của quy chế đã áp dụng cho bảng lương đã chốt');
        }
        const updates = dto.danhSachRuleId.map((ruleId, index) => this.prisma.quyCheRule.update({
            where: { id: ruleId },
            data: { thuTuUuTien: (index + 1) * 10 },
        }));
        await this.prisma.$transaction(updates);
        return this.layDanhSachTheoQuyChe(quyCheId);
    }
    validate(dto) {
        const loi = [];
        const canhBao = [];
        switch (dto.loaiRule) {
            case client_1.LoaiRule.CO_DINH:
                this.validateCoDinh(dto.congThucJson, loi);
                break;
            case client_1.LoaiRule.THEO_HE_SO:
                this.validateTheoHeSo(dto.congThucJson, loi);
                break;
            case client_1.LoaiRule.BAC_THANG:
                this.validateBacThang(dto.congThucJson, loi, canhBao);
                break;
            case client_1.LoaiRule.THEO_SU_KIEN:
                this.validateTheoSuKien(dto.congThucJson, loi);
                break;
            case client_1.LoaiRule.CONG_THUC:
                this.validateCongThuc(dto.congThucJson, loi);
                break;
        }
        if (dto.dieuKienJson) {
            this.validateDieuKien(dto.dieuKienJson, loi);
        }
        return {
            hopLe: loi.length === 0,
            danhSachLoi: loi,
            canhBao: canhBao.length > 0 ? canhBao : undefined,
        };
    }
    validateCoDinh(congThuc, loi) {
        const ct = congThuc;
        if (ct.soTien === undefined || ct.soTien === null) {
            loi.push('Thiếu trường "soTien" cho rule cố định');
        }
        else if (typeof ct.soTien !== 'number') {
            loi.push('"soTien" phải là số');
        }
    }
    validateTheoHeSo(congThuc, loi) {
        const ct = congThuc;
        if (!ct.base) {
            loi.push('Thiếu trường "base" (nguồn tính)');
        }
        if (ct.heSo === undefined || ct.heSo === null) {
            loi.push('Thiếu trường "heSo"');
        }
        else if (typeof ct.heSo !== 'number') {
            loi.push('"heSo" phải là số');
        }
    }
    validateBacThang(congThuc, loi, canhBao) {
        if (!congThuc.field) {
            loi.push('Thiếu trường "field" (trường dữ liệu để so sánh)');
        }
        if (!congThuc.bac || !Array.isArray(congThuc.bac)) {
            loi.push('Thiếu danh sách "bac" (bậc thang)');
            return;
        }
        if (congThuc.bac.length === 0) {
            loi.push('Danh sách bậc thang không được rỗng');
            return;
        }
        for (let i = 0; i < congThuc.bac.length; i++) {
            const bac = congThuc.bac[i];
            if (bac.from === undefined || bac.to === undefined) {
                loi.push(`Bậc ${i + 1}: Thiếu "from" hoặc "to"`);
            }
            else if (bac.from > bac.to) {
                loi.push(`Bậc ${i + 1}: "from" (${bac.from}) không được lớn hơn "to" (${bac.to})`);
            }
            if (bac.soTien === undefined && bac.heSo === undefined) {
                loi.push(`Bậc ${i + 1}: Thiếu "soTien" hoặc "heSo"`);
            }
        }
        for (let i = 0; i < congThuc.bac.length; i++) {
            for (let j = i + 1; j < congThuc.bac.length; j++) {
                const bac1 = congThuc.bac[i];
                const bac2 = congThuc.bac[j];
                if (bac1.from <= bac2.to && bac2.from <= bac1.to) {
                    canhBao.push(`Bậc ${i + 1} (${bac1.from}-${bac1.to}) chồng chéo với bậc ${j + 1} (${bac2.from}-${bac2.to})`);
                }
            }
        }
    }
    validateTheoSuKien(congThuc, loi) {
        if (!congThuc.maSuKien) {
            loi.push('Thiếu "maSuKien"');
        }
        if (!congThuc.cachTinh) {
            loi.push('Thiếu "cachTinh" (CO_DINH hoặc BAC_THANG)');
        }
        if (congThuc.cachTinh === 'CO_DINH' && !congThuc.soTienMoiLan) {
            loi.push('Thiếu "soTienMoiLan" cho cách tính cố định');
        }
        if (congThuc.cachTinh === 'BAC_THANG' && (!congThuc.bac || congThuc.bac.length === 0)) {
            loi.push('Thiếu "bac" cho cách tính bậc thang');
        }
    }
    validateCongThuc(congThuc, loi) {
        const ct = congThuc;
        if (!ct.bieuThuc) {
            loi.push('Thiếu "bieuThuc"');
            return;
        }
        const bienChoPhep = [
            'LUONG_CO_BAN', 'HE_SO_TRACH_NHIEM', 'CAP_TRACH_NHIEM',
            'CONG_CHUAN', 'CONG_THUC_TE', 'SO_GIO_OT', 'SO_GIO_OT_DEM',
            'SO_GIO_OT_CN', 'SO_GIO_OT_LE', 'SO_LAN_DI_MUON', 'SO_LAN_VE_SOM',
            'DOANH_SO', 'TY_LE_HOA_HONG', 'DIEM_KPI', 'HE_SO_KPI',
        ];
        const invalidChars = /[;`'"]/g;
        if (invalidChars.test(ct.bieuThuc)) {
            loi.push('Biểu thức chứa ký tự không hợp lệ');
        }
        const dangerousKeywords = ['eval', 'function', 'require', 'import', 'export', 'window', 'document', 'process', 'global'];
        for (const keyword of dangerousKeywords) {
            if (ct.bieuThuc.toLowerCase().includes(keyword)) {
                loi.push(`Biểu thức chứa từ khóa không được phép: ${keyword}`);
            }
        }
        const bienTrongBieuThuc = ct.bieuThuc.match(/[A-Z_]+/g) || [];
        for (const bien of bienTrongBieuThuc) {
            if (!bienChoPhep.includes(bien)) {
                loi.push(`Biến "${bien}" không nằm trong danh sách cho phép`);
            }
        }
    }
    validateDieuKien(dieuKien, loi) {
        const dk = dieuKien;
        if (dk.apDungCho) {
            const apDung = dk.apDungCho;
            if (apDung.vaiTro && !Array.isArray(apDung.vaiTro)) {
                loi.push('"vaiTro" phải là mảng');
            }
            if (apDung.capTrachNhiem && !Array.isArray(apDung.capTrachNhiem)) {
                loi.push('"capTrachNhiem" phải là mảng');
            }
            if (apDung.nhanVienIds && !Array.isArray(apDung.nhanVienIds)) {
                loi.push('"nhanVienIds" phải là mảng');
            }
        }
    }
    async preview(dto) {
        const quyChe = await this.prisma.quyChe.findUnique({
            where: { id: dto.quyCheId },
            include: {
                rules: {
                    where: { trangThai: true },
                    orderBy: { thuTuUuTien: 'asc' },
                    include: {
                        khoanLuong: true,
                    },
                },
            },
        });
        if (!quyChe) {
            throw new common_1.NotFoundException(`Không tìm thấy quy chế với ID: ${dto.quyCheId}`);
        }
        let duLieu = { ...dto.duLieuGiaLap };
        if (dto.nhanVienId) {
            const nhanVien = await this.prisma.nhanVien.findUnique({
                where: { id: dto.nhanVienId },
                include: {
                    nhanVienTrachNhiems: {
                        where: {
                            denNgay: null,
                        },
                        orderBy: { tuNgay: 'desc' },
                        take: 1,
                    },
                },
            });
            if (nhanVien) {
                duLieu = {
                    LUONG_CO_BAN: Number(nhanVien.luongCoBan),
                    CAP_TRACH_NHIEM: nhanVien.nhanVienTrachNhiems[0]?.capTrachNhiem || 0,
                    HE_SO_TRACH_NHIEM: Number(nhanVien.nhanVienTrachNhiems[0]?.heSoTrachNhiem || 1),
                    ...dto.duLieuGiaLap,
                };
            }
        }
        const chiTiet = [];
        const trace = [];
        let tongTien = 0;
        for (const rule of quyChe.rules) {
            try {
                const congThuc = JSON.parse(rule.congThucJson);
                const dieuKien = rule.dieuKienJson ? JSON.parse(rule.dieuKienJson) : null;
                const ketQua = await this.tinhToanRule(rule.loaiRule, congThuc, duLieu);
                if (ketQua.soTien !== 0) {
                    chiTiet.push({
                        khoanLuong: rule.khoanLuong.tenKhoan,
                        soTien: ketQua.soTien,
                        giaiThich: ketQua.giaiThich,
                    });
                    if (rule.khoanLuong.loai === 'THU_NHAP') {
                        tongTien += ketQua.soTien;
                    }
                    else {
                        tongTien -= ketQua.soTien;
                    }
                }
                trace.push({
                    ruleName: rule.tenRule,
                    input: duLieu,
                    output: ketQua.soTien,
                    message: ketQua.giaiThich,
                });
            }
            catch (error) {
                trace.push({
                    ruleName: rule.tenRule,
                    input: duLieu,
                    output: 0,
                    message: `Lỗi: ${error.message}`,
                });
            }
        }
        return {
            tongTien,
            chiTiet,
            trace,
        };
    }
    async tinhToanRule(loaiRule, congThuc, duLieu) {
        switch (loaiRule) {
            case client_1.LoaiRule.CO_DINH: {
                const ct = congThuc;
                return {
                    soTien: ct.soTien,
                    giaiThich: `Số tiền cố định: ${this.formatTien(ct.soTien)}`,
                };
            }
            case client_1.LoaiRule.THEO_HE_SO: {
                const ct = congThuc;
                const base = duLieu[ct.base] || 0;
                const soTien = Math.round(base * ct.heSo + (ct.congThem || 0));
                return {
                    soTien,
                    giaiThich: `${this.formatTien(base)} × ${ct.heSo}${ct.congThem ? ` + ${this.formatTien(ct.congThem)}` : ''} = ${this.formatTien(soTien)}`,
                };
            }
            case client_1.LoaiRule.BAC_THANG: {
                const ct = congThuc;
                const giaTriField = duLieu[ct.field.toUpperCase()] || duLieu[ct.field] || 0;
                const bacPhuHop = ct.bac.find((b) => giaTriField >= b.from && giaTriField <= b.to);
                if (!bacPhuHop) {
                    return {
                        soTien: 0,
                        giaiThich: `Không tìm thấy bậc phù hợp cho ${ct.field} = ${giaTriField}`,
                    };
                }
                const soTien = bacPhuHop.soTien || 0;
                return {
                    soTien,
                    giaiThich: `${ct.field} = ${giaTriField}, thuộc bậc ${bacPhuHop.from}-${bacPhuHop.to} → ${this.formatTien(soTien)}`,
                };
            }
            case client_1.LoaiRule.THEO_SU_KIEN: {
                const ct = congThuc;
                const soLan = duLieu[`SO_LAN_${ct.maSuKien}`] || duLieu[ct.maSuKien] || 0;
                if (soLan === 0) {
                    return {
                        soTien: 0,
                        giaiThich: `Không có sự kiện ${ct.maSuKien}`,
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
                    soTien,
                    giaiThich: `${ct.maSuKien}: ${soLan} lần → ${this.formatTien(soTien)}`,
                };
            }
            case client_1.LoaiRule.CONG_THUC: {
                const ct = congThuc;
                try {
                    const { safeEval } = await Promise.resolve().then(() => require('../../common/utils/safe-eval'));
                    const numericDuLieu = {};
                    for (const [ten, giaTri] of Object.entries(duLieu)) {
                        if (typeof giaTri === 'number') {
                            numericDuLieu[ten] = giaTri;
                        }
                    }
                    const soTien = Math.round(safeEval(ct.bieuThuc, numericDuLieu));
                    return {
                        soTien,
                        giaiThich: `${ct.bieuThuc} = ${this.formatTien(soTien)}`,
                    };
                }
                catch (error) {
                    return {
                        soTien: 0,
                        giaiThich: `Lỗi tính biểu thức: ${ct.bieuThuc} - ${error.message}`,
                    };
                }
            }
            default:
                return {
                    soTien: 0,
                    giaiThich: 'Loại rule không hỗ trợ',
                };
        }
    }
    formatTien(so) {
        return new Intl.NumberFormat('vi-VN').format(so) + 'đ';
    }
};
exports.QuyCheRuleService = QuyCheRuleService;
exports.QuyCheRuleService = QuyCheRuleService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], QuyCheRuleService);
//# sourceMappingURL=quy-che-rule.service.js.map