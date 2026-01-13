import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Decimal } from '@prisma/client/runtime/library';
import { CachTinhLuong } from '@prisma/client';

@Injectable()
export class NgayCongService {
  constructor(private prisma: PrismaService) {}

  /**
   * Tính lại các khoản lương theo ngày công mới
   * Chỉ cập nhật các khoản có cachTinh = THEO_NGAY_CONG và khoản LUONG_CO_BAN
   */
  async tinhLaiKhoanLuongTheoNgayCong(
    bangLuongId: number,
    nhanVienId: number,
    ngayCongMoi: number,
  ) {
    // Lấy thông tin bảng lương
    const bangLuong = await this.prisma.bangLuong.findUnique({
      where: { id: bangLuongId },
    });

    if (!bangLuong) return;

    // Tính ngày công lý thuyết
    const ngayCongLyThuyet = await this.tinhNgayCongLyThuyet(
      bangLuong.thang,
      bangLuong.nam,
    );

    if (ngayCongLyThuyet <= 0) return;

    // Lấy thông tin nhân viên
    const nhanVien = await this.prisma.nhanVien.findUnique({
      where: { id: nhanVienId },
    });

    if (!nhanVien) return;

    // Lấy khoản lương cơ bản
    const luongCoBan = await this.prisma.khoanLuong.findFirst({
      where: { maKhoan: 'LUONG_CO_BAN' },
    });

    // Lấy tất cả chi tiết lương của nhân viên trong bảng lương
    const chiTiets = await this.prisma.chiTietBangLuong.findMany({
      where: {
        bangLuongId,
        nhanVienId,
      },
      include: {
        khoanLuong: true,
      },
    });

    // Cập nhật từng khoản theo rule
    for (const ct of chiTiets) {
      let soTienMoi: number | null = null;

      // Trường hợp 1: Lương cơ bản - luôn tính theo ngày công
      if (luongCoBan && ct.khoanLuongId === luongCoBan.id) {
        soTienMoi = Math.round(
          Number(nhanVien.luongCoBan) * (ngayCongMoi / ngayCongLyThuyet),
        );
      }
      // Trường hợp 2: Khoản có cachTinh = THEO_NGAY_CONG
      else if (ct.khoanLuong.cachTinh === CachTinhLuong.THEO_NGAY_CONG) {
        // Tính lại từ giá trị gốc (lấy từ phụ cấp nhân viên nếu có)
        const phuCap = await this.prisma.phuCapNhanVien.findFirst({
          where: {
            nhanVienId,
            khoanLuongId: ct.khoanLuongId,
            trangThai: 'HIEU_LUC',
          },
        });

        if (phuCap) {
          soTienMoi = Math.round(
            Number(phuCap.soTien) * (ngayCongMoi / ngayCongLyThuyet),
          );
        }
      }

      // Cập nhật nếu có thay đổi
      if (soTienMoi !== null) {
        await this.prisma.chiTietBangLuong.update({
          where: { id: ct.id },
          data: { soTien: new Decimal(soTienMoi) },
        });
      }
    }
  }

  /**
   * Khởi tạo ngày công cho bảng lương từ dữ liệu chấm công
   */
  async khoiTaoNgayCongTuChamCong(bangLuongId: number) {
    // Lấy thông tin bảng lương
    const bangLuong = await this.prisma.bangLuong.findUnique({
      where: { id: bangLuongId },
    });

    if (!bangLuong) {
      throw new Error('Không tìm thấy bảng lương');
    }

    // Lấy danh sách nhân viên trong phòng ban
    const nhanViens = await this.prisma.nhanVien.findMany({
      where: {
        phongBanId: bangLuong.phongBanId,
        trangThai: 'DANG_LAM',
      },
    });

    // Tính ngày công lý thuyết
    const ngayCongLyThuyet = await this.tinhNgayCongLyThuyet(
      bangLuong.thang,
      bangLuong.nam,
    );

    const records = [];

    for (const nv of nhanViens) {
      // Lấy dữ liệu chấm công
      const chamCong = await this.prisma.chamCong.findFirst({
        where: {
          nhanVienId: nv.id,
          thang: bangLuong.thang,
          nam: bangLuong.nam,
        },
      });

      if (chamCong) {
        records.push({
          bangLuongId: bangLuongId,
          nhanVienId: nv.id,
          ngayCongLyThuyet: new Decimal(ngayCongLyThuyet),
          soCongThucTe: chamCong.soCongThucTe,
          soNgayNghiPhep: chamCong.soNgayNghiPhep,
          soNgayNghiKhongPhep: chamCong.soNgayNghiKhongLuong,
          ngayCongDieuChinh: null,
          ghiChu: null,
        });
      }
    }

    // Xóa dữ liệu cũ nếu có
    await this.prisma.ngayCongBangLuong.deleteMany({
      where: { bangLuongId },
    });

    // Tạo mới
    if (records.length > 0) {
      await this.prisma.ngayCongBangLuong.createMany({
        data: records,
      });
    }

    return records;
  }

  /**
   * Lấy ngày công theo nhân viên
   */
  async layNgayCongTheoNhanVien(bangLuongId: number, nhanVienId: number) {
    return this.prisma.ngayCongBangLuong.findUnique({
      where: {
        bangLuongId_nhanVienId: {
          bangLuongId,
          nhanVienId,
        },
      },
    });
  }

  /**
   * Lấy tất cả ngày công của bảng lương
   */
  async layTatCaNgayCong(bangLuongId: number) {
    return this.prisma.ngayCongBangLuong.findMany({
      where: { bangLuongId },
      include: {
        nhanVien: {
          select: {
            id: true,
            maNhanVien: true,
            hoTen: true,
          },
        },
      },
    });
  }

  /**
   * Cập nhật ngày công điều chỉnh
   */
  async capNhatNgayCongDieuChinh(
    bangLuongId: number,
    nhanVienId: number,
    ngayCongMoi: number,
    ghiChu?: string,
  ) {
    // Kiểm tra bảng lương có bị khóa không
    const bangLuong = await this.prisma.bangLuong.findUnique({
      where: { id: bangLuongId },
    });

    if (!bangLuong) {
      throw new Error('Không tìm thấy bảng lương');
    }

    if (bangLuong.trangThai === 'KHOA') {
      throw new Error('Không thể sửa bảng lương đã khóa');
    }

    // Cập nhật ngày công
    const result = await this.prisma.ngayCongBangLuong.upsert({
      where: {
        bangLuongId_nhanVienId: {
          bangLuongId,
          nhanVienId,
        },
      },
      update: {
        ngayCongDieuChinh: new Decimal(ngayCongMoi),
        ghiChu: ghiChu || null,
        ngayCapNhat: new Date(),
      },
      create: {
        bangLuongId,
        nhanVienId,
        ngayCongLyThuyet: new Decimal(0),
        soCongThucTe: new Decimal(0),
        soNgayNghiPhep: new Decimal(0),
        soNgayNghiKhongPhep: new Decimal(0),
        ngayCongDieuChinh: new Decimal(ngayCongMoi),
        ghiChu: ghiChu || null,
      },
    });

    // Tính lại các khoản lương theo ngày công mới
    await this.tinhLaiKhoanLuongTheoNgayCong(bangLuongId, nhanVienId, ngayCongMoi);

    return result;
  }

  /**
   * Tính ngày công thực tế (có tính điều chỉnh)
   * ngayCongThucTe = soCongThucTe + soNgayNghiPhep
   * Nếu có điều chỉnh thì dùng ngayCongDieuChinh
   */
  tinhNgayCongThucTe(ngayCong: any): number {
    if (ngayCong.ngayCongDieuChinh) {
      return Number(ngayCong.ngayCongDieuChinh);
    }
    return (
      Number(ngayCong.soCongThucTe) + Number(ngayCong.soNgayNghiPhep)
    );
  }

  /**
   * Tính số ngày công lý thuyết trong tháng
   */
  private async tinhNgayCongLyThuyet(
    thang: number,
    nam: number,
  ): Promise<number> {
    // Số ngày trong tháng
    const soNgayTrongThang = new Date(nam, thang, 0).getDate();

    // Đếm số ngày cuối tuần (Thứ 7, Chủ nhật)
    let soNgayCuoiTuan = 0;
    for (let ngay = 1; ngay <= soNgayTrongThang; ngay++) {
      const date = new Date(nam, thang - 1, ngay);
      const dayOfWeek = date.getDay();
      if (dayOfWeek === 0 || dayOfWeek === 6) {
        // 0: Chủ nhật, 6: Thứ 7
        soNgayCuoiTuan++;
      }
    }

    // Ngày công lý thuyết = Tổng ngày - Ngày cuối tuần
    return soNgayTrongThang - soNgayCuoiTuan;
  }

  /**
   * Xóa ngày công điều chỉnh (trở về tính tự động)
   */
  async xoaDieuChinh(bangLuongId: number, nhanVienId: number) {
    return this.prisma.ngayCongBangLuong.update({
      where: {
        bangLuongId_nhanVienId: {
          bangLuongId,
          nhanVienId,
        },
      },
      data: {
        ngayCongDieuChinh: null,
        ghiChu: null,
        ngayCapNhat: new Date(),
      },
    });
  }
}
