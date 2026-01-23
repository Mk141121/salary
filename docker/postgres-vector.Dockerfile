# PostgreSQL with pgvector extension
FROM postgres:15-alpine

# Install build dependencies
RUN apk add --no-cache \
    git \
    build-base \
    clang15 \
    llvm15-dev

# Clone and install pgvector
RUN cd /tmp \
    && git clone --branch v0.5.1 https://github.com/pgvector/pgvector.git \
    && cd pgvector \
    && make \
    && make install \
    && rm -rf /tmp/pgvector

# Cleanup build dependencies to reduce image size
RUN apk del git build-base clang15 llvm15-dev
