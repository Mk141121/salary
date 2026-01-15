import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

export interface CapNhatThongTinCongTyDto {
  tenCongTy: string;
  maSoThue?: string;
  diaChi?: string;
  dienThoai?: string;
  email?: string;
  website?: string;
  logo?: string;
  nguoiDaiDien?: string;
  chucVuDaiDien?: string;
}

// ============= DTO CẤU HÌNH ĐƠN GIÁ =============
export interface TaoCauHinhDonGiaDto {
  maBien: string;
  tenBien: string;
  moTa?: string;
  giaTri: number;
  donVi?: string;
  phongBanId?: number;
}

export interface CapNhatCauHinhDonGiaDto {
  tenBien?: string;
  moTa?: string;
  giaTri?: number;
  donVi?: string;
  trangThai?: boolean;
}

@Injectable()
export class ThongTinCongTyService {
  constructor(private prisma: PrismaService) {}

  /**
   * Lấy thông tin công ty (luôn trả về record đầu tiên)
   */
  async layThongTinCongTy() {
    const thongTin = await this.prisma.thongTinCongTy.findFirst();
    
    if (!thongTin) {
      // Tạo record mặc định nếu chưa có
      return this.prisma.thongTinCongTy.create({
        data: {
          tenCongTy: 'Công ty chưa cấu hình',
          maSoThue: '',
          diaChi: '',
          dienThoai: '',
          email: '',
          website: '',
          logo: '',
          nguoiDaiDien: '',
          chucVuDaiDien: '',
        },
      });
    }

    return thongTin;
  }

  /**
   * Cập nhật thông tin công ty
   */
  async capNhatThongTinCongTy(dto: CapNhatThongTinCongTyDto) {
    const existing = await this.prisma.thongTinCongTy.findFirst();

    if (existing) {
      // Update record hiện tại
      return this.prisma.thongTinCongTy.update({
        where: { id: existing.id },
        data: {
          ...dto,
          ngayCapNhat: new Date(),
        },
      });
    } else {
      // Tạo mới nếu chưa có
      return this.prisma.thongTinCongTy.create({
        data: dto,
      });
    }
  }

  /**
   * Upload logo (lưu đường dẫn)
   */
  async capNhatLogo(logoPath: string) {
    const existing = await this.prisma.thongTinCongTy.findFirst();

    if (!existing) {
      throw new NotFoundException('Chưa có thông tin công ty');
    }

    return this.prisma.thongTinCongTy.update({
      where: { id: existing.id },
      data: {
        logo: logoPath,
        ngayCapNhat: new Date(),
      },
    });
  }

  // ============================================
  // CẤU HÌNH ĐƠN GIÁ
  // ============================================

  /**
   * Lấy danh sách đơn giá
   */
  async layDanhSachDonGia(phongBanId?: number) {
    const where: Record<string, unknown> = { trangThai: true };
    if (phongBanId !== undefined) {
      where.OR = [{ phongBanId }, { phongBanId: null }];
    }

    return this.prisma.cauHinhDonGia.findMany({
      where,
      include: {
        phongBan: {
          select: { id: true, tenPhongBan: true },
        },
      },
      orderBy: { maBien: 'asc' },
    });
  }

  /**
   * Lấy chi tiết đơn giá
   */
  async layDonGia(id: number) {
    const donGia = await this.prisma.cauHinhDonGia.findUnique({
      where: { id },
      include: {
        phongBan: {
          select: { id: true, tenPhongBan: true },
        },
      },
    });

    if (!donGia) {
      throw new NotFoundException(`Không tìm thấy đơn giá với ID: ${id}`);
    }

    return donGia;
  }

  /**
   * Tạo cấu hình đơn giá mới
   */
  async taoDonGia(dto: TaoCauHinhDonGiaDto) {
    return this.prisma.cauHinhDonGia.create({
      data: {
        maBien: dto.maBien.toUpperCase(),
        tenBien: dto.tenBien,
        moTa: dto.moTa,
        giaTri: dto.giaTri,
        donVi: dto.donVi || 'VND',
        phongBanId: dto.phongBanId,
      },
      include: {
        phongBan: {
          select: { id: true, tenPhongBan: true },
        },
      },
    });
  }

  /**
   * Cập nhật cấu hình đơn giá
   */
  async capNhatDonGia(id: number, dto: CapNhatCauHinhDonGiaDto) {
    const existing = await this.prisma.cauHinhDonGia.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new NotFoundException(`Không tìm thấy đơn giá với ID: ${id}`);
    }

    return this.prisma.cauHinhDonGia.update({
      where: { id },
      data: dto,
      include: {
        phongBan: {
          select: { id: true, tenPhongBan: true },
        },
      },
    });
  }

  /**
   * Xóa cấu hình đơn giá
   */
  async xoaDonGia(id: number) {
    const existing = await this.prisma.cauHinhDonGia.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new NotFoundException(`Không tìm thấy đơn giá với ID: ${id}`);
    }

    return this.prisma.cauHinhDonGia.delete({
      where: { id },
    });
  }

  /**
   * Khởi tạo đơn giá mẫu
   */
  async khoiTaoDonGiaMau() {
    const donGiaMau = [
      {
        maBien: 'DON_GIA_SP',
        tenBien: 'Đơn giá sản phẩm',
        moTa: 'Số tiền thưởng trên mỗi sản phẩm đạt',
        giaTri: 1000,
        donVi: 'VND',
      },
      {
        maBien: 'DON_GIA_KHOI_LUONG',
        tenBien: 'Đơn giá khối lượng giao hàng',
        moTa: 'Số tiền thưởng trên mỗi đơn vị khối lượng giao hàng thành công',
        giaTri: 500,
        donVi: 'VND',
      },
      {
        maBien: 'DON_GIA_PHAT_TRE',
        tenBien: 'Đơn giá phạt trễ giờ',
        moTa: 'Số tiền phạt cho mỗi lần trễ giờ',
        giaTri: 50000,
        donVi: 'VND',
      },
      {
        maBien: 'HE_SO_LOI_SP',
        tenBien: 'Hệ số phạt lỗi sản phẩm',
        moTa: 'Hệ số nhân để tính phạt khi có sản phẩm lỗi',
        giaTri: 1.5,
        donVi: 'lần',
      },
    ];

    const results = [];
    for (const dg of donGiaMau) {
      // Kiểm tra nếu đã tồn tại thì bỏ qua
      const existing = await this.prisma.cauHinhDonGia.findFirst({
        where: { maBien: dg.maBien, phongBanId: null },
      });

      if (!existing) {
        results.push(
          await this.prisma.cauHinhDonGia.create({
            data: dg,
          }),
        );
      }
    }

    return {
      message: `Đã khởi tạo ${results.length} đơn giá mẫu`,
      data: results,
    };
  }
}
