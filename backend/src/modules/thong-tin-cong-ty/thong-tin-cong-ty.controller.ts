import { Controller, Get, Put, Post, Delete, Body, Param, Query, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { 
  ThongTinCongTyService, 
  CapNhatThongTinCongTyDto,
  TaoCauHinhDonGiaDto,
  CapNhatCauHinhDonGiaDto,
} from './thong-tin-cong-ty.service';
import { VaiTro } from '../../common';

@ApiTags('thong-tin-cong-ty')
@Controller('thong-tin-cong-ty')
export class ThongTinCongTyController {
  constructor(private readonly service: ThongTinCongTyService) {}

  @Get()
  @ApiOperation({ summary: 'Lấy thông tin công ty' })
  @ApiResponse({ status: 200, description: 'Thành công' })
  async layThongTin() {
    return this.service.layThongTinCongTy();
  }

  @VaiTro('ADMIN')
  @Put()
  @ApiOperation({ summary: 'Cập nhật thông tin công ty' })
  @ApiResponse({ status: 200, description: 'Cập nhật thành công' })
  async capNhat(@Body() dto: CapNhatThongTinCongTyDto) {
    return this.service.capNhatThongTinCongTy(dto);
  }

  // ============================================
  // CẤU HÌNH ĐƠN GIÁ
  // ============================================

  @Get('don-gia')
  @ApiOperation({ summary: 'Lấy danh sách đơn giá' })
  @ApiQuery({ name: 'phongBanId', required: false })
  async layDanhSachDonGia(@Query('phongBanId') phongBanId?: string) {
    return this.service.layDanhSachDonGia(
      phongBanId ? parseInt(phongBanId, 10) : undefined,
    );
  }

  @Get('don-gia/:id')
  @ApiOperation({ summary: 'Lấy chi tiết đơn giá' })
  async layDonGia(@Param('id', ParseIntPipe) id: number) {
    return this.service.layDonGia(id);
  }

  @VaiTro('ADMIN')
  @Post('don-gia')
  @ApiOperation({ summary: 'Tạo đơn giá mới' })
  async taoDonGia(@Body() dto: TaoCauHinhDonGiaDto) {
    return this.service.taoDonGia(dto);
  }

  @VaiTro('ADMIN')
  @Put('don-gia/:id')
  @ApiOperation({ summary: 'Cập nhật đơn giá' })
  async capNhatDonGia(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CapNhatCauHinhDonGiaDto,
  ) {
    return this.service.capNhatDonGia(id, dto);
  }

  @VaiTro('ADMIN')
  @Delete('don-gia/:id')
  @ApiOperation({ summary: 'Xóa đơn giá' })
  async xoaDonGia(@Param('id', ParseIntPipe) id: number) {
    return this.service.xoaDonGia(id);
  }

  @VaiTro('ADMIN')
  @Post('don-gia/khoi-tao-mau')
  @ApiOperation({ summary: 'Khởi tạo đơn giá mẫu' })
  async khoiTaoDonGiaMau() {
    return this.service.khoiTaoDonGiaMau();
  }
}
