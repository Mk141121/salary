/**
 * Build Knowledge Base from markdown docs
 * Converts docs/ folder to kb_index.jsonl
 */

import * as fs from 'fs';
import * as path from 'path';

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

const DOCS_DIR = path.join(__dirname, '../../docs');
const OUTPUT_FILE = path.join(__dirname, '../knowledge_base/kb_index.jsonl');

// Module mapping based on tags/keywords
const MODULE_MAP: Record<string, string> = {
  'payroll': 'PAYROLL',
  'bang-luong': 'PAYROLL',
  'tinh-luong': 'PAYROLL',
  'advance': 'ADVANCE',
  'ung-luong': 'ADVANCE',
  'tam-ung': 'ADVANCE',
  'employees': 'EMPLOYEES',
  'nhan-vien': 'EMPLOYEES',
  'attendance': 'ATTENDANCE',
  'cham-cong': 'ATTENDANCE',
  'leave': 'REQUESTS',
  'nghi-phep': 'REQUESTS',
  'rule-engine': 'RULE_ENGINE',
  'quy-che': 'RULE_ENGINE',
  'settings': 'SETTINGS',
  'cai-dat': 'SETTINGS',
  'san-luong': 'PRODUCTION',
  'giao-hang': 'PRODUCTION',
  'import': 'IMPORT',
};

function detectModule(content: string, tags: string[]): string {
  for (const tag of tags) {
    if (MODULE_MAP[tag.toLowerCase()]) {
      return MODULE_MAP[tag.toLowerCase()];
    }
  }
  
  for (const [keyword, module] of Object.entries(MODULE_MAP)) {
    if (content.toLowerCase().includes(keyword)) {
      return module;
    }
  }
  
  return 'GENERAL';
}

function extractTags(content: string): string[] {
  const tagMatch = content.match(/\*\*Tags:\*\*\s*`([^`]+)`(?:,\s*`([^`]+)`)*(?:,\s*`([^`]+)`)*/);
  if (tagMatch) {
    return tagMatch.slice(1).filter(Boolean);
  }
  return [];
}

function extractRoutes(content: string): string[] {
  const routes: string[] = [];
  const routeMatches = content.matchAll(/`(\/[a-z0-9\-\/]+)`/g);
  for (const match of routeMatches) {
    routes.push(match[1]);
  }
  return [...new Set(routes)];
}

function countTokens(text: string): number {
  // Simple approximation: ~4 chars per token
  return Math.ceil(text.length / 4);
}

function parseMarkdownToChunks(filePath: string): Chunk[] {
  const content = fs.readFileSync(filePath, 'utf-8');
  const fileName = path.basename(filePath, '.md');
  const chunks: Chunk[] = [];
  
  // Split by ## headers
  const sections = content.split(/(?=^## )/m);
  
  let chunkIndex = 0;
  for (const section of sections) {
    if (!section.trim()) continue;
    
    // Get title from first line
    const lines = section.trim().split('\n');
    let title = lines[0].replace(/^#+ /, '').trim();
    
    // Skip if just metadata
    if (title.startsWith('>') || title.startsWith('---')) {
      title = fileName;
    }
    
    const contentMd = section.trim();
    const tags = extractTags(contentMd);
    const routes = extractRoutes(contentMd);
    const module = detectModule(contentMd, tags);
    
    // Split large sections further by ### headers
    const subSections = contentMd.split(/(?=^### )/m);
    
    for (const subSection of subSections) {
      if (!subSection.trim() || countTokens(subSection) < 50) continue;
      
      const subLines = subSection.trim().split('\n');
      let subTitle = subLines[0].replace(/^#+ /, '').trim();
      if (subTitle.startsWith('>') || subTitle.length < 3) {
        subTitle = title;
      }
      
      const chunk: Chunk = {
        id: `${fileName}-${chunkIndex++}`,
        docId: fileName,
        sourceFile: filePath,
        title: subTitle,
        sectionPath: `${fileName} > ${title}`,
        contentMd: subSection.trim(),
        tokenCount: countTokens(subSection),
        tags,
        module,
        persona: ['HR', 'Admin', 'Employee'],
        routes,
        actions: [],
      };
      
      chunks.push(chunk);
    }
  }
  
  return chunks;
}

function buildKB() {
  console.log('Building Knowledge Base...');
  console.log(`Reading docs from: ${DOCS_DIR}`);
  
  // Ensure output directory exists
  const outputDir = path.dirname(OUTPUT_FILE);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  // Get all markdown files
  const mdFiles = fs.readdirSync(DOCS_DIR)
    .filter(f => f.endsWith('.md'))
    .map(f => path.join(DOCS_DIR, f));
  
  console.log(`Found ${mdFiles.length} markdown files`);
  
  const allChunks: Chunk[] = [];
  
  for (const file of mdFiles) {
    console.log(`Processing: ${path.basename(file)}`);
    const chunks = parseMarkdownToChunks(file);
    allChunks.push(...chunks);
    console.log(`  -> ${chunks.length} chunks`);
  }
  
  // Write to JSONL
  const jsonlContent = allChunks.map(c => JSON.stringify(c)).join('\n');
  fs.writeFileSync(OUTPUT_FILE, jsonlContent);
  
  // Stats
  const modules = [...new Set(allChunks.map(c => c.module))];
  const totalTokens = allChunks.reduce((sum, c) => sum + c.tokenCount, 0);
  
  console.log('\n=== KB Build Complete ===');
  console.log(`Total chunks: ${allChunks.length}`);
  console.log(`Total tokens: ${totalTokens}`);
  console.log(`Modules: ${modules.join(', ')}`);
  console.log(`Output: ${OUTPUT_FILE}`);
}

buildKB();
