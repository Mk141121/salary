# HƯỚNG DẪN SETUP QUY CHẾ LƯƠNG SẢN LƯỢNG

## 📌 Quy tắc tính lương sản lượng

| Loại | Đơn giá | Giải thích |
|------|---------|------------|
| **Sản phẩm đạt** | +320đ/SP | Mỗi SP đạt được cộng 320đ |
| **Sản phẩm lỗi** | -1,600đ/SP | Mỗi SP lỗi bị trừ = 5 SP đạt × 320đ |

### Công thức tổng quát:
```
Tiền sản lượng = (TONG_SP_DAT - TONG_SP_LOI × 5) × 320
```

---

## 🏗️ Cấu trúc hệ thống Quy chế lương

### 1. Bảng `quy_che` - Quản lý quy chế
```sql
-- Tạo quy chế cho phòng ban
INSERT INTO quy_che (phong_ban_id, ten_quy_che, mo_ta, tu_ngay, trang_thai)
VALUES (
    10,  -- ID phòng Chia hàng
    'Quy chế lương sản lượng Chia hàng',
    'Công thức: (SP đạt - SP lỗi × 5) × 320đ',
    '2025-01-01',
    'HIEU_LUC'
);
```

### 2. Bảng `quy_che_rule` - Các rule trong quy chế
```sql
-- Tạo rule tính sản lượng
INSERT INTO quy_che_rule (
    quy_che_id, khoan_luong_id, ten_rule, loai_rule, cong_thuc_json
) VALUES (
    1,   -- ID quy chế
    31,  -- ID khoản lương SAN_LUONG
    'Tiền sản lượng chia hàng',
    'CONG_THUC',
    '{"bieuThuc": "(TONG_SP_DAT - TONG_SP_LOI * 5) * 320"}'
);
```

### 3. Bảng `bang_luong_quy_che` - Liên kết quy chế với bảng lương
```sql
-- Áp dụng quy chế cho bảng lương
INSERT INTO bang_luong_quy_che (bang_luong_id, quy_che_id, nguoi_ap_dung)
VALUES (17, 2, 'HR Admin');  -- Bảng lương T01/2026 + Quy chế #2
```

---

## 📊 Các biến sử dụng trong công thức

### Biến sản lượng Chia hàng:
| Biến | Mô tả | Nguồn |
|------|-------|-------|
| `TONG_SP_DAT` | Tổng sản phẩm đạt | snapshot_san_luong_chia_hang |
| `TONG_SP_LOI` | Tổng sản phẩm lỗi | snapshot_san_luong_chia_hang |

### Biến sản lượng Giao hàng:
| Biến | Mô tả | Nguồn |
|------|-------|-------|
| `TONG_KHOI_LUONG_THANH_CONG` | Tổng khối lượng (kg) | snapshot_giao_hang |
| `TONG_SO_LAN_TRE_GIO` | Số lần trễ giờ | snapshot_giao_hang |
| `TONG_SO_LAN_KHONG_LAY_PHIEU` | Số lần không lấy phiếu | snapshot_giao_hang |

### Biến lương cơ bản:
| Biến | Mô tả |
|------|-------|
| `LUONG_CO_BAN` | Lương cơ bản từ hợp đồng |
| `CONG_CHUAN` | Số ngày công lý thuyết |
| `CONG_THUC_TE` | Số ngày công thực tế |

---

## 🔧 Các loại rule hỗ trợ

### 1. `CO_DINH` - Số tiền cố định
```json
{
  "soTien": 500000
}
```
Kết quả: Luôn trả về 500,000đ

### 2. `THEO_HE_SO` - Theo hệ số
```json
{
  "base": "LUONG_CO_BAN",
  "heSo": 0.1,
  "congThem": 100000
}
```
Kết quả: `LUONG_CO_BAN × 0.1 + 100,000`

### 3. `BAC_THANG` - Bậc thang điều kiện
```json
{
  "field": "TONG_SP_DAT",
  "bac": [
    { "from": 0, "to": 1000, "soTien": 0 },
    { "from": 1001, "to": 3000, "soTien": 200000 },
    { "from": 3001, "to": 5000, "soTien": 500000 },
    { "from": 5001, "to": 999999, "soTien": 1000000 }
  ]
}
```
Kết quả: Trả về số tiền theo bậc

### 4. `CONG_THUC` - Biểu thức tự do ⭐
```json
{
  "bieuThuc": "(TONG_SP_DAT - TONG_SP_LOI * 5) * 320"
}
```
Kết quả: Tính toán theo biểu thức

---

## 📝 Ví dụ tính toán

### Nhân viên A: 3,500 SP đạt, 100 SP lỗi
```
Tiền = (3500 - 100 × 5) × 320
     = (3500 - 500) × 320
     = 3000 × 320
     = 960,000đ
```

### Nhân viên B: 4,000 SP đạt, 50 SP lỗi
```
Tiền = (4000 - 50 × 5) × 320
     = (4000 - 250) × 320
     = 3750 × 320
     = 1,200,000đ
```

### Nhân viên C: 3,000 SP đạt, 200 SP lỗi
```
Tiền = (3000 - 200 × 5) × 320
     = (3000 - 1000) × 320
     = 2000 × 320
     = 640,000đ
```

---

## 🚀 Cách chạy tính lương

### Bước 1: Import sản lượng
1. Vào **Sản lượng** → **Import Chia hàng**
2. Upload file Excel với cột: Mã NV, Ngày, SP đạt, SP lỗi
3. Hệ thống tự động tổng hợp vào `san_luong_chia_hang`

### Bước 2: Tạo snapshot cho bảng lương
Khi tạo/cập nhật bảng lương, hệ thống tự động:
1. Tổng hợp sản lượng theo tháng
2. Lưu vào `snapshot_san_luong_chia_hang`
3. Liên kết với `bang_luong`

### Bước 3: Chạy Rule Engine
1. Vào **Bảng lương** → Chọn bảng lương
2. Click **Áp dụng quy chế** hoặc tự động khi chốt
3. Hệ thống tính tiền sản lượng cho từng nhân viên

### Bước 4: Xem kết quả
- Cột **Sản lượng** trên bảng lương
- Khoản **SAN_LUONG** trong chi tiết lương

---

## ⚙️ API Endpoints

### Quy chế
```
GET    /api/quy-che                    # Lấy danh sách quy chế
POST   /api/quy-che                    # Tạo quy chế mới
GET    /api/quy-che/:id               # Chi tiết quy chế
PUT    /api/quy-che/:id               # Cập nhật quy chế
DELETE /api/quy-che/:id               # Xóa quy chế
```

### Rules
```
GET    /api/quy-che-rule/quy-che/:quyCheId  # Lấy rules của quy chế
POST   /api/quy-che-rule                     # Tạo rule mới
PUT    /api/quy-che-rule/:id                # Cập nhật rule
POST   /api/quy-che-rule/validate           # Validate rule
POST   /api/quy-che-rule/preview            # Preview kết quả
```

### Rule Engine
```
POST   /api/rule-engine/chay/:bangLuongId   # Chạy tính lương
GET    /api/rule-engine/trace/:bangLuongId  # Xem chi tiết trace
```

---

## 📋 Trạng thái quy chế

| Trạng thái | Mô tả |
|------------|-------|
| `NHAP` | Đang soạn thảo, chưa áp dụng |
| `HIEU_LUC` | Đang sử dụng |
| `TAM_DUNG` | Tạm ngừng |
| `NGUNG` | Đã ngừng hoàn toàn |

---

## ✅ Kiểm tra trước khi chạy

1. **Có snapshot sản lượng?**
```sql
SELECT COUNT(*) FROM snapshot_san_luong_chia_hang 
WHERE bang_luong_id = 17;
```

2. **Quy chế đã liên kết?**
```sql
SELECT * FROM bang_luong_quy_che 
WHERE bang_luong_id = 17;
```

3. **Rule hợp lệ?**
```sql
SELECT * FROM quy_che_rule 
WHERE quy_che_id = 2 AND trang_thai = true;
```

---

## 📞 Hỗ trợ

Nếu gặp vấn đề:
1. Kiểm tra log backend: `docker logs hrm-lite-backend-v2`
2. Kiểm tra trace: `GET /api/rule-engine/trace/:bangLuongId`
3. Xem lịch sử: `GET /api/bang-luong/:id/lich-su`
