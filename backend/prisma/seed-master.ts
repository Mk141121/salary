/**
 * MASTER SEED SCRIPT - Unified Seed for HRM-LITE System
 * 
 * This script seeds ALL data required for the system to function properly.
 * Run this after database reset: npx prisma db push && npx ts-node prisma/seed-master.ts
 * 
 * Created: 2026-01-20
 * Based on: backup_seed_20260120_150545.sql
 */

import { PrismaClient, Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

// ============================================
// HELPER FUNCTIONS
// ============================================
const log = (step: string, msg: string = '') => console.log(`[${step}] ${msg}`);

async function clearAllData() {
  log('CLEANUP', 'Clearing all existing data...');
  
  // Delete in order to respect foreign key constraints
  const deleteOperations = [
    prisma.ruleTrace.deleteMany(),
    prisma.chiTietBangLuong.deleteMany(),
    prisma.ngayCongBangLuong.deleteMany(),
    prisma.bangLuongQuyChe.deleteMany(),
    prisma.bangLuong.deleteMany(),
    prisma.quyCheRule.deleteMany(),
    prisma.quyChe.deleteMany(),
    prisma.snapshotSanLuongChiaHang.deleteMany(),
    prisma.snapshotGiaoHang.deleteMany(),
    prisma.sanLuongChiaHang.deleteMany(),
    prisma.giaoHang.deleteMany(),
    prisma.chiTietChamCong.deleteMany(),
    prisma.chamCong.deleteMany(),
    prisma.nguoiDungVaiTro.deleteMany(),
    prisma.vaiTroQuyen.deleteMany(),
    prisma.nguoiDung.deleteMany(),
    prisma.nhanVienHopDong.deleteMany(),
    prisma.nhanVienTrachNhiem.deleteMany(),
    prisma.phuCapNhanVien.deleteMany(),
    prisma.nhanVien.deleteMany(),
    prisma.vaiTro.deleteMany(),
    prisma.quyen.deleteMany(),
    prisma.khoanLuong.deleteMany(),
    prisma.cauHinhDonGia.deleteMany(),
    prisma.phongBan.deleteMany(),
    prisma.lichSuImport.deleteMany(),
  ];

  for (const op of deleteOperations) {
    try {
      await op;
    } catch (e) {
      // Ignore errors from non-existent tables
    }
  }

  log('CLEANUP', 'Done!');
}

async function main() {
  console.log('🌱 MASTER SEED SCRIPT - Starting...\n');
  
  await clearAllData();

  // ============================================
  // 1. PHONG BAN (Departments)
  // ============================================
  log('1. PHONG_BAN', 'Seeding departments...');
  
  const phongBans = await Promise.all([
    prisma.phongBan.create({ data: { maPhongBan: 'BOD', tenPhongBan: 'Ban Giám Đốc', gioVaoChuan: '08:00', gioRaChuan: '17:00', trangThai: 'ACTIVE' } }),
    prisma.phongBan.create({ data: { maPhongBan: 'KT', tenPhongBan: 'Kế Toán', gioVaoChuan: '08:00', gioRaChuan: '17:00', trangThai: 'ACTIVE' } }),
    prisma.phongBan.create({ data: { maPhongBan: 'NS', tenPhongBan: 'Nhân Sự', gioVaoChuan: '08:00', gioRaChuan: '17:00', trangThai: 'ACTIVE' } }),
    prisma.phongBan.create({ data: { maPhongBan: 'KD', tenPhongBan: 'Kinh Doanh', gioVaoChuan: '08:00', gioRaChuan: '17:30', trangThai: 'ACTIVE' } }),
    prisma.phongBan.create({ data: { maPhongBan: 'KV', tenPhongBan: 'Kho vận', gioVaoChuan: '07:30', gioRaChuan: '16:30', trangThai: 'ACTIVE' } }),
    prisma.phongBan.create({ data: { maPhongBan: 'TM', tenPhongBan: 'Thu mua', gioVaoChuan: '08:00', gioRaChuan: '17:00', trangThai: 'ACTIVE' } }),
    prisma.phongBan.create({ data: { maPhongBan: 'DH', tenPhongBan: 'Đơn hàng', gioVaoChuan: '08:00', gioRaChuan: '17:00', trangThai: 'ACTIVE' } }),
    prisma.phongBan.create({ data: { maPhongBan: 'MKT', tenPhongBan: 'Marketing', gioVaoChuan: '08:30', gioRaChuan: '17:30', trangThai: 'ACTIVE' } }),
    prisma.phongBan.create({ data: { maPhongBan: 'CH', tenPhongBan: 'Chia hàng', gioVaoChuan: '06:00', gioRaChuan: '14:00', trangThai: 'ACTIVE' } }),
    prisma.phongBan.create({ data: { maPhongBan: 'GH', tenPhongBan: 'Giao hàng', gioVaoChuan: '06:00', gioRaChuan: '18:00', trangThai: 'ACTIVE' } }),
    prisma.phongBan.create({ data: { maPhongBan: 'VP', tenPhongBan: 'Khối Văn Phòng', gioVaoChuan: '08:00', gioRaChuan: '17:00', trangThai: 'ACTIVE' } }),
  ]);

  const pbMap = Object.fromEntries(phongBans.map(pb => [pb.maPhongBan, pb]));
  log('1. PHONG_BAN', `Created ${phongBans.length} departments`);

  // ============================================
  // 2. KHOAN LUONG (Salary Components)
  // ============================================
  log('2. KHOAN_LUONG', 'Seeding salary components...');

  const khoanLuongs = [
    { maKhoan: 'LUONG_CO_BAN', tenKhoan: 'Lương cơ bản', loai: 'THU_NHAP', cachTinh: 'LUONG_THANG_CO_DINH', thuTu: 1 },
    { maKhoan: 'THUONG_HIEU_SUAT', tenKhoan: 'Thưởng hiệu suất', loai: 'THU_NHAP', cachTinh: 'LUONG_THANG_CO_DINH', thuTu: 2 },
    { maKhoan: 'PHU_CAP_XANG_XE', tenKhoan: 'Phụ cấp xăng xe', loai: 'THU_NHAP', cachTinh: 'LUONG_THANG_CO_DINH', thuTu: 3 },
    { maKhoan: 'PHU_CAP_DIEN_THOAI', tenKhoan: 'Phụ cấp điện thoại', loai: 'THU_NHAP', cachTinh: 'LUONG_THANG_CO_DINH', thuTu: 4 },
    { maKhoan: 'HO_TRO_CHUYEN_CAN', tenKhoan: 'Hỗ trợ chuyên cần', loai: 'THU_NHAP', cachTinh: 'LUONG_THANG_CO_DINH', thuTu: 5 },
    { maKhoan: 'HO_TRO_AN_CA', tenKhoan: 'Hỗ trợ ăn ca', loai: 'THU_NHAP', cachTinh: 'LUONG_THANG_CO_DINH', thuTu: 6 },
    { maKhoan: 'THUONG_KINH_DOANH', tenKhoan: 'Thưởng kinh doanh', loai: 'THU_NHAP', cachTinh: 'LUONG_THANG_CO_DINH', thuTu: 7 },
    { maKhoan: 'PHU_CAP_KHAC', tenKhoan: 'Phụ cấp khác', loai: 'THU_NHAP', cachTinh: 'LUONG_THANG_CO_DINH', thuTu: 8 },
    { maKhoan: 'PHU_CAP_CHUC_VU', tenKhoan: 'Phụ cấp chức vụ', loai: 'THU_NHAP', cachTinh: 'LUONG_THANG_CO_DINH', thuTu: 9 },
    { maKhoan: 'PHU_CAP_THAM_NIEN', tenKhoan: 'Phụ cấp thâm niên', loai: 'THU_NHAP', cachTinh: 'LUONG_THANG_CO_DINH', thuTu: 10 },
    // Sản lượng
    { maKhoan: 'TIEN_SAN_LUONG_CH', tenKhoan: 'Tiền sản lượng Chia hàng', loai: 'THU_NHAP', cachTinh: 'LUONG_THANG_CO_DINH', thuTu: 100 },
    { maKhoan: 'TIEN_SAN_LUONG_GH', tenKhoan: 'Tiền sản lượng Giao hàng', loai: 'THU_NHAP', cachTinh: 'LUONG_THANG_CO_DINH', thuTu: 101 },
    // Khấu trừ
    { maKhoan: 'BHXH_NV', tenKhoan: 'BHXH/BHYT/BHTN (NV đóng)', loai: 'KHAU_TRU', cachTinh: 'LUONG_THANG_CO_DINH', thuTu: 200 },
    { maKhoan: 'BHXH_NLD', tenKhoan: 'BHXH (8%)', loai: 'KHAU_TRU', cachTinh: 'LUONG_THANG_CO_DINH', thuTu: 201 },
    { maKhoan: 'BHYT_NLD', tenKhoan: 'BHYT (1.5%)', loai: 'KHAU_TRU', cachTinh: 'LUONG_THANG_CO_DINH', thuTu: 202 },
    { maKhoan: 'BHTN_NLD', tenKhoan: 'BHTN (1%)', loai: 'KHAU_TRU', cachTinh: 'LUONG_THANG_CO_DINH', thuTu: 203 },
    { maKhoan: 'THUE_TNCN', tenKhoan: 'Thuế TNCN', loai: 'KHAU_TRU', cachTinh: 'LUONG_THANG_CO_DINH', thuTu: 204 },
    { maKhoan: 'PHAT_DI_MUON', tenKhoan: 'Phạt đi muộn', loai: 'KHAU_TRU', cachTinh: 'LUONG_THANG_CO_DINH', thuTu: 205 },
    { maKhoan: 'PHAT_VE_SOM', tenKhoan: 'Phạt về sớm', loai: 'KHAU_TRU', cachTinh: 'LUONG_THANG_CO_DINH', thuTu: 206 },
    { maKhoan: 'PHAT_NGHI_KHONG_PHEP', tenKhoan: 'Phạt nghỉ không phép', loai: 'KHAU_TRU', cachTinh: 'LUONG_THANG_CO_DINH', thuTu: 207 },
    { maKhoan: 'TRU_NGAY_CONG', tenKhoan: 'Trừ ngày công', loai: 'KHAU_TRU', cachTinh: 'LUONG_THANG_CO_DINH', thuTu: 208 },
    { maKhoan: 'KHAU_TRU_KHAC', tenKhoan: 'Khấu trừ khác', loai: 'KHAU_TRU', cachTinh: 'LUONG_THANG_CO_DINH', thuTu: 209 },
    { maKhoan: 'KHAU_TRU_UNG_LUONG', tenKhoan: 'Khấu trừ ứng lương', loai: 'KHAU_TRU', cachTinh: 'LUONG_THANG_CO_DINH', thuTu: 210 },
    { maKhoan: 'PHAT_SP_LOI', tenKhoan: 'Phạt sản phẩm lỗi', loai: 'KHAU_TRU', cachTinh: 'LUONG_THANG_CO_DINH', thuTu: 211 },
  ];

  const klResults = await Promise.all(
    khoanLuongs.map(kl => prisma.khoanLuong.create({ data: kl as any }))
  );
  const klMap = Object.fromEntries(klResults.map(kl => [kl.maKhoan, kl]));
  log('2. KHOAN_LUONG', `Created ${klResults.length} salary components`);

  // ============================================
  // 3. CAU HINH DON GIA (Unit Prices)
  // ============================================
  log('3. CAU_HINH_DON_GIA', 'Seeding unit prices...');

  await prisma.cauHinhDonGia.createMany({
    data: [
      { maBien: 'DON_GIA_SP', tenBien: 'Đơn giá sản phẩm', moTa: 'Số tiền thưởng trên mỗi sản phẩm đạt', giaTri: 320, donVi: 'VND', trangThai: true },
      { maBien: 'DON_GIA_KHOI_LUONG', tenBien: 'Đơn giá khối lượng giao hàng', moTa: 'Số tiền thưởng trên mỗi kg giao thành công', giaTri: 500, donVi: 'VND', trangThai: true },
      { maBien: 'DON_GIA_PHAT_TRE', tenBien: 'Đơn giá phạt trễ giờ', moTa: 'Số tiền phạt cho mỗi lần trễ giờ', giaTri: 50000, donVi: 'VND', trangThai: true },
      { maBien: 'HE_SO_LOI_SP', tenBien: 'Hệ số phạt lỗi sản phẩm', moTa: 'Hệ số nhân để tính phạt khi có sản phẩm lỗi', giaTri: 5, donVi: 'lần', trangThai: true },
      { maBien: 'DON_GIA_PHAT_PHIEU', tenBien: 'Phạt không lấy phiếu', moTa: 'Không lấy phiếu giao hàng về', giaTri: 50000, donVi: 'VND', trangThai: true },
    ],
  });
  log('3. CAU_HINH_DON_GIA', 'Created 5 unit prices');

  // ============================================
  // 4. VAI TRO & QUYEN (Roles & Permissions)
  // ============================================
  log('4. VAI_TRO', 'Seeding roles...');

  const roleAdmin = await prisma.vaiTro.create({
    data: { maVaiTro: 'ADMIN', tenVaiTro: 'Quản trị hệ thống', moTa: 'Toàn quyền hệ thống', trangThai: true },
  });
  const roleHR = await prisma.vaiTro.create({
    data: { maVaiTro: 'HR', tenVaiTro: 'Nhân sự', moTa: 'Quản lý nhân viên, chấm công, lương', trangThai: true },
  });
  const roleManager = await prisma.vaiTro.create({
    data: { maVaiTro: 'MANAGER', tenVaiTro: 'Quản lý', moTa: 'Xem báo cáo phòng ban', trangThai: true },
  });
  const roleEmployee = await prisma.vaiTro.create({
    data: { maVaiTro: 'EMPLOYEE', tenVaiTro: 'Nhân viên', moTa: 'Xem thông tin cá nhân', trangThai: true },
  });
  log('4. VAI_TRO', 'Created 4 roles');

  // ============================================
  // 5. NHAN VIEN (Employees) - Read from JSON
  // ============================================
  log('5. NHAN_VIEN', 'Loading employees from seed-data.json...');

  const seedData = require('./seed-data.json');
  const nhanVienData = seedData.nhanViens || [];

  for (const nv of nhanVienData) {
    const pb = phongBans.find(p => p.tenPhongBan === nv.tenPhongBan);
    if (!pb) continue;

    await prisma.nhanVien.create({
      data: {
        maNhanVien: nv.maNhanVien,
        hoTen: nv.hoTen,
        email: nv.email || null,
        soDienThoai: nv.soDienThoai || null,
        phongBanId: pb.id,
        chucVu: nv.chucVu || null,
        luongCoBan: nv.luongCoBan || 0,
        ngayVaoLam: nv.ngayVaoLam ? new Date(nv.ngayVaoLam) : new Date(),
        trangThai: nv.trangThai || 'DANG_LAM',
        gioiTinh: nv.gioiTinh || 'NAM',
      },
    });
  }
  log('5. NHAN_VIEN', `Created ${nhanVienData.length} employees`);

  // ============================================
  // 6. NGUOI DUNG (Users)
  // ============================================
  log('6. NGUOI_DUNG', 'Seeding users...');

  const adminHash = await bcrypt.hash('admin123', 10);
  const adminUser = await prisma.nguoiDung.create({
    data: {
      tenDangNhap: 'admin',
      matKhau: adminHash,
      hoTen: 'System Administrator',
      email: 'admin@company.com',
      trangThai: 'HOAT_DONG',
    },
  });

  await prisma.nguoiDungVaiTro.create({
    data: { nguoiDungId: adminUser.id, vaiTroId: roleAdmin.id },
  });
  log('6. NGUOI_DUNG', 'Created admin user');

  // ============================================
  // 7. QUY CHE (Salary Rules)
  // ============================================
  log('7. QUY_CHE', 'Seeding salary rules...');

  // Quy che Chia hang
  const qcChiaHang = await prisma.quyChe.create({
    data: {
      phongBanId: pbMap['CH'].id,
      tenQuyChe: 'KPI Chia hàng',
      moTa: 'Quy chế tính lương theo sản lượng chia hàng',
      tuNgay: new Date('2026-01-01'),
      phienBan: 1,
      trangThai: 'HIEU_LUC',
    },
  });

  await prisma.quyCheRule.createMany({
    data: [
      {
        quyCheId: qcChiaHang.id,
        khoanLuongId: klMap['TIEN_SAN_LUONG_CH'].id,
        tenRule: 'Tính tiền sản lượng chia hàng',
        moTa: 'TONG_SP_DAT * DON_GIA_SP',
        loaiRule: 'CONG_THUC',
        congThucJson: '{"bieuThuc": "TONG_SP_DAT * DON_GIA_SP"}',
        thuTuUuTien: 1,
        trangThai: true,
      },
      {
        quyCheId: qcChiaHang.id,
        khoanLuongId: klMap['PHAT_SP_LOI'].id,
        tenRule: 'Phạt sản phẩm lỗi',
        moTa: 'TONG_SP_LOI * DON_GIA_SP * HE_SO_LOI_SP',
        loaiRule: 'CONG_THUC',
        congThucJson: '{"bieuThuc": "TONG_SP_LOI * DON_GIA_SP * HE_SO_LOI_SP"}',
        thuTuUuTien: 2,
        trangThai: true,
      },
    ],
  });

  // Quy che Giao hang
  const qcGiaoHang = await prisma.quyChe.create({
    data: {
      phongBanId: pbMap['GH'].id,
      tenQuyChe: 'KPI Giao hàng',
      moTa: 'Quy chế tính lương theo sản lượng giao hàng',
      tuNgay: new Date('2026-01-01'),
      phienBan: 1,
      trangThai: 'HIEU_LUC',
    },
  });

  await prisma.quyCheRule.create({
    data: {
      quyCheId: qcGiaoHang.id,
      khoanLuongId: klMap['TIEN_SAN_LUONG_GH'].id,
      tenRule: 'Tính tiền sản lượng giao hàng',
      moTa: 'TONG_KHOI_LUONG_THANH_CONG * DON_GIA_KHOI_LUONG',
      loaiRule: 'CONG_THUC',
      congThucJson: '{"bieuThuc": "TONG_KHOI_LUONG_THANH_CONG * DON_GIA_KHOI_LUONG"}',
      thuTuUuTien: 1,
      trangThai: true,
    },
  });
  log('7. QUY_CHE', 'Created 2 salary rule sets');

  // ============================================
  // 8. SAN LUONG (Production Data) - Jan 2026
  // ============================================
  log('8. SAN_LUONG', 'Seeding production data for January 2026...');

  const chiaHangNVs = await prisma.nhanVien.findMany({
    where: { phongBan: { maPhongBan: 'CH' }, trangThai: 'DANG_LAM' },
  });
  const giaoHangNVs = await prisma.nhanVien.findMany({
    where: { phongBan: { maPhongBan: 'GH' }, trangThai: 'DANG_LAM' },
  });

  // Generate working days in January 2026
  const workDays: Date[] = [];
  for (let d = 1; d <= 20; d++) {
    const date = new Date(2026, 0, d);
    if (date.getDay() !== 0) workDays.push(date);
  }

  // Seed Chia hang
  const sanLuongChData: Prisma.SanLuongChiaHangCreateManyInput[] = [];
  for (const nv of chiaHangNVs) {
    for (const day of workDays) {
      sanLuongChData.push({
        ngay: day,
        nhanVienId: nv.id,
        soLuongSpDat: Math.floor(Math.random() * 250) + 150,
        soLuongSpLoi: Math.floor(Math.random() * 15) + 2,
        ghiChu: 'Seed data T1/2026',
        nguonDuLieu: 'NHAP_TAY',
        khoaSua: false,
      });
    }
  }
  await prisma.sanLuongChiaHang.createMany({ data: sanLuongChData });

  // Seed Giao hang
  const giaoHangData: Prisma.GiaoHangCreateManyInput[] = [];
  for (const nv of giaoHangNVs) {
    for (const day of workDays) {
      giaoHangData.push({
        ngay: day,
        nhanVienId: nv.id,
        khoiLuongThanhCong: new Prisma.Decimal(Math.floor(Math.random() * 150) + 50 + Math.random()),
        soLanTreGio: Math.random() > 0.8 ? Math.floor(Math.random() * 3) : 0,
        soLanKhongLayPhieu: Math.random() > 0.9 ? 1 : 0,
        ghiChu: 'Seed data T1/2026',
        nguonDuLieu: 'NHAP_TAY',
        khoaSua: false,
      });
    }
  }
  await prisma.giaoHang.createMany({ data: giaoHangData });

  log('8. SAN_LUONG', `Created ${sanLuongChData.length} Chia hang + ${giaoHangData.length} Giao hang records`);

  // ============================================
  // DONE
  // ============================================
  console.log('\n✅ MASTER SEED COMPLETED SUCCESSFULLY!');
  console.log(`   - ${phongBans.length} departments`);
  console.log(`   - ${klResults.length} salary components`);
  console.log(`   - ${nhanVienData.length} employees`);
  console.log(`   - 2 salary rule sets (Chia hàng, Giao hàng)`);
  console.log(`   - Production data for Jan 2026`);
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
