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
exports.RBACService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const crypto = require("crypto");
let RBACService = class RBACService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    hashPassword(password) {
        return crypto.createHash('sha256').update(password).digest('hex');
    }
    generateToken() {
        return crypto.randomBytes(32).toString('hex');
    }
    async layDanhSachNguoiDung() {
        return this.prisma.nguoiDung.findMany({
            select: {
                id: true,
                tenDangNhap: true,
                email: true,
                hoTen: true,
                nhanVienId: true,
                trangThai: true,
                lanDangNhapCuoi: true,
                ngayTao: true,
                vaiTros: {
                    include: {
                        vaiTro: true,
                    },
                },
            },
            orderBy: { ngayTao: 'desc' },
        });
    }
    async layNguoiDungTheoId(id) {
        const nguoiDung = await this.prisma.nguoiDung.findUnique({
            where: { id },
            select: {
                id: true,
                tenDangNhap: true,
                email: true,
                hoTen: true,
                nhanVienId: true,
                trangThai: true,
                lanDangNhapCuoi: true,
                ngayTao: true,
                vaiTros: {
                    include: {
                        vaiTro: {
                            include: {
                                quyens: {
                                    include: { quyen: true },
                                },
                            },
                        },
                    },
                },
            },
        });
        if (!nguoiDung) {
            throw new common_1.NotFoundException(`Không tìm thấy người dùng với ID ${id}`);
        }
        return nguoiDung;
    }
    async taoNguoiDung(dto) {
        const existingUsername = await this.prisma.nguoiDung.findUnique({
            where: { tenDangNhap: dto.tenDangNhap },
        });
        if (existingUsername) {
            throw new common_1.ConflictException(`Tên đăng nhập ${dto.tenDangNhap} đã tồn tại`);
        }
        const existingEmail = await this.prisma.nguoiDung.findUnique({
            where: { email: dto.email },
        });
        if (existingEmail) {
            throw new common_1.ConflictException(`Email ${dto.email} đã được sử dụng`);
        }
        const nguoiDung = await this.prisma.nguoiDung.create({
            data: {
                tenDangNhap: dto.tenDangNhap,
                matKhau: this.hashPassword(dto.matKhau),
                email: dto.email,
                hoTen: dto.hoTen,
                nhanVienId: dto.nhanVienId,
            },
        });
        if (dto.vaiTroIds && dto.vaiTroIds.length > 0) {
            for (const vaiTroId of dto.vaiTroIds) {
                await this.prisma.nguoiDungVaiTro.create({
                    data: {
                        nguoiDungId: nguoiDung.id,
                        vaiTroId,
                    },
                });
            }
        }
        return this.layNguoiDungTheoId(nguoiDung.id);
    }
    async capNhatNguoiDung(id, dto) {
        await this.layNguoiDungTheoId(id);
        return this.prisma.nguoiDung.update({
            where: { id },
            data: {
                email: dto.email,
                hoTen: dto.hoTen,
                trangThai: dto.trangThai,
            },
            select: {
                id: true,
                tenDangNhap: true,
                email: true,
                hoTen: true,
                trangThai: true,
            },
        });
    }
    async doiMatKhau(id, dto) {
        const nguoiDung = await this.prisma.nguoiDung.findUnique({
            where: { id },
        });
        if (!nguoiDung) {
            throw new common_1.NotFoundException(`Không tìm thấy người dùng với ID ${id}`);
        }
        if (nguoiDung.matKhau !== this.hashPassword(dto.matKhauCu)) {
            throw new common_1.BadRequestException('Mật khẩu cũ không đúng');
        }
        await this.prisma.nguoiDung.update({
            where: { id },
            data: {
                matKhau: this.hashPassword(dto.matKhauMoi),
            },
        });
        return { message: 'Đổi mật khẩu thành công' };
    }
    async dangNhap(dto, ip, userAgent) {
        const nguoiDung = await this.prisma.nguoiDung.findUnique({
            where: { tenDangNhap: dto.tenDangNhap },
            include: {
                vaiTros: {
                    include: {
                        vaiTro: {
                            include: {
                                quyens: {
                                    include: { quyen: true },
                                },
                            },
                        },
                    },
                },
            },
        });
        if (!nguoiDung || nguoiDung.matKhau !== this.hashPassword(dto.matKhau)) {
            await this.ghiAuditLog({
                tenDangNhap: dto.tenDangNhap,
                hanhDong: 'DANG_NHAP',
                bangDuLieu: 'nguoi_dung',
                moTa: 'Đăng nhập thất bại - Sai thông tin',
                diaChiIP: ip,
                userAgent,
            });
            throw new common_1.UnauthorizedException('Tên đăng nhập hoặc mật khẩu không đúng');
        }
        if (nguoiDung.trangThai !== 'HOAT_DONG') {
            throw new common_1.UnauthorizedException('Tài khoản đã bị khóa hoặc vô hiệu hóa');
        }
        const token = this.generateToken();
        const hetHan = new Date();
        hetHan.setHours(hetHan.getHours() + 8);
        await this.prisma.phienDangNhap.create({
            data: {
                nguoiDungId: nguoiDung.id,
                token,
                diaChiIP: ip,
                userAgent,
                thoiGianHetHan: hetHan,
            },
        });
        await this.prisma.nguoiDung.update({
            where: { id: nguoiDung.id },
            data: { lanDangNhapCuoi: new Date() },
        });
        await this.ghiAuditLog({
            nguoiDungId: nguoiDung.id,
            tenDangNhap: nguoiDung.tenDangNhap,
            hanhDong: 'DANG_NHAP',
            bangDuLieu: 'nguoi_dung',
            banGhiId: nguoiDung.id.toString(),
            moTa: 'Đăng nhập thành công',
            diaChiIP: ip,
            userAgent,
        });
        const quyens = new Set();
        const vaiTros = [];
        for (const ndvt of nguoiDung.vaiTros) {
            vaiTros.push(ndvt.vaiTro.maVaiTro);
            for (const vtq of ndvt.vaiTro.quyens) {
                quyens.add(vtq.quyen.maQuyen);
            }
        }
        return {
            token,
            nguoiDung: {
                id: nguoiDung.id,
                tenDangNhap: nguoiDung.tenDangNhap,
                hoTen: nguoiDung.hoTen,
                email: nguoiDung.email,
            },
            vaiTros,
            quyens: Array.from(quyens),
            hetHan,
        };
    }
    async dangXuat(token) {
        const phien = await this.prisma.phienDangNhap.findUnique({
            where: { token },
            include: { nguoiDung: true },
        });
        if (phien) {
            await this.prisma.phienDangNhap.update({
                where: { token },
                data: { trangThai: 'DANG_XUAT' },
            });
            await this.ghiAuditLog({
                nguoiDungId: phien.nguoiDungId,
                tenDangNhap: phien.nguoiDung.tenDangNhap,
                hanhDong: 'DANG_XUAT',
                bangDuLieu: 'nguoi_dung',
                moTa: 'Đăng xuất',
            });
        }
        return { message: 'Đăng xuất thành công' };
    }
    async kiemTraToken(token) {
        const phien = await this.prisma.phienDangNhap.findUnique({
            where: { token },
            include: {
                nguoiDung: {
                    include: {
                        vaiTros: {
                            include: {
                                vaiTro: {
                                    include: {
                                        quyens: {
                                            include: { quyen: true },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });
        if (!phien || phien.trangThai !== 'HOAT_DONG') {
            throw new common_1.UnauthorizedException('Token không hợp lệ');
        }
        if (phien.thoiGianHetHan < new Date()) {
            await this.prisma.phienDangNhap.update({
                where: { token },
                data: { trangThai: 'HET_HAN' },
            });
            throw new common_1.UnauthorizedException('Token đã hết hạn');
        }
        const quyens = new Set();
        const vaiTros = [];
        for (const ndvt of phien.nguoiDung.vaiTros) {
            vaiTros.push(ndvt.vaiTro.maVaiTro);
            for (const vtq of ndvt.vaiTro.quyens) {
                quyens.add(vtq.quyen.maQuyen);
            }
        }
        return {
            nguoiDung: {
                id: phien.nguoiDung.id,
                tenDangNhap: phien.nguoiDung.tenDangNhap,
                hoTen: phien.nguoiDung.hoTen,
                email: phien.nguoiDung.email,
            },
            vaiTros,
            quyens: Array.from(quyens),
        };
    }
    async layDanhSachVaiTro() {
        return this.prisma.vaiTro.findMany({
            include: {
                quyens: {
                    include: { quyen: true },
                },
                _count: {
                    select: { nguoiDungs: true },
                },
            },
            orderBy: { capDo: 'desc' },
        });
    }
    async layVaiTroTheoId(id) {
        const vaiTro = await this.prisma.vaiTro.findUnique({
            where: { id },
            include: {
                quyens: {
                    include: { quyen: true },
                },
                nguoiDungs: {
                    include: { nguoiDung: true },
                },
            },
        });
        if (!vaiTro) {
            throw new common_1.NotFoundException(`Không tìm thấy vai trò với ID ${id}`);
        }
        return vaiTro;
    }
    async taoVaiTro(dto) {
        const existing = await this.prisma.vaiTro.findUnique({
            where: { maVaiTro: dto.maVaiTro },
        });
        if (existing) {
            throw new common_1.ConflictException(`Mã vai trò ${dto.maVaiTro} đã tồn tại`);
        }
        const vaiTro = await this.prisma.vaiTro.create({
            data: {
                maVaiTro: dto.maVaiTro,
                tenVaiTro: dto.tenVaiTro,
                moTa: dto.moTa,
                capDo: dto.capDo || 0,
            },
        });
        if (dto.quyenIds && dto.quyenIds.length > 0) {
            for (const quyenId of dto.quyenIds) {
                await this.prisma.vaiTroQuyen.create({
                    data: {
                        vaiTroId: vaiTro.id,
                        quyenId,
                    },
                });
            }
        }
        return this.layVaiTroTheoId(vaiTro.id);
    }
    async capNhatVaiTro(id, dto) {
        await this.layVaiTroTheoId(id);
        return this.prisma.vaiTro.update({
            where: { id },
            data: dto,
        });
    }
    async ganVaiTroChoNguoiDung(dto) {
        const existing = await this.prisma.nguoiDungVaiTro.findFirst({
            where: {
                nguoiDungId: dto.nguoiDungId,
                vaiTroId: dto.vaiTroId,
                phongBanId: dto.phongBanId || null,
            },
        });
        if (existing) {
            throw new common_1.ConflictException('Vai trò đã được gán cho người dùng này');
        }
        return this.prisma.nguoiDungVaiTro.create({
            data: {
                nguoiDungId: dto.nguoiDungId,
                vaiTroId: dto.vaiTroId,
                phongBanId: dto.phongBanId,
                denNgay: dto.denNgay ? new Date(dto.denNgay) : null,
            },
            include: {
                vaiTro: true,
                nguoiDung: true,
            },
        });
    }
    async goVaiTroKhoiNguoiDung(dto) {
        const existing = await this.prisma.nguoiDungVaiTro.findFirst({
            where: {
                nguoiDungId: dto.nguoiDungId,
                vaiTroId: dto.vaiTroId,
                phongBanId: dto.phongBanId || null,
            },
        });
        if (!existing) {
            throw new common_1.NotFoundException('Không tìm thấy vai trò cần gỡ');
        }
        await this.prisma.nguoiDungVaiTro.delete({
            where: { id: existing.id },
        });
        return { message: 'Đã gỡ vai trò thành công' };
    }
    async layDanhSachQuyen() {
        return this.prisma.quyen.findMany({
            orderBy: [{ nhomQuyen: 'asc' }, { maQuyen: 'asc' }],
        });
    }
    async layQuyenTheoNhom() {
        const quyens = await this.prisma.quyen.findMany({
            orderBy: [{ nhomQuyen: 'asc' }, { maQuyen: 'asc' }],
        });
        const grouped = {};
        for (const quyen of quyens) {
            if (!grouped[quyen.nhomQuyen]) {
                grouped[quyen.nhomQuyen] = [];
            }
            grouped[quyen.nhomQuyen].push(quyen);
        }
        return grouped;
    }
    async taoQuyen(dto) {
        const existing = await this.prisma.quyen.findUnique({
            where: { maQuyen: dto.maQuyen },
        });
        if (existing) {
            throw new common_1.ConflictException(`Mã quyền ${dto.maQuyen} đã tồn tại`);
        }
        return this.prisma.quyen.create({
            data: dto,
        });
    }
    async ganQuyenChoVaiTro(dto) {
        await this.prisma.vaiTroQuyen.deleteMany({
            where: { vaiTroId: dto.vaiTroId },
        });
        for (const quyenId of dto.quyenIds) {
            await this.prisma.vaiTroQuyen.create({
                data: {
                    vaiTroId: dto.vaiTroId,
                    quyenId,
                },
            });
        }
        return this.layVaiTroTheoId(dto.vaiTroId);
    }
    async kiemTraQuyen(nguoiDungId, maQuyen) {
        const nguoiDung = await this.prisma.nguoiDung.findUnique({
            where: { id: nguoiDungId },
            include: {
                vaiTros: {
                    include: {
                        vaiTro: {
                            include: {
                                quyens: {
                                    include: { quyen: true },
                                },
                            },
                        },
                    },
                },
            },
        });
        if (!nguoiDung)
            return false;
        for (const ndvt of nguoiDung.vaiTros) {
            for (const vtq of ndvt.vaiTro.quyens) {
                if (vtq.quyen.maQuyen === maQuyen) {
                    return true;
                }
            }
        }
        return false;
    }
    async ghiAuditLog(dto) {
        return this.prisma.auditLog.create({
            data: {
                nguoiDungId: dto.nguoiDungId,
                tenDangNhap: dto.tenDangNhap,
                hanhDong: dto.hanhDong,
                bangDuLieu: dto.bangDuLieu,
                banGhiId: dto.banGhiId,
                duLieuCu: dto.duLieuCu,
                duLieuMoi: dto.duLieuMoi,
                diaChiIP: dto.diaChiIP,
                userAgent: dto.userAgent,
                moTa: dto.moTa,
            },
        });
    }
    async timKiemAuditLog(dto) {
        const where = {};
        if (dto.nguoiDungId)
            where.nguoiDungId = dto.nguoiDungId;
        if (dto.tenDangNhap)
            where.tenDangNhap = { contains: dto.tenDangNhap };
        if (dto.hanhDong)
            where.hanhDong = dto.hanhDong;
        if (dto.bangDuLieu)
            where.bangDuLieu = dto.bangDuLieu;
        if (dto.tuNgay || dto.denNgay) {
            where.ngayTao = {};
            if (dto.tuNgay)
                where.ngayTao.gte = new Date(dto.tuNgay);
            if (dto.denNgay)
                where.ngayTao.lte = new Date(dto.denNgay);
        }
        const [items, total] = await Promise.all([
            this.prisma.auditLog.findMany({
                where,
                include: {
                    nguoiDung: {
                        select: { hoTen: true },
                    },
                },
                orderBy: { ngayTao: 'desc' },
                take: dto.limit || 50,
                skip: dto.offset || 0,
            }),
            this.prisma.auditLog.count({ where }),
        ]);
        return { items, total };
    }
    async layAuditLogTheoNguoiDung(nguoiDungId, limit = 50) {
        return this.prisma.auditLog.findMany({
            where: { nguoiDungId },
            orderBy: { ngayTao: 'desc' },
            take: limit,
        });
    }
    async layAuditLogTheoBanGhi(bangDuLieu, banGhiId) {
        return this.prisma.auditLog.findMany({
            where: {
                bangDuLieu,
                banGhiId,
            },
            include: {
                nguoiDung: {
                    select: { hoTen: true },
                },
            },
            orderBy: { ngayTao: 'desc' },
        });
    }
    async khoiTaoQuyenMacDinh() {
        const quyenMacDinh = [
            { maQuyen: 'NHAN_VIEN_XEM', tenQuyen: 'Xem nhân viên', nhomQuyen: 'NHAN_VIEN' },
            { maQuyen: 'NHAN_VIEN_TAO', tenQuyen: 'Tạo nhân viên', nhomQuyen: 'NHAN_VIEN' },
            { maQuyen: 'NHAN_VIEN_SUA', tenQuyen: 'Sửa nhân viên', nhomQuyen: 'NHAN_VIEN' },
            { maQuyen: 'NHAN_VIEN_XOA', tenQuyen: 'Xóa nhân viên', nhomQuyen: 'NHAN_VIEN' },
            { maQuyen: 'LUONG_XEM', tenQuyen: 'Xem bảng lương', nhomQuyen: 'LUONG' },
            { maQuyen: 'LUONG_TAO', tenQuyen: 'Tạo bảng lương', nhomQuyen: 'LUONG' },
            { maQuyen: 'LUONG_SUA', tenQuyen: 'Sửa bảng lương', nhomQuyen: 'LUONG' },
            { maQuyen: 'LUONG_CHOT', tenQuyen: 'Chốt bảng lương', nhomQuyen: 'LUONG' },
            { maQuyen: 'LUONG_MO_KHOA', tenQuyen: 'Mở khóa bảng lương', nhomQuyen: 'LUONG' },
            { maQuyen: 'KPI_XEM', tenQuyen: 'Xem KPI', nhomQuyen: 'KPI' },
            { maQuyen: 'KPI_NHAP', tenQuyen: 'Nhập kết quả KPI', nhomQuyen: 'KPI' },
            { maQuyen: 'KPI_DUYET', tenQuyen: 'Duyệt KPI', nhomQuyen: 'KPI' },
            { maQuyen: 'KPI_CAU_HINH', tenQuyen: 'Cấu hình KPI', nhomQuyen: 'KPI' },
            { maQuyen: 'CHAM_CONG_XEM', tenQuyen: 'Xem chấm công', nhomQuyen: 'CHAM_CONG' },
            { maQuyen: 'CHAM_CONG_NHAP', tenQuyen: 'Nhập chấm công', nhomQuyen: 'CHAM_CONG' },
            { maQuyen: 'CHAM_CONG_IMPORT', tenQuyen: 'Import chấm công', nhomQuyen: 'CHAM_CONG' },
            { maQuyen: 'BAO_CAO_XEM', tenQuyen: 'Xem báo cáo', nhomQuyen: 'BAO_CAO' },
            { maQuyen: 'BAO_CAO_XUAT', tenQuyen: 'Xuất báo cáo', nhomQuyen: 'BAO_CAO' },
            { maQuyen: 'CAU_HINH_XEM', tenQuyen: 'Xem cấu hình', nhomQuyen: 'HE_THONG' },
            { maQuyen: 'CAU_HINH_SUA', tenQuyen: 'Sửa cấu hình', nhomQuyen: 'HE_THONG' },
            { maQuyen: 'NGUOI_DUNG_QUAN_LY', tenQuyen: 'Quản lý người dùng', nhomQuyen: 'HE_THONG' },
            { maQuyen: 'AUDIT_XEM', tenQuyen: 'Xem audit log', nhomQuyen: 'HE_THONG' },
        ];
        for (const q of quyenMacDinh) {
            await this.prisma.quyen.upsert({
                where: { maQuyen: q.maQuyen },
                update: {},
                create: q,
            });
        }
        return this.layDanhSachQuyen();
    }
    async khoiTaoVaiTroMacDinh() {
        const vaiTroMacDinh = [
            {
                maVaiTro: 'ADMIN',
                tenVaiTro: 'Quản trị viên',
                moTa: 'Toàn quyền hệ thống',
                capDo: 100,
                quyens: [],
            },
            {
                maVaiTro: 'HR',
                tenVaiTro: 'Nhân sự',
                moTa: 'Quản lý nhân viên, KPI',
                capDo: 80,
                quyens: ['NHAN_VIEN_XEM', 'NHAN_VIEN_TAO', 'NHAN_VIEN_SUA', 'KPI_XEM', 'KPI_NHAP', 'KPI_DUYET', 'CHAM_CONG_XEM', 'CHAM_CONG_NHAP', 'BAO_CAO_XEM'],
            },
            {
                maVaiTro: 'ACCOUNTANT',
                tenVaiTro: 'Kế toán',
                moTa: 'Quản lý lương, BHXH, thuế',
                capDo: 80,
                quyens: ['NHAN_VIEN_XEM', 'LUONG_XEM', 'LUONG_TAO', 'LUONG_SUA', 'LUONG_CHOT', 'CHAM_CONG_XEM', 'BAO_CAO_XEM', 'BAO_CAO_XUAT'],
            },
            {
                maVaiTro: 'MANAGER',
                tenVaiTro: 'Quản lý',
                moTa: 'Quản lý phòng ban',
                capDo: 60,
                quyens: ['NHAN_VIEN_XEM', 'LUONG_XEM', 'KPI_XEM', 'KPI_NHAP', 'CHAM_CONG_XEM', 'BAO_CAO_XEM'],
            },
            {
                maVaiTro: 'EMPLOYEE',
                tenVaiTro: 'Nhân viên',
                moTa: 'Xem thông tin cá nhân',
                capDo: 10,
                quyens: [],
            },
        ];
        const tatCaQuyen = await this.prisma.quyen.findMany();
        for (const vt of vaiTroMacDinh) {
            const vaiTro = await this.prisma.vaiTro.upsert({
                where: { maVaiTro: vt.maVaiTro },
                update: {
                    tenVaiTro: vt.tenVaiTro,
                    moTa: vt.moTa,
                    capDo: vt.capDo,
                },
                create: {
                    maVaiTro: vt.maVaiTro,
                    tenVaiTro: vt.tenVaiTro,
                    moTa: vt.moTa,
                    capDo: vt.capDo,
                },
            });
            let quyenIds = [];
            if (vt.maVaiTro === 'ADMIN') {
                quyenIds = tatCaQuyen.map((q) => q.id);
            }
            else {
                quyenIds = tatCaQuyen
                    .filter((q) => vt.quyens.includes(q.maQuyen))
                    .map((q) => q.id);
            }
            await this.prisma.vaiTroQuyen.deleteMany({
                where: { vaiTroId: vaiTro.id },
            });
            for (const quyenId of quyenIds) {
                await this.prisma.vaiTroQuyen.create({
                    data: {
                        vaiTroId: vaiTro.id,
                        quyenId,
                    },
                });
            }
        }
        return this.layDanhSachVaiTro();
    }
    async khoiTaoAdminMacDinh() {
        const existingAdmin = await this.prisma.nguoiDung.findUnique({
            where: { tenDangNhap: 'admin' },
        });
        if (existingAdmin) {
            return { message: 'Admin đã tồn tại', nguoiDung: existingAdmin };
        }
        const vaiTroAdmin = await this.prisma.vaiTro.findUnique({
            where: { maVaiTro: 'ADMIN' },
        });
        if (!vaiTroAdmin) {
            throw new common_1.BadRequestException('Cần khởi tạo vai trò trước');
        }
        const admin = await this.taoNguoiDung({
            tenDangNhap: 'admin',
            matKhau: 'admin123',
            email: 'admin@company.com',
            hoTen: 'Administrator',
            vaiTroIds: [vaiTroAdmin.id],
        });
        return { message: 'Đã tạo admin mặc định (admin/admin123)', nguoiDung: admin };
    }
};
exports.RBACService = RBACService;
exports.RBACService = RBACService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], RBACService);
//# sourceMappingURL=rbac.service.js.map