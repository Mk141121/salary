-- Seed data cho Module Xếp Ca (Scheduling) - Phase 2
-- Chạy sau khi migration thành công

-- =============================================
-- 1. DANH MỤC CA LÀM VIỆC
-- =============================================

INSERT INTO "ca_lam_viec" (
  "ma_ca", "ten_ca", "gio_vao", "gio_ra", 
  "nghi_giua_ca_phut", "grace_in_phut", "grace_late_phut",
  "is_ca_dem", "phong_ban_id", "mo_ta", "mau_hien_thi", "trang_thai",
  "ngay_tao", "ngay_cap_nhat"
) VALUES 
-- Ca hành chính
('CA_HANH_CHINH', 'Ca hành chính', '08:00', '17:00', 60, 5, 5, false, NULL, 
 'Ca làm việc văn phòng tiêu chuẩn', '#3B82F6', true, NOW(), NOW()),

-- Ca sáng
('CA_SANG', 'Ca sáng', '06:00', '14:00', 30, 5, 5, false, NULL, 
 'Ca sáng kho/sản xuất', '#10B981', true, NOW(), NOW()),

-- Ca chiều
('CA_CHIEU', 'Ca chiều', '14:00', '22:00', 30, 5, 5, false, NULL, 
 'Ca chiều kho/sản xuất', '#F59E0B', true, NOW(), NOW()),

-- Ca đêm
('CA_DEM', 'Ca đêm', '22:00', '06:00', 30, 5, 5, true, NULL, 
 'Ca đêm (qua ngày)', '#8B5CF6', true, NOW(), NOW()),

-- Ca giao hàng
('CA_GIAO_HANG', 'Ca giao hàng', '07:00', '19:00', 60, 10, 10, false, NULL, 
 'Ca giao hàng linh hoạt', '#EC4899', true, NOW(), NOW()),

-- Ca bán thời gian sáng
('CA_PART_SANG', 'Ca bán thời gian sáng', '08:00', '12:00', 0, 5, 5, false, NULL, 
 'Ca part-time buổi sáng', '#06B6D4', true, NOW(), NOW()),

-- Ca bán thời gian chiều
('CA_PART_CHIEU', 'Ca bán thời gian chiều', '13:00', '17:00', 0, 5, 5, false, NULL, 
 'Ca part-time buổi chiều', '#84CC16', true, NOW(), NOW());

-- =============================================
-- 2. LỊCH PHÂN CA MẪU (Tháng 01/2026)
-- =============================================

-- Tạo lịch phân ca cho tháng 01/2026
INSERT INTO "lich_phan_ca" (
  "thang_nam", "phong_ban_id", "nhom_id", "ten_lich", "ghi_chu", 
  "trang_thai", "ngay_tao", "ngay_cap_nhat"
)
SELECT 
  '2026-01',
  id,
  NULL,
  'Lịch phân ca tháng 01/2026 - ' || "ten_phong_ban",
  'Lịch phân ca tự động tạo',
  'NHAP',
  NOW(),
  NOW()
FROM "phong_ban"
WHERE "trang_thai" = 'HOAT_DONG'
LIMIT 3;

-- =============================================
-- 3. CHI TIẾT PHÂN CA MẪU
-- =============================================

-- Phân ca hành chính cho nhân viên từ T2-T6 trong tuần đầu tháng 01/2026
-- (Sẽ được thực hiện qua API assign-batch khi test)

-- =============================================
-- 4. CẬP NHẬT PERMISSIONS CHO MODULE XẾP CA
-- =============================================

-- Thêm permissions mới nếu chưa có
INSERT INTO "quyen" ("ma_quyen", "ten_quyen", "mo_ta", "nhom_quyen", "ngay_tao")
VALUES 
  ('CA_LAM_VIEC_VIEW', 'Xem ca làm việc', 'Quyền xem danh mục ca làm việc', 'XEP_CA', NOW()),
  ('CA_LAM_VIEC_MANAGE', 'Quản lý ca làm việc', 'Quyền thêm/sửa/xóa ca làm việc', 'XEP_CA', NOW()),
  ('PHAN_CA_VIEW', 'Xem lịch phân ca', 'Quyền xem lịch phân ca', 'XEP_CA', NOW()),
  ('PHAN_CA_MANAGE', 'Quản lý lịch phân ca', 'Quyền tạo/sửa lịch phân ca', 'XEP_CA', NOW()),
  ('PHAN_CA_PUBLISH', 'Công bố lịch phân ca', 'Quyền publish lịch phân ca', 'XEP_CA', NOW()),
  ('LICH_LAM_VIEC_MY_VIEW', 'Xem lịch làm của tôi', 'Nhân viên xem lịch cá nhân', 'XEP_CA', NOW())
ON CONFLICT ("ma_quyen") DO NOTHING;

-- Gán quyền xếp ca cho vai trò ADMIN và HR
INSERT INTO "vai_tro_quyen" ("vai_tro_id", "quyen_id")
SELECT vt.id, q.id
FROM "vai_tro" vt
CROSS JOIN "quyen" q
WHERE vt."ma_vai_tro" IN ('ADMIN', 'HR')
  AND q."ma_quyen" IN (
    'CA_LAM_VIEC_VIEW', 'CA_LAM_VIEC_MANAGE',
    'PHAN_CA_VIEW', 'PHAN_CA_MANAGE', 'PHAN_CA_PUBLISH',
    'LICH_LAM_VIEC_MY_VIEW'
  )
ON CONFLICT DO NOTHING;

-- Gán quyền xem cho vai trò EMPLOYEE
INSERT INTO "vai_tro_quyen" ("vai_tro_id", "quyen_id")
SELECT vt.id, q.id
FROM "vai_tro" vt
CROSS JOIN "quyen" q
WHERE vt."ma_vai_tro" = 'EMPLOYEE'
  AND q."ma_quyen" IN ('LICH_LAM_VIEC_MY_VIEW', 'PHAN_CA_VIEW')
ON CONFLICT DO NOTHING;

-- =============================================
-- DONE: Module Xếp Ca Seed Data
-- =============================================
