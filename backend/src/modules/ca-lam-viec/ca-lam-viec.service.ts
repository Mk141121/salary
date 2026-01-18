import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { TaoCaLamViecDto, CapNhatCaLamViecDto, LocCaLamViecDto } from './ca-lam-viec.dto';

@Injectable()
export class CaLamViecService {
  constructor(private prisma: PrismaService) {}

  /**
   * Lấy danh sách ca làm việc với filter
   */
  async layDanhSach(filter: LocCaLamViecDto) {
    const where: any = {};

    if (filter.phongBanId !== undefined) {
      where.phongBanId = filter.phongBanId;
    }

    if (filter.trangThai !== undefined) {
      where.trangThai = filter.trangThai;
    }

    if (filter.isCaDem !== undefined) {
      where.isCaDem = filter.isCaDem;
    }

    if (filter.tuKhoa) {
      where.OR = [
        { maCa: { contains: filter.tuKhoa, mode: 'insensitive' } },
        { tenCa: { contains: filter.tuKhoa, mode: 'insensitive' } },
      ];
    }

    const danhSach = await this.prisma.caLamViec.findMany({
      where,
      orderBy: [{ trangThai: 'desc' }, { tenCa: 'asc' }],
    });

    return {
      data: danhSach,
      total: danhSach.length,
    };
  }

  /**
   * Lấy chi tiết ca làm việc theo ID
   */
  async layChiTiet(id: number) {
    const ca = await this.prisma.caLamViec.findUnique({
      where: { id },
    });

    if (!ca) {
      throw new NotFoundException(`Không tìm thấy ca làm việc với ID: ${id}`);
    }

    return ca;
  }

  /**
   * Lấy ca theo mã
   */
  async layTheoMa(maCa: string) {
    return this.prisma.caLamViec.findUnique({
      where: { maCa },
    });
  }

  /**
   * Tạo ca làm việc mới
   */
  async tao(dto: TaoCaLamViecDto, nguoiTaoId?: number) {
    // Kiểm tra mã ca đã tồn tại chưa
    const existing = await this.layTheoMa(dto.maCa);
    if (existing) {
      throw new ConflictException(`Mã ca "${dto.maCa}" đã tồn tại`);
    }

    // Validate phòng ban nếu có
    if (dto.phongBanId) {
      const phongBan = await this.prisma.phongBan.findUnique({
        where: { id: dto.phongBanId },
      });
      if (!phongBan) {
        throw new NotFoundException(`Không tìm thấy phòng ban với ID: ${dto.phongBanId}`);
      }
    }

    // Auto detect ca đêm nếu giờ ra < giờ vào
    const isCaDem = dto.isCaDem ?? this.kiemTraCaDem(dto.gioVao, dto.gioRa);

    const ca = await this.prisma.caLamViec.create({
      data: {
        maCa: dto.maCa,
        tenCa: dto.tenCa,
        gioVao: dto.gioVao,
        gioRa: dto.gioRa,
        nghiGiuaCaPhut: dto.nghiGiuaCaPhut ?? 60,
        graceInPhut: dto.graceInPhut ?? 5,
        graceLatePhut: dto.graceLatePhut ?? 5,
        isCaDem,
        phongBanId: dto.phongBanId,
        moTa: dto.moTa,
        mauHienThi: dto.mauHienThi,
        taoBoi: nguoiTaoId,
      },
    });

    return ca;
  }

  /**
   * Cập nhật ca làm việc
   */
  async capNhat(id: number, dto: CapNhatCaLamViecDto, nguoiCapNhatId?: number) {
    // Kiểm tra ca tồn tại
    await this.layChiTiet(id);

    // Validate phòng ban nếu có
    if (dto.phongBanId) {
      const phongBan = await this.prisma.phongBan.findUnique({
        where: { id: dto.phongBanId },
      });
      if (!phongBan) {
        throw new NotFoundException(`Không tìm thấy phòng ban với ID: ${dto.phongBanId}`);
      }
    }

    // Auto detect ca đêm nếu thay đổi giờ
    let isCaDem = dto.isCaDem;
    if (dto.gioVao && dto.gioRa && isCaDem === undefined) {
      isCaDem = this.kiemTraCaDem(dto.gioVao, dto.gioRa);
    }

    const updated = await this.prisma.caLamViec.update({
      where: { id },
      data: {
        ...dto,
        isCaDem,
        capNhatBoi: nguoiCapNhatId,
      },
    });

    return updated;
  }

  /**
   * Xóa ca làm việc (soft delete = set trangThai = false)
   */
  async xoa(id: number) {
    await this.layChiTiet(id);

    // Kiểm tra ca có đang được sử dụng không
    const dangSuDung = await this.prisma.lichPhanCaChiTiet.count({
      where: { caLamViecId: id },
    });

    if (dangSuDung > 0) {
      throw new ConflictException(
        `Ca này đang được sử dụng trong ${dangSuDung} lịch phân ca. Không thể xóa.`,
      );
    }

    // Hard delete nếu chưa sử dụng
    await this.prisma.caLamViec.delete({
      where: { id },
    });

    return { message: 'Đã xóa ca làm việc thành công' };
  }

  /**
   * Toggle trạng thái ca
   */
  async toggleTrangThai(id: number, nguoiCapNhatId?: number) {
    const ca = await this.layChiTiet(id);

    const updated = await this.prisma.caLamViec.update({
      where: { id },
      data: {
        trangThai: !ca.trangThai,
        capNhatBoi: nguoiCapNhatId,
      },
    });

    return updated;
  }

  /**
   * Lấy danh sách ca active cho dropdown
   */
  async layDanhSachActive(phongBanId?: number) {
    const where: any = { trangThai: true };

    if (phongBanId) {
      where.OR = [{ phongBanId: null }, { phongBanId }];
    }

    return this.prisma.caLamViec.findMany({
      where,
      orderBy: { tenCa: 'asc' },
      select: {
        id: true,
        maCa: true,
        tenCa: true,
        gioVao: true,
        gioRa: true,
        isCaDem: true,
        mauHienThi: true,
      },
    });
  }

  /**
   * Tính số giờ làm của ca
   */
  tinhSoGioLam(gioVao: string, gioRa: string, nghiGiuaCaPhut: number, isCaDem: boolean): number {
    const [vaoH, vaoM] = gioVao.split(':').map(Number);
    const [raH, raM] = gioRa.split(':').map(Number);

    let phutVao = vaoH * 60 + vaoM;
    let phutRa = raH * 60 + raM;

    // Ca đêm: ra sau 00:00
    if (isCaDem && phutRa < phutVao) {
      phutRa += 24 * 60;
    }

    const tongPhut = phutRa - phutVao - nghiGiuaCaPhut;
    return Math.max(0, tongPhut / 60);
  }

  /**
   * Kiểm tra có phải ca đêm không (giờ ra < giờ vào)
   */
  private kiemTraCaDem(gioVao: string, gioRa: string): boolean {
    const [vaoH, vaoM] = gioVao.split(':').map(Number);
    const [raH, raM] = gioRa.split(':').map(Number);

    const phutVao = vaoH * 60 + vaoM;
    const phutRa = raH * 60 + raM;

    return phutRa < phutVao;
  }
}
