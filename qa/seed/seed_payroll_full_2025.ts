/**
 * SEED DATA PAYROLL FULL 2025 (06 → 12/2025)
 * 
 * Tạo dữ liệu đầy đủ cho toàn bộ flow payroll demo/test
 * - Giữ nguyên Phòng ban + Nhân viên hiện có
 * - Seed 7 kỳ lương: 06/2025 → 12/2025
 * - Idempotent: chạy nhiều lần không tạo trùng
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// ============== CONSTANTS ==============
const MONTHS_2025 = [6, 7, 8, 9, 10, 11, 12]; // 06→12/2025
const YEAR = 2025;

// Trạng thái bảng lương theo kỳ
const PAYROLL_STATUS: Record<number, string> = {
  6: 'KHOA',     // Đã khóa (lịch sử)
  7: 'KHOA',
  8: 'KHOA',
  9: 'KHOA',
  10: 'KHOA',
  11: 'DA_CHOT', // Đã chốt
  12: 'NHAP',    // Đang làm
};

// Phân loại phòng ban
const CHIA_HANG_KEYWORDS = ['CHIA', 'CH'];
const GIAO_HANG_KEYWORDS = ['GIAO', 'SHIP', 'GIAO_HANG'];

// Seed report stats
const stats = {
  nhanVienTotal: 0,
  nhanVienDangLam: 0,
  nhanVienSkipped: 0,
  hopDongCreated: 0,
  hopDongSkipped: 0,
  phuCapCreated: 0,
  phuCapSkipped: 0,
  chamCongCreated: 0,
  chamCongSkipped: 0,
  bangLuongCreated: 0,
  bangLuongSkipped: 0,
  chiTietLuongCreated: 0,
  sanLuongChiaHangCreated: 0,
  giaoHangCreated: 0,
  phieuDieuChinhCreated: 0,
  snapshotCreated: 0,
  errors: [] as string[],
};

// ============== HELPER FUNCTIONS ==============

function isChiaHangDept(maPhongBan: string, tenPhongBan: string): boolean {
  const ma = maPhongBan.toUpperCase();
  const ten = tenPhongBan.toUpperCase();
  return CHIA_HANG_KEYWORDS.some(k => ma === k || ten.includes(k));
}

function isGiaoHangDept(maPhongBan: string, tenPhongBan: string): boolean {
  const ma = maPhongBan.toUpperCase();
  const ten = tenPhongBan.toUpperCase();
  return GIAO_HANG_KEYWORDS.some(k => ma === k || ten.includes(k));
}

function getWorkingDaysInMonth(year: number, month: number): Date[] {
  const days: Date[] = [];
  const daysInMonth = new Date(year, month, 0).getDate();
  
  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(year, month - 1, d);
    const dow = date.getDay();
    // Skip Sundays (0)
    if (dow !== 0) {
      days.push(date);
    }
  }
  return days;
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomFloat(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

function randomElement<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

// ============== SEED FUNCTIONS ==============

async function seedThongTinCongTy() {
  console.log('📋 Checking ThongTinCongTy...');
  
  const existing = await prisma.thongTinCongTy.findFirst();
  if (existing) {
    console.log('  ✓ ThongTinCongTy already exists');
    return;
  }

  await prisma.thongTinCongTy.create({
    data: {
      tenCongTy: 'Công ty TNHH Demo Payroll',
      maSoThue: '0123456789',
      diaChi: '123 Nguyễn Văn Linh, Quận 7, TP.HCM',
      soDienThoai: '028-1234-5678',
      email: 'hr@demopayroll.vn',
      nguoiDaiDien: 'Nguyễn Văn Admin',
      chucVuNguoiDaiDien: 'Giám đốc',
      ngayThanhLap: new Date('2020-01-01'),
      luongToiThieuVung: 4960000,
    },
  });
  console.log('  ✓ Created ThongTinCongTy');
}

async function seedHopDong(nhanViens: any[]) {
  console.log('📋 Seeding HopDong...');
  
  for (const nv of nhanViens) {
    // Check existing active contract
    const existing = await prisma.nhanVienHopDong.findFirst({
      where: {
        nhanVienId: nv.id,
        trangThai: 'HIEU_LUC',
      },
    });

    if (existing) {
      stats.hopDongSkipped++;
      continue;
    }

    // Create new contract
    const luongCoBan = randomInt(8, 25) * 1000000; // 8M - 25M
    const tuNgay = new Date('2024-01-01');
    
    await prisma.nhanVienHopDong.create({
      data: {
        nhanVienId: nv.id,
        loaiHopDong: randomElement(['VO_THOI_HAN', 'CO_THOI_HAN', 'THU_VIEC']),
        tuNgay,
        luongCoBan,
        luongDongBH: Math.min(luongCoBan, 20000000), // Max BH 20M
        heSoLuong: 1.0,
        trangThai: 'HIEU_LUC',
        ghiChu: 'Seed data 2025',
      },
    });
    stats.hopDongCreated++;
  }
  
  console.log(`  ✓ Created ${stats.hopDongCreated} hop dong, skipped ${stats.hopDongSkipped}`);
}

async function seedPhuCap(nhanViens: any[], khoanLuongs: any[]) {
  console.log('📋 Seeding PhuCap...');
  
  // Filter only phu cap type khoan luong
  const phuCapKhoans = khoanLuongs.filter(k => 
    k.maKhoan.includes('PHU_CAP') || k.maKhoan.includes('HO_TRO')
  );
  
  if (phuCapKhoans.length === 0) {
    console.log('  ⚠ No phu cap khoan luong found');
    return;
  }

  for (const nv of nhanViens) {
    // Each NV gets 1-3 random phu cap
    const numPhuCap = randomInt(1, 3);
    const selectedKhoans = [...phuCapKhoans].sort(() => Math.random() - 0.5).slice(0, numPhuCap);
    
    for (const khoan of selectedKhoans) {
      // Check existing
      const existing = await prisma.phuCapNhanVien.findFirst({
        where: {
          nhanVienId: nv.id,
          khoanLuongId: khoan.id,
          trangThai: 'HOAT_DONG',
        },
      });
      
      if (existing) {
        stats.phuCapSkipped++;
        continue;
      }

      // Random amount based on khoan type
      let soTien = 0;
      if (khoan.maKhoan.includes('XANG_XE')) soTien = randomInt(3, 8) * 100000;
      else if (khoan.maKhoan.includes('DIEN_THOAI')) soTien = randomInt(2, 5) * 100000;
      else if (khoan.maKhoan.includes('CHUYEN_CAN')) soTien = randomInt(5, 10) * 100000;
      else if (khoan.maKhoan.includes('AN_CA')) soTien = randomInt(500, 1000) * 1000;
      else soTien = randomInt(3, 10) * 100000;

      await prisma.phuCapNhanVien.create({
        data: {
          nhanVienId: nv.id,
          khoanLuongId: khoan.id,
          soTien,
          tuNgay: new Date('2025-01-01'),
          trangThai: 'HOAT_DONG',
          ghiChu: 'Seed data 2025',
        },
      });
      stats.phuCapCreated++;
    }
  }
  
  console.log(`  ✓ Created ${stats.phuCapCreated} phu cap, skipped ${stats.phuCapSkipped}`);
}

async function seedChamCong(nhanViens: any[], month: number, year: number) {
  console.log(`📋 Seeding ChamCong for ${month}/${year}...`);
  
  const workingDays = getWorkingDaysInMonth(year, month);
  let created = 0;
  let skipped = 0;
  
  for (const nv of nhanViens) {
    // Randomize attendance pattern
    const pattern = Math.random();
    let daysOff = 0;
    let lateCount = 0;
    
    if (pattern < 0.7) {
      // 70% full attendance
      daysOff = 0;
      lateCount = randomInt(0, 2);
    } else if (pattern < 0.9) {
      // 20% missing 1-2 days
      daysOff = randomInt(1, 2);
      lateCount = randomInt(1, 3);
    } else {
      // 10% missing more days
      daysOff = randomInt(3, 5);
      lateCount = randomInt(2, 5);
    }

    const offDaysSet = new Set<number>();
    while (offDaysSet.size < daysOff && offDaysSet.size < workingDays.length) {
      offDaysSet.add(randomInt(0, workingDays.length - 1));
    }

    const lateDaysSet = new Set<number>();
    while (lateDaysSet.size < lateCount && lateDaysSet.size < workingDays.length) {
      const idx = randomInt(0, workingDays.length - 1);
      if (!offDaysSet.has(idx)) {
        lateDaysSet.add(idx);
      }
    }

    for (let i = 0; i < workingDays.length; i++) {
      const ngay = workingDays[i];
      
      // Check existing
      const existing = await prisma.chamCong.findFirst({
        where: {
          nhanVienId: nv.id,
          ngay: {
            gte: new Date(ngay.getFullYear(), ngay.getMonth(), ngay.getDate()),
            lt: new Date(ngay.getFullYear(), ngay.getMonth(), ngay.getDate() + 1),
          },
        },
      });
      
      if (existing) {
        skipped++;
        continue;
      }

      if (offDaysSet.has(i)) {
        // Day off
        await prisma.chamCong.create({
          data: {
            nhanVienId: nv.id,
            ngay,
            trangThai: randomElement(['NGHI_PHEP', 'NGHI_KHONG_PHEP']),
            ghiChu: 'Seed data',
          },
        });
      } else {
        // Working day
        const isLate = lateDaysSet.has(i);
        const gioVao = isLate 
          ? new Date(ngay.getFullYear(), ngay.getMonth(), ngay.getDate(), 8, randomInt(15, 45))
          : new Date(ngay.getFullYear(), ngay.getMonth(), ngay.getDate(), 7, randomInt(45, 59));
        
        const gioRa = new Date(ngay.getFullYear(), ngay.getMonth(), ngay.getDate(), 17, randomInt(0, 30));
        
        await prisma.chamCong.create({
          data: {
            nhanVienId: nv.id,
            ngay,
            gioVao,
            gioRa,
            trangThai: 'DI_LAM',
            diMuon: isLate,
            phutDiMuon: isLate ? randomInt(15, 45) : 0,
            ghiChu: 'Seed data',
          },
        });
      }
      created++;
    }
  }
  
  stats.chamCongCreated += created;
  stats.chamCongSkipped += skipped;
  console.log(`  ✓ Created ${created} cham cong records, skipped ${skipped}`);
}

async function seedSanLuongChiaHang(nhanViens: any[], month: number, year: number) {
  console.log(`📋 Seeding SanLuongChiaHang for ${month}/${year}...`);
  
  const workingDays = getWorkingDaysInMonth(year, month);
  let created = 0;
  
  for (const nv of nhanViens) {
    for (const ngay of workingDays) {
      // Check existing
      const existing = await prisma.sanLuongChiaHang.findFirst({
        where: {
          nhanVienId: nv.id,
          ngay: {
            gte: new Date(ngay.getFullYear(), ngay.getMonth(), ngay.getDate()),
            lt: new Date(ngay.getFullYear(), ngay.getMonth(), ngay.getDate() + 1),
          },
        },
      });
      
      if (existing) continue;

      // Random production
      const soLuong = randomInt(150, 400);
      const soLuongLoi = randomInt(0, Math.min(20, soLuong * 0.1));

      await prisma.sanLuongChiaHang.create({
        data: {
          nhanVienId: nv.id,
          ngay,
          soLuong,
          soLuongLoi,
          donGia: 320,
          ghiChu: 'Seed data',
        },
      });
      created++;
    }
  }
  
  stats.sanLuongChiaHangCreated += created;
  console.log(`  ✓ Created ${created} san luong chia hang records`);
}

async function seedGiaoHang(nhanViens: any[], month: number, year: number) {
  console.log(`📋 Seeding GiaoHang for ${month}/${year}...`);
  
  const workingDays = getWorkingDaysInMonth(year, month);
  let created = 0;
  
  for (const nv of nhanViens) {
    for (const ngay of workingDays) {
      // Check existing
      const existing = await prisma.giaoHang.findFirst({
        where: {
          nhanVienId: nv.id,
          ngay: {
            gte: new Date(ngay.getFullYear(), ngay.getMonth(), ngay.getDate()),
            lt: new Date(ngay.getFullYear(), ngay.getMonth(), ngay.getDate() + 1),
          },
        },
      });
      
      if (existing) continue;

      // Random delivery data
      const soKg = randomFloat(100, 500);
      const soDon = randomInt(20, 80);
      const soKhoi = randomFloat(1, 10);

      await prisma.giaoHang.create({
        data: {
          nhanVienId: nv.id,
          ngay,
          soKg,
          soDon,
          soKhoi,
          phatTreGio: Math.random() < 0.15 ? randomInt(1, 3) * 50000 : 0,
          phatKhongLayPhieu: Math.random() < 0.1 ? randomInt(1, 2) * 30000 : 0,
          ghiChu: 'Seed data',
        },
      });
      created++;
    }
  }
  
  stats.giaoHangCreated += created;
  console.log(`  ✓ Created ${created} giao hang records`);
}

async function seedBangLuong(phongBans: any[], month: number, year: number) {
  console.log(`📋 Seeding BangLuong for ${month}/${year}...`);
  
  const trangThai = PAYROLL_STATUS[month] || 'NHAP';
  let created = 0;
  
  for (const pb of phongBans) {
    // Check existing
    const existing = await prisma.bangLuong.findFirst({
      where: {
        thang: month,
        nam: year,
        phongBanId: pb.id,
      },
    });
    
    if (existing) {
      stats.bangLuongSkipped++;
      continue;
    }

    const bangLuong = await prisma.bangLuong.create({
      data: {
        thang: month,
        nam: year,
        phongBanId: pb.id,
        tenBangLuong: `Bảng lương ${pb.tenPhongBan} - Tháng ${month}/${year}`,
        trangThai,
        ngayChot: trangThai !== 'NHAP' ? new Date() : null,
        nguoiChot: trangThai !== 'NHAP' ? 'admin' : null,
        ghiChu: 'Seed data 2025',
      },
    });
    
    stats.bangLuongCreated++;
    created++;

    // Seed chi tiet bang luong for NV in this department
    await seedChiTietBangLuong(bangLuong.id, pb.id, month, year);
    
    // Create snapshot if locked
    if (trangThai === 'KHOA' || trangThai === 'DA_CHOT') {
      await seedSnapshot(bangLuong.id, pb.id, month, year);
    }
  }
  
  console.log(`  ✓ Created ${created} bang luong, skipped ${stats.bangLuongSkipped}`);
}

async function seedChiTietBangLuong(bangLuongId: number, phongBanId: number, month: number, year: number) {
  // Get NV in this department
  const nhanViens = await prisma.nhanVien.findMany({
    where: {
      phongBanId,
      trangThai: 'DANG_LAM',
    },
    include: {
      phongBan: true,
      hopDongs: {
        where: { trangThai: 'HIEU_LUC' },
        take: 1,
      },
    },
  });

  for (const nv of nhanViens) {
    // Check existing
    const existing = await prisma.chiTietBangLuong.findFirst({
      where: {
        bangLuongId,
        nhanVienId: nv.id,
      },
    });
    
    if (existing) continue;

    const hopDong = nv.hopDongs[0];
    const luongCoBan = hopDong?.luongCoBan || 10000000;
    
    // Calculate working days in month
    const workingDays = getWorkingDaysInMonth(year, month).length;
    
    // Random actual working days
    const ngayCongThuc = workingDays - randomInt(0, 3);
    
    // Phu cap
    const phuCaps = await prisma.phuCapNhanVien.findMany({
      where: {
        nhanVienId: nv.id,
        trangThai: 'HOAT_DONG',
        tuNgay: { lte: new Date(year, month - 1, 28) },
      },
    });
    const tongPhuCap = phuCaps.reduce((sum, pc) => sum + (pc.soTien || 0), 0);
    
    // Calculate amounts
    const luongTheoNgay = (luongCoBan / workingDays) * ngayCongThuc;
    const tongThuNhap = luongTheoNgay + tongPhuCap;
    
    // Deductions
    const bhxh = luongCoBan * 0.08;
    const bhyt = luongCoBan * 0.015;
    const bhtn = luongCoBan * 0.01;
    const thueTncn = Math.max(0, (tongThuNhap - 11000000 - bhxh - bhyt - bhtn) * 0.05);
    const tongKhauTru = bhxh + bhyt + bhtn + thueTncn;
    
    const thucLanh = tongThuNhap - tongKhauTru;

    await prisma.chiTietBangLuong.create({
      data: {
        bangLuongId,
        nhanVienId: nv.id,
        maNhanVien: nv.maNhanVien,
        hoTen: nv.hoTen,
        tenPhongBan: nv.phongBan?.tenPhongBan || '',
        luongCoBan,
        ngayCongChuan: workingDays,
        ngayCongThuc,
        tongPhuCap,
        tongThuNhap,
        tongKhauTru,
        thucLanh,
        ghiChu: 'Seed data',
      },
    });
    stats.chiTietLuongCreated++;
  }
}

async function seedSnapshot(bangLuongId: number, phongBanId: number, month: number, year: number) {
  // Check existing
  const existing = await prisma.snapshotBangLuong.findFirst({
    where: { bangLuongId },
  });
  
  if (existing) return;

  // Create snapshot
  await prisma.snapshotBangLuong.create({
    data: {
      bangLuongId,
      thang: month,
      nam: year,
      ngaySnapshot: new Date(),
      nguoiSnapshot: 'admin',
      duLieu: {}, // Will be populated by actual snapshot logic
      ghiChu: 'Seed snapshot',
    },
  });
  stats.snapshotCreated++;
}

async function seedPhieuDieuChinh(nhanViens: any[], phongBans: any[], month: number, year: number) {
  console.log(`📋 Seeding PhieuDieuChinh for ${month}/${year}...`);
  
  // Get bang luong for this month
  const bangLuongs = await prisma.bangLuong.findMany({
    where: { thang: month, nam: year },
  });
  
  if (bangLuongs.length === 0) return;

  // Create 2-4 adjustment vouchers per month
  const numVouchers = randomInt(2, 4);
  let created = 0;
  
  for (let i = 0; i < numVouchers; i++) {
    const bangLuong = randomElement(bangLuongs);
    const loai = randomElement(['THUONG', 'PHAT', 'DIEU_CHINH']);
    const maPDC = `PDC${year}${String(month).padStart(2, '0')}${String(i + 1).padStart(3, '0')}`;
    
    // Check existing
    const existing = await prisma.phieuDieuChinh.findFirst({
      where: { maPhieu: maPDC },
    });
    
    if (existing) continue;

    // Random NV from the department
    const nvInDept = nhanViens.filter(nv => nv.phongBanId === bangLuong.phongBanId);
    if (nvInDept.length === 0) continue;
    
    const selectedNV = randomElement(nvInDept);
    
    const lyDo = loai === 'THUONG' 
      ? randomElement(['Thưởng nóng', 'Thưởng hoàn thành KPI', 'Thưởng đột xuất'])
      : loai === 'PHAT'
      ? randomElement(['Phạt vi phạm quy chế', 'Phạt đi muộn quá 5 lần', 'Phạt không hoàn thành KPI'])
      : 'Điều chỉnh sai sót tính lương';
    
    const soTien = loai === 'THUONG' 
      ? randomInt(5, 20) * 100000
      : loai === 'PHAT'
      ? -randomInt(2, 10) * 100000
      : randomInt(-10, 10) * 100000;

    const phieu = await prisma.phieuDieuChinh.create({
      data: {
        maPhieu: maPDC,
        bangLuongId: bangLuong.id,
        loaiPhieu: loai,
        lyDo,
        tongSoTien: Math.abs(soTien),
        trangThai: PAYROLL_STATUS[month] === 'KHOA' ? 'DA_DUYET' : 'CHO_DUYET',
        nguoiTao: 'admin',
        ghiChu: 'Seed data',
      },
    });

    // Create chi tiet
    await prisma.chiTietPhieuDieuChinh.create({
      data: {
        phieuDieuChinhId: phieu.id,
        nhanVienId: selectedNV.id,
        soTien: Math.abs(soTien),
        ghiChu: lyDo,
      },
    });

    created++;
  }
  
  stats.phieuDieuChinhCreated += created;
  console.log(`  ✓ Created ${created} phieu dieu chinh`);
}

async function seedKyDanhGiaKPI(month: number, year: number) {
  console.log(`📋 Seeding KyDanhGiaKPI for ${month}/${year}...`);
  
  const maKy = `KPI${year}${String(month).padStart(2, '0')}`;
  
  // Check existing
  const existing = await prisma.kyDanhGiaKPI.findFirst({
    where: { maKy },
  });
  
  if (existing) {
    console.log(`  ✓ KyDanhGiaKPI ${maKy} already exists`);
    return existing;
  }

  const tuNgay = new Date(year, month - 1, 1);
  const denNgay = new Date(year, month, 0);

  const kyDanhGia = await prisma.kyDanhGiaKPI.create({
    data: {
      maKy,
      tenKy: `Đánh giá KPI Tháng ${month}/${year}`,
      loaiKy: 'THANG',
      tuNgay,
      denNgay,
      trangThai: month < 12 ? 'DA_KET_THUC' : 'DANG_DIEN_RA',
      moTa: 'Seed data',
    },
  });
  
  console.log(`  ✓ Created KyDanhGiaKPI ${maKy}`);
  return kyDanhGia;
}

async function seedDanhGiaKPI(nhanViens: any[], month: number, year: number) {
  console.log(`📋 Seeding DanhGiaKPI for ${month}/${year}...`);
  
  // Get or create ky danh gia
  const kyDanhGia = await seedKyDanhGiaKPI(month, year);
  if (!kyDanhGia) return;

  let created = 0;
  
  for (const nv of nhanViens) {
    // Check existing
    const existing = await prisma.danhGiaKPINhanVien.findFirst({
      where: {
        kyDanhGiaId: kyDanhGia.id,
        nhanVienId: nv.id,
      },
    });
    
    if (existing) continue;

    // Random KPI score distribution
    const rand = Math.random();
    let diemTong = 0;
    
    if (rand < 0.05) {
      // 5% missing/low KPI
      diemTong = randomInt(0, 69);
    } else if (rand < 0.25) {
      // 20% score 70-79
      diemTong = randomInt(70, 79);
    } else if (rand < 0.75) {
      // 50% score 80-89
      diemTong = randomInt(80, 89);
    } else {
      // 25% score 90-100
      diemTong = randomInt(90, 100);
    }

    await prisma.danhGiaKPINhanVien.create({
      data: {
        kyDanhGiaId: kyDanhGia.id,
        nhanVienId: nv.id,
        diemTong,
        xepLoai: diemTong >= 90 ? 'A' : diemTong >= 80 ? 'B' : diemTong >= 70 ? 'C' : 'D',
        trangThai: 'DA_DUYET',
        ghiChu: 'Seed data',
      },
    });
    created++;
  }
  
  console.log(`  ✓ Created ${created} danh gia KPI records`);
}

// ============== MAIN SEED FUNCTION ==============

async function main() {
  console.log('🚀 Starting SEED PAYROLL FULL 2025 (06→12/2025)...\n');
  
  try {
    // 1. Seed thong tin cong ty
    await seedThongTinCongTy();
    
    // 2. Load existing data
    console.log('\n📊 Loading existing data...');
    const phongBans = await prisma.phongBan.findMany();
    const nhanViens = await prisma.nhanVien.findMany({
      where: { trangThai: 'DANG_LAM' },
      include: { phongBan: true },
    });
    const khoanLuongs = await prisma.khoanLuong.findMany();
    
    stats.nhanVienTotal = nhanViens.length + (await prisma.nhanVien.count({ where: { trangThai: { not: 'DANG_LAM' } } }));
    stats.nhanVienDangLam = nhanViens.length;
    
    console.log(`  - Phong ban: ${phongBans.length}`);
    console.log(`  - Nhan vien (DANG_LAM): ${nhanViens.length}`);
    console.log(`  - Khoan luong: ${khoanLuongs.length}`);
    
    // Classify NV by department type
    const nvChiaHang = nhanViens.filter(nv => 
      nv.phongBan && isChiaHangDept(nv.phongBan.maPhongBan, nv.phongBan.tenPhongBan)
    );
    const nvGiaoHang = nhanViens.filter(nv => 
      nv.phongBan && isGiaoHangDept(nv.phongBan.maPhongBan, nv.phongBan.tenPhongBan)
    );
    const nvVanPhong = nhanViens.filter(nv => 
      nv.phongBan && 
      !isChiaHangDept(nv.phongBan.maPhongBan, nv.phongBan.tenPhongBan) &&
      !isGiaoHangDept(nv.phongBan.maPhongBan, nv.phongBan.tenPhongBan)
    );
    
    console.log(`  - NV Chia hàng: ${nvChiaHang.length}`);
    console.log(`  - NV Giao hàng: ${nvGiaoHang.length}`);
    console.log(`  - NV Văn phòng/Khác: ${nvVanPhong.length}`);
    
    // 3. Seed hop dong + phu cap
    console.log('\n📋 Seeding base data...');
    await seedHopDong(nhanViens);
    await seedPhuCap(nhanViens, khoanLuongs);
    
    // 4. Seed data for each month
    for (const month of MONTHS_2025) {
      console.log(`\n📅 ===== Processing ${month}/${YEAR} =====`);
      
      // Cham cong for all NV
      await seedChamCong(nhanViens, month, YEAR);
      
      // San luong for chia hang NV
      if (nvChiaHang.length > 0) {
        await seedSanLuongChiaHang(nvChiaHang, month, YEAR);
      }
      
      // Giao hang for giao hang NV
      if (nvGiaoHang.length > 0) {
        await seedGiaoHang(nvGiaoHang, month, YEAR);
      }
      
      // KPI for all NV
      await seedDanhGiaKPI(nhanViens, month, YEAR);
      
      // Bang luong
      await seedBangLuong(phongBans, month, YEAR);
      
      // Phieu dieu chinh
      await seedPhieuDieuChinh(nhanViens, phongBans, month, YEAR);
    }
    
    // 5. Generate report
    await generateReport();
    
    console.log('\n✅ SEED COMPLETED SUCCESSFULLY!');
    
  } catch (error) {
    console.error('❌ SEED ERROR:', error);
    stats.errors.push(String(error));
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

async function generateReport() {
  console.log('\n📊 Generating seed report...');
  
  // Count final data
  const finalCounts = {
    bangLuong: await prisma.bangLuong.count({ where: { nam: YEAR, thang: { in: MONTHS_2025 } } }),
    chiTietBangLuong: await prisma.chiTietBangLuong.count(),
    chamCong: await prisma.chamCong.count(),
    hopDong: await prisma.nhanVienHopDong.count({ where: { trangThai: 'HIEU_LUC' } }),
    phuCap: await prisma.phuCapNhanVien.count({ where: { trangThai: 'HOAT_DONG' } }),
    sanLuongChiaHang: await prisma.sanLuongChiaHang.count(),
    giaoHang: await prisma.giaoHang.count(),
    phieuDieuChinh: await prisma.phieuDieuChinh.count(),
    snapshot: await prisma.snapshotBangLuong.count(),
    danhGiaKPI: await prisma.danhGiaKPINhanVien.count(),
    kyDanhGiaKPI: await prisma.kyDanhGiaKPI.count(),
  };

  const report = `# SEED REPORT 2025 (06→12/2025)
Generated: ${new Date().toISOString()}

## Summary
- **Nhân viên total**: ${stats.nhanVienTotal}
- **Nhân viên đang làm (seeded)**: ${stats.nhanVienDangLam}
- **Nhân viên skipped**: ${stats.nhanVienSkipped}
- **Kỳ lương seeded**: 7 (06/2025 → 12/2025)

## Created Records
| Module | Created | Skipped |
|--------|---------|---------|
| Hợp đồng | ${stats.hopDongCreated} | ${stats.hopDongSkipped} |
| Phụ cấp | ${stats.phuCapCreated} | ${stats.phuCapSkipped} |
| Chấm công | ${stats.chamCongCreated} | ${stats.chamCongSkipped} |
| Bảng lương | ${stats.bangLuongCreated} | ${stats.bangLuongSkipped} |
| Chi tiết lương | ${stats.chiTietLuongCreated} | - |
| Sản lượng chia hàng | ${stats.sanLuongChiaHangCreated} | - |
| Giao hàng | ${stats.giaoHangCreated} | - |
| Phiếu điều chỉnh | ${stats.phieuDieuChinhCreated} | - |
| Snapshot | ${stats.snapshotCreated} | - |

## Final Database Counts
| Table | Count |
|-------|-------|
| bang_luong (2025) | ${finalCounts.bangLuong} |
| chi_tiet_bang_luong | ${finalCounts.chiTietBangLuong} |
| cham_cong | ${finalCounts.chamCong} |
| nhan_vien_hop_dong (active) | ${finalCounts.hopDong} |
| phu_cap_nhan_vien (active) | ${finalCounts.phuCap} |
| san_luong_chia_hang | ${finalCounts.sanLuongChiaHang} |
| giao_hang | ${finalCounts.giaoHang} |
| phieu_dieu_chinh | ${finalCounts.phieuDieuChinh} |
| snapshot_bang_luong | ${finalCounts.snapshot} |
| danh_gia_kpi_nhan_vien | ${finalCounts.danhGiaKPI} |
| ky_danh_gia_kpi | ${finalCounts.kyDanhGiaKPI} |

## Payroll Status by Month
| Month | Status |
|-------|--------|
| 06/2025 | KHOA |
| 07/2025 | KHOA |
| 08/2025 | KHOA |
| 09/2025 | KHOA |
| 10/2025 | KHOA |
| 11/2025 | DA_CHOT |
| 12/2025 | NHAP |

## Errors
${stats.errors.length === 0 ? 'No errors' : stats.errors.map(e => `- ${e}`).join('\n')}

## Verification
- [${finalCounts.bangLuong >= 7 ? 'x' : ' '}] Có đủ 7 kỳ lương (06→12)
- [${stats.chamCongCreated > 0 ? 'x' : ' '}] Có chi tiết chấm công
- [${finalCounts.danhGiaKPI > 0 ? 'x' : ' '}] Có KPI
- [${finalCounts.sanLuongChiaHang > 0 ? 'x' : ' '}] Có sản lượng chia hàng
- [${finalCounts.giaoHang > 0 ? 'x' : ' '}] Có dữ liệu giao hàng
- [${finalCounts.phieuDieuChinh >= 10 ? 'x' : ' '}] Có ít nhất 10 phiếu điều chỉnh
`;

  // Write report to file
  const fs = await import('fs');
  const path = await import('path');
  const reportPath = path.join(__dirname, 'seed_report_2025.md');
  fs.writeFileSync(reportPath, report);
  
  console.log(`  ✓ Report saved to ${reportPath}`);
  console.log(report);
}

// Run
main();
