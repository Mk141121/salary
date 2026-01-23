import { taxonomy, modules } from './config.js';
import type { Chunk } from './chunker.js';

export interface TagResult {
  tags: string[];
  module: string;
  persona: string[];
  routes: string[];
  actions: string[];
  entities: {
    models: string[];
    statuses: string[];
  };
}

/**
 * Auto-tagger for chunks based on content analysis
 */
export class Tagger {
  private keywordMap: Map<string, string[]>;
  private moduleKeywords: Map<string, string[]>;
  private actionKeywords: Map<string, string[]>;
  private statusPatterns: RegExp[];

  constructor() {
    this.keywordMap = new Map(Object.entries(taxonomy.keywordMapping));
    this.moduleKeywords = new Map();
    this.actionKeywords = new Map();
    
    // Build module keyword map
    for (const mod of modules.modules) {
      this.moduleKeywords.set(mod.id, mod.keywords);
    }

    // Action keywords
    this.actionKeywords.set('create', ['tạo mới', 'thêm', 'create', 'add', 'insert']);
    this.actionKeywords.set('update', ['cập nhật', 'sửa', 'chỉnh sửa', 'update', 'edit']);
    this.actionKeywords.set('delete', ['xóa', 'delete', 'remove']);
    this.actionKeywords.set('import', ['import', 'nhập', 'upload']);
    this.actionKeywords.set('export', ['export', 'xuất', 'download', 'tải về']);
    this.actionKeywords.set('approve', ['duyệt', 'phê duyệt', 'approve', 'chấp nhận']);
    this.actionKeywords.set('reject', ['từ chối', 'reject', 'không duyệt']);
    this.actionKeywords.set('lock', ['khóa', 'lock', 'chốt']);
    this.actionKeywords.set('unlock', ['mở khóa', 'unlock']);
    this.actionKeywords.set('calculate', ['tính', 'calculate', 'tính toán']);
    this.actionKeywords.set('snapshot', ['snapshot', 'chụp ảnh', 'lưu trạng thái']);

    // Status patterns
    this.statusPatterns = [
      /NHAP|NHÁP|Draft/gi,
      /DA_CHOT|ĐÃ_CHỐT|Locked/gi,
      /DA_KHOA|ĐÃ_KHOÁ|Closed/gi,
      /CHO_DUYET|CHỜ_DUYỆT|Pending/gi,
      /DA_DUYET|ĐÃ_DUYỆT|Approved/gi,
      /TU_CHOI|TỪ_CHỐI|Rejected/gi,
      /HIEU_LUC|HIỆU_LỰC|Active/gi,
      /HET_HIEU_LUC|HẾT_HIỆU_LỰC|Inactive/gi,
      /DANG_LAM|ĐANG_LÀM|Working/gi,
      /NGHI_VIEC|NGHỈ_VIỆC|Terminated/gi,
    ];
  }

  /**
   * Detect module from content
   */
  detectModule(content: string): string {
    const contentLower = content.toLowerCase();
    const scores: Map<string, number> = new Map();

    for (const [moduleId, keywords] of this.moduleKeywords) {
      let score = 0;
      for (const keyword of keywords) {
        const regex = new RegExp(keyword.toLowerCase(), 'gi');
        const matches = contentLower.match(regex);
        if (matches) {
          score += matches.length;
        }
      }
      if (score > 0) {
        scores.set(moduleId, score);
      }
    }

    if (scores.size === 0) return 'GENERAL';

    // Return module with highest score
    return [...scores.entries()]
      .sort((a, b) => b[1] - a[1])[0][0];
  }

  /**
   * Detect tags from content using keyword mapping
   */
  detectTags(content: string): string[] {
    const contentLower = content.toLowerCase();
    const tags = new Set<string>();

    for (const [keyword, tagList] of this.keywordMap) {
      if (contentLower.includes(keyword.toLowerCase())) {
        tagList.forEach(tag => tags.add(tag));
      }
    }

    return [...tags];
  }

  /**
   * Detect persona (target users) from content
   */
  detectPersona(content: string): string[] {
    const contentLower = content.toLowerCase();
    const personas: Set<string> = new Set();

    const personaKeywords: Record<string, string[]> = {
      admin: ['admin', 'quản trị', 'hệ thống', 'cấu hình', 'phân quyền'],
      hr: ['nhân sự', 'hr', 'nhân viên', 'tuyển dụng', 'hợp đồng'],
      ke_toan: ['kế toán', 'accounting', 'ngân hàng', 'chuyển khoản', 'bhxh', 'thuế'],
      manager: ['trưởng phòng', 'quản lý', 'duyệt', 'phê duyệt', 'manager'],
      nhan_vien: ['nhân viên', 'của tôi', 'cá nhân', 'employee', 'self-service'],
      truong_phong: ['trưởng phòng', 'phòng ban', 'department head'],
    };

    for (const [persona, keywords] of Object.entries(personaKeywords)) {
      for (const keyword of keywords) {
        if (contentLower.includes(keyword)) {
          personas.add(persona);
          break;
        }
      }
    }

    return personas.size > 0 ? [...personas] : ['all'];
  }

  /**
   * Detect actions mentioned in content
   */
  detectActions(content: string): string[] {
    const contentLower = content.toLowerCase();
    const actions: Set<string> = new Set();

    for (const [action, keywords] of this.actionKeywords) {
      for (const keyword of keywords) {
        if (contentLower.includes(keyword)) {
          actions.add(action);
          break;
        }
      }
    }

    return [...actions];
  }

  /**
   * Detect routes from content
   */
  detectRoutes(content: string): string[] {
    const routes: Set<string> = new Set();

    // Look for URL patterns
    const urlPattern = /\/[a-z-]+(?:\/[a-z-:]+)*/gi;
    const matches = content.match(urlPattern);
    
    if (matches) {
      matches.forEach(match => {
        // Filter out common non-route patterns
        if (!match.startsWith('/api') && 
            !match.includes('http') &&
            match.length > 1) {
          routes.add(match);
        }
      });
    }

    return [...routes];
  }

  /**
   * Detect entity models mentioned in content
   */
  detectModels(content: string): string[] {
    const models: Set<string> = new Set();
    
    // Look for PascalCase words that might be model names
    const modelPattern = /\b([A-Z][a-z]+(?:[A-Z][a-z]+)+)\b/g;
    const matches = content.match(modelPattern);
    
    if (matches) {
      // Filter to known model patterns
      const knownPrefixes = ['Bang', 'Chi', 'Nhan', 'Phong', 'Quy', 'Khoan', 'Hop', 'Don', 'Lich', 'Cham', 'Snapshot'];
      matches.forEach(match => {
        if (knownPrefixes.some(prefix => match.startsWith(prefix))) {
          models.add(match);
        }
      });
    }

    return [...models];
  }

  /**
   * Detect status values mentioned in content
   */
  detectStatuses(content: string): string[] {
    const statuses: Set<string> = new Set();

    for (const pattern of this.statusPatterns) {
      const matches = content.match(pattern);
      if (matches) {
        matches.forEach(match => {
          // Normalize to uppercase with underscores
          const normalized = match
            .toUpperCase()
            .replace(/\s+/g, '_')
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '');
          statuses.add(normalized);
        });
      }
    }

    return [...statuses];
  }

  /**
   * Tag a chunk with all metadata
   */
  tagChunk(chunk: Omit<Chunk, 'tags' | 'module' | 'persona' | 'routes' | 'actions' | 'entities'>): Chunk {
    const content = chunk.contentMd + ' ' + chunk.title + ' ' + chunk.sectionPath;

    return {
      ...chunk,
      tags: this.detectTags(content),
      module: this.detectModule(content),
      persona: this.detectPersona(content),
      routes: this.detectRoutes(content),
      actions: this.detectActions(content),
      entities: {
        models: this.detectModels(content),
        statuses: this.detectStatuses(content),
      },
    };
  }

  /**
   * Tag multiple chunks
   */
  tagChunks(chunks: Omit<Chunk, 'tags' | 'module' | 'persona' | 'routes' | 'actions' | 'entities'>[]): Chunk[] {
    return chunks.map(chunk => this.tagChunk(chunk));
  }
}

export const tagger = new Tagger();
