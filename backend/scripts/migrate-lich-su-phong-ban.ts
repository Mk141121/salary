/**
 * Script Migration: Tạo lịch sử phòng ban cho tất cả nhân viên
 * 
 * Mục tiêu:
 * - Tất cả nhân viên phải có ít nhất 1 record trong bảng nhan_vien_phong_ban
 * - Dựa trên phong_ban_id hiện tại và ngay_vao_lam
 * 
 * Sử dụng:
 * - Dry-run: npx ts-node scripts/migrate-lich-su-phong-ban.ts --dry-run
 * - Apply:   npx ts-node scripts/migrate-lich-su-phong-ban.ts --apply
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface MigrationReport {
  tongNhanVien: number;
  daCoLichSu: number;
  canTao: number;
  taoThanhCong: number;
  taoLoi: number;
  chiTietLoi: { nhanVienId: number; maNhanVien: string; loi: string }[];
  chiTietTao: { nhanVienId: number; maNhanVien: string; phongBanId: number; tuNgay: Date }[];
}

async function migrateLichSuPhongBan(dryRun: boolean): Promise<MigrationReport> {
  console.log('='.repeat(60));
  console.log(`🚀 BẮT ĐẦU MIGRATION LỊCH SỬ PHÒNG BAN`);
  console.log(`📋 Chế độ: ${dryRun ? 'DRY-RUN (không thay đổi dữ liệu)' : 'APPLY (thực thi thay đổi)'}`);
  console.log('='.repeat(60));

  const report: MigrationReport = {
    tongNhanVien: 0,
    daCoLichSu: 0,
    canTao: 0,
    taoThanhCong: 0,
    taoLoi: 0,
    chiTietLoi: [],
    chiTietTao: [],
  };

  try {
    // Lấy tất cả nhân viên
    const nhanViens = await prisma.nhanVien.findMany({
      select: {
        id: true,
        maNhanVien: true,
        hoTen: true,
        phongBanId: true,
        ngayVaoLam: true,
        trangThai: true,
      },
      orderBy: { id: 'asc' },
    });

    report.tongNhanVien = nhanViens.length;
    console.log(`\n📊 Tổng số nhân viên: ${report.tongNhanVien}`);

    // Lấy danh sách nhân viên đã có lịch sử
    const daCoLichSu = await prisma.nhanVienPhongBan.findMany({
      select: { nhanVienId: true },
      distinct: ['nhanVienId'],
    });
    const setDaCoLichSu = new Set(daCoLichSu.map(x => x.nhanVienId));
    report.daCoLichSu = setDaCoLichSu.size;
    console.log(`✅ Đã có lịch sử: ${report.daCoLichSu}`);

    // Lọc nhân viên chưa có lịch sử
    const canTao = nhanViens.filter(nv => !setDaCoLichSu.has(nv.id));
    report.canTao = canTao.length;
    console.log(`⚠️  Cần tạo lịch sử: ${report.canTao}`);

    if (report.canTao === 0) {
      console.log('\n✅ Không có nhân viên nào cần migration!');
      return report;
    }

    console.log('\n📝 Danh sách nhân viên cần tạo lịch sử:');
    console.log('-'.repeat(60));

    for (const nv of canTao) {
      const tuNgay = nv.ngayVaoLam || new Date('2020-01-01'); // Fallback date

      console.log(`  - [${nv.maNhanVien}] ${nv.hoTen} → Phòng ban ID: ${nv.phongBanId}, Từ ngày: ${tuNgay.toISOString().split('T')[0]}`);

      if (!dryRun) {
        try {
          await prisma.nhanVienPhongBan.create({
            data: {
              nhanVienId: nv.id,
              phongBanId: nv.phongBanId,
              tuNgay: tuNgay,
              ghiChu: 'Migration tự động từ dữ liệu cũ',
            },
          });
          report.taoThanhCong++;
          report.chiTietTao.push({
            nhanVienId: nv.id,
            maNhanVien: nv.maNhanVien,
            phongBanId: nv.phongBanId,
            tuNgay: tuNgay,
          });
        } catch (error: any) {
          report.taoLoi++;
          report.chiTietLoi.push({
            nhanVienId: nv.id,
            maNhanVien: nv.maNhanVien,
            loi: error.message,
          });
          console.error(`    ❌ Lỗi: ${error.message}`);
        }
      } else {
        report.chiTietTao.push({
          nhanVienId: nv.id,
          maNhanVien: nv.maNhanVien,
          phongBanId: nv.phongBanId,
          tuNgay: tuNgay,
        });
      }
    }

    return report;
  } catch (error) {
    console.error('❌ Lỗi nghiêm trọng:', error);
    throw error;
  }
}

function printReport(report: MigrationReport) {
  console.log('\n' + '='.repeat(60));
  console.log('📊 BÁO CÁO MIGRATION');
  console.log('='.repeat(60));
  console.log(`Tổng nhân viên:        ${report.tongNhanVien}`);
  console.log(`Đã có lịch sử:         ${report.daCoLichSu}`);
  console.log(`Cần tạo mới:           ${report.canTao}`);
  console.log(`Tạo thành công:        ${report.taoThanhCong}`);
  console.log(`Tạo lỗi:               ${report.taoLoi}`);
  
  if (report.chiTietLoi.length > 0) {
    console.log('\n❌ Chi tiết lỗi:');
    report.chiTietLoi.forEach(e => {
      console.log(`  - [${e.maNhanVien}] ID ${e.nhanVienId}: ${e.loi}`);
    });
  }

  console.log('='.repeat(60));
}

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');
  const apply = args.includes('--apply');

  if (!dryRun && !apply) {
    console.log('❌ Vui lòng chỉ định chế độ chạy:');
    console.log('   --dry-run  : Chỉ kiểm tra, không thay đổi dữ liệu');
    console.log('   --apply    : Thực thi migration');
    process.exit(1);
  }

  if (dryRun && apply) {
    console.log('❌ Không thể sử dụng đồng thời --dry-run và --apply');
    process.exit(1);
  }

  try {
    const report = await migrateLichSuPhongBan(dryRun);
    printReport(report);

    // Export report to JSON
    const reportFileName = `migration-lich-su-phong-ban-${dryRun ? 'dry-run' : 'apply'}-${Date.now()}.json`;
    const fs = await import('fs');
    fs.writeFileSync(reportFileName, JSON.stringify(report, null, 2));
    console.log(`\n📄 Report đã được lưu: ${reportFileName}`);

    if (dryRun) {
      console.log('\n💡 Để thực thi migration, chạy lại với --apply');
    }
  } catch (error) {
    console.error('❌ Migration thất bại:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
