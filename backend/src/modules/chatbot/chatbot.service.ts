import { Injectable, Logger } from '@nestjs/common';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { PrismaService } from '../../prisma/prisma.service';
import { randomUUID } from 'crypto';

interface Chunk {
  id: string;
  docId: string;
  sourceFile: string;
  title: string;
  sectionPath: string;
  contentMd: string;
  tokenCount: number;
  tags: string[];
  module: string;
  persona: string[];
  routes: string[];
  actions: string[];
}

interface SearchResult {
  chunk: Chunk;
  score: number;
  highlights: string[];
}

export interface ChatResponse {
  answer: string;
  sources: Array<{
    title: string;
    module: string;
    excerpt: string;
  }>;
  suggestions: string[];
  sessionId?: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

@Injectable()
export class ChatbotService {
  private readonly logger = new Logger(ChatbotService.name);
  private chunks: Chunk[] = [];
  private isLoaded = false;
  private sessionHistory: Map<string, ChatMessage[]> = new Map();

  constructor(private readonly prisma: PrismaService) {
    this.loadKnowledgeBase();
  }

  /**
   * Load knowledge base chunks from file
   */
  private loadKnowledgeBase(): void {
    try {
      // Try multiple possible paths - include Docker path
      const possiblePaths = [
        join(process.cwd(), 'knowledge_base/kb_index.jsonl'),
        join(process.cwd(), '../kb-pipeline/knowledge_base/00_index/kb_index.jsonl'),
        join(process.cwd(), 'kb-pipeline/knowledge_base/00_index/kb_index.jsonl'),
        '/app/knowledge_base/kb_index.jsonl',
        '/Volumes/DATA/VSCODE/tinh-luong/kb-pipeline/knowledge_base/00_index/kb_index.jsonl',
        '/Volumes/DATA/VSCODE/tinh-luong/backend/knowledge_base/kb_index.jsonl',
      ];

      let kbPath: string | null = null;
      for (const path of possiblePaths) {
        this.logger.debug(`Checking path: ${path}`);
        if (existsSync(path)) {
          kbPath = path;
          this.logger.log(`Found KB at: ${path}`);
          break;
        }
      }

      if (!kbPath) {
        this.logger.warn('Knowledge base not found. Chatbot will have limited functionality.');
        return;
      }

      const content = readFileSync(kbPath, 'utf-8');
      this.chunks = content
        .split('\n')
        .filter(line => line.trim())
        .map(line => JSON.parse(line));

      this.isLoaded = true;
      this.logger.log(`Loaded ${this.chunks.length} knowledge base chunks`);
    } catch (error) {
      this.logger.error('Failed to load knowledge base', error);
    }
  }

  /**
   * Simple keyword-based search (works without embeddings)
   * Supports Vietnamese with diacritics
   */
  private searchByKeywords(query: string, limit: number = 5): SearchResult[] {
    if (!query || !this.isLoaded) {
      this.logger.debug(`Search skipped: query=${query}, isLoaded=${this.isLoaded}`);
      return [];
    }
    
    // Normalize Vietnamese text - keep original and create non-diacritic version
    const queryLower = query.toLowerCase();
    const queryNoDiacritics = this.removeDiacritics(queryLower);
    
    // Split into words - Vietnamese words can be short
    const queryWords = queryLower
      .split(/\s+/)
      .filter(w => w.length > 1);
    
    const queryWordsNoDiacritics = queryNoDiacritics
      .split(/\s+/)
      .filter(w => w.length > 1);
    
    this.logger.debug(`Searching for: ${queryWords.join(', ')} (no diacritics: ${queryWordsNoDiacritics.join(', ')})`);

    const results: SearchResult[] = [];

    // Detect if query is a how-to question
    const isHowToQuery = /làm sao|cách|như thế nào|thế nào|hướng dẫn/i.test(query);

    for (const chunk of this.chunks) {
      const title = (chunk.title || '').toLowerCase();
      const contentMd = (chunk.contentMd || '').toLowerCase();
      const tags = (chunk.tags || []).map((t: string) => t.toLowerCase());
      const routes = (chunk.routes || []).map((r: string) => r.toLowerCase());
      
      const contentLower = title + ' ' + contentMd + ' ' + tags.join(' ');
      const contentNoDiacritics = this.removeDiacritics(contentLower);
      const titleNoDiacritics = this.removeDiacritics(title);
      
      // Calculate simple relevance score
      let score = 0;
      const highlights: string[] = [];

      // BOOST: If query is how-to, prioritize FAQ-style titles
      const isFaqTitle = /làm sao|cách|như thế nào|hướng dẫn|\?/.test(title);
      if (isHowToQuery && isFaqTitle) {
        score += 15;
      }

      // BOOST: Exact phrase match in title (highest priority)
      if (title.includes(queryLower) || titleNoDiacritics.includes(queryNoDiacritics)) {
        score += 20;
      }
      
      // BOOST: Key topic words match in title
      const topicWords = queryWordsNoDiacritics.filter(w => w.length > 2 && !['lam', 'sao', 'cach', 'nhu', 'the', 'nao', 'huong', 'dan'].includes(w));
      for (const word of topicWords) {
        if (titleNoDiacritics.includes(word)) {
          score += 10;
        }
      }
      
      // BOOST: Route/URL match (for menu navigation questions)
      for (const route of routes) {
        for (const word of queryWordsNoDiacritics) {
          if (route.includes(word)) {
            score += 5;
          }
        }
      }

      // Search with original Vietnamese (có dấu)
      for (const word of queryWords) {
        if (contentLower.includes(word)) {
          score += 2; // Higher score for exact match with diacritics
          const idx = contentLower.indexOf(word);
          const start = Math.max(0, idx - 50);
          const end = Math.min(contentMd.length, idx + word.length + 50);
          if (contentMd.length > 0) {
            highlights.push('...' + contentMd.substring(start, Math.min(end, contentMd.length)) + '...');
          }
        }
      }
      
      // Search without diacritics (không dấu) for fallback
      for (const word of queryWordsNoDiacritics) {
        if (contentNoDiacritics.includes(word) && !queryWords.some(w => contentLower.includes(w))) {
          score += 1; // Lower score for no-diacritic match
          const idx = contentNoDiacritics.indexOf(word);
          const start = Math.max(0, idx - 50);
          const end = Math.min(contentMd.length, idx + word.length + 50);
          if (contentMd.length > 0) {
            highlights.push('...' + contentMd.substring(start, Math.min(end, contentMd.length)) + '...');
          }
        }
      }

      // Boost score for title matches
      if (title.includes(queryLower) || this.removeDiacritics(title).includes(queryNoDiacritics)) {
        score += 3;
      }

      // Boost score for tag matches
      for (const tag of tags) {
        for (const word of queryWords) {
          if (tag.includes(word) || word.includes(tag)) {
            score += 2;
          }
        }
        // Also check without diacritics
        const tagNoDiacritics = this.removeDiacritics(tag);
        for (const word of queryWordsNoDiacritics) {
          if (tagNoDiacritics.includes(word) || word.includes(tagNoDiacritics)) {
            score += 1;
          }
        }
      }

      if (score > 0) {
        results.push({ chunk, score, highlights: highlights.slice(0, 2) });
      }
    }

    return results
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);
  }
  
  /**
   * Remove Vietnamese diacritics for fuzzy matching
   */
  private removeDiacritics(str: string): string {
    return str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/Đ/g, 'D');
  }

  /**
   * Generate answer from search results
   */
  private generateAnswer(query: string, results: SearchResult[]): string {
    if (results.length === 0) {
      return 'Xin lỗi, tôi không tìm thấy thông tin liên quan đến câu hỏi của bạn trong hệ thống. Vui lòng thử diễn đạt lại hoặc liên hệ bộ phận hỗ trợ.';
    }

    // Build answer from top results
    const topResult = results[0];
    let answer = '';

    // Check if it's a specific question pattern
    const questionPatterns = [
      { pattern: /làm sao|cách|như thế nào|how/i, type: 'how-to' },
      { pattern: /là gì|what is|nghĩa là/i, type: 'definition' },
      { pattern: /tại sao|why|vì sao/i, type: 'reason' },
      { pattern: /ở đâu|where|chỗ nào/i, type: 'location' },
      { pattern: /khi nào|when|lúc nào/i, type: 'timing' },
    ];

    let questionType = 'general';
    for (const { pattern, type } of questionPatterns) {
      if (pattern.test(query)) {
        questionType = type;
        break;
      }
    }

    // Format answer based on question type
    switch (questionType) {
      case 'how-to':
        answer = `**${topResult.chunk.title}**\n\n${topResult.chunk.contentMd}`;
        break;
      case 'definition':
        answer = `**${topResult.chunk.title}**\n\n${topResult.chunk.contentMd.substring(0, 500)}...`;
        break;
      default:
        answer = `Dựa trên tài liệu "${topResult.chunk.title}":\n\n${topResult.chunk.contentMd.substring(0, 800)}...`;
    }

    return answer;
  }

  /**
   * Generate follow-up suggestions
   */
  private generateSuggestions(query: string, results: SearchResult[]): string[] {
    const suggestions: string[] = [];
    const seenModules = new Set<string>();

    for (const result of results.slice(0, 3)) {
      if (!seenModules.has(result.chunk.module)) {
        seenModules.add(result.chunk.module);
        
        // Generate contextual suggestions
        switch (result.chunk.module) {
          case 'PAYROLL':
            suggestions.push('Làm sao tạo bảng lương mới?');
            suggestions.push('Snapshot là gì?');
            break;
          case 'EMPLOYEES':
            suggestions.push('Import nhân viên từ Excel như thế nào?');
            break;
          case 'ATTENDANCE':
            suggestions.push('Kiểm tra ngày công ở đâu?');
            break;
          case 'RULE_ENGINE':
            suggestions.push('Quy chế lương hoạt động như thế nào?');
            break;
        }
      }
    }

    return [...new Set(suggestions)].slice(0, 3);
  }

  /**
   * Main chat function - answer user question with session support
   */
  async chat(query: string, sessionId?: string, userId?: number): Promise<ChatResponse> {
    const currentSessionId = sessionId || randomUUID();
    
    if (!this.isLoaded || this.chunks.length === 0) {
      return {
        answer: 'Hệ thống Knowledge Base chưa được khởi tạo. Vui lòng liên hệ quản trị viên.',
        sources: [],
        suggestions: [],
        sessionId: currentSessionId,
      };
    }

    // Get conversation history for context
    const history = this.getSessionHistory(currentSessionId);
    
    // Add context from recent messages
    let contextEnhancedQuery = query;
    if (history.length > 0) {
      const recentContext = history.slice(-4).map(m => m.content).join(' ');
      // Use context to improve search (simple approach)
      contextEnhancedQuery = `${query} ${recentContext.substring(0, 200)}`;
    }

    // Search for relevant chunks
    const searchResults = this.searchByKeywords(query, 5);
    
    // Generate answer
    const answer = this.generateAnswer(query, searchResults);
    
    // Extract sources
    const sources = searchResults.slice(0, 3).map(r => ({
      title: r.chunk.title,
      module: r.chunk.module,
      excerpt: r.chunk.contentMd.substring(0, 150) + '...',
    }));

    // Generate suggestions
    const suggestions = this.generateSuggestions(query, searchResults);

    // Save to session history (in-memory)
    this.addToSessionHistory(currentSessionId, 'user', query);
    this.addToSessionHistory(currentSessionId, 'assistant', answer);
    
    // Save to database asynchronously
    this.saveToDatabase(currentSessionId, userId, query, answer, searchResults.length).catch(err => {
      this.logger.error('Failed to save chat history:', err);
    });

    return {
      answer,
      sources,
      suggestions,
      sessionId: currentSessionId,
    };
  }
  
  /**
   * Get session history from memory
   */
  private getSessionHistory(sessionId: string): ChatMessage[] {
    return this.sessionHistory.get(sessionId) || [];
  }
  
  /**
   * Add message to session history
   */
  private addToSessionHistory(sessionId: string, role: 'user' | 'assistant', content: string): void {
    if (!this.sessionHistory.has(sessionId)) {
      this.sessionHistory.set(sessionId, []);
    }
    const history = this.sessionHistory.get(sessionId)!;
    history.push({ role, content, timestamp: new Date() });
    
    // Keep only last 20 messages per session
    if (history.length > 20) {
      history.shift();
    }
  }
  
  /**
   * Save chat to database
   */
  private async saveToDatabase(
    sessionId: string, 
    userId: number | undefined, 
    query: string, 
    answer: string,
    sourcesCount: number
  ): Promise<void> {
    try {
      // Use raw SQL since tables are not in Prisma schema
      await this.prisma.$executeRaw`
        INSERT INTO chat_history (session_id, user_id, role, content, created_at)
        VALUES (${sessionId}::uuid, ${userId || null}, 'user', ${query}, NOW())
      `;
      
      await this.prisma.$executeRaw`
        INSERT INTO chat_history (session_id, user_id, role, content, created_at)
        VALUES (${sessionId}::uuid, ${userId || null}, 'assistant', ${answer}, NOW())
      `;
      
      // Save analytics
      await this.prisma.$executeRaw`
        INSERT INTO chat_analytics (query, sources_count, user_id, session_id, created_at)
        VALUES (${query}, ${sourcesCount}, ${userId || null}, ${sessionId}::uuid, NOW())
      `;
    } catch (error) {
      // Tables may not exist yet, log and continue
      this.logger.debug('Chat history save skipped (tables may not exist)');
    }
  }
  
  /**
   * Get chat history for a session
   */
  async getChatHistory(sessionId: string): Promise<ChatMessage[]> {
    try {
      const rows = await this.prisma.$queryRaw<Array<{role: string, content: string, created_at: Date}>>`
        SELECT role, content, created_at 
        FROM chat_history 
        WHERE session_id = ${sessionId}::uuid 
        ORDER BY created_at ASC
      `;
      return rows.map(r => ({
        role: r.role as 'user' | 'assistant',
        content: r.content,
        timestamp: r.created_at,
      }));
    } catch {
      return this.getSessionHistory(sessionId);
    }
  }

  /**
   * Get analytics data
   */
  async getAnalytics(days: number = 7): Promise<{
    totalQueries: number;
    uniqueSessions: number;
    avgSourcesPerQuery: number;
    dailyStats: Array<{ date: string; queries: number }>;
  }> {
    try {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - days);

      // Total queries
      const totalResult = await this.prisma.$queryRaw<Array<{ count: bigint }>>`
        SELECT COUNT(*) as count FROM chat_analytics 
        WHERE created_at >= ${startDate}
      `;
      const totalQueries = Number(totalResult[0]?.count || 0);

      // Unique sessions
      const sessionResult = await this.prisma.$queryRaw<Array<{ count: bigint }>>`
        SELECT COUNT(DISTINCT session_id) as count FROM chat_analytics 
        WHERE created_at >= ${startDate}
      `;
      const uniqueSessions = Number(sessionResult[0]?.count || 0);

      // Average sources
      const avgResult = await this.prisma.$queryRaw<Array<{ avg: number }>>`
        SELECT AVG(sources_count) as avg FROM chat_analytics 
        WHERE created_at >= ${startDate}
      `;
      const avgSourcesPerQuery = Number(avgResult[0]?.avg || 0);

      // Daily stats
      const dailyResult = await this.prisma.$queryRaw<Array<{ date: Date; count: bigint }>>`
        SELECT DATE(created_at) as date, COUNT(*) as count 
        FROM chat_analytics 
        WHERE created_at >= ${startDate}
        GROUP BY DATE(created_at)
        ORDER BY date
      `;
      const dailyStats = dailyResult.map(r => ({
        date: r.date.toISOString().split('T')[0],
        queries: Number(r.count),
      }));

      return { totalQueries, uniqueSessions, avgSourcesPerQuery, dailyStats };
    } catch (error) {
      this.logger.debug('Analytics query failed (tables may not exist)');
      return { totalQueries: 0, uniqueSessions: 0, avgSourcesPerQuery: 0, dailyStats: [] };
    }
  }

  /**
   * Get top queries
   */
  async getTopQueries(limit: number = 10): Promise<Array<{ query: string; count: number }>> {
    try {
      const result = await this.prisma.$queryRaw<Array<{ query: string; count: bigint }>>`
        SELECT query, COUNT(*) as count 
        FROM chat_analytics 
        GROUP BY query 
        ORDER BY count DESC 
        LIMIT ${limit}
      `;
      return result.map(r => ({ query: r.query, count: Number(r.count) }));
    } catch {
      return [];
    }
  }

  /**
   * Get FAQ list
   */
  getFAQs(): Array<{ question: string; category: string }> {
    // Load from FAQ file or return predefined
    return [
      { question: 'Làm sao tạo bảng lương mới?', category: 'Tính lương' },
      { question: 'Import nhân viên từ Excel như thế nào?', category: 'Setup' },
      { question: 'Snapshot là gì?', category: 'Snapshot/Chốt' },
      { question: 'Chốt và Khóa khác nhau thế nào?', category: 'Snapshot/Chốt' },
      { question: 'Lương tính sai, kiểm tra ở đâu?', category: 'Lỗi thường gặp' },
      { question: 'Quy chế lương là gì?', category: 'Tính lương' },
      { question: 'Điều chỉnh lương sau khi chốt?', category: 'Snapshot/Chốt' },
      { question: 'Công thức tính sản lượng?', category: 'Tính lương' },
    ];
  }

  /**
   * Get glossary term
   */
  getGlossaryTerm(term: string): { term: string; definition: string } | null {
    const termChunk = this.chunks.find(
      c => c.title.toLowerCase().includes(term.toLowerCase()) && 
           c.sourceFile.includes('glossary')
    );

    if (termChunk) {
      return {
        term: termChunk.title,
        definition: termChunk.contentMd,
      };
    }

    return null;
  }

  /**
   * Get statistics about knowledge base
   */
  getStats(): { totalChunks: number; modules: string[]; isLoaded: boolean } {
    const modules = [...new Set(this.chunks.map(c => c.module))];
    return {
      totalChunks: this.chunks.length,
      modules,
      isLoaded: this.isLoaded,
    };
  }
}
