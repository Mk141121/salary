import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { TaoNganHangDto, CapNhatNganHangDto } from './ngan-hang.dto';

@Injectable()
export class NganHangService {
  constructor(private prisma: PrismaService) {}

  /**
   * Lấy danh sách ngân hàng của nhân viên
   */
  async layDanhSachNganHang(nhanVienId: number) {
    return this.prisma.nhanVienNganHang.findMany({
      where: { nhanVienId },
      orderBy: [{ laMacDinh: 'desc' }, { ngayTao: 'desc' }],
    });
  }

  /**
   * Lấy ngân hàng mặc định
   */
  async layNganHangMacDinh(nhanVienId: number) {
    return this.prisma.nhanVienNganHang.findFirst({
      where: {
        nhanVienId,
        laMacDinh: true,
      },
    });
  }

  /**
   * Lấy ngân hàng mặc định hiệu lực tại thời điểm
   * Dùng cho snapshot
   */
  async layNganHangHieuLuc(nhanVienId: number, ngay: Date) {
    return this.prisma.nhanVienNganHang.findFirst({
      where: {
        nhanVienId,
        laMacDinh: true,
        OR: [
          { tuNgay: null },
          { tuNgay: { lte: ngay } },
        ],
        AND: [
          {
            OR: [{ denNgay: null }, { denNgay: { gte: ngay } }],
          },
        ],
      },
      orderBy: { ngayTao: 'desc' },
    });
  }

  /**
   * Tạo ngân hàng mới
   */
  async taoNganHang(nhanVienId: number, dto: TaoNganHangDto) {
    // Kiểm tra nhân viên tồn tại
    const nhanVien = await this.prisma.nhanVien.findUnique({
      where: { id: nhanVienId },
    });
    if (!nhanVien) {
      throw new NotFoundException('Không tìm thấy nhân viên');
    }

    // Nếu là mặc định, bỏ mặc định các TK khác
    if (dto.laMacDinh) {
      await this.prisma.nhanVienNganHang.updateMany({
        where: { nhanVienId, laMacDinh: true },
        data: { laMacDinh: false },
      });
    }

    // Kiểm tra nếu chưa có TK nào thì auto set mặc định
    const count = await this.prisma.nhanVienNganHang.count({
      where: { nhanVienId },
    });
    const laMacDinh = count === 0 ? true : dto.laMacDinh ?? false;

    return this.prisma.nhanVienNganHang.create({
      data: {
        nhanVienId,
        tenNganHang: dto.tenNganHang,
        soTaiKhoan: dto.soTaiKhoan,
        chuTaiKhoan: dto.chuTaiKhoan,
        chiNhanh: dto.chiNhanh,
        laMacDinh,
        tuNgay: dto.tuNgay ? new Date(dto.tuNgay) : null,
        denNgay: dto.denNgay ? new Date(dto.denNgay) : null,
        ghiChu: dto.ghiChu,
      },
    });
  }

  /**
   * Cập nhật ngân hàng
   */
  async capNhatNganHang(id: number, dto: CapNhatNganHangDto) {
    const nganHang = await this.prisma.nhanVienNganHang.findUnique({
      where: { id },
    });
    if (!nganHang) {
      throw new NotFoundException('Không tìm thấy tài khoản ngân hàng');
    }

    // Nếu set mặc định, bỏ mặc định các TK khác
    if (dto.laMacDinh) {
      await this.prisma.nhanVienNganHang.updateMany({
        where: { nhanVienId: nganHang.nhanVienId, laMacDinh: true, id: { not: id } },
        data: { laMacDinh: false },
      });
    }

    return this.prisma.nhanVienNganHang.update({
      where: { id },
      data: {
        tenNganHang: dto.tenNganHang,
        soTaiKhoan: dto.soTaiKhoan,
        chuTaiKhoan: dto.chuTaiKhoan,
        chiNhanh: dto.chiNhanh,
        laMacDinh: dto.laMacDinh,
        tuNgay: dto.tuNgay ? new Date(dto.tuNgay) : undefined,
        denNgay: dto.denNgay ? new Date(dto.denNgay) : undefined,
        ghiChu: dto.ghiChu,
      },
    });
  }

  /**
   * Đặt làm mặc định
   */
  async datMacDinh(id: number) {
    const nganHang = await this.prisma.nhanVienNganHang.findUnique({
      where: { id },
    });
    if (!nganHang) {
      throw new NotFoundException('Không tìm thấy tài khoản ngân hàng');
    }

    // Bỏ mặc định các TK khác
    await this.prisma.nhanVienNganHang.updateMany({
      where: { nhanVienId: nganHang.nhanVienId, laMacDinh: true },
      data: { laMacDinh: false },
    });

    return this.prisma.nhanVienNganHang.update({
      where: { id },
      data: { laMacDinh: true },
    });
  }

  /**
   * Xóa ngân hàng
   */
  async xoaNganHang(id: number) {
    const nganHang = await this.prisma.nhanVienNganHang.findUnique({
      where: { id },
    });
    if (!nganHang) {
      throw new NotFoundException('Không tìm thấy tài khoản ngân hàng');
    }
    if (nganHang.laMacDinh) {
      throw new BadRequestException('Không thể xóa tài khoản mặc định. Hãy đặt TK khác làm mặc định trước.');
    }
    return this.prisma.nhanVienNganHang.delete({
      where: { id },
    });
  }

  /**
   * Mask số tài khoản cho snapshot (bảo mật)
   */
  maskSoTaiKhoan(soTaiKhoan: string): string {
    if (soTaiKhoan.length <= 4) return '****';
    return '*'.repeat(soTaiKhoan.length - 4) + soTaiKhoan.slice(-4);
  }
}
