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
exports.TroLyAiService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const client_1 = require("@prisma/client");
const tro_ly_ai_dto_1 = require("./dto/tro-ly-ai.dto");
let TroLyAiService = class TroLyAiService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async layContext(phongBanId, quyCheId) {
        const phongBan = await this.prisma.phongBan.findUnique({
            where: { id: phongBanId },
            select: { id: true, maPhongBan: true, tenPhongBan: true },
        });
        if (!phongBan) {
            throw new common_1.NotFoundException(`Không tìm thấy phòng ban với ID: ${phongBanId}`);
        }
        const quyChe = await this.prisma.quyChe.findUnique({
            where: { id: quyCheId },
            select: { id: true, tenQuyChe: true, phienBan: true },
        });
        if (!quyChe) {
            throw new common_1.NotFoundException(`Không tìm thấy quy chế với ID: ${quyCheId}`);
        }
        const khoanLuongs = await this.prisma.khoanLuong.findMany({
            where: { trangThai: true },
            select: { id: true, maKhoan: true, tenKhoan: true, loai: true },
            orderBy: { thuTu: 'asc' },
        });
        const danhMucSuKien = await this.prisma.danhMucSuKien.findMany({
            where: { trangThai: true },
            select: { maSuKien: true, tenSuKien: true, loai: true, soTienMacDinh: true },
        });
        const trachNhiems = await this.prisma.nhanVienTrachNhiem.findMany({
            where: {
                phongBanId,
            },
            select: { capTrachNhiem: true },
            distinct: ['capTrachNhiem'],
        });
        return {
            phongBan,
            quyChe,
            khoanLuongs: khoanLuongs.map((k) => ({
                id: k.id,
                maKhoan: k.maKhoan,
                tenKhoan: k.tenKhoan,
                loai: k.loai,
            })),
            danhMucSuKien: danhMucSuKien.map((s) => ({
                maSuKien: s.maSuKien,
                tenSuKien: s.tenSuKien,
                loai: s.loai,
                soTienMacDinh: Number(s.soTienMacDinh),
            })),
            capTrachNhiems: trachNhiems.map((t) => t.capTrachNhiem),
        };
    }
    async goiYRule(dto, nguoiTaoId) {
        const context = await this.layContext(dto.phongBanId, dto.quyCheId);
        const ketQuaPhanTich = this.phanTichNoiDung(dto.noiDungTiengViet, context);
        const audit = await this.prisma.aiRuleAudit.create({
            data: {
                nguoiTaoId,
                phongBanId: dto.phongBanId,
                quyCheId: dto.quyCheId,
                promptGoc: dto.noiDungTiengViet,
                responseJson: JSON.stringify(ketQuaPhanTich),
                trangThai: client_1.TrangThaiAiAudit.DE_XUAT,
            },
        });
        return {
            ...ketQuaPhanTich,
            auditId: audit.id,
        };
    }
    phanTichNoiDung(noiDung, context) {
        const canLamRo = [];
        const giaiThich = [];
        const canhBao = [];
        const text = noiDung.toLowerCase().trim();
        const loaiRule = this.nhanDienLoaiRule(text);
        giaiThich.push(`Nhận diện loại rule: ${loaiRule || 'Chưa xác định'}`);
        if (!loaiRule) {
            canLamRo.push('Không thể xác định loại rule. Vui lòng mô tả rõ hơn cách tính.');
            return { hopLeSoBo: false, canLamRo };
        }
        const { khoanLuongMa, khoanLuongId, maSuKien } = this.nhanDienKhoanLuong(text, context);
        if (!khoanLuongMa && !maSuKien) {
            canLamRo.push('Không xác định được khoản lương hoặc sự kiện. Bạn muốn áp dụng cho khoản nào?');
            canLamRo.push(`Các khoản lương có sẵn: ${context.khoanLuongs.map(k => k.tenKhoan).join(', ')}`);
        }
        const congThucJson = this.parseCongThuc(text, loaiRule, maSuKien, context);
        if (!congThucJson) {
            canLamRo.push('Không thể parse được công thức tính. Vui lòng mô tả rõ hơn.');
            return { hopLeSoBo: false, canLamRo };
        }
        const dieuKienJson = this.parseDieuKien(text, context);
        const tenRule = this.taoTenRule(text, loaiRule, khoanLuongMa || maSuKien || '');
        if (canLamRo.length > 0) {
            return { hopLeSoBo: false, canLamRo };
        }
        const ruleDeXuat = {
            tenRule,
            khoanLuongMa: khoanLuongMa || maSuKien || 'KHAC',
            khoanLuongId,
            loaiRule,
            thuTuUuTien: 10,
            cheDoGop: this.xacDinhCheDoGop(loaiRule),
            choPhepChinhTay: true,
            dieuKienJson,
            congThucJson,
        };
        giaiThich.push(`Tạo rule: ${tenRule}`);
        if (maSuKien) {
            giaiThich.push(`Sự kiện áp dụng: ${maSuKien}`);
        }
        return {
            hopLeSoBo: true,
            canLamRo: [],
            tomTatRule: tenRule,
            ruleDeXuat,
            giaiThich,
            canhBao: canhBao.length > 0 ? canhBao : undefined,
        };
    }
    nhanDienLoaiRule(text) {
        for (const pattern of tro_ly_ai_dto_1.PATTERN_LOAI_RULE.THEO_SU_KIEN) {
            if (pattern.test(text)) {
                for (const bacThangPattern of tro_ly_ai_dto_1.PATTERN_LOAI_RULE.BAC_THANG) {
                    if (bacThangPattern.test(text)) {
                        return client_1.LoaiRule.THEO_SU_KIEN;
                    }
                }
                return client_1.LoaiRule.THEO_SU_KIEN;
            }
        }
        for (const pattern of tro_ly_ai_dto_1.PATTERN_LOAI_RULE.BAC_THANG) {
            if (pattern.test(text)) {
                return client_1.LoaiRule.BAC_THANG;
            }
        }
        for (const pattern of tro_ly_ai_dto_1.PATTERN_LOAI_RULE.THEO_HE_SO) {
            if (pattern.test(text)) {
                return client_1.LoaiRule.THEO_HE_SO;
            }
        }
        for (const pattern of tro_ly_ai_dto_1.PATTERN_LOAI_RULE.CONG_THUC) {
            if (pattern.test(text)) {
                return client_1.LoaiRule.CONG_THUC;
            }
        }
        for (const pattern of tro_ly_ai_dto_1.PATTERN_LOAI_RULE.CO_DINH) {
            if (pattern.test(text)) {
                return client_1.LoaiRule.CO_DINH;
            }
        }
        if (/\d+\s*(k|tr|nghìn|triệu|đồng)?/i.test(text)) {
            return client_1.LoaiRule.CO_DINH;
        }
        return null;
    }
    nhanDienKhoanLuong(text, context) {
        for (const [tuKhoa, mapping] of Object.entries(tro_ly_ai_dto_1.TU_DIEN_ALIAS)) {
            if (text.includes(tuKhoa)) {
                if (mapping.maSuKien) {
                    const suKien = context.danhMucSuKien.find((s) => s.maSuKien === mapping.maSuKien);
                    if (suKien) {
                        return { maSuKien: suKien.maSuKien };
                    }
                }
                if (mapping.maKhoan) {
                    const khoan = context.khoanLuongs.find((k) => k.maKhoan === mapping.maKhoan);
                    if (khoan) {
                        return { khoanLuongMa: khoan.maKhoan, khoanLuongId: khoan.id };
                    }
                    return { khoanLuongMa: mapping.maKhoan };
                }
            }
        }
        for (const suKien of context.danhMucSuKien) {
            if (text.includes(suKien.tenSuKien.toLowerCase()) ||
                text.includes(suKien.maSuKien.toLowerCase().replace(/_/g, ' '))) {
                return { maSuKien: suKien.maSuKien };
            }
        }
        for (const khoan of context.khoanLuongs) {
            if (text.includes(khoan.tenKhoan.toLowerCase()) ||
                text.includes(khoan.maKhoan.toLowerCase().replace(/_/g, ' '))) {
                return { khoanLuongMa: khoan.maKhoan, khoanLuongId: khoan.id };
            }
        }
        if (text.includes('phạt') || text.includes('trừ')) {
            return { khoanLuongMa: 'PHAT_KHAC' };
        }
        if (text.includes('thưởng') || text.includes('bonus')) {
            return { khoanLuongMa: 'THUONG_KHAC' };
        }
        if (text.includes('trách nhiệm') || text.includes('tn')) {
            return { khoanLuongMa: 'TRACH_NHIEM' };
        }
        return {};
    }
    parseCongThuc(text, loaiRule, maSuKien, context) {
        switch (loaiRule) {
            case client_1.LoaiRule.CO_DINH:
                return this.parseCongThucCoDinh(text);
            case client_1.LoaiRule.THEO_HE_SO:
                return this.parseCongThucTheoHeSo(text);
            case client_1.LoaiRule.BAC_THANG:
                return this.parseCongThucBacThang(text);
            case client_1.LoaiRule.THEO_SU_KIEN:
                return this.parseCongThucTheoSuKien(text, maSuKien, context);
            case client_1.LoaiRule.CONG_THUC:
                return this.parseCongThucBieuThuc(text);
            default:
                return null;
        }
    }
    parseSoTien(text) {
        const patterns = [
            { regex: /(\d+(?:\.\d+)?)\s*tr(?:iệu)?/i, multiplier: 1000000 },
            { regex: /(\d+(?:\.\d+)?)\s*k/i, multiplier: 1000 },
            { regex: /(\d+(?:\.\d+)?)\s*nghìn/i, multiplier: 1000 },
            { regex: /(\d+(?:\.\d+)?)\s*(?:đồng|vnđ)?$/i, multiplier: 1 },
        ];
        for (const { regex, multiplier } of patterns) {
            const match = text.match(regex);
            if (match) {
                return parseFloat(match[1]) * multiplier;
            }
        }
        const numMatch = text.match(/(\d+(?:,\d{3})*(?:\.\d+)?)/);
        if (numMatch) {
            return parseFloat(numMatch[1].replace(/,/g, ''));
        }
        return null;
    }
    parseCongThucCoDinh(text) {
        const soTien = this.parseSoTien(text);
        if (soTien !== null) {
            return { soTien };
        }
        return null;
    }
    parseCongThucTheoHeSo(text) {
        const match = text.match(/(.+?)\s*[\*x]\s*(\d+(?:\.\d+)?)/i);
        if (match) {
            const basePart = match[1].toLowerCase().trim();
            const heSo = parseFloat(match[2]);
            let base = 'LUONG_CO_BAN';
            if (basePart.includes('lương cơ bản') || basePart.includes('lcb')) {
                base = 'LUONG_CO_BAN';
            }
            else if (basePart.includes('trách nhiệm')) {
                base = 'HE_SO_TRACH_NHIEM';
            }
            const congThemMatch = text.match(/\+\s*(\d+(?:\.\d+)?)\s*(k|tr)?/i);
            let congThem;
            if (congThemMatch) {
                congThem = this.parseSoTien(congThemMatch[0]) ?? undefined;
            }
            return { base, heSo, congThem };
        }
        return null;
    }
    parseCongThucBacThang(text) {
        const bac = [];
        let field = 'cap_trach_nhiem';
        if (text.includes('cấp') || text.includes('bậc')) {
            field = 'cap_trach_nhiem';
        }
        else if (text.includes('năm') || text.includes('thâm niên')) {
            field = 'so_nam_lam_viec';
        }
        else if (text.includes('lần')) {
            field = 'so_lan';
        }
        const pattern1 = /cấp\s*(\d+)\s*[:\-]?\s*(\d+(?:\.\d+)?)\s*(k|tr|nghìn|triệu)?/gi;
        let match1;
        while ((match1 = pattern1.exec(text)) !== null) {
            const cap = parseInt(match1[1]);
            const soTien = this.parseSoTien(`${match1[2]}${match1[3] || ''}`);
            if (soTien) {
                bac.push({ from: cap, to: cap, soTien });
            }
        }
        const pattern2 = /(\d+)\s*[–\-]\s*(\d+)\s*(?:lần)?\s*[:\-]?\s*(\d+(?:\.\d+)?)\s*(k|tr|nghìn|triệu)?/gi;
        let match2;
        while ((match2 = pattern2.exec(text)) !== null) {
            const from = parseInt(match2[1]);
            const to = parseInt(match2[2]);
            const soTien = this.parseSoTien(`${match2[3]}${match2[4] || ''}`);
            if (soTien) {
                bac.push({ from, to, soTien });
            }
        }
        const pattern3 = /từ\s*(?:lần\s*)?(\d+)\s*(?:trở lên|trở đi)?\s*[:\-]?\s*(\d+(?:\.\d+)?)\s*(k|tr|nghìn|triệu)?/gi;
        let match3;
        while ((match3 = pattern3.exec(text)) !== null) {
            const from = parseInt(match3[1]);
            const soTien = this.parseSoTien(`${match3[2]}${match3[3] || ''}`);
            if (soTien) {
                bac.push({ from, to: 999, soTien });
            }
        }
        if (bac.length > 0) {
            bac.sort((a, b) => a.from - b.from);
            return { field, bac };
        }
        return null;
    }
    parseCongThucTheoSuKien(text, maSuKien, context) {
        let suKienMa = maSuKien;
        if (!suKienMa) {
            for (const sk of context.danhMucSuKien) {
                if (text.includes(sk.tenSuKien.toLowerCase())) {
                    suKienMa = sk.maSuKien;
                    break;
                }
            }
        }
        if (!suKienMa) {
            if (text.includes('đi trễ') || text.includes('muộn')) {
                suKienMa = 'DI_TRE';
            }
            else if (text.includes('về sớm')) {
                suKienMa = 'VE_SOM';
            }
            else {
                suKienMa = 'KHAC';
            }
        }
        const bacThang = this.parseCongThucBacThang(text);
        if (bacThang && bacThang.bac.length > 0) {
            return {
                maSuKien: suKienMa,
                cachTinh: 'BAC_THANG',
                bac: bacThang.bac.map((b) => ({
                    from: b.from,
                    to: b.to,
                    soTienMoiLan: b.soTien,
                })),
            };
        }
        const soTien = this.parseSoTien(text);
        if (soTien) {
            return {
                maSuKien: suKienMa,
                cachTinh: 'CO_DINH',
                soTienMoiLan: soTien,
            };
        }
        const suKienInfo = context.danhMucSuKien.find((s) => s.maSuKien === suKienMa);
        if (suKienInfo) {
            return {
                maSuKien: suKienMa,
                cachTinh: 'CO_DINH',
                soTienMoiLan: suKienInfo.soTienMacDinh,
            };
        }
        return null;
    }
    parseCongThucBieuThuc(text) {
        const match = text.match(/=\s*(.+)/);
        if (match) {
            let bieuThuc = match[1].trim();
            bieuThuc = bieuThuc
                .replace(/lương cơ bản|lcb/gi, 'LUONG_CO_BAN')
                .replace(/hệ số trách nhiệm|hstn/gi, 'HE_SO_TRACH_NHIEM')
                .replace(/cấp trách nhiệm/gi, 'CAP_TRACH_NHIEM');
            return { bieuThuc };
        }
        return null;
    }
    parseDieuKien(text, context) {
        return {
            apDungCho: {
                tatCa: true,
            },
        };
    }
    taoTenRule(text, loaiRule, khoanMa) {
        const tenCoBan = text.length > 50 ? text.substring(0, 47) + '...' : text;
        const tenFormatted = tenCoBan
            .split(' ')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
        return tenFormatted;
    }
    xacDinhCheDoGop(loaiRule) {
        if (loaiRule === client_1.LoaiRule.THEO_SU_KIEN) {
            return client_1.CheDoGop.CONG_DON;
        }
        return client_1.CheDoGop.GHI_DE;
    }
    async apDungRule(dto, quyCheId, nguoiTaoId) {
        const audit = await this.prisma.aiRuleAudit.findUnique({
            where: { id: dto.auditId },
        });
        if (!audit) {
            throw new common_1.NotFoundException(`Không tìm thấy đề xuất với ID: ${dto.auditId}`);
        }
        let ruleDeXuat;
        if (dto.ruleDeXuat) {
            ruleDeXuat = dto.ruleDeXuat;
        }
        else {
            const response = JSON.parse(audit.responseJson);
            if (!response.ruleDeXuat) {
                throw new common_1.BadRequestException('Đề xuất không có rule hợp lệ');
            }
            ruleDeXuat = response.ruleDeXuat;
        }
        let khoanLuongId = ruleDeXuat.khoanLuongId;
        if (!khoanLuongId) {
            const khoanLuong = await this.prisma.khoanLuong.findFirst({
                where: { maKhoan: ruleDeXuat.khoanLuongMa },
            });
            if (khoanLuong) {
                khoanLuongId = khoanLuong.id;
            }
            else {
                throw new common_1.BadRequestException(`Không tìm thấy khoản lương với mã: ${ruleDeXuat.khoanLuongMa}`);
            }
        }
        const rule = await this.prisma.quyCheRule.create({
            data: {
                quyCheId,
                khoanLuongId,
                tenRule: ruleDeXuat.tenRule,
                loaiRule: ruleDeXuat.loaiRule,
                dieuKienJson: ruleDeXuat.dieuKienJson
                    ? JSON.stringify(ruleDeXuat.dieuKienJson)
                    : null,
                congThucJson: JSON.stringify(ruleDeXuat.congThucJson),
                thuTuUuTien: ruleDeXuat.thuTuUuTien,
                cheDoGop: ruleDeXuat.cheDoGop,
                choPhepChinhTay: ruleDeXuat.choPhepChinhTay,
                nguoiTao: nguoiTaoId ? String(nguoiTaoId) : null,
            },
            include: {
                khoanLuong: true,
            },
        });
        await this.prisma.aiRuleAudit.update({
            where: { id: dto.auditId },
            data: {
                trangThai: client_1.TrangThaiAiAudit.DA_AP_DUNG,
                ruleApDungId: rule.id,
            },
        });
        return rule;
    }
    async huyDeXuat(auditId) {
        return this.prisma.aiRuleAudit.update({
            where: { id: auditId },
            data: {
                trangThai: client_1.TrangThaiAiAudit.HUY,
            },
        });
    }
    async lichSuDeXuat(quyCheId) {
        return this.prisma.aiRuleAudit.findMany({
            where: { quyCheId },
            orderBy: { taoLuc: 'desc' },
            take: 50,
            include: {
                nguoiTao: {
                    select: { id: true, hoTen: true },
                },
                rule: {
                    select: { id: true, tenRule: true },
                },
            },
        });
    }
};
exports.TroLyAiService = TroLyAiService;
exports.TroLyAiService = TroLyAiService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TroLyAiService);
//# sourceMappingURL=tro-ly-ai.service.js.map