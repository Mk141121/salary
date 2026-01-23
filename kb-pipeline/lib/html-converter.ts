import TurndownService from 'turndown';
import { gfm } from '@joplin/turndown-plugin-gfm';
import { config } from './config.js';

/**
 * HTML to Markdown converter with Vietnamese-specific rules
 */
export class HtmlConverter {
  private turndown: TurndownService;

  constructor() {
    this.turndown = new TurndownService({
      headingStyle: config.conversion.headingStyle as 'setext' | 'atx',
      codeBlockStyle: config.conversion.codeBlockStyle as 'indented' | 'fenced',
      bulletListMarker: config.conversion.bulletListMarker as '-' | '+' | '*',
      strongDelimiter: config.conversion.strongDelimiter as '**' | '__',
      emDelimiter: '_',
      linkStyle: 'inlined',
      linkReferenceStyle: 'full',
    });

    // Add GFM support (tables, strikethrough, etc.)
    this.turndown.use(gfm);

    // Custom rules
    this.addCustomRules();
  }

  private addCustomRules(): void {
    // Remove empty paragraphs
    this.turndown.addRule('removeEmptyParagraphs', {
      filter: (node) => {
        return (
          node.nodeName === 'P' &&
          node.textContent?.trim() === ''
        );
      },
      replacement: () => '',
    });

    // Clean up excessive whitespace
    this.turndown.addRule('cleanWhitespace', {
      filter: (node) => {
        return (
          node.nodeName === 'DIV' &&
          node.textContent?.trim() === ''
        );
      },
      replacement: () => '',
    });

    // Handle Vietnamese currency formatting
    this.turndown.addRule('vnCurrency', {
      filter: (node) => {
        const text = node.textContent || '';
        return /[\d.,]+\s*₫/.test(text) || /[\d.,]+\s*VND/.test(text);
      },
      replacement: (content) => {
        return this.formatVNCurrency(content);
      },
    });

    // Preserve code blocks
    this.turndown.addRule('preserveCode', {
      filter: ['pre', 'code'],
      replacement: (content, node) => {
        if (node.nodeName === 'PRE') {
          const lang = this.detectCodeLanguage(node);
          return `\n\`\`\`${lang}\n${content.trim()}\n\`\`\`\n`;
        }
        return `\`${content}\``;
      },
    });

    // Handle alerts/callouts
    this.turndown.addRule('alerts', {
      filter: (node) => {
        const classes = node.classList?.toString() || '';
        return /alert|warning|info|success|danger|note|tip/.test(classes);
      },
      replacement: (content, node) => {
        const type = this.detectAlertType(node);
        return `\n> **${type}:** ${content.trim()}\n`;
      },
    });
  }

  private formatVNCurrency(text: string): string {
    // Normalize Vietnamese currency format
    return text
      .replace(/VND/gi, '₫')
      .replace(/(\d)\.(\d{3})/g, '$1.$2') // Keep thousand separators
      .trim();
  }

  private detectCodeLanguage(node: Node): string {
    const element = node as HTMLElement;
    const classes = element.className || '';
    
    const langMatch = classes.match(/language-(\w+)|lang-(\w+)|(\w+)-code/);
    if (langMatch) {
      return langMatch[1] || langMatch[2] || langMatch[3];
    }

    // Try to detect from content
    const content = element.textContent || '';
    if (content.includes('SELECT') || content.includes('INSERT')) return 'sql';
    if (content.includes('function') || content.includes('const ')) return 'javascript';
    if (content.includes('import ') && content.includes('from ')) return 'typescript';
    if (content.includes('def ') || content.includes('import ')) return 'python';

    return '';
  }

  private detectAlertType(node: Node): string {
    const element = node as HTMLElement;
    const classes = element.className || '';
    
    if (/warning|caution/.test(classes)) return '⚠️ Lưu ý';
    if (/danger|error/.test(classes)) return '❌ Cảnh báo';
    if (/success/.test(classes)) return '✅ Thành công';
    if (/tip|hint/.test(classes)) return '💡 Mẹo';
    return 'ℹ️ Thông tin';
  }

  /**
   * Convert HTML string to Markdown
   */
  convert(html: string): string {
    // Pre-process HTML
    let cleaned = this.preProcess(html);
    
    // Convert to markdown
    let markdown = this.turndown.turndown(cleaned);
    
    // Post-process markdown
    markdown = this.postProcess(markdown);
    
    return markdown;
  }

  private preProcess(html: string): string {
    return html
      // Remove scripts and styles
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
      // Remove comments
      .replace(/<!--[\s\S]*?-->/g, '')
      // Remove inline styles
      .replace(/\s*style="[^"]*"/gi, '')
      // Normalize whitespace
      .replace(/\s+/g, ' ')
      // Clean up empty tags
      .replace(/<(\w+)>\s*<\/\1>/g, '');
  }

  private postProcess(markdown: string): string {
    return markdown
      // Fix multiple blank lines
      .replace(/\n{3,}/g, '\n\n')
      // Fix list formatting
      .replace(/^\s*[-*+]\s+/gm, '- ')
      // Trim each line
      .split('\n')
      .map(line => line.trimEnd())
      .join('\n')
      // Trim overall
      .trim();
  }
}

export const htmlConverter = new HtmlConverter();
