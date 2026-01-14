// Controller Phòng Ban - Xử lý HTTP requests
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PhongBanService } from './phong-ban.service';
import { TaoPhongBanDto, CapNhatPhongBanDto } from './dto/phong-ban.dto';
import { Quyen } from '../../common';

@ApiTags('phong-ban')
@Controller('phong-ban')
export class PhongBanController {
  constructor(private readonly phongBanService: PhongBanService) {}

  @Quyen('PHONGBAN_XEM')
  @Get()
  @ApiOperation({ summary: 'Lấy danh sách tất cả phòng ban' })
  @ApiResponse({ status: 200, description: 'Thành công' })
  async layTatCa() {
    return this.phongBanService.layTatCa();
  }

  @Quyen('PHONGBAN_XEM')
  @Get(':id')
  @ApiOperation({ summary: 'Lấy thông tin phòng ban theo ID' })
  @ApiResponse({ status: 200, description: 'Thành công' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy phòng ban' })
  async layTheoId(@Param('id', ParseIntPipe) id: number) {
    return this.phongBanService.layTheoId(id);
  }

  @Quyen('PHONGBAN_THEM')
  @Post()
  @ApiOperation({ summary: 'Tạo phòng ban mới' })
  @ApiResponse({ status: 201, description: 'Tạo thành công' })
  async taoMoi(@Body() dto: TaoPhongBanDto) {
    return this.phongBanService.taoMoi(dto);
  }

  @Quyen('PHONGBAN_SUA')
  @Put(':id')
  @ApiOperation({ summary: 'Cập nhật thông tin phòng ban' })
  @ApiResponse({ status: 200, description: 'Cập nhật thành công' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy phòng ban' })
  async capNhat(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CapNhatPhongBanDto,
  ) {
    return this.phongBanService.capNhat(id, dto);
  }

  @Quyen('PHONGBAN_XOA')
  @Delete(':id')
  @ApiOperation({ summary: 'Xóa phòng ban' })
  @ApiResponse({ status: 200, description: 'Xóa thành công' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy phòng ban' })
  async xoa(@Param('id', ParseIntPipe) id: number) {
    return this.phongBanService.xoa(id);
  }

  @Quyen('PHONGBAN_XEM')
  @Get(':id/nhan-vien')
  @ApiOperation({ summary: 'Lấy danh sách nhân viên theo phòng ban' })
  @ApiResponse({ status: 200, description: 'Thành công' })
  async layNhanVien(@Param('id', ParseIntPipe) id: number) {
    return this.phongBanService.layNhanVienTheoPhongBan(id);
  }
}
