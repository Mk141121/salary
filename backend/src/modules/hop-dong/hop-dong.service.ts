import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { TaoHopDongDto, CapNhatHopDongDto, NgungHopDongDto } from './hop-dong.dto';

@Injectable()
export class HopDongService {
  constructor(private prisma: PrismaService) {}

  /**
   * Lấy danh sách hợp đồng của nhân viên
   */
  async layDanhSachHopDong(nhanVienId: number) {
    return this.prisma.nhanVienHopDong.findMany({
      where: { nhanVienId },
      orderBy: { tuNgay: 'desc' },
    });
  }

  /**
   * Lấy chi tiết hợp đồng
   */
  async layHopDongTheoId(id: number) {
    const hopDong = await this.prisma.nhanVienHopDong.findUnique({
      where: { id },
      include: {
        nhanVien: {
          select: { maNhanVien: true, hoTen: true },
        },
      },
    });
    if (!hopDong) {
      throw new NotFoundException('Không tìm thấy hợp đồng');
    }
    return hopDong;
  }

  /**
   * Lấy hợp đồng hiệu lực tại một thời điểm
   * CỰC QUAN TRỌNG cho snapshot
   */
  async layHopDongHieuLuc(nhanVienId: number, ngay: Date) {
    return this.prisma.nhanVienHopDong.findFirst({
      where: {
        nhanVienId,
        trangThai: 'HIEU_LUC',
        tuNgay: { lte: ngay },
        OR: [{ denNgay: null }, { denNgay: { gte: ngay } }],
      },
      orderBy: { tuNgay: 'desc' },
    });
  }

  /**
   * Tạo hợp đồng mới
   */
  async taoHopDong(nhanVienId: number, dto: TaoHopDongDto, taoBoi?: number) {
    // Kiểm tra nhân viên tồn tại
    const nhanVien = await this.prisma.nhanVien.findUnique({
      where: { id: nhanVienId },
    });
    if (!nhanVien) {
      throw new NotFoundException('Không tìm thấy nhân viên');
    }

    // Kiểm tra overlap
    const tuNgay = new Date(dto.tuNgay);
    const denNgay = dto.denNgay ? new Date(dto.denNgay) : null;

    const overlap = await this.kiemTraOverlap(nhanVienId, tuNgay, denNgay);
    if (overlap) {
      throw new BadRequestException(
        `Thời gian hợp đồng bị trùng với hợp đồng từ ${overlap.tuNgay.toISOString().split('T')[0]} đến ${overlap.denNgay?.toISOString().split('T')[0] || 'vô thời hạn'}`,
      );
    }

    return this.prisma.nhanVienHopDong.create({
      data: {
        nhanVienId,
        loaiHopDong: dto.loaiHopDong,
        tuNgay,
        denNgay,
        luongCoBan: dto.luongCoBan,
        luongDongBH: dto.luongDongBH,
        heSoLuong: dto.heSoLuong,
        ghiChu: dto.ghiChu,
        taoBoi,
      },
    });
  }

  /**
   * Cập nhật hợp đồng
   */
  async capNhatHopDong(id: number, dto: CapNhatHopDongDto) {
    const hopDong = await this.prisma.nhanVienHopDong.findUnique({
      where: { id },
    });
    if (!hopDong) {
      throw new NotFoundException('Không tìm thấy hợp đồng');
    }

    // Nếu thay đổi thời gian, kiểm tra overlap
    if (dto.tuNgay || dto.denNgay) {
      const tuNgay = dto.tuNgay ? new Date(dto.tuNgay) : hopDong.tuNgay;
      const denNgay = dto.denNgay ? new Date(dto.denNgay) : hopDong.denNgay;

      const overlap = await this.kiemTraOverlap(hopDong.nhanVienId, tuNgay, denNgay, id);
      if (overlap) {
        throw new BadRequestException(
          `Thời gian hợp đồng bị trùng với hợp đồng khác`,
        );
      }
    }

    return this.prisma.nhanVienHopDong.update({
      where: { id },
      data: {
        loaiHopDong: dto.loaiHopDong,
        tuNgay: dto.tuNgay ? new Date(dto.tuNgay) : undefined,
        denNgay: dto.denNgay ? new Date(dto.denNgay) : undefined,
        luongCoBan: dto.luongCoBan,
        luongDongBH: dto.luongDongBH,
        heSoLuong: dto.heSoLuong,
        trangThai: dto.trangThai,
        ghiChu: dto.ghiChu,
      },
    });
  }

  /**
   * Ngừng hợp đồng (chấm dứt sớm)
   */
  async ngungHopDong(id: number, dto: NgungHopDongDto) {
    const hopDong = await this.prisma.nhanVienHopDong.findUnique({
      where: { id },
    });
    if (!hopDong) {
      throw new NotFoundException('Không tìm thấy hợp đồng');
    }
    if (hopDong.trangThai !== 'HIEU_LUC') {
      throw new BadRequestException('Hợp đồng không ở trạng thái hiệu lực');
    }

    const ngayKetThuc = new Date(dto.ngayKetThuc);
    if (ngayKetThuc < hopDong.tuNgay) {
      throw new BadRequestException('Ngày kết thúc không được trước ngày bắt đầu');
    }

    return this.prisma.nhanVienHopDong.update({
      where: { id },
      data: {
        denNgay: ngayKetThuc,
        trangThai: 'HET_HAN',
        ghiChu: dto.lyDo
          ? `${hopDong.ghiChu || ''}\n[Ngừng sớm] ${dto.lyDo}`.trim()
          : hopDong.ghiChu,
      },
    });
  }

  /**
   * Xóa hợp đồng (chỉ admin)
   */
  async xoaHopDong(id: number) {
    const hopDong = await this.prisma.nhanVienHopDong.findUnique({
      where: { id },
    });
    if (!hopDong) {
      throw new NotFoundException('Không tìm thấy hợp đồng');
    }
    return this.prisma.nhanVienHopDong.delete({
      where: { id },
    });
  }

  /**
   * Kiểm tra overlap thời gian hợp đồng
   */
  private async kiemTraOverlap(
    nhanVienId: number,
    tuNgay: Date,
    denNgay: Date | null,
    excludeId?: number,
  ) {
    const whereCondition: Record<string, unknown> = {
      nhanVienId,
      trangThai: { not: 'HUY_BO' },
    };

    if (excludeId) {
      whereCondition.id = { not: excludeId };
    }

    // Tìm hợp đồng overlap
    // Overlap xảy ra khi: (A.start <= B.end) AND (A.end >= B.start)
    const hopDongs = await this.prisma.nhanVienHopDong.findMany({
      where: whereCondition,
    });

    for (const hd of hopDongs) {
      const hdDenNgay = hd.denNgay || new Date('9999-12-31');
      const newDenNgay = denNgay || new Date('9999-12-31');

      // Kiểm tra overlap
      if (tuNgay <= hdDenNgay && newDenNgay >= hd.tuNgay) {
        return hd;
      }
    }

    return null;
  }

  /**
   * Lấy lương cơ bản hiệu lực của nhân viên
   * Dùng cho Rule Engine và Snapshot
   */
  async layLuongCoBanHieuLuc(nhanVienId: number, ngay: Date): Promise<number> {
    const hopDong = await this.layHopDongHieuLuc(nhanVienId, ngay);
    if (!hopDong) {
      // Fallback: lấy từ bảng nhân viên (dữ liệu cũ)
      const nhanVien = await this.prisma.nhanVien.findUnique({
        where: { id: nhanVienId },
        select: { luongCoBan: true },
      });
      return Number(nhanVien?.luongCoBan || 0);
    }
    return Number(hopDong.luongCoBan);
  }
}
