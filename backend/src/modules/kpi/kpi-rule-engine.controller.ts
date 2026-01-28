import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { KPIRuleEngineService } from './kpi-rule-engine.service';
import { Quyen } from '../../common';

// ============================================
// DTOs
// ============================================

class TaoNhomQuyTacDto {
  maNhom: string;
  tenNhom: string;
  moTa?: string;
  thuTu?: number;
}

class TaoQuyTacDto {
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

class TaoDieuKienDto {
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

class TaoBienSoDto {
  maBienSo: string;
  tenBienSo: string;
  moTa?: string;
  nguonDuLieu?: 'CHAM_CONG' | 'DOANH_SO' | 'BANG_LUONG' | 'HOP_DONG' | 'NHAP_TAY';
  bangNguon?: string;
  truongNguon?: string;
  congThuc?: string;
  donViTinh?: string;
}

class GanTrongSoDto {
  trongSo: number;
}

class PreviewKPIDto {
  nhanVienId: number;
  thang: number;
  nam: number;
  duLieuNhapTay?: Record<string, number>;
}

class TinhKPIDto {
  danhGiaId: number;
  nhanVienId: number;
  thang: number;
  nam: number;
  duLieuNhapTay?: Record<string, number>;
}

// ============================================
// CONTROLLER
// ============================================

@ApiTags('KPI Rule Engine')
@Controller('kpi/rule-engine')
export class KPIRuleEngineController {
  constructor(private readonly ruleEngine: KPIRuleEngineService) {}

  // ============================================
  // NHÓM QUY TẮC
  // ============================================

  @Get('nhom')
  @ApiOperation({ summary: 'Lấy danh sách nhóm quy tắc KPI' })
  layDanhSachNhom() {
    return this.ruleEngine.layDanhSachNhom();
  }

  @Post('nhom')
  @ApiOperation({ summary: 'Tạo nhóm quy tắc mới' })
  @Quyen('KPI_QUAN_LY')
  taoNhomQuyTac(@Body() dto: TaoNhomQuyTacDto) {
    return this.ruleEngine.taoNhomQuyTac(dto);
  }

  @Put('nhom/:id')
  @ApiOperation({ summary: 'Cập nhật nhóm quy tắc' })
  @Quyen('KPI_QUAN_LY')
  capNhatNhomQuyTac(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: Partial<TaoNhomQuyTacDto>,
  ) {
    return this.ruleEngine.capNhatNhomQuyTac(id, dto);
  }

  // ============================================
  // QUY TẮC KPI
  // ============================================

  @Get('quy-tac')
  @ApiOperation({ summary: 'Lấy danh sách quy tắc KPI' })
  @ApiQuery({ name: 'nhomId', required: false })
  layDanhSachQuyTac(@Query('nhomId') nhomId?: string) {
    return this.ruleEngine.layDanhSachQuyTac(
      nhomId ? parseInt(nhomId) : undefined,
    );
  }

  @Get('quy-tac/:id')
  @ApiOperation({ summary: 'Lấy chi tiết quy tắc KPI' })
  layQuyTacTheoId(@Param('id', ParseIntPipe) id: number) {
    return this.ruleEngine.layQuyTacTheoId(id);
  }

  @Post('quy-tac')
  @ApiOperation({ summary: 'Tạo quy tắc KPI mới' })
  @Quyen('KPI_QUAN_LY')
  taoQuyTac(@Body() dto: TaoQuyTacDto) {
    return this.ruleEngine.taoQuyTac(dto);
  }

  @Put('quy-tac/:id')
  @ApiOperation({ summary: 'Cập nhật quy tắc KPI' })
  @Quyen('KPI_QUAN_LY')
  capNhatQuyTac(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: Partial<TaoQuyTacDto>,
  ) {
    return this.ruleEngine.capNhatQuyTac(id, dto);
  }

  @Delete('quy-tac/:id')
  @ApiOperation({ summary: 'Xóa quy tắc KPI (soft delete)' })
  @Quyen('KPI_QUAN_LY')
  xoaQuyTac(@Param('id', ParseIntPipe) id: number) {
    return this.ruleEngine.xoaQuyTac(id);
  }

  // ============================================
  // ĐIỀU KIỆN QUY TẮC
  // ============================================

  @Post('dieu-kien')
  @ApiOperation({ summary: 'Thêm điều kiện vào quy tắc' })
  @Quyen('KPI_QUAN_LY')
  themDieuKien(@Body() dto: TaoDieuKienDto) {
    return this.ruleEngine.themDieuKien(dto);
  }

  @Put('dieu-kien/:id')
  @ApiOperation({ summary: 'Cập nhật điều kiện' })
  @Quyen('KPI_QUAN_LY')
  capNhatDieuKien(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: Partial<TaoDieuKienDto>,
  ) {
    return this.ruleEngine.capNhatDieuKien(id, dto);
  }

  @Delete('dieu-kien/:id')
  @ApiOperation({ summary: 'Xóa điều kiện' })
  @Quyen('KPI_QUAN_LY')
  xoaDieuKien(@Param('id', ParseIntPipe) id: number) {
    return this.ruleEngine.xoaDieuKien(id);
  }

  // ============================================
  // BIẾN SỐ KPI
  // ============================================

  @Get('bien-so')
  @ApiOperation({ summary: 'Lấy danh sách biến số KPI' })
  layDanhSachBienSo() {
    return this.ruleEngine.layDanhSachBienSo();
  }

  @Post('bien-so')
  @ApiOperation({ summary: 'Tạo biến số KPI mới' })
  @Quyen('KPI_QUAN_LY')
  taoBienSo(@Body() dto: TaoBienSoDto) {
    return this.ruleEngine.taoBienSo(dto);
  }

  // ============================================
  // OVERRIDE TRỌNG SỐ
  // ============================================

  @Put('quy-tac/:quyTacId/phong-ban/:phongBanId')
  @ApiOperation({ summary: 'Gán trọng số cho phòng ban' })
  @Quyen('KPI_QUAN_LY')
  ganTrongSoPhongBan(
    @Param('quyTacId', ParseIntPipe) quyTacId: number,
    @Param('phongBanId', ParseIntPipe) phongBanId: number,
    @Body() dto: GanTrongSoDto,
  ) {
    return this.ruleEngine.ganTrongSoPhongBan(quyTacId, phongBanId, dto.trongSo);
  }

  @Put('quy-tac/:quyTacId/vi-tri/:viTriId')
  @ApiOperation({ summary: 'Gán trọng số cho vị trí' })
  @Quyen('KPI_QUAN_LY')
  ganTrongSoViTri(
    @Param('quyTacId', ParseIntPipe) quyTacId: number,
    @Param('viTriId', ParseIntPipe) viTriId: number,
    @Body() dto: GanTrongSoDto,
  ) {
    return this.ruleEngine.ganTrongSoViTri(quyTacId, viTriId, dto.trongSo);
  }

  // ============================================
  // TÍNH KPI
  // ============================================

  @Post('preview')
  @ApiOperation({ summary: 'Preview KPI của nhân viên (không lưu)' })
  previewKPI(@Body() dto: PreviewKPIDto) {
    return this.ruleEngine.previewKPINhanVien(
      dto.nhanVienId,
      dto.thang,
      dto.nam,
      dto.duLieuNhapTay,
    );
  }

  @Post('tinh-kpi')
  @ApiOperation({ summary: 'Tính và lưu KPI nhân viên' })
  tinhKPI(@Body() dto: TinhKPIDto) {
    return this.ruleEngine.tinhKPINhanVien(dto);
  }

  // ============================================
  // THỐNG KÊ & KHỞI TẠO
  // ============================================

  @Get('thong-ke')
  @ApiOperation({ summary: 'Thống kê quy tắc KPI' })
  thongKeQuyTac() {
    return this.ruleEngine.thongKeQuyTac();
  }

  @Post('khoi-tao-mau')
  @ApiOperation({ summary: 'Khởi tạo dữ liệu mẫu cho Rule Engine' })
  @Quyen('KPI_QUAN_LY')
  khoiTaoDuLieuMau() {
    return this.ruleEngine.khoiTaoDuLieuMau();
  }
}
