// Service Snapshot & Phiếu Điều Chỉnh
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { LoaiDieuChinh, TrangThaiPhieuDC } from '@prisma/client';

@Injectable()
export class SnapshotDieuChinhService {
  constructor(private prisma: PrismaService) {}

  // ============================================
  // SNAPSHOT BẢNG LƯƠNG
  // ============================================

  // Tạo snapshot khi chốt bảng lương
  async taoSnapshot(bangLuongId: number, nguoiChot: string) {
    // Lấy thông tin bảng lương và chi tiết
    const bangLuong = await this.prisma.bangLuong.findUnique({
      where: { id: bangLuongId },
      include: {
        phongBan: true,
        chiTiets: {
          include: {
            nhanVien: true,
            khoanLuong: true,
          },
        },
      },
    });

    if (!bangLuong) {
      throw new NotFoundException(`Không tìm thấy bảng lương với ID: ${bangLuongId}`);
    }

    if (bangLuong.trangThai !== 'NHAP') {
      throw new BadRequestException('Bảng lương đã được chốt trước đó');
    }

    const ngayChot = new Date();

    // Lấy đơn vị con hiện tại của từng nhân viên từ NhanVienPhongBan
    const nhanVienIds = bangLuong.chiTiets.map((ct) => ct.nhanVienId);
    const lichSuPhongBans = await this.prisma.nhanVienPhongBan.findMany({
      where: {
        nhanVienId: { in: nhanVienIds },
        denNgay: null, // Đang hoạt động
      },
      include: {
        donViCon: true,
      },
    });
    const donViConMap = new Map(
      lichSuPhongBans.map((ls) => [ls.nhanVienId, ls.donViCon]),
    );

    // Tạo snapshot cho từng chi tiết - lưu cả phongBanId và donViConId hiện tại
    const snapshotData = bangLuong.chiTiets.map((ct) => {
      const donViCon = donViConMap.get(ct.nhanVienId);
      return {
        bangLuongId: ct.bangLuongId,
        nhanVienId: ct.nhanVienId,
        maNhanVien: ct.nhanVien.maNhanVien,
        hoTen: ct.nhanVien.hoTen,
        phongBan: bangLuong.phongBan.tenPhongBan,
        phongBanId: bangLuong.phongBan.id, // Snapshot phong ban ID
        donViConId: donViCon?.id || null, // Snapshot đơn vị con ID (Tổ/Ca)
        donViCon: donViCon?.tenDonVi || null, // Tên đơn vị con
        khoanLuongId: ct.khoanLuongId,
        maKhoan: ct.khoanLuong.maKhoan,
        tenKhoan: ct.khoanLuong.tenKhoan,
        loaiKhoan: ct.khoanLuong.loai,
        soTien: ct.soTien,
        nguon: ct.nguon,
        ngayChot,
        nguoiChot,
      };
    });

    // Xóa snapshot cũ (nếu có - trường hợp mở khóa rồi chốt lại)
    await this.prisma.snapshotBangLuong.deleteMany({
      where: { bangLuongId },
    });

    // Tạo snapshot mới
    await this.prisma.snapshotBangLuong.createMany({
      data: snapshotData,
    });

    // Cập nhật trạng thái bảng lương
    await this.prisma.bangLuong.update({
      where: { id: bangLuongId },
      data: {
        trangThai: 'DA_CHOT',
        ngayChot,
        nguoiChot,
      },
    });

    return {
      message: 'Đã chốt bảng lương và tạo snapshot thành công',
      bangLuongId,
      soChiTiet: snapshotData.length,
      ngayChot,
      nguoiChot,
    };
  }

  // Lấy snapshot của bảng lương
  async laySnapshot(bangLuongId: number) {
    const snapshots = await this.prisma.snapshotBangLuong.findMany({
      where: { bangLuongId },
      orderBy: [{ nhanVienId: 'asc' }, { khoanLuongId: 'asc' }],
    });

    if (snapshots.length === 0) {
      throw new NotFoundException(`Không tìm thấy snapshot cho bảng lương ID: ${bangLuongId}`);
    }

    // Nhóm theo nhân viên
    const theoNhanVien = new Map<
      number,
      {
        nhanVienId: number;
        maNhanVien: string;
        hoTen: string;
        phongBan: string;
        chiTiets: typeof snapshots;
        tongThuNhap: number;
        tongKhauTru: number;
        thucLinh: number;
      }
    >();

    for (const ss of snapshots) {
      if (!theoNhanVien.has(ss.nhanVienId)) {
        theoNhanVien.set(ss.nhanVienId, {
          nhanVienId: ss.nhanVienId,
          maNhanVien: ss.maNhanVien,
          hoTen: ss.hoTen,
          phongBan: ss.phongBan,
          chiTiets: [],
          tongThuNhap: 0,
          tongKhauTru: 0,
          thucLinh: 0,
        });
      }

      const nv = theoNhanVien.get(ss.nhanVienId)!;
      nv.chiTiets.push(ss);

      const soTien = Number(ss.soTien);
      if (ss.loaiKhoan === 'THU_NHAP') {
        nv.tongThuNhap += soTien;
      } else {
        nv.tongKhauTru += soTien;
      }
      nv.thucLinh = nv.tongThuNhap - nv.tongKhauTru;
    }

    return {
      bangLuongId,
      ngayChot: snapshots[0].ngayChot,
      nguoiChot: snapshots[0].nguoiChot,
      danhSach: Array.from(theoNhanVien.values()),
    };
  }

  // So sánh snapshot với dữ liệu hiện tại
  async soSanhSnapshot(bangLuongId: number) {
    const [snapshots, chiTiets] = await Promise.all([
      this.prisma.snapshotBangLuong.findMany({
        where: { bangLuongId },
      }),
      this.prisma.chiTietBangLuong.findMany({
        where: { bangLuongId },
        include: {
          nhanVien: true,
          khoanLuong: true,
        },
      }),
    ]);

    const khacBiet: {
      nhanVienId: number;
      hoTen: string;
      khoanLuong: string;
      soTienSnapshot: number;
      soTienHienTai: number;
      chenhLech: number;
    }[] = [];

    // Tạo map từ snapshot
    const snapshotMap = new Map<string, number>();
    for (const ss of snapshots) {
      const key = `${ss.nhanVienId}-${ss.khoanLuongId}`;
      snapshotMap.set(key, Number(ss.soTien));
    }

    // So sánh với dữ liệu hiện tại
    for (const ct of chiTiets) {
      const key = `${ct.nhanVienId}-${ct.khoanLuongId}`;
      const soTienSnapshot = snapshotMap.get(key) || 0;
      const soTienHienTai = Number(ct.soTien);

      if (soTienSnapshot !== soTienHienTai) {
        khacBiet.push({
          nhanVienId: ct.nhanVienId,
          hoTen: ct.nhanVien.hoTen,
          khoanLuong: ct.khoanLuong.tenKhoan,
          soTienSnapshot,
          soTienHienTai,
          chenhLech: soTienHienTai - soTienSnapshot,
        });
      }
    }

    return {
      bangLuongId,
      coKhacBiet: khacBiet.length > 0,
      soKhacBiet: khacBiet.length,
      chiTiet: khacBiet,
    };
  }

  // ============================================
  // PHIẾU ĐIỀU CHỈNH
  // ============================================

  // Sinh mã phiếu điều chỉnh
  private async sinhMaPhieu(): Promise<string> {
    const today = new Date();
    const prefix = `DC${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, '0')}`;

    const lastPhieu = await this.prisma.phieuDieuChinh.findFirst({
      where: {
        maPhieu: { startsWith: prefix },
      },
      orderBy: { maPhieu: 'desc' },
    });

    let seq = 1;
    if (lastPhieu) {
      const lastSeq = parseInt(lastPhieu.maPhieu.slice(-4), 10);
      seq = lastSeq + 1;
    }

    return `${prefix}${String(seq).padStart(4, '0')}`;
  }

  // Tạo phiếu điều chỉnh
  async taoPhieuDieuChinh(data: {
    bangLuongId: number;
    nhanVienId: number;
    loaiDieuChinh: LoaiDieuChinh;
    lyDo: string;
    ghiChu?: string;
    nguoiTao: string;
    chiTiets: {
      khoanLuongId: number;
      soTienCu: number;
      soTienMoi: number;
      ghiChu?: string;
    }[];
  }) {
    // Kiểm tra bảng lương
    const bangLuong = await this.prisma.bangLuong.findUnique({
      where: { id: data.bangLuongId },
    });

    if (!bangLuong) {
      throw new NotFoundException(`Không tìm thấy bảng lương với ID: ${data.bangLuongId}`);
    }

    if (bangLuong.trangThai === 'NHAP') {
      throw new BadRequestException('Bảng lương chưa chốt, không cần phiếu điều chỉnh');
    }

    if (bangLuong.trangThai === 'KHOA') {
      throw new BadRequestException('Bảng lương đã khóa vĩnh viễn, không thể tạo phiếu điều chỉnh');
    }

    // Kiểm tra nhân viên
    const nhanVien = await this.prisma.nhanVien.findUnique({
      where: { id: data.nhanVienId },
    });

    if (!nhanVien) {
      throw new NotFoundException(`Không tìm thấy nhân viên với ID: ${data.nhanVienId}`);
    }

    // Sinh mã phiếu
    const maPhieu = await this.sinhMaPhieu();

    // Tạo phiếu và chi tiết
    const phieu = await this.prisma.phieuDieuChinh.create({
      data: {
        maPhieu,
        bangLuongId: data.bangLuongId,
        nhanVienId: data.nhanVienId,
        loaiDieuChinh: data.loaiDieuChinh,
        lyDo: data.lyDo,
        ghiChu: data.ghiChu,
        nguoiTao: data.nguoiTao,
        trangThai: 'CHO_DUYET',
        chiTiets: {
          create: data.chiTiets.map((ct) => ({
            khoanLuongId: ct.khoanLuongId,
            soTienCu: ct.soTienCu,
            soTienMoi: ct.soTienMoi,
            chenhLech: ct.soTienMoi - ct.soTienCu,
            ghiChu: ct.ghiChu,
          })),
        },
      },
      include: {
        nhanVien: true,
        chiTiets: {
          include: {
            khoanLuong: true,
          },
        },
      },
    });

    return phieu;
  }

  // Lấy danh sách phiếu điều chỉnh
  async layDanhSachPhieu(bangLuongId?: number, trangThai?: TrangThaiPhieuDC) {
    const where: Record<string, unknown> = {};
    if (bangLuongId) where.bangLuongId = bangLuongId;
    if (trangThai) where.trangThai = trangThai;

    return this.prisma.phieuDieuChinh.findMany({
      where,
      include: {
        nhanVien: {
          select: { maNhanVien: true, hoTen: true },
        },
        chiTiets: {
          include: {
            khoanLuong: {
              select: { maKhoan: true, tenKhoan: true },
            },
          },
        },
      },
      orderBy: { ngayTao: 'desc' },
    });
  }

  // Lấy chi tiết phiếu điều chỉnh
  async layChiTietPhieu(id: number) {
    const phieu = await this.prisma.phieuDieuChinh.findUnique({
      where: { id },
      include: {
        nhanVien: true,
        chiTiets: {
          include: {
            khoanLuong: true,
          },
        },
      },
    });

    if (!phieu) {
      throw new NotFoundException(`Không tìm thấy phiếu điều chỉnh với ID: ${id}`);
    }

    return phieu;
  }

  // Duyệt phiếu điều chỉnh
  async duyetPhieu(id: number, nguoiDuyet: string) {
    const phieu = await this.prisma.phieuDieuChinh.findUnique({
      where: { id },
      include: { chiTiets: true },
    });

    if (!phieu) {
      throw new NotFoundException(`Không tìm thấy phiếu điều chỉnh với ID: ${id}`);
    }

    if (phieu.trangThai !== 'CHO_DUYET') {
      throw new BadRequestException('Phiếu không ở trạng thái chờ duyệt');
    }

    // Cập nhật trạng thái phiếu
    await this.prisma.phieuDieuChinh.update({
      where: { id },
      data: {
        trangThai: 'DA_DUYET',
        nguoiDuyet,
        ngayDuyet: new Date(),
      },
    });

    // Cập nhật ChiTietBangLuong và ghi log lịch sử
    for (const ct of phieu.chiTiets) {
      // Cập nhật số tiền trong ChiTietBangLuong
      await this.prisma.chiTietBangLuong.updateMany({
        where: {
          bangLuongId: phieu.bangLuongId,
          nhanVienId: phieu.nhanVienId,
          khoanLuongId: ct.khoanLuongId,
        },
        data: {
          soTien: ct.soTienMoi,
        },
      });

      // Ghi log lịch sử
      await this.prisma.lichSuChinhSua.create({
        data: {
          bangLuongId: phieu.bangLuongId,
          nhanVienId: phieu.nhanVienId,
          khoanLuongId: ct.khoanLuongId,
          giaTriCu: ct.soTienCu,
          giaTriMoi: ct.soTienMoi,
          loaiThayDoi: 'DIEU_CHINH',
          nguoiThayDoi: nguoiDuyet,
          lyDo: `Phiếu điều chỉnh ${phieu.maPhieu}: ${phieu.lyDo}`,
        },
      });
    }

    return {
      message: 'Đã duyệt phiếu điều chỉnh thành công',
      maPhieu: phieu.maPhieu,
      nguoiDuyet,
      ngayDuyet: new Date(),
    };
  }

  // Từ chối phiếu điều chỉnh
  async tuChoiPhieu(id: number, nguoiTuChoi: string, lyDoTuChoi: string) {
    const phieu = await this.prisma.phieuDieuChinh.findUnique({
      where: { id },
    });

    if (!phieu) {
      throw new NotFoundException(`Không tìm thấy phiếu điều chỉnh với ID: ${id}`);
    }

    if (phieu.trangThai !== 'CHO_DUYET') {
      throw new BadRequestException('Phiếu không ở trạng thái chờ duyệt');
    }

    return this.prisma.phieuDieuChinh.update({
      where: { id },
      data: {
        trangThai: 'TU_CHOI',
        nguoiTuChoi,
        ngayTuChoi: new Date(),
        lyDoTuChoi,
      },
    });
  }

  // Hủy phiếu điều chỉnh
  async huyPhieu(id: number) {
    const phieu = await this.prisma.phieuDieuChinh.findUnique({
      where: { id },
    });

    if (!phieu) {
      throw new NotFoundException(`Không tìm thấy phiếu điều chỉnh với ID: ${id}`);
    }

    if (phieu.trangThai === 'DA_DUYET') {
      throw new BadRequestException('Không thể hủy phiếu đã duyệt');
    }

    return this.prisma.phieuDieuChinh.update({
      where: { id },
      data: { trangThai: 'HUY' },
    });
  }
}
