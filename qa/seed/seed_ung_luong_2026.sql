-- Thêm chi tiết ứng lương cho tháng 01/2026
INSERT INTO chi_tiet_bang_ung_luong (
  bang_ung_luong_id, nhan_vien_id, phong_ban_id, 
  tien_cong_luy_ke, muc_toi_da_duoc_ung, so_ngay_cong,
  so_tien_ung_de_xuat, so_tien_ung_duyet, duoc_phep_ung, ngay_cap_nhat
)
SELECT 
  bul.id,
  nv.id,
  nv.phong_ban_id,
  ROUND(COALESCE(nv.luong_co_ban, 5000000) * 15.0 / 26),
  ROUND(COALESCE(nv.luong_co_ban, 5000000) * 15.0 / 26 * 0.7),
  15,
  (FLOOR(random() * 4) + 2) * 1000000,
  (FLOOR(random() * 4) + 2) * 1000000,
  true,
  NOW()
FROM bang_ung_luong bul
JOIN nhan_vien nv ON nv.phong_ban_id = bul.phong_ban_id AND nv.trang_thai = 'DANG_LAM'
WHERE bul.thang_nam = '2026-01'
  AND NOT EXISTS (
    SELECT 1 FROM chi_tiet_bang_ung_luong ct 
    WHERE ct.bang_ung_luong_id = bul.id AND ct.nhan_vien_id = nv.id
  );

-- Cập nhật tổng tiền và số NV trong bảng ứng lương
UPDATE bang_ung_luong bul
SET 
  tong_so_tien_ung = (
    SELECT COALESCE(SUM(so_tien_ung_duyet), 0) 
    FROM chi_tiet_bang_ung_luong 
    WHERE bang_ung_luong_id = bul.id
  ),
  so_nhan_vien_ung = (
    SELECT COUNT(*) 
    FROM chi_tiet_bang_ung_luong 
    WHERE bang_ung_luong_id = bul.id
  )
WHERE thang_nam = '2026-01';
