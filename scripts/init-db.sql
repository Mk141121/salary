-- ========================================
-- HRM-LITE v2 - Database Initialization
-- ========================================
-- This script runs on first database creation
-- ========================================

-- Enable extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- Set timezone
SET timezone = 'Asia/Ho_Chi_Minh';

-- Create indexes for better performance (Prisma will create tables)
-- These are additional indexes beyond what Prisma creates

-- Log initialization
DO $$
BEGIN
    RAISE NOTICE 'HRM-LITE v2 database initialized at %', NOW();
END $$;
