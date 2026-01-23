#!/usr/bin/env npx tsx
/**
 * 09-index.ts
 * Generate final index files for vector DB ingestion
 */

import { join } from 'path';
import { existsSync, readFileSync, readdirSync, statSync } from 'fs';
import { config, configLoader, modules, taxonomy } from '../lib/config.js';
import type { Chunk } from '../lib/chunker.js';
import { 
  writeJson, writeJsonl, writeMarkdown, logger, ensureDir 
} from '../lib/utils.js';

interface DocIndex {
  id: string;
  title: string;
  path: string;
  module: string;
  type: string;
  size: number;
  chunkCount: number;
}

async function main() {
  logger.step('INDEX', 'Generating index files...');
  
  const indexPath = configLoader.resolvePath(config.output.index);
  const docsPath = configLoader.resolvePath(config.output.docs);
  const chunksPath = configLoader.resolvePath(config.output.chunks);
  const reportsPath = configLoader.resolvePath(config.output.reports);
  
  ensureDir(indexPath);

  // Load chunks
  const chunksFile = join(chunksPath, 'chunks.jsonl');
  let chunks: Chunk[] = [];
  
  if (existsSync(chunksFile)) {
    const content = readFileSync(chunksFile, 'utf-8');
    chunks = content.split('\n').filter(l => l.trim()).map(l => JSON.parse(l));
  }

  logger.info(`Loaded ${chunks.length} chunks`);

  // Generate document index
  const docIndex = generateDocIndex(docsPath, chunks);
  writeJson(join(indexPath, 'kb_index.json'), {
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    project: 'HRM-Lite Payroll',
    stats: {
      totalDocs: docIndex.length,
      totalChunks: chunks.length,
      totalTokens: chunks.reduce((s, c) => s + c.tokenCount, 0),
    },
    documents: docIndex,
  });
  logger.success('Saved kb_index.json');

  // Copy chunks to index folder
  writeJsonl(join(indexPath, 'kb_index.jsonl'), chunks);
  logger.success('Saved kb_index.jsonl (chunks)');

  // Save tags taxonomy
  writeJson(join(indexPath, 'tags.json'), taxonomy);
  logger.success('Saved tags.json');

  // Generate sitemap
  const sitemap = generateSitemap(docsPath);
  writeMarkdown(join(indexPath, 'sitemap.md'), sitemap);
  logger.success('Saved sitemap.md');

  // Generate coverage report
  const coverage = generateCoverageReport(chunks, docIndex);
  writeMarkdown(join(reportsPath, 'coverage-report.md'), coverage);
  logger.success('Saved coverage-report.md');

  // Generate conflict report (placeholder)
  const conflicts = generateConflictReport(chunks);
  writeMarkdown(join(reportsPath, 'conflict-report.md'), conflicts);
  logger.success('Saved conflict-report.md');

  // Summary
  console.log('\n' + '='.repeat(50));
  logger.info(`Document index: ${docIndex.length} docs`);
  logger.info(`Chunks index: ${chunks.length} chunks`);
  logger.info(`Total tokens: ${chunks.reduce((s, c) => s + c.tokenCount, 0).toLocaleString()}`);
}

function generateDocIndex(docsPath: string, chunks: Chunk[]): DocIndex[] {
  const docs: DocIndex[] = [];
  
  function scanDir(dir: string, type: string) {
    if (!existsSync(dir)) return;
    
    const items = readdirSync(dir);
    for (const item of items) {
      const itemPath = join(dir, item);
      const stat = statSync(itemPath);
      
      if (stat.isDirectory()) {
        scanDir(itemPath, item);
      } else if (item.endsWith('.md')) {
        const content = readFileSync(itemPath, 'utf-8');
        const titleMatch = content.match(/^#\s+(.+)$/m);
        const title = titleMatch ? titleMatch[1] : item.replace('.md', '');
        
        // Count related chunks
        const docChunks = chunks.filter(c => c.sourceFile.includes(item.replace('.md', '')));
        
        // Detect module
        let module = 'GENERAL';
        for (const mod of modules.modules) {
          if (mod.keywords.some(k => title.toLowerCase().includes(k.toLowerCase()))) {
            module = mod.id;
            break;
          }
        }
        
        docs.push({
          id: `doc_${docs.length + 1}`,
          title,
          path: itemPath.replace(docsPath + '/', ''),
          module,
          type,
          size: stat.size,
          chunkCount: docChunks.length,
        });
      }
    }
  }
  
  scanDir(docsPath, 'root');
  return docs;
}

function generateSitemap(docsPath: string): string {
  let sitemap = `# Sitemap - Knowledge Base

> Generated: ${new Date().toISOString().split('T')[0]}

## Structure

\`\`\`
knowledge_base/
├── 00_index/
│   ├── kb_index.json
│   ├── kb_index.jsonl
│   ├── sitemap.md
│   └── tags.json
├── 01_docs_md/
`;

  function addDir(dir: string, prefix: string) {
    if (!existsSync(dir)) return;
    
    const items = readdirSync(dir).sort();
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const itemPath = join(dir, item);
      const stat = statSync(itemPath);
      const isLast = i === items.length - 1;
      const connector = isLast ? '└── ' : '├── ';
      const newPrefix = isLast ? prefix + '    ' : prefix + '│   ';
      
      sitemap += `${prefix}${connector}${item}${stat.isDirectory() ? '/' : ''}\n`;
      
      if (stat.isDirectory()) {
        addDir(itemPath, newPrefix);
      }
    }
  }
  
  addDir(docsPath, '│   ');
  
  sitemap += `├── 02_chunks/
│   ├── chunks.jsonl
│   └── chunks-preview.md
└── 03_reports/
    ├── coverage-report.md
    ├── conflict-report.md
    └── source-scan-report.md
\`\`\`

## Documents

`;

  function listDocs(dir: string, category: string) {
    if (!existsSync(dir)) return;
    
    const files = readdirSync(dir).filter(f => f.endsWith('.md'));
    if (files.length === 0) return;
    
    sitemap += `### ${category}\n\n`;
    for (const file of files) {
      const content = readFileSync(join(dir, file), 'utf-8');
      const titleMatch = content.match(/^#\s+(.+)$/m);
      const title = titleMatch ? titleMatch[1] : file;
      sitemap += `- [${title}](${category.toLowerCase()}/${file})\n`;
    }
    sitemap += '\n';
  }
  
  listDocs(join(docsPath, 'workflow'), 'Workflow');
  listDocs(join(docsPath, 'modules'), 'Modules');
  listDocs(join(docsPath, 'glossary'), 'Glossary');
  listDocs(join(docsPath, 'faq'), 'FAQ');
  listDocs(join(docsPath, 'setup'), 'Setup');

  return sitemap;
}

function generateCoverageReport(chunks: Chunk[], docs: DocIndex[]): string {
  // Count chunks per module
  const chunksByModule: Record<string, number> = {};
  for (const chunk of chunks) {
    chunksByModule[chunk.module] = (chunksByModule[chunk.module] || 0) + 1;
  }

  // Calculate coverage
  const moduleCount = modules.modules.length;
  const coveredModules = Object.keys(chunksByModule).filter(m => m !== 'GENERAL');
  const coveragePercent = Math.round((coveredModules.length / moduleCount) * 100);

  return `# Coverage Report

> Generated: ${new Date().toISOString().split('T')[0]}

## Summary

| Metric | Value |
|--------|-------|
| Total Modules | ${moduleCount} |
| Covered Modules | ${coveredModules.length} |
| Coverage | ${coveragePercent}% |
| Total Documents | ${docs.length} |
| Total Chunks | ${chunks.length} |

## Module Coverage

${modules.modules.map(m => {
  const count = chunksByModule[m.id] || 0;
  const icon = count > 0 ? '✅' : '❌';
  return `| ${icon} | ${m.name} | ${count} chunks |`;
}).join('\n')}

## Chunks by Module

${Object.entries(chunksByModule)
  .sort((a, b) => b[1] - a[1])
  .map(([mod, count]) => `- **${mod}**: ${count} chunks`)
  .join('\n')}

## Missing Documentation

${modules.modules
  .filter(m => !chunksByModule[m.id])
  .map(m => `- [ ] ${m.name} (${m.id})`)
  .join('\n') || '- None! All modules documented.'}

## Recommendations

${modules.modules
  .filter(m => (chunksByModule[m.id] || 0) < 5)
  .map(m => `- ⚠️ ${m.name}: Chỉ có ${chunksByModule[m.id] || 0} chunks, cân nhắc bổ sung documentation`)
  .join('\n') || '- All modules have sufficient documentation!'}

---
*Generated by KB Pipeline*
`;
}

function generateConflictReport(chunks: Chunk[]): string {
  const conflictedChunks = chunks.filter(c => c.conflict);
  
  return `# Conflict Report

> Generated: ${new Date().toISOString().split('T')[0]}

## Summary

| Metric | Value |
|--------|-------|
| Total Chunks | ${chunks.length} |
| Conflicted Chunks | ${conflictedChunks.length} |

## Conflicts Detected

${conflictedChunks.length === 0 
  ? '✅ No conflicts detected!'
  : conflictedChunks.map(c => `
### ${c.title}

- **ID:** ${c.id}
- **Source:** ${c.sourceFile}
- **Version:** ${c.sourceVersion}

**Resolution:** Manual review required
`).join('\n')}

## Version Analysis

${(() => {
  const versions: Record<string, number> = {};
  for (const chunk of chunks) {
    versions[chunk.sourceVersion] = (versions[chunk.sourceVersion] || 0) + 1;
  }
  return Object.entries(versions)
    .map(([v, count]) => `- ${v}: ${count} chunks`)
    .join('\n');
})()}

---
*Generated by KB Pipeline*
`;
}

main().catch(error => {
  logger.error(`Index generation failed: ${error}`);
  process.exit(1);
});
