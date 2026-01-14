// Service Rule Engine - Logic công thức tính lương động
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { KieuDuLieu } from '@prisma/client';
import { NGAY_CONG_CHUAN_MAC_DINH } from '../../common/constants';

// Interface cho biến số trong công thức
export interface BienSoGiaTri {
  [key: string]: number | string;
}

// Interface kết quả tính công thức
export interface KetQuaTinhCongThuc {
  congThuc: string;
  bienSo: BienSoGiaTri;
  ketQua: number;
  chiTiet: string;
}

@Injectable()
export class RuleEngineService {
  constructor(private prisma: PrismaService) {}

  // ============================================
  // QUẢN LÝ CÔNG THỨC
  // ============================================

  // Lấy danh sách công thức
  async layDanhSachCongThuc(phongBanId?: number) {
    const where: Record<string, unknown> = { trangThai: true };
    if (phongBanId) {
      where.OR = [{ phongBanId }, { phongBanId: null }];
    }

    return this.prisma.congThucLuong.findMany({
      where,
      include: {
        bienSos: true,
      },
      orderBy: { ngayTao: 'desc' },
    });
  }

  // Lấy chi tiết công thức
  async layCongThuc(id: number) {
    const congThuc = await this.prisma.congThucLuong.findUnique({
      where: { id },
      include: {
        bienSos: true,
      },
    });

    if (!congThuc) {
      throw new NotFoundException(`Không tìm thấy công thức với ID: ${id}`);
    }

    return congThuc;
  }

  // Tạo công thức mới
  async taoCongThuc(data: {
    maCongThuc: string;
    tenCongThuc: string;
    moTa?: string;
    phongBanId?: number;
    congThuc: string;
    tuNgay: Date;
    denNgay?: Date;
    nguoiTao?: string;
    bienSos?: {
      tenBien: string;
      moTa?: string;
      kieuDuLieu?: KieuDuLieu;
      nguonDuLieu?: string;
      giaTriMacDinh?: string;
    }[];
  }) {
    // Validate công thức
    this.validateCongThuc(data.congThuc);

    return this.prisma.congThucLuong.create({
      data: {
        maCongThuc: data.maCongThuc,
        tenCongThuc: data.tenCongThuc,
        moTa: data.moTa,
        phongBanId: data.phongBanId,
        congThuc: data.congThuc,
        tuNgay: data.tuNgay,
        denNgay: data.denNgay,
        nguoiTao: data.nguoiTao,
        bienSos: data.bienSos
          ? {
              create: data.bienSos,
            }
          : undefined,
      },
      include: {
        bienSos: true,
      },
    });
  }

  // Cập nhật công thức (tạo phiên bản mới)
  async capNhatCongThuc(
    id: number,
    data: {
      congThuc: string;
      lyDoThayDoi?: string;
      nguoiThayDoi: string;
    },
  ) {
    const congThucHienTai = await this.layCongThuc(id);

    // Validate công thức mới
    this.validateCongThuc(data.congThuc);

    // Lưu lịch sử
    await this.prisma.lichSuCongThuc.create({
      data: {
        maCongThuc: congThucHienTai.maCongThuc,
        phienBan: congThucHienTai.phienBan,
        congThucCu: congThucHienTai.congThuc,
        congThucMoi: data.congThuc,
        lyDoThayDoi: data.lyDoThayDoi,
        nguoiThayDoi: data.nguoiThayDoi,
      },
    });

    // Cập nhật công thức
    return this.prisma.congThucLuong.update({
      where: { id },
      data: {
        congThuc: data.congThuc,
        phienBan: { increment: 1 },
      },
      include: {
        bienSos: true,
      },
    });
  }

  // Thêm biến số vào công thức
  async themBienSo(
    congThucId: number,
    data: {
      tenBien: string;
      moTa?: string;
      kieuDuLieu?: KieuDuLieu;
      nguonDuLieu?: string;
      giaTriMacDinh?: string;
    },
  ) {
    return this.prisma.bienSoCongThuc.create({
      data: {
        congThucId,
        ...data,
      },
    });
  }

  // Xóa biến số
  async xoaBienSo(id: number) {
    return this.prisma.bienSoCongThuc.delete({
      where: { id },
    });
  }

  // Lấy lịch sử công thức
  async layLichSuCongThuc(maCongThuc: string) {
    return this.prisma.lichSuCongThuc.findMany({
      where: { maCongThuc },
      orderBy: { phienBan: 'desc' },
    });
  }

  // ============================================
  // TÍNH TOÁN CÔNG THỨC
  // ============================================

  // Validate công thức
  private validateCongThuc(congThuc: string): boolean {
    // Kiểm tra các ký tự không hợp lệ
    const invalidChars = /[;`'"]/g;
    if (invalidChars.test(congThuc)) {
      throw new BadRequestException('Công thức chứa ký tự không hợp lệ');
    }

    // Kiểm tra các từ khóa nguy hiểm
    const dangerousKeywords = ['eval', 'function', 'require', 'import', 'export', 'window', 'document', 'process'];
    for (const keyword of dangerousKeywords) {
      if (congThuc.toLowerCase().includes(keyword)) {
        throw new BadRequestException(`Công thức chứa từ khóa không được phép: ${keyword}`);
      }
    }

    return true;
  }

  // Tính toán công thức với các biến số
  async tinhCongThuc(congThuc: string, bienSo: BienSoGiaTri): Promise<KetQuaTinhCongThuc> {
    try {
      const chiTiet: string[] = [];

      // Convert bienSo sang Record<string, number>
      const numericBienSo: Record<string, number> = {};
      for (const [ten, giaTri] of Object.entries(bienSo)) {
        const numValue = typeof giaTri === 'number' ? giaTri : parseFloat(String(giaTri)) || 0;
        numericBienSo[ten] = numValue;
        chiTiet.push(`${ten} = ${this.formatTien(numValue)}`);
      }

      // Tính toán kết quả
      // Sử dụng safe evaluator thay vì new Function()
      const { safeEval } = await import('../../common/utils/safe-eval');
      const ketQua = safeEval(congThuc, numericBienSo);

      if (typeof ketQua !== 'number' || isNaN(ketQua)) {
        throw new Error('Kết quả không hợp lệ');
      }

      return {
        congThuc,
        bienSo,
        ketQua: Math.round(ketQua),
        chiTiet: chiTiet.join(', '),
      };
    } catch (error) {
      throw new BadRequestException(`Lỗi tính công thức: ${error.message}`);
    }
  }

  // Format tiền tệ
  private formatTien(so: number): string {
    return new Intl.NumberFormat('vi-VN').format(so);
  }

  // Lấy giá trị biến số từ dữ liệu nhân viên
  async layGiaTriBienSo(
    nhanVienId: number,
    thang: number,
    nam: number,
    bienSos: { tenBien: string; nguonDuLieu?: string | null; giaTriMacDinh?: string | null }[],
  ): Promise<BienSoGiaTri> {
    const giaTri: BienSoGiaTri = {};

    // Lấy thông tin nhân viên
    const nhanVien = await this.prisma.nhanVien.findUnique({
      where: { id: nhanVienId },
      include: {
        phongBan: true,
        phuCaps: {
          where: {
            trangThai: 'HIEU_LUC',
            tuNgay: { lte: new Date(nam, thang - 1, 28) },
            OR: [
              { denNgay: null },
              { denNgay: { gte: new Date(nam, thang - 1, 1) } },
            ],
          },
          include: {
            khoanLuong: true,
          },
        },
      },
    });

    if (!nhanVien) {
      throw new NotFoundException(`Không tìm thấy nhân viên với ID: ${nhanVienId}`);
    }

    // Lấy dữ liệu chấm công
    const chamCong = await this.prisma.chamCong.findUnique({
      where: {
        nhanVienId_thang_nam: {
          nhanVienId,
          thang,
          nam,
        },
      },
    });

    // Gán giá trị cho các biến số chuẩn
    for (const bs of bienSos) {
      switch (bs.tenBien) {
        case 'LUONG_CO_BAN':
          giaTri[bs.tenBien] = Number(nhanVien.luongCoBan);
          break;
        case 'CONG_CHUAN':
          giaTri[bs.tenBien] = chamCong ? Number(chamCong.soCongChuan) : NGAY_CONG_CHUAN_MAC_DINH;
          break;
        case 'CONG_THUC_TE':
          giaTri[bs.tenBien] = chamCong ? Number(chamCong.soCongThucTe) : NGAY_CONG_CHUAN_MAC_DINH;
          break;
        case 'SO_GIO_OT':
          giaTri[bs.tenBien] = chamCong ? Number(chamCong.soGioOT) : 0;
          break;
        case 'SO_GIO_OT_DEM':
          giaTri[bs.tenBien] = chamCong ? Number(chamCong.soGioOTDem) : 0;
          break;
        case 'SO_GIO_OT_CN':
          giaTri[bs.tenBien] = chamCong ? Number(chamCong.soGioOTChuNhat) : 0;
          break;
        case 'SO_GIO_OT_LE':
          giaTri[bs.tenBien] = chamCong ? Number(chamCong.soGioOTLe) : 0;
          break;
        case 'SO_LAN_DI_MUON':
          giaTri[bs.tenBien] = chamCong ? chamCong.soLanDiMuon : 0;
          break;
        case 'TONG_PHU_CAP':
          giaTri[bs.tenBien] = nhanVien.phuCaps.reduce(
            (sum, pc) => sum + Number(pc.soTien),
            0,
          );
          break;
        default:
          // Kiểm tra phụ cấp theo mã
          const phuCap = nhanVien.phuCaps.find(
            (pc) => pc.khoanLuong.maKhoan === bs.tenBien,
          );
          if (phuCap) {
            giaTri[bs.tenBien] = Number(phuCap.soTien);
          } else if (bs.giaTriMacDinh) {
            giaTri[bs.tenBien] = parseFloat(bs.giaTriMacDinh);
          } else {
            giaTri[bs.tenBien] = 0;
          }
      }
    }

    return giaTri;
  }

  // Tính lương theo công thức cho nhân viên
  async tinhLuongTheoCongThuc(
    nhanVienId: number,
    congThucId: number,
    thang: number,
    nam: number,
  ): Promise<KetQuaTinhCongThuc> {
    const congThuc = await this.layCongThuc(congThucId);
    const bienSo = await this.layGiaTriBienSo(nhanVienId, thang, nam, congThuc.bienSos);

    return await this.tinhCongThuc(congThuc.congThuc, bienSo);
  }

  // ============================================
  // CÔNG THỨC MẪU
  // ============================================

  // Khởi tạo công thức mẫu
  async khoiTaoCongThucMau() {
    const congThucMau = [
      {
        maCongThuc: 'CT_LUONG_CO_BAN',
        tenCongThuc: 'Công thức lương cơ bản theo công',
        moTa: 'Lương = Lương cơ bản × (Công thực tế / Công chuẩn)',
        congThuc: 'LUONG_CO_BAN * (CONG_THUC_TE / CONG_CHUAN)',
        tuNgay: new Date(),
        nguoiTao: 'Hệ thống',
        bienSos: [
          { tenBien: 'LUONG_CO_BAN', moTa: 'Lương cơ bản theo hợp đồng', kieuDuLieu: KieuDuLieu.TIEN },
          { tenBien: 'CONG_THUC_TE', moTa: 'Số công thực tế', kieuDuLieu: KieuDuLieu.SO, giaTriMacDinh: '26' },
          { tenBien: 'CONG_CHUAN', moTa: 'Số công chuẩn', kieuDuLieu: KieuDuLieu.SO, giaTriMacDinh: '26' },
        ],
      },
      {
        maCongThuc: 'CT_LUONG_OT',
        tenCongThuc: 'Công thức tính OT',
        moTa: 'OT = (Lương cơ bản / 26 / 8) × Số giờ OT × Hệ số',
        congThuc: '(LUONG_CO_BAN / 26 / 8) * SO_GIO_OT * 1.5 + (LUONG_CO_BAN / 26 / 8) * SO_GIO_OT_DEM * 2.0 + (LUONG_CO_BAN / 26 / 8) * SO_GIO_OT_CN * 2.0 + (LUONG_CO_BAN / 26 / 8) * SO_GIO_OT_LE * 3.0',
        tuNgay: new Date(),
        nguoiTao: 'Hệ thống',
        bienSos: [
          { tenBien: 'LUONG_CO_BAN', moTa: 'Lương cơ bản', kieuDuLieu: KieuDuLieu.TIEN },
          { tenBien: 'SO_GIO_OT', moTa: 'Số giờ OT thường', kieuDuLieu: KieuDuLieu.SO, giaTriMacDinh: '0' },
          { tenBien: 'SO_GIO_OT_DEM', moTa: 'Số giờ OT đêm', kieuDuLieu: KieuDuLieu.SO, giaTriMacDinh: '0' },
          { tenBien: 'SO_GIO_OT_CN', moTa: 'Số giờ OT chủ nhật', kieuDuLieu: KieuDuLieu.SO, giaTriMacDinh: '0' },
          { tenBien: 'SO_GIO_OT_LE', moTa: 'Số giờ OT ngày lễ', kieuDuLieu: KieuDuLieu.SO, giaTriMacDinh: '0' },
        ],
      },
      {
        maCongThuc: 'CT_PHAT_DI_MUON',
        tenCongThuc: 'Công thức phạt đi muộn',
        moTa: 'Phạt = Số lần đi muộn × 50,000',
        congThuc: 'SO_LAN_DI_MUON * 50000',
        tuNgay: new Date(),
        nguoiTao: 'Hệ thống',
        bienSos: [
          { tenBien: 'SO_LAN_DI_MUON', moTa: 'Số lần đi muộn', kieuDuLieu: KieuDuLieu.SO, giaTriMacDinh: '0' },
        ],
      },
      {
        maCongThuc: 'CT_LUONG_KINH_DOANH',
        tenCongThuc: 'Công thức lương kinh doanh',
        moTa: 'Lương = Lương cơ bản + Doanh số × Hoa hồng',
        congThuc: 'LUONG_CO_BAN + DOANH_SO * TY_LE_HOA_HONG / 100',
        tuNgay: new Date(),
        nguoiTao: 'Hệ thống',
        bienSos: [
          { tenBien: 'LUONG_CO_BAN', moTa: 'Lương cơ bản', kieuDuLieu: KieuDuLieu.TIEN },
          { tenBien: 'DOANH_SO', moTa: 'Doanh số tháng', kieuDuLieu: KieuDuLieu.TIEN, giaTriMacDinh: '0' },
          { tenBien: 'TY_LE_HOA_HONG', moTa: 'Tỷ lệ hoa hồng (%)', kieuDuLieu: KieuDuLieu.PHAN_TRAM, giaTriMacDinh: '2' },
        ],
      },
    ];

    for (const ct of congThucMau) {
      const existing = await this.prisma.congThucLuong.findUnique({
        where: { maCongThuc: ct.maCongThuc },
      });

      if (!existing) {
        await this.prisma.congThucLuong.create({
          data: {
            maCongThuc: ct.maCongThuc,
            tenCongThuc: ct.tenCongThuc,
            moTa: ct.moTa,
            congThuc: ct.congThuc,
            tuNgay: ct.tuNgay,
            nguoiTao: ct.nguoiTao,
            bienSos: {
              create: ct.bienSos,
            },
          },
        });
      }
    }

    return { message: 'Đã khởi tạo công thức mẫu' };
  }

  // Test công thức
  async testCongThuc(congThuc: string, bienSo: BienSoGiaTri): Promise<KetQuaTinhCongThuc> {
    this.validateCongThuc(congThuc);
    return await this.tinhCongThuc(congThuc, bienSo);
  }
}
