#!/usr/bin/env npx tsx
/**
 * 04-normalize.ts
 * Normalize and clean up markdown files
 */

import { join, basename } from 'path';
import { config, configLoader } from '../lib/config.js';
import { 
  findFiles, writeMarkdown, readFileSafe, logger, 
  ensureDir, Progress 
} from '../lib/utils.js';

interface NormalizeResult {
  file: string;
  changes: string[];
}

/**
 * Normalize markdown content
 */
function normalizeMarkdown(content: string): { normalized: string; changes: string[] } {
  const changes: string[] = [];
  let normalized = content;

  // 1. Normalize line endings
  if (normalized.includes('\r\n')) {
    normalized = normalized.replace(/\r\n/g, '\n');
    changes.push('Normalized line endings');
  }

  // 2. Remove trailing whitespace
  const linesWithTrailing = normalized.match(/[ \t]+$/gm);
  if (linesWithTrailing) {
    normalized = normalized.replace(/[ \t]+$/gm, '');
    changes.push(`Removed trailing whitespace (${linesWithTrailing.length} lines)`);
  }

  // 3. Normalize multiple blank lines
  if (/\n{3,}/.test(normalized)) {
    normalized = normalized.replace(/\n{3,}/g, '\n\n');
    changes.push('Normalized multiple blank lines');
  }

  // 4. Ensure headings have blank lines before
  normalized = normalized.replace(/([^\n])\n(#{1,6}\s)/g, '$1\n\n$2');

  // 5. Normalize list markers to dashes
  if (/^\s*\*/gm.test(normalized)) {
    normalized = normalized.replace(/^(\s*)\*\s/gm, '$1- ');
    changes.push('Normalized list markers to dashes');
  }

  // 6. Fix spacing around code blocks
  normalized = normalized.replace(/([^\n])\n```/g, '$1\n\n```');
  normalized = normalized.replace(/```\n([^\n])/g, '```\n\n$1');

  // 7. Normalize Vietnamese currency formatting
  const currencyMatches = normalized.match(/\d{1,3}(,\d{3})+đ/g);
  if (currencyMatches) {
    for (const match of currencyMatches) {
      const normalized_currency = match.replace(/,/g, '.').replace('đ', ' ₫');
      normalized = normalized.replace(match, normalized_currency);
    }
    changes.push('Normalized Vietnamese currency format');
  }

  // 8. Fix table formatting
  normalized = normalized.replace(/\|\s+\|/g, '| |');

  // 9. Ensure file ends with newline
  if (!normalized.endsWith('\n')) {
    normalized += '\n';
    changes.push('Added trailing newline');
  }

  // 10. Remove HTML comments
  if (/<!--[\s\S]*?-->/.test(normalized)) {
    normalized = normalized.replace(/<!--[\s\S]*?-->/g, '');
    changes.push('Removed HTML comments');
  }

  return { normalized, changes };
}

/**
 * Add frontmatter to markdown if missing
 */
function addFrontmatter(content: string, filename: string): string {
  if (content.startsWith('---\n')) {
    return content; // Already has frontmatter
  }

  // Extract title from first heading
  const titleMatch = content.match(/^#\s+(.+)$/m);
  const title = titleMatch ? titleMatch[1] : basename(filename, '.md');

  const frontmatter = `---
title: "${title}"
generated: true
date: ${new Date().toISOString().split('T')[0]}
---

`;

  return frontmatter + content;
}

async function main() {
  logger.step('NORMALIZE', 'Normalizing markdown files...');
  
  const docsPath = configLoader.resolvePath(config.output.docs);
  ensureDir(docsPath);

  // Find all generated markdown files
  const mdFiles = await findFiles('**/*.md', docsPath);
  
  if (mdFiles.length === 0) {
    logger.warn('No markdown files found to normalize');
    return;
  }

  logger.info(`Found ${mdFiles.length} markdown files`);

  const results: NormalizeResult[] = [];
  const progress = new Progress(mdFiles.length, 'Normalizing');

  for (const mdFile of mdFiles) {
    const filename = basename(mdFile);
    const content = readFileSafe(mdFile);
    
    if (!content) {
      progress.tick(`${filename} (skipped - empty)`);
      continue;
    }

    // Normalize content
    const { normalized, changes } = normalizeMarkdown(content);
    
    // Add frontmatter if needed (optional)
    // const withFrontmatter = addFrontmatter(normalized, filename);
    
    if (changes.length > 0) {
      writeMarkdown(mdFile, normalized);
      results.push({ file: filename, changes });
    }

    progress.tick(filename);
  }

  // Summary
  console.log('\n' + '='.repeat(50));
  logger.info(`Processed ${mdFiles.length} files`);
  logger.info(`Modified ${results.length} files`);

  if (results.length > 0) {
    console.log('\nChanges made:');
    for (const result of results.slice(0, 10)) {
      console.log(`  ${result.file}: ${result.changes.join(', ')}`);
    }
    if (results.length > 10) {
      console.log(`  ... and ${results.length - 10} more`);
    }
  }
}

main().catch(error => {
  logger.error(`Normalization failed: ${error}`);
  process.exit(1);
});
