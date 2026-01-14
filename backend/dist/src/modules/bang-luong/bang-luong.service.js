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
var BangLuongService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BangLuongService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const tinh_luong_service_1 = require("./tinh-luong.service");
const ngay_cong_service_1 = require("./ngay-cong.service");
const phu_cap_nhan_vien_service_1 = require("../phu-cap-nhan-vien/phu-cap-nhan-vien.service");
const bhxh_thue_service_1 = require("../bhxh-thue/bhxh-thue.service");
const snapshot_dieu_chinh_service_1 = require("../snapshot-dieu-chinh/snapshot-dieu-chinh.service");
const cham_cong_service_1 = require("../cham-cong/cham-cong.service");
const audit_log_service_1 = require("../../common/services/audit-log.service");
const client_1 = require("@prisma/client");
let BangLuongService = BangLuongService_1 = class BangLuongService {
    constructor(prisma, tinhLuongService, ngayCongService, phuCapNhanVienService, bhxhThueService, snapshotService, chamCongService, auditLogService) {
        this.prisma = prisma;
        this.tinhLuongService = tinhLuongService;
        this.ngayCongService = ngayCongService;
        this.phuCapNhanVienService = phuCapNhanVienService;
        this.bhxhThueService = bhxhThueService;
        this.snapshotService = snapshotService;
        this.chamCongService = chamCongService;
        this.auditLogService = auditLogService;
        this.logger = new common_1.Logger(BangLuongService_1.name);
    }
    async layDanhSach(thang, nam, phongBanId, trang = 1, soLuong = 20) {
        const where = {};
        if (thang)
            where.thang = thang;
        if (nam)
            where.nam = nam;
        if (phongBanId)
            where.phongBanId = phongBanId;
        const skip = (trang - 1) * soLuong;
        const [bangLuongs, tongSo] = await Promise.all([
            this.prisma.bangLuong.findMany({
                where,
                include: {
                    phongBan: {
                        select: { id: true, maPhongBan: true, tenPhongBan: true },
                    },
                    _count: {
                        select: { chiTiets: true },
                    },
                },
                orderBy: [{ nam: 'desc' }, { thang: 'desc' }],
                skip,
                take: soLuong,
            }),
            this.prisma.bangLuong.count({ where }),
        ]);
        const data = await Promise.all(bangLuongs.map(async (bl) => {
            const tong = await this.tinhLuongService.tinhTongBangLuong(bl.id);
            return {
                ...bl,
                tongThuNhap: tong.tongThuNhap,
                tongKhauTru: tong.tongKhauTru,
                thucLinh: tong.thucLinh,
                soNhanVien: tong.soNhanVien,
            };
        }));
        const tongTrang = Math.ceil(tongSo / soLuong);
        return {
            data,
            meta: {
                tongSo,
                trang,
                soLuong,
                tongTrang,
                coTrangTruoc: trang > 1,
                coTrangSau: trang < tongTrang,
            },
        };
    }
    async layTheoId(id) {
        const bangLuong = await this.prisma.bangLuong.findUnique({
            where: { id },
            include: {
                phongBan: true,
            },
        });
        if (!bangLuong) {
            throw new common_1.NotFoundException(`Không tìm thấy bảng lương với ID: ${id}`);
        }
        const chiTiet = await this.tinhLuongService.layBangLuongChiTiet(id);
        return chiTiet;
    }
    async taoMoi(dto) {
        const existing = await this.prisma.bangLuong.findUnique({
            where: {
                thang_nam_phongBanId: {
                    thang: dto.thang,
                    nam: dto.nam,
                    phongBanId: dto.phongBanId,
                },
            },
        });
        if (existing) {
            throw new common_1.ConflictException(`Bảng lương tháng ${dto.thang}/${dto.nam} của phòng ban này đã tồn tại`);
        }
        const phongBan = await this.prisma.phongBan.findUnique({
            where: { id: dto.phongBanId },
        });
        if (!phongBan) {
            throw new common_1.NotFoundException(`Không tìm thấy phòng ban với ID: ${dto.phongBanId}`);
        }
        const bangLuong = await this.prisma.bangLuong.create({
            data: {
                thang: dto.thang,
                nam: dto.nam,
                phongBanId: dto.phongBanId,
                tenBangLuong: dto.tenBangLuong || `Bảng lương ${phongBan.tenPhongBan} - Tháng ${dto.thang}/${dto.nam}`,
                trangThai: 'NHAP',
            },
            include: {
                phongBan: true,
            },
        });
        if (dto.tuDongTaoChiTiet !== false) {
            await this.ngayCongService.khoiTaoNgayCongTuChamCong(bangLuong.id);
            await this.taoChiTietTuDong(bangLuong.id, dto.phongBanId, dto.thang, dto.nam);
        }
        return bangLuong;
    }
    async taoChiTietTuDong(bangLuongId, phongBanId, thang, nam) {
        const nhanViens = await this.prisma.nhanVien.findMany({
            where: {
                phongBanId,
                trangThai: 'DANG_LAM',
            },
        });
        const tatCaKhoanLuong = await this.prisma.khoanLuong.findMany({
            where: { trangThai: true },
        });
        const khoanLuongMap = new Map(tatCaKhoanLuong.map(kl => [kl.maKhoan, kl]));
        const luongCoBan = khoanLuongMap.get('LUONG_CO_BAN');
        if (!luongCoBan)
            return;
        const ngayCongLyThuyet = this.chamCongService.tinhSoNgayCongLyThuyet(thang, nam);
        const coCauLuong = await this.prisma.coCauLuong.findFirst({
            where: {
                phongBanId,
                trangThai: true,
            },
            include: {
                chiTiets: {
                    include: {
                        khoanLuong: true,
                    },
                },
            },
        });
        const nhanVienIds = nhanViens.map((nv) => nv.id);
        const phuCaps = await this.phuCapNhanVienService.layPhuCapTheoThangBatch(nhanVienIds, thang, nam);
        const phuCapTheoNhanVien = new Map();
        for (const pc of phuCaps) {
            if (!phuCapTheoNhanVien.has(pc.nhanVienId)) {
                phuCapTheoNhanVien.set(pc.nhanVienId, []);
            }
            phuCapTheoNhanVien.get(pc.nhanVienId).push(pc);
        }
        const chamCongBatch = await this.chamCongService.layChamCongNhieuNhanVien(nhanVienIds, thang, nam);
        const chamCongMap = new Map();
        for (const nv of nhanViens) {
            const cc = chamCongBatch.get(nv.id);
            if (cc) {
                chamCongMap.set(nv.id, {
                    soNgayCongThucTe: Number(cc.soCongThucTe) || 0,
                    soNgayNghiKhongLuong: Number(cc.soNgayNghiKhongLuong) || 0,
                    soNgayNghiPhep: Number(cc.soNgayNghiPhep) || 0,
                });
            }
        }
        const chiTietData = [];
        const daThemKhoan = new Set();
        for (const nv of nhanViens) {
            const key = (khoanLuongId) => `${nv.id}-${khoanLuongId}`;
            const chamCong = chamCongMap.get(nv.id) || { soNgayCongThucTe: ngayCongLyThuyet, soNgayNghiKhongLuong: 0, soNgayNghiPhep: 0 };
            const ngayCongThucTe = chamCong.soNgayCongThucTe + chamCong.soNgayNghiPhep;
            const luongCoBanThucTe = Math.round(Number(nv.luongCoBan) * (ngayCongThucTe / ngayCongLyThuyet));
            chiTietData.push({
                bangLuongId,
                nhanVienId: nv.id,
                khoanLuongId: luongCoBan.id,
                soTien: luongCoBanThucTe,
                nguon: client_1.NguonChiTiet.NHAP_TAY,
            });
            daThemKhoan.add(key(luongCoBan.id));
            const phuCapsNv = phuCapTheoNhanVien.get(nv.id) || [];
            for (const pc of phuCapsNv) {
                if (!daThemKhoan.has(key(pc.khoanLuongId))) {
                    const khoanLuong = tatCaKhoanLuong.find(kl => kl.id === pc.khoanLuongId);
                    const giaTriGoc = Number(pc.soTien);
                    let soTienThucTe = giaTriGoc;
                    if (khoanLuong) {
                        soTienThucTe = this.tinhGiaTriTheoRule(giaTriGoc, khoanLuong.cachTinh, ngayCongThucTe, ngayCongLyThuyet, chamCong.soNgayNghiKhongLuong);
                    }
                    chiTietData.push({
                        bangLuongId,
                        nhanVienId: nv.id,
                        khoanLuongId: pc.khoanLuongId,
                        soTien: Math.round(soTienThucTe),
                        nguon: client_1.NguonChiTiet.CO_DINH,
                    });
                    daThemKhoan.add(key(pc.khoanLuongId));
                }
            }
            if (coCauLuong) {
                for (const ct of coCauLuong.chiTiets) {
                    if (!daThemKhoan.has(key(ct.khoanLuongId)) && Number(ct.giaTriMacDinh) > 0) {
                        const giaTriGoc = Number(ct.giaTriMacDinh);
                        let soTienThucTe = giaTriGoc;
                        if (ct.khoanLuong) {
                            soTienThucTe = this.tinhGiaTriTheoRule(giaTriGoc, ct.khoanLuong.cachTinh, ngayCongThucTe, ngayCongLyThuyet, chamCong.soNgayNghiKhongLuong);
                        }
                        chiTietData.push({
                            bangLuongId,
                            nhanVienId: nv.id,
                            khoanLuongId: ct.khoanLuongId,
                            soTien: Math.round(soTienThucTe),
                            nguon: client_1.NguonChiTiet.NHAP_TAY,
                        });
                        daThemKhoan.add(key(ct.khoanLuongId));
                    }
                }
            }
        }
        const khoanPhatDiMuon = khoanLuongMap.get('PHAT_DI_MUON');
        const khoanPhatVeSom = khoanLuongMap.get('PHAT_VE_SOM');
        const khoanPhatNghiKhongPhep = khoanLuongMap.get('PHAT_NGHI_KHONG_PHEP');
        const khoanTruNgayCong = khoanLuongMap.get('TRU_NGAY_CONG');
        for (const nv of nhanViens) {
            try {
                const ketQuaPhat = await this.chamCongService.tinhTienPhat(nv.id, thang, nam);
                if (khoanPhatDiMuon && ketQuaPhat.tienPhatDiMuon > 0) {
                    chiTietData.push({
                        bangLuongId,
                        nhanVienId: nv.id,
                        khoanLuongId: khoanPhatDiMuon.id,
                        soTien: ketQuaPhat.tienPhatDiMuon,
                        nguon: client_1.NguonChiTiet.CHAM_CONG,
                    });
                }
                if (khoanPhatVeSom && ketQuaPhat.tienPhatVeSom > 0) {
                    chiTietData.push({
                        bangLuongId,
                        nhanVienId: nv.id,
                        khoanLuongId: khoanPhatVeSom.id,
                        soTien: ketQuaPhat.tienPhatVeSom,
                        nguon: client_1.NguonChiTiet.CHAM_CONG,
                    });
                }
                if (khoanPhatNghiKhongPhep && ketQuaPhat.tienPhatNghiKhongPhep > 0) {
                    chiTietData.push({
                        bangLuongId,
                        nhanVienId: nv.id,
                        khoanLuongId: khoanPhatNghiKhongPhep.id,
                        soTien: ketQuaPhat.tienPhatNghiKhongPhep,
                        nguon: client_1.NguonChiTiet.CHAM_CONG,
                    });
                }
                if (khoanTruNgayCong && ketQuaPhat.truLuongNgayCong > 0) {
                    chiTietData.push({
                        bangLuongId,
                        nhanVienId: nv.id,
                        khoanLuongId: khoanTruNgayCong.id,
                        soTien: ketQuaPhat.truLuongNgayCong,
                        nguon: client_1.NguonChiTiet.CHAM_CONG,
                    });
                }
            }
            catch (error) {
                this.logger.warn(`Không có dữ liệu chấm công cho NV ${nv.maNhanVien}: ${error.message}`);
            }
        }
        if (chiTietData.length > 0) {
            await this.prisma.chiTietBangLuong.createMany({
                data: chiTietData,
                skipDuplicates: true,
            });
        }
    }
    tinhGiaTriTheoRule(giaTriGoc, cachTinh, ngayCongThucTe, ngayCongLyThuyet, soNgayNghiKhongPhep) {
        switch (cachTinh) {
            case client_1.CachTinhLuong.LUONG_THANG_CO_DINH:
                return giaTriGoc;
            case client_1.CachTinhLuong.THEO_NGAY_CONG:
                if (ngayCongLyThuyet <= 0)
                    return giaTriGoc;
                return giaTriGoc * (ngayCongThucTe / ngayCongLyThuyet);
            case client_1.CachTinhLuong.CHUYEN_CAN_DIEU_KIEN:
                return soNgayNghiKhongPhep <= 2 ? giaTriGoc : 0;
            default:
                return giaTriGoc;
        }
    }
    async capNhat(id, dto) {
        const bangLuong = await this.prisma.bangLuong.findUnique({
            where: { id },
        });
        if (!bangLuong) {
            throw new common_1.NotFoundException(`Không tìm thấy bảng lương với ID: ${id}`);
        }
        if (bangLuong.trangThai !== 'NHAP') {
            throw new common_1.BadRequestException('Không thể sửa bảng lương đã chốt hoặc khóa');
        }
        return this.prisma.bangLuong.update({
            where: { id },
            data: dto,
        });
    }
    async capNhatChiTiet(dto) {
        const bangLuong = await this.prisma.bangLuong.findUnique({
            where: { id: dto.bangLuongId },
        });
        if (!bangLuong) {
            throw new common_1.NotFoundException(`Không tìm thấy bảng lương với ID: ${dto.bangLuongId}`);
        }
        if (bangLuong.trangThai !== 'NHAP') {
            throw new common_1.BadRequestException('Không thể sửa bảng lương đã chốt hoặc khóa');
        }
        const existing = await this.prisma.chiTietBangLuong.findUnique({
            where: {
                bangLuongId_nhanVienId_khoanLuongId: {
                    bangLuongId: dto.bangLuongId,
                    nhanVienId: dto.nhanVienId,
                    khoanLuongId: dto.khoanLuongId,
                },
            },
        });
        if (existing && existing.nguon === client_1.NguonChiTiet.CO_DINH) {
            throw new common_1.BadRequestException('Không thể sửa phụ cấp cố định trong bảng lương. Vui lòng điều chỉnh tại hồ sơ nhân viên.');
        }
        const giaTriCu = existing ? Number(existing.soTien) : null;
        const chiTiet = await this.prisma.chiTietBangLuong.upsert({
            where: {
                bangLuongId_nhanVienId_khoanLuongId: {
                    bangLuongId: dto.bangLuongId,
                    nhanVienId: dto.nhanVienId,
                    khoanLuongId: dto.khoanLuongId,
                },
            },
            update: {
                soTien: dto.soTien,
                ghiChu: dto.ghiChu,
            },
            create: {
                bangLuongId: dto.bangLuongId,
                nhanVienId: dto.nhanVienId,
                khoanLuongId: dto.khoanLuongId,
                soTien: dto.soTien,
                ghiChu: dto.ghiChu,
                nguon: client_1.NguonChiTiet.NHAP_TAY,
            },
            include: {
                nhanVien: true,
                khoanLuong: true,
            },
        });
        await this.prisma.lichSuChinhSua.create({
            data: {
                bangLuongId: dto.bangLuongId,
                nhanVienId: dto.nhanVienId,
                khoanLuongId: dto.khoanLuongId,
                giaTriCu: giaTriCu,
                giaTriMoi: dto.soTien,
                loaiThayDoi: existing ? 'CAP_NHAT' : 'TAO_MOI',
                nguoiThayDoi: dto.nguoiThayDoi || 'Hệ thống',
                lyDo: dto.lyDo,
            },
        });
        const tongLuong = await this.tinhLuongService.tinhTongLuongNhanVien(dto.bangLuongId, dto.nhanVienId);
        return {
            chiTiet,
            tongLuong,
        };
    }
    async capNhatNhieuChiTiet(danhSach) {
        const ketQua = [];
        for (const dto of danhSach) {
            const result = await this.capNhatChiTiet(dto);
            ketQua.push(result);
        }
        return ketQua;
    }
    async chotBangLuong(id, dto, nguoiDungId) {
        const bangLuong = await this.prisma.bangLuong.findUnique({
            where: { id },
            include: { phongBan: true },
        });
        if (!bangLuong) {
            throw new common_1.NotFoundException(`Không tìm thấy bảng lương với ID: ${id}`);
        }
        if (bangLuong.trangThai !== 'NHAP') {
            throw new common_1.BadRequestException('Bảng lương đã được chốt trước đó');
        }
        try {
            await this.bhxhThueService.tinhChoToBoNhanVien(id);
        }
        catch (error) {
            this.logger.warn(`Bỏ qua tính BHXH/Thuế: ${error.message}`);
        }
        const result = await this.snapshotService.taoSnapshot(id, dto.nguoiChot);
        await this.auditLogService.ghiLogChotBangLuong({
            nguoiDungId,
            tenDangNhap: dto.nguoiChot,
            bangLuongId: id,
            thang: bangLuong.thang,
            nam: bangLuong.nam,
            phongBan: bangLuong.phongBan.tenPhongBan,
        });
        return {
            ...result,
            ghiChu: dto.ghiChu,
        };
    }
    async moKhoaBangLuong(id, lyDo, nguoiDungId, tenDangNhap) {
        if (!lyDo || lyDo.trim().length < 10) {
            throw new common_1.BadRequestException('Lý do mở khóa phải có ít nhất 10 ký tự');
        }
        const bangLuong = await this.prisma.bangLuong.findUnique({
            where: { id },
        });
        if (!bangLuong) {
            throw new common_1.NotFoundException(`Không tìm thấy bảng lương với ID: ${id}`);
        }
        if (bangLuong.trangThai === 'KHOA') {
            throw new common_1.BadRequestException('Bảng lương đã khóa hoàn toàn, không thể mở');
        }
        const result = await this.prisma.bangLuong.update({
            where: { id },
            data: {
                trangThai: 'NHAP',
                ngayChot: null,
                nguoiChot: null,
            },
        });
        await this.auditLogService.ghiLogMoKhoaBangLuong({
            nguoiDungId,
            tenDangNhap,
            bangLuongId: id,
            lyDo,
        });
        return result;
    }
    async khoaBangLuong(id, nguoiDungId, tenDangNhap) {
        const bangLuong = await this.prisma.bangLuong.findUnique({
            where: { id },
        });
        if (!bangLuong) {
            throw new common_1.NotFoundException(`Không tìm thấy bảng lương với ID: ${id}`);
        }
        if (bangLuong.trangThai !== 'DA_CHOT') {
            throw new common_1.BadRequestException('Phải chốt bảng lương trước khi khóa');
        }
        const result = await this.prisma.bangLuong.update({
            where: { id },
            data: { trangThai: 'KHOA' },
        });
        await this.auditLogService.ghiLogKhoaBangLuong({
            nguoiDungId,
            tenDangNhap,
            bangLuongId: id,
        });
        return result;
    }
    async xoa(id) {
        const bangLuong = await this.prisma.bangLuong.findUnique({
            where: { id },
        });
        if (!bangLuong) {
            throw new common_1.NotFoundException(`Không tìm thấy bảng lương với ID: ${id}`);
        }
        if (bangLuong.trangThai !== 'NHAP') {
            throw new common_1.BadRequestException('Không thể xóa bảng lương đã chốt hoặc khóa');
        }
        return this.prisma.bangLuong.delete({
            where: { id },
        });
    }
    async layLichSuChinhSua(bangLuongId) {
        return this.prisma.lichSuChinhSua.findMany({
            where: { bangLuongId },
            include: {
                nhanVien: {
                    select: { maNhanVien: true, hoTen: true },
                },
                khoanLuong: {
                    select: { maKhoan: true, tenKhoan: true },
                },
            },
            orderBy: { ngayThayDoi: 'desc' },
        });
    }
    async tinhLaiTatCaKhoanLuong(bangLuongId) {
        const bangLuong = await this.prisma.bangLuong.findUnique({
            where: { id: bangLuongId },
        });
        if (!bangLuong) {
            throw new common_1.NotFoundException(`Không tìm thấy bảng lương với ID: ${bangLuongId}`);
        }
        if (bangLuong.trangThai === 'KHOA') {
            throw new common_1.BadRequestException('Không thể tính lại bảng lương đã khóa');
        }
        const danhSachNgayCong = await this.ngayCongService.layTatCaNgayCong(bangLuongId);
        let soNhanVienCapNhat = 0;
        for (const ngayCong of danhSachNgayCong) {
            const ngayCongThucTe = this.ngayCongService.tinhNgayCongThucTe(ngayCong);
            await this.ngayCongService.tinhLaiKhoanLuongTheoNgayCong(bangLuongId, ngayCong.nhanVienId, ngayCongThucTe);
            soNhanVienCapNhat++;
        }
        return {
            success: true,
            message: `Đã tính lại lương cho ${soNhanVienCapNhat} nhân viên`,
            soNhanVien: soNhanVienCapNhat,
        };
    }
};
exports.BangLuongService = BangLuongService;
exports.BangLuongService = BangLuongService = BangLuongService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        tinh_luong_service_1.TinhLuongService,
        ngay_cong_service_1.NgayCongService,
        phu_cap_nhan_vien_service_1.PhuCapNhanVienService,
        bhxh_thue_service_1.BHXHThueService,
        snapshot_dieu_chinh_service_1.SnapshotDieuChinhService,
        cham_cong_service_1.ChamCongService,
        audit_log_service_1.AuditLogService])
], BangLuongService);
//# sourceMappingURL=bang-luong.service.js.map