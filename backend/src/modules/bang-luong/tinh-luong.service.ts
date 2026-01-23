// Service Tính Lương - Logic tính toán lương
// QUAN TRỌNG: Tổng lương KHÔNG được lưu trong DB, luôn tính từ các khoản
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ChamCongService } from '../cham-cong/cham-cong.service';
import { Decimal } from '@prisma/client/runtime/library';

export interface SanLuongNhanVien {
  chiaHang?: {
    tongSpDat: number;
    tongSpLoi: number;
  };
  giaoHang?: {
    tongKhoiLuongThanhCong: number;
    tongSoLanTreGio: number;
    tongSoLanKhongLayPhieu: number;
  };
}

export interface ChiTietLuongNhanVien {
  nhanVienId: number;
  maNhanVien: string;
  hoTen: string;
  chucVu: string | null;
  phongBan: string;
  ngayCongThucTe: number; // Số ngày làm thực tế
  ngayCong?: {
    id: number;
    bangLuongId: number;
    nhanVienId: number;
    ngayCongLyThuyet: number;
    soCongThucTe: number;
    soNgayNghiPhep: number;
    soNgayNghiKhongPhep: number;
    ngayCongDieuChinh?: number | null;
    ghiChu?: string | null;
  };
  sanLuong?: SanLuongNhanVien; // Thông tin sản lượng
  cacKhoanLuong: {
    khoanLuongId: number;
    maKhoan: string;
    tenKhoan: string;
    loai: string;
    soTien: number;
  }[];
  tongThuNhap: number;
  tongKhauTru: number;
  thucLinh: number;
}

export interface BangLuongChiTiet {
  bangLuongId: number;
  thang: number;
  nam: number;
  ngayCongLyThuyet: number; // Số ngày công lý thuyết trong tháng
  phongBan: {
    id: number;
    maPhongBan: string;
    tenPhongBan: string;
  };
  trangThai: string;
  coSanLuong: boolean; // Flag cho biết bảng lương có dữ liệu sản lượng không
  loaiSanLuong?: 'CHIA_HANG' | 'GIAO_HANG' | 'CA_HAI'; // Loại sản lượng
  danhSachKhoanLuong: {
    id: number;
    maKhoan: string;
    tenKhoan: string;
    loai: string;
  }[];
  danhSachNhanVien: ChiTietLuongNhanVien[];
  tongCong: {
    tongThuNhap: number;
    tongKhauTru: number;
    thucLinh: number;
  };
}

@Injectable()
export class TinhLuongService {
  constructor(
    private prisma: PrismaService,
    private chamCongService: ChamCongService,
  ) {}

  /**
   * Tính tổng lương của một nhân viên trong một bảng lương
   * KHÔNG lưu vào DB - luôn tính realtime
   */
  async tinhTongLuongNhanVien(bangLuongId: number, nhanVienId: number): Promise<{
    tongThuNhap: number;
    tongKhauTru: number;
    thucLinh: number;
  }> {
    const chiTietLuong = await this.prisma.chiTietBangLuong.findMany({
      where: {
        bangLuongId,
        nhanVienId,
      },
      include: {
        khoanLuong: true,
      },
    });

    let tongThuNhap = 0;
    let tongKhauTru = 0;

    for (const ct of chiTietLuong) {
      const soTien = Number(ct.soTien);
      if (ct.khoanLuong.loai === 'THU_NHAP') {
        tongThuNhap += soTien;
      } else {
        tongKhauTru += soTien;
      }
    }

    return {
      tongThuNhap,
      tongKhauTru,
      thucLinh: tongThuNhap - tongKhauTru,
    };
  }

  /**
   * Lấy chi tiết bảng lương đầy đủ với tất cả nhân viên và khoản lương
   * Format dạng bảng giống Excel
   */
  async layBangLuongChiTiet(bangLuongId: number): Promise<BangLuongChiTiet> {
    // Lấy thông tin bảng lương
    const bangLuong = await this.prisma.bangLuong.findUnique({
      where: { id: bangLuongId },
      include: {
        phongBan: true,
        chiTiets: {
          include: {
            nhanVien: {
              include: {
                phongBan: true,
              },
            },
            khoanLuong: true,
          },
        },
      },
    });

    if (!bangLuong) {
      throw new Error(`Không tìm thấy bảng lương với ID: ${bangLuongId}`);
    }

    // Lấy danh sách khoản lương đang sử dụng
    const danhSachKhoanLuong = await this.prisma.khoanLuong.findMany({
      where: { trangThai: true },
      orderBy: { thuTu: 'asc' },
    });
    // Đảm bảo trả đủ các khoản lương đã có trong chi tiết bảng lương
    const khoanLuongTrongBang = new Map(
      bangLuong.chiTiets.map((ct) => [ct.khoanLuongId, ct.khoanLuong])
    );
    const daCo = new Set(danhSachKhoanLuong.map((kl) => kl.id));
    const khoanLuongThieu = Array.from(khoanLuongTrongBang.values())
      .filter((kl) => !daCo.has(kl.id))
      .sort((a, b) => (a.thuTu ?? 0) - (b.thuTu ?? 0) || a.tenKhoan.localeCompare(b.tenKhoan));
    if (khoanLuongThieu.length > 0) {
      danhSachKhoanLuong.push(...khoanLuongThieu);
    }

    // Tính số ngày công lý thuyết trong tháng
    const ngayCongLyThuyet = await this.chamCongService.tinhSoNgayCongLyThuyet(
      bangLuong.thang,
      bangLuong.nam,
      bangLuong.phongBanId,
    );

    // Nhóm chi tiết theo nhân viên
    const chiTietTheoNhanVien = new Map<number, ChiTietLuongNhanVien>();

    // Lấy danh sách nhân viên trong phòng ban
    const nhanViens = await this.prisma.nhanVien.findMany({
      where: {
        phongBanId: bangLuong.phongBanId,
        trangThai: 'DANG_LAM',
      },
      include: {
        phongBan: true,
      },
      orderBy: { hoTen: 'asc' },
    });

    // Lấy chấm công của tất cả nhân viên trong phòng ban (batch)
    const chamCongMap = await this.chamCongService.layChamCongNhieuNhanVien(
      nhanViens.map((nv) => nv.id),
      bangLuong.thang,
      bangLuong.nam,
    );

    // Lấy ngày công đã điều chỉnh trong bảng lương
    const ngayCongRecords = await this.prisma.ngayCongBangLuong.findMany({
      where: { bangLuongId },
    });
    const ngayCongMap = new Map(ngayCongRecords.map((nc) => [nc.nhanVienId, nc]));

    // Lấy snapshot sản lượng chia hàng
    const snapshotChiaHang = await this.prisma.snapshotSanLuongChiaHang.findMany({
      where: { bangLuongId },
    });
    const chiaHangMap = new Map(snapshotChiaHang.map(s => [s.nhanVienId, {
      tongSpDat: s.tongSpDat,
      tongSpLoi: s.tongSpLoi,
    }]));

    // Lấy snapshot giao hàng
    const snapshotGiaoHang = await this.prisma.snapshotGiaoHang.findMany({
      where: { bangLuongId },
    });
    const giaoHangMap = new Map(snapshotGiaoHang.map(s => [s.nhanVienId, {
      tongKhoiLuongThanhCong: Number(s.tongKhoiLuongThanhCong),
      tongSoLanTreGio: s.tongSoLanTreGio,
      tongSoLanKhongLayPhieu: s.tongSoLanKhongLayPhieu,
    }]));

    // Khởi tạo cho mỗi nhân viên
    for (const nv of nhanViens) {
      const chamCong = chamCongMap.get(nv.id);
      const ngayCongRecord = ngayCongMap.get(nv.id);
      const soCongThucTe = Number(chamCong?.soCongThucTe || 0);
      const soNgayNghiPhep = Number(chamCong?.soNgayNghiPhep || 0);
      const soNgayNghiKhongPhep = Number(chamCong?.soNgayNghiKhongLuong || 0);

      const ngayCongThucTe = ngayCongRecord
        ? (ngayCongRecord.ngayCongDieuChinh !== null
          ? Number(ngayCongRecord.ngayCongDieuChinh)
          : Number(ngayCongRecord.soCongThucTe) + Number(ngayCongRecord.soNgayNghiPhep))
        : (soCongThucTe + soNgayNghiPhep) || ngayCongLyThuyet;
      
      // Gắn thông tin sản lượng nếu có
      const sanLuong: SanLuongNhanVien = {};
      const chiaHang = chiaHangMap.get(nv.id);
      const giaoHang = giaoHangMap.get(nv.id);
      if (chiaHang) {
        sanLuong.chiaHang = chiaHang;
      }
      if (giaoHang) {
        sanLuong.giaoHang = giaoHang;
      }
      
      chiTietTheoNhanVien.set(nv.id, {
        nhanVienId: nv.id,
        maNhanVien: nv.maNhanVien,
        hoTen: nv.hoTen,
        chucVu: nv.chucVu,
        phongBan: nv.phongBan.tenPhongBan,
        ngayCongThucTe,
        ngayCong: {
          id: ngayCongRecord?.id || 0,
          bangLuongId,
          nhanVienId: nv.id,
          ngayCongLyThuyet,
          soCongThucTe: ngayCongRecord ? Number(ngayCongRecord.soCongThucTe) : soCongThucTe,
          soNgayNghiPhep: ngayCongRecord ? Number(ngayCongRecord.soNgayNghiPhep) : soNgayNghiPhep,
          soNgayNghiKhongPhep: ngayCongRecord ? Number(ngayCongRecord.soNgayNghiKhongPhep) : soNgayNghiKhongPhep,
          ngayCongDieuChinh: ngayCongRecord?.ngayCongDieuChinh !== null && ngayCongRecord?.ngayCongDieuChinh !== undefined
            ? Number(ngayCongRecord.ngayCongDieuChinh)
            : null,
          ghiChu: ngayCongRecord?.ghiChu ?? null,
        },
        sanLuong: Object.keys(sanLuong).length > 0 ? sanLuong : undefined,
        cacKhoanLuong: [],
        tongThuNhap: 0,
        tongKhauTru: 0,
        thucLinh: 0,
      });
    }

    // Điền chi tiết lương
    for (const ct of bangLuong.chiTiets) {
      const nhanVienData = chiTietTheoNhanVien.get(ct.nhanVienId);
      if (nhanVienData) {
        const soTien = Number(ct.soTien);
        nhanVienData.cacKhoanLuong.push({
          khoanLuongId: ct.khoanLuongId,
          maKhoan: ct.khoanLuong.maKhoan,
          tenKhoan: ct.khoanLuong.tenKhoan,
          loai: ct.khoanLuong.loai,
          soTien,
        });

        if (ct.khoanLuong.loai === 'THU_NHAP') {
          nhanVienData.tongThuNhap += soTien;
        } else {
          nhanVienData.tongKhauTru += soTien;
        }
      }
    }

    // Tính thực lĩnh cho mỗi nhân viên
    const danhSachNhanVien: ChiTietLuongNhanVien[] = [];
    let tongCongThuNhap = 0;
    let tongCongKhauTru = 0;

    for (const nv of chiTietTheoNhanVien.values()) {
      nv.thucLinh = nv.tongThuNhap - nv.tongKhauTru;
      danhSachNhanVien.push(nv);
      tongCongThuNhap += nv.tongThuNhap;
      tongCongKhauTru += nv.tongKhauTru;
    }

    // Xác định có sản lượng không và loại sản lượng
    const coChiaHang = snapshotChiaHang.length > 0;
    const coGiaoHang = snapshotGiaoHang.length > 0;
    let loaiSanLuong: 'CHIA_HANG' | 'GIAO_HANG' | 'CA_HAI' | undefined;
    if (coChiaHang && coGiaoHang) {
      loaiSanLuong = 'CA_HAI';
    } else if (coChiaHang) {
      loaiSanLuong = 'CHIA_HANG';
    } else if (coGiaoHang) {
      loaiSanLuong = 'GIAO_HANG';
    }

    return {
      bangLuongId: bangLuong.id,
      thang: bangLuong.thang,
      nam: bangLuong.nam,
      ngayCongLyThuyet,
      phongBan: {
        id: bangLuong.phongBan.id,
        maPhongBan: bangLuong.phongBan.maPhongBan,
        tenPhongBan: bangLuong.phongBan.tenPhongBan,
      },
      trangThai: bangLuong.trangThai,
      coSanLuong: coChiaHang || coGiaoHang,
      loaiSanLuong,
      danhSachKhoanLuong: danhSachKhoanLuong.map((kl) => ({
        id: kl.id,
        maKhoan: kl.maKhoan,
        tenKhoan: kl.tenKhoan,
        loai: kl.loai,
      })),
      danhSachNhanVien,
      tongCong: {
        tongThuNhap: tongCongThuNhap,
        tongKhauTru: tongCongKhauTru,
        thucLinh: tongCongThuNhap - tongCongKhauTru,
      },
    };
  }

  /**
   * Tính tổng lương của toàn bộ bảng lương
   */
  async tinhTongBangLuong(bangLuongId: number): Promise<{
    tongThuNhap: number;
    tongKhauTru: number;
    thucLinh: number;
    soNhanVien: number;
  }> {
    const chiTietLuong = await this.prisma.chiTietBangLuong.findMany({
      where: { bangLuongId },
      include: {
        khoanLuong: true,
      },
    });

    const nhanVienIds = new Set<number>();
    let tongThuNhap = 0;
    let tongKhauTru = 0;

    for (const ct of chiTietLuong) {
      nhanVienIds.add(ct.nhanVienId);
      const soTien = Number(ct.soTien);
      if (ct.khoanLuong.loai === 'THU_NHAP') {
        tongThuNhap += soTien;
      } else {
        tongKhauTru += soTien;
      }
    }

    return {
      tongThuNhap,
      tongKhauTru,
      thucLinh: tongThuNhap - tongKhauTru,
      soNhanVien: nhanVienIds.size,
    };
  }

  /**
   * So sánh tổng lương với file Excel
   * Dùng để verify sau khi import
   */
  async soSanhVoiExcel(
    bangLuongId: number,
    tongExcel: number,
  ): Promise<{
    khop: boolean;
    tongHeThong: number;
    tongExcel: number;
    chenhLech: number;
  }> {
    const tongHeThong = await this.tinhTongBangLuong(bangLuongId);

    return {
      khop: tongHeThong.thucLinh === tongExcel,
      tongHeThong: tongHeThong.thucLinh,
      tongExcel,
      chenhLech: tongHeThong.thucLinh - tongExcel,
    };
  }
}
