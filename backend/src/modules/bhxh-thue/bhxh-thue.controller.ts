// Controller BHXH & Thuế TNCN
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
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { BHXHThueService } from './bhxh-thue.service';
import {
  ThemNguoiPhuThuocDto,
  CapNhatNguoiPhuThuocDto,
  LuuCauHinhBHXHDto,
} from './dto/bhxh-thue.dto';

@ApiTags('BHXH & Thuế TNCN')
@Controller('bhxh-thue')
export class BHXHThueController {
  constructor(private readonly bhxhThueService: BHXHThueService) {}

  // ============================================
  // CẤU HÌNH BHXH
  // ============================================

  @Get('cau-hinh-bhxh/:nam')
  @ApiOperation({ summary: 'Lấy cấu hình BHXH theo năm' })
  async layCauHinhBHXH(@Param('nam', ParseIntPipe) nam: number) {
    return this.bhxhThueService.layCauHinhBHXH(nam);
  }

  @Post('cau-hinh-bhxh')
  @ApiOperation({ summary: 'Lưu cấu hình BHXH' })
  async luuCauHinhBHXH(@Body() dto: LuuCauHinhBHXHDto) {
    return this.bhxhThueService.luuCauHinhBHXH(dto);
  }

  @Post('khoi-tao-mac-dinh')
  @ApiOperation({ summary: 'Khởi tạo cấu hình BHXH/Thuế mặc định' })
  async khoiTaoCauHinhMacDinh() {
    return this.bhxhThueService.khoiTaoCauHinhMacDinh();
  }

  // ============================================
  // CẤU HÌNH THUẾ
  // ============================================

  @Get('cau-hinh-thue/:nam')
  @ApiOperation({ summary: 'Lấy cấu hình thuế TNCN theo năm' })
  async layCauHinhThue(@Param('nam', ParseIntPipe) nam: number) {
    return this.bhxhThueService.layCauHinhThue(nam);
  }

  // ============================================
  // NGƯỜI PHỤ THUỘC
  // ============================================

  @Get('nguoi-phu-thuoc/:nhanVienId')
  @ApiOperation({ summary: 'Lấy danh sách người phụ thuộc của nhân viên' })
  async layNguoiPhuThuoc(@Param('nhanVienId', ParseIntPipe) nhanVienId: number) {
    return this.bhxhThueService.layNguoiPhuThuoc(nhanVienId);
  }

  @Post('nguoi-phu-thuoc')
  @ApiOperation({ summary: 'Thêm người phụ thuộc' })
  async themNguoiPhuThuoc(@Body() dto: ThemNguoiPhuThuocDto) {
    return this.bhxhThueService.themNguoiPhuThuoc(dto);
  }

  @Put('nguoi-phu-thuoc/:id')
  @ApiOperation({ summary: 'Cập nhật người phụ thuộc' })
  async capNhatNguoiPhuThuoc(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CapNhatNguoiPhuThuocDto,
  ) {
    return this.bhxhThueService.capNhatNguoiPhuThuoc(id, dto);
  }

  // ============================================
  // TÍNH BHXH/THUẾ CHO BẢNG LƯƠNG
  // ============================================

  @Post('tinh-cho-bang-luong/:bangLuongId')
  @ApiOperation({ summary: 'Tính BHXH/Thuế cho toàn bộ bảng lương' })
  async tinhChoToBoNhanVien(@Param('bangLuongId', ParseIntPipe) bangLuongId: number) {
    return this.bhxhThueService.tinhChoToBoNhanVien(bangLuongId);
  }

  @Get('ket-qua-tinh/:bangLuongId')
  @ApiOperation({ summary: 'Lấy kết quả tính BHXH/Thuế của bảng lương' })
  async layKetQuaTinh(@Param('bangLuongId', ParseIntPipe) bangLuongId: number) {
    return this.bhxhThueService.layKetQuaTinh(bangLuongId);
  }
}
