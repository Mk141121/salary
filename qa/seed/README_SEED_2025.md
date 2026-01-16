# SEED DATA PAYROLL 2025 (06→12/2025)

## Mô tả
Script seed tạo dữ liệu demo/test đầy đủ cho hệ thống Payroll với 7 kỳ lương từ 06/2025 đến 12/2025.

## Đặc điểm
- ✅ **Giữ nguyên dữ liệu hiện có**: Không xóa/sửa Phòng ban và Nhân viên
- ✅ **Idempotent**: Chạy nhiều lần không tạo trùng lặp
- ✅ **Đầy đủ module**: Hợp đồng, Phụ cấp, Chấm công, KPI, Sản lượng, Bảng lương, Phiếu điều chỉnh

## Cấu hình yêu cầu

### Environment
```bash
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/tinh_luong"
```

### Dependencies
Script sử dụng Prisma Client từ backend project.

## Cách chạy

### Option 1: Chạy từ thư mục backend
```bash
cd backend

# Chạy seed script
npx ts-node ../qa/seed/seed_payroll_full_2025.ts
```

### Option 2: Chạy trong Docker
```bash
# Copy script vào container
docker cp qa/seed/seed_payroll_full_2025.ts tinh-luong-backend:/app/

# Chạy trong container
docker exec -it tinh-luong-backend npx ts-node seed_payroll_full_2025.ts
```

## Dữ liệu được tạo

### Theo tháng (06→12/2025)
| Tháng | Trạng thái | Mô tả |
|-------|------------|-------|
| 06/2025 | KHOA | Lịch sử đã khóa |
| 07/2025 | KHOA | Lịch sử đã khóa |
| 08/2025 | KHOA | Lịch sử đã khóa |
| 09/2025 | KHOA | Lịch sử đã khóa |
| 10/2025 | KHOA | Lịch sử đã khóa |
| 11/2025 | DA_CHOT | Đã chốt, chờ khóa |
| 12/2025 | NHAP | Kỳ đang làm |

### Theo module
1. **Hợp đồng**: Mỗi NV 1 hợp đồng hiệu lực
2. **Phụ cấp**: Mỗi NV 1-3 khoản phụ cấp
3. **Chấm công**: 
   - 70% NV đủ công
   - 20% NV thiếu 1-2 ngày
   - 10% NV nghỉ nhiều
4. **KPI**: Phân phối điểm theo tỷ lệ thực tế
5. **Sản lượng chia hàng**: Cho NV phòng Chia hàng
6. **Giao hàng**: Cho NV phòng Giao hàng
7. **Phiếu điều chỉnh**: 2-4 phiếu/tháng

## Phân loại phòng ban
Script tự động phân loại NV theo phòng ban:
- **Chia hàng**: Phòng có mã/tên chứa "CHIA", "CH"
- **Giao hàng**: Phòng có mã/tên chứa "GIAO", "SHIP", "GIAO_HANG"
- **Văn phòng**: Các phòng còn lại

## Lưu ý quan trọng
⚠️ **KHÔNG chạy trên môi trường PRODUCTION!**

Script này chỉ dùng cho:
- Development local
- Staging environment
- Demo/Testing

## Xác minh sau khi seed
1. Vào trang **Bảng lương** → Kiểm tra có 7 kỳ 2025
2. Chọn kỳ **12/2025** (NHAP) → Có thể chỉnh sửa
3. Chọn kỳ **10/2025** (KHOA) → Chỉ xem, không sửa được
4. Kiểm tra **Phiếu điều chỉnh** → Có các phiếu mẫu

## Reset dữ liệu (nếu cần)
```sql
-- Xóa dữ liệu seed 2025 (CẢNH BÁO: Mất dữ liệu!)
DELETE FROM chi_tiet_phieu_dieu_chinh WHERE phieu_dieu_chinh_id IN (SELECT id FROM phieu_dieu_chinh WHERE ghi_chu LIKE '%Seed%');
DELETE FROM phieu_dieu_chinh WHERE ghi_chu LIKE '%Seed%';
DELETE FROM snapshot_bang_luong WHERE ghi_chu LIKE '%Seed%';
DELETE FROM chi_tiet_bang_luong WHERE ghi_chu LIKE '%Seed%';
DELETE FROM bang_luong WHERE ghi_chu LIKE '%Seed%';
DELETE FROM danh_gia_kpi_nhan_vien WHERE ghi_chu LIKE '%Seed%';
DELETE FROM ky_danh_gia_kpi WHERE mo_ta LIKE '%Seed%';
DELETE FROM giao_hang WHERE ghi_chu LIKE '%Seed%';
DELETE FROM san_luong_chia_hang WHERE ghi_chu LIKE '%Seed%';
DELETE FROM cham_cong WHERE ghi_chu LIKE '%Seed%';
DELETE FROM phu_cap_nhan_vien WHERE ghi_chu LIKE '%Seed%';
DELETE FROM nhan_vien_hop_dong WHERE ghi_chu LIKE '%Seed%';
```

## Báo cáo
Sau khi chạy, xem file `seed_report_2025.md` để kiểm tra kết quả.
