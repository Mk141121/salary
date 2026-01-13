// Controller cho Trợ lý AI gợi ý Rule
import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TroLyAiService } from './tro-ly-ai.service';
import { GoiYRuleDto, ApDungRuleDeXuatDto } from './dto/tro-ly-ai.dto';

@ApiTags('Trợ lý AI gợi ý Rule')
@Controller('tro-ly-ai')
export class TroLyAiController {
  constructor(private readonly troLyAiService: TroLyAiService) {}

  // ============================================
  // GỢI Ý RULE TỪ TIẾNG VIỆT
  // ============================================
  @Post('goi-y-rule')
  @ApiOperation({
    summary: 'Gợi ý rule từ mô tả tiếng Việt',
    description: 'AI phân tích nội dung tiếng Việt và đề xuất rule JSON hợp lệ',
  })
  @ApiResponse({
    status: 201,
    description: 'Trả về rule đề xuất hoặc danh sách câu hỏi cần làm rõ',
  })
  async goiYRule(@Body() dto: GoiYRuleDto) {
    // TODO: Lấy nguoiTaoId từ JWT token
    const nguoiTaoId = undefined;
    return this.troLyAiService.goiYRule(dto, nguoiTaoId);
  }

  // ============================================
  // LẤY CONTEXT CHO AI
  // ============================================
  @Get('context/:phongBanId/:quyCheId')
  @ApiOperation({
    summary: 'Lấy context cho AI',
    description: 'Lấy thông tin phòng ban, quy chế, khoản lương, sự kiện để AI có thể gợi ý chính xác',
  })
  async layContext(
    @Param('phongBanId', ParseIntPipe) phongBanId: number,
    @Param('quyCheId', ParseIntPipe) quyCheId: number,
  ) {
    return this.troLyAiService.layContext(phongBanId, quyCheId);
  }

  // ============================================
  // ÁP DỤNG RULE TỪ ĐỀ XUẤT AI
  // ============================================
  @Post('ap-dung/:quyCheId')
  @ApiOperation({
    summary: 'Áp dụng rule từ đề xuất AI',
    description: 'Tạo rule mới từ đề xuất AI đã được user xác nhận',
  })
  @ApiResponse({
    status: 201,
    description: 'Rule đã được tạo thành công',
  })
  async apDungRule(
    @Param('quyCheId', ParseIntPipe) quyCheId: number,
    @Body() dto: ApDungRuleDeXuatDto,
  ) {
    // TODO: Lấy nguoiTaoId từ JWT token
    const nguoiTaoId = undefined;
    return this.troLyAiService.apDungRule(dto, quyCheId, nguoiTaoId);
  }

  // ============================================
  // HỦY ĐỀ XUẤT
  // ============================================
  @Post('huy/:auditId')
  @ApiOperation({
    summary: 'Hủy đề xuất AI',
    description: 'Đánh dấu đề xuất AI là đã hủy',
  })
  async huyDeXuat(@Param('auditId', ParseIntPipe) auditId: number) {
    return this.troLyAiService.huyDeXuat(auditId);
  }

  // ============================================
  // LỊCH SỬ ĐỀ XUẤT AI
  // ============================================
  @Get('lich-su/:quyCheId')
  @ApiOperation({
    summary: 'Lịch sử đề xuất AI',
    description: 'Lấy danh sách các đề xuất AI của quy chế',
  })
  async lichSuDeXuat(@Param('quyCheId', ParseIntPipe) quyCheId: number) {
    return this.troLyAiService.lichSuDeXuat(quyCheId);
  }
}
