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
var PayrollSyncService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayrollSyncService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const library_1 = require("@prisma/client/runtime/library");
const payroll_sync_dto_1 = require("./payroll-sync.dto");
let PayrollSyncService = PayrollSyncService_1 = class PayrollSyncService {
    constructor(prisma) {
        this.prisma = prisma;
        this.logger = new common_1.Logger(PayrollSyncService_1.name);
        this.progressMap = new Map();
    }
    async syncPayroll(dto) {
        const { bangLuongId, forceRecalc = false, dryRun = false } = dto;
        const bangLuong = await this.prisma.bangLuong.findUnique({
            where: { id: bangLuongId },
            include: { phongBan: true },
        });
        if (!bangLuong) {
            throw new common_1.BadRequestException('Không tìm thấy bảng lương');
        }
        if (bangLuong.trangThai === 'KHOA') {
            throw new common_1.BadRequestException('Bảng lương đã khóa, không thể sync');
        }
        const progress = {
            bangLuongId,
            currentStep: payroll_sync_dto_1.SyncStep.CHUA_BAT_DAU,
            steps: this.initSteps(),
            startedAt: new Date(),
        };
        this.progressMap.set(bangLuongId, progress);
        try {
            await this.runStep(progress, payroll_sync_dto_1.SyncStep.SYNC_NGAY_CONG, async () => {
                return this.syncNgayCong(bangLuong, forceRecalc);
            });
            await this.runStep(progress, payroll_sync_dto_1.SyncStep.SYNC_NGHI_PHEP, async () => {
                return this.syncNghiPhep(bangLuong);
            });
            await this.runStep(progress, payroll_sync_dto_1.SyncStep.SYNC_OT, async () => {
                return this.syncOT(bangLuong);
            });
            await this.runStep(progress, payroll_sync_dto_1.SyncStep.SYNC_YEU_CAU, async () => {
                return this.syncYeuCau(bangLuong);
            });
            await this.runStep(progress, payroll_sync_dto_1.SyncStep.SYNC_KPI, async () => {
                return this.syncKPI(bangLuong);
            });
            if (!dryRun) {
                await this.runStep(progress, payroll_sync_dto_1.SyncStep.TINH_LUONG, async () => {
                    return this.triggerRuleEngine(bangLuongId);
                });
            }
            progress.currentStep = payroll_sync_dto_1.SyncStep.HOAN_THANH;
            progress.completedAt = new Date();
            progress.summary = await this.buildSummary(bangLuongId);
            this.logger.log(`Sync payroll #${bangLuongId} completed successfully`);
        }
        catch (error) {
            progress.currentStep = payroll_sync_dto_1.SyncStep.LOI;
            progress.error = error.message;
            this.logger.error(`Sync payroll #${bangLuongId} failed: ${error.message}`);
            throw error;
        }
        return progress;
    }
    getProgress(bangLuongId) {
        return this.progressMap.get(bangLuongId) || null;
    }
    async syncNgayCong(bangLuong, forceRecalc) {
        const { id: bangLuongId, thang, nam, phongBanId } = bangLuong;
        const nhanViens = await this.prisma.nhanVien.findMany({
            where: {
                phongBanId,
                trangThai: 'DANG_LAM',
            },
        });
        const ngayDau = new Date(nam, thang - 1, 1);
        const ngayCuoi = new Date(nam, thang, 0);
        const ngayCongLyThuyet = this.tinhNgayCongLyThuyet(thang, nam);
        const records = [];
        for (const nv of nhanViens) {
            const chamCongs = await this.prisma.chiTietChamCong.findMany({
                where: {
                    nhanVienId: nv.id,
                    ngay: { gte: ngayDau, lte: ngayCuoi },
                },
            });
            let soCongThucTe = 0;
            let soNgayNghiPhep = 0;
            let soNgayNghiKhongLuong = 0;
            let soNgayNghiCoLuong = 0;
            let tongGioOT = 0;
            for (const cc of chamCongs) {
                switch (cc.trangThai) {
                    case 'DI_LAM':
                        soCongThucTe++;
                        break;
                    case 'NGHI_PHEP':
                        soNgayNghiPhep++;
                        break;
                    case 'NGHI_KHONG_LUONG':
                        soNgayNghiKhongLuong++;
                        break;
                    case 'NGHI_BENH':
                        soNgayNghiCoLuong++;
                        break;
                }
                tongGioOT += Number(cc.soGioOT || 0);
            }
            records.push({
                bangLuongId,
                nhanVienId: nv.id,
                ngayCongLyThuyet: new library_1.Decimal(ngayCongLyThuyet),
                soCongThucTe: new library_1.Decimal(soCongThucTe),
                soNgayNghiPhep: new library_1.Decimal(soNgayNghiPhep),
                soNgayNghiKhongPhep: new library_1.Decimal(0),
                soNgayNghiCoPhep: new library_1.Decimal(soNgayNghiPhep),
                soNgayNghiCoLuong: new library_1.Decimal(soNgayNghiCoLuong),
                soNgayNghiKhongLuong: new library_1.Decimal(soNgayNghiKhongLuong),
                ngayCongDieuChinh: null,
            });
        }
        if (forceRecalc) {
            await this.prisma.ngayCongBangLuong.deleteMany({
                where: { bangLuongId },
            });
        }
        for (const r of records) {
            await this.prisma.ngayCongBangLuong.upsert({
                where: {
                    bangLuongId_nhanVienId: {
                        bangLuongId: r.bangLuongId,
                        nhanVienId: r.nhanVienId,
                    },
                },
                create: r,
                update: {
                    soCongThucTe: r.soCongThucTe,
                    soNgayNghiPhep: r.soNgayNghiPhep,
                    soNgayNghiCoPhep: r.soNgayNghiCoPhep,
                    soNgayNghiCoLuong: r.soNgayNghiCoLuong,
                    soNgayNghiKhongLuong: r.soNgayNghiKhongLuong,
                    ngayCapNhat: new Date(),
                },
            });
        }
        return records.length;
    }
    async syncNghiPhep(bangLuong) {
        const { thang, nam, phongBanId } = bangLuong;
        const ngayDau = new Date(nam, thang - 1, 1);
        const ngayCuoi = new Date(nam, thang, 0);
        const dons = await this.prisma.donNghiPhep.findMany({
            where: {
                phongBanId,
                trangThai: 'DA_DUYET',
                OR: [
                    { tuNgay: { gte: ngayDau, lte: ngayCuoi } },
                    { denNgay: { gte: ngayDau, lte: ngayCuoi } },
                    {
                        AND: [
                            { tuNgay: { lte: ngayDau } },
                            { denNgay: { gte: ngayCuoi } },
                        ],
                    },
                ],
            },
            include: {
                loaiNghi: true,
            },
        });
        return dons.length;
    }
    async syncOT(bangLuong) {
        const { thang, nam, phongBanId } = bangLuong;
        const ngayDau = new Date(nam, thang - 1, 1);
        const ngayCuoi = new Date(nam, thang, 0);
        const yeuCaus = await this.prisma.donYeuCau.findMany({
            where: {
                phongBanId,
                loaiYeuCau: { maLoai: 'OT' },
                trangThai: 'DA_DUYET',
                ngayYeuCau: { gte: ngayDau, lte: ngayCuoi },
            },
        });
        return yeuCaus.length;
    }
    async syncYeuCau(bangLuong) {
        const { thang, nam, phongBanId } = bangLuong;
        const ngayDau = new Date(nam, thang - 1, 1);
        const ngayCuoi = new Date(nam, thang, 0);
        const count = await this.prisma.donYeuCau.count({
            where: {
                phongBanId,
                loaiYeuCau: { maLoai: { in: ['TRE_GIO', 'VE_SOM', 'CONG_TAC', 'LAM_TU_XA'] } },
                trangThai: 'DA_DUYET',
                ngayYeuCau: { gte: ngayDau, lte: ngayCuoi },
            },
        });
        return count;
    }
    async syncKPI(bangLuong) {
        const { thang, nam, phongBanId } = bangLuong;
        const kyDanhGia = await this.prisma.kyDanhGiaKPI.findFirst({
            where: {
                thang,
                nam,
                trangThai: 'HOAN_THANH',
            },
        });
        if (!kyDanhGia)
            return 0;
        const count = await this.prisma.danhGiaKPINhanVien.count({
            where: {
                kyDanhGiaId: kyDanhGia.id,
            },
        });
        return count;
    }
    async triggerRuleEngine(bangLuongId) {
        await this.prisma.bangLuong.update({
            where: { id: bangLuongId },
            data: {
                ngayCapNhat: new Date(),
            },
        });
        const count = await this.prisma.chiTietBangLuong.count({
            where: { bangLuongId },
        });
        return count;
    }
    async getEnhancedRuleTrace(query) {
        const { bangLuongId, nhanVienId, khoanLuongId } = query;
        const where = { bangLuongId };
        if (nhanVienId)
            where.nhanVienId = nhanVienId;
        if (khoanLuongId)
            where.khoanLuongId = khoanLuongId;
        const traces = await this.prisma.ruleTrace.findMany({
            where,
            include: {
                nhanVien: { select: { id: true, hoTen: true, maNhanVien: true } },
                quyChe: { select: { id: true, tenQuyChe: true } },
                khoanLuong: { select: { id: true, tenKhoan: true, maKhoan: true } },
            },
            orderBy: [{ nhanVienId: 'asc' }, { khoanLuongId: 'asc' }],
        });
        const bangLuong = await this.prisma.bangLuong.findUnique({
            where: { id: bangLuongId },
        });
        return traces.map((t) => this.enhanceTrace(t, bangLuong));
    }
    enhanceTrace(trace, bangLuong) {
        const inputParsed = JSON.parse(trace.inputJson || '{}');
        const nguonDuLieu = [];
        if (inputParsed.ngayCong !== undefined || inputParsed.soCongThucTe !== undefined) {
            nguonDuLieu.push({
                nguon: payroll_sync_dto_1.NguonDuLieu.CHAM_CONG,
                label: 'Chấm công',
                chiTiet: `Ngày công: ${inputParsed.ngayCong || inputParsed.soCongThucTe || 0}`,
                link: `/cham-cong?thang=${bangLuong?.thang}&nam=${bangLuong?.nam}&nv=${trace.nhanVienId}`,
            });
        }
        if (inputParsed.soGioOT !== undefined && inputParsed.soGioOT > 0) {
            nguonDuLieu.push({
                nguon: payroll_sync_dto_1.NguonDuLieu.YEU_CAU,
                label: 'Yêu cầu OT',
                chiTiet: `Giờ OT: ${inputParsed.soGioOT}h`,
                soLuong: inputParsed.soGioOT,
                link: `/yeu-cau/duyet?loai=OT`,
            });
        }
        if (inputParsed.soNgayNghiPhep !== undefined && inputParsed.soNgayNghiPhep > 0) {
            nguonDuLieu.push({
                nguon: payroll_sync_dto_1.NguonDuLieu.NGHI_PHEP,
                label: 'Nghỉ phép',
                chiTiet: `Số ngày: ${inputParsed.soNgayNghiPhep}`,
                soLuong: inputParsed.soNgayNghiPhep,
                link: `/nghi-phep/lich`,
            });
        }
        if (inputParsed.diemKPI !== undefined) {
            nguonDuLieu.push({
                nguon: payroll_sync_dto_1.NguonDuLieu.KPI,
                label: 'KPI',
                chiTiet: `Điểm: ${inputParsed.diemKPI}`,
                link: `/kpi/ky-danh-gia`,
            });
        }
        if (inputParsed.tongPhutDiTre !== undefined && inputParsed.tongPhutDiTre > 0) {
            nguonDuLieu.push({
                nguon: payroll_sync_dto_1.NguonDuLieu.CHAM_CONG,
                label: 'Đi trễ',
                chiTiet: `${inputParsed.tongPhutDiTre} phút`,
                soLuong: inputParsed.tongPhutDiTre,
            });
        }
        if (nguonDuLieu.length === 0) {
            nguonDuLieu.push({
                nguon: payroll_sync_dto_1.NguonDuLieu.RULE_ENGINE,
                label: 'Quy chế lương',
                chiTiet: trace.messageGiaiThich,
            });
        }
        return {
            id: trace.id,
            bangLuongId: trace.bangLuongId,
            nhanVienId: trace.nhanVienId,
            nhanVien: trace.nhanVien,
            quyCheId: trace.quyCheId,
            quyChe: trace.quyChe,
            quyCheRuleId: trace.quyCheRuleId,
            khoanLuongId: trace.khoanLuongId,
            khoanLuong: trace.khoanLuong,
            inputJson: trace.inputJson,
            inputParsed,
            outputSoTien: Number(trace.outputSoTien),
            messageGiaiThich: trace.messageGiaiThich,
            nguonDuLieu,
            taoLuc: trace.taoLuc,
        };
    }
    async getPipelineStatus(thang, nam) {
        const phongBans = await this.prisma.phongBan.findMany({
            where: { trangThai: 'ACTIVE' },
        });
        const bangLuongs = await this.prisma.bangLuong.findMany({
            where: { thang, nam },
        });
        const bangLuongMap = new Map(bangLuongs.map((bl) => [bl.phongBanId, bl]));
        const phongBanStatuses = await Promise.all(phongBans.map(async (pb) => {
            const bl = bangLuongMap.get(pb.id);
            let tongLuong = 0;
            if (bl) {
                const sum = await this.prisma.chiTietBangLuong.aggregate({
                    where: { bangLuongId: bl.id },
                    _sum: { soTien: true },
                });
                tongLuong = Number(sum._sum.soTien || 0);
            }
            const tongNhanVien = await this.prisma.nhanVien.count({
                where: { phongBanId: pb.id, trangThai: 'DANG_LAM' },
            });
            return {
                phongBanId: pb.id,
                tenPhongBan: pb.tenPhongBan,
                bangLuongId: bl?.id,
                trangThai: bl ? this.mapTrangThai(bl.trangThai) : 'CHUA_TAO',
                lastSyncAt: bl?.ngayCapNhat,
                tongNhanVien,
                tongLuong,
            };
        }));
        const tongLuongToanCongTy = phongBanStatuses.reduce((s, p) => s + p.tongLuong, 0);
        const canhBao = await this.buildWarnings(thang, nam);
        return {
            thang,
            nam,
            phongBans: phongBanStatuses,
            tongLuongToanCongTy,
            canhBao,
        };
    }
    initSteps() {
        return [
            { step: payroll_sync_dto_1.SyncStep.SYNC_NGAY_CONG, label: 'Đồng bộ ngày công', status: 'pending' },
            { step: payroll_sync_dto_1.SyncStep.SYNC_NGHI_PHEP, label: 'Đồng bộ nghỉ phép', status: 'pending' },
            { step: payroll_sync_dto_1.SyncStep.SYNC_OT, label: 'Đồng bộ OT', status: 'pending' },
            { step: payroll_sync_dto_1.SyncStep.SYNC_YEU_CAU, label: 'Đồng bộ yêu cầu', status: 'pending' },
            { step: payroll_sync_dto_1.SyncStep.SYNC_KPI, label: 'Đồng bộ KPI', status: 'pending' },
            { step: payroll_sync_dto_1.SyncStep.TINH_LUONG, label: 'Tính lương', status: 'pending' },
        ];
    }
    async runStep(progress, step, fn) {
        const stepInfo = progress.steps.find((s) => s.step === step);
        if (!stepInfo)
            return;
        progress.currentStep = step;
        stepInfo.status = 'running';
        stepInfo.startedAt = new Date();
        try {
            const count = await fn();
            stepInfo.status = 'completed';
            stepInfo.recordsProcessed = count;
            stepInfo.completedAt = new Date();
        }
        catch (error) {
            stepInfo.status = 'error';
            stepInfo.error = error.message;
            throw error;
        }
    }
    async buildSummary(bangLuongId) {
        const ngayCongs = await this.prisma.ngayCongBangLuong.findMany({
            where: { bangLuongId },
        });
        const chiTiets = await this.prisma.chiTietBangLuong.findMany({
            where: { bangLuongId },
            include: { nhanVien: { select: { id: true, hoTen: true, maNhanVien: true } } },
        });
        const tongLuong = chiTiets.reduce((s, c) => s + Number(c.soTien), 0);
        return {
            tongNhanVien: ngayCongs.length,
            tongNgayCong: ngayCongs.reduce((s, n) => s + Number(n.soCongThucTe), 0),
            tongGioOT: 0,
            tongNgayNghiPhep: ngayCongs.reduce((s, n) => s + Number(n.soNgayNghiPhep), 0),
            tongNgayNghiKhongLuong: ngayCongs.reduce((s, n) => s + Number(n.soNgayNghiKhongLuong), 0),
            tongSoTienTruocSync: 0,
            tongSoTienSauSync: tongLuong,
            chenhLech: tongLuong,
            chiTietThayDoi: [],
        };
    }
    async buildWarnings(thang, nam) {
        const warnings = [];
        const ngayDau = new Date(nam, thang - 1, 1);
        const ngayCuoi = new Date(nam, thang, 0);
        const nhanVienCoChamCong = await this.prisma.chiTietChamCong.findMany({
            where: {
                ngay: { gte: ngayDau, lte: ngayCuoi },
            },
            select: { nhanVienId: true },
            distinct: ['nhanVienId'],
        });
        const nhanVienCoChamCongIds = nhanVienCoChamCong.map(c => c.nhanVienId);
        const nhanViensThieuChamCong = await this.prisma.nhanVien.findMany({
            where: {
                trangThai: 'DANG_LAM',
                id: { notIn: nhanVienCoChamCongIds },
            },
            select: { id: true, hoTen: true, phongBanId: true },
            take: 10,
        });
        for (const nv of nhanViensThieuChamCong) {
            warnings.push({
                loai: 'THIEU_CHAM_CONG',
                nhanVienId: nv.id,
                hoTen: nv.hoTen,
                phongBanId: nv.phongBanId,
                moTa: `${nv.hoTen} không có dữ liệu chấm công tháng ${thang}/${nam}`,
            });
        }
        const yeuCauChuaDuyet = await this.prisma.donYeuCau.count({
            where: {
                trangThai: 'CHO_DUYET_1',
                ngayYeuCau: { gte: ngayDau, lte: ngayCuoi },
            },
        });
        if (yeuCauChuaDuyet > 0) {
            warnings.push({
                loai: 'YEU_CAU_CHUA_DUYET',
                moTa: `Có ${yeuCauChuaDuyet} yêu cầu (OT/Trễ/Sớm) chưa duyệt trong tháng`,
            });
        }
        return warnings;
    }
    tinhNgayCongLyThuyet(thang, nam) {
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
    mapTrangThai(trangThai) {
        switch (trangThai) {
            case 'NHAP': return 'NHAP';
            case 'DA_CHOT': return 'DA_CHOT';
            case 'KHOA': return 'KHOA';
            default: return 'NHAP';
        }
    }
};
exports.PayrollSyncService = PayrollSyncService;
exports.PayrollSyncService = PayrollSyncService = PayrollSyncService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PayrollSyncService);
//# sourceMappingURL=payroll-sync.service.js.map