const fs = require('fs');
const crypto = require('crypto');

const seedData = JSON.parse(fs.readFileSync('backend/prisma/seed-data.json', 'utf8'));

function escapeString(str) {
  if (!str) return 'NULL';
  return "'" + str.replace(/'/g, "''") + "'";
}

let sql = [];
sql.push('-- HRM-LITE v2 Full Seed Data - Generated: ' + new Date().toISOString());
sql.push('');

// 1. PHÒNG BAN
sql.push('-- 1. PHONG BAN');
for (const pb of seedData.phongBans) {
  sql.push(`INSERT INTO phong_ban (ma_phong_ban, ten_phong_ban, mo_ta, gio_vao_chuan, gio_ra_chuan, phut_cho_phep_tre, ngay_tao, ngay_cap_nhat) VALUES (${escapeString(pb.maPhongBan)}, ${escapeString(pb.tenPhongBan)}, ${escapeString(pb.moTa)}, ${escapeString(pb.gioVaoChuan)}, ${escapeString(pb.gioRaChuan)}, ${pb.phutChoPhepTre || 5}, NOW(), NOW()) ON CONFLICT (ma_phong_ban) DO UPDATE SET ten_phong_ban = EXCLUDED.ten_phong_ban;`);
}
sql.push('');

// 2. NHÂN VIÊN
sql.push('-- 2. NHAN VIEN');
for (const nv of seedData.nhanViens) {
  const email = nv.email ? escapeString(nv.email) : "'" + nv.maNhanVien.toLowerCase() + "@company.com'";
  sql.push(`INSERT INTO nhan_vien (ma_nhan_vien, ho_ten, email, so_dien_thoai, phong_ban_id, chuc_vu, luong_co_ban, ngay_vao_lam, trang_thai, ngay_tao, ngay_cap_nhat) SELECT ${escapeString(nv.maNhanVien)}, ${escapeString(nv.hoTen)}, ${email}, ${escapeString(nv.soDienThoai)}, pb.id, ${escapeString(nv.chucVu)}, ${nv.luongCoBan || 0}, '${nv.ngayVaoLam || '2026-01-01'}', '${nv.trangThai || 'DANG_LAM'}', NOW(), NOW() FROM phong_ban pb WHERE pb.ten_phong_ban = ${escapeString(nv.tenPhongBan)} ON CONFLICT (ma_nhan_vien) DO UPDATE SET ho_ten = EXCLUDED.ho_ten, luong_co_ban = EXCLUDED.luong_co_ban;`);
}
sql.push('');

// 3. KHOẢN LƯƠNG
sql.push('-- 3. KHOAN LUONG');
const khoanLuongs = [
  { maKhoan: 'LUONG_CO_BAN', tenKhoan: 'Lương cơ bản', loai: 'THU_NHAP', cachTinh: 'LUONG_THANG_CO_DINH', chiuThue: true, thuTu: 1 },
  { maKhoan: 'PHU_CAP_XANG_XE', tenKhoan: 'Phụ cấp xăng xe', loai: 'THU_NHAP', cachTinh: 'THEO_NGAY_CONG', chiuThue: false, thuTu: 2 },
  { maKhoan: 'PHU_CAP_DIEN_THOAI', tenKhoan: 'Phụ cấp điện thoại', loai: 'THU_NHAP', cachTinh: 'THEO_NGAY_CONG', chiuThue: false, thuTu: 3 },
  { maKhoan: 'HO_TRO_AN_CA', tenKhoan: 'Hỗ trợ ăn ca', loai: 'THU_NHAP', cachTinh: 'THEO_NGAY_CONG', chiuThue: false, thuTu: 4 },
  { maKhoan: 'HO_TRO_CHUYEN_CAN', tenKhoan: 'Hỗ trợ chuyên cần', loai: 'THU_NHAP', cachTinh: 'CHUYEN_CAN_DIEU_KIEN', chiuThue: false, thuTu: 5 },
  { maKhoan: 'PHU_CAP_CHUC_VU', tenKhoan: 'Phụ cấp chức vụ', loai: 'THU_NHAP', cachTinh: 'LUONG_THANG_CO_DINH', chiuThue: true, thuTu: 6 },
  { maKhoan: 'THUONG_KPI', tenKhoan: 'Thưởng KPI', loai: 'THU_NHAP', cachTinh: 'LUONG_THANG_CO_DINH', chiuThue: true, thuTu: 7 },
  { maKhoan: 'THUONG_DOANH_SO', tenKhoan: 'Thưởng doanh số', loai: 'THU_NHAP', cachTinh: 'LUONG_THANG_CO_DINH', chiuThue: true, thuTu: 8 },
  { maKhoan: 'BHXH_NLD', tenKhoan: 'BHXH (8%)', loai: 'KHAU_TRU', cachTinh: 'LUONG_THANG_CO_DINH', chiuThue: false, thuTu: 101 },
  { maKhoan: 'BHYT_NLD', tenKhoan: 'BHYT (1.5%)', loai: 'KHAU_TRU', cachTinh: 'LUONG_THANG_CO_DINH', chiuThue: false, thuTu: 102 },
  { maKhoan: 'BHTN_NLD', tenKhoan: 'BHTN (1%)', loai: 'KHAU_TRU', cachTinh: 'LUONG_THANG_CO_DINH', chiuThue: false, thuTu: 103 },
  { maKhoan: 'THUE_TNCN', tenKhoan: 'Thuế TNCN', loai: 'KHAU_TRU', cachTinh: 'LUONG_THANG_CO_DINH', chiuThue: false, thuTu: 104 },
  { maKhoan: 'PHAT_DI_TRE', tenKhoan: 'Phạt đi trễ', loai: 'KHAU_TRU', cachTinh: 'LUONG_THANG_CO_DINH', chiuThue: false, thuTu: 111 },
  { maKhoan: 'TRU_UNG_LUONG', tenKhoan: 'Trừ ứng lương', loai: 'KHAU_TRU', cachTinh: 'LUONG_THANG_CO_DINH', chiuThue: false, thuTu: 112 },
];
for (const kl of khoanLuongs) {
  sql.push(`INSERT INTO khoan_luong (ma_khoan, ten_khoan, loai, cach_tinh, chiu_thue, thu_tu, ngay_tao) VALUES ('${kl.maKhoan}', '${kl.tenKhoan}', '${kl.loai}', '${kl.cachTinh}', ${kl.chiuThue}, ${kl.thuTu}, NOW()) ON CONFLICT (ma_khoan) DO NOTHING;`);
}
sql.push('');

// 4. DANH MỤC LOẠI NGHỈ
sql.push('-- 4. LOAI NGHI');
const loaiNghis = [
  { maLoaiNghi: 'PHEP_NAM', tenLoaiNghi: 'Phép năm', nhomLoai: 'CO_PHEP', coTinhLuong: true, coTinhChuyenCan: true, thuTu: 1 },
  { maLoaiNghi: 'NGHI_OM', tenLoaiNghi: 'Nghỉ ốm', nhomLoai: 'CO_PHEP', coTinhLuong: true, coTinhChuyenCan: true, thuTu: 2 },
  { maLoaiNghi: 'THAI_SAN', tenLoaiNghi: 'Thai sản', nhomLoai: 'CO_PHEP', coTinhLuong: true, coTinhChuyenCan: true, thuTu: 3 },
  { maLoaiNghi: 'VIEC_RIENG', tenLoaiNghi: 'Việc riêng có lương', nhomLoai: 'CO_PHEP', coTinhLuong: true, coTinhChuyenCan: false, thuTu: 4 },
  { maLoaiNghi: 'KHONG_LUONG', tenLoaiNghi: 'Nghỉ không lương', nhomLoai: 'KHONG_LUONG', coTinhLuong: false, coTinhChuyenCan: false, thuTu: 5 },
  { maLoaiNghi: 'KHONG_PHEP', tenLoaiNghi: 'Nghỉ không phép', nhomLoai: 'KHONG_PHEP', coTinhLuong: false, coTinhChuyenCan: false, thuTu: 6 },
];
for (const ln of loaiNghis) {
  sql.push(`INSERT INTO danh_muc_loai_nghi (ma_loai_nghi, ten_loai_nghi, nhom_loai, co_tinh_luong, co_tinh_chuyen_can, thu_tu_hien_thi, ngay_tao) VALUES ('${ln.maLoaiNghi}', '${ln.tenLoaiNghi}', '${ln.nhomLoai}', ${ln.coTinhLuong}, ${ln.coTinhChuyenCan}, ${ln.thuTu}, NOW()) ON CONFLICT (ma_loai_nghi) DO NOTHING;`);
}
sql.push('');

// 5. DANH MỤC LOẠI YÊU CẦU
sql.push('-- 5. LOAI YEU CAU');
const loaiYeuCaus = [
  { maLoai: 'OT', tenLoai: 'Làm thêm giờ (OT)', nhom: 'THOI_GIAN', moTa: 'Đơn xin làm thêm giờ' },
  { maLoai: 'TRE_GIO', tenLoai: 'Đi trễ', nhom: 'THOI_GIAN', moTa: 'Đơn xin đi trễ' },
  { maLoai: 'VE_SOM', tenLoai: 'Về sớm', nhom: 'THOI_GIAN', moTa: 'Đơn xin về sớm' },
  { maLoai: 'CONG_TAC', tenLoai: 'Công tác', nhom: 'DI_CHUYEN', moTa: 'Đơn xin công tác' },
  { maLoai: 'WFH', tenLoai: 'Làm việc từ xa', nhom: 'DI_CHUYEN', moTa: 'Đơn xin làm việc từ xa' },
];
for (const ly of loaiYeuCaus) {
  sql.push(`INSERT INTO danh_muc_loai_yeu_cau (ma_loai, ten_loai, nhom, mo_ta, trang_thai, ngay_tao) VALUES ('${ly.maLoai}', '${ly.tenLoai}', '${ly.nhom}', '${ly.moTa}', true, NOW()) ON CONFLICT (ma_loai) DO NOTHING;`);
}
sql.push('');

// 6. CA LÀM VIỆC
sql.push('-- 6. CA LAM VIEC');
const caLamViecs = [
  { maCa: 'CA_HANH_CHINH', tenCa: 'Ca hành chính', gioVao: '08:00', gioRa: '17:00', gioNghiTrua: '12:00', hetNghiTrua: '13:00' },
  { maCa: 'CA_SANG', tenCa: 'Ca sáng', gioVao: '06:00', gioRa: '14:00', gioNghiTrua: null, hetNghiTrua: null },
  { maCa: 'CA_CHIEU', tenCa: 'Ca chiều', gioVao: '14:00', gioRa: '22:00', gioNghiTrua: null, hetNghiTrua: null },
  { maCa: 'CA_KHO', tenCa: 'Ca kho vận', gioVao: '06:00', gioRa: '15:00', gioNghiTrua: '11:00', hetNghiTrua: '11:30' },
  { maCa: 'CA_GIAO_HANG', tenCa: 'Ca giao hàng', gioVao: '04:00', gioRa: '12:00', gioNghiTrua: null, hetNghiTrua: null },
];
for (const ca of caLamViecs) {
  const gioNghiTrua = ca.gioNghiTrua ? `'${ca.gioNghiTrua}'` : 'NULL';
  const hetNghiTrua = ca.hetNghiTrua ? `'${ca.hetNghiTrua}'` : 'NULL';
  sql.push(`INSERT INTO ca_lam_viec (ma_ca, ten_ca, gio_vao, gio_ra, gio_nghi_trua, het_nghi_trua, trang_thai, ngay_tao) VALUES ('${ca.maCa}', '${ca.tenCa}', '${ca.gioVao}', '${ca.gioRa}', ${gioNghiTrua}, ${hetNghiTrua}, true, NOW()) ON CONFLICT (ma_ca) DO NOTHING;`);
}
sql.push('');

// 7. TÀI KHOẢN NHÂN VIÊN
sql.push('-- 7. TAI KHOAN NHAN VIEN');
const passwordHash = crypto.createHash('sha256').update('123456').digest('hex');
sql.push(`INSERT INTO nguoi_dung (ten_dang_nhap, mat_khau, email, ho_ten, nhan_vien_id, trang_thai, ngay_tao, ngay_cap_nhat) SELECT LOWER(nv.ma_nhan_vien), '${passwordHash}', COALESCE(nv.email, LOWER(nv.ma_nhan_vien) || '@company.com'), nv.ho_ten, nv.id, 'HOAT_DONG', NOW(), NOW() FROM nhan_vien nv WHERE nv.trang_thai = 'DANG_LAM' AND NOT EXISTS (SELECT 1 FROM nguoi_dung nd WHERE nd.nhan_vien_id = nv.id) ON CONFLICT (ten_dang_nhap) DO NOTHING;`);
sql.push('');

// Gán vai trò
sql.push('-- 7.1. GAN VAI TRO EMPLOYEE');
sql.push(`INSERT INTO nguoi_dung_vai_tro (nguoi_dung_id, vai_tro_id, tu_ngay, ngay_tao) SELECT nd.id, vt.id, NOW(), NOW() FROM nguoi_dung nd CROSS JOIN vai_tro vt WHERE vt.ma_vai_tro = 'EMPLOYEE' AND nd.nhan_vien_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM nguoi_dung_vai_tro ndvt WHERE ndvt.nguoi_dung_id = nd.id AND ndvt.vai_tro_id = vt.id);`);
sql.push('');

sql.push('-- 7.2. GAN VAI TRO MANAGER');
sql.push(`INSERT INTO nguoi_dung_vai_tro (nguoi_dung_id, vai_tro_id, tu_ngay, ngay_tao) SELECT nd.id, vt.id, NOW(), NOW() FROM nguoi_dung nd JOIN nhan_vien nv ON nd.nhan_vien_id = nv.id CROSS JOIN vai_tro vt WHERE vt.ma_vai_tro = 'MANAGER' AND (nv.chuc_vu ILIKE '%Trưởng%' OR nv.chuc_vu ILIKE '%Quản lý%' OR nv.chuc_vu ILIKE '%Manager%') AND NOT EXISTS (SELECT 1 FROM nguoi_dung_vai_tro ndvt WHERE ndvt.nguoi_dung_id = nd.id AND ndvt.vai_tro_id = vt.id);`);
sql.push('');

// 8. LỊCH PHÂN CA
sql.push('-- 8. LICH PHAN CA');
sql.push(`INSERT INTO lich_phan_ca (ten_lich, thang, nam, trang_thai, ngay_tao) VALUES ('Lịch phân ca tháng 1/2026', 1, 2026, 'DA_XUAT_BAN', NOW()) ON CONFLICT DO NOTHING;`);
sql.push('');

sql.push('-- 8.1. PHAN CA CHI TIET');
sql.push(`INSERT INTO lich_phan_ca_chi_tiet (lich_phan_ca_id, nhan_vien_id, ca_lam_viec_id, ngay_lam_viec, ngay_tao) SELECT lpc.id, nv.id, CASE WHEN pb.ma_phong_ban IN ('KV', 'CH') THEN (SELECT id FROM ca_lam_viec WHERE ma_ca = 'CA_KHO' LIMIT 1) WHEN pb.ma_phong_ban IN ('SHIP', 'GIAO_HANG') THEN (SELECT id FROM ca_lam_viec WHERE ma_ca = 'CA_GIAO_HANG' LIMIT 1) ELSE (SELECT id FROM ca_lam_viec WHERE ma_ca = 'CA_HANH_CHINH' LIMIT 1) END, d::date, NOW() FROM nhan_vien nv JOIN phong_ban pb ON nv.phong_ban_id = pb.id CROSS JOIN lich_phan_ca lpc CROSS JOIN generate_series('2026-01-01'::date, '2026-01-31'::date, '1 day'::interval) d WHERE nv.trang_thai = 'DANG_LAM' AND lpc.thang = 1 AND lpc.nam = 2026 AND EXTRACT(DOW FROM d::date) NOT IN (0) ON CONFLICT DO NOTHING;`);
sql.push('');

// 9. CHẤM CÔNG
sql.push('-- 9. CHAM CONG');
sql.push(`INSERT INTO cham_cong (thang, nam, trang_thai, ngay_tao) VALUES (1, 2026, 'DANG_MO', NOW()) ON CONFLICT DO NOTHING;`);
sql.push('');

sql.push('-- 9.1. CHI TIET CHAM CONG');
sql.push(`INSERT INTO chi_tiet_cham_cong (cham_cong_id, nhan_vien_id, ca_lam_viec_id, ngay_cham_cong, gio_vao, gio_ra, trang_thai, phut_di_tre, phut_ve_som, gio_lam_thuc_te, ngay_tao) SELECT cc.id, nv.id, clv.id, d::date, (clv.gio_vao::time + (floor(random() * 20 - 5) || ' minutes')::interval)::time, (clv.gio_ra::time + (floor(random() * 40 - 10) || ' minutes')::interval)::time, CASE WHEN random() < 0.05 THEN 'VANG_MAT' WHEN random() < 0.15 THEN 'DI_TRE' ELSE 'DU_CONG' END, CASE WHEN random() < 0.15 THEN floor(random() * 30 + 5)::int ELSE 0 END, CASE WHEN random() < 0.05 THEN floor(random() * 20)::int ELSE 0 END, 8.0, NOW() FROM nhan_vien nv JOIN phong_ban pb ON nv.phong_ban_id = pb.id CROSS JOIN cham_cong cc CROSS JOIN ca_lam_viec clv CROSS JOIN generate_series('2026-01-02'::date, '2026-01-17'::date, '1 day'::interval) d WHERE nv.trang_thai = 'DANG_LAM' AND cc.thang = 1 AND cc.nam = 2026 AND clv.ma_ca = CASE WHEN pb.ma_phong_ban IN ('KV', 'CH') THEN 'CA_KHO' WHEN pb.ma_phong_ban IN ('SHIP', 'GIAO_HANG') THEN 'CA_GIAO_HANG' ELSE 'CA_HANH_CHINH' END AND EXTRACT(DOW FROM d::date) NOT IN (0) ON CONFLICT DO NOTHING;`);
sql.push('');

// 10. ĐƠN NGHỈ PHÉP
sql.push('-- 10. DON NGHI PHEP');
sql.push(`INSERT INTO don_nghi_phep (nhan_vien_id, loai_nghi_id, tu_ngay, den_ngay, so_ngay, ly_do, trang_thai, ngay_tao) SELECT nv.id, ln.id, '2026-01-20'::date, '2026-01-21'::date, 2, 'Nghỉ phép giải quyết việc gia đình', 'NHAP', NOW() FROM nhan_vien nv CROSS JOIN danh_muc_loai_nghi ln WHERE nv.ma_nhan_vien IN ('NV0005', 'NV0007', 'NV0010') AND ln.ma_loai_nghi = 'PHEP_NAM' AND nv.trang_thai = 'DANG_LAM' ON CONFLICT DO NOTHING;`);
sql.push(`INSERT INTO don_nghi_phep (nhan_vien_id, loai_nghi_id, tu_ngay, den_ngay, so_ngay, ly_do, trang_thai, ngay_gui_duyet, ngay_duyet, ngay_tao) SELECT nv.id, ln.id, '2026-01-08'::date, '2026-01-08'::date, 1, 'Nghỉ ốm đột xuất', 'DA_DUYET', '2026-01-07'::timestamp, '2026-01-07'::timestamp, NOW() FROM nhan_vien nv CROSS JOIN danh_muc_loai_nghi ln WHERE nv.ma_nhan_vien IN ('NV0003', 'NV0015') AND ln.ma_loai_nghi = 'NGHI_OM' AND nv.trang_thai = 'DANG_LAM' ON CONFLICT DO NOTHING;`);
sql.push('');

// 11. ĐƠN YÊU CẦU
sql.push('-- 11. DON YEU CAU');
sql.push(`INSERT INTO don_yeu_cau (nhan_vien_id, loai_yeu_cau_id, ngay_ap_dung, gio_bat_dau, gio_ket_thuc, ly_do, trang_thai, ngay_tao) SELECT nv.id, ly.id, '2026-01-15'::date, '17:00'::time, '20:00'::time, 'Làm thêm giờ hoàn thành đơn hàng gấp', 'NHAP', NOW() FROM nhan_vien nv CROSS JOIN danh_muc_loai_yeu_cau ly WHERE nv.ma_nhan_vien IN ('NV0007', 'NV0008', 'NV0009') AND ly.ma_loai = 'OT' AND nv.trang_thai = 'DANG_LAM' ON CONFLICT DO NOTHING;`);
sql.push(`INSERT INTO don_yeu_cau (nhan_vien_id, loai_yeu_cau_id, ngay_ap_dung, gio_bat_dau, gio_ket_thuc, ly_do, trang_thai, ngay_duyet_1, ngay_tao) SELECT nv.id, ly.id, '2026-01-10'::date, '08:00'::time, '09:00'::time, 'Đi khám bệnh buổi sáng', 'DA_DUYET_1', '2026-01-09'::timestamp, NOW() FROM nhan_vien nv CROSS JOIN danh_muc_loai_yeu_cau ly WHERE nv.ma_nhan_vien = 'NV0001' AND ly.ma_loai = 'TRE_GIO' AND nv.trang_thai = 'DANG_LAM' ON CONFLICT DO NOTHING;`);
sql.push('');

// 12. BẢNG LƯƠNG
sql.push('-- 12. BANG LUONG');
sql.push(`INSERT INTO bang_luong (thang, nam, trang_thai, ngay_tao, ngay_chot) VALUES (12, 2025, 'DA_CHOT', NOW(), '2026-01-05'::timestamp) ON CONFLICT DO NOTHING;`);
sql.push(`INSERT INTO chi_tiet_bang_luong (bang_luong_id, nhan_vien_id, luong_co_ban, ngay_cong_thuc_te, ngay_cong_chuan, tong_thu_nhap, tong_khau_tru, thuc_linh, ngay_tao) SELECT bl.id, nv.id, nv.luong_co_ban, 22, 26, nv.luong_co_ban + 500000, nv.luong_co_ban * 0.105, nv.luong_co_ban + 500000 - nv.luong_co_ban * 0.105, NOW() FROM nhan_vien nv CROSS JOIN bang_luong bl WHERE nv.trang_thai = 'DANG_LAM' AND bl.thang = 12 AND bl.nam = 2025 ON CONFLICT DO NOTHING;`);
sql.push(`INSERT INTO bang_luong (thang, nam, trang_thai, ngay_tao) VALUES (1, 2026, 'DANG_MO', NOW()) ON CONFLICT DO NOTHING;`);
sql.push('');

// 13. THÔNG BÁO
sql.push('-- 13. THONG BAO');
sql.push(`INSERT INTO thong_bao (nguoi_nhan_id, tieu_de, noi_dung, loai, da_doc, ngay_tao) SELECT nd.id, 'Chào mừng đến HRM-Lite v2', 'Hệ thống quản lý nhân sự HRM-Lite phiên bản 2 đã sẵn sàng!', 'HE_THONG', false, NOW() FROM nguoi_dung nd WHERE nd.ten_dang_nhap = 'admin';`);
sql.push(`INSERT INTO thong_bao (nguoi_nhan_id, tieu_de, noi_dung, loai, da_doc, ngay_tao) SELECT nd.id, 'Phiếu lương tháng 12/2025', 'Phiếu lương tháng 12/2025 đã sẵn sàng.', 'LUONG', false, NOW() FROM nguoi_dung nd WHERE nd.nhan_vien_id IS NOT NULL;`);
sql.push('');

// 14. PHỤ CẤP NHÂN VIÊN
sql.push('-- 14. PHU CAP NHAN VIEN');
sql.push(`INSERT INTO phu_cap_nhan_vien (nhan_vien_id, khoan_luong_id, gia_tri, tu_ngay, trang_thai, ngay_tao) SELECT nv.id, kl.id, 300000, '2026-01-01'::date, 'DANG_AP_DUNG', NOW() FROM nhan_vien nv CROSS JOIN khoan_luong kl WHERE nv.trang_thai = 'DANG_LAM' AND kl.ma_khoan = 'PHU_CAP_XANG_XE' ON CONFLICT DO NOTHING;`);
sql.push(`INSERT INTO phu_cap_nhan_vien (nhan_vien_id, khoan_luong_id, gia_tri, tu_ngay, trang_thai, ngay_tao) SELECT nv.id, kl.id, 30000, '2026-01-01'::date, 'DANG_AP_DUNG', NOW() FROM nhan_vien nv CROSS JOIN khoan_luong kl WHERE nv.trang_thai = 'DANG_LAM' AND kl.ma_khoan = 'HO_TRO_AN_CA' ON CONFLICT DO NOTHING;`);
sql.push(`INSERT INTO phu_cap_nhan_vien (nhan_vien_id, khoan_luong_id, gia_tri, tu_ngay, trang_thai, ngay_tao) SELECT nv.id, kl.id, 1000000, '2026-01-01'::date, 'DANG_AP_DUNG', NOW() FROM nhan_vien nv CROSS JOIN khoan_luong kl WHERE (nv.chuc_vu ILIKE '%Trưởng%' OR nv.chuc_vu ILIKE '%Quản lý%') AND nv.trang_thai = 'DANG_LAM' AND kl.ma_khoan = 'PHU_CAP_CHUC_VU' ON CONFLICT DO NOTHING;`);
sql.push('');

// 15. GEOFENCE
sql.push('-- 15. GEOFENCE');
sql.push(`INSERT INTO cau_hinh_geofence (ten, latitude, longitude, ban_kinh, ap_dung_tat_ca, bat_buoc_gps, chan_ngoai_vung, trang_thai, ngay_tao) VALUES ('Văn phòng chính', 10.8231, 106.6297, 100, true, true, false, true, NOW()) ON CONFLICT DO NOTHING;`);
sql.push(`INSERT INTO cau_hinh_geofence (ten, latitude, longitude, ban_kinh, ap_dung_tat_ca, bat_buoc_gps, chan_ngoai_vung, trang_thai, ngay_tao) VALUES ('Kho hàng Bình Dương', 10.9803, 106.6520, 200, false, true, false, true, NOW()) ON CONFLICT DO NOTHING;`);
sql.push('');

// THỐNG KÊ
sql.push('-- THONG KE');
sql.push(`SELECT 'phong_ban' as bang, COUNT(*) as so_luong FROM phong_ban UNION ALL SELECT 'nhan_vien', COUNT(*) FROM nhan_vien UNION ALL SELECT 'nguoi_dung', COUNT(*) FROM nguoi_dung UNION ALL SELECT 'khoan_luong', COUNT(*) FROM khoan_luong UNION ALL SELECT 'ca_lam_viec', COUNT(*) FROM ca_lam_viec UNION ALL SELECT 'lich_phan_ca_chi_tiet', COUNT(*) FROM lich_phan_ca_chi_tiet UNION ALL SELECT 'chi_tiet_cham_cong', COUNT(*) FROM chi_tiet_cham_cong UNION ALL SELECT 'don_nghi_phep', COUNT(*) FROM don_nghi_phep UNION ALL SELECT 'don_yeu_cau', COUNT(*) FROM don_yeu_cau UNION ALL SELECT 'phu_cap_nhan_vien', COUNT(*) FROM phu_cap_nhan_vien ORDER BY bang;`);

fs.writeFileSync('scripts/seed-docker-v2.sql', sql.join('\n'));

console.log('✅ Generated: scripts/seed-docker-v2.sql');
console.log('📊 Phòng ban:', seedData.phongBans.length);
console.log('👥 Nhân viên:', seedData.nhanViens.length);
console.log('');
console.log('Chạy: docker exec -i hrm-lite-db-v2 psql -U hrmlite -d hrm_lite < scripts/seed-docker-v2.sql');
