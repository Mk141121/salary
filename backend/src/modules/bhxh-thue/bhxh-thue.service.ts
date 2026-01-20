// Service BHXH & Thuế TNCN - Logic tính BHXH và Thuế theo quy định VN 2025
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CacheService, CACHE_KEYS, CACHE_TTL } from '../../common/cache/cache.service';
import { Decimal } from '@prisma/client/runtime/library';

// Interface kết quả tính BHXH
export interface KetQuaTinhBHXH {
  luongDongBHXH: number;
  bhxhNV: number;
  bhytNV: number;
  bhtnNV: number;
  tongBHNV: number;
  bhxhDN: number;
  bhytDN: number;
  bhtnDN: number;
  tongBHDN: number;
}

// Interface kết quả tính thuế
export interface KetQuaTinhThue {
  thuNhapChiuThue: number;
  giamTruBanThan: number;
  soPhuThuoc: number;
  giamTruPhuThuoc: number;
  giamTruBHXH: number;
  thuNhapTinhThue: number;
  thueTNCN: number;
  bacThueApDung: number | null;
}

@Injectable()
export class BHXHThueService {
  constructor(
    private prisma: PrismaService,
    private cacheService: CacheService,
  ) {}

  // ============================================
  // QUẢN LÝ CẤU HÌNH BHXH (có cache)
  // ============================================

  // Lấy cấu hình BHXH theo năm (có cache 24h)
  async layCauHinhBHXH(nam: number) {
    const cacheKey = CACHE_KEYS.CAU_HINH_BHXH(nam);
    
    return this.cacheService.getOrSet(
      cacheKey,
      async () => {
        const cauHinh = await this.prisma.cauHinhBHXH.findUnique({
          where: { nam },
        });

        if (!cauHinh) {
          throw new NotFoundException(`Không tìm thấy cấu hình BHXH năm ${nam}`);
        }

        return cauHinh;
      },
      CACHE_TTL.LONG, // 24 hours
    );
  }

  // Tạo/Cập nhật cấu hình BHXH (invalidate cache)
  async luuCauHinhBHXH(data: {
    nam: number;
    tyLeBHXH_NV: number;
    tyLeBHXH_DN: number;
    tyLeBHYT_NV: number;
    tyLeBHYT_DN: number;
    tyLeBHTN_NV: number;
    tyLeBHTN_DN: number;
    luongCoBanToiThieu: number;
    tranDongBHXH: number;
    luongCoSo: number;
  }) {
    const result = await this.prisma.cauHinhBHXH.upsert({
      where: { nam: data.nam },
      update: data,
      create: data,
    });

    // Invalidate cache
    await this.cacheService.del(CACHE_KEYS.CAU_HINH_BHXH(data.nam));
    await this.cacheService.del(CACHE_KEYS.CAU_HINH_BHXH_ALL);

    return result;
  }

  // Khởi tạo cấu hình BHXH mặc định cho năm 2025/2026
  async khoiTaoCauHinhMacDinh() {
    // Cấu hình BHXH 2025
    await this.prisma.cauHinhBHXH.upsert({
      where: { nam: 2025 },
      update: {},
      create: {
        nam: 2025,
        tyLeBHXH_NV: 8,
        tyLeBHXH_DN: 17.5,
        tyLeBHYT_NV: 1.5,
        tyLeBHYT_DN: 3,
        tyLeBHTN_NV: 1,
        tyLeBHTN_DN: 1,
        luongCoBanToiThieu: 4680000, // Vùng I: 4.68 triệu
        tranDongBHXH: 46800000, // 20 x lương cơ sở (2.34 triệu)
        luongCoSo: 2340000, // Lương cơ sở 2025
      },
    });

    // Cấu hình BHXH 2026
    await this.prisma.cauHinhBHXH.upsert({
      where: { nam: 2026 },
      update: {},
      create: {
        nam: 2026,
        tyLeBHXH_NV: 8,
        tyLeBHXH_DN: 17.5,
        tyLeBHYT_NV: 1.5,
        tyLeBHYT_DN: 3,
        tyLeBHTN_NV: 1,
        tyLeBHTN_DN: 1,
        luongCoBanToiThieu: 4960000, // Dự kiến tăng
        tranDongBHXH: 49600000, // 20 x lương cơ sở
        luongCoSo: 2480000, // Lương cơ sở dự kiến 2026
      },
    });

    // Cấu hình Thuế TNCN 2025
    const cauHinhThue2025 = await this.prisma.cauHinhThueTNCN.upsert({
      where: { nam: 2025 },
      update: {},
      create: {
        nam: 2025,
        giamTruBanThan: 11000000, // 11 triệu
        giamTruPhuThuoc: 4400000, // 4.4 triệu/người
      },
    });

    // Bậc thuế lũy tiến 7 bậc
    const bacThue = [
      { bac: 1, tuMuc: 0, denMuc: 5000000, thueSuat: 5, soTienTruNhanh: 0 },
      { bac: 2, tuMuc: 5000000, denMuc: 10000000, thueSuat: 10, soTienTruNhanh: 250000 },
      { bac: 3, tuMuc: 10000000, denMuc: 18000000, thueSuat: 15, soTienTruNhanh: 750000 },
      { bac: 4, tuMuc: 18000000, denMuc: 32000000, thueSuat: 20, soTienTruNhanh: 1650000 },
      { bac: 5, tuMuc: 32000000, denMuc: 52000000, thueSuat: 25, soTienTruNhanh: 3250000 },
      { bac: 6, tuMuc: 52000000, denMuc: 80000000, thueSuat: 30, soTienTruNhanh: 5850000 },
      { bac: 7, tuMuc: 80000000, denMuc: null, thueSuat: 35, soTienTruNhanh: 9850000 },
    ];

    for (const bt of bacThue) {
      await this.prisma.bacThueTNCN.upsert({
        where: {
          cauHinhThueId_bac: {
            cauHinhThueId: cauHinhThue2025.id,
            bac: bt.bac,
          },
        },
        update: bt,
        create: {
          cauHinhThueId: cauHinhThue2025.id,
          ...bt,
        },
      });
    }

    // Cấu hình Thuế TNCN 2026 (giống 2025)
    const cauHinhThue2026 = await this.prisma.cauHinhThueTNCN.upsert({
      where: { nam: 2026 },
      update: {},
      create: {
        nam: 2026,
        giamTruBanThan: 11000000,
        giamTruPhuThuoc: 4400000,
      },
    });

    for (const bt of bacThue) {
      await this.prisma.bacThueTNCN.upsert({
        where: {
          cauHinhThueId_bac: {
            cauHinhThueId: cauHinhThue2026.id,
            bac: bt.bac,
          },
        },
        update: bt,
        create: {
          cauHinhThueId: cauHinhThue2026.id,
          ...bt,
        },
      });
    }

    return { message: 'Đã khởi tạo cấu hình BHXH/Thuế mặc định' };
  }

  // ============================================
  // QUẢN LÝ NGƯỜI PHỤ THUỘC
  // ============================================

  // Lấy danh sách người phụ thuộc của nhân viên
  async layNguoiPhuThuoc(nhanVienId: number) {
    return this.prisma.nguoiPhuThuoc.findMany({
      where: { nhanVienId, trangThai: true },
      orderBy: { ngayTao: 'asc' },
    });
  }

  // Thêm người phụ thuộc
  async themNguoiPhuThuoc(data: {
    nhanVienId: number;
    hoTen: string;
    ngaySinh?: Date;
    quanHe: string;
    maSoThue?: string;
    soCCCD?: string;
    tuNgay: Date;
    denNgay?: Date;
    ghiChu?: string;
  }) {
    return this.prisma.nguoiPhuThuoc.create({
      data,
    });
  }

  // Cập nhật người phụ thuộc
  async capNhatNguoiPhuThuoc(
    id: number,
    data: {
      hoTen?: string;
      ngaySinh?: Date;
      quanHe?: string;
      maSoThue?: string;
      soCCCD?: string;
      tuNgay?: Date;
      denNgay?: Date;
      trangThai?: boolean;
      ghiChu?: string;
    },
  ) {
    return this.prisma.nguoiPhuThuoc.update({
      where: { id },
      data,
    });
  }

  // Đếm số người phụ thuộc hợp lệ trong tháng
  async demNguoiPhuThuocHopLe(nhanVienId: number, thang: number, nam: number): Promise<number> {
    const ngayDauThang = new Date(nam, thang - 1, 1);
    const ngayCuoiThang = new Date(nam, thang, 0);

    const count = await this.prisma.nguoiPhuThuoc.count({
      where: {
        nhanVienId,
        trangThai: true,
        tuNgay: { lte: ngayCuoiThang },
        OR: [
          { denNgay: null },
          { denNgay: { gte: ngayDauThang } },
        ],
      },
    });

    return count;
  }

  // ============================================
  // TÍNH BHXH
  // ============================================

  // Tính BHXH cho một nhân viên
  async tinhBHXH(luongDongBHXH: number, nam: number): Promise<KetQuaTinhBHXH> {
    const cauHinh = await this.layCauHinhBHXH(nam);

    // Áp dụng trần đóng BHXH
    const luongTinhBH = Math.min(luongDongBHXH, Number(cauHinh.tranDongBHXH));

    // Tính các khoản BH phía nhân viên
    const bhxhNV = Math.round(luongTinhBH * Number(cauHinh.tyLeBHXH_NV) / 100);
    const bhytNV = Math.round(luongTinhBH * Number(cauHinh.tyLeBHYT_NV) / 100);
    const bhtnNV = Math.round(luongTinhBH * Number(cauHinh.tyLeBHTN_NV) / 100);
    const tongBHNV = bhxhNV + bhytNV + bhtnNV;

    // Tính các khoản BH phía doanh nghiệp
    const bhxhDN = Math.round(luongTinhBH * Number(cauHinh.tyLeBHXH_DN) / 100);
    const bhytDN = Math.round(luongTinhBH * Number(cauHinh.tyLeBHYT_DN) / 100);
    const bhtnDN = Math.round(luongTinhBH * Number(cauHinh.tyLeBHTN_DN) / 100);
    const tongBHDN = bhxhDN + bhytDN + bhtnDN;

    return {
      luongDongBHXH: luongTinhBH,
      bhxhNV,
      bhytNV,
      bhtnNV,
      tongBHNV,
      bhxhDN,
      bhytDN,
      bhtnDN,
      tongBHDN,
    };
  }

  // ============================================
  // TÍNH THUẾ TNCN
  // ============================================

  // Lấy cấu hình thuế TNCN theo năm (có cache 24h)
  async layCauHinhThue(nam: number) {
    const cacheKey = CACHE_KEYS.CAU_HINH_THUE(nam);
    
    return this.cacheService.getOrSet(
      cacheKey,
      async () => {
        const cauHinh = await this.prisma.cauHinhThueTNCN.findUnique({
          where: { nam },
          include: {
            bacThue: {
              orderBy: { bac: 'asc' },
            },
          },
        });

        if (!cauHinh) {
          throw new NotFoundException(`Không tìm thấy cấu hình thuế TNCN năm ${nam}`);
        }

        return cauHinh;
      },
      CACHE_TTL.LONG, // 24 hours
    );
  }

  // Lưu cấu hình thuế và invalidate cache
  async luuCauHinhThue(data: {
    nam: number;
    giamTruBanThan: number;
    giamTruPhuThuoc: number;
  }) {
    const result = await this.prisma.cauHinhThueTNCN.upsert({
      where: { nam: data.nam },
      update: data,
      create: data,
    });

    // Invalidate cache
    await this.cacheService.del(CACHE_KEYS.CAU_HINH_THUE(data.nam));
    await this.cacheService.del(CACHE_KEYS.CAU_HINH_THUE_ALL);
    await this.cacheService.del(CACHE_KEYS.BAC_THUE(data.nam));

    return result;
  }

  // Tính thuế TNCN cho một nhân viên
  async tinhThueTNCN(
    thuNhapChiuThue: number,
    giamTruBHXH: number,
    soPhuThuoc: number,
    nam: number,
  ): Promise<KetQuaTinhThue> {
    const cauHinh = await this.layCauHinhThue(nam);

    const giamTruBanThan = Number(cauHinh.giamTruBanThan);
    const giamTruPhuThuoc = soPhuThuoc * Number(cauHinh.giamTruPhuThuoc);

    // Thu nhập tính thuế = Thu nhập chịu thuế - Giảm trừ bản thân - Giảm trừ người phụ thuộc - BHXH
    let thuNhapTinhThue = thuNhapChiuThue - giamTruBanThan - giamTruPhuThuoc - giamTruBHXH;
    thuNhapTinhThue = Math.max(0, thuNhapTinhThue);

    // Tính thuế theo biểu lũy tiến
    let thueTNCN = 0;
    let bacThueApDung: number | null = null;

    if (thuNhapTinhThue > 0 && cauHinh.bacThue.length > 0) {
      // Tìm bậc thuế áp dụng và tính thuế theo công thức nhanh
      for (const bac of cauHinh.bacThue) {
        const denMuc = bac.denMuc ? Number(bac.denMuc) : Infinity;
        if (thuNhapTinhThue <= denMuc) {
          thueTNCN = Math.round(
            thuNhapTinhThue * Number(bac.thueSuat) / 100 - Number(bac.soTienTruNhanh),
          );
          bacThueApDung = bac.bac;
          break;
        }
      }
    }

    thueTNCN = Math.max(0, thueTNCN);

    return {
      thuNhapChiuThue,
      giamTruBanThan,
      soPhuThuoc,
      giamTruPhuThuoc,
      giamTruBHXH,
      thuNhapTinhThue,
      thueTNCN,
      bacThueApDung,
    };
  }

  // ============================================
  // TÍNH BHXH/THUẾ CHO BẢNG LƯƠNG
  // ============================================

  // Tính BHXH/Thuế cho toàn bộ bảng lương
  async tinhChoToBoNhanVien(bangLuongId: number) {
    // Lấy thông tin bảng lương
    const bangLuong = await this.prisma.bangLuong.findUnique({
      where: { id: bangLuongId },
      include: {
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

    // Nhóm chi tiết theo nhân viên
    const chiTietTheoNV = new Map<number, typeof bangLuong.chiTiets>();
    for (const ct of bangLuong.chiTiets) {
      if (!chiTietTheoNV.has(ct.nhanVienId)) {
        chiTietTheoNV.set(ct.nhanVienId, []);
      }
      chiTietTheoNV.get(ct.nhanVienId)!.push(ct);
    }

    const ketQua: {
      nhanVienId: number;
      hoTen: string;
      bhxh: KetQuaTinhBHXH;
      thue: KetQuaTinhThue;
    }[] = [];

    // Lấy/tạo khoản BHXH và Thuế TNCN nếu chưa có
    let khoanBHXH = await this.prisma.khoanLuong.findUnique({
      where: { maKhoan: 'BHXH_NV' },
    });
    if (!khoanBHXH) {
      khoanBHXH = await this.prisma.khoanLuong.create({
        data: {
          maKhoan: 'BHXH_NV',
          tenKhoan: 'BHXH/BHYT/BHTN (NV đóng)',
          loai: 'KHAU_TRU',
          chiuThue: false,
          thuTu: 100,
        },
      });
    }

    let khoanThue = await this.prisma.khoanLuong.findUnique({
      where: { maKhoan: 'THUE_TNCN' },
    });
    if (!khoanThue) {
      khoanThue = await this.prisma.khoanLuong.create({
        data: {
          maKhoan: 'THUE_TNCN',
          tenKhoan: 'Thuế TNCN',
          loai: 'KHAU_TRU',
          chiuThue: false,
          thuTu: 101,
        },
      });
    }

    for (const [nhanVienId, chiTiets] of chiTietTheoNV) {
      const nhanVien = chiTiets[0].nhanVien;

      // Tính tổng thu nhập chịu thuế
      let tongThuNhap = 0;
      let luongDongBHXH = 0;

      for (const ct of chiTiets) {
        const soTien = Number(ct.soTien);
        if (ct.khoanLuong.loai === 'THU_NHAP') {
          tongThuNhap += soTien;
          // Lương cơ bản là căn cứ đóng BHXH
          if (ct.khoanLuong.maKhoan === 'LUONG_CO_BAN') {
            luongDongBHXH = soTien;
          }
        }
      }

      // Nếu không có lương cơ bản, dùng tổng thu nhập
      if (luongDongBHXH === 0) {
        luongDongBHXH = Number(nhanVien.luongCoBan);
      }

      // Kiểm tra nhân viên có đóng BHXH không - nếu không thì set BHXH = 0
      let bhxh: KetQuaTinhBHXH;
      if (nhanVien.dongBHXH === false) {
        // Nhân viên không đóng BHXH - set tất cả = 0
        bhxh = {
          luongDongBHXH: 0,
          bhxhNV: 0,
          bhytNV: 0,
          bhtnNV: 0,
          tongBHNV: 0,
          bhxhDN: 0,
          bhytDN: 0,
          bhtnDN: 0,
          tongBHDN: 0,
        };
      } else {
        // Tính BHXH bình thường
        bhxh = await this.tinhBHXH(luongDongBHXH, bangLuong.nam);
      }

      // Đếm người phụ thuộc
      const soPhuThuoc = await this.demNguoiPhuThuocHopLe(
        nhanVienId,
        bangLuong.thang,
        bangLuong.nam,
      );

      // Tính thuế TNCN
      const thue = await this.tinhThueTNCN(
        tongThuNhap,
        bhxh.tongBHNV,
        soPhuThuoc,
        bangLuong.nam,
      );

      // Lưu kết quả tính BHXH
      await this.prisma.bangTinhBHXH.upsert({
        where: {
          bangLuongId_nhanVienId: {
            bangLuongId,
            nhanVienId,
          },
        },
        update: {
          luongDongBHXH: bhxh.luongDongBHXH,
          bhxhNV: bhxh.bhxhNV,
          bhytNV: bhxh.bhytNV,
          bhtnNV: bhxh.bhtnNV,
          tongBHNV: bhxh.tongBHNV,
          bhxhDN: bhxh.bhxhDN,
          bhytDN: bhxh.bhytDN,
          bhtnDN: bhxh.bhtnDN,
          tongBHDN: bhxh.tongBHDN,
        },
        create: {
          bangLuongId,
          nhanVienId,
          luongDongBHXH: bhxh.luongDongBHXH,
          bhxhNV: bhxh.bhxhNV,
          bhytNV: bhxh.bhytNV,
          bhtnNV: bhxh.bhtnNV,
          tongBHNV: bhxh.tongBHNV,
          bhxhDN: bhxh.bhxhDN,
          bhytDN: bhxh.bhytDN,
          bhtnDN: bhxh.bhtnDN,
          tongBHDN: bhxh.tongBHDN,
        },
      });

      // Lưu kết quả tính thuế
      await this.prisma.bangTinhThue.upsert({
        where: {
          bangLuongId_nhanVienId: {
            bangLuongId,
            nhanVienId,
          },
        },
        update: {
          thuNhapChiuThue: thue.thuNhapChiuThue,
          giamTruBanThan: thue.giamTruBanThan,
          soPhuThuoc: thue.soPhuThuoc,
          giamTruPhuThuoc: thue.giamTruPhuThuoc,
          giamTruBHXH: thue.giamTruBHXH,
          thuNhapTinhThue: thue.thuNhapTinhThue,
          thueTNCN: thue.thueTNCN,
          bacThueApDung: thue.bacThueApDung,
        },
        create: {
          bangLuongId,
          nhanVienId,
          thuNhapChiuThue: thue.thuNhapChiuThue,
          giamTruBanThan: thue.giamTruBanThan,
          soPhuThuoc: thue.soPhuThuoc,
          giamTruPhuThuoc: thue.giamTruPhuThuoc,
          giamTruBHXH: thue.giamTruBHXH,
          thuNhapTinhThue: thue.thuNhapTinhThue,
          thueTNCN: thue.thueTNCN,
          bacThueApDung: thue.bacThueApDung,
        },
      });

      // Cập nhật/tạo chi tiết bảng lương cho BHXH
      if (bhxh.tongBHNV > 0) {
        await this.prisma.chiTietBangLuong.upsert({
          where: {
            bangLuongId_nhanVienId_khoanLuongId: {
              bangLuongId,
              nhanVienId,
              khoanLuongId: khoanBHXH.id,
            },
          },
          update: { soTien: bhxh.tongBHNV },
          create: {
            bangLuongId,
            nhanVienId,
            khoanLuongId: khoanBHXH.id,
            soTien: bhxh.tongBHNV,
            nguon: 'NHAP_TAY',
          },
        });
      }

      // Cập nhật/tạo chi tiết bảng lương cho Thuế TNCN
      if (thue.thueTNCN > 0) {
        await this.prisma.chiTietBangLuong.upsert({
          where: {
            bangLuongId_nhanVienId_khoanLuongId: {
              bangLuongId,
              nhanVienId,
              khoanLuongId: khoanThue.id,
            },
          },
          update: { soTien: thue.thueTNCN },
          create: {
            bangLuongId,
            nhanVienId,
            khoanLuongId: khoanThue.id,
            soTien: thue.thueTNCN,
            nguon: 'NHAP_TAY',
          },
        });
      }

      ketQua.push({
        nhanVienId,
        hoTen: nhanVien.hoTen,
        bhxh,
        thue,
      });
    }

    return ketQua;
  }

  // Lấy kết quả tính BHXH/Thuế của bảng lương
  async layKetQuaTinh(bangLuongId: number) {
    const [bhxhList, thueList] = await Promise.all([
      this.prisma.bangTinhBHXH.findMany({
        where: { bangLuongId },
      }),
      this.prisma.bangTinhThue.findMany({
        where: { bangLuongId },
      }),
    ]);

    return {
      bhxh: bhxhList,
      thue: thueList,
    };
  }
}
