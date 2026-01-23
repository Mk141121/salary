#!/usr/bin/env npx tsx
/**
 * 08-faq.ts
 * Generate FAQ from content and common questions
 */

import { join } from 'path';
import { existsSync, readFileSync } from 'fs';
import { config, configLoader } from '../lib/config.js';
import type { Chunk } from '../lib/chunker.js';
import { 
  writeJson, writeMarkdown, logger, ensureDir 
} from '../lib/utils.js';

interface FAQEntry {
  id: string;
  question: string;
  answer: string;
  category: string;
  tags: string[];
  relatedChunks: string[];
}

// Predefined FAQ entries
const FAQ_ENTRIES: Omit<FAQEntry, 'relatedChunks'>[] = [
  // Setup
  {
    id: 'faq-setup-01',
    question: 'Làm sao để tạo phòng ban mới?',
    answer: `1. Truy cập **Quản lý > Phòng Ban**
2. Click nút **Thêm mới**
3. Nhập tên phòng ban
4. Chọn phòng ban cha (nếu có)
5. Click **Lưu**`,
    category: 'Setup',
    tags: ['setup', 'employees', 'phong_ban'],
  },
  {
    id: 'faq-setup-02',
    question: 'Import nhân viên từ Excel như thế nào?',
    answer: `1. Truy cập **Nhân Viên > Import/Export**
2. Click **Tải file mẫu** để lấy template
3. Điền thông tin nhân viên vào file Excel
4. Click **Chọn file** và upload file đã điền
5. Map các cột dữ liệu
6. Click **Import** và kiểm tra kết quả`,
    category: 'Setup',
    tags: ['setup', 'import', 'employees'],
  },
  {
    id: 'faq-setup-03',
    question: 'Thiết lập khoản lương như thế nào?',
    answer: `1. Truy cập **Bảng Lương > Khoản Lương**
2. Click **Thêm mới**
3. Nhập tên khoản lương
4. Chọn loại: THU_NHAP hoặc KHAU_TRU
5. Chọn có bắt buộc hay không
6. Click **Lưu**

Khoản lương phổ biến:
- THU_NHAP: Lương cơ bản, Phụ cấp, Thưởng
- KHAU_TRU: BHXH, Thuế TNCN, Tạm ứng`,
    category: 'Setup',
    tags: ['setup', 'payroll', 'khoan_luong'],
  },

  // Tính lương
  {
    id: 'faq-payroll-01',
    question: 'Tạo bảng lương tháng như thế nào?',
    answer: `1. Truy cập **Bảng Lương > Danh Sách**
2. Click **Tạo Bảng Lương Mới**
3. Chọn tháng/năm
4. Chọn phòng ban (hoặc Tất cả)
5. Hệ thống tự động tính toán dựa trên:
   - Quy chế lương đang hiệu lực
   - Dữ liệu chấm công
   - Dữ liệu sản lượng (nếu có)
6. Kiểm tra và chốt khi hoàn tất`,
    category: 'Tính lương',
    tags: ['payroll', 'calculation', 'bang_luong'],
  },
  {
    id: 'faq-payroll-02',
    question: 'Công thức tính lương sản lượng hoạt động ra sao?',
    answer: `Công thức mặc định cho Chia hàng:
\`\`\`
Tiền sản lượng = (TONG_SP_DAT - TONG_SP_LOI × 5) × Đơn_giá
\`\`\`

Trong đó:
- **TONG_SP_DAT**: Tổng sản phẩm đạt
- **TONG_SP_LOI**: Tổng sản phẩm lỗi
- **Đơn_giá**: 320đ/SP (cấu hình được)
- SP lỗi bị phạt gấp 5 lần SP đạt

Ví dụ: 1000 SP đạt, 10 SP lỗi → (1000 - 50) × 320 = 304.000đ`,
    category: 'Tính lương',
    tags: ['payroll', 'calculation', 'san_luong', 'rule_engine'],
  },
  {
    id: 'faq-payroll-03',
    question: 'Quy chế lương là gì và cách thiết lập?',
    answer: `**Quy chế lương** là tập hợp các rule tính lương áp dụng cho phòng ban.

Các loại rule:
1. **Cố định**: Số tiền cố định (VD: Phụ cấp 500.000đ)
2. **Theo hệ số**: Tính theo % (VD: 10% lương cơ bản)
3. **Bậc thang**: Theo điều kiện (VD: KPI > 90% → 2 triệu)
4. **Công thức**: Tự viết biểu thức

Cách thiết lập:
1. Truy cập **Quy Chế Lương > Thêm mới**
2. Chọn phòng ban áp dụng
3. Thêm từng rule với loại phù hợp
4. Kích hoạt quy chế`,
    category: 'Tính lương',
    tags: ['payroll', 'rule_engine', 'quy_che'],
  },

  // Snapshot/Chốt
  {
    id: 'faq-snapshot-01',
    question: 'Snapshot là gì? Khi nào cần tạo?',
    answer: `**Snapshot** là bản chụp trạng thái bảng lương.

Nên tạo snapshot khi:
- Trước khi chốt kỳ lương
- Sau mỗi lần điều chỉnh quan trọng
- Để so sánh các phiên bản

Cách tạo:
1. Mở chi tiết bảng lương
2. Click **Tạo Snapshot**
3. Nhập ghi chú (tùy chọn)
4. Xác nhận`,
    category: 'Snapshot/Chốt',
    tags: ['payroll', 'snapshot'],
  },
  {
    id: 'faq-snapshot-02',
    question: 'Chốt và Khóa bảng lương khác nhau thế nào?',
    answer: `| Trạng thái | Mô tả | Có thể điều chỉnh? |
|------------|-------|-------------------|
| **NHAP** | Đang soạn thảo | ✅ Có |
| **DA_CHOT** | Đã chốt | ⚠️ Chỉ qua Adjustment |
| **DA_KHOA** | Khóa vĩnh viễn | ❌ Không |

Quy trình: NHAP → Chốt → DA_CHOT → (Adjustment nếu cần) → Khóa → DA_KHOA`,
    category: 'Snapshot/Chốt',
    tags: ['payroll', 'snapshot', 'lock'],
  },
  {
    id: 'faq-snapshot-03',
    question: 'Làm sao điều chỉnh lương sau khi đã chốt?',
    answer: `Sử dụng **Adjustment Voucher**:

1. Mở bảng lương đã chốt
2. Click **Tạo Adjustment**
3. Chọn nhân viên cần điều chỉnh
4. Chọn khoản lương
5. Nhập số tiền điều chỉnh (+/-)
6. Ghi lý do
7. Xác nhận

Adjustment được ghi nhận riêng và không thay đổi bản chốt gốc.`,
    category: 'Snapshot/Chốt',
    tags: ['payroll', 'adjustment', 'lock'],
  },

  // Import
  {
    id: 'faq-import-01',
    question: 'Import dữ liệu chia hàng như thế nào?',
    answer: `1. Chuẩn bị file Excel với các cột:
   - Mã nhân viên
   - Ngày
   - Số SP đạt
   - Số SP lỗi
   
2. Truy cập **Import > Chia Hàng**
3. Chọn tháng/năm
4. Upload file Excel
5. Map các cột
6. Click **Import**
7. Kiểm tra kết quả

File mẫu có sẵn để tải về.`,
    category: 'Import',
    tags: ['import', 'san_luong', 'chia_hang'],
  },
  {
    id: 'faq-import-02',
    question: 'Lỗi "Mã NV không tồn tại" khi import?',
    answer: `Nguyên nhân: Mã nhân viên trong file Excel không khớp với hệ thống.

Giải quyết:
1. Kiểm tra mã NV trong file (có thể thừa dấu cách, viết hoa/thường)
2. Đảm bảo nhân viên đã được tạo trên hệ thống
3. Sử dụng chức năng Export để lấy danh sách mã NV chính xác
4. Cập nhật file và import lại

Mẹo: Copy mã NV từ hệ thống thay vì gõ tay.`,
    category: 'Import',
    tags: ['import', 'troubleshooting', 'error'],
  },

  // Chấm công
  {
    id: 'faq-attendance-01',
    question: 'Làm sao kiểm tra ngày công của nhân viên?',
    answer: `1. Truy cập **Chấm Công > Bảng Công Tháng**
2. Chọn tháng/năm
3. Chọn phòng ban (hoặc Tất cả)
4. Xem tổng hợp ngày công

Các cột thông tin:
- **Công chuẩn**: Số ngày làm việc lý thuyết
- **Công thực tế**: Số ngày đã chấm công
- **Ngày nghỉ phép**: Có đơn được duyệt
- **Vắng không phép**: Không có đơn`,
    category: 'Chấm công',
    tags: ['attendance', 'ngay_cong'],
  },
  {
    id: 'faq-attendance-02',
    question: 'Điều chỉnh chấm công sai như thế nào?',
    answer: `1. Truy cập **Chấm Công > Quản Lý Chấm Công**
2. Tìm nhân viên cần điều chỉnh
3. Click vào ngày cần sửa
4. Chỉnh sửa giờ vào/ra
5. Ghi lý do điều chỉnh
6. Lưu

Lưu ý: Mọi điều chỉnh được ghi log để audit.`,
    category: 'Chấm công',
    tags: ['attendance', 'edit'],
  },

  // Lỗi thường gặp
  {
    id: 'faq-error-01',
    question: 'Lương tính sai, kiểm tra ở đâu?',
    answer: `Sử dụng **Rule Trace** để debug:

1. Mở chi tiết bảng lương
2. Click vào nhân viên có vấn đề
3. Click **Xem Rule Trace**
4. Kiểm tra từng bước tính toán:
   - Input (ngày công, sản lượng, KPI...)
   - Rules đã áp dụng
   - Kết quả từng rule

Nguyên nhân phổ biến:
- Thiếu dữ liệu input (chưa import)
- Quy chế chưa áp dụng cho phòng ban
- Công thức sai`,
    category: 'Lỗi thường gặp',
    tags: ['troubleshooting', 'rule_engine', 'payroll'],
  },
  {
    id: 'faq-error-02',
    question: 'Không tạo được bảng lương - "Không có quy chế"?',
    answer: `Lỗi xảy ra khi phòng ban chưa có quy chế lương.

Giải quyết:
1. Truy cập **Quy Chế Lương**
2. Tạo quy chế mới cho phòng ban
3. Thêm các rule cần thiết
4. **Kích hoạt** quy chế (trạng thái = HIEU_LUC)
5. Thử tạo bảng lương lại`,
    category: 'Lỗi thường gặp',
    tags: ['troubleshooting', 'rule_engine', 'quy_che'],
  },
  {
    id: 'faq-error-03',
    question: 'Export ngân hàng bị lỗi format?',
    answer: `Kiểm tra:
1. Đã chọn đúng ngân hàng?
2. Thông tin tài khoản nhân viên đã đầy đủ?
   - Số tài khoản
   - Tên chủ tài khoản
   - Ngân hàng

Nếu thiếu thông tin:
1. Truy cập **Nhân Viên > Chi Tiết**
2. Tab **Tài khoản ngân hàng**
3. Cập nhật thông tin
4. Export lại`,
    category: 'Lỗi thường gặp',
    tags: ['troubleshooting', 'export', 'bank'],
  },
];

async function main() {
  logger.step('FAQ', 'Generating FAQ...');
  
  const docsPath = configLoader.resolvePath(config.output.docs);
  const faqPath = join(docsPath, 'faq');
  const chunksPath = configLoader.resolvePath(config.output.chunks);
  
  ensureDir(faqPath);

  // Load chunks to find related content
  const chunksFile = join(chunksPath, 'chunks.jsonl');
  let chunks: Chunk[] = [];
  
  if (existsSync(chunksFile)) {
    const content = readFileSync(chunksFile, 'utf-8');
    chunks = content.split('\n').filter(l => l.trim()).map(l => JSON.parse(l));
  }

  // Build FAQ with related chunks
  const faq: FAQEntry[] = [];
  
  for (const entry of FAQ_ENTRIES) {
    // Find related chunks based on tags
    const relatedChunks = chunks
      .filter(c => entry.tags.some(t => c.tags.includes(t)))
      .map(c => c.id)
      .slice(0, 3);

    faq.push({
      ...entry,
      relatedChunks,
    });
  }

  // Group by category
  const byCategory: Record<string, FAQEntry[]> = {};
  for (const entry of faq) {
    if (!byCategory[entry.category]) {
      byCategory[entry.category] = [];
    }
    byCategory[entry.category].push(entry);
  }

  // Save JSON
  writeJson(join(faqPath, 'faq.json'), {
    timestamp: new Date().toISOString(),
    count: faq.length,
    categories: Object.keys(byCategory),
    entries: faq,
  });
  logger.success('Saved faq.json');

  // Generate Markdown
  const md = generateFAQMarkdown(byCategory);
  writeMarkdown(join(faqPath, 'faq.md'), md);
  logger.success('Saved faq.md');

  // Summary
  console.log('\n' + '='.repeat(50));
  logger.info(`Generated ${faq.length} FAQ entries`);
  
  console.log('\nBy category:');
  Object.entries(byCategory).forEach(([cat, entries]) => {
    console.log(`  ${cat}: ${entries.length}`);
  });
}

function generateFAQMarkdown(byCategory: Record<string, FAQEntry[]>): string {
  const totalCount = Object.values(byCategory).flat().length;
  
  let md = `# Câu Hỏi Thường Gặp (FAQ)

> HRM-Lite Payroll System  
> Updated: ${new Date().toISOString().split('T')[0]}  
> Tổng số: ${totalCount} câu hỏi

## Danh Mục

${Object.keys(byCategory).map((cat, i) => `${i + 1}. [${cat}](#${cat.toLowerCase().replace(/\s+/g, '-').replace(/\//g, '')})`).join('\n')}

---

`;

  for (const [category, entries] of Object.entries(byCategory)) {
    md += `## ${category}\n\n`;

    for (const entry of entries) {
      md += `### ${entry.question}

${entry.answer}

**Tags:** ${entry.tags.map(t => `\`${t}\``).join(', ')}

---

`;
    }
  }

  md += `\n*Tài liệu được sinh tự động bởi KB Pipeline*\n`;

  return md;
}

main().catch(error => {
  logger.error(`FAQ generation failed: ${error}`);
  process.exit(1);
});
