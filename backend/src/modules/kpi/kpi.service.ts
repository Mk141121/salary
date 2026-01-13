import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Decimal } from '@prisma/client/runtime/library';
import { XepLoaiKPI, LoaiChiTieuKPI } from '@prisma/client';
import {
  TaoTemplateKPIDto,
  CapNhatTemplateKPIDto,
  TaoChiTieuKPIDto,
  TaoKyDanhGiaDto,
  CapNhatTrangThaiKyDto,
  TaoDanhGiaKPIDto,
  CapNhatKetQuaKPIDto,
  DuyetDanhGiaKPIDto,
  TaoCauHinhThuongDto,
  TinhThuongKPIDto,
  KetQuaTinhThuongDto,
} from './dto/kpi.dto';

@Injectable()
export class KPIService {
  constructor(private prisma: PrismaService) {}

  // ============================================
  // TEMPLATE KPI
  // ============================================

  async layDanhSachTemplate(phongBanId?: number) {
    return this.prisma.templateKPI.findMany({
      where: {
        trangThai: true,
        ...(phongBanId && { phongBanId }),
      },
      include: {
        chiTieuKPIs: {
          orderBy: { thuTu: 'asc' },
        },
      },
      orderBy: { ngayTao: 'desc' },
    });
  }

  async layTemplateTheoId(id: number) {
    const template = await this.prisma.templateKPI.findUnique({
      where: { id },
      include: {
        chiTieuKPIs: {
          orderBy: { thuTu: 'asc' },
        },
      },
    });

    if (!template) {
      throw new NotFoundException(`Không tìm thấy template KPI với ID ${id}`);
    }

    return template;
  }

  async taoTemplate(dto: TaoTemplateKPIDto) {
    // Check trùng mã
    const existing = await this.prisma.templateKPI.findUnique({
      where: { maTemplate: dto.maTemplate },
    });

    if (existing) {
      throw new ConflictException(`Mã template ${dto.maTemplate} đã tồn tại`);
    }

    // Validate tổng trọng số = 100%
    if (dto.chiTieuKPIs && dto.chiTieuKPIs.length > 0) {
      const tongTrongSo = dto.chiTieuKPIs.reduce((sum, ct) => sum + ct.trongSo, 0);
      if (Math.abs(tongTrongSo - 100) > 0.01) {
        throw new BadRequestException(`Tổng trọng số phải bằng 100%, hiện tại: ${tongTrongSo}%`);
      }
    }

    return this.prisma.templateKPI.create({
      data: {
        maTemplate: dto.maTemplate,
        tenTemplate: dto.tenTemplate,
        phongBanId: dto.phongBanId,
        moTa: dto.moTa,
        chiTieuKPIs: dto.chiTieuKPIs
          ? {
              create: dto.chiTieuKPIs.map((ct) => ({
                maChiTieu: ct.maChiTieu,
                tenChiTieu: ct.tenChiTieu,
                moTa: ct.moTa,
                donViTinh: ct.donViTinh,
                trongSo: ct.trongSo,
                loaiChiTieu: ct.loaiChiTieu as any,
                chiTieuToiThieu: ct.chiTieuToiThieu,
                chiTieuMucTieu: ct.chiTieuMucTieu,
                chiTieuVuotMuc: ct.chiTieuVuotMuc,
                thuTu: ct.thuTu || 0,
              })),
            }
          : undefined,
      },
      include: {
        chiTieuKPIs: true,
      },
    });
  }

  async capNhatTemplate(id: number, dto: CapNhatTemplateKPIDto) {
    await this.layTemplateTheoId(id);

    return this.prisma.templateKPI.update({
      where: { id },
      data: dto,
      include: {
        chiTieuKPIs: true,
      },
    });
  }

  async themChiTieu(templateId: number, dto: TaoChiTieuKPIDto) {
    const template = await this.layTemplateTheoId(templateId);

    // Check trùng mã chỉ tiêu
    const existing = template.chiTieuKPIs.find((ct) => ct.maChiTieu === dto.maChiTieu);
    if (existing) {
      throw new ConflictException(`Mã chỉ tiêu ${dto.maChiTieu} đã tồn tại trong template`);
    }

    // Check tổng trọng số không vượt 100%
    const tongTrongSoHienTai = template.chiTieuKPIs.reduce(
      (sum, ct) => sum + Number(ct.trongSo),
      0,
    );
    if (tongTrongSoHienTai + dto.trongSo > 100) {
      throw new BadRequestException(
        `Tổng trọng số không được vượt 100%. Hiện tại: ${tongTrongSoHienTai}%, thêm: ${dto.trongSo}%`,
      );
    }

    return this.prisma.chiTieuKPI.create({
      data: {
        templateId,
        maChiTieu: dto.maChiTieu,
        tenChiTieu: dto.tenChiTieu,
        moTa: dto.moTa,
        donViTinh: dto.donViTinh,
        trongSo: dto.trongSo,
        loaiChiTieu: dto.loaiChiTieu as any,
        chiTieuToiThieu: dto.chiTieuToiThieu,
        chiTieuMucTieu: dto.chiTieuMucTieu,
        chiTieuVuotMuc: dto.chiTieuVuotMuc,
        thuTu: dto.thuTu || 0,
      },
    });
  }

  async xoaChiTieu(chiTieuId: number) {
    return this.prisma.chiTieuKPI.delete({
      where: { id: chiTieuId },
    });
  }

  // ============================================
  // KỲ ĐÁNH GIÁ KPI
  // ============================================

  async layDanhSachKyDanhGia(nam?: number) {
    return this.prisma.kyDanhGiaKPI.findMany({
      where: nam ? { nam } : undefined,
      include: {
        _count: {
          select: { danhGiaNhanViens: true },
        },
      },
      orderBy: [{ nam: 'desc' }, { thang: 'desc' }, { quy: 'desc' }],
    });
  }

  async layKyDanhGiaTheoId(id: number) {
    const ky = await this.prisma.kyDanhGiaKPI.findUnique({
      where: { id },
      include: {
        danhGiaNhanViens: {
          include: {
            ketQuaKPIs: {
              include: {
                chiTieu: true,
              },
            },
          },
        },
      },
    });

    if (!ky) {
      throw new NotFoundException(`Không tìm thấy kỳ đánh giá với ID ${id}`);
    }

    return ky;
  }

  async taoKyDanhGia(dto: TaoKyDanhGiaDto) {
    // Check trùng mã
    const existing = await this.prisma.kyDanhGiaKPI.findUnique({
      where: { maKy: dto.maKy },
    });

    if (existing) {
      throw new ConflictException(`Mã kỳ đánh giá ${dto.maKy} đã tồn tại`);
    }

    return this.prisma.kyDanhGiaKPI.create({
      data: {
        maKy: dto.maKy,
        tenKy: dto.tenKy,
        loaiKy: dto.loaiKy as any,
        thang: dto.thang,
        quy: dto.quy,
        nam: dto.nam,
        tuNgay: new Date(dto.tuNgay),
        denNgay: new Date(dto.denNgay),
        hanNopKetQua: new Date(dto.hanNopKetQua),
        ghiChu: dto.ghiChu,
      },
    });
  }

  async capNhatTrangThaiKy(id: number, dto: CapNhatTrangThaiKyDto) {
    await this.layKyDanhGiaTheoId(id);

    return this.prisma.kyDanhGiaKPI.update({
      where: { id },
      data: {
        trangThai: dto.trangThai as any,
      },
    });
  }

  // ============================================
  // ĐÁNH GIÁ KPI NHÂN VIÊN
  // ============================================

  async taoDanhGiaKPI(dto: TaoDanhGiaKPIDto) {
    // Check đã có đánh giá chưa
    const existing = await this.prisma.danhGiaKPINhanVien.findUnique({
      where: {
        kyDanhGiaId_nhanVienId: {
          kyDanhGiaId: dto.kyDanhGiaId,
          nhanVienId: dto.nhanVienId,
        },
      },
    });

    if (existing) {
      throw new ConflictException(`Nhân viên đã có đánh giá trong kỳ này`);
    }

    // Lấy template để validate chỉ tiêu
    const template = await this.layTemplateTheoId(dto.templateId);

    return this.prisma.danhGiaKPINhanVien.create({
      data: {
        kyDanhGiaId: dto.kyDanhGiaId,
        nhanVienId: dto.nhanVienId,
        templateId: dto.templateId,
        nhanXetChung: dto.nhanXetChung,
        nguoiDanhGia: dto.nguoiDanhGia,
        ngayDanhGia: dto.nguoiDanhGia ? new Date() : null,
        ketQuaKPIs: dto.ketQuaKPIs
          ? {
              create: dto.ketQuaKPIs.map((kq) => {
                const chiTieu = template.chiTieuKPIs.find((ct) => ct.id === kq.chiTieuId);
                const tyLeDat = this.tinhTyLeDat(kq.ketQuaDat, chiTieu);
                const diemQuyDoi = tyLeDat * Number(chiTieu?.trongSo || 0) / 100;

                return {
                  chiTieuId: kq.chiTieuId,
                  ketQuaDat: kq.ketQuaDat,
                  tyLeDat,
                  diemQuyDoi,
                  ghiChu: kq.ghiChu,
                };
              }),
            }
          : undefined,
      },
      include: {
        ketQuaKPIs: {
          include: { chiTieu: true },
        },
      },
    });
  }

  async capNhatKetQuaKPI(danhGiaId: number, dto: CapNhatKetQuaKPIDto) {
    const danhGia = await this.prisma.danhGiaKPINhanVien.findUnique({
      where: { id: danhGiaId },
      include: { ketQuaKPIs: true },
    });

    if (!danhGia) {
      throw new NotFoundException(`Không tìm thấy đánh giá với ID ${danhGiaId}`);
    }

    if (danhGia.trangThai !== 'NHAP') {
      throw new BadRequestException('Chỉ có thể cập nhật đánh giá ở trạng thái NHAP');
    }

    const template = await this.layTemplateTheoId(danhGia.templateId);

    // Upsert từng kết quả
    for (const kq of dto.ketQuaKPIs) {
      const chiTieu = template.chiTieuKPIs.find((ct) => ct.id === kq.chiTieuId);
      const tyLeDat = this.tinhTyLeDat(kq.ketQuaDat, chiTieu);
      const diemQuyDoi = tyLeDat * Number(chiTieu?.trongSo || 0) / 100;

      await this.prisma.ketQuaKPI.upsert({
        where: {
          danhGiaId_chiTieuId: {
            danhGiaId,
            chiTieuId: kq.chiTieuId,
          },
        },
        update: {
          ketQuaDat: kq.ketQuaDat,
          tyLeDat,
          diemQuyDoi,
          ghiChu: kq.ghiChu,
        },
        create: {
          danhGiaId,
          chiTieuId: kq.chiTieuId,
          ketQuaDat: kq.ketQuaDat,
          tyLeDat,
          diemQuyDoi,
          ghiChu: kq.ghiChu,
        },
      });
    }

    // Tính lại điểm tổng kết
    await this.tinhDiemTongKet(danhGiaId);

    return this.prisma.danhGiaKPINhanVien.findUnique({
      where: { id: danhGiaId },
      include: {
        ketQuaKPIs: {
          include: { chiTieu: true },
        },
      },
    });
  }

  private tinhTyLeDat(ketQuaDat: number, chiTieu: any): number {
    if (!chiTieu || !chiTieu.chiTieuMucTieu) {
      return 0;
    }

    const mucTieu = Number(chiTieu.chiTieuMucTieu);
    const toiThieu = Number(chiTieu.chiTieuToiThieu || 0);
    const vuotMuc = Number(chiTieu.chiTieuVuotMuc || mucTieu * 1.5);

    if (ketQuaDat >= vuotMuc) {
      return 150; // Vượt mức = 150%
    } else if (ketQuaDat >= mucTieu) {
      // Đạt 100-150% tùy mức
      return 100 + (ketQuaDat - mucTieu) / (vuotMuc - mucTieu) * 50;
    } else if (ketQuaDat >= toiThieu) {
      // Đạt 0-100%
      return (ketQuaDat - toiThieu) / (mucTieu - toiThieu) * 100;
    } else {
      return 0;
    }
  }

  async tinhDiemTongKet(danhGiaId: number) {
    const ketQuaKPIs = await this.prisma.ketQuaKPI.findMany({
      where: { danhGiaId },
    });

    const diemTongKet = ketQuaKPIs.reduce(
      (sum, kq) => sum + Number(kq.diemQuyDoi || 0),
      0,
    );

    const xepLoai = this.xepLoaiTheoĐiem(diemTongKet);

    await this.prisma.danhGiaKPINhanVien.update({
      where: { id: danhGiaId },
      data: {
        diemTongKet,
        xepLoai,
      },
    });

    return { diemTongKet, xepLoai };
  }

  private xepLoaiTheoĐiem(diem: number): XepLoaiKPI {
    if (diem >= 95) return XepLoaiKPI.XUAT_SAC;
    if (diem >= 80) return XepLoaiKPI.TOT;
    if (diem >= 65) return XepLoaiKPI.KHA;
    if (diem >= 50) return XepLoaiKPI.TRUNG_BINH;
    return XepLoaiKPI.YEU;
  }

  async guiDuyet(danhGiaId: number) {
    const danhGia = await this.prisma.danhGiaKPINhanVien.findUnique({
      where: { id: danhGiaId },
    });

    if (!danhGia) {
      throw new NotFoundException(`Không tìm thấy đánh giá với ID ${danhGiaId}`);
    }

    if (danhGia.trangThai !== 'NHAP') {
      throw new BadRequestException('Chỉ có thể gửi duyệt đánh giá ở trạng thái NHAP');
    }

    // Tính lại điểm trước khi gửi
    await this.tinhDiemTongKet(danhGiaId);

    return this.prisma.danhGiaKPINhanVien.update({
      where: { id: danhGiaId },
      data: {
        trangThai: 'CHO_DUYET',
      },
    });
  }

  async duyetDanhGia(danhGiaId: number, dto: DuyetDanhGiaKPIDto) {
    const danhGia = await this.prisma.danhGiaKPINhanVien.findUnique({
      where: { id: danhGiaId },
    });

    if (!danhGia) {
      throw new NotFoundException(`Không tìm thấy đánh giá với ID ${danhGiaId}`);
    }

    if (danhGia.trangThai !== 'CHO_DUYET') {
      throw new BadRequestException('Chỉ có thể duyệt đánh giá ở trạng thái CHO_DUYET');
    }

    return this.prisma.danhGiaKPINhanVien.update({
      where: { id: danhGiaId },
      data: {
        trangThai: 'DA_DUYET',
        nguoiDuyet: dto.nguoiDuyet || 'SYSTEM',
        ngayDuyet: new Date(),
      },
    });
  }

  async tuChoiDanhGia(danhGiaId: number, lyDo: string) {
    const danhGia = await this.prisma.danhGiaKPINhanVien.findUnique({
      where: { id: danhGiaId },
    });

    if (!danhGia) {
      throw new NotFoundException(`Không tìm thấy đánh giá với ID ${danhGiaId}`);
    }

    return this.prisma.danhGiaKPINhanVien.update({
      where: { id: danhGiaId },
      data: {
        trangThai: 'TU_CHOI',
        nhanXetChung: `${danhGia.nhanXetChung || ''}\n[TỪ CHỐI]: ${lyDo}`,
      },
    });
  }

  // ============================================
  // CẤU HÌNH THƯỞNG
  // ============================================

  async layCauHinhThuong(nam: number) {
    return this.prisma.cauHinhThuongKPI.findMany({
      where: { nam, trangThai: true },
      orderBy: { diemToiThieu: 'desc' },
    });
  }

  async luuCauHinhThuong(dto: TaoCauHinhThuongDto) {
    return this.prisma.cauHinhThuongKPI.upsert({
      where: {
        nam_xepLoai: {
          nam: dto.nam,
          xepLoai: dto.xepLoai as any,
        },
      },
      update: {
        diemToiThieu: dto.diemToiThieu,
        diemToiDa: dto.diemToiDa,
        heSoThuong: dto.heSoThuong,
        moTa: dto.moTa,
      },
      create: {
        nam: dto.nam,
        xepLoai: dto.xepLoai as any,
        diemToiThieu: dto.diemToiThieu,
        diemToiDa: dto.diemToiDa,
        heSoThuong: dto.heSoThuong,
        moTa: dto.moTa,
      },
    });
  }

  async khoiTaoCauHinhThuongMacDinh(nam: number) {
    const cauHinhMacDinh = [
      { xepLoai: 'XUAT_SAC', diemToiThieu: 95, diemToiDa: 150, heSoThuong: 2.0, moTa: 'Xuất sắc - 2x lương' },
      { xepLoai: 'TOT', diemToiThieu: 80, diemToiDa: 94.99, heSoThuong: 1.5, moTa: 'Tốt - 1.5x lương' },
      { xepLoai: 'KHA', diemToiThieu: 65, diemToiDa: 79.99, heSoThuong: 1.0, moTa: 'Khá - 1x lương' },
      { xepLoai: 'TRUNG_BINH', diemToiThieu: 50, diemToiDa: 64.99, heSoThuong: 0.5, moTa: 'Trung bình - 0.5x lương' },
      { xepLoai: 'YEU', diemToiThieu: 0, diemToiDa: 49.99, heSoThuong: 0, moTa: 'Yếu - không thưởng' },
    ];

    for (const ch of cauHinhMacDinh) {
      await this.luuCauHinhThuong({
        nam,
        ...ch,
      });
    }

    return this.layCauHinhThuong(nam);
  }

  // ============================================
  // TÍNH THƯỞNG KPI
  // ============================================

  async tinhThuongKPI(dto: TinhThuongKPIDto): Promise<KetQuaTinhThuongDto[]> {
    const kyDanhGia = await this.prisma.kyDanhGiaKPI.findUnique({
      where: { id: dto.kyDanhGiaId },
      include: {
        danhGiaNhanViens: {
          where: { trangThai: 'DA_DUYET' },
          include: {
            ketQuaKPIs: true,
          },
        },
      },
    });

    if (!kyDanhGia) {
      throw new NotFoundException(`Không tìm thấy kỳ đánh giá với ID ${dto.kyDanhGiaId}`);
    }

    const cauHinhThuong = await this.layCauHinhThuong(kyDanhGia.nam);
    const ketQua: KetQuaTinhThuongDto[] = [];

    for (const danhGia of kyDanhGia.danhGiaNhanViens) {
      // Lấy thông tin nhân viên
      const nhanVien = await this.prisma.nhanVien.findUnique({
        where: { id: danhGia.nhanVienId },
      });

      if (!nhanVien) continue;

      const diemTongKet = Number(danhGia.diemTongKet || 0);
      const xepLoai = danhGia.xepLoai || 'YEU';

      // Tìm hệ số thưởng theo xếp loại
      const cauHinh = cauHinhThuong.find((ch) => ch.xepLoai === xepLoai);
      const heSoThuong = Number(cauHinh?.heSoThuong || 0);
      const soTienThuong = dto.mucThuongCoBan * heSoThuong;

      // Cập nhật vào đánh giá
      await this.prisma.danhGiaKPINhanVien.update({
        where: { id: danhGia.id },
        data: {
          heSoThuong,
          soTienThuong,
        },
      });

      ketQua.push({
        nhanVienId: nhanVien.id,
        maNhanVien: nhanVien.maNhanVien,
        hoTen: nhanVien.hoTen,
        diemTongKet,
        xepLoai,
        heSoThuong,
        soTienThuong,
      });
    }

    return ketQua;
  }

  // ============================================
  // BÁO CÁO
  // ============================================

  async baoCaoKPITheoPhongBan(kyDanhGiaId: number) {
    const danhGias = await this.prisma.danhGiaKPINhanVien.findMany({
      where: { kyDanhGiaId },
      include: {
        ketQuaKPIs: {
          include: { chiTieu: true },
        },
      },
    });

    // Lấy thông tin nhân viên và phòng ban
    const nhanVienIds = danhGias.map((d) => d.nhanVienId);
    const nhanViens = await this.prisma.nhanVien.findMany({
      where: { id: { in: nhanVienIds } },
      include: { phongBan: true },
    });

    // Group theo phòng ban
    const baoCao: Record<string, any> = {};

    for (const danhGia of danhGias) {
      const nhanVien = nhanViens.find((nv) => nv.id === danhGia.nhanVienId);
      if (!nhanVien) continue;

      const phongBan = nhanVien.phongBan.tenPhongBan;
      if (!baoCao[phongBan]) {
        baoCao[phongBan] = {
          tenPhongBan: phongBan,
          soNhanVien: 0,
          diemTrungBinh: 0,
          thongKeXepLoai: {
            XUAT_SAC: 0,
            TOT: 0,
            KHA: 0,
            TRUNG_BINH: 0,
            YEU: 0,
          },
          tongThuong: 0,
          chiTiet: [],
        };
      }

      baoCao[phongBan].soNhanVien++;
      baoCao[phongBan].diemTrungBinh += Number(danhGia.diemTongKet || 0);
      if (danhGia.xepLoai) {
        baoCao[phongBan].thongKeXepLoai[danhGia.xepLoai]++;
      }
      baoCao[phongBan].tongThuong += Number(danhGia.soTienThuong || 0);
      baoCao[phongBan].chiTiet.push({
        maNhanVien: nhanVien.maNhanVien,
        hoTen: nhanVien.hoTen,
        diemTongKet: Number(danhGia.diemTongKet || 0),
        xepLoai: danhGia.xepLoai,
        soTienThuong: Number(danhGia.soTienThuong || 0),
      });
    }

    // Tính trung bình
    for (const pb of Object.values(baoCao)) {
      if (pb.soNhanVien > 0) {
        pb.diemTrungBinh = Math.round(pb.diemTrungBinh / pb.soNhanVien * 100) / 100;
      }
    }

    return Object.values(baoCao);
  }
}
