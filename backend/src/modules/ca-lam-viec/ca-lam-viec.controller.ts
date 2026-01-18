import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Patch,
  Body,
  Param,
  Query,
  ParseIntPipe,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CaLamViecService } from './ca-lam-viec.service';
import { TaoCaLamViecDto, CapNhatCaLamViecDto, LocCaLamViecDto } from './ca-lam-viec.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@Controller('ca-lam-viec')
@UseGuards(JwtAuthGuard)
export class CaLamViecController {
  constructor(private readonly caLamViecService: CaLamViecService) {}

  /**
   * GET /api/ca-lam-viec
   * Lấy danh sách ca làm việc với filter
   */
  @Get()
  async layDanhSach(@Query() filter: LocCaLamViecDto) {
    return this.caLamViecService.layDanhSach(filter);
  }

  /**
   * GET /api/ca-lam-viec/active
   * Lấy danh sách ca active cho dropdown
   */
  @Get('active')
  async layDanhSachActive(@Query('phongBanId') phongBanId?: string) {
    return this.caLamViecService.layDanhSachActive(
      phongBanId ? parseInt(phongBanId, 10) : undefined,
    );
  }

  /**
   * GET /api/ca-lam-viec/:id
   * Lấy chi tiết ca làm việc
   */
  @Get(':id')
  async layChiTiet(@Param('id', ParseIntPipe) id: number) {
    return this.caLamViecService.layChiTiet(id);
  }

  /**
   * POST /api/ca-lam-viec
   * Tạo ca làm việc mới
   */
  @Post()
  async tao(@Body() dto: TaoCaLamViecDto, @Request() req: any) {
    return this.caLamViecService.tao(dto, req.user?.id);
  }

  /**
   * PUT /api/ca-lam-viec/:id
   * Cập nhật ca làm việc
   */
  @Put(':id')
  async capNhat(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CapNhatCaLamViecDto,
    @Request() req: any,
  ) {
    return this.caLamViecService.capNhat(id, dto, req.user?.id);
  }

  /**
   * DELETE /api/ca-lam-viec/:id
   * Xóa ca làm việc
   */
  @Delete(':id')
  async xoa(@Param('id', ParseIntPipe) id: number) {
    return this.caLamViecService.xoa(id);
  }

  /**
   * PATCH /api/ca-lam-viec/:id/toggle
   * Toggle trạng thái active/inactive
   */
  @Patch(':id/toggle')
  async toggleTrangThai(@Param('id', ParseIntPipe) id: number, @Request() req: any) {
    return this.caLamViecService.toggleTrangThai(id, req.user?.id);
  }
}
