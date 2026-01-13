// Service quản lý Quy chế lương
import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { TrangThaiQuyChe, TrangThaiBangLuong } from '@prisma/client';
import {
  TaoQuyCheDto,
  CapNhatQuyCheDto,
  NhanBanQuyCheDto,
  LocQuyCheDto,
} from './dto/quy-che.dto';

@Injectable()
export class QuyCheService {
  constructor(private prisma: PrismaService) {}

  // ============================================
  // LẤY DANH SÁCH QUY CHẾ
  // ============================================
  async layDanhSach(filter: LocQuyCheDto) {
    const where: Record<string, unknown> = {};

    if (filter.phongBanId) {
      where.phongBanId = filter.phongBanId;
    }

    if (filter.trangThai) {
      where.trangThai = filter.trangThai;
    }

    // Lọc theo tháng/năm hiệu lực
    if (filter.thang && filter.nam) {
      const dauThang = new Date(filter.nam, filter.thang - 1, 1);
      const cuoiThang = new Date(filter.nam, filter.thang, 0);

      where.tuNgay = { lte: cuoiThang };
      where.OR = [
        { denNgay: null },
        { denNgay: { gte: dauThang } },
      ];
    }

    return this.prisma.quyChe.findMany({
      where,
      include: {
        phongBan: {
          select: {
            id: true,
            maPhongBan: true,
            tenPhongBan: true,
          },
        },
        rules: {
          orderBy: { thuTuUuTien: 'asc' },
          include: {
            khoanLuong: {
              select: {
                id: true,
                maKhoan: true,
                tenKhoan: true,
                loai: true,
              },
            },
          },
        },
        _count: {
          select: {
            rules: true,
            bangLuongs: true,
          },
        },
      },
      orderBy: [
        { phongBanId: 'asc' },
        { phienBan: 'desc' },
      ],
    });
  }

  // ============================================
  // LẤY CHI TIẾT QUY CHẾ
  // ============================================
  async layChiTiet(id: number) {
    const quyChe = await this.prisma.quyChe.findUnique({
      where: { id },
      include: {
        phongBan: true,
        rules: {
          where: { trangThai: true },
          orderBy: { thuTuUuTien: 'asc' },
          include: {
            khoanLuong: true,
          },
        },
        bangLuongs: {
          include: {
            bangLuong: {
              select: {
                id: true,
                thang: true,
                nam: true,
                trangThai: true,
              },
            },
          },
        },
      },
    });

    if (!quyChe) {
      throw new NotFoundException(`Không tìm thấy quy chế với ID: ${id}`);
    }

    // Kiểm tra xem có bảng lương đã chốt không
    const daChotLuong = quyChe.bangLuongs.some(
      (bl) => bl.bangLuong.trangThai !== TrangThaiBangLuong.NHAP
    );

    return {
      ...quyChe,
      daChotLuong,
      coDuocSua: !daChotLuong || quyChe.trangThai === TrangThaiQuyChe.NHAP,
    };
  }

  // ============================================
  // TẠO QUY CHẾ MỚI
  // ============================================
  async tao(dto: TaoQuyCheDto) {
    // Kiểm tra phòng ban tồn tại
    const phongBan = await this.prisma.phongBan.findUnique({
      where: { id: dto.phongBanId },
    });

    if (!phongBan) {
      throw new NotFoundException(`Không tìm thấy phòng ban với ID: ${dto.phongBanId}`);
    }

    // Lấy phiên bản tiếp theo
    const quyCheHienTai = await this.prisma.quyChe.findFirst({
      where: { phongBanId: dto.phongBanId },
      orderBy: { phienBan: 'desc' },
    });

    const phienBan = (quyCheHienTai?.phienBan || 0) + 1;

    return this.prisma.quyChe.create({
      data: {
        phongBanId: dto.phongBanId,
        tenQuyChe: dto.tenQuyChe,
        moTa: dto.moTa,
        tuNgay: dto.tuNgay,
        denNgay: dto.denNgay,
        phienBan,
        trangThai: TrangThaiQuyChe.NHAP,
        nguoiTao: dto.nguoiTao,
      },
      include: {
        phongBan: true,
      },
    });
  }

  // ============================================
  // CẬP NHẬT QUY CHẾ
  // ============================================
  async capNhat(id: number, dto: CapNhatQuyCheDto) {
    const quyChe = await this.layChiTiet(id);

    // Không cho sửa nếu đã có bảng lương chốt
    if (quyChe.daChotLuong && quyChe.trangThai !== TrangThaiQuyChe.NHAP) {
      throw new BadRequestException(
        'Không thể sửa quy chế đã áp dụng cho bảng lương đã chốt. Vui lòng tạo phiên bản mới.'
      );
    }

    return this.prisma.quyChe.update({
      where: { id },
      data: {
        tenQuyChe: dto.tenQuyChe,
        moTa: dto.moTa,
        tuNgay: dto.tuNgay,
        denNgay: dto.denNgay,
        trangThai: dto.trangThai,
      },
      include: {
        phongBan: true,
        rules: {
          orderBy: { thuTuUuTien: 'asc' },
        },
      },
    });
  }

  // ============================================
  // NHÂN BẢN QUY CHẾ (TẠO PHIÊN BẢN MỚI)
  // ============================================
  async nhanBan(id: number, dto: NhanBanQuyCheDto) {
    const quyCheGoc = await this.prisma.quyChe.findUnique({
      where: { id },
      include: {
        rules: true,
      },
    });

    if (!quyCheGoc) {
      throw new NotFoundException(`Không tìm thấy quy chế với ID: ${id}`);
    }

    // Lấy phiên bản tiếp theo
    const quyChePhienBanCao = await this.prisma.quyChe.findFirst({
      where: { phongBanId: quyCheGoc.phongBanId },
      orderBy: { phienBan: 'desc' },
    });

    const phienBan = (quyChePhienBanCao?.phienBan || 0) + 1;

    // Tạo quy chế mới với rules copy
    const quyCheMotừ = await this.prisma.quyChe.create({
      data: {
        phongBanId: quyCheGoc.phongBanId,
        tenQuyChe: dto.tenQuyChe || `${quyCheGoc.tenQuyChe} (v${phienBan})`,
        moTa: quyCheGoc.moTa,
        tuNgay: dto.tuNgay,
        denNgay: null,
        phienBan,
        trangThai: TrangThaiQuyChe.NHAP,
        nguoiTao: dto.nguoiTao,
        rules: {
          create: quyCheGoc.rules.map((rule) => ({
            khoanLuongId: rule.khoanLuongId,
            tenRule: rule.tenRule,
            moTa: rule.moTa,
            loaiRule: rule.loaiRule,
            dieuKienJson: rule.dieuKienJson,
            congThucJson: rule.congThucJson,
            thuTuUuTien: rule.thuTuUuTien,
            cheDoGop: rule.cheDoGop,
            choPhepChinhTay: rule.choPhepChinhTay,
            trangThai: true,
            nguoiTao: dto.nguoiTao,
          })),
        },
      },
      include: {
        phongBan: true,
        rules: {
          orderBy: { thuTuUuTien: 'asc' },
          include: {
            khoanLuong: true,
          },
        },
      },
    });

    // Ngưng quy chế cũ (nếu cần)
    if (quyCheGoc.trangThai === TrangThaiQuyChe.HIEU_LUC) {
      await this.prisma.quyChe.update({
        where: { id },
        data: {
          denNgay: new Date(dto.tuNgay.getTime() - 24 * 60 * 60 * 1000), // Ngày trước tuNgay mới
        },
      });
    }

    return quyCheMotừ;
  }

  // ============================================
  // KÍCH HOẠT QUY CHẾ
  // ============================================
  async kichHoat(id: number) {
    const quyChe = await this.layChiTiet(id);

    if (quyChe.rules.length === 0) {
      throw new BadRequestException('Không thể kích hoạt quy chế không có rule nào');
    }

    // Ngưng các quy chế khác cùng phòng ban đang hiệu lực
    await this.prisma.quyChe.updateMany({
      where: {
        phongBanId: quyChe.phongBanId,
        id: { not: id },
        trangThai: TrangThaiQuyChe.HIEU_LUC,
      },
      data: {
        trangThai: TrangThaiQuyChe.NGUNG,
        denNgay: new Date(),
      },
    });

    return this.prisma.quyChe.update({
      where: { id },
      data: {
        trangThai: TrangThaiQuyChe.HIEU_LUC,
      },
      include: {
        phongBan: true,
        rules: {
          orderBy: { thuTuUuTien: 'asc' },
        },
      },
    });
  }

  // ============================================
  // NGƯNG QUY CHẾ
  // ============================================
  async ngung(id: number) {
    return this.prisma.quyChe.update({
      where: { id },
      data: {
        trangThai: TrangThaiQuyChe.NGUNG,
        denNgay: new Date(),
      },
    });
  }

  // ============================================
  // LẤY QUY CHẾ HIỆU LỰC CHO THÁNG
  // ============================================
  async layQuyCheHieuLuc(phongBanId: number, thang: number, nam: number) {
    const dauThang = new Date(nam, thang - 1, 1);
    const cuoiThang = new Date(nam, thang, 0);

    const quyChe = await this.prisma.quyChe.findFirst({
      where: {
        phongBanId,
        trangThai: TrangThaiQuyChe.HIEU_LUC,
        tuNgay: { lte: cuoiThang },
        OR: [
          { denNgay: null },
          { denNgay: { gte: dauThang } },
        ],
      },
      orderBy: { phienBan: 'desc' },
      include: {
        rules: {
          where: { trangThai: true },
          orderBy: { thuTuUuTien: 'asc' },
          include: {
            khoanLuong: true,
          },
        },
      },
    });

    return quyChe;
  }

  // ============================================
  // XÓA QUY CHẾ (CHỈ KHI ĐANG Ở TRẠNG THÁI NHÁP)
  // ============================================
  async xoa(id: number) {
    const quyChe = await this.layChiTiet(id);

    if (quyChe.trangThai !== TrangThaiQuyChe.NHAP) {
      throw new BadRequestException('Chỉ có thể xóa quy chế đang ở trạng thái Nháp');
    }

    if (quyChe.bangLuongs.length > 0) {
      throw new BadRequestException('Không thể xóa quy chế đã được áp dụng cho bảng lương');
    }

    return this.prisma.quyChe.delete({
      where: { id },
    });
  }
}
