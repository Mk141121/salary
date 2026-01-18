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
exports.PhongBanService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let PhongBanService = class PhongBanService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async layTatCa() {
        return this.prisma.phongBan.findMany({
            where: { trangThai: 'HOAT_DONG' },
            include: {
                phongBanCha: { select: { id: true, tenPhongBan: true } },
                _count: {
                    select: { nhanViens: true, phongBanCons: true, donViCons: true },
                },
            },
            orderBy: [{ capDo: 'asc' }, { tenPhongBan: 'asc' }],
        });
    }
    async layCayPhongBan() {
        const tatCaPhongBan = await this.prisma.phongBan.findMany({
            where: { trangThai: 'HOAT_DONG' },
            include: {
                _count: {
                    select: { nhanViens: true, donViCons: true },
                },
            },
            orderBy: [{ capDo: 'asc' }, { tenPhongBan: 'asc' }],
        });
        const map = new Map();
        const roots = [];
        tatCaPhongBan.forEach(pb => {
            map.set(pb.id, { ...pb, children: [] });
        });
        tatCaPhongBan.forEach(pb => {
            const node = map.get(pb.id);
            if (pb.phongBanChaId && map.has(pb.phongBanChaId)) {
                map.get(pb.phongBanChaId).children.push(node);
            }
            else {
                roots.push(node);
            }
        });
        return roots;
    }
    async layTheoId(id) {
        const phongBan = await this.prisma.phongBan.findUnique({
            where: { id },
            include: {
                phongBanCha: { select: { id: true, maPhongBan: true, tenPhongBan: true } },
                phongBanCons: {
                    where: { trangThai: 'HOAT_DONG' },
                    select: { id: true, maPhongBan: true, tenPhongBan: true, capDo: true }
                },
                donViCons: { where: { trangThai: 'HOAT_DONG' } },
                nhanViens: {
                    where: { trangThai: 'DANG_LAM' },
                    orderBy: { hoTen: 'asc' },
                    select: { id: true, maNhanVien: true, hoTen: true, chucVu: true }
                },
                _count: {
                    select: { nhanViens: true, bangLuongs: true, donViCons: true },
                },
            },
        });
        if (!phongBan) {
            throw new common_1.NotFoundException(`Không tìm thấy phòng ban với ID: ${id}`);
        }
        return phongBan;
    }
    async taoMoi(dto, taoBoi) {
        let capDo = 1;
        if (dto.phongBanChaId) {
            const phongBanCha = await this.prisma.phongBan.findUnique({
                where: { id: dto.phongBanChaId },
            });
            if (!phongBanCha) {
                throw new common_1.BadRequestException(`Không tìm thấy phòng ban cha với ID: ${dto.phongBanChaId}`);
            }
            capDo = phongBanCha.capDo + 1;
        }
        return this.prisma.phongBan.create({
            data: {
                ...dto,
                capDo,
                taoBoi,
            },
        });
    }
    async capNhat(id, dto, capNhatBoi) {
        await this.layTheoId(id);
        return this.prisma.phongBan.update({
            where: { id },
            data: {
                ...dto,
                capNhatBoi,
            },
        });
    }
    async doiPhongBanCha(id, dto, capNhatBoi) {
        const phongBan = await this.layTheoId(id);
        if (dto.phongBanChaId) {
            const seCycyle = await this.kiemTraVongLap(id, dto.phongBanChaId);
            if (seCycyle) {
                throw new common_1.BadRequestException('Không thể di chuyển: sẽ tạo vòng lặp trong cây phòng ban');
            }
        }
        let capDoMoi = 1;
        if (dto.phongBanChaId) {
            const phongBanCha = await this.prisma.phongBan.findUnique({
                where: { id: dto.phongBanChaId },
            });
            if (!phongBanCha) {
                throw new common_1.BadRequestException(`Không tìm thấy phòng ban cha mới với ID: ${dto.phongBanChaId}`);
            }
            capDoMoi = phongBanCha.capDo + 1;
        }
        const chenhLechCapDo = capDoMoi - phongBan.capDo;
        await this.capNhatCapDoDeQuy(id, chenhLechCapDo);
        return this.prisma.phongBan.update({
            where: { id },
            data: {
                phongBanChaId: dto.phongBanChaId,
                capDo: capDoMoi,
                capNhatBoi,
            },
        });
    }
    async kiemTraVongLap(phongBanId, phongBanChaIdMoi) {
        if (phongBanId === phongBanChaIdMoi)
            return true;
        let currentId = phongBanChaIdMoi;
        const visited = new Set();
        while (currentId) {
            if (currentId === phongBanId)
                return true;
            if (visited.has(currentId))
                return true;
            visited.add(currentId);
            const phongBanHienTai = await this.prisma.phongBan.findUnique({
                where: { id: currentId },
                select: { phongBanChaId: true },
            });
            currentId = phongBanHienTai?.phongBanChaId ?? null;
        }
        return false;
    }
    async capNhatCapDoDeQuy(phongBanId, chenhLech) {
        const phongBanCons = await this.prisma.phongBan.findMany({
            where: { phongBanChaId: phongBanId },
        });
        for (const pb of phongBanCons) {
            await this.prisma.phongBan.update({
                where: { id: pb.id },
                data: { capDo: pb.capDo + chenhLech },
            });
            await this.capNhatCapDoDeQuy(pb.id, chenhLech);
        }
    }
    async ngungHoatDong(id, capNhatBoi) {
        await this.layTheoId(id);
        const pbConHoatDong = await this.prisma.phongBan.count({
            where: { phongBanChaId: id, trangThai: 'HOAT_DONG' },
        });
        if (pbConHoatDong > 0) {
            throw new common_1.BadRequestException('Không thể ngừng hoạt động: còn phòng ban con đang hoạt động');
        }
        const nvDangLam = await this.prisma.nhanVien.count({
            where: { phongBanId: id, trangThai: 'DANG_LAM' },
        });
        if (nvDangLam > 0) {
            throw new common_1.BadRequestException(`Không thể ngừng hoạt động: còn ${nvDangLam} nhân viên đang làm việc`);
        }
        return this.prisma.phongBan.update({
            where: { id },
            data: { trangThai: 'NGUNG_HOAT_DONG', capNhatBoi },
        });
    }
    async kichHoat(id, capNhatBoi) {
        const phongBan = await this.prisma.phongBan.findUnique({ where: { id } });
        if (!phongBan) {
            throw new common_1.NotFoundException(`Không tìm thấy phòng ban với ID: ${id}`);
        }
        return this.prisma.phongBan.update({
            where: { id },
            data: { trangThai: 'HOAT_DONG', capNhatBoi },
        });
    }
    async xoa(id) {
        return this.ngungHoatDong(id);
    }
    async layNhanVienTheoPhongBan(id) {
        await this.layTheoId(id);
        return this.prisma.nhanVien.findMany({
            where: {
                phongBanId: id,
                trangThai: 'DANG_LAM',
            },
            orderBy: { hoTen: 'asc' },
        });
    }
    async layDonViCon(phongBanId) {
        await this.layTheoId(phongBanId);
        return this.prisma.donViCon.findMany({
            where: { phongBanId, trangThai: 'HOAT_DONG' },
            orderBy: { tenDonVi: 'asc' },
        });
    }
    async taoDonViCon(phongBanId, dto, taoBoi) {
        await this.layTheoId(phongBanId);
        return this.prisma.donViCon.create({
            data: {
                ...dto,
                phongBanId,
                taoBoi,
            },
        });
    }
    async capNhatDonViCon(donViConId, dto) {
        const donViCon = await this.prisma.donViCon.findUnique({ where: { id: donViConId } });
        if (!donViCon) {
            throw new common_1.NotFoundException(`Không tìm thấy đơn vị con với ID: ${donViConId}`);
        }
        return this.prisma.donViCon.update({
            where: { id: donViConId },
            data: dto,
        });
    }
    async ngungDonViCon(donViConId) {
        const donViCon = await this.prisma.donViCon.findUnique({ where: { id: donViConId } });
        if (!donViCon) {
            throw new common_1.NotFoundException(`Không tìm thấy đơn vị con với ID: ${donViConId}`);
        }
        return this.prisma.donViCon.update({
            where: { id: donViConId },
            data: { trangThai: 'NGUNG_HOAT_DONG' },
        });
    }
    async layLichSuPhongBan(nhanVienId) {
        return this.prisma.nhanVienPhongBan.findMany({
            where: { nhanVienId },
            include: {
                phongBan: { select: { id: true, maPhongBan: true, tenPhongBan: true } },
                donViCon: { select: { id: true, maDonVi: true, tenDonVi: true, loaiDonVi: true } },
            },
            orderBy: { tuNgay: 'desc' },
        });
    }
    async layPhongBanHienTai(nhanVienId, ngay) {
        const ngayKiemTra = ngay || new Date();
        return this.prisma.nhanVienPhongBan.findFirst({
            where: {
                nhanVienId,
                tuNgay: { lte: ngayKiemTra },
                OR: [
                    { denNgay: null },
                    { denNgay: { gte: ngayKiemTra } },
                ],
            },
            include: {
                phongBan: true,
                donViCon: true,
            },
            orderBy: { tuNgay: 'desc' },
        });
    }
    async chuyenPhongBan(nhanVienId, dto, taoBoi) {
        const nhanVien = await this.prisma.nhanVien.findUnique({ where: { id: nhanVienId } });
        if (!nhanVien) {
            throw new common_1.NotFoundException(`Không tìm thấy nhân viên với ID: ${nhanVienId}`);
        }
        await this.layTheoId(dto.phongBanId);
        if (dto.donViConId) {
            const donViCon = await this.prisma.donViCon.findUnique({ where: { id: dto.donViConId } });
            if (!donViCon || donViCon.phongBanId !== dto.phongBanId) {
                throw new common_1.BadRequestException('Đơn vị con không thuộc phòng ban được chọn');
            }
        }
        const tuNgay = new Date(dto.tuNgay);
        const overlap = await this.prisma.nhanVienPhongBan.findFirst({
            where: {
                nhanVienId,
                OR: [
                    { tuNgay: { lte: tuNgay }, denNgay: null },
                    { tuNgay: { lte: tuNgay }, denNgay: { gte: tuNgay } },
                ],
            },
        });
        if (overlap) {
            const ngayTruoc = new Date(tuNgay);
            ngayTruoc.setDate(ngayTruoc.getDate() - 1);
            await this.prisma.nhanVienPhongBan.update({
                where: { id: overlap.id },
                data: { denNgay: ngayTruoc },
            });
        }
        const lichSuMoi = await this.prisma.nhanVienPhongBan.create({
            data: {
                nhanVienId,
                phongBanId: dto.phongBanId,
                donViConId: dto.donViConId,
                tuNgay,
                ghiChu: dto.ghiChu,
                taoBoi,
            },
            include: {
                phongBan: { select: { id: true, tenPhongBan: true } },
                donViCon: { select: { id: true, tenDonVi: true } },
            },
        });
        await this.prisma.nhanVien.update({
            where: { id: nhanVienId },
            data: { phongBanId: dto.phongBanId },
        });
        return lichSuMoi;
    }
    async layPhanQuyenNguoiDung(nguoiDungId) {
        return this.prisma.phanQuyenPhongBan.findMany({
            where: { nguoiDungId },
            include: {
                phongBan: { select: { id: true, maPhongBan: true, tenPhongBan: true } },
            },
        });
    }
    async layPhanQuyenPhongBan(phongBanId) {
        return this.prisma.phanQuyenPhongBan.findMany({
            where: { phongBanId },
        });
    }
    async taoPhanQuyen(dto, taoBoi) {
        await this.layTheoId(dto.phongBanId);
        return this.prisma.phanQuyenPhongBan.create({
            data: {
                ...dto,
                taoBoi,
            },
        });
    }
    async xoaPhanQuyen(id) {
        const phanQuyen = await this.prisma.phanQuyenPhongBan.findUnique({ where: { id } });
        if (!phanQuyen) {
            throw new common_1.NotFoundException(`Không tìm thấy phân quyền với ID: ${id}`);
        }
        return this.prisma.phanQuyenPhongBan.delete({ where: { id } });
    }
    async kiemTraQuyen(nguoiDungId, phongBanId, quyen) {
        const phanQuyen = await this.prisma.phanQuyenPhongBan.findFirst({
            where: {
                nguoiDungId,
                phongBanId,
                quyen,
            },
        });
        return !!phanQuyen;
    }
};
exports.PhongBanService = PhongBanService;
exports.PhongBanService = PhongBanService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PhongBanService);
//# sourceMappingURL=phong-ban.service.js.map