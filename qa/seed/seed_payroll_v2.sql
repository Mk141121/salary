-- =============================================================================
-- SEED DATA: Bảng lương tháng 6-11/2025 - FIXED VERSION
-- =============================================================================

DO $$
DECLARE
    v_thang INT;
    v_pb_id INT;
    v_bl_id INT;
    v_nv RECORD;
    v_luong_cb NUMERIC;
    v_so_ngay INT;
BEGIN
    -- Loop qua tháng 6-11
    FOR v_thang IN 6..11 LOOP
        -- Loop qua các phòng ban hoạt động
        FOR v_pb_id IN SELECT id FROM phong_ban WHERE trang_thai = 'HOAT_DONG' LOOP
            -- Tạo bảng lương cho phòng ban
            INSERT INTO bang_luong (thang, nam, phong_ban_id, ten_bang_luong, trang_thai, ngay_chot, nguoi_chot, ngay_tao, ngay_cap_nhat)
            VALUES (v_thang, 2025, v_pb_id, 
                    'Bảng lương T' || LPAD(v_thang::TEXT, 2, '0') || '/2025',
                    'DA_CHOT',
                    ('2025-' || LPAD((v_thang + 1)::TEXT, 2, '0') || '-05 10:00:00')::TIMESTAMP,
                    'admin', NOW(), NOW())
            RETURNING id INTO v_bl_id;
            
            -- Loop qua nhân viên của phòng ban
            FOR v_nv IN SELECT id, ma_nhan_vien, ho_ten FROM nhan_vien WHERE phong_ban_id = v_pb_id AND trang_thai = 'DANG_LAM' LOOP
                -- Random lương cơ bản
                v_luong_cb := CASE 
                    WHEN v_pb_id IN (28, 29) THEN 8000000 + (RANDOM() * 4000000)::INT
                    WHEN v_pb_id = 30 THEN 6500000 + (RANDOM() * 2000000)::INT
                    ELSE 5500000 + (RANDOM() * 1500000)::INT
                END;
                
                -- Lương cơ bản (16)
                INSERT INTO chi_tiet_bang_luong (bang_luong_id, nhan_vien_id, khoan_luong_id, so_tien, nguon, ngay_tao, ngay_cap_nhat)
                VALUES (v_bl_id, v_nv.id, 16, v_luong_cb, 'CO_DINH', NOW(), NOW());
                
                -- Phụ cấp xăng xe (17) - Giao hàng, Kinh doanh
                IF v_pb_id IN (29, 30) THEN
                    INSERT INTO chi_tiet_bang_luong (bang_luong_id, nhan_vien_id, khoan_luong_id, so_tien, nguon, ngay_tao, ngay_cap_nhat)
                    VALUES (v_bl_id, v_nv.id, 17, CASE WHEN v_pb_id = 30 THEN 1500000 ELSE 1000000 END, 'CO_DINH', NOW(), NOW());
                END IF;
                
                -- Phụ cấp điện thoại (18) - KD, MKT, DH
                IF v_pb_id IN (29, 33, 34) THEN
                    INSERT INTO chi_tiet_bang_luong (bang_luong_id, nhan_vien_id, khoan_luong_id, so_tien, nguon, ngay_tao, ngay_cap_nhat)
                    VALUES (v_bl_id, v_nv.id, 18, 300000, 'CO_DINH', NOW(), NOW());
                END IF;
                
                -- Hỗ trợ ăn ca (19) - tất cả
                INSERT INTO chi_tiet_bang_luong (bang_luong_id, nhan_vien_id, khoan_luong_id, so_tien, nguon, ngay_tao, ngay_cap_nhat)
                VALUES (v_bl_id, v_nv.id, 19, 660000, 'CO_DINH', NOW(), NOW());
                
                -- Hỗ trợ chuyên cần (20) - 70%
                IF RANDOM() > 0.3 THEN
                    INSERT INTO chi_tiet_bang_luong (bang_luong_id, nhan_vien_id, khoan_luong_id, so_tien, nguon, ngay_tao, ngay_cap_nhat)
                    VALUES (v_bl_id, v_nv.id, 20, 500000, 'CO_DINH', NOW(), NOW());
                END IF;
                
                -- Phụ cấp chức vụ (21) - 1/3 nhân viên
                IF MOD(v_nv.id, 3) = 0 THEN
                    INSERT INTO chi_tiet_bang_luong (bang_luong_id, nhan_vien_id, khoan_luong_id, so_tien, nguon, ngay_tao, ngay_cap_nhat)
                    VALUES (v_bl_id, v_nv.id, 21, CASE WHEN MOD(v_nv.id, 5) = 0 THEN 2000000 ELSE 1000000 END, 'CO_DINH', NOW(), NOW());
                END IF;
                
                -- Thưởng KPI (22) - 60%
                IF RANDOM() > 0.4 THEN
                    INSERT INTO chi_tiet_bang_luong (bang_luong_id, nhan_vien_id, khoan_luong_id, so_tien, nguon, ngay_tao, ngay_cap_nhat)
                    VALUES (v_bl_id, v_nv.id, 22, 500000 + (RANDOM() * 2000000)::INT, 'RULE', NOW(), NOW());
                END IF;
                
                -- Thưởng doanh số (23) - Kinh doanh
                IF v_pb_id = 29 THEN
                    INSERT INTO chi_tiet_bang_luong (bang_luong_id, nhan_vien_id, khoan_luong_id, so_tien, nguon, ngay_tao, ngay_cap_nhat)
                    VALUES (v_bl_id, v_nv.id, 23, 1000000 + (RANDOM() * 5000000)::INT, 'RULE', NOW(), NOW());
                END IF;
                
                -- BHXH 8% (24)
                INSERT INTO chi_tiet_bang_luong (bang_luong_id, nhan_vien_id, khoan_luong_id, so_tien, nguon, ngay_tao, ngay_cap_nhat)
                VALUES (v_bl_id, v_nv.id, 24, v_luong_cb * 0.08, 'RULE', NOW(), NOW());
                
                -- BHYT 1.5% (25)
                INSERT INTO chi_tiet_bang_luong (bang_luong_id, nhan_vien_id, khoan_luong_id, so_tien, nguon, ngay_tao, ngay_cap_nhat)
                VALUES (v_bl_id, v_nv.id, 25, v_luong_cb * 0.015, 'RULE', NOW(), NOW());
                
                -- BHTN 1% (26)
                INSERT INTO chi_tiet_bang_luong (bang_luong_id, nhan_vien_id, khoan_luong_id, so_tien, nguon, ngay_tao, ngay_cap_nhat)
                VALUES (v_bl_id, v_nv.id, 26, v_luong_cb * 0.01, 'RULE', NOW(), NOW());
                
                -- Thuế TNCN (27) - nếu lương > 11tr
                IF v_luong_cb > 11000000 THEN
                    INSERT INTO chi_tiet_bang_luong (bang_luong_id, nhan_vien_id, khoan_luong_id, so_tien, nguon, ngay_tao, ngay_cap_nhat)
                    VALUES (v_bl_id, v_nv.id, 27, (v_luong_cb - 11000000) * 0.05, 'RULE', NOW(), NOW());
                END IF;
                
                -- Phạt đi trễ (28) - 20%
                IF RANDOM() < 0.2 THEN
                    INSERT INTO chi_tiet_bang_luong (bang_luong_id, nhan_vien_id, khoan_luong_id, so_tien, nguon, ngay_tao, ngay_cap_nhat)
                    VALUES (v_bl_id, v_nv.id, 28, 50000 + (RANDOM() * 200000)::INT, 'NHAP_TAY', NOW(), NOW());
                END IF;
                
                -- Ngày công
                v_so_ngay := 22 + (RANDOM() * 4)::INT;
                INSERT INTO ngay_cong_bang_luong (bang_luong_id, nhan_vien_id, ngay_cong_ly_thuyet, so_cong_thuc_te, 
                    so_ngay_nghi_phep, so_ngay_nghi_co_phep, so_ngay_nghi_khong_phep, so_ngay_nghi_co_luong, so_ngay_nghi_khong_luong, ngay_tao, ngay_cap_nhat)
                VALUES (v_bl_id, v_nv.id, 26, v_so_ngay, 
                    (RANDOM() * 2)::INT, (RANDOM() * 1)::INT, CASE WHEN RANDOM() < 0.1 THEN 1 ELSE 0 END, 0, 0, NOW(), NOW());
                
            END LOOP; -- END nhan_vien loop
        END LOOP; -- END phong_ban loop
    END LOOP; -- END thang loop
    
    RAISE NOTICE 'Đã tạo bảng lương tháng 6-11/2025';
END $$;

-- Tạo snapshot
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

-- Sự kiện thưởng phạt
DO $$
DECLARE
    v_nv RECORD;
    v_month INT;
BEGIN
    FOR v_nv IN SELECT id, phong_ban_id FROM nhan_vien WHERE trang_thai = 'DANG_LAM' LOOP
        -- Thưởng hoàn thành xuất sắc - 40%
        IF RANDOM() > 0.6 THEN
            v_month := 6 + (RANDOM() * 5)::INT;
            INSERT INTO su_kien_thuong_phat (nhan_vien_id, phong_ban_id, ngay, loai_su_kien, ma_su_kien, gia_tri, so_tien, ghi_chu, trang_thai, nguoi_tao, ngay_tao, ngay_cap_nhat)
            VALUES (v_nv.id, v_nv.phong_ban_id,
                    ('2025-' || LPAD(v_month::TEXT, 2, '0') || '-' || LPAD((10 + (RANDOM() * 15)::INT)::TEXT, 2, '0'))::TIMESTAMP,
                    'THUONG', 'HOAN_THANH_XUAT_SAC', 1, 500000 + (RANDOM() * 1500000)::INT,
                    'Hoàn thành xuất sắc nhiệm vụ', 'DA_DUYET', 'admin', NOW(), NOW());
        END IF;
        
        -- Thưởng sáng kiến - 20%
        IF RANDOM() > 0.8 AND v_nv.phong_ban_id IN (28, 29, 31) THEN
            v_month := 6 + (RANDOM() * 5)::INT;
            INSERT INTO su_kien_thuong_phat (nhan_vien_id, phong_ban_id, ngay, loai_su_kien, ma_su_kien, gia_tri, so_tien, ghi_chu, trang_thai, nguoi_tao, ngay_tao, ngay_cap_nhat)
            VALUES (v_nv.id, v_nv.phong_ban_id,
                    ('2025-' || LPAD(v_month::TEXT, 2, '0') || '-15')::TIMESTAMP,
                    'THUONG', 'SANG_KIEN', 1, 300000 + (RANDOM() * 700000)::INT,
                    'Sáng kiến cải tiến quy trình', 'DA_DUYET', 'admin', NOW(), NOW());
        END IF;
        
        -- Phạt đi trễ - 25%
        IF RANDOM() < 0.25 THEN
            v_month := 6 + (RANDOM() * 5)::INT;
            INSERT INTO su_kien_thuong_phat (nhan_vien_id, phong_ban_id, ngay, loai_su_kien, ma_su_kien, gia_tri, so_tien, ghi_chu, trang_thai, nguoi_tao, ngay_tao, ngay_cap_nhat)
            VALUES (v_nv.id, v_nv.phong_ban_id,
                    ('2025-' || LPAD(v_month::TEXT, 2, '0') || '-' || LPAD((5 + (RANDOM() * 20)::INT)::TEXT, 2, '0'))::TIMESTAMP,
                    'PHAT', 'DI_TRE', 1 + (RANDOM() * 3)::INT, 50000 * (1 + (RANDOM() * 3)::INT),
                    'Đi trễ quá 15 phút', 'DA_DUYET', 'admin', NOW(), NOW());
        END IF;
        
        -- Phạt sai quy trình - 10%
        IF RANDOM() < 0.1 THEN
            v_month := 7 + (RANDOM() * 4)::INT;
            INSERT INTO su_kien_thuong_phat (nhan_vien_id, phong_ban_id, ngay, loai_su_kien, ma_su_kien, gia_tri, so_tien, ghi_chu, trang_thai, nguoi_tao, ngay_tao, ngay_cap_nhat)
            VALUES (v_nv.id, v_nv.phong_ban_id,
                    ('2025-' || LPAD(v_month::TEXT, 2, '0') || '-' || LPAD((1 + (RANDOM() * 25)::INT)::TEXT, 2, '0'))::TIMESTAMP,
                    'PHAT', 'SAI_QUY_TRINH', 1, 100000 + (RANDOM() * 300000)::INT,
                    'Vi phạm quy trình làm việc', 'DA_DUYET', 'admin', NOW(), NOW());
        END IF;
    END LOOP;
END $$;

-- Sản lượng chia hàng (phòng 25)
INSERT INTO snapshot_san_luong_chia_hang (bang_luong_id, nhan_vien_id, tong_sp_dat, tong_sp_loi)
SELECT bl.id, nv.id,
       (1000 + (RANDOM() * 2000)::INT),  -- sản phẩm đạt
       (10 + (RANDOM() * 50)::INT)       -- sản phẩm lỗi
FROM bang_luong bl
JOIN nhan_vien nv ON nv.phong_ban_id = 25 AND nv.trang_thai = 'DANG_LAM'
WHERE bl.phong_ban_id = 25 AND bl.thang BETWEEN 6 AND 11 AND bl.nam = 2025;

-- Sản lượng giao hàng (phòng 30)
INSERT INTO snapshot_giao_hang (bang_luong_id, nhan_vien_id, tong_khoi_luong_thanh_cong, tong_so_lan_tre_gio, tong_so_lan_khong_lay_phieu)
SELECT bl.id, nv.id,
       (500 + (RANDOM() * 2000)),  -- khối lượng thành công
       (0 + (RANDOM() * 5)::INT),  -- số lần trễ giờ
       (0 + (RANDOM() * 3)::INT)   -- số lần không lấy phiếu
FROM bang_luong bl
JOIN nhan_vien nv ON nv.phong_ban_id = 30 AND nv.trang_thai = 'DANG_LAM'
WHERE bl.phong_ban_id = 30 AND bl.thang BETWEEN 6 AND 11 AND bl.nam = 2025;

-- Verify
SELECT 'Bảng lương' as loai, thang, COUNT(*) as so_bang FROM bang_luong WHERE nam = 2025 AND thang BETWEEN 6 AND 11 GROUP BY thang ORDER BY thang;
SELECT 'Chi tiết' as loai, bl.thang, COUNT(DISTINCT ct.nhan_vien_id) as so_nv, COUNT(*) as so_dong 
FROM chi_tiet_bang_luong ct JOIN bang_luong bl ON ct.bang_luong_id = bl.id 
WHERE bl.nam = 2025 AND bl.thang BETWEEN 6 AND 11 GROUP BY bl.thang ORDER BY bl.thang;
