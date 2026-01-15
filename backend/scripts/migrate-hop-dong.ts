/**
 * Script Migration Hợp Đồng Nhân Viên
 * Chuyển luong_co_ban từ bảng nhan_vien sang nhan_vien_hop_dong
 *
 * Tính năng:
 * - Idempotent: chạy nhiều lần không duplicate
 * - Dry-run mode: xem trước không thay đổi DB
 * - Report kết quả chi tiết
 *
 * Usage:
 *   npx ts-node scripts/migrate-hop-dong.ts --dry-run
 *   npx ts-node scripts/migrate-hop-dong.ts --apply
 */

import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';

const prisma = new PrismaClient();

interface MigrationReport {
  totalNhanVien: number;
  daCoHopDong: number;
  canMigrate: number;
  migrated: number;
  errors: { maNhanVien: string; error: string }[];
  details: {
    maNhanVien: string;
    hoTen: string;
    luongCoBan: string;
    ngayVaoLam: string;
    trangThai: string;
    action: string;
  }[];
}

async function main() {
  const args = process.argv.slice(2);
  const isDryRun = args.includes('--dry-run');
  const isApply = args.includes('--apply');

  if (!isDryRun && !isApply) {
    console.log('❌ Vui lòng chỉ định mode:');
    console.log('   --dry-run   Xem trước, không thay đổi DB');
    console.log('   --apply     Thực hiện migration');
    process.exit(1);
  }

  console.log('='.repeat(60));
  console.log(`🚀 MIGRATION HỢP ĐỒNG NHÂN VIÊN - ${isDryRun ? 'DRY RUN' : 'APPLY'}`);
  console.log('='.repeat(60));
  console.log(`Thời gian: ${new Date().toISOString()}`);
  console.log('');

  const report: MigrationReport = {
    totalNhanVien: 0,
    daCoHopDong: 0,
    canMigrate: 0,
    migrated: 0,
    errors: [],
    details: [],
  };

  try {
    // Lấy tất cả nhân viên
    const nhanViens = await prisma.nhanVien.findMany({
      include: {
        hopDongs: true,
      },
      orderBy: { maNhanVien: 'asc' },
    });

    report.totalNhanVien = nhanViens.length;
    console.log(`📊 Tổng số nhân viên: ${nhanViens.length}`);
    console.log('');

    for (const nv of nhanViens) {
      // Kiểm tra đã có hợp đồng chưa
      if (nv.hopDongs.length > 0) {
        report.daCoHopDong++;
        report.details.push({
          maNhanVien: nv.maNhanVien,
          hoTen: nv.hoTen,
          luongCoBan: nv.luongCoBan.toString(),
          ngayVaoLam: nv.ngayVaoLam.toISOString().split('T')[0],
          trangThai: nv.trangThai,
          action: `SKIP - Đã có ${nv.hopDongs.length} hợp đồng`,
        });
        continue;
      }

      report.canMigrate++;

      // Xác định ngày bắt đầu hợp đồng
      let tuNgay = nv.ngayVaoLam;
      let ghiChu = '';

      // Nếu không có ngày vào làm hợp lệ, dùng ngày mặc định
      if (!tuNgay || tuNgay.getFullYear() < 2000) {
        tuNgay = new Date('2020-01-01');
        ghiChu = 'Migration tự động - ngày vào làm không xác định';
      } else {
        ghiChu = 'Migration tự động từ dữ liệu cũ';
      }

      // Xác định loại hợp đồng dựa vào trạng thái
      let loaiHopDong: 'THU_VIEC' | 'MOT_NAM' | 'BA_NAM' | 'VO_THOI_HAN' = 'VO_THOI_HAN';
      let denNgay: Date | null = null;
      let trangThaiHD: 'HIEU_LUC' | 'HET_HAN' = 'HIEU_LUC';

      if (nv.trangThai === 'NGHI_VIEC') {
        trangThaiHD = 'HET_HAN';
        denNgay = nv.ngayNghiViec || new Date();
      }

      if (!isDryRun) {
        try {
          await prisma.nhanVienHopDong.create({
            data: {
              nhanVienId: nv.id,
              loaiHopDong: loaiHopDong,
              tuNgay: tuNgay,
              denNgay: denNgay,
              luongCoBan: nv.luongCoBan,
              trangThai: trangThaiHD,
              ghiChu: ghiChu,
            },
          });
          report.migrated++;
          report.details.push({
            maNhanVien: nv.maNhanVien,
            hoTen: nv.hoTen,
            luongCoBan: nv.luongCoBan.toString(),
            ngayVaoLam: tuNgay.toISOString().split('T')[0],
            trangThai: nv.trangThai,
            action: 'MIGRATED - Tạo hợp đồng mới',
          });
        } catch (err) {
          const error = err as Error;
          report.errors.push({
            maNhanVien: nv.maNhanVien,
            error: error.message,
          });
          report.details.push({
            maNhanVien: nv.maNhanVien,
            hoTen: nv.hoTen,
            luongCoBan: nv.luongCoBan.toString(),
            ngayVaoLam: tuNgay.toISOString().split('T')[0],
            trangThai: nv.trangThai,
            action: `ERROR - ${error.message}`,
          });
        }
      } else {
        report.migrated++;
        report.details.push({
          maNhanVien: nv.maNhanVien,
          hoTen: nv.hoTen,
          luongCoBan: nv.luongCoBan.toString(),
          ngayVaoLam: tuNgay.toISOString().split('T')[0],
          trangThai: nv.trangThai,
          action: '[DRY-RUN] Sẽ tạo hợp đồng',
        });
      }
    }

    // In kết quả
    console.log('📈 KẾT QUẢ MIGRATION:');
    console.log('-'.repeat(40));
    console.log(`   Tổng nhân viên:      ${report.totalNhanVien}`);
    console.log(`   Đã có hợp đồng:      ${report.daCoHopDong}`);
    console.log(`   Cần migrate:         ${report.canMigrate}`);
    console.log(`   Đã migrate:          ${report.migrated}`);
    console.log(`   Lỗi:                 ${report.errors.length}`);
    console.log('');

    // Xuất report ra file
    const reportFileName = `migration-hop-dong-${isDryRun ? 'dry-run' : 'apply'}-${Date.now()}.md`;
    const reportContent = generateReportMD(report, isDryRun);
    fs.writeFileSync(reportFileName, reportContent);
    console.log(`📄 Report đã lưu: ${reportFileName}`);

    if (report.errors.length > 0) {
      console.log('');
      console.log('⚠️  CÁC LỖI:');
      report.errors.forEach((e) => {
        console.log(`   - ${e.maNhanVien}: ${e.error}`);
      });
    }

    console.log('');
    console.log('='.repeat(60));
    console.log(isDryRun ? '✅ DRY RUN hoàn tất' : '✅ MIGRATION hoàn tất');
    console.log('='.repeat(60));
  } finally {
    await prisma.$disconnect();
  }
}

function generateReportMD(report: MigrationReport, isDryRun: boolean): string {
  const lines: string[] = [];

  lines.push(`# Migration Hợp Đồng Nhân Viên - ${isDryRun ? 'DRY RUN' : 'APPLY'}`);
  lines.push('');
  lines.push(`**Thời gian:** ${new Date().toISOString()}`);
  lines.push('');
  lines.push('## Tổng quan');
  lines.push('');
  lines.push(`| Chỉ số | Số lượng |`);
  lines.push(`|--------|----------|`);
  lines.push(`| Tổng nhân viên | ${report.totalNhanVien} |`);
  lines.push(`| Đã có hợp đồng | ${report.daCoHopDong} |`);
  lines.push(`| Cần migrate | ${report.canMigrate} |`);
  lines.push(`| Đã migrate | ${report.migrated} |`);
  lines.push(`| Lỗi | ${report.errors.length} |`);
  lines.push('');

  if (report.errors.length > 0) {
    lines.push('## Lỗi');
    lines.push('');
    lines.push(`| Mã NV | Lỗi |`);
    lines.push(`|-------|-----|`);
    report.errors.forEach((e) => {
      lines.push(`| ${e.maNhanVien} | ${e.error} |`);
    });
    lines.push('');
  }

  lines.push('## Chi tiết');
  lines.push('');
  lines.push(`| Mã NV | Họ tên | Lương cơ bản | Ngày vào làm | Trạng thái | Hành động |`);
  lines.push(`|-------|--------|--------------|--------------|------------|-----------|`);
  report.details.forEach((d) => {
    lines.push(
      `| ${d.maNhanVien} | ${d.hoTen} | ${Number(d.luongCoBan).toLocaleString('vi-VN')} | ${d.ngayVaoLam} | ${d.trangThai} | ${d.action} |`,
    );
  });

  return lines.join('\n');
}

main().catch((e) => {
  console.error('❌ Lỗi nghiêm trọng:', e);
  process.exit(1);
});
