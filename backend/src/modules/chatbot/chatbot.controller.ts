import { Controller, Post, Get, Body, Query, HttpCode, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiQuery, ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ChatbotService } from './chatbot.service';
import { CongKhai } from '../../common/decorators/cong-khai.decorator';
import { IsString, IsNotEmpty, IsOptional, IsUUID, IsNumber } from 'class-validator';

class ChatDto {
  @ApiProperty({ example: 'Làm sao tạo bảng lương mới?', description: 'Câu hỏi' })
  @IsString()
  @IsNotEmpty()
  query: string;

  @ApiPropertyOptional({ example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', description: 'Session ID để duy trì ngữ cảnh hội thoại' })
  @IsOptional()
  @IsUUID()
  sessionId?: string;

  @ApiPropertyOptional({ example: 1, description: 'ID người dùng (nếu đã đăng nhập)' })
  @IsOptional()
  @IsNumber()
  userId?: number;
}

@ApiTags('Chatbot')
@Controller('chatbot')
export class ChatbotController {
  constructor(private readonly chatbotService: ChatbotService) {}

  @Post('ask')
  @CongKhai()
  @HttpCode(200)
  @ApiOperation({ summary: 'Hỏi chatbot về hệ thống' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        query: { type: 'string', example: 'Làm sao tạo bảng lương mới?' },
        sessionId: { type: 'string', example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', description: 'Optional session ID' },
        userId: { type: 'number', example: 1, description: 'Optional user ID' },
      },
    },
  })
  async ask(@Body() body: ChatDto) {
    const result = await this.chatbotService.chat(body.query, body.sessionId, body.userId);
    return {
      success: true,
      data: result,
    };
  }

  @Get('history/:sessionId')
  @CongKhai()
  @ApiOperation({ summary: 'Lấy lịch sử hội thoại theo session' })
  async getHistory(@Param('sessionId') sessionId: string) {
    const history = await this.chatbotService.getChatHistory(sessionId);
    return {
      success: true,
      data: { sessionId, messages: history },
    };
  }

  @Get('analytics')
  @CongKhai()
  @ApiOperation({ summary: 'Thống kê sử dụng chatbot' })
  @ApiQuery({ name: 'days', required: false, example: 7 })
  async getAnalytics(@Query('days') days?: string) {
    const analytics = await this.chatbotService.getAnalytics(parseInt(days || '7', 10));
    return {
      success: true,
      data: analytics,
    };
  }

  @Get('analytics/top-queries')
  @CongKhai()
  @ApiOperation({ summary: 'Top câu hỏi phổ biến' })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  async getTopQueries(@Query('limit') limit?: string) {
    const topQueries = await this.chatbotService.getTopQueries(parseInt(limit || '10', 10));
    return {
      success: true,
      data: topQueries,
    };
  }

  @Get('faqs')
  @ApiOperation({ summary: 'Lấy danh sách câu hỏi thường gặp' })
  getFAQs() {
    return {
      success: true,
      data: this.chatbotService.getFAQs(),
    };
  }

  @Get('glossary')
  @ApiOperation({ summary: 'Tra cứu thuật ngữ' })
  @ApiQuery({ name: 'term', required: true, example: 'Snapshot' })
  getGlossary(@Query('term') term: string) {
    const result = this.chatbotService.getGlossaryTerm(term);
    return {
      success: true,
      data: result,
    };
  }

  @Get('stats')
  @CongKhai()
  @ApiOperation({ summary: 'Thống kê Knowledge Base' })
  getStats() {
    return {
      success: true,
      data: this.chatbotService.getStats(),
    };
  }
}
