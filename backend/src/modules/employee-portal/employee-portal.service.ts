// Service Employee Portal - Sprint 5
// API cho nhân viên tự xem thông tin cá nhân, lịch làm, chấm công, phiếu lương
import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import {
  LichLamViecQueryDto,
  ChamCongQueryDto,
  PhieuLuongQueryDto,
  DashboardResponse,
  LichLamViecItem,
  ChamCongItem,
  PhieuLuongItem,
  SoDuPhepResponse,
} from './employee-portal.dto';

@Injectable()
export class EmployeePortalService {
  constructor(private prisma: PrismaService) {}

  /**
   * Lấy thông tin nhân viên từ userId
   */
  private async getNhanVienFromUser(userId: number) {
    const user = await this.prisma.nguoiDung.findUnique({
      where: { id: userId },
    });

    if (!user?.nhanVienId) {
      throw new BadRequestException('Tài khoản chưa được liên kết với nhân viên');
    }

    const nhanVien = await this.prisma.nhanVien.findUnique({
      where: { id: user.nhanVienId },
      include: {
        phongBan: { select: { id: true, tenPhongBan: true } },
      },
    });

    if (!nhanVien) {
      throw new BadRequestException('Không tìm thấy thông tin nhân viên');
    }

    return nhanVien;
  }

  /**
   * Dashboard - Thông tin tổng quan cho nhân viên
   */
  async getDashboard(userId: number): Promise<DashboardResponse> {
    const nhanVien = await this.getNhanVienFromUser(userId);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Lấy ca hôm nay từ lịch phân ca
    const lichPhanCa = await this.prisma.lichPhanCaChiTiet.findFirst({
      where: {
        nhanVienId: nhanVien.id,
        ngay: today,
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
            mauHienThi: true,
          },
        },
      },
    });

    // Lấy chấm công hôm nay
    const chamCong = await this.prisma.chiTietChamCong.findUnique({
      where: {
        nhanVienId_ngay: {
          nhanVienId: nhanVien.id,
          ngay: today,
        },
      },
    });

    // Đếm đơn chờ duyệt
    const soDonChoDuyet = await this.prisma.donYeuCau.count({
      where: {
        nhanVienId: nhanVien.id,
        trangThai: { in: ['CHO_DUYET_1', 'CHO_DUYET_2'] },
      },
    });

    // Tính số ngày phép còn lại (đơn giản)
    const donNghiDaDuyet = await this.prisma.donNghiPhep.aggregate({
      where: {
        nhanVienId: nhanVien.id,
        trangThai: 'DA_DUYET',
        tuNgay: { gte: new Date(today.getFullYear(), 0, 1) },
      },
      _sum: { soNgayNghi: true },
    });
    const nghiPhepDaDung = Number(donNghiDaDuyet._sum.soNgayNghi || 0);
    const soNgayPhepConLai = Math.max(0, 12 - nghiPhepDaDung);

    // Đếm ngày công tháng này
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    const soNgayCongThang = await this.prisma.chiTietChamCong.count({
      where: {
        nhanVienId: nhanVien.id,
        ngay: { gte: startOfMonth, lte: endOfMonth },
        trangThai: 'DI_LAM',
      },
    });

    // Xác định trạng thái chấm công
    let chamCongStatus: 'CHUA_VAO' | 'DA_VAO' | 'DA_RA' = 'CHUA_VAO';
    if (chamCong?.gioVao && chamCong?.gioRa) {
      chamCongStatus = 'DA_RA';
    } else if (chamCong?.gioVao) {
      chamCongStatus = 'DA_VAO';
    }

    return {
      nhanVien: {
        id: nhanVien.id,
        maNhanVien: nhanVien.maNhanVien,
        hoTen: nhanVien.hoTen,
        phongBan: nhanVien.phongBan?.tenPhongBan || '',
        chucVu: nhanVien.chucVu || undefined,
      },
      caHomNay: lichPhanCa?.caLamViec
        ? {
            id: lichPhanCa.caLamViec.id,
            maCa: lichPhanCa.caLamViec.maCa,
            tenCa: lichPhanCa.caLamViec.tenCa,
            gioVao: lichPhanCa.caLamViec.gioVao,
            gioRa: lichPhanCa.caLamViec.gioRa,
            mauHienThi: lichPhanCa.caLamViec.mauHienThi || undefined,
          }
        : undefined,
      chamCongHomNay: {
        gioVao: chamCong?.gioVao?.toISOString(),
        gioRa: chamCong?.gioRa?.toISOString(),
        trangThai: chamCongStatus,
      },
      thongKe: {
        soDonChoDuyet,
        soNgayPhepConLai,
        soNgayCongThang,
      },
      thongBaoMoi: 0,
    };
  }

  /**
   * Lịch làm việc theo tuần/tháng
   */
  async getLichLamViec(
    userId: number,
    query: LichLamViecQueryDto,
  ): Promise<LichLamViecItem[]> {
    const nhanVien = await this.getNhanVienFromUser(userId);

    // Mặc định 7 ngày từ hôm nay
    const now = new Date();
    const tuNgay = query.tuNgay ? new Date(query.tuNgay) : new Date(now.setHours(0, 0, 0, 0));
    const denNgay = query.denNgay
      ? new Date(query.denNgay)
      : new Date(tuNgay.getTime() + 6 * 24 * 60 * 60 * 1000);

    // Lấy lịch phân ca
    const lichPhanCa = await this.prisma.lichPhanCaChiTiet.findMany({
      where: {
        nhanVienId: nhanVien.id,
        ngay: { gte: tuNgay, lte: denNgay },
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
            mauHienThi: true,
          },
        },
      },
      orderBy: { ngay: 'asc' },
    });

    // Lấy đơn nghỉ phép trong khoảng thời gian
    const donNghiPheps = await this.prisma.donNghiPhep.findMany({
      where: {
        nhanVienId: nhanVien.id,
        OR: [
          { tuNgay: { lte: denNgay }, denNgay: { gte: tuNgay } },
        ],
        trangThai: { in: ['GUI_DUYET', 'DA_DUYET'] },
      },
      include: {
        loaiNghi: { select: { tenLoaiNghi: true } },
      },
    });

    // Tạo map theo ngày
    const result: LichLamViecItem[] = [];
    for (let d = new Date(tuNgay); d <= denNgay; d.setDate(d.getDate() + 1)) {
      const currentDate = new Date(d);
      const item: LichLamViecItem = {
        ngay: currentDate.toISOString().split('T')[0],
        thuTrongTuan: currentDate.getDay(),
      };

      // Tìm ca
      const ca = lichPhanCa.find(
        (l) => l.ngay.toISOString().split('T')[0] === item.ngay,
      );
      if (ca?.caLamViec) {
        item.ca = {
          id: ca.caLamViec.id,
          maCa: ca.caLamViec.maCa,
          tenCa: ca.caLamViec.tenCa,
          gioVao: ca.caLamViec.gioVao,
          gioRa: ca.caLamViec.gioRa,
          mauHienThi: ca.caLamViec.mauHienThi || undefined,
        };
      }

      // Tìm nghỉ phép
      const nghi = donNghiPheps.find(
        (n) =>
          new Date(n.tuNgay) <= currentDate &&
          new Date(n.denNgay) >= currentDate,
      );
      if (nghi) {
        item.nghiPhep = {
          loaiNghi: nghi.loaiNghi?.tenLoaiNghi || 'Nghỉ phép',
          trangThai: nghi.trangThai,
        };
      }

      result.push(item);
    }

    return result;
  }

  /**
   * Lịch sử chấm công theo tháng
   */
  async getChamCong(
    userId: number,
    query: ChamCongQueryDto,
  ): Promise<ChamCongItem[]> {
    const nhanVien = await this.getNhanVienFromUser(userId);

    const now = new Date();
    const thang = query.thang || now.getMonth() + 1;
    const nam = query.nam || now.getFullYear();

    const startOfMonth = new Date(nam, thang - 1, 1);
    const endOfMonth = new Date(nam, thang, 0);

    const chamCongs = await this.prisma.chiTietChamCong.findMany({
      where: {
        nhanVienId: nhanVien.id,
        ngay: { gte: startOfMonth, lte: endOfMonth },
      },
      include: {
        caLamViec: { select: { maCa: true, tenCa: true } },
      },
      orderBy: { ngay: 'asc' },
    });

    return chamCongs.map((cc) => ({
      ngay: cc.ngay.toISOString().split('T')[0],
      gioVaoThucTe: cc.gioVao?.toISOString() || undefined,
      gioRaThucTe: cc.gioRa?.toISOString() || undefined,
      gioVaoDuKien: cc.gioVaoDuKien?.toISOString() || undefined,
      gioRaDuKien: cc.gioRaDuKien?.toISOString() || undefined,
      trangThai: cc.trangThai,
      phutDiTre: cc.phutDiTre ?? undefined,
      phutVeSom: cc.phutVeSom ?? undefined,
      soGioLam: Number(cc.soGioLam),
      ca: cc.caLamViec || undefined,
    }));
  }

  /**
   * Danh sách phiếu lương
   */
  async getPhieuLuong(
    userId: number,
    query: PhieuLuongQueryDto,
  ): Promise<{ data: PhieuLuongItem[]; total: number }> {
    const nhanVien = await this.getNhanVienFromUser(userId);

    const page = query.page || 1;
    const limit = query.limit || 12;
    const skip = (page - 1) * limit;

    const whereBase: any = {
      nhanVienId: nhanVien.id,
    };

    if (query.nam) {
      whereBase.bangLuong = { nam: query.nam };
    }

    const [chiTiets, total] = await Promise.all([
      this.prisma.chiTietBangLuong.findMany({
        where: whereBase,
        include: {
          bangLuong: {
            select: {
              id: true,
              thang: true,
              nam: true,
              trangThai: true,
              ngayChot: true,
            },
          },
        },
        orderBy: { bangLuong: { ngayTao: 'desc' } },
        skip,
        take: limit,
      }),
      this.prisma.chiTietBangLuong.count({ where: whereBase }),
    ]);

    // Tính tổng từ chi tiết bảng lương
    const data: PhieuLuongItem[] = [];
    
    // Nhóm chi tiết theo bangLuongId và nhanVienId
    const groupedByBangLuong = new Map<number, typeof chiTiets>();
    for (const ct of chiTiets) {
      const key = ct.bangLuongId;
      if (!groupedByBangLuong.has(key)) {
        groupedByBangLuong.set(key, []);
      }
      groupedByBangLuong.get(key)!.push(ct);
    }

    for (const [bangLuongId, items] of groupedByBangLuong.entries()) {
      const firstItem = items[0];
      let tongThuNhap = 0;
      let tongKhauTru = 0;

      // Lấy khoản lương để check loại
      for (const ct of items) {
        const khoanLuong = await this.prisma.khoanLuong.findUnique({
          where: { id: ct.khoanLuongId },
          select: { loai: true },
        });

        const soTien = Number(ct.soTien);
        if (khoanLuong?.loai === 'KHAU_TRU') {
          tongKhauTru += soTien;
        } else {
          tongThuNhap += soTien;
        }
      }

      data.push({
        id: firstItem.id,
        bangLuongId: firstItem.bangLuongId,
        kyLuong: `Tháng ${firstItem.bangLuong.thang}/${firstItem.bangLuong.nam}`,
        thang: firstItem.bangLuong.thang,
        nam: firstItem.bangLuong.nam,
        tongThuNhap,
        tongKhauTru,
        thucLinh: tongThuNhap - tongKhauTru,
        trangThai: firstItem.bangLuong.trangThai,
        ngayChot: firstItem.bangLuong.ngayChot?.toISOString() || undefined,
      });
    }

    return { data, total };
  }

  /**
   * Số dư phép năm
   */
  async getSoDuPhep(userId: number): Promise<SoDuPhepResponse> {
    const nhanVien = await this.getNhanVienFromUser(userId);
    const nam = new Date().getFullYear();

    // Lấy tất cả đơn nghỉ đã duyệt trong năm
    const donNghiPheps = await this.prisma.donNghiPhep.findMany({
      where: {
        nhanVienId: nhanVien.id,
        trangThai: 'DA_DUYET',
        tuNgay: { gte: new Date(nam, 0, 1), lte: new Date(nam, 11, 31) },
      },
      include: {
        loaiNghi: { select: { maLoaiNghi: true, tenLoaiNghi: true } },
      },
    });

    // Nhóm theo loại nghỉ
    const grouped = new Map<string, { tenLoai: string; soNgay: number }>();
    for (const nghi of donNghiPheps) {
      const ma = nghi.loaiNghi?.maLoaiNghi || 'KHAC';
      const ten = nghi.loaiNghi?.tenLoaiNghi || 'Khác';
      const soNgay = Number(nghi.soNgayNghi);
      const existing = grouped.get(ma);
      if (existing) {
        existing.soNgay += soNgay;
      } else {
        grouped.set(ma, { tenLoai: ten, soNgay });
      }
    }

    const tongDaSuDung = Array.from(grouped.values()).reduce(
      (sum, g) => sum + g.soNgay,
      0,
    );

    return {
      phepNam: {
        tongSo: 12,
        daSuDung: tongDaSuDung,
        conLai: Math.max(0, 12 - tongDaSuDung),
      },
      danhSachLoaiNghi: Array.from(grouped.entries()).map(([ma, v]) => ({
        maLoai: ma,
        tenLoai: v.tenLoai,
        soNgayDaSuDung: v.soNgay,
      })),
    };
  }

  /**
   * Hồ sơ nhân viên (ẩn thông tin nhạy cảm)
   */
  async getHoSo(userId: number) {
    const nhanVien = await this.getNhanVienFromUser(userId);

    const full = await this.prisma.nhanVien.findUnique({
      where: { id: nhanVien.id },
      include: {
        phongBan: { select: { id: true, tenPhongBan: true } },
        nganHangs: {
          where: { laMacDinh: true },
          take: 1,
        },
      },
    });

    if (!full) {
      throw new BadRequestException('Không tìm thấy thông tin nhân viên');
    }

    const nganHangHienTai = full.nganHangs?.[0];

    return {
      id: full.id,
      maNhanVien: full.maNhanVien,
      hoTen: full.hoTen,
      email: full.email,
      soDienThoai: full.soDienThoai,
      ngaySinh: full.ngaySinh?.toISOString() || null,
      gioiTinh: full.gioiTinh,
      diaChi: full.diaChi,
      ngayVaoLam: full.ngayVaoLam?.toISOString() || null,
      chucVu: full.chucVu,
      phongBan: full.phongBan,
      nganHang: nganHangHienTai 
        ? { id: 0, tenNganHang: nganHangHienTai.tenNganHang }
        : null,
      soTaiKhoan: nganHangHienTai?.soTaiKhoan
        ? `***${nganHangHienTai.soTaiKhoan.slice(-4)}`
        : null,
      trangThai: full.trangThai,
    };
  }

  /**
   * Check-in - Nhân viên chấm công vào
   */
  async checkIn(userId: number) {
    const nhanVien = await this.getNhanVienFromUser(userId);
    const now = new Date();
    const today = new Date(now);
    today.setHours(0, 0, 0, 0);

    // Lấy ca hôm nay để tính đi trễ
    const lichPhanCa = await this.prisma.lichPhanCaChiTiet.findFirst({
      where: {
        nhanVienId: nhanVien.id,
        ngay: today,
        lichPhanCa: { trangThai: 'DA_CONG_BO' },
      },
      include: { caLamViec: true },
    });

    // Tính phút đi trễ nếu có ca
    let phutDiTre: number | null = null;
    let gioVaoDuKien: Date | null = null;
    let gioRaDuKien: Date | null = null;

    if (lichPhanCa?.caLamViec) {
      const ca = lichPhanCa.caLamViec;
      // Parse gioVao từ ca (có thể là DateTime)
      if (ca.gioVao) {
        gioVaoDuKien = new Date(today);
        const caGioVao = new Date(ca.gioVao);
        gioVaoDuKien.setHours(caGioVao.getHours(), caGioVao.getMinutes(), 0, 0);

        const diffMs = now.getTime() - gioVaoDuKien.getTime();
        phutDiTre = Math.max(0, Math.floor(diffMs / 60000));
      }
      if (ca.gioRa) {
        gioRaDuKien = new Date(today);
        const caGioRa = new Date(ca.gioRa);
        gioRaDuKien.setHours(caGioRa.getHours(), caGioRa.getMinutes(), 0, 0);
      }
    }

    // Kiểm tra đã check-in chưa
    const existing = await this.prisma.chiTietChamCong.findUnique({
      where: {
        nhanVienId_ngay: {
          nhanVienId: nhanVien.id,
          ngay: today,
        },
      },
    });

    if (existing?.gioVao) {
      throw new BadRequestException('Bạn đã check-in hôm nay rồi');
    }

    // Upsert record chấm công
    const chamCong = await this.prisma.chiTietChamCong.upsert({
      where: {
        nhanVienId_ngay: {
          nhanVienId: nhanVien.id,
          ngay: today,
        },
      },
      update: {
        gioVao: now,
        phutDiTre,
        gioVaoDuKien,
        gioRaDuKien,
        caLamViecId: lichPhanCa?.caLamViecId || null,
      },
      create: {
        nhanVienId: nhanVien.id,
        ngay: today,
        gioVao: now,
        phutDiTre,
        gioVaoDuKien,
        gioRaDuKien,
        caLamViecId: lichPhanCa?.caLamViecId || null,
        loaiNgay: this.getLoaiNgay(today),
        trangThai: 'DI_LAM',
      },
    });

    return {
      success: true,
      message: 'Check-in thành công',
      data: {
        gioVao: now.toISOString(),
        phutDiTre,
        chamCongId: chamCong.id,
      },
    };
  }

  /**
   * Check-out - Nhân viên chấm công ra
   */
  async checkOut(userId: number) {
    const nhanVien = await this.getNhanVienFromUser(userId);
    const now = new Date();
    const today = new Date(now);
    today.setHours(0, 0, 0, 0);

    // Kiểm tra đã check-in chưa
    const existing = await this.prisma.chiTietChamCong.findUnique({
      where: {
        nhanVienId_ngay: {
          nhanVienId: nhanVien.id,
          ngay: today,
        },
      },
    });

    if (!existing) {
      throw new BadRequestException('Bạn chưa check-in hôm nay');
    }

    if (existing.gioRa) {
      throw new BadRequestException('Bạn đã check-out hôm nay rồi');
    }

    if (!existing.gioVao) {
      throw new BadRequestException('Bạn chưa check-in, không thể check-out');
    }

    // Tính phút về sớm nếu có ca
    let phutVeSom: number | null = null;
    if (existing.gioRaDuKien) {
      const diffMs = existing.gioRaDuKien.getTime() - now.getTime();
      phutVeSom = Math.max(0, Math.floor(diffMs / 60000));
    }

    // Tính số giờ làm
    const gioVao = new Date(existing.gioVao);
    const diffHours = (now.getTime() - gioVao.getTime()) / (1000 * 60 * 60);
    const soGioLam = Math.max(0, Math.round(diffHours * 100) / 100);

    // Update record
    const chamCong = await this.prisma.chiTietChamCong.update({
      where: { id: existing.id },
      data: {
        gioRa: now,
        phutVeSom,
        soGioLam,
      },
    });

    return {
      success: true,
      message: 'Check-out thành công',
      data: {
        gioVao: existing.gioVao?.toISOString(),
        gioRa: now.toISOString(),
        soGioLam,
        phutVeSom,
        chamCongId: chamCong.id,
      },
    };
  }

  /**
   * Helper: Xác định loại ngày
   */
  private getLoaiNgay(date: Date): 'NGAY_THUONG' | 'THU_BAY' | 'CHU_NHAT' | 'NGAY_LE' {
    const dayOfWeek = date.getDay();
    if (dayOfWeek === 0) return 'CHU_NHAT';
    if (dayOfWeek === 6) return 'THU_BAY';
    return 'NGAY_THUONG';
  }
}
