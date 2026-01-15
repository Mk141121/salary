# 🔄 Hướng dẫn Migration Dữ liệu (Migration Guide)

> **Cập nhật**: 14/01/2026  
> **Phiên bản**: 1.0

---

## 1. Tổng quan

Hướng dẫn này mô tả quy trình migration dữ liệu từ mô hình cũ (lương cơ bản trong bảng `NhanVien`) sang mô hình mới (lương trong bảng `NhanVienHopDong`).

---

## 2. Trước Migration

### 2.1 Mô hình cũ
```
NhanVien
├── id
├── maNhanVien
├── hoTen
├── luongCoBan  ◄── Lương lưu trực tiếp
├── phongBanId
└── ...
```

### 2.2 Mô hình mới
```
NhanVien                    NhanVienHopDong
├── id ─────────────────┐   ├── id
├── maNhanVien          │   ├── nhanVienId ◄────┘
├── hoTen               │   ├── loaiHopDong
├── phongBanId          │   ├── tuNgay
└── ...                 │   ├── denNgay
                        │   ├── luongCoBan ◄── Lương theo hợp đồng
                        │   └── trangThai
```

---

## 3. Script Migration

### 3.1 Vị trí file

```
backend/
└── scripts/
    └── migrate-hop-dong.ts
```

### 3.2 Cách chạy

```bash
# Chạy dry-run (không thay đổi dữ liệu)
npx ts-node scripts/migrate-hop-dong.ts --dry-run

# Chạy thật (apply changes)
npx ts-node scripts/migrate-hop-dong.ts --apply

# Export report
npx ts-node scripts/migrate-hop-dong.ts --apply --report
```

### 3.3 Nội dung script

```typescript
// scripts/migrate-hop-dong.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface MigrationResult {
  success: number;
  skipped: number;
  errors: Array<{ maNhanVien: string; error: string }>;
}

async function migrate(dryRun: boolean = true): Promise<MigrationResult> {
  const result: MigrationResult = {
    success: 0,
    skipped: 0,
    errors: [],
  };

  console.log(`\n🔄 Bắt đầu migration... (${dryRun ? 'DRY-RUN' : 'APPLY'})\n`);

  // Lấy tất cả nhân viên có luongCoBan
  const nhanViens = await prisma.nhanVien.findMany({
    where: {
      luongCoBan: { not: null },
    },
    include: {
      hopDongs: true,
    },
  });

  console.log(`📋 Tìm thấy ${nhanViens.length} nhân viên cần migrate\n`);

  for (const nv of nhanViens) {
    // Kiểm tra đã có hợp đồng chưa
    if (nv.hopDongs && nv.hopDongs.length > 0) {
      console.log(`⏭️  Skip ${nv.maNhanVien} - Đã có ${nv.hopDongs.length} hợp đồng`);
      result.skipped++;
      continue;
    }

    // Xác định ngày bắt đầu
    const tuNgay = nv.ngayVaoLam || new Date('2000-01-01');
    const luongCoBan = nv.luongCoBan || 0;

    if (!dryRun) {
      try {
        await prisma.nhanVienHopDong.create({
          data: {
            nhanVienId: nv.id,
            loaiHopDong: 'VO_THOI_HAN',
            tuNgay,
            denNgay: null,
            luongCoBan,
            trangThai: 'HIEU_LUC',
            ghiChu: `Migration tự động từ luongCoBan cũ (${new Date().toISOString()})`,
          },
        });
        console.log(`✅ Migrate ${nv.maNhanVien}: ${luongCoBan.toLocaleString()} VND`);
        result.success++;
      } catch (error: any) {
        console.log(`❌ Lỗi ${nv.maNhanVien}: ${error.message}`);
        result.errors.push({ maNhanVien: nv.maNhanVien, error: error.message });
      }
    } else {
      console.log(`🔍 [DRY-RUN] ${nv.maNhanVien}: ${luongCoBan.toLocaleString()} VND → từ ${tuNgay.toISOString().split('T')[0]}`);
      result.success++;
    }
  }

  return result;
}

// Main execution
async function main() {
  const args = process.argv.slice(2);
  const dryRun = !args.includes('--apply');
  const exportReport = args.includes('--report');

  const result = await migrate(dryRun);

  console.log('\n📊 KẾT QUẢ MIGRATION:');
  console.log('─'.repeat(40));
  console.log(`✅ Thành công: ${result.success}`);
  console.log(`⏭️  Bỏ qua:    ${result.skipped}`);
  console.log(`❌ Lỗi:       ${result.errors.length}`);

  if (result.errors.length > 0) {
    console.log('\n⚠️  CHI TIẾT LỖI:');
    result.errors.forEach((e) => {
      console.log(`   - ${e.maNhanVien}: ${e.error}`);
    });
  }

  if (exportReport) {
    const fs = require('fs');
    const report = {
      timestamp: new Date().toISOString(),
      mode: dryRun ? 'DRY-RUN' : 'APPLY',
      ...result,
    };
    fs.writeFileSync('migration-report.json', JSON.stringify(report, null, 2));
    console.log('\n📄 Report exported: migration-report.json');
  }

  await prisma.$disconnect();
}

main().catch(console.error);
```

---

## 4. Các bước Migration

### Bước 1: Backup dữ liệu

```bash
# Backup database trước khi migration
docker exec tinh-luong-db pg_dump -U postgres tinh_luong > backup_before_migration.sql
```

### Bước 2: Chạy Prisma Migration (schema)

```bash
cd backend
npx prisma migrate dev --name add_hop_dong_tables
```

### Bước 3: Dry-run

```bash
npx ts-node scripts/migrate-hop-dong.ts --dry-run
```

Kiểm tra output, đảm bảo:
- Số lượng nhân viên cần migrate đúng
- Không có lỗi unexpected

### Bước 4: Apply Migration

```bash
npx ts-node scripts/migrate-hop-dong.ts --apply --report
```

### Bước 5: Verify

```bash
# Kiểm tra số hợp đồng đã tạo
npx prisma studio

# Hoặc query trực tiếp
docker exec -it tinh-luong-db psql -U postgres tinh_luong -c \
  "SELECT COUNT(*) FROM nhan_vien_hop_dong"
```

### Bước 6: Update Code

Đảm bảo tất cả code đọc `luongCoBan` từ `NhanVienHopDong`:

```typescript
// ❌ Cũ - KHÔNG DÙNG
const luong = nhanVien.luongCoBan;

// ✅ Mới - SỬ DỤNG
const luong = await hopDongService.layLuongHieuLuc(nhanVienId, ngay);
```

---

## 5. Rollback Plan

Nếu cần rollback:

### Option A: Restore từ backup
```bash
docker exec -i tinh-luong-db psql -U postgres tinh_luong < backup_before_migration.sql
```

### Option B: Xóa dữ liệu migration
```sql
-- Xóa tất cả hợp đồng được tạo bởi migration
DELETE FROM nhan_vien_hop_dong 
WHERE ghi_chu LIKE 'Migration tự động%';
```

---

## 6. Post-Migration Checklist

- [ ] Tất cả nhân viên đang làm việc có ít nhất 1 hợp đồng HIEU_LUC
- [ ] Lương cơ bản trong hợp đồng khớp với lương cũ
- [ ] BangLuongService đọc lương từ HopDong
- [ ] Snapshot kỳ lương hoạt động đúng
- [ ] UI hiển thị tab Hợp đồng/Lương
- [ ] Không còn code đọc `nhanVien.luongCoBan` trực tiếp

---

## 7. Idempotency

Script migration được thiết kế **idempotent**:
- Chạy nhiều lần cho kết quả như nhau
- Không tạo duplicate hợp đồng
- Skip nhân viên đã có hợp đồng

```bash
# Chạy lần 1
npx ts-node scripts/migrate-hop-dong.ts --apply
# Output: ✅ Thành công: 38

# Chạy lần 2
npx ts-node scripts/migrate-hop-dong.ts --apply
# Output: ⏭️ Bỏ qua: 38, ✅ Thành công: 0
```

---

## 8. Troubleshooting

### Lỗi: "Không tìm thấy nhân viên"
- Kiểm tra filter `luongCoBan: { not: null }`
- Một số nhân viên có thể có `luongCoBan = null`

### Lỗi: "Duplicate hợp đồng"
- Kiểm tra logic skip khi đã có hợp đồng
- Có thể do chạy song song nhiều instance

### Lỗi: "Invalid date"
- Kiểm tra `ngayVaoLam` của nhân viên
- Script sử dụng fallback `2000-01-01`

---

## 9. Kết quả Migration (14/01/2026)

```
📊 KẾT QUẢ MIGRATION:
────────────────────────────────────────
✅ Thành công: 38
⏭️  Bỏ qua:    0
❌ Lỗi:       0

📌 Tất cả 38 nhân viên đã được migrate thành công
```
