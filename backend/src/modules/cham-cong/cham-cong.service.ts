// Service Chấm công
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { LoaiNgayCong, TrangThaiChamCong } from '@prisma/client';

@Injectable()
export class ChamCongService {
  constructor(private prisma: PrismaService) {}

  // ============================================
  // TÍNH SỐ NGÀY CÔNG LÝ THUYẾT
  // Theo rule: Thứ 7 = 0.5 ngày, Chủ nhật = 0 (nghỉ)
  // ============================================

  /**
   * Tính số ngày công lý thuyết trong tháng
   * Công thức: Tổng ngày trong tháng - (số Chủ nhật × 1) - (số Thứ 7 × 0.5)
   * Ví dụ: Tháng có 30 ngày, 4 CN, 5 T7 → 30 - 4 - (5 × 0.5) = 23.5 ngày
   */
  tinhSoNgayCongLyThuyet(thang: number, nam: number): number {
    // Lấy số ngày trong tháng
    const soNgayTrongThang = new Date(nam, thang, 0).getDate();
    
    let soNgayChuNhat = 0;
    let soNgayThuBay = 0;
    
    // Đếm số Thứ 7 và Chủ nhật trong tháng
    for (let ngay = 1; ngay <= soNgayTrongThang; ngay++) {
      const date = new Date(nam, thang - 1, ngay);
      const thuTrongTuan = date.getDay(); // 0 = Chủ nhật, 6 = Thứ 7
      
      if (thuTrongTuan === 0) {
        soNgayChuNhat++;
      } else if (thuTrongTuan === 6) {
        soNgayThuBay++;
      }
    }
    
    // Ngày công lý thuyết = tổng ngày - CN - (T7 × 0.5)
    const ngayCongLyThuyet = soNgayTrongThang - soNgayChuNhat - (soNgayThuBay * 0.5);
    
    return ngayCongLyThuyet;
  }

  /**
   * Lấy thông tin chi tiết ngày công lý thuyết
   */
  layThongTinNgayCongLyThuyet(thang: number, nam: number) {
    const soNgayTrongThang = new Date(nam, thang, 0).getDate();
    
    let soNgayChuNhat = 0;
    let soNgayThuBay = 0;
    let soNgayThuong = 0;
    
    for (let ngay = 1; ngay <= soNgayTrongThang; ngay++) {
      const date = new Date(nam, thang - 1, ngay);
      const thuTrongTuan = date.getDay();
      
      if (thuTrongTuan === 0) {
        soNgayChuNhat++;
      } else if (thuTrongTuan === 6) {
        soNgayThuBay++;
      } else {
        soNgayThuong++;
      }
    }
    
    const ngayCongLyThuyet = soNgayTrongThang - soNgayChuNhat - (soNgayThuBay * 0.5);
    
    return {
      thang,
      nam,
      soNgayTrongThang,
      soNgayChuNhat,
      soNgayThuBay,
      soNgayThuong,
      ngayCongLyThuyet,
      moTa: `${soNgayTrongThang} ngày - ${soNgayChuNhat} CN - (${soNgayThuBay} T7 × 0.5) = ${ngayCongLyThuyet} ngày`,
    };
  }

  // ============================================
  // CẤU HÌNH PHẠT CHẤM CÔNG
  // ============================================

  // Lấy cấu hình phạt theo năm
  async layCauHinhPhat(nam: number) {
    let cauHinh = await this.prisma.cauHinhPhatChamCong.findUnique({
      where: { nam },
    });

    // Tạo mặc định nếu chưa có
    if (!cauHinh) {
      cauHinh = await this.prisma.cauHinhPhatChamCong.create({
        data: {
          nam,
          phatDiMuon1_3Lan: 100000,
          phatDiMuon4_6Lan: 300000,
          phatDiMuonTren6Lan: 500000,
          phatVeSom1_3Lan: 100000,
          phatVeSom4_6Lan: 300000,
          phatVeSomTren6Lan: 500000,
          phatNghiKhongPhep: 200000,
          truLuongNghiKhongPhep: true,
          gioVaoChuan: '08:00',
          gioRaChuan: '17:00',
          phutChoPhepTre: 5,
        },
      });
    }

    return cauHinh;
  }

  // Cập nhật cấu hình phạt
  async capNhatCauHinhPhat(nam: number, data: {
    phatDiMuon1_3Lan?: number;
    phatDiMuon4_6Lan?: number;
    phatDiMuonTren6Lan?: number;
    phatVeSom1_3Lan?: number;
    phatVeSom4_6Lan?: number;
    phatVeSomTren6Lan?: number;
    phatNghiKhongPhep?: number;
    truLuongNghiKhongPhep?: boolean;
    gioVaoChuan?: string;
    gioRaChuan?: string;
    phutChoPhepTre?: number;
    moTa?: string;
  }) {
    return this.prisma.cauHinhPhatChamCong.upsert({
      where: { nam },
      update: data,
      create: { nam, ...data },
    });
  }

  // Tính tiền phạt cho nhân viên trong tháng
  async tinhTienPhat(nhanVienId: number, thang: number, nam: number) {
    const chamCong = await this.layChamCongNhanVien(nhanVienId, thang, nam);
    if (!chamCong) {
      return { tienPhatDiMuon: 0, tienPhatVeSom: 0, tienPhatNghiKhongPhep: 0, truLuongNgayCong: 0, tongPhat: 0 };
    }

    const cauHinh = await this.layCauHinhPhat(nam);
    const nhanVien = await this.prisma.nhanVien.findUnique({
      where: { id: nhanVienId },
    });

    let tienPhatDiMuon = 0;
    let tienPhatVeSom = 0;
    let tienPhatNghiKhongPhep = 0;
    let truLuongNgayCong = 0;

    // Tính phạt đi muộn
    const soLanDiMuon = chamCong.soLanDiMuon || 0;
    if (soLanDiMuon > 0) {
      if (soLanDiMuon <= 3) {
        tienPhatDiMuon = Number(cauHinh.phatDiMuon1_3Lan);
      } else if (soLanDiMuon <= 6) {
        tienPhatDiMuon = Number(cauHinh.phatDiMuon4_6Lan);
      } else {
        tienPhatDiMuon = Number(cauHinh.phatDiMuonTren6Lan);
      }
    }

    // Tính phạt về sớm
    const soLanVeSom = chamCong.soLanVeSom || 0;
    if (soLanVeSom > 0) {
      if (soLanVeSom <= 3) {
        tienPhatVeSom = Number(cauHinh.phatVeSom1_3Lan);
      } else if (soLanVeSom <= 6) {
        tienPhatVeSom = Number(cauHinh.phatVeSom4_6Lan);
      } else {
        tienPhatVeSom = Number(cauHinh.phatVeSomTren6Lan);
      }
    }

    // Tính phạt nghỉ không phép
    const soNgayNghiKhongLuong = Number(chamCong.soNgayNghiKhongLuong) || 0;
    if (soNgayNghiKhongLuong > 0) {
      tienPhatNghiKhongPhep = soNgayNghiKhongLuong * Number(cauHinh.phatNghiKhongPhep);
      
      // Trừ lương theo ngày công
      if (cauHinh.truLuongNghiKhongPhep && nhanVien) {
        const luongNgay = Number(nhanVien.luongCoBan) / Number(chamCong.soCongChuan);
        truLuongNgayCong = soNgayNghiKhongLuong * luongNgay;
      }
    }

    const tongPhat = tienPhatDiMuon + tienPhatVeSom + tienPhatNghiKhongPhep + truLuongNgayCong;

    return {
      soLanDiMuon,
      soLanVeSom,
      soNgayNghiKhongLuong,
      tienPhatDiMuon,
      tienPhatVeSom,
      tienPhatNghiKhongPhep,
      truLuongNgayCong: Math.round(truLuongNgayCong),
      tongPhat: Math.round(tongPhat),
    };
  }

  // ============================================
  // CHẤM CÔNG THÁNG
  // ============================================

  // Lấy danh sách chấm công theo tháng
  async layDanhSachChamCong(thang: number, nam: number, phongBanId?: number) {
    const where: Record<string, unknown> = { thang, nam };

    const chamCongs = await this.prisma.chamCong.findMany({
      where,
      include: {
        nhanVien: {
          include: {
            phongBan: true,
          },
        },
      },
      orderBy: [
        { nhanVien: { phongBan: { tenPhongBan: 'asc' } } },
        { nhanVien: { hoTen: 'asc' } },
      ],
    });

    // Lọc theo phòng ban nếu có
    if (phongBanId) {
      return chamCongs.filter((cc) => cc.nhanVien.phongBanId === phongBanId);
    }

    return chamCongs;
  }

  // Lấy chấm công của nhân viên
  async layChamCongNhanVien(nhanVienId: number, thang: number, nam: number) {
    return this.prisma.chamCong.findUnique({
      where: {
        nhanVienId_thang_nam: {
          nhanVienId,
          thang,
          nam,
        },
      },
      include: {
        nhanVien: true,
      },
    });
  }

  // Tạo/Cập nhật chấm công tháng
  async luuChamCong(data: {
    nhanVienId: number;
    thang: number;
    nam: number;
    soCongChuan?: number;
    soCongThucTe?: number;
    soNgayNghiPhep?: number;
    soNgayNghiKhongLuong?: number;
    soGioOT?: number;
    soGioOTDem?: number;
    soGioOTChuNhat?: number;
    soGioOTLe?: number;
    soLanDiMuon?: number;
    soLanVeSom?: number;
    ghiChu?: string;
  }) {
    return this.prisma.chamCong.upsert({
      where: {
        nhanVienId_thang_nam: {
          nhanVienId: data.nhanVienId,
          thang: data.thang,
          nam: data.nam,
        },
      },
      update: {
        soCongChuan: data.soCongChuan,
        soCongThucTe: data.soCongThucTe,
        soNgayNghiPhep: data.soNgayNghiPhep,
        soNgayNghiKhongLuong: data.soNgayNghiKhongLuong,
        soGioOT: data.soGioOT,
        soGioOTDem: data.soGioOTDem,
        soGioOTChuNhat: data.soGioOTChuNhat,
        soGioOTLe: data.soGioOTLe,
        soLanDiMuon: data.soLanDiMuon,
        soLanVeSom: data.soLanVeSom,
        ghiChu: data.ghiChu,
      },
      create: data,
      include: {
        nhanVien: true,
      },
    });
  }

  // Tạo chấm công cho tất cả nhân viên trong tháng
  async khoiTaoChamCongThang(thang: number, nam: number, soCongChuan: number = 26) {
    // Lấy danh sách nhân viên đang làm việc
    const nhanViens = await this.prisma.nhanVien.findMany({
      where: { trangThai: 'DANG_LAM' },
    });

    const ketQua: { created: number; skipped: number } = { created: 0, skipped: 0 };

    for (const nv of nhanViens) {
      const existing = await this.prisma.chamCong.findUnique({
        where: {
          nhanVienId_thang_nam: {
            nhanVienId: nv.id,
            thang,
            nam,
          },
        },
      });

      if (!existing) {
        await this.prisma.chamCong.create({
          data: {
            nhanVienId: nv.id,
            thang,
            nam,
            soCongChuan,
            soCongThucTe: soCongChuan, // Mặc định = công chuẩn
          },
        });
        ketQua.created++;
      } else {
        ketQua.skipped++;
      }
    }

    return {
      message: `Đã khởi tạo chấm công tháng ${thang}/${nam}`,
      ...ketQua,
    };
  }

  // ============================================
  // CHI TIẾT CHẤM CÔNG TỪNG NGÀY
  // ============================================

  // Lấy chi tiết chấm công theo ngày
  async layChiTietChamCong(nhanVienId: number, thang: number, nam: number) {
    const ngayDau = new Date(nam, thang - 1, 1);
    const ngayCuoi = new Date(nam, thang, 0);

    return this.prisma.chiTietChamCong.findMany({
      where: {
        nhanVienId,
        ngay: {
          gte: ngayDau,
          lte: ngayCuoi,
        },
      },
      orderBy: { ngay: 'asc' },
    });
  }

  // Lưu chi tiết chấm công
  async luuChiTietChamCong(data: {
    nhanVienId: number;
    ngay: Date;
    gioVao?: Date;
    gioRa?: Date;
    loaiNgay?: LoaiNgayCong;
    trangThai?: TrangThaiChamCong;
    soGioLam?: number;
    soGioOT?: number;
    ghiChu?: string;
  }) {
    return this.prisma.chiTietChamCong.upsert({
      where: {
        nhanVienId_ngay: {
          nhanVienId: data.nhanVienId,
          ngay: data.ngay,
        },
      },
      update: data,
      create: data,
    });
  }

  // Tổng hợp chi tiết thành chấm công tháng
  async tongHopChamCong(nhanVienId: number, thang: number, nam: number) {
    const chiTiets = await this.layChiTietChamCong(nhanVienId, thang, nam);

    let soCongThucTe = 0;
    let soNgayNghiPhep = 0;
    let soNgayNghiKhongLuong = 0;
    let soGioOT = 0;
    let soGioOTDem = 0;
    let soGioOTChuNhat = 0;
    let soGioOTLe = 0;
    let soLanDiMuon = 0;
    let soLanVeSom = 0;

    for (const ct of chiTiets) {
      switch (ct.trangThai) {
        case 'DI_LAM':
        case 'CONG_TAC':
        case 'LAM_TU_XA':
          soCongThucTe += 1;
          break;
        case 'NGHI_PHEP':
          soNgayNghiPhep += 1;
          soCongThucTe += 1; // Nghỉ phép vẫn tính công
          break;
        case 'NGHI_KHONG_LUONG':
          soNgayNghiKhongLuong += 1;
          break;
        case 'NGHI_LE':
        case 'NGHI_BENH':
          soCongThucTe += 1;
          break;
      }

      soGioOT += Number(ct.soGioOT);

      // Phân loại OT theo loại ngày
      switch (ct.loaiNgay) {
        case 'CHU_NHAT':
          soGioOTChuNhat += Number(ct.soGioOT);
          break;
        case 'NGAY_LE':
          soGioOTLe += Number(ct.soGioOT);
          break;
      }

      // Kiểm tra đi muộn (giả sử 8:00 là giờ vào)
      if (ct.gioVao) {
        const gioVao = new Date(ct.gioVao);
        if (gioVao.getHours() > 8 || (gioVao.getHours() === 8 && gioVao.getMinutes() > 0)) {
          soLanDiMuon++;
        }
      }

      // Kiểm tra về sớm (giả sử 17:00 là giờ ra)
      if (ct.gioRa) {
        const gioRa = new Date(ct.gioRa);
        if (gioRa.getHours() < 17) {
          soLanVeSom++;
        }
      }
    }

    // Cập nhật chấm công tháng
    return this.luuChamCong({
      nhanVienId,
      thang,
      nam,
      soCongThucTe,
      soNgayNghiPhep,
      soNgayNghiKhongLuong,
      soGioOT,
      soGioOTDem,
      soGioOTChuNhat,
      soGioOTLe,
      soLanDiMuon,
      soLanVeSom,
    });
  }

  // ============================================
  // IMPORT CHẤM CÔNG
  // ============================================

  // Import chấm công từ dữ liệu
  async importChamCong(
    thang: number,
    nam: number,
    duLieu: {
      maNhanVien: string;
      soCongThucTe?: number;
      soNgayNghiPhep?: number;
      soNgayNghiKhongLuong?: number;
      soGioOT?: number;
      soGioOTDem?: number;
      soGioOTChuNhat?: number;
      soGioOTLe?: number;
      soLanDiMuon?: number;
      soLanVeSom?: number;
    }[],
  ) {
    const ketQua: {
      success: number;
      failed: number;
      errors: { maNhanVien: string; lyDo: string }[];
    } = { success: 0, failed: 0, errors: [] };

    for (const row of duLieu) {
      try {
        // Tìm nhân viên
        const nhanVien = await this.prisma.nhanVien.findUnique({
          where: { maNhanVien: row.maNhanVien },
        });

        if (!nhanVien) {
          ketQua.failed++;
          ketQua.errors.push({
            maNhanVien: row.maNhanVien,
            lyDo: 'Không tìm thấy nhân viên',
          });
          continue;
        }

        await this.luuChamCong({
          nhanVienId: nhanVien.id,
          thang,
          nam,
          soCongThucTe: row.soCongThucTe,
          soNgayNghiPhep: row.soNgayNghiPhep,
          soNgayNghiKhongLuong: row.soNgayNghiKhongLuong,
          soGioOT: row.soGioOT,
          soGioOTDem: row.soGioOTDem,
          soGioOTChuNhat: row.soGioOTChuNhat,
          soGioOTLe: row.soGioOTLe,
          soLanDiMuon: row.soLanDiMuon,
          soLanVeSom: row.soLanVeSom,
        });

        ketQua.success++;
      } catch (error) {
        ketQua.failed++;
        ketQua.errors.push({
          maNhanVien: row.maNhanVien,
          lyDo: error.message,
        });
      }
    }

    return ketQua;
  }

  // ============================================
  // ĐỒNG BỘ TỪ FILE CSV MÁY CHẤM CÔNG
  // ============================================

  /**
   * Xử lý file CSV từ máy chấm công
   * Format: Tên riêng,Họ,ID,Bộ phận,Ngày,Thời gian,Ngày trong tuần,...
   * Mỗi dòng là 1 lần quẹt thẻ (máy chấm công bằng khuôn mặt có thể ghi nhận nhiều lần)
   * 
   * RULE: Mỗi nhân viên trong 1 ngày có 2 lần chấm công:
   * - Giờ VÀO = lần ghi nhận ĐẦU TIÊN trong ngày
   * - Giờ RA = lần ghi nhận CUỐI CÙNG trong ngày
   * 
   * Giờ làm việc được lấy theo PHÒNG BAN của nhân viên
   */
  async dongBoChamCongCSV(csvContent: string) {
    // Lấy tất cả nhân viên với phòng ban để lấy giờ làm việc
    const allNhanVien = await this.prisma.nhanVien.findMany({
      include: { phongBan: true },
    });
    const nhanVienMap = new Map(allNhanVien.map(nv => [nv.maNhanVien, nv]));

    // Parse CSV
    const lines = csvContent.split('\n').filter(line => line.trim());
    
    // Bỏ qua header (4 dòng đầu)
    const dataLines = lines.slice(4);
    
    // Group theo nhân viên + ngày
    const chamCongMap: Map<string, {
      maNhanVien: string;
      ngay: Date;
      thoiGians: Date[];
    }> = new Map();

    for (const line of dataLines) {
      const cols = line.split(',');
      if (cols.length < 6) continue;
      
      // CSV columns: [0]Tên riêng, [1]Họ, [2]ID (mã NV), [3]Bộ phận, [4]Ngày, [5]Thời gian
      // NOTE: Bỏ qua cột [3]Bộ phận từ CSV - phòng ban được lấy từ thông tin nhân viên trong DB
      const maNhanVien = cols[2]?.trim();       // Mã nhân viên
      const ngayStr = cols[4]?.trim();          // DD/MM/YYYY
      const thoiGianStr = cols[5]?.trim();      // HH:mm
      
      if (!maNhanVien || !ngayStr || !thoiGianStr) continue;
      
      // Parse ngày
      const [day, month, year] = ngayStr.split('/').map(Number);
      if (!day || !month || !year) continue;
      
      const ngay = new Date(year, month - 1, day);
      
      // Parse thời gian
      const [gio, phut] = thoiGianStr.split(':').map(Number);
      if (isNaN(gio) || isNaN(phut)) continue;
      
      const thoiGian = new Date(year, month - 1, day, gio, phut);
      
      // Group key
      const key = `${maNhanVien}_${ngayStr}`;
      
      if (!chamCongMap.has(key)) {
        chamCongMap.set(key, {
          maNhanVien,
          ngay,
          thoiGians: [],
        });
      }
      
      chamCongMap.get(key)!.thoiGians.push(thoiGian);
    }

    // Xử lý từng nhân viên + ngày
    const ketQua: {
      tongBanGhi: number;
      tongNgay: number;
      chiTiet: {
        maNhanVien: string;
        ngay: string;
        gioVao: string | null;
        gioRa: string | null;
        diMuon: boolean;
        veSom: boolean;
        phutMuon: number;
        phutSom: number;
        soLanQuet: number;
      }[];
      thongKe: {
        maNhanVien: string;
        thang: number;
        nam: number;
        soCongThucTe: number;
        soLanDiMuon: number;
        soLanVeSom: number;
      }[];
      luuThanhCong: number;
      luuThatBai: number;
      loi: string[];
    } = {
      tongBanGhi: dataLines.length,
      tongNgay: chamCongMap.size,
      chiTiet: [],
      thongKe: [],
      luuThanhCong: 0,
      luuThatBai: 0,
      loi: [],
    };

    // Thống kê theo nhân viên + tháng
    const thongKeMap: Map<string, {
      maNhanVien: string;
      thang: number;
      nam: number;
      soCongThucTe: number;
      soLanDiMuon: number;
      soLanVeSom: number;
    }> = new Map();

    for (const [, data] of chamCongMap) {
      const { maNhanVien, ngay, thoiGians } = data;
      
      // Lấy thông tin nhân viên và phòng ban
      const nhanVien = nhanVienMap.get(maNhanVien);
      if (!nhanVien) {
        ketQua.loi.push(`Không tìm thấy nhân viên: ${maNhanVien}`);
        continue;
      }

      // Lấy giờ làm việc theo phòng ban (fallback về 08:00-17:00 nếu không có)
      const gioVaoChuan = nhanVien.phongBan?.gioVaoChuan || '08:00';
      const gioRaChuan = nhanVien.phongBan?.gioRaChuan || '17:00';
      const phutChoPhep = nhanVien.phongBan?.phutChoPhepTre || 5;
      
      const [gioVaoH, gioVaoM] = gioVaoChuan.split(':').map(Number);
      const [gioRaH, gioRaM] = gioRaChuan.split(':').map(Number);
      
      // Sắp xếp theo thời gian tăng dần
      thoiGians.sort((a, b) => a.getTime() - b.getTime());
      
      // Số lần quẹt thẻ (bao gồm cả lỗi ghi nhận nhiều lần)
      const soLanQuet = thoiGians.length;
      
      if (soLanQuet === 0) continue;

      // RULE: Giờ VÀO = lần quẹt ĐẦU TIÊN, Giờ RA = lần quẹt CUỐI CÙNG
      const gioVao = thoiGians[0];
      const gioRa = soLanQuet > 1 ? thoiGians[soLanQuet - 1] : null;

      // Kiểm tra đi muộn (theo giờ phòng ban)
      let diMuon = false;
      let phutMuon = 0;
      if (gioVao) {
        const gioVaoPhut = gioVao.getHours() * 60 + gioVao.getMinutes();
        const gioChuanPhut = gioVaoH * 60 + gioVaoM + phutChoPhep;
        if (gioVaoPhut > gioChuanPhut) {
          diMuon = true;
          phutMuon = gioVaoPhut - gioChuanPhut;
        }
      }

      // Kiểm tra về sớm (theo giờ phòng ban)
      let veSom = false;
      let phutSom = 0;
      if (gioRa) {
        const gioRaPhut = gioRa.getHours() * 60 + gioRa.getMinutes();
        const gioChuanRaPhut = gioRaH * 60 + gioRaM;
        if (gioRaPhut < gioChuanRaPhut) {
          veSom = true;
          phutSom = gioChuanRaPhut - gioRaPhut;
        }
      }

      // Thêm chi tiết (bao gồm thông tin giờ chuẩn phòng ban)
      ketQua.chiTiet.push({
        maNhanVien,
        ngay: ngay.toISOString().split('T')[0],
        gioVao: gioVao ? `${String(gioVao.getHours()).padStart(2, '0')}:${String(gioVao.getMinutes()).padStart(2, '0')}` : null,
        gioRa: gioRa ? `${String(gioRa.getHours()).padStart(2, '0')}:${String(gioRa.getMinutes()).padStart(2, '0')}` : null,
        diMuon,
        veSom,
        phutMuon,
        phutSom,
        soLanQuet, // Số lần quẹt thẻ trong ngày (bao gồm cả lỗi ghi nhận)
        gioChuanVao: gioVaoChuan, // Giờ chuẩn của phòng ban
        gioChuanRa: gioRaChuan,   // Giờ chuẩn của phòng ban
      } as any);

      // Cập nhật thống kê theo tháng
      const thang = ngay.getMonth() + 1;
      const namNV = ngay.getFullYear();
      const thongKeKey = `${maNhanVien}_${thang}_${namNV}`;
      
      if (!thongKeMap.has(thongKeKey)) {
        thongKeMap.set(thongKeKey, {
          maNhanVien,
          thang,
          nam: namNV,
          soCongThucTe: 0,
          soLanDiMuon: 0,
          soLanVeSom: 0,
        });
      }
      
      const tk = thongKeMap.get(thongKeKey)!;
      tk.soCongThucTe += 1;
      if (diMuon) tk.soLanDiMuon += 1;
      if (veSom) tk.soLanVeSom += 1;

      // Lưu chi tiết chấm công
      try {
        const nhanVien = await this.prisma.nhanVien.findUnique({
          where: { maNhanVien },
        });
        
        if (nhanVien) {
          await this.luuChiTietChamCong({
            nhanVienId: nhanVien.id,
            ngay,
            gioVao: gioVao || undefined,
            gioRa: gioRa || undefined,
            trangThai: 'DI_LAM',
            soGioLam: gioVao && gioRa 
              ? (gioRa.getTime() - gioVao.getTime()) / 1000 / 60 / 60 
              : 0,
          });
        }
      } catch (e) {
        // Ignore duplicate
      }
    }

    // Lưu thống kê tháng
    for (const [, tk] of thongKeMap) {
      ketQua.thongKe.push(tk);
      
      try {
        const nhanVien = await this.prisma.nhanVien.findUnique({
          where: { maNhanVien: tk.maNhanVien },
        });
        
        if (nhanVien) {
          // Lấy chấm công hiện tại
          const ccHienTai = await this.layChamCongNhanVien(nhanVien.id, tk.thang, tk.nam);
          
          await this.luuChamCong({
            nhanVienId: nhanVien.id,
            thang: tk.thang,
            nam: tk.nam,
            soCongThucTe: tk.soCongThucTe,
            soLanDiMuon: tk.soLanDiMuon,
            soLanVeSom: tk.soLanVeSom,
            // Giữ nguyên các trường khác nếu đã có
            soNgayNghiPhep: ccHienTai ? Number(ccHienTai.soNgayNghiPhep) : 0,
            soNgayNghiKhongLuong: ccHienTai ? Number(ccHienTai.soNgayNghiKhongLuong) : 0,
            soGioOT: ccHienTai ? Number(ccHienTai.soGioOT) : 0,
          });
          ketQua.luuThanhCong++;
        } else {
          ketQua.loi.push(`Không tìm thấy nhân viên: ${tk.maNhanVien}`);
          ketQua.luuThatBai++;
        }
      } catch (e) {
        ketQua.loi.push(`Lỗi lưu ${tk.maNhanVien}: ${e.message}`);
        ketQua.luuThatBai++;
      }
    }

    return ketQua;
  }
}
