// Payroll Sync Service - Sprint 10
// Pipeline đồng bộ: Chấm công → Ngày công → Nghỉ phép → OT → Yêu cầu → KPI → Lương
import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Decimal } from '@prisma/client/runtime/library';
import {
  SyncPayrollDto,
  SyncBatchDto,
  RuleTraceQueryDto,
  SyncStep,
  NguonDuLieu,
  SyncProgress,
  SyncStepInfo,
  SyncSummary,
  SyncChangeDetail,
  EnhancedRuleTrace,
  NguonDuLieuInfo,
  PipelineStatus,
  PipelineWarning,
} from './payroll-sync.dto';

@Injectable()
export class PayrollSyncService {
  private readonly logger = new Logger(PayrollSyncService.name);
  
  // In-memory progress tracking
  private progressMap = new Map<number, SyncProgress>();

  constructor(private prisma: PrismaService) {}

  // =============== MAIN PIPELINE ===============

  /**
   * Sync toàn bộ pipeline cho 1 bảng lương
   */
  async syncPayroll(dto: SyncPayrollDto): Promise<SyncProgress> {
    const { bangLuongId, forceRecalc = false, dryRun = false } = dto;

    // Lấy bảng lương
    const bangLuong = await this.prisma.bangLuong.findUnique({
      where: { id: bangLuongId },
      include: { phongBan: true },
    });

    if (!bangLuong) {
      throw new BadRequestException('Không tìm thấy bảng lương');
    }

    if (bangLuong.trangThai === 'KHOA') {
      throw new BadRequestException('Bảng lương đã khóa, không thể sync');
    }

    // Khởi tạo progress
    const progress: SyncProgress = {
      bangLuongId,
      currentStep: SyncStep.CHUA_BAT_DAU,
      steps: this.initSteps(),
      startedAt: new Date(),
    };
    this.progressMap.set(bangLuongId, progress);

    try {
      // Step 1: Sync ngày công từ chấm công
      await this.runStep(progress, SyncStep.SYNC_NGAY_CONG, async () => {
        return this.syncNgayCong(bangLuong, forceRecalc);
      });

      // Step 2: Sync nghỉ phép
      await this.runStep(progress, SyncStep.SYNC_NGHI_PHEP, async () => {
        return this.syncNghiPhep(bangLuong);
      });

      // Step 3: Sync OT
      await this.runStep(progress, SyncStep.SYNC_OT, async () => {
        return this.syncOT(bangLuong);
      });

      // Step 4: Sync yêu cầu (trễ/sớm/công tác)
      await this.runStep(progress, SyncStep.SYNC_YEU_CAU, async () => {
        return this.syncYeuCau(bangLuong);
      });

      // Step 5: Sync KPI
      await this.runStep(progress, SyncStep.SYNC_KPI, async () => {
        return this.syncKPI(bangLuong);
      });

      // Step 6: Tính lương (gọi rule engine nếu không phải dry run)
      if (!dryRun) {
        await this.runStep(progress, SyncStep.TINH_LUONG, async () => {
          return this.triggerRuleEngine(bangLuongId);
        });
      }

      // Hoàn thành
      progress.currentStep = SyncStep.HOAN_THANH;
      progress.completedAt = new Date();
      progress.summary = await this.buildSummary(bangLuongId);

      this.logger.log(`Sync payroll #${bangLuongId} completed successfully`);

    } catch (error) {
      progress.currentStep = SyncStep.LOI;
      progress.error = error.message;
      this.logger.error(`Sync payroll #${bangLuongId} failed: ${error.message}`);
      throw error;
    }

    return progress;
  }

  /**
   * Lấy progress hiện tại
   */
  getProgress(bangLuongId: number): SyncProgress | null {
    return this.progressMap.get(bangLuongId) || null;
  }

  // =============== SYNC STEPS ===============

  /**
   * Sync ngày công từ ChiTietChamCong sang NgayCongBangLuong
   */
  private async syncNgayCong(bangLuong: any, forceRecalc: boolean): Promise<number> {
    const { id: bangLuongId, thang, nam, phongBanId } = bangLuong;

    // Lấy danh sách nhân viên
    const nhanViens = await this.prisma.nhanVien.findMany({
      where: {
        phongBanId,
        trangThai: 'DANG_LAM',
      },
    });

    // Tính khoảng thời gian tháng
    const ngayDau = new Date(nam, thang - 1, 1);
    const ngayCuoi = new Date(nam, thang, 0);

    // Tính ngày công lý thuyết
    const ngayCongLyThuyet = this.tinhNgayCongLyThuyet(thang, nam);

    const records: any[] = [];

    for (const nv of nhanViens) {
      // Aggregate từ ChiTietChamCong
      const chamCongs = await this.prisma.chiTietChamCong.findMany({
        where: {
          nhanVienId: nv.id,
          ngay: { gte: ngayDau, lte: ngayCuoi },
        },
      });

      let soCongThucTe = 0;
      let soNgayNghiPhep = 0;
      let soNgayNghiKhongLuong = 0;
      let soNgayNghiCoLuong = 0;
      let tongGioOT = 0;

      for (const cc of chamCongs) {
        switch (cc.trangThai) {
          case 'DI_LAM':
            soCongThucTe++;
            break;
          case 'NGHI_PHEP':
            soNgayNghiPhep++;
            break;
          case 'NGHI_KHONG_LUONG':
            soNgayNghiKhongLuong++;
            break;
          case 'NGHI_BENH':
            soNgayNghiCoLuong++;
            break;
        }
        tongGioOT += Number(cc.soGioOT || 0);
      }

      records.push({
        bangLuongId,
        nhanVienId: nv.id,
        ngayCongLyThuyet: new Decimal(ngayCongLyThuyet),
        soCongThucTe: new Decimal(soCongThucTe),
        soNgayNghiPhep: new Decimal(soNgayNghiPhep),
        soNgayNghiKhongPhep: new Decimal(0), // Deprecated field
        soNgayNghiCoPhep: new Decimal(soNgayNghiPhep),
        soNgayNghiCoLuong: new Decimal(soNgayNghiCoLuong),
        soNgayNghiKhongLuong: new Decimal(soNgayNghiKhongLuong),
        ngayCongDieuChinh: null,
      });
    }

    // Xóa dữ liệu cũ nếu force recalc
    if (forceRecalc) {
      await this.prisma.ngayCongBangLuong.deleteMany({
        where: { bangLuongId },
      });
    }

    // Upsert từng record
    for (const r of records) {
      await this.prisma.ngayCongBangLuong.upsert({
        where: {
          bangLuongId_nhanVienId: {
            bangLuongId: r.bangLuongId,
            nhanVienId: r.nhanVienId,
          },
        },
        create: r,
        update: {
          soCongThucTe: r.soCongThucTe,
          soNgayNghiPhep: r.soNgayNghiPhep,
          soNgayNghiCoPhep: r.soNgayNghiCoPhep,
          soNgayNghiCoLuong: r.soNgayNghiCoLuong,
          soNgayNghiKhongLuong: r.soNgayNghiKhongLuong,
          ngayCapNhat: new Date(),
        },
      });
    }

    return records.length;
  }

  /**
   * Sync nghỉ phép từ DonNghiPhep đã duyệt
   */
  private async syncNghiPhep(bangLuong: any): Promise<number> {
    const { thang, nam, phongBanId } = bangLuong;
    const ngayDau = new Date(nam, thang - 1, 1);
    const ngayCuoi = new Date(nam, thang, 0);

    // Lấy đơn nghỉ đã duyệt trong tháng
    const dons = await this.prisma.donNghiPhep.findMany({
      where: {
        phongBanId,
        trangThai: 'DA_DUYET',
        OR: [
          { tuNgay: { gte: ngayDau, lte: ngayCuoi } },
          { denNgay: { gte: ngayDau, lte: ngayCuoi } },
          {
            AND: [
              { tuNgay: { lte: ngayDau } },
              { denNgay: { gte: ngayCuoi } },
            ],
          },
        ],
      },
      include: {
        loaiNghi: true,
      },
    });

    // Đã sync qua ChiTietChamCong, chỉ cần đếm
    return dons.length;
  }

  /**
   * Sync giờ OT từ yêu cầu OT đã duyệt
   */
  private async syncOT(bangLuong: any): Promise<number> {
    const { thang, nam, phongBanId } = bangLuong;
    const ngayDau = new Date(nam, thang - 1, 1);
    const ngayCuoi = new Date(nam, thang, 0);

    // Lấy yêu cầu OT đã duyệt
    const yeuCaus = await this.prisma.donYeuCau.findMany({
      where: {
        phongBanId,
        loaiYeuCau: { maLoai: 'OT' },
        trangThai: 'DA_DUYET',
        ngayYeuCau: { gte: ngayDau, lte: ngayCuoi },
      },
    });

    // Đã sync qua ChiTietChamCong.soGioOT
    return yeuCaus.length;
  }

  /**
   * Sync yêu cầu trễ/sớm/công tác đã duyệt
   */
  private async syncYeuCau(bangLuong: any): Promise<number> {
    const { thang, nam, phongBanId } = bangLuong;
    const ngayDau = new Date(nam, thang - 1, 1);
    const ngayCuoi = new Date(nam, thang, 0);

    // Đếm yêu cầu đã duyệt (trừ OT đã xử lý riêng)
    const count = await this.prisma.donYeuCau.count({
      where: {
        phongBanId,
        loaiYeuCau: { maLoai: { in: ['TRE_GIO', 'VE_SOM', 'CONG_TAC', 'LAM_TU_XA'] } },
        trangThai: 'DA_DUYET',
        ngayYeuCau: { gte: ngayDau, lte: ngayCuoi },
      },
    });

    return count;
  }

  /**
   * Sync KPI đã chốt
   */
  private async syncKPI(bangLuong: any): Promise<number> {
    const { thang, nam, phongBanId } = bangLuong;

    // Lấy kỳ đánh giá KPI
    const kyDanhGia = await this.prisma.kyDanhGiaKPI.findFirst({
      where: {
        thang,
        nam,
        trangThai: 'HOAN_THANH',
      },
    });

    if (!kyDanhGia) return 0;

    // Đếm kết quả KPI
    const count = await this.prisma.danhGiaKPINhanVien.count({
      where: {
        kyDanhGiaId: kyDanhGia.id,
      },
    });

    return count;
  }

  /**
   * Trigger rule engine để tính lương
   * (Giả lập - thực tế sẽ gọi RuleEngineExecutorService)
   */
  private async triggerRuleEngine(bangLuongId: number): Promise<number> {
    // Đánh dấu đã sync
    await this.prisma.bangLuong.update({
      where: { id: bangLuongId },
      data: {
        ngayCapNhat: new Date(),
      },
    });

    // Đếm số chi tiết đã có
    const count = await this.prisma.chiTietBangLuong.count({
      where: { bangLuongId },
    });

    return count;
  }

  // =============== ENHANCED RULE TRACE ===============

  /**
   * Lấy rule trace với thông tin nguồn dữ liệu
   */
  async getEnhancedRuleTrace(query: RuleTraceQueryDto): Promise<EnhancedRuleTrace[]> {
    const { bangLuongId, nhanVienId, khoanLuongId } = query;

    const where: any = { bangLuongId };
    if (nhanVienId) where.nhanVienId = nhanVienId;
    if (khoanLuongId) where.khoanLuongId = khoanLuongId;

    const traces = await this.prisma.ruleTrace.findMany({
      where,
      include: {
        nhanVien: { select: { id: true, hoTen: true, maNhanVien: true } },
        quyChe: { select: { id: true, tenQuyChe: true } },
        khoanLuong: { select: { id: true, tenKhoan: true, maKhoan: true } },
      },
      orderBy: [{ nhanVienId: 'asc' }, { khoanLuongId: 'asc' }],
    });

    // Lấy bảng lương để biết tháng/năm
    const bangLuong = await this.prisma.bangLuong.findUnique({
      where: { id: bangLuongId },
    });

    return traces.map((t) => this.enhanceTrace(t, bangLuong));
  }

  /**
   * Enhance trace với nguồn dữ liệu
   */
  private enhanceTrace(trace: any, bangLuong: any): EnhancedRuleTrace {
    const inputParsed = JSON.parse(trace.inputJson || '{}');
    const nguonDuLieu: NguonDuLieuInfo[] = [];

    // Phân tích input để xác định nguồn
    if (inputParsed.ngayCong !== undefined || inputParsed.soCongThucTe !== undefined) {
      nguonDuLieu.push({
        nguon: NguonDuLieu.CHAM_CONG,
        label: 'Chấm công',
        chiTiet: `Ngày công: ${inputParsed.ngayCong || inputParsed.soCongThucTe || 0}`,
        link: `/cham-cong?thang=${bangLuong?.thang}&nam=${bangLuong?.nam}&nv=${trace.nhanVienId}`,
      });
    }

    if (inputParsed.soGioOT !== undefined && inputParsed.soGioOT > 0) {
      nguonDuLieu.push({
        nguon: NguonDuLieu.YEU_CAU,
        label: 'Yêu cầu OT',
        chiTiet: `Giờ OT: ${inputParsed.soGioOT}h`,
        soLuong: inputParsed.soGioOT,
        link: `/yeu-cau/duyet?loai=OT`,
      });
    }

    if (inputParsed.soNgayNghiPhep !== undefined && inputParsed.soNgayNghiPhep > 0) {
      nguonDuLieu.push({
        nguon: NguonDuLieu.NGHI_PHEP,
        label: 'Nghỉ phép',
        chiTiet: `Số ngày: ${inputParsed.soNgayNghiPhep}`,
        soLuong: inputParsed.soNgayNghiPhep,
        link: `/nghi-phep/lich`,
      });
    }

    if (inputParsed.diemKPI !== undefined) {
      nguonDuLieu.push({
        nguon: NguonDuLieu.KPI,
        label: 'KPI',
        chiTiet: `Điểm: ${inputParsed.diemKPI}`,
        link: `/kpi/ky-danh-gia`,
      });
    }

    if (inputParsed.tongPhutDiTre !== undefined && inputParsed.tongPhutDiTre > 0) {
      nguonDuLieu.push({
        nguon: NguonDuLieu.CHAM_CONG,
        label: 'Đi trễ',
        chiTiet: `${inputParsed.tongPhutDiTre} phút`,
        soLuong: inputParsed.tongPhutDiTre,
      });
    }

    // Nếu không xác định được nguồn, đánh là Rule Engine
    if (nguonDuLieu.length === 0) {
      nguonDuLieu.push({
        nguon: NguonDuLieu.RULE_ENGINE,
        label: 'Quy chế lương',
        chiTiet: trace.messageGiaiThich,
      });
    }

    return {
      id: trace.id,
      bangLuongId: trace.bangLuongId,
      nhanVienId: trace.nhanVienId,
      nhanVien: trace.nhanVien,
      quyCheId: trace.quyCheId,
      quyChe: trace.quyChe,
      quyCheRuleId: trace.quyCheRuleId,
      khoanLuongId: trace.khoanLuongId,
      khoanLuong: trace.khoanLuong,
      inputJson: trace.inputJson,
      inputParsed,
      outputSoTien: Number(trace.outputSoTien),
      messageGiaiThich: trace.messageGiaiThich,
      nguonDuLieu,
      taoLuc: trace.taoLuc,
    };
  }

  // =============== PIPELINE STATUS ===============

  /**
   * Lấy trạng thái pipeline toàn công ty
   */
  async getPipelineStatus(thang: number, nam: number): Promise<PipelineStatus> {
    // Lấy tất cả phòng ban active
    const phongBans = await this.prisma.phongBan.findMany({
      where: { trangThai: 'ACTIVE' },
    });

    // Lấy bảng lương trong tháng
    const bangLuongs = await this.prisma.bangLuong.findMany({
      where: { thang, nam },
    });

    const bangLuongMap = new Map(bangLuongs.map((bl) => [bl.phongBanId, bl]));

    // Build phòng ban status
    const phongBanStatuses = await Promise.all(
      phongBans.map(async (pb) => {
        const bl = bangLuongMap.get(pb.id);
        let tongLuong = 0;

        if (bl) {
          const sum = await this.prisma.chiTietBangLuong.aggregate({
            where: { bangLuongId: bl.id },
            _sum: { soTien: true },
          });
          tongLuong = Number(sum._sum.soTien || 0);
        }

        // Đếm nhân viên đang làm trong phòng ban
        const tongNhanVien = await this.prisma.nhanVien.count({
          where: { phongBanId: pb.id, trangThai: 'DANG_LAM' },
        });

        return {
          phongBanId: pb.id,
          tenPhongBan: pb.tenPhongBan,
          bangLuongId: bl?.id,
          trangThai: bl ? this.mapTrangThai(bl.trangThai) : 'CHUA_TAO' as const,
          lastSyncAt: bl?.ngayCapNhat,
          tongNhanVien,
          tongLuong,
        };
      })
    );

    // Tính tổng và cảnh báo
    const tongLuongToanCongTy = phongBanStatuses.reduce((s, p) => s + p.tongLuong, 0);
    const canhBao = await this.buildWarnings(thang, nam);

    return {
      thang,
      nam,
      phongBans: phongBanStatuses,
      tongLuongToanCongTy,
      canhBao,
    };
  }

  // =============== HELPERS ===============

  private initSteps(): SyncStepInfo[] {
    return [
      { step: SyncStep.SYNC_NGAY_CONG, label: 'Đồng bộ ngày công', status: 'pending' },
      { step: SyncStep.SYNC_NGHI_PHEP, label: 'Đồng bộ nghỉ phép', status: 'pending' },
      { step: SyncStep.SYNC_OT, label: 'Đồng bộ OT', status: 'pending' },
      { step: SyncStep.SYNC_YEU_CAU, label: 'Đồng bộ yêu cầu', status: 'pending' },
      { step: SyncStep.SYNC_KPI, label: 'Đồng bộ KPI', status: 'pending' },
      { step: SyncStep.TINH_LUONG, label: 'Tính lương', status: 'pending' },
    ];
  }

  private async runStep(
    progress: SyncProgress,
    step: SyncStep,
    fn: () => Promise<number>
  ): Promise<void> {
    const stepInfo = progress.steps.find((s) => s.step === step);
    if (!stepInfo) return;

    progress.currentStep = step;
    stepInfo.status = 'running';
    stepInfo.startedAt = new Date();

    try {
      const count = await fn();
      stepInfo.status = 'completed';
      stepInfo.recordsProcessed = count;
      stepInfo.completedAt = new Date();
    } catch (error) {
      stepInfo.status = 'error';
      stepInfo.error = error.message;
      throw error;
    }
  }

  private async buildSummary(bangLuongId: number): Promise<SyncSummary> {
    const ngayCongs = await this.prisma.ngayCongBangLuong.findMany({
      where: { bangLuongId },
    });

    const chiTiets = await this.prisma.chiTietBangLuong.findMany({
      where: { bangLuongId },
      include: { nhanVien: { select: { id: true, hoTen: true, maNhanVien: true } } },
    });

    const tongLuong = chiTiets.reduce((s, c) => s + Number(c.soTien), 0);

    return {
      tongNhanVien: ngayCongs.length,
      tongNgayCong: ngayCongs.reduce((s, n) => s + Number(n.soCongThucTe), 0),
      tongGioOT: 0, // Would need to calculate from ChiTietChamCong
      tongNgayNghiPhep: ngayCongs.reduce((s, n) => s + Number(n.soNgayNghiPhep), 0),
      tongNgayNghiKhongLuong: ngayCongs.reduce((s, n) => s + Number(n.soNgayNghiKhongLuong), 0),
      tongSoTienTruocSync: 0,
      tongSoTienSauSync: tongLuong,
      chenhLech: tongLuong,
      chiTietThayDoi: [],
    };
  }

  private async buildWarnings(thang: number, nam: number): Promise<PipelineWarning[]> {
    const warnings: PipelineWarning[] = [];
    const ngayDau = new Date(nam, thang - 1, 1);
    const ngayCuoi = new Date(nam, thang, 0);

    // Cảnh báo: Đếm nhân viên chưa có chấm công trong tháng
    // Đầu tiên lấy những ai có chấm công
    const nhanVienCoChamCong = await this.prisma.chiTietChamCong.findMany({
      where: {
        ngay: { gte: ngayDau, lte: ngayCuoi },
      },
      select: { nhanVienId: true },
      distinct: ['nhanVienId'],
    });
    const nhanVienCoChamCongIds = nhanVienCoChamCong.map(c => c.nhanVienId);

    const nhanViensThieuChamCong = await this.prisma.nhanVien.findMany({
      where: {
        trangThai: 'DANG_LAM',
        id: { notIn: nhanVienCoChamCongIds },
      },
      select: { id: true, hoTen: true, phongBanId: true },
      take: 10,
    });

    for (const nv of nhanViensThieuChamCong) {
      warnings.push({
        loai: 'THIEU_CHAM_CONG',
        nhanVienId: nv.id,
        hoTen: nv.hoTen,
        phongBanId: nv.phongBanId,
        moTa: `${nv.hoTen} không có dữ liệu chấm công tháng ${thang}/${nam}`,
      });
    }

    // Cảnh báo yêu cầu chưa duyệt
    const yeuCauChuaDuyet = await this.prisma.donYeuCau.count({
      where: {
        trangThai: 'CHO_DUYET_1',
        ngayYeuCau: { gte: ngayDau, lte: ngayCuoi },
      },
    });

    if (yeuCauChuaDuyet > 0) {
      warnings.push({
        loai: 'YEU_CAU_CHUA_DUYET',
        moTa: `Có ${yeuCauChuaDuyet} yêu cầu (OT/Trễ/Sớm) chưa duyệt trong tháng`,
      });
    }

    return warnings;
  }

  private tinhNgayCongLyThuyet(thang: number, nam: number): number {
    const soNgayTrongThang = new Date(nam, thang, 0).getDate();
    let soNgayCuoiTuan = 0;
    for (let ngay = 1; ngay <= soNgayTrongThang; ngay++) {
      const date = new Date(nam, thang - 1, ngay);
      const dayOfWeek = date.getDay();
      if (dayOfWeek === 0 || dayOfWeek === 6) {
        soNgayCuoiTuan++;
      }
    }
    return soNgayTrongThang - soNgayCuoiTuan;
  }

  private mapTrangThai(trangThai: string): 'CHUA_TAO' | 'NHAP' | 'DA_SYNC' | 'DA_CHOT' | 'KHOA' {
    switch (trangThai) {
      case 'NHAP': return 'NHAP';
      case 'DA_CHOT': return 'DA_CHOT';
      case 'KHOA': return 'KHOA';
      default: return 'NHAP';
    }
  }
}
