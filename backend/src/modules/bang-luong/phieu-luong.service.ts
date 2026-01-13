// Service Phiếu Lương - Xử lý logic tạo và gửi phiếu lương
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { EmailService, PhieuLuongData } from '../email/email.service';
import { TinhLuongService } from './tinh-luong.service';

@Injectable()
export class PhieuLuongService {
  constructor(
    private prisma: PrismaService,
    private emailService: EmailService,
    private tinhLuongService: TinhLuongService,
  ) {}

  // Tính số ngày công lý thuyết trong tháng
  private tinhSoNgayCongLyThuyet(thang: number, nam: number): number {
    const soNgayTrongThang = new Date(nam, thang, 0).getDate();
    let soNgayThuBay = 0;
    let soNgayChuNhat = 0;

    for (let ngay = 1; ngay <= soNgayTrongThang; ngay++) {
      const date = new Date(nam, thang - 1, ngay);
      const thuTrongTuan = date.getDay();
      if (thuTrongTuan === 0) soNgayChuNhat++;
      if (thuTrongTuan === 6) soNgayThuBay++;
    }

    return soNgayTrongThang - soNgayChuNhat - (soNgayThuBay * 0.5);
  }

  // Lấy dữ liệu phiếu lương của 1 nhân viên
  async layPhieuLuong(
    bangLuongId: number,
    nhanVienId: number,
  ): Promise<PhieuLuongData> {
    // Lấy thông tin bảng lương
    const bangLuong = await this.prisma.bangLuong.findUnique({
      where: { id: bangLuongId },
      include: { phongBan: true },
    });

    if (!bangLuong) {
      throw new NotFoundException(`Không tìm thấy bảng lương ID: ${bangLuongId}`);
    }

    // Lấy thông tin nhân viên
    const nhanVien = await this.prisma.nhanVien.findUnique({
      where: { id: nhanVienId },
    });

    if (!nhanVien) {
      throw new NotFoundException(`Không tìm thấy nhân viên ID: ${nhanVienId}`);
    }

    // Lấy chi tiết lương
    const chiTiets = await this.prisma.chiTietBangLuong.findMany({
      where: {
        bangLuongId,
        nhanVienId,
      },
      include: {
        khoanLuong: true,
      },
      orderBy: {
        khoanLuong: { thuTu: 'asc' },
      },
    });

    // Tính tổng
    let tongThuNhap = 0;
    let tongKhauTru = 0;
    const cacKhoanLuong = chiTiets.map((ct) => {
      const soTien = Number(ct.soTien);
      if (ct.khoanLuong.loai === 'THU_NHAP') {
        tongThuNhap += soTien;
      } else {
        tongKhauTru += soTien;
      }
      return {
        tenKhoan: ct.khoanLuong.tenKhoan,
        loai: ct.khoanLuong.loai as 'THU_NHAP' | 'KHAU_TRU',
        soTien,
      };
    });

    // Tính ngày công lý thuyết
    const ngayCongLyThuyet = this.tinhSoNgayCongLyThuyet(bangLuong.thang, bangLuong.nam);

    // Lấy ngày công thực tế từ bảng NgayCongBangLuong hoặc tính từ chi tiết
    const ngayCongRecord = await this.prisma.ngayCongBangLuong.findFirst({
      where: {
        bangLuongId,
        nhanVienId,
      },
    });

    let ngayCongThucTe = ngayCongLyThuyet;
    if (ngayCongRecord) {
      // Nếu có điều chỉnh thủ công, dùng giá trị đó
      if (ngayCongRecord.ngayCongDieuChinh !== null) {
        ngayCongThucTe = Number(ngayCongRecord.ngayCongDieuChinh);
      } else {
        // Tính từ số công thực tế + nghỉ có phép
        ngayCongThucTe = Number(ngayCongRecord.soCongThucTe) + Number(ngayCongRecord.soNgayNghiPhep);
      }
    }

    return {
      hoTen: nhanVien.hoTen,
      maNhanVien: nhanVien.maNhanVien,
      email: nhanVien.email || '',
      phongBan: bangLuong.phongBan.tenPhongBan,
      chucVu: nhanVien.chucVu || '',
      thang: bangLuong.thang,
      nam: bangLuong.nam,
      ngayCongThucTe,
      ngayCongLyThuyet,
      cacKhoanLuong,
      tongThuNhap,
      tongKhauTru,
      thucLinh: tongThuNhap - tongKhauTru,
    };
  }

  // Lấy HTML phiếu lương (cho frontend render/xuất ảnh)
  async layPhieuLuongHtml(
    bangLuongId: number,
    nhanVienId: number,
  ): Promise<{ html: string; data: PhieuLuongData }> {
    const data = await this.layPhieuLuong(bangLuongId, nhanVienId);
    const html = this.emailService.getPayslipHtml(data);
    return { html, data };
  }

  // Gửi phiếu lương qua email cho 1 nhân viên
  async guiPhieuLuong(
    bangLuongId: number,
    nhanVienId: number,
  ): Promise<{ success: boolean; message: string }> {
    const data = await this.layPhieuLuong(bangLuongId, nhanVienId);
    return this.emailService.sendPayslip(data);
  }

  // Gửi phiếu lương cho tất cả nhân viên trong bảng lương
  async guiTatCaPhieuLuong(bangLuongId: number): Promise<{
    success: number;
    failed: number;
    errors: string[];
  }> {
    // Lấy danh sách nhân viên trong bảng lương
    const chiTiets = await this.prisma.chiTietBangLuong.findMany({
      where: { bangLuongId },
      select: { nhanVienId: true },
      distinct: ['nhanVienId'],
    });

    const nhanVienIds = [...new Set(chiTiets.map((ct) => ct.nhanVienId))];

    // Lấy dữ liệu phiếu lương cho từng nhân viên
    const dataList: PhieuLuongData[] = [];
    for (const nhanVienId of nhanVienIds) {
      try {
        const data = await this.layPhieuLuong(bangLuongId, nhanVienId);
        dataList.push(data);
      } catch (error) {
        // Bỏ qua nếu không lấy được dữ liệu
        console.error(`Không lấy được phiếu lương NV ${nhanVienId}:`, error);
      }
    }

    return this.emailService.sendPayslipBulk(dataList);
  }
}
