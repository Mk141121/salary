# PROMPT FINAL (Claude) — Build Knowledge Base RAG: Convert HTML → MD + Chunking + Tags + Glossary/FAQ + Vector Index
> Mục tiêu: Tạo “Knowledge Base” chuẩn RAG cho Chatbot hướng dẫn sử dụng hệ thống Payroll/HRM-lite hiện tại.
> Tài liệu nguồn: các file hướng dẫn dạng HTML đã cập nhật liên tục (v3/v4/v5...), PRD module, prompts.
> Yêu cầu: hệ thống đã chỉnh sửa rất nhiều → output phải phản ánh “latest state” và chống sai lệch.
> App 100% tiếng Việt.

---

## 0) Vai trò
Bạn là **Knowledge Engineer + RAG Pipeline Engineer**.

Nhiệm vụ:
1) Tự động convert toàn bộ tài liệu HTML hiện có sang Markdown sạch.
2) Chuẩn hóa cấu trúc tài liệu theo workflow & modules.
3) Chia nhỏ nội dung thành chunks tối ưu RAG (không quá dài, đủ ngữ cảnh).
4) Tự động gắn tags/metadata cho mỗi chunk.
5) Tự sinh:
   - Glossary (từ điển thuật ngữ)
   - FAQ (hỏi đáp theo workflow + lỗi thường gặp)
6) Tự tạo index (JSONL/JSON) để ingest vào vector DB.
7) Viết đầy đủ script/CLI để chạy lại pipeline bất cứ lúc nào.
8) **KHÔNG được làm mất nội dung mới nhất**. Nếu phát hiện mâu thuẫn giữa phiên bản tài liệu → đánh dấu “xung đột” và ưu tiên bản mới hơn.

---

## 1) Input / Source of Truth (BẮT BUỘC)
### 1.1 Nguồn tài liệu
Pipeline phải scan những folder sau (cấu hình trong `.env` hoặc `config.json`):
- `docs_raw/html/` (file hướng dẫn HTML)
- `docs_raw/prd/` (PRD markdown)
- `docs_raw/prompts/` (prompt .md đã dùng cho Claude dev)
- `docs_raw/release_notes/` (nếu có)
- `docs_raw/images/` (nếu có ảnh minh họa)

### 1.2 Ưu tiên phiên bản mới nhất
- Nếu có nhiều HTML version v3/v4/v5:
  - auto detect version trong filename hoặc trong heading
  - ưu tiên bản có version cao nhất
  - vẫn giữ lại bản cũ để so sánh diff
- Nếu phát hiện mâu thuẫn:
  - ghi `conflict_report.md`
  - chunk liên quan gắn tag `conflict:true`

---

## 2) Output structure (chuẩn Knowledge Base)
Tạo cấu trúc output:

```
knowledge_base/
  00_index/
    kb_index.json
    kb_index.jsonl
    sitemap.md
    tags.json
  01_docs_md/
    workflow/
    modules/
    setup/
    glossary/
    faq/
  02_chunks/
    chunks.jsonl
    chunks_preview.md
  03_reports/
    conversion_report.md
    conflict_report.md
    coverage_report.md
```

---

## 3) Quy chuẩn Markdown (siêu quan trọng)
### 3.1 Chuẩn format
- 1 file = 1 chủ đề rõ ràng
- Heading theo cấp:
  - `#` title
  - `##` section
  - `###` subsection
- Tables giữ dạng markdown table
- Code blocks giữ nguyên
- Không nhồi quá dài
- Tối ưu đọc trên web

### 3.2 Chuẩn liên kết nội bộ
- Link theo relative path
- Có anchors rõ

### 3.3 Chuẩn tiếng Việt
- Không dịch thuật ngữ sai nghĩa
- Format số tiền kiểu VN:
  - 1.234.567 ₫
- Gọi module đúng tên trong app

---

## 4) Convert HTML → Markdown (Implementation)
### 4.1 Tooling
- Dùng NodeJS hoặc Python đều được, ưu tiên Node:
  - `turndown` + custom rules
- Phải preserve:
  - headings
  - lists
  - tables
  - code
  - images (giữ link)

### 4.2 Clean HTML artifacts
- loại bỏ:
  - inline styles
  - random spans
  - script
- normalize whitespace
- convert `<br>` hợp lý

### 4.3 Split HTML to logical sections
- split theo h1/h2
- mỗi section thành file nhỏ nếu > 2000 từ

---

## 5) Chuẩn hóa nội dung theo hệ thống (latest architecture)
### 5.1 Bản đồ module hiện tại (BẮT BUỘC bám đúng)
Pipeline phải tạo 1 file canonical:
- `knowledge_base/01_docs_md/setup/system_map.md`

Gồm:
- Module payroll core:
  - Rule engine + UI kéo thả + validate JSON
  - AI assistant gợi ý rule
  - Snapshot/chốt/khoá
  - Adjustment voucher
- Import chia hàng + giao hàng
- Chấm công + KPI + BHXH/Thuế
- Audit log + RBAC

### 5.2 Rewrite/merge duplicate content
Nếu nhiều file nói cùng 1 flow:
- merge lại
- ưu tiên bản mới nhất
- tạo note “updated at”

---

## 6) Chunking strategy (RAG-ready)
### 6.1 Mục tiêu chunk
Chunk phải:
- đủ ngữ cảnh để trả lời 1 câu hỏi
- không dài quá
- có title rõ
- giữ nguyên link tới doc nguồn

### 6.2 Chunk rules
- chunk size: 350–900 tokens (khuyến nghị)
- overlap: 80–150 tokens
- split theo heading trước, sau đó split theo paragraph
- không cắt ngang bảng/công thức

### 6.3 Chunk schema (JSONL)
Mỗi chunk phải có schema:
```json
{
  "id": "kb_<hash>",
  "doc_id": "doc_<hash>",
  "source_file": "docs_raw/html/huong-dan-payroll-option-b-v4.html",
  "source_version": "v4",
  "title": "Snapshot kỳ lương",
  "section_path": "Workflow > Kỳ lương > Snapshot",
  "content_md": "...",
  "tags": ["payroll", "snapshot", "workflow", "ky_luong"],
  "module": "PAYROLL",
  "persona": ["HR", "KE_TOAN"],
  "routes": ["/bang-luong", "/snapshot"],
  "actions": ["Tạo snapshot", "Chốt kỳ lương"],
  "entities": {
    "models": ["SnapshotBangLuong", "BangLuong"],
    "statuses": ["NHAP", "DA_CHOT", "DA_KHOA"]
  },
  "updated_at": "2026-01-23",
  "conflict": false
}
```

---

## 7) Auto Tagging (metadata enrichment)
### 7.1 Tags taxonomy
Tạo taxonomy chuẩn:
- module tags: payroll, attendance, scheduling, request, kpi, tax_bhxh, import, rbac, audit
- workflow tags: setup, month_end, snapshot, lock, approve, adjustment, export_bank
- persona tags: admin, hr, ke_toan, manager, nhan_vien
- severity tags: warning, error, critical

### 7.2 Heuristic tagging
Tự gán dựa theo:
- keyword dictionary
- module mapping file
- route/action detection

---

## 8) Auto generate Glossary (Từ điển thuật ngữ)
Tạo file:
- `knowledge_base/01_docs_md/glossary/glossary.md`
- `knowledge_base/01_docs_md/glossary/glossary.json`

Glossary entries schema:
```json
{
  "term": "Snapshot",
  "definition": "...",
  "why_it_matters": "...",
  "related_terms": ["Chốt kỳ", "Khoá kỳ", "Rule Trace"],
  "example": "Ví dụ: Snapshot kỳ lương tháng 12/2025..."
}
```

Must include tối thiểu:
- Snapshot
- Chốt / Khoá
- Rule engine / Rule trace
- Adjustment voucher
- Ngày công / Chấm công / KPI mapping
- Ứng lương / điều kiện ứng lương
- Phụ cấp theo nhân viên
- Trách nhiệm + thưởng phạt

---

## 9) Auto generate FAQ (Hỏi đáp vận hành)
Tạo file:
- `knowledge_base/01_docs_md/faq/faq.md`
- `knowledge_base/01_docs_md/faq/faq.json`

FAQ chia nhóm:
1) Setup ban đầu
2) Nhập dữ liệu (import)
3) Tính lương (rule)
4) Snapshot/Chốt/Khoá
5) Adjustment
6) Payslip
7) Lỗi thường gặp

Mỗi Q/A phải:
- ngắn gọn
- có bước giải quyết
- có link trỏ doc chunk/source

---

## 10) Sinh Index ingest vào Vector DB
### 10.1 Output cho ingest
Tạo:
- `kb_index.json` (documents)
- `chunks.jsonl` (chunks)
- `tags.json` (taxonomy)
- `sitemap.md`

### 10.2 Embedding-ready
Nếu có env OPENAI_API_KEY hoặc provider khác:
- tạo script generate embeddings
- lưu vào:
  - pgvector table `kb_embeddings`
  - hoặc file `embeddings.jsonl`

Nhưng nếu không có key thì vẫn build được full KB.

---

## 11) Quality Gates & Reports
Pipeline phải tạo report:
### 11.1 conversion_report.md
- bao nhiêu file convert
- file nào lỗi
- file nào bị rỗng

### 11.2 coverage_report.md
- bao phủ modules hiện có
- detect thiếu modules:
  - KPI?
  - BHXH/Thuế?
  - Request?
  - Anti-fraud?
- gợi ý cần thêm docs

### 11.3 conflict_report.md
- liệt kê conflict topic
- doc versions involved
- đề xuất doc canonical

---

## 12) CLI Usage (BẮT BUỘC có)
Tạo CLI:
- `npm run kb:build`
- `npm run kb:watch` (optional)
- `npm run kb:preview` (render markdown list)

Example:
```bash
npm run kb:build -- --source ./docs_raw --out ./knowledge_base
```

---

## 13) Constraints
- Không làm mất dữ liệu mới nhất
- Không tự ý “bịa” glossary/FAQ → phải trích từ content thực tế
- Nếu thiếu info → đánh dấu `[NEED_DOC]` thay vì tự suy đoán
- Không chạm backend business logic app

---

## 14) Deliverables bắt buộc
1) Code pipeline (scripts + config)
2) knowledge_base folder output
3) Report conversion/coverage/conflict
4) README chạy pipeline
5) JSONL chunks ingest-ready

---

## 15) Tiêu chí hoàn thành
- Chạy pipeline 1 lệnh ra đầy đủ KB
- chunks có metadata tốt
- glossary & faq usable ngay
- index ingest-ready
- conflict được phát hiện & đánh dấu đúng
