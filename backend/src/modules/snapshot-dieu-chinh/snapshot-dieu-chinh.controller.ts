// Controller Snapshot & Phiếu Điều Chỉnh
import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { SnapshotDieuChinhService } from './snapshot-dieu-chinh.service';
import {
  TaoSnapshotDto,
  TaoPhieuDieuChinhDto,
  DuyetPhieuDto,
  TuChoiPhieuDto,
} from './dto/snapshot-dieu-chinh.dto';
import { TrangThaiPhieuDC } from '@prisma/client';

@ApiTags('Snapshot & Phiếu Điều Chỉnh')
@Controller('snapshot-dieu-chinh')
export class SnapshotDieuChinhController {
  constructor(private readonly service: SnapshotDieuChinhService) {}

  // ============================================
  // SNAPSHOT
  // ============================================

  @Post('snapshot/:bangLuongId')
  @ApiOperation({ summary: 'Tạo snapshot khi chốt bảng lương' })
  async taoSnapshot(
    @Param('bangLuongId', ParseIntPipe) bangLuongId: number,
    @Body() dto: TaoSnapshotDto,
  ) {
    return this.service.taoSnapshot(bangLuongId, dto.nguoiChot);
  }

  @Get('snapshot/:bangLuongId')
  @ApiOperation({ summary: 'Lấy snapshot của bảng lương' })
  async laySnapshot(@Param('bangLuongId', ParseIntPipe) bangLuongId: number) {
    return this.service.laySnapshot(bangLuongId);
  }

  @Get('snapshot/:bangLuongId/so-sanh')
  @ApiOperation({ summary: 'So sánh snapshot với dữ liệu hiện tại' })
  async soSanhSnapshot(@Param('bangLuongId', ParseIntPipe) bangLuongId: number) {
    return this.service.soSanhSnapshot(bangLuongId);
  }

  // ============================================
  // PHIẾU ĐIỀU CHỈNH
  // ============================================

  @Post('phieu-dieu-chinh')
  @ApiOperation({ summary: 'Tạo phiếu điều chỉnh' })
  async taoPhieuDieuChinh(@Body() dto: TaoPhieuDieuChinhDto) {
    return this.service.taoPhieuDieuChinh(dto);
  }

  @Get('phieu-dieu-chinh')
  @ApiOperation({ summary: 'Lấy danh sách phiếu điều chỉnh' })
  @ApiQuery({ name: 'bangLuongId', required: false })
  @ApiQuery({ name: 'trangThai', required: false, enum: TrangThaiPhieuDC })
  async layDanhSachPhieu(
    @Query('bangLuongId') bangLuongId?: string,
    @Query('trangThai') trangThai?: TrangThaiPhieuDC,
  ) {
    return this.service.layDanhSachPhieu(
      bangLuongId ? parseInt(bangLuongId, 10) : undefined,
      trangThai,
    );
  }

  @Get('phieu-dieu-chinh/:id')
  @ApiOperation({ summary: 'Lấy chi tiết phiếu điều chỉnh' })
  async layChiTietPhieu(@Param('id', ParseIntPipe) id: number) {
    return this.service.layChiTietPhieu(id);
  }

  @Put('phieu-dieu-chinh/:id/duyet')
  @ApiOperation({ summary: 'Duyệt phiếu điều chỉnh' })
  async duyetPhieu(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: DuyetPhieuDto,
  ) {
    return this.service.duyetPhieu(id, dto.nguoiDuyet);
  }

  @Put('phieu-dieu-chinh/:id/tu-choi')
  @ApiOperation({ summary: 'Từ chối phiếu điều chỉnh' })
  async tuChoiPhieu(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: TuChoiPhieuDto,
  ) {
    return this.service.tuChoiPhieu(id, dto.nguoiTuChoi, dto.lyDoTuChoi);
  }

  @Put('phieu-dieu-chinh/:id/huy')
  @ApiOperation({ summary: 'Hủy phiếu điều chỉnh' })
  async huyPhieu(@Param('id', ParseIntPipe) id: number) {
    return this.service.huyPhieu(id);
  }
}
