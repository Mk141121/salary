// Service Bảng Lương - Xử lý logic nghiệp vụ bảng lương
import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { TinhLuongService } from './tinh-luong.service';
import { NgayCongService } from './ngay-cong.service';
import { PhuCapNhanVienService } from '../phu-cap-nhan-vien/phu-cap-nhan-vien.service';
import { BHXHThueService } from '../bhxh-thue/bhxh-thue.service';
import { SnapshotDieuChinhService } from '../snapshot-dieu-chinh/snapshot-dieu-chinh.service';
import { ChamCongService } from '../cham-cong/cham-cong.service';
import { AuditLogService } from '../../common/services/audit-log.service';
import {
  TaoBangLuongDto,
  CapNhatBangLuongDto,
  CapNhatChiTietLuongDto,
  ChotBangLuongDto,
} from './dto/bang-luong.dto';
import { NguonChiTiet, CachTinhLuong } from '@prisma/client';

@Injectable()
export class BangLuongService {
  private readonly logger = new Logger(BangLuongService.name);

  constructor(
    private prisma: PrismaService,
    private tinhLuongService: TinhLuongService,
    private ngayCongService: NgayCongService,
    private phuCapNhanVienService: PhuCapNhanVienService,
    private bhxhThueService: BHXHThueService,
    private snapshotService: SnapshotDieuChinhService,
    private chamCongService: ChamCongService,
    private auditLogService: AuditLogService,
  ) {}

  /**
   * Lấy lương cơ bản hiệu lực từ HopDong tại thời điểm
   * Nếu không có HopDong, fallback về luongCoBan trong bảng NhanVien
   */
  private async layLuongCoBanHieuLuc(nhanVienId: number, ngay: Date): Promise<number> {
    const hopDong = await this.prisma.nhanVienHopDong.findFirst({
      where: {
        nhanVienId,
        trangThai: 'HIEU_LUC',
        tuNgay: { lte: ngay },
        OR: [
          { denNgay: null },
          { denNgay: { gte: ngay } },
        ],
      },
      orderBy: { tuNgay: 'desc' },
    });

    if (hopDong) {
      return Number(hopDong.luongCoBan);
    }

    // Fallback: Lấy từ NhanVien (backward compatibility)
    const nhanVien = await this.prisma.nhanVien.findUnique({
      where: { id: nhanVienId },
    });
    return Number(nhanVien?.luongCoBan || 0);
  }

  /**
   * Batch lấy lương cơ bản hiệu lực cho nhiều nhân viên
   */
  private async layLuongCoBanBatch(nhanVienIds: number[], ngay: Date): Promise<Map<number, number>> {
    const result = new Map<number, number>();

    // Lấy tất cả hợp đồng hiệu lực
    const hopDongs = await this.prisma.nhanVienHopDong.findMany({
      where: {
        nhanVienId: { in: nhanVienIds },
        trangThai: 'HIEU_LUC',
        tuNgay: { lte: ngay },
        OR: [
          { denNgay: null },
          { denNgay: { gte: ngay } },
        ],
      },
      orderBy: { tuNgay: 'desc' },
    });

    // Nhóm theo nhân viên (lấy hợp đồng mới nhất)
    for (const hd of hopDongs) {
      if (!result.has(hd.nhanVienId)) {
        result.set(hd.nhanVienId, Number(hd.luongCoBan));
      }
    }

    // Fallback cho những nhân viên không có hợp đồng
    const missingIds = nhanVienIds.filter(id => !result.has(id));
    if (missingIds.length > 0) {
      const nhanViens = await this.prisma.nhanVien.findMany({
        where: { id: { in: missingIds } },
      });
      for (const nv of nhanViens) {
        result.set(nv.id, Number(nv.luongCoBan || 0));
      }
    }

    return result;
  }

  // Lấy danh sách bảng lương (có pagination)
  async layDanhSach(
    thang?: number,
    nam?: number,
    phongBanId?: number,
    trang: number = 1,
    soLuong: number = 20,
  ) {
    const where: Record<string, unknown> = {};

    if (thang) where.thang = thang;
    if (nam) where.nam = nam;
    if (phongBanId) where.phongBanId = phongBanId;

    const skip = (trang - 1) * soLuong;

    const [bangLuongs, tongSo] = await Promise.all([
      this.prisma.bangLuong.findMany({
        where,
        include: {
          phongBan: {
            select: { id: true, maPhongBan: true, tenPhongBan: true },
          },
          _count: {
            select: { chiTiets: true },
          },
        },
        orderBy: [{ nam: 'desc' }, { thang: 'desc' }],
        skip,
        take: soLuong,
      }),
      this.prisma.bangLuong.count({ where }),
    ]);

    // Tính tổng cho mỗi bảng lương
    const data = await Promise.all(
      bangLuongs.map(async (bl) => {
        const tong = await this.tinhLuongService.tinhTongBangLuong(bl.id);
        return {
          ...bl,
          tongThuNhap: tong.tongThuNhap,
          tongKhauTru: tong.tongKhauTru,
          thucLinh: tong.thucLinh,
          soNhanVien: tong.soNhanVien,
        };
      }),
    );

    const tongTrang = Math.ceil(tongSo / soLuong);
    return {
      data,
      meta: {
        tongSo,
        trang,
        soLuong,
        tongTrang,
        coTrangTruoc: trang > 1,
        coTrangSau: trang < tongTrang,
      },
    };
  }

  // Lấy chi tiết bảng lương theo ID
  async layTheoId(id: number) {
    const bangLuong = await this.prisma.bangLuong.findUnique({
      where: { id },
      include: {
        phongBan: true,
      },
    });

    if (!bangLuong) {
      throw new NotFoundException(`Không tìm thấy bảng lương với ID: ${id}`);
    }

    // Lấy chi tiết đầy đủ
    const chiTiet = await this.tinhLuongService.layBangLuongChiTiet(id);

    return chiTiet;
  }

  // Tạo bảng lương mới
  async taoMoi(dto: TaoBangLuongDto) {
    // Kiểm tra đã tồn tại chưa
    const existing = await this.prisma.bangLuong.findUnique({
      where: {
        thang_nam_phongBanId: {
          thang: dto.thang,
          nam: dto.nam,
          phongBanId: dto.phongBanId,
        },
      },
    });

    if (existing) {
      throw new ConflictException(
        `Bảng lương tháng ${dto.thang}/${dto.nam} của phòng ban này đã tồn tại`,
      );
    }

    // Kiểm tra phòng ban tồn tại
    const phongBan = await this.prisma.phongBan.findUnique({
      where: { id: dto.phongBanId },
    });

    if (!phongBan) {
      throw new NotFoundException(`Không tìm thấy phòng ban với ID: ${dto.phongBanId}`);
    }

    // Tạo bảng lương
    const bangLuong = await this.prisma.bangLuong.create({
      data: {
        thang: dto.thang,
        nam: dto.nam,
        phongBanId: dto.phongBanId,
        tenBangLuong: dto.tenBangLuong || `Bảng lương ${phongBan.tenPhongBan} - Tháng ${dto.thang}/${dto.nam}`,
        trangThai: 'NHAP',
      },
      include: {
        phongBan: true,
      },
    });

    // Tự động tạo chi tiết lương cơ bản cho nhân viên trong phòng ban
    if (dto.tuDongTaoChiTiet !== false) {
      // Khởi tạo ngày công từ chấm công
      await this.ngayCongService.khoiTaoNgayCongTuChamCong(bangLuong.id);
      
      // Tạo chi tiết lương
      await this.taoChiTietTuDong(bangLuong.id, dto.phongBanId, dto.thang, dto.nam);
    }

    return bangLuong;
  }

  // Tự động tạo chi tiết lương từ cơ cấu lương và lương cơ bản nhân viên
  // Áp dụng rule tính lương theo cachTinh:
  // - LUONG_THANG_CO_DINH: Giá trị cố định, không chia theo ngày
  // - THEO_NGAY_CONG: Giá trị = Định mức × (ngày thực tế / ngày lý thuyết)
  // - CHUYEN_CAN_DIEU_KIEN: Full nếu nghỉ không phép ≤ 2 ngày, 0 nếu > 2 ngày
  private async taoChiTietTuDong(bangLuongId: number, phongBanId: number, thang: number, nam: number) {
    // Lấy danh sách nhân viên
    const nhanViens = await this.prisma.nhanVien.findMany({
      where: {
        phongBanId,
        trangThai: 'DANG_LAM',
      },
    });

    // Lấy tất cả khoản lương (bao gồm cả cachTinh)
    const tatCaKhoanLuong = await this.prisma.khoanLuong.findMany({
      where: { trangThai: true },
    });
    const khoanLuongMap = new Map(tatCaKhoanLuong.map(kl => [kl.maKhoan, kl]));

    // Lấy khoản lương cơ bản
    const luongCoBan = khoanLuongMap.get('LUONG_CO_BAN');
    if (!luongCoBan) return;

    // Tính số ngày công lý thuyết theo rule (Thứ 7 = 0.5, CN = 0)
    const ngayCongLyThuyet = this.chamCongService.tinhSoNgayCongLyThuyet(thang, nam);

    // Lấy cơ cấu lương của phòng ban (nếu có)
    const coCauLuong = await this.prisma.coCauLuong.findFirst({
      where: {
        phongBanId,
        trangThai: true,
      },
      include: {
        chiTiets: {
          include: {
            khoanLuong: true,
          },
        },
      },
    });

    // Lấy phụ cấp cố định cho tất cả nhân viên trong tháng này
    const nhanVienIds = nhanViens.map((nv) => nv.id);
    const phuCaps = await this.phuCapNhanVienService.layPhuCapTheoThangBatch(
      nhanVienIds,
      thang,
      nam,
    );

    // Nhóm phụ cấp theo nhân viên
    const phuCapTheoNhanVien = new Map<number, typeof phuCaps>();
    for (const pc of phuCaps) {
      if (!phuCapTheoNhanVien.has(pc.nhanVienId)) {
        phuCapTheoNhanVien.set(pc.nhanVienId, []);
      }
      phuCapTheoNhanVien.get(pc.nhanVienId)!.push(pc);
    }

    // Lấy chấm công của tất cả nhân viên (batch query - tránh N+1)
    const chamCongBatch = await this.chamCongService.layChamCongNhieuNhanVien(nhanVienIds, thang, nam);
    
    const chamCongMap = new Map<number, { soNgayCongThucTe: number; soNgayNghiKhongLuong: number; soNgayNghiPhep: number }>();
    for (const nv of nhanViens) {
      const cc = chamCongBatch.get(nv.id);
      if (cc) {
        chamCongMap.set(nv.id, {
          soNgayCongThucTe: Number(cc.soCongThucTe) || 0,
          soNgayNghiKhongLuong: Number(cc.soNgayNghiKhongLuong) || 0,
          soNgayNghiPhep: Number(cc.soNgayNghiPhep) || 0,
        });
      }
    }

    // Lấy lương cơ bản từ HopDong hiệu lực tại thời điểm cuối tháng
    const ngayTinhLuong = new Date(nam, thang - 1, 28); // Ngày 28 của tháng tính lương
    const luongCoBanMap = await this.layLuongCoBanBatch(nhanVienIds, ngayTinhLuong);

    const chiTietData: {
      bangLuongId: number;
      nhanVienId: number;
      khoanLuongId: number;
      soTien: number;
      nguon: NguonChiTiet;
    }[] = [];

    // Set để theo dõi các khoản đã thêm (tránh trùng)
    const daThemKhoan = new Set<string>();

    for (const nv of nhanViens) {
      const key = (khoanLuongId: number) => `${nv.id}-${khoanLuongId}`;
      const chamCong = chamCongMap.get(nv.id) || { soNgayCongThucTe: ngayCongLyThuyet, soNgayNghiKhongLuong: 0, soNgayNghiPhep: 0 };
      
      // Tính ngày công thực tế = ngày đi làm + ngày nghỉ có phép (nghỉ có phép tính như đi làm)
      const ngayCongThucTe = chamCong.soNgayCongThucTe + chamCong.soNgayNghiPhep;

      // Lấy lương cơ bản từ HopDong (hoặc fallback từ NhanVien)
      const mucLuongCoBan = luongCoBanMap.get(nv.id) || Number(nv.luongCoBan) || 0;

      // 1. Thêm lương cơ bản (tính theo ngày công thực tế)
      // Công thức: Lương cơ bản × (ngày công thực tế / ngày công lý thuyết)
      const luongCoBanThucTe = Math.round(
        mucLuongCoBan * (ngayCongThucTe / ngayCongLyThuyet)
      );
      chiTietData.push({
        bangLuongId,
        nhanVienId: nv.id,
        khoanLuongId: luongCoBan.id,
        soTien: luongCoBanThucTe,
        nguon: NguonChiTiet.NHAP_TAY,
      });
      daThemKhoan.add(key(luongCoBan.id));

      // 2. Thêm phụ cấp cố định từ hồ sơ nhân viên (áp dụng cachTinh)
      const phuCapsNv = phuCapTheoNhanVien.get(nv.id) || [];
      for (const pc of phuCapsNv) {
        if (!daThemKhoan.has(key(pc.khoanLuongId))) {
          const khoanLuong = tatCaKhoanLuong.find(kl => kl.id === pc.khoanLuongId);
          const giaTriGoc = Number(pc.soTien);
          let soTienThucTe = giaTriGoc;

          if (khoanLuong) {
            soTienThucTe = this.tinhGiaTriTheoRule(
              giaTriGoc,
              khoanLuong.cachTinh,
              ngayCongThucTe,
              ngayCongLyThuyet,
              chamCong.soNgayNghiKhongLuong,
            );
          }

          chiTietData.push({
            bangLuongId,
            nhanVienId: nv.id,
            khoanLuongId: pc.khoanLuongId,
            soTien: Math.round(soTienThucTe),
            nguon: NguonChiTiet.CO_DINH,
          });
          daThemKhoan.add(key(pc.khoanLuongId));
        }
      }

      // 3. Thêm các khoản từ cơ cấu lương (nếu có và chưa có)
      if (coCauLuong) {
        for (const ct of coCauLuong.chiTiets) {
          if (!daThemKhoan.has(key(ct.khoanLuongId)) && Number(ct.giaTriMacDinh) > 0) {
            const giaTriGoc = Number(ct.giaTriMacDinh);
            let soTienThucTe = giaTriGoc;

            if (ct.khoanLuong) {
              soTienThucTe = this.tinhGiaTriTheoRule(
                giaTriGoc,
                ct.khoanLuong.cachTinh,
                ngayCongThucTe,
                ngayCongLyThuyet,
                chamCong.soNgayNghiKhongLuong,
              );
            }

            chiTietData.push({
              bangLuongId,
              nhanVienId: nv.id,
              khoanLuongId: ct.khoanLuongId,
              soTien: Math.round(soTienThucTe),
              nguon: NguonChiTiet.NHAP_TAY,
            });
            daThemKhoan.add(key(ct.khoanLuongId));
          }
        }
      }
    }

    // 4. Tính và thêm các khoản phạt từ chấm công
    const khoanPhatDiMuon = khoanLuongMap.get('PHAT_DI_MUON');
    const khoanPhatVeSom = khoanLuongMap.get('PHAT_VE_SOM');
    const khoanPhatNghiKhongPhep = khoanLuongMap.get('PHAT_NGHI_KHONG_PHEP');
    const khoanTruNgayCong = khoanLuongMap.get('TRU_NGAY_CONG');

    for (const nv of nhanViens) {
      try {
        const ketQuaPhat = await this.chamCongService.tinhTienPhat(nv.id, thang, nam);
        
        // Thêm phạt đi muộn
        if (khoanPhatDiMuon && ketQuaPhat.tienPhatDiMuon > 0) {
          chiTietData.push({
            bangLuongId,
            nhanVienId: nv.id,
            khoanLuongId: khoanPhatDiMuon.id,
            soTien: ketQuaPhat.tienPhatDiMuon,
            nguon: NguonChiTiet.CHAM_CONG,
          });
        }
        
        // Thêm phạt về sớm
        if (khoanPhatVeSom && ketQuaPhat.tienPhatVeSom > 0) {
          chiTietData.push({
            bangLuongId,
            nhanVienId: nv.id,
            khoanLuongId: khoanPhatVeSom.id,
            soTien: ketQuaPhat.tienPhatVeSom,
            nguon: NguonChiTiet.CHAM_CONG,
          });
        }
        
        // Thêm phạt nghỉ không phép
        if (khoanPhatNghiKhongPhep && ketQuaPhat.tienPhatNghiKhongPhep > 0) {
          chiTietData.push({
            bangLuongId,
            nhanVienId: nv.id,
            khoanLuongId: khoanPhatNghiKhongPhep.id,
            soTien: ketQuaPhat.tienPhatNghiKhongPhep,
            nguon: NguonChiTiet.CHAM_CONG,
          });
        }
        
        // Thêm trừ ngày công
        if (khoanTruNgayCong && ketQuaPhat.truLuongNgayCong > 0) {
          chiTietData.push({
            bangLuongId,
            nhanVienId: nv.id,
            khoanLuongId: khoanTruNgayCong.id,
            soTien: ketQuaPhat.truLuongNgayCong,
            nguon: NguonChiTiet.CHAM_CONG,
          });
        }
      } catch (error) {
        // Không có dữ liệu chấm công, bỏ qua phạt
        this.logger.warn(`Không có dữ liệu chấm công cho NV ${nv.maNhanVien}: ${error.message}`);
      }
    }

    // 5. Thêm khấu trừ ứng lương từ bảng ứng lương đã chốt trong tháng
    const khoanKhauTruUngLuong = khoanLuongMap.get('KHAU_TRU_UNG_LUONG');
    if (khoanKhauTruUngLuong) {
      const thangNamStr = `${nam}-${thang.toString().padStart(2, '0')}`;
      
      // Lấy tất cả chi tiết ứng lương đã chốt trong tháng cho phòng ban này
      const ungLuongDaChot = await this.prisma.chiTietBangUngLuong.findMany({
        where: {
          bangUngLuong: {
            thangNam: thangNamStr,
            phongBanId: phongBanId,
            trangThai: { in: ['DA_CHOT', 'DA_KHOA'] },
          },
          nhanVienId: { in: nhanViens.map(nv => nv.id) },
        },
        include: {
          bangUngLuong: true,
        },
      });

      // Gộp tổng ứng lương theo nhân viên
      const tongUngTheoNV = new Map<number, number>();
      for (const ct of ungLuongDaChot) {
        const soTienUng = Number(ct.soTienUngDuyet) || 0;
        const current = tongUngTheoNV.get(ct.nhanVienId) || 0;
        tongUngTheoNV.set(ct.nhanVienId, current + soTienUng);
      }

      // Thêm vào chi tiết bảng lương
      for (const [nhanVienId, tongUng] of tongUngTheoNV) {
        if (tongUng > 0) {
          chiTietData.push({
            bangLuongId,
            nhanVienId,
            khoanLuongId: khoanKhauTruUngLuong.id,
            soTien: tongUng,
            nguon: NguonChiTiet.UNG_LUONG,
          });
        }
      }
    }

    if (chiTietData.length > 0) {
      await this.prisma.chiTietBangLuong.createMany({
        data: chiTietData,
        skipDuplicates: true,
      });
    }
  }

  /**
   * Tính giá trị thực tế theo rule (cachTinh)
   * - LUONG_THANG_CO_DINH: Giữ nguyên giá trị
   * - THEO_NGAY_CONG: Giá trị = giaTriGoc × (ngayCongThucTe / ngayCongLyThuyet)
   * - CHUYEN_CAN_DIEU_KIEN: Full nếu nghỉ không phép ≤ 2, 0 nếu > 2
   */
  private tinhGiaTriTheoRule(
    giaTriGoc: number,
    cachTinh: CachTinhLuong,
    ngayCongThucTe: number,
    ngayCongLyThuyet: number,
    soNgayNghiKhongPhep: number,
  ): number {
    switch (cachTinh) {
      case CachTinhLuong.LUONG_THANG_CO_DINH:
        // Lương cố định tháng, không chia theo ngày
        return giaTriGoc;

      case CachTinhLuong.THEO_NGAY_CONG:
        // Phụ cấp = Định mức × (ngày thực tế / ngày lý thuyết)
        if (ngayCongLyThuyet <= 0) return giaTriGoc;
        return giaTriGoc * (ngayCongThucTe / ngayCongLyThuyet);

      case CachTinhLuong.CHUYEN_CAN_DIEU_KIEN:
        // Full nếu nghỉ không phép ≤ 2 ngày, 0 nếu > 2 ngày
        return soNgayNghiKhongPhep <= 2 ? giaTriGoc : 0;

      default:
        return giaTriGoc;
    }
  }

  // Cập nhật thông tin bảng lương
  async capNhat(id: number, dto: CapNhatBangLuongDto) {
    const bangLuong = await this.prisma.bangLuong.findUnique({
      where: { id },
    });

    if (!bangLuong) {
      throw new NotFoundException(`Không tìm thấy bảng lương với ID: ${id}`);
    }

    if (bangLuong.trangThai !== 'NHAP') {
      throw new BadRequestException('Không thể sửa bảng lương đã chốt hoặc khóa');
    }

    return this.prisma.bangLuong.update({
      where: { id },
      data: dto,
    });
  }

  // Cập nhật chi tiết lương (một ô trong bảng)
  async capNhatChiTiet(dto: CapNhatChiTietLuongDto) {
    // Kiểm tra bảng lương
    const bangLuong = await this.prisma.bangLuong.findUnique({
      where: { id: dto.bangLuongId },
    });

    if (!bangLuong) {
      throw new NotFoundException(`Không tìm thấy bảng lương với ID: ${dto.bangLuongId}`);
    }

    if (bangLuong.trangThai !== 'NHAP') {
      throw new BadRequestException('Không thể sửa bảng lương đã chốt hoặc khóa');
    }

    // Lấy giá trị cũ để lưu lịch sử
    const existing = await this.prisma.chiTietBangLuong.findUnique({
      where: {
        bangLuongId_nhanVienId_khoanLuongId: {
          bangLuongId: dto.bangLuongId,
          nhanVienId: dto.nhanVienId,
          khoanLuongId: dto.khoanLuongId,
        },
      },
    });

    // Kiểm tra không cho sửa phụ cấp cố định
    if (existing && existing.nguon === NguonChiTiet.CO_DINH) {
      throw new BadRequestException(
        'Không thể sửa phụ cấp cố định trong bảng lương. Vui lòng điều chỉnh tại hồ sơ nhân viên.',
      );
    }

    const giaTriCu = existing ? Number(existing.soTien) : null;

    // Upsert chi tiết lương
    const chiTiet = await this.prisma.chiTietBangLuong.upsert({
      where: {
        bangLuongId_nhanVienId_khoanLuongId: {
          bangLuongId: dto.bangLuongId,
          nhanVienId: dto.nhanVienId,
          khoanLuongId: dto.khoanLuongId,
        },
      },
      update: {
        soTien: dto.soTien,
        ghiChu: dto.ghiChu,
      },
      create: {
        bangLuongId: dto.bangLuongId,
        nhanVienId: dto.nhanVienId,
        khoanLuongId: dto.khoanLuongId,
        soTien: dto.soTien,
        ghiChu: dto.ghiChu,
        nguon: NguonChiTiet.NHAP_TAY,
      },
      include: {
        nhanVien: true,
        khoanLuong: true,
      },
    });

    // Lưu lịch sử chỉnh sửa
    await this.prisma.lichSuChinhSua.create({
      data: {
        bangLuongId: dto.bangLuongId,
        nhanVienId: dto.nhanVienId,
        khoanLuongId: dto.khoanLuongId,
        giaTriCu: giaTriCu,
        giaTriMoi: dto.soTien,
        loaiThayDoi: existing ? 'CAP_NHAT' : 'TAO_MOI',
        nguoiThayDoi: dto.nguoiThayDoi || 'Hệ thống',
        lyDo: dto.lyDo,
      },
    });

    // Tính lại tổng cho nhân viên
    const tongLuong = await this.tinhLuongService.tinhTongLuongNhanVien(
      dto.bangLuongId,
      dto.nhanVienId,
    );

    return {
      chiTiet,
      tongLuong,
    };
  }

  // Cập nhật nhiều chi tiết lương cùng lúc (batch update)
  async capNhatNhieuChiTiet(danhSach: CapNhatChiTietLuongDto[]) {
    const ketQua = [];

    for (const dto of danhSach) {
      const result = await this.capNhatChiTiet(dto);
      ketQua.push(result);
    }

    return ketQua;
  }

  // Chốt bảng lương - Tính BHXH/Thuế và tạo snapshot
  async chotBangLuong(id: number, dto: ChotBangLuongDto, nguoiDungId?: number) {
    const bangLuong = await this.prisma.bangLuong.findUnique({
      where: { id },
      include: { phongBan: true },
    });

    if (!bangLuong) {
      throw new NotFoundException(`Không tìm thấy bảng lương với ID: ${id}`);
    }

    if (bangLuong.trangThai !== 'NHAP') {
      throw new BadRequestException('Bảng lương đã được chốt trước đó');
    }

    // Bước 1: Tính BHXH/Thuế TNCN cho toàn bộ nhân viên
    try {
      await this.bhxhThueService.tinhChoToBoNhanVien(id);
    } catch (error) {
      // Nếu chưa có cấu hình BHXH/Thuế, bỏ qua (cho phép chốt không tính)
      this.logger.warn(`Bỏ qua tính BHXH/Thuế: ${error.message}`);
    }

    // Bước 2: Tạo snapshot và cập nhật trạng thái
    const result = await this.snapshotService.taoSnapshot(id, dto.nguoiChot);

    // Ghi audit log
    await this.auditLogService.ghiLogChotBangLuong({
      nguoiDungId,
      tenDangNhap: dto.nguoiChot,
      bangLuongId: id,
      thang: bangLuong.thang,
      nam: bangLuong.nam,
      phongBan: bangLuong.phongBan.tenPhongBan,
    });

    return {
      ...result,
      ghiChu: dto.ghiChu,
    };
  }

  // Mở khóa bảng lương (cho admin) - YÊU CẦU LÝ DO
  async moKhoaBangLuong(id: number, lyDo: string, nguoiDungId?: number, tenDangNhap?: string) {
    if (!lyDo || lyDo.trim().length < 10) {
      throw new BadRequestException('Lý do mở khóa phải có ít nhất 10 ký tự');
    }

    const bangLuong = await this.prisma.bangLuong.findUnique({
      where: { id },
    });

    if (!bangLuong) {
      throw new NotFoundException(`Không tìm thấy bảng lương với ID: ${id}`);
    }

    if (bangLuong.trangThai === 'KHOA') {
      throw new BadRequestException('Bảng lương đã khóa hoàn toàn, không thể mở');
    }

    const result = await this.prisma.bangLuong.update({
      where: { id },
      data: {
        trangThai: 'NHAP',
        ngayChot: null,
        nguoiChot: null,
      },
    });

    // Ghi audit log
    await this.auditLogService.ghiLogMoKhoaBangLuong({
      nguoiDungId,
      tenDangNhap,
      bangLuongId: id,
      lyDo,
    });

    return result;
  }

  // Khóa vĩnh viễn bảng lương
  async khoaBangLuong(id: number, nguoiDungId?: number, tenDangNhap?: string) {
    const bangLuong = await this.prisma.bangLuong.findUnique({
      where: { id },
    });

    if (!bangLuong) {
      throw new NotFoundException(`Không tìm thấy bảng lương với ID: ${id}`);
    }

    if (bangLuong.trangThai !== 'DA_CHOT') {
      throw new BadRequestException('Phải chốt bảng lương trước khi khóa');
    }

    const result = await this.prisma.bangLuong.update({
      where: { id },
      data: { trangThai: 'KHOA' },
    });

    // Ghi audit log
    await this.auditLogService.ghiLogKhoaBangLuong({
      nguoiDungId,
      tenDangNhap,
      bangLuongId: id,
    });

    return result;
  }

  // Xóa bảng lương
  async xoa(id: number, forceDelete = false, nguoiXoa?: string) {
    const bangLuong = await this.prisma.bangLuong.findUnique({
      where: { id },
    });

    if (!bangLuong) {
      throw new NotFoundException(`Không tìm thấy bảng lương với ID: ${id}`);
    }

    // Nếu không phải force delete, chỉ cho phép xóa bảng ở trạng thái NHAP
    if (!forceDelete && bangLuong.trangThai !== 'NHAP') {
      throw new BadRequestException('Không thể xóa bảng lương đã chốt hoặc khóa. ADMIN có thể dùng ?force=true để xóa.');
    }

    // Ghi audit log nếu là force delete
    if (forceDelete && bangLuong.trangThai !== 'NHAP') {
      await this.auditLogService.ghiLog({
        tenDangNhap: nguoiXoa || 'system',
        hanhDong: 'XOA',
        bangDuLieu: 'BangLuong',
        banGhiId: String(id),
        moTa: `ADMIN xóa bảng lương đã ${bangLuong.trangThai}: ${bangLuong.tenBangLuong} (T${bangLuong.thang}/${bangLuong.nam})`,
      });
    }

    // Xóa cascade sẽ xóa cả chi tiết
    return this.prisma.bangLuong.delete({
      where: { id },
    });
  }

  // Lấy lịch sử chỉnh sửa
  async layLichSuChinhSua(bangLuongId: number) {
    return this.prisma.lichSuChinhSua.findMany({
      where: { bangLuongId },
      include: {
        nhanVien: {
          select: { maNhanVien: true, hoTen: true },
        },
        khoanLuong: {
          select: { maKhoan: true, tenKhoan: true },
        },
      },
      orderBy: { ngayThayDoi: 'desc' },
    });
  }

  /**
   * Tính lại tất cả các khoản lương theo ngày công hiện tại
   * Dùng khi cần refresh bảng lương sau khi có thay đổi
   */
  async tinhLaiTatCaKhoanLuong(bangLuongId: number) {
    const bangLuong = await this.prisma.bangLuong.findUnique({
      where: { id: bangLuongId },
    });

    if (!bangLuong) {
      throw new NotFoundException(`Không tìm thấy bảng lương với ID: ${bangLuongId}`);
    }

    if (bangLuong.trangThai !== 'NHAP') {
      throw new BadRequestException(
        `Không thể tính lại lương cho bảng lương ở trạng thái ${bangLuong.trangThai}. Chỉ có thể tính lại khi ở trạng thái NHẬP.`
      );
    }

    // Lấy tất cả ngày công của bảng lương
    const danhSachNgayCong = await this.ngayCongService.layTatCaNgayCong(bangLuongId);

    let soNhanVienCapNhat = 0;

    for (const ngayCong of danhSachNgayCong) {
      const ngayCongThucTe = this.ngayCongService.tinhNgayCongThucTe(ngayCong);
      
      // Tính lại khoản lương cho từng nhân viên
      await this.ngayCongService.tinhLaiKhoanLuongTheoNgayCong(
        bangLuongId,
        ngayCong.nhanVienId,
        ngayCongThucTe,
      );
      
      soNhanVienCapNhat++;
    }

    return {
      success: true,
      message: `Đã tính lại lương cho ${soNhanVienCapNhat} nhân viên`,
      soNhanVien: soNhanVienCapNhat,
    };
  }
}
