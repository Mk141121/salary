import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  UseGuards,
  Req,
} from '@nestjs/common';
import { HopDongService } from './hop-dong.service';
import { TaoHopDongDto, CapNhatHopDongDto, NgungHopDongDto } from './hop-dong.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { VaiTro } from '../../common/decorators/vai-tro.decorator';

@Controller('nhan-vien')
@UseGuards(JwtAuthGuard, RolesGuard)
export class HopDongController {
  constructor(private readonly hopDongService: HopDongService) {}

  /**
   * Lấy danh sách hợp đồng của nhân viên
   */
  @Get(':nhanVienId/hop-dong')
  @VaiTro('ADMIN', 'HR', 'PAYROLL_OPERATOR')
  async layDanhSachHopDong(@Param('nhanVienId', ParseIntPipe) nhanVienId: number) {
    return this.hopDongService.layDanhSachHopDong(nhanVienId);
  }

  /**
   * Tạo hợp đồng mới cho nhân viên
   */
  @Post(':nhanVienId/hop-dong')
  @VaiTro('ADMIN', 'HR')
  async taoHopDong(
    @Param('nhanVienId', ParseIntPipe) nhanVienId: number,
    @Body() dto: TaoHopDongDto,
    @Req() req: any,
  ) {
    const taoBoi = req.user?.id;
    return this.hopDongService.taoHopDong(nhanVienId, dto, taoBoi);
  }

  /**
   * Lấy chi tiết hợp đồng
   */
  @Get('hop-dong/:id')
  @VaiTro('ADMIN', 'HR', 'PAYROLL_OPERATOR')
  async layHopDongTheoId(@Param('id', ParseIntPipe) id: number) {
    return this.hopDongService.layHopDongTheoId(id);
  }

  /**
   * Cập nhật hợp đồng
   */
  @Put('hop-dong/:id')
  @VaiTro('ADMIN', 'HR')
  async capNhatHopDong(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CapNhatHopDongDto,
  ) {
    return this.hopDongService.capNhatHopDong(id, dto);
  }

  /**
   * Ngừng hợp đồng (chấm dứt sớm)
   */
  @Post('hop-dong/:id/ngung')
  @VaiTro('ADMIN', 'HR')
  async ngungHopDong(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: NgungHopDongDto,
  ) {
    return this.hopDongService.ngungHopDong(id, dto);
  }

  /**
   * Xóa hợp đồng
   */
  @Delete('hop-dong/:id')
  @VaiTro('ADMIN')
  async xoaHopDong(@Param('id', ParseIntPipe) id: number) {
    return this.hopDongService.xoaHopDong(id);
  }
}
