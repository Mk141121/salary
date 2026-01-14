// Controller Rule Engine
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
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { RuleEngineService, BienSoGiaTri } from './rule-engine.service';
import {
  TaoCongThucDto,
  CapNhatCongThucDto,
  ThemBienSoDto,
  TestCongThucDto,
  TinhLuongDto,
} from './dto/rule-engine.dto';
import { Quyen, VaiTro, CongKhai } from '../../common';

@ApiTags('Rule Engine - Công thức lương')
@Controller('rule-engine')
@VaiTro('ADMIN', 'KETOAN') // Chỉ admin và kế toán mới truy cập rule engine
export class RuleEngineController {
  constructor(private readonly ruleEngineService: RuleEngineService) {}

  // ============================================
  // CÔNG THỨC
  // ============================================

  @Get('cong-thuc')
  @ApiOperation({ summary: 'Lấy danh sách công thức' })
  @ApiQuery({ name: 'phongBanId', required: false })
  async layDanhSachCongThuc(@Query('phongBanId') phongBanId?: string) {
    return this.ruleEngineService.layDanhSachCongThuc(
      phongBanId ? parseInt(phongBanId, 10) : undefined,
    );
  }

  @Get('cong-thuc/:id')
  @ApiOperation({ summary: 'Lấy chi tiết công thức' })
  async layCongThuc(@Param('id', ParseIntPipe) id: number) {
    return this.ruleEngineService.layCongThuc(id);
  }

  @Post('cong-thuc')
  @ApiOperation({ summary: 'Tạo công thức mới' })
  async taoCongThuc(@Body() dto: TaoCongThucDto) {
    return this.ruleEngineService.taoCongThuc(dto);
  }

  @Put('cong-thuc/:id')
  @ApiOperation({ summary: 'Cập nhật công thức' })
  async capNhatCongThuc(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CapNhatCongThucDto,
  ) {
    return this.ruleEngineService.capNhatCongThuc(id, dto);
  }

  @Get('cong-thuc/:maCongThuc/lich-su')
  @ApiOperation({ summary: 'Lấy lịch sử công thức' })
  async layLichSuCongThuc(@Param('maCongThuc') maCongThuc: string) {
    return this.ruleEngineService.layLichSuCongThuc(maCongThuc);
  }

  // ============================================
  // BIẾN SỐ
  // ============================================

  @Post('cong-thuc/:congThucId/bien-so')
  @ApiOperation({ summary: 'Thêm biến số vào công thức' })
  async themBienSo(
    @Param('congThucId', ParseIntPipe) congThucId: number,
    @Body() dto: ThemBienSoDto,
  ) {
    return this.ruleEngineService.themBienSo(congThucId, dto);
  }

  @Delete('bien-so/:id')
  @ApiOperation({ summary: 'Xóa biến số' })
  async xoaBienSo(@Param('id', ParseIntPipe) id: number) {
    return this.ruleEngineService.xoaBienSo(id);
  }

  // ============================================
  // TÍNH TOÁN
  // ============================================

  @Post('test')
  @ApiOperation({ summary: 'Test công thức' })
  async testCongThuc(@Body() dto: TestCongThucDto) {
    return this.ruleEngineService.testCongThuc(dto.congThuc, dto.bienSo);
  }

  @Post('tinh-luong')
  @ApiOperation({ summary: 'Tính lương theo công thức' })
  async tinhLuong(@Body() dto: TinhLuongDto) {
    return this.ruleEngineService.tinhLuongTheoCongThuc(
      dto.nhanVienId,
      dto.congThucId,
      dto.thang,
      dto.nam,
    );
  }

  @Post('khoi-tao-mau')
  @ApiOperation({ summary: 'Khởi tạo công thức mẫu' })
  async khoiTaoCongThucMau() {
    return this.ruleEngineService.khoiTaoCongThucMau();
  }
}
