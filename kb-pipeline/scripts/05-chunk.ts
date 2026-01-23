#!/usr/bin/env npx tsx
/**
 * 05-chunk.ts
 * Split documents into RAG-optimized chunks
 */

import { join, basename, relative } from 'path';
import { config, configLoader } from '../lib/config.js';
import { chunker, type Chunk } from '../lib/chunker.js';
import { 
  findFiles, writeJsonl, writeMarkdown, readFileSafe, 
  logger, ensureDir, Progress, detectVersion 
} from '../lib/utils.js';

async function main() {
  logger.step('CHUNK', 'Chunking documents...');
  
  const docsPath = configLoader.resolvePath(config.output.docs);
  const chunksPath = configLoader.resolvePath(config.output.chunks);
  const pipelineRoot = configLoader.resolvePath('.');
  
  ensureDir(chunksPath);

  // Find all markdown files to chunk
  const mdFiles = await findFiles('**/*.md', docsPath);
  
  if (mdFiles.length === 0) {
    logger.warn('No markdown files found to chunk');
    return;
  }

  logger.info(`Found ${mdFiles.length} markdown files to chunk`);

  const allChunks: Omit<Chunk, 'tags' | 'module' | 'persona' | 'routes' | 'actions' | 'entities'>[] = [];
  const progress = new Progress(mdFiles.length, 'Chunking');

  for (const mdFile of mdFiles) {
    const filename = basename(mdFile);
    const content = readFileSafe(mdFile);
    
    if (!content || content.trim().length < 100) {
      progress.tick(`${filename} (skipped - too short)`);
      continue;
    }

    const relativePath = relative(pipelineRoot, mdFile);
    const version = detectVersion(filename, content);
    
    const chunks = chunker.chunkDocument(content, relativePath, version);
    allChunks.push(...chunks);
    
    progress.tick(`${filename} (${chunks.length} chunks)`);
  }

  // Save chunks
  writeJsonl(join(chunksPath, 'chunks-raw.jsonl'), allChunks);
  logger.success(`Saved ${allChunks.length} raw chunks`);

  // Generate preview
  const preview = generateChunkPreview(allChunks);
  writeMarkdown(join(chunksPath, 'chunks-preview.md'), preview);
  logger.success('Generated chunks preview');

  // Statistics
  const totalTokens = allChunks.reduce((sum, c) => sum + c.tokenCount, 0);
  const avgTokens = Math.round(totalTokens / allChunks.length);
  const minTokens = Math.min(...allChunks.map(c => c.tokenCount));
  const maxTokens = Math.max(...allChunks.map(c => c.tokenCount));

  console.log('\n' + '='.repeat(50));
  logger.info(`Total chunks: ${allChunks.length}`);
  logger.info(`Total tokens: ${totalTokens.toLocaleString()}`);
  logger.info(`Avg tokens per chunk: ${avgTokens}`);
  logger.info(`Token range: ${minTokens} - ${maxTokens}`);
}

function generateChunkPreview(chunks: any[]): string {
  let preview = `# Chunks Preview

> Generated: ${new Date().toISOString()}
> Total chunks: ${chunks.length}

## Statistics

| Metric | Value |
|--------|-------|
| Total chunks | ${chunks.length} |
| Total tokens | ${chunks.reduce((s, c) => s + c.tokenCount, 0).toLocaleString()} |
| Avg tokens | ${Math.round(chunks.reduce((s, c) => s + c.tokenCount, 0) / chunks.length)} |

## Sample Chunks

`;

  // Show first 20 chunks as samples
  for (const chunk of chunks.slice(0, 20)) {
    preview += `### ${chunk.title}

- **ID:** \`${chunk.id}\`
- **Source:** \`${chunk.sourceFile}\`
- **Path:** ${chunk.sectionPath}
- **Tokens:** ${chunk.tokenCount}

\`\`\`
${chunk.contentMd.substring(0, 300)}${chunk.contentMd.length > 300 ? '...' : ''}
\`\`\`

---

`;
  }

  if (chunks.length > 20) {
    preview += `\n*Showing 20 of ${chunks.length} chunks*\n`;
  }

  return preview;
}

main().catch(error => {
  logger.error(`Chunking failed: ${error}`);
  process.exit(1);
});
