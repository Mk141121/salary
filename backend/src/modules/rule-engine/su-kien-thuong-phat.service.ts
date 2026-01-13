// Service quản lý Sự kiện thưởng/phạt
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { LoaiSuKien, TrangThaiSuKien } from '@prisma/client';
import {
  TaoSuKienDto,
  CapNhatSuKienDto,
  DuyetSuKienDto,
  DuyetNhieuSuKienDto,
  LocSuKienDto,
  TaoDanhMucSuKienDto,
} from './dto/su-kien.dto';

@Injectable()
export class SuKienThuongPhatService {
  constructor(private prisma: PrismaService) {}

  // ============================================
  // LẤY DANH SÁCH SỰ KIỆN
  // ============================================
  async layDanhSach(filter: LocSuKienDto) {
    const where: Record<string, unknown> = {};

    if (filter.nhanVienId) {
      where.nhanVienId = filter.nhanVienId;
    }

    if (filter.phongBanId) {
      where.phongBanId = filter.phongBanId;
    }

    if (filter.loaiSuKien) {
      where.loaiSuKien = filter.loaiSuKien;
    }

    if (filter.maSuKien) {
      where.maSuKien = filter.maSuKien;
    }

    if (filter.trangThai) {
      where.trangThai = filter.trangThai;
    }

    // Lọc theo tháng/năm
    if (filter.thang && filter.nam) {
      const dauThang = new Date(filter.nam, filter.thang - 1, 1);
      const cuoiThang = new Date(filter.nam, filter.thang, 0);
      where.ngay = {
        gte: dauThang,
        lte: cuoiThang,
      };
    } else if (filter.tuNgay || filter.denNgay) {
      where.ngay = {};
      if (filter.tuNgay) {
        (where.ngay as Record<string, unknown>).gte = filter.tuNgay;
      }
      if (filter.denNgay) {
        (where.ngay as Record<string, unknown>).lte = filter.denNgay;
      }
    }

    return this.prisma.suKienThuongPhat.findMany({
      where,
      include: {
        nhanVien: {
          select: {
            id: true,
            maNhanVien: true,
            hoTen: true,
          },
        },
        phongBan: {
          select: {
            id: true,
            maPhongBan: true,
            tenPhongBan: true,
          },
        },
      },
      orderBy: [
        { ngay: 'desc' },
        { ngayTao: 'desc' },
      ],
    });
  }

  // ============================================
  // LẤY CHI TIẾT SỰ KIỆN
  // ============================================
  async layChiTiet(id: number) {
    const suKien = await this.prisma.suKienThuongPhat.findUnique({
      where: { id },
      include: {
        nhanVien: true,
        phongBan: true,
      },
    });

    if (!suKien) {
      throw new NotFoundException(`Không tìm thấy sự kiện với ID: ${id}`);
    }

    return suKien;
  }

  // ============================================
  // TẠO SỰ KIỆN MỚI
  // ============================================
  async tao(dto: TaoSuKienDto) {
    // Kiểm tra nhân viên tồn tại
    const nhanVien = await this.prisma.nhanVien.findUnique({
      where: { id: dto.nhanVienId },
    });

    if (!nhanVien) {
      throw new NotFoundException(`Không tìm thấy nhân viên với ID: ${dto.nhanVienId}`);
    }

    // Kiểm tra mã sự kiện trong danh mục
    const danhMuc = await this.prisma.danhMucSuKien.findUnique({
      where: { maSuKien: dto.maSuKien },
    });

    // Nếu có danh mục và không truyền số tiền, lấy số tiền mặc định
    let soTien = dto.soTien;
    if (!soTien && danhMuc?.soTienMacDinh) {
      soTien = Number(danhMuc.soTienMacDinh);
    }

    return this.prisma.suKienThuongPhat.create({
      data: {
        nhanVienId: dto.nhanVienId,
        phongBanId: dto.phongBanId,
        ngay: dto.ngay,
        loaiSuKien: dto.loaiSuKien,
        maSuKien: dto.maSuKien,
        giaTri: dto.giaTri || 1,
        soTien: soTien || 0,
        ghiChu: dto.ghiChu,
        trangThai: TrangThaiSuKien.NHAP,
        nguoiTao: dto.nguoiTao,
      },
      include: {
        nhanVien: true,
        phongBan: true,
      },
    });
  }

  // ============================================
  // TẠO NHIỀU SỰ KIỆN (IMPORT)
  // ============================================
  async taoNhieu(dtos: TaoSuKienDto[]) {
    const ketQua = {
      thanhCong: 0,
      thatBai: 0,
      loi: [] as string[],
    };

    for (const dto of dtos) {
      try {
        await this.tao(dto);
        ketQua.thanhCong++;
      } catch (error) {
        ketQua.thatBai++;
        ketQua.loi.push(`NV ${dto.nhanVienId}: ${error.message}`);
      }
    }

    return ketQua;
  }

  // ============================================
  // CẬP NHẬT SỰ KIỆN
  // ============================================
  async capNhat(id: number, dto: CapNhatSuKienDto) {
    const suKien = await this.layChiTiet(id);

    // Chỉ cho phép sửa khi đang ở trạng thái nháp
    if (suKien.trangThai !== TrangThaiSuKien.NHAP) {
      throw new BadRequestException('Chỉ có thể sửa sự kiện đang ở trạng thái Nhập');
    }

    return this.prisma.suKienThuongPhat.update({
      where: { id },
      data: {
        ngay: dto.ngay,
        loaiSuKien: dto.loaiSuKien,
        maSuKien: dto.maSuKien,
        giaTri: dto.giaTri,
        soTien: dto.soTien,
        ghiChu: dto.ghiChu,
      },
      include: {
        nhanVien: true,
        phongBan: true,
      },
    });
  }

  // ============================================
  // DUYỆT SỰ KIỆN
  // ============================================
  async duyet(id: number, dto: DuyetSuKienDto) {
    const suKien = await this.layChiTiet(id);

    if (suKien.trangThai !== TrangThaiSuKien.NHAP) {
      throw new BadRequestException('Chỉ có thể duyệt sự kiện đang ở trạng thái Nhập');
    }

    return this.prisma.suKienThuongPhat.update({
      where: { id },
      data: {
        trangThai: TrangThaiSuKien.DA_DUYET,
        duyetBoi: dto.duyetBoi,
        duyetLuc: new Date(),
        ghiChu: dto.ghiChu || suKien.ghiChu,
      },
      include: {
        nhanVien: true,
        phongBan: true,
      },
    });
  }

  // ============================================
  // DUYỆT NHIỀU SỰ KIỆN
  // ============================================
  async duyetNhieu(dto: DuyetNhieuSuKienDto) {
    return this.prisma.suKienThuongPhat.updateMany({
      where: {
        id: { in: dto.ids },
        trangThai: TrangThaiSuKien.NHAP,
      },
      data: {
        trangThai: TrangThaiSuKien.DA_DUYET,
        duyetBoi: dto.duyetBoi,
        duyetLuc: new Date(),
      },
    });
  }

  // ============================================
  // TỪ CHỐI SỰ KIỆN
  // ============================================
  async tuChoi(id: number, lyDo: string, nguoiTuChoi: string) {
    const suKien = await this.layChiTiet(id);

    if (suKien.trangThai !== TrangThaiSuKien.NHAP) {
      throw new BadRequestException('Chỉ có thể từ chối sự kiện đang ở trạng thái Nhập');
    }

    return this.prisma.suKienThuongPhat.update({
      where: { id },
      data: {
        trangThai: TrangThaiSuKien.TU_CHOI,
        ghiChu: lyDo,
      },
    });
  }

  // ============================================
  // HỦY SỰ KIỆN
  // ============================================
  async huy(id: number) {
    const suKien = await this.layChiTiet(id);

    if (suKien.trangThai === TrangThaiSuKien.DA_DUYET) {
      throw new BadRequestException('Không thể hủy sự kiện đã duyệt');
    }

    return this.prisma.suKienThuongPhat.update({
      where: { id },
      data: {
        trangThai: TrangThaiSuKien.HUY,
      },
    });
  }

  // ============================================
  // THỐNG KÊ SỰ KIỆN THEO NHÂN VIÊN
  // ============================================
  async thongKeTheoNhanVien(nhanVienId: number, thang: number, nam: number) {
    const dauThang = new Date(nam, thang - 1, 1);
    const cuoiThang = new Date(nam, thang, 0);

    const suKiens = await this.prisma.suKienThuongPhat.groupBy({
      by: ['maSuKien', 'loaiSuKien'],
      where: {
        nhanVienId,
        ngay: {
          gte: dauThang,
          lte: cuoiThang,
        },
        trangThai: TrangThaiSuKien.DA_DUYET,
      },
      _sum: {
        giaTri: true,
        soTien: true,
      },
      _count: true,
    });

    // Tính tổng
    let tongThuong = 0;
    let tongPhat = 0;

    for (const sk of suKiens) {
      if (sk.loaiSuKien === LoaiSuKien.THUONG) {
        tongThuong += Number(sk._sum.soTien) || 0;
      } else {
        tongPhat += Number(sk._sum.soTien) || 0;
      }
    }

    return {
      chiTiet: suKiens,
      tongThuong,
      tongPhat,
      chenh: tongThuong - tongPhat,
    };
  }

  // ============================================
  // LẤY SỰ KIỆN CHO RULE ENGINE
  // ============================================
  async laySuKienChoRuleEngine(
    nhanVienId: number,
    phongBanId: number,
    thang: number,
    nam: number,
  ) {
    const dauThang = new Date(nam, thang - 1, 1);
    const cuoiThang = new Date(nam, thang, 0);

    const suKiens = await this.prisma.suKienThuongPhat.findMany({
      where: {
        nhanVienId,
        phongBanId,
        ngay: {
          gte: dauThang,
          lte: cuoiThang,
        },
        trangThai: TrangThaiSuKien.DA_DUYET,
      },
    });

    // Nhóm theo mã sự kiện
    const thongKe: Record<string, { soLan: number; tongGiaTri: number; tongTien: number }> = {};

    for (const sk of suKiens) {
      if (!thongKe[sk.maSuKien]) {
        thongKe[sk.maSuKien] = { soLan: 0, tongGiaTri: 0, tongTien: 0 };
      }
      thongKe[sk.maSuKien].soLan++;
      thongKe[sk.maSuKien].tongGiaTri += Number(sk.giaTri);
      thongKe[sk.maSuKien].tongTien += Number(sk.soTien);
    }

    return thongKe;
  }

  // ============================================
  // DANH MỤC SỰ KIỆN
  // ============================================
  async layDanhMuc(loai?: LoaiSuKien) {
    return this.prisma.danhMucSuKien.findMany({
      where: loai ? { loai, trangThai: true } : { trangThai: true },
      orderBy: [
        { loai: 'asc' },
        { maSuKien: 'asc' },
      ],
    });
  }

  async taoDanhMuc(dto: TaoDanhMucSuKienDto) {
    return this.prisma.danhMucSuKien.create({
      data: {
        maSuKien: dto.maSuKien,
        tenSuKien: dto.tenSuKien,
        loai: dto.loai,
        moTa: dto.moTa,
        soTienMacDinh: dto.soTienMacDinh,
      },
    });
  }

  async khoiTaoDanhMucMau() {
    const danhMucMau = [
      // Phạt
      { maSuKien: 'DI_TRE', tenSuKien: 'Đi trễ', loai: LoaiSuKien.PHAT, soTienMacDinh: 50000 },
      { maSuKien: 'VE_SOM', tenSuKien: 'Về sớm', loai: LoaiSuKien.PHAT, soTienMacDinh: 50000 },
      { maSuKien: 'VANG_MAT_KHONG_PHEP', tenSuKien: 'Vắng mặt không phép', loai: LoaiSuKien.PHAT, soTienMacDinh: 200000 },
      { maSuKien: 'SAI_QUY_TRINH', tenSuKien: 'Sai quy trình', loai: LoaiSuKien.PHAT, soTienMacDinh: 100000 },
      { maSuKien: 'VI_PHAM_NOI_QUY', tenSuKien: 'Vi phạm nội quy', loai: LoaiSuKien.PHAT, soTienMacDinh: 100000 },
      
      // Thưởng
      { maSuKien: 'HOAN_THANH_XUAT_SAC', tenSuKien: 'Hoàn thành xuất sắc', loai: LoaiSuKien.THUONG, soTienMacDinh: 500000 },
      { maSuKien: 'SANG_KIEN', tenSuKien: 'Sáng kiến/Đề xuất', loai: LoaiSuKien.THUONG, soTienMacDinh: 300000 },
      { maSuKien: 'CHUYEN_CAN', tenSuKien: 'Chuyên cần (không nghỉ)', loai: LoaiSuKien.THUONG, soTienMacDinh: 200000 },
      { maSuKien: 'KHACH_HANG_KHEN', tenSuKien: 'Được khách hàng khen', loai: LoaiSuKien.THUONG, soTienMacDinh: 200000 },
      { maSuKien: 'HO_TRO_DONG_NGHIEP', tenSuKien: 'Hỗ trợ đồng nghiệp', loai: LoaiSuKien.THUONG, soTienMacDinh: 100000 },
    ];

    for (const dm of danhMucMau) {
      const existing = await this.prisma.danhMucSuKien.findUnique({
        where: { maSuKien: dm.maSuKien },
      });

      if (!existing) {
        await this.prisma.danhMucSuKien.create({
          data: dm,
        });
      }
    }

    return { message: 'Đã khởi tạo danh mục sự kiện mẫu' };
  }
}
