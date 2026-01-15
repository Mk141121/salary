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
} from '@nestjs/common';
import { NganHangService } from './ngan-hang.service';
import { TaoNganHangDto, CapNhatNganHangDto } from './ngan-hang.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { VaiTro } from '../../common/decorators/vai-tro.decorator';

@Controller('nhan-vien')
@UseGuards(JwtAuthGuard, RolesGuard)
export class NganHangController {
  constructor(private readonly nganHangService: NganHangService) {}

  /**
   * Lấy danh sách ngân hàng của nhân viên
   */
  @Get(':nhanVienId/ngan-hang')
  @VaiTro('ADMIN', 'HR', 'PAYROLL_OPERATOR')
  async layDanhSachNganHang(@Param('nhanVienId', ParseIntPipe) nhanVienId: number) {
    return this.nganHangService.layDanhSachNganHang(nhanVienId);
  }

  /**
   * Tạo ngân hàng mới cho nhân viên
   */
  @Post(':nhanVienId/ngan-hang')
  @VaiTro('ADMIN', 'HR')
  async taoNganHang(
    @Param('nhanVienId', ParseIntPipe) nhanVienId: number,
    @Body() dto: TaoNganHangDto,
  ) {
    return this.nganHangService.taoNganHang(nhanVienId, dto);
  }

  /**
   * Cập nhật ngân hàng
   */
  @Put('ngan-hang/:id')
  @VaiTro('ADMIN', 'HR')
  async capNhatNganHang(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CapNhatNganHangDto,
  ) {
    return this.nganHangService.capNhatNganHang(id, dto);
  }

  /**
   * Đặt làm mặc định
   */
  @Post('ngan-hang/:id/dat-mac-dinh')
  @VaiTro('ADMIN', 'HR')
  async datMacDinh(@Param('id', ParseIntPipe) id: number) {
    return this.nganHangService.datMacDinh(id);
  }

  /**
   * Xóa ngân hàng
   */
  @Delete('ngan-hang/:id')
  @VaiTro('ADMIN', 'HR')
  async xoaNganHang(@Param('id', ParseIntPipe) id: number) {
    return this.nganHangService.xoaNganHang(id);
  }
}
