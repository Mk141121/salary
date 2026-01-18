// UngLuongCalculatorService - Tính tiền công lũy kế và điều kiện ứng lương
import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

// Cấu hình mặc định cho điều kiện ứng lương
export const CAU_HINH_MAC_DINH = {
  chuyen_can: {
    so_ngay_nghi_toi_da: 2,
    cam_neu_nghi_khong_phep: true,
  },
  ung_luong: {
    ti_le_toi_da: 0.7, // 70% tiền công lũy kế
    lam_tron: 10000, // làm tròn xuống 10,000đ
  },
};

export interface KetQuaTinhLuyKe {
  tienCongLuyKe: number;
  luongCoBan: number;
  luongTheoNgayCong: number;
  sanLuongChiaHang: number;
  giaoHang: number;
  phatChamCong: number;
  thuongPhat: number;
  soNgayCong: number;
  soNgayNghi: number;
  soNgayNghiKhongPhep: number;
  laTamTinh: boolean; // True nếu đang tạm tính theo lịch (chưa có chấm công thực tế)
  inputDataJson: Record<string, unknown>;
}

export interface KetQuaKiemTraDieuKien {
  duocPhepUng: boolean;
  lyDoKhongDat: string | null;
  mucToiDaDuocUng: number;
  chiTiet: {
    viPhamChuyenCan: boolean;
    viPhamNghiKhongPhep: boolean;
    nhanVienKhongHoatDong: boolean;
  };
}

@Injectable()
export class UngLuongCalculatorService {
  private readonly logger = new Logger(UngLuongCalculatorService.name);

  constructor(private prisma: PrismaService) {}

  /**
   * Lấy lương cơ bản hiệu lực từ HopDong tại thời điểm
   */
  async layLuongCoBanHieuLuc(nhanVienId: number, ngay: Date): Promise<number> {
    const hopDong = await this.prisma.nhanVienHopDong.findFirst({
      where: {
        nhanVienId,
        trangThai: 'HIEU_LUC',
        tuNgay: { lte: ngay },
        OR: [{ denNgay: null }, { denNgay: { gte: ngay } }],
      },
      orderBy: { tuNgay: 'desc' },
    });

    if (hopDong) {
      return Number(hopDong.luongCoBan);
    }

    // Fallback: Lấy từ NhanVien
    const nhanVien = await this.prisma.nhanVien.findUnique({
      where: { id: nhanVienId },
    });
    return Number(nhanVien?.luongCoBan || 0);
  }

  /**
   * Tính sản lượng chia hàng lũy kế
   */
  async tinhSanLuongChiaHang(
    nhanVienId: number,
    tuNgay: Date,
    denNgay: Date,
  ): Promise<{ tongSpDat: number; tongSpLoi: number; soTien: number }> {
    const sanLuongs = await this.prisma.sanLuongChiaHang.findMany({
      where: {
        nhanVienId,
        ngay: { gte: tuNgay, lte: denNgay },
      },
    });

    const tongSpDat = sanLuongs.reduce((sum, sl) => sum + sl.soLuongSpDat, 0);
    const tongSpLoi = sanLuongs.reduce((sum, sl) => sum + sl.soLuongSpLoi, 0);

    // Lấy đơn giá từ CauHinhDonGia
    const donGia = await this.prisma.cauHinhDonGia.findFirst({
      where: { maBien: 'DON_GIA_SP', trangThai: true },
    });
    const heSoLoi = await this.prisma.cauHinhDonGia.findFirst({
      where: { maBien: 'HE_SO_LOI_SP', trangThai: true },
    });

    const giaTriDonGia = donGia ? Number(donGia.giaTri) : 1000;
    const giaTriHeSoLoi = heSoLoi ? Number(heSoLoi.giaTri) : 0.5;

    const soTien = tongSpDat * giaTriDonGia - tongSpLoi * giaTriDonGia * giaTriHeSoLoi;

    return { tongSpDat, tongSpLoi, soTien: Math.max(0, soTien) };
  }

  /**
   * Tính giao hàng lũy kế
   */
  async tinhGiaoHang(
    nhanVienId: number,
    tuNgay: Date,
    denNgay: Date,
  ): Promise<{ tongKhoiLuong: number; tongLanTreGio: number; soTien: number }> {
    const giaoHangs = await this.prisma.giaoHang.findMany({
      where: {
        nhanVienId,
        ngay: { gte: tuNgay, lte: denNgay },
      },
    });

    const tongKhoiLuong = giaoHangs.reduce(
      (sum, gh) => sum + Number(gh.khoiLuongThanhCong),
      0,
    );
    const tongLanTreGio = giaoHangs.reduce((sum, gh) => sum + gh.soLanTreGio, 0);

    // Lấy đơn giá từ CauHinhDonGia
    const donGia = await this.prisma.cauHinhDonGia.findFirst({
      where: { maBien: 'DON_GIA_KHOI_LUONG', trangThai: true },
    });
    const phatTre = await this.prisma.cauHinhDonGia.findFirst({
      where: { maBien: 'DON_GIA_PHAT_TRE', trangThai: true },
    });

    const giaTriDonGia = donGia ? Number(donGia.giaTri) : 5000;
    const giaTriPhatTre = phatTre ? Number(phatTre.giaTri) : 50000;

    const soTien = tongKhoiLuong * giaTriDonGia - tongLanTreGio * giaTriPhatTre;

    return { tongKhoiLuong, tongLanTreGio, soTien: Math.max(0, soTien) };
  }

  /**
   * Tính phạt chấm công
   */
  async tinhPhatChamCong(
    nhanVienId: number,
    thang: number,
    nam: number,
  ): Promise<number> {
    const chamCong = await this.prisma.chamCong.findFirst({
      where: { nhanVienId, thang, nam },
    });

    if (!chamCong) return 0;

    const cauHinhPhat = await this.prisma.cauHinhPhatChamCong.findFirst({
      where: { nam },
    });

    if (!cauHinhPhat) return 0;

    let tongPhat = 0;

    // Phạt đi muộn
    const lanDiMuon = chamCong.soLanDiMuon;
    if (lanDiMuon >= 1 && lanDiMuon <= 3) {
      tongPhat += Number(cauHinhPhat.phatDiMuon1_3Lan);
    } else if (lanDiMuon >= 4 && lanDiMuon <= 6) {
      tongPhat += Number(cauHinhPhat.phatDiMuon4_6Lan);
    } else if (lanDiMuon > 6) {
      tongPhat += Number(cauHinhPhat.phatDiMuonTren6Lan);
    }

    // Phạt về sớm
    const lanVeSom = chamCong.soLanVeSom;
    if (lanVeSom >= 1 && lanVeSom <= 3) {
      tongPhat += Number(cauHinhPhat.phatVeSom1_3Lan);
    } else if (lanVeSom >= 4 && lanVeSom <= 6) {
      tongPhat += Number(cauHinhPhat.phatVeSom4_6Lan);
    } else if (lanVeSom > 6) {
      tongPhat += Number(cauHinhPhat.phatVeSomTren6Lan);
    }

    return tongPhat;
  }

  /**
   * Tính số ngày làm việc theo lịch (không tính T7, CN)
   * Dùng khi chưa có dữ liệu chấm công thực tế
   */
  private tinhNgayLamViecTheoLich(tuNgay: Date, denNgay: Date): number {
    let soNgay = 0;
    const currentDate = new Date(tuNgay);
    
    while (currentDate <= denNgay) {
      const dayOfWeek = currentDate.getDay();
      // 0 = Chủ nhật, 6 = Thứ 7
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        soNgay += 1;
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return soNgay;
  }

  /**
   * Tính số công chuẩn trong tháng (không tính T7, CN)
   */
  private tinhSoCongChuanTheoLich(thang: number, nam: number): number {
    const tuNgay = new Date(nam, thang - 1, 1);
    const denNgay = new Date(nam, thang, 0); // Ngày cuối tháng
    return this.tinhNgayLamViecTheoLich(tuNgay, denNgay);
  }

  /**
   * Tính số ngày công và ngày nghỉ lũy kế từ đầu tháng
   * Nếu chưa có dữ liệu chấm công thực tế -> tạm tính theo lịch
   */
  async tinhNgayCong(
    nhanVienId: number,
    tuNgay: Date,
    denNgay: Date,
  ): Promise<{
    soNgayCong: number;
    soNgayNghi: number;
    soNgayNghiKhongPhep: number;
    soCongChuan: number;
    laTamTinh: boolean; // Flag đánh dấu đang tạm tính
  }> {
    const thang = tuNgay.getMonth() + 1;
    const nam = tuNgay.getFullYear();

    // Lấy dữ liệu chấm công thực tế
    const chiTietChamCongs = await this.prisma.chiTietChamCong.findMany({
      where: {
        nhanVienId,
        ngay: { gte: tuNgay, lte: denNgay },
      },
    });

    // Lấy số công chuẩn từ bảng chấm công hoặc tính theo lịch
    const chamCong = await this.prisma.chamCong.findFirst({
      where: { nhanVienId, thang, nam },
    });
    const soCongChuan = chamCong 
      ? Number(chamCong.soCongChuan) 
      : this.tinhSoCongChuanTheoLich(thang, nam);

    // Nếu có dữ liệu chấm công thực tế -> dùng dữ liệu thực tế
    if (chiTietChamCongs.length > 0) {
      let soNgayCong = 0;
      let soNgayNghi = 0;
      let soNgayNghiKhongPhep = 0;

      for (const cc of chiTietChamCongs) {
        switch (cc.trangThai) {
          case 'DI_LAM':
          case 'LAM_TU_XA':
          case 'CONG_TAC':
            soNgayCong += 1;
            break;
          case 'NGHI_PHEP':
          case 'NGHI_LE':
          case 'NGHI_BENH':
            soNgayNghi += 1;
            break;
          case 'NGHI_KHONG_LUONG':
            soNgayNghi += 1;
            soNgayNghiKhongPhep += 1;
            break;
        }
      }

      return { soNgayCong, soNgayNghi, soNgayNghiKhongPhep, soCongChuan, laTamTinh: false };
    }

    // Chưa có dữ liệu chấm công -> Tạm tính theo lịch thời gian làm việc
    // Giả định nhân viên đi làm đầy đủ các ngày trong tuần (T2-T6)
    const ngayHienTai = new Date();
    // Giới hạn denNgay không vượt quá ngày hiện tại
    const denNgayThucTe = denNgay > ngayHienTai ? ngayHienTai : denNgay;
    
    const soNgayCong = this.tinhNgayLamViecTheoLich(tuNgay, denNgayThucTe);
    
    this.logger.log(
      `[Tạm tính] NV ${nhanVienId}: ${soNgayCong} ngày công từ ${tuNgay.toISOString().split('T')[0]} đến ${denNgayThucTe.toISOString().split('T')[0]}`,
    );

    return { 
      soNgayCong, 
      soNgayNghi: 0, 
      soNgayNghiKhongPhep: 0, 
      soCongChuan,
      laTamTinh: true,
    };
  }

  /**
   * Tính thưởng/phạt sự kiện
   */
  async tinhThuongPhat(
    nhanVienId: number,
    tuNgay: Date,
    denNgay: Date,
  ): Promise<{ thuong: number; phat: number }> {
    const suKiens = await this.prisma.suKienThuongPhat.findMany({
      where: {
        nhanVienId,
        ngay: { gte: tuNgay, lte: denNgay },
        trangThai: 'DA_DUYET',
      },
    });

    let thuong = 0;
    let phat = 0;

    for (const sk of suKiens) {
      if (sk.loaiSuKien === 'THUONG') {
        thuong += Number(sk.soTien);
      } else {
        phat += Number(sk.soTien);
      }
    }

    return { thuong, phat };
  }

  /**
   * Tính tiền công lũy kế tổng hợp
   */
  async tinhTienCongLuyKe(
    nhanVienId: number,
    tuNgay: Date,
    denNgay: Date,
  ): Promise<KetQuaTinhLuyKe> {
    const thang = tuNgay.getMonth() + 1;
    const nam = tuNgay.getFullYear();

    // Lấy lương cơ bản
    const luongCoBan = await this.layLuongCoBanHieuLuc(nhanVienId, denNgay);

    // Tính ngày công
    const ngayCong = await this.tinhNgayCong(nhanVienId, tuNgay, denNgay);
    
    // Tính lương theo ngày công (pro-rate)
    const luongTheoNgayCong = ngayCong.soCongChuan > 0
      ? Math.round((luongCoBan * ngayCong.soNgayCong) / ngayCong.soCongChuan)
      : 0;

    // Tính sản lượng
    const sanLuong = await this.tinhSanLuongChiaHang(nhanVienId, tuNgay, denNgay);
    const giaoHang = await this.tinhGiaoHang(nhanVienId, tuNgay, denNgay);

    // Tính phạt chấm công
    const phatChamCong = await this.tinhPhatChamCong(nhanVienId, thang, nam);

    // Tính thưởng/phạt sự kiện
    const thuongPhat = await this.tinhThuongPhat(nhanVienId, tuNgay, denNgay);

    // Tổng tiền công lũy kế
    const tienCongLuyKe =
      luongTheoNgayCong +
      sanLuong.soTien +
      giaoHang.soTien +
      thuongPhat.thuong -
      thuongPhat.phat -
      phatChamCong;

    return {
      tienCongLuyKe: Math.max(0, tienCongLuyKe),
      luongCoBan,
      luongTheoNgayCong,
      sanLuongChiaHang: sanLuong.soTien,
      giaoHang: giaoHang.soTien,
      phatChamCong,
      thuongPhat: thuongPhat.thuong - thuongPhat.phat,
      soNgayCong: ngayCong.soNgayCong,
      soNgayNghi: ngayCong.soNgayNghi,
      soNgayNghiKhongPhep: ngayCong.soNgayNghiKhongPhep,
      laTamTinh: ngayCong.laTamTinh,
      inputDataJson: {
        luongCoBan,
        ngayCong,
        sanLuong,
        giaoHang,
        phatChamCong,
        thuongPhat,
      },
    };
  }

  /**
   * Kiểm tra điều kiện ứng lương
   */
  async kiemTraDieuKien(
    nhanVienId: number,
    tienCongLuyKe: number,
    soNgayNghi: number,
    soNgayNghiKhongPhep: number,
    cauHinhJson?: Record<string, unknown>,
  ): Promise<KetQuaKiemTraDieuKien> {
    const cauHinh = { ...CAU_HINH_MAC_DINH, ...cauHinhJson } as typeof CAU_HINH_MAC_DINH;

    // Kiểm tra nhân viên có đang hoạt động không
    const nhanVien = await this.prisma.nhanVien.findUnique({
      where: { id: nhanVienId },
    });

    const nhanVienKhongHoatDong = nhanVien?.trangThai !== 'DANG_LAM';

    // Kiểm tra chuyên cần
    const viPhamChuyenCan = soNgayNghi > cauHinh.chuyen_can.so_ngay_nghi_toi_da;
    const viPhamNghiKhongPhep =
      cauHinh.chuyen_can.cam_neu_nghi_khong_phep && soNgayNghiKhongPhep > 0;

    // Xác định được phép ứng hay không
    const duocPhepUng =
      !nhanVienKhongHoatDong && !viPhamChuyenCan && !viPhamNghiKhongPhep;

    // Xác định lý do không được ứng
    let lyDoKhongDat: string | null = null;
    if (nhanVienKhongHoatDong) {
      lyDoKhongDat = 'KHONG_HOAT_DONG';
    } else if (viPhamNghiKhongPhep) {
      lyDoKhongDat = 'NGHI_KHONG_PHEP';
    } else if (viPhamChuyenCan) {
      lyDoKhongDat = 'NGHI_QUA_NHIEU';
    }

    // Tính mức tối đa được ứng
    let mucToiDaDuocUng = 0;
    if (duocPhepUng) {
      mucToiDaDuocUng = Math.floor(
        tienCongLuyKe * cauHinh.ung_luong.ti_le_toi_da,
      );
      // Làm tròn xuống
      if (cauHinh.ung_luong.lam_tron > 0) {
        mucToiDaDuocUng =
          Math.floor(mucToiDaDuocUng / cauHinh.ung_luong.lam_tron) *
          cauHinh.ung_luong.lam_tron;
      }
    }

    return {
      duocPhepUng,
      lyDoKhongDat,
      mucToiDaDuocUng,
      chiTiet: {
        viPhamChuyenCan,
        viPhamNghiKhongPhep,
        nhanVienKhongHoatDong,
      },
    };
  }

  /**
   * Tính toán đầy đủ cho một nhân viên
   */
  async tinhToanDayDu(
    nhanVienId: number,
    tuNgay: Date,
    denNgay: Date,
    cauHinhJson?: Record<string, unknown>,
  ): Promise<{
    luyKe: KetQuaTinhLuyKe;
    dieuKien: KetQuaKiemTraDieuKien;
  }> {
    const luyKe = await this.tinhTienCongLuyKe(nhanVienId, tuNgay, denNgay);
    const dieuKien = await this.kiemTraDieuKien(
      nhanVienId,
      luyKe.tienCongLuyKe,
      luyKe.soNgayNghi,
      luyKe.soNgayNghiKhongPhep,
      cauHinhJson,
    );

    return { luyKe, dieuKien };
  }
}
