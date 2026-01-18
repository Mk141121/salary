import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CaLamViecService } from '../ca-lam-viec/ca-lam-viec.service';
import {
  TaoLichPhanCaDto,
  CapNhatLichPhanCaDto,
  AssignBatchDto,
  CopyTuanDto,
  LocLichPhanCaDto,
  CalendarViewDto,
  ChiTietPhanCaNgayDto,
} from './phan-ca.dto';

@Injectable()
export class PhanCaService {
  constructor(
    private prisma: PrismaService,
    private caLamViecService: CaLamViecService,
  ) {}

  /**
   * Lấy danh sách lịch phân ca
   */
  async layDanhSach(filter: LocLichPhanCaDto) {
    const where: any = {};

    if (filter.thangNam) {
      where.thangNam = filter.thangNam;
    }
    if (filter.phongBanId !== undefined) {
      where.phongBanId = filter.phongBanId;
    }
    if (filter.nhomId !== undefined) {
      where.nhomId = filter.nhomId;
    }
    if (filter.trangThai) {
      where.trangThai = filter.trangThai;
    }

    const danhSach = await this.prisma.lichPhanCa.findMany({
      where,
      orderBy: [{ thangNam: 'desc' }, { ngayTao: 'desc' }],
      include: {
        _count: {
          select: { chiTiets: true },
        },
      },
    });

    return {
      data: danhSach,
      total: danhSach.length,
    };
  }

  /**
   * Lấy chi tiết lịch phân ca
   */
  async layChiTiet(id: number) {
    const lich = await this.prisma.lichPhanCa.findUnique({
      where: { id },
      include: {
        chiTiets: {
          include: {
            caLamViec: {
              select: {
                id: true,
                maCa: true,
                tenCa: true,
                gioVao: true,
                gioRa: true,
                mauHienThi: true,
                isCaDem: true,
              },
            },
          },
          orderBy: [{ ngay: 'asc' }, { nhanVienId: 'asc' }],
        },
      },
    });

    if (!lich) {
      throw new NotFoundException(`Không tìm thấy lịch phân ca với ID: ${id}`);
    }

    return lich;
  }

  /**
   * Tạo lịch phân ca mới
   */
  async tao(dto: TaoLichPhanCaDto, nguoiTaoId?: number) {
    // Validate: phải có phongBanId hoặc nhomId
    if (!dto.phongBanId && !dto.nhomId) {
      throw new BadRequestException('Phải chọn phòng ban hoặc nhóm nhân viên');
    }

    // Kiểm tra trùng lịch
    const existing = await this.prisma.lichPhanCa.findFirst({
      where: {
        thangNam: dto.thangNam,
        phongBanId: dto.phongBanId || null,
        nhomId: dto.nhomId || null,
        trangThai: { not: 'HUY' },
      },
    });

    if (existing) {
      throw new ConflictException(
        `Đã tồn tại lịch phân ca cho tháng ${dto.thangNam} với phòng ban/nhóm này`,
      );
    }

    const lich = await this.prisma.lichPhanCa.create({
      data: {
        thangNam: dto.thangNam,
        phongBanId: dto.phongBanId,
        nhomId: dto.nhomId,
        tenLich: dto.tenLich || `Lịch phân ca ${dto.thangNam}`,
        ghiChu: dto.ghiChu,
        taoBoi: nguoiTaoId,
      },
    });

    return lich;
  }

  /**
   * Cập nhật lịch phân ca
   */
  async capNhat(id: number, dto: CapNhatLichPhanCaDto, nguoiCapNhatId?: number) {
    const lich = await this.layChiTiet(id);

    if (lich.trangThai === 'DA_CONG_BO') {
      throw new BadRequestException('Không thể sửa lịch đã công bố');
    }

    return this.prisma.lichPhanCa.update({
      where: { id },
      data: {
        ...dto,
        capNhatBoi: nguoiCapNhatId,
      },
    });
  }

  /**
   * Assign ca cho 1 ngày cụ thể
   */
  async assignNgay(lichId: number, dto: ChiTietPhanCaNgayDto, nguoiTaoId?: number) {
    const lich = await this.layChiTiet(lichId);

    if (lich.trangThai === 'DA_CONG_BO') {
      throw new BadRequestException('Không thể sửa lịch đã công bố');
    }

    // Validate ngày trong tháng của lịch
    const ngay = new Date(dto.ngay);
    const thangNamNgay = `${ngay.getFullYear()}-${String(ngay.getMonth() + 1).padStart(2, '0')}`;
    if (thangNamNgay !== lich.thangNam) {
      throw new BadRequestException(`Ngày ${dto.ngay} không thuộc tháng ${lich.thangNam}`);
    }

    // Validate ca tồn tại
    await this.caLamViecService.layChiTiet(dto.caLamViecId);

    // Upsert chi tiết
    const result = await this.prisma.lichPhanCaChiTiet.upsert({
      where: {
        nhanVienId_ngay: {
          nhanVienId: dto.nhanVienId,
          ngay: ngay,
        },
      },
      update: {
        caLamViecId: dto.caLamViecId,
        ghiChu: dto.ghiChu,
      },
      create: {
        lichPhanCaId: lichId,
        nhanVienId: dto.nhanVienId,
        ngay: ngay,
        caLamViecId: dto.caLamViecId,
        ghiChu: dto.ghiChu,
        taoBoi: nguoiTaoId,
      },
      include: {
        caLamViec: true,
      },
    });

    return result;
  }

  /**
   * Assign batch cho nhiều nhân viên nhiều ngày
   */
  async assignBatch(lichId: number, dto: AssignBatchDto, nguoiTaoId?: number) {
    const lich = await this.layChiTiet(lichId);

    if (lich.trangThai === 'DA_CONG_BO') {
      throw new BadRequestException('Không thể sửa lịch đã công bố');
    }

    // Validate ca
    await this.caLamViecService.layChiTiet(dto.caLamViecId);

    // Generate danh sách ngày
    const tuNgay = new Date(dto.tuNgay);
    const denNgay = new Date(dto.denNgay);
    const ngoaiTruThu = new Set(dto.ngoaiTruThu || []);

    const ngays: Date[] = [];
    const current = new Date(tuNgay);
    while (current <= denNgay) {
      const thu = current.getDay(); // 0=CN, 1=T2, ...
      if (!ngoaiTruThu.has(thu)) {
        ngays.push(new Date(current));
      }
      current.setDate(current.getDate() + 1);
    }

    // Validate ngày trong tháng
    for (const ngay of ngays) {
      const thangNamNgay = `${ngay.getFullYear()}-${String(ngay.getMonth() + 1).padStart(2, '0')}`;
      if (thangNamNgay !== lich.thangNam) {
        throw new BadRequestException(`Ngày không thuộc tháng ${lich.thangNam}`);
      }
    }

    // Tạo data batch
    const dataToUpsert: any[] = [];
    for (const nhanVienId of dto.nhanVienIds) {
      for (const ngay of ngays) {
        dataToUpsert.push({
          nhanVienId,
          ngay,
          caLamViecId: dto.caLamViecId,
          ghiChu: dto.ghiChu,
        });
      }
    }

    // Batch upsert using transaction
    let created = 0;
    let updated = 0;

    await this.prisma.$transaction(async (tx) => {
      for (const item of dataToUpsert) {
        const existing = await tx.lichPhanCaChiTiet.findUnique({
          where: {
            nhanVienId_ngay: {
              nhanVienId: item.nhanVienId,
              ngay: item.ngay,
            },
          },
        });

        if (existing) {
          await tx.lichPhanCaChiTiet.update({
            where: { id: existing.id },
            data: {
              caLamViecId: item.caLamViecId,
              ghiChu: item.ghiChu,
            },
          });
          updated++;
        } else {
          await tx.lichPhanCaChiTiet.create({
            data: {
              lichPhanCaId: lichId,
              nhanVienId: item.nhanVienId,
              ngay: item.ngay,
              caLamViecId: item.caLamViecId,
              ghiChu: item.ghiChu,
              taoBoi: nguoiTaoId,
            },
          });
          created++;
        }
      }
    });

    return {
      message: `Đã phân ca thành công`,
      created,
      updated,
      total: created + updated,
    };
  }

  /**
   * Copy tuần
   */
  async copyTuan(lichId: number, dto: CopyTuanDto, nguoiTaoId?: number) {
    const lich = await this.layChiTiet(lichId);

    if (lich.trangThai === 'DA_CONG_BO') {
      throw new BadRequestException('Không thể sửa lịch đã công bố');
    }

    // Tính ngày đầu tuần (T2) của tuần nguồn và tuần đích
    const tuanNguonDate = new Date(dto.tuanNguon);
    const tuanDichDate = new Date(dto.tuanDich);

    const getMondayOfWeek = (date: Date): Date => {
      const d = new Date(date);
      const day = d.getDay();
      const diff = d.getDate() - day + (day === 0 ? -6 : 1);
      return new Date(d.setDate(diff));
    };

    const mondayNguon = getMondayOfWeek(tuanNguonDate);
    const mondayDich = getMondayOfWeek(tuanDichDate);

    // Lấy dữ liệu tuần nguồn (T2-CN = 7 ngày)
    const sundayNguon = new Date(mondayNguon);
    sundayNguon.setDate(sundayNguon.getDate() + 6);

    const whereNguon: any = {
      lichPhanCaId: lichId,
      ngay: {
        gte: mondayNguon,
        lte: sundayNguon,
      },
    };

    if (dto.nhanVienIds && dto.nhanVienIds.length > 0) {
      whereNguon.nhanVienId = { in: dto.nhanVienIds };
    }

    const dataNguon = await this.prisma.lichPhanCaChiTiet.findMany({
      where: whereNguon,
    });

    if (dataNguon.length === 0) {
      throw new BadRequestException('Không có dữ liệu phân ca trong tuần nguồn');
    }

    // Tính offset ngày
    const offsetDays = Math.round(
      (mondayDich.getTime() - mondayNguon.getTime()) / (1000 * 60 * 60 * 24),
    );

    // Copy sang tuần đích
    let created = 0;
    let updated = 0;

    await this.prisma.$transaction(async (tx) => {
      for (const item of dataNguon) {
        const ngayDich = new Date(item.ngay);
        ngayDich.setDate(ngayDich.getDate() + offsetDays);

        // Kiểm tra ngày đích có trong tháng của lịch không
        const thangNamDich = `${ngayDich.getFullYear()}-${String(ngayDich.getMonth() + 1).padStart(2, '0')}`;
        if (thangNamDich !== lich.thangNam) {
          continue; // Skip ngày ngoài tháng
        }

        const existing = await tx.lichPhanCaChiTiet.findUnique({
          where: {
            nhanVienId_ngay: {
              nhanVienId: item.nhanVienId,
              ngay: ngayDich,
            },
          },
        });

        if (existing) {
          await tx.lichPhanCaChiTiet.update({
            where: { id: existing.id },
            data: {
              caLamViecId: item.caLamViecId,
              ghiChu: item.ghiChu,
            },
          });
          updated++;
        } else {
          await tx.lichPhanCaChiTiet.create({
            data: {
              lichPhanCaId: lichId,
              nhanVienId: item.nhanVienId,
              ngay: ngayDich,
              caLamViecId: item.caLamViecId,
              ghiChu: item.ghiChu,
              taoBoi: nguoiTaoId,
            },
          });
          created++;
        }
      }
    });

    return {
      message: 'Đã copy tuần thành công',
      created,
      updated,
      total: created + updated,
    };
  }

  /**
   * Lấy calendar view
   */
  async layCalendarView(dto: CalendarViewDto) {
    // Build where conditions
    const whereNhanVien: any = { trangThai: 'DANG_LAM' };

    if (dto.phongBanId) {
      whereNhanVien.phongBanId = dto.phongBanId;
    }

    if (dto.nhanVienIds && dto.nhanVienIds.length > 0) {
      whereNhanVien.id = { in: dto.nhanVienIds };
    }

    // Lấy danh sách nhân viên
    const nhanViens = await this.prisma.nhanVien.findMany({
      where: whereNhanVien,
      select: {
        id: true,
        maNhanVien: true,
        hoTen: true,
        phongBanId: true,
      },
      orderBy: { hoTen: 'asc' },
    });

    // Tính ngày đầu và cuối tháng
    const [year, month] = dto.thangNam.split('-').map(Number);
    const ngayDau = new Date(year, month - 1, 1);
    const ngayCuoi = new Date(year, month, 0);

    // Lấy phân ca trong tháng
    const phanCas = await this.prisma.lichPhanCaChiTiet.findMany({
      where: {
        nhanVienId: { in: nhanViens.map((nv) => nv.id) },
        ngay: {
          gte: ngayDau,
          lte: ngayCuoi,
        },
      },
      include: {
        caLamViec: {
          select: {
            id: true,
            maCa: true,
            tenCa: true,
            gioVao: true,
            gioRa: true,
            mauHienThi: true,
          },
        },
      },
    });

    // Build calendar data
    const calendarData = nhanViens.map((nv) => {
      const phanCaNV = phanCas.filter((pc) => pc.nhanVienId === nv.id);
      const ngays: Record<string, any> = {};

      for (const pc of phanCaNV) {
        const ngayKey = pc.ngay.toISOString().split('T')[0];
        ngays[ngayKey] = {
          caLamViecId: pc.caLamViecId,
          maCa: pc.caLamViec.maCa,
          tenCa: pc.caLamViec.tenCa,
          gioVao: pc.caLamViec.gioVao,
          gioRa: pc.caLamViec.gioRa,
          mauHienThi: pc.caLamViec.mauHienThi,
          ghiChu: pc.ghiChu,
        };
      }

      return {
        nhanVienId: nv.id,
        maNhanVien: nv.maNhanVien,
        hoTen: nv.hoTen,
        phongBanId: nv.phongBanId,
        ngays,
      };
    });

    // Lấy danh sách ca để hiển thị legend
    const danhSachCa = await this.caLamViecService.layDanhSachActive(dto.phongBanId);

    return {
      thangNam: dto.thangNam,
      soNgayTrongThang: ngayCuoi.getDate(),
      ngayDauThang: ngayDau.getDay(), // 0=CN, 1=T2, ...
      nhanViens: calendarData,
      danhSachCa,
    };
  }

  /**
   * Publish lịch phân ca → mapping sang chấm công
   */
  async publish(id: number, nguoiCongBoId?: number) {
    const lich = await this.layChiTiet(id);

    if (lich.trangThai === 'DA_CONG_BO') {
      throw new BadRequestException('Lịch đã được công bố trước đó');
    }

    if (lich.trangThai === 'HUY') {
      throw new BadRequestException('Không thể công bố lịch đã hủy');
    }

    if (lich.chiTiets.length === 0) {
      throw new BadRequestException('Lịch chưa có phân ca nào');
    }

    // Mapping sang ChiTietChamCong
    let mapped = 0;
    let skipped = 0;

    await this.prisma.$transaction(async (tx) => {
      for (const ct of lich.chiTiets) {
        // Lấy thông tin ca
        const ca = ct.caLamViec;

        // Tính giờ vào/ra dự kiến
        const [gioVaoH, gioVaoM] = ca.gioVao.split(':').map(Number);
        const [gioRaH, gioRaM] = ca.gioRa.split(':').map(Number);

        const gioVaoDuKien = new Date(ct.ngay);
        gioVaoDuKien.setHours(gioVaoH, gioVaoM, 0, 0);

        const gioRaDuKien = new Date(ct.ngay);
        gioRaDuKien.setHours(gioRaH, gioRaM, 0, 0);

        // Ca đêm: giờ ra sang ngày hôm sau
        if (ca.isCaDem && gioRaH < gioVaoH) {
          gioRaDuKien.setDate(gioRaDuKien.getDate() + 1);
        }

        // Kiểm tra đã có chấm công thực tế chưa
        const existing = await tx.chiTietChamCong.findUnique({
          where: {
            nhanVienId_ngay: {
              nhanVienId: ct.nhanVienId,
              ngay: ct.ngay,
            },
          },
        });

        if (existing) {
          // Chỉ cập nhật ca reference, không overwrite chấm công thực tế
          if (!existing.gioVao && !existing.gioRa) {
            await tx.chiTietChamCong.update({
              where: { id: existing.id },
              data: {
                caLamViecId: ct.caLamViecId,
                gioVaoDuKien,
                gioRaDuKien,
              },
            });
            mapped++;
          } else {
            // Đã có dữ liệu thực tế, chỉ gắn ca reference
            await tx.chiTietChamCong.update({
              where: { id: existing.id },
              data: {
                caLamViecId: ct.caLamViecId,
                gioVaoDuKien,
                gioRaDuKien,
              },
            });
            skipped++;
          }
        } else {
          // Tạo mới record chấm công dự kiến
          await tx.chiTietChamCong.create({
            data: {
              nhanVienId: ct.nhanVienId,
              ngay: ct.ngay,
              caLamViecId: ct.caLamViecId,
              gioVaoDuKien,
              gioRaDuKien,
              trangThai: 'DI_LAM',
              loaiNgay: 'NGAY_THUONG', // Sẽ được cập nhật sau nếu là T7/CN/Lễ
            },
          });
          mapped++;
        }
      }

      // Cập nhật trạng thái lịch
      await tx.lichPhanCa.update({
        where: { id },
        data: {
          trangThai: 'DA_CONG_BO',
          ngayCongBo: new Date(),
          nguoiCongBo: nguoiCongBoId,
        },
      });
    });

    return {
      message: 'Đã công bố lịch và mapping sang chấm công thành công',
      mapped,
      skipped,
      total: lich.chiTiets.length,
    };
  }

  /**
   * Unpublish (hủy công bố)
   */
  async unpublish(id: number, nguoiCapNhatId?: number) {
    const lich = await this.layChiTiet(id);

    if (lich.trangThai !== 'DA_CONG_BO') {
      throw new BadRequestException('Chỉ có thể hủy công bố lịch đã công bố');
    }

    // Kiểm tra có chấm công thực tế chưa
    const [year, month] = lich.thangNam.split('-').map(Number);
    const ngayDau = new Date(year, month - 1, 1);
    const ngayCuoi = new Date(year, month, 0);

    const coChamCongThucTe = await this.prisma.chiTietChamCong.count({
      where: {
        ngay: { gte: ngayDau, lte: ngayCuoi },
        caLamViecId: { not: null },
        OR: [{ gioVao: { not: null } }, { gioRa: { not: null } }],
      },
    });

    if (coChamCongThucTe > 0) {
      throw new BadRequestException(
        `Có ${coChamCongThucTe} record chấm công thực tế. Không thể hủy công bố.`,
      );
    }

    // Xóa mapping trong ChiTietChamCong
    await this.prisma.$transaction(async (tx) => {
      await tx.chiTietChamCong.deleteMany({
        where: {
          caLamViecId: { not: null },
          ngay: { gte: ngayDau, lte: ngayCuoi },
          gioVao: null,
          gioRa: null,
        },
      });

      await tx.lichPhanCa.update({
        where: { id },
        data: {
          trangThai: 'NHAP',
          ngayCongBo: null,
          nguoiCongBo: null,
          capNhatBoi: nguoiCapNhatId,
        },
      });
    });

    return { message: 'Đã hủy công bố lịch thành công' };
  }

  /**
   * Xóa lịch phân ca
   */
  async xoa(id: number) {
    const lich = await this.layChiTiet(id);

    if (lich.trangThai === 'DA_CONG_BO') {
      throw new BadRequestException('Không thể xóa lịch đã công bố. Hãy hủy công bố trước.');
    }

    await this.prisma.lichPhanCa.delete({
      where: { id },
    });

    return { message: 'Đã xóa lịch phân ca thành công' };
  }

  /**
   * Xóa chi tiết phân ca
   */
  async xoaChiTiet(lichId: number, chiTietIds: number[]) {
    const lich = await this.layChiTiet(lichId);

    if (lich.trangThai === 'DA_CONG_BO') {
      throw new BadRequestException('Không thể sửa lịch đã công bố');
    }

    const result = await this.prisma.lichPhanCaChiTiet.deleteMany({
      where: {
        id: { in: chiTietIds },
        lichPhanCaId: lichId,
      },
    });

    return {
      message: `Đã xóa ${result.count} phân ca`,
      deleted: result.count,
    };
  }

  /**
   * Lấy lịch làm việc của tôi (cho nhân viên)
   */
  async layLichCuaToi(nhanVienId: number, tuNgay: string, denNgay: string) {
    const from = new Date(tuNgay);
    const to = new Date(denNgay);

    const phanCas = await this.prisma.lichPhanCaChiTiet.findMany({
      where: {
        nhanVienId,
        ngay: { gte: from, lte: to },
        lichPhanCa: { trangThai: 'DA_CONG_BO' },
      },
      include: {
        caLamViec: {
          select: {
            id: true,
            maCa: true,
            tenCa: true,
            gioVao: true,
            gioRa: true,
            isCaDem: true,
            mauHienThi: true,
          },
        },
      },
      orderBy: { ngay: 'asc' },
    });

    return phanCas.map((pc) => ({
      ngay: pc.ngay.toISOString().split('T')[0],
      ca: pc.caLamViec,
      ghiChu: pc.ghiChu,
    }));
  }
}
