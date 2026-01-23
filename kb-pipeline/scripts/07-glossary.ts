#!/usr/bin/env npx tsx
/**
 * 07-glossary.ts
 * Generate glossary from content
 */

import { join } from 'path';
import { existsSync, readFileSync } from 'fs';
import { config, configLoader } from '../lib/config.js';
import type { Chunk } from '../lib/chunker.js';
import { 
  writeJson, writeMarkdown, logger, ensureDir 
} from '../lib/utils.js';

interface GlossaryEntry {
  term: string;
  definition: string;
  whyItMatters: string;
  relatedTerms: string[];
  example: string;
  module: string;
  sources: string[];
}

// Predefined glossary terms with definitions
const GLOSSARY_TERMS: Omit<GlossaryEntry, 'sources'>[] = [
  {
    term: 'Snapshot',
    definition: 'Bản chụp trạng thái bảng lương tại một thời điểm cụ thể. Snapshot lưu lại toàn bộ dữ liệu chi tiết lương của tất cả nhân viên.',
    whyItMatters: 'Giúp lưu giữ lịch sử, so sánh các phiên bản, và phục vụ audit trail. Có thể tạo nhiều snapshot cho một bảng lương.',
    relatedTerms: ['Chốt kỳ', 'Khóa kỳ', 'Bảng lương'],
    example: 'Tạo Snapshot trước khi chốt bảng lương tháng 12/2025 để có thể so sánh sau này.',
    module: 'PAYROLL',
  },
  {
    term: 'Chốt kỳ lương',
    definition: 'Hành động đóng băng bảng lương, chuyển trạng thái từ NHAP sang DA_CHOT. Sau khi chốt, không thể chỉnh sửa trực tiếp.',
    whyItMatters: 'Đảm bảo tính toàn vẹn dữ liệu và ngăn chặn thay đổi không mong muốn sau khi đã xác nhận.',
    relatedTerms: ['Snapshot', 'Khóa kỳ', 'Adjustment Voucher'],
    example: 'Chốt bảng lương tháng 1/2026 vào ngày 15/01 sau khi đã kiểm tra xong.',
    module: 'PAYROLL',
  },
  {
    term: 'Khóa kỳ lương',
    definition: 'Trạng thái cuối cùng của bảng lương (DA_KHOA). Không thể mở lại hoặc điều chỉnh.',
    whyItMatters: 'Sử dụng sau khi đã thanh toán lương để đảm bảo không có thay đổi.',
    relatedTerms: ['Chốt kỳ', 'Snapshot'],
    example: 'Khóa bảng lương sau khi đã chuyển khoản cho nhân viên.',
    module: 'PAYROLL',
  },
  {
    term: 'Rule Engine',
    definition: 'Hệ thống tính toán tự động áp dụng các công thức và điều kiện để tính lương. Hỗ trợ nhiều loại rule: cố định, hệ số, bậc thang, công thức tùy chỉnh.',
    whyItMatters: 'Tự động hóa việc tính lương phức tạp, giảm sai sót và tiết kiệm thời gian.',
    relatedTerms: ['Quy chế lương', 'Rule Trace', 'Công thức'],
    example: 'Rule tính sản lượng: (TONG_SP_DAT - TONG_SP_LOI * 5) * 320',
    module: 'RULE_ENGINE',
  },
  {
    term: 'Rule Trace',
    definition: 'Bản ghi chi tiết quá trình tính toán của Rule Engine cho từng nhân viên. Hiển thị input, công thức áp dụng, và kết quả.',
    whyItMatters: 'Giúp debug và kiểm tra khi kết quả tính lương không như mong đợi.',
    relatedTerms: ['Rule Engine', 'Quy chế lương'],
    example: 'Xem Rule Trace để biết tại sao nhân viên A có tiền sản lượng = 0.',
    module: 'RULE_ENGINE',
  },
  {
    term: 'Adjustment Voucher',
    definition: 'Phiếu điều chỉnh lương sau khi đã chốt kỳ. Cho phép tăng/giảm các khoản lương mà không cần mở khóa bảng lương.',
    whyItMatters: 'Giải quyết các trường hợp phát hiện sai sót sau khi đã chốt mà vẫn đảm bảo audit trail.',
    relatedTerms: ['Chốt kỳ', 'Bảng lương'],
    example: 'Tạo Adjustment +500.000đ cho NV001 vì thiếu ngày công.',
    module: 'PAYROLL',
  },
  {
    term: 'Ngày công',
    definition: 'Số ngày làm việc thực tế của nhân viên trong tháng. Tính từ dữ liệu chấm công.',
    whyItMatters: 'Ảnh hưởng trực tiếp đến lương cơ bản = Lương HĐ × (Ngày công / Công chuẩn).',
    relatedTerms: ['Công chuẩn', 'Chấm công'],
    example: 'Nhân viên có 22 ngày công trong tháng có 24 công chuẩn.',
    module: 'ATTENDANCE',
  },
  {
    term: 'Công chuẩn',
    definition: 'Số ngày làm việc lý thuyết trong tháng (trừ thứ 7, CN, ngày lễ). Thường từ 22-26 ngày.',
    whyItMatters: 'Dùng làm mẫu số để tính lương theo ngày công thực tế.',
    relatedTerms: ['Ngày công', 'Lương cơ bản'],
    example: 'Tháng 1/2026 có 24 công chuẩn.',
    module: 'ATTENDANCE',
  },
  {
    term: 'Chấm công',
    definition: 'Ghi nhận thời gian làm việc của nhân viên qua thiết bị (GPS, vân tay) hoặc nhập tay.',
    whyItMatters: 'Là cơ sở để tính ngày công và các khoản liên quan (OT, đi muộn...).',
    relatedTerms: ['Ngày công', 'GPS Log', 'Geofence'],
    example: 'Nhân viên check-in lúc 8:00, check-out lúc 17:30.',
    module: 'ATTENDANCE',
  },
  {
    term: 'KPI',
    definition: 'Key Performance Indicator - Chỉ số đánh giá hiệu suất làm việc của nhân viên.',
    whyItMatters: 'Cơ sở để tính thưởng KPI và đánh giá nhân sự.',
    relatedTerms: ['Thưởng KPI', 'Kỳ đánh giá'],
    example: 'KPI tháng 1 đạt 95% → Thưởng 2.000.000đ.',
    module: 'KPI',
  },
  {
    term: 'Sản lượng',
    definition: 'Số lượng sản phẩm/công việc hoàn thành, thường áp dụng cho phòng Chia hàng, Giao hàng.',
    whyItMatters: 'Cơ sở tính lương sản lượng theo công thức đơn giá.',
    relatedTerms: ['Đơn giá', 'Chia hàng', 'Giao hàng'],
    example: 'Tổng SP đạt: 1000, SP lỗi: 10 → Tiền SL = (1000-50)*320.',
    module: 'IMPORT',
  },
  {
    term: 'BHXH',
    definition: 'Bảo hiểm xã hội - Khoản bảo hiểm bắt buộc, người lao động đóng 8% lương đóng BH.',
    whyItMatters: 'Là khoản khấu trừ bắt buộc trên bảng lương.',
    relatedTerms: ['BHYT', 'BHTN', 'Lương đóng BH'],
    example: 'Lương đóng BH: 10.000.000đ → BHXH = 800.000đ.',
    module: 'TAX_BHXH',
  },
  {
    term: 'Thuế TNCN',
    definition: 'Thuế thu nhập cá nhân - Tính theo biểu lũy tiến từng phần sau khi trừ giảm trừ.',
    whyItMatters: 'Khấu trừ bắt buộc theo quy định pháp luật.',
    relatedTerms: ['Giảm trừ gia cảnh', 'Thu nhập chịu thuế'],
    example: 'Thu nhập tính thuế 15 triệu → Thuế TNCN ~950.000đ.',
    module: 'TAX_BHXH',
  },
  {
    term: 'Ứng lương',
    definition: 'Cho phép nhân viên nhận trước một phần lương trong tháng theo điều kiện quy định.',
    whyItMatters: 'Hỗ trợ nhân viên khi cần tiền gấp, đồng thời có kiểm soát.',
    relatedTerms: ['Điều kiện ứng', 'Bảng ứng lương'],
    example: 'Ứng tối đa 50% lương, tối thiểu đã làm 15 ngày.',
    module: 'ADVANCE',
  },
  {
    term: 'Quy chế lương',
    definition: 'Tập hợp các rule tính lương áp dụng cho một phòng ban hoặc nhóm nhân viên.',
    whyItMatters: 'Cho phép cấu hình công thức tính lương khác nhau theo bộ phận.',
    relatedTerms: ['Rule Engine', 'Khoản lương'],
    example: 'Quy chế "Chia hàng" có rule tính sản lượng, quy chế "VP" chỉ có lương cố định.',
    module: 'RULE_ENGINE',
  },
];

async function main() {
  logger.step('GLOSSARY', 'Generating glossary...');
  
  const docsPath = configLoader.resolvePath(config.output.docs);
  const glossaryPath = join(docsPath, 'glossary');
  const chunksPath = configLoader.resolvePath(config.output.chunks);
  
  ensureDir(glossaryPath);

  // Load chunks to find term sources
  const chunksFile = join(chunksPath, 'chunks.jsonl');
  let chunks: Chunk[] = [];
  
  if (existsSync(chunksFile)) {
    const content = readFileSync(chunksFile, 'utf-8');
    chunks = content.split('\n').filter(l => l.trim()).map(l => JSON.parse(l));
  }

  // Build glossary with sources
  const glossary: GlossaryEntry[] = [];
  
  for (const term of GLOSSARY_TERMS) {
    // Find chunks that mention this term
    const termLower = term.term.toLowerCase();
    const sources = chunks
      .filter(c => c.contentMd.toLowerCase().includes(termLower))
      .map(c => c.sourceFile)
      .filter((v, i, a) => a.indexOf(v) === i) // unique
      .slice(0, 5);

    glossary.push({
      ...term,
      sources,
    });
  }

  // Save JSON
  writeJson(join(glossaryPath, 'glossary.json'), {
    timestamp: new Date().toISOString(),
    count: glossary.length,
    entries: glossary,
  });
  logger.success('Saved glossary.json');

  // Generate Markdown
  const md = generateGlossaryMarkdown(glossary);
  writeMarkdown(join(glossaryPath, 'glossary.md'), md);
  logger.success('Saved glossary.md');

  // Summary
  console.log('\n' + '='.repeat(50));
  logger.info(`Generated ${glossary.length} glossary entries`);
  
  console.log('\nTerms by module:');
  const byModule: Record<string, number> = {};
  for (const entry of glossary) {
    byModule[entry.module] = (byModule[entry.module] || 0) + 1;
  }
  Object.entries(byModule).forEach(([mod, count]) => {
    console.log(`  ${mod}: ${count}`);
  });
}

function generateGlossaryMarkdown(entries: GlossaryEntry[]): string {
  let md = `# Từ Điển Thuật Ngữ (Glossary)

> HRM-Lite Payroll System  
> Updated: ${new Date().toISOString().split('T')[0]}  
> Tổng số: ${entries.length} thuật ngữ

## Mục Lục

${entries.map(e => `- [${e.term}](#${e.term.toLowerCase().replace(/\s+/g, '-')})`).join('\n')}

---

`;

  for (const entry of entries) {
    md += `## ${entry.term}

**Module:** \`${entry.module}\`

### Định nghĩa

${entry.definition}

### Tại sao quan trọng

${entry.whyItMatters}

### Ví dụ

> ${entry.example}

### Thuật ngữ liên quan

${entry.relatedTerms.map(t => `- ${t}`).join('\n')}

${entry.sources.length > 0 ? `### Nguồn tham khảo

${entry.sources.map(s => `- \`${s}\``).join('\n')}
` : ''}

---

`;
  }

  md += `\n*Tài liệu được sinh tự động bởi KB Pipeline*\n`;

  return md;
}

main().catch(error => {
  logger.error(`Glossary generation failed: ${error}`);
  process.exit(1);
});
