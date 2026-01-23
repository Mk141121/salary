-- KB Embeddings Table for Vector Search
-- Run this after enabling pgvector extension

-- Enable pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- Create embeddings table
CREATE TABLE IF NOT EXISTS kb_embeddings (
  id SERIAL PRIMARY KEY,
  chunk_id VARCHAR(255) UNIQUE NOT NULL,
  doc_id VARCHAR(255) NOT NULL,
  title VARCHAR(500),
  module VARCHAR(100),
  content TEXT,
  embedding vector(1536), -- OpenAI text-embedding-3-small dimension
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index for vector similarity search
CREATE INDEX IF NOT EXISTS kb_embeddings_embedding_idx 
ON kb_embeddings 
USING ivfflat (embedding vector_cosine_ops)
WITH (lists = 100);

-- Create index for module filtering
CREATE INDEX IF NOT EXISTS kb_embeddings_module_idx 
ON kb_embeddings (module);

-- Create index for chunk_id lookup
CREATE INDEX IF NOT EXISTS kb_embeddings_chunk_id_idx 
ON kb_embeddings (chunk_id);

-- Create function for similarity search
CREATE OR REPLACE FUNCTION search_kb_embeddings(
  query_embedding vector(1536),
  match_threshold FLOAT DEFAULT 0.7,
  match_count INT DEFAULT 5,
  filter_module VARCHAR DEFAULT NULL
)
RETURNS TABLE (
  id INT,
  chunk_id VARCHAR,
  title VARCHAR,
  module VARCHAR,
  content TEXT,
  similarity FLOAT,
  metadata JSONB
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    e.id,
    e.chunk_id,
    e.title,
    e.module,
    e.content,
    1 - (e.embedding <=> query_embedding) AS similarity,
    e.metadata
  FROM kb_embeddings e
  WHERE 
    (filter_module IS NULL OR e.module = filter_module)
    AND 1 - (e.embedding <=> query_embedding) > match_threshold
  ORDER BY e.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;

-- Create chat history table
CREATE TABLE IF NOT EXISTS chat_history (
  id SERIAL PRIMARY KEY,
  session_id UUID NOT NULL,
  user_id INT,
  role VARCHAR(20) NOT NULL, -- 'user' | 'assistant'
  content TEXT NOT NULL,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index for session lookup
CREATE INDEX IF NOT EXISTS chat_history_session_idx 
ON chat_history (session_id, created_at);

-- Create index for user lookup
CREATE INDEX IF NOT EXISTS chat_history_user_idx 
ON chat_history (user_id, created_at);

-- Create chat analytics table
CREATE TABLE IF NOT EXISTS chat_analytics (
  id SERIAL PRIMARY KEY,
  query TEXT NOT NULL,
  query_type VARCHAR(50), -- 'how-to', 'definition', 'general', etc.
  response_quality FLOAT, -- 0-1 score
  sources_count INT DEFAULT 0,
  response_time_ms INT,
  user_id INT,
  session_id UUID,
  feedback VARCHAR(20), -- 'helpful' | 'not_helpful' | NULL
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index for analytics
CREATE INDEX IF NOT EXISTS chat_analytics_date_idx 
ON chat_analytics (created_at);

CREATE INDEX IF NOT EXISTS chat_analytics_type_idx 
ON chat_analytics (query_type);

COMMENT ON TABLE kb_embeddings IS 'Knowledge Base embeddings for vector similarity search';
COMMENT ON TABLE chat_history IS 'Chat conversation history for context';
COMMENT ON TABLE chat_analytics IS 'Analytics and feedback for chatbot improvement';
