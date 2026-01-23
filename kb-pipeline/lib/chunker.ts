import { encodingForModel } from 'js-tiktoken';
import { config } from './config.js';
import { createHash } from 'crypto';

export interface Chunk {
  id: string;
  docId: string;
  sourceFile: string;
  sourceVersion: string;
  title: string;
  sectionPath: string;
  contentMd: string;
  tokenCount: number;
  tags: string[];
  module: string;
  persona: string[];
  routes: string[];
  actions: string[];
  entities: {
    models: string[];
    statuses: string[];
  };
  updatedAt: string;
  conflict: boolean;
}

interface Section {
  level: number;
  title: string;
  content: string;
  path: string[];
}

export class Chunker {
  private encoder;
  private config = config.chunking;

  constructor() {
    this.encoder = encodingForModel('gpt-4');
  }

  /**
   * Count tokens in text
   */
  countTokens(text: string): number {
    return this.encoder.encode(text).length;
  }

  /**
   * Generate unique ID for chunk
   */
  generateId(content: string, sourceFile: string): string {
    const hash = createHash('md5')
      .update(content + sourceFile)
      .digest('hex')
      .substring(0, 12);
    return `kb_${hash}`;
  }

  /**
   * Generate doc ID from source file
   */
  generateDocId(sourceFile: string): string {
    const hash = createHash('md5')
      .update(sourceFile)
      .digest('hex')
      .substring(0, 8);
    return `doc_${hash}`;
  }

  /**
   * Split markdown into sections by headings
   */
  splitByHeadings(markdown: string): Section[] {
    const lines = markdown.split('\n');
    const sections: Section[] = [];
    
    let currentSection: Section = {
      level: 0,
      title: 'Introduction',
      content: '',
      path: [],
    };
    
    const pathStack: string[] = [];

    for (const line of lines) {
      const headingMatch = line.match(/^(#{1,6})\s+(.+)$/);
      
      if (headingMatch) {
        // Save previous section if it has content
        if (currentSection.content.trim()) {
          sections.push({ ...currentSection });
        }

        const level = headingMatch[1].length;
        const title = headingMatch[2].trim();

        // Update path stack
        while (pathStack.length >= level) {
          pathStack.pop();
        }
        pathStack.push(title);

        currentSection = {
          level,
          title,
          content: line + '\n',
          path: [...pathStack],
        };
      } else {
        currentSection.content += line + '\n';
      }
    }

    // Don't forget the last section
    if (currentSection.content.trim()) {
      sections.push(currentSection);
    }

    return sections;
  }

  /**
   * Split a section into smaller chunks if too large
   */
  splitSection(section: Section): string[] {
    const tokens = this.countTokens(section.content);
    
    if (tokens <= this.config.maxTokens) {
      return [section.content];
    }

    // Need to split by paragraphs
    const paragraphs = section.content.split(/\n\n+/);
    const chunks: string[] = [];
    let currentChunk = '';
    let currentTokens = 0;

    for (const para of paragraphs) {
      const paraTokens = this.countTokens(para);

      // Check if this paragraph alone is too large
      if (paraTokens > this.config.maxTokens) {
        // Save current chunk
        if (currentChunk.trim()) {
          chunks.push(currentChunk.trim());
        }
        // Split paragraph by sentences
        const sentenceChunks = this.splitBySentences(para);
        chunks.push(...sentenceChunks);
        currentChunk = '';
        currentTokens = 0;
        continue;
      }

      // Check if adding this paragraph exceeds max
      if (currentTokens + paraTokens > this.config.maxTokens) {
        // Save current chunk and start new one
        if (currentChunk.trim()) {
          chunks.push(currentChunk.trim());
        }
        currentChunk = para + '\n\n';
        currentTokens = paraTokens;
      } else {
        currentChunk += para + '\n\n';
        currentTokens += paraTokens;
      }
    }

    // Don't forget the last chunk
    if (currentChunk.trim()) {
      chunks.push(currentChunk.trim());
    }

    return chunks;
  }

  /**
   * Split text by sentences when paragraphs are too large
   */
  private splitBySentences(text: string): string[] {
    // Vietnamese sentence endings
    const sentences = text.split(/(?<=[.!?。])\s+/);
    const chunks: string[] = [];
    let currentChunk = '';
    let currentTokens = 0;

    for (const sentence of sentences) {
      const sentenceTokens = this.countTokens(sentence);

      if (currentTokens + sentenceTokens > this.config.maxTokens) {
        if (currentChunk.trim()) {
          chunks.push(currentChunk.trim());
        }
        currentChunk = sentence + ' ';
        currentTokens = sentenceTokens;
      } else {
        currentChunk += sentence + ' ';
        currentTokens += sentenceTokens;
      }
    }

    if (currentChunk.trim()) {
      chunks.push(currentChunk.trim());
    }

    return chunks;
  }

  /**
   * Check if block should be preserved (tables, code)
   */
  isPreservedBlock(content: string): boolean {
    const preservePatterns = [
      /^\|.+\|$/m,           // Table
      /^```[\s\S]+?```$/m,   // Code block
      /^>\s+/m,              // Blockquote
    ];

    return preservePatterns.some(p => p.test(content));
  }

  /**
   * Apply overlap between chunks
   */
  applyOverlap(chunks: string[]): string[] {
    if (chunks.length <= 1) return chunks;

    const result: string[] = [];
    
    for (let i = 0; i < chunks.length; i++) {
      let chunk = chunks[i];

      // Add overlap from previous chunk
      if (i > 0) {
        const prevLines = chunks[i - 1].split('\n');
        const overlapLines = prevLines.slice(-3).join('\n'); // Last 3 lines
        const overlapTokens = this.countTokens(overlapLines);
        
        if (overlapTokens <= this.config.overlapTokens) {
          chunk = '...\n' + overlapLines + '\n\n' + chunk;
        }
      }

      result.push(chunk);
    }

    return result;
  }

  /**
   * Main chunking function
   */
  chunkDocument(
    markdown: string,
    sourceFile: string,
    sourceVersion: string = 'v1'
  ): Omit<Chunk, 'tags' | 'module' | 'persona' | 'routes' | 'actions' | 'entities'>[] {
    const docId = this.generateDocId(sourceFile);
    const sections = this.splitByHeadings(markdown);
    const chunks: Omit<Chunk, 'tags' | 'module' | 'persona' | 'routes' | 'actions' | 'entities'>[] = [];

    for (const section of sections) {
      const sectionChunks = this.splitSection(section);
      const overlappedChunks = this.applyOverlap(sectionChunks);

      for (let i = 0; i < overlappedChunks.length; i++) {
        const content = overlappedChunks[i];
        const tokenCount = this.countTokens(content);

        // Skip chunks that are too small
        if (tokenCount < this.config.minTokens && sectionChunks.length > 1) {
          continue;
        }

        const title = sectionChunks.length > 1 
          ? `${section.title} (${i + 1}/${sectionChunks.length})`
          : section.title;

        chunks.push({
          id: this.generateId(content, sourceFile),
          docId,
          sourceFile,
          sourceVersion,
          title,
          sectionPath: section.path.join(' > '),
          contentMd: content,
          tokenCount,
          updatedAt: new Date().toISOString().split('T')[0],
          conflict: false,
        });
      }
    }

    return chunks;
  }
}

export const chunker = new Chunker();
