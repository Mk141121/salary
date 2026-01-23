# Kế Hoạch Triển Khai Knowledge Base RAG Pipeline

> **Ngày lập:** 23/01/2026  
> **Dự án:** HRM-Lite / Payroll System  
> **Mục tiêu:** Xây dựng Knowledge Base chuẩn RAG cho Chatbot hướng dẫn sử dụng

---

## 📊 Phân Tích Hiện Trạng

### 1. Tài liệu nguồn hiện có

| Loại | Số lượng | Vị trí | Ghi chú |
|------|----------|--------|---------|
| **Markdown docs** | 11 files | `/docs/` | Hướng dẫn quy chế, migration, setup |
| **PRD Phase 2** | 6 files | `/Phase 2/` | Xếp ca, Request, ESS, Anti-fraud |
| **Test Reports** | 8 files | `/` (root) | Sprint reports dạng MD |
| **HTML Reports** | 8 files | `/` (root) | Test reports (không phải user docs) |
| **Frontend Pages** | 50+ files | `/frontend/src/pages/` | Source code UI |
| **Backend Modules** | nhiều | `/backend/src/` | Source code API |

### 2. Gap Analysis - Thiếu tài liệu

| Module | Tình trạng | Cần tạo |
|--------|------------|---------|
| Payroll Core | ✅ Có (HUONG_DAN_QUY_CHE_LUONG.md) | Bổ sung workflow chi tiết |
| Rule Engine | ⚠️ Một phần | Cần doc riêng cho Rule Trace, AI Gợi ý |
| Import/Export | ⚠️ Rải rác | Cần gộp thành guide hoàn chỉnh |
| Chấm công | ❌ Thiếu | Cần tạo mới |
| KPI | ❌ Thiếu | Cần tạo mới |
| BHXH/Thuế | ❌ Thiếu | Cần tạo mới |
| RBAC/Audit | ⚠️ Có report | Cần chuyển thành user guide |
| Snapshot/Chốt/Khoá | ⚠️ Rải rác | Cần gộp + flow diagram |

### 3. Không có file HTML hướng dẫn người dùng
- Các file `.html` hiện tại đều là **test reports** (automated test results)
- **KHÔNG CÓ** tài liệu HTML hướng dẫn sử dụng như prompt yêu cầu
- Cần **tạo mới** tài liệu hoặc **sinh từ source code + PRD**

---

## 🎯 Chiến Lược Triển Khai

### Phương án đề xuất: **Generate-First + Pipeline**

Do thiếu tài liệu HTML nguồn, sẽ triển khai theo 2 pha:

1. **Pha 1:** Sinh tài liệu từ source code + PRD + existing docs
2. **Pha 2:** Build pipeline convert/chunk/index

---

## 📅 Kế Hoạch Chi Tiết

### Sprint 1: Setup Infrastructure (1 ngày)

#### Task 1.1: Tạo cấu trúc thư mục
```
kb-pipeline/
├── package.json
├── tsconfig.json
├── .env.example
├── config/
│   ├── config.json          # Source paths, output paths
│   ├── modules.json          # Module taxonomy
│   ├── tags-taxonomy.json    # Tags chuẩn
│   └── routes-mapping.json   # Frontend routes → modules
├── scripts/
│   ├── 01-scan-sources.ts    # Scan tài liệu nguồn
│   ├── 02-generate-docs.ts   # Sinh docs từ source
│   ├── 03-convert-html.ts    # HTML → MD
│   ├── 04-normalize.ts       # Chuẩn hóa format
│   ├── 05-chunk.ts           # Chia chunks
│   ├── 06-tag.ts             # Auto tagging
│   ├── 07-glossary.ts        # Sinh glossary
│   ├── 08-faq.ts             # Sinh FAQ
│   ├── 09-index.ts           # Tạo index
│   └── 10-embed.ts           # Generate embeddings (optional)
├── lib/
│   ├── html-converter.ts
│   ├── chunker.ts
│   ├── tagger.ts
│   └── utils.ts
└── templates/
    ├── doc-template.md
    ├── glossary-entry.md
    └── faq-entry.md
```

#### Task 1.2: Cài đặt dependencies
```json
{
  "dependencies": {
    "turndown": "^7.1.2",
    "turndown-plugin-gfm": "^1.0.2",
    "glob": "^10.3.0",
    "gray-matter": "^4.0.3",
    "marked": "^11.0.0",
    "tiktoken": "^1.0.0",
    "dotenv": "^16.0.0"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "@types/node": "^20.0.0",
    "@types/turndown": "^5.0.0"
  }
}
```

---

### Sprint 2: Sinh Tài Liệu Nguồn (2-3 ngày)

#### Task 2.1: Scan & Analyze Source Code
Tạo script phân tích:
- Frontend routes → Modules
- API endpoints → Features
- Prisma models → Entities
- Existing docs → Topics

#### Task 2.2: Generate Module Documentation
Sinh tài liệu cho từng module:

| Module | Source | Output |
|--------|--------|--------|
| **Payroll** | ChiTietBangLuong.tsx, QuanLyQuyChe.tsx, XemRuleTrace.tsx | `modules/payroll.md` |
| **Employees** | QuanLyNhanVien.tsx, ChiTietNhanVien.tsx | `modules/employees.md` |
| **Attendance** | QuanLyChamCong.tsx, BangCongThang.tsx | `modules/attendance.md` |
| **Import/Export** | ImportExcel.tsx, ImportChiaHang.tsx, ImportGiaoHang.tsx | `modules/import-export.md` |
| **KPI** | QuanLyKPI.tsx, KyDanhGiaKPI.tsx, CauHinhThuongKPI.tsx | `modules/kpi.md` |
| **Requests** | DonNghiCuaToi.tsx, DuyetNghiPhep.tsx, DuyetYeuCau.tsx | `modules/requests.md` |
| **Settings** | CaiDatHeThong.tsx, QuanLyNguoiDung.tsx | `modules/settings.md` |
| **Reports** | /pages/reports/ | `modules/reports.md` |

#### Task 2.3: Generate Workflow Documentation
Sinh tài liệu theo quy trình:

1. **Setup ban đầu** (`workflow/01-setup.md`)
   - Cấu hình phòng ban, chức vụ
   - Import nhân viên
   - Thiết lập khoản lương

2. **Quy trình tháng** (`workflow/02-monthly.md`)
   - Import dữ liệu sản lượng
   - Chấm công
   - Tính lương

3. **Snapshot & Chốt** (`workflow/03-snapshot.md`)
   - Tạo snapshot
   - Chốt kỳ lương
   - Khóa kỳ lương

4. **Điều chỉnh** (`workflow/04-adjustment.md`)
   - Adjustment voucher
   - Rule override

5. **Phê duyệt & Export** (`workflow/05-approval-export.md`)
   - Duyệt bảng lương
   - Export ngân hàng
   - Payslip

---

### Sprint 3: Build Pipeline Core (2 ngày)

#### Task 3.1: HTML → Markdown Converter
```typescript
// lib/html-converter.ts
import TurndownService from 'turndown';
import { gfm } from 'turndown-plugin-gfm';

const turndown = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
});
turndown.use(gfm);

// Custom rules for HRM-specific elements
turndown.addRule('vndCurrency', {
  filter: (node) => node.classList?.contains('currency'),
  replacement: (content) => formatVND(content)
});
```

#### Task 3.2: Chunking Engine
```typescript
// lib/chunker.ts
interface ChunkConfig {
  minTokens: 350;
  maxTokens: 900;
  overlapTokens: 100;
  splitBy: ['h1', 'h2', 'h3', 'paragraph'];
  preserveBlocks: ['table', 'code', 'list'];
}

function chunkDocument(markdown: string, config: ChunkConfig): Chunk[] {
  // 1. Parse sections by headings
  // 2. Split large sections by paragraphs
  // 3. Apply overlap
  // 4. Preserve table/code integrity
}
```

#### Task 3.3: Auto Tagger
```typescript
// lib/tagger.ts
const TAG_RULES = {
  modules: {
    'payroll': ['bảng lương', 'tính lương', 'kỳ lương', 'snapshot'],
    'attendance': ['chấm công', 'ngày công', 'vắng mặt'],
    'kpi': ['KPI', 'đánh giá', 'thưởng KPI'],
    // ...
  },
  personas: {
    'admin': ['cấu hình', 'quản trị', 'phân quyền'],
    'hr': ['nhân sự', 'nhân viên', 'phòng ban'],
    'ke_toan': ['kế toán', 'ngân hàng', 'BHXH', 'thuế'],
  },
  routes: {
    '/bang-luong': 'payroll',
    '/nhan-vien': 'employees',
    // ...
  }
};
```

---

### Sprint 4: Glossary & FAQ Generation (1 ngày)

#### Task 4.1: Glossary Extraction
Thuật ngữ bắt buộc (từ prompt + hệ thống):

| Term | Category |
|------|----------|
| Snapshot | Payroll |
| Chốt kỳ / Khoá kỳ | Payroll |
| Rule Engine / Rule Trace | Payroll |
| Adjustment Voucher | Payroll |
| Ngày công / Công chuẩn | Attendance |
| KPI Mapping | KPI |
| Ứng lương | Payroll |
| Phụ cấp theo nhân viên | Payroll |
| Sản lượng / Chia hàng / Giao hàng | Import |
| BHXH / BHYT / BHTN | Tax |
| Thuế TNCN | Tax |
| RBAC / Vai trò | System |

#### Task 4.2: FAQ Generation
Nhóm FAQ theo workflow:

1. **Setup**
   - Làm sao tạo phòng ban mới?
   - Import nhân viên từ Excel như thế nào?
   
2. **Tính lương**
   - Tạo bảng lương tháng như thế nào?
   - Công thức tính sản lượng hoạt động ra sao?
   
3. **Snapshot/Chốt**
   - Snapshot là gì? Khi nào cần tạo?
   - Chốt và Khoá khác nhau thế nào?
   
4. **Lỗi thường gặp**
   - Lương tính sai, kiểm tra ở đâu?
   - Import lỗi "Mã NV không tồn tại"?

---

### Sprint 5: Index & Integration (1 ngày)

#### Task 5.1: Generate Index Files
```
knowledge_base/00_index/
├── kb_index.json       # Document index
├── kb_index.jsonl      # Chunks for ingest
├── sitemap.md          # Human-readable map
└── tags.json           # Tag taxonomy
```

#### Task 5.2: Embedding Script (Optional)
```typescript
// scripts/10-embed.ts
// Requires OPENAI_API_KEY or compatible provider
async function generateEmbeddings(chunks: Chunk[]) {
  // Batch process chunks
  // Save to embeddings.jsonl or pgvector
}
```

#### Task 5.3: Quality Reports
```
knowledge_base/03_reports/
├── conversion_report.md   # Files processed
├── coverage_report.md     # Module coverage
└── conflict_report.md     # Version conflicts
```

---

### Sprint 6: CLI & Documentation (0.5 ngày)

#### Task 6.1: CLI Commands
```bash
# Build full knowledge base
npm run kb:build

# Build specific module
npm run kb:build -- --module payroll

# Watch mode (dev)
npm run kb:watch

# Preview chunks
npm run kb:preview

# Generate embeddings
npm run kb:embed
```

#### Task 6.2: README
```markdown
# KB Pipeline

## Quick Start
1. npm install
2. cp .env.example .env
3. npm run kb:build

## Configuration
Edit `config/config.json` for paths
```

---

## 📁 Output Structure (Theo Prompt)

```
knowledge_base/
├── 00_index/
│   ├── kb_index.json
│   ├── kb_index.jsonl
│   ├── sitemap.md
│   └── tags.json
├── 01_docs_md/
│   ├── workflow/
│   │   ├── 01-setup.md
│   │   ├── 02-monthly.md
│   │   ├── 03-snapshot.md
│   │   ├── 04-adjustment.md
│   │   └── 05-approval-export.md
│   ├── modules/
│   │   ├── payroll.md
│   │   ├── employees.md
│   │   ├── attendance.md
│   │   ├── import-export.md
│   │   ├── kpi.md
│   │   ├── requests.md
│   │   ├── settings.md
│   │   └── reports.md
│   ├── setup/
│   │   └── system_map.md
│   ├── glossary/
│   │   ├── glossary.md
│   │   └── glossary.json
│   └── faq/
│       ├── faq.md
│       └── faq.json
├── 02_chunks/
│   ├── chunks.jsonl
│   └── chunks_preview.md
└── 03_reports/
    ├── conversion_report.md
    ├── coverage_report.md
    └── conflict_report.md
```

---

## ⏱️ Timeline Tổng Kết

| Sprint | Nội dung | Thời gian |
|--------|----------|-----------|
| 1 | Setup Infrastructure | 1 ngày |
| 2 | Generate Source Docs | 2-3 ngày |
| 3 | Pipeline Core | 2 ngày |
| 4 | Glossary & FAQ | 1 ngày |
| 5 | Index & Integration | 1 ngày |
| 6 | CLI & Docs | 0.5 ngày |
| **Total** | | **7-8 ngày** |

---

## ⚠️ Rủi Ro & Mitigation

| Rủi ro | Mức độ | Giải pháp |
|--------|--------|-----------|
| Thiếu tài liệu nguồn HTML | Cao | Sinh docs từ source code + PRD |
| Nội dung không đầy đủ | Trung bình | Đánh dấu `[NEED_DOC]`, report coverage |
| Thuật ngữ không nhất quán | Trung bình | Glossary chuẩn hóa |
| Embedding API limit | Thấp | Batch processing, rate limit |

---

## ✅ Tiêu Chí Hoàn Thành

- [ ] Pipeline chạy 1 lệnh `npm run kb:build`
- [ ] Output đúng structure theo prompt
- [ ] Chunks có đầy đủ metadata (tags, module, persona, routes)
- [ ] Glossary >= 15 terms
- [ ] FAQ >= 20 Q&A
- [ ] Coverage report hiển thị % module
- [ ] README hướng dẫn chạy pipeline
- [ ] JSONL chunks ready for vector DB ingest

---

## 🚀 Bước Tiếp Theo

1. **Xác nhận kế hoạch** với stakeholder
2. **Tạo folder structure** `kb-pipeline/`
3. **Bắt đầu Sprint 1** - Setup infrastructure

Bạn muốn bắt đầu triển khai sprint nào trước?
