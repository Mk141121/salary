-- =====================================================
-- SEED DATA: SẢN LƯỢNG CHIA HÀNG & GIAO HÀNG
-- =====================================================
-- Mục đích: Tạo dữ liệu sản lượng để liên kết với bảng lương
-- Kỳ: T06/2025 → T01/2026 (tương ứng bảng lương)
-- Chạy: docker exec -i hrm-lite-db-v2 psql -U hrmlite -d hrm_lite < qa/seed/seed_san_luong_full.sql
-- =====================================================

BEGIN;

-- =====================================================
-- 1. SEED SẢN LƯỢNG CHIA HÀNG
-- Phòng ban ID: 25 (Chia hàng)
-- Nhân viên: NV0013-NV0025, NV0037 (11 người)
-- Metrics: so_luong_sp_dat, so_luong_sp_loi
-- =====================================================

-- Tạo sản lượng từng ngày trong tháng (trừ Chủ nhật)
INSERT INTO san_luong_chia_hang (
  ngay, nhan_vien_id, so_luong_sp_dat, so_luong_sp_loi,
  nguon_du_lieu, khoa_sua, tao_luc, cap_nhat_luc
)
SELECT 
  d::date as ngay,
  nv.id as nhan_vien_id,
  -- Số SP đạt: 120-350 SP/ngày (random)
  120 + FLOOR(random() * 230) as so_luong_sp_dat,
  -- Số SP lỗi: 0-15 SP (2-5% lỗi)
  FLOOR(random() * 16) as so_luong_sp_loi,
  'NHAP_TAY'::nguon_du_lieu,
  false, -- khoa_sua = false để có thể sửa
  NOW(),
  NOW()
FROM generate_series('2025-06-01'::date, '2026-01-18'::date, '1 day'::interval) d
CROSS JOIN nhan_vien nv
WHERE nv.phong_ban_id = 25 
  AND nv.trang_thai = 'DANG_LAM'
  AND EXTRACT(DOW FROM d) != 0  -- Bỏ Chủ nhật
  AND NOT EXISTS (
    SELECT 1 FROM san_luong_chia_hang sl 
    WHERE sl.ngay = d::date AND sl.nhan_vien_id = nv.id
  );

-- =====================================================
-- 2. SEED GIAO HÀNG
-- Phòng ban ID: 30 (Giao hàng) 
-- Nhân viên: NV0026-NV0034 (6 người active)
-- Metrics: khoi_luong_thanh_cong, so_lan_tre_gio, so_lan_khong_lay_phieu
-- =====================================================

INSERT INTO giao_hang (
  ngay, nhan_vien_id, khoi_luong_thanh_cong, 
  so_lan_tre_gio, so_lan_khong_lay_phieu,
  nguon_du_lieu, khoa_sua, tao_luc, cap_nhat_luc
)
SELECT 
  d::date as ngay,
  nv.id as nhan_vien_id,
  -- Khối lượng thành công: 150-400 kg/ngày
  (150 + random() * 250)::numeric(15,2) as khoi_luong_thanh_cong,
  -- Số lần trễ giờ: 0-2 (đa số 0)
  CASE 
    WHEN random() < 0.85 THEN 0  -- 85% không trễ
    WHEN random() < 0.95 THEN 1  -- 10% trễ 1 lần
    ELSE 2                        -- 5% trễ 2 lần
  END as so_lan_tre_gio,
  -- Số lần không lấy phiếu: 0-1
  CASE WHEN random() < 0.9 THEN 0 ELSE 1 END as so_lan_khong_lay_phieu,
  'NHAP_TAY'::nguon_du_lieu,
  false,
  NOW(),
  NOW()
FROM generate_series('2025-06-01'::date, '2026-01-18'::date, '1 day'::interval) d
CROSS JOIN nhan_vien nv
WHERE nv.phong_ban_id = 30
  AND nv.trang_thai = 'DANG_LAM'
  AND EXTRACT(DOW FROM d) != 0  -- Bỏ Chủ nhật
  AND NOT EXISTS (
    SELECT 1 FROM giao_hang gh 
    WHERE gh.ngay = d::date AND gh.nhan_vien_id = nv.id
  );

-- =====================================================
-- 3. TẠO SNAPSHOT CHO CÁC BẢNG LƯƠNG ĐÃ CÓ
-- Snapshot = tổng hợp sản lượng theo tháng để lock vào bảng lương
-- =====================================================

-- 3.1 Snapshot Chia hàng
INSERT INTO snapshot_san_luong_chia_hang (bang_luong_id, nhan_vien_id, tong_sp_dat, tong_sp_loi)
SELECT 
  bl.id as bang_luong_id,
  sl.nhan_vien_id,
  SUM(sl.so_luong_sp_dat) as tong_sp_dat,
  SUM(sl.so_luong_sp_loi) as tong_sp_loi
FROM bang_luong bl
JOIN san_luong_chia_hang sl ON 
  EXTRACT(MONTH FROM sl.ngay) = bl.thang 
  AND EXTRACT(YEAR FROM sl.ngay) = bl.nam
JOIN nhan_vien nv ON nv.id = sl.nhan_vien_id AND nv.phong_ban_id = bl.phong_ban_id
WHERE bl.phong_ban_id = 25  -- Chia hàng
  AND NOT EXISTS (
    SELECT 1 FROM snapshot_san_luong_chia_hang ss
    WHERE ss.bang_luong_id = bl.id AND ss.nhan_vien_id = sl.nhan_vien_id
  )
GROUP BY bl.id, sl.nhan_vien_id;

-- 3.2 Snapshot Giao hàng
INSERT INTO snapshot_giao_hang (
  bang_luong_id, nhan_vien_id, 
  tong_khoi_luong_thanh_cong, tong_so_lan_tre_gio, tong_so_lan_khong_lay_phieu
)
SELECT 
  bl.id as bang_luong_id,
  gh.nhan_vien_id,
  SUM(gh.khoi_luong_thanh_cong) as tong_khoi_luong_thanh_cong,
  SUM(gh.so_lan_tre_gio) as tong_so_lan_tre_gio,
  SUM(gh.so_lan_khong_lay_phieu) as tong_so_lan_khong_lay_phieu
FROM bang_luong bl
JOIN giao_hang gh ON 
  EXTRACT(MONTH FROM gh.ngay) = bl.thang 
  AND EXTRACT(YEAR FROM gh.ngay) = bl.nam
JOIN nhan_vien nv ON nv.id = gh.nhan_vien_id AND nv.phong_ban_id = bl.phong_ban_id
WHERE bl.phong_ban_id = 30  -- Giao hàng
  AND NOT EXISTS (
    SELECT 1 FROM snapshot_giao_hang sg
    WHERE sg.bang_luong_id = bl.id AND sg.nhan_vien_id = gh.nhan_vien_id
  )
GROUP BY bl.id, gh.nhan_vien_id;

COMMIT;

-- =====================================================
-- THỐNG KÊ KẾT QUẢ
-- =====================================================

-- Tổng hợp sản lượng Chia hàng theo tháng
SELECT 
  EXTRACT(MONTH FROM ngay)::int || '/' || EXTRACT(YEAR FROM ngay)::int as thang_nam,
  COUNT(DISTINCT nhan_vien_id) as so_nv,
  COUNT(*) as so_ngay_cong,
  SUM(so_luong_sp_dat) as tong_sp_dat,
  SUM(so_luong_sp_loi) as tong_sp_loi,
  ROUND(SUM(so_luong_sp_loi)::numeric / NULLIF(SUM(so_luong_sp_dat), 0) * 100, 2) || '%' as ty_le_loi
FROM san_luong_chia_hang
GROUP BY EXTRACT(YEAR FROM ngay), EXTRACT(MONTH FROM ngay)
ORDER BY EXTRACT(YEAR FROM ngay), EXTRACT(MONTH FROM ngay);

-- Tổng hợp sản lượng Giao hàng theo tháng  
SELECT 
  EXTRACT(MONTH FROM ngay)::int || '/' || EXTRACT(YEAR FROM ngay)::int as thang_nam,
  COUNT(DISTINCT nhan_vien_id) as so_nv,
  COUNT(*) as so_ngay_cong,
  ROUND(SUM(khoi_luong_thanh_cong)::numeric, 0) || ' kg' as tong_kl,
  SUM(so_lan_tre_gio) as tong_tre_gio,
  SUM(so_lan_khong_lay_phieu) as tong_khong_phieu
FROM giao_hang
GROUP BY EXTRACT(YEAR FROM ngay), EXTRACT(MONTH FROM ngay)
ORDER BY EXTRACT(YEAR FROM ngay), EXTRACT(MONTH FROM ngay);

-- Snapshot đã liên kết vào bảng lương
SELECT 
  'Chia hàng' as bo_phan,
  bl.thang || '/' || bl.nam as ky_luong,
  COUNT(ss.id) as so_nv_snapshot,
  SUM(ss.tong_sp_dat) as tong_sp_dat,
  SUM(ss.tong_sp_loi) as tong_sp_loi
FROM bang_luong bl
LEFT JOIN snapshot_san_luong_chia_hang ss ON ss.bang_luong_id = bl.id
WHERE bl.phong_ban_id = 25
GROUP BY bl.thang, bl.nam
ORDER BY bl.nam, bl.thang;

SELECT 
  'Giao hàng' as bo_phan,
  bl.thang || '/' || bl.nam as ky_luong,
  COUNT(sg.id) as so_nv_snapshot,
  ROUND(SUM(sg.tong_khoi_luong_thanh_cong)::numeric, 0) as tong_kl_kg,
  SUM(sg.tong_so_lan_tre_gio) as tong_tre,
  SUM(sg.tong_so_lan_khong_lay_phieu) as tong_khong_phieu
FROM bang_luong bl
LEFT JOIN snapshot_giao_hang sg ON sg.bang_luong_id = bl.id
WHERE bl.phong_ban_id = 30
GROUP BY bl.thang, bl.nam
ORDER BY bl.nam, bl.thang;
