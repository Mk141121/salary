import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { ThueBHService } from './thue-bh.service';
import { TaoThueBHDto, CapNhatThueBHDto } from './thue-bh.dto';

@Controller('nhan-vien')
export class ThueBHController {
  constructor(private thueBHService: ThueBHService) {}

  /**
   * GET /nhan-vien/:id/thue-bh
   * Lấy thông tin thuế/BHXH của nhân viên
   */
  @Get(':id/thue-bh')
  async layTheoNhanVien(@Param('id', ParseIntPipe) nhanVienId: number) {
    return this.thueBHService.layTheoNhanVien(nhanVienId);
  }

  /**
   * POST /nhan-vien/:id/thue-bh
   * Tạo hoặc cập nhật thông tin thuế/BHXH
   */
  @Post(':id/thue-bh')
  async taoHoacCapNhat(
    @Param('id', ParseIntPipe) nhanVienId: number,
    @Body() dto: TaoThueBHDto,
  ) {
    return this.thueBHService.taoHoacCapNhat(nhanVienId, dto);
  }

  /**
   * PUT /nhan-vien/thue-bh/:thueBhId
   * Cập nhật theo ID
   */
  @Put('thue-bh/:thueBhId')
  async capNhat(
    @Param('thueBhId', ParseIntPipe) id: number,
    @Body() dto: CapNhatThueBHDto,
  ) {
    return this.thueBHService.capNhat(id, dto);
  }

  /**
   * DELETE /nhan-vien/thue-bh/:thueBhId
   * Xóa thông tin thuế/BHXH
   */
  @Delete('thue-bh/:thueBhId')
  async xoa(@Param('thueBhId', ParseIntPipe) id: number) {
    return this.thueBHService.xoa(id);
  }
}
