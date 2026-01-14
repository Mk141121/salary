// Service quản lý Quy chế Rule - Validate & Preview
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { LoaiRule, CheDoGop, TrangThaiQuyChe, TrangThaiBangLuong } from '@prisma/client';
import {
  TaoQuyCheRuleDto,
  CapNhatQuyCheRuleDto,
  ValidateRuleDto,
  PreviewRuleDto,
  SapXepRuleDto,
  KetQuaValidate,
  KetQuaPreview,
  CongThucBacThang,
  CongThucTheoSuKien,
} from './dto/quy-che-rule.dto';

@Injectable()
export class QuyCheRuleService {
  constructor(private prisma: PrismaService) {}

  // ============================================
  // LẤY DANH SÁCH RULE CỦA QUY CHẾ
  // ============================================
  async layDanhSachTheoQuyChe(quyCheId: number) {
    return this.prisma.quyCheRule.findMany({
      where: { quyCheId },
      orderBy: { thuTuUuTien: 'asc' },
      include: {
        khoanLuong: {
          select: {
            id: true,
            maKhoan: true,
            tenKhoan: true,
            loai: true,
          },
        },
      },
    });
  }

  // ============================================
  // LẤY CHI TIẾT RULE
  // ============================================
  async layChiTiet(id: number) {
    const rule = await this.prisma.quyCheRule.findUnique({
      where: { id },
      include: {
        quyChe: {
          include: {
            phongBan: true,
            bangLuongs: {
              include: {
                bangLuong: true,
              },
            },
          },
        },
        khoanLuong: true,
      },
    });

    if (!rule) {
      throw new NotFoundException(`Không tìm thấy rule với ID: ${id}`);
    }

    // Kiểm tra quy chế có đang được sử dụng không
    const daChotLuong = rule.quyChe.bangLuongs.some(
      (bl) => bl.bangLuong.trangThai !== TrangThaiBangLuong.NHAP
    );

    return {
      ...rule,
      daChotLuong,
      coDuocSua: !daChotLuong || rule.quyChe.trangThai === TrangThaiQuyChe.NHAP,
    };
  }

  // ============================================
  // TẠO RULE MỚI
  // ============================================
  async tao(dto: TaoQuyCheRuleDto) {
    // Validate trước khi tạo
    const validateResult = this.validate({
      loaiRule: dto.loaiRule,
      dieuKienJson: dto.dieuKienJson,
      congThucJson: dto.congThucJson,
    });

    if (!validateResult.hopLe) {
      throw new BadRequestException({
        message: 'Rule không hợp lệ',
        loi: validateResult.danhSachLoi,
      });
    }

    // Kiểm tra quy chế tồn tại
    const quyChe = await this.prisma.quyChe.findUnique({
      where: { id: dto.quyCheId },
      include: {
        bangLuongs: {
          include: {
            bangLuong: true,
          },
        },
      },
    });

    if (!quyChe) {
      throw new NotFoundException(`Không tìm thấy quy chế với ID: ${dto.quyCheId}`);
    }

    // Kiểm tra quy chế có thể sửa không
    const daChotLuong = quyChe.bangLuongs.some(
      (bl) => bl.bangLuong.trangThai !== TrangThaiBangLuong.NHAP
    );

    if (daChotLuong && quyChe.trangThai !== TrangThaiQuyChe.NHAP) {
      throw new BadRequestException(
        'Không thể thêm rule vào quy chế đã áp dụng cho bảng lương đã chốt'
      );
    }

    // Kiểm tra khoản lương tồn tại
    const khoanLuong = await this.prisma.khoanLuong.findUnique({
      where: { id: dto.khoanLuongId },
    });

    if (!khoanLuong) {
      throw new NotFoundException(`Không tìm thấy khoản lương với ID: ${dto.khoanLuongId}`);
    }

    // Lấy thứ tự ưu tiên tiếp theo nếu không được chỉ định
    let thuTuUuTien = dto.thuTuUuTien;
    if (thuTuUuTien === undefined) {
      const ruleMax = await this.prisma.quyCheRule.findFirst({
        where: { quyCheId: dto.quyCheId },
        orderBy: { thuTuUuTien: 'desc' },
      });
      thuTuUuTien = (ruleMax?.thuTuUuTien || 0) + 10;
    }

    return this.prisma.quyCheRule.create({
      data: {
        quyCheId: dto.quyCheId,
        khoanLuongId: dto.khoanLuongId,
        tenRule: dto.tenRule,
        moTa: dto.moTa,
        loaiRule: dto.loaiRule,
        dieuKienJson: dto.dieuKienJson ? JSON.stringify(dto.dieuKienJson) : null,
        congThucJson: JSON.stringify(dto.congThucJson),
        thuTuUuTien,
        cheDoGop: dto.cheDoGop || CheDoGop.GHI_DE,
        choPhepChinhTay: dto.choPhepChinhTay ?? true,
        trangThai: true,
        nguoiTao: dto.nguoiTao,
      },
      include: {
        khoanLuong: true,
      },
    });
  }

  // ============================================
  // CẬP NHẬT RULE
  // ============================================
  async capNhat(id: number, dto: CapNhatQuyCheRuleDto) {
    const rule = await this.layChiTiet(id);

    if (!rule.coDuocSua) {
      throw new BadRequestException(
        'Không thể sửa rule thuộc quy chế đã áp dụng cho bảng lương đã chốt'
      );
    }

    // Validate nếu có thay đổi công thức
    if (dto.congThucJson || dto.loaiRule) {
      const validateResult = this.validate({
        loaiRule: dto.loaiRule || rule.loaiRule,
        dieuKienJson: dto.dieuKienJson || (rule.dieuKienJson ? JSON.parse(rule.dieuKienJson) : undefined),
        congThucJson: dto.congThucJson || JSON.parse(rule.congThucJson),
      });

      if (!validateResult.hopLe) {
        throw new BadRequestException({
          message: 'Rule không hợp lệ',
          loi: validateResult.danhSachLoi,
        });
      }
    }

    return this.prisma.quyCheRule.update({
      where: { id },
      data: {
        tenRule: dto.tenRule,
        moTa: dto.moTa,
        loaiRule: dto.loaiRule,
        dieuKienJson: dto.dieuKienJson !== undefined
          ? (dto.dieuKienJson ? JSON.stringify(dto.dieuKienJson) : null)
          : undefined,
        congThucJson: dto.congThucJson
          ? JSON.stringify(dto.congThucJson)
          : undefined,
        thuTuUuTien: dto.thuTuUuTien,
        cheDoGop: dto.cheDoGop,
        choPhepChinhTay: dto.choPhepChinhTay,
        trangThai: dto.trangThai,
      },
      include: {
        khoanLuong: true,
      },
    });
  }

  // ============================================
  // XÓA RULE (SOFT DELETE)
  // ============================================
  async xoa(id: number) {
    const rule = await this.layChiTiet(id);

    if (!rule.coDuocSua) {
      throw new BadRequestException(
        'Không thể xóa rule thuộc quy chế đã áp dụng cho bảng lương đã chốt'
      );
    }

    return this.prisma.quyCheRule.update({
      where: { id },
      data: {
        trangThai: false,
      },
    });
  }

  // ============================================
  // SẮP XẾP RULE (DRAG-DROP)
  // ============================================
  async sapXep(quyCheId: number, dto: SapXepRuleDto) {
    // Kiểm tra quy chế
    const quyChe = await this.prisma.quyChe.findUnique({
      where: { id: quyCheId },
      include: {
        bangLuongs: {
          include: {
            bangLuong: true,
          },
        },
      },
    });

    if (!quyChe) {
      throw new NotFoundException(`Không tìm thấy quy chế với ID: ${quyCheId}`);
    }

    // Kiểm tra có thể sửa không
    const daChotLuong = quyChe.bangLuongs.some(
      (bl) => bl.bangLuong.trangThai !== TrangThaiBangLuong.NHAP
    );

    if (daChotLuong && quyChe.trangThai !== TrangThaiQuyChe.NHAP) {
      throw new BadRequestException(
        'Không thể sắp xếp rule của quy chế đã áp dụng cho bảng lương đã chốt'
      );
    }

    // Cập nhật thứ tự từng rule
    const updates = dto.danhSachRuleId.map((ruleId, index) =>
      this.prisma.quyCheRule.update({
        where: { id: ruleId },
        data: { thuTuUuTien: (index + 1) * 10 },
      })
    );

    await this.prisma.$transaction(updates);

    return this.layDanhSachTheoQuyChe(quyCheId);
  }

  // ============================================
  // VALIDATE RULE
  // ============================================
  validate(dto: ValidateRuleDto): KetQuaValidate {
    const loi: string[] = [];
    const canhBao: string[] = [];

    // Validate theo loại rule
    switch (dto.loaiRule) {
      case LoaiRule.CO_DINH:
        this.validateCoDinh(dto.congThucJson, loi);
        break;

      case LoaiRule.THEO_HE_SO:
        this.validateTheoHeSo(dto.congThucJson, loi);
        break;

      case LoaiRule.BAC_THANG:
        this.validateBacThang(dto.congThucJson as CongThucBacThang, loi, canhBao);
        break;

      case LoaiRule.THEO_SU_KIEN:
        this.validateTheoSuKien(dto.congThucJson as CongThucTheoSuKien, loi);
        break;

      case LoaiRule.CONG_THUC:
        this.validateCongThuc(dto.congThucJson, loi);
        break;
    }

    // Validate điều kiện
    if (dto.dieuKienJson) {
      this.validateDieuKien(dto.dieuKienJson, loi);
    }

    return {
      hopLe: loi.length === 0,
      danhSachLoi: loi,
      canhBao: canhBao.length > 0 ? canhBao : undefined,
    };
  }

  private validateCoDinh(congThuc: unknown, loi: string[]) {
    const ct = congThuc as { soTien?: number };
    if (ct.soTien === undefined || ct.soTien === null) {
      loi.push('Thiếu trường "soTien" cho rule cố định');
    } else if (typeof ct.soTien !== 'number') {
      loi.push('"soTien" phải là số');
    }
  }

  private validateTheoHeSo(congThuc: unknown, loi: string[]) {
    const ct = congThuc as { base?: string; heSo?: number; congThem?: number };
    
    if (!ct.base) {
      loi.push('Thiếu trường "base" (nguồn tính)');
    }
    
    if (ct.heSo === undefined || ct.heSo === null) {
      loi.push('Thiếu trường "heSo"');
    } else if (typeof ct.heSo !== 'number') {
      loi.push('"heSo" phải là số');
    }
  }

  private validateBacThang(congThuc: CongThucBacThang, loi: string[], canhBao: string[]) {
    if (!congThuc.field) {
      loi.push('Thiếu trường "field" (trường dữ liệu để so sánh)');
    }

    if (!congThuc.bac || !Array.isArray(congThuc.bac)) {
      loi.push('Thiếu danh sách "bac" (bậc thang)');
      return;
    }

    if (congThuc.bac.length === 0) {
      loi.push('Danh sách bậc thang không được rỗng');
      return;
    }

    // Kiểm tra từng bậc
    for (let i = 0; i < congThuc.bac.length; i++) {
      const bac = congThuc.bac[i];
      
      if (bac.from === undefined || bac.to === undefined) {
        loi.push(`Bậc ${i + 1}: Thiếu "from" hoặc "to"`);
      } else if (bac.from > bac.to) {
        loi.push(`Bậc ${i + 1}: "from" (${bac.from}) không được lớn hơn "to" (${bac.to})`);
      }

      if (bac.soTien === undefined && bac.heSo === undefined) {
        loi.push(`Bậc ${i + 1}: Thiếu "soTien" hoặc "heSo"`);
      }
    }

    // Kiểm tra chồng chéo bậc
    for (let i = 0; i < congThuc.bac.length; i++) {
      for (let j = i + 1; j < congThuc.bac.length; j++) {
        const bac1 = congThuc.bac[i];
        const bac2 = congThuc.bac[j];

        if (bac1.from <= bac2.to && bac2.from <= bac1.to) {
          canhBao.push(`Bậc ${i + 1} (${bac1.from}-${bac1.to}) chồng chéo với bậc ${j + 1} (${bac2.from}-${bac2.to})`);
        }
      }
    }
  }

  private validateTheoSuKien(congThuc: CongThucTheoSuKien, loi: string[]) {
    if (!congThuc.maSuKien) {
      loi.push('Thiếu "maSuKien"');
    }

    if (!congThuc.cachTinh) {
      loi.push('Thiếu "cachTinh" (CO_DINH hoặc BAC_THANG)');
    }

    if (congThuc.cachTinh === 'CO_DINH' && !congThuc.soTienMoiLan) {
      loi.push('Thiếu "soTienMoiLan" cho cách tính cố định');
    }

    if (congThuc.cachTinh === 'BAC_THANG' && (!congThuc.bac || congThuc.bac.length === 0)) {
      loi.push('Thiếu "bac" cho cách tính bậc thang');
    }
  }

  private validateCongThuc(congThuc: unknown, loi: string[]) {
    const ct = congThuc as { bieuThuc?: string };
    
    if (!ct.bieuThuc) {
      loi.push('Thiếu "bieuThuc"');
      return;
    }

    // Whitelist biến cho phép
    const bienChoPhep = [
      'LUONG_CO_BAN', 'HE_SO_TRACH_NHIEM', 'CAP_TRACH_NHIEM',
      'CONG_CHUAN', 'CONG_THUC_TE', 'SO_GIO_OT', 'SO_GIO_OT_DEM',
      'SO_GIO_OT_CN', 'SO_GIO_OT_LE', 'SO_LAN_DI_MUON', 'SO_LAN_VE_SOM',
      'DOANH_SO', 'TY_LE_HOA_HONG', 'DIEM_KPI', 'HE_SO_KPI',
    ];

    // Kiểm tra ký tự nguy hiểm
    const invalidChars = /[;`'"]/g;
    if (invalidChars.test(ct.bieuThuc)) {
      loi.push('Biểu thức chứa ký tự không hợp lệ');
    }

    // Kiểm tra từ khóa nguy hiểm
    const dangerousKeywords = ['eval', 'function', 'require', 'import', 'export', 'window', 'document', 'process', 'global'];
    for (const keyword of dangerousKeywords) {
      if (ct.bieuThuc.toLowerCase().includes(keyword)) {
        loi.push(`Biểu thức chứa từ khóa không được phép: ${keyword}`);
      }
    }

    // Trích xuất biến từ biểu thức
    const bienTrongBieuThuc = ct.bieuThuc.match(/[A-Z_]+/g) || [];
    for (const bien of bienTrongBieuThuc) {
      if (!bienChoPhep.includes(bien)) {
        loi.push(`Biến "${bien}" không nằm trong danh sách cho phép`);
      }
    }
  }

  private validateDieuKien(dieuKien: unknown, loi: string[]) {
    const dk = dieuKien as { apDungCho?: unknown };
    
    if (dk.apDungCho) {
      const apDung = dk.apDungCho as {
        vaiTro?: unknown[];
        capTrachNhiem?: unknown[];
        nhanVienIds?: unknown[];
      };

      if (apDung.vaiTro && !Array.isArray(apDung.vaiTro)) {
        loi.push('"vaiTro" phải là mảng');
      }

      if (apDung.capTrachNhiem && !Array.isArray(apDung.capTrachNhiem)) {
        loi.push('"capTrachNhiem" phải là mảng');
      }

      if (apDung.nhanVienIds && !Array.isArray(apDung.nhanVienIds)) {
        loi.push('"nhanVienIds" phải là mảng');
      }
    }
  }

  // ============================================
  // PREVIEW RULE (CHẠY THỬ)
  // ============================================
  async preview(dto: PreviewRuleDto): Promise<KetQuaPreview> {
    const quyChe = await this.prisma.quyChe.findUnique({
      where: { id: dto.quyCheId },
      include: {
        rules: {
          where: { trangThai: true },
          orderBy: { thuTuUuTien: 'asc' },
          include: {
            khoanLuong: true,
          },
        },
      },
    });

    if (!quyChe) {
      throw new NotFoundException(`Không tìm thấy quy chế với ID: ${dto.quyCheId}`);
    }

    // Lấy dữ liệu nhân viên nếu có
    let duLieu: Record<string, number> = { ...dto.duLieuGiaLap };

    if (dto.nhanVienId) {
      const nhanVien = await this.prisma.nhanVien.findUnique({
        where: { id: dto.nhanVienId },
        include: {
          nhanVienTrachNhiems: {
            where: {
              denNgay: null,
            },
            orderBy: { tuNgay: 'desc' },
            take: 1,
          },
        },
      });

      if (nhanVien) {
        duLieu = {
          LUONG_CO_BAN: Number(nhanVien.luongCoBan),
          CAP_TRACH_NHIEM: nhanVien.nhanVienTrachNhiems[0]?.capTrachNhiem || 0,
          HE_SO_TRACH_NHIEM: Number(nhanVien.nhanVienTrachNhiems[0]?.heSoTrachNhiem || 1),
          ...dto.duLieuGiaLap, // Override với dữ liệu giả lập
        };
      }
    }

    // Chạy từng rule
    const chiTiet: KetQuaPreview['chiTiet'] = [];
    const trace: KetQuaPreview['trace'] = [];
    let tongTien = 0;

    for (const rule of quyChe.rules) {
      try {
        const congThuc = JSON.parse(rule.congThucJson);
        const dieuKien = rule.dieuKienJson ? JSON.parse(rule.dieuKienJson) : null;

        // Kiểm tra điều kiện (simplified cho preview)
        // TODO: Implement đầy đủ logic kiểm tra điều kiện

        // Tính toán
        const ketQua = await this.tinhToanRule(rule.loaiRule, congThuc, duLieu);

        if (ketQua.soTien !== 0) {
          chiTiet.push({
            khoanLuong: rule.khoanLuong.tenKhoan,
            soTien: ketQua.soTien,
            giaiThich: ketQua.giaiThich,
          });

          if (rule.khoanLuong.loai === 'THU_NHAP') {
            tongTien += ketQua.soTien;
          } else {
            tongTien -= ketQua.soTien;
          }
        }

        trace.push({
          ruleName: rule.tenRule,
          input: duLieu,
          output: ketQua.soTien,
          message: ketQua.giaiThich,
        });
      } catch (error) {
        trace.push({
          ruleName: rule.tenRule,
          input: duLieu,
          output: 0,
          message: `Lỗi: ${error.message}`,
        });
      }
    }

    return {
      tongTien,
      chiTiet,
      trace,
    };
  }

  // ============================================
  // LOGIC TÍNH TOÁN RULE
  // ============================================
  private async tinhToanRule(
    loaiRule: LoaiRule,
    congThuc: unknown,
    duLieu: Record<string, number>,
  ): Promise<{ soTien: number; giaiThich: string }> {
    switch (loaiRule) {
      case LoaiRule.CO_DINH: {
        const ct = congThuc as { soTien: number };
        return {
          soTien: ct.soTien,
          giaiThich: `Số tiền cố định: ${this.formatTien(ct.soTien)}`,
        };
      }

      case LoaiRule.THEO_HE_SO: {
        const ct = congThuc as { base: string; heSo: number; congThem?: number };
        const base = duLieu[ct.base] || 0;
        const soTien = Math.round(base * ct.heSo + (ct.congThem || 0));
        return {
          soTien,
          giaiThich: `${this.formatTien(base)} × ${ct.heSo}${ct.congThem ? ` + ${this.formatTien(ct.congThem)}` : ''} = ${this.formatTien(soTien)}`,
        };
      }

      case LoaiRule.BAC_THANG: {
        const ct = congThuc as CongThucBacThang;
        const giaTriField = duLieu[ct.field.toUpperCase()] || duLieu[ct.field] || 0;
        
        // Tìm bậc phù hợp
        const bacPhuHop = ct.bac.find(
          (b) => giaTriField >= b.from && giaTriField <= b.to
        );

        if (!bacPhuHop) {
          return {
            soTien: 0,
            giaiThich: `Không tìm thấy bậc phù hợp cho ${ct.field} = ${giaTriField}`,
          };
        }

        const soTien = bacPhuHop.soTien || 0;
        return {
          soTien,
          giaiThich: `${ct.field} = ${giaTriField}, thuộc bậc ${bacPhuHop.from}-${bacPhuHop.to} → ${this.formatTien(soTien)}`,
        };
      }

      case LoaiRule.THEO_SU_KIEN: {
        const ct = congThuc as CongThucTheoSuKien;
        const soLan = duLieu[`SO_LAN_${ct.maSuKien}`] || duLieu[ct.maSuKien] || 0;

        if (soLan === 0) {
          return {
            soTien: 0,
            giaiThich: `Không có sự kiện ${ct.maSuKien}`,
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
          soTien,
          giaiThich: `${ct.maSuKien}: ${soLan} lần → ${this.formatTien(soTien)}`,
        };
      }

      case LoaiRule.CONG_THUC: {
        const ct = congThuc as { bieuThuc: string };

        // Tính toán an toàn với expr-eval
        try {
          const { safeEval } = await import('../../common/utils/safe-eval');
          // Convert duLieu sang object chỉ chứa số
          const numericDuLieu: Record<string, number> = {};
          for (const [ten, giaTri] of Object.entries(duLieu)) {
            if (typeof giaTri === 'number') {
              numericDuLieu[ten] = giaTri;
            }
          }
          const soTien = Math.round(safeEval(ct.bieuThuc, numericDuLieu));

          return {
            soTien,
            giaiThich: `${ct.bieuThuc} = ${this.formatTien(soTien)}`,
          };
        } catch (error) {
          return {
            soTien: 0,
            giaiThich: `Lỗi tính biểu thức: ${ct.bieuThuc} - ${error.message}`,
          };
        }
      }

      default:
        return {
          soTien: 0,
          giaiThich: 'Loại rule không hỗ trợ',
        };
    }
  }

  private formatTien(so: number): string {
    return new Intl.NumberFormat('vi-VN').format(so) + 'đ';
  }
}
