import { existsSync, mkdirSync, writeFileSync, readFileSync } from 'fs';
import { join, dirname, relative, basename, extname } from 'path';
import { glob } from 'glob';
import chalk from 'chalk';
import { config, configLoader } from './config.js';

/**
 * Ensure directory exists
 */
export function ensureDir(dirPath: string): void {
  if (!existsSync(dirPath)) {
    mkdirSync(dirPath, { recursive: true });
  }
}

/**
 * Write JSON file with pretty formatting
 */
export function writeJson(filePath: string, data: any): void {
  ensureDir(dirname(filePath));
  writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

/**
 * Write JSONL file (one JSON per line)
 */
export function writeJsonl(filePath: string, items: any[]): void {
  ensureDir(dirname(filePath));
  const lines = items.map(item => JSON.stringify(item)).join('\n');
  writeFileSync(filePath, lines, 'utf-8');
}

/**
 * Write Markdown file
 */
export function writeMarkdown(filePath: string, content: string): void {
  ensureDir(dirname(filePath));
  writeFileSync(filePath, content, 'utf-8');
}

/**
 * Read file safely
 */
export function readFileSafe(filePath: string): string | null {
  try {
    if (existsSync(filePath)) {
      return readFileSync(filePath, 'utf-8');
    }
  } catch (e) {
    console.error(chalk.red(`Error reading ${filePath}:`), e);
  }
  return null;
}

/**
 * Find files matching pattern
 */
export async function findFiles(pattern: string, cwd?: string): Promise<string[]> {
  return glob(pattern, {
    cwd: cwd || process.cwd(),
    absolute: true,
    nodir: true,
  });
}

/**
 * Detect version from filename or content
 */
export function detectVersion(filename: string, content?: string): string {
  const patterns = config.versionDetection.patterns;
  
  // Check filename first
  for (const pattern of patterns) {
    const regex = new RegExp(pattern, 'i');
    const match = filename.match(regex);
    if (match) {
      return match[1] || match[0];
    }
  }

  // Check content if provided
  if (content) {
    const versionLineMatch = content.match(/version[:\s]+([0-9.]+)/i);
    if (versionLineMatch) {
      return `v${versionLineMatch[1]}`;
    }
  }

  return 'v1';
}

/**
 * Compare versions (higher = newer)
 */
export function compareVersions(v1: string, v2: string): number {
  const num1 = parseInt(v1.replace(/\D/g, '')) || 0;
  const num2 = parseInt(v2.replace(/\D/g, '')) || 0;
  return num1 - num2;
}

/**
 * Format Vietnamese currency
 */
export function formatVND(amount: number | string): string {
  const num = typeof amount === 'string' ? parseFloat(amount.replace(/[^\d.-]/g, '')) : amount;
  return num.toLocaleString('vi-VN') + ' ₫';
}

/**
 * Normalize Vietnamese text (remove diacritics for matching)
 */
export function normalizeVietnamese(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase();
}

/**
 * Generate slug from text
 */
export function slugify(text: string): string {
  return normalizeVietnamese(text)
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

/**
 * Get relative path from output base
 */
export function getRelativePath(absolutePath: string): string {
  const outputBase = configLoader.resolvePath(config.output.base);
  return relative(outputBase, absolutePath);
}

/**
 * Logger utility
 */
export const logger = {
  info: (msg: string) => console.log(chalk.blue('ℹ'), msg),
  success: (msg: string) => console.log(chalk.green('✓'), msg),
  warn: (msg: string) => console.log(chalk.yellow('⚠'), msg),
  error: (msg: string) => console.log(chalk.red('✗'), msg),
  step: (step: string, msg: string) => console.log(chalk.cyan(`[${step}]`), msg),
};

/**
 * Progress tracker
 */
export class Progress {
  private current = 0;
  private total: number;
  private label: string;

  constructor(total: number, label: string) {
    this.total = total;
    this.label = label;
  }

  tick(item?: string): void {
    this.current++;
    const percent = Math.round((this.current / this.total) * 100);
    const bar = '█'.repeat(Math.floor(percent / 5)) + '░'.repeat(20 - Math.floor(percent / 5));
    process.stdout.write(`\r${chalk.cyan(this.label)} [${bar}] ${percent}% ${item ? `- ${item}` : ''}`);
    
    if (this.current === this.total) {
      console.log(); // New line at end
    }
  }
}

/**
 * Extract title from markdown content
 */
export function extractTitle(markdown: string): string {
  const titleMatch = markdown.match(/^#\s+(.+)$/m);
  return titleMatch ? titleMatch[1].trim() : 'Untitled';
}

/**
 * Check if file has newer version available
 */
export function hasNewerVersion(files: string[], currentFile: string): string | null {
  const currentVersion = detectVersion(currentFile);
  let newerFile: string | null = null;
  let newerVersion = currentVersion;

  for (const file of files) {
    if (file === currentFile) continue;
    
    // Check if same base name (different version)
    const currentBase = basename(currentFile, extname(currentFile)).replace(/[-_]?v\d+$/i, '');
    const otherBase = basename(file, extname(file)).replace(/[-_]?v\d+$/i, '');
    
    if (currentBase === otherBase) {
      const otherVersion = detectVersion(file);
      if (compareVersions(otherVersion, newerVersion) > 0) {
        newerVersion = otherVersion;
        newerFile = file;
      }
    }
  }

  return newerFile;
}
