// Script tạo SQL để seed dữ liệu vào Docker database
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const data = require('../prisma/seed-data.json');

let sql = '-- Auto-generated seed SQL\n';
sql += 'BEGIN;\n\n';

// Vai trò ADMIN
sql += `-- Vai trò ADMIN
INSERT INTO vai_tro (ma_vai_tro, ten_vai_tro, mo_ta, cap_do, trang_thai, ngay_tao)
VALUES ('ADMIN', 'Quản trị viên', 'Toàn quyền hệ thống', 100, true, NOW())
ON CONFLICT (ma_vai_tro) DO NOTHING;\n\n`;

// Admin user
const matKhauHash = crypto.createHash('sha256').update('admin123').digest('hex');
sql += `-- Admin user
INSERT INTO nguoi_dung (ten_dang_nhap, mat_khau, email, ho_ten, trang_thai, ngay_tao, ngay_cap_nhat)
VALUES ('admin', '${matKhauHash}', 'admin@company.com', 'Administrator', 'HOAT_DONG', NOW(), NOW())
ON CONFLICT (ten_dang_nhap) DO NOTHING;\n\n`;

sql += `-- Gán vai trò ADMIN
INSERT INTO nguoi_dung_vai_tro (nguoi_dung_id, vai_tro_id)
SELECT n.id, v.id FROM nguoi_dung n, vai_tro v WHERE n.ten_dang_nhap = 'admin' AND v.ma_vai_tro = 'ADMIN'
ON CONFLICT DO NOTHING;\n\n`;

// Phòng ban
sql += '-- Phòng ban\n';
for (const pb of data.phongBans) {
  const tenPB = pb.tenPhongBan.replace(/'/g, "''");
  const moTa = (pb.moTa || '').replace(/'/g, "''");
  sql += `INSERT INTO phong_ban (ma_phong_ban, ten_phong_ban, mo_ta, gio_vao_chuan, gio_ra_chuan, phut_cho_phep_tre, ngay_tao, ngay_cap_nhat) VALUES ('${pb.maPhongBan}', '${tenPB}', '${moTa}', '${pb.gioVaoChuan}', '${pb.gioRaChuan}', ${pb.phutChoPhepTre}, NOW(), NOW()) ON CONFLICT (ma_phong_ban) DO NOTHING;\n`;
}

// Nhân viên
sql += '\n-- Nhân viên\n';

// Tạo mapping tên phòng ban -> mã phòng ban
const tenPhongBanToMa = {};
for (const pb of data.phongBans) {
  tenPhongBanToMa[pb.tenPhongBan] = pb.maPhongBan;
}

for (const nv of data.nhanViens) {
  const hoTen = nv.hoTen.replace(/'/g, "''");
  const chucVu = (nv.chucVu || '').replace(/'/g, "''");
  const email = nv.email ? `'${nv.email}'` : 'NULL';
  const sdt = nv.soDienThoai ? `'${nv.soDienThoai}'` : 'NULL';
  const maPhongBan = tenPhongBanToMa[nv.tenPhongBan] || 'KT';
  sql += `INSERT INTO nhan_vien (ma_nhan_vien, ho_ten, email, so_dien_thoai, chuc_vu, luong_co_ban, ngay_vao_lam, trang_thai, phong_ban_id, ngay_tao, ngay_cap_nhat) VALUES ('${nv.maNhanVien}', '${hoTen}', ${email}, ${sdt}, '${chucVu}', ${nv.luongCoBan}, '${nv.ngayVaoLam}', '${nv.trangThai}', (SELECT id FROM phong_ban WHERE ma_phong_ban = '${maPhongBan}'), NOW(), NOW()) ON CONFLICT (ma_nhan_vien) DO NOTHING;\n`;
}

// Khoản lương
sql += '\n-- Khoản lương\n';
for (const kl of data.khoanLuongs) {
  const tenKhoan = kl.tenKhoan.replace(/'/g, "''");
  const moTa = (kl.moTa || '').replace(/'/g, "''");
  const phamVi = kl.phamViApDung ? `'${kl.phamViApDung}'` : 'NULL';
  sql += `INSERT INTO khoan_luong (ma_khoan, ten_khoan, loai, chiu_thue, pham_vi_ap_dung, mo_ta, thu_tu, trang_thai, ngay_tao, ngay_cap_nhat) VALUES ('${kl.maKhoan}', '${tenKhoan}', '${kl.loai}', ${kl.chiuThue}, ${phamVi}, '${moTa}', ${kl.thuTu}, ${kl.trangThai}, NOW(), NOW()) ON CONFLICT (ma_khoan) DO NOTHING;\n`;
}

// Cấu hình BHXH
sql += '\n-- Cấu hình BHXH\n';
for (const bh of data.cauHinhBHXH) {
  sql += `INSERT INTO cau_hinh_bhxh (nam, ty_le_bhxh_nv, ty_le_bhxh_dn, ty_le_bhyt_nv, ty_le_bhyt_dn, ty_le_bhtn_nv, ty_le_bhtn_dn, luong_co_ban_toi_thieu, tran_dong_bhxh, luong_co_so, trang_thai, ngay_tao, ngay_cap_nhat) VALUES (${bh.nam}, ${bh.tyLeBHXH_NV}, ${bh.tyLeBHXH_DN}, ${bh.tyLeBHYT_NV}, ${bh.tyLeBHYT_DN}, ${bh.tyLeBHTN_NV}, ${bh.tyLeBHTN_DN}, ${bh.luongCoBanToiThieu}, ${bh.tranDongBHXH}, ${bh.luongCoSo}, ${bh.trangThai}, NOW(), NOW()) ON CONFLICT (nam) DO NOTHING;\n`;
}

// Cấu hình thuế
sql += '\n-- Cấu hình thuế\n';
for (const th of data.cauHinhThue) {
  sql += `INSERT INTO cau_hinh_thue_tncn (nam, giam_tru_ban_than, giam_tru_phu_thuoc, trang_thai, ngay_tao, ngay_cap_nhat) VALUES (${th.nam}, ${th.giamTruBanThan}, ${th.giamTruPhuThuoc}, ${th.trangThai}, NOW(), NOW()) ON CONFLICT (nam) DO NOTHING;\n`;
}

// Bậc thuế
sql += '\n-- Bậc thuế\n';
for (const bt of data.bacThue) {
  const denMuc = bt.denMuc !== null ? bt.denMuc : 'NULL';
  sql += `INSERT INTO bac_thue_tncn (cau_hinh_thue_id, bac, tu_muc, den_muc, thue_suat, so_tien_tru_nhanh, ngay_tao) VALUES ((SELECT id FROM cau_hinh_thue_tncn ORDER BY id LIMIT 1 OFFSET ${bt.cauHinhThueId - 1}), ${bt.bac}, ${bt.tuMuc}, ${denMuc}, ${bt.thueSuat}, ${bt.soTienTruNhanh}, NOW()) ON CONFLICT DO NOTHING;\n`;
}

sql += '\nCOMMIT;\n';

// Write to file
const outputPath = path.join(__dirname, '../prisma/seed.sql');
fs.writeFileSync(outputPath, sql);
console.log(`✅ Generated ${outputPath}`);
console.log(`📊 Stats:`);
console.log(`   - Phòng ban: ${data.phongBans.length}`);
console.log(`   - Nhân viên: ${data.nhanViens.length}`);
console.log(`   - Khoản lương: ${data.khoanLuongs.length}`);
console.log(`   - Cấu hình BHXH: ${data.cauHinhBHXH.length}`);
console.log(`   - Cấu hình thuế: ${data.cauHinhThue.length}`);
console.log(`   - Bậc thuế: ${data.bacThue.length}`);
