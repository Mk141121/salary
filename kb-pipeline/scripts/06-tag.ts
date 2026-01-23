#!/usr/bin/env npx tsx
/**
 * 06-tag.ts
 * Auto-tag chunks with metadata
 */

import { join } from 'path';
import { existsSync, readFileSync } from 'fs';
import { config, configLoader } from '../lib/config.js';
import { tagger } from '../lib/tagger.js';
import type { Chunk } from '../lib/chunker.js';
import { 
  writeJsonl, writeJson, logger, ensureDir, Progress 
} from '../lib/utils.js';

async function main() {
  logger.step('TAG', 'Auto-tagging chunks...');
  
  const chunksPath = configLoader.resolvePath(config.output.chunks);
  const rawChunksFile = join(chunksPath, 'chunks-raw.jsonl');
  
  if (!existsSync(rawChunksFile)) {
    logger.error('Raw chunks file not found. Run chunking first.');
    process.exit(1);
  }

  // Read raw chunks
  const content = readFileSync(rawChunksFile, 'utf-8');
  const lines = content.split('\n').filter(l => l.trim());
  const rawChunks = lines.map(l => JSON.parse(l));

  logger.info(`Found ${rawChunks.length} chunks to tag`);

  const progress = new Progress(rawChunks.length, 'Tagging');
  const taggedChunks: Chunk[] = [];
  const tagStats: Record<string, number> = {};
  const moduleStats: Record<string, number> = {};

  for (const chunk of rawChunks) {
    const tagged = tagger.tagChunk(chunk);
    taggedChunks.push(tagged);

    // Collect stats
    for (const tag of tagged.tags) {
      tagStats[tag] = (tagStats[tag] || 0) + 1;
    }
    moduleStats[tagged.module] = (moduleStats[tagged.module] || 0) + 1;

    progress.tick(chunk.title);
  }

  // Save tagged chunks
  writeJsonl(join(chunksPath, 'chunks.jsonl'), taggedChunks);
  logger.success('Saved tagged chunks');

  // Save tag statistics
  const stats = {
    timestamp: new Date().toISOString(),
    totalChunks: taggedChunks.length,
    tagDistribution: Object.entries(tagStats)
      .sort((a, b) => b[1] - a[1])
      .reduce((obj, [k, v]) => ({ ...obj, [k]: v }), {}),
    moduleDistribution: Object.entries(moduleStats)
      .sort((a, b) => b[1] - a[1])
      .reduce((obj, [k, v]) => ({ ...obj, [k]: v }), {}),
  };
  
  writeJson(join(chunksPath, 'tag-stats.json'), stats);
  logger.success('Saved tag statistics');

  // Summary
  console.log('\n' + '='.repeat(50));
  logger.info(`Tagged ${taggedChunks.length} chunks`);
  logger.info(`Unique tags: ${Object.keys(tagStats).length}`);
  
  console.log('\nTop 10 tags:');
  Object.entries(tagStats)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .forEach(([tag, count]) => {
      console.log(`  ${tag}: ${count}`);
    });

  console.log('\nBy module:');
  Object.entries(moduleStats)
    .sort((a, b) => b[1] - a[1])
    .forEach(([mod, count]) => {
      console.log(`  ${mod}: ${count}`);
    });
}

main().catch(error => {
  logger.error(`Tagging failed: ${error}`);
  process.exit(1);
});
