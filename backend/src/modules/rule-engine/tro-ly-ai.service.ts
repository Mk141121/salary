// Service Trợ lý AI gợi ý Rule
// Xử lý NLP tiếng Việt, mapping alias, chuẩn hoá tiền, parse rule
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { LoaiRule, CheDoGop, TrangThaiAiAudit } from '@prisma/client';
import {
  GoiYRuleDto,
  GoiYRuleResponseDto,
  RuleDeXuat,
  AiContextDto,
  TU_DIEN_ALIAS,
  PATTERN_LOAI_RULE,
  CongThucJsonDeXuat,
  BacThangDeXuat,
  ApDungRuleDeXuatDto,
} from './dto/tro-ly-ai.dto';

@Injectable()
export class TroLyAiService {
  constructor(private prisma: PrismaService) {}

  // ============================================
  // LẤY CONTEXT CHO AI
  // ============================================
  async layContext(phongBanId: number, quyCheId: number): Promise<AiContextDto> {
    // Lấy thông tin phòng ban
    const phongBan = await this.prisma.phongBan.findUnique({
      where: { id: phongBanId },
      select: { id: true, maPhongBan: true, tenPhongBan: true },
    });

    if (!phongBan) {
      throw new NotFoundException(`Không tìm thấy phòng ban với ID: ${phongBanId}`);
    }

    // Lấy thông tin quy chế
    const quyChe = await this.prisma.quyChe.findUnique({
      where: { id: quyCheId },
      select: { id: true, tenQuyChe: true, phienBan: true },
    });

    if (!quyChe) {
      throw new NotFoundException(`Không tìm thấy quy chế với ID: ${quyCheId}`);
    }

    // Lấy danh mục khoản lương
    const khoanLuongs = await this.prisma.khoanLuong.findMany({
      where: { trangThai: true },
      select: { id: true, maKhoan: true, tenKhoan: true, loai: true },
      orderBy: { thuTu: 'asc' },
    });

    // Lấy danh mục sự kiện thưởng/phạt
    const danhMucSuKien = await this.prisma.danhMucSuKien.findMany({
      where: { trangThai: true },
      select: { maSuKien: true, tenSuKien: true, loai: true, soTienMacDinh: true },
    });

    // Lấy danh sách cấp trách nhiệm đang có
    const trachNhiems = await this.prisma.nhanVienTrachNhiem.findMany({
      where: {
        phongBanId,
      },
      select: { capTrachNhiem: true },
      distinct: ['capTrachNhiem'],
    });

    return {
      phongBan,
      quyChe,
      khoanLuongs: khoanLuongs.map((k) => ({
        id: k.id,
        maKhoan: k.maKhoan,
        tenKhoan: k.tenKhoan,
        loai: k.loai,
      })),
      danhMucSuKien: danhMucSuKien.map((s) => ({
        maSuKien: s.maSuKien,
        tenSuKien: s.tenSuKien,
        loai: s.loai,
        soTienMacDinh: Number(s.soTienMacDinh),
      })),
      capTrachNhiems: trachNhiems.map((t) => t.capTrachNhiem),
    };
  }

  // ============================================
  // GỢI Ý RULE TỪ TIẾNG VIỆT
  // ============================================
  async goiYRule(dto: GoiYRuleDto, nguoiTaoId?: number): Promise<GoiYRuleResponseDto> {
    // Lấy context
    const context = await this.layContext(dto.phongBanId, dto.quyCheId);

    // Parse và phân tích nội dung tiếng Việt
    const ketQuaPhanTich = this.phanTichNoiDung(dto.noiDungTiengViet, context);

    // Lưu audit log
    const audit = await this.prisma.aiRuleAudit.create({
      data: {
        nguoiTaoId,
        phongBanId: dto.phongBanId,
        quyCheId: dto.quyCheId,
        promptGoc: dto.noiDungTiengViet,
        responseJson: JSON.stringify(ketQuaPhanTich),
        trangThai: TrangThaiAiAudit.DE_XUAT,
      },
    });

    return {
      ...ketQuaPhanTich,
      // Thêm auditId để frontend dùng khi apply
      auditId: audit.id,
    } as GoiYRuleResponseDto & { auditId: number };
  }

  // ============================================
  // PHÂN TÍCH NỘI DUNG TIẾNG VIỆT
  // ============================================
  private phanTichNoiDung(noiDung: string, context: AiContextDto): GoiYRuleResponseDto {
    const canLamRo: string[] = [];
    const giaiThich: string[] = [];
    const canhBao: string[] = [];

    // Chuẩn hoá text
    const text = noiDung.toLowerCase().trim();

    // Bước 1: Nhận diện loại rule
    const loaiRule = this.nhanDienLoaiRule(text);
    giaiThich.push(`Nhận diện loại rule: ${loaiRule || 'Chưa xác định'}`);

    if (!loaiRule) {
      canLamRo.push('Không thể xác định loại rule. Vui lòng mô tả rõ hơn cách tính.');
      return { hopLeSoBo: false, canLamRo };
    }

    // Bước 2: Nhận diện khoản lương/sự kiện
    const { khoanLuongMa, khoanLuongId, maSuKien } = this.nhanDienKhoanLuong(text, context);
    
    if (!khoanLuongMa && !maSuKien) {
      canLamRo.push('Không xác định được khoản lương hoặc sự kiện. Bạn muốn áp dụng cho khoản nào?');
      canLamRo.push(`Các khoản lương có sẵn: ${context.khoanLuongs.map(k => k.tenKhoan).join(', ')}`);
    }

    // Bước 3: Parse công thức
    const congThucJson = this.parseCongThuc(text, loaiRule, maSuKien, context);
    
    if (!congThucJson) {
      canLamRo.push('Không thể parse được công thức tính. Vui lòng mô tả rõ hơn.');
      return { hopLeSoBo: false, canLamRo };
    }

    // Bước 4: Parse điều kiện áp dụng
    const dieuKienJson = this.parseDieuKien(text, context);

    // Bước 5: Tạo tên rule
    const tenRule = this.taoTenRule(text, loaiRule, khoanLuongMa || maSuKien || '');

    // Kiểm tra các điều kiện cần làm rõ
    if (canLamRo.length > 0) {
      return { hopLeSoBo: false, canLamRo };
    }

    // Tạo rule đề xuất
    const ruleDeXuat: RuleDeXuat = {
      tenRule,
      khoanLuongMa: khoanLuongMa || maSuKien || 'KHAC',
      khoanLuongId,
      loaiRule,
      thuTuUuTien: 10,
      cheDoGop: this.xacDinhCheDoGop(loaiRule),
      choPhepChinhTay: true,
      dieuKienJson,
      congThucJson,
    };

    giaiThich.push(`Tạo rule: ${tenRule}`);
    if (maSuKien) {
      giaiThich.push(`Sự kiện áp dụng: ${maSuKien}`);
    }

    return {
      hopLeSoBo: true,
      canLamRo: [],
      tomTatRule: tenRule,
      ruleDeXuat,
      giaiThich,
      canhBao: canhBao.length > 0 ? canhBao : undefined,
    };
  }

  // ============================================
  // NHẬN DIỆN LOẠI RULE
  // ============================================
  private nhanDienLoaiRule(text: string): LoaiRule | null {
    // Ưu tiên check sự kiện trước
    for (const pattern of PATTERN_LOAI_RULE.THEO_SU_KIEN) {
      if (pattern.test(text)) {
        // Kiểm tra thêm xem có bậc thang không
        for (const bacThangPattern of PATTERN_LOAI_RULE.BAC_THANG) {
          if (bacThangPattern.test(text)) {
            return LoaiRule.THEO_SU_KIEN; // Sự kiện với bậc thang
          }
        }
        return LoaiRule.THEO_SU_KIEN;
      }
    }

    // Check bậc thang
    for (const pattern of PATTERN_LOAI_RULE.BAC_THANG) {
      if (pattern.test(text)) {
        return LoaiRule.BAC_THANG;
      }
    }

    // Check hệ số
    for (const pattern of PATTERN_LOAI_RULE.THEO_HE_SO) {
      if (pattern.test(text)) {
        return LoaiRule.THEO_HE_SO;
      }
    }

    // Check công thức
    for (const pattern of PATTERN_LOAI_RULE.CONG_THUC) {
      if (pattern.test(text)) {
        return LoaiRule.CONG_THUC;
      }
    }

    // Check cố định
    for (const pattern of PATTERN_LOAI_RULE.CO_DINH) {
      if (pattern.test(text)) {
        return LoaiRule.CO_DINH;
      }
    }

    // Mặc định check xem có số tiền không
    if (/\d+\s*(k|tr|nghìn|triệu|đồng)?/i.test(text)) {
      return LoaiRule.CO_DINH;
    }

    return null;
  }

  // ============================================
  // NHẬN DIỆN KHOẢN LƯƠNG/SỰ KIỆN
  // ============================================
  private nhanDienKhoanLuong(text: string, context: AiContextDto): {
    khoanLuongMa?: string;
    khoanLuongId?: number;
    maSuKien?: string;
  } {
    // Tìm trong từ điển alias
    for (const [tuKhoa, mapping] of Object.entries(TU_DIEN_ALIAS)) {
      if (text.includes(tuKhoa)) {
        if (mapping.maSuKien) {
          // Tìm sự kiện trong context
          const suKien = context.danhMucSuKien.find(
            (s) => s.maSuKien === mapping.maSuKien
          );
          if (suKien) {
            return { maSuKien: suKien.maSuKien };
          }
        }
        if (mapping.maKhoan) {
          // Tìm khoản lương trong context
          const khoan = context.khoanLuongs.find(
            (k) => k.maKhoan === mapping.maKhoan
          );
          if (khoan) {
            return { khoanLuongMa: khoan.maKhoan, khoanLuongId: khoan.id };
          }
          return { khoanLuongMa: mapping.maKhoan };
        }
      }
    }

    // Tìm trực tiếp trong danh mục sự kiện
    for (const suKien of context.danhMucSuKien) {
      if (
        text.includes(suKien.tenSuKien.toLowerCase()) ||
        text.includes(suKien.maSuKien.toLowerCase().replace(/_/g, ' '))
      ) {
        return { maSuKien: suKien.maSuKien };
      }
    }

    // Tìm trực tiếp trong khoản lương
    for (const khoan of context.khoanLuongs) {
      if (
        text.includes(khoan.tenKhoan.toLowerCase()) ||
        text.includes(khoan.maKhoan.toLowerCase().replace(/_/g, ' '))
      ) {
        return { khoanLuongMa: khoan.maKhoan, khoanLuongId: khoan.id };
      }
    }

    // Mặc định dựa vào loại
    if (text.includes('phạt') || text.includes('trừ')) {
      return { khoanLuongMa: 'PHAT_KHAC' };
    }
    if (text.includes('thưởng') || text.includes('bonus')) {
      return { khoanLuongMa: 'THUONG_KHAC' };
    }
    if (text.includes('trách nhiệm') || text.includes('tn')) {
      return { khoanLuongMa: 'TRACH_NHIEM' };
    }

    return {};
  }

  // ============================================
  // PARSE CÔNG THỨC
  // ============================================
  private parseCongThuc(
    text: string,
    loaiRule: LoaiRule,
    maSuKien: string | undefined,
    context: AiContextDto
  ): CongThucJsonDeXuat | null {
    switch (loaiRule) {
      case LoaiRule.CO_DINH:
        return this.parseCongThucCoDinh(text);

      case LoaiRule.THEO_HE_SO:
        return this.parseCongThucTheoHeSo(text);

      case LoaiRule.BAC_THANG:
        return this.parseCongThucBacThang(text);

      case LoaiRule.THEO_SU_KIEN:
        return this.parseCongThucTheoSuKien(text, maSuKien, context);

      case LoaiRule.CONG_THUC:
        return this.parseCongThucBieuThuc(text);

      default:
        return null;
    }
  }

  // Parse số tiền từ text (50k = 50000, 1tr = 1000000)
  private parseSoTien(text: string): number | null {
    // Patterns để parse tiền
    const patterns = [
      { regex: /(\d+(?:\.\d+)?)\s*tr(?:iệu)?/i, multiplier: 1000000 },
      { regex: /(\d+(?:\.\d+)?)\s*k/i, multiplier: 1000 },
      { regex: /(\d+(?:\.\d+)?)\s*nghìn/i, multiplier: 1000 },
      { regex: /(\d+(?:\.\d+)?)\s*(?:đồng|vnđ)?$/i, multiplier: 1 },
    ];

    for (const { regex, multiplier } of patterns) {
      const match = text.match(regex);
      if (match) {
        return parseFloat(match[1]) * multiplier;
      }
    }

    // Thử parse số thuần
    const numMatch = text.match(/(\d+(?:,\d{3})*(?:\.\d+)?)/);
    if (numMatch) {
      return parseFloat(numMatch[1].replace(/,/g, ''));
    }

    return null;
  }

  // Parse công thức cố định
  private parseCongThucCoDinh(text: string): { soTien: number } | null {
    const soTien = this.parseSoTien(text);
    if (soTien !== null) {
      return { soTien };
    }
    return null;
  }

  // Parse công thức theo hệ số
  private parseCongThucTheoHeSo(text: string): { base: string; heSo: number; congThem?: number } | null {
    // Pattern: lương cơ bản * 0.15
    const match = text.match(/(.+?)\s*[\*x]\s*(\d+(?:\.\d+)?)/i);
    if (match) {
      const basePart = match[1].toLowerCase().trim();
      const heSo = parseFloat(match[2]);

      // Map base
      let base = 'LUONG_CO_BAN';
      if (basePart.includes('lương cơ bản') || basePart.includes('lcb')) {
        base = 'LUONG_CO_BAN';
      } else if (basePart.includes('trách nhiệm')) {
        base = 'HE_SO_TRACH_NHIEM';
      }

      // Check thêm số cộng thêm
      const congThemMatch = text.match(/\+\s*(\d+(?:\.\d+)?)\s*(k|tr)?/i);
      let congThem: number | undefined;
      if (congThemMatch) {
        congThem = this.parseSoTien(congThemMatch[0]) ?? undefined;
      }

      return { base, heSo, congThem };
    }

    return null;
  }

  // Parse công thức bậc thang
  private parseCongThucBacThang(text: string): { field: string; bac: BacThangDeXuat[] } | null {
    const bac: BacThangDeXuat[] = [];

    // Xác định field
    let field = 'cap_trach_nhiem';
    if (text.includes('cấp') || text.includes('bậc')) {
      field = 'cap_trach_nhiem';
    } else if (text.includes('năm') || text.includes('thâm niên')) {
      field = 'so_nam_lam_viec';
    } else if (text.includes('lần')) {
      field = 'so_lan';
    }

    // Parse các bậc
    // Pattern 1: "cấp 1 500k, cấp 2 1tr"
    const pattern1 = /cấp\s*(\d+)\s*[:\-]?\s*(\d+(?:\.\d+)?)\s*(k|tr|nghìn|triệu)?/gi;
    let match1;
    while ((match1 = pattern1.exec(text)) !== null) {
      const cap = parseInt(match1[1]);
      const soTien = this.parseSoTien(`${match1[2]}${match1[3] || ''}`);
      if (soTien) {
        bac.push({ from: cap, to: cap, soTien });
      }
    }

    // Pattern 2: "1-2 lần 50k, từ lần 3 100k"
    const pattern2 = /(\d+)\s*[–\-]\s*(\d+)\s*(?:lần)?\s*[:\-]?\s*(\d+(?:\.\d+)?)\s*(k|tr|nghìn|triệu)?/gi;
    let match2;
    while ((match2 = pattern2.exec(text)) !== null) {
      const from = parseInt(match2[1]);
      const to = parseInt(match2[2]);
      const soTien = this.parseSoTien(`${match2[3]}${match2[4] || ''}`);
      if (soTien) {
        bac.push({ from, to, soTien });
      }
    }

    // Pattern 3: "từ lần 3 trở lên 100k"
    const pattern3 = /từ\s*(?:lần\s*)?(\d+)\s*(?:trở lên|trở đi)?\s*[:\-]?\s*(\d+(?:\.\d+)?)\s*(k|tr|nghìn|triệu)?/gi;
    let match3;
    while ((match3 = pattern3.exec(text)) !== null) {
      const from = parseInt(match3[1]);
      const soTien = this.parseSoTien(`${match3[2]}${match3[3] || ''}`);
      if (soTien) {
        bac.push({ from, to: 999, soTien });
      }
    }

    if (bac.length > 0) {
      // Sắp xếp theo from
      bac.sort((a, b) => a.from - b.from);
      return { field, bac };
    }

    return null;
  }

  // Parse công thức theo sự kiện
  private parseCongThucTheoSuKien(
    text: string,
    maSuKien: string | undefined,
    context: AiContextDto
  ): { maSuKien: string; cachTinh: 'CO_DINH' | 'BAC_THANG'; soTienMoiLan?: number; bac?: BacThangDeXuat[] } | null {
    // Tìm mã sự kiện
    let suKienMa = maSuKien;
    if (!suKienMa) {
      // Thử tìm từ context
      for (const sk of context.danhMucSuKien) {
        if (text.includes(sk.tenSuKien.toLowerCase())) {
          suKienMa = sk.maSuKien;
          break;
        }
      }
    }

    if (!suKienMa) {
      // Mặc định theo loại
      if (text.includes('đi trễ') || text.includes('muộn')) {
        suKienMa = 'DI_TRE';
      } else if (text.includes('về sớm')) {
        suKienMa = 'VE_SOM';
      } else {
        suKienMa = 'KHAC';
      }
    }

    // Check xem có bậc thang không
    const bacThang = this.parseCongThucBacThang(text);
    if (bacThang && bacThang.bac.length > 0) {
      return {
        maSuKien: suKienMa,
        cachTinh: 'BAC_THANG',
        bac: bacThang.bac.map((b) => ({
          from: b.from,
          to: b.to,
          soTienMoiLan: b.soTien,
        })),
      };
    }

    // Cố định
    const soTien = this.parseSoTien(text);
    if (soTien) {
      return {
        maSuKien: suKienMa,
        cachTinh: 'CO_DINH',
        soTienMoiLan: soTien,
      };
    }

    // Lấy từ danh mục mặc định
    const suKienInfo = context.danhMucSuKien.find((s) => s.maSuKien === suKienMa);
    if (suKienInfo) {
      return {
        maSuKien: suKienMa,
        cachTinh: 'CO_DINH',
        soTienMoiLan: suKienInfo.soTienMacDinh,
      };
    }

    return null;
  }

  // Parse công thức biểu thức
  private parseCongThucBieuThuc(text: string): { bieuThuc: string } | null {
    // Tìm pattern =
    const match = text.match(/=\s*(.+)/);
    if (match) {
      let bieuThuc = match[1].trim();
      // Chuẩn hoá biến
      bieuThuc = bieuThuc
        .replace(/lương cơ bản|lcb/gi, 'LUONG_CO_BAN')
        .replace(/hệ số trách nhiệm|hstn/gi, 'HE_SO_TRACH_NHIEM')
        .replace(/cấp trách nhiệm/gi, 'CAP_TRACH_NHIEM');
      return { bieuThuc };
    }

    return null;
  }

  // ============================================
  // PARSE ĐIỀU KIỆN
  // ============================================
  private parseDieuKien(text: string, context: AiContextDto): { apDungCho: { tatCa?: boolean } } {
    // Mặc định áp dụng cho tất cả
    return {
      apDungCho: {
        tatCa: true,
      },
    };
  }

  // ============================================
  // TẠO TÊN RULE
  // ============================================
  private taoTenRule(text: string, loaiRule: LoaiRule, khoanMa: string): string {
    // Lấy phần đầu của mô tả
    const tenCoBan = text.length > 50 ? text.substring(0, 47) + '...' : text;
    
    // Format tên
    const tenFormatted = tenCoBan
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    return tenFormatted;
  }

  // ============================================
  // XÁC ĐỊNH CHẾ ĐỘ GỘP
  // ============================================
  private xacDinhCheDoGop(loaiRule: LoaiRule): CheDoGop {
    // Sự kiện thường cộng dồn
    if (loaiRule === LoaiRule.THEO_SU_KIEN) {
      return CheDoGop.CONG_DON;
    }
    // Các loại khác mặc định ghi đè
    return CheDoGop.GHI_DE;
  }

  // ============================================
  // ÁP DỤNG RULE TỪ ĐỀ XUẤT AI
  // ============================================
  async apDungRule(dto: ApDungRuleDeXuatDto, quyCheId: number, nguoiTaoId?: number) {
    // Lấy audit log
    const audit = await this.prisma.aiRuleAudit.findUnique({
      where: { id: dto.auditId },
    });

    if (!audit) {
      throw new NotFoundException(`Không tìm thấy đề xuất với ID: ${dto.auditId}`);
    }

    // Lấy rule từ DTO hoặc từ audit
    let ruleDeXuat: RuleDeXuat;
    if (dto.ruleDeXuat) {
      ruleDeXuat = dto.ruleDeXuat;
    } else {
      const response = JSON.parse(audit.responseJson) as GoiYRuleResponseDto;
      if (!response.ruleDeXuat) {
        throw new BadRequestException('Đề xuất không có rule hợp lệ');
      }
      ruleDeXuat = response.ruleDeXuat;
    }

    // Tìm hoặc tạo khoản lương nếu chưa có
    let khoanLuongId = ruleDeXuat.khoanLuongId;
    if (!khoanLuongId) {
      // Tìm khoản lương theo mã
      const khoanLuong = await this.prisma.khoanLuong.findFirst({
        where: { maKhoan: ruleDeXuat.khoanLuongMa },
      });
      if (khoanLuong) {
        khoanLuongId = khoanLuong.id;
      } else {
        throw new BadRequestException(
          `Không tìm thấy khoản lương với mã: ${ruleDeXuat.khoanLuongMa}`
        );
      }
    }

    // Tạo rule mới
    const rule = await this.prisma.quyCheRule.create({
      data: {
        quyCheId,
        khoanLuongId,
        tenRule: ruleDeXuat.tenRule,
        loaiRule: ruleDeXuat.loaiRule,
        dieuKienJson: ruleDeXuat.dieuKienJson
          ? JSON.stringify(ruleDeXuat.dieuKienJson)
          : null,
        congThucJson: JSON.stringify(ruleDeXuat.congThucJson),
        thuTuUuTien: ruleDeXuat.thuTuUuTien,
        cheDoGop: ruleDeXuat.cheDoGop,
        choPhepChinhTay: ruleDeXuat.choPhepChinhTay,
        nguoiTao: nguoiTaoId ? String(nguoiTaoId) : null,
      },
      include: {
        khoanLuong: true,
      },
    });

    // Cập nhật audit log
    await this.prisma.aiRuleAudit.update({
      where: { id: dto.auditId },
      data: {
        trangThai: TrangThaiAiAudit.DA_AP_DUNG,
        ruleApDungId: rule.id,
      },
    });

    return rule;
  }

  // ============================================
  // HỦY ĐỀ XUẤT
  // ============================================
  async huyDeXuat(auditId: number) {
    return this.prisma.aiRuleAudit.update({
      where: { id: auditId },
      data: {
        trangThai: TrangThaiAiAudit.HUY,
      },
    });
  }

  // ============================================
  // LỊCH SỬ ĐỀ XUẤT AI
  // ============================================
  async lichSuDeXuat(quyCheId: number) {
    return this.prisma.aiRuleAudit.findMany({
      where: { quyCheId },
      orderBy: { taoLuc: 'desc' },
      take: 50,
      include: {
        nguoiTao: {
          select: { id: true, hoTen: true },
        },
        rule: {
          select: { id: true, tenRule: true },
        },
      },
    });
  }
}
