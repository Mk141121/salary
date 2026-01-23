/**
 * Chatbot Service Integration Tests
 * Test KB search, FAQs, session history, analytics
 */
import { Test } from '@nestjs/testing';
import { ChatbotService } from '../chatbot.service';
import { PrismaService } from '../../../prisma/prisma.service';
import { describeIf } from '../../../test/integrationTestUtils';

describeIf('ChatbotService', () => {
  let service: ChatbotService;
  let prisma: PrismaService;
  const testSessionId = `test-session-${Date.now()}`;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [PrismaService, ChatbotService],
    }).compile();

    prisma = moduleRef.get(PrismaService);
    service = moduleRef.get(ChatbotService);
    await prisma.$connect();
  });

  afterAll(async () => {
    // Cleanup test data
    await prisma.chatHistory.deleteMany({
      where: { sessionId: testSessionId },
    });
    await prisma.chatAnalytics.deleteMany({
      where: { sessionId: testSessionId },
    });
    await prisma.$disconnect();
  });

  describe('FAQs', () => {
    it('should return list of FAQs', async () => {
      const faqs = await service.getFAQs();
      
      expect(Array.isArray(faqs)).toBe(true);
      expect(faqs.length).toBeGreaterThan(0);
      
      // Each FAQ should have question and tags
      faqs.forEach(faq => {
        expect(faq).toHaveProperty('question');
        expect(typeof faq.question).toBe('string');
        expect(faq.question.length).toBeGreaterThan(5);
      });
    });

    it('should include common FAQ topics', async () => {
      const faqs = await service.getFAQs();
      const questions = faqs.map(f => f.question.toLowerCase());
      
      // Should have FAQs about common topics
      const hasLuongRelated = questions.some(q => 
        q.includes('lương') || q.includes('luong')
      );
      expect(hasLuongRelated).toBe(true);
    });
  });

  describe('Search & Answer', () => {
    it('should answer query about ứng lương', async () => {
      const result = await service.answer({
        query: 'cách tạo ứng lương',
        sessionId: testSessionId,
      });

      expect(result).toHaveProperty('answer');
      expect(result.answer.length).toBeGreaterThan(50);
      expect(result.answer.toLowerCase()).toContain('ứng lương');
      
      // Should have sources
      expect(result.sources).toBeDefined();
      expect(result.sources.length).toBeGreaterThan(0);
      
      // Should have suggestions
      expect(result.suggestions).toBeDefined();
      expect(Array.isArray(result.suggestions)).toBe(true);
    });

    it('should answer query about bảng lương', async () => {
      const result = await service.answer({
        query: 'làm sao tạo bảng lương',
        sessionId: testSessionId,
      });

      expect(result.answer.toLowerCase()).toContain('bảng lương');
      expect(result.sources.length).toBeGreaterThan(0);
    });

    it('should answer query about chấm công', async () => {
      const result = await service.answer({
        query: 'cách xem chấm công',
        sessionId: testSessionId,
      });

      expect(result.answer.toLowerCase()).toContain('chấm công');
    });

    it('should handle empty query gracefully', async () => {
      const result = await service.answer({
        query: '',
        sessionId: testSessionId,
      });

      expect(result.answer).toBeDefined();
      // Should return a helpful message or FAQs
    });

    it('should handle unknown topic gracefully', async () => {
      const result = await service.answer({
        query: 'xyz random gibberish 123',
        sessionId: testSessionId,
      });

      expect(result.answer).toBeDefined();
      // Should return fallback message or suggestions
      expect(result.suggestions.length).toBeGreaterThan(0);
    });
  });

  describe('Session History', () => {
    const historySessionId = `history-test-${Date.now()}`;

    afterAll(async () => {
      await prisma.chatHistory.deleteMany({
        where: { sessionId: historySessionId },
      });
    });

    it('should save conversation to history', async () => {
      // Ask a question
      await service.answer({
        query: 'nhân viên mới bao nhiêu ngày phép?',
        sessionId: historySessionId,
      });

      // Get history
      const history = await service.getSessionHistory(historySessionId);

      expect(history).toBeDefined();
      expect(history.length).toBeGreaterThan(0);
      
      // Should have user message
      const userMessages = history.filter(m => m.role === 'user');
      expect(userMessages.length).toBeGreaterThan(0);
      
      // Should have assistant message
      const assistantMessages = history.filter(m => m.role === 'assistant');
      expect(assistantMessages.length).toBeGreaterThan(0);
    });

    it('should maintain conversation context', async () => {
      // First question
      await service.answer({
        query: 'hướng dẫn import nhân viên',
        sessionId: historySessionId,
      });

      // Follow-up question (should understand context)
      const result = await service.answer({
        query: 'cần chuẩn bị gì?',
        sessionId: historySessionId,
      });

      // Should relate to import context
      expect(result.answer).toBeDefined();
    });
  });

  describe('Analytics Tracking', () => {
    const analyticsSessionId = `analytics-test-${Date.now()}`;

    afterAll(async () => {
      await prisma.chatHistory.deleteMany({
        where: { sessionId: analyticsSessionId },
      });
      await prisma.chatAnalytics.deleteMany({
        where: { sessionId: analyticsSessionId },
      });
    });

    it('should track query for analytics', async () => {
      await service.answer({
        query: 'test analytics query',
        sessionId: analyticsSessionId,
      });

      // Check analytics table
      const analytics = await prisma.chatAnalytics.findMany({
        where: { sessionId: analyticsSessionId },
      });

      expect(analytics.length).toBeGreaterThan(0);
      expect(analytics[0].query).toBe('test analytics query');
    });

    it('should record response time', async () => {
      await service.answer({
        query: 'another analytics test',
        sessionId: analyticsSessionId,
      });

      const analytics = await prisma.chatAnalytics.findMany({
        where: { sessionId: analyticsSessionId },
        orderBy: { createdAt: 'desc' },
        take: 1,
      });

      expect(analytics[0].responseTimeMs).toBeDefined();
      expect(analytics[0].responseTimeMs).toBeGreaterThan(0);
    });
  });

  describe('Keyword Search Quality', () => {
    it('should return relevant results for Vietnamese queries', async () => {
      const result = await service.answer({
        query: 'nghỉ phép năm',
        sessionId: testSessionId,
      });

      expect(result.answer.toLowerCase()).toMatch(/nghỉ|phép/);
    });

    it('should handle queries without diacritics', async () => {
      const result = await service.answer({
        query: 'nghi phep nam',
        sessionId: testSessionId,
      });

      expect(result.answer).toBeDefined();
      expect(result.answer.length).toBeGreaterThan(20);
    });

    it('should boost FAQ-style questions', async () => {
      const result = await service.answer({
        query: 'làm sao để tạo ứng lương?',
        sessionId: testSessionId,
      });

      expect(result.answer.toLowerCase()).toContain('ứng lương');
      // Should return step-by-step guide
      expect(result.answer).toMatch(/\d|bước|step/i);
    });
  });
});
