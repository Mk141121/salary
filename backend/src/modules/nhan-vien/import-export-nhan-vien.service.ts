// Service Import/Export Nhân Viên - Xử lý logic import/export Excel
import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { 
  KetQuaImportNhanVien, 
  CotNhanVienExcel, 
  TRUONG_NHAN_VIEN, 
  TU_KHOA_MAPPING,
  CapNhatTrangThaiNhanVienDto,
} from './dto/import-export-nhan-vien.dto';
import * as ExcelJS from 'exceljs';
import { GioiTinh, LoaiNhanVien, TrangThaiNhanVien } from '@prisma/client';

interface DuLieuNhanVienImport {
  soDong: number;
  maNhanVien?: string;
  hoTen?: string;
  soDienThoai?: string;
  phongBan?: string;
  gioiTinh?: string;
  chucVu?: string;
  email?: string;
  diaChi?: string;
  soCCCD?: string;
  ngaySinh?: Date;
  ngayVaoLam?: Date;
  nguoiLienHeKhanCap?: string;
  soDienThoaiKhanCap?: string;
  quanHeKhanCap?: string;
  luongCoBan?: number;
  luongDongBHXH?: number;
  tenNganHang?: string;
  soTaiKhoan?: string;
  tenChuTaiKhoan?: string;
  chiNhanhNganHang?: string;
  loaiNhanVien?: string;
  trangThai?: string;
  phuCaps?: Record<string, number>; // maPhuCap -> soTien
}

@Injectable()
export class ImportExportNhanVienService {
  constructor(private prisma: PrismaService) {}

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
      for (let j = 1; j <= headers.length; j++) {
        const cell = row.getCell(j);
        rowData.push(String(cell.value || ''));
      }
      duLieuMau.push(rowData);
    }

    return { headers, duLieuMau };
  }

  /**
   * Gợi ý mapping tự động dựa trên tên cột Excel
   */
  async goiYMapping(headers: string[]): Promise<CotNhanVienExcel[]> {
    const mappings: CotNhanVienExcel[] = [];

    for (let i = 0; i < headers.length; i++) {
      const tenCot = headers[i].toLowerCase().trim();
      let truongHeThong = '';

      // Tìm trường hệ thống phù hợp
      for (const [truong, tuKhoas] of Object.entries(TU_KHOA_MAPPING)) {
        if (tuKhoas.some(tk => tenCot.includes(tk))) {
          truongHeThong = truong;
          break;
        }
      }

      // Check xem có phải cột phụ cấp không (bắt đầu bằng "PC" hoặc "phụ cấp")
      if (!truongHeThong && (tenCot.startsWith('pc') || tenCot.includes('phụ cấp') || tenCot.includes('phu cap'))) {
        truongHeThong = `phuCap_${tenCot.replace(/[^a-z0-9]/gi, '_').toUpperCase()}`;
      }

      mappings.push({
        soCot: i + 1,
        tenCotExcel: headers[i],
        truongHeThong,
      });
    }

    return mappings;
  }

  /**
   * Lấy danh sách trường hệ thống hỗ trợ
   */
  layDanhSachTruong() {
    return TRUONG_NHAN_VIEN;
  }

  /**
   * Import nhân viên từ Excel
   */
  async importNhanVien(
    buffer: Buffer,
    mappings: CotNhanVienExcel[],
  ): Promise<KetQuaImportNhanVien> {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(buffer as unknown as ExcelJS.Buffer);

    const worksheet = workbook.worksheets[0];
    if (!worksheet) {
      throw new BadRequestException('File Excel không có sheet nào');
    }

    // Lấy danh sách phòng ban
    const phongBans = await this.prisma.phongBan.findMany({
      select: { id: true, maPhongBan: true, tenPhongBan: true },
    });
    const phongBanMap = new Map<string, number>();
    phongBans.forEach(pb => {
      phongBanMap.set(pb.maPhongBan.toLowerCase(), pb.id);
      phongBanMap.set(pb.tenPhongBan.toLowerCase(), pb.id);
    });

    // Lấy danh sách khoản lương (phụ cấp)
    const khoanLuongs = await this.prisma.khoanLuong.findMany({
      where: { trangThai: true },
      select: { id: true, maKhoan: true, tenKhoan: true },
    });
    const khoanLuongMap = new Map<string, number>();
    khoanLuongs.forEach(kl => {
      khoanLuongMap.set(kl.maKhoan.toLowerCase(), kl.id);
      khoanLuongMap.set(kl.tenKhoan.toLowerCase(), kl.id);
    });

    // Parse dữ liệu từ Excel
    const duLieuImport: DuLieuNhanVienImport[] = [];
    const chiTietLoi: { dong: number; maNhanVien?: string; lyDo: string }[] = [];

    for (let rowNum = 2; rowNum <= worksheet.rowCount; rowNum++) {
      const row = worksheet.getRow(rowNum);
      
      // Skip dòng trống
      let hasData = false;
      row.eachCell(() => { hasData = true; });
      if (!hasData) continue;

      const duLieu: DuLieuNhanVienImport = { soDong: rowNum, phuCaps: {} };

      for (const mapping of mappings) {
        if (!mapping.truongHeThong) continue;

        const cell = row.getCell(mapping.soCot);
        const value = cell.value;

        // Parse giá trị theo loại trường
        switch (mapping.truongHeThong) {
          case 'maNhanVien':
            duLieu.maNhanVien = this.parseString(value)?.trim();
            break;
          case 'hoTen':
            duLieu.hoTen = this.parseString(value)?.trim();
            break;
          case 'soDienThoai':
            duLieu.soDienThoai = this.parseString(value)?.replace(/[^0-9+]/g, '');
            break;
          case 'phongBan':
            duLieu.phongBan = this.parseString(value)?.trim();
            break;
          case 'gioiTinh':
            duLieu.gioiTinh = this.parseGioiTinh(value);
            break;
          case 'chucVu':
            duLieu.chucVu = this.parseString(value)?.trim();
            break;
          case 'email':
            duLieu.email = this.parseString(value)?.trim().toLowerCase();
            break;
          case 'diaChi':
            duLieu.diaChi = this.parseString(value)?.trim();
            break;
          case 'soCCCD':
            duLieu.soCCCD = this.parseString(value)?.replace(/[^0-9]/g, '');
            break;
          case 'ngaySinh':
            duLieu.ngaySinh = this.parseDate(value);
            break;
          case 'ngayVaoLam':
            duLieu.ngayVaoLam = this.parseDate(value);
            break;
          case 'nguoiLienHeKhanCap':
            duLieu.nguoiLienHeKhanCap = this.parseString(value)?.trim();
            break;
          case 'soDienThoaiKhanCap':
            duLieu.soDienThoaiKhanCap = this.parseString(value)?.replace(/[^0-9+]/g, '');
            break;
          case 'quanHeKhanCap':
            duLieu.quanHeKhanCap = this.parseString(value)?.trim();
            break;
          case 'luongCoBan':
            duLieu.luongCoBan = this.parseNumber(value);
            break;
          case 'luongDongBHXH':
            duLieu.luongDongBHXH = this.parseNumber(value);
            break;
          case 'tenNganHang':
            duLieu.tenNganHang = this.parseString(value)?.trim();
            break;
          case 'soTaiKhoan':
            duLieu.soTaiKhoan = this.parseString(value)?.replace(/[^0-9]/g, '');
            break;
          case 'tenChuTaiKhoan':
            duLieu.tenChuTaiKhoan = this.parseString(value)?.trim();
            break;
          case 'chiNhanhNganHang':
            duLieu.chiNhanhNganHang = this.parseString(value)?.trim();
            break;
          case 'loaiNhanVien':
            duLieu.loaiNhanVien = this.parseLoaiNhanVien(value);
            break;
          case 'trangThai':
            duLieu.trangThai = this.parseTrangThai(value);
            break;
          default:
            // Xử lý phụ cấp
            if (mapping.truongHeThong.startsWith('phuCap_')) {
              const maPhuCap = mapping.truongHeThong.replace('phuCap_', '');
              const soTien = this.parseNumber(value);
              if (soTien && duLieu.phuCaps) {
                duLieu.phuCaps[maPhuCap] = soTien;
              }
            }
        }
      }

      // Validate trường bắt buộc
      if (!duLieu.maNhanVien) {
        chiTietLoi.push({ dong: rowNum, lyDo: 'Thiếu mã nhân viên (bắt buộc)' });
        continue;
      }
      if (!duLieu.hoTen) {
        chiTietLoi.push({ dong: rowNum, maNhanVien: duLieu.maNhanVien, lyDo: 'Thiếu họ tên (bắt buộc)' });
        continue;
      }

      duLieuImport.push(duLieu);
    }

    // Import vào database
    const danhSachThemMoi: string[] = [];
    const danhSachCapNhat: string[] = [];
    let dongThanhCong = 0;

    for (const dl of duLieuImport) {
      try {
        // Tìm nhân viên theo mã
        const nhanVienCu = await this.prisma.nhanVien.findUnique({
          where: { maNhanVien: dl.maNhanVien },
          include: { 
            nganHangs: { where: { laMacDinh: true }, take: 1 },
            hopDongs: { 
              where: { trangThai: 'HIEU_LUC' },
              orderBy: { tuNgay: 'desc' },
              take: 1,
            },
          },
        });

        // Tìm phòng ban ID
        let phongBanId = nhanVienCu?.phongBanId;
        if (dl.phongBan) {
          const pbId = phongBanMap.get(dl.phongBan.toLowerCase());
          if (pbId) {
            phongBanId = pbId;
          }
        }

        if (!phongBanId) {
          chiTietLoi.push({ 
            dong: dl.soDong, 
            maNhanVien: dl.maNhanVien, 
            lyDo: 'Không tìm thấy phòng ban. Vui lòng kiểm tra lại.' 
          });
          continue;
        }

        // Chuẩn bị dữ liệu cập nhật
        const nhanVienData: Record<string, unknown> = {
          hoTen: dl.hoTen,
          phongBanId,
        };

        // Chỉ cập nhật các trường có giá trị
        if (dl.soDienThoai) nhanVienData.soDienThoai = dl.soDienThoai;
        if (dl.gioiTinh) nhanVienData.gioiTinh = dl.gioiTinh as GioiTinh;
        if (dl.chucVu) nhanVienData.chucVu = dl.chucVu;
        if (dl.email) nhanVienData.email = dl.email;
        if (dl.diaChi) nhanVienData.diaChi = dl.diaChi;
        if (dl.soCCCD) nhanVienData.soCCCD = dl.soCCCD;
        if (dl.ngaySinh) nhanVienData.ngaySinh = dl.ngaySinh;
        if (dl.ngayVaoLam) nhanVienData.ngayVaoLam = dl.ngayVaoLam;
        if (dl.nguoiLienHeKhanCap) nhanVienData.nguoiLienHeKhanCap = dl.nguoiLienHeKhanCap;
        if (dl.soDienThoaiKhanCap) nhanVienData.soDienThoaiKhanCap = dl.soDienThoaiKhanCap;
        if (dl.quanHeKhanCap) nhanVienData.quanHeKhanCap = dl.quanHeKhanCap;
        if (dl.luongCoBan !== undefined) nhanVienData.luongCoBan = dl.luongCoBan;
        if (dl.loaiNhanVien) nhanVienData.loaiNhanVien = dl.loaiNhanVien as LoaiNhanVien;
        if (dl.trangThai) nhanVienData.trangThai = dl.trangThai as TrangThaiNhanVien;

        if (nhanVienCu) {
          // Cập nhật nhân viên đã tồn tại
          await this.prisma.nhanVien.update({
            where: { id: nhanVienCu.id },
            data: nhanVienData,
          });

          // Cập nhật thông tin ngân hàng nếu có
          if (dl.soTaiKhoan || dl.tenNganHang) {
            const nganHangCu = nhanVienCu.nganHangs?.[0];
            if (nganHangCu) {
              await this.prisma.nhanVienNganHang.update({
                where: { id: nganHangCu.id },
                data: {
                  tenNganHang: dl.tenNganHang || nganHangCu.tenNganHang,
                  soTaiKhoan: dl.soTaiKhoan || nganHangCu.soTaiKhoan,
                  chuTaiKhoan: dl.tenChuTaiKhoan || nganHangCu.chuTaiKhoan,
                  chiNhanh: dl.chiNhanhNganHang || nganHangCu.chiNhanh,
                },
              });
            } else if (dl.soTaiKhoan && dl.tenNganHang) {
              await this.prisma.nhanVienNganHang.create({
                data: {
                  nhanVienId: nhanVienCu.id,
                  tenNganHang: dl.tenNganHang,
                  soTaiKhoan: dl.soTaiKhoan,
                  chuTaiKhoan: dl.tenChuTaiKhoan || dl.hoTen!,
                  chiNhanh: dl.chiNhanhNganHang,
                  laMacDinh: true,
                },
              });
            }
          }

          // Cập nhật lương trong hợp đồng hiện hành nếu có thay đổi
          if (dl.luongCoBan !== undefined || dl.luongDongBHXH !== undefined) {
            const hopDongHienTai = (nhanVienCu as any).hopDongs?.[0];
            if (hopDongHienTai) {
              // Cập nhật hợp đồng hiện tại
              const hopDongData: Record<string, unknown> = {};
              if (dl.luongCoBan !== undefined) hopDongData.luongCoBan = dl.luongCoBan;
              if (dl.luongDongBHXH !== undefined) hopDongData.luongDongBH = dl.luongDongBHXH;
              
              if (Object.keys(hopDongData).length > 0) {
                await this.prisma.nhanVienHopDong.update({
                  where: { id: hopDongHienTai.id },
                  data: hopDongData,
                });
              }
            } else if (dl.luongCoBan) {
              // Tạo hợp đồng mới nếu chưa có
              await this.prisma.nhanVienHopDong.create({
                data: {
                  nhanVienId: nhanVienCu.id,
                  loaiHopDong: 'VO_THOI_HAN',
                  tuNgay: nhanVienCu.ngayVaoLam || new Date(),
                  luongCoBan: dl.luongCoBan,
                  luongDongBH: dl.luongDongBHXH || dl.luongCoBan,
                  loaiNhanVien: nhanVienCu.loaiNhanVien || 'CHINH_THUC',
                  trangThai: 'HIEU_LUC',
                },
              });
            }
          }

          danhSachCapNhat.push(dl.maNhanVien!);
        } else {
          // Tạo nhân viên mới
          const nhanVienMoi = await this.prisma.nhanVien.create({
            data: {
              maNhanVien: dl.maNhanVien!,
              ...nhanVienData,
            } as any,
          });

          // Tạo thông tin ngân hàng nếu có
          if (dl.soTaiKhoan && dl.tenNganHang) {
            await this.prisma.nhanVienNganHang.create({
              data: {
                nhanVienId: nhanVienMoi.id,
                tenNganHang: dl.tenNganHang,
                soTaiKhoan: dl.soTaiKhoan,
                chuTaiKhoan: dl.tenChuTaiKhoan || dl.hoTen!,
                chiNhanh: dl.chiNhanhNganHang,
                laMacDinh: true,
              },
            });
          }

          // Tạo hợp đồng mới nếu có thông tin lương
          if (dl.luongCoBan) {
            await this.prisma.nhanVienHopDong.create({
              data: {
                nhanVienId: nhanVienMoi.id,
                loaiHopDong: 'VO_THOI_HAN',
                tuNgay: dl.ngayVaoLam || new Date(),
                luongCoBan: dl.luongCoBan,
                luongDongBH: dl.luongDongBHXH || dl.luongCoBan,
                loaiNhanVien: (dl.loaiNhanVien as LoaiNhanVien) || 'CHINH_THUC',
                trangThai: 'HIEU_LUC',
              },
            });
          }

          danhSachThemMoi.push(dl.maNhanVien!);
        }

        dongThanhCong++;
      } catch (err: any) {
        chiTietLoi.push({ 
          dong: dl.soDong, 
          maNhanVien: dl.maNhanVien, 
          lyDo: err.message || 'Lỗi không xác định' 
        });
      }
    }

    return {
      thanhCong: chiTietLoi.length === 0,
      tongDong: duLieuImport.length + chiTietLoi.length,
      dongThanhCong,
      dongThem: danhSachThemMoi.length,
      dongCapNhat: danhSachCapNhat.length,
      dongLoi: chiTietLoi.length,
      chiTietLoi,
      danhSachThemMoi,
      danhSachCapNhat,
    };
  }

  /**
   * Export danh sách nhân viên ra Excel
   */
  async exportNhanVien(
    phongBanId?: number,
    trangThai?: TrangThaiNhanVien,
  ): Promise<Buffer> {
    // Query nhân viên
    const where: Record<string, unknown> = {};
    if (phongBanId) where.phongBanId = phongBanId;
    if (trangThai) where.trangThai = trangThai;

    const nhanViens = await this.prisma.nhanVien.findMany({
      where,
      include: {
        phongBan: { select: { maPhongBan: true, tenPhongBan: true } },
        nganHangs: { where: { laMacDinh: true }, take: 1 },
        hopDongs: {
          where: { trangThai: 'HIEU_LUC' },
          orderBy: { tuNgay: 'desc' },
          take: 1,
        },
      },
      orderBy: [{ phongBanId: 'asc' }, { maNhanVien: 'asc' }],
    });

    // Tạo workbook
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Danh sách nhân viên');

    // Header columns
    worksheet.columns = [
      { header: 'Mã NV', key: 'maNhanVien', width: 12 },
      { header: 'Họ tên', key: 'hoTen', width: 25 },
      { header: 'Số điện thoại', key: 'soDienThoai', width: 15 },
      { header: 'Phòng ban', key: 'phongBan', width: 20 },
      { header: 'Giới tính', key: 'gioiTinh', width: 10 },
      { header: 'Chức vụ', key: 'chucVu', width: 18 },
      { header: 'Email', key: 'email', width: 25 },
      { header: 'Địa chỉ', key: 'diaChi', width: 35 },
      { header: 'Số CCCD', key: 'soCCCD', width: 15 },
      { header: 'Ngày sinh', key: 'ngaySinh', width: 12 },
      { header: 'Ngày vào làm', key: 'ngayVaoLam', width: 12 },
      { header: 'Người liên hệ khẩn cấp', key: 'nguoiLienHeKhanCap', width: 22 },
      { header: 'SĐT khẩn cấp', key: 'soDienThoaiKhanCap', width: 15 },
      { header: 'Quan hệ', key: 'quanHeKhanCap', width: 12 },
      { header: 'Lương cơ bản', key: 'luongCoBan', width: 15 },
      { header: 'Lương đóng BHXH', key: 'luongDongBHXH', width: 15 },
      { header: 'Tên ngân hàng', key: 'tenNganHang', width: 20 },
      { header: 'Số tài khoản', key: 'soTaiKhoan', width: 18 },
      { header: 'Tên chủ TK', key: 'tenChuTaiKhoan', width: 20 },
      { header: 'Chi nhánh NH', key: 'chiNhanhNganHang', width: 20 },
      { header: 'Loại NV', key: 'loaiNhanVien', width: 12 },
      { header: 'Trạng thái', key: 'trangThai', width: 12 },
    ];

    // Style header
    worksheet.getRow(1).font = { bold: true };
    worksheet.getRow(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF4472C4' },
    };
    worksheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };

    // Add data
    for (const nv of nhanViens as any[]) {
      const nganHang = nv.nganHangs?.[0];
      const hopDong = nv.hopDongs?.[0];

      worksheet.addRow({
        maNhanVien: nv.maNhanVien,
        hoTen: nv.hoTen,
        soDienThoai: nv.soDienThoai,
        phongBan: nv.phongBan?.tenPhongBan,
        gioiTinh: this.formatGioiTinh(nv.gioiTinh),
        chucVu: nv.chucVu,
        email: nv.email,
        diaChi: nv.diaChi,
        soCCCD: nv.soCCCD,
        ngaySinh: nv.ngaySinh ? this.formatDate(nv.ngaySinh) : '',
        ngayVaoLam: this.formatDate(nv.ngayVaoLam),
        nguoiLienHeKhanCap: nv.nguoiLienHeKhanCap,
        soDienThoaiKhanCap: nv.soDienThoaiKhanCap,
        quanHeKhanCap: nv.quanHeKhanCap,
        luongCoBan: hopDong?.luongCoBan || Number(nv.luongCoBan),
        luongDongBHXH: hopDong?.luongDongBH || 0,
        tenNganHang: nganHang?.tenNganHang,
        soTaiKhoan: nganHang?.soTaiKhoan,
        tenChuTaiKhoan: nganHang?.chuTaiKhoan,
        chiNhanhNganHang: nganHang?.chiNhanh,
        loaiNhanVien: this.formatLoaiNhanVien(nv.loaiNhanVien),
        trangThai: this.formatTrangThai(nv.trangThai),
      });
    }

    // Format số
    worksheet.getColumn('luongCoBan').numFmt = '#,##0';
    worksheet.getColumn('luongDongBHXH').numFmt = '#,##0';

    // Tạo buffer
    const buffer = await workbook.xlsx.writeBuffer();
    return Buffer.from(buffer);
  }

  /**
   * Tải template import nhân viên
   */
  async downloadTemplate(): Promise<Buffer> {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Template Nhân Viên');

    // Header columns
    worksheet.columns = [
      { header: 'Mã NV (*)', key: 'maNhanVien', width: 12 },
      { header: 'Họ tên (*)', key: 'hoTen', width: 25 },
      { header: 'Số điện thoại', key: 'soDienThoai', width: 15 },
      { header: 'Phòng ban', key: 'phongBan', width: 20 },
      { header: 'Giới tính', key: 'gioiTinh', width: 10 },
      { header: 'Chức vụ', key: 'chucVu', width: 18 },
      { header: 'Email', key: 'email', width: 25 },
      { header: 'Địa chỉ', key: 'diaChi', width: 35 },
      { header: 'Số CCCD', key: 'soCCCD', width: 15 },
      { header: 'Ngày sinh', key: 'ngaySinh', width: 12 },
      { header: 'Ngày vào làm', key: 'ngayVaoLam', width: 12 },
      { header: 'Người liên hệ khẩn cấp', key: 'nguoiLienHeKhanCap', width: 22 },
      { header: 'SĐT khẩn cấp', key: 'soDienThoaiKhanCap', width: 15 },
      { header: 'Quan hệ', key: 'quanHeKhanCap', width: 12 },
      { header: 'Lương cơ bản', key: 'luongCoBan', width: 15 },
      { header: 'Lương đóng BHXH', key: 'luongDongBHXH', width: 15 },
      { header: 'Tên ngân hàng', key: 'tenNganHang', width: 20 },
      { header: 'Số tài khoản', key: 'soTaiKhoan', width: 18 },
      { header: 'Tên chủ TK', key: 'tenChuTaiKhoan', width: 20 },
      { header: 'Chi nhánh NH', key: 'chiNhanhNganHang', width: 20 },
    ];

    // Style header
    worksheet.getRow(1).font = { bold: true };
    worksheet.getRow(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF4472C4' },
    };
    worksheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };

    // Add sample data
    worksheet.addRow({
      maNhanVien: 'NV001',
      hoTen: 'Nguyễn Văn A',
      soDienThoai: '0901234567',
      phongBan: 'Kinh doanh',
      gioiTinh: 'Nam',
      chucVu: 'Nhân viên',
      email: 'a.nguyen@company.vn',
      diaChi: '123 Nguyễn Huệ, Q1, TP.HCM',
      soCCCD: '001234567890',
      ngaySinh: '15/01/1990',
      ngayVaoLam: '01/06/2023',
      nguoiLienHeKhanCap: 'Nguyễn Thị B',
      soDienThoaiKhanCap: '0909876543',
      quanHeKhanCap: 'Mẹ',
      luongCoBan: 15000000,
      luongDongBHXH: 10000000,
      tenNganHang: 'Vietcombank',
      soTaiKhoan: '0123456789',
      tenChuTaiKhoan: 'NGUYEN VAN A',
      chiNhanhNganHang: 'Chi nhánh HCM',
    });

    // Add hướng dẫn
    const wsHuongDan = workbook.addWorksheet('Hướng dẫn');
    wsHuongDan.addRow(['HƯỚNG DẪN IMPORT NHÂN VIÊN']);
    wsHuongDan.addRow([]);
    wsHuongDan.addRow(['1. Các trường có dấu (*) là bắt buộc: Mã NV, Họ tên']);
    wsHuongDan.addRow(['2. Giới tính: Nam, Nữ, Khác']);
    wsHuongDan.addRow(['3. Phòng ban: Có thể nhập mã hoặc tên phòng ban']);
    wsHuongDan.addRow(['4. Ngày tháng: Định dạng DD/MM/YYYY']);
    wsHuongDan.addRow(['5. Nếu mã NV đã tồn tại, hệ thống sẽ cập nhật thông tin']);
    wsHuongDan.addRow(['6. Nếu mã NV chưa tồn tại, hệ thống sẽ tạo mới']);
    wsHuongDan.getRow(1).font = { bold: true, size: 14 };

    const buffer = await workbook.xlsx.writeBuffer();
    return Buffer.from(buffer);
  }

  /**
   * Cập nhật trạng thái nhân viên (Active/Deactive)
   */
  async capNhatTrangThai(
    id: number,
    dto: CapNhatTrangThaiNhanVienDto,
  ) {
    const nhanVien = await this.prisma.nhanVien.findUnique({
      where: { id },
    });

    if (!nhanVien) {
      throw new NotFoundException(`Không tìm thấy nhân viên với ID: ${id}`);
    }

    const updateData: Record<string, unknown> = {
      trangThai: dto.trangThai,
    };

    // Nếu nghỉ việc, set ngày nghỉ việc
    if (dto.trangThai === 'NGHI_VIEC') {
      updateData.ngayNghiViec = dto.ngayNghiViec 
        ? new Date(dto.ngayNghiViec) 
        : new Date();
    }

    // Nếu kích hoạt lại, xóa ngày nghỉ việc
    if (dto.trangThai === 'DANG_LAM') {
      updateData.ngayNghiViec = null;
    }

    return this.prisma.nhanVien.update({
      where: { id },
      data: updateData,
      include: { phongBan: true },
    });
  }

  /**
   * Cập nhật hàng loạt trạng thái
   */
  async capNhatHangLoatTrangThai(
    nhanVienIds: number[],
    trangThai: TrangThaiNhanVien,
    lyDo?: string,
  ) {
    const updateData: Record<string, unknown> = { trangThai };

    if (trangThai === 'NGHI_VIEC') {
      updateData.ngayNghiViec = new Date();
    }
    if (trangThai === 'DANG_LAM') {
      updateData.ngayNghiViec = null;
    }

    const result = await this.prisma.nhanVien.updateMany({
      where: { id: { in: nhanVienIds } },
      data: updateData,
    });

    return {
      thanhCong: true,
      soNhanVienCapNhat: result.count,
      trangThaiMoi: trangThai,
    };
  }

  // ============ Helper methods ============

  private parseString(value: unknown): string | undefined {
    if (value === null || value === undefined) return undefined;
    return String(value);
  }

  private parseNumber(value: unknown): number | undefined {
    if (value === null || value === undefined) return undefined;
    const num = Number(String(value).replace(/[^0-9.-]/g, ''));
    return isNaN(num) ? undefined : num;
  }

  private parseDate(value: unknown): Date | undefined {
    if (value === null || value === undefined) return undefined;
    
    // Nếu là Date object
    if (value instanceof Date) return value;
    
    // Nếu là string
    const str = String(value).trim();
    
    // Format DD/MM/YYYY
    const ddmmyyyy = str.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})$/);
    if (ddmmyyyy) {
      return new Date(Number(ddmmyyyy[3]), Number(ddmmyyyy[2]) - 1, Number(ddmmyyyy[1]));
    }
    
    // Format YYYY-MM-DD
    const yyyymmdd = str.match(/^(\d{4})[\/\-](\d{1,2})[\/\-](\d{1,2})$/);
    if (yyyymmdd) {
      return new Date(Number(yyyymmdd[1]), Number(yyyymmdd[2]) - 1, Number(yyyymmdd[3]));
    }
    
    // Try native parsing
    const date = new Date(str);
    return isNaN(date.getTime()) ? undefined : date;
  }

  private parseGioiTinh(value: unknown): string | undefined {
    if (!value) return undefined;
    const str = String(value).toLowerCase().trim();
    if (str === 'nam' || str === 'male' || str === 'm') return 'NAM';
    if (str === 'nữ' || str === 'nu' || str === 'female' || str === 'f') return 'NU';
    if (str === 'khác' || str === 'khac' || str === 'other') return 'KHAC';
    return undefined;
  }

  private parseLoaiNhanVien(value: unknown): string | undefined {
    if (!value) return undefined;
    const str = String(value).toLowerCase().trim();
    if (str.includes('thử việc') || str.includes('thu viec')) return 'THU_VIEC';
    if (str.includes('chính thức') || str.includes('chinh thuc')) return 'CHINH_THUC';
    if (str.includes('học việc') || str.includes('hoc viec')) return 'HOC_VIEC';
    if (str.includes('thực tập') || str.includes('thuc tap')) return 'THUC_TAP';
    if (str.includes('cộng tác viên') || str.includes('ctv')) return 'CONG_TAC_VIEN';
    if (str.includes('thời vụ') || str.includes('thoi vu')) return 'THOI_VU';
    return undefined;
  }

  private parseTrangThai(value: unknown): string | undefined {
    if (!value) return undefined;
    const str = String(value).toLowerCase().trim();
    if (str.includes('đang làm') || str.includes('dang lam') || str.includes('active')) return 'DANG_LAM';
    if (str.includes('tạm nghỉ') || str.includes('tam nghi')) return 'TAM_NGHI';
    if (str.includes('nghỉ việc') || str.includes('nghi viec') || str.includes('inactive')) return 'NGHI_VIEC';
    return undefined;
  }

  private formatDate(date: Date): string {
    const d = new Date(date);
    return `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getFullYear()}`;
  }

  private formatGioiTinh(gioiTinh: GioiTinh | null): string {
    if (!gioiTinh) return '';
    switch (gioiTinh) {
      case 'NAM': return 'Nam';
      case 'NU': return 'Nữ';
      case 'KHAC': return 'Khác';
      default: return '';
    }
  }

  private formatLoaiNhanVien(loai: LoaiNhanVien): string {
    switch (loai) {
      case 'THU_VIEC': return 'Thử việc';
      case 'CHINH_THUC': return 'Chính thức';
      case 'HOC_VIEC': return 'Học việc';
      case 'THUC_TAP': return 'Thực tập';
      case 'CONG_TAC_VIEN': return 'CTV';
      case 'THOI_VU': return 'Thời vụ';
      default: return loai;
    }
  }

  private formatTrangThai(trangThai: TrangThaiNhanVien): string {
    switch (trangThai) {
      case 'DANG_LAM': return 'Đang làm';
      case 'TAM_NGHI': return 'Tạm nghỉ';
      case 'NGHI_VIEC': return 'Nghỉ việc';
      default: return trangThai;
    }
  }
}
