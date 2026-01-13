// Rule Engine Executor - Core logic chạy rules cho bảng lương
// ĐÂY LÀ HỆ THỐNG THẬT - Tính đúng, giải trình được
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import {
  LoaiRule,
  CheDoGop,
  TrangThaiBangLuong,
  TrangThaiQuyChe,
  NguonChiTiet,
} from '@prisma/client';
import { QuyCheService } from './quy-che.service';
import { SuKienThuongPhatService } from './su-kien-thuong-phat.service';

// Interface dữ liệu nhân viên cho tính toán
interface DuLieuNhanVien {
  nhanVienId: number;
  maNhanVien: string;
  hoTen: string;
  luongCoBan: number;
  capTrachNhiem: number;
  heSoTrachNhiem: number;
  vaiTro: string | null;
  congChuan: number;
  congThucTe: number;
  soGioOT: number;
  soGioOTDem: number;
  soGioOTChuNhat: number;
  soGioOTLe: number;
  soLanDiMuon: number;
  soLanVeSom: number;
  suKien: Record<string, { soLan: number; tongGiaTri: number; tongTien: number }>;
  // Thêm các trường khác khi cần
  [key: string]: unknown;
}

// Interface kết quả tính rule
interface KetQuaRule {
  khoanLuongId: number;
  soTien: number;
  nguon: NguonChiTiet;
  thamChieuId: number;
  giaiThich: string;
  input: Record<string, unknown>;
}

// Interface kết quả chạy engine
export interface KetQuaEngine {
  bangLuongId: number;
  quyCheId: number;
  soNhanVien: number;
  soDongTao: number;
  soTraceGhi: number;
  chiTiet: {
    nhanVienId: number;
    hoTen: string;
    tongThuNhap: number;
    tongKhauTru: number;
    thucNhan: number;
    cacKhoan: { khoanLuong: string; soTien: number }[];
  }[];
  thoiGianXuLy: number; // ms
}

@Injectable()
export class RuleEngineExecutor {
  // Whitelist biến cho phép trong biểu thức
  private readonly BIEN_CHO_PHEP = [
    'LUONG_CO_BAN', 'HE_SO_TRACH_NHIEM', 'CAP_TRACH_NHIEM',
    'CONG_CHUAN', 'CONG_THUC_TE', 'SO_GIO_OT', 'SO_GIO_OT_DEM',
    'SO_GIO_OT_CN', 'SO_GIO_OT_LE', 'SO_LAN_DI_MUON', 'SO_LAN_VE_SOM',
    'DOANH_SO', 'TY_LE_HOA_HONG', 'DIEM_KPI', 'HE_SO_KPI',
  ];

  constructor(
    private prisma: PrismaService,
    private quyCheService: QuyCheService,
    private suKienService: SuKienThuongPhatService,
  ) {}

  // ============================================
  // CHẠY RULE ENGINE CHO BẢNG LƯƠNG
  // ============================================
  async chayRuleEngine(bangLuongId: number, nguoiThucHien?: string): Promise<KetQuaEngine> {
    const batDau = Date.now();

    // 1. Lấy thông tin bảng lương
    const bangLuong = await this.prisma.bangLuong.findUnique({
      where: { id: bangLuongId },
      include: {
        phongBan: true,
      },
    });

    if (!bangLuong) {
      throw new NotFoundException(`Không tìm thấy bảng lương với ID: ${bangLuongId}`);
    }

    // Kiểm tra trạng thái
    if (bangLuong.trangThai !== TrangThaiBangLuong.NHAP) {
      throw new BadRequestException(
        'Chỉ có thể chạy Rule Engine cho bảng lương đang ở trạng thái Nhập'
      );
    }

    // 2. Lấy quy chế hiệu lực
    const quyChe = await this.quyCheService.layQuyCheHieuLuc(
      bangLuong.phongBanId,
      bangLuong.thang,
      bangLuong.nam,
    );

    if (!quyChe) {
      throw new BadRequestException(
        `Không tìm thấy quy chế hiệu lực cho phòng ban ${bangLuong.phongBan.tenPhongBan} tháng ${bangLuong.thang}/${bangLuong.nam}`
      );
    }

    if (quyChe.rules.length === 0) {
      throw new BadRequestException('Quy chế không có rule nào');
    }

    // 3. Lấy danh sách nhân viên thuộc phòng ban
    const nhanViens = await this.prisma.nhanVien.findMany({
      where: {
        phongBanId: bangLuong.phongBanId,
        trangThai: 'DANG_LAM',
      },
      include: {
        nhanVienTrachNhiems: {
          where: {
            tuNgay: { lte: new Date(bangLuong.nam, bangLuong.thang - 1, 28) },
            OR: [
              { denNgay: null },
              { denNgay: { gte: new Date(bangLuong.nam, bangLuong.thang - 1, 1) } },
            ],
          },
          orderBy: { tuNgay: 'desc' },
          take: 1,
        },
      },
    });

    // 4. Xóa chi tiết bảng lương cũ từ RULE (giữ lại các nguồn khác)
    await this.prisma.chiTietBangLuong.deleteMany({
      where: {
        bangLuongId,
        nguon: NguonChiTiet.RULE,
      },
    });

    // Xóa trace cũ
    await this.prisma.ruleTrace.deleteMany({
      where: { bangLuongId },
    });

    // 5. Chạy rules cho từng nhân viên
    const ketQuaChiTiet: KetQuaEngine['chiTiet'] = [];
    let soDongTao = 0;
    let soTraceGhi = 0;

    for (const nhanVien of nhanViens) {
      // Chuẩn bị dữ liệu nhân viên
      const duLieu = await this.chuanBiDuLieuNhanVien(
        nhanVien,
        bangLuong.thang,
        bangLuong.nam,
      );

      // Map để tích lũy các khoản lương
      const ketQuaTheoKhoan: Map<number, KetQuaRule[]> = new Map();

      // Chạy từng rule theo thứ tự ưu tiên
      for (const rule of quyChe.rules) {
        try {
          // Kiểm tra điều kiện
          if (!this.kiemTraDieuKien(rule, duLieu)) {
            continue;
          }

          // Tính toán
          const congThuc = JSON.parse(rule.congThucJson);
          const ketQua = this.tinhToanRule(
            rule.loaiRule,
            congThuc,
            duLieu,
            rule.id,
          );

          if (ketQua.soTien !== 0) {
            if (!ketQuaTheoKhoan.has(rule.khoanLuongId)) {
              ketQuaTheoKhoan.set(rule.khoanLuongId, []);
            }
            ketQuaTheoKhoan.get(rule.khoanLuongId)!.push(ketQua);

            // Ghi trace
            await this.prisma.ruleTrace.create({
              data: {
                bangLuongId,
                nhanVienId: nhanVien.id,
                quyCheId: quyChe.id,
                quyCheRuleId: rule.id,
                khoanLuongId: rule.khoanLuongId,
                inputJson: JSON.stringify(ketQua.input),
                outputSoTien: ketQua.soTien,
                messageGiaiThich: ketQua.giaiThich,
              },
            });
            soTraceGhi++;
          }
        } catch (error) {
          // Ghi trace lỗi
          await this.prisma.ruleTrace.create({
            data: {
              bangLuongId,
              nhanVienId: nhanVien.id,
              quyCheId: quyChe.id,
              quyCheRuleId: rule.id,
              khoanLuongId: rule.khoanLuongId,
              inputJson: JSON.stringify({ error: error.message }),
              outputSoTien: 0,
              messageGiaiThich: `Lỗi: ${error.message}`,
            },
          });
          soTraceGhi++;
        }
      }

      // Gộp kết quả theo chế độ gộp và ghi chi tiết bảng lương
      const cacKhoan: { khoanLuong: string; soTien: number }[] = [];
      let tongThuNhap = 0;
      let tongKhauTru = 0;

      for (const [khoanLuongId, ketQuas] of ketQuaTheoKhoan) {
        // Lấy rule cuối cùng để biết chế độ gộp
        const ruleCuoi = quyChe.rules.find((r) => r.khoanLuongId === khoanLuongId);
        const cheDoGop = ruleCuoi?.cheDoGop || CheDoGop.GHI_DE;

        let soTienCuoiCung = 0;
        let ghiChu = '';

        if (cheDoGop === CheDoGop.CONG_DON) {
          // Cộng dồn tất cả
          soTienCuoiCung = ketQuas.reduce((sum, kq) => sum + kq.soTien, 0);
          ghiChu = ketQuas.map((kq) => kq.giaiThich).join(' + ');
        } else {
          // Ghi đè: lấy kết quả cuối cùng
          const kqCuoi = ketQuas[ketQuas.length - 1];
          soTienCuoiCung = kqCuoi.soTien;
          ghiChu = kqCuoi.giaiThich;
        }

        // Kiểm tra có chi tiết cũ không (từ nguồn khác)
        const chiTietCu = await this.prisma.chiTietBangLuong.findUnique({
          where: {
            bangLuongId_nhanVienId_khoanLuongId: {
              bangLuongId,
              nhanVienId: nhanVien.id,
              khoanLuongId,
            },
          },
        });

        if (chiTietCu) {
          // Cập nhật nếu là nguồn có thể ghi đè
          if (chiTietCu.nguon === NguonChiTiet.NHAP_TAY) {
            // Giữ nguyên giá trị nhập tay
          } else {
            await this.prisma.chiTietBangLuong.update({
              where: { id: chiTietCu.id },
              data: {
                soTien: soTienCuoiCung,
                nguon: NguonChiTiet.RULE,
                ghiChu,
              },
            });
          }
        } else {
          // Tạo mới
          await this.prisma.chiTietBangLuong.create({
            data: {
              bangLuongId,
              nhanVienId: nhanVien.id,
              khoanLuongId,
              soTien: soTienCuoiCung,
              nguon: NguonChiTiet.RULE,
              ghiChu,
            },
          });
          soDongTao++;
        }

        // Lấy thông tin khoản lương để tính tổng
        const khoanLuong = quyChe.rules.find((r) => r.khoanLuongId === khoanLuongId)?.khoanLuong;
        if (khoanLuong) {
          cacKhoan.push({
            khoanLuong: khoanLuong.tenKhoan,
            soTien: soTienCuoiCung,
          });

          if (khoanLuong.loai === 'THU_NHAP') {
            tongThuNhap += soTienCuoiCung;
          } else {
            tongKhauTru += soTienCuoiCung;
          }
        }
      }

      ketQuaChiTiet.push({
        nhanVienId: nhanVien.id,
        hoTen: nhanVien.hoTen,
        tongThuNhap,
        tongKhauTru,
        thucNhan: tongThuNhap - tongKhauTru,
        cacKhoan,
      });
    }

    // 6. Ghi liên kết bảng lương - quy chế
    await this.prisma.bangLuongQuyChe.upsert({
      where: {
        bangLuongId_quyCheId: {
          bangLuongId,
          quyCheId: quyChe.id,
        },
      },
      update: {
        ngayApDung: new Date(),
        nguoiApDung: nguoiThucHien,
      },
      create: {
        bangLuongId,
        quyCheId: quyChe.id,
        nguoiApDung: nguoiThucHien,
      },
    });

    return {
      bangLuongId,
      quyCheId: quyChe.id,
      soNhanVien: nhanViens.length,
      soDongTao,
      soTraceGhi,
      chiTiet: ketQuaChiTiet,
      thoiGianXuLy: Date.now() - batDau,
    };
  }

  // ============================================
  // CHUẨN BỊ DỮ LIỆU NHÂN VIÊN
  // ============================================
  private async chuanBiDuLieuNhanVien(
    nhanVien: {
      id: number;
      maNhanVien: string;
      hoTen: string;
      luongCoBan: unknown;
      phongBanId: number;
      nhanVienTrachNhiems: {
        capTrachNhiem: number;
        heSoTrachNhiem: unknown;
        vaiTro: string | null;
      }[];
    },
    thang: number,
    nam: number,
  ): Promise<DuLieuNhanVien> {
    // Lấy dữ liệu chấm công
    const chamCong = await this.prisma.chamCong.findUnique({
      where: {
        nhanVienId_thang_nam: {
          nhanVienId: nhanVien.id,
          thang,
          nam,
        },
      },
    });

    // Lấy ngày công bảng lương (nếu có điều chỉnh)
    const ngayCong = await this.prisma.ngayCongBangLuong.findFirst({
      where: {
        nhanVienId: nhanVien.id,
        bangLuong: {
          thang,
          nam,
          phongBanId: nhanVien.phongBanId,
        },
      },
    });

    // Lấy sự kiện thưởng/phạt
    const suKien = await this.suKienService.laySuKienChoRuleEngine(
      nhanVien.id,
      nhanVien.phongBanId,
      thang,
      nam,
    );

    const trachNhiem = nhanVien.nhanVienTrachNhiems[0];

    return {
      nhanVienId: nhanVien.id,
      maNhanVien: nhanVien.maNhanVien,
      hoTen: nhanVien.hoTen,
      luongCoBan: Number(nhanVien.luongCoBan),
      capTrachNhiem: trachNhiem?.capTrachNhiem || 0,
      heSoTrachNhiem: Number(trachNhiem?.heSoTrachNhiem || 1),
      vaiTro: trachNhiem?.vaiTro || null,
      congChuan: ngayCong ? Number(ngayCong.ngayCongLyThuyet) : (chamCong ? Number(chamCong.soCongChuan) : 26),
      congThucTe: ngayCong ? Number(ngayCong.soCongThucTe) : (chamCong ? Number(chamCong.soCongThucTe) : 26),
      soGioOT: chamCong ? Number(chamCong.soGioOT) : 0,
      soGioOTDem: chamCong ? Number(chamCong.soGioOTDem) : 0,
      soGioOTChuNhat: chamCong ? Number(chamCong.soGioOTChuNhat) : 0,
      soGioOTLe: chamCong ? Number(chamCong.soGioOTLe) : 0,
      soLanDiMuon: chamCong ? chamCong.soLanDiMuon : 0,
      soLanVeSom: chamCong ? chamCong.soLanVeSom : 0,
      suKien,
    };
  }

  // ============================================
  // KIỂM TRA ĐIỀU KIỆN RULE
  // ============================================
  private kiemTraDieuKien(
    rule: { dieuKienJson: string | null },
    duLieu: DuLieuNhanVien,
  ): boolean {
    if (!rule.dieuKienJson) {
      return true; // Không có điều kiện = áp dụng cho tất cả
    }

    try {
      const dieuKien = JSON.parse(rule.dieuKienJson);
      const apDungCho = dieuKien.apDungCho;

      if (!apDungCho) {
        return true;
      }

      // Kiểm tra vai trò
      if (apDungCho.vaiTro && apDungCho.vaiTro.length > 0) {
        if (!duLieu.vaiTro || !apDungCho.vaiTro.includes(duLieu.vaiTro)) {
          return false;
        }
      }

      // Kiểm tra cấp trách nhiệm
      if (apDungCho.capTrachNhiem && apDungCho.capTrachNhiem.length > 0) {
        if (!apDungCho.capTrachNhiem.includes(duLieu.capTrachNhiem)) {
          return false;
        }
      }

      // Kiểm tra nhân viên cụ thể
      if (apDungCho.nhanVienIds && apDungCho.nhanVienIds.length > 0) {
        if (!apDungCho.nhanVienIds.includes(duLieu.nhanVienId)) {
          return false;
        }
      }

      return true;
    } catch {
      return true; // Lỗi parse = áp dụng cho tất cả
    }
  }

  // ============================================
  // TÍNH TOÁN RULE
  // ============================================
  private tinhToanRule(
    loaiRule: LoaiRule,
    congThuc: unknown,
    duLieu: DuLieuNhanVien,
    ruleId: number,
  ): KetQuaRule {
    const input: Record<string, unknown> = {
      luongCoBan: duLieu.luongCoBan,
      capTrachNhiem: duLieu.capTrachNhiem,
      heSoTrachNhiem: duLieu.heSoTrachNhiem,
    };

    switch (loaiRule) {
      case LoaiRule.CO_DINH: {
        const ct = congThuc as { soTien: number };
        return {
          khoanLuongId: 0,
          soTien: ct.soTien,
          nguon: NguonChiTiet.RULE,
          thamChieuId: ruleId,
          giaiThich: `Số tiền cố định: ${this.formatTien(ct.soTien)}`,
          input,
        };
      }

      case LoaiRule.THEO_HE_SO: {
        const ct = congThuc as { base: string; heSo: number; congThem?: number };
        const base = this.layGiaTriBien(ct.base, duLieu);
        input[ct.base] = base;
        const soTien = Math.round(base * ct.heSo + (ct.congThem || 0));
        return {
          khoanLuongId: 0,
          soTien,
          nguon: NguonChiTiet.RULE,
          thamChieuId: ruleId,
          giaiThich: `${ct.base}(${this.formatTien(base)}) × ${ct.heSo}${ct.congThem ? ` + ${this.formatTien(ct.congThem)}` : ''} = ${this.formatTien(soTien)}`,
          input,
        };
      }

      case LoaiRule.BAC_THANG: {
        const ct = congThuc as { field: string; bac: { from: number; to: number; soTien?: number; heSo?: number }[] };
        const giaTriField = this.layGiaTriBien(ct.field, duLieu);
        input[ct.field] = giaTriField;

        const bacPhuHop = ct.bac.find(
          (b) => giaTriField >= b.from && giaTriField <= b.to
        );

        if (!bacPhuHop) {
          return {
            khoanLuongId: 0,
            soTien: 0,
            nguon: NguonChiTiet.RULE,
            thamChieuId: ruleId,
            giaiThich: `${ct.field} = ${giaTriField}, không thuộc bậc nào`,
            input,
          };
        }

        const soTien = bacPhuHop.soTien || (bacPhuHop.heSo ? Math.round(duLieu.luongCoBan * bacPhuHop.heSo) : 0);
        return {
          khoanLuongId: 0,
          soTien,
          nguon: NguonChiTiet.RULE,
          thamChieuId: ruleId,
          giaiThich: `${ct.field} = ${giaTriField} thuộc bậc ${bacPhuHop.from}-${bacPhuHop.to} → ${this.formatTien(soTien)}`,
          input,
        };
      }

      case LoaiRule.THEO_SU_KIEN: {
        const ct = congThuc as { 
          maSuKien: string; 
          cachTinh: 'CO_DINH' | 'BAC_THANG'; 
          soTienMoiLan?: number;
          bac?: { from: number; to: number; soTienMoiLan?: number }[];
        };
        
        const suKien = duLieu.suKien[ct.maSuKien];
        const soLan = suKien?.soLan || 0;
        input.maSuKien = ct.maSuKien;
        input.soLan = soLan;

        if (soLan === 0) {
          return {
            khoanLuongId: 0,
            soTien: 0,
            nguon: NguonChiTiet.RULE,
            thamChieuId: ruleId,
            giaiThich: `Không có sự kiện ${ct.maSuKien}`,
            input,
          };
        }

        let soTien = 0;
        if (ct.cachTinh === 'CO_DINH') {
          soTien = (ct.soTienMoiLan || 0) * soLan;
        } else if (ct.cachTinh === 'BAC_THANG' && ct.bac) {
          const bacPhuHop = ct.bac.find(
            (b) => soLan >= b.from && soLan <= b.to
          );
          if (bacPhuHop) {
            soTien = (bacPhuHop.soTienMoiLan || 0) * soLan;
          }
        }

        return {
          khoanLuongId: 0,
          soTien,
          nguon: NguonChiTiet.RULE,
          thamChieuId: ruleId,
          giaiThich: `${ct.maSuKien}: ${soLan} lần → ${this.formatTien(soTien)}`,
          input,
        };
      }

      case LoaiRule.CONG_THUC: {
        const ct = congThuc as { bieuThuc: string };
        let bieuThuc = ct.bieuThuc;

        // Map dữ liệu sang tên biến chuẩn
        const bienGiaTri: Record<string, number> = {
          LUONG_CO_BAN: duLieu.luongCoBan,
          HE_SO_TRACH_NHIEM: duLieu.heSoTrachNhiem,
          CAP_TRACH_NHIEM: duLieu.capTrachNhiem,
          CONG_CHUAN: duLieu.congChuan,
          CONG_THUC_TE: duLieu.congThucTe,
          SO_GIO_OT: duLieu.soGioOT,
          SO_GIO_OT_DEM: duLieu.soGioOTDem,
          SO_GIO_OT_CN: duLieu.soGioOTChuNhat,
          SO_GIO_OT_LE: duLieu.soGioOTLe,
          SO_LAN_DI_MUON: duLieu.soLanDiMuon,
          SO_LAN_VE_SOM: duLieu.soLanVeSom,
        };

        // Thay thế biến
        for (const [ten, giaTri] of Object.entries(bienGiaTri)) {
          const regex = new RegExp(`\\b${ten}\\b`, 'g');
          bieuThuc = bieuThuc.replace(regex, String(giaTri));
          input[ten] = giaTri;
        }

        // Tính toán an toàn
        try {
          const safeExpression = bieuThuc.replace(/[^0-9+\-*/().]/g, '');
          const calculate = new Function(`return ${safeExpression}`);
          const soTien = Math.round(calculate());

          return {
            khoanLuongId: 0,
            soTien,
            nguon: NguonChiTiet.RULE,
            thamChieuId: ruleId,
            giaiThich: `${ct.bieuThuc} = ${this.formatTien(soTien)}`,
            input,
          };
        } catch (error) {
          throw new Error(`Lỗi tính biểu thức: ${ct.bieuThuc} - ${error.message}`);
        }
      }

      default:
        return {
          khoanLuongId: 0,
          soTien: 0,
          nguon: NguonChiTiet.RULE,
          thamChieuId: ruleId,
          giaiThich: 'Loại rule không hỗ trợ',
          input,
        };
    }
  }

  // ============================================
  // LẤY GIÁ TRỊ BIẾN TỪ DỮ LIỆU
  // ============================================
  private layGiaTriBien(tenBien: string, duLieu: DuLieuNhanVien): number {
    const mapping: Record<string, keyof DuLieuNhanVien> = {
      LUONG_CO_BAN: 'luongCoBan',
      luong_co_ban: 'luongCoBan',
      HE_SO_TRACH_NHIEM: 'heSoTrachNhiem',
      he_so_trach_nhiem: 'heSoTrachNhiem',
      CAP_TRACH_NHIEM: 'capTrachNhiem',
      cap_trach_nhiem: 'capTrachNhiem',
      CONG_CHUAN: 'congChuan',
      CONG_THUC_TE: 'congThucTe',
      SO_GIO_OT: 'soGioOT',
      SO_LAN_DI_MUON: 'soLanDiMuon',
      SO_LAN_VE_SOM: 'soLanVeSom',
    };

    const key = mapping[tenBien] || tenBien;
    const giaTri = duLieu[key];

    if (typeof giaTri === 'number') {
      return giaTri;
    }

    return 0;
  }

  // ============================================
  // XEM TRACE
  // ============================================
  async xemTrace(bangLuongId: number, nhanVienId?: number) {
    const where: Record<string, unknown> = { bangLuongId };
    if (nhanVienId) {
      where.nhanVienId = nhanVienId;
    }

    return this.prisma.ruleTrace.findMany({
      where,
      include: {
        nhanVien: {
          select: {
            id: true,
            maNhanVien: true,
            hoTen: true,
          },
        },
        quyChe: {
          select: {
            id: true,
            tenQuyChe: true,
            phienBan: true,
          },
        },
        quyCheRule: {
          select: {
            id: true,
            tenRule: true,
            loaiRule: true,
          },
        },
        khoanLuong: {
          select: {
            id: true,
            maKhoan: true,
            tenKhoan: true,
            loai: true,
          },
        },
      },
      orderBy: [
        { nhanVienId: 'asc' },
        { taoLuc: 'asc' },
      ],
    });
  }

  private formatTien(so: number): string {
    return new Intl.NumberFormat('vi-VN').format(so) + 'đ';
  }
}
