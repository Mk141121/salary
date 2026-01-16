-- SEED DATA PAYROLL 2025 (06→12/2025)
-- Tạo dữ liệu demo đầy đủ cho hệ thống Payroll
-- Chạy: docker exec -i tinh-luong-db psql -U postgres -d tinh_luong < qa/seed/seed_payroll_2025.sql

-- ===============================================
-- 1. THONG TIN CONG TY (nếu chưa có)
-- ===============================================
INSERT INTO thong_tin_cong_ty (ten_cong_ty, ma_so_thue, dia_chi, dien_thoai, email, nguoi_dai_dien, chuc_vu_dai_dien, ngay_cong_chuan_mac_dinh, ngay_cap_nhat)
SELECT 'Công ty TNHH Demo Payroll', '0123456789', '123 Nguyễn Văn Linh, Quận 7, TP.HCM', '028-1234-5678', 'hr@demopayroll.vn', 'Nguyễn Văn Admin', 'Giám đốc', 26, NOW()
WHERE NOT EXISTS (SELECT 1 FROM thong_tin_cong_ty LIMIT 1);

-- ===============================================
-- 2. HOP DONG cho NV chưa có hợp đồng hiệu lực
-- ===============================================
INSERT INTO nhan_vien_hop_dong (nhan_vien_id, loai_hop_dong, tu_ngay, luong_co_ban, luong_dong_bh, he_so_luong, trang_thai, ghi_chu)
SELECT 
    nv.id,
    (ARRAY['VO_THOI_HAN', '1_NAM', '3_NAM'])[1 + floor(random() * 3)]::loai_hop_dong,
    '2024-01-01'::date,
    (8000000 + floor(random() * 17000000))::numeric(15,0), -- 8M - 25M
    LEAST((8000000 + floor(random() * 17000000))::numeric(15,0), 20000000),
    1.0,
    'HIEU_LUC'::trang_thai_hop_dong,
    'Seed data 2025'
FROM nhan_vien nv
WHERE nv.trang_thai = 'DANG_LAM'
  AND NOT EXISTS (
    SELECT 1 FROM nhan_vien_hop_dong hd 
    WHERE hd.nhan_vien_id = nv.id AND hd.trang_thai = 'HIEU_LUC'
  );

-- ===============================================
-- 3. PHU CAP cho NV
-- ===============================================
-- Phụ cấp xăng xe
INSERT INTO phu_cap_nhan_vien (nhan_vien_id, khoan_luong_id, so_tien, tu_ngay, trang_thai, ghi_chu, ngay_cap_nhat)
SELECT 
    nv.id,
    (SELECT id FROM khoan_luong WHERE ma_khoan = 'PHU_CAP_XANG_XE'),
    (300000 + floor(random() * 500000))::numeric(15,0),
    '2025-01-01'::date,
    'HIEU_LUC'::trang_thai_phu_cap,
    'Seed data 2025',
    NOW()
FROM nhan_vien nv
WHERE nv.trang_thai = 'DANG_LAM'
  AND EXISTS (SELECT 1 FROM khoan_luong WHERE ma_khoan = 'PHU_CAP_XANG_XE')
  AND NOT EXISTS (
    SELECT 1 FROM phu_cap_nhan_vien pc 
    WHERE pc.nhan_vien_id = nv.id 
      AND pc.khoan_luong_id = (SELECT id FROM khoan_luong WHERE ma_khoan = 'PHU_CAP_XANG_XE')
      AND pc.trang_thai = 'HIEU_LUC'
  );

-- Hỗ trợ chuyên cần
INSERT INTO phu_cap_nhan_vien (nhan_vien_id, khoan_luong_id, so_tien, tu_ngay, trang_thai, ghi_chu, ngay_cap_nhat)
SELECT 
    nv.id,
    (SELECT id FROM khoan_luong WHERE ma_khoan = 'HO_TRO_CHUYEN_CAN'),
    (500000 + floor(random() * 500000))::numeric(15,0),
    '2025-01-01'::date,
    'HIEU_LUC'::trang_thai_phu_cap,
    'Seed data 2025',
    NOW()
FROM nhan_vien nv
WHERE nv.trang_thai = 'DANG_LAM'
  AND EXISTS (SELECT 1 FROM khoan_luong WHERE ma_khoan = 'HO_TRO_CHUYEN_CAN')
  AND NOT EXISTS (
    SELECT 1 FROM phu_cap_nhan_vien pc 
    WHERE pc.nhan_vien_id = nv.id 
      AND pc.khoan_luong_id = (SELECT id FROM khoan_luong WHERE ma_khoan = 'HO_TRO_CHUYEN_CAN')
      AND pc.trang_thai = 'HIEU_LUC'
  );

-- Hỗ trợ ăn ca
INSERT INTO phu_cap_nhan_vien (nhan_vien_id, khoan_luong_id, so_tien, tu_ngay, trang_thai, ghi_chu, ngay_cap_nhat)
SELECT 
    nv.id,
    (SELECT id FROM khoan_luong WHERE ma_khoan = 'HO_TRO_AN_CA'),
    (500000 + floor(random() * 500000))::numeric(15,0),
    '2025-01-01'::date,
    'HIEU_LUC'::trang_thai_phu_cap,
    'Seed data 2025',
    NOW()
FROM nhan_vien nv
WHERE nv.trang_thai = 'DANG_LAM'
  AND EXISTS (SELECT 1 FROM khoan_luong WHERE ma_khoan = 'HO_TRO_AN_CA')
  AND NOT EXISTS (
    SELECT 1 FROM phu_cap_nhan_vien pc 
    WHERE pc.nhan_vien_id = nv.id 
      AND pc.khoan_luong_id = (SELECT id FROM khoan_luong WHERE ma_khoan = 'HO_TRO_AN_CA')
      AND pc.trang_thai = 'HIEU_LUC'
  );

-- ===============================================
-- 4. CHAM CONG cho 7 tháng (06-12/2025)
-- ===============================================
DO $$
DECLARE
    v_month INT;
    v_nhan_vien RECORD;
    v_so_cong_chuan NUMERIC(5,1);
    v_so_cong_thuc_te NUMERIC(5,1);
    v_so_nghi_phep NUMERIC(5,1);
    v_so_nghi_kl NUMERIC(5,1);
    v_so_lan_di_muon INT;
    v_rand FLOAT;
BEGIN
    FOR v_month IN 6..12 LOOP
        FOR v_nhan_vien IN 
            SELECT id FROM nhan_vien WHERE trang_thai = 'DANG_LAM'
        LOOP
            -- Check if already exists
            IF NOT EXISTS (
                SELECT 1 FROM cham_cong 
                WHERE nhan_vien_id = v_nhan_vien.id 
                  AND thang = v_month AND nam = 2025
            ) THEN
                -- Random attendance pattern
                v_rand := random();
                v_so_cong_chuan := 26;
                
                IF v_rand < 0.7 THEN
                    -- 70% full attendance
                    v_so_cong_thuc_te := 26;
                    v_so_nghi_phep := 0;
                    v_so_nghi_kl := 0;
                    v_so_lan_di_muon := floor(random() * 3);
                ELSIF v_rand < 0.9 THEN
                    -- 20% missing 1-2 days
                    v_so_nghi_phep := 1 + floor(random() * 2);
                    v_so_nghi_kl := 0;
                    v_so_cong_thuc_te := 26 - v_so_nghi_phep;
                    v_so_lan_di_muon := 1 + floor(random() * 3);
                ELSE
                    -- 10% missing more days
                    v_so_nghi_phep := 1 + floor(random() * 2);
                    v_so_nghi_kl := 1 + floor(random() * 2);
                    v_so_cong_thuc_te := 26 - v_so_nghi_phep - v_so_nghi_kl;
                    v_so_lan_di_muon := 3 + floor(random() * 3);
                END IF;
                
                INSERT INTO cham_cong (
                    nhan_vien_id, thang, nam, so_cong_chuan, so_cong_thuc_te,
                    so_ngay_nghi_phep, so_ngay_nghi_khong_luong, so_gio_ot,
                    so_gio_ot_dem, so_gio_ot_chu_nhat, so_gio_ot_le,
                    so_lan_di_muon, so_lan_ve_som, ghi_chu, ngay_cap_nhat
                ) VALUES (
                    v_nhan_vien.id, v_month, 2025, v_so_cong_chuan, v_so_cong_thuc_te,
                    v_so_nghi_phep, v_so_nghi_kl, floor(random() * 10),
                    0, 0, 0,
                    v_so_lan_di_muon, floor(random() * 2), 'Seed data', NOW()
                );
            END IF;
        END LOOP;
    END LOOP;
END $$;

-- ===============================================
-- 5. SAN LUONG CHIA HANG (cho NV phòng Chia hàng)
-- Columns: so_luong_sp_dat, so_luong_sp_loi
-- ===============================================
DO $$
DECLARE
    v_month INT;
    v_day INT;
    v_nhan_vien RECORD;
    v_ngay DATE;
    v_so_luong INT;
    v_so_luong_loi INT;
BEGIN
    FOR v_nhan_vien IN 
        SELECT nv.id FROM nhan_vien nv
        JOIN phong_ban pb ON nv.phong_ban_id = pb.id
        WHERE nv.trang_thai = 'DANG_LAM'
          AND (pb.ma_phong_ban IN ('CH', 'CHIA') OR pb.ten_phong_ban ILIKE '%chia%')
    LOOP
        FOR v_month IN 6..12 LOOP
            FOR v_day IN 1..28 LOOP
                v_ngay := make_date(2025, v_month, v_day);
                
                -- Skip Sundays
                IF EXTRACT(DOW FROM v_ngay) != 0 THEN
                    IF NOT EXISTS (
                        SELECT 1 FROM san_luong_chia_hang 
                        WHERE nhan_vien_id = v_nhan_vien.id AND ngay = v_ngay
                    ) THEN
                        v_so_luong := 150 + floor(random() * 250);
                        v_so_luong_loi := floor(random() * LEAST(20, v_so_luong * 0.1));
                        
                        INSERT INTO san_luong_chia_hang (
                            nhan_vien_id, ngay, so_luong_sp_dat, so_luong_sp_loi, 
                            nguon_du_lieu, khoa_sua, ghi_chu, cap_nhat_luc
                        ) VALUES (
                            v_nhan_vien.id, v_ngay, v_so_luong, v_so_luong_loi, 
                            'NHAP_TAY'::nguon_du_lieu, false, 'Seed data', NOW()
                        );
                    END IF;
                END IF;
            END LOOP;
        END LOOP;
    END LOOP;
END $$;

-- ===============================================
-- 6. GIAO HANG (cho NV phòng Giao hàng)
-- Columns: khoi_luong_thanh_cong, so_lan_tre_gio, so_lan_khong_lay_phieu
-- ===============================================
DO $$
DECLARE
    v_month INT;
    v_day INT;
    v_nhan_vien RECORD;
    v_ngay DATE;
    v_khoi_luong NUMERIC;
    v_so_lan_tre INT;
    v_so_lan_khong_phieu INT;
BEGIN
    FOR v_nhan_vien IN 
        SELECT nv.id FROM nhan_vien nv
        JOIN phong_ban pb ON nv.phong_ban_id = pb.id
        WHERE nv.trang_thai = 'DANG_LAM'
          AND (pb.ma_phong_ban IN ('SHIP', 'GIAO_HANG') OR pb.ten_phong_ban ILIKE '%giao%')
    LOOP
        FOR v_month IN 6..12 LOOP
            FOR v_day IN 1..28 LOOP
                v_ngay := make_date(2025, v_month, v_day);
                
                -- Skip Sundays
                IF EXTRACT(DOW FROM v_ngay) != 0 THEN
                    IF NOT EXISTS (
                        SELECT 1 FROM giao_hang 
                        WHERE nhan_vien_id = v_nhan_vien.id AND ngay = v_ngay
                    ) THEN
                        v_khoi_luong := 100 + random() * 400;
                        
                        -- Random penalties
                        IF random() < 0.15 THEN
                            v_so_lan_tre := 1 + floor(random() * 3);
                        ELSE
                            v_so_lan_tre := 0;
                        END IF;
                        
                        IF random() < 0.1 THEN
                            v_so_lan_khong_phieu := 1 + floor(random() * 2);
                        ELSE
                            v_so_lan_khong_phieu := 0;
                        END IF;
                        
                        INSERT INTO giao_hang (
                            nhan_vien_id, ngay, khoi_luong_thanh_cong, 
                            so_lan_tre_gio, so_lan_khong_lay_phieu,
                            nguon_du_lieu, khoa_sua, ghi_chu, cap_nhat_luc
                        ) VALUES (
                            v_nhan_vien.id, v_ngay, v_khoi_luong,
                            v_so_lan_tre, v_so_lan_khong_phieu,
                            'NHAP_TAY'::nguon_du_lieu, false, 'Seed data', NOW()
                        );
                    END IF;
                END IF;
            END LOOP;
        END LOOP;
    END LOOP;
END $$;

-- ===============================================
-- 7. BANG LUONG cho 7 tháng (06-12/2025)
-- nguon_chi_tiet: CHAM_CONG, CO_DINH, DIEU_CHINH, NHAP_TAY, PHAT_SINH, RULE
-- ===============================================
DO $$
DECLARE
    v_month INT;
    v_phong_ban RECORD;
    v_trang_thai trang_thai_bang_luong;
    v_ngay_chot TIMESTAMP;
    v_bang_luong_id INT;
    v_nv RECORD;
    v_khoan RECORD;
BEGIN
    FOR v_month IN 6..12 LOOP
        -- Determine status
        IF v_month <= 10 THEN
            v_trang_thai := 'KHOA';
            v_ngay_chot := NOW();
        ELSIF v_month = 11 THEN
            v_trang_thai := 'DA_CHOT';
            v_ngay_chot := NOW();
        ELSE
            v_trang_thai := 'NHAP';
            v_ngay_chot := NULL;
        END IF;
        
        FOR v_phong_ban IN SELECT id, ten_phong_ban FROM phong_ban LOOP
            -- Check if already exists
            IF NOT EXISTS (
                SELECT 1 FROM bang_luong 
                WHERE thang = v_month AND nam = 2025 AND phong_ban_id = v_phong_ban.id
            ) THEN
                INSERT INTO bang_luong (
                    thang, nam, phong_ban_id, ten_bang_luong, trang_thai, 
                    ngay_chot, nguoi_chot, ghi_chu, ngay_cap_nhat
                ) VALUES (
                    v_month, 2025, v_phong_ban.id, 
                    'Bảng lương ' || v_phong_ban.ten_phong_ban || ' - Tháng ' || v_month || '/2025',
                    v_trang_thai, v_ngay_chot, 
                    CASE WHEN v_ngay_chot IS NOT NULL THEN 'admin' ELSE NULL END,
                    'Seed data 2025', NOW()
                ) RETURNING id INTO v_bang_luong_id;
                
                -- Create chi tiet for NV in this department
                INSERT INTO chi_tiet_bang_luong (
                    bang_luong_id, nhan_vien_id, khoan_luong_id, so_tien, nguon, ghi_chu, ngay_cap_nhat
                )
                SELECT 
                    v_bang_luong_id,
                    nv.id,
                    (SELECT id FROM khoan_luong WHERE ma_khoan = 'LUONG_CO_BAN'),
                    COALESCE(hd.luong_co_ban, 10000000),
                    'CO_DINH'::nguon_chi_tiet,
                    'Seed data',
                    NOW()
                FROM nhan_vien nv
                LEFT JOIN nhan_vien_hop_dong hd ON hd.nhan_vien_id = nv.id AND hd.trang_thai = 'HIEU_LUC'
                WHERE nv.phong_ban_id = v_phong_ban.id AND nv.trang_thai = 'DANG_LAM'
                  AND NOT EXISTS (
                    SELECT 1 FROM chi_tiet_bang_luong ct 
                    WHERE ct.bang_luong_id = v_bang_luong_id AND ct.nhan_vien_id = nv.id
                  );
                
                -- Create snapshot if locked (row-per-nv-per-khoan)
                IF v_trang_thai IN ('KHOA', 'DA_CHOT') THEN
                    FOR v_nv IN 
                        SELECT nv.id, nv.ma_nhan_vien, nv.ho_ten, pb.ten_phong_ban, nv.phong_ban_id
                        FROM nhan_vien nv
                        JOIN phong_ban pb ON nv.phong_ban_id = pb.id
                        WHERE nv.phong_ban_id = v_phong_ban.id AND nv.trang_thai = 'DANG_LAM'
                    LOOP
                        FOR v_khoan IN
                            SELECT ct.khoan_luong_id, ct.so_tien, ct.nguon, kl.ma_khoan, kl.ten_khoan, kl.loai
                            FROM chi_tiet_bang_luong ct
                            JOIN khoan_luong kl ON ct.khoan_luong_id = kl.id
                            WHERE ct.bang_luong_id = v_bang_luong_id AND ct.nhan_vien_id = v_nv.id
                        LOOP
                            IF NOT EXISTS (
                                SELECT 1 FROM snapshot_bang_luong 
                                WHERE bang_luong_id = v_bang_luong_id 
                                  AND nhan_vien_id = v_nv.id 
                                  AND khoan_luong_id = v_khoan.khoan_luong_id
                            ) THEN
                                INSERT INTO snapshot_bang_luong (
                                    bang_luong_id, nhan_vien_id, ma_nhan_vien, ho_ten, phong_ban,
                                    khoan_luong_id, ma_khoan, ten_khoan, loai_khoan, so_tien, nguon,
                                    ngay_chot, nguoi_chot, phong_ban_id
                                ) VALUES (
                                    v_bang_luong_id, v_nv.id, v_nv.ma_nhan_vien, v_nv.ho_ten, v_nv.ten_phong_ban,
                                    v_khoan.khoan_luong_id, v_khoan.ma_khoan, v_khoan.ten_khoan, v_khoan.loai, 
                                    v_khoan.so_tien, v_khoan.nguon,
                                    v_ngay_chot, 'admin', v_nv.phong_ban_id
                                );
                            END IF;
                        END LOOP;
                    END LOOP;
                END IF;
            END IF;
        END LOOP;
    END LOOP;
END $$;

-- ===============================================
-- 8. TEMPLATE KPI (nếu chưa có)
-- ===============================================
INSERT INTO template_kpi (ma_template, ten_template, mo_ta, trang_thai, ngay_cap_nhat)
SELECT 'TPL_DEFAULT', 'Template KPI Mặc định', 'Template đánh giá KPI mặc định cho tất cả phòng ban', true, NOW()
WHERE NOT EXISTS (SELECT 1 FROM template_kpi WHERE ma_template = 'TPL_DEFAULT');

-- ===============================================
-- 9. KY DANH GIA KPI (7 kỳ)
-- trang_thai: DONG, DUYET, HOAN_THANH, MO
-- Columns: ma_ky, ten_ky, loai_ky, thang, quy, nam, tu_ngay, den_ngay, han_nop_ket_qua, trang_thai, ghi_chu
-- ===============================================
DO $$
DECLARE
    v_month INT;
    v_ma_ky VARCHAR;
    v_ky_id INT;
    v_template_id INT;
    v_trang_thai trang_thai_ky_danh_gia;
BEGIN
    -- Get default template
    SELECT id INTO v_template_id FROM template_kpi WHERE ma_template = 'TPL_DEFAULT' LIMIT 1;
    
    FOR v_month IN 6..12 LOOP
        v_ma_ky := 'KPI2025' || LPAD(v_month::TEXT, 2, '0');
        
        IF v_month < 12 THEN
            v_trang_thai := 'DONG';
        ELSE
            v_trang_thai := 'MO';
        END IF;
        
        IF NOT EXISTS (SELECT 1 FROM ky_danh_gia_kpi WHERE ma_ky = v_ma_ky) THEN
            INSERT INTO ky_danh_gia_kpi (
                ma_ky, ten_ky, loai_ky, thang, nam, tu_ngay, den_ngay, han_nop_ket_qua, trang_thai, ghi_chu, ngay_cap_nhat
            ) VALUES (
                v_ma_ky,
                'Đánh giá KPI Tháng ' || v_month || '/2025',
                'THANG',
                v_month,
                2025,
                make_date(2025, v_month, 1),
                (make_date(2025, v_month, 1) + INTERVAL '1 month' - INTERVAL '1 day')::date,
                (make_date(2025, v_month, 1) + INTERVAL '1 month' + INTERVAL '5 day')::date,
                v_trang_thai,
                'Seed data',
                NOW()
            ) RETURNING id INTO v_ky_id;
            
            -- Create danh gia for each NV
            -- Columns: ky_danh_gia_id, nhan_vien_id, template_id, diem_tong_ket, xep_loai, he_so_thuong, so_tien_thuong, nhan_xet_chung, trang_thai, ngay_cap_nhat
            -- xep_loai_kpi: KHA, TOT, TRUNG_BINH, XUAT_SAC, YEU
            INSERT INTO danh_gia_kpi_nhan_vien (
                ky_danh_gia_id, nhan_vien_id, template_id, diem_tong_ket, xep_loai, 
                he_so_thuong, so_tien_thuong, nhan_xet_chung, trang_thai, ngay_cap_nhat
            )
            SELECT 
                v_ky_id,
                nv.id,
                v_template_id,
                CASE 
                    WHEN random() < 0.25 THEN 90 + floor(random() * 11)
                    WHEN random() < 0.75 THEN 80 + floor(random() * 10)
                    WHEN random() < 0.95 THEN 70 + floor(random() * 10)
                    ELSE floor(random() * 70)
                END,
                CASE 
                    WHEN random() < 0.20 THEN 'XUAT_SAC'
                    WHEN random() < 0.50 THEN 'TOT'
                    WHEN random() < 0.75 THEN 'KHA'
                    WHEN random() < 0.90 THEN 'TRUNG_BINH'
                    ELSE 'YEU'
                END::xep_loai_kpi,
                1.0,
                0,
                'Seed data',
                'DA_DUYET'::trang_thai_danh_gia_kpi,
                NOW()
            FROM nhan_vien nv
            WHERE nv.trang_thai = 'DANG_LAM';
        END IF;
    END LOOP;
END $$;

-- ===============================================
-- 10. PHIEU DIEU CHINH (mỗi tháng 2-4 phiếu)
-- Columns: ma_phieu, bang_luong_id, nhan_vien_id, loai_dieu_chinh (GIAM/TANG/THAY_THE), ly_do, ghi_chu, trang_thai (CHO_DUYET/DA_DUYET/HUY/TU_CHOI), nguoi_tao
-- ===============================================
DO $$
DECLARE
    v_month INT;
    v_i INT;
    v_bang_luong RECORD;
    v_nhan_vien_id INT;
    v_ma_phieu VARCHAR;
    v_loai_dc loai_dieu_chinh;
    v_so_tien NUMERIC;
    v_ly_do TEXT;
    v_phieu_id INT;
BEGIN
    FOR v_month IN 6..12 LOOP
        FOR v_i IN 1..3 LOOP
            v_ma_phieu := 'PDC2025' || LPAD(v_month::TEXT, 2, '0') || LPAD(v_i::TEXT, 3, '0');
            
            IF NOT EXISTS (SELECT 1 FROM phieu_dieu_chinh WHERE ma_phieu = v_ma_phieu) THEN
                -- Get random bang luong
                SELECT id, phong_ban_id INTO v_bang_luong 
                FROM bang_luong 
                WHERE thang = v_month AND nam = 2025 
                ORDER BY random() LIMIT 1;
                
                IF v_bang_luong IS NOT NULL THEN
                    -- Get random NV
                    SELECT id INTO v_nhan_vien_id 
                    FROM nhan_vien 
                    WHERE phong_ban_id = v_bang_luong.phong_ban_id AND trang_thai = 'DANG_LAM'
                    ORDER BY random() LIMIT 1;
                    
                    IF v_nhan_vien_id IS NOT NULL THEN
                        -- Random type: TANG (thưởng), GIAM (phạt/khấu trừ)
                        IF random() < 0.7 THEN
                            v_loai_dc := 'TANG';
                            v_so_tien := (5 + floor(random() * 16)) * 100000;
                            v_ly_do := (ARRAY['Thưởng nóng', 'Thưởng hoàn thành KPI', 'Thưởng đột xuất'])[1 + floor(random() * 3)];
                        ELSE
                            v_loai_dc := 'GIAM';
                            v_so_tien := (2 + floor(random() * 9)) * 100000;
                            v_ly_do := (ARRAY['Phạt vi phạm quy chế', 'Phạt đi muộn', 'Khấu trừ ứng lương'])[1 + floor(random() * 3)];
                        END IF;
                        
                        INSERT INTO phieu_dieu_chinh (
                            ma_phieu, bang_luong_id, nhan_vien_id, loai_dieu_chinh, ly_do, 
                            trang_thai, nguoi_tao, ghi_chu
                        ) VALUES (
                            v_ma_phieu, v_bang_luong.id, v_nhan_vien_id, v_loai_dc, v_ly_do,
                            CASE WHEN v_month <= 10 THEN 'DA_DUYET' ELSE 'CHO_DUYET' END::trang_thai_phieu_dc,
                            'admin', 'Seed data'
                        ) RETURNING id INTO v_phieu_id;
                        
                        -- Chi tiet: so_tien_cu, so_tien_moi, chenh_lech
                        INSERT INTO chi_tiet_phieu_dieu_chinh (
                            phieu_dieu_chinh_id, khoan_luong_id, so_tien_cu, so_tien_moi, chenh_lech, ghi_chu
                        ) VALUES (
                            v_phieu_id,
                            (SELECT id FROM khoan_luong WHERE ma_khoan = 'PHU_CAP_KHAC'),
                            0,
                            v_so_tien,
                            v_so_tien,
                            v_ly_do
                        );
                    END IF;
                END IF;
            END IF;
        END LOOP;
    END LOOP;
END $$;

-- ===============================================
-- 10. REPORT
-- ===============================================
SELECT '========== SEED REPORT 2025 ==========' AS report;

SELECT 'Nhân viên đang làm' AS metric, COUNT(*) AS count FROM nhan_vien WHERE trang_thai = 'DANG_LAM'
UNION ALL
SELECT 'Hợp đồng hiệu lực', COUNT(*) FROM nhan_vien_hop_dong WHERE trang_thai = 'HIEU_LUC'
UNION ALL
SELECT 'Phụ cấp hiệu lực', COUNT(*) FROM phu_cap_nhan_vien WHERE trang_thai = 'HIEU_LUC'
UNION ALL
SELECT 'Chấm công 2025', COUNT(*) FROM cham_cong WHERE nam = 2025
UNION ALL
SELECT 'Sản lượng chia hàng', COUNT(*) FROM san_luong_chia_hang WHERE EXTRACT(YEAR FROM ngay) = 2025
UNION ALL
SELECT 'Giao hàng', COUNT(*) FROM giao_hang WHERE EXTRACT(YEAR FROM ngay) = 2025
UNION ALL
SELECT 'Bảng lương 2025', COUNT(*) FROM bang_luong WHERE nam = 2025
UNION ALL
SELECT 'Chi tiết bảng lương', COUNT(*) FROM chi_tiet_bang_luong
UNION ALL
SELECT 'Snapshot bảng lương', COUNT(*) FROM snapshot_bang_luong
UNION ALL
SELECT 'Kỳ đánh giá KPI', COUNT(*) FROM ky_danh_gia_kpi WHERE ma_ky LIKE 'KPI2025%'
UNION ALL
SELECT 'Đánh giá KPI NV', COUNT(*) FROM danh_gia_kpi_nhan_vien
UNION ALL
SELECT 'Phiếu điều chỉnh', COUNT(*) FROM phieu_dieu_chinh WHERE ma_phieu LIKE 'PDC2025%';

SELECT 'Bảng lương theo tháng' AS report;
SELECT thang, trang_thai, COUNT(*) AS so_bang_luong 
FROM bang_luong WHERE nam = 2025 
GROUP BY thang, trang_thai 
ORDER BY thang;

SELECT '========== SEED COMPLETED ==========' AS status;
