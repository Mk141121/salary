-- HRM-LITE v2 Full Seed Data (Schema Compliant)
-- Generated: 2026-01-18

-- ==========================================
-- 3. KHOAN LUONG
-- ==========================================
INSERT INTO khoan_luong (ma_khoan, ten_khoan, loai, cach_tinh, chiu_thue, thu_tu, ngay_tao, ngay_cap_nhat) VALUES ('LUONG_CO_BAN', 'Lương cơ bản', 'THU_NHAP', 'LUONG_THANG_CO_DINH', true, 1, NOW(), NOW()) ON CONFLICT (ma_khoan) DO NOTHING;
INSERT INTO khoan_luong (ma_khoan, ten_khoan, loai, cach_tinh, chiu_thue, thu_tu, ngay_tao, ngay_cap_nhat) VALUES ('PHU_CAP_XANG_XE', 'Phụ cấp xăng xe', 'THU_NHAP', 'THEO_NGAY_CONG', false, 2, NOW(), NOW()) ON CONFLICT (ma_khoan) DO NOTHING;
INSERT INTO khoan_luong (ma_khoan, ten_khoan, loai, cach_tinh, chiu_thue, thu_tu, ngay_tao, ngay_cap_nhat) VALUES ('PHU_CAP_DIEN_THOAI', 'Phụ cấp điện thoại', 'THU_NHAP', 'THEO_NGAY_CONG', false, 3, NOW(), NOW()) ON CONFLICT (ma_khoan) DO NOTHING;
INSERT INTO khoan_luong (ma_khoan, ten_khoan, loai, cach_tinh, chiu_thue, thu_tu, ngay_tao, ngay_cap_nhat) VALUES ('HO_TRO_AN_CA', 'Hỗ trợ ăn ca', 'THU_NHAP', 'THEO_NGAY_CONG', false, 4, NOW(), NOW()) ON CONFLICT (ma_khoan) DO NOTHING;
INSERT INTO khoan_luong (ma_khoan, ten_khoan, loai, cach_tinh, chiu_thue, thu_tu, ngay_tao, ngay_cap_nhat) VALUES ('HO_TRO_CHUYEN_CAN', 'Hỗ trợ chuyên cần', 'THU_NHAP', 'CHUYEN_CAN_DIEU_KIEN', false, 5, NOW(), NOW()) ON CONFLICT (ma_khoan) DO NOTHING;
INSERT INTO khoan_luong (ma_khoan, ten_khoan, loai, cach_tinh, chiu_thue, thu_tu, ngay_tao, ngay_cap_nhat) VALUES ('PHU_CAP_CHUC_VU', 'Phụ cấp chức vụ', 'THU_NHAP', 'LUONG_THANG_CO_DINH', true, 6, NOW(), NOW()) ON CONFLICT (ma_khoan) DO NOTHING;
INSERT INTO khoan_luong (ma_khoan, ten_khoan, loai, cach_tinh, chiu_thue, thu_tu, ngay_tao, ngay_cap_nhat) VALUES ('THUONG_KPI', 'Thưởng KPI', 'THU_NHAP', 'LUONG_THANG_CO_DINH', true, 7, NOW(), NOW()) ON CONFLICT (ma_khoan) DO NOTHING;
INSERT INTO khoan_luong (ma_khoan, ten_khoan, loai, cach_tinh, chiu_thue, thu_tu, ngay_tao, ngay_cap_nhat) VALUES ('THUONG_DOANH_SO', 'Thưởng doanh số', 'THU_NHAP', 'LUONG_THANG_CO_DINH', true, 8, NOW(), NOW()) ON CONFLICT (ma_khoan) DO NOTHING;
INSERT INTO khoan_luong (ma_khoan, ten_khoan, loai, cach_tinh, chiu_thue, thu_tu, ngay_tao, ngay_cap_nhat) VALUES ('BHXH_NLD', 'BHXH (8%)', 'KHAU_TRU', 'LUONG_THANG_CO_DINH', false, 101, NOW(), NOW()) ON CONFLICT (ma_khoan) DO NOTHING;
INSERT INTO khoan_luong (ma_khoan, ten_khoan, loai, cach_tinh, chiu_thue, thu_tu, ngay_tao, ngay_cap_nhat) VALUES ('BHYT_NLD', 'BHYT (1.5%)', 'KHAU_TRU', 'LUONG_THANG_CO_DINH', false, 102, NOW(), NOW()) ON CONFLICT (ma_khoan) DO NOTHING;
INSERT INTO khoan_luong (ma_khoan, ten_khoan, loai, cach_tinh, chiu_thue, thu_tu, ngay_tao, ngay_cap_nhat) VALUES ('BHTN_NLD', 'BHTN (1%)', 'KHAU_TRU', 'LUONG_THANG_CO_DINH', false, 103, NOW(), NOW()) ON CONFLICT (ma_khoan) DO NOTHING;
INSERT INTO khoan_luong (ma_khoan, ten_khoan, loai, cach_tinh, chiu_thue, thu_tu, ngay_tao, ngay_cap_nhat) VALUES ('THUE_TNCN', 'Thuế TNCN', 'KHAU_TRU', 'LUONG_THANG_CO_DINH', false, 104, NOW(), NOW()) ON CONFLICT (ma_khoan) DO NOTHING;
INSERT INTO khoan_luong (ma_khoan, ten_khoan, loai, cach_tinh, chiu_thue, thu_tu, ngay_tao, ngay_cap_nhat) VALUES ('PHAT_DI_TRE', 'Phạt đi trễ', 'KHAU_TRU', 'LUONG_THANG_CO_DINH', false, 111, NOW(), NOW()) ON CONFLICT (ma_khoan) DO NOTHING;
INSERT INTO khoan_luong (ma_khoan, ten_khoan, loai, cach_tinh, chiu_thue, thu_tu, ngay_tao, ngay_cap_nhat) VALUES ('TRU_UNG_LUONG', 'Trừ ứng lương', 'KHAU_TRU', 'LUONG_THANG_CO_DINH', false, 112, NOW(), NOW()) ON CONFLICT (ma_khoan) DO NOTHING;

-- ==========================================
-- 4. DANH MUC LOAI NGHI
-- ==========================================
INSERT INTO danh_muc_loai_nghi (ma_loai_nghi, ten_loai_nghi, nhom_loai, co_tinh_luong, co_tinh_chuyen_can, thu_tu_hien_thi, ngay_tao, ngay_cap_nhat) VALUES ('PHEP_NAM', 'Phép năm', 'CO_PHEP', true, true, 1, NOW(), NOW()) ON CONFLICT (ma_loai_nghi) DO NOTHING;
INSERT INTO danh_muc_loai_nghi (ma_loai_nghi, ten_loai_nghi, nhom_loai, co_tinh_luong, co_tinh_chuyen_can, thu_tu_hien_thi, ngay_tao, ngay_cap_nhat) VALUES ('NGHI_OM', 'Nghỉ ốm', 'CO_PHEP', true, true, 2, NOW(), NOW()) ON CONFLICT (ma_loai_nghi) DO NOTHING;
INSERT INTO danh_muc_loai_nghi (ma_loai_nghi, ten_loai_nghi, nhom_loai, co_tinh_luong, co_tinh_chuyen_can, thu_tu_hien_thi, ngay_tao, ngay_cap_nhat) VALUES ('THAI_SAN', 'Thai sản', 'CO_PHEP', true, true, 3, NOW(), NOW()) ON CONFLICT (ma_loai_nghi) DO NOTHING;
INSERT INTO danh_muc_loai_nghi (ma_loai_nghi, ten_loai_nghi, nhom_loai, co_tinh_luong, co_tinh_chuyen_can, thu_tu_hien_thi, ngay_tao, ngay_cap_nhat) VALUES ('VIEC_RIENG', 'Việc riêng có lương', 'CO_PHEP', true, false, 4, NOW(), NOW()) ON CONFLICT (ma_loai_nghi) DO NOTHING;
INSERT INTO danh_muc_loai_nghi (ma_loai_nghi, ten_loai_nghi, nhom_loai, co_tinh_luong, co_tinh_chuyen_can, thu_tu_hien_thi, ngay_tao, ngay_cap_nhat) VALUES ('KHONG_LUONG', 'Nghỉ không lương', 'KHONG_LUONG', false, false, 5, NOW(), NOW()) ON CONFLICT (ma_loai_nghi) DO NOTHING;
INSERT INTO danh_muc_loai_nghi (ma_loai_nghi, ten_loai_nghi, nhom_loai, co_tinh_luong, co_tinh_chuyen_can, thu_tu_hien_thi, ngay_tao, ngay_cap_nhat) VALUES ('KHONG_PHEP', 'Nghỉ không phép', 'KHONG_PHEP', false, false, 6, NOW(), NOW()) ON CONFLICT (ma_loai_nghi) DO NOTHING;

-- ==========================================
-- 5. DANH MUC LOAI YEU CAU (nhom_loai not nhom)
-- ==========================================
INSERT INTO danh_muc_loai_yeu_cau (ma_loai, ten_loai, nhom_loai, mo_ta, is_active, ngay_tao, ngay_cap_nhat) VALUES ('OT', 'Làm thêm giờ (OT)', 'THOI_GIAN', 'Đơn xin làm thêm giờ', true, NOW(), NOW()) ON CONFLICT (ma_loai) DO NOTHING;
INSERT INTO danh_muc_loai_yeu_cau (ma_loai, ten_loai, nhom_loai, mo_ta, is_active, ngay_tao, ngay_cap_nhat) VALUES ('TRE_GIO', 'Đi trễ', 'THOI_GIAN', 'Đơn xin đi trễ', true, NOW(), NOW()) ON CONFLICT (ma_loai) DO NOTHING;
INSERT INTO danh_muc_loai_yeu_cau (ma_loai, ten_loai, nhom_loai, mo_ta, is_active, ngay_tao, ngay_cap_nhat) VALUES ('VE_SOM', 'Về sớm', 'THOI_GIAN', 'Đơn xin về sớm', true, NOW(), NOW()) ON CONFLICT (ma_loai) DO NOTHING;
INSERT INTO danh_muc_loai_yeu_cau (ma_loai, ten_loai, nhom_loai, mo_ta, is_active, ngay_tao, ngay_cap_nhat) VALUES ('CONG_TAC', 'Công tác', 'DI_CHUYEN', 'Đơn xin công tác', true, NOW(), NOW()) ON CONFLICT (ma_loai) DO NOTHING;
INSERT INTO danh_muc_loai_yeu_cau (ma_loai, ten_loai, nhom_loai, mo_ta, is_active, ngay_tao, ngay_cap_nhat) VALUES ('WFH', 'Làm việc từ xa', 'DI_CHUYEN', 'Đơn xin làm việc từ xa', true, NOW(), NOW()) ON CONFLICT (ma_loai) DO NOTHING;

-- ==========================================
-- 6. CA LAM VIEC (no gio_nghi_trua column)
-- ==========================================
INSERT INTO ca_lam_viec (ma_ca, ten_ca, gio_vao, gio_ra, nghi_giua_ca_phut, trang_thai, ngay_tao, ngay_cap_nhat) VALUES ('CA_HANH_CHINH', 'Ca hành chính', '08:00', '17:00', 60, true, NOW(), NOW()) ON CONFLICT (ma_ca) DO NOTHING;
INSERT INTO ca_lam_viec (ma_ca, ten_ca, gio_vao, gio_ra, nghi_giua_ca_phut, trang_thai, ngay_tao, ngay_cap_nhat) VALUES ('CA_SANG', 'Ca sáng', '06:00', '14:00', 30, true, NOW(), NOW()) ON CONFLICT (ma_ca) DO NOTHING;
INSERT INTO ca_lam_viec (ma_ca, ten_ca, gio_vao, gio_ra, nghi_giua_ca_phut, trang_thai, ngay_tao, ngay_cap_nhat) VALUES ('CA_CHIEU', 'Ca chiều', '14:00', '22:00', 30, true, NOW(), NOW()) ON CONFLICT (ma_ca) DO NOTHING;
INSERT INTO ca_lam_viec (ma_ca, ten_ca, gio_vao, gio_ra, nghi_giua_ca_phut, trang_thai, ngay_tao, ngay_cap_nhat) VALUES ('CA_KHO', 'Ca kho vận', '06:00', '15:00', 30, true, NOW(), NOW()) ON CONFLICT (ma_ca) DO NOTHING;
INSERT INTO ca_lam_viec (ma_ca, ten_ca, gio_vao, gio_ra, nghi_giua_ca_phut, trang_thai, ngay_tao, ngay_cap_nhat) VALUES ('CA_GIAO_HANG', 'Ca giao hàng', '04:00', '12:00', 30, true, NOW(), NOW()) ON CONFLICT (ma_ca) DO NOTHING;

-- ==========================================
-- 8. LICH PHAN CA (thang_nam as text format 2026-01)
-- ==========================================
INSERT INTO lich_phan_ca (thang_nam, ten_lich, trang_thai, ngay_tao, ngay_cap_nhat) VALUES ('2026-01', 'Lịch phân ca tháng 1/2026', 'CONG_BO', NOW(), NOW()) ON CONFLICT DO NOTHING;

-- 8.1. PHAN CA CHI TIET
INSERT INTO lich_phan_ca_chi_tiet (lich_phan_ca_id, nhan_vien_id, ngay, ca_lam_viec_id, ngay_tao) SELECT lpc.id, nv.id, d::date, CASE WHEN pb.ma_phong_ban IN ('KV', 'CH') THEN (SELECT id FROM ca_lam_viec WHERE ma_ca = 'CA_KHO' LIMIT 1) WHEN pb.ma_phong_ban IN ('SHIP', 'GIAO_HANG') THEN (SELECT id FROM ca_lam_viec WHERE ma_ca = 'CA_GIAO_HANG' LIMIT 1) ELSE (SELECT id FROM ca_lam_viec WHERE ma_ca = 'CA_HANH_CHINH' LIMIT 1) END, NOW() FROM nhan_vien nv JOIN phong_ban pb ON nv.phong_ban_id = pb.id CROSS JOIN lich_phan_ca lpc CROSS JOIN generate_series('2026-01-01'::date, '2026-01-31'::date, '1 day'::interval) d WHERE nv.trang_thai = 'DANG_LAM' AND lpc.thang_nam = '2026-01' AND EXTRACT(DOW FROM d::date) NOT IN (0) ON CONFLICT DO NOTHING;

-- ==========================================
-- 9. CHAM CONG (nhan_vien_id required)
-- ==========================================
INSERT INTO cham_cong (nhan_vien_id, thang, nam, so_cong_chuan, so_cong_thuc_te, ngay_tao, ngay_cap_nhat) SELECT id, 1, 2026, 26, 22, NOW(), NOW() FROM nhan_vien WHERE trang_thai = 'DANG_LAM' ON CONFLICT DO NOTHING;

-- 9.1. CHI TIET CHAM CONG (ngay is timestamp)
INSERT INTO chi_tiet_cham_cong (nhan_vien_id, ngay, gio_vao, gio_ra, trang_thai, so_gio_lam, ngay_tao, ca_lam_viec_id) SELECT nv.id, d::timestamp, (d + clv.gio_vao::time)::timestamp, (d + clv.gio_ra::time)::timestamp, 'DI_LAM', 8.0, NOW(), clv.id FROM nhan_vien nv JOIN phong_ban pb ON nv.phong_ban_id = pb.id CROSS JOIN ca_lam_viec clv CROSS JOIN generate_series('2026-01-02'::date, '2026-01-17'::date, '1 day'::interval) d WHERE nv.trang_thai = 'DANG_LAM' AND clv.ma_ca = CASE WHEN pb.ma_phong_ban IN ('KV', 'CH') THEN 'CA_KHO' WHEN pb.ma_phong_ban IN ('SHIP', 'GIAO_HANG') THEN 'CA_GIAO_HANG' ELSE 'CA_HANH_CHINH' END AND EXTRACT(DOW FROM d::date) NOT IN (0) ON CONFLICT DO NOTHING;

-- ==========================================
-- 10. DON NGHI PHEP (needs ma_don, phong_ban_id, so_ngay_nghi)
-- ==========================================
INSERT INTO don_nghi_phep (ma_don, nhan_vien_id, phong_ban_id, loai_nghi_id, tu_ngay, den_ngay, so_ngay_nghi, ly_do, trang_thai, ngay_tao, ngay_cap_nhat) SELECT 'DNP-2026-01-' || nv.id, nv.id, nv.phong_ban_id, ln.id, '2026-01-20'::date, '2026-01-21'::date, 2, 'Nghỉ phép giải quyết việc gia đình', 'NHAP', NOW(), NOW() FROM nhan_vien nv CROSS JOIN danh_muc_loai_nghi ln WHERE nv.ma_nhan_vien IN ('NV0005', 'NV0007', 'NV0010') AND ln.ma_loai_nghi = 'PHEP_NAM' AND nv.trang_thai = 'DANG_LAM' ON CONFLICT DO NOTHING;
INSERT INTO don_nghi_phep (ma_don, nhan_vien_id, phong_ban_id, loai_nghi_id, tu_ngay, den_ngay, so_ngay_nghi, ly_do, trang_thai, ngay_duyet, ngay_tao, ngay_cap_nhat) SELECT 'DNP-2026-01-OM-' || nv.id, nv.id, nv.phong_ban_id, ln.id, '2026-01-08'::date, '2026-01-08'::date, 1, 'Nghỉ ốm đột xuất', 'DA_DUYET', '2026-01-07'::timestamp, NOW(), NOW() FROM nhan_vien nv CROSS JOIN danh_muc_loai_nghi ln WHERE nv.ma_nhan_vien IN ('NV0003', 'NV0015') AND ln.ma_loai_nghi = 'NGHI_OM' AND nv.trang_thai = 'DANG_LAM' ON CONFLICT DO NOTHING;

-- ==========================================
-- 11. DON YEU CAU (needs ma_don, phong_ban_id, ngay_yeu_cau)
-- ==========================================
INSERT INTO don_yeu_cau (ma_don, nhan_vien_id, phong_ban_id, loai_yeu_cau_id, ngay_yeu_cau, gio_bat_dau, gio_ket_thuc, so_gio, ly_do, trang_thai, ngay_tao, ngay_cap_nhat) SELECT 'DYC-2026-01-OT-' || nv.id, nv.id, nv.phong_ban_id, ly.id, '2026-01-15'::date, '17:00', '20:00', 3, 'Làm thêm giờ hoàn thành đơn hàng gấp', 'NHAP', NOW(), NOW() FROM nhan_vien nv CROSS JOIN danh_muc_loai_yeu_cau ly WHERE nv.ma_nhan_vien IN ('NV0007', 'NV0008', 'NV0009') AND ly.ma_loai = 'OT' AND nv.trang_thai = 'DANG_LAM' ON CONFLICT DO NOTHING;
INSERT INTO don_yeu_cau (ma_don, nhan_vien_id, phong_ban_id, loai_yeu_cau_id, ngay_yeu_cau, gio_bat_dau, gio_ket_thuc, so_gio, ly_do, trang_thai, ngay_duyet_1, ngay_tao, ngay_cap_nhat) SELECT 'DYC-2026-01-TRE-' || nv.id, nv.id, nv.phong_ban_id, ly.id, '2026-01-10'::date, '08:00', '09:00', 1, 'Đi khám bệnh buổi sáng', 'CHO_DUYET_2', '2026-01-09'::timestamp, NOW(), NOW() FROM nhan_vien nv CROSS JOIN danh_muc_loai_yeu_cau ly WHERE nv.ma_nhan_vien = 'NV0001' AND ly.ma_loai = 'TRE_GIO' AND nv.trang_thai = 'DANG_LAM' ON CONFLICT DO NOTHING;

-- ==========================================
-- 12. BANG LUONG (phong_ban_id required)
-- ==========================================
INSERT INTO bang_luong (thang, nam, phong_ban_id, ten_bang_luong, trang_thai, ngay_chot, ngay_tao, ngay_cap_nhat) SELECT 12, 2025, id, 'Bảng lương T12/2025 - ' || ten_phong_ban, 'DA_CHOT', '2026-01-05'::timestamp, NOW(), NOW() FROM phong_ban ON CONFLICT DO NOTHING;
INSERT INTO bang_luong (thang, nam, phong_ban_id, ten_bang_luong, trang_thai, ngay_tao, ngay_cap_nhat) SELECT 1, 2026, id, 'Bảng lương T01/2026 - ' || ten_phong_ban, 'NHAP', NOW(), NOW() FROM phong_ban ON CONFLICT DO NOTHING;

-- ==========================================
-- 13. THONG BAO (loai_thong_bao not loai)
-- ==========================================
INSERT INTO thong_bao (nguoi_nhan_id, loai_thong_bao, tieu_de, noi_dung, da_doc, ngay_tao) SELECT nd.id, 'HE_THONG', 'Chào mừng đến HRM-Lite v2', 'Hệ thống quản lý nhân sự HRM-Lite phiên bản 2 đã sẵn sàng!', false, NOW() FROM nguoi_dung nd WHERE nd.ten_dang_nhap = 'admin';
INSERT INTO thong_bao (nguoi_nhan_id, loai_thong_bao, tieu_de, noi_dung, da_doc, ngay_tao) SELECT nd.id, 'LUONG', 'Phiếu lương tháng 12/2025', 'Phiếu lương tháng 12/2025 đã sẵn sàng.', false, NOW() FROM nguoi_dung nd WHERE nd.nhan_vien_id IS NOT NULL;

-- ==========================================
-- 14. PHU CAP NHAN VIEN (so_tien not gia_tri)
-- ==========================================
INSERT INTO phu_cap_nhan_vien (nhan_vien_id, khoan_luong_id, so_tien, tu_ngay, trang_thai, ngay_tao, ngay_cap_nhat) SELECT nv.id, kl.id, 300000, '2026-01-01'::timestamp, 'HIEU_LUC', NOW(), NOW() FROM nhan_vien nv CROSS JOIN khoan_luong kl WHERE nv.trang_thai = 'DANG_LAM' AND kl.ma_khoan = 'PHU_CAP_XANG_XE' ON CONFLICT DO NOTHING;
INSERT INTO phu_cap_nhan_vien (nhan_vien_id, khoan_luong_id, so_tien, tu_ngay, trang_thai, ngay_tao, ngay_cap_nhat) SELECT nv.id, kl.id, 30000, '2026-01-01'::timestamp, 'HIEU_LUC', NOW(), NOW() FROM nhan_vien nv CROSS JOIN khoan_luong kl WHERE nv.trang_thai = 'DANG_LAM' AND kl.ma_khoan = 'HO_TRO_AN_CA' ON CONFLICT DO NOTHING;
INSERT INTO phu_cap_nhan_vien (nhan_vien_id, khoan_luong_id, so_tien, tu_ngay, trang_thai, ngay_tao, ngay_cap_nhat) SELECT nv.id, kl.id, 1000000, '2026-01-01'::timestamp, 'HIEU_LUC', NOW(), NOW() FROM nhan_vien nv CROSS JOIN khoan_luong kl WHERE (nv.chuc_vu ILIKE '%Trưởng%' OR nv.chuc_vu ILIKE '%Quản lý%') AND nv.trang_thai = 'DANG_LAM' AND kl.ma_khoan = 'PHU_CAP_CHUC_VU' ON CONFLICT DO NOTHING;

-- ==========================================
-- 15. CAU HINH GEOFENCE (ten_dia_diem, vi_do, kinh_do, ban_kinh_met)
-- ==========================================
INSERT INTO cau_hinh_geofence (ten_dia_diem, vi_do, kinh_do, ban_kinh_met, ap_dung_tat_ca, bat_buoc_gps, chan_ngoai_vung, trang_thai, ngay_tao, ngay_cap_nhat) VALUES ('Văn phòng chính', 10.8231, 106.6297, 100, true, true, false, true, NOW(), NOW()) ON CONFLICT DO NOTHING;
INSERT INTO cau_hinh_geofence (ten_dia_diem, vi_do, kinh_do, ban_kinh_met, ap_dung_tat_ca, bat_buoc_gps, chan_ngoai_vung, trang_thai, ngay_tao, ngay_cap_nhat) VALUES ('Kho hàng Bình Dương', 10.9803, 106.6520, 200, false, true, false, true, NOW(), NOW()) ON CONFLICT DO NOTHING;

-- ==========================================
-- THONG KE
-- ==========================================
SELECT 'phong_ban' as bang, COUNT(*) as so_luong FROM phong_ban UNION ALL SELECT 'nhan_vien', COUNT(*) FROM nhan_vien UNION ALL SELECT 'nguoi_dung', COUNT(*) FROM nguoi_dung UNION ALL SELECT 'khoan_luong', COUNT(*) FROM khoan_luong UNION ALL SELECT 'ca_lam_viec', COUNT(*) FROM ca_lam_viec UNION ALL SELECT 'lich_phan_ca_chi_tiet', COUNT(*) FROM lich_phan_ca_chi_tiet UNION ALL SELECT 'chi_tiet_cham_cong', COUNT(*) FROM chi_tiet_cham_cong UNION ALL SELECT 'don_nghi_phep', COUNT(*) FROM don_nghi_phep UNION ALL SELECT 'don_yeu_cau', COUNT(*) FROM don_yeu_cau UNION ALL SELECT 'phu_cap_nhan_vien', COUNT(*) FROM phu_cap_nhan_vien ORDER BY bang;
