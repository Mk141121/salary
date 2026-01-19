// Auto-Escalation Service - Tự động nhắc nhở và chuyển cấp đơn quá hạn
// Sprint 7 - Cải tiến quy trình duyệt
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from '../../prisma/prisma.service';
import { ThongBaoService } from '../thong-bao/thong-bao.service';
import { ConfigService } from '@nestjs/config';

interface EscalationConfig {
  soNgayNhacNho: number;        // Số ngày để gửi nhắc nhở đầu tiên
  soNgayEscalate: number;       // Số ngày để escalate lên cấp cao hơn
  soNgayTuDongDuyet: number;    // Số ngày để tự động duyệt (nếu bật)
  tuDongDuyet: boolean;         // Có tự động duyệt không
  guiEmailNhacNho: boolean;     // Có gửi email nhắc nhở không
}

@Injectable()
export class AutoEscalationService implements OnModuleInit {
  private readonly logger = new Logger(AutoEscalationService.name);
  private config: EscalationConfig;

  constructor(
    private prisma: PrismaService,
    private thongBaoService: ThongBaoService,
    private configService: ConfigService,
  ) {
    // Đọc config từ environment hoặc dùng default
    this.config = {
      soNgayNhacNho: parseInt(this.configService.get('ESCALATION_REMIND_DAYS', '2')),
      soNgayEscalate: parseInt(this.configService.get('ESCALATION_DAYS', '5')),
      soNgayTuDongDuyet: parseInt(this.configService.get('AUTO_APPROVE_DAYS', '7')),
      tuDongDuyet: this.configService.get('AUTO_APPROVE_ENABLED', 'false') === 'true',
      guiEmailNhacNho: this.configService.get('ESCALATION_EMAIL_ENABLED', 'true') === 'true',
    };
  }

  onModuleInit() {
    this.logger.log('Auto-Escalation Service initialized');
    this.logger.log(`Config: Remind after ${this.config.soNgayNhacNho} days, Escalate after ${this.config.soNgayEscalate} days`);
  }

  /**
   * Chạy mỗi ngày lúc 8:00 sáng - Nhắc nhở đơn quá hạn
   */
  @Cron('0 8 * * 1-5') // Thứ 2 - Thứ 6, 8:00 AM
  async nhacNhoDonQuaHan() {
    this.logger.log('Running: Nhắc nhở đơn quá hạn');
    
    try {
      const ngayNhacNho = new Date();
      ngayNhacNho.setDate(ngayNhacNho.getDate() - this.config.soNgayNhacNho);

      // Tìm đơn yêu cầu quá hạn
      const donQuaHan = await this.prisma.donYeuCau.findMany({
        where: {
          trangThai: { in: ['CHO_DUYET_1', 'CHO_DUYET_2'] },
          ngayTao: { lt: ngayNhacNho },
        },
        include: {
          nhanVien: { select: { hoTen: true, phongBanId: true } },
          loaiYeuCau: { select: { tenLoai: true } },
        },
      });

      if (donQuaHan.length === 0) {
        this.logger.log('Không có đơn quá hạn cần nhắc nhở');
        return;
      }

      // Nhóm theo người cần duyệt
      const nhomTheoNguoiDuyet = new Map<number, any[]>();

      for (const don of donQuaHan) {
        // Tìm người duyệt phù hợp (đơn giản: lấy người quản lý phòng ban)
        const phongBan = await this.prisma.phongBan.findFirst({
          where: { id: don.nhanVien?.phongBanId || 0 },
          select: { nguoiQuanLyId: true },
        });

        const nguoiDuyetId = don.trangThai === 'CHO_DUYET_1' 
          ? phongBan?.nguoiQuanLyId 
          : await this.layNguoiDuyetCap2();

        if (nguoiDuyetId) {
          if (!nhomTheoNguoiDuyet.has(nguoiDuyetId)) {
            nhomTheoNguoiDuyet.set(nguoiDuyetId, []);
          }
          nhomTheoNguoiDuyet.get(nguoiDuyetId)!.push(don);
        }
      }

      // Gửi thông báo cho từng người duyệt
      for (const [nguoiDuyetId, danhSachDon] of nhomTheoNguoiDuyet) {
        const nguoiDung = await this.prisma.nguoiDung.findFirst({
          where: { nhanVienId: nguoiDuyetId },
        });

        if (nguoiDung) {
          await this.thongBaoService.guiThongBaoNhacNhoDuyet(
            nguoiDung.id,
            danhSachDon.length,
            this.config.soNgayNhacNho,
          );
          this.logger.log(`Đã gửi nhắc nhở ${danhSachDon.length} đơn cho người duyệt #${nguoiDuyetId}`);
        }
      }

      this.logger.log(`Hoàn thành nhắc nhở: ${donQuaHan.length} đơn`);
    } catch (error: any) {
      this.logger.error(`Lỗi nhắc nhở đơn quá hạn: ${error.message}`);
    }
  }

  /**
   * Chạy mỗi ngày lúc 9:00 sáng - Escalate đơn quá hạn lâu
   */
  @Cron('0 9 * * 1-5') // Thứ 2 - Thứ 6, 9:00 AM
  async escalateDonQuaHan() {
    this.logger.log('Running: Escalate đơn quá hạn');

    try {
      const ngayEscalate = new Date();
      ngayEscalate.setDate(ngayEscalate.getDate() - this.config.soNgayEscalate);

      // Tìm đơn cấp 1 quá hạn để escalate lên cấp 2
      const donCanEscalate = await this.prisma.donYeuCau.findMany({
        where: {
          trangThai: 'CHO_DUYET_1',
          ngayTao: { lt: ngayEscalate },
        },
        include: {
          nhanVien: { select: { hoTen: true } },
          loaiYeuCau: { select: { tenLoai: true } },
        },
      });

      let escalated = 0;

      for (const don of donCanEscalate) {
        // Kiểm tra workflow có 2 cấp không
        const workflow = await this.prisma.requestWorkflowConfig.findFirst({
          where: { loaiYeuCauId: don.loaiYeuCauId, isActive: true },
        });

        if (workflow?.soCap === 2) {
          // Escalate lên cấp 2
          await this.prisma.donYeuCau.update({
            where: { id: don.id },
            data: {
              trangThai: 'CHO_DUYET_2',
              ghiChuDuyet1: `[AUTO-ESCALATE] Tự động chuyển cấp sau ${this.config.soNgayEscalate} ngày`,
              ngayDuyet1: new Date(),
            },
          });

          // Thông báo cho người duyệt cấp 2
          const nguoiDuyetCap2Id = await this.layNguoiDuyetCap2();
          if (nguoiDuyetCap2Id) {
            const nguoiDung = await this.prisma.nguoiDung.findFirst({
              where: { nhanVienId: nguoiDuyetCap2Id },
            });
            if (nguoiDung) {
              await this.thongBaoService.guiThongBaoYeuCauMoi(
                nguoiDung.id,
                don.nhanVien?.hoTen || 'Nhân viên',
                `${don.loaiYeuCau?.tenLoai} (AUTO-ESCALATE)`,
                don.id,
              );
            }
          }

          escalated++;
          this.logger.log(`Escalated đơn #${don.id} từ cấp 1 lên cấp 2`);
        }
      }

      this.logger.log(`Hoàn thành escalate: ${escalated}/${donCanEscalate.length} đơn`);
    } catch (error: any) {
      this.logger.error(`Lỗi escalate đơn: ${error.message}`);
    }
  }

  /**
   * Chạy mỗi ngày lúc 10:00 sáng - Tự động duyệt đơn quá hạn lâu (nếu bật)
   */
  @Cron('0 10 * * 1-5') // Thứ 2 - Thứ 6, 10:00 AM
  async tuDongDuyetDonQuaHan() {
    if (!this.config.tuDongDuyet) {
      return;
    }

    this.logger.log('Running: Tự động duyệt đơn quá hạn');

    try {
      const ngayTuDongDuyet = new Date();
      ngayTuDongDuyet.setDate(ngayTuDongDuyet.getDate() - this.config.soNgayTuDongDuyet);

      // Tìm đơn cần tự động duyệt
      const donCanDuyet = await this.prisma.donYeuCau.findMany({
        where: {
          trangThai: { in: ['CHO_DUYET_1', 'CHO_DUYET_2'] },
          ngayTao: { lt: ngayTuDongDuyet },
        },
        include: {
          loaiYeuCau: true,
        },
      });

      let approved = 0;

      for (const don of donCanDuyet) {
        // Kiểm tra workflow có cho phép tự động duyệt không
        const workflow = await this.prisma.requestWorkflowConfig.findFirst({
          where: { 
            loaiYeuCauId: don.loaiYeuCauId, 
            isActive: true,
            // tuDongDuyetNeuQuaHan: true, // Uncomment khi có field này
          },
        });

        // Tự động duyệt
        await this.prisma.donYeuCau.update({
          where: { id: don.id },
          data: {
            trangThai: 'DA_DUYET',
            ghiChuDuyet2: `[AUTO-APPROVE] Tự động duyệt sau ${this.config.soNgayTuDongDuyet} ngày không xử lý`,
            ngayDuyet2: new Date(),
          },
        });

        // Thông báo cho nhân viên
        const nguoiDung = await this.prisma.nguoiDung.findFirst({
          where: { nhanVienId: don.nhanVienId },
        });
        if (nguoiDung) {
          await this.thongBaoService.guiThongBaoYeuCauDaDuyet(
            nguoiDung.id,
            `${don.loaiYeuCau?.tenLoai} (tự động)`,
            don.id,
          );
        }

        approved++;
        this.logger.log(`Auto-approved đơn #${don.id}`);
      }

      this.logger.log(`Hoàn thành tự động duyệt: ${approved} đơn`);
    } catch (error: any) {
      this.logger.error(`Lỗi tự động duyệt: ${error.message}`);
    }
  }

  /**
   * Chạy mỗi tuần vào thứ 2 lúc 7:00 sáng - Báo cáo tổng hợp
   */
  @Cron('0 7 * * 1') // Thứ 2, 7:00 AM
  async baoCaoTuanMoi() {
    this.logger.log('Running: Báo cáo tuần mới');

    try {
      // Đếm số đơn chờ duyệt
      const [yeuCauCho, nghiPhepCho] = await Promise.all([
        this.prisma.donYeuCau.count({
          where: { trangThai: { in: ['CHO_DUYET_1', 'CHO_DUYET_2'] } },
        }),
        this.prisma.donNghiPhep.count({
          where: { trangThai: 'GUI_DUYET' },
        }),
      ]);

      const tongCho = yeuCauCho + nghiPhepCho;

      if (tongCho > 0) {
        // Gửi thông báo cho người quản lý phòng ban (admin/hr)
        // Đơn giản: lấy tất cả người dùng có vai trò quản lý
        const nguoiQuanLyList = await this.prisma.phongBan.findMany({
          where: { nguoiQuanLyId: { not: null } },
          select: { nguoiQuanLyId: true },
        });

        const nguoiQuanLyIds = [...new Set(nguoiQuanLyList.map(p => p.nguoiQuanLyId).filter(Boolean))];
        
        const nguoiCoDuyet = await this.prisma.nguoiDung.findMany({
          where: {
            nhanVienId: { in: nguoiQuanLyIds as number[] },
          },
        });

        for (const nguoiDuyet of nguoiCoDuyet) {
          await this.thongBaoService.taoThongBao({
            nguoiNhanId: nguoiDuyet.id,
            loaiThongBao: 'NHAC_NHO' as any,
            tieuDe: `📊 Báo cáo tuần: ${tongCho} đơn chờ duyệt`,
            noiDung: `Hiện có ${yeuCauCho} đơn yêu cầu và ${nghiPhepCho} đơn nghỉ phép đang chờ duyệt. Vui lòng kiểm tra và xử lý.`,
            link: '/approval-dashboard',
          });
        }

        this.logger.log(`Đã gửi báo cáo tuần cho ${nguoiCoDuyet.length} người`);
      }
    } catch (error: any) {
      this.logger.error(`Lỗi báo cáo tuần: ${error.message}`);
    }
  }

  /**
   * Lấy người duyệt cấp 2 (HR)
   */
  private async layNguoiDuyetCap2(): Promise<number | null> {
    // Tìm người quản lý phòng HR
    const phongHR = await this.prisma.phongBan.findFirst({
      where: { maPhongBan: { in: ['HR', 'NHAN_SU', 'HC-NS'] } },
      select: { nguoiQuanLyId: true },
    });

    return phongHR?.nguoiQuanLyId || null;
  }

  /**
   * Chạy thủ công các job (cho testing)
   */
  async runManually(job: 'remind' | 'escalate' | 'auto-approve' | 'report') {
    switch (job) {
      case 'remind':
        await this.nhacNhoDonQuaHan();
        break;
      case 'escalate':
        await this.escalateDonQuaHan();
        break;
      case 'auto-approve':
        await this.tuDongDuyetDonQuaHan();
        break;
      case 'report':
        await this.baoCaoTuanMoi();
        break;
    }
    return { message: `Job ${job} executed` };
  }
}
