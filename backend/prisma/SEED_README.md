# SEED DATA MANAGEMENT

## 📁 Cấu trúc hiện tại

```
backend/prisma/
├── seed-master.ts      # Script seed chính - sử dụng cho production
├── seed-data.json      # Data JSON cho seed-master.ts (38 NV, 11 PB, etc.)
└── schema.prisma       # Database schema

backup/
├── backup_seed_20260120_150545.sql  # Backup full database (pg_dump)
└── old_seeds/          # Các file seed cũ (không còn sử dụng)
    ├── seed.sql
    ├── seed.ts
    ├── seed-xep-ca.sql
    ├── seed-docker-v2.sql
    ├── seed-docker-v2.ts
    ├── seed-remaining.sql
    ├── generate-seed-v2.js
    ├── generate-seed-v2-fixed.js
    └── seed-data.json.bak
```

## 🚀 Cách sử dụng

### 1. Reset và Seed Database (Docker)

```bash
# Vào container backend
docker exec -it tinh-luong-backend sh

# Reset schema và seed data
npx prisma db push --force-reset
npx ts-node prisma/seed-master.ts
```

### 2. Restore từ Backup SQL

Nếu cần restore toàn bộ data từ backup:

```bash
# Copy backup vào container
docker cp backup/backup_seed_20260120_150545.sql tinh-luong-db:/tmp/

# Restore
docker exec tinh-luong-db psql -U postgres -d tinh_luong -f /tmp/backup_seed_20260120_150545.sql
```

## 📋 Nội dung Seed-Master

| Entity | Số lượng | Ghi chú |
|--------|---------|---------|
| Phòng Ban | 11 | BOD, KT, NS, KD, KV, TM, DH, MKT, CH, GH, VP |
| Nhân Viên | 38 | NV0001 - NV0039 (có gap NV0031) |
| Khoản Lương | 23 | Thu nhập + Khấu trừ |
| Cấu hình Đơn giá | 5 | DON_GIA_SP, DON_GIA_KHOI_LUONG, etc. |
| Vai Trò | 4 | ADMIN, HR, MANAGER, EMPLOYEE |
| Quy Chế | 2 | KPI Chia hàng, KPI Giao hàng |
| Quy Chế Rule | 3 | TIEN_SAN_LUONG_CH, TIEN_SAN_LUONG_GH, PHAT_SP_LOI |
| Sản Lượng Chia hàng | ~200+ | Tự generate random cho T1/2026 |
| Giao Hàng | ~120+ | Tự generate random cho T1/2026 |

## ⚙️ Cấu hình Đơn giá

| Mã biến | Giá trị | Mô tả |
|---------|---------|-------|
| DON_GIA_SP | 320 VND | Thưởng cho mỗi sản phẩm đạt |
| DON_GIA_KHOI_LUONG | 500 VND | Thưởng cho mỗi kg giao thành công |
| DON_GIA_PHAT_TRE | 50,000 VND | Phạt mỗi lần trễ giờ |
| HE_SO_LOI_SP | 5 lần | Hệ số nhân phạt SP lỗi |
| DON_GIA_PHAT_PHIEU | 50,000 VND | Phạt không lấy phiếu giao hàng |

## 🔄 Công thức Quy Chế

### Chia hàng
- **TIEN_SAN_LUONG_CH** = `TONG_SP_DAT * DON_GIA_SP`
- **PHAT_SP_LOI** = `TONG_SP_LOI * DON_GIA_SP * HE_SO_LOI_SP`

### Giao hàng
- **TIEN_SAN_LUONG_GH** = `TONG_KHOI_LUONG_THANH_CONG * DON_GIA_KHOI_LUONG`

## 📅 Cập nhật

- **2026-01-20**: Tạo seed-master.ts thống nhất, cleanup old seeds
- **Backup**: Full database dump tại thời điểm cleanup

## ⚠️ Lưu ý

1. Không xóa thư mục `backup/` - chứa backup data cũ
2. Seed-master.ts sẽ **XÓA TOÀN BỘ DATA** trước khi seed mới
3. Sản lượng data được generate random - mỗi lần seed sẽ khác
4. User admin mặc định: `admin` / `admin123`
