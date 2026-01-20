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
   * @param bangLuongId ID bảng lương
   * @param columnConfig Cấu hình cột (tùy chọn) - chỉ export các cột được chỉ định theo thứ tự
   */
  async exportExcel(
    bangLuongId: number,
    columnConfig?: { id: string; label: string }[],
  ): Promise<Buffer> {
    const bangLuong =
      await this.tinhLuongService.layBangLuongChiTiet(bangLuongId);

    const workbook = new ExcelJS.Workbook();
    workbook.creator = 'Hệ thống Tính Lương';
    workbook.created = new Date();

    const worksheet = workbook.addWorksheet('Bảng lương');

    // Mapping column ID to data getter
    const columnGetters: Record<
      string,
      {
        header: string;
        getValue: (nv: (typeof bangLuong.danhSachNhanVien)[0], stt: number) => string | number;
        getTotal?: () => string | number;
        width?: number;
        isNumber?: boolean;
      }
    > = {
      stt: {
        header: 'STT',
        getValue: (_, stt) => stt,
        getTotal: () => '',
        width: 5,
      },
      maNV: {
        header: 'Mã NV',
        getValue: (nv) => nv.maNhanVien,
        getTotal: () => '',
        width: 10,
      },
      hoTen: {
        header: 'Họ tên',
        getValue: (nv) => nv.hoTen,
        getTotal: () => 'TỔNG CỘNG',
        width: 25,
      },
      chucVu: {
        header: 'Chức vụ',
        getValue: (nv) => nv.chucVu || '',
        getTotal: () => '',
        width: 15,
      },
      ngayCong: {
        header: 'Ngày công',
        getValue: (nv) => nv.ngayCongThucTe,
        getTotal: () => '',
        width: 12,
        isNumber: true,
      },
      ncDieuChinh: {
        header: 'NC Điều chỉnh',
        getValue: () => '',
        getTotal: () => '',
        width: 12,
      },
      spDat: {
        header: 'SP đạt',
        getValue: (nv) => nv.sanLuong?.chiaHang?.tongSpDat || 0,
        getTotal: () =>
          bangLuong.danhSachNhanVien.reduce(
            (sum, nv) => sum + (nv.sanLuong?.chiaHang?.tongSpDat || 0),
            0,
          ),
        width: 12,
        isNumber: true,
      },
      spLoi: {
        header: 'SP lỗi',
        getValue: (nv) => nv.sanLuong?.chiaHang?.tongSpLoi || 0,
        getTotal: () =>
          bangLuong.danhSachNhanVien.reduce(
            (sum, nv) => sum + (nv.sanLuong?.chiaHang?.tongSpLoi || 0),
            0,
          ),
        width: 12,
        isNumber: true,
      },
      klGiao: {
        header: 'KL giao (kg)',
        getValue: (nv) => nv.sanLuong?.giaoHang?.tongKhoiLuongThanhCong || 0,
        getTotal: () =>
          bangLuong.danhSachNhanVien.reduce(
            (sum, nv) =>
              sum + (nv.sanLuong?.giaoHang?.tongKhoiLuongThanhCong || 0),
            0,
          ),
        width: 12,
        isNumber: true,
      },
      treGio: {
        header: 'Trễ giờ',
        getValue: (nv) => nv.sanLuong?.giaoHang?.tongSoLanTreGio || 0,
        getTotal: () =>
          bangLuong.danhSachNhanVien.reduce(
            (sum, nv) => sum + (nv.sanLuong?.giaoHang?.tongSoLanTreGio || 0),
            0,
          ),
        width: 10,
        isNumber: true,
      },
      tongThuNhap: {
        header: 'Tổng thu nhập',
        getValue: (nv) => nv.tongThuNhap,
        getTotal: () => bangLuong.tongCong.tongThuNhap,
        width: 15,
        isNumber: true,
      },
      khauTru: {
        header: 'Khấu trừ',
        getValue: (nv) => nv.tongKhauTru,
        getTotal: () => bangLuong.tongCong.tongKhauTru,
        width: 12,
        isNumber: true,
      },
      thucLinh: {
        header: 'Thực lĩnh',
        getValue: (nv) => nv.thucLinh,
        getTotal: () => bangLuong.tongCong.thucLinh,
        width: 15,
        isNumber: true,
      },
      phieuLuong: {
        header: 'Phiếu lương',
        getValue: () => '',
        getTotal: () => '',
        width: 12,
      },
    };

    // Thêm các khoản lương động
    for (const kl of bangLuong.danhSachKhoanLuong) {
      columnGetters[`kl_${kl.id}`] = {
        header: kl.tenKhoan,
        getValue: (nv) => {
          const khoan = nv.cacKhoanLuong.find((k) => k.khoanLuongId === kl.id);
          return khoan?.soTien || 0;
        },
        getTotal: () =>
          bangLuong.danhSachNhanVien.reduce((sum, nv) => {
            const khoan = nv.cacKhoanLuong.find((k) => k.khoanLuongId === kl.id);
            return sum + (khoan?.soTien || 0);
          }, 0),
        width: 15,
        isNumber: true,
      };
    }

    // Xác định danh sách cột cần export
    let columnsToExport: { id: string; header: string }[];

    if (columnConfig && columnConfig.length > 0) {
      // Sử dụng column config từ frontend
      columnsToExport = columnConfig
        .filter((col) => columnGetters[col.id])
        .map((col) => ({
          id: col.id,
          header: columnGetters[col.id].header,
        }));
    } else {
      // Mặc định: tất cả cột cơ bản + khoản lương + tổng
      columnsToExport = [
        { id: 'stt', header: 'STT' },
        { id: 'maNV', header: 'Mã NV' },
        { id: 'hoTen', header: 'Họ tên' },
        { id: 'chucVu', header: 'Chức vụ' },
        ...bangLuong.danhSachKhoanLuong.map((kl) => ({
          id: `kl_${kl.id}`,
          header: kl.tenKhoan,
        })),
        { id: 'tongThuNhap', header: 'Tổng thu nhập' },
        { id: 'khauTru', header: 'Khấu trừ' },
        { id: 'thucLinh', header: 'Thực lĩnh' },
      ];
    }

    // Tạo header
    const headers = columnsToExport.map((col) => col.header);
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
      const rowData = columnsToExport.map((col) => {
        const getter = columnGetters[col.id];
        return getter ? getter.getValue(nv, stt) : '';
      });
      stt++;
      worksheet.addRow(rowData);
    }

    // Thêm dòng tổng cộng
    const totalRowData = columnsToExport.map((col) => {
      const getter = columnGetters[col.id];
      return getter?.getTotal ? getter.getTotal() : '';
    });
    const tongRow = worksheet.addRow(totalRowData);
    tongRow.font = { bold: true };

    // Format số và width
    columnsToExport.forEach((col, index) => {
      const getter = columnGetters[col.id];
      if (getter) {
        worksheet.getColumn(index + 1).width = getter.width || 12;
        if (getter.isNumber) {
          worksheet.getColumn(index + 1).numFmt = '#,##0';
        }
      }
    });

    const buffer = await workbook.xlsx.writeBuffer();
    return Buffer.from(buffer);
  }
}
