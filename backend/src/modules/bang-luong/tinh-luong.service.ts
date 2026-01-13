// Service Tính Lương - Logic tính toán lương
// QUAN TRỌNG: Tổng lương KHÔNG được lưu trong DB, luôn tính từ các khoản
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ChamCongService } from '../cham-cong/cham-cong.service';
import { Decimal } from '@prisma/client/runtime/library';

export interface ChiTietLuongNhanVien {
  nhanVienId: number;
  maNhanVien: string;
  hoTen: string;
  chucVu: string | null;
  phongBan: string;
  ngayCongThucTe: number; // Số ngày làm thực tế
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

    // Tính số ngày công lý thuyết trong tháng
    const ngayCongLyThuyet = this.chamCongService.tinhSoNgayCongLyThuyet(
      bangLuong.thang,
      bangLuong.nam,
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

    // Lấy chấm công của tất cả nhân viên trong phòng ban
    const chamCongMap = new Map<number, number>();
    for (const nv of nhanViens) {
      try {
        const cc = await this.chamCongService.layChamCongNhanVien(
          nv.id,
          bangLuong.thang,
          bangLuong.nam,
        );
        if (cc) {
          // Ngày công thực tế = số công thực tế + ngày nghỉ phép (nghỉ phép được tính như đi làm)
          const ngayCongThucTe = Number(cc.soCongThucTe || 0) + Number(cc.soNgayNghiPhep || 0);
          chamCongMap.set(nv.id, ngayCongThucTe);
        } else {
          chamCongMap.set(nv.id, ngayCongLyThuyet);
        }
      } catch {
        chamCongMap.set(nv.id, ngayCongLyThuyet);
      }
    }

    // Khởi tạo cho mỗi nhân viên
    for (const nv of nhanViens) {
      const ngayCongThucTe = chamCongMap.get(nv.id) || ngayCongLyThuyet;
      chiTietTheoNhanVien.set(nv.id, {
        nhanVienId: nv.id,
        maNhanVien: nv.maNhanVien,
        hoTen: nv.hoTen,
        chucVu: nv.chucVu,
        phongBan: nv.phongBan.tenPhongBan,
        ngayCongThucTe,
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
