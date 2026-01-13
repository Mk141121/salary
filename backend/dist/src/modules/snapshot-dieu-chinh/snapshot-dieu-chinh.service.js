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
exports.SnapshotDieuChinhService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let SnapshotDieuChinhService = class SnapshotDieuChinhService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async taoSnapshot(bangLuongId, nguoiChot) {
        const bangLuong = await this.prisma.bangLuong.findUnique({
            where: { id: bangLuongId },
            include: {
                phongBan: true,
                chiTiets: {
                    include: {
                        nhanVien: true,
                        khoanLuong: true,
                    },
                },
            },
        });
        if (!bangLuong) {
            throw new common_1.NotFoundException(`Không tìm thấy bảng lương với ID: ${bangLuongId}`);
        }
        if (bangLuong.trangThai !== 'NHAP') {
            throw new common_1.BadRequestException('Bảng lương đã được chốt trước đó');
        }
        const ngayChot = new Date();
        const snapshotData = bangLuong.chiTiets.map((ct) => ({
            bangLuongId: ct.bangLuongId,
            nhanVienId: ct.nhanVienId,
            maNhanVien: ct.nhanVien.maNhanVien,
            hoTen: ct.nhanVien.hoTen,
            phongBan: bangLuong.phongBan.tenPhongBan,
            khoanLuongId: ct.khoanLuongId,
            maKhoan: ct.khoanLuong.maKhoan,
            tenKhoan: ct.khoanLuong.tenKhoan,
            loaiKhoan: ct.khoanLuong.loai,
            soTien: ct.soTien,
            nguon: ct.nguon,
            ngayChot,
            nguoiChot,
        }));
        await this.prisma.snapshotBangLuong.deleteMany({
            where: { bangLuongId },
        });
        await this.prisma.snapshotBangLuong.createMany({
            data: snapshotData,
        });
        await this.prisma.bangLuong.update({
            where: { id: bangLuongId },
            data: {
                trangThai: 'DA_CHOT',
                ngayChot,
                nguoiChot,
            },
        });
        return {
            message: 'Đã chốt bảng lương và tạo snapshot thành công',
            bangLuongId,
            soChiTiet: snapshotData.length,
            ngayChot,
            nguoiChot,
        };
    }
    async laySnapshot(bangLuongId) {
        const snapshots = await this.prisma.snapshotBangLuong.findMany({
            where: { bangLuongId },
            orderBy: [{ nhanVienId: 'asc' }, { khoanLuongId: 'asc' }],
        });
        if (snapshots.length === 0) {
            throw new common_1.NotFoundException(`Không tìm thấy snapshot cho bảng lương ID: ${bangLuongId}`);
        }
        const theoNhanVien = new Map();
        for (const ss of snapshots) {
            if (!theoNhanVien.has(ss.nhanVienId)) {
                theoNhanVien.set(ss.nhanVienId, {
                    nhanVienId: ss.nhanVienId,
                    maNhanVien: ss.maNhanVien,
                    hoTen: ss.hoTen,
                    phongBan: ss.phongBan,
                    chiTiets: [],
                    tongThuNhap: 0,
                    tongKhauTru: 0,
                    thucLinh: 0,
                });
            }
            const nv = theoNhanVien.get(ss.nhanVienId);
            nv.chiTiets.push(ss);
            const soTien = Number(ss.soTien);
            if (ss.loaiKhoan === 'THU_NHAP') {
                nv.tongThuNhap += soTien;
            }
            else {
                nv.tongKhauTru += soTien;
            }
            nv.thucLinh = nv.tongThuNhap - nv.tongKhauTru;
        }
        return {
            bangLuongId,
            ngayChot: snapshots[0].ngayChot,
            nguoiChot: snapshots[0].nguoiChot,
            danhSach: Array.from(theoNhanVien.values()),
        };
    }
    async soSanhSnapshot(bangLuongId) {
        const [snapshots, chiTiets] = await Promise.all([
            this.prisma.snapshotBangLuong.findMany({
                where: { bangLuongId },
            }),
            this.prisma.chiTietBangLuong.findMany({
                where: { bangLuongId },
                include: {
                    nhanVien: true,
                    khoanLuong: true,
                },
            }),
        ]);
        const khacBiet = [];
        const snapshotMap = new Map();
        for (const ss of snapshots) {
            const key = `${ss.nhanVienId}-${ss.khoanLuongId}`;
            snapshotMap.set(key, Number(ss.soTien));
        }
        for (const ct of chiTiets) {
            const key = `${ct.nhanVienId}-${ct.khoanLuongId}`;
            const soTienSnapshot = snapshotMap.get(key) || 0;
            const soTienHienTai = Number(ct.soTien);
            if (soTienSnapshot !== soTienHienTai) {
                khacBiet.push({
                    nhanVienId: ct.nhanVienId,
                    hoTen: ct.nhanVien.hoTen,
                    khoanLuong: ct.khoanLuong.tenKhoan,
                    soTienSnapshot,
                    soTienHienTai,
                    chenhLech: soTienHienTai - soTienSnapshot,
                });
            }
        }
        return {
            bangLuongId,
            coKhacBiet: khacBiet.length > 0,
            soKhacBiet: khacBiet.length,
            chiTiet: khacBiet,
        };
    }
    async sinhMaPhieu() {
        const today = new Date();
        const prefix = `DC${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, '0')}`;
        const lastPhieu = await this.prisma.phieuDieuChinh.findFirst({
            where: {
                maPhieu: { startsWith: prefix },
            },
            orderBy: { maPhieu: 'desc' },
        });
        let seq = 1;
        if (lastPhieu) {
            const lastSeq = parseInt(lastPhieu.maPhieu.slice(-4), 10);
            seq = lastSeq + 1;
        }
        return `${prefix}${String(seq).padStart(4, '0')}`;
    }
    async taoPhieuDieuChinh(data) {
        const bangLuong = await this.prisma.bangLuong.findUnique({
            where: { id: data.bangLuongId },
        });
        if (!bangLuong) {
            throw new common_1.NotFoundException(`Không tìm thấy bảng lương với ID: ${data.bangLuongId}`);
        }
        if (bangLuong.trangThai === 'NHAP') {
            throw new common_1.BadRequestException('Bảng lương chưa chốt, không cần phiếu điều chỉnh');
        }
        const nhanVien = await this.prisma.nhanVien.findUnique({
            where: { id: data.nhanVienId },
        });
        if (!nhanVien) {
            throw new common_1.NotFoundException(`Không tìm thấy nhân viên với ID: ${data.nhanVienId}`);
        }
        const maPhieu = await this.sinhMaPhieu();
        const phieu = await this.prisma.phieuDieuChinh.create({
            data: {
                maPhieu,
                bangLuongId: data.bangLuongId,
                nhanVienId: data.nhanVienId,
                loaiDieuChinh: data.loaiDieuChinh,
                lyDo: data.lyDo,
                ghiChu: data.ghiChu,
                nguoiTao: data.nguoiTao,
                trangThai: 'CHO_DUYET',
                chiTiets: {
                    create: data.chiTiets.map((ct) => ({
                        khoanLuongId: ct.khoanLuongId,
                        soTienCu: ct.soTienCu,
                        soTienMoi: ct.soTienMoi,
                        chenhLech: ct.soTienMoi - ct.soTienCu,
                        ghiChu: ct.ghiChu,
                    })),
                },
            },
            include: {
                nhanVien: true,
                chiTiets: {
                    include: {
                        khoanLuong: true,
                    },
                },
            },
        });
        return phieu;
    }
    async layDanhSachPhieu(bangLuongId, trangThai) {
        const where = {};
        if (bangLuongId)
            where.bangLuongId = bangLuongId;
        if (trangThai)
            where.trangThai = trangThai;
        return this.prisma.phieuDieuChinh.findMany({
            where,
            include: {
                nhanVien: {
                    select: { maNhanVien: true, hoTen: true },
                },
                chiTiets: {
                    include: {
                        khoanLuong: {
                            select: { maKhoan: true, tenKhoan: true },
                        },
                    },
                },
            },
            orderBy: { ngayTao: 'desc' },
        });
    }
    async layChiTietPhieu(id) {
        const phieu = await this.prisma.phieuDieuChinh.findUnique({
            where: { id },
            include: {
                nhanVien: true,
                chiTiets: {
                    include: {
                        khoanLuong: true,
                    },
                },
            },
        });
        if (!phieu) {
            throw new common_1.NotFoundException(`Không tìm thấy phiếu điều chỉnh với ID: ${id}`);
        }
        return phieu;
    }
    async duyetPhieu(id, nguoiDuyet) {
        const phieu = await this.prisma.phieuDieuChinh.findUnique({
            where: { id },
            include: { chiTiets: true },
        });
        if (!phieu) {
            throw new common_1.NotFoundException(`Không tìm thấy phiếu điều chỉnh với ID: ${id}`);
        }
        if (phieu.trangThai !== 'CHO_DUYET') {
            throw new common_1.BadRequestException('Phiếu không ở trạng thái chờ duyệt');
        }
        await this.prisma.phieuDieuChinh.update({
            where: { id },
            data: {
                trangThai: 'DA_DUYET',
                nguoiDuyet,
                ngayDuyet: new Date(),
            },
        });
        for (const ct of phieu.chiTiets) {
            await this.prisma.lichSuChinhSua.create({
                data: {
                    bangLuongId: phieu.bangLuongId,
                    nhanVienId: phieu.nhanVienId,
                    khoanLuongId: ct.khoanLuongId,
                    giaTriCu: ct.soTienCu,
                    giaTriMoi: ct.soTienMoi,
                    loaiThayDoi: 'DIEU_CHINH',
                    nguoiThayDoi: nguoiDuyet,
                    lyDo: `Phiếu điều chỉnh ${phieu.maPhieu}: ${phieu.lyDo}`,
                },
            });
        }
        return {
            message: 'Đã duyệt phiếu điều chỉnh thành công',
            maPhieu: phieu.maPhieu,
            nguoiDuyet,
            ngayDuyet: new Date(),
        };
    }
    async tuChoiPhieu(id, nguoiTuChoi, lyDoTuChoi) {
        const phieu = await this.prisma.phieuDieuChinh.findUnique({
            where: { id },
        });
        if (!phieu) {
            throw new common_1.NotFoundException(`Không tìm thấy phiếu điều chỉnh với ID: ${id}`);
        }
        if (phieu.trangThai !== 'CHO_DUYET') {
            throw new common_1.BadRequestException('Phiếu không ở trạng thái chờ duyệt');
        }
        return this.prisma.phieuDieuChinh.update({
            where: { id },
            data: {
                trangThai: 'TU_CHOI',
                nguoiTuChoi,
                ngayTuChoi: new Date(),
                lyDoTuChoi,
            },
        });
    }
    async huyPhieu(id) {
        const phieu = await this.prisma.phieuDieuChinh.findUnique({
            where: { id },
        });
        if (!phieu) {
            throw new common_1.NotFoundException(`Không tìm thấy phiếu điều chỉnh với ID: ${id}`);
        }
        if (phieu.trangThai === 'DA_DUYET') {
            throw new common_1.BadRequestException('Không thể hủy phiếu đã duyệt');
        }
        return this.prisma.phieuDieuChinh.update({
            where: { id },
            data: { trangThai: 'HUY' },
        });
    }
};
exports.SnapshotDieuChinhService = SnapshotDieuChinhService;
exports.SnapshotDieuChinhService = SnapshotDieuChinhService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SnapshotDieuChinhService);
//# sourceMappingURL=snapshot-dieu-chinh.service.js.map