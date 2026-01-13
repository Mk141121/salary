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
exports.SuKienThuongPhatService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const client_1 = require("@prisma/client");
let SuKienThuongPhatService = class SuKienThuongPhatService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async layDanhSach(filter) {
        const where = {};
        if (filter.nhanVienId) {
            where.nhanVienId = filter.nhanVienId;
        }
        if (filter.phongBanId) {
            where.phongBanId = filter.phongBanId;
        }
        if (filter.loaiSuKien) {
            where.loaiSuKien = filter.loaiSuKien;
        }
        if (filter.maSuKien) {
            where.maSuKien = filter.maSuKien;
        }
        if (filter.trangThai) {
            where.trangThai = filter.trangThai;
        }
        if (filter.thang && filter.nam) {
            const dauThang = new Date(filter.nam, filter.thang - 1, 1);
            const cuoiThang = new Date(filter.nam, filter.thang, 0);
            where.ngay = {
                gte: dauThang,
                lte: cuoiThang,
            };
        }
        else if (filter.tuNgay || filter.denNgay) {
            where.ngay = {};
            if (filter.tuNgay) {
                where.ngay.gte = filter.tuNgay;
            }
            if (filter.denNgay) {
                where.ngay.lte = filter.denNgay;
            }
        }
        return this.prisma.suKienThuongPhat.findMany({
            where,
            include: {
                nhanVien: {
                    select: {
                        id: true,
                        maNhanVien: true,
                        hoTen: true,
                    },
                },
                phongBan: {
                    select: {
                        id: true,
                        maPhongBan: true,
                        tenPhongBan: true,
                    },
                },
            },
            orderBy: [
                { ngay: 'desc' },
                { ngayTao: 'desc' },
            ],
        });
    }
    async layChiTiet(id) {
        const suKien = await this.prisma.suKienThuongPhat.findUnique({
            where: { id },
            include: {
                nhanVien: true,
                phongBan: true,
            },
        });
        if (!suKien) {
            throw new common_1.NotFoundException(`Không tìm thấy sự kiện với ID: ${id}`);
        }
        return suKien;
    }
    async tao(dto) {
        const nhanVien = await this.prisma.nhanVien.findUnique({
            where: { id: dto.nhanVienId },
        });
        if (!nhanVien) {
            throw new common_1.NotFoundException(`Không tìm thấy nhân viên với ID: ${dto.nhanVienId}`);
        }
        const danhMuc = await this.prisma.danhMucSuKien.findUnique({
            where: { maSuKien: dto.maSuKien },
        });
        let soTien = dto.soTien;
        if (!soTien && danhMuc?.soTienMacDinh) {
            soTien = Number(danhMuc.soTienMacDinh);
        }
        return this.prisma.suKienThuongPhat.create({
            data: {
                nhanVienId: dto.nhanVienId,
                phongBanId: dto.phongBanId,
                ngay: dto.ngay,
                loaiSuKien: dto.loaiSuKien,
                maSuKien: dto.maSuKien,
                giaTri: dto.giaTri || 1,
                soTien: soTien || 0,
                ghiChu: dto.ghiChu,
                trangThai: client_1.TrangThaiSuKien.NHAP,
                nguoiTao: dto.nguoiTao,
            },
            include: {
                nhanVien: true,
                phongBan: true,
            },
        });
    }
    async taoNhieu(dtos) {
        const ketQua = {
            thanhCong: 0,
            thatBai: 0,
            loi: [],
        };
        for (const dto of dtos) {
            try {
                await this.tao(dto);
                ketQua.thanhCong++;
            }
            catch (error) {
                ketQua.thatBai++;
                ketQua.loi.push(`NV ${dto.nhanVienId}: ${error.message}`);
            }
        }
        return ketQua;
    }
    async capNhat(id, dto) {
        const suKien = await this.layChiTiet(id);
        if (suKien.trangThai !== client_1.TrangThaiSuKien.NHAP) {
            throw new common_1.BadRequestException('Chỉ có thể sửa sự kiện đang ở trạng thái Nhập');
        }
        return this.prisma.suKienThuongPhat.update({
            where: { id },
            data: {
                ngay: dto.ngay,
                loaiSuKien: dto.loaiSuKien,
                maSuKien: dto.maSuKien,
                giaTri: dto.giaTri,
                soTien: dto.soTien,
                ghiChu: dto.ghiChu,
            },
            include: {
                nhanVien: true,
                phongBan: true,
            },
        });
    }
    async duyet(id, dto) {
        const suKien = await this.layChiTiet(id);
        if (suKien.trangThai !== client_1.TrangThaiSuKien.NHAP) {
            throw new common_1.BadRequestException('Chỉ có thể duyệt sự kiện đang ở trạng thái Nhập');
        }
        return this.prisma.suKienThuongPhat.update({
            where: { id },
            data: {
                trangThai: client_1.TrangThaiSuKien.DA_DUYET,
                duyetBoi: dto.duyetBoi,
                duyetLuc: new Date(),
                ghiChu: dto.ghiChu || suKien.ghiChu,
            },
            include: {
                nhanVien: true,
                phongBan: true,
            },
        });
    }
    async duyetNhieu(dto) {
        return this.prisma.suKienThuongPhat.updateMany({
            where: {
                id: { in: dto.ids },
                trangThai: client_1.TrangThaiSuKien.NHAP,
            },
            data: {
                trangThai: client_1.TrangThaiSuKien.DA_DUYET,
                duyetBoi: dto.duyetBoi,
                duyetLuc: new Date(),
            },
        });
    }
    async tuChoi(id, lyDo, nguoiTuChoi) {
        const suKien = await this.layChiTiet(id);
        if (suKien.trangThai !== client_1.TrangThaiSuKien.NHAP) {
            throw new common_1.BadRequestException('Chỉ có thể từ chối sự kiện đang ở trạng thái Nhập');
        }
        return this.prisma.suKienThuongPhat.update({
            where: { id },
            data: {
                trangThai: client_1.TrangThaiSuKien.TU_CHOI,
                ghiChu: lyDo,
            },
        });
    }
    async huy(id) {
        const suKien = await this.layChiTiet(id);
        if (suKien.trangThai === client_1.TrangThaiSuKien.DA_DUYET) {
            throw new common_1.BadRequestException('Không thể hủy sự kiện đã duyệt');
        }
        return this.prisma.suKienThuongPhat.update({
            where: { id },
            data: {
                trangThai: client_1.TrangThaiSuKien.HUY,
            },
        });
    }
    async thongKeTheoNhanVien(nhanVienId, thang, nam) {
        const dauThang = new Date(nam, thang - 1, 1);
        const cuoiThang = new Date(nam, thang, 0);
        const suKiens = await this.prisma.suKienThuongPhat.groupBy({
            by: ['maSuKien', 'loaiSuKien'],
            where: {
                nhanVienId,
                ngay: {
                    gte: dauThang,
                    lte: cuoiThang,
                },
                trangThai: client_1.TrangThaiSuKien.DA_DUYET,
            },
            _sum: {
                giaTri: true,
                soTien: true,
            },
            _count: true,
        });
        let tongThuong = 0;
        let tongPhat = 0;
        for (const sk of suKiens) {
            if (sk.loaiSuKien === client_1.LoaiSuKien.THUONG) {
                tongThuong += Number(sk._sum.soTien) || 0;
            }
            else {
                tongPhat += Number(sk._sum.soTien) || 0;
            }
        }
        return {
            chiTiet: suKiens,
            tongThuong,
            tongPhat,
            chenh: tongThuong - tongPhat,
        };
    }
    async laySuKienChoRuleEngine(nhanVienId, phongBanId, thang, nam) {
        const dauThang = new Date(nam, thang - 1, 1);
        const cuoiThang = new Date(nam, thang, 0);
        const suKiens = await this.prisma.suKienThuongPhat.findMany({
            where: {
                nhanVienId,
                phongBanId,
                ngay: {
                    gte: dauThang,
                    lte: cuoiThang,
                },
                trangThai: client_1.TrangThaiSuKien.DA_DUYET,
            },
        });
        const thongKe = {};
        for (const sk of suKiens) {
            if (!thongKe[sk.maSuKien]) {
                thongKe[sk.maSuKien] = { soLan: 0, tongGiaTri: 0, tongTien: 0 };
            }
            thongKe[sk.maSuKien].soLan++;
            thongKe[sk.maSuKien].tongGiaTri += Number(sk.giaTri);
            thongKe[sk.maSuKien].tongTien += Number(sk.soTien);
        }
        return thongKe;
    }
    async layDanhMuc(loai) {
        return this.prisma.danhMucSuKien.findMany({
            where: loai ? { loai, trangThai: true } : { trangThai: true },
            orderBy: [
                { loai: 'asc' },
                { maSuKien: 'asc' },
            ],
        });
    }
    async taoDanhMuc(dto) {
        return this.prisma.danhMucSuKien.create({
            data: {
                maSuKien: dto.maSuKien,
                tenSuKien: dto.tenSuKien,
                loai: dto.loai,
                moTa: dto.moTa,
                soTienMacDinh: dto.soTienMacDinh,
            },
        });
    }
    async khoiTaoDanhMucMau() {
        const danhMucMau = [
            { maSuKien: 'DI_TRE', tenSuKien: 'Đi trễ', loai: client_1.LoaiSuKien.PHAT, soTienMacDinh: 50000 },
            { maSuKien: 'VE_SOM', tenSuKien: 'Về sớm', loai: client_1.LoaiSuKien.PHAT, soTienMacDinh: 50000 },
            { maSuKien: 'VANG_MAT_KHONG_PHEP', tenSuKien: 'Vắng mặt không phép', loai: client_1.LoaiSuKien.PHAT, soTienMacDinh: 200000 },
            { maSuKien: 'SAI_QUY_TRINH', tenSuKien: 'Sai quy trình', loai: client_1.LoaiSuKien.PHAT, soTienMacDinh: 100000 },
            { maSuKien: 'VI_PHAM_NOI_QUY', tenSuKien: 'Vi phạm nội quy', loai: client_1.LoaiSuKien.PHAT, soTienMacDinh: 100000 },
            { maSuKien: 'HOAN_THANH_XUAT_SAC', tenSuKien: 'Hoàn thành xuất sắc', loai: client_1.LoaiSuKien.THUONG, soTienMacDinh: 500000 },
            { maSuKien: 'SANG_KIEN', tenSuKien: 'Sáng kiến/Đề xuất', loai: client_1.LoaiSuKien.THUONG, soTienMacDinh: 300000 },
            { maSuKien: 'CHUYEN_CAN', tenSuKien: 'Chuyên cần (không nghỉ)', loai: client_1.LoaiSuKien.THUONG, soTienMacDinh: 200000 },
            { maSuKien: 'KHACH_HANG_KHEN', tenSuKien: 'Được khách hàng khen', loai: client_1.LoaiSuKien.THUONG, soTienMacDinh: 200000 },
            { maSuKien: 'HO_TRO_DONG_NGHIEP', tenSuKien: 'Hỗ trợ đồng nghiệp', loai: client_1.LoaiSuKien.THUONG, soTienMacDinh: 100000 },
        ];
        for (const dm of danhMucMau) {
            const existing = await this.prisma.danhMucSuKien.findUnique({
                where: { maSuKien: dm.maSuKien },
            });
            if (!existing) {
                await this.prisma.danhMucSuKien.create({
                    data: dm,
                });
            }
        }
        return { message: 'Đã khởi tạo danh mục sự kiện mẫu' };
    }
};
exports.SuKienThuongPhatService = SuKienThuongPhatService;
exports.SuKienThuongPhatService = SuKienThuongPhatService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SuKienThuongPhatService);
//# sourceMappingURL=su-kien-thuong-phat.service.js.map