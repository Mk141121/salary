-- =====================================================
-- SEED DATA: BẢNG ỨNG LƯƠNG (Salary Advance)
-- =====================================================
-- Mục đích: Tạo dữ liệu test liên kết khấu trừ với bảng lương
-- Tháng: 06/2025 → 01/2026 (tương ứng bảng lương)
-- Chạy: docker exec -i hrm-lite-db-v2 psql -U hrmlite -d hrm_lite < qa/seed/seed_ung_luong_full.sql
-- =====================================================

BEGIN;

-- =====================================================
-- 1. TẠO BẢNG ỨNG LƯƠNG HEADER (mỗi phòng ban mỗi tháng)
-- =====================================================

-- T06/2025 - Ứng lương đầu tháng (ngày 1-15)
INSERT INTO bang_ung_luong (ma_bang_ung_luong, thang_nam, tu_ngay, den_ngay, ngay_chi_tra, phong_ban_id, trang_thai, cau_hinh_json, nguoi_tao, ngay_tao, ngay_cap_nhat)
SELECT 
  'UL-202506-' || LPAD(pb.id::text, 2, '0'),
  '2025-06',
  '2025-06-01'::date,
  '2025-06-15'::date,
  '2025-06-16'::date,
  pb.id,
  'DA_CHOT'::trang_thai_bang_ung_luong,
  '{"tyLeToiDa": 70, "soNgayToiThieu": 10, "choPhepNghiKhongPhep": false}'::text,
  'admin',
  '2025-06-15 08:00:00',
  NOW()
FROM phong_ban pb
WHERE pb.id IN (25, 28, 29, 30, 31, 33, 34, 35)
  AND NOT EXISTS (SELECT 1 FROM bang_ung_luong WHERE thang_nam = '2025-06' AND phong_ban_id = pb.id);

-- T07/2025
INSERT INTO bang_ung_luong (ma_bang_ung_luong, thang_nam, tu_ngay, den_ngay, ngay_chi_tra, phong_ban_id, trang_thai, cau_hinh_json, nguoi_tao, ngay_tao, ngay_cap_nhat)
SELECT 
  'UL-202507-' || LPAD(pb.id::text, 2, '0'),
  '2025-07',
  '2025-07-01'::date,
  '2025-07-15'::date,
  '2025-07-16'::date,
  pb.id,
  'DA_CHOT'::trang_thai_bang_ung_luong,
  '{"tyLeToiDa": 70, "soNgayToiThieu": 10, "choPhepNghiKhongPhep": false}'::text,
  'admin',
  '2025-07-15 08:00:00',
  NOW()
FROM phong_ban pb
WHERE pb.id IN (25, 28, 29, 30, 31, 33, 34, 35)
  AND NOT EXISTS (SELECT 1 FROM bang_ung_luong WHERE thang_nam = '2025-07' AND phong_ban_id = pb.id);

-- T08/2025
INSERT INTO bang_ung_luong (ma_bang_ung_luong, thang_nam, tu_ngay, den_ngay, ngay_chi_tra, phong_ban_id, trang_thai, cau_hinh_json, nguoi_tao, ngay_tao, ngay_cap_nhat)
SELECT 
  'UL-202508-' || LPAD(pb.id::text, 2, '0'),
  '2025-08',
  '2025-08-01'::date,
  '2025-08-15'::date,
  '2025-08-16'::date,
  pb.id,
  'DA_CHOT'::trang_thai_bang_ung_luong,
  '{"tyLeToiDa": 70, "soNgayToiThieu": 10, "choPhepNghiKhongPhep": false}'::text,
  'admin',
  '2025-08-15 08:00:00',
  NOW()
FROM phong_ban pb
WHERE pb.id IN (25, 28, 29, 30, 31, 33, 34, 35)
  AND NOT EXISTS (SELECT 1 FROM bang_ung_luong WHERE thang_nam = '2025-08' AND phong_ban_id = pb.id);

-- T09/2025
INSERT INTO bang_ung_luong (ma_bang_ung_luong, thang_nam, tu_ngay, den_ngay, ngay_chi_tra, phong_ban_id, trang_thai, cau_hinh_json, nguoi_tao, ngay_tao, ngay_cap_nhat)
SELECT 
  'UL-202509-' || LPAD(pb.id::text, 2, '0'),
  '2025-09',
  '2025-09-01'::date,
  '2025-09-15'::date,
  '2025-09-16'::date,
  pb.id,
  'DA_CHOT'::trang_thai_bang_ung_luong,
  '{"tyLeToiDa": 70, "soNgayToiThieu": 10, "choPhepNghiKhongPhep": false}'::text,
  'admin',
  '2025-09-15 08:00:00',
  NOW()
FROM phong_ban pb
WHERE pb.id IN (25, 28, 29, 30, 31, 33, 34, 35)
  AND NOT EXISTS (SELECT 1 FROM bang_ung_luong WHERE thang_nam = '2025-09' AND phong_ban_id = pb.id);

-- T10/2025
INSERT INTO bang_ung_luong (ma_bang_ung_luong, thang_nam, tu_ngay, den_ngay, ngay_chi_tra, phong_ban_id, trang_thai, cau_hinh_json, nguoi_tao, ngay_tao, ngay_cap_nhat)
SELECT 
  'UL-202510-' || LPAD(pb.id::text, 2, '0'),
  '2025-10',
  '2025-10-01'::date,
  '2025-10-15'::date,
  '2025-10-16'::date,
  pb.id,
  'DA_CHOT'::trang_thai_bang_ung_luong,
  '{"tyLeToiDa": 70, "soNgayToiThieu": 10, "choPhepNghiKhongPhep": false}'::text,
  'admin',
  '2025-10-15 08:00:00',
  NOW()
FROM phong_ban pb
WHERE pb.id IN (25, 28, 29, 30, 31, 33, 34, 35)
  AND NOT EXISTS (SELECT 1 FROM bang_ung_luong WHERE thang_nam = '2025-10' AND phong_ban_id = pb.id);

-- T11/2025
INSERT INTO bang_ung_luong (ma_bang_ung_luong, thang_nam, tu_ngay, den_ngay, ngay_chi_tra, phong_ban_id, trang_thai, cau_hinh_json, nguoi_tao, ngay_tao, ngay_cap_nhat)
SELECT 
  'UL-202511-' || LPAD(pb.id::text, 2, '0'),
  '2025-11',
  '2025-11-01'::date,
  '2025-11-15'::date,
  '2025-11-16'::date,
  pb.id,
  'DA_CHOT'::trang_thai_bang_ung_luong,
  '{"tyLeToiDa": 70, "soNgayToiThieu": 10, "choPhepNghiKhongPhep": false}'::text,
  'admin',
  '2025-11-15 08:00:00',
  NOW()
FROM phong_ban pb
WHERE pb.id IN (25, 28, 29, 30, 31, 33, 34, 35)
  AND NOT EXISTS (SELECT 1 FROM bang_ung_luong WHERE thang_nam = '2025-11' AND phong_ban_id = pb.id);

-- T12/2025 - Nhiều phòng ban hơn (bao gồm 26, 27, 32)
INSERT INTO bang_ung_luong (ma_bang_ung_luong, thang_nam, tu_ngay, den_ngay, ngay_chi_tra, phong_ban_id, trang_thai, cau_hinh_json, nguoi_tao, ngay_tao, ngay_cap_nhat)
SELECT 
  'UL-202512-' || LPAD(pb.id::text, 2, '0'),
  '2025-12',
  '2025-12-01'::date,
  '2025-12-15'::date,
  '2025-12-16'::date,
  pb.id,
  'DA_CHOT'::trang_thai_bang_ung_luong,
  '{"tyLeToiDa": 70, "soNgayToiThieu": 10, "choPhepNghiKhongPhep": false}'::text,
  'admin',
  '2025-12-15 08:00:00',
  NOW()
FROM phong_ban pb
WHERE pb.id IN (25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35)
  AND NOT EXISTS (SELECT 1 FROM bang_ung_luong WHERE thang_nam = '2025-12' AND phong_ban_id = pb.id);

-- T01/2026 - Chưa chốt (trạng thái NHAP)
INSERT INTO bang_ung_luong (ma_bang_ung_luong, thang_nam, tu_ngay, den_ngay, ngay_chi_tra, phong_ban_id, trang_thai, cau_hinh_json, nguoi_tao, ngay_tao, ngay_cap_nhat)
SELECT 
  'UL-202601-' || LPAD(pb.id::text, 2, '0'),
  '2026-01',
  '2026-01-01'::date,
  '2026-01-15'::date,
  '2026-01-17'::date,  -- Chi trả 17/1 do 16/1 là thứ 6
  pb.id,
  'NHAP'::trang_thai_bang_ung_luong,  -- Chưa chốt
  '{"tyLeToiDa": 70, "soNgayToiThieu": 10, "choPhepNghiKhongPhep": false}'::text,
  'admin',
  '2026-01-10 08:00:00',
  NOW()
FROM phong_ban pb
WHERE pb.id IN (25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35)
  AND NOT EXISTS (SELECT 1 FROM bang_ung_luong WHERE thang_nam = '2026-01' AND phong_ban_id = pb.id);

-- =====================================================
-- 2. TẠO CHI TIẾT ỨNG LƯƠNG (từng nhân viên)
-- =====================================================
-- Chọn ngẫu nhiên 40-60% NV mỗi phòng để ứng lương

-- Function helper để random tiền ứng làm tròn triệu
CREATE OR REPLACE FUNCTION random_tien_ung(muc_toi_da NUMERIC) RETURNS NUMERIC AS $$
DECLARE
  so_trieu INT;
BEGIN
  -- Random từ 1-10 triệu, không quá mức tối đa
  so_trieu := LEAST(FLOOR(1 + random() * 10), FLOOR(muc_toi_da / 1000000));
  IF so_trieu < 1 THEN so_trieu := 1; END IF;
  RETURN so_trieu * 1000000;
END;
$$ LANGUAGE plpgsql;

-- Insert chi tiết cho tất cả các bảng ứng lương
INSERT INTO chi_tiet_bang_ung_luong (
  bang_ung_luong_id, nhan_vien_id, phong_ban_id,
  tien_cong_luy_ke, muc_toi_da_duoc_ung, so_ngay_cong,
  so_ngay_nghi, so_ngay_nghi_khong_phep,
  duoc_phep_ung, ly_do_khong_dat,
  so_tien_ung_de_xuat, so_tien_ung_duyet,
  ngay_tao, ngay_cap_nhat
)
SELECT 
  bul.id,
  nv.id,
  nv.phong_ban_id,
  -- Tiền công lũy kế = lương cơ bản * 15/26 ngày
  ROUND(COALESCE(hd.luong_co_ban, 8000000) * 15.0 / 26),
  -- Mức tối đa = tiền công * 70%
  ROUND(COALESCE(hd.luong_co_ban, 8000000) * 15.0 / 26 * 0.7),
  -- Số ngày công (10-15 ngày)
  10 + FLOOR(random() * 6),
  -- Số ngày nghỉ (0-2 ngày)
  FLOOR(random() * 3),
  -- Nghỉ không phép (0-1 ngày)
  FLOOR(random() * 2),
  -- Được phép ứng (90% NV)
  CASE WHEN random() < 0.9 THEN true ELSE false END,
  -- Lý do không đạt
  CASE WHEN random() >= 0.9 THEN 'NGHI_QUA_NHIEU' ELSE NULL END,
  -- Số tiền ứng đề xuất (2-6 triệu)
  (FLOOR(random() * 5) + 2) * 1000000,
  -- Số tiền ứng duyệt (bằng hoặc ít hơn đề xuất)
  (FLOOR(random() * 4) + 2) * 1000000,
  bul.ngay_tao,
  NOW()
FROM bang_ung_luong bul
JOIN nhan_vien nv ON nv.phong_ban_id = bul.phong_ban_id AND nv.trang_thai = 'DANG_LAM'
LEFT JOIN nhan_vien_hop_dong hd ON hd.nhan_vien_id = nv.id AND hd.trang_thai = 'HIEU_LUC'
WHERE NOT EXISTS (
  SELECT 1 FROM chi_tiet_bang_ung_luong ct 
  WHERE ct.bang_ung_luong_id = bul.id AND ct.nhan_vien_id = nv.id
)
-- Chỉ chọn 50% NV (random)
AND random() < 0.5;

-- =====================================================
-- 3. CẬP NHẬT TỔNG TIỀN VÀ SỐ NV
-- =====================================================
UPDATE bang_ung_luong bul
SET 
  tong_so_tien_ung = (
    SELECT COALESCE(SUM(so_tien_ung_duyet), 0) 
    FROM chi_tiet_bang_ung_luong 
    WHERE bang_ung_luong_id = bul.id AND duoc_phep_ung = true
  ),
  so_nhan_vien_ung = (
    SELECT COUNT(*) 
    FROM chi_tiet_bang_ung_luong 
    WHERE bang_ung_luong_id = bul.id AND duoc_phep_ung = true AND so_tien_ung_duyet > 0
  );

-- =====================================================
-- 4. CẬP NHẬT NGÀY CHỐT CHO CÁC BẢNG ĐÃ CHỐT
-- =====================================================
UPDATE bang_ung_luong
SET 
  nguoi_chot = 'admin',
  ngay_chot = ngay_chi_tra - INTERVAL '1 day',
  da_ghi_nhan_khau_tru = true  -- Đã khấu trừ vào lương
WHERE trang_thai = 'DA_CHOT';

-- =====================================================
-- 5. THỐNG KÊ KẾT QUẢ
-- =====================================================
SELECT 
  bul.thang_nam,
  bul.ma_bang_ung_luong,
  pb.ten_phong_ban,
  bul.trang_thai,
  bul.so_nhan_vien_ung AS "Số NV ứng",
  TO_CHAR(bul.tong_so_tien_ung, 'FM999,999,999,999') || ' đ' AS "Tổng tiền ứng",
  bul.da_ghi_nhan_khau_tru AS "Đã khấu trừ"
FROM bang_ung_luong bul
JOIN phong_ban pb ON pb.id = bul.phong_ban_id
ORDER BY bul.thang_nam, pb.ten_phong_ban;

-- Drop helper function
DROP FUNCTION IF EXISTS random_tien_ung(NUMERIC);

COMMIT;

-- =====================================================
-- SUMMARY
-- =====================================================
SELECT 
  thang_nam AS "Tháng",
  COUNT(*) AS "Số bảng",
  SUM(so_nhan_vien_ung) AS "Tổng NV ứng",
  TO_CHAR(SUM(tong_so_tien_ung), 'FM999,999,999,999') || ' đ' AS "Tổng tiền"
FROM bang_ung_luong
GROUP BY thang_nam
ORDER BY thang_nam;
