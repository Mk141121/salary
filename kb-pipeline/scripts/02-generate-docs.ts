#!/usr/bin/env npx tsx
/**
 * 02-generate-docs.ts
 * Generate documentation from source code for modules without docs
 */

import { join, basename } from 'path';
import { existsSync, readFileSync } from 'fs';
import { config, configLoader, modules } from '../lib/config.js';
import { 
  findFiles, writeMarkdown, logger, ensureDir, 
  readFileSafe, slugify, Progress 
} from '../lib/utils.js';

interface PageInfo {
  filename: string;
  path: string;
  title: string;
  description: string;
  features: string[];
  imports: string[];
  apiCalls: string[];
  states: string[];
  routes: string[];
}

interface ModuleDoc {
  id: string;
  name: string;
  description: string;
  pages: PageInfo[];
  entities: string[];
  workflows: string[];
}

/**
 * Extract information from a React/TSX page file
 */
function analyzePageFile(content: string, filename: string): PageInfo {
  const info: PageInfo = {
    filename,
    path: '',
    title: extractPageTitle(content, filename),
    description: '',
    features: [],
    imports: [],
    apiCalls: [],
    states: [],
    routes: [],
  };

  // Extract imports
  const importMatches = content.match(/import\s+.*?from\s+['"](.+?)['"]/g) || [];
  info.imports = importMatches.map(m => {
    const match = m.match(/from\s+['"](.+?)['"]/);
    return match ? match[1] : '';
  }).filter(Boolean);

  // Extract API calls
  const apiPatterns = [
    /fetch\(['"`]([^'"`]+)['"`]/g,
    /axios\.\w+\(['"`]([^'"`]+)['"`]/g,
    /api\.\w+\(['"`]([^'"`]+)['"`]/g,
    /apiClient\.\w+\(['"`]([^'"`]+)['"`]/g,
    /useMutation.*?['"`](\/[^'"`]+)['"`]/g,
    /useQuery.*?['"`](\/[^'"`]+)['"`]/g,
  ];

  for (const pattern of apiPatterns) {
    const matches = content.matchAll(pattern);
    for (const match of matches) {
      if (match[1] && match[1].startsWith('/')) {
        info.apiCalls.push(match[1]);
      }
    }
  }

  // Extract useState hooks
  const stateMatches = content.matchAll(/useState[<(].*?[>)]?\(.*?\)/g);
  for (const match of stateMatches) {
    info.states.push(match[0]);
  }

  // Extract features from comments and JSX
  info.features = extractFeatures(content);

  // Extract description from file header comment
  const headerComment = content.match(/\/\*\*[\s\S]*?\*\//);
  if (headerComment) {
    const desc = headerComment[0]
      .replace(/\/\*\*|\*\/|\*/g, '')
      .trim()
      .split('\n')[0];
    info.description = desc;
  }

  return info;
}

/**
 * Extract page title from component
 */
function extractPageTitle(content: string, filename: string): string {
  // Try to find title in JSX
  const titlePatterns = [
    /<h1[^>]*>([^<]+)<\/h1>/i,
    /<PageHeader[^>]*title=["']([^"']+)["']/i,
    /<title>([^<]+)<\/title>/i,
    /document\.title\s*=\s*['"`]([^'"`]+)['"`]/,
  ];

  for (const pattern of titlePatterns) {
    const match = content.match(pattern);
    if (match) {
      return match[1].replace(/{[^}]+}/g, '').trim();
    }
  }

  // Fallback: generate from filename
  return filename
    .replace('.tsx', '')
    .replace(/([A-Z])/g, ' $1')
    .trim();
}

/**
 * Extract features from component content
 */
function extractFeatures(content: string): string[] {
  const features: string[] = [];

  // Common UI patterns
  const patterns: [RegExp, string][] = [
    [/<Table|<DataTable|useTable/i, 'Hiển thị dữ liệu dạng bảng'],
    [/<Form|useForm|onSubmit/i, 'Form nhập liệu'],
    [/<Modal|Dialog|isOpen/i, 'Dialog/Modal tương tác'],
    [/export.*Excel|download.*xlsx|ExcelJS/i, 'Export Excel'],
    [/import.*Excel|upload.*xlsx|parseExcel/i, 'Import Excel'],
    [/<DatePicker|DateRange/i, 'Chọn ngày/khoảng thời gian'],
    [/<Select|Dropdown|ComboBox/i, 'Dropdown chọn giá trị'],
    [/useMutation|mutation\./i, 'Thao tác CRUD'],
    [/useQuery|query\./i, 'Truy vấn dữ liệu'],
    [/<Pagination|page.*size/i, 'Phân trang'],
    [/search|filter|Filter/i, 'Tìm kiếm/Lọc dữ liệu'],
    [/<Chart|Recharts|BarChart|LineChart/i, 'Biểu đồ thống kê'],
    [/toast|notification|alert/i, 'Thông báo người dùng'],
    [/confirm|Confirm/i, 'Xác nhận thao tác'],
    [/delete|Delete|xóa/i, 'Xóa dữ liệu'],
    [/edit|Edit|update|Update/i, 'Chỉnh sửa dữ liệu'],
    [/create|Create|add|Add|thêm/i, 'Thêm mới dữ liệu'],
    [/print|Print|in ấn/i, 'In ấn'],
    [/pdf|PDF/i, 'Xuất PDF'],
  ];

  for (const [pattern, feature] of patterns) {
    if (pattern.test(content) && !features.includes(feature)) {
      features.push(feature);
    }
  }

  return features;
}

/**
 * Extract entity names from Prisma schema
 */
async function extractEntities(): Promise<Map<string, string[]>> {
  const prismaPath = configLoader.resolvePath(config.sources.prisma);
  const entityMap = new Map<string, string[]>();

  if (!existsSync(prismaPath)) {
    logger.warn('Prisma schema not found');
    return entityMap;
  }

  const content = readFileSync(prismaPath, 'utf-8');
  
  // Extract model names and their fields
  const modelMatches = content.matchAll(/model\s+(\w+)\s*\{([^}]+)\}/g);
  
  for (const match of modelMatches) {
    const modelName = match[1];
    const fields = match[2]
      .split('\n')
      .map(line => line.trim())
      .filter(line => line && !line.startsWith('//') && !line.startsWith('@@'))
      .map(line => {
        const fieldMatch = line.match(/^(\w+)\s+/);
        return fieldMatch ? fieldMatch[1] : '';
      })
      .filter(Boolean);
    
    entityMap.set(modelName, fields);
  }

  return entityMap;
}

/**
 * Generate markdown documentation for a module
 */
function generateModuleDoc(moduleDoc: ModuleDoc): string {
  const now = new Date().toISOString().split('T')[0];
  
  let md = `# ${moduleDoc.name}

> Module: \`${moduleDoc.id}\`  
> Updated: ${now}  
> Auto-generated from source code

## Tổng Quan

${moduleDoc.description}

## Tính Năng Chính

`;

  // Collect all unique features
  const allFeatures = new Set<string>();
  for (const page of moduleDoc.pages) {
    page.features.forEach(f => allFeatures.add(f));
  }
  
  for (const feature of allFeatures) {
    md += `- ✅ ${feature}\n`;
  }

  md += `\n## Các Màn Hình\n\n`;

  for (const page of moduleDoc.pages) {
    md += `### ${page.title}\n\n`;
    md += `**File:** \`${page.filename}\`\n\n`;
    
    if (page.description) {
      md += `${page.description}\n\n`;
    }

    if (page.features.length > 0) {
      md += `**Tính năng:**\n`;
      for (const feat of page.features) {
        md += `- ${feat}\n`;
      }
      md += '\n';
    }

    if (page.apiCalls.length > 0) {
      md += `**API endpoints:**\n`;
      for (const api of [...new Set(page.apiCalls)].slice(0, 10)) {
        md += `- \`${api}\`\n`;
      }
      md += '\n';
    }
  }

  if (moduleDoc.entities.length > 0) {
    md += `## Entities / Models\n\n`;
    for (const entity of moduleDoc.entities) {
      md += `- \`${entity}\`\n`;
    }
    md += '\n';
  }

  if (moduleDoc.workflows.length > 0) {
    md += `## Quy Trình Nghiệp Vụ\n\n`;
    for (const wf of moduleDoc.workflows) {
      md += `${wf}\n\n`;
    }
  }

  md += `---\n\n*Tài liệu được sinh tự động bởi KB Pipeline*\n`;

  return md;
}

/**
 * Generate workflow documentation
 */
function generateWorkflowDocs(): Map<string, string> {
  const workflows = new Map<string, string>();

  // Setup workflow
  workflows.set('01-setup', `# Thiết Lập Ban Đầu

> Workflow: Setup  
> Updated: ${new Date().toISOString().split('T')[0]}

## Tổng Quan

Hướng dẫn các bước thiết lập hệ thống HRM-Lite Payroll lần đầu.

## Các Bước Thực Hiện

### Bước 1: Cấu Hình Phòng Ban

1. Truy cập **Quản lý > Phòng Ban**
2. Thêm các phòng ban theo cơ cấu tổ chức
3. Thiết lập phòng ban cha (nếu có)

### Bước 2: Cấu Hình Chức Vụ

1. Truy cập **Quản lý > Chức Vụ**
2. Thêm các chức vụ trong công ty
3. Gán cấp bậc cho từng chức vụ

### Bước 3: Thiết Lập Khoản Lương

1. Truy cập **Bảng Lương > Khoản Lương**
2. Tạo các khoản thu nhập:
   - Lương cơ bản
   - Phụ cấp (ăn trưa, đi lại, điện thoại...)
   - Thưởng KPI
3. Tạo các khoản khấu trừ:
   - BHXH, BHYT, BHTN
   - Thuế TNCN
   - Tạm ứng

### Bước 4: Import Nhân Viên

1. Truy cập **Nhân Viên > Import/Export**
2. Tải file mẫu Excel
3. Điền thông tin nhân viên
4. Upload và kiểm tra kết quả

### Bước 5: Tạo Hợp Đồng

1. Mở chi tiết từng nhân viên
2. Tab **Hợp Đồng** > Thêm mới
3. Nhập thông tin lương cơ bản

### Bước 6: Thiết Lập Quy Chế Lương

1. Truy cập **Quy Chế Lương > Thêm mới**
2. Chọn phòng ban áp dụng
3. Thêm các rule tính lương
4. Kích hoạt quy chế

## Kiểm Tra

- [ ] Phòng ban đã tạo đủ
- [ ] Nhân viên đã import
- [ ] Hợp đồng đã có lương cơ bản
- [ ] Quy chế lương đã kích hoạt

---
*Tài liệu được sinh tự động bởi KB Pipeline*
`);

  // Monthly workflow
  workflows.set('02-monthly', `# Quy Trình Tháng

> Workflow: Monthly  
> Updated: ${new Date().toISOString().split('T')[0]}

## Tổng Quan

Các bước thực hiện hàng tháng để tính lương cho nhân viên.

## Timeline

| Ngày | Công việc |
|------|-----------|
| 1-5 | Import dữ liệu sản lượng |
| 1-5 | Kiểm tra chấm công |
| 5-10 | Tính lương |
| 10-15 | Kiểm tra & điều chỉnh |
| 15-20 | Chốt bảng lương |
| 20-25 | Export ngân hàng |
| 25-30 | Phát payslip |

## Chi Tiết Các Bước

### 1. Import Dữ Liệu Sản Lượng

**Chia hàng:**
1. Truy cập **Import > Chia Hàng**
2. Chọn file Excel từ bộ phận sản xuất
3. Map cột dữ liệu
4. Xác nhận import

**Giao hàng:**
1. Truy cập **Import > Giao Hàng**
2. Upload file dữ liệu
3. Kiểm tra kết quả

### 2. Kiểm Tra Chấm Công

1. Truy cập **Chấm Công > Bảng Công Tháng**
2. Chọn tháng cần kiểm tra
3. Xem tổng hợp ngày công
4. Điều chỉnh nếu cần

### 3. Tạo Bảng Lương

1. Truy cập **Bảng Lương > Danh Sách**
2. Click **Tạo Bảng Lương Mới**
3. Chọn tháng/năm
4. Chọn phòng ban (hoặc tất cả)
5. Hệ thống tự động tính toán

### 4. Kiểm Tra Kết Quả

1. Mở chi tiết bảng lương
2. Kiểm tra từng nhân viên
3. Click **Xem Rule Trace** để debug công thức
4. Điều chỉnh nếu có sai sót

### 5. Snapshot & Chốt

1. Click **Tạo Snapshot** để lưu trạng thái
2. Kiểm tra lần cuối
3. Click **Chốt Kỳ Lương**
4. Sau khi chốt không thể sửa

### 6. Export & Phát Lương

1. Click **Export Ngân Hàng**
2. Chọn format (Vietcombank, BIDV...)
3. Tải file chuyển khoản
4. Export payslip cho nhân viên

## Lưu Ý

- ⚠️ Kiểm tra kỹ trước khi chốt
- ⚠️ Backup dữ liệu định kỳ
- ⚠️ Sử dụng Rule Trace để debug

---
*Tài liệu được sinh tự động bởi KB Pipeline*
`);

  // Snapshot workflow
  workflows.set('03-snapshot', `# Snapshot & Chốt Kỳ Lương

> Workflow: Snapshot  
> Updated: ${new Date().toISOString().split('T')[0]}

## Tổng Quan

Snapshot là bản chụp trạng thái bảng lương tại một thời điểm, dùng để:
- Lưu lại kết quả tính lương
- So sánh các phiên bản
- Audit trail

## Các Trạng Thái

| Trạng thái | Mô tả | Có thể sửa? |
|------------|-------|-------------|
| \`NHAP\` | Đang soạn thảo | ✅ Có |
| \`DA_CHOT\` | Đã chốt | ❌ Không |
| \`DA_KHOA\` | Đã khóa vĩnh viễn | ❌ Không |

## Quy Trình

### 1. Tạo Snapshot

\`\`\`
Bảng lương NHAP → Tạo Snapshot → Snapshot được lưu
\`\`\`

- Snapshot lưu toàn bộ dữ liệu chi tiết
- Có thể tạo nhiều snapshot
- Mỗi snapshot có ID riêng

### 2. Chốt Kỳ Lương

\`\`\`
Bảng lương NHAP → Chốt → Trạng thái = DA_CHOT
\`\`\`

- Sau khi chốt không thể sửa trực tiếp
- Chỉ có thể dùng Adjustment Voucher

### 3. Khóa Kỳ Lương

\`\`\`
Bảng lương DA_CHOT → Khóa → Trạng thái = DA_KHOA
\`\`\`

- Khóa vĩnh viễn, không thể mở lại
- Thường dùng sau khi đã thanh toán

## Adjustment Voucher

Khi cần điều chỉnh sau khi đã chốt:

1. Truy cập bảng lương đã chốt
2. Click **Tạo Adjustment**
3. Chọn nhân viên cần điều chỉnh
4. Nhập giá trị điều chỉnh (+/-)
5. Ghi lý do
6. Xác nhận

## API Endpoints

- \`POST /api/bang-luong/:id/snapshot\` - Tạo snapshot
- \`POST /api/bang-luong/:id/chot\` - Chốt kỳ
- \`POST /api/bang-luong/:id/khoa\` - Khóa kỳ
- \`GET /api/snapshot/:id\` - Xem snapshot

---
*Tài liệu được sinh tự động bởi KB Pipeline*
`);

  return workflows;
}

/**
 * Main execution
 */
async function main() {
  logger.step('GENERATE', 'Starting documentation generation...');
  
  const frontendPath = configLoader.resolvePath(config.sources.frontend);
  const outputPath = configLoader.resolvePath(config.output.docs);
  
  // Ensure output directories
  ensureDir(join(outputPath, 'modules'));
  ensureDir(join(outputPath, 'workflow'));

  // Get all frontend pages
  const pageFiles = await findFiles('pages/**/*.tsx', frontendPath);
  logger.info(`Found ${pageFiles.length} frontend pages`);

  // Extract entities from Prisma
  const entityMap = await extractEntities();
  logger.info(`Found ${entityMap.size} Prisma models`);

  // Analyze pages by module
  const modulePages = new Map<string, PageInfo[]>();

  const progress = new Progress(pageFiles.length, 'Analyzing pages');

  for (const pageFile of pageFiles) {
    const filename = basename(pageFile);
    const content = readFileSafe(pageFile) || '';
    const pageInfo = analyzePageFile(content, filename);
    pageInfo.path = pageFile;

    // Find matching module
    let matchedModule = 'GENERAL';
    for (const mod of modules.modules) {
      if (mod.frontendPages.some(p => filename.includes(p.replace('.tsx', '')))) {
        matchedModule = mod.id;
        break;
      }
    }

    if (!modulePages.has(matchedModule)) {
      modulePages.set(matchedModule, []);
    }
    modulePages.get(matchedModule)!.push(pageInfo);

    progress.tick(filename);
  }

  // Generate module documentation
  logger.step('GENERATE', 'Generating module docs...');
  
  for (const mod of modules.modules) {
    const pages = modulePages.get(mod.id) || [];
    
    // Find related entities
    const relatedEntities: string[] = [];
    for (const entityName of mod.entities) {
      if (entityMap.has(entityName)) {
        relatedEntities.push(entityName);
      }
    }

    const moduleDoc: ModuleDoc = {
      id: mod.id,
      name: mod.name,
      description: mod.description,
      pages,
      entities: relatedEntities,
      workflows: [],
    };

    const markdown = generateModuleDoc(moduleDoc);
    const filename = `${slugify(mod.name)}.md`;
    writeMarkdown(join(outputPath, 'modules', filename), markdown);
    
    logger.success(`Generated: modules/${filename}`);
  }

  // Generate workflow documentation
  logger.step('GENERATE', 'Generating workflow docs...');
  
  const workflows = generateWorkflowDocs();
  for (const [name, content] of workflows) {
    writeMarkdown(join(outputPath, 'workflow', `${name}.md`), content);
    logger.success(`Generated: workflow/${name}.md`);
  }

  // Generate system map
  const systemMap = generateSystemMap(modules.modules);
  writeMarkdown(join(outputPath, 'setup', 'system_map.md'), systemMap);
  logger.success('Generated: setup/system_map.md');

  // Summary
  console.log('\n' + '='.repeat(50));
  logger.info(`Generated ${modules.modules.length} module docs`);
  logger.info(`Generated ${workflows.size} workflow docs`);
  logger.info(`Generated 1 system map`);
}

/**
 * Generate system map document
 */
function generateSystemMap(mods: typeof modules.modules): string {
  return `# System Map - HRM-Lite Payroll

> Updated: ${new Date().toISOString().split('T')[0]}

## Kiến Trúc Hệ Thống

\`\`\`
┌─────────────────────────────────────────────────────┐
│                    Frontend                          │
│                (React + Vite)                        │
├─────────────────────────────────────────────────────┤
│                   Backend API                        │
│                   (NestJS)                           │
├─────────────────────────────────────────────────────┤
│                   Database                           │
│                (PostgreSQL)                          │
└─────────────────────────────────────────────────────┘
\`\`\`

## Các Module

${mods.map(m => `### ${m.name}

- **ID:** \`${m.id}\`
- **Mô tả:** ${m.description}
- **Routes:** ${m.routes.map(r => `\`${r}\``).join(', ')}
- **Entities:** ${m.entities.map(e => `\`${e}\``).join(', ') || 'N/A'}
`).join('\n')}

## Quy Trình Chính

1. **Setup** → Cấu hình ban đầu (phòng ban, chức vụ, khoản lương)
2. **Monthly** → Quy trình tháng (import, chấm công, tính lương)
3. **Snapshot** → Chốt kỳ lương
4. **Export** → Xuất dữ liệu ngân hàng, payslip

## Phân Quyền (RBAC)

| Vai trò | Quyền |
|---------|-------|
| Admin | Toàn quyền hệ thống |
| HR | Quản lý nhân sự, bảng lương |
| Kế toán | Xem bảng lương, export |
| Manager | Duyệt đơn, xem báo cáo |
| Nhân viên | Xem lương cá nhân, tạo đơn |

---
*Tài liệu được sinh tự động bởi KB Pipeline*
`;
}

main().catch(error => {
  logger.error(`Generation failed: ${error}`);
  process.exit(1);
});
