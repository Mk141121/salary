-- =============================================================================
-- SEED DATA: Bảng lương tháng 6-11/2025 cho tất cả phòng ban
-- Bao gồm: Thu nhập, Khấu trừ, Thưởng, Phạt, Sản lượng
-- =============================================================================

-- ===================== BẢNG LƯƠNG THÁNG 6-11/2025 =====================

-- Tháng 6/2025
INSERT INTO bang_luong (thang, nam, phong_ban_id, ten_bang_luong, trang_thai, ngay_chot, nguoi_chot, ngay_tao, ngay_cap_nhat)
SELECT 6, 2025, pb.id, 'Bảng lương T06/2025 - ' || pb.ten_phong_ban, 'DA_CHOT', 
       '2025-07-05 10:00:00', 'admin', NOW(), NOW()
FROM phong_ban pb WHERE pb.trang_thai = 'HOAT_DONG' AND pb.id IN (25, 28, 29, 30, 31, 33, 34, 35);

-- Tháng 7/2025
INSERT INTO bang_luong (thang, nam, phong_ban_id, ten_bang_luong, trang_thai, ngay_chot, nguoi_chot, ngay_tao, ngay_cap_nhat)
SELECT 7, 2025, pb.id, 'Bảng lương T07/2025 - ' || pb.ten_phong_ban, 'DA_CHOT', 
       '2025-08-05 10:00:00', 'admin', NOW(), NOW()
FROM phong_ban pb WHERE pb.trang_thai = 'HOAT_DONG' AND pb.id IN (25, 28, 29, 30, 31, 33, 34, 35);

-- Tháng 8/2025
INSERT INTO bang_luong (thang, nam, phong_ban_id, ten_bang_luong, trang_thai, ngay_chot, nguoi_chot, ngay_tao, ngay_cap_nhat)
SELECT 8, 2025, pb.id, 'Bảng lương T08/2025 - ' || pb.ten_phong_ban, 'DA_CHOT', 
       '2025-09-05 10:00:00', 'admin', NOW(), NOW()
FROM phong_ban pb WHERE pb.trang_thai = 'HOAT_DONG' AND pb.id IN (25, 28, 29, 30, 31, 33, 34, 35);

-- Tháng 9/2025
INSERT INTO bang_luong (thang, nam, phong_ban_id, ten_bang_luong, trang_thai, ngay_chot, nguoi_chot, ngay_tao, ngay_cap_nhat)
SELECT 9, 2025, pb.id, 'Bảng lương T09/2025 - ' || pb.ten_phong_ban, 'DA_CHOT', 
       '2025-10-05 10:00:00', 'admin', NOW(), NOW()
FROM phong_ban pb WHERE pb.trang_thai = 'HOAT_DONG' AND pb.id IN (25, 28, 29, 30, 31, 33, 34, 35);

-- Tháng 10/2025
INSERT INTO bang_luong (thang, nam, phong_ban_id, ten_bang_luong, trang_thai, ngay_chot, nguoi_chot, ngay_tao, ngay_cap_nhat)
SELECT 10, 2025, pb.id, 'Bảng lương T10/2025 - ' || pb.ten_phong_ban, 'DA_CHOT', 
       '2025-11-05 10:00:00', 'admin', NOW(), NOW()
FROM phong_ban pb WHERE pb.trang_thai = 'HOAT_DONG' AND pb.id IN (25, 28, 29, 30, 31, 33, 34, 35);

-- Tháng 11/2025
INSERT INTO bang_luong (thang, nam, phong_ban_id, ten_bang_luong, trang_thai, ngay_chot, nguoi_chot, ngay_tao, ngay_cap_nhat)
SELECT 11, 2025, pb.id, 'Bảng lương T11/2025 - ' || pb.ten_phong_ban, 'DA_CHOT', 
       '2025-12-05 10:00:00', 'admin', NOW(), NOW()
FROM phong_ban pb WHERE pb.trang_thai = 'HOAT_DONG' AND pb.id IN (25, 28, 29, 30, 31, 33, 34, 35);

-- ===================== CHI TIẾT BẢNG LƯƠNG =====================
-- Insert chi tiết cho mỗi nhân viên vào bảng lương tương ứng

-- Lương cơ bản (ID 16)
INSERT INTO chi_tiet_bang_luong (bang_luong_id, nhan_vien_id, khoan_luong_id, so_tien, nguon, ngay_tao, ngay_cap_nhat)
SELECT bl.id, nv.id, 16, 
       CASE 
         WHEN pb.id IN (28, 29) THEN 8000000 + (RANDOM() * 4000000)::INT  -- Kế toán, Kinh doanh cao hơn
         WHEN pb.id = 30 THEN 6500000 + (RANDOM() * 2000000)::INT -- Giao hàng
         ELSE 5500000 + (RANDOM() * 1500000)::INT -- Các phòng khác
       END,
       'TU_DONG', NOW(), NOW()
FROM bang_luong bl
JOIN phong_ban pb ON bl.phong_ban_id = pb.id
JOIN nhan_vien nv ON nv.phong_ban_id = pb.id AND nv.trang_thai = 'DANG_LAM'
WHERE bl.thang BETWEEN 6 AND 11 AND bl.nam = 2025;

-- Phụ cấp xăng xe (ID 17) - chỉ giao hàng và kinh doanh
INSERT INTO chi_tiet_bang_luong (bang_luong_id, nhan_vien_id, khoan_luong_id, so_tien, nguon, ngay_tao, ngay_cap_nhat)
SELECT bl.id, nv.id, 17, 
       CASE 
         WHEN pb.id = 30 THEN 1500000  -- Giao hàng
         WHEN pb.id = 29 THEN 1000000  -- Kinh doanh
         ELSE 500000
       END,
       'TU_DONG', NOW(), NOW()
FROM bang_luong bl
JOIN phong_ban pb ON bl.phong_ban_id = pb.id
JOIN nhan_vien nv ON nv.phong_ban_id = pb.id AND nv.trang_thai = 'DANG_LAM'
WHERE bl.thang BETWEEN 6 AND 11 AND bl.nam = 2025 AND pb.id IN (29, 30);

-- Phụ cấp điện thoại (ID 18) - Kinh doanh, Marketing, Đơn hàng
INSERT INTO chi_tiet_bang_luong (bang_luong_id, nhan_vien_id, khoan_luong_id, so_tien, nguon, ngay_tao, ngay_cap_nhat)
SELECT bl.id, nv.id, 18, 300000, 'TU_DONG', NOW(), NOW()
FROM bang_luong bl
JOIN phong_ban pb ON bl.phong_ban_id = pb.id
JOIN nhan_vien nv ON nv.phong_ban_id = pb.id AND nv.trang_thai = 'DANG_LAM'
WHERE bl.thang BETWEEN 6 AND 11 AND bl.nam = 2025 AND pb.id IN (29, 33, 34);

-- Hỗ trợ ăn ca (ID 19) - tất cả
INSERT INTO chi_tiet_bang_luong (bang_luong_id, nhan_vien_id, khoan_luong_id, so_tien, nguon, ngay_tao, ngay_cap_nhat)
SELECT bl.id, nv.id, 19, 660000, 'TU_DONG', NOW(), NOW()
FROM bang_luong bl
JOIN phong_ban pb ON bl.phong_ban_id = pb.id
JOIN nhan_vien nv ON nv.phong_ban_id = pb.id AND nv.trang_thai = 'DANG_LAM'
WHERE bl.thang BETWEEN 6 AND 11 AND bl.nam = 2025;

-- Hỗ trợ chuyên cần (ID 20) - random 70% nhân viên được
INSERT INTO chi_tiet_bang_luong (bang_luong_id, nhan_vien_id, khoan_luong_id, so_tien, nguon, ngay_tao, ngay_cap_nhat)
SELECT bl.id, nv.id, 20, 500000, 'TU_DONG', NOW(), NOW()
FROM bang_luong bl
JOIN phong_ban pb ON bl.phong_ban_id = pb.id
JOIN nhan_vien nv ON nv.phong_ban_id = pb.id AND nv.trang_thai = 'DANG_LAM'
WHERE bl.thang BETWEEN 6 AND 11 AND bl.nam = 2025 AND RANDOM() > 0.3;

-- Phụ cấp chức vụ (ID 21) - một số nhân viên
INSERT INTO chi_tiet_bang_luong (bang_luong_id, nhan_vien_id, khoan_luong_id, so_tien, nguon, ngay_tao, ngay_cap_nhat)
SELECT bl.id, nv.id, 21, 
       CASE WHEN MOD(nv.id, 5) = 0 THEN 2000000 ELSE 1000000 END,
       'TU_DONG', NOW(), NOW()
FROM bang_luong bl
JOIN phong_ban pb ON bl.phong_ban_id = pb.id
JOIN nhan_vien nv ON nv.phong_ban_id = pb.id AND nv.trang_thai = 'DANG_LAM'
WHERE bl.thang BETWEEN 6 AND 11 AND bl.nam = 2025 AND MOD(nv.id, 3) = 0;

-- Thưởng KPI (ID 22) - random
INSERT INTO chi_tiet_bang_luong (bang_luong_id, nhan_vien_id, khoan_luong_id, so_tien, nguon, ngay_tao, ngay_cap_nhat)
SELECT bl.id, nv.id, 22, 
       (500000 + (RANDOM() * 2000000)::INT),
       'TU_DONG', NOW(), NOW()
FROM bang_luong bl
JOIN phong_ban pb ON bl.phong_ban_id = pb.id
JOIN nhan_vien nv ON nv.phong_ban_id = pb.id AND nv.trang_thai = 'DANG_LAM'
WHERE bl.thang BETWEEN 6 AND 11 AND bl.nam = 2025 AND RANDOM() > 0.4;

-- Thưởng doanh số (ID 23) - Kinh doanh
INSERT INTO chi_tiet_bang_luong (bang_luong_id, nhan_vien_id, khoan_luong_id, so_tien, nguon, ngay_tao, ngay_cap_nhat)
SELECT bl.id, nv.id, 23, 
       (1000000 + (RANDOM() * 5000000)::INT),
       'TU_DONG', NOW(), NOW()
FROM bang_luong bl
JOIN phong_ban pb ON bl.phong_ban_id = pb.id
JOIN nhan_vien nv ON nv.phong_ban_id = pb.id AND nv.trang_thai = 'DANG_LAM'
WHERE bl.thang BETWEEN 6 AND 11 AND bl.nam = 2025 AND pb.id = 29;

-- ===================== KHẤU TRỪ =====================

-- BHXH 8% (ID 24)
INSERT INTO chi_tiet_bang_luong (bang_luong_id, nhan_vien_id, khoan_luong_id, so_tien, nguon, ngay_tao, ngay_cap_nhat)
SELECT bl.id, nv.id, 24,
       (SELECT COALESCE(SUM(ct.so_tien), 0) * 0.08 FROM chi_tiet_bang_luong ct 
        WHERE ct.bang_luong_id = bl.id AND ct.nhan_vien_id = nv.id AND ct.khoan_luong_id = 16),
       'TU_DONG', NOW(), NOW()
FROM bang_luong bl
JOIN phong_ban pb ON bl.phong_ban_id = pb.id
JOIN nhan_vien nv ON nv.phong_ban_id = pb.id AND nv.trang_thai = 'DANG_LAM'
WHERE bl.thang BETWEEN 6 AND 11 AND bl.nam = 2025;

-- BHYT 1.5% (ID 25)
INSERT INTO chi_tiet_bang_luong (bang_luong_id, nhan_vien_id, khoan_luong_id, so_tien, nguon, ngay_tao, ngay_cap_nhat)
SELECT bl.id, nv.id, 25,
       (SELECT COALESCE(SUM(ct.so_tien), 0) * 0.015 FROM chi_tiet_bang_luong ct 
        WHERE ct.bang_luong_id = bl.id AND ct.nhan_vien_id = nv.id AND ct.khoan_luong_id = 16),
       'TU_DONG', NOW(), NOW()
FROM bang_luong bl
JOIN phong_ban pb ON bl.phong_ban_id = pb.id
JOIN nhan_vien nv ON nv.phong_ban_id = pb.id AND nv.trang_thai = 'DANG_LAM'
WHERE bl.thang BETWEEN 6 AND 11 AND bl.nam = 2025;

-- BHTN 1% (ID 26)
INSERT INTO chi_tiet_bang_luong (bang_luong_id, nhan_vien_id, khoan_luong_id, so_tien, nguon, ngay_tao, ngay_cap_nhat)
SELECT bl.id, nv.id, 26,
       (SELECT COALESCE(SUM(ct.so_tien), 0) * 0.01 FROM chi_tiet_bang_luong ct 
        WHERE ct.bang_luong_id = bl.id AND ct.nhan_vien_id = nv.id AND ct.khoan_luong_id = 16),
       'TU_DONG', NOW(), NOW()
FROM bang_luong bl
JOIN phong_ban pb ON bl.phong_ban_id = pb.id
JOIN nhan_vien nv ON nv.phong_ban_id = pb.id AND nv.trang_thai = 'DANG_LAM'
WHERE bl.thang BETWEEN 6 AND 11 AND bl.nam = 2025;

-- Thuế TNCN (ID 27) - chỉ lương cao
INSERT INTO chi_tiet_bang_luong (bang_luong_id, nhan_vien_id, khoan_luong_id, so_tien, nguon, ngay_tao, ngay_cap_nhat)
SELECT bl.id, nv.id, 27,
       GREATEST(0, ((SELECT COALESCE(SUM(ct.so_tien), 0) FROM chi_tiet_bang_luong ct 
        WHERE ct.bang_luong_id = bl.id AND ct.nhan_vien_id = nv.id AND ct.khoan_luong_id IN (16, 22, 23)) - 11000000) * 0.05),
       'TU_DONG', NOW(), NOW()
FROM bang_luong bl
JOIN phong_ban pb ON bl.phong_ban_id = pb.id
JOIN nhan_vien nv ON nv.phong_ban_id = pb.id AND nv.trang_thai = 'DANG_LAM'
WHERE bl.thang BETWEEN 6 AND 11 AND bl.nam = 2025;

-- Phạt đi trễ (ID 28) - random 20%
INSERT INTO chi_tiet_bang_luong (bang_luong_id, nhan_vien_id, khoan_luong_id, so_tien, nguon, ngay_tao, ngay_cap_nhat)
SELECT bl.id, nv.id, 28,
       (50000 + (RANDOM() * 200000)::INT),
       'NHAP_TAY', NOW(), NOW()
FROM bang_luong bl
JOIN phong_ban pb ON bl.phong_ban_id = pb.id
JOIN nhan_vien nv ON nv.phong_ban_id = pb.id AND nv.trang_thai = 'DANG_LAM'
WHERE bl.thang BETWEEN 6 AND 11 AND bl.nam = 2025 AND RANDOM() < 0.2;

-- ===================== NGÀY CÔNG =====================
INSERT INTO ngay_cong_bang_luong (bang_luong_id, nhan_vien_id, so_ngay_cong, nghi_co_phep, nghi_khong_phep, ngay_tao, ngay_cap_nhat)
SELECT bl.id, nv.id, 
       22 + (RANDOM() * 4)::INT,  -- 22-26 ngày
       (RANDOM() * 2)::INT,       -- 0-2 ngày nghỉ phép
       CASE WHEN RANDOM() < 0.1 THEN 1 ELSE 0 END,  -- 10% nghỉ không phép
       NOW(), NOW()
FROM bang_luong bl
JOIN phong_ban pb ON bl.phong_ban_id = pb.id
JOIN nhan_vien nv ON nv.phong_ban_id = pb.id AND nv.trang_thai = 'DANG_LAM'
WHERE bl.thang BETWEEN 6 AND 11 AND bl.nam = 2025;

-- ===================== SNAPSHOT BẢNG LƯƠNG =====================
INSERT INTO snapshot_bang_luong (bang_luong_id, nhan_vien_id, ma_nhan_vien, ho_ten, phong_ban, phong_ban_id, 
                                 khoan_luong_id, ma_khoan, ten_khoan, loai_khoan, so_tien, nguon, ngay_chot, nguoi_chot, ngay_tao)
SELECT ct.bang_luong_id, ct.nhan_vien_id, nv.ma_nhan_vien, nv.ho_ten, pb.ten_phong_ban, pb.id,
       ct.khoan_luong_id, kl.ma_khoan, kl.ten_khoan, kl.loai, ct.so_tien, ct.nguon, bl.ngay_chot, bl.nguoi_chot, NOW()
FROM chi_tiet_bang_luong ct
JOIN bang_luong bl ON ct.bang_luong_id = bl.id
JOIN nhan_vien nv ON ct.nhan_vien_id = nv.id
JOIN phong_ban pb ON nv.phong_ban_id = pb.id
JOIN khoan_luong kl ON ct.khoan_luong_id = kl.id
WHERE bl.thang BETWEEN 6 AND 11 AND bl.nam = 2025;

-- ===================== SỰ KIỆN THƯỞNG PHẠT =====================

-- Thưởng hoàn thành xuất sắc
INSERT INTO su_kien_thuong_phat (nhan_vien_id, phong_ban_id, ngay, loai_su_kien, ma_su_kien, gia_tri, so_tien, ghi_chu, trang_thai, nguoi_tao, ngay_tao, ngay_cap_nhat)
SELECT nv.id, nv.phong_ban_id, 
       ('2025-' || LPAD((5 + ROW_NUMBER() OVER(ORDER BY nv.id) % 6 + 1)::TEXT, 2, '0') || '-' || LPAD((10 + (RANDOM() * 15)::INT)::TEXT, 2, '0'))::TIMESTAMP,
       'THUONG', 'HOAN_THANH_XUAT_SAC', 1, 
       (500000 + (RANDOM() * 1500000)::INT),
       'Hoàn thành xuất sắc nhiệm vụ được giao',
       'DA_DUYET', 'admin', NOW(), NOW()
FROM nhan_vien nv
WHERE nv.trang_thai = 'DANG_LAM' AND RANDOM() > 0.6;

-- Thưởng sáng kiến
INSERT INTO su_kien_thuong_phat (nhan_vien_id, phong_ban_id, ngay, loai_su_kien, ma_su_kien, gia_tri, so_tien, ghi_chu, trang_thai, nguoi_tao, ngay_tao, ngay_cap_nhat)
SELECT nv.id, nv.phong_ban_id,
       ('2025-' || LPAD((6 + (RANDOM() * 5)::INT)::TEXT, 2, '0') || '-15')::TIMESTAMP,
       'THUONG', 'SANG_KIEN', 1,
       (300000 + (RANDOM() * 700000)::INT),
       'Có sáng kiến cải tiến quy trình',
       'DA_DUYET', 'admin', NOW(), NOW()
FROM nhan_vien nv
WHERE nv.trang_thai = 'DANG_LAM' AND nv.phong_ban_id IN (28, 29, 31) AND RANDOM() > 0.7;

-- Phạt đi trễ
INSERT INTO su_kien_thuong_phat (nhan_vien_id, phong_ban_id, ngay, loai_su_kien, ma_su_kien, gia_tri, so_tien, ghi_chu, trang_thai, nguoi_tao, ngay_tao, ngay_cap_nhat)
SELECT nv.id, nv.phong_ban_id,
       ('2025-' || LPAD((6 + (RANDOM() * 5)::INT)::TEXT, 2, '0') || '-' || LPAD((5 + (RANDOM() * 20)::INT)::TEXT, 2, '0'))::TIMESTAMP,
       'PHAT', 'DI_TRE', (1 + (RANDOM() * 3)::INT),
       (50000 * (1 + (RANDOM() * 3)::INT)),
       'Đi trễ quá 15 phút',
       'DA_DUYET', 'admin', NOW(), NOW()
FROM nhan_vien nv
WHERE nv.trang_thai = 'DANG_LAM' AND RANDOM() < 0.25;

-- Phạt sai quy trình
INSERT INTO su_kien_thuong_phat (nhan_vien_id, phong_ban_id, ngay, loai_su_kien, ma_su_kien, gia_tri, so_tien, ghi_chu, trang_thai, nguoi_tao, ngay_tao, ngay_cap_nhat)
SELECT nv.id, nv.phong_ban_id,
       ('2025-' || LPAD((7 + (RANDOM() * 4)::INT)::TEXT, 2, '0') || '-' || LPAD((1 + (RANDOM() * 25)::INT)::TEXT, 2, '0'))::TIMESTAMP,
       'PHAT', 'SAI_QUY_TRINH', 1,
       (100000 + (RANDOM() * 300000)::INT),
       'Vi phạm quy trình làm việc',
       'DA_DUYET', 'admin', NOW(), NOW()
FROM nhan_vien nv
WHERE nv.trang_thai = 'DANG_LAM' AND RANDOM() < 0.1;

-- ===================== SẢN LƯỢNG CHIA HÀNG =====================
-- Chỉ cho phòng Chia hàng (id=25)
INSERT INTO snapshot_san_luong_chia_hang (bang_luong_id, nhan_vien_id, ngay, so_don, tong_san_luong, don_gia, thanh_tien, ngay_tao)
SELECT bl.id, nv.id,
       ('2025-' || LPAD(bl.thang::TEXT, 2, '0') || '-' || LPAD((1 + (g.n * 5))::TEXT, 2, '0'))::TIMESTAMP,
       (50 + (RANDOM() * 100)::INT),  -- số đơn
       (500 + (RANDOM() * 1500)::INT), -- sản lượng
       3500,  -- đơn giá
       (500 + (RANDOM() * 1500)::INT) * 3500,  -- thành tiền
       NOW()
FROM bang_luong bl
JOIN nhan_vien nv ON nv.phong_ban_id = 25 AND nv.trang_thai = 'DANG_LAM'
CROSS JOIN (SELECT generate_series(0, 5) as n) g
WHERE bl.phong_ban_id = 25 AND bl.thang BETWEEN 6 AND 11 AND bl.nam = 2025;

-- ===================== SẢN LƯỢNG GIAO HÀNG =====================
-- Chỉ cho phòng Giao hàng (id=30)
INSERT INTO snapshot_giao_hang (bang_luong_id, nhan_vien_id, ngay, so_chuyen, khoi_luong, khoang_cach, don_gia, thanh_tien, ngay_tao)
SELECT bl.id, nv.id,
       ('2025-' || LPAD(bl.thang::TEXT, 2, '0') || '-' || LPAD((1 + (g.n * 4))::TEXT, 2, '0'))::TIMESTAMP,
       (3 + (RANDOM() * 8)::INT),  -- số chuyến
       (50 + (RANDOM() * 200)::INT), -- khối lượng (kg)
       (10 + (RANDOM() * 40)::INT),  -- khoảng cách (km)
       5000,  -- đơn giá/km
       (10 + (RANDOM() * 40)::INT) * 5000,  -- thành tiền
       NOW()
FROM bang_luong bl
JOIN nhan_vien nv ON nv.phong_ban_id = 30 AND nv.trang_thai = 'DANG_LAM'
CROSS JOIN (SELECT generate_series(0, 6) as n) g
WHERE bl.phong_ban_id = 30 AND bl.thang BETWEEN 6 AND 11 AND bl.nam = 2025;

-- ===================== VERIFY DATA =====================
SELECT 'Tổng bảng lương mới' as info, COUNT(*) as count FROM bang_luong WHERE thang BETWEEN 6 AND 11 AND nam = 2025;
SELECT 'Tổng chi tiết mới' as info, COUNT(*) as count FROM chi_tiet_bang_luong ct 
  JOIN bang_luong bl ON ct.bang_luong_id = bl.id WHERE bl.thang BETWEEN 6 AND 11 AND bl.nam = 2025;
SELECT 'Tổng sự kiện thưởng phạt' as info, COUNT(*) as count FROM su_kien_thuong_phat WHERE ngay >= '2025-06-01';
SELECT 'Sản lượng chia hàng' as info, COUNT(*) as count FROM snapshot_san_luong_chia_hang;
SELECT 'Sản lượng giao hàng' as info, COUNT(*) as count FROM snapshot_giao_hang;
