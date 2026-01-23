#!/usr/bin/env npx tsx
/**
 * 10-embed.ts
 * Generate embeddings for chunks and store in vector DB
 */

import { join } from 'path';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { config, configLoader } from '../lib/config.js';
import type { Chunk } from '../lib/chunker.js';
import { 
  writeJsonl, writeJson, logger, ensureDir, Progress 
} from '../lib/utils.js';

interface EmbeddedChunk extends Chunk {
  embedding: number[];
}

interface EmbeddingConfig {
  provider: 'openai' | 'ollama' | 'local';
  model: string;
  dimensions: number;
  batchSize: number;
}

const EMBEDDING_CONFIG: EmbeddingConfig = {
  provider: (process.env.EMBEDDING_PROVIDER as any) || 'openai',
  model: process.env.EMBEDDING_MODEL || 'text-embedding-3-small',
  dimensions: 1536,
  batchSize: parseInt(process.env.EMBEDDING_BATCH_SIZE || '50'),
};

/**
 * Generate embeddings using OpenAI API
 */
async function generateOpenAIEmbeddings(texts: string[]): Promise<number[][]> {
  const apiKey = process.env.OPENAI_API_KEY;
  
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY not set');
  }

  const response = await fetch('https://api.openai.com/v1/embeddings', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: EMBEDDING_CONFIG.model,
      input: texts,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`OpenAI API error: ${response.status} - ${error}`);
  }

  const data = await response.json();
  return data.data.map((item: any) => item.embedding);
}

/**
 * Generate embeddings using Ollama (local)
 */
async function generateOllamaEmbeddings(texts: string[]): Promise<number[][]> {
  const ollamaUrl = process.env.OLLAMA_URL || 'http://localhost:11434';
  const model = process.env.OLLAMA_MODEL || 'nomic-embed-text';
  
  const embeddings: number[][] = [];
  
  for (const text of texts) {
    const response = await fetch(`${ollamaUrl}/api/embeddings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ model, prompt: text }),
    });

    if (!response.ok) {
      throw new Error(`Ollama API error: ${response.status}`);
    }

    const data = await response.json();
    embeddings.push(data.embedding);
  }
  
  return embeddings;
}

/**
 * Generate simple TF-IDF like embeddings locally (fallback)
 */
function generateLocalEmbeddings(texts: string[]): number[][] {
  // Simple bag-of-words approach for demo/testing
  const allWords = new Set<string>();
  const tokenized = texts.map(text => {
    const words = text.toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter(w => w.length > 2);
    words.forEach(w => allWords.add(w));
    return words;
  });

  const wordIndex = new Map([...allWords].slice(0, 500).map((w, i) => [w, i]));
  const dimensions = Math.min(wordIndex.size, 500);

  return tokenized.map(words => {
    const vec = new Array(dimensions).fill(0);
    const wordCounts = new Map<string, number>();
    
    words.forEach(w => {
      wordCounts.set(w, (wordCounts.get(w) || 0) + 1);
    });
    
    wordCounts.forEach((count, word) => {
      const idx = wordIndex.get(word);
      if (idx !== undefined) {
        vec[idx] = count / words.length; // TF normalization
      }
    });
    
    // L2 normalize
    const norm = Math.sqrt(vec.reduce((s, v) => s + v * v, 0)) || 1;
    return vec.map(v => v / norm);
  });
}

/**
 * Generate embeddings based on configured provider
 */
async function generateEmbeddings(texts: string[]): Promise<number[][]> {
  switch (EMBEDDING_CONFIG.provider) {
    case 'openai':
      return generateOpenAIEmbeddings(texts);
    case 'ollama':
      return generateOllamaEmbeddings(texts);
    case 'local':
    default:
      return generateLocalEmbeddings(texts);
  }
}

/**
 * Process chunks in batches
 */
async function processInBatches(
  chunks: Chunk[], 
  batchSize: number
): Promise<EmbeddedChunk[]> {
  const results: EmbeddedChunk[] = [];
  const progress = new Progress(chunks.length, 'Embedding');

  for (let i = 0; i < chunks.length; i += batchSize) {
    const batch = chunks.slice(i, i + batchSize);
    const texts = batch.map(c => `${c.title}\n\n${c.contentMd}`);
    
    try {
      const embeddings = await generateEmbeddings(texts);
      
      for (let j = 0; j < batch.length; j++) {
        results.push({
          ...batch[j],
          embedding: embeddings[j],
        });
        progress.tick(batch[j].title);
      }
      
      // Rate limiting for API calls
      if (EMBEDDING_CONFIG.provider === 'openai') {
        await new Promise(r => setTimeout(r, 200));
      }
    } catch (error) {
      logger.error(`Batch ${i / batchSize + 1} failed: ${error}`);
      throw error;
    }
  }

  return results;
}

/**
 * Generate SQL for pgvector insertion
 */
function generatePgVectorSQL(chunks: EmbeddedChunk[]): string {
  let sql = `-- KB Embeddings for pgvector
-- Generated: ${new Date().toISOString()}
-- Chunks: ${chunks.length}

-- Create table if not exists
CREATE TABLE IF NOT EXISTS kb_embeddings (
  id TEXT PRIMARY KEY,
  doc_id TEXT NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  module TEXT,
  tags TEXT[],
  source_file TEXT,
  embedding vector(${chunks[0]?.embedding?.length || 1536})
);

-- Create index for similarity search
CREATE INDEX IF NOT EXISTS kb_embeddings_embedding_idx 
ON kb_embeddings USING ivfflat (embedding vector_cosine_ops);

-- Insert data
`;

  for (const chunk of chunks) {
    const embedding = `[${chunk.embedding.join(',')}]`;
    const tags = `{${chunk.tags.map(t => `"${t}"`).join(',')}}`;
    const content = chunk.contentMd.replace(/'/g, "''").substring(0, 10000);
    const title = chunk.title.replace(/'/g, "''");
    
    sql += `INSERT INTO kb_embeddings (id, doc_id, title, content, module, tags, source_file, embedding)
VALUES ('${chunk.id}', '${chunk.docId}', '${title}', '${content}', '${chunk.module}', '${tags}', '${chunk.sourceFile}', '${embedding}')
ON CONFLICT (id) DO UPDATE SET embedding = EXCLUDED.embedding, content = EXCLUDED.content;

`;
  }

  return sql;
}

async function main() {
  logger.step('EMBED', 'Generating embeddings...');
  
  const chunksPath = configLoader.resolvePath(config.output.chunks);
  const indexPath = configLoader.resolvePath(config.output.index);
  const chunksFile = join(chunksPath, 'chunks.jsonl');
  
  if (!existsSync(chunksFile)) {
    logger.error('Chunks file not found. Run kb:build first.');
    process.exit(1);
  }

  // Load chunks
  const content = readFileSync(chunksFile, 'utf-8');
  const chunks: Chunk[] = content.split('\n')
    .filter(l => l.trim())
    .map(l => JSON.parse(l));

  logger.info(`Loaded ${chunks.length} chunks`);
  logger.info(`Provider: ${EMBEDDING_CONFIG.provider}`);
  logger.info(`Model: ${EMBEDDING_CONFIG.model}`);
  logger.info(`Batch size: ${EMBEDDING_CONFIG.batchSize}`);

  // Check for API key if using OpenAI
  if (EMBEDDING_CONFIG.provider === 'openai' && !process.env.OPENAI_API_KEY) {
    logger.warn('OPENAI_API_KEY not set. Falling back to local embeddings.');
    EMBEDDING_CONFIG.provider = 'local';
  }

  // Generate embeddings
  const embeddedChunks = await processInBatches(chunks, EMBEDDING_CONFIG.batchSize);

  // Save embeddings JSONL
  writeJsonl(join(indexPath, 'embeddings.jsonl'), embeddedChunks);
  logger.success('Saved embeddings.jsonl');

  // Generate pgvector SQL
  const sql = generatePgVectorSQL(embeddedChunks);
  writeFileSync(join(indexPath, 'embeddings-pgvector.sql'), sql);
  logger.success('Saved embeddings-pgvector.sql');

  // Save metadata
  writeJson(join(indexPath, 'embeddings-meta.json'), {
    timestamp: new Date().toISOString(),
    provider: EMBEDDING_CONFIG.provider,
    model: EMBEDDING_CONFIG.model,
    dimensions: embeddedChunks[0]?.embedding?.length || 0,
    totalChunks: embeddedChunks.length,
  });
  logger.success('Saved embeddings-meta.json');

  // Summary
  console.log('\n' + '='.repeat(50));
  logger.info(`Embedded ${embeddedChunks.length} chunks`);
  logger.info(`Dimensions: ${embeddedChunks[0]?.embedding?.length || 0}`);
  logger.info(`Output: ${indexPath}`);
}

main().catch(error => {
  logger.error(`Embedding failed: ${error}`);
  process.exit(1);
});
