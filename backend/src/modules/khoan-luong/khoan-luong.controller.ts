// Controller Khoản Lương - Xử lý HTTP requests
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
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { KhoanLuongService } from './khoan-luong.service';
import { TaoKhoanLuongDto, CapNhatKhoanLuongDto, CapNhatThuTuDto } from './dto/khoan-luong.dto';
import { Quyen, VaiTro } from '../../common';

@ApiTags('khoan-luong')
@Controller('khoan-luong')
@VaiTro('ADMIN', 'KETOAN') // Chỉ admin và kế toán mới quản lý khoản lương
export class KhoanLuongController {
  constructor(private readonly khoanLuongService: KhoanLuongService) {}

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách tất cả khoản lương' })
  @ApiQuery({ name: 'loai', required: false, enum: ['THU_NHAP', 'KHAU_TRU'] })
  @ApiResponse({ status: 200, description: 'Thành công' })
  async layTatCa(@Query('loai') loai?: 'THU_NHAP' | 'KHAU_TRU') {
    if (loai) {
      return this.khoanLuongService.layTheoLoai(loai);
    }
    return this.khoanLuongService.layTatCa();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy thông tin khoản lương theo ID' })
  @ApiResponse({ status: 200, description: 'Thành công' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy khoản lương' })
  async layTheoId(@Param('id', ParseIntPipe) id: number) {
    return this.khoanLuongService.layTheoId(id);
  }

  @Get('ma/:maKhoan')
  @ApiOperation({ summary: 'Lấy thông tin khoản lương theo mã' })
  @ApiResponse({ status: 200, description: 'Thành công' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy khoản lương' })
  async layTheoMa(@Param('maKhoan') maKhoan: string) {
    return this.khoanLuongService.layTheoMa(maKhoan);
  }

  @Post()
  @ApiOperation({ summary: 'Tạo khoản lương mới' })
  @ApiResponse({ status: 201, description: 'Tạo thành công' })
  @ApiResponse({ status: 409, description: 'Mã khoản lương đã tồn tại' })
  async taoMoi(@Body() dto: TaoKhoanLuongDto) {
    return this.khoanLuongService.taoMoi(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Cập nhật thông tin khoản lương' })
  @ApiResponse({ status: 200, description: 'Cập nhật thành công' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy khoản lương' })
  async capNhat(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CapNhatKhoanLuongDto,
  ) {
    return this.khoanLuongService.capNhat(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Xóa khoản lương' })
  @ApiResponse({ status: 200, description: 'Xóa thành công' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy khoản lương' })
  @ApiResponse({ status: 409, description: 'Khoản lương đang được sử dụng' })
  async xoa(@Param('id', ParseIntPipe) id: number) {
    return this.khoanLuongService.xoa(id);
  }

  @Put('thu-tu/cap-nhat')
  @ApiOperation({ summary: 'Cập nhật thứ tự hiển thị các khoản lương' })
  @ApiResponse({ status: 200, description: 'Cập nhật thành công' })
  async capNhatThuTu(@Body() dto: CapNhatThuTuDto) {
    return this.khoanLuongService.capNhatThuTu(dto.danhSach);
  }
}
