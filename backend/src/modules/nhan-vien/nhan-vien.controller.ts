// Controller Nhân Viên - Xử lý HTTP requests
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
import { NhanVienService } from './nhan-vien.service';
import { TaoNhanVienDto, CapNhatNhanVienDto, TimKiemNhanVienDto } from './dto/nhan-vien.dto';

@ApiTags('nhan-vien')
@Controller('nhan-vien')
export class NhanVienController {
  constructor(private readonly nhanVienService: NhanVienService) {}

  @Get('ma-tu-dong')
  @ApiOperation({ summary: 'Lấy mã nhân viên tự động tiếp theo' })
  @ApiResponse({ status: 200, description: 'Thành công' })
  async layMaTuDong() {
    const maNhanVien = await this.nhanVienService.taoMaNhanVienTuDong();
    return { maNhanVien };
  }

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách nhân viên' })
  @ApiQuery({ name: 'phongBanId', required: false, type: Number })
  @ApiQuery({ name: 'tuKhoa', required: false, type: String })
  @ApiResponse({ status: 200, description: 'Thành công' })
  async layTatCa(@Query() query: TimKiemNhanVienDto) {
    return this.nhanVienService.layTatCa(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy thông tin nhân viên theo ID' })
  @ApiResponse({ status: 200, description: 'Thành công' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy nhân viên' })
  async layTheoId(@Param('id', ParseIntPipe) id: number) {
    return this.nhanVienService.layTheoId(id);
  }

  @Get('ma/:maNhanVien')
  @ApiOperation({ summary: 'Lấy thông tin nhân viên theo mã' })
  @ApiResponse({ status: 200, description: 'Thành công' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy nhân viên' })
  async layTheoMa(@Param('maNhanVien') maNhanVien: string) {
    return this.nhanVienService.layTheoMa(maNhanVien);
  }

  @Post()
  @ApiOperation({ summary: 'Tạo nhân viên mới' })
  @ApiResponse({ status: 201, description: 'Tạo thành công' })
  async taoMoi(@Body() dto: TaoNhanVienDto) {
    return this.nhanVienService.taoMoi(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Cập nhật thông tin nhân viên' })
  @ApiResponse({ status: 200, description: 'Cập nhật thành công' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy nhân viên' })
  async capNhat(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CapNhatNhanVienDto,
  ) {
    return this.nhanVienService.capNhat(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Xóa nhân viên (chuyển trạng thái nghỉ việc)' })
  @ApiResponse({ status: 200, description: 'Xóa thành công' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy nhân viên' })
  async xoa(@Param('id', ParseIntPipe) id: number) {
    return this.nhanVienService.xoa(id);
  }

  @Get('thong-ke/theo-phong-ban')
  @ApiOperation({ summary: 'Thống kê số nhân viên theo phòng ban' })
  async thongKeTheoPhongBan() {
    return this.nhanVienService.demTheoPhongBan();
  }
}
