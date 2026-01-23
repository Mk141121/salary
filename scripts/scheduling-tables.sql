-- =============================================
-- Scheduling Module - Xếp Ca
-- PRD-01: Database tables for shift scheduling
-- =============================================

-- Table: Ca làm việc (Shift definitions)
CREATE TABLE IF NOT EXISTS ca_lam_viec (
    id SERIAL PRIMARY KEY,
    ma_ca VARCHAR(20) UNIQUE NOT NULL,
    ten_ca VARCHAR(100) NOT NULL,
    gio_vao VARCHAR(5) NOT NULL,  -- HH:mm
    gio_ra VARCHAR(5) NOT NULL,   -- HH:mm
    nghi_giua_ca_phut INTEGER DEFAULT 0,
    grace_in_phut INTEGER DEFAULT 15,
    grace_late_phut INTEGER DEFAULT 15,
    is_ca_dem BOOLEAN DEFAULT FALSE,
    phong_ban_id INTEGER REFERENCES phong_ban(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Table: Lịch phân ca theo tháng
CREATE TABLE IF NOT EXISTS lich_phan_ca (
    id SERIAL PRIMARY KEY,
    thang_nam VARCHAR(7) NOT NULL,  -- YYYY-MM
    phong_ban_id INTEGER REFERENCES phong_ban(id) ON DELETE SET NULL,
    trang_thai VARCHAR(20) DEFAULT 'NHAP' CHECK (trang_thai IN ('NHAP', 'DA_CONG_BO', 'HUY')),
    ghi_chu TEXT,
    created_by INTEGER REFERENCES nguoi_dung(id),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Table: Chi tiết phân ca (assignment per employee per day)
CREATE TABLE IF NOT EXISTS lich_phan_ca_chi_tiet (
    id SERIAL PRIMARY KEY,
    lich_phan_ca_id INTEGER NOT NULL REFERENCES lich_phan_ca(id) ON DELETE CASCADE,
    nhan_vien_id INTEGER NOT NULL REFERENCES nhan_vien(id) ON DELETE CASCADE,
    ngay DATE NOT NULL,
    ca_lam_viec_id INTEGER NOT NULL REFERENCES ca_lam_viec(id) ON DELETE RESTRICT,
    ghi_chu TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    UNIQUE (nhan_vien_id, ngay)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_ca_lam_viec_ma_ca ON ca_lam_viec(ma_ca);
CREATE INDEX IF NOT EXISTS idx_lich_phan_ca_thang_nam ON lich_phan_ca(thang_nam);
CREATE INDEX IF NOT EXISTS idx_lich_phan_ca_chi_tiet_ngay ON lich_phan_ca_chi_tiet(ngay);
CREATE INDEX IF NOT EXISTS idx_lich_phan_ca_chi_tiet_nv ON lich_phan_ca_chi_tiet(nhan_vien_id);

-- Seed default shifts
INSERT INTO ca_lam_viec (ma_ca, ten_ca, gio_vao, gio_ra, nghi_giua_ca_phut, grace_in_phut, grace_late_phut, is_ca_dem) 
VALUES 
    ('HANH_CHINH', 'Ca hành chính', '08:00', '17:00', 60, 15, 15, FALSE),
    ('CA_SANG', 'Ca sáng', '06:00', '14:00', 30, 15, 15, FALSE),
    ('CA_CHIEU', 'Ca chiều', '14:00', '22:00', 30, 15, 15, FALSE),
    ('CA_DEM', 'Ca đêm', '22:00', '06:00', 30, 15, 15, TRUE)
ON CONFLICT (ma_ca) DO NOTHING;

-- Comments
COMMENT ON TABLE ca_lam_viec IS 'Danh mục ca làm việc - PRD-01';
COMMENT ON TABLE lich_phan_ca IS 'Lịch phân ca theo tháng - PRD-01';
COMMENT ON TABLE lich_phan_ca_chi_tiet IS 'Chi tiết phân ca theo nhân viên theo ngày - PRD-01';
