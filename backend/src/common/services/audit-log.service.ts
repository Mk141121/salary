// Audit Log Service - Ghi log các thao tác nhạy cảm
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

export interface TaoAuditLogDto {
  nguoiDungId?: number;
  tenDangNhap?: string;
  hanhDong: string;
  bangDuLieu: string;
  banGhiId?: string;
  duLieuCu?: string;
  duLieuMoi?: string;
  diaChiIP?: string;
  userAgent?: string;
  moTa?: string;
}

export interface TimKiemAuditLogDto {
  nguoiDungId?: number;
  tenDangNhap?: string;
  hanhDong?: string;
  bangDuLieu?: string;
  tuNgay?: string;
  denNgay?: string;
  trang?: number;
  soLuong?: number;
}

@Injectable()
export class AuditLogService {
  constructor(private prisma: PrismaService) {}

  /**
   * Ghi audit log cho một thao tác
   */
  async ghiLog(dto: TaoAuditLogDto) {
    return this.prisma.auditLog.create({
      data: {
        nguoiDungId: dto.nguoiDungId,
        tenDangNhap: dto.tenDangNhap || 'SYSTEM',
        hanhDong: dto.hanhDong as any,
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

  /**
   * Ghi log cho Rule Engine
   */
  async ghiLogRuleEngine(params: {
    nguoiDungId?: number;
    tenDangNhap?: string;
    bangLuongId: number;
    quyCheId: number;
    soNhanVien: number;
    thoiGianXuLy: number;
    moTa?: string;
  }) {
    return this.ghiLog({
      nguoiDungId: params.nguoiDungId,
      tenDangNhap: params.tenDangNhap,
      hanhDong: 'CHAY_RULE_ENGINE',
      bangDuLieu: 'bang_luong',
      banGhiId: params.bangLuongId.toString(),
      duLieuMoi: JSON.stringify({
        quyCheId: params.quyCheId,
        soNhanVien: params.soNhanVien,
        thoiGianXuLy: params.thoiGianXuLy,
      }),
      moTa: params.moTa || `Chạy Rule Engine cho bảng lương ${params.bangLuongId}`,
    });
  }

  /**
   * Ghi log cho chốt bảng lương
   */
  async ghiLogChotBangLuong(params: {
    nguoiDungId?: number;
    tenDangNhap?: string;
    bangLuongId: number;
    thang: number;
    nam: number;
    phongBan: string;
  }) {
    return this.ghiLog({
      nguoiDungId: params.nguoiDungId,
      tenDangNhap: params.tenDangNhap,
      hanhDong: 'CHOT_LUONG',
      bangDuLieu: 'bang_luong',
      banGhiId: params.bangLuongId.toString(),
      duLieuMoi: JSON.stringify({
        thang: params.thang,
        nam: params.nam,
        phongBan: params.phongBan,
      }),
      moTa: `Chốt bảng lương ${params.phongBan} tháng ${params.thang}/${params.nam}`,
    });
  }

  /**
   * Ghi log cho mở khóa bảng lương
   */
  async ghiLogMoKhoaBangLuong(params: {
    nguoiDungId?: number;
    tenDangNhap?: string;
    bangLuongId: number;
    lyDo: string;
  }) {
    return this.ghiLog({
      nguoiDungId: params.nguoiDungId,
      tenDangNhap: params.tenDangNhap,
      hanhDong: 'MO_KHOA',
      bangDuLieu: 'bang_luong',
      banGhiId: params.bangLuongId.toString(),
      moTa: `Mở khóa bảng lương: ${params.lyDo}`,
    });
  }

  /**
   * Ghi log cho khóa vĩnh viễn bảng lương
   */
  async ghiLogKhoaBangLuong(params: {
    nguoiDungId?: number;
    tenDangNhap?: string;
    bangLuongId: number;
  }) {
    return this.ghiLog({
      nguoiDungId: params.nguoiDungId,
      tenDangNhap: params.tenDangNhap,
      hanhDong: 'CHOT_LUONG',
      bangDuLieu: 'bang_luong',
      banGhiId: params.bangLuongId.toString(),
      moTa: `Khóa vĩnh viễn bảng lương ${params.bangLuongId}`,
    });
  }

  /**
   * Ghi log cho import Excel
   */
  async ghiLogImportExcel(params: {
    nguoiDungId?: number;
    tenDangNhap?: string;
    loaiImport: string;
    tenFile: string;
    soLuong: number;
    thanhCong: number;
    loi: number;
  }) {
    return this.ghiLog({
      nguoiDungId: params.nguoiDungId,
      tenDangNhap: params.tenDangNhap,
      hanhDong: 'IMPORT_EXCEL',
      bangDuLieu: params.loaiImport,
      duLieuMoi: JSON.stringify({
        tenFile: params.tenFile,
        soLuong: params.soLuong,
        thanhCong: params.thanhCong,
        loi: params.loi,
      }),
      moTa: `Import ${params.loaiImport}: ${params.thanhCong}/${params.soLuong} thành công`,
    });
  }

  /**
   * Ghi log cho thay đổi quy chế
   */
  async ghiLogQuyChe(params: {
    nguoiDungId?: number;
    tenDangNhap?: string;
    hanhDong: 'TAO' | 'SUA' | 'XOA' | 'DUYET' | 'TU_CHOI';
    quyCheId: number;
    tenQuyChe: string;
    duLieuCu?: any;
    duLieuMoi?: any;
  }) {
    return this.ghiLog({
      nguoiDungId: params.nguoiDungId,
      tenDangNhap: params.tenDangNhap,
      hanhDong: `${params.hanhDong}_QUY_CHE`,
      bangDuLieu: 'quy_che_luong',
      banGhiId: params.quyCheId.toString(),
      duLieuCu: params.duLieuCu ? JSON.stringify(params.duLieuCu) : undefined,
      duLieuMoi: params.duLieuMoi ? JSON.stringify(params.duLieuMoi) : undefined,
      moTa: `${params.hanhDong} quy chế: ${params.tenQuyChe}`,
    });
  }

  /**
   * Tìm kiếm audit log
   */
  async timKiem(dto: TimKiemAuditLogDto) {
    const where: any = {};

    if (dto.nguoiDungId) where.nguoiDungId = dto.nguoiDungId;
    if (dto.tenDangNhap) where.tenDangNhap = { contains: dto.tenDangNhap };
    if (dto.hanhDong) where.hanhDong = dto.hanhDong;
    if (dto.bangDuLieu) where.bangDuLieu = dto.bangDuLieu;

    if (dto.tuNgay || dto.denNgay) {
      where.ngayTao = {};
      if (dto.tuNgay) where.ngayTao.gte = new Date(dto.tuNgay);
      if (dto.denNgay) where.ngayTao.lte = new Date(dto.denNgay);
    }

    const trang = dto.trang || 1;
    const soLuong = dto.soLuong || 20;

    const [items, total] = await Promise.all([
      this.prisma.auditLog.findMany({
        where,
        include: {
          nguoiDung: {
            select: { hoTen: true },
          },
        },
        orderBy: { ngayTao: 'desc' },
        skip: (trang - 1) * soLuong,
        take: soLuong,
      }),
      this.prisma.auditLog.count({ where }),
    ]);

    return {
      items,
      total,
      trang,
      soLuong,
      tongTrang: Math.ceil(total / soLuong),
    };
  }
}
