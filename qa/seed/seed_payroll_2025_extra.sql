-- SEED DATA BỔ SUNG 2025
-- Bổ sung các dữ liệu còn thiếu: Ứng lương, Nhóm NV, Ngân hàng, Cơ cấu lương
-- Chạy: docker exec -i tinh-luong-db psql -U postgres -d tinh_luong < qa/seed/seed_payroll_2025_extra.sql

-- ===============================================
-- 1. NHÓM NHÂN VIÊN
-- ===============================================
INSERT INTO nhom_nhan_vien (ma_nhom, ten_nhom, mo_ta, mau_sac, trang_thai)
SELECT 'CHIA_HANG', 'Nhóm Chia hàng', 'Nhân viên phòng chia hàng', '#3B82F6', true
WHERE NOT EXISTS (SELECT 1 FROM nhom_nhan_vien WHERE ma_nhom = 'CHIA_HANG');

INSERT INTO nhom_nhan_vien (ma_nhom, ten_nhom, mo_ta, mau_sac, trang_thai)
SELECT 'GIAO_HANG', 'Nhóm Giao hàng', 'Nhân viên giao hàng (shipper)', '#10B981', true
WHERE NOT EXISTS (SELECT 1 FROM nhom_nhan_vien WHERE ma_nhom = 'GIAO_HANG');

INSERT INTO nhom_nhan_vien (ma_nhom, ten_nhom, mo_ta, mau_sac, trang_thai)
SELECT 'VAN_PHONG', 'Nhóm Văn phòng', 'Nhân viên khối văn phòng', '#8B5CF6', true
WHERE NOT EXISTS (SELECT 1 FROM nhom_nhan_vien WHERE ma_nhom = 'VAN_PHONG');

INSERT INTO nhom_nhan_vien (ma_nhom, ten_nhom, mo_ta, mau_sac, trang_thai)
SELECT 'QUAN_LY', 'Nhóm Quản lý', 'Trưởng phòng, quản lý', '#EF4444', true
WHERE NOT EXISTS (SELECT 1 FROM nhom_nhan_vien WHERE ma_nhom = 'QUAN_LY');

-- ===============================================
-- 2. GÁN NHÂN VIÊN VÀO NHÓM
-- ===============================================
-- Nhóm Chia hàng: NV phòng CH
INSERT INTO nhan_vien_thuoc_nhom (nhan_vien_id, nhom_id, tu_ngay)
SELECT nv.id, (SELECT id FROM nhom_nhan_vien WHERE ma_nhom = 'CHIA_HANG'), '2025-01-01'
FROM nhan_vien nv
JOIN phong_ban pb ON nv.phong_ban_id = pb.id
WHERE pb.ma_phong_ban = 'CH' AND nv.trang_thai = 'DANG_LAM'
  AND NOT EXISTS (
    SELECT 1 FROM nhan_vien_thuoc_nhom nvtn 
    WHERE nvtn.nhan_vien_id = nv.id 
      AND nvtn.nhom_id = (SELECT id FROM nhom_nhan_vien WHERE ma_nhom = 'CHIA_HANG')
  );

-- Nhóm Giao hàng: NV phòng SHIP, GIAO_HANG
INSERT INTO nhan_vien_thuoc_nhom (nhan_vien_id, nhom_id, tu_ngay)
SELECT nv.id, (SELECT id FROM nhom_nhan_vien WHERE ma_nhom = 'GIAO_HANG'), '2025-01-01'
FROM nhan_vien nv
JOIN phong_ban pb ON nv.phong_ban_id = pb.id
WHERE pb.ma_phong_ban IN ('SHIP', 'GIAO_HANG') AND nv.trang_thai = 'DANG_LAM'
  AND NOT EXISTS (
    SELECT 1 FROM nhan_vien_thuoc_nhom nvtn 
    WHERE nvtn.nhan_vien_id = nv.id 
      AND nvtn.nhom_id = (SELECT id FROM nhom_nhan_vien WHERE ma_nhom = 'GIAO_HANG')
  );

-- Nhóm Văn phòng: NV phòng KT, KE_TOAN, NS, MKT, VP, KINH_DOANH, DH
INSERT INTO nhan_vien_thuoc_nhom (nhan_vien_id, nhom_id, tu_ngay)
SELECT nv.id, (SELECT id FROM nhom_nhan_vien WHERE ma_nhom = 'VAN_PHONG'), '2025-01-01'
FROM nhan_vien nv
JOIN phong_ban pb ON nv.phong_ban_id = pb.id
WHERE pb.ma_phong_ban IN ('KT', 'KE_TOAN', 'NS', 'MKT', 'VP', 'KINH_DOANH', 'DH') AND nv.trang_thai = 'DANG_LAM'
  AND NOT EXISTS (
    SELECT 1 FROM nhan_vien_thuoc_nhom nvtn 
    WHERE nvtn.nhan_vien_id = nv.id 
      AND nvtn.nhom_id = (SELECT id FROM nhom_nhan_vien WHERE ma_nhom = 'VAN_PHONG')
  );

-- ===============================================
-- 3. NGÂN HÀNG NHÂN VIÊN
-- ===============================================
DO $$
DECLARE
    v_nhan_vien RECORD;
    v_banks TEXT[] := ARRAY['Vietcombank', 'BIDV', 'Techcombank', 'VPBank', 'MB Bank', 'ACB', 'Sacombank', 'TPBank'];
    v_bank TEXT;
    v_account TEXT;
BEGIN
    FOR v_nhan_vien IN 
        SELECT id, ho_ten FROM nhan_vien WHERE trang_thai = 'DANG_LAM'
    LOOP
        IF NOT EXISTS (
            SELECT 1 FROM nhan_vien_ngan_hang WHERE nhan_vien_id = v_nhan_vien.id
        ) THEN
            v_bank := v_banks[1 + floor(random() * array_length(v_banks, 1))];
            v_account := LPAD((floor(random() * 9999999999) + 1000000000)::TEXT, 14, '0');
            
            INSERT INTO nhan_vien_ngan_hang (
                nhan_vien_id, ten_ngan_hang, so_tai_khoan, chu_tai_khoan, chi_nhanh, la_mac_dinh, tu_ngay
            ) VALUES (
                v_nhan_vien.id, v_bank, v_account, v_nhan_vien.ho_ten, 'Chi nhánh TP.HCM', true, '2025-01-01'
            );
        END IF;
    END LOOP;
END $$;

-- ===============================================
-- 4. BẢNG ỨNG LƯƠNG 2025 (mỗi tháng 1 đợt ứng lương)
-- ===============================================
DO $$
DECLARE
    v_month INT;
    v_phong_ban RECORD;
    v_ma_bang TEXT;
    v_thang_nam TEXT;
    v_tu_ngay DATE;
    v_den_ngay DATE;
    v_trang_thai trang_thai_bang_ung_luong;
    v_bang_id INT;
    v_nhan_vien RECORD;
    v_tien_cong NUMERIC;
    v_muc_toi_da NUMERIC;
    v_so_tien_ung NUMERIC;
BEGIN
    FOR v_month IN 6..12 LOOP
        v_thang_nam := v_month || '/2025';
        v_tu_ngay := make_date(2025, v_month, 1);
        v_den_ngay := make_date(2025, v_month, 15);
        
        -- Trạng thái
        IF v_month <= 10 THEN
            v_trang_thai := 'DA_KHOA';
        ELSIF v_month = 11 THEN
            v_trang_thai := 'DA_CHOT';
        ELSE
            v_trang_thai := 'NHAP';
        END IF;
        
        FOR v_phong_ban IN SELECT id, ma_phong_ban, ten_phong_ban FROM phong_ban LOOP
            v_ma_bang := 'UL' || v_month || '-2025-' || v_phong_ban.ma_phong_ban;
            
            IF NOT EXISTS (
                SELECT 1 FROM bang_ung_luong WHERE ma_bang_ung_luong = v_ma_bang
            ) THEN
                INSERT INTO bang_ung_luong (
                    ma_bang_ung_luong, thang_nam, tu_ngay, den_ngay, ngay_chi_tra,
                    phong_ban_id, trang_thai, tong_so_tien_ung, so_nhan_vien_ung,
                    ghi_chu, nguoi_tao, ngay_cap_nhat
                ) VALUES (
                    v_ma_bang, v_thang_nam, v_tu_ngay, v_den_ngay, v_den_ngay + 3,
                    v_phong_ban.id, v_trang_thai, 0, 0,
                    'Seed data ứng lương T' || v_month || '/2025', 'admin', NOW()
                ) RETURNING id INTO v_bang_id;
                
                -- Chi tiết cho NV phòng này
                FOR v_nhan_vien IN 
                    SELECT id, phong_ban_id FROM nhan_vien 
                    WHERE phong_ban_id = v_phong_ban.id AND trang_thai = 'DANG_LAM'
                LOOP
                    -- Tính tiền công lũy kế (giả lập = 15 ngày công * lương ngày)
                    v_tien_cong := 15 * (8000000 + floor(random() * 12000000)) / 26;
                    v_muc_toi_da := v_tien_cong * 0.7; -- Tối đa 70% tiền công
                    
                    -- 30% NV có ứng lương
                    IF random() < 0.3 THEN
                        v_so_tien_ung := LEAST(floor(random() * v_muc_toi_da / 100000) * 100000, v_muc_toi_da);
                        v_so_tien_ung := GREATEST(v_so_tien_ung, 500000); -- Tối thiểu 500k
                    ELSE
                        v_so_tien_ung := 0;
                    END IF;
                    
                    INSERT INTO chi_tiet_bang_ung_luong (
                        bang_ung_luong_id, nhan_vien_id, phong_ban_id, 
                        tien_cong_luy_ke, muc_toi_da_duoc_ung, so_ngay_cong, so_ngay_nghi, so_ngay_nghi_khong_phep,
                        duoc_phep_ung, so_tien_ung_de_xuat, so_tien_ung_duyet, ghi_chu, ngay_cap_nhat
                    ) VALUES (
                        v_bang_id, v_nhan_vien.id, v_nhan_vien.phong_ban_id,
                        v_tien_cong, v_muc_toi_da, 15, 0, 0,
                        true, v_so_tien_ung, v_so_tien_ung, 'Seed data', NOW()
                    );
                END LOOP;
                
                -- Cập nhật tổng
                UPDATE bang_ung_luong 
                SET tong_so_tien_ung = (SELECT COALESCE(SUM(so_tien_ung_duyet), 0) FROM chi_tiet_bang_ung_luong WHERE bang_ung_luong_id = v_bang_id),
                    so_nhan_vien_ung = (SELECT COUNT(*) FROM chi_tiet_bang_ung_luong WHERE bang_ung_luong_id = v_bang_id AND so_tien_ung_duyet > 0)
                WHERE id = v_bang_id;
            END IF;
        END LOOP;
    END LOOP;
END $$;

-- ===============================================
-- 5. CƠ CẤU LƯƠNG
-- ===============================================
INSERT INTO co_cau_luong (ma_co_cau, ten_co_cau, phong_ban_id, mo_ta, trang_thai, ngay_cap_nhat)
SELECT 'CC_VAN_PHONG', 'Cơ cấu lương Văn phòng', NULL, 'Áp dụng cho khối văn phòng', true, NOW()
WHERE NOT EXISTS (SELECT 1 FROM co_cau_luong WHERE ma_co_cau = 'CC_VAN_PHONG');

INSERT INTO co_cau_luong (ma_co_cau, ten_co_cau, phong_ban_id, mo_ta, trang_thai, ngay_cap_nhat)
SELECT 'CC_CHIA_HANG', 'Cơ cấu lương Chia hàng', 27, 'Áp dụng cho phòng chia hàng - tính sản lượng', true, NOW()
WHERE NOT EXISTS (SELECT 1 FROM co_cau_luong WHERE ma_co_cau = 'CC_CHIA_HANG');

INSERT INTO co_cau_luong (ma_co_cau, ten_co_cau, phong_ban_id, mo_ta, trang_thai, ngay_cap_nhat)
SELECT 'CC_GIAO_HANG', 'Cơ cấu lương Giao hàng', 29, 'Áp dụng cho shipper - tính theo kg/đơn', true, NOW()
WHERE NOT EXISTS (SELECT 1 FROM co_cau_luong WHERE ma_co_cau = 'CC_GIAO_HANG');

-- ===============================================
-- 6. CƠ CẤU LƯƠNG CHI TIẾT
-- ===============================================
-- Kiểm tra schema
DO $$
DECLARE
    v_co_cau_id INT;
    v_khoan_luong_id INT;
BEGIN
    -- Văn phòng: Lương cơ bản + Phụ cấp
    SELECT id INTO v_co_cau_id FROM co_cau_luong WHERE ma_co_cau = 'CC_VAN_PHONG';
    IF v_co_cau_id IS NOT NULL THEN
        -- Lương cơ bản
        SELECT id INTO v_khoan_luong_id FROM khoan_luong WHERE ma_khoan = 'LUONG_CO_BAN';
        IF v_khoan_luong_id IS NOT NULL AND NOT EXISTS (
            SELECT 1 FROM co_cau_luong_chi_tiet WHERE co_cau_luong_id = v_co_cau_id AND khoan_luong_id = v_khoan_luong_id
        ) THEN
            INSERT INTO co_cau_luong_chi_tiet (co_cau_luong_id, khoan_luong_id, thu_tu, bat_buoc)
            VALUES (v_co_cau_id, v_khoan_luong_id, 1, true);
        END IF;
        
        -- Phụ cấp xăng xe
        SELECT id INTO v_khoan_luong_id FROM khoan_luong WHERE ma_khoan = 'PHU_CAP_XANG_XE';
        IF v_khoan_luong_id IS NOT NULL AND NOT EXISTS (
            SELECT 1 FROM co_cau_luong_chi_tiet WHERE co_cau_luong_id = v_co_cau_id AND khoan_luong_id = v_khoan_luong_id
        ) THEN
            INSERT INTO co_cau_luong_chi_tiet (co_cau_luong_id, khoan_luong_id, thu_tu, bat_buoc)
            VALUES (v_co_cau_id, v_khoan_luong_id, 2, false);
        END IF;
        
        -- Hỗ trợ chuyên cần
        SELECT id INTO v_khoan_luong_id FROM khoan_luong WHERE ma_khoan = 'HO_TRO_CHUYEN_CAN';
        IF v_khoan_luong_id IS NOT NULL AND NOT EXISTS (
            SELECT 1 FROM co_cau_luong_chi_tiet WHERE co_cau_luong_id = v_co_cau_id AND khoan_luong_id = v_khoan_luong_id
        ) THEN
            INSERT INTO co_cau_luong_chi_tiet (co_cau_luong_id, khoan_luong_id, thu_tu, bat_buoc)
            VALUES (v_co_cau_id, v_khoan_luong_id, 3, false);
        END IF;
    END IF;
END $$;

-- ===============================================
-- 7. QUY CHẾ RULE (nếu chưa có)
-- ===============================================
DO $$
DECLARE
    v_quy_che_id INT;
    v_khoan_luong_id INT;
BEGIN
    SELECT id INTO v_quy_che_id FROM quy_che LIMIT 1;
    IF v_quy_che_id IS NOT NULL THEN
        -- Rule tính lương cơ bản
        SELECT id INTO v_khoan_luong_id FROM khoan_luong WHERE ma_khoan = 'LUONG_CO_BAN';
        IF v_khoan_luong_id IS NOT NULL AND NOT EXISTS (
            SELECT 1 FROM quy_che_rule WHERE quy_che_id = v_quy_che_id AND khoan_luong_id = v_khoan_luong_id
        ) THEN
            INSERT INTO quy_che_rule (
                quy_che_id, khoan_luong_id, ma_rule, ten_rule, cong_thuc, thu_tu, trang_thai, ngay_cap_nhat
            ) VALUES (
                v_quy_che_id, v_khoan_luong_id, 'RULE_LUONG_CB', 'Tính lương cơ bản theo công',
                'luong_co_ban * so_cong_thuc_te / so_cong_chuan', 1, true, NOW()
            );
        END IF;
        
        -- Rule tính BHXH
        SELECT id INTO v_khoan_luong_id FROM khoan_luong WHERE ma_khoan = 'BHXH_NV';
        IF v_khoan_luong_id IS NOT NULL AND NOT EXISTS (
            SELECT 1 FROM quy_che_rule WHERE quy_che_id = v_quy_che_id AND khoan_luong_id = v_khoan_luong_id
        ) THEN
            INSERT INTO quy_che_rule (
                quy_che_id, khoan_luong_id, ma_rule, ten_rule, cong_thuc, thu_tu, trang_thai, ngay_cap_nhat
            ) VALUES (
                v_quy_che_id, v_khoan_luong_id, 'RULE_BHXH', 'Khấu trừ BHXH 8%',
                'luong_dong_bh * 0.08', 10, true, NOW()
            );
        END IF;
        
        -- Rule tính BHYT
        SELECT id INTO v_khoan_luong_id FROM khoan_luong WHERE ma_khoan = 'BHYT_NV';
        IF v_khoan_luong_id IS NOT NULL AND NOT EXISTS (
            SELECT 1 FROM quy_che_rule WHERE quy_che_id = v_quy_che_id AND khoan_luong_id = v_khoan_luong_id
        ) THEN
            INSERT INTO quy_che_rule (
                quy_che_id, khoan_luong_id, ma_rule, ten_rule, cong_thuc, thu_tu, trang_thai, ngay_cap_nhat
            ) VALUES (
                v_quy_che_id, v_khoan_luong_id, 'RULE_BHYT', 'Khấu trừ BHYT 1.5%',
                'luong_dong_bh * 0.015', 11, true, NOW()
            );
        END IF;
        
        -- Rule tính BHTN
        SELECT id INTO v_khoan_luong_id FROM khoan_luong WHERE ma_khoan = 'BHTN_NV';
        IF v_khoan_luong_id IS NOT NULL AND NOT EXISTS (
            SELECT 1 FROM quy_che_rule WHERE quy_che_id = v_quy_che_id AND khoan_luong_id = v_khoan_luong_id
        ) THEN
            INSERT INTO quy_che_rule (
                quy_che_id, khoan_luong_id, ma_rule, ten_rule, cong_thuc, thu_tu, trang_thai, ngay_cap_nhat
            ) VALUES (
                v_quy_che_id, v_khoan_luong_id, 'RULE_BHTN', 'Khấu trừ BHTN 1%',
                'luong_dong_bh * 0.01', 12, true, NOW()
            );
        END IF;
    END IF;
END $$;

-- ===============================================
-- 8. REPORT
-- ===============================================
SELECT '========== SEED EXTRA REPORT ==========' AS report;

SELECT 'nhom_nhan_vien' AS tbl, COUNT(*) FROM nhom_nhan_vien
UNION ALL SELECT 'nhan_vien_thuoc_nhom', COUNT(*) FROM nhan_vien_thuoc_nhom
UNION ALL SELECT 'nhan_vien_ngan_hang', COUNT(*) FROM nhan_vien_ngan_hang
UNION ALL SELECT 'bang_ung_luong', COUNT(*) FROM bang_ung_luong
UNION ALL SELECT 'chi_tiet_bang_ung_luong', COUNT(*) FROM chi_tiet_bang_ung_luong
UNION ALL SELECT 'co_cau_luong', COUNT(*) FROM co_cau_luong
UNION ALL SELECT 'co_cau_luong_chi_tiet', COUNT(*) FROM co_cau_luong_chi_tiet
UNION ALL SELECT 'quy_che_rule', COUNT(*) FROM quy_che_rule;

SELECT 'Ứng lương theo tháng' AS report;
SELECT thang_nam, trang_thai, COUNT(*) AS so_bang, SUM(tong_so_tien_ung) AS tong_ung
FROM bang_ung_luong 
GROUP BY thang_nam, trang_thai 
ORDER BY thang_nam;

SELECT '========== SEED EXTRA COMPLETED ==========' AS status;
