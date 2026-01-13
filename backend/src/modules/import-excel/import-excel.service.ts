// Service Import Excel - Xử lý logic import dữ liệu từ Excel
import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { TinhLuongService } from '../bang-luong/tinh-luong.service';
import * as ExcelJS from 'exceljs';

export interface CotExcel {
  soCot: number;
  tenCot: string;
  loaiMapping: 'thong_tin' | 'khoan_luong';
  truongHeThong?: string; // ma_nhan_vien, ho_ten, phong_ban
  khoanLuongId?: number;
}

export interface KetQuaImport {
  thanhCong: boolean;
  tongDong: number;
  dongThanhCong: number;
  dongLoi: number;
  chiTietLoi: { dong: number; lyDo: string }[];
  tongTienImport: number;
  bangLuongId: number;
}

export interface DuLieuDongExcel {
  soDong: number;
  maNhanVien?: string;
  hoTen?: string;
  phongBan?: string;
  cacKhoan: { khoanLuongId: number; soTien: number }[];
}

@Injectable()
export class ImportExcelService {
  constructor(
    private prisma: PrismaService,
    private tinhLuongService: TinhLuongService,
  ) {}

  /**
   * Đọc header từ file Excel để mapping
   */
  async docHeaderExcel(buffer: Buffer): Promise<{
    headers: string[];
    duLieuMau: string[][];
  }> {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(buffer as unknown as ExcelJS.Buffer);

    const worksheet = workbook.worksheets[0];
    if (!worksheet) {
      throw new BadRequestException('File Excel không có sheet nào');
    }

    const headers: string[] = [];
    const headerRow = worksheet.getRow(1);

    headerRow.eachCell((cell, colNumber) => {
      headers.push(String(cell.value || `Cột ${colNumber}`));
    });

    // Lấy 3 dòng dữ liệu mẫu
    const duLieuMau: string[][] = [];
    for (let i = 2; i <= Math.min(4, worksheet.rowCount); i++) {
      const row = worksheet.getRow(i);
      const rowData: string[] = [];
      row.eachCell((cell) => {
        rowData.push(String(cell.value || ''));
      });
      duLieuMau.push(rowData);
    }

    return { headers, duLieuMau };
  }

  /**
   * Lấy danh sách mapping có sẵn
   */
  async layDanhSachMapping() {
    return this.prisma.mappingExcel.findMany({
      where: { trangThai: true },
      orderBy: { thuTuCot: 'asc' },
    });
  }

  /**
   * Gợi ý mapping tự động dựa trên tên cột
   */
  async goiYMapping(headers: string[]): Promise<CotExcel[]> {
    const khoanLuongs = await this.prisma.khoanLuong.findMany({
      where: { trangThai: true },
    });

    const mappings: CotExcel[] = [];

    for (let i = 0; i < headers.length; i++) {
      const header = headers[i].toLowerCase().trim();
      const mapping: CotExcel = {
        soCot: i + 1,
        tenCot: headers[i],
        loaiMapping: 'khoan_luong',
      };

      // Mapping thông tin nhân viên
      if (header.includes('mã') && (header.includes('nv') || header.includes('nhân viên'))) {
        mapping.loaiMapping = 'thong_tin';
        mapping.truongHeThong = 'ma_nhan_vien';
      } else if (header.includes('họ') && header.includes('tên')) {
        mapping.loaiMapping = 'thong_tin';
        mapping.truongHeThong = 'ho_ten';
      } else if (header.includes('phòng') || header.includes('bộ phận')) {
        mapping.loaiMapping = 'thong_tin';
        mapping.truongHeThong = 'phong_ban';
      } else if (header.includes('tổng') && (header.includes('lương') || header.includes('cộng'))) {
        // Bỏ qua cột tổng - sẽ tính lại
        mapping.loaiMapping = 'thong_tin';
        mapping.truongHeThong = 'tong_luong_bo_qua';
      } else {
        // Tìm khoản lương phù hợp
        for (const kl of khoanLuongs) {
          const tenKhoan = kl.tenKhoan.toLowerCase();
          if (
            header.includes(tenKhoan) ||
            tenKhoan.includes(header) ||
            this.soSanhGanDung(header, tenKhoan)
          ) {
            mapping.khoanLuongId = kl.id;
            break;
          }
        }

        // Mapping theo từ khóa
        if (!mapping.khoanLuongId) {
          if (header.includes('lương') && header.includes('cơ bản')) {
            const kl = khoanLuongs.find((k) => k.maKhoan === 'LUONG_CO_BAN');
            if (kl) mapping.khoanLuongId = kl.id;
          } else if (header.includes('thưởng') && header.includes('hiệu suất')) {
            const kl = khoanLuongs.find((k) => k.maKhoan === 'THUONG_HIEU_SUAT');
            if (kl) mapping.khoanLuongId = kl.id;
          } else if (header.includes('xăng') || header.includes('xe')) {
            const kl = khoanLuongs.find((k) => k.maKhoan === 'PHU_CAP_XANG_XE');
            if (kl) mapping.khoanLuongId = kl.id;
          } else if (header.includes('điện thoại')) {
            const kl = khoanLuongs.find((k) => k.maKhoan === 'PHU_CAP_DIEN_THOAI');
            if (kl) mapping.khoanLuongId = kl.id;
          } else if (header.includes('chuyên cần')) {
            const kl = khoanLuongs.find((k) => k.maKhoan === 'HO_TRO_CHUYEN_CAN');
            if (kl) mapping.khoanLuongId = kl.id;
          } else if (header.includes('ăn') && header.includes('ca')) {
            const kl = khoanLuongs.find((k) => k.maKhoan === 'HO_TRO_AN_CA');
            if (kl) mapping.khoanLuongId = kl.id;
          } else if (header.includes('thưởng') && header.includes('kinh doanh')) {
            const kl = khoanLuongs.find((k) => k.maKhoan === 'THUONG_KINH_DOANH');
            if (kl) mapping.khoanLuongId = kl.id;
          }
        }
      }

      mappings.push(mapping);
    }

    return mappings;
  }

  /**
   * So sánh gần đúng 2 chuỗi
   */
  private soSanhGanDung(str1: string, str2: string): boolean {
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

  /**
   * Import dữ liệu từ Excel vào bảng lương
   */
  async importExcel(
    buffer: Buffer,
    thang: number,
    nam: number,
    phongBanId: number,
    mappings: CotExcel[],
  ): Promise<KetQuaImport> {
    // Kiểm tra phòng ban
    const phongBan = await this.prisma.phongBan.findUnique({
      where: { id: phongBanId },
    });

    if (!phongBan) {
      throw new NotFoundException(`Không tìm thấy phòng ban với ID: ${phongBanId}`);
    }

    // Tìm hoặc tạo bảng lương
    let bangLuong = await this.prisma.bangLuong.findUnique({
      where: {
        thang_nam_phongBanId: { thang, nam, phongBanId },
      },
    });

    if (bangLuong && bangLuong.trangThai !== 'NHAP') {
      throw new BadRequestException('Bảng lương đã chốt, không thể import');
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
    } else {
      // Xóa chi tiết cũ nếu import lại
      await this.prisma.chiTietBangLuong.deleteMany({
        where: { bangLuongId: bangLuong.id },
      });
    }

    // Đọc file Excel
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(buffer as unknown as ExcelJS.Buffer);
    const worksheet = workbook.worksheets[0];

    // Tìm cột mã nhân viên
    const cotMaNhanVien = mappings.find(
      (m) => m.loaiMapping === 'thong_tin' && m.truongHeThong === 'ma_nhan_vien',
    );

    if (!cotMaNhanVien) {
      throw new BadRequestException('Không tìm thấy cột Mã nhân viên trong mapping');
    }

    // Xử lý từng dòng
    const ketQua: KetQuaImport = {
      thanhCong: true,
      tongDong: 0,
      dongThanhCong: 0,
      dongLoi: 0,
      chiTietLoi: [],
      tongTienImport: 0,
      bangLuongId: bangLuong.id,
    };

    const chiTietData: {
      bangLuongId: number;
      nhanVienId: number;
      khoanLuongId: number;
      soTien: number;
    }[] = [];

    for (let rowNum = 2; rowNum <= worksheet.rowCount; rowNum++) {
      const row = worksheet.getRow(rowNum);
      const maNhanVien = String(row.getCell(cotMaNhanVien.soCot).value || '').trim();

      if (!maNhanVien) continue; // Bỏ qua dòng trống

      ketQua.tongDong++;

      // Tìm nhân viên
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

      // Xử lý các khoản lương
      let thanhCongDong = true;

      for (const mapping of mappings) {
        if (mapping.loaiMapping !== 'khoan_luong' || !mapping.khoanLuongId) continue;

        const cellValue = row.getCell(mapping.soCot).value;
        let soTien = 0;

        if (typeof cellValue === 'number') {
          soTien = cellValue;
        } else if (typeof cellValue === 'string') {
          // Loại bỏ dấu phẩy, chấm phân cách nghìn
          const cleaned = cellValue.replace(/[,.\s]/g, '');
          soTien = parseInt(cleaned, 10) || 0;
        } else if (cellValue && typeof cellValue === 'object' && 'result' in cellValue) {
          // Công thức Excel
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

    // Lưu vào database
    if (chiTietData.length > 0) {
      await this.prisma.chiTietBangLuong.createMany({
        data: chiTietData,
        skipDuplicates: true,
      });
    }

    ketQua.thanhCong = ketQua.dongLoi === 0;

    return ketQua;
  }

  /**
   * Export bảng lương ra Excel
   */
  async exportExcel(bangLuongId: number): Promise<Buffer> {
    const bangLuong = await this.tinhLuongService.layBangLuongChiTiet(bangLuongId);

    const workbook = new ExcelJS.Workbook();
    workbook.creator = 'Hệ thống Tính Lương';
    workbook.created = new Date();

    const worksheet = workbook.addWorksheet('Bảng lương');

    // Tạo header
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

    // Style header
    const headerRow = worksheet.getRow(1);
    headerRow.font = { bold: true };
    headerRow.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFE0E0E0' },
    };

    // Thêm dữ liệu
    let stt = 1;
    for (const nv of bangLuong.danhSachNhanVien) {
      const rowData: (string | number)[] = [
        stt++,
        nv.maNhanVien,
        nv.hoTen,
        nv.chucVu || '',
        nv.phongBan,
      ];

      // Thêm các khoản lương theo thứ tự
      for (const kl of bangLuong.danhSachKhoanLuong) {
        const khoan = nv.cacKhoanLuong.find((k) => k.khoanLuongId === kl.id);
        rowData.push(khoan?.soTien || 0);
      }

      rowData.push(nv.tongThuNhap, nv.tongKhauTru, nv.thucLinh);

      worksheet.addRow(rowData);
    }

    // Thêm dòng tổng cộng
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

    // Format số
    const soCol = 6 + bangLuong.danhSachKhoanLuong.length + 3;
    for (let col = 6; col <= soCol; col++) {
      worksheet.getColumn(col).numFmt = '#,##0';
      worksheet.getColumn(col).width = 15;
    }

    // Width các cột khác
    worksheet.getColumn(1).width = 5;
    worksheet.getColumn(2).width = 10;
    worksheet.getColumn(3).width = 25;
    worksheet.getColumn(4).width = 15;
    worksheet.getColumn(5).width = 20;

    const buffer = await workbook.xlsx.writeBuffer();
    return Buffer.from(buffer);
  }
}
