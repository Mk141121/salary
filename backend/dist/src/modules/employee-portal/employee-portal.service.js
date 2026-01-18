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
exports.EmployeePortalService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let EmployeePortalService = class EmployeePortalService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getNhanVienFromUser(userId) {
        const user = await this.prisma.nguoiDung.findUnique({
            where: { id: userId },
        });
        if (!user?.nhanVienId) {
            throw new common_1.BadRequestException('Tài khoản chưa được liên kết với nhân viên');
        }
        const nhanVien = await this.prisma.nhanVien.findUnique({
            where: { id: user.nhanVienId },
            include: {
                phongBan: { select: { id: true, tenPhongBan: true } },
            },
        });
        if (!nhanVien) {
            throw new common_1.BadRequestException('Không tìm thấy thông tin nhân viên');
        }
        return nhanVien;
    }
    async getDashboard(userId) {
        const nhanVien = await this.getNhanVienFromUser(userId);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const lichPhanCa = await this.prisma.lichPhanCaChiTiet.findFirst({
            where: {
                nhanVienId: nhanVien.id,
                ngay: today,
                lichPhanCa: { trangThai: 'DA_CONG_BO' },
            },
            include: {
                caLamViec: {
                    select: {
                        id: true,
                        maCa: true,
                        tenCa: true,
                        gioVao: true,
                        gioRa: true,
                        mauHienThi: true,
                    },
                },
            },
        });
        const chamCong = await this.prisma.chiTietChamCong.findUnique({
            where: {
                nhanVienId_ngay: {
                    nhanVienId: nhanVien.id,
                    ngay: today,
                },
            },
        });
        const soDonChoDuyet = await this.prisma.donYeuCau.count({
            where: {
                nhanVienId: nhanVien.id,
                trangThai: { in: ['CHO_DUYET_1', 'CHO_DUYET_2'] },
            },
        });
        const donNghiDaDuyet = await this.prisma.donNghiPhep.aggregate({
            where: {
                nhanVienId: nhanVien.id,
                trangThai: 'DA_DUYET',
                tuNgay: { gte: new Date(today.getFullYear(), 0, 1) },
            },
            _sum: { soNgayNghi: true },
        });
        const nghiPhepDaDung = Number(donNghiDaDuyet._sum.soNgayNghi || 0);
        const soNgayPhepConLai = Math.max(0, 12 - nghiPhepDaDung);
        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        const soNgayCongThang = await this.prisma.chiTietChamCong.count({
            where: {
                nhanVienId: nhanVien.id,
                ngay: { gte: startOfMonth, lte: endOfMonth },
                trangThai: 'DI_LAM',
            },
        });
        let chamCongStatus = 'CHUA_VAO';
        if (chamCong?.gioVao && chamCong?.gioRa) {
            chamCongStatus = 'DA_RA';
        }
        else if (chamCong?.gioVao) {
            chamCongStatus = 'DA_VAO';
        }
        return {
            nhanVien: {
                id: nhanVien.id,
                maNhanVien: nhanVien.maNhanVien,
                hoTen: nhanVien.hoTen,
                phongBan: nhanVien.phongBan?.tenPhongBan || '',
                chucVu: nhanVien.chucVu || undefined,
            },
            caHomNay: lichPhanCa?.caLamViec
                ? {
                    id: lichPhanCa.caLamViec.id,
                    maCa: lichPhanCa.caLamViec.maCa,
                    tenCa: lichPhanCa.caLamViec.tenCa,
                    gioVao: lichPhanCa.caLamViec.gioVao,
                    gioRa: lichPhanCa.caLamViec.gioRa,
                    mauHienThi: lichPhanCa.caLamViec.mauHienThi || undefined,
                }
                : undefined,
            chamCongHomNay: {
                gioVao: chamCong?.gioVao?.toISOString(),
                gioRa: chamCong?.gioRa?.toISOString(),
                trangThai: chamCongStatus,
            },
            thongKe: {
                soDonChoDuyet,
                soNgayPhepConLai,
                soNgayCongThang,
            },
            thongBaoMoi: 0,
        };
    }
    async getLichLamViec(userId, query) {
        const nhanVien = await this.getNhanVienFromUser(userId);
        const now = new Date();
        const tuNgay = query.tuNgay ? new Date(query.tuNgay) : new Date(now.setHours(0, 0, 0, 0));
        const denNgay = query.denNgay
            ? new Date(query.denNgay)
            : new Date(tuNgay.getTime() + 6 * 24 * 60 * 60 * 1000);
        const lichPhanCa = await this.prisma.lichPhanCaChiTiet.findMany({
            where: {
                nhanVienId: nhanVien.id,
                ngay: { gte: tuNgay, lte: denNgay },
                lichPhanCa: { trangThai: 'DA_CONG_BO' },
            },
            include: {
                caLamViec: {
                    select: {
                        id: true,
                        maCa: true,
                        tenCa: true,
                        gioVao: true,
                        gioRa: true,
                        mauHienThi: true,
                    },
                },
            },
            orderBy: { ngay: 'asc' },
        });
        const donNghiPheps = await this.prisma.donNghiPhep.findMany({
            where: {
                nhanVienId: nhanVien.id,
                OR: [
                    { tuNgay: { lte: denNgay }, denNgay: { gte: tuNgay } },
                ],
                trangThai: { in: ['GUI_DUYET', 'DA_DUYET'] },
            },
            include: {
                loaiNghi: { select: { tenLoaiNghi: true } },
            },
        });
        const result = [];
        for (let d = new Date(tuNgay); d <= denNgay; d.setDate(d.getDate() + 1)) {
            const currentDate = new Date(d);
            const item = {
                ngay: currentDate.toISOString().split('T')[0],
                thuTrongTuan: currentDate.getDay(),
            };
            const ca = lichPhanCa.find((l) => l.ngay.toISOString().split('T')[0] === item.ngay);
            if (ca?.caLamViec) {
                item.ca = {
                    id: ca.caLamViec.id,
                    maCa: ca.caLamViec.maCa,
                    tenCa: ca.caLamViec.tenCa,
                    gioVao: ca.caLamViec.gioVao,
                    gioRa: ca.caLamViec.gioRa,
                    mauHienThi: ca.caLamViec.mauHienThi || undefined,
                };
            }
            const nghi = donNghiPheps.find((n) => new Date(n.tuNgay) <= currentDate &&
                new Date(n.denNgay) >= currentDate);
            if (nghi) {
                item.nghiPhep = {
                    loaiNghi: nghi.loaiNghi?.tenLoaiNghi || 'Nghỉ phép',
                    trangThai: nghi.trangThai,
                };
            }
            result.push(item);
        }
        return result;
    }
    async getChamCong(userId, query) {
        const nhanVien = await this.getNhanVienFromUser(userId);
        const now = new Date();
        const thang = query.thang || now.getMonth() + 1;
        const nam = query.nam || now.getFullYear();
        const startOfMonth = new Date(nam, thang - 1, 1);
        const endOfMonth = new Date(nam, thang, 0);
        const chamCongs = await this.prisma.chiTietChamCong.findMany({
            where: {
                nhanVienId: nhanVien.id,
                ngay: { gte: startOfMonth, lte: endOfMonth },
            },
            include: {
                caLamViec: { select: { maCa: true, tenCa: true } },
            },
            orderBy: { ngay: 'asc' },
        });
        return chamCongs.map((cc) => ({
            ngay: cc.ngay.toISOString().split('T')[0],
            gioVaoThucTe: cc.gioVao?.toISOString() || undefined,
            gioRaThucTe: cc.gioRa?.toISOString() || undefined,
            gioVaoDuKien: cc.gioVaoDuKien?.toISOString() || undefined,
            gioRaDuKien: cc.gioRaDuKien?.toISOString() || undefined,
            trangThai: cc.trangThai,
            phutDiTre: cc.phutDiTre ?? undefined,
            phutVeSom: cc.phutVeSom ?? undefined,
            soGioLam: Number(cc.soGioLam),
            ca: cc.caLamViec || undefined,
        }));
    }
    async getPhieuLuong(userId, query) {
        const nhanVien = await this.getNhanVienFromUser(userId);
        const page = query.page || 1;
        const limit = query.limit || 12;
        const skip = (page - 1) * limit;
        const whereBase = {
            nhanVienId: nhanVien.id,
        };
        if (query.nam) {
            whereBase.bangLuong = { nam: query.nam };
        }
        const [chiTiets, total] = await Promise.all([
            this.prisma.chiTietBangLuong.findMany({
                where: whereBase,
                include: {
                    bangLuong: {
                        select: {
                            id: true,
                            thang: true,
                            nam: true,
                            trangThai: true,
                            ngayChot: true,
                        },
                    },
                },
                orderBy: { bangLuong: { ngayTao: 'desc' } },
                skip,
                take: limit,
            }),
            this.prisma.chiTietBangLuong.count({ where: whereBase }),
        ]);
        const data = [];
        const groupedByBangLuong = new Map();
        for (const ct of chiTiets) {
            const key = ct.bangLuongId;
            if (!groupedByBangLuong.has(key)) {
                groupedByBangLuong.set(key, []);
            }
            groupedByBangLuong.get(key).push(ct);
        }
        for (const [bangLuongId, items] of groupedByBangLuong.entries()) {
            const firstItem = items[0];
            let tongThuNhap = 0;
            let tongKhauTru = 0;
            for (const ct of items) {
                const khoanLuong = await this.prisma.khoanLuong.findUnique({
                    where: { id: ct.khoanLuongId },
                    select: { loai: true },
                });
                const soTien = Number(ct.soTien);
                if (khoanLuong?.loai === 'KHAU_TRU') {
                    tongKhauTru += soTien;
                }
                else {
                    tongThuNhap += soTien;
                }
            }
            data.push({
                id: firstItem.id,
                bangLuongId: firstItem.bangLuongId,
                kyLuong: `Tháng ${firstItem.bangLuong.thang}/${firstItem.bangLuong.nam}`,
                thang: firstItem.bangLuong.thang,
                nam: firstItem.bangLuong.nam,
                tongThuNhap,
                tongKhauTru,
                thucLinh: tongThuNhap - tongKhauTru,
                trangThai: firstItem.bangLuong.trangThai,
                ngayChot: firstItem.bangLuong.ngayChot?.toISOString() || undefined,
            });
        }
        return { data, total };
    }
    async getSoDuPhep(userId) {
        const nhanVien = await this.getNhanVienFromUser(userId);
        const nam = new Date().getFullYear();
        const donNghiPheps = await this.prisma.donNghiPhep.findMany({
            where: {
                nhanVienId: nhanVien.id,
                trangThai: 'DA_DUYET',
                tuNgay: { gte: new Date(nam, 0, 1), lte: new Date(nam, 11, 31) },
            },
            include: {
                loaiNghi: { select: { maLoaiNghi: true, tenLoaiNghi: true } },
            },
        });
        const grouped = new Map();
        for (const nghi of donNghiPheps) {
            const ma = nghi.loaiNghi?.maLoaiNghi || 'KHAC';
            const ten = nghi.loaiNghi?.tenLoaiNghi || 'Khác';
            const soNgay = Number(nghi.soNgayNghi);
            const existing = grouped.get(ma);
            if (existing) {
                existing.soNgay += soNgay;
            }
            else {
                grouped.set(ma, { tenLoai: ten, soNgay });
            }
        }
        const tongDaSuDung = Array.from(grouped.values()).reduce((sum, g) => sum + g.soNgay, 0);
        return {
            phepNam: {
                tongSo: 12,
                daSuDung: tongDaSuDung,
                conLai: Math.max(0, 12 - tongDaSuDung),
            },
            danhSachLoaiNghi: Array.from(grouped.entries()).map(([ma, v]) => ({
                maLoai: ma,
                tenLoai: v.tenLoai,
                soNgayDaSuDung: v.soNgay,
            })),
        };
    }
    async getHoSo(userId) {
        const nhanVien = await this.getNhanVienFromUser(userId);
        const full = await this.prisma.nhanVien.findUnique({
            where: { id: nhanVien.id },
            include: {
                phongBan: { select: { id: true, tenPhongBan: true } },
                nganHangs: {
                    where: { laMacDinh: true },
                    take: 1,
                },
            },
        });
        if (!full) {
            throw new common_1.BadRequestException('Không tìm thấy thông tin nhân viên');
        }
        const nganHangHienTai = full.nganHangs?.[0];
        return {
            id: full.id,
            maNhanVien: full.maNhanVien,
            hoTen: full.hoTen,
            email: full.email,
            soDienThoai: full.soDienThoai,
            ngaySinh: full.ngaySinh?.toISOString() || null,
            gioiTinh: full.gioiTinh,
            diaChi: full.diaChi,
            ngayVaoLam: full.ngayVaoLam?.toISOString() || null,
            chucVu: full.chucVu,
            phongBan: full.phongBan,
            nganHang: nganHangHienTai
                ? { id: 0, tenNganHang: nganHangHienTai.tenNganHang }
                : null,
            soTaiKhoan: nganHangHienTai?.soTaiKhoan
                ? `***${nganHangHienTai.soTaiKhoan.slice(-4)}`
                : null,
            trangThai: full.trangThai,
        };
    }
    async checkIn(userId) {
        const nhanVien = await this.getNhanVienFromUser(userId);
        const now = new Date();
        const today = new Date(now);
        today.setHours(0, 0, 0, 0);
        const lichPhanCa = await this.prisma.lichPhanCaChiTiet.findFirst({
            where: {
                nhanVienId: nhanVien.id,
                ngay: today,
                lichPhanCa: { trangThai: 'DA_CONG_BO' },
            },
            include: { caLamViec: true },
        });
        let phutDiTre = null;
        let gioVaoDuKien = null;
        let gioRaDuKien = null;
        if (lichPhanCa?.caLamViec) {
            const ca = lichPhanCa.caLamViec;
            if (ca.gioVao) {
                gioVaoDuKien = new Date(today);
                const caGioVao = new Date(ca.gioVao);
                gioVaoDuKien.setHours(caGioVao.getHours(), caGioVao.getMinutes(), 0, 0);
                const diffMs = now.getTime() - gioVaoDuKien.getTime();
                phutDiTre = Math.max(0, Math.floor(diffMs / 60000));
            }
            if (ca.gioRa) {
                gioRaDuKien = new Date(today);
                const caGioRa = new Date(ca.gioRa);
                gioRaDuKien.setHours(caGioRa.getHours(), caGioRa.getMinutes(), 0, 0);
            }
        }
        const existing = await this.prisma.chiTietChamCong.findUnique({
            where: {
                nhanVienId_ngay: {
                    nhanVienId: nhanVien.id,
                    ngay: today,
                },
            },
        });
        if (existing?.gioVao) {
            throw new common_1.BadRequestException('Bạn đã check-in hôm nay rồi');
        }
        const chamCong = await this.prisma.chiTietChamCong.upsert({
            where: {
                nhanVienId_ngay: {
                    nhanVienId: nhanVien.id,
                    ngay: today,
                },
            },
            update: {
                gioVao: now,
                phutDiTre,
                gioVaoDuKien,
                gioRaDuKien,
                caLamViecId: lichPhanCa?.caLamViecId || null,
            },
            create: {
                nhanVienId: nhanVien.id,
                ngay: today,
                gioVao: now,
                phutDiTre,
                gioVaoDuKien,
                gioRaDuKien,
                caLamViecId: lichPhanCa?.caLamViecId || null,
                loaiNgay: this.getLoaiNgay(today),
                trangThai: 'DI_LAM',
            },
        });
        return {
            success: true,
            message: 'Check-in thành công',
            data: {
                gioVao: now.toISOString(),
                phutDiTre,
                chamCongId: chamCong.id,
            },
        };
    }
    async checkOut(userId) {
        const nhanVien = await this.getNhanVienFromUser(userId);
        const now = new Date();
        const today = new Date(now);
        today.setHours(0, 0, 0, 0);
        const existing = await this.prisma.chiTietChamCong.findUnique({
            where: {
                nhanVienId_ngay: {
                    nhanVienId: nhanVien.id,
                    ngay: today,
                },
            },
        });
        if (!existing) {
            throw new common_1.BadRequestException('Bạn chưa check-in hôm nay');
        }
        if (existing.gioRa) {
            throw new common_1.BadRequestException('Bạn đã check-out hôm nay rồi');
        }
        if (!existing.gioVao) {
            throw new common_1.BadRequestException('Bạn chưa check-in, không thể check-out');
        }
        let phutVeSom = null;
        if (existing.gioRaDuKien) {
            const diffMs = existing.gioRaDuKien.getTime() - now.getTime();
            phutVeSom = Math.max(0, Math.floor(diffMs / 60000));
        }
        const gioVao = new Date(existing.gioVao);
        const diffHours = (now.getTime() - gioVao.getTime()) / (1000 * 60 * 60);
        const soGioLam = Math.max(0, Math.round(diffHours * 100) / 100);
        const chamCong = await this.prisma.chiTietChamCong.update({
            where: { id: existing.id },
            data: {
                gioRa: now,
                phutVeSom,
                soGioLam,
            },
        });
        return {
            success: true,
            message: 'Check-out thành công',
            data: {
                gioVao: existing.gioVao?.toISOString(),
                gioRa: now.toISOString(),
                soGioLam,
                phutVeSom,
                chamCongId: chamCong.id,
            },
        };
    }
    getLoaiNgay(date) {
        const dayOfWeek = date.getDay();
        if (dayOfWeek === 0)
            return 'CHU_NHAT';
        if (dayOfWeek === 6)
            return 'THU_BAY';
        return 'NGAY_THUONG';
    }
};
exports.EmployeePortalService = EmployeePortalService;
exports.EmployeePortalService = EmployeePortalService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], EmployeePortalService);
//# sourceMappingURL=employee-portal.service.js.map