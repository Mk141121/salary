/**
 * DTOs for Chatbot RAG Module
 * HRM Chatbot - Hỗ trợ trả lời câu hỏi về hệ thống
 */

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsNumber, Min, Max } from 'class-validator';

/**
 * DTO cho câu hỏi từ người dùng
 */
export class AskQuestionDto {
  @ApiProperty({
    description: 'Câu hỏi từ người dùng',
    example: 'Làm thế nào để xem bảng lương của tôi?',
  })
  @IsString()
  @IsNotEmpty({ message: 'Câu hỏi không được để trống' })
  question: string;

  @ApiPropertyOptional({
    description: 'Ngữ cảnh bổ sung (module đang sử dụng)',
    example: 'bang-luong',
  })
  @IsOptional()
  @IsString()
  context?: string;

  @ApiPropertyOptional({
    description: 'Số lượng kết quả tối đa',
    example: 5,
    default: 5,
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(10)
  topK?: number;
}

/**
 * DTO cho kết quả tìm kiếm chunk
 */
export class ChunkResultDto {
  @ApiProperty({ description: 'ID của chunk' })
  chunkId: string;

  @ApiProperty({ description: 'Nội dung chunk' })
  content: string;

  @ApiProperty({ description: 'Module liên quan' })
  module: string;

  @ApiProperty({ description: 'Workflow liên quan' })
  workflow: string;

  @ApiProperty({ description: 'Loại chunk (concept, workflow, api, faq)' })
  type: string;

  @ApiProperty({ description: 'Tags gắn với chunk' })
  tags: string[];

  @ApiProperty({ description: 'Điểm tương đồng (0-1)' })
  score: number;
}

/**
 * DTO cho câu trả lời từ chatbot
 */
export class ChatAnswerDto {
  @ApiProperty({
    description: 'Câu trả lời được tổng hợp',
    example: 'Để xem bảng lương, bạn có thể truy cập vào menu "Bảng lương" từ sidebar...',
  })
  answer: string;

  @ApiProperty({
    description: 'Các chunk liên quan được tìm thấy',
    type: [ChunkResultDto],
  })
  relatedChunks: ChunkResultDto[];

  @ApiProperty({
    description: 'Loại câu hỏi được phát hiện',
    example: 'how-to',
  })
  questionType: 'how-to' | 'what-is' | 'where' | 'why' | 'general';

  @ApiProperty({
    description: 'Độ tin cậy của câu trả lời (0-1)',
    example: 0.85,
  })
  confidence: number;

  @ApiProperty({
    description: 'Các gợi ý câu hỏi liên quan',
    type: [String],
  })
  suggestedQuestions: string[];
}

/**
 * DTO cho thuật ngữ glossary
 */
export class GlossaryTermDto {
  @ApiProperty({ description: 'Thuật ngữ', example: 'BHXH' })
  term: string;

  @ApiProperty({
    description: 'Định nghĩa',
    example: 'Bảo hiểm xã hội - đóng 8% lương căn bản',
  })
  definition: string;

  @ApiPropertyOptional({
    description: 'Các thuật ngữ liên quan',
    type: [String],
  })
  related?: string[];

  @ApiPropertyOptional({ description: 'Module liên quan' })
  module?: string;
}

/**
 * DTO cho FAQ entry
 */
export class FAQEntryDto {
  @ApiProperty({ description: 'ID của FAQ' })
  id: string;

  @ApiProperty({ description: 'Câu hỏi' })
  question: string;

  @ApiProperty({ description: 'Câu trả lời' })
  answer: string;

  @ApiProperty({ description: 'Danh mục' })
  category: string;

  @ApiPropertyOptional({ description: 'Tags' })
  tags?: string[];
}

/**
 * DTO cho thống kê Knowledge Base
 */
export class KBStatsDto {
  @ApiProperty({ description: 'Tổng số chunks', example: 141 })
  totalChunks: number;

  @ApiProperty({ description: 'Số thuật ngữ glossary', example: 15 })
  glossaryTerms: number;

  @ApiProperty({ description: 'Số FAQs', example: 16 })
  faqCount: number;

  @ApiProperty({
    description: 'Phân bố theo module',
    example: { 'bang-luong': 25, 'cham-cong': 18 },
  })
  byModule: Record<string, number>;

  @ApiProperty({
    description: 'Phân bố theo loại',
    example: { concept: 50, workflow: 40, api: 30, faq: 21 },
  })
  byType: Record<string, number>;

  @ApiProperty({ description: 'Thời điểm cập nhật cuối' })
  lastUpdated: string;
}

/**
 * Query DTO cho tìm glossary term
 */
export class GetGlossaryQueryDto {
  @ApiPropertyOptional({
    description: 'Thuật ngữ cần tìm (để trống = lấy tất cả)',
    example: 'BHXH',
  })
  @IsOptional()
  @IsString()
  term?: string;
}

/**
 * Query DTO cho lọc FAQs
 */
export class GetFAQsQueryDto {
  @ApiPropertyOptional({
    description: 'Lọc theo danh mục',
    example: 'bang-luong',
  })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiPropertyOptional({
    description: 'Số lượng tối đa',
    example: 10,
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(50)
  limit?: number;
}
