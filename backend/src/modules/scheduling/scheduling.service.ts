/**
 * Scheduling Service - Xếp Ca
 * PRD-01: Business logic cho module xếp ca
 */

import { Injectable, Logger, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import {
  CreateCaLamViecDto,
  UpdateCaLamViecDto,
  CreateLichPhanCaDto,
  AssignCaBatchDto,
  CopyWeekDto,
  TrangThaiLichPhanCa,
} from './dto/scheduling.dto';

@Injectable()
export class SchedulingService {
  private readonly logger = new Logger(SchedulingService.name);

  constructor(private readonly prisma: PrismaService) {}

  // ============== CA LAM VIEC ==============

  /**
   * Lấy danh sách ca làm việc
   */
  async getAllCaLamViec(phongBanId?: number) {
    const rows = await this.prisma.$queryRaw<any[]>`
      SELECT * FROM ca_lam_viec 
      WHERE phong_ban_id IS NULL OR phong_ban_id = ${phongBanId || null}
      ORDER BY ma_ca
    `;
    return rows.map(this.mapCaLamViec);
  }

  /**
   * Lấy chi tiết ca làm việc
   */
  async getCaLamViecById(id: number) {
    const rows = await this.prisma.$queryRaw<any[]>`
      SELECT * FROM ca_lam_viec WHERE id = ${id}
    `;
    if (!rows.length) {
      throw new NotFoundException(`Ca làm việc #${id} không tồn tại`);
    }
    return this.mapCaLamViec(rows[0]);
  }

  /**
   * Tạo ca làm việc
   */
  async createCaLamViec(dto: CreateCaLamViecDto) {
    // Check maCa unique
    const existing = await this.prisma.$queryRaw<any[]>`
      SELECT id FROM ca_lam_viec WHERE ma_ca = ${dto.maCa}
    `;
    if (existing.length > 0) {
      throw new ConflictException(`Mã ca "${dto.maCa}" đã tồn tại`);
    }

    // Auto-detect ca đêm
    const isCaDem = dto.isCaDem ?? this.detectCaDem(dto.gioVao, dto.gioRa);

    const result = await this.prisma.$queryRaw<any[]>`
      INSERT INTO ca_lam_viec (ma_ca, ten_ca, gio_vao, gio_ra, nghi_giua_ca_phut, grace_in_phut, grace_late_phut, is_ca_dem, phong_ban_id, created_at, updated_at)
      VALUES (${dto.maCa}, ${dto.tenCa}, ${dto.gioVao}, ${dto.gioRa}, ${dto.nghiGiuaCaPhut || 0}, ${dto.graceInPhut || 15}, ${dto.graceLatePhut || 15}, ${isCaDem}, ${dto.phongBanId || null}, NOW(), NOW())
      RETURNING *
    `;
    
    this.logger.log(`Created ca: ${dto.maCa} - ${dto.tenCa}`);
    return this.mapCaLamViec(result[0]);
  }

  /**
   * Cập nhật ca làm việc
   */
  async updateCaLamViec(id: number, dto: UpdateCaLamViecDto) {
    await this.getCaLamViecById(id); // Check exists

    const updates: string[] = [];
    const values: any[] = [];
    
    if (dto.tenCa !== undefined) { updates.push('ten_ca'); values.push(dto.tenCa); }
    if (dto.gioVao !== undefined) { updates.push('gio_vao'); values.push(dto.gioVao); }
    if (dto.gioRa !== undefined) { updates.push('gio_ra'); values.push(dto.gioRa); }
    if (dto.nghiGiuaCaPhut !== undefined) { updates.push('nghi_giua_ca_phut'); values.push(dto.nghiGiuaCaPhut); }
    if (dto.graceInPhut !== undefined) { updates.push('grace_in_phut'); values.push(dto.graceInPhut); }
    if (dto.graceLatePhut !== undefined) { updates.push('grace_late_phut'); values.push(dto.graceLatePhut); }
    if (dto.isCaDem !== undefined) { updates.push('is_ca_dem'); values.push(dto.isCaDem); }

    if (updates.length === 0) {
      return this.getCaLamViecById(id);
    }

    // Simple update without dynamic SQL
    await this.prisma.$executeRaw`
      UPDATE ca_lam_viec SET
        ten_ca = COALESCE(${dto.tenCa}, ten_ca),
        gio_vao = COALESCE(${dto.gioVao}, gio_vao),
        gio_ra = COALESCE(${dto.gioRa}, gio_ra),
        nghi_giua_ca_phut = COALESCE(${dto.nghiGiuaCaPhut}, nghi_giua_ca_phut),
        grace_in_phut = COALESCE(${dto.graceInPhut}, grace_in_phut),
        grace_late_phut = COALESCE(${dto.graceLatePhut}, grace_late_phut),
        is_ca_dem = COALESCE(${dto.isCaDem}, is_ca_dem),
        updated_at = NOW()
      WHERE id = ${id}
    `;

    return this.getCaLamViecById(id);
  }

  /**
   * Xóa ca làm việc
   */
  async deleteCaLamViec(id: number) {
    await this.getCaLamViecById(id);
    
    // Check if ca đang được sử dụng
    const inUse = await this.prisma.$queryRaw<any[]>`
      SELECT COUNT(*) as count FROM lich_phan_ca_chi_tiet WHERE ca_lam_viec_id = ${id}
    `;
    if (Number(inUse[0]?.count) > 0) {
      throw new BadRequestException(`Ca này đang được sử dụng trong lịch phân ca, không thể xóa`);
    }

    await this.prisma.$executeRaw`DELETE FROM ca_lam_viec WHERE id = ${id}`;
    this.logger.log(`Deleted ca #${id}`);
    return { success: true };
  }

  // ============== LICH PHAN CA ==============

  /**
   * Lấy lịch phân ca theo tháng
   */
  async getLichPhanCa(thangNam: string, phongBanId?: number) {
    const rows = await this.prisma.$queryRaw<any[]>`
      SELECT * FROM lich_phan_ca 
      WHERE thang_nam = ${thangNam}
      ${phongBanId ? this.prisma.$queryRaw`AND phong_ban_id = ${phongBanId}` : this.prisma.$queryRaw``}
      ORDER BY created_at DESC
    `;
    return rows.map(this.mapLichPhanCa);
  }

  /**
   * Tạo lịch phân ca mới
   */
  async createLichPhanCa(dto: CreateLichPhanCaDto, createdBy: number) {
    const result = await this.prisma.$queryRaw<any[]>`
      INSERT INTO lich_phan_ca (thang_nam, phong_ban_id, trang_thai, ghi_chu, created_by, created_at, updated_at)
      VALUES (${dto.thangNam}, ${dto.phongBanId || null}, 'NHAP', ${dto.ghiChu || null}, ${createdBy}, NOW(), NOW())
      RETURNING *
    `;
    this.logger.log(`Created lich phan ca for ${dto.thangNam}`);
    return this.mapLichPhanCa(result[0]);
  }

  /**
   * Assign ca hàng loạt
   */
  async assignCaBatch(lichPhanCaId: number, dto: AssignCaBatchDto) {
    // Validate lich exists and is NHAP
    const lich = await this.prisma.$queryRaw<any[]>`
      SELECT * FROM lich_phan_ca WHERE id = ${lichPhanCaId}
    `;
    if (!lich.length) {
      throw new NotFoundException(`Lịch phân ca #${lichPhanCaId} không tồn tại`);
    }
    if (lich[0].trang_thai !== 'NHAP') {
      throw new BadRequestException(`Lịch đã công bố hoặc hủy, không thể chỉnh sửa`);
    }

    // Validate ca exists
    const ca = await this.prisma.$queryRaw<any[]>`
      SELECT id FROM ca_lam_viec WHERE id = ${dto.caLamViecId}
    `;
    if (!ca.length) {
      throw new NotFoundException(`Ca làm việc #${dto.caLamViecId} không tồn tại`);
    }

    let insertCount = 0;
    for (const nvId of dto.nhanVienIds) {
      for (const ngay of dto.ngays) {
        // Upsert
        await this.prisma.$executeRaw`
          INSERT INTO lich_phan_ca_chi_tiet (lich_phan_ca_id, nhan_vien_id, ngay, ca_lam_viec_id, ghi_chu, created_at, updated_at)
          VALUES (${lichPhanCaId}, ${nvId}, ${ngay}::date, ${dto.caLamViecId}, ${dto.ghiChu || null}, NOW(), NOW())
          ON CONFLICT (nhan_vien_id, ngay) 
          DO UPDATE SET ca_lam_viec_id = ${dto.caLamViecId}, ghi_chu = ${dto.ghiChu || null}, updated_at = NOW()
        `;
        insertCount++;
      }
    }

    this.logger.log(`Assigned ${insertCount} records to lich #${lichPhanCaId}`);
    return { success: true, recordsAffected: insertCount };
  }

  /**
   * Copy lịch tuần
   */
  async copyWeek(lichPhanCaId: number, dto: CopyWeekDto) {
    const tuanNguonStart = new Date(dto.tuanNguon);
    const tuanDichStart = new Date(dto.tuanDich);
    const diffDays = Math.round((tuanDichStart.getTime() - tuanNguonStart.getTime()) / (1000 * 60 * 60 * 24));

    // Get source week data
    const tuanNguonEnd = new Date(tuanNguonStart);
    tuanNguonEnd.setDate(tuanNguonEnd.getDate() + 6);

    let sourceData: any[];
    if (dto.nhanVienIds?.length) {
      sourceData = await this.prisma.$queryRaw<any[]>`
        SELECT * FROM lich_phan_ca_chi_tiet 
        WHERE lich_phan_ca_id = ${lichPhanCaId}
        AND ngay >= ${dto.tuanNguon}::date AND ngay <= ${tuanNguonEnd.toISOString().split('T')[0]}::date
        AND nhan_vien_id = ANY(${dto.nhanVienIds})
      `;
    } else {
      sourceData = await this.prisma.$queryRaw<any[]>`
        SELECT * FROM lich_phan_ca_chi_tiet 
        WHERE lich_phan_ca_id = ${lichPhanCaId}
        AND ngay >= ${dto.tuanNguon}::date AND ngay <= ${tuanNguonEnd.toISOString().split('T')[0]}::date
      `;
    }

    let copyCount = 0;
    for (const record of sourceData) {
      const newDate = new Date(record.ngay);
      newDate.setDate(newDate.getDate() + diffDays);
      const newDateStr = newDate.toISOString().split('T')[0];

      await this.prisma.$executeRaw`
        INSERT INTO lich_phan_ca_chi_tiet (lich_phan_ca_id, nhan_vien_id, ngay, ca_lam_viec_id, ghi_chu, created_at, updated_at)
        VALUES (${lichPhanCaId}, ${record.nhan_vien_id}, ${newDateStr}::date, ${record.ca_lam_viec_id}, ${record.ghi_chu}, NOW(), NOW())
        ON CONFLICT (nhan_vien_id, ngay) 
        DO UPDATE SET ca_lam_viec_id = ${record.ca_lam_viec_id}, updated_at = NOW()
      `;
      copyCount++;
    }

    this.logger.log(`Copied ${copyCount} records from week ${dto.tuanNguon} to ${dto.tuanDich}`);
    return { success: true, recordsCopied: copyCount };
  }

  /**
   * Publish lịch phân ca
   */
  async publishLichPhanCa(lichPhanCaId: number) {
    const result = await this.prisma.$executeRaw`
      UPDATE lich_phan_ca SET trang_thai = 'DA_CONG_BO', updated_at = NOW()
      WHERE id = ${lichPhanCaId} AND trang_thai = 'NHAP'
    `;
    if (result === 0) {
      throw new BadRequestException(`Không thể công bố lịch: lịch không tồn tại hoặc đã công bố`);
    }

    // TODO: Sync to ChiTietChamCong (create expected schedule)
    this.logger.log(`Published lich phan ca #${lichPhanCaId}`);
    return { success: true, message: 'Đã công bố lịch phân ca' };
  }

  /**
   * Unpublish lịch phân ca (revert to NHAP)
   */
  async unpublishLichPhanCa(lichPhanCaId: number) {
    const result = await this.prisma.$executeRaw`
      UPDATE lich_phan_ca SET trang_thai = 'NHAP', updated_at = NOW()
      WHERE id = ${lichPhanCaId} AND trang_thai = 'DA_CONG_BO'
    `;
    if (result === 0) {
      throw new BadRequestException(`Không thể hủy công bố: lịch không tồn tại hoặc chưa công bố`);
    }
    this.logger.log(`Unpublished lich phan ca #${lichPhanCaId}`);
    return { success: true };
  }

  /**
   * Lấy calendar view
   */
  async getCalendar(lichPhanCaId: number) {
    const rows = await this.prisma.$queryRaw<any[]>`
      SELECT 
        ct.ngay,
        ct.nhan_vien_id,
        nv.ho_ten,
        ca.ma_ca,
        ca.ten_ca,
        ca.gio_vao,
        ca.gio_ra
      FROM lich_phan_ca_chi_tiet ct
      JOIN ca_lam_viec ca ON ca.id = ct.ca_lam_viec_id
      LEFT JOIN nhan_vien nv ON nv.id = ct.nhan_vien_id
      WHERE ct.lich_phan_ca_id = ${lichPhanCaId}
      ORDER BY ct.ngay, nv.ho_ten
    `;
    return rows.map(r => ({
      ngay: r.ngay.toISOString().split('T')[0],
      nhanVienId: r.nhan_vien_id,
      hoTen: r.ho_ten || 'N/A',
      maCa: r.ma_ca,
      tenCa: r.ten_ca,
      gioVao: r.gio_vao,
      gioRa: r.gio_ra,
    }));
  }

  /**
   * Lịch làm việc cá nhân
   */
  async getMySchedule(nhanVienId: number, from: string, to: string) {
    const rows = await this.prisma.$queryRaw<any[]>`
      SELECT 
        ct.ngay,
        ca.ma_ca,
        ca.ten_ca,
        ca.gio_vao,
        ca.gio_ra
      FROM lich_phan_ca_chi_tiet ct
      JOIN ca_lam_viec ca ON ca.id = ct.ca_lam_viec_id
      JOIN lich_phan_ca lpc ON lpc.id = ct.lich_phan_ca_id
      WHERE ct.nhan_vien_id = ${nhanVienId}
      AND ct.ngay >= ${from}::date AND ct.ngay <= ${to}::date
      AND lpc.trang_thai = 'DA_CONG_BO'
      ORDER BY ct.ngay
    `;
    return rows.map(r => ({
      ngay: r.ngay.toISOString().split('T')[0],
      maCa: r.ma_ca,
      tenCa: r.ten_ca,
      gioVao: r.gio_vao,
      gioRa: r.gio_ra,
    }));
  }

  // ============== HELPERS ==============

  private detectCaDem(gioVao: string, gioRa: string): boolean {
    const [hvH, hvM] = gioVao.split(':').map(Number);
    const [hrH, hrM] = gioRa.split(':').map(Number);
    const vaoMinutes = hvH * 60 + hvM;
    const raMinutes = hrH * 60 + hrM;
    return raMinutes < vaoMinutes;
  }

  private mapCaLamViec(row: any) {
    return {
      id: row.id,
      maCa: row.ma_ca,
      tenCa: row.ten_ca,
      gioVao: row.gio_vao,
      gioRa: row.gio_ra,
      nghiGiuaCaPhut: row.nghi_giua_ca_phut,
      graceInPhut: row.grace_in_phut,
      graceLatePhut: row.grace_late_phut,
      isCaDem: row.is_ca_dem,
      phongBanId: row.phong_ban_id,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  }

  private mapLichPhanCa(row: any) {
    return {
      id: row.id,
      thangNam: row.thang_nam,
      phongBanId: row.phong_ban_id,
      trangThai: row.trang_thai,
      ghiChu: row.ghi_chu,
      createdBy: row.created_by,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  }
}
