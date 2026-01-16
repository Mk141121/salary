# SEED DATA REPORT 2025

**Ngày tạo:** 16/01/2025
**Scripts:** 
- `qa/seed/seed_payroll_2025.sql` - Seed chính
- `qa/seed/seed_payroll_2025_extra.sql` - Seed bổ sung (ứng lương, nhóm NV, ngân hàng)

## 📊 Tổng quan dữ liệu

| Module | Số lượng | Ghi chú |
|--------|----------|---------|
| Nhân viên đang làm | 33 | Giữ nguyên dữ liệu gốc |
| Hợp đồng hiệu lực | 33 | 100% NV đang làm có HĐ |
| Phụ cấp hiệu lực | 99 | ~3 phụ cấp/NV (xăng xe, chuyên cần, ăn ca) |
| **Nhóm nhân viên** | **4** | Chia hàng, Giao hàng, Văn phòng, Quản lý |
| **NV thuộc nhóm** | **28** | NV được gán vào các nhóm |
| **TK ngân hàng NV** | **33** | 100% NV có tài khoản ngân hàng |
| Chấm công 2025 | 231 | 7 tháng × 33 NV |
| Sản lượng chia hàng | 1,848 | ~26 ngày/tháng × 7 tháng × NV chia hàng |
| Giao hàng | 1,008 | ~26 ngày/tháng × 7 tháng × NV giao hàng |
| Bảng lương 2025 | 84 | 7 tháng × 12 phòng ban |
| Chi tiết bảng lương | 242 | Lương cơ bản cho mỗi NV |
| Snapshot bảng lương | 209 | Cho các bảng lương đã khóa |
| **Bảng ứng lương** | **84** | 7 tháng × 12 phòng ban |
| **Chi tiết ứng lương** | **231** | Mỗi NV có 1 record/tháng |
| Kỳ đánh giá KPI | 7 | 7 kỳ (T06-T12/2025) |
| Đánh giá KPI NV | 231 | 7 kỳ × 33 NV |
| Phiếu điều chỉnh | 20 | 2-3 phiếu/tháng |

## 📅 Bảng lương theo tháng

| Tháng | Trạng thái | Số bảng lương |
|-------|------------|---------------|
| 06/2025 | KHOA | 12 |
| 07/2025 | KHOA | 12 |
| 08/2025 | KHOA | 12 |
| 09/2025 | KHOA | 12 |
| 10/2025 | KHOA | 12 |
| 11/2025 | DA_CHOT | 12 |
| 12/2025 | NHAP | 12 |

## 🔄 Kỳ đánh giá KPI

| Kỳ | Trạng thái | Mô tả |
|----|------------|-------|
| KPI202506 | DONG | Tháng 6/2025 - Đã đóng |
| KPI202507 | DONG | Tháng 7/2025 - Đã đóng |
| KPI202508 | DONG | Tháng 8/2025 - Đã đóng |
| KPI202509 | DONG | Tháng 9/2025 - Đã đóng |
| KPI202510 | DONG | Tháng 10/2025 - Đã đóng |
| KPI202511 | DONG | Tháng 11/2025 - Đã đóng |
| KPI202512 | MO | Tháng 12/2025 - Đang mở |

## 📈 Phân bố dữ liệu

### Chấm công
- **70%** NV: Đủ công 26 ngày
- **20%** NV: Nghỉ phép 1-2 ngày
- **10%** NV: Nghỉ phép + nghỉ không lương

### Đánh giá KPI
- **~20%**: Xuất sắc (90-100 điểm)
- **~30%**: Tốt (80-89 điểm)
- **~25%**: Khá (70-79 điểm)
- **~15%**: Trung bình
- **~10%**: Yếu

### Phiếu điều chỉnh
- **~70%**: Tăng (thưởng)
- **~30%**: Giảm (phạt/khấu trừ)
- Trạng thái: Tháng 6-10 = DA_DUYET, Tháng 11-12 = CHO_DUYET

## 🔧 Hướng dẫn chạy lại

```bash
# Chạy seed chính (idempotent - có thể chạy nhiều lần)
docker exec -i tinh-luong-db psql -U postgres -d tinh_luong < qa/seed/seed_payroll_2025.sql

# Chạy seed bổ sung (ứng lương, nhóm NV, ngân hàng)
docker exec -i tinh-luong-db psql -U postgres -d tinh_luong < qa/seed/seed_payroll_2025_extra.sql

# Xóa dữ liệu seed để chạy lại từ đầu (nếu cần)
docker exec tinh-luong-db psql -U postgres -d tinh_luong -c "
DELETE FROM chi_tiet_phieu_dieu_chinh;
DELETE FROM phieu_dieu_chinh WHERE ma_phieu LIKE 'PDC2025%';
DELETE FROM danh_gia_kpi_nhan_vien WHERE ky_danh_gia_id IN (SELECT id FROM ky_danh_gia_kpi WHERE ma_ky LIKE 'KPI2025%');
DELETE FROM ky_danh_gia_kpi WHERE ma_ky LIKE 'KPI2025%';
DELETE FROM snapshot_bang_luong WHERE bang_luong_id IN (SELECT id FROM bang_luong WHERE nam = 2025);
DELETE FROM chi_tiet_bang_luong WHERE bang_luong_id IN (SELECT id FROM bang_luong WHERE nam = 2025);
DELETE FROM bang_luong WHERE nam = 2025;
DELETE FROM chi_tiet_bang_ung_luong;
DELETE FROM bang_ung_luong;
DELETE FROM giao_hang WHERE EXTRACT(YEAR FROM ngay) = 2025;
DELETE FROM san_luong_chia_hang WHERE EXTRACT(YEAR FROM ngay) = 2025;
DELETE FROM cham_cong WHERE nam = 2025;
DELETE FROM phu_cap_nhan_vien WHERE ghi_chu = 'Seed data 2025';
DELETE FROM nhan_vien_hop_dong WHERE ghi_chu = 'Seed data 2025';
DELETE FROM nhan_vien_ngan_hang;
DELETE FROM nhan_vien_thuoc_nhom;
DELETE FROM nhom_nhan_vien;
DELETE FROM template_kpi WHERE ma_template = 'TPL_DEFAULT';
"
```

## ✅ Kiểm tra dữ liệu

```bash
# Tổng quan
docker exec tinh-luong-db psql -U postgres -d tinh_luong -c "
SELECT 'Nhân viên' AS module, COUNT(*) FROM nhan_vien WHERE trang_thai = 'DANG_LAM'
UNION ALL SELECT 'Hợp đồng', COUNT(*) FROM nhan_vien_hop_dong WHERE trang_thai = 'HIEU_LUC'
UNION ALL SELECT 'Chấm công', COUNT(*) FROM cham_cong WHERE nam = 2025
UNION ALL SELECT 'Bảng lương', COUNT(*) FROM bang_luong WHERE nam = 2025
UNION ALL SELECT 'KPI', COUNT(*) FROM ky_danh_gia_kpi WHERE ma_ky LIKE 'KPI2025%';
"
```

---

**Status:** ✅ COMPLETED
