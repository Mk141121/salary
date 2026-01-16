// Service Nghỉ phép - Quản lý CRUD đơn nghỉ phép và loại nghỉ
import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Logger,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { NghiPhepMappingService } from './nghi-phep-mapping.service';
import { TrangThaiDonNghiPhep, Prisma } from '@prisma/client';
import {
  TaoLoaiNghiDto,
  CapNhatLoaiNghiDto,
  TaoDonNghiPhepDto,
  CapNhatDonNghiPhepDto,
  DuyetDonNghiPhepDto,
  TuChoiDonNghiPhepDto,
  LocDonNghiPhepDto,
  LocLichNghiDto,
} from './nghi-phep.dto';

@Injectable()
export class NghiPhepService {
  private readonly logger = new Logger(NghiPhepService.name);

  constructor(
    private prisma: PrismaService,
    private mappingService: NghiPhepMappingService,
  ) {}

  // =============== LOẠI NGHỈ ===============

  /**
   * Lấy danh sách loại nghỉ
   */
  async layDanhSachLoaiNghi(chiActive = true) {
    const where = chiActive ? { isActive: true } : {};
    return this.prisma.danhMucLoaiNghi.findMany({
      where,
      orderBy: { thuTuHienThi: 'asc' },
    });
  }

  /**
   * Lấy chi tiết loại nghỉ
   */
  async layLoaiNghi(id: number) {
    const loaiNghi = await this.prisma.danhMucLoaiNghi.findUnique({
      where: { id },
    });
    if (!loaiNghi) {
      throw new NotFoundException(`Không tìm thấy loại nghỉ #${id}`);
    }
    return loaiNghi;
  }

  /**
   * Tạo loại nghỉ mới
   */
  async taoLoaiNghi(dto: TaoLoaiNghiDto, taoBoi?: number) {
    // Kiểm tra mã loại nghỉ đã tồn tại
    const existing = await this.prisma.danhMucLoaiNghi.findUnique({
      where: { maLoaiNghi: dto.maLoaiNghi },
    });
    if (existing) {
      throw new BadRequestException(`Mã loại nghỉ "${dto.maLoaiNghi}" đã tồn tại`);
    }

    return this.prisma.danhMucLoaiNghi.create({
      data: {
        maLoaiNghi: dto.maLoaiNghi,
        tenLoaiNghi: dto.tenLoaiNghi,
        nhomLoai: dto.nhomLoai,
        coTinhLuong: dto.coTinhLuong,
        coTinhChuyenCan: dto.coTinhChuyenCan,
        thuTuHienThi: dto.thuTuHienThi ?? 0,
        taoBoi,
      },
    });
  }

  /**
   * Cập nhật loại nghỉ
   */
  async capNhatLoaiNghi(id: number, dto: CapNhatLoaiNghiDto, capNhatBoi?: number) {
    await this.layLoaiNghi(id); // Kiểm tra tồn tại

    return this.prisma.danhMucLoaiNghi.update({
      where: { id },
      data: {
        ...dto,
        capNhatBoi,
      },
    });
  }

  /**
   * Toggle trạng thái loại nghỉ
   */
  async toggleLoaiNghi(id: number, capNhatBoi?: number) {
    const loaiNghi = await this.layLoaiNghi(id);
    return this.prisma.danhMucLoaiNghi.update({
      where: { id },
      data: {
        isActive: !loaiNghi.isActive,
        capNhatBoi,
      },
    });
  }

  // =============== ĐƠN NGHỈ PHÉP ===============

  /**
   * Tạo mã đơn nghỉ phép tự động
   */
  private async taoMaDon(): Promise<string> {
    const now = new Date();
    const prefix = `NP-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}`;

    // Đếm số đơn trong tháng
    const count = await this.prisma.donNghiPhep.count({
      where: {
        maDon: { startsWith: prefix },
      },
    });

    return `${prefix}-${String(count + 1).padStart(5, '0')}`;
  }

  /**
   * Tính số ngày nghỉ (bỏ qua cuối tuần)
   */
  private tinhSoNgayNghi(tuNgay: Date, denNgay: Date): number {
    let count = 0;
    for (let d = new Date(tuNgay); d <= denNgay; d.setDate(d.getDate() + 1)) {
      const dayOfWeek = d.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        count++;
      }
    }
    return count;
  }

  /**
   * Tạo đơn nghỉ phép mới
   */
  async taoDonNghiPhep(dto: TaoDonNghiPhepDto, taoBoi?: number) {
    // Validate nhân viên
    const nhanVien = await this.prisma.nhanVien.findUnique({
      where: { id: dto.nhanVienId },
    });
    if (!nhanVien) {
      throw new NotFoundException(`Không tìm thấy nhân viên #${dto.nhanVienId}`);
    }

    // Validate loại nghỉ
    const loaiNghi = await this.prisma.danhMucLoaiNghi.findUnique({
      where: { id: dto.loaiNghiId },
    });
    if (!loaiNghi || !loaiNghi.isActive) {
      throw new BadRequestException('Loại nghỉ không hợp lệ hoặc đã bị vô hiệu hóa');
    }

    // Validate ngày
    const tuNgay = new Date(dto.tuNgay);
    const denNgay = new Date(dto.denNgay);
    if (tuNgay > denNgay) {
      throw new BadRequestException('Ngày bắt đầu phải nhỏ hơn hoặc bằng ngày kết thúc');
    }

    const maDon = await this.taoMaDon();
    const soNgayNghi = this.tinhSoNgayNghi(tuNgay, denNgay);

    return this.prisma.donNghiPhep.create({
      data: {
        maDon,
        nhanVienId: dto.nhanVienId,
        phongBanId: nhanVien.phongBanId,
        loaiNghiId: dto.loaiNghiId,
        tuNgay,
        denNgay,
        soNgayNghi,
        lyDo: dto.lyDo,
        tepDinhKemUrl: dto.tepDinhKemUrl,
        trangThai: TrangThaiDonNghiPhep.NHAP,
        taoBoi,
      },
      include: {
        nhanVien: { select: { id: true, maNhanVien: true, hoTen: true } },
        phongBan: { select: { id: true, tenPhongBan: true } },
        loaiNghi: true,
      },
    });
  }

  /**
   * Cập nhật đơn nghỉ phép (chỉ khi NHAP hoặc TU_CHOI)
   */
  async capNhatDonNghiPhep(id: number, dto: CapNhatDonNghiPhepDto, nguoiCapNhat?: number) {
    const donNghi = await this.prisma.donNghiPhep.findUnique({
      where: { id },
    });

    if (!donNghi) {
      throw new NotFoundException(`Không tìm thấy đơn nghỉ phép #${id}`);
    }

    if (donNghi.trangThai !== TrangThaiDonNghiPhep.NHAP && 
        donNghi.trangThai !== TrangThaiDonNghiPhep.TU_CHOI) {
      throw new BadRequestException('Chỉ có thể sửa đơn ở trạng thái Nháp hoặc Từ chối');
    }

    // Tính lại số ngày nếu có thay đổi ngày
    let soNgayNghi = Number(donNghi.soNgayNghi);
    if (dto.tuNgay || dto.denNgay) {
      const tuNgay = dto.tuNgay ? new Date(dto.tuNgay) : donNghi.tuNgay;
      const denNgay = dto.denNgay ? new Date(dto.denNgay) : donNghi.denNgay;
      
      if (tuNgay > denNgay) {
        throw new BadRequestException('Ngày bắt đầu phải nhỏ hơn hoặc bằng ngày kết thúc');
      }
      
      soNgayNghi = this.tinhSoNgayNghi(tuNgay, denNgay);
    }

    return this.prisma.donNghiPhep.update({
      where: { id },
      data: {
        ...dto,
        tuNgay: dto.tuNgay ? new Date(dto.tuNgay) : undefined,
        denNgay: dto.denNgay ? new Date(dto.denNgay) : undefined,
        soNgayNghi,
        // Reset trạng thái về NHAP nếu đang TU_CHOI
        trangThai: donNghi.trangThai === TrangThaiDonNghiPhep.TU_CHOI 
          ? TrangThaiDonNghiPhep.NHAP 
          : undefined,
      },
      include: {
        nhanVien: { select: { id: true, maNhanVien: true, hoTen: true } },
        phongBan: { select: { id: true, tenPhongBan: true } },
        loaiNghi: true,
      },
    });
  }

  /**
   * Gửi duyệt đơn nghỉ phép
   */
  async guiDuyet(id: number, nguoiGui?: number) {
    const donNghi = await this.prisma.donNghiPhep.findUnique({
      where: { id },
    });

    if (!donNghi) {
      throw new NotFoundException(`Không tìm thấy đơn nghỉ phép #${id}`);
    }

    if (donNghi.trangThai !== TrangThaiDonNghiPhep.NHAP && 
        donNghi.trangThai !== TrangThaiDonNghiPhep.TU_CHOI) {
      throw new BadRequestException('Chỉ có thể gửi duyệt đơn ở trạng thái Nháp hoặc Từ chối');
    }

    return this.prisma.donNghiPhep.update({
      where: { id },
      data: {
        trangThai: TrangThaiDonNghiPhep.GUI_DUYET,
      },
      include: {
        nhanVien: { select: { id: true, maNhanVien: true, hoTen: true } },
        phongBan: { select: { id: true, tenPhongBan: true } },
        loaiNghi: true,
      },
    });
  }

  /**
   * Duyệt đơn nghỉ phép
   */
  async duyetDon(id: number, dto: DuyetDonNghiPhepDto, nguoiDuyetId: number) {
    const donNghi = await this.prisma.donNghiPhep.findUnique({
      where: { id },
    });

    if (!donNghi) {
      throw new NotFoundException(`Không tìm thấy đơn nghỉ phép #${id}`);
    }

    if (donNghi.trangThai !== TrangThaiDonNghiPhep.GUI_DUYET) {
      throw new BadRequestException('Chỉ có thể duyệt đơn ở trạng thái Chờ duyệt');
    }

    // Cập nhật trạng thái
    const donNghiUpdated = await this.prisma.donNghiPhep.update({
      where: { id },
      data: {
        trangThai: TrangThaiDonNghiPhep.DA_DUYET,
        nguoiDuyetId,
        ngayDuyet: new Date(),
      },
      include: {
        nhanVien: { select: { id: true, maNhanVien: true, hoTen: true } },
        phongBan: { select: { id: true, tenPhongBan: true } },
        loaiNghi: true,
        nguoiDuyet: { select: { id: true, hoTen: true } },
      },
    });

    // Tạo mapping
    try {
      await this.mappingService.rebuildMapping(id);
    } catch (error) {
      this.logger.error(`Lỗi khi tạo mapping cho đơn #${id}:`, error);
    }

    return donNghiUpdated;
  }

  /**
   * Từ chối đơn nghỉ phép
   */
  async tuChoiDon(id: number, dto: TuChoiDonNghiPhepDto, nguoiDuyetId: number) {
    const donNghi = await this.prisma.donNghiPhep.findUnique({
      where: { id },
    });

    if (!donNghi) {
      throw new NotFoundException(`Không tìm thấy đơn nghỉ phép #${id}`);
    }

    if (donNghi.trangThai !== TrangThaiDonNghiPhep.GUI_DUYET) {
      throw new BadRequestException('Chỉ có thể từ chối đơn ở trạng thái Chờ duyệt');
    }

    return this.prisma.donNghiPhep.update({
      where: { id },
      data: {
        trangThai: TrangThaiDonNghiPhep.TU_CHOI,
        nguoiDuyetId,
        ngayDuyet: new Date(),
        lyDoTuChoi: dto.lyDoTuChoi,
      },
      include: {
        nhanVien: { select: { id: true, maNhanVien: true, hoTen: true } },
        phongBan: { select: { id: true, tenPhongBan: true } },
        loaiNghi: true,
        nguoiDuyet: { select: { id: true, hoTen: true } },
      },
    });
  }

  /**
   * Hủy đơn nghỉ phép
   */
  async huyDon(id: number, nguoiHuy?: number) {
    const donNghi = await this.prisma.donNghiPhep.findUnique({
      where: { id },
    });

    if (!donNghi) {
      throw new NotFoundException(`Không tìm thấy đơn nghỉ phép #${id}`);
    }

    if (donNghi.trangThai === TrangThaiDonNghiPhep.HUY) {
      throw new BadRequestException('Đơn đã bị hủy');
    }

    // Nếu đơn đã duyệt, xóa mapping
    if (donNghi.trangThai === TrangThaiDonNghiPhep.DA_DUYET) {
      await this.mappingService.xoaMapping(id);
    }

    return this.prisma.donNghiPhep.update({
      where: { id },
      data: {
        trangThai: TrangThaiDonNghiPhep.HUY,
      },
      include: {
        nhanVien: { select: { id: true, maNhanVien: true, hoTen: true } },
        phongBan: { select: { id: true, tenPhongBan: true } },
        loaiNghi: true,
      },
    });
  }

  /**
   * Lấy chi tiết đơn nghỉ phép
   */
  async layChiTietDon(id: number) {
    const donNghi = await this.prisma.donNghiPhep.findUnique({
      where: { id },
      include: {
        nhanVien: { select: { id: true, maNhanVien: true, hoTen: true } },
        phongBan: { select: { id: true, tenPhongBan: true } },
        loaiNghi: true,
        nguoiDuyet: { select: { id: true, hoTen: true } },
        chiTietNgays: {
          include: { loaiNghi: true },
          orderBy: { ngay: 'asc' },
        },
      },
    });

    if (!donNghi) {
      throw new NotFoundException(`Không tìm thấy đơn nghỉ phép #${id}`);
    }

    return donNghi;
  }

  /**
   * Lấy danh sách đơn nghỉ phép có phân trang và lọc
   */
  async layDanhSachDon(filter: LocDonNghiPhepDto) {
    const where: Prisma.DonNghiPhepWhereInput = {};

    if (filter.phongBanId) {
      where.phongBanId = filter.phongBanId;
    }
    if (filter.nhanVienId) {
      where.nhanVienId = filter.nhanVienId;
    }
    if (filter.loaiNghiId) {
      where.loaiNghiId = filter.loaiNghiId;
    }
    if (filter.trangThai) {
      where.trangThai = filter.trangThai;
    }
    if (filter.tuNgay) {
      where.tuNgay = { gte: new Date(filter.tuNgay) };
    }
    if (filter.denNgay) {
      where.denNgay = { lte: new Date(filter.denNgay) };
    }

    const page = filter.page ?? 1;
    const limit = filter.limit ?? 20;
    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      this.prisma.donNghiPhep.findMany({
        where,
        include: {
          nhanVien: { select: { id: true, maNhanVien: true, hoTen: true } },
          phongBan: { select: { id: true, tenPhongBan: true } },
          loaiNghi: true,
          nguoiDuyet: { select: { id: true, hoTen: true } },
        },
        orderBy: { ngayTao: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.donNghiPhep.count({ where }),
    ]);

    return {
      items,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Lấy lịch nghỉ phép
   */
  async layLichNghi(filter: LocLichNghiDto) {
    const tuNgay = new Date(filter.tuNgay);
    const denNgay = new Date(filter.denNgay);

    const where: Prisma.ChiTietNghiPhepNgayWhereInput = {
      ngay: {
        gte: tuNgay,
        lte: denNgay,
      },
      donNghiPhep: {
        trangThai: TrangThaiDonNghiPhep.DA_DUYET,
      },
    };

    if (filter.nhanVienId) {
      where.nhanVienId = filter.nhanVienId;
    }
    if (filter.phongBanId) {
      where.donNghiPhep = {
        ...where.donNghiPhep as object,
        phongBanId: filter.phongBanId,
      };
    }

    const chiTietNgays = await this.prisma.chiTietNghiPhepNgay.findMany({
      where,
      include: {
        nhanVien: { select: { id: true, maNhanVien: true, hoTen: true } },
        loaiNghi: true,
        donNghiPhep: {
          select: { id: true, maDon: true, trangThai: true },
        },
      },
      orderBy: [{ nhanVienId: 'asc' }, { ngay: 'asc' }],
    });

    // Nhóm theo nhân viên
    const grouped = new Map<number, typeof chiTietNgays>();
    for (const ct of chiTietNgays) {
      if (!grouped.has(ct.nhanVienId)) {
        grouped.set(ct.nhanVienId, []);
      }
      grouped.get(ct.nhanVienId)!.push(ct);
    }

    return Array.from(grouped.entries()).map(([nhanVienId, items]) => ({
      nhanVien: items[0].nhanVien,
      chiTietNgays: items.map((ct) => ({
        ngay: ct.ngay,
        soGioNghi: Number(ct.soGioNghi),
        loaiNghi: ct.loaiNghi,
        coTinhLuong: ct.coTinhLuong,
        coTinhChuyenCan: ct.coTinhChuyenCan,
        donNghiPhep: ct.donNghiPhep,
      })),
    }));
  }

  /**
   * Rebuild mapping cho một đơn (admin)
   */
  async rebuildMapping(id: number) {
    const donNghi = await this.prisma.donNghiPhep.findUnique({
      where: { id },
    });

    if (!donNghi) {
      throw new NotFoundException(`Không tìm thấy đơn nghỉ phép #${id}`);
    }

    if (donNghi.trangThai !== TrangThaiDonNghiPhep.DA_DUYET) {
      throw new BadRequestException('Chỉ có thể rebuild mapping cho đơn đã duyệt');
    }

    return this.mappingService.rebuildMapping(id);
  }
}
