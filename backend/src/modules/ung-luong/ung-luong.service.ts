// Service Bảng Ứng Lương - Xử lý logic nghiệp vụ
import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import {
  UngLuongCalculatorService,
  CAU_HINH_MAC_DINH,
} from './ung-luong-calculator.service';
import { AuditLogService } from '../../common/services/audit-log.service';
import {
  TaoBangUngLuongDto,
  CapNhatBangUngLuongDto,
  SinhDanhSachNVDto,
  CapNhatChiTietUngLuongDto,
  CapNhatBulkChiTietDto,
  SetTheoTiLeDto,
  SetSoTienCoDinhDto,
  GhiNhanKhauTruDto,
  MoKhoaBangUngLuongDto,
  LocBangUngLuongDto,
} from './dto';

@Injectable()
export class UngLuongService {
  private readonly logger = new Logger(UngLuongService.name);

  constructor(
    private prisma: PrismaService,
    private calculatorService: UngLuongCalculatorService,
    private auditLogService: AuditLogService,
  ) {}

  /**
   * Sinh mã bảng ứng lương tự động
   */
  private async sinhMaBangUngLuong(thangNam: string): Promise<string> {
    const count = await this.prisma.bangUngLuong.count({
      where: { thangNam },
    });
    const stt = String(count + 1).padStart(2, '0');
    return `UL-${thangNam.replace('-', '')}-${stt}`;
  }

  /**
   * Lấy danh sách bảng ứng lương
   */
  async layDanhSach(dto: LocBangUngLuongDto) {
    const { thangNam, phongBanId, trangThai, trang = 1, soLuong = 20 } = dto;

    const where: Record<string, unknown> = {};
    if (thangNam) where.thangNam = thangNam;
    if (phongBanId) where.phongBanId = phongBanId;
    if (trangThai) where.trangThai = trangThai;

    const skip = (trang - 1) * soLuong;

    const [bangUngLuongs, tongSo] = await Promise.all([
      this.prisma.bangUngLuong.findMany({
        where,
        include: {
          _count: { select: { chiTiets: true } },
        },
        orderBy: [{ thangNam: 'desc' }, { ngayTao: 'desc' }],
        skip,
        take: soLuong,
      }),
      this.prisma.bangUngLuong.count({ where }),
    ]);

    // Fetch phong ban info separately since no relation defined
    const phongBanIds = bangUngLuongs.map(b => b.phongBanId).filter((id): id is number => id !== null);
    const phongBans = await this.prisma.phongBan.findMany({
      where: { id: { in: phongBanIds } },
      select: { id: true, maPhongBan: true, tenPhongBan: true },
    });
    const phongBanMap = new Map(phongBans.map(pb => [pb.id, pb]));

    const data = bangUngLuongs.map(b => ({
      ...b,
      phongBan: b.phongBanId ? phongBanMap.get(b.phongBanId) || null : null,
    }));

    return {
      data,
      meta: {
        tongSo,
        trang,
        soLuong,
        tongTrang: Math.ceil(tongSo / soLuong),
      },
    };
  }

  /**
   * Lấy chi tiết bảng ứng lương
   */
  async layTheoId(id: number) {
    const bangUngLuong = await this.prisma.bangUngLuong.findUnique({
      where: { id },
      include: {
        chiTiets: {
          orderBy: { nhanVienId: 'asc' },
        },
      },
    });

    if (!bangUngLuong) {
      throw new NotFoundException(`Không tìm thấy bảng ứng lương với ID: ${id}`);
    }

    // Lấy thông tin nhân viên và phòng ban
    const nhanVienIds = bangUngLuong.chiTiets.map((ct) => ct.nhanVienId);
    const nhanViens = await this.prisma.nhanVien.findMany({
      where: { id: { in: nhanVienIds } },
      include: { phongBan: true },
    });
    const nhanVienMap = new Map(nhanViens.map((nv) => [nv.id, nv]));

    // Lấy nhóm nhân viên
    const nhomIds = bangUngLuong.chiTiets
      .map((ct) => ct.nhomNhanVienId)
      .filter((id): id is number => id !== null);
    const nhoms = await this.prisma.nhomNhanVien.findMany({
      where: { id: { in: nhomIds } },
    });
    const nhomMap = new Map(nhoms.map((n) => [n.id, n]));

    // Enrich chi tiết
    const chiTietsEnriched = bangUngLuong.chiTiets.map((ct) => {
      const nv = nhanVienMap.get(ct.nhanVienId);
      const nhom = ct.nhomNhanVienId ? nhomMap.get(ct.nhomNhanVienId) : null;
      return {
        ...ct,
        nhanVien: nv
          ? {
              id: nv.id,
              maNhanVien: nv.maNhanVien,
              hoTen: nv.hoTen,
            }
          : null,
        phongBan: nv?.phongBan
          ? {
              id: nv.phongBan.id,
              tenPhongBan: nv.phongBan.tenPhongBan,
            }
          : null,
        nhomNhanVien: nhom
          ? {
              id: nhom.id,
              tenNhom: nhom.tenNhom,
            }
          : null,
      };
    });

    return {
      ...bangUngLuong,
      chiTiets: chiTietsEnriched,
    };
  }

  /**
   * Tạo bảng ứng lương mới
   */
  async taoMoi(dto: TaoBangUngLuongDto, nguoiTao: string) {
    // Kiểm tra trùng
    const existing = await this.prisma.bangUngLuong.findFirst({
      where: {
        thangNam: dto.thangNam,
        tuNgay: new Date(dto.tuNgay),
        denNgay: new Date(dto.denNgay),
        phongBanId: dto.phongBanId || null,
      },
    });

    if (existing) {
      throw new ConflictException(
        'Đã tồn tại bảng ứng lương cho kỳ này',
      );
    }

    const maBangUngLuong = await this.sinhMaBangUngLuong(dto.thangNam);
    const cauHinhJson = dto.cauHinhJson
      ? JSON.stringify({ ...CAU_HINH_MAC_DINH, ...dto.cauHinhJson })
      : JSON.stringify(CAU_HINH_MAC_DINH);

    const bangUngLuong = await this.prisma.bangUngLuong.create({
      data: {
        maBangUngLuong,
        thangNam: dto.thangNam,
        tuNgay: new Date(dto.tuNgay),
        denNgay: new Date(dto.denNgay),
        ngayChiTra: dto.ngayChiTra ? new Date(dto.ngayChiTra) : null,
        phongBanId: dto.phongBanId,
        cauHinhJson,
        ghiChu: dto.ghiChu,
        nguoiTao,
      },
    });

    // Ghi audit log
    await this.auditLogService.ghiLog({
      tenDangNhap: nguoiTao,
      hanhDong: 'TAO_MOI',
      bangDuLieu: 'BangUngLuong',
      banGhiId: String(bangUngLuong.id),
      duLieuMoi: JSON.stringify(bangUngLuong),
      moTa: `Tạo bảng ứng lương ${maBangUngLuong}`,
    });

    return bangUngLuong;
  }

  /**
   * Cập nhật bảng ứng lương
   */
  async capNhat(id: number, dto: CapNhatBangUngLuongDto, nguoiCapNhat: string) {
    const bangUngLuong = await this.prisma.bangUngLuong.findUnique({
      where: { id },
    });

    if (!bangUngLuong) {
      throw new NotFoundException(`Không tìm thấy bảng ứng lương với ID: ${id}`);
    }

    if (bangUngLuong.trangThai !== 'NHAP') {
      throw new BadRequestException(
        'Chỉ có thể cập nhật bảng ứng lương ở trạng thái NHẬP',
      );
    }

    const updateData: Record<string, unknown> = {};
    if (dto.ngayChiTra) updateData.ngayChiTra = new Date(dto.ngayChiTra);
    if (dto.ghiChu !== undefined) updateData.ghiChu = dto.ghiChu;
    if (dto.cauHinhJson) {
      const currentCauHinh = bangUngLuong.cauHinhJson
        ? JSON.parse(bangUngLuong.cauHinhJson)
        : CAU_HINH_MAC_DINH;
      updateData.cauHinhJson = JSON.stringify({
        ...currentCauHinh,
        ...dto.cauHinhJson,
      });
    }

    const updated = await this.prisma.bangUngLuong.update({
      where: { id },
      data: updateData,
    });

    return updated;
  }

  /**
   * Sinh danh sách nhân viên cho bảng ứng lương
   */
  async sinhDanhSachNV(id: number, dto: SinhDanhSachNVDto, nguoiTao: string) {
    const bangUngLuong = await this.prisma.bangUngLuong.findUnique({
      where: { id },
    });

    if (!bangUngLuong) {
      throw new NotFoundException(`Không tìm thấy bảng ứng lương với ID: ${id}`);
    }

    if (bangUngLuong.trangThai !== 'NHAP') {
      throw new BadRequestException(
        'Chỉ có thể sinh danh sách khi bảng ở trạng thái NHẬP',
      );
    }

    // Xây dựng điều kiện lọc nhân viên
    const whereNhanVien: Record<string, unknown> = {
      trangThai: 'DANG_LAM',
    };

    if (dto.phongBanId) {
      whereNhanVien.phongBanId = dto.phongBanId;
    } else if (bangUngLuong.phongBanId) {
      whereNhanVien.phongBanId = bangUngLuong.phongBanId;
    }

    if (dto.nhanVienIds && dto.nhanVienIds.length > 0) {
      whereNhanVien.id = { in: dto.nhanVienIds };
    }

    // Nếu có filter theo nhóm
    let nhanVienIdsFromNhom: number[] = [];
    if (dto.nhomNhanVienId) {
      const thanhViens = await this.prisma.nhanVienThuocNhom.findMany({
        where: {
          nhomId: dto.nhomNhanVienId,
          OR: [
            { denNgay: null },
            { denNgay: { gte: bangUngLuong.denNgay } },
          ],
        },
        select: { nhanVienId: true },
      });
      nhanVienIdsFromNhom = thanhViens.map((tv) => tv.nhanVienId);
      if (nhanVienIdsFromNhom.length > 0) {
        whereNhanVien.id = { in: nhanVienIdsFromNhom };
      }
    }

    // Lấy danh sách nhân viên
    const nhanViens = await this.prisma.nhanVien.findMany({
      where: whereNhanVien,
      include: { phongBan: true },
    });

    if (nhanViens.length === 0) {
      throw new BadRequestException('Không tìm thấy nhân viên phù hợp');
    }

    // Parse cấu hình
    const cauHinh = bangUngLuong.cauHinhJson
      ? JSON.parse(bangUngLuong.cauHinhJson)
      : CAU_HINH_MAC_DINH;

    // Tính toán cho từng nhân viên
    const tuNgay = new Date(
      bangUngLuong.tuNgay.getFullYear(),
      bangUngLuong.tuNgay.getMonth(),
      1,
    ); // Đầu tháng
    const denNgay = bangUngLuong.denNgay;

    const chiTietData = [];

    for (const nv of nhanViens) {
      // Lấy nhóm nhân viên hiện tại
      const thuocNhom = await this.prisma.nhanVienThuocNhom.findFirst({
        where: {
          nhanVienId: nv.id,
          OR: [{ denNgay: null }, { denNgay: { gte: denNgay } }],
        },
        orderBy: { ngayTao: 'desc' },
      });

      // Tính toán lũy kế và điều kiện
      const { luyKe, dieuKien } = await this.calculatorService.tinhToanDayDu(
        nv.id,
        tuNgay,
        denNgay,
        cauHinh,
      );

      chiTietData.push({
        bangUngLuongId: id,
        nhanVienId: nv.id,
        phongBanId: nv.phongBanId,
        nhomNhanVienId: thuocNhom?.nhomId || null,
        tienCongLuyKe: luyKe.tienCongLuyKe,
        mucToiDaDuocUng: dieuKien.mucToiDaDuocUng,
        soNgayCong: luyKe.soNgayCong,
        soNgayNghi: luyKe.soNgayNghi,
        soNgayNghiKhongPhep: luyKe.soNgayNghiKhongPhep,
        duocPhepUng: dieuKien.duocPhepUng,
        lyDoKhongDat: dieuKien.lyDoKhongDat,
        soTienUngDeXuat: 0,
        soTienUngDuyet: 0,
      });
    }

    // Xóa chi tiết cũ nếu có
    await this.prisma.chiTietBangUngLuong.deleteMany({
      where: { bangUngLuongId: id },
    });

    // Tạo chi tiết mới
    await this.prisma.chiTietBangUngLuong.createMany({
      data: chiTietData,
    });

    // Ghi audit log
    await this.auditLogService.ghiLog({
      tenDangNhap: nguoiTao,
      hanhDong: 'CAP_NHAT',
      bangDuLieu: 'BangUngLuong',
      banGhiId: String(id),
      moTa: `Sinh danh sách ${chiTietData.length} nhân viên cho bảng ứng lương`,
    });

    return {
      message: 'Sinh danh sách thành công',
      soNhanVien: chiTietData.length,
      soDuocUng: chiTietData.filter((ct) => ct.duocPhepUng).length,
      soKhongDuocUng: chiTietData.filter((ct) => !ct.duocPhepUng).length,
    };
  }

  /**
   * Cập nhật bulk chi tiết
   */
  async capNhatBulkChiTiet(
    id: number,
    dto: CapNhatBulkChiTietDto,
    nguoiCapNhat: string,
  ) {
    const bangUngLuong = await this.prisma.bangUngLuong.findUnique({
      where: { id },
    });

    if (!bangUngLuong) {
      throw new NotFoundException(`Không tìm thấy bảng ứng lương với ID: ${id}`);
    }

    if (bangUngLuong.trangThai !== 'NHAP') {
      throw new BadRequestException(
        'Chỉ có thể cập nhật khi bảng ở trạng thái NHẬP',
      );
    }

    // Lấy tất cả chi tiết để validate
    const chiTiets = await this.prisma.chiTietBangUngLuong.findMany({
      where: { bangUngLuongId: id },
    });
    const chiTietMap = new Map(chiTiets.map((ct) => [ct.id, ct]));

    const errors: string[] = [];
    const updatePromises = [];

    for (const item of dto.chiTiets) {
      const chiTiet = chiTietMap.get(item.id);
      if (!chiTiet) {
        errors.push(`Chi tiết ID ${item.id} không tồn tại`);
        continue;
      }

      // Validate số tiền không vượt mức tối đa
      const soTienDuyet = item.soTienUngDuyet ?? chiTiet.soTienUngDuyet;
      if (Number(soTienDuyet) > Number(chiTiet.mucToiDaDuocUng)) {
        errors.push(
          `NV ID ${chiTiet.nhanVienId}: Số tiền ${soTienDuyet} vượt mức tối đa ${chiTiet.mucToiDaDuocUng}`,
        );
        continue;
      }

      // Không cho ứng nếu không đủ điều kiện
      if (!chiTiet.duocPhepUng && Number(soTienDuyet) > 0) {
        errors.push(
          `NV ID ${chiTiet.nhanVienId}: Không đủ điều kiện ứng lương`,
        );
        continue;
      }

      const updateData: Record<string, unknown> = {};
      if (item.soTienUngDeXuat !== undefined) {
        updateData.soTienUngDeXuat = item.soTienUngDeXuat;
      }
      if (item.soTienUngDuyet !== undefined) {
        updateData.soTienUngDuyet = item.soTienUngDuyet;
      }
      if (item.ghiChu !== undefined) {
        updateData.ghiChu = item.ghiChu;
      }

      if (Object.keys(updateData).length > 0) {
        updatePromises.push(
          this.prisma.chiTietBangUngLuong.update({
            where: { id: item.id },
            data: updateData,
          }),
        );
      }
    }

    await Promise.all(updatePromises);

    // Cập nhật tổng
    await this.capNhatTong(id);

    return {
      message: 'Cập nhật thành công',
      soCapNhat: updatePromises.length,
      errors,
    };
  }

  /**
   * Set theo % mức tối đa
   */
  async setTheoTiLe(id: number, dto: SetTheoTiLeDto, nguoiCapNhat: string) {
    const bangUngLuong = await this.prisma.bangUngLuong.findUnique({
      where: { id },
    });

    if (!bangUngLuong) {
      throw new NotFoundException(`Không tìm thấy bảng ứng lương với ID: ${id}`);
    }

    if (bangUngLuong.trangThai !== 'NHAP') {
      throw new BadRequestException(
        'Chỉ có thể cập nhật khi bảng ở trạng thái NHẬP',
      );
    }

    const whereChiTiet: Record<string, unknown> = {
      bangUngLuongId: id,
      duocPhepUng: true,
    };

    if (dto.nhanVienIds && dto.nhanVienIds.length > 0) {
      whereChiTiet.nhanVienId = { in: dto.nhanVienIds };
    }

    const chiTiets = await this.prisma.chiTietBangUngLuong.findMany({
      where: whereChiTiet,
    });

    const tiLe = dto.tiLe / 100;
    const lamTron = dto.lamTron || 10000;

    for (const ct of chiTiets) {
      let soTien = Math.floor(Number(ct.mucToiDaDuocUng) * tiLe);
      soTien = Math.floor(soTien / lamTron) * lamTron;

      await this.prisma.chiTietBangUngLuong.update({
        where: { id: ct.id },
        data: { soTienUngDuyet: soTien },
      });
    }

    await this.capNhatTong(id);

    return {
      message: `Đã set ${chiTiets.length} nhân viên theo ${dto.tiLe}% mức tối đa`,
      soNhanVien: chiTiets.length,
    };
  }

  /**
   * Set số tiền cố định
   */
  async setSoTienCoDinh(
    id: number,
    dto: SetSoTienCoDinhDto,
    nguoiCapNhat: string,
  ) {
    const bangUngLuong = await this.prisma.bangUngLuong.findUnique({
      where: { id },
    });

    if (!bangUngLuong) {
      throw new NotFoundException(`Không tìm thấy bảng ứng lương với ID: ${id}`);
    }

    if (bangUngLuong.trangThai !== 'NHAP') {
      throw new BadRequestException(
        'Chỉ có thể cập nhật khi bảng ở trạng thái NHẬP',
      );
    }

    const whereChiTiet: Record<string, unknown> = {
      bangUngLuongId: id,
      duocPhepUng: true,
      mucToiDaDuocUng: { gte: dto.soTien },
    };

    if (dto.nhanVienIds && dto.nhanVienIds.length > 0) {
      whereChiTiet.nhanVienId = { in: dto.nhanVienIds };
    }

    const result = await this.prisma.chiTietBangUngLuong.updateMany({
      where: whereChiTiet,
      data: { soTienUngDuyet: dto.soTien },
    });

    await this.capNhatTong(id);

    return {
      message: `Đã set ${result.count} nhân viên với số tiền ${dto.soTien}`,
      soNhanVien: result.count,
    };
  }

  /**
   * Cập nhật tổng số tiền
   */
  private async capNhatTong(id: number) {
    const chiTiets = await this.prisma.chiTietBangUngLuong.findMany({
      where: { bangUngLuongId: id },
    });

    const tongSoTienUng = chiTiets.reduce(
      (sum, ct) => sum + Number(ct.soTienUngDuyet),
      0,
    );
    const soNhanVienUng = chiTiets.filter(
      (ct) => Number(ct.soTienUngDuyet) > 0,
    ).length;

    await this.prisma.bangUngLuong.update({
      where: { id },
      data: { tongSoTienUng, soNhanVienUng },
    });
  }

  /**
   * Chốt bảng ứng lương
   */
  async chotBang(id: number, nguoiChot: string) {
    const bangUngLuong = await this.prisma.bangUngLuong.findUnique({
      where: { id },
      include: { chiTiets: true },
    });

    if (!bangUngLuong) {
      throw new NotFoundException(`Không tìm thấy bảng ứng lương với ID: ${id}`);
    }

    if (bangUngLuong.trangThai !== 'NHAP') {
      throw new BadRequestException('Bảng ứng lương không ở trạng thái NHẬP');
    }

    if (bangUngLuong.chiTiets.length === 0) {
      throw new BadRequestException('Bảng ứng lương chưa có chi tiết');
    }

    const ngayChot = new Date();

    // Cập nhật tổng trước khi chốt
    await this.capNhatTong(id);

    // Lấy lại bảng ứng lương với tổng đã cập nhật
    const bangUngLuongUpdated = await this.prisma.bangUngLuong.findUnique({
      where: { id },
      include: { chiTiets: true },
    });

    // Tạo snapshot header
    const snapshotHeader = await this.prisma.snapshotBangUngLuong.create({
      data: {
        bangUngLuongId: id,
        maBangUngLuong: bangUngLuongUpdated!.maBangUngLuong,
        thangNam: bangUngLuongUpdated!.thangNam,
        tuNgay: bangUngLuongUpdated!.tuNgay,
        denNgay: bangUngLuongUpdated!.denNgay,
        cauHinhJson: bangUngLuongUpdated!.cauHinhJson,
        tongSoTienUng: bangUngLuongUpdated!.tongSoTienUng,
        soNhanVienUng: bangUngLuongUpdated!.soNhanVienUng,
        ngayChot,
        nguoiChot,
      },
    });

    // Lấy thông tin nhân viên để tạo snapshot chi tiết
    const nhanVienIds = bangUngLuongUpdated!.chiTiets.map((ct) => ct.nhanVienId);
    const nhanViens = await this.prisma.nhanVien.findMany({
      where: { id: { in: nhanVienIds } },
      include: { phongBan: true },
    });
    const nhanVienMap = new Map(nhanViens.map((nv) => [nv.id, nv]));

    // Lấy nhóm nhân viên
    const nhomIds = bangUngLuongUpdated!.chiTiets
      .map((ct) => ct.nhomNhanVienId)
      .filter((id): id is number => id !== null);
    const nhoms = await this.prisma.nhomNhanVien.findMany({
      where: { id: { in: nhomIds } },
    });
    const nhomMap = new Map(nhoms.map((n) => [n.id, n]));

    // Tạo snapshot chi tiết
    const snapshotChiTiets = bangUngLuongUpdated!.chiTiets.map((ct) => {
      const nv = nhanVienMap.get(ct.nhanVienId);
      const nhom = ct.nhomNhanVienId ? nhomMap.get(ct.nhomNhanVienId) : null;
      return {
        snapshotId: snapshotHeader.id,
        nhanVienId: ct.nhanVienId,
        maNhanVien: nv?.maNhanVien || '',
        hoTen: nv?.hoTen || '',
        phongBan: nv?.phongBan?.tenPhongBan || '',
        nhomNhanVien: nhom?.tenNhom || null,
        tienCongLuyKe: ct.tienCongLuyKe,
        mucToiDaDuocUng: ct.mucToiDaDuocUng,
        soNgayCong: ct.soNgayCong,
        soNgayNghi: ct.soNgayNghi,
        soNgayNghiKhongPhep: ct.soNgayNghiKhongPhep,
        duocPhepUng: ct.duocPhepUng,
        lyDoKhongDat: ct.lyDoKhongDat,
        soTienUngDeXuat: ct.soTienUngDeXuat,
        soTienUngDuyet: ct.soTienUngDuyet,
        ghiChu: ct.ghiChu,
      };
    });

    await this.prisma.snapshotChiTietBangUngLuong.createMany({
      data: snapshotChiTiets,
    });

    // Cập nhật trạng thái và lock chi tiết
    await this.prisma.bangUngLuong.update({
      where: { id },
      data: {
        trangThai: 'DA_CHOT',
        ngayChot,
        nguoiChot,
      },
    });

    await this.prisma.chiTietBangUngLuong.updateMany({
      where: { bangUngLuongId: id },
      data: { lockedBySnapshot: true },
    });

    // Ghi audit log
    await this.auditLogService.ghiLog({
      tenDangNhap: nguoiChot,
      hanhDong: 'CHOT_LUONG',
      bangDuLieu: 'BangUngLuong',
      banGhiId: String(id),
      moTa: `Chốt bảng ứng lương ${bangUngLuongUpdated!.maBangUngLuong}`,
    });

    return {
      message: 'Chốt bảng ứng lương thành công',
      id,
      ngayChot,
      snapshotId: snapshotHeader.id,
    };
  }

  /**
   * Khóa bảng ứng lương
   */
  async khoaBang(id: number, nguoiKhoa: string) {
    const bangUngLuong = await this.prisma.bangUngLuong.findUnique({
      where: { id },
    });

    if (!bangUngLuong) {
      throw new NotFoundException(`Không tìm thấy bảng ứng lương với ID: ${id}`);
    }

    if (bangUngLuong.trangThai !== 'DA_CHOT') {
      throw new BadRequestException(
        'Chỉ có thể khóa bảng ứng lương đã chốt',
      );
    }

    await this.prisma.bangUngLuong.update({
      where: { id },
      data: {
        trangThai: 'DA_KHOA',
        nguoiKhoa,
        ngayKhoa: new Date(),
      },
    });

    // Ghi audit log
    await this.auditLogService.ghiLog({
      tenDangNhap: nguoiKhoa,
      hanhDong: 'CHOT_LUONG',
      bangDuLieu: 'BangUngLuong',
      banGhiId: String(id),
      moTa: `Khóa bảng ứng lương ${bangUngLuong.maBangUngLuong}`,
    });

    return { message: 'Khóa bảng ứng lương thành công' };
  }

  /**
   * Mở khóa bảng ứng lương (admin only)
   */
  async moKhoaBang(id: number, dto: MoKhoaBangUngLuongDto, nguoiMoKhoa: string) {
    const bangUngLuong = await this.prisma.bangUngLuong.findUnique({
      where: { id },
    });

    if (!bangUngLuong) {
      throw new NotFoundException(`Không tìm thấy bảng ứng lương với ID: ${id}`);
    }

    if (bangUngLuong.trangThai === 'NHAP') {
      throw new BadRequestException('Bảng ứng lương đang ở trạng thái NHẬP');
    }

    await this.prisma.bangUngLuong.update({
      where: { id },
      data: {
        trangThai: 'NHAP',
        nguoiChot: null,
        ngayChot: null,
        nguoiKhoa: null,
        ngayKhoa: null,
      },
    });

    await this.prisma.chiTietBangUngLuong.updateMany({
      where: { bangUngLuongId: id },
      data: { lockedBySnapshot: false },
    });

    // Ghi audit log (bắt buộc có lý do)
    await this.auditLogService.ghiLog({
      tenDangNhap: nguoiMoKhoa,
      hanhDong: 'MO_KHOA',
      bangDuLieu: 'BangUngLuong',
      banGhiId: String(id),
      moTa: `Mở khóa bảng ứng lương ${bangUngLuong.maBangUngLuong}. Lý do: ${dto.lyDo}`,
    });

    return { message: 'Mở khóa bảng ứng lương thành công' };
  }

  /**
   * Ghi nhận khấu trừ vào bảng lương
   */
  async ghiNhanKhauTru(
    id: number,
    dto: GhiNhanKhauTruDto,
    nguoiThucHien: string,
  ) {
    const bangUngLuong = await this.prisma.bangUngLuong.findUnique({
      where: { id },
      include: { chiTiets: true },
    });

    if (!bangUngLuong) {
      throw new NotFoundException(`Không tìm thấy bảng ứng lương với ID: ${id}`);
    }

    if (bangUngLuong.trangThai === 'NHAP') {
      throw new BadRequestException(
        'Bảng ứng lương phải được chốt trước khi ghi nhận khấu trừ',
      );
    }

    // Kiểm tra idempotent
    if (bangUngLuong.daGhiNhanKhauTru) {
      return {
        message: 'Bảng ứng lương đã được ghi nhận khấu trừ trước đó',
        phieuDCId: bangUngLuong.refPhieuDCId,
      };
    }

    // Kiểm tra bảng lương áp dụng
    const bangLuong = await this.prisma.bangLuong.findUnique({
      where: { id: dto.bangLuongApDungId },
    });

    if (!bangLuong) {
      throw new NotFoundException(
        `Không tìm thấy bảng lương với ID: ${dto.bangLuongApDungId}`,
      );
    }

    // Lấy hoặc tạo khoản lương khấu trừ ứng lương
    let khoanKhauTru = await this.prisma.khoanLuong.findFirst({
      where: { maKhoan: 'KHAU_TRU_UNG_LUONG' },
    });

    if (!khoanKhauTru) {
      khoanKhauTru = await this.prisma.khoanLuong.create({
        data: {
          maKhoan: 'KHAU_TRU_UNG_LUONG',
          tenKhoan: 'Khấu trừ ứng lương',
          loai: 'KHAU_TRU',
          cachTinh: 'LUONG_THANG_CO_DINH',
          chiuThue: false,
          moTa: 'Khoản khấu trừ từ ứng lương giữa tháng',
          thuTu: 900,
        },
      });
    }

    // Tạo phiếu điều chỉnh cho từng nhân viên có ứng lương
    const chiTietsCoUng = bangUngLuong.chiTiets.filter(
      (ct) => Number(ct.soTienUngDuyet) > 0,
    );

    const phieuDCIds: number[] = [];

    for (const ct of chiTietsCoUng) {
      // Tạo mã phiếu
      const count = await this.prisma.phieuDieuChinh.count();
      const maPhieu = `DC-UL-${String(count + 1).padStart(5, '0')}`;

      const phieuDC = await this.prisma.phieuDieuChinh.create({
        data: {
          maPhieu,
          bangLuongId: dto.bangLuongApDungId,
          nhanVienId: ct.nhanVienId,
          loaiDieuChinh: 'GIAM',
          lyDo: `Khấu trừ ứng lương kỳ ${bangUngLuong.thangNam} (${bangUngLuong.maBangUngLuong})`,
          ghiChu: dto.lyDo || null,
          trangThai: 'DA_DUYET',
          nguoiTao: nguoiThucHien,
          nguoiDuyet: nguoiThucHien,
          ngayDuyet: new Date(),
          chiTiets: {
            create: {
              khoanLuongId: khoanKhauTru.id,
              soTienCu: 0,
              soTienMoi: Number(ct.soTienUngDuyet),
              chenhLech: Number(ct.soTienUngDuyet),
              ghiChu: `Từ bảng ứng lương ${bangUngLuong.maBangUngLuong}`,
            },
          },
        },
      });

      phieuDCIds.push(phieuDC.id);
    }

    // Cập nhật trạng thái đã ghi nhận
    await this.prisma.bangUngLuong.update({
      where: { id },
      data: {
        daGhiNhanKhauTru: true,
        refPhieuDCId: phieuDCIds[0] || null,
      },
    });

    // Ghi audit log
    await this.auditLogService.ghiLog({
      tenDangNhap: nguoiThucHien,
      hanhDong: 'CAP_NHAT',
      bangDuLieu: 'BangUngLuong',
      banGhiId: String(id),
      moTa: `Ghi nhận khấu trừ ${chiTietsCoUng.length} nhân viên vào bảng lương ${bangLuong.id}`,
    });

    return {
      message: `Ghi nhận khấu trừ thành công cho ${chiTietsCoUng.length} nhân viên`,
      soPhieuDC: phieuDCIds.length,
      phieuDCIds,
    };
  }

  /**
   * Lấy snapshot để xem trace
   */
  async laySnapshot(id: number) {
    const snapshots = await this.prisma.snapshotBangUngLuong.findMany({
      where: { bangUngLuongId: id },
      include: { chiTiets: true },
      orderBy: { ngayChot: 'desc' },
    });

    if (snapshots.length === 0) {
      throw new NotFoundException(`Không tìm thấy snapshot cho bảng ứng lương ID: ${id}`);
    }

    return snapshots;
  }

  /**
   * Xóa bảng ứng lương
   */
  async xoa(id: number, nguoiXoa: string) {
    const bangUngLuong = await this.prisma.bangUngLuong.findUnique({
      where: { id },
    });

    if (!bangUngLuong) {
      throw new NotFoundException(`Không tìm thấy bảng ứng lương với ID: ${id}`);
    }

    if (bangUngLuong.trangThai !== 'NHAP') {
      throw new BadRequestException(
        'Chỉ có thể xóa bảng ứng lương ở trạng thái NHẬP',
      );
    }

    await this.prisma.bangUngLuong.delete({
      where: { id },
    });

    await this.auditLogService.ghiLog({
      tenDangNhap: nguoiXoa,
      hanhDong: 'XOA',
      bangDuLieu: 'BangUngLuong',
      banGhiId: String(id),
      duLieuCu: JSON.stringify(bangUngLuong),
      moTa: `Xóa bảng ứng lương ${bangUngLuong.maBangUngLuong}`,
    });

    return { message: 'Xóa bảng ứng lương thành công' };
  }
}
