import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Decimal } from '@prisma/client/runtime/library';
import {
  LoaiQuyTacKPI,
  NguonDuLieuKPI,
  ToanTuSoSanh,
  LoaiTinhDiemKPI,
} from '@prisma/client';

// ============================================
// DTOs cho Rule Engine
// ============================================

export interface TaoNhomQuyTacDto {
  maNhom: string;
  tenNhom: string;
  moTa?: string;
  thuTu?: number;
}

export interface TaoQuyTacKPIDto {
  maQuyTac: string;
  tenQuyTac: string;
  moTa?: string;
  nhomId: number;
  loaiQuyTac?: 'THUONG' | 'PHAT' | 'TRUNG_BINH';
  nguonDuLieu?: 'CHAM_CONG' | 'DOANH_SO' | 'BANG_LUONG' | 'HOP_DONG' | 'NHAP_TAY';
  diemToiDa?: number;
  diemMacDinh?: number;
  trongSoMacDinh?: number;
  apDungToanCongTy?: boolean;
}

export interface TaoDieuKienDto {
  quyTacId: number;
  thuTu?: number;
  moTaDieuKien: string;
  bienSo: string;
  toanTu: 'BANG' | 'KHAC' | 'LON_HON' | 'NHO_HON' | 'LON_HON_BANG' | 'NHO_HON_BANG' | 'BETWEEN';
  giaTriMin?: number;
  giaTriMax?: number;
  loaiTinhDiem?: 'CO_DINH' | 'CONG_THUC' | 'TY_LE';
  diemCoDinh?: number;
  congThuc?: string;
}

export interface TaoBienSoDto {
  maBienSo: string;
  tenBienSo: string;
  moTa?: string;
  nguonDuLieu?: 'CHAM_CONG' | 'DOANH_SO' | 'BANG_LUONG' | 'HOP_DONG' | 'NHAP_TAY';
  bangNguon?: string;
  truongNguon?: string;
  congThuc?: string;
  donViTinh?: string;
}

export interface TinhKPINhanVienDto {
  danhGiaId: number;
  nhanVienId: number;
  thang: number;
  nam: number;
  duLieuNhapTay?: Record<string, number>; // { "MA_BIEN_SO": value }
}

export interface KetQuaTinhKPI {
  quyTacId: number;
  maQuyTac: string;
  tenQuyTac: string;
  giaTriDauVao: number;
  diemDat: number;
  trongSo: number;
  diemQuyDoi: number;
  ghiChu?: string;
}

// ============================================
// KPI Rule Engine Service
// ============================================

@Injectable()
export class KPIRuleEngineService {
  constructor(private prisma: PrismaService) {}

  // ============================================
  // NHÓM QUY TẮC
  // ============================================

  async layDanhSachNhom() {
    return this.prisma.nhomQuyTacKPI.findMany({
      where: { trangThai: true },
      include: {
        quyTacKPIs: {
          where: { trangThai: true },
          include: {
            dieuKienQuyTacs: {
              where: { trangThai: true },
              orderBy: { thuTu: 'asc' },
            },
          },
        },
      },
      orderBy: { thuTu: 'asc' },
    });
  }

  async taoNhomQuyTac(dto: TaoNhomQuyTacDto) {
    const existing = await this.prisma.nhomQuyTacKPI.findUnique({
      where: { maNhom: dto.maNhom },
    });

    if (existing) {
      throw new ConflictException(`Mã nhóm ${dto.maNhom} đã tồn tại`);
    }

    return this.prisma.nhomQuyTacKPI.create({
      data: {
        maNhom: dto.maNhom,
        tenNhom: dto.tenNhom,
        moTa: dto.moTa,
        thuTu: dto.thuTu || 0,
      },
    });
  }

  async capNhatNhomQuyTac(id: number, dto: Partial<TaoNhomQuyTacDto>) {
    return this.prisma.nhomQuyTacKPI.update({
      where: { id },
      data: dto,
    });
  }

  // ============================================
  // QUY TẮC KPI
  // ============================================

  async layDanhSachQuyTac(nhomId?: number) {
    return this.prisma.quyTacKPI.findMany({
      where: {
        trangThai: true,
        ...(nhomId && { nhomId }),
      },
      include: {
        nhom: true,
        dieuKienQuyTacs: {
          where: { trangThai: true },
          orderBy: { thuTu: 'asc' },
        },
        quyTacPhongBans: true,
        quyTacViTris: true,
      },
      orderBy: [{ nhomId: 'asc' }, { maQuyTac: 'asc' }],
    });
  }

  async layQuyTacTheoId(id: number) {
    const quyTac = await this.prisma.quyTacKPI.findUnique({
      where: { id },
      include: {
        nhom: true,
        dieuKienQuyTacs: {
          where: { trangThai: true },
          orderBy: { thuTu: 'asc' },
        },
        quyTacPhongBans: true,
        quyTacViTris: true,
      },
    });

    if (!quyTac) {
      throw new NotFoundException(`Không tìm thấy quy tắc với ID ${id}`);
    }

    return quyTac;
  }

  async taoQuyTac(dto: TaoQuyTacKPIDto) {
    const existing = await this.prisma.quyTacKPI.findUnique({
      where: { maQuyTac: dto.maQuyTac },
    });

    if (existing) {
      throw new ConflictException(`Mã quy tắc ${dto.maQuyTac} đã tồn tại`);
    }

    // Verify nhóm tồn tại
    const nhom = await this.prisma.nhomQuyTacKPI.findUnique({
      where: { id: dto.nhomId },
    });

    if (!nhom) {
      throw new NotFoundException(`Không tìm thấy nhóm quy tắc với ID ${dto.nhomId}`);
    }

    return this.prisma.quyTacKPI.create({
      data: {
        maQuyTac: dto.maQuyTac,
        tenQuyTac: dto.tenQuyTac,
        moTa: dto.moTa,
        nhomId: dto.nhomId,
        loaiQuyTac: (dto.loaiQuyTac as LoaiQuyTacKPI) || 'THUONG',
        nguonDuLieu: (dto.nguonDuLieu as NguonDuLieuKPI) || 'NHAP_TAY',
        diemToiDa: dto.diemToiDa ?? 100,
        diemMacDinh: dto.diemMacDinh ?? 0,
        trongSoMacDinh: dto.trongSoMacDinh ?? 10,
        apDungToanCongTy: dto.apDungToanCongTy ?? true,
      },
      include: {
        nhom: true,
        dieuKienQuyTacs: true,
      },
    });
  }

  async capNhatQuyTac(id: number, dto: Partial<TaoQuyTacKPIDto>) {
    await this.layQuyTacTheoId(id);

    return this.prisma.quyTacKPI.update({
      where: { id },
      data: {
        ...dto,
        loaiQuyTac: dto.loaiQuyTac as LoaiQuyTacKPI,
        nguonDuLieu: dto.nguonDuLieu as NguonDuLieuKPI,
      },
      include: {
        nhom: true,
        dieuKienQuyTacs: true,
      },
    });
  }

  async xoaQuyTac(id: number) {
    await this.layQuyTacTheoId(id);

    return this.prisma.quyTacKPI.update({
      where: { id },
      data: { trangThai: false },
    });
  }

  // ============================================
  // ĐIỀU KIỆN QUY TẮC
  // ============================================

  async themDieuKien(dto: TaoDieuKienDto) {
    await this.layQuyTacTheoId(dto.quyTacId);

    return this.prisma.dieuKienQuyTacKPI.create({
      data: {
        quyTacId: dto.quyTacId,
        thuTu: dto.thuTu || 1,
        moTaDieuKien: dto.moTaDieuKien,
        bienSo: dto.bienSo,
        toanTu: dto.toanTu as ToanTuSoSanh,
        giaTriMin: dto.giaTriMin,
        giaTriMax: dto.giaTriMax,
        loaiTinhDiem: (dto.loaiTinhDiem as LoaiTinhDiemKPI) || 'CO_DINH',
        diemCoDinh: dto.diemCoDinh,
        congThuc: dto.congThuc,
      },
    });
  }

  async capNhatDieuKien(id: number, dto: Partial<TaoDieuKienDto>) {
    return this.prisma.dieuKienQuyTacKPI.update({
      where: { id },
      data: {
        ...dto,
        toanTu: dto.toanTu as ToanTuSoSanh,
        loaiTinhDiem: dto.loaiTinhDiem as LoaiTinhDiemKPI,
      },
    });
  }

  async xoaDieuKien(id: number) {
    return this.prisma.dieuKienQuyTacKPI.delete({
      where: { id },
    });
  }

  // ============================================
  // BIẾN SỐ KPI
  // ============================================

  async layDanhSachBienSo() {
    return this.prisma.bienSoKPI.findMany({
      where: { trangThai: true },
      orderBy: { maBienSo: 'asc' },
    });
  }

  async taoBienSo(dto: TaoBienSoDto) {
    const existing = await this.prisma.bienSoKPI.findUnique({
      where: { maBienSo: dto.maBienSo },
    });

    if (existing) {
      throw new ConflictException(`Mã biến số ${dto.maBienSo} đã tồn tại`);
    }

    return this.prisma.bienSoKPI.create({
      data: {
        maBienSo: dto.maBienSo,
        tenBienSo: dto.tenBienSo,
        moTa: dto.moTa,
        nguonDuLieu: (dto.nguonDuLieu as NguonDuLieuKPI) || 'NHAP_TAY',
        bangNguon: dto.bangNguon,
        truongNguon: dto.truongNguon,
        congThuc: dto.congThuc,
        donViTinh: dto.donViTinh,
      },
    });
  }

  // ============================================
  // KHỞI TẠO DỮ LIỆU MẪU
  // ============================================

  async khoiTaoDuLieuMau() {
    // Tạo các nhóm quy tắc mẫu
    const nhomChamCong = await this.prisma.nhomQuyTacKPI.upsert({
      where: { maNhom: 'CHAM_CONG' },
      update: {},
      create: {
        maNhom: 'CHAM_CONG',
        tenNhom: 'Chấm công & Kỷ luật',
        moTa: 'Quy tắc KPI liên quan đến chấm công, đi muộn, về sớm',
        thuTu: 1,
      },
    });

    const nhomHieuSuat = await this.prisma.nhomQuyTacKPI.upsert({
      where: { maNhom: 'HIEU_SUAT' },
      update: {},
      create: {
        maNhom: 'HIEU_SUAT',
        tenNhom: 'Hiệu suất công việc',
        moTa: 'Quy tắc KPI liên quan đến năng suất, chất lượng công việc',
        thuTu: 2,
      },
    });

    const nhomHanhVi = await this.prisma.nhomQuyTacKPI.upsert({
      where: { maNhom: 'HANH_VI' },
      update: {},
      create: {
        maNhom: 'HANH_VI',
        tenNhom: 'Hành vi & Thái độ',
        moTa: 'Quy tắc KPI liên quan đến thái độ làm việc, tuân thủ quy định',
        thuTu: 3,
      },
    });

    // Tạo các biến số KPI mẫu
    const bienSoMau = [
      { maBienSo: 'SO_LAN_DI_MUON', tenBienSo: 'Số lần đi muộn', nguonDuLieu: 'CHAM_CONG', donViTinh: 'lần' },
      { maBienSo: 'SO_LAN_VE_SOM', tenBienSo: 'Số lần về sớm', nguonDuLieu: 'CHAM_CONG', donViTinh: 'lần' },
      { maBienSo: 'SO_NGAY_NGHI_KHONG_PHEP', tenBienSo: 'Số ngày nghỉ không phép', nguonDuLieu: 'CHAM_CONG', donViTinh: 'ngày' },
      { maBienSo: 'TY_LE_CHAM_CONG', tenBienSo: 'Tỷ lệ chấm công', nguonDuLieu: 'CHAM_CONG', donViTinh: '%' },
      { maBienSo: 'SO_GIO_LAM_THEM', tenBienSo: 'Số giờ làm thêm', nguonDuLieu: 'CHAM_CONG', donViTinh: 'giờ' },
      { maBienSo: 'DOANH_SO_THANG', tenBienSo: 'Doanh số tháng', nguonDuLieu: 'DOANH_SO', donViTinh: 'VNĐ' },
      { maBienSo: 'HOAN_THANH_CONG_VIEC', tenBienSo: 'Hoàn thành công việc', nguonDuLieu: 'NHAP_TAY', donViTinh: '%' },
      { maBienSo: 'CHAT_LUONG_CONG_VIEC', tenBienSo: 'Chất lượng công việc', nguonDuLieu: 'NHAP_TAY', donViTinh: 'điểm' },
      { maBienSo: 'THAI_DO_LAM_VIEC', tenBienSo: 'Thái độ làm việc', nguonDuLieu: 'NHAP_TAY', donViTinh: 'điểm' },
      { maBienSo: 'TUAN_THU_QUY_DINH', tenBienSo: 'Tuân thủ quy định', nguonDuLieu: 'NHAP_TAY', donViTinh: 'điểm' },
    ];

    for (const bs of bienSoMau) {
      await this.prisma.bienSoKPI.upsert({
        where: { maBienSo: bs.maBienSo },
        update: {},
        create: {
          maBienSo: bs.maBienSo,
          tenBienSo: bs.tenBienSo,
          nguonDuLieu: bs.nguonDuLieu as NguonDuLieuKPI,
          donViTinh: bs.donViTinh,
        },
      });
    }

    // Tạo quy tắc mẫu: Đi muộn
    const qtDiMuon = await this.prisma.quyTacKPI.upsert({
      where: { maQuyTac: 'DI_MUON' },
      update: {},
      create: {
        maQuyTac: 'DI_MUON',
        tenQuyTac: 'Đi làm đúng giờ',
        moTa: 'Đánh giá việc đi làm đúng giờ, phạt theo số lần đi muộn',
        nhomId: nhomChamCong.id,
        loaiQuyTac: 'PHAT',
        nguonDuLieu: 'CHAM_CONG',
        diemToiDa: 100,
        diemMacDinh: 100,
        trongSoMacDinh: 15,
      },
    });

    // Điều kiện: 0 lần đi muộn = 100 điểm
    await this.prisma.dieuKienQuyTacKPI.upsert({
      where: { id: -1 },
      update: {},
      create: {
        quyTacId: qtDiMuon.id,
        thuTu: 1,
        moTaDieuKien: 'Không đi muộn lần nào',
        bienSo: 'SO_LAN_DI_MUON',
        toanTu: 'BANG',
        giaTriMin: 0,
        loaiTinhDiem: 'CO_DINH',
        diemCoDinh: 100,
      },
    });

    // Điều kiện: 1-3 lần = 80 điểm
    await this.prisma.dieuKienQuyTacKPI.create({
      data: {
        quyTacId: qtDiMuon.id,
        thuTu: 2,
        moTaDieuKien: 'Đi muộn 1-3 lần',
        bienSo: 'SO_LAN_DI_MUON',
        toanTu: 'BETWEEN',
        giaTriMin: 1,
        giaTriMax: 3,
        loaiTinhDiem: 'CO_DINH',
        diemCoDinh: 80,
      },
    });

    // Điều kiện: 4-6 lần = 50 điểm
    await this.prisma.dieuKienQuyTacKPI.create({
      data: {
        quyTacId: qtDiMuon.id,
        thuTu: 3,
        moTaDieuKien: 'Đi muộn 4-6 lần',
        bienSo: 'SO_LAN_DI_MUON',
        toanTu: 'BETWEEN',
        giaTriMin: 4,
        giaTriMax: 6,
        loaiTinhDiem: 'CO_DINH',
        diemCoDinh: 50,
      },
    });

    // Điều kiện: >6 lần = 0 điểm
    await this.prisma.dieuKienQuyTacKPI.create({
      data: {
        quyTacId: qtDiMuon.id,
        thuTu: 4,
        moTaDieuKien: 'Đi muộn trên 6 lần',
        bienSo: 'SO_LAN_DI_MUON',
        toanTu: 'LON_HON',
        giaTriMin: 6,
        loaiTinhDiem: 'CO_DINH',
        diemCoDinh: 0,
      },
    });

    // Tạo quy tắc: Hoàn thành công việc
    const qtHoanThanh = await this.prisma.quyTacKPI.upsert({
      where: { maQuyTac: 'HOAN_THANH_CV' },
      update: {},
      create: {
        maQuyTac: 'HOAN_THANH_CV',
        tenQuyTac: 'Hoàn thành công việc',
        moTa: 'Đánh giá mức độ hoàn thành công việc được giao',
        nhomId: nhomHieuSuat.id,
        loaiQuyTac: 'THUONG',
        nguonDuLieu: 'NHAP_TAY',
        diemToiDa: 100,
        diemMacDinh: 0,
        trongSoMacDinh: 30,
      },
    });

    // Điều kiện: Theo công thức tỷ lệ hoàn thành
    await this.prisma.dieuKienQuyTacKPI.upsert({
      where: { id: -1 },
      update: {},
      create: {
        quyTacId: qtHoanThanh.id,
        thuTu: 1,
        moTaDieuKien: 'Điểm = Tỷ lệ hoàn thành',
        bienSo: 'HOAN_THANH_CONG_VIEC',
        toanTu: 'LON_HON_BANG',
        giaTriMin: 0,
        loaiTinhDiem: 'TY_LE',
      },
    });

    // Tạo quy tắc: Thái độ làm việc
    await this.prisma.quyTacKPI.upsert({
      where: { maQuyTac: 'THAI_DO' },
      update: {},
      create: {
        maQuyTac: 'THAI_DO',
        tenQuyTac: 'Thái độ làm việc',
        moTa: 'Đánh giá thái độ, tinh thần làm việc (1-5 điểm)',
        nhomId: nhomHanhVi.id,
        loaiQuyTac: 'THUONG',
        nguonDuLieu: 'NHAP_TAY',
        diemToiDa: 100,
        diemMacDinh: 60,
        trongSoMacDinh: 15,
      },
    });

    // Tạo quy tắc: Tuân thủ quy định
    await this.prisma.quyTacKPI.upsert({
      where: { maQuyTac: 'TUAN_THU' },
      update: {},
      create: {
        maQuyTac: 'TUAN_THU',
        tenQuyTac: 'Tuân thủ quy định',
        moTa: 'Đánh giá việc tuân thủ nội quy, quy định công ty',
        nhomId: nhomHanhVi.id,
        loaiQuyTac: 'THUONG',
        nguonDuLieu: 'NHAP_TAY',
        diemToiDa: 100,
        diemMacDinh: 80,
        trongSoMacDinh: 10,
      },
    });

    return {
      message: 'Đã khởi tạo dữ liệu mẫu cho KPI Rule Engine',
      nhomQuyTac: 3,
      bienSo: bienSoMau.length,
      quyTac: 4,
    };
  }

  // ============================================
  // TÍNH KPI THEO RULE ENGINE
  // ============================================

  async tinhKPINhanVien(dto: TinhKPINhanVienDto): Promise<KetQuaTinhKPI[]> {
    const ketQua: KetQuaTinhKPI[] = [];

    // Lấy thông tin nhân viên
    const nhanVien = await this.prisma.nhanVien.findUnique({
      where: { id: dto.nhanVienId },
      include: { phongBan: true },
    });

    if (!nhanVien) {
      throw new NotFoundException(`Không tìm thấy nhân viên với ID ${dto.nhanVienId}`);
    }

    // Lấy tất cả quy tắc đang áp dụng
    const quyTacs = await this.prisma.quyTacKPI.findMany({
      where: { trangThai: true },
      include: {
        dieuKienQuyTacs: {
          where: { trangThai: true },
          orderBy: { thuTu: 'asc' },
        },
        quyTacPhongBans: {
          where: { phongBanId: nhanVien.phongBanId },
        },
        // Note: viTriId không tồn tại trong NhanVien model hiện tại
        // Có thể mở rộng sau khi thêm ViTri model
        quyTacViTris: true,
      },
    });

    // Lấy dữ liệu chấm công của nhân viên
    const duLieuChamCong = await this.layDuLieuChamCong(dto.nhanVienId, dto.thang, dto.nam);

    for (const quyTac of quyTacs) {
      // Xác định trọng số áp dụng
      // Ưu tiên: PhongBan override > Default
      // Note: ViTri override tạm thời disabled vì chưa có viTriId trong NhanVien
      let trongSo = Number(quyTac.trongSoMacDinh);
      if (quyTac.quyTacPhongBans.length > 0) {
        trongSo = Number(quyTac.quyTacPhongBans[0].trongSo);
      }

      // Lấy giá trị biến số đầu vào
      let giaTriDauVao = dto.duLieuNhapTay?.[quyTac.dieuKienQuyTacs[0]?.bienSo] ?? 0;
      
      // Nếu nguồn từ chấm công, lấy tự động
      if (quyTac.nguonDuLieu === 'CHAM_CONG') {
        const bienSo = quyTac.dieuKienQuyTacs[0]?.bienSo;
        giaTriDauVao = this.layGiaTriTuChamCong(duLieuChamCong, bienSo);
      }

      // Tính điểm theo điều kiện
      const diemDat = this.tinhDiemTheoQuyTac(quyTac, giaTriDauVao);
      const diemQuyDoi = (diemDat * trongSo) / 100;

      ketQua.push({
        quyTacId: quyTac.id,
        maQuyTac: quyTac.maQuyTac,
        tenQuyTac: quyTac.tenQuyTac,
        giaTriDauVao,
        diemDat,
        trongSo,
        diemQuyDoi,
      });

      // Lưu kết quả vào DB
      await this.prisma.ketQuaQuyTacKPI.upsert({
        where: {
          danhGiaId_quyTacId: {
            danhGiaId: dto.danhGiaId,
            quyTacId: quyTac.id,
          },
        },
        update: {
          giaTriDauVao,
          diemDat,
          trongSoApDung: trongSo,
          diemQuyDoi,
        },
        create: {
          danhGiaId: dto.danhGiaId,
          quyTacId: quyTac.id,
          giaTriDauVao,
          diemDat,
          trongSoApDung: trongSo,
          diemQuyDoi,
        },
      });
    }

    return ketQua;
  }

  private async layDuLieuChamCong(nhanVienId: number, thang: number, nam: number) {
    // Lấy dữ liệu chấm công tổng hợp theo tháng từ bảng ChamCong
    const chamCong = await this.prisma.chamCong.findUnique({
      where: {
        nhanVienId_thang_nam: {
          nhanVienId,
          thang,
          nam,
        },
      },
    });

    if (!chamCong) {
      // Nếu chưa có dữ liệu chấm công, trả về giá trị mặc định
      return {
        SO_LAN_DI_MUON: 0,
        SO_LAN_VE_SOM: 0,
        SO_NGAY_LAM_VIEC: 0,
        SO_NGAY_NGHI_PHEP: 0,
        SO_NGAY_NGHI_KHONG_LUONG: 0,
        TY_LE_CHAM_CONG: 0,
        SO_GIO_OT: 0,
        SO_GIO_OT_DEM: 0,
        SO_GIO_OT_CHU_NHAT: 0,
        SO_GIO_OT_LE: 0,
      };
    }

    // Tính tỷ lệ chấm công
    const soCongChuan = Number(chamCong.soCongChuan) || 26;
    const soCongThucTe = Number(chamCong.soCongThucTe) || 0;
    const tyLeChamCong = Math.min(100, (soCongThucTe / soCongChuan) * 100);

    return {
      SO_LAN_DI_MUON: chamCong.soLanDiMuon,
      SO_LAN_VE_SOM: chamCong.soLanVeSom,
      SO_NGAY_LAM_VIEC: soCongThucTe,
      SO_NGAY_NGHI_PHEP: Number(chamCong.soNgayNghiPhep),
      SO_NGAY_NGHI_KHONG_LUONG: Number(chamCong.soNgayNghiKhongLuong),
      TY_LE_CHAM_CONG: tyLeChamCong,
      SO_GIO_OT: Number(chamCong.soGioOT),
      SO_GIO_OT_DEM: Number(chamCong.soGioOTDem),
      SO_GIO_OT_CHU_NHAT: Number(chamCong.soGioOTChuNhat),
      SO_GIO_OT_LE: Number(chamCong.soGioOTLe),
    };
  }

  private layGiaTriTuChamCong(duLieu: Record<string, number>, bienSo: string): number {
    return duLieu[bienSo] ?? 0;
  }

  private tinhDiemTheoQuyTac(quyTac: any, giaTriDauVao: number): number {
    const dieuKiens = quyTac.dieuKienQuyTacs || [];
    
    for (const dk of dieuKiens) {
      if (this.kiemTraDieuKien(dk, giaTriDauVao)) {
        return this.tinhDiemTheoDieuKien(dk, giaTriDauVao);
      }
    }

    // Không match điều kiện nào, trả về điểm mặc định
    return Number(quyTac.diemMacDinh);
  }

  private kiemTraDieuKien(dk: any, giaTri: number): boolean {
    const min = Number(dk.giaTriMin ?? 0);
    const max = Number(dk.giaTriMax ?? Infinity);

    switch (dk.toanTu) {
      case 'BANG':
        return giaTri === min;
      case 'KHAC':
        return giaTri !== min;
      case 'LON_HON':
        return giaTri > min;
      case 'NHO_HON':
        return giaTri < min;
      case 'LON_HON_BANG':
        return giaTri >= min;
      case 'NHO_HON_BANG':
        return giaTri <= min;
      case 'BETWEEN':
        return giaTri >= min && giaTri <= max;
      default:
        return false;
    }
  }

  private tinhDiemTheoDieuKien(dk: any, giaTriDauVao: number): number {
    switch (dk.loaiTinhDiem) {
      case 'CO_DINH':
        return Number(dk.diemCoDinh ?? 0);
      
      case 'TY_LE':
        // Điểm = giá trị đầu vào (nếu là %)
        return Math.min(100, Math.max(0, giaTriDauVao));
      
      case 'CONG_THUC':
        // Parse và evaluate công thức
        return this.evaluateCongThuc(dk.congThuc, giaTriDauVao);
      
      default:
        return 0;
    }
  }

  /**
   * Evaluate công thức tính điểm một cách an toàn
   * Chỉ hỗ trợ các phép tính đơn giản: +, -, *, /, ()
   * VD: "100 - ({VALUE} * 5)" với VALUE = 3 => 100 - (3 * 5) = 85
   */
  private evaluateCongThuc(congThuc: string, giaTri: number): number {
    if (!congThuc) return 0;

    try {
      // Replace biến số trong công thức
      let formula = congThuc.replace(/\{([A-Z_]+)\}/g, String(giaTri));
      // Hỗ trợ cả dạng không có dấu ngoặc
      formula = formula.replace(/[A-Z_]+/g, String(giaTri));
      
      // Kiểm tra công thức chỉ chứa ký tự hợp lệ
      // Chỉ cho phép: số, dấu +, -, *, /, (), ., và spaces
      if (!/^[\d+\-*/().\s]+$/.test(formula)) {
        console.warn(`[KPI Rule Engine] Công thức không hợp lệ: ${congThuc}`);
        return 0;
      }

      // Kiểm tra cân bằng dấu ngoặc
      let balance = 0;
      for (const char of formula) {
        if (char === '(') balance++;
        if (char === ')') balance--;
        if (balance < 0) throw new Error('Dấu ngoặc không hợp lệ');
      }
      if (balance !== 0) throw new Error('Dấu ngoặc không cân bằng');

      // Sử dụng cách tính an toàn thay vì eval/Function
      const result = this.safeEvaluate(formula);
      
      return Math.min(100, Math.max(0, Number(result) || 0));
    } catch (error) {
      console.warn(`[KPI Rule Engine] Lỗi tính công thức "${congThuc}":`, error);
      return 0;
    }
  }

  /**
   * Hàm tính toán an toàn cho các biểu thức số học đơn giản
   * Hỗ trợ: +, -, *, /, ()
   */
  private safeEvaluate(expression: string): number {
    // Loại bỏ spaces
    expression = expression.replace(/\s+/g, '');
    
    // Xử lý dấu ngoặc đơn trước
    while (expression.includes('(')) {
      expression = expression.replace(/\(([^()]+)\)/g, (_, inner) => {
        return String(this.safeEvaluate(inner));
      });
    }
    
    // Xử lý phép nhân và chia trước (độ ưu tiên cao hơn)
    while (/[\d.]+[*/][\d.]+/.test(expression)) {
      expression = expression.replace(/([\d.]+)([*/])([\d.]+)/, (_, a, op, b) => {
        const numA = parseFloat(a);
        const numB = parseFloat(b);
        return String(op === '*' ? numA * numB : (numB !== 0 ? numA / numB : 0));
      });
    }
    
    // Xử lý phép cộng và trừ
    // Chuyển đổi biểu thức thành mảng các số (có dấu)
    const tokens: string[] = expression.match(/[+-]?[\d.]+/g) || [];
    return tokens.reduce<number>((sum, token) => sum + parseFloat(token), 0);
  }

  // ============================================
  // OVERRIDE TRỌNG SỐ THEO PHÒNG BAN/VỊ TRÍ
  // ============================================

  async ganTrongSoPhongBan(quyTacId: number, phongBanId: number, trongSo: number) {
    return this.prisma.quyTacKPIPhongBan.upsert({
      where: {
        quyTacId_phongBanId: {
          quyTacId,
          phongBanId,
        },
      },
      update: { trongSo },
      create: {
        quyTacId,
        phongBanId,
        trongSo,
      },
    });
  }

  async ganTrongSoViTri(quyTacId: number, viTriId: number, trongSo: number) {
    return this.prisma.quyTacKPIViTri.upsert({
      where: {
        quyTacId_viTriId: {
          quyTacId,
          viTriId,
        },
      },
      update: { trongSo },
      create: {
        quyTacId,
        viTriId,
        trongSo,
      },
    });
  }

  // ============================================
  // PREVIEW & THỐNG KÊ
  // ============================================

  async previewKPINhanVien(nhanVienId: number, thang: number, nam: number, duLieuNhapTay?: Record<string, number>) {
    // Tạo danhGiaId giả để preview
    return this.tinhKPINhanVien({
      danhGiaId: -1, // Không lưu vào DB
      nhanVienId,
      thang,
      nam,
      duLieuNhapTay,
    });
  }

  async thongKeQuyTac() {
    const nhoms = await this.prisma.nhomQuyTacKPI.findMany({
      where: { trangThai: true },
      include: {
        _count: {
          select: { quyTacKPIs: true },
        },
      },
    });

    const quyTacs = await this.prisma.quyTacKPI.findMany({
      where: { trangThai: true },
      include: {
        _count: {
          select: { 
            dieuKienQuyTacs: true,
            quyTacPhongBans: true,
            quyTacViTris: true,
          },
        },
      },
    });

    const bienSos = await this.prisma.bienSoKPI.count({
      where: { trangThai: true },
    });

    return {
      tongNhom: nhoms.length,
      tongQuyTac: quyTacs.length,
      tongBienSo: bienSos,
      chiTiet: nhoms.map((n) => ({
        nhom: n.tenNhom,
        soQuyTac: n._count.quyTacKPIs,
      })),
    };
  }
}
