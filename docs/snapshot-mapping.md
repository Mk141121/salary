# 📸 Snapshot Mapping (Chụp dữ liệu kỳ lương)

> **Cập nhật**: 14/01/2026  
> **Phiên bản**: 2.0 - Tích hợp HopDong, NganHang, Nhom

---

## 1. Tổng quan

Snapshot là cơ chế "chụp lại" toàn bộ dữ liệu nhân sự tại thời điểm chốt kỳ lương. Mục đích:
- Đảm bảo bảng lương không thay đổi khi dữ liệu gốc thay đổi
- Lưu lịch sử đầy đủ cho audit
- Tái tính lương với dữ liệu chính xác tại thời điểm đó

---

## 2. Quy tắc chọn "Bản ghi hiệu lực"

Tại ngày `ngayChotSnapshot` (thường là ngày cuối tháng), hệ thống chọn bản ghi thỏa mãn:

```typescript
WHERE tuNgay <= ngayChotSnapshot
  AND (denNgay IS NULL OR denNgay >= ngayChotSnapshot)
```

Áp dụng cho:
- Hợp đồng / Lương
- Phụ cấp nhân viên
- Membership nhóm
- Ngân hàng mặc định

---

## 3. Dữ liệu Snapshot

### 3.1 Snapshot Nhân viên

| Trường | Nguồn | Mô tả |
|--------|-------|-------|
| `nhanVienId` | NhanVien.id | ID nhân viên |
| `maNhanVien` | NhanVien.maNhanVien | Mã nhân viên |
| `hoTen` | NhanVien.hoTen | Họ tên |
| `phongBanId` | NhanVien.phongBanId | Phòng ban |
| `trangThaiNv` | NhanVien.trangThai | Trạng thái |
| `luongCoBan` | **NhanVienHopDong.luongCoBan** | Lương từ hợp đồng hiệu lực |
| `nganHangMacDinh` | NhanVienNganHang (laMacDinh=true) | JSON ngân hàng |
| `danhSachNhom` | NhanVienThuocNhom | JSON danh sách nhóm |

### 3.2 Snapshot Phụ cấp

| Trường | Nguồn | Mô tả |
|--------|-------|-------|
| `nhanVienId` | PhuCapNhanVien.nhanVienId | ID nhân viên |
| `khoanLuongId` | PhuCapNhanVien.khoanLuongId | ID khoản lương |
| `soTien` | PhuCapNhanVien.soTien | Số tiền hiệu lực |
| `tuNgay` | PhuCapNhanVien.tuNgay | Ngày bắt đầu |
| `denNgay` | PhuCapNhanVien.denNgay | Ngày kết thúc |

---

## 4. Logic lấy Lương cơ bản

### 4.1 Service Method

```typescript
// bang-luong.service.ts

async layLuongCoBanTheoNgay(
  nhanVienId: number,
  ngay: Date
): Promise<number> {
  const hopDong = await this.prisma.nhanVienHopDong.findFirst({
    where: {
      nhanVienId,
      trangThai: 'HIEU_LUC',
      tuNgay: { lte: ngay },
      OR: [
        { denNgay: null },
        { denNgay: { gte: ngay } },
      ],
    },
    orderBy: { tuNgay: 'desc' },
  });

  if (!hopDong) {
    console.warn(`⚠️ NV ${nhanVienId} không có hợp đồng hiệu lực tại ${ngay}`);
    return 0;
  }

  return Number(hopDong.luongCoBan);
}
```

### 4.2 Batch Query (hiệu năng)

```typescript
async layLuongCoBanNhieuNhanVien(
  nhanVienIds: number[],
  ngay: Date
): Promise<Map<number, number>> {
  const hopDongs = await this.prisma.nhanVienHopDong.findMany({
    where: {
      nhanVienId: { in: nhanVienIds },
      trangThai: 'HIEU_LUC',
      tuNgay: { lte: ngay },
      OR: [
        { denNgay: null },
        { denNgay: { gte: ngay } },
      ],
    },
    orderBy: { tuNgay: 'desc' },
  });

  const result = new Map<number, number>();
  
  for (const hd of hopDongs) {
    // Chỉ lấy hợp đồng mới nhất cho mỗi nhân viên
    if (!result.has(hd.nhanVienId)) {
      result.set(hd.nhanVienId, Number(hd.luongCoBan));
    }
  }

  return result;
}
```

---

## 5. Logic lấy Ngân hàng mặc định

```typescript
async layNganHangMacDinh(nhanVienId: number): Promise<NganHangInfo | null> {
  const nganHang = await this.prisma.nhanVienNganHang.findFirst({
    where: {
      nhanVienId,
      laMacDinh: true,
    },
  });

  if (!nganHang) return null;

  return {
    tenNganHang: nganHang.tenNganHang,
    soTaiKhoan: maskSoTaiKhoan(nganHang.soTaiKhoan), // Che bớt số TK
    chuTaiKhoan: nganHang.chuTaiKhoan,
  };
}

function maskSoTaiKhoan(stk: string): string {
  if (stk.length <= 4) return stk;
  return '*'.repeat(stk.length - 4) + stk.slice(-4);
}
// "1234567890" → "******7890"
```

---

## 6. Logic lấy Nhóm nhân viên

```typescript
async layNhomHieuLuc(
  nhanVienId: number,
  ngay: Date
): Promise<string[]> {
  const memberships = await this.prisma.nhanVienThuocNhom.findMany({
    where: {
      nhanVienId,
      tuNgay: { lte: ngay },
      OR: [
        { denNgay: null },
        { denNgay: { gte: ngay } },
      ],
    },
    include: {
      nhom: true,
    },
  });

  return memberships.map(m => m.nhom.maNhom);
}
```

---

## 7. Quy trình tạo Snapshot

```
┌─────────────────────────────────────────────────────────┐
│                    TẠO KỲ LƯƠNG                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  1. Xác định ngayChotSnapshot (cuối tháng hoặc custom)  │
│                         ▼                               │
│  2. Lấy danh sách nhân viên DANG_LAM                    │
│                         ▼                               │
│  3. Với mỗi nhân viên:                                  │
│     ├─ Lấy hợp đồng hiệu lực → luongCoBan               │
│     ├─ Lấy ngân hàng mặc định                           │
│     ├─ Lấy danh sách nhóm hiệu lực                      │
│     ├─ Lấy phụ cấp hiệu lực                             │
│     └─ Lưu vào SnapshotNhanVien                         │
│                         ▼                               │
│  4. Chụp các quy chế/rule hiệu lực                      │
│                         ▼                               │
│  5. Hoàn thành snapshot, đánh dấu kỳ lương NHAP         │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## 8. Ví dụ cụ thể

### Scenario

- **Nhân viên**: Nguyễn Văn A (NV001)
- **Ngày snapshot**: 31/01/2026

**Dữ liệu hợp đồng**:
| # | Loại | Từ ngày | Đến ngày | Lương | Trạng thái |
|---|------|---------|----------|-------|------------|
| 1 | Thử việc | 01/06/2024 | 31/08/2024 | 8.000.000 | HET_HAN |
| 2 | 1 năm | 01/09/2024 | 31/08/2025 | 10.000.000 | HET_HAN |
| 3 | Vô thời hạn | 01/09/2025 | null | 12.000.000 | HIEU_LUC |

**Kết quả snapshot**:
```json
{
  "nhanVienId": 1,
  "maNhanVien": "NV001",
  "hoTen": "Nguyễn Văn A",
  "luongCoBan": 12000000,  // Từ hợp đồng #3
  "nganHangMacDinh": {
    "tenNganHang": "VietcomBank",
    "soTaiKhoan": "******7890",
    "chuTaiKhoan": "NGUYEN VAN A"
  }
}
```

### Thay đổi sau snapshot

Nếu ngày 15/02/2026, HR cập nhật lương NV001 lên 15.000.000:
- Kỳ lương tháng 01/2026 **KHÔNG thay đổi** (vẫn là 12.000.000)
- Kỳ lương tháng 02/2026 sẽ tính với 15.000.000

---

## 9. Tích hợp với Rule Engine

Rule Engine đọc `LUONG_CO_BAN` từ snapshot:

```typescript
// Trong RuleEngineService

getGiaTri(bienSo: string, context: RuleContext): number {
  switch (bienSo) {
    case 'LUONG_CO_BAN':
      // Đọc từ snapshot, KHÔNG đọc từ NhanVien trực tiếp
      return context.snapshotNhanVien.luongCoBan;
    
    case 'NGAY_CONG':
      return context.chamCong.ngayCong;
    
    // ... các biến khác
  }
}
```

---

## 10. Bảng Snapshot liên quan

### SnapshotKyLuong
Lưu metadata của snapshot.

### SnapshotNhanVien
Lưu thông tin nhân viên tại thời điểm snapshot.

### SnapshotPhuCap
Lưu phụ cấp hiệu lực tại thời điểm snapshot.

### SnapshotRule
Lưu quy chế/rule áp dụng cho kỳ lương.

---

## 11. Lưu ý quan trọng

⚠️ **Không bao giờ đọc `nhanVien.luongCoBan` trực tiếp trong tính lương**
- Luôn đọc từ snapshot hoặc qua HopDongService

⚠️ **Snapshot là bất biến (immutable)**
- Sau khi tạo, không được sửa đổi
- Muốn thay đổi phải tạo kỳ lương mới

⚠️ **Kiểm tra hợp đồng hiệu lực**
- Log warning nếu nhân viên không có hợp đồng hiệu lực
- Không crash hệ thống, trả về lương = 0

---

## 12. Testing Checklist

- [ ] Thay đổi hợp đồng sau snapshot → kỳ cũ không đổi
- [ ] Thay đổi ngân hàng sau snapshot → kỳ cũ không đổi
- [ ] Thay đổi phụ cấp sau snapshot → kỳ cũ không đổi
- [ ] Nhân viên không có hợp đồng → lương = 0, có warning log
- [ ] Hợp đồng overlap → reject khi tạo
- [ ] Query batch hiệu quả với nhiều nhân viên
