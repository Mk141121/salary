import { Controller, Get, Put, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ThongTinCongTyService, CapNhatThongTinCongTyDto } from './thong-tin-cong-ty.service';

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

  @Put()
  @ApiOperation({ summary: 'Cập nhật thông tin công ty' })
  @ApiResponse({ status: 200, description: 'Cập nhật thành công' })
  async capNhat(@Body() dto: CapNhatThongTinCongTyDto) {
    return this.service.capNhatThongTinCongTy(dto);
  }
}
