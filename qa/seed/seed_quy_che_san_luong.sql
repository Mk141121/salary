-- =====================================================
-- SEED QUY CHẾ LƯƠNG SẢN LƯỢNG CHO PHÒNG CHIA HÀNG
-- Quy tắc:
--   - Mỗi sản phẩm đạt: +320đ
--   - Mỗi sản phẩm lỗi: trừ 5 SP đạt (tức là -1,600đ)
--   - Công thức: (TONG_SP_DAT - TONG_SP_LOI * 5) * 320
-- =====================================================

-- Bước 1: Lấy ID phòng ban Chia hàng
DO $$
DECLARE
    v_phong_ban_id INTEGER;
    v_khoan_luong_id INTEGER;
    v_quy_che_id INTEGER;
BEGIN
    -- Lấy phòng ban Chia hàng
    SELECT id INTO v_phong_ban_id FROM phong_ban WHERE ten_phong_ban ILIKE '%Chia hàng%' LIMIT 1;
    
    IF v_phong_ban_id IS NULL THEN
        RAISE EXCEPTION 'Không tìm thấy phòng ban Chia hàng';
    END IF;
    
    -- Lấy khoản lương sản lượng
    SELECT id INTO v_khoan_luong_id FROM khoan_luong WHERE ma_khoan = 'SAN_LUONG' LIMIT 1;
    
    IF v_khoan_luong_id IS NULL THEN
        -- Tạo mới nếu chưa có
        INSERT INTO khoan_luong (ma_khoan, ten_khoan, loai, cach_tinh, mo_ta, thu_tu, trang_thai, ngay_tao, ngay_cap_nhat)
        VALUES ('SAN_LUONG', 'Sản lượng', 'THU_NHAP', 'CONG_THUC', 'Tiền sản lượng: SP đạt +320đ, SP lỗi trừ 5 SP', 100, true, NOW(), NOW())
        RETURNING id INTO v_khoan_luong_id;
    END IF;
    
    -- Bước 3: Tạo hoặc cập nhật Quy chế
    SELECT id INTO v_quy_che_id FROM quy_che 
    WHERE phong_ban_id = v_phong_ban_id AND trang_thai = 'HIEU_LUC'
    ORDER BY phien_ban DESC LIMIT 1;
    
    IF v_quy_che_id IS NULL THEN
        -- Tạo quy chế mới
        INSERT INTO quy_che (phong_ban_id, ten_quy_che, mo_ta, tu_ngay, phien_ban, trang_thai, nguoi_tao, ngay_tao, ngay_cap_nhat)
        VALUES (
            v_phong_ban_id,
            'Quy chế lương sản lượng Chia hàng',
            'Quy chế tính lương sản lượng cho bộ phận Chia hàng. Áp dụng công thức: (SP đạt - SP lỗi × 5) × 320đ',
            '2025-01-01',
            1,
            'HIEU_LUC',
            'System',
            NOW(),
            NOW()
        )
        RETURNING id INTO v_quy_che_id;
        
        RAISE NOTICE 'Đã tạo quy chế mới ID: %', v_quy_che_id;
    ELSE
        -- Cập nhật quy chế có sẵn
        UPDATE quy_che SET
            ten_quy_che = 'Quy chế lương sản lượng Chia hàng',
            mo_ta = 'Quy chế tính lương sản lượng cho bộ phận Chia hàng. Áp dụng công thức: (SP đạt - SP lỗi × 5) × 320đ',
            trang_thai = 'HIEU_LUC',
            ngay_cap_nhat = NOW()
        WHERE id = v_quy_che_id;
        
        RAISE NOTICE 'Đã cập nhật quy chế ID: %', v_quy_che_id;
    END IF;
    
    -- Bước 4: Xóa rule cũ và tạo rule mới
    DELETE FROM quy_che_rule WHERE quy_che_id = v_quy_che_id;
    
    -- Rule tính tiền sản lượng
    INSERT INTO quy_che_rule (
        quy_che_id,
        khoan_luong_id,
        ten_rule,
        mo_ta,
        loai_rule,
        dieu_kien_json,
        cong_thuc_json,
        thu_tu_uu_tien,
        che_do_gop,
        cho_phep_chinh_tay,
        trang_thai,
        nguoi_tao,
        ngay_tao,
        ngay_cap_nhat
    ) VALUES (
        v_quy_che_id,
        v_khoan_luong_id,
        'Tiền sản lượng chia hàng',
        'Công thức: (SP đạt - SP lỗi × 5) × 320đ. Mỗi SP lỗi trừ 5 SP đạt tương đương trừ 1,600đ',
        'CONG_THUC',
        NULL,
        '{"bieuThuc": "(TONG_SP_DAT - TONG_SP_LOI * 5) * 320", "donViTien": 320, "phatLoiHeSo": 5, "moTa": "SP đạt +320đ, SP lỗi trừ 5 SP"}',
        10,
        'GHI_DE',
        true,
        true,
        'System',
        NOW(),
        NOW()
    );
    
    RAISE NOTICE 'Đã tạo rule tiền sản lượng cho quy chế ID: %', v_quy_che_id;
    
END $$;

-- Bước 5: Verify kết quả
SELECT 
    qc.id as quy_che_id,
    pb.ten_phong_ban,
    qc.ten_quy_che,
    qc.trang_thai,
    r.ten_rule,
    r.loai_rule,
    r.cong_thuc_json,
    kl.ma_khoan,
    kl.ten_khoan
FROM quy_che qc
JOIN phong_ban pb ON pb.id = qc.phong_ban_id
LEFT JOIN quy_che_rule r ON r.quy_che_id = qc.id
LEFT JOIN khoan_luong kl ON kl.id = r.khoan_luong_id
WHERE pb.ten_phong_ban ILIKE '%Chia hàng%';

-- =====================================================
-- VÍ DỤ TÍNH TOÁN
-- =====================================================
-- Nhân viên A: 3,500 SP đạt, 100 SP lỗi
--   Tiền = (3500 - 100*5) * 320 = (3500 - 500) * 320 = 3000 * 320 = 960,000đ
--
-- Nhân viên B: 4,000 SP đạt, 50 SP lỗi  
--   Tiền = (4000 - 50*5) * 320 = (4000 - 250) * 320 = 3750 * 320 = 1,200,000đ
--
-- Nhân viên C: 3,000 SP đạt, 200 SP lỗi
--   Tiền = (3000 - 200*5) * 320 = (3000 - 1000) * 320 = 2000 * 320 = 640,000đ
-- =====================================================

-- =====================================================
-- BƯỚC BỔ SUNG: TỰ ĐỘNG TÍNH TIỀN SẢN LƯỢNG VÀO BẢNG LƯƠNG
-- =====================================================
-- Tính tiền sản lượng và chèn vào chi_tiet_bang_luong
-- Công thức: (TONG_SP_DAT - TONG_SP_LOI * 5) * 320

INSERT INTO chi_tiet_bang_luong (bang_luong_id, nhan_vien_id, khoan_luong_id, so_tien, nguon, ghi_chu, ngay_tao, ngay_cap_nhat)
SELECT 
    sch.bang_luong_id,
    sch.nhan_vien_id,
    (SELECT id FROM khoan_luong WHERE ma_khoan = 'SAN_LUONG'),
    GREATEST(0, (sch.tong_sp_dat - sch.tong_sp_loi * 5) * 320),
    'RULE',
    'Tự động tính từ quy chế: (SP đạt - SP lỗi×5) × 320đ',
    NOW(),
    NOW()
FROM snapshot_san_luong_chia_hang sch
JOIN bang_luong bl ON bl.id = sch.bang_luong_id
JOIN phong_ban pb ON pb.id = bl.phong_ban_id
WHERE pb.ten_phong_ban ILIKE '%Chia hàng%'
  AND NOT EXISTS (
      SELECT 1 FROM chi_tiet_bang_luong ctbl 
      WHERE ctbl.bang_luong_id = sch.bang_luong_id 
        AND ctbl.nhan_vien_id = sch.nhan_vien_id 
        AND ctbl.khoan_luong_id = (SELECT id FROM khoan_luong WHERE ma_khoan = 'SAN_LUONG')
  )
ON CONFLICT DO NOTHING;

-- Liên kết quy chế với các bảng lương Chia hàng
INSERT INTO bang_luong_quy_che (bang_luong_id, quy_che_id, ngay_ap_dung, nguoi_ap_dung, ngay_tao)
SELECT bl.id, 2, NOW(), 'System', NOW()
FROM bang_luong bl
JOIN phong_ban pb ON pb.id = bl.phong_ban_id
WHERE pb.ten_phong_ban ILIKE '%Chia hàng%'
  AND NOT EXISTS (SELECT 1 FROM bang_luong_quy_che blq WHERE blq.bang_luong_id = bl.id AND blq.quy_che_id = 2)
ON CONFLICT (bang_luong_id, quy_che_id) DO NOTHING;

-- Verify kết quả cuối cùng
SELECT 
    nv.ma_nhan_vien, 
    nv.ho_ten, 
    sch.tong_sp_dat AS "SP đạt",
    sch.tong_sp_loi AS "SP lỗi",
    (sch.tong_sp_dat - sch.tong_sp_loi * 5) AS "SP quy đổi",
    ctbl.so_tien AS "Tiền sản lượng"
FROM chi_tiet_bang_luong ctbl
JOIN nhan_vien nv ON nv.id = ctbl.nhan_vien_id
JOIN khoan_luong kl ON kl.id = ctbl.khoan_luong_id
JOIN snapshot_san_luong_chia_hang sch 
    ON sch.bang_luong_id = ctbl.bang_luong_id 
    AND sch.nhan_vien_id = ctbl.nhan_vien_id
WHERE kl.ma_khoan = 'SAN_LUONG' 
  AND ctbl.bang_luong_id = (SELECT id FROM bang_luong WHERE thang = 1 AND nam = 2026 
                            AND phong_ban_id = (SELECT id FROM phong_ban WHERE ten_phong_ban ILIKE '%Chia hàng%' LIMIT 1))
ORDER BY nv.ma_nhan_vien;
