# KB Pipeline - Knowledge Base Generator

Pipeline tự động tạo Knowledge Base chuẩn RAG cho Chatbot hướng dẫn sử dụng hệ thống HRM-Lite Payroll.

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Copy env file
cp .env.example .env

# 3. Build knowledge base
npm run kb:build

# 4. Preview results
npm run kb:preview
```

## Commands

| Command | Description |
|---------|-------------|
| `npm run kb:build` | Build toàn bộ knowledge base |
| `npm run kb:scan` | Scan source files |
| `npm run kb:generate` | Generate docs từ source code |
| `npm run kb:chunk` | Chunk documents |
| `npm run kb:tag` | Auto-tag chunks |
| `npm run kb:glossary` | Generate glossary |
| `npm run kb:faq` | Generate FAQ |
| `npm run kb:index` | Create index files |
| `npm run kb:preview` | Preview chunks |

## Pipeline Steps

1. **Scan Sources** - Quét tất cả file nguồn (docs, PRD, source code)
2. **Generate Docs** - Sinh tài liệu từ source code cho các module thiếu
3. **Convert HTML** - Chuyển HTML sang Markdown (nếu có)
4. **Normalize** - Chuẩn hóa format markdown
5. **Chunk** - Chia nhỏ thành chunks tối ưu RAG
6. **Tag** - Tự động gắn tags/metadata
7. **Glossary** - Sinh từ điển thuật ngữ
8. **FAQ** - Sinh câu hỏi thường gặp
9. **Index** - Tạo index cho vector DB

## Output Structure

```
knowledge_base/
├── 00_index/           # Index files
│   ├── kb_index.json
│   ├── chunks.jsonl
│   ├── sitemap.md
│   └── tags.json
├── 01_docs_md/         # Markdown docs
│   ├── workflow/
│   ├── modules/
│   ├── glossary/
│   └── faq/
├── 02_chunks/          # RAG chunks
│   ├── chunks.jsonl
│   └── chunks_preview.md
└── 03_reports/         # Reports
    ├── conversion_report.md
    ├── coverage_report.md
    └── conflict_report.md
```

## Configuration

Edit `config/config.json` for:
- Source paths
- Output paths
- Chunking settings
- Conversion options

Edit `config/modules.json` for:
- Module definitions
- Keywords
- Routes mapping

Edit `config/tags-taxonomy.json` for:
- Tag categories
- Keyword-to-tag mapping

## Chunk Schema

```json
{
  "id": "kb_abc123",
  "docId": "doc_xyz789",
  "sourceFile": "docs/payroll.md",
  "sourceVersion": "v1",
  "title": "Snapshot kỳ lương",
  "sectionPath": "Workflow > Kỳ lương > Snapshot",
  "contentMd": "...",
  "tokenCount": 450,
  "tags": ["payroll", "snapshot"],
  "module": "PAYROLL",
  "persona": ["hr", "ke_toan"],
  "routes": ["/bang-luong"],
  "actions": ["create", "lock"],
  "entities": {
    "models": ["SnapshotBangLuong"],
    "statuses": ["NHAP", "DA_CHOT"]
  },
  "updatedAt": "2026-01-23",
  "conflict": false
}
```

## Development

```bash
# Run individual step
npx tsx scripts/01-scan-sources.ts

# Watch mode (requires nodemon)
npm run kb:watch
```

## License

Internal use only - HRM-Lite Project
