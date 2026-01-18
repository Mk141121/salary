// Service Yêu cầu (Request) - Sprint 4
// Xử lý nghiệp vụ đơn yêu cầu: OT, Trễ giờ, Về sớm, Công tác, Làm từ xa
import { Injectable, BadRequestException, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma, TrangThaiDonYeuCau } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import { ThongBaoService } from '../thong-bao/thong-bao.service';
import {
  TaoLoaiYeuCauDto,
  CapNhatLoaiYeuCauDto,
  TaoDonYeuCauDto,
  CapNhatDonYeuCauDto,
  DuyetDonYeuCauDto,
  TuChoiDonYeuCauDto,
  OverrideDonYeuCauDto,
  LocDonYeuCauDto,
  TaoWorkflowConfigDto,
  CapNhatWorkflowConfigDto,
} from './yeu-cau.dto';

@Injectable()
export class YeuCauService {
  constructor(
    private prisma: PrismaService,
    private thongBaoService: ThongBaoService,
  ) {}

  // =============== DANH MỤC LOẠI YÊU CẦU ===============

  async layDanhSachLoaiYeuCau(chiActive: boolean = true) {
    const where = chiActive ? { isActive: true } : {};
    return this.prisma.danhMucLoaiYeuCau.findMany({
      where,
      orderBy: { thuTuHienThi: 'asc' },
    });
  }

  async layLoaiYeuCau(id: number) {
    const loai = await this.prisma.danhMucLoaiYeuCau.findUnique({ where: { id } });
    if (!loai) throw new NotFoundException('Không tìm thấy loại yêu cầu');
    return loai;
  }

  async taoLoaiYeuCau(dto: TaoLoaiYeuCauDto, taoBoi?: number) {
    // Kiểm tra trùng mã
    const existing = await this.prisma.danhMucLoaiYeuCau.findUnique({
      where: { maLoai: dto.maLoai },
    });
    if (existing) throw new BadRequestException('Mã loại yêu cầu đã tồn tại');

    return this.prisma.danhMucLoaiYeuCau.create({
      data: { ...dto, taoBoi },
    });
  }

  async capNhatLoaiYeuCau(id: number, dto: CapNhatLoaiYeuCauDto, capNhatBoi?: number) {
    await this.layLoaiYeuCau(id);
    return this.prisma.danhMucLoaiYeuCau.update({
      where: { id },
      data: { ...dto, capNhatBoi },
    });
  }

  async toggleLoaiYeuCau(id: number, capNhatBoi?: number) {
    const loai = await this.layLoaiYeuCau(id);
    return this.prisma.danhMucLoaiYeuCau.update({
      where: { id },
      data: { isActive: !loai.isActive, capNhatBoi },
    });
  }

  // =============== ĐƠN YÊU CẦU ===============

  async layDanhSachDon(filter: LocDonYeuCauDto) {
    const {
      nhanVienId,
      phongBanId,
      loaiYeuCauId,
      trangThai,
      tuNgay,
      denNgay,
      nguoiDuyet1Id,
      nguoiDuyet2Id,
      page = 1,
      limit = 20,
    } = filter;

    const where: any = {};

    if (nhanVienId) where.nhanVienId = nhanVienId;
    if (phongBanId) where.phongBanId = phongBanId;
    if (loaiYeuCauId) where.loaiYeuCauId = loaiYeuCauId;
    if (trangThai) where.trangThai = trangThai as TrangThaiDonYeuCau;
    if (nguoiDuyet1Id) where.nguoiDuyet1Id = nguoiDuyet1Id;
    if (nguoiDuyet2Id) where.nguoiDuyet2Id = nguoiDuyet2Id;

    if (tuNgay || denNgay) {
      where.ngayYeuCau = {};
      if (tuNgay) where.ngayYeuCau.gte = new Date(tuNgay);
      if (denNgay) where.ngayYeuCau.lte = new Date(denNgay);
    }

    const [data, total] = await Promise.all([
      this.prisma.donYeuCau.findMany({
        where,
        include: {
          nhanVien: {
            select: { id: true, maNhanVien: true, hoTen: true },
          },
          phongBan: {
            select: { id: true, maPhongBan: true, tenPhongBan: true },
          },
          loaiYeuCau: {
            select: { id: true, maLoai: true, tenLoai: true, mauHienThi: true, icon: true },
          },
          nguoiDuyet1: {
            select: { id: true, hoTen: true },
          },
          nguoiDuyet2: {
            select: { id: true, hoTen: true },
          },
        },
        orderBy: { ngayTao: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.donYeuCau.count({ where }),
    ]);

    return {
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async layChiTietDon(id: number) {
    const don = await this.prisma.donYeuCau.findUnique({
      where: { id },
      include: {
        nhanVien: {
          select: { id: true, maNhanVien: true, hoTen: true, email: true, chucVu: true },
        },
        phongBan: {
          select: { id: true, maPhongBan: true, tenPhongBan: true },
        },
        loaiYeuCau: true,
        nguoiDuyet1: { select: { id: true, hoTen: true } },
        nguoiDuyet2: { select: { id: true, hoTen: true } },
        nguoiOverride: { select: { id: true, hoTen: true } },
        mappingChamCong: true,
      },
    });
    if (!don) throw new NotFoundException('Không tìm thấy đơn yêu cầu');
    return don;
  }

  async taoDon(dto: TaoDonYeuCauDto, taoBoi?: number) {
    // Lấy thông tin nhân viên
    const nhanVien = await this.prisma.nhanVien.findUnique({
      where: { id: dto.nhanVienId },
      select: { id: true, phongBanId: true },
    });
    if (!nhanVien) throw new BadRequestException('Không tìm thấy nhân viên');

    // Lấy loại yêu cầu
    const loaiYeuCau = await this.prisma.danhMucLoaiYeuCau.findUnique({
      where: { id: dto.loaiYeuCauId },
    });
    if (!loaiYeuCau || !loaiYeuCau.isActive) {
      throw new BadRequestException('Loại yêu cầu không hợp lệ');
    }

    // Validate fields theo loại yêu cầu
    if (loaiYeuCau.yeuCauGioBatDau && !dto.gioBatDau) {
      throw new BadRequestException('Loại yêu cầu này yêu cầu nhập giờ bắt đầu');
    }
    if (loaiYeuCau.yeuCauGioKetThuc && !dto.gioKetThuc) {
      throw new BadRequestException('Loại yêu cầu này yêu cầu nhập giờ kết thúc');
    }
    if (loaiYeuCau.yeuCauDiaDiem && !dto.diaDiem) {
      throw new BadRequestException('Loại yêu cầu này yêu cầu nhập địa điểm');
    }

    // Tính số giờ nếu có giờ bắt đầu và kết thúc
    let soGio: Prisma.Decimal | null = null;
    if (dto.gioBatDau && dto.gioKetThuc) {
      const [h1, m1] = dto.gioBatDau.split(':').map(Number);
      const [h2, m2] = dto.gioKetThuc.split(':').map(Number);
      let minutes = (h2 * 60 + m2) - (h1 * 60 + m1);
      // Xử lý qua ngày (VD: 22:00 -> 02:00)
      if (minutes < 0) minutes += 24 * 60;
      soGio = new Decimal(Math.round((minutes / 60) * 100) / 100);
    }

    // Tạo mã đơn
    const now = new Date();
    const prefix = `REQ-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}`;
    const count = await this.prisma.donYeuCau.count({
      where: { maDon: { startsWith: prefix } },
    });
    const maDon = `${prefix}-${String(count + 1).padStart(5, '0')}`;

    return this.prisma.donYeuCau.create({
      data: {
        maDon,
        nhanVienId: dto.nhanVienId,
        phongBanId: nhanVien.phongBanId,
        loaiYeuCauId: dto.loaiYeuCauId,
        ngayYeuCau: new Date(dto.ngayYeuCau),
        gioBatDau: dto.gioBatDau,
        gioKetThuc: dto.gioKetThuc,
        soGio,
        diaDiem: dto.diaDiem,
        lyDo: dto.lyDo,
        tepDinhKemUrl: dto.tepDinhKemUrl,
        trangThai: 'NHAP',
        taoBoi,
      },
      include: {
        loaiYeuCau: { select: { maLoai: true, tenLoai: true } },
      },
    });
  }

  async capNhatDon(id: number, dto: CapNhatDonYeuCauDto, capNhatBoi?: number) {
    const don = await this.layChiTietDon(id);

    // Chỉ được sửa khi NHAP hoặc TU_CHOI
    if (!['NHAP', 'TU_CHOI'].includes(don.trangThai)) {
      throw new BadRequestException('Không thể sửa đơn đã gửi duyệt');
    }

    // Tính lại số giờ nếu có thay đổi
    let soGio: Prisma.Decimal | null = don.soGio;
    const gioBatDau = dto.gioBatDau ?? don.gioBatDau;
    const gioKetThuc = dto.gioKetThuc ?? don.gioKetThuc;
    if (gioBatDau && gioKetThuc) {
      const [h1, m1] = gioBatDau.split(':').map(Number);
      const [h2, m2] = gioKetThuc.split(':').map(Number);
      let minutes = (h2 * 60 + m2) - (h1 * 60 + m1);
      if (minutes < 0) minutes += 24 * 60;
      soGio = new Decimal(Math.round((minutes / 60) * 100) / 100);
    }

    return this.prisma.donYeuCau.update({
      where: { id },
      data: {
        ...dto,
        ngayYeuCau: dto.ngayYeuCau ? new Date(dto.ngayYeuCau) : undefined,
        soGio,
      },
    });
  }

  async guiDuyet(id: number, guiBoi?: number) {
    const don = await this.layChiTietDon(id);

    if (!['NHAP', 'TU_CHOI'].includes(don.trangThai)) {
      throw new BadRequestException('Đơn không ở trạng thái có thể gửi duyệt');
    }

    // Lấy workflow config
    const workflow = await this.layWorkflowConfig(don.loaiYeuCauId, don.phongBanId);

    return this.prisma.donYeuCau.update({
      where: { id },
      data: {
        trangThai: 'CHO_DUYET_1',
        lyDoTuChoi: null, // Clear lý do từ chối cũ nếu có
      },
    });
  }

  async duyetCap1(id: number, dto: DuyetDonYeuCauDto, nguoiDuyetId: number) {
    const don = await this.layChiTietDon(id);

    if (don.trangThai !== 'CHO_DUYET_1') {
      throw new BadRequestException('Đơn không ở trạng thái chờ duyệt cấp 1');
    }

    // Lấy workflow config
    const workflow = await this.layWorkflowConfig(don.loaiYeuCauId, don.phongBanId);

    // Nếu 2 cấp thì chuyển sang CHO_DUYET_2, nếu 1 cấp thì DA_DUYET
    const trangThaiMoi = workflow?.soCap === 2 ? 'CHO_DUYET_2' : 'DA_DUYET';

    const updated = await this.prisma.donYeuCau.update({
      where: { id },
      data: {
        trangThai: trangThaiMoi,
        nguoiDuyet1Id: nguoiDuyetId,
        ngayDuyet1: new Date(),
        ghiChuDuyet1: dto.ghiChu,
        // Nếu 1 cấp thì copy sang cấp 2 luôn
        ...(trangThaiMoi === 'DA_DUYET' && {
          nguoiDuyet2Id: nguoiDuyetId,
          ngayDuyet2: new Date(),
        }),
      },
    });

    // Nếu đã duyệt hoàn tất, tạo mapping
    if (trangThaiMoi === 'DA_DUYET') {
      await this.taoMappingChamCong(updated);

      // Gửi thông báo cho nhân viên
      const nguoiDung = await this.prisma.nguoiDung.findUnique({
        where: { nhanVienId: don.nhanVienId },
      });
      if (nguoiDung) {
        await this.thongBaoService.guiThongBaoYeuCauDaDuyet(
          nguoiDung.id,
          don.loaiYeuCau?.tenLoai || 'yêu cầu',
          id,
        );
      }
    }

    return updated;
  }

  async duyetCap2(id: number, dto: DuyetDonYeuCauDto, nguoiDuyetId: number) {
    const don = await this.layChiTietDon(id);

    if (don.trangThai !== 'CHO_DUYET_2') {
      throw new BadRequestException('Đơn không ở trạng thái chờ duyệt cấp 2');
    }

    const updated = await this.prisma.donYeuCau.update({
      where: { id },
      data: {
        trangThai: 'DA_DUYET',
        nguoiDuyet2Id: nguoiDuyetId,
        ngayDuyet2: new Date(),
        ghiChuDuyet2: dto.ghiChu,
      },
    });

    // Tạo mapping
    await this.taoMappingChamCong(updated);

    // Gửi thông báo cho nhân viên
    const nguoiDung = await this.prisma.nguoiDung.findUnique({
      where: { nhanVienId: don.nhanVienId },
    });
    if (nguoiDung) {
      await this.thongBaoService.guiThongBaoYeuCauDaDuyet(
        nguoiDung.id,
        don.loaiYeuCau?.tenLoai || 'yêu cầu',
        id,
      );
    }

    return updated;
  }

  async tuChoi(id: number, dto: TuChoiDonYeuCauDto, nguoiDuyetId: number, cap: 1 | 2) {
    const don = await this.layChiTietDon(id);

    const expectedTrangThai = cap === 1 ? 'CHO_DUYET_1' : 'CHO_DUYET_2';
    if (don.trangThai !== expectedTrangThai) {
      throw new BadRequestException(`Đơn không ở trạng thái chờ duyệt cấp ${cap}`);
    }

    const updated = await this.prisma.donYeuCau.update({
      where: { id },
      data: {
        trangThai: 'TU_CHOI',
        lyDoTuChoi: dto.lyDoTuChoi,
        ...(cap === 1
          ? { nguoiDuyet1Id: nguoiDuyetId, ngayDuyet1: new Date() }
          : { nguoiDuyet2Id: nguoiDuyetId, ngayDuyet2: new Date() }),
      },
    });

    // Gửi thông báo cho nhân viên
    const nguoiDung = await this.prisma.nguoiDung.findUnique({
      where: { nhanVienId: don.nhanVienId },
    });
    if (nguoiDung) {
      await this.thongBaoService.guiThongBaoYeuCauTuChoi(
        nguoiDung.id,
        don.loaiYeuCau?.tenLoai || 'yêu cầu',
        id,
        dto.lyDoTuChoi,
      );
    }

    return updated;
  }

  async override(id: number, dto: OverrideDonYeuCauDto, nguoiOverrideId: number) {
    const don = await this.layChiTietDon(id);

    // Chỉ override được khi đã có quyết định (DA_DUYET hoặc TU_CHOI)
    if (!['DA_DUYET', 'TU_CHOI', 'CHO_DUYET_1', 'CHO_DUYET_2'].includes(don.trangThai)) {
      throw new BadRequestException('Không thể override đơn này');
    }

    const trangThaiMoi = dto.duyet ? 'DA_DUYET' : 'TU_CHOI';

    const updated = await this.prisma.donYeuCau.update({
      where: { id },
      data: {
        trangThai: trangThaiMoi,
        isOverride: true,
        lyDoOverride: dto.lyDoOverride,
        nguoiOverrideId,
        // Override coi như duyệt cả 2 cấp
        nguoiDuyet1Id: don.nguoiDuyet1Id ?? nguoiOverrideId,
        ngayDuyet1: don.ngayDuyet1 ?? new Date(),
        nguoiDuyet2Id: nguoiOverrideId,
        ngayDuyet2: new Date(),
      },
    });

    // Nếu override duyệt, tạo mapping
    if (dto.duyet) {
      await this.taoMappingChamCong(updated);
    } else {
      // Nếu override từ chối, xóa mapping nếu có
      await this.prisma.requestMappingChamCong.deleteMany({
        where: { donYeuCauId: id, isLocked: false },
      });
    }

    return updated;
  }

  async huyDon(id: number, huyBoi?: number) {
    const don = await this.layChiTietDon(id);

    // Chỉ hủy được khi NHAP hoặc CHO_DUYET
    if (!['NHAP', 'CHO_DUYET_1', 'CHO_DUYET_2', 'TU_CHOI'].includes(don.trangThai)) {
      throw new BadRequestException('Không thể hủy đơn đã duyệt');
    }

    return this.prisma.donYeuCau.update({
      where: { id },
      data: { trangThai: 'HUY' },
    });
  }

  // =============== WORKFLOW CONFIG ===============

  async layDanhSachWorkflowConfig(loaiYeuCauId?: number, phongBanId?: number) {
    const where: any = {};
    if (loaiYeuCauId) where.loaiYeuCauId = loaiYeuCauId;
    if (phongBanId) where.phongBanId = phongBanId;

    return this.prisma.requestWorkflowConfig.findMany({
      where,
      include: {
        loaiYeuCau: { select: { maLoai: true, tenLoai: true } },
      },
      orderBy: { loaiYeuCauId: 'asc' },
    });
  }

  async layWorkflowConfig(loaiYeuCauId: number, phongBanId: number) {
    // Tìm config cụ thể cho phòng ban trước
    let config = await this.prisma.requestWorkflowConfig.findFirst({
      where: { loaiYeuCauId, phongBanId, isActive: true },
    });

    // Nếu không có, tìm config mặc định (phongBanId = null)
    if (!config) {
      config = await this.prisma.requestWorkflowConfig.findFirst({
        where: { loaiYeuCauId, phongBanId: null, isActive: true },
      });
    }

    // Nếu vẫn không có, trả về default 1 cấp
    return config || { soCap: 1, nguoiDuyet1: 'QUAN_LY_TRUC_TIEP' };
  }

  async taoWorkflowConfig(dto: TaoWorkflowConfigDto, taoBoi?: number) {
    return this.prisma.requestWorkflowConfig.create({
      data: { ...dto, taoBoi },
    });
  }

  async capNhatWorkflowConfig(id: number, dto: CapNhatWorkflowConfigDto, capNhatBoi?: number) {
    return this.prisma.requestWorkflowConfig.update({
      where: { id },
      data: { ...dto, capNhatBoi },
    });
  }

  // =============== MAPPING CHẤM CÔNG ===============

  private async taoMappingChamCong(don: any) {
    const loaiYeuCau = await this.prisma.danhMucLoaiYeuCau.findUnique({
      where: { id: don.loaiYeuCauId },
    });

    // Map loại yêu cầu sang loại mapping
    const loaiMapping = this.getLoaiMapping(loaiYeuCau?.maLoai || '');

    // Tạo mapping record
    await this.prisma.requestMappingChamCong.upsert({
      where: {
        donYeuCauId_ngay: {
          donYeuCauId: don.id,
          ngay: don.ngayYeuCau,
        },
      },
      create: {
        donYeuCauId: don.id,
        nhanVienId: don.nhanVienId,
        ngay: don.ngayYeuCau,
        loaiMapping,
        soGioApDung: don.soGio,
        ghiChu: `Từ đơn ${don.maDon}`,
      },
      update: {
        loaiMapping,
        soGioApDung: don.soGio,
      },
    });
  }

  private getLoaiMapping(maLoai: string): string {
    const mappings: Record<string, string> = {
      'OT': 'OT',
      'TRE_GIO': 'HOP_THUC_TRE',
      'VE_SOM': 'HOP_THUC_SOM',
      'CONG_TAC': 'CONG_TAC',
      'LAM_TU_XA': 'LAM_TU_XA',
    };
    return mappings[maLoai] || 'KHAC';
  }

  // =============== INBOX (Danh sách chờ duyệt) ===============

  async layInboxDuyetCap1(nguoiDuyetId: number, filter: LocDonYeuCauDto) {
    // TODO: Implement logic tìm đơn thuộc team của người duyệt
    // Tạm thời lấy tất cả đơn CHO_DUYET_1
    return this.layDanhSachDon({
      ...filter,
      trangThai: 'CHO_DUYET_1',
    });
  }

  async layInboxDuyetCap2(nguoiDuyetId: number, filter: LocDonYeuCauDto) {
    return this.layDanhSachDon({
      ...filter,
      trangThai: 'CHO_DUYET_2',
    });
  }

  // Duyệt hàng loạt
  async duyetBatch(ids: number[], nguoiDuyetId: number, cap: 1 | 2, ghiChu?: string) {
    const results = { success: 0, failed: 0, errors: [] as string[] };

    for (const id of ids) {
      try {
        if (cap === 1) {
          await this.duyetCap1(id, { ghiChu }, nguoiDuyetId);
        } else {
          await this.duyetCap2(id, { ghiChu }, nguoiDuyetId);
        }
        results.success++;
      } catch (error: any) {
        results.failed++;
        results.errors.push(`Đơn #${id}: ${error.message}`);
      }
    }

    return results;
  }
}
