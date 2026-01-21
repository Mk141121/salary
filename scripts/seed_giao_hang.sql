-- Insert Giao Hàng for January 2026
INSERT INTO giao_hang (ngay, nhan_vien_id, khoi_luong_thanh_cong, so_lan_tre_gio, so_lan_khong_lay_phieu, ghi_chu, nguon_du_lieu, khoa_sua, tao_luc, cap_nhat_luc)
SELECT 
    gs.d::date as ngay,
    nv.id as nhan_vien_id,
    (random() * 150 + 50)::numeric(15,2) as khoi_luong_thanh_cong,
    CASE WHEN random() > 0.8 THEN floor(random() * 3)::int ELSE 0 END as so_lan_tre_gio,
    CASE WHEN random() > 0.9 THEN 1 ELSE 0 END as so_lan_khong_lay_phieu,
    'Seed data T1/2026' as ghi_chu,
    'NHAP_TAY' as nguon_du_lieu,
    false as khoa_sua,
    NOW() as tao_luc,
    NOW() as cap_nhat_luc
FROM generate_series('2026-01-01'::date, '2026-01-20'::date, '1 day'::interval) gs(d)
CROSS JOIN nhan_vien nv
JOIN phong_ban pb ON nv.phong_ban_id = pb.id
WHERE pb.ten_phong_ban ILIKE '%Giao%' 
  AND nv.trang_thai = 'DANG_LAM'
  AND EXTRACT(DOW FROM gs.d) != 0
ON CONFLICT (ngay, nhan_vien_id) DO UPDATE SET
  khoi_luong_thanh_cong = EXCLUDED.khoi_luong_thanh_cong,
  so_lan_tre_gio = EXCLUDED.so_lan_tre_gio,
  so_lan_khong_lay_phieu = EXCLUDED.so_lan_khong_lay_phieu,
  cap_nhat_luc = NOW();
