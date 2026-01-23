#!/usr/bin/env npx tsx
/**
 * preview.ts
 * Preview chunks and KB structure
 */

import { join } from 'path';
import { existsSync, readFileSync } from 'fs';
import chalk from 'chalk';
import { config, configLoader } from '../lib/config.js';
import type { Chunk } from '../lib/chunker.js';

async function preview() {
  const chunksPath = join(configLoader.resolvePath(config.output.chunks), 'chunks.jsonl');
  
  if (!existsSync(chunksPath)) {
    console.log(chalk.red('No chunks found. Run `npm run kb:build` first.'));
    return;
  }

  const content = readFileSync(chunksPath, 'utf-8');
  const lines = content.split('\n').filter(l => l.trim());
  const chunks: Chunk[] = lines.map(l => JSON.parse(l));

  console.log(chalk.bold.blue('\n📚 Knowledge Base Preview\n'));
  console.log(chalk.gray('='.repeat(60)));
  
  // Stats
  console.log(chalk.cyan('\n📊 Statistics:'));
  console.log(`  Total chunks: ${chunks.length}`);
  console.log(`  Total tokens: ${chunks.reduce((sum, c) => sum + c.tokenCount, 0).toLocaleString()}`);
  
  // By module
  const byModule: Record<string, number> = {};
  for (const chunk of chunks) {
    byModule[chunk.module] = (byModule[chunk.module] || 0) + 1;
  }
  
  console.log(chalk.cyan('\n📦 By Module:'));
  for (const [mod, count] of Object.entries(byModule).sort((a, b) => b[1] - a[1])) {
    console.log(`  ${mod}: ${count} chunks`);
  }

  // Sample chunks
  console.log(chalk.cyan('\n📝 Sample Chunks:'));
  const samples = chunks.slice(0, 5);
  
  for (const chunk of samples) {
    console.log(chalk.gray('\n' + '-'.repeat(50)));
    console.log(chalk.yellow(`ID: ${chunk.id}`));
    console.log(chalk.white(`Title: ${chunk.title}`));
    console.log(chalk.gray(`Path: ${chunk.sectionPath}`));
    console.log(chalk.gray(`Module: ${chunk.module} | Tokens: ${chunk.tokenCount}`));
    console.log(chalk.gray(`Tags: ${chunk.tags.slice(0, 5).join(', ')}`));
    console.log(chalk.gray(`Preview: ${chunk.contentMd.substring(0, 150)}...`));
  }

  console.log(chalk.gray('\n' + '='.repeat(60)));
  console.log(chalk.green(`\n✓ Showing ${samples.length} of ${chunks.length} chunks\n`));
}

preview().catch(console.error);
