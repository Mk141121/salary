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
exports.ImportExcelService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const tinh_luong_service_1 = require("../bang-luong/tinh-luong.service");
const ExcelJS = require("exceljs");
let ImportExcelService = class ImportExcelService {
    constructor(prisma, tinhLuongService) {
        this.prisma = prisma;
        this.tinhLuongService = tinhLuongService;
    }
    async docHeaderExcel(buffer) {
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.load(buffer);
        const worksheet = workbook.worksheets[0];
        if (!worksheet) {
            throw new common_1.BadRequestException('File Excel không có sheet nào');
        }
        const headers = [];
        const headerRow = worksheet.getRow(1);
        headerRow.eachCell((cell, colNumber) => {
            headers.push(String(cell.value || `Cột ${colNumber}`));
        });
        const duLieuMau = [];
        for (let i = 2; i <= Math.min(4, worksheet.rowCount); i++) {
            const row = worksheet.getRow(i);
            const rowData = [];
            row.eachCell((cell) => {
                rowData.push(String(cell.value || ''));
            });
            duLieuMau.push(rowData);
        }
        return { headers, duLieuMau };
    }
    async layDanhSachMapping() {
        return this.prisma.mappingExcel.findMany({
            where: { trangThai: true },
            orderBy: { thuTuCot: 'asc' },
        });
    }
    async goiYMapping(headers) {
        const khoanLuongs = await this.prisma.khoanLuong.findMany({
            where: { trangThai: true },
        });
        const mappings = [];
        for (let i = 0; i < headers.length; i++) {
            const header = headers[i].toLowerCase().trim();
            const mapping = {
                soCot: i + 1,
                tenCot: headers[i],
                loaiMapping: 'khoan_luong',
            };
            if (header.includes('mã') && (header.includes('nv') || header.includes('nhân viên'))) {
                mapping.loaiMapping = 'thong_tin';
                mapping.truongHeThong = 'ma_nhan_vien';
            }
            else if (header.includes('họ') && header.includes('tên')) {
                mapping.loaiMapping = 'thong_tin';
                mapping.truongHeThong = 'ho_ten';
            }
            else if (header.includes('phòng') || header.includes('bộ phận')) {
                mapping.loaiMapping = 'thong_tin';
                mapping.truongHeThong = 'phong_ban';
            }
            else if (header.includes('tổng') && (header.includes('lương') || header.includes('cộng'))) {
                mapping.loaiMapping = 'thong_tin';
                mapping.truongHeThong = 'tong_luong_bo_qua';
            }
            else {
                for (const kl of khoanLuongs) {
                    const tenKhoan = kl.tenKhoan.toLowerCase();
                    if (header.includes(tenKhoan) ||
                        tenKhoan.includes(header) ||
                        this.soSanhGanDung(header, tenKhoan)) {
                        mapping.khoanLuongId = kl.id;
                        break;
                    }
                }
                if (!mapping.khoanLuongId) {
                    if (header.includes('lương') && header.includes('cơ bản')) {
                        const kl = khoanLuongs.find((k) => k.maKhoan === 'LUONG_CO_BAN');
                        if (kl)
                            mapping.khoanLuongId = kl.id;
                    }
                    else if (header.includes('thưởng') && header.includes('hiệu suất')) {
                        const kl = khoanLuongs.find((k) => k.maKhoan === 'THUONG_HIEU_SUAT');
                        if (kl)
                            mapping.khoanLuongId = kl.id;
                    }
                    else if (header.includes('xăng') || header.includes('xe')) {
                        const kl = khoanLuongs.find((k) => k.maKhoan === 'PHU_CAP_XANG_XE');
                        if (kl)
                            mapping.khoanLuongId = kl.id;
                    }
                    else if (header.includes('điện thoại')) {
                        const kl = khoanLuongs.find((k) => k.maKhoan === 'PHU_CAP_DIEN_THOAI');
                        if (kl)
                            mapping.khoanLuongId = kl.id;
                    }
                    else if (header.includes('chuyên cần')) {
                        const kl = khoanLuongs.find((k) => k.maKhoan === 'HO_TRO_CHUYEN_CAN');
                        if (kl)
                            mapping.khoanLuongId = kl.id;
                    }
                    else if (header.includes('ăn') && header.includes('ca')) {
                        const kl = khoanLuongs.find((k) => k.maKhoan === 'HO_TRO_AN_CA');
                        if (kl)
                            mapping.khoanLuongId = kl.id;
                    }
                    else if (header.includes('thưởng') && header.includes('kinh doanh')) {
                        const kl = khoanLuongs.find((k) => k.maKhoan === 'THUONG_KINH_DOANH');
                        if (kl)
                            mapping.khoanLuongId = kl.id;
                    }
                }
            }
            mappings.push(mapping);
        }
        return mappings;
    }
    soSanhGanDung(str1, str2) {
        const words1 = str1.split(/\s+/);
        const words2 = str2.split(/\s+/);
        let match = 0;
        for (const w1 of words1) {
            for (const w2 of words2) {
                if (w1.includes(w2) || w2.includes(w1)) {
                    match++;
                }
            }
        }
        return match >= 2;
    }
    async importExcel(buffer, thang, nam, phongBanId, mappings) {
        const phongBan = await this.prisma.phongBan.findUnique({
            where: { id: phongBanId },
        });
        if (!phongBan) {
            throw new common_1.NotFoundException(`Không tìm thấy phòng ban với ID: ${phongBanId}`);
        }
        let bangLuong = await this.prisma.bangLuong.findUnique({
            where: {
                thang_nam_phongBanId: { thang, nam, phongBanId },
            },
        });
        if (bangLuong && bangLuong.trangThai !== 'NHAP') {
            throw new common_1.BadRequestException('Bảng lương đã chốt, không thể import');
        }
        if (!bangLuong) {
            bangLuong = await this.prisma.bangLuong.create({
                data: {
                    thang,
                    nam,
                    phongBanId,
                    tenBangLuong: `Bảng lương ${phongBan.tenPhongBan} - Tháng ${thang}/${nam}`,
                    trangThai: 'NHAP',
                },
            });
        }
        else {
            await this.prisma.chiTietBangLuong.deleteMany({
                where: { bangLuongId: bangLuong.id },
            });
        }
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.load(buffer);
        const worksheet = workbook.worksheets[0];
        const cotMaNhanVien = mappings.find((m) => m.loaiMapping === 'thong_tin' && m.truongHeThong === 'ma_nhan_vien');
        if (!cotMaNhanVien) {
            throw new common_1.BadRequestException('Không tìm thấy cột Mã nhân viên trong mapping');
        }
        const ketQua = {
            thanhCong: true,
            tongDong: 0,
            dongThanhCong: 0,
            dongLoi: 0,
            chiTietLoi: [],
            tongTienImport: 0,
            bangLuongId: bangLuong.id,
        };
        const chiTietData = [];
        for (let rowNum = 2; rowNum <= worksheet.rowCount; rowNum++) {
            const row = worksheet.getRow(rowNum);
            const maNhanVien = String(row.getCell(cotMaNhanVien.soCot).value || '').trim();
            if (!maNhanVien)
                continue;
            ketQua.tongDong++;
            const nhanVien = await this.prisma.nhanVien.findUnique({
                where: { maNhanVien },
            });
            if (!nhanVien) {
                ketQua.dongLoi++;
                ketQua.chiTietLoi.push({
                    dong: rowNum,
                    lyDo: `Không tìm thấy nhân viên với mã: ${maNhanVien}`,
                });
                continue;
            }
            let thanhCongDong = true;
            for (const mapping of mappings) {
                if (mapping.loaiMapping !== 'khoan_luong' || !mapping.khoanLuongId)
                    continue;
                const cellValue = row.getCell(mapping.soCot).value;
                let soTien = 0;
                if (typeof cellValue === 'number') {
                    soTien = cellValue;
                }
                else if (typeof cellValue === 'string') {
                    const cleaned = cellValue.replace(/[,.\s]/g, '');
                    soTien = parseInt(cleaned, 10) || 0;
                }
                else if (cellValue && typeof cellValue === 'object' && 'result' in cellValue) {
                    soTien = Number(cellValue.result) || 0;
                }
                if (soTien > 0) {
                    chiTietData.push({
                        bangLuongId: bangLuong.id,
                        nhanVienId: nhanVien.id,
                        khoanLuongId: mapping.khoanLuongId,
                        soTien,
                    });
                    ketQua.tongTienImport += soTien;
                }
            }
            if (thanhCongDong) {
                ketQua.dongThanhCong++;
            }
        }
        if (chiTietData.length > 0) {
            await this.prisma.chiTietBangLuong.createMany({
                data: chiTietData,
                skipDuplicates: true,
            });
        }
        ketQua.thanhCong = ketQua.dongLoi === 0;
        return ketQua;
    }
    async exportExcel(bangLuongId) {
        const bangLuong = await this.tinhLuongService.layBangLuongChiTiet(bangLuongId);
        const workbook = new ExcelJS.Workbook();
        workbook.creator = 'Hệ thống Tính Lương';
        workbook.created = new Date();
        const worksheet = workbook.addWorksheet('Bảng lương');
        const headers = [
            'STT',
            'Mã NV',
            'Họ tên',
            'Chức vụ',
            'Phòng ban',
            ...bangLuong.danhSachKhoanLuong.map((kl) => kl.tenKhoan),
            'Tổng thu nhập',
            'Khấu trừ',
            'Thực lĩnh',
        ];
        worksheet.addRow(headers);
        const headerRow = worksheet.getRow(1);
        headerRow.font = { bold: true };
        headerRow.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFE0E0E0' },
        };
        let stt = 1;
        for (const nv of bangLuong.danhSachNhanVien) {
            const rowData = [
                stt++,
                nv.maNhanVien,
                nv.hoTen,
                nv.chucVu || '',
                nv.phongBan,
            ];
            for (const kl of bangLuong.danhSachKhoanLuong) {
                const khoan = nv.cacKhoanLuong.find((k) => k.khoanLuongId === kl.id);
                rowData.push(khoan?.soTien || 0);
            }
            rowData.push(nv.tongThuNhap, nv.tongKhauTru, nv.thucLinh);
            worksheet.addRow(rowData);
        }
        const tongRow = worksheet.addRow([
            '',
            '',
            'TỔNG CỘNG',
            '',
            '',
            ...Array(bangLuong.danhSachKhoanLuong.length).fill(''),
            bangLuong.tongCong.tongThuNhap,
            bangLuong.tongCong.tongKhauTru,
            bangLuong.tongCong.thucLinh,
        ]);
        tongRow.font = { bold: true };
        const soCol = 6 + bangLuong.danhSachKhoanLuong.length + 3;
        for (let col = 6; col <= soCol; col++) {
            worksheet.getColumn(col).numFmt = '#,##0';
            worksheet.getColumn(col).width = 15;
        }
        worksheet.getColumn(1).width = 5;
        worksheet.getColumn(2).width = 10;
        worksheet.getColumn(3).width = 25;
        worksheet.getColumn(4).width = 15;
        worksheet.getColumn(5).width = 20;
        const buffer = await workbook.xlsx.writeBuffer();
        return Buffer.from(buffer);
    }
};
exports.ImportExcelService = ImportExcelService;
exports.ImportExcelService = ImportExcelService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        tinh_luong_service_1.TinhLuongService])
], ImportExcelService);
//# sourceMappingURL=import-excel.service.js.map