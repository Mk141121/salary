// Controller Thông báo - Sprint 6
// API endpoints cho thông báo người dùng
import {
  Controller,
  Get,
  Put,
  Post,
  Param,
  Query,
  ParseIntPipe,
  Request,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ThongBaoService } from './thong-bao.service';
import { ThongBaoQueryDto } from './thong-bao.dto';

@ApiTags('Thông báo')
@Controller('thong-bao')
export class ThongBaoController {
  constructor(private readonly service: ThongBaoService) {}

  /**
   * GET /api/thong-bao
   * Lấy danh sách thông báo của user đang đăng nhập
   */
  @Get()
  @ApiOperation({ summary: 'Lấy danh sách thông báo' })
  async layDanhSach(@Request() req: any, @Query() query: ThongBaoQueryDto) {
    return this.service.layDanhSach(req.user.id, query);
  }

  /**
   * GET /api/thong-bao/chua-doc
   * Đếm số thông báo chưa đọc
   */
  @Get('chua-doc')
  @ApiOperation({ summary: 'Đếm thông báo chưa đọc' })
  async demChuaDoc(@Request() req: any) {
    const chuaDoc = await this.service.demChuaDoc(req.user.id);
    return { chuaDoc };
  }

  /**
   * PUT /api/thong-bao/:id/da-doc
   * Đánh dấu 1 thông báo đã đọc
   */
  @Put(':id/da-doc')
  @ApiOperation({ summary: 'Đánh dấu đã đọc' })
  async danhDauDaDoc(@Request() req: any, @Param('id', ParseIntPipe) id: number) {
    return this.service.danhDauDaDoc(req.user.id, id);
  }

  /**
   * POST /api/thong-bao/da-doc-tat-ca
   * Đánh dấu tất cả thông báo đã đọc
   */
  @Post('da-doc-tat-ca')
  @ApiOperation({ summary: 'Đánh dấu tất cả đã đọc' })
  async danhDauTatCaDaDoc(@Request() req: any) {
    return this.service.danhDauTatCaDaDoc(req.user.id);
  }
}
