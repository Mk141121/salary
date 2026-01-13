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
exports.KPIService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const client_1 = require("@prisma/client");
let KPIService = class KPIService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async layDanhSachTemplate(phongBanId) {
        return this.prisma.templateKPI.findMany({
            where: {
                trangThai: true,
                ...(phongBanId && { phongBanId }),
            },
            include: {
                chiTieuKPIs: {
                    orderBy: { thuTu: 'asc' },
                },
            },
            orderBy: { ngayTao: 'desc' },
        });
    }
    async layTemplateTheoId(id) {
        const template = await this.prisma.templateKPI.findUnique({
            where: { id },
            include: {
                chiTieuKPIs: {
                    orderBy: { thuTu: 'asc' },
                },
            },
        });
        if (!template) {
            throw new common_1.NotFoundException(`Không tìm thấy template KPI với ID ${id}`);
        }
        return template;
    }
    async taoTemplate(dto) {
        const existing = await this.prisma.templateKPI.findUnique({
            where: { maTemplate: dto.maTemplate },
        });
        if (existing) {
            throw new common_1.ConflictException(`Mã template ${dto.maTemplate} đã tồn tại`);
        }
        if (dto.chiTieuKPIs && dto.chiTieuKPIs.length > 0) {
            const tongTrongSo = dto.chiTieuKPIs.reduce((sum, ct) => sum + ct.trongSo, 0);
            if (Math.abs(tongTrongSo - 100) > 0.01) {
                throw new common_1.BadRequestException(`Tổng trọng số phải bằng 100%, hiện tại: ${tongTrongSo}%`);
            }
        }
        return this.prisma.templateKPI.create({
            data: {
                maTemplate: dto.maTemplate,
                tenTemplate: dto.tenTemplate,
                phongBanId: dto.phongBanId,
                moTa: dto.moTa,
                chiTieuKPIs: dto.chiTieuKPIs
                    ? {
                        create: dto.chiTieuKPIs.map((ct) => ({
                            maChiTieu: ct.maChiTieu,
                            tenChiTieu: ct.tenChiTieu,
                            moTa: ct.moTa,
                            donViTinh: ct.donViTinh,
                            trongSo: ct.trongSo,
                            loaiChiTieu: ct.loaiChiTieu,
                            chiTieuToiThieu: ct.chiTieuToiThieu,
                            chiTieuMucTieu: ct.chiTieuMucTieu,
                            chiTieuVuotMuc: ct.chiTieuVuotMuc,
                            thuTu: ct.thuTu || 0,
                        })),
                    }
                    : undefined,
            },
            include: {
                chiTieuKPIs: true,
            },
        });
    }
    async capNhatTemplate(id, dto) {
        await this.layTemplateTheoId(id);
        return this.prisma.templateKPI.update({
            where: { id },
            data: dto,
            include: {
                chiTieuKPIs: true,
            },
        });
    }
    async themChiTieu(templateId, dto) {
        const template = await this.layTemplateTheoId(templateId);
        const existing = template.chiTieuKPIs.find((ct) => ct.maChiTieu === dto.maChiTieu);
        if (existing) {
            throw new common_1.ConflictException(`Mã chỉ tiêu ${dto.maChiTieu} đã tồn tại trong template`);
        }
        const tongTrongSoHienTai = template.chiTieuKPIs.reduce((sum, ct) => sum + Number(ct.trongSo), 0);
        if (tongTrongSoHienTai + dto.trongSo > 100) {
            throw new common_1.BadRequestException(`Tổng trọng số không được vượt 100%. Hiện tại: ${tongTrongSoHienTai}%, thêm: ${dto.trongSo}%`);
        }
        return this.prisma.chiTieuKPI.create({
            data: {
                templateId,
                maChiTieu: dto.maChiTieu,
                tenChiTieu: dto.tenChiTieu,
                moTa: dto.moTa,
                donViTinh: dto.donViTinh,
                trongSo: dto.trongSo,
                loaiChiTieu: dto.loaiChiTieu,
                chiTieuToiThieu: dto.chiTieuToiThieu,
                chiTieuMucTieu: dto.chiTieuMucTieu,
                chiTieuVuotMuc: dto.chiTieuVuotMuc,
                thuTu: dto.thuTu || 0,
            },
        });
    }
    async xoaChiTieu(chiTieuId) {
        return this.prisma.chiTieuKPI.delete({
            where: { id: chiTieuId },
        });
    }
    async layDanhSachKyDanhGia(nam) {
        return this.prisma.kyDanhGiaKPI.findMany({
            where: nam ? { nam } : undefined,
            include: {
                _count: {
                    select: { danhGiaNhanViens: true },
                },
            },
            orderBy: [{ nam: 'desc' }, { thang: 'desc' }, { quy: 'desc' }],
        });
    }
    async layKyDanhGiaTheoId(id) {
        const ky = await this.prisma.kyDanhGiaKPI.findUnique({
            where: { id },
            include: {
                danhGiaNhanViens: {
                    include: {
                        ketQuaKPIs: {
                            include: {
                                chiTieu: true,
                            },
                        },
                    },
                },
            },
        });
        if (!ky) {
            throw new common_1.NotFoundException(`Không tìm thấy kỳ đánh giá với ID ${id}`);
        }
        return ky;
    }
    async taoKyDanhGia(dto) {
        const existing = await this.prisma.kyDanhGiaKPI.findUnique({
            where: { maKy: dto.maKy },
        });
        if (existing) {
            throw new common_1.ConflictException(`Mã kỳ đánh giá ${dto.maKy} đã tồn tại`);
        }
        return this.prisma.kyDanhGiaKPI.create({
            data: {
                maKy: dto.maKy,
                tenKy: dto.tenKy,
                loaiKy: dto.loaiKy,
                thang: dto.thang,
                quy: dto.quy,
                nam: dto.nam,
                tuNgay: new Date(dto.tuNgay),
                denNgay: new Date(dto.denNgay),
                hanNopKetQua: new Date(dto.hanNopKetQua),
                ghiChu: dto.ghiChu,
            },
        });
    }
    async capNhatTrangThaiKy(id, dto) {
        await this.layKyDanhGiaTheoId(id);
        return this.prisma.kyDanhGiaKPI.update({
            where: { id },
            data: {
                trangThai: dto.trangThai,
            },
        });
    }
    async taoDanhGiaKPI(dto) {
        const existing = await this.prisma.danhGiaKPINhanVien.findUnique({
            where: {
                kyDanhGiaId_nhanVienId: {
                    kyDanhGiaId: dto.kyDanhGiaId,
                    nhanVienId: dto.nhanVienId,
                },
            },
        });
        if (existing) {
            throw new common_1.ConflictException(`Nhân viên đã có đánh giá trong kỳ này`);
        }
        const template = await this.layTemplateTheoId(dto.templateId);
        return this.prisma.danhGiaKPINhanVien.create({
            data: {
                kyDanhGiaId: dto.kyDanhGiaId,
                nhanVienId: dto.nhanVienId,
                templateId: dto.templateId,
                nhanXetChung: dto.nhanXetChung,
                nguoiDanhGia: dto.nguoiDanhGia,
                ngayDanhGia: dto.nguoiDanhGia ? new Date() : null,
                ketQuaKPIs: dto.ketQuaKPIs
                    ? {
                        create: dto.ketQuaKPIs.map((kq) => {
                            const chiTieu = template.chiTieuKPIs.find((ct) => ct.id === kq.chiTieuId);
                            const tyLeDat = this.tinhTyLeDat(kq.ketQuaDat, chiTieu);
                            const diemQuyDoi = tyLeDat * Number(chiTieu?.trongSo || 0) / 100;
                            return {
                                chiTieuId: kq.chiTieuId,
                                ketQuaDat: kq.ketQuaDat,
                                tyLeDat,
                                diemQuyDoi,
                                ghiChu: kq.ghiChu,
                            };
                        }),
                    }
                    : undefined,
            },
            include: {
                ketQuaKPIs: {
                    include: { chiTieu: true },
                },
            },
        });
    }
    async capNhatKetQuaKPI(danhGiaId, dto) {
        const danhGia = await this.prisma.danhGiaKPINhanVien.findUnique({
            where: { id: danhGiaId },
            include: { ketQuaKPIs: true },
        });
        if (!danhGia) {
            throw new common_1.NotFoundException(`Không tìm thấy đánh giá với ID ${danhGiaId}`);
        }
        if (danhGia.trangThai !== 'NHAP') {
            throw new common_1.BadRequestException('Chỉ có thể cập nhật đánh giá ở trạng thái NHAP');
        }
        const template = await this.layTemplateTheoId(danhGia.templateId);
        for (const kq of dto.ketQuaKPIs) {
            const chiTieu = template.chiTieuKPIs.find((ct) => ct.id === kq.chiTieuId);
            const tyLeDat = this.tinhTyLeDat(kq.ketQuaDat, chiTieu);
            const diemQuyDoi = tyLeDat * Number(chiTieu?.trongSo || 0) / 100;
            await this.prisma.ketQuaKPI.upsert({
                where: {
                    danhGiaId_chiTieuId: {
                        danhGiaId,
                        chiTieuId: kq.chiTieuId,
                    },
                },
                update: {
                    ketQuaDat: kq.ketQuaDat,
                    tyLeDat,
                    diemQuyDoi,
                    ghiChu: kq.ghiChu,
                },
                create: {
                    danhGiaId,
                    chiTieuId: kq.chiTieuId,
                    ketQuaDat: kq.ketQuaDat,
                    tyLeDat,
                    diemQuyDoi,
                    ghiChu: kq.ghiChu,
                },
            });
        }
        await this.tinhDiemTongKet(danhGiaId);
        return this.prisma.danhGiaKPINhanVien.findUnique({
            where: { id: danhGiaId },
            include: {
                ketQuaKPIs: {
                    include: { chiTieu: true },
                },
            },
        });
    }
    tinhTyLeDat(ketQuaDat, chiTieu) {
        if (!chiTieu || !chiTieu.chiTieuMucTieu) {
            return 0;
        }
        const mucTieu = Number(chiTieu.chiTieuMucTieu);
        const toiThieu = Number(chiTieu.chiTieuToiThieu || 0);
        const vuotMuc = Number(chiTieu.chiTieuVuotMuc || mucTieu * 1.5);
        if (ketQuaDat >= vuotMuc) {
            return 150;
        }
        else if (ketQuaDat >= mucTieu) {
            return 100 + (ketQuaDat - mucTieu) / (vuotMuc - mucTieu) * 50;
        }
        else if (ketQuaDat >= toiThieu) {
            return (ketQuaDat - toiThieu) / (mucTieu - toiThieu) * 100;
        }
        else {
            return 0;
        }
    }
    async tinhDiemTongKet(danhGiaId) {
        const ketQuaKPIs = await this.prisma.ketQuaKPI.findMany({
            where: { danhGiaId },
        });
        const diemTongKet = ketQuaKPIs.reduce((sum, kq) => sum + Number(kq.diemQuyDoi || 0), 0);
        const xepLoai = this.xepLoaiTheoĐiem(diemTongKet);
        await this.prisma.danhGiaKPINhanVien.update({
            where: { id: danhGiaId },
            data: {
                diemTongKet,
                xepLoai,
            },
        });
        return { diemTongKet, xepLoai };
    }
    xepLoaiTheoĐiem(diem) {
        if (diem >= 95)
            return client_1.XepLoaiKPI.XUAT_SAC;
        if (diem >= 80)
            return client_1.XepLoaiKPI.TOT;
        if (diem >= 65)
            return client_1.XepLoaiKPI.KHA;
        if (diem >= 50)
            return client_1.XepLoaiKPI.TRUNG_BINH;
        return client_1.XepLoaiKPI.YEU;
    }
    async guiDuyet(danhGiaId) {
        const danhGia = await this.prisma.danhGiaKPINhanVien.findUnique({
            where: { id: danhGiaId },
        });
        if (!danhGia) {
            throw new common_1.NotFoundException(`Không tìm thấy đánh giá với ID ${danhGiaId}`);
        }
        if (danhGia.trangThai !== 'NHAP') {
            throw new common_1.BadRequestException('Chỉ có thể gửi duyệt đánh giá ở trạng thái NHAP');
        }
        await this.tinhDiemTongKet(danhGiaId);
        return this.prisma.danhGiaKPINhanVien.update({
            where: { id: danhGiaId },
            data: {
                trangThai: 'CHO_DUYET',
            },
        });
    }
    async duyetDanhGia(danhGiaId, dto) {
        const danhGia = await this.prisma.danhGiaKPINhanVien.findUnique({
            where: { id: danhGiaId },
        });
        if (!danhGia) {
            throw new common_1.NotFoundException(`Không tìm thấy đánh giá với ID ${danhGiaId}`);
        }
        if (danhGia.trangThai !== 'CHO_DUYET') {
            throw new common_1.BadRequestException('Chỉ có thể duyệt đánh giá ở trạng thái CHO_DUYET');
        }
        return this.prisma.danhGiaKPINhanVien.update({
            where: { id: danhGiaId },
            data: {
                trangThai: 'DA_DUYET',
                nguoiDuyet: dto.nguoiDuyet || 'SYSTEM',
                ngayDuyet: new Date(),
            },
        });
    }
    async tuChoiDanhGia(danhGiaId, lyDo) {
        const danhGia = await this.prisma.danhGiaKPINhanVien.findUnique({
            where: { id: danhGiaId },
        });
        if (!danhGia) {
            throw new common_1.NotFoundException(`Không tìm thấy đánh giá với ID ${danhGiaId}`);
        }
        return this.prisma.danhGiaKPINhanVien.update({
            where: { id: danhGiaId },
            data: {
                trangThai: 'TU_CHOI',
                nhanXetChung: `${danhGia.nhanXetChung || ''}\n[TỪ CHỐI]: ${lyDo}`,
            },
        });
    }
    async layCauHinhThuong(nam) {
        return this.prisma.cauHinhThuongKPI.findMany({
            where: { nam, trangThai: true },
            orderBy: { diemToiThieu: 'desc' },
        });
    }
    async luuCauHinhThuong(dto) {
        return this.prisma.cauHinhThuongKPI.upsert({
            where: {
                nam_xepLoai: {
                    nam: dto.nam,
                    xepLoai: dto.xepLoai,
                },
            },
            update: {
                diemToiThieu: dto.diemToiThieu,
                diemToiDa: dto.diemToiDa,
                heSoThuong: dto.heSoThuong,
                moTa: dto.moTa,
            },
            create: {
                nam: dto.nam,
                xepLoai: dto.xepLoai,
                diemToiThieu: dto.diemToiThieu,
                diemToiDa: dto.diemToiDa,
                heSoThuong: dto.heSoThuong,
                moTa: dto.moTa,
            },
        });
    }
    async khoiTaoCauHinhThuongMacDinh(nam) {
        const cauHinhMacDinh = [
            { xepLoai: 'XUAT_SAC', diemToiThieu: 95, diemToiDa: 150, heSoThuong: 2.0, moTa: 'Xuất sắc - 2x lương' },
            { xepLoai: 'TOT', diemToiThieu: 80, diemToiDa: 94.99, heSoThuong: 1.5, moTa: 'Tốt - 1.5x lương' },
            { xepLoai: 'KHA', diemToiThieu: 65, diemToiDa: 79.99, heSoThuong: 1.0, moTa: 'Khá - 1x lương' },
            { xepLoai: 'TRUNG_BINH', diemToiThieu: 50, diemToiDa: 64.99, heSoThuong: 0.5, moTa: 'Trung bình - 0.5x lương' },
            { xepLoai: 'YEU', diemToiThieu: 0, diemToiDa: 49.99, heSoThuong: 0, moTa: 'Yếu - không thưởng' },
        ];
        for (const ch of cauHinhMacDinh) {
            await this.luuCauHinhThuong({
                nam,
                ...ch,
            });
        }
        return this.layCauHinhThuong(nam);
    }
    async tinhThuongKPI(dto) {
        const kyDanhGia = await this.prisma.kyDanhGiaKPI.findUnique({
            where: { id: dto.kyDanhGiaId },
            include: {
                danhGiaNhanViens: {
                    where: { trangThai: 'DA_DUYET' },
                    include: {
                        ketQuaKPIs: true,
                    },
                },
            },
        });
        if (!kyDanhGia) {
            throw new common_1.NotFoundException(`Không tìm thấy kỳ đánh giá với ID ${dto.kyDanhGiaId}`);
        }
        const cauHinhThuong = await this.layCauHinhThuong(kyDanhGia.nam);
        const ketQua = [];
        for (const danhGia of kyDanhGia.danhGiaNhanViens) {
            const nhanVien = await this.prisma.nhanVien.findUnique({
                where: { id: danhGia.nhanVienId },
            });
            if (!nhanVien)
                continue;
            const diemTongKet = Number(danhGia.diemTongKet || 0);
            const xepLoai = danhGia.xepLoai || 'YEU';
            const cauHinh = cauHinhThuong.find((ch) => ch.xepLoai === xepLoai);
            const heSoThuong = Number(cauHinh?.heSoThuong || 0);
            const soTienThuong = dto.mucThuongCoBan * heSoThuong;
            await this.prisma.danhGiaKPINhanVien.update({
                where: { id: danhGia.id },
                data: {
                    heSoThuong,
                    soTienThuong,
                },
            });
            ketQua.push({
                nhanVienId: nhanVien.id,
                maNhanVien: nhanVien.maNhanVien,
                hoTen: nhanVien.hoTen,
                diemTongKet,
                xepLoai,
                heSoThuong,
                soTienThuong,
            });
        }
        return ketQua;
    }
    async baoCaoKPITheoPhongBan(kyDanhGiaId) {
        const danhGias = await this.prisma.danhGiaKPINhanVien.findMany({
            where: { kyDanhGiaId },
            include: {
                ketQuaKPIs: {
                    include: { chiTieu: true },
                },
            },
        });
        const nhanVienIds = danhGias.map((d) => d.nhanVienId);
        const nhanViens = await this.prisma.nhanVien.findMany({
            where: { id: { in: nhanVienIds } },
            include: { phongBan: true },
        });
        const baoCao = {};
        for (const danhGia of danhGias) {
            const nhanVien = nhanViens.find((nv) => nv.id === danhGia.nhanVienId);
            if (!nhanVien)
                continue;
            const phongBan = nhanVien.phongBan.tenPhongBan;
            if (!baoCao[phongBan]) {
                baoCao[phongBan] = {
                    tenPhongBan: phongBan,
                    soNhanVien: 0,
                    diemTrungBinh: 0,
                    thongKeXepLoai: {
                        XUAT_SAC: 0,
                        TOT: 0,
                        KHA: 0,
                        TRUNG_BINH: 0,
                        YEU: 0,
                    },
                    tongThuong: 0,
                    chiTiet: [],
                };
            }
            baoCao[phongBan].soNhanVien++;
            baoCao[phongBan].diemTrungBinh += Number(danhGia.diemTongKet || 0);
            if (danhGia.xepLoai) {
                baoCao[phongBan].thongKeXepLoai[danhGia.xepLoai]++;
            }
            baoCao[phongBan].tongThuong += Number(danhGia.soTienThuong || 0);
            baoCao[phongBan].chiTiet.push({
                maNhanVien: nhanVien.maNhanVien,
                hoTen: nhanVien.hoTen,
                diemTongKet: Number(danhGia.diemTongKet || 0),
                xepLoai: danhGia.xepLoai,
                soTienThuong: Number(danhGia.soTienThuong || 0),
            });
        }
        for (const pb of Object.values(baoCao)) {
            if (pb.soNhanVien > 0) {
                pb.diemTrungBinh = Math.round(pb.diemTrungBinh / pb.soNhanVien * 100) / 100;
            }
        }
        return Object.values(baoCao);
    }
};
exports.KPIService = KPIService;
exports.KPIService = KPIService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], KPIService);
//# sourceMappingURL=kpi.service.js.map