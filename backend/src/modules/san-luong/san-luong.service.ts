// Service Sản Lượng - Chia hàng & Giao hàng
import { Injectable, BadRequestException, ForbiddenException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import {
  ChiaHangRowDto,
  GiaoHangRowDto,
  ChiaHangValidationResult,
  GiaoHangValidationResult,
  PreviewChiaHangResponse,
  PreviewGiaoHangResponse,
  AdminSuaChiaHangDto,
  AdminSuaGiaoHangDto,
  QuerySanLuongDto,
  QueryLichSuImportDto,
  LoaiImport,
} from './san-luong.dto';

@Injectable()
export class SanLuongService {
  constructor(private prisma: PrismaService) {}

  // =============== CHIA HÀNG ===============

  /**
   * Preview import chia hàng - validate dữ liệu
   */
  async previewChiaHang(rows: ChiaHangRowDto[], thang: number, nam: number): Promise<PreviewChiaHangResponse> {
    // Kiểm tra kỳ lương có bị chốt chưa
    await this.kiemTraKyLuongChotChua(thang, nam, 'CH');

    // Lấy danh sách nhân viên phòng Chia hàng
    const nhanViens = await this.prisma.nhanVien.findMany({
      where: {
        phongBan: { maPhongBan: 'CH' },
        trangThai: 'DANG_LAM',
      },
      select: { id: true, maNhanVien: true, hoTen: true },
    });
    const mapNhanVien = new Map(nhanViens.map(nv => [nv.maNhanVien, nv]));

    const hopLe: ChiaHangValidationResult[] = [];
    const loi: ChiaHangValidationResult[] = [];

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      const errors: string[] = [];
      const dongSo = i + 2; // +2 vì header là dòng 1, index bắt đầu từ 0

      // Validate ngày
      const ngay = new Date(row.ngay);
      if (isNaN(ngay.getTime())) {
        errors.push(`Ngày không hợp lệ: ${row.ngay}`);
      } else {
        // Kiểm tra ngày có trong tháng/năm không
        if (ngay.getMonth() + 1 !== thang || ngay.getFullYear() !== nam) {
          errors.push(`Ngày ${row.ngay} không thuộc tháng ${thang}/${nam}`);
        }
      }

      // Validate mã nhân viên
      if (!row.maNhanVien) {
        errors.push('Thiếu mã nhân viên');
      } else if (!mapNhanVien.has(row.maNhanVien)) {
        errors.push(`Mã nhân viên không tồn tại hoặc không thuộc phòng Chia hàng: ${row.maNhanVien}`);
      }

      // Validate số lượng
      if (row.soLuongSpDat < 0) {
        errors.push('Số lượng SP đạt không được âm');
      }
      if (row.soLuongSpLoi < 0) {
        errors.push('Số lượng SP lỗi không được âm');
      }

      if (errors.length > 0) {
        loi.push({ hopLe: false, dong: dongSo, data: row, loi: errors });
      } else {
        hopLe.push({ hopLe: true, dong: dongSo, data: row });
      }
    }

    return {
      hopLe,
      loi,
      tongDong: rows.length,
      tongHopLe: hopLe.length,
      tongLoi: loi.length,
    };
  }

  /**
   * Confirm import chia hàng - ghi vào DB
   */
  async confirmChiaHang(
    rows: ChiaHangRowDto[],
    tenFile: string,
    fileHash: string | undefined,
    nguoiImportId: number,
  ) {
    // Lấy map nhân viên
    const nhanViens = await this.prisma.nhanVien.findMany({
      where: { phongBan: { maPhongBan: 'CH' } },
      select: { id: true, maNhanVien: true },
    });
    const mapNhanVien = new Map(nhanViens.map(nv => [nv.maNhanVien, nv.id]));

    // Nhóm theo ngày để lấy ngày đầu tiên cho lịch sử import
    const ngayDuLieu = rows.length > 0 ? new Date(rows[0].ngay) : new Date();

    // Transaction: tạo lịch sử import + upsert dữ liệu
    return this.prisma.$transaction(async (tx) => {
      // Tạo lịch sử import
      const lichSuImport = await tx.lichSuImport.create({
        data: {
          loaiImport: 'CHIA_HANG',
          ngayDuLieu,
          tenFile,
          fileHash,
          soDong: rows.length,
          soDongHopLe: rows.length,
          soDongLoi: 0,
          trangThai: 'THANH_CONG',
          nguoiImportId,
        },
      });

      // Upsert từng dòng
      for (const row of rows) {
        const nhanVienId = mapNhanVien.get(row.maNhanVien);
        if (!nhanVienId) continue;

        const ngay = new Date(row.ngay);
        ngay.setHours(0, 0, 0, 0);

        await tx.sanLuongChiaHang.upsert({
          where: {
            ngay_nhanVienId: { ngay, nhanVienId },
          },
          create: {
            ngay,
            nhanVienId,
            soLuongSpDat: row.soLuongSpDat,
            soLuongSpLoi: row.soLuongSpLoi,
            ghiChu: row.ghiChu,
            nguonDuLieu: 'IMPORT_EXCEL',
            importId: lichSuImport.id,
            khoaSua: true,
            taoBoi: nguoiImportId,
          },
          update: {
            soLuongSpDat: row.soLuongSpDat,
            soLuongSpLoi: row.soLuongSpLoi,
            ghiChu: row.ghiChu,
            nguonDuLieu: 'IMPORT_EXCEL',
            importId: lichSuImport.id,
            capNhatBoi: nguoiImportId,
          },
        });
      }

      return {
        success: true,
        importId: lichSuImport.id,
        soDong: rows.length,
      };
    });
  }

  /**
   * Lấy danh sách sản lượng chia hàng
   */
  async layDanhSachChiaHang(query: QuerySanLuongDto) {
    const where: any = {};
    
    if (query.tuNgay) {
      where.ngay = { ...where.ngay, gte: new Date(query.tuNgay) };
    }
    if (query.denNgay) {
      where.ngay = { ...where.ngay, lte: new Date(query.denNgay) };
    }
    if (query.nhanVienId) {
      where.nhanVienId = query.nhanVienId;
    }

    return this.prisma.sanLuongChiaHang.findMany({
      where,
      include: {
        lichSuImport: {
          select: { id: true, tenFile: true, importLuc: true },
        },
      },
      orderBy: [{ ngay: 'desc' }, { nhanVienId: 'asc' }],
    });
  }

  /**
   * Admin sửa sản lượng chia hàng
   */
  async adminSuaChiaHang(id: number, dto: AdminSuaChiaHangDto, nguoiSuaId: number) {
    const record = await this.prisma.sanLuongChiaHang.findUnique({ where: { id } });
    if (!record) {
      throw new NotFoundException('Không tìm thấy bản ghi');
    }

    // Lưu audit
    const duLieuTruoc = {
      soLuongSpDat: record.soLuongSpDat,
      soLuongSpLoi: record.soLuongSpLoi,
      ghiChu: record.ghiChu,
    };

    const duLieuMoi: any = {};
    if (dto.soLuongSpDat !== undefined) duLieuMoi.soLuongSpDat = dto.soLuongSpDat;
    if (dto.soLuongSpLoi !== undefined) duLieuMoi.soLuongSpLoi = dto.soLuongSpLoi;
    if (dto.ghiChu !== undefined) duLieuMoi.ghiChu = dto.ghiChu;

    return this.prisma.$transaction(async (tx) => {
      // Tạo audit
      await tx.auditSuaDuLieu.create({
        data: {
          loaiDuLieu: 'CHIA_HANG',
          banGhiId: id,
          duLieuTruocJson: JSON.stringify(duLieuTruoc),
          duLieuSauJson: JSON.stringify({ ...duLieuTruoc, ...duLieuMoi }),
          lyDo: dto.lyDo,
          suaBoi: nguoiSuaId,
        },
      });

      // Cập nhật
      return tx.sanLuongChiaHang.update({
        where: { id },
        data: {
          ...duLieuMoi,
          nguonDuLieu: 'ADMIN_SUA',
          capNhatBoi: nguoiSuaId,
        },
      });
    });
  }

  // =============== GIAO HÀNG ===============

  /**
   * Preview import giao hàng - validate dữ liệu
   */
  async previewGiaoHang(rows: GiaoHangRowDto[], thang: number, nam: number): Promise<PreviewGiaoHangResponse> {
    // Kiểm tra kỳ lương có bị chốt chưa
    await this.kiemTraKyLuongChotChua(thang, nam, 'GIAO_HANG');

    // Lấy danh sách nhân viên phòng Giao hàng
    const nhanViens = await this.prisma.nhanVien.findMany({
      where: {
        phongBan: { maPhongBan: { in: ['SHIP', 'GIAO_HANG'] } },
        trangThai: 'DANG_LAM',
      },
      select: { id: true, maNhanVien: true, hoTen: true },
    });
    const mapNhanVien = new Map(nhanViens.map(nv => [nv.maNhanVien, nv]));

    const hopLe: GiaoHangValidationResult[] = [];
    const loi: GiaoHangValidationResult[] = [];

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      const errors: string[] = [];
      const dongSo = i + 2;

      // Validate ngày
      const ngay = new Date(row.ngay);
      if (isNaN(ngay.getTime())) {
        errors.push(`Ngày không hợp lệ: ${row.ngay}`);
      } else {
        if (ngay.getMonth() + 1 !== thang || ngay.getFullYear() !== nam) {
          errors.push(`Ngày ${row.ngay} không thuộc tháng ${thang}/${nam}`);
        }
      }

      // Validate mã nhân viên
      if (!row.maNhanVien) {
        errors.push('Thiếu mã nhân viên');
      } else if (!mapNhanVien.has(row.maNhanVien)) {
        errors.push(`Mã nhân viên không tồn tại hoặc không thuộc phòng Giao hàng: ${row.maNhanVien}`);
      }

      // Validate số liệu
      if (row.khoiLuongThanhCong < 0) {
        errors.push('Khối lượng thành công không được âm');
      }
      if (row.soLanTreGio < 0) {
        errors.push('Số lần trễ giờ không được âm');
      }
      if (row.soLanKhongLayPhieu < 0) {
        errors.push('Số lần không lấy phiếu không được âm');
      }

      if (errors.length > 0) {
        loi.push({ hopLe: false, dong: dongSo, data: row, loi: errors });
      } else {
        hopLe.push({ hopLe: true, dong: dongSo, data: row });
      }
    }

    return {
      hopLe,
      loi,
      tongDong: rows.length,
      tongHopLe: hopLe.length,
      tongLoi: loi.length,
    };
  }

  /**
   * Confirm import giao hàng
   */
  async confirmGiaoHang(
    rows: GiaoHangRowDto[],
    tenFile: string,
    fileHash: string | undefined,
    nguoiImportId: number,
  ) {
    const nhanViens = await this.prisma.nhanVien.findMany({
      where: { phongBan: { maPhongBan: { in: ['SHIP', 'GIAO_HANG'] } } },
      select: { id: true, maNhanVien: true },
    });
    const mapNhanVien = new Map(nhanViens.map(nv => [nv.maNhanVien, nv.id]));

    const ngayDuLieu = rows.length > 0 ? new Date(rows[0].ngay) : new Date();

    return this.prisma.$transaction(async (tx) => {
      const lichSuImport = await tx.lichSuImport.create({
        data: {
          loaiImport: 'GIAO_HANG',
          ngayDuLieu,
          tenFile,
          fileHash,
          soDong: rows.length,
          soDongHopLe: rows.length,
          soDongLoi: 0,
          trangThai: 'THANH_CONG',
          nguoiImportId,
        },
      });

      for (const row of rows) {
        const nhanVienId = mapNhanVien.get(row.maNhanVien);
        if (!nhanVienId) continue;

        const ngay = new Date(row.ngay);
        ngay.setHours(0, 0, 0, 0);

        await tx.giaoHang.upsert({
          where: {
            ngay_nhanVienId: { ngay, nhanVienId },
          },
          create: {
            ngay,
            nhanVienId,
            khoiLuongThanhCong: row.khoiLuongThanhCong,
            soLanTreGio: row.soLanTreGio,
            soLanKhongLayPhieu: row.soLanKhongLayPhieu,
            ghiChu: row.ghiChu,
            nguonDuLieu: 'IMPORT_EXCEL',
            importId: lichSuImport.id,
            khoaSua: true,
            taoBoi: nguoiImportId,
          },
          update: {
            khoiLuongThanhCong: row.khoiLuongThanhCong,
            soLanTreGio: row.soLanTreGio,
            soLanKhongLayPhieu: row.soLanKhongLayPhieu,
            ghiChu: row.ghiChu,
            nguonDuLieu: 'IMPORT_EXCEL',
            importId: lichSuImport.id,
            capNhatBoi: nguoiImportId,
          },
        });
      }

      return {
        success: true,
        importId: lichSuImport.id,
        soDong: rows.length,
      };
    });
  }

  /**
   * Lấy danh sách giao hàng
   */
  async layDanhSachGiaoHang(query: QuerySanLuongDto) {
    const where: any = {};
    
    if (query.tuNgay) {
      where.ngay = { ...where.ngay, gte: new Date(query.tuNgay) };
    }
    if (query.denNgay) {
      where.ngay = { ...where.ngay, lte: new Date(query.denNgay) };
    }
    if (query.nhanVienId) {
      where.nhanVienId = query.nhanVienId;
    }

    return this.prisma.giaoHang.findMany({
      where,
      include: {
        lichSuImport: {
          select: { id: true, tenFile: true, importLuc: true },
        },
      },
      orderBy: [{ ngay: 'desc' }, { nhanVienId: 'asc' }],
    });
  }

  /**
   * Admin sửa giao hàng
   */
  async adminSuaGiaoHang(id: number, dto: AdminSuaGiaoHangDto, nguoiSuaId: number) {
    const record = await this.prisma.giaoHang.findUnique({ where: { id } });
    if (!record) {
      throw new NotFoundException('Không tìm thấy bản ghi');
    }

    const duLieuTruoc = {
      khoiLuongThanhCong: record.khoiLuongThanhCong,
      soLanTreGio: record.soLanTreGio,
      soLanKhongLayPhieu: record.soLanKhongLayPhieu,
      ghiChu: record.ghiChu,
    };

    const duLieuMoi: any = {};
    if (dto.khoiLuongThanhCong !== undefined) duLieuMoi.khoiLuongThanhCong = dto.khoiLuongThanhCong;
    if (dto.soLanTreGio !== undefined) duLieuMoi.soLanTreGio = dto.soLanTreGio;
    if (dto.soLanKhongLayPhieu !== undefined) duLieuMoi.soLanKhongLayPhieu = dto.soLanKhongLayPhieu;
    if (dto.ghiChu !== undefined) duLieuMoi.ghiChu = dto.ghiChu;

    return this.prisma.$transaction(async (tx) => {
      await tx.auditSuaDuLieu.create({
        data: {
          loaiDuLieu: 'GIAO_HANG',
          banGhiId: id,
          duLieuTruocJson: JSON.stringify(duLieuTruoc),
          duLieuSauJson: JSON.stringify({ ...duLieuTruoc, ...duLieuMoi }),
          lyDo: dto.lyDo,
          suaBoi: nguoiSuaId,
        },
      });

      return tx.giaoHang.update({
        where: { id },
        data: {
          ...duLieuMoi,
          nguonDuLieu: 'ADMIN_SUA',
          capNhatBoi: nguoiSuaId,
        },
      });
    });
  }

  // =============== LỊCH SỬ IMPORT ===============

  async layLichSuImport(query: QueryLichSuImportDto) {
    const where: any = {};
    
    if (query.loaiImport) {
      where.loaiImport = query.loaiImport;
    }
    if (query.tuNgay) {
      where.importLuc = { ...where.importLuc, gte: new Date(query.tuNgay) };
    }
    if (query.denNgay) {
      where.importLuc = { ...where.importLuc, lte: new Date(query.denNgay) };
    }

    return this.prisma.lichSuImport.findMany({
      where,
      include: {
        nguoiImport: {
          select: { id: true, hoTen: true, tenDangNhap: true },
        },
      },
      orderBy: { importLuc: 'desc' },
    });
  }

  async layLichSuImportTheoId(id: number) {
    return this.prisma.lichSuImport.findUnique({
      where: { id },
      include: {
        nguoiImport: {
          select: { id: true, hoTen: true, tenDangNhap: true },
        },
        sanLuongChiaHangs: true,
        giaoHangs: true,
      },
    });
  }

  // =============== SNAPSHOT ===============

  /**
   * Tạo snapshot sản lượng cho kỳ lương
   */
  async taoSnapshotSanLuong(bangLuongId: number, thang: number, nam: number) {
    // Tính khoảng thời gian trong tháng
    const tuNgay = new Date(nam, thang - 1, 1);
    const denNgay = new Date(nam, thang, 0); // Ngày cuối tháng

    // Tổng hợp sản lượng chia hàng
    const sanLuongChiaHang = await this.prisma.sanLuongChiaHang.groupBy({
      by: ['nhanVienId'],
      where: {
        ngay: { gte: tuNgay, lte: denNgay },
      },
      _sum: {
        soLuongSpDat: true,
        soLuongSpLoi: true,
      },
    });

    // Tổng hợp giao hàng
    const giaoHang = await this.prisma.giaoHang.groupBy({
      by: ['nhanVienId'],
      where: {
        ngay: { gte: tuNgay, lte: denNgay },
      },
      _sum: {
        khoiLuongThanhCong: true,
        soLanTreGio: true,
        soLanKhongLayPhieu: true,
      },
    });

    // Xóa snapshot cũ và tạo mới
    await this.prisma.$transaction(async (tx) => {
      await tx.snapshotSanLuongChiaHang.deleteMany({ where: { bangLuongId } });
      await tx.snapshotGiaoHang.deleteMany({ where: { bangLuongId } });

      // Tạo snapshot chia hàng
      for (const item of sanLuongChiaHang) {
        await tx.snapshotSanLuongChiaHang.create({
          data: {
            bangLuongId,
            nhanVienId: item.nhanVienId,
            tongSpDat: item._sum.soLuongSpDat || 0,
            tongSpLoi: item._sum.soLuongSpLoi || 0,
          },
        });
      }

      // Tạo snapshot giao hàng
      for (const item of giaoHang) {
        await tx.snapshotGiaoHang.create({
          data: {
            bangLuongId,
            nhanVienId: item.nhanVienId,
            tongKhoiLuongThanhCong: item._sum.khoiLuongThanhCong || 0,
            tongSoLanTreGio: item._sum.soLanTreGio || 0,
            tongSoLanKhongLayPhieu: item._sum.soLanKhongLayPhieu || 0,
          },
        });
      }
    });

    return {
      snapshotChiaHang: sanLuongChiaHang.length,
      snapshotGiaoHang: giaoHang.length,
    };
  }

  /**
   * Lấy snapshot sản lượng cho Rule Engine
   */
  async laySnapshotSanLuong(bangLuongId: number, nhanVienId: number) {
    const [chiaHang, giaoHang] = await Promise.all([
      this.prisma.snapshotSanLuongChiaHang.findUnique({
        where: { bangLuongId_nhanVienId: { bangLuongId, nhanVienId } },
      }),
      this.prisma.snapshotGiaoHang.findUnique({
        where: { bangLuongId_nhanVienId: { bangLuongId, nhanVienId } },
      }),
    ]);

    return {
      // Biến cho Rule Engine - Chia hàng
      TONG_SP_DAT: chiaHang?.tongSpDat || 0,
      TONG_SP_LOI: chiaHang?.tongSpLoi || 0,
      // Biến cho Rule Engine - Giao hàng
      TONG_KHOI_LUONG_THANH_CONG: giaoHang ? Number(giaoHang.tongKhoiLuongThanhCong) : 0,
      TONG_SO_LAN_TRE_GIO: giaoHang?.tongSoLanTreGio || 0,
      TONG_SO_LAN_KHONG_LAY_PHIEU: giaoHang?.tongSoLanKhongLayPhieu || 0,
    };
  }

  // =============== HELPER ===============

  private async kiemTraKyLuongChotChua(thang: number, nam: number, maPhongBan: string) {
    const bangLuong = await this.prisma.bangLuong.findFirst({
      where: {
        thang,
        nam,
        phongBan: { maPhongBan },
        trangThai: { in: ['DA_CHOT', 'KHOA'] },
      },
    });

    if (bangLuong) {
      throw new BadRequestException(
        `Kỳ lương tháng ${thang}/${nam} đã chốt, không thể import dữ liệu`,
      );
    }
  }
}
