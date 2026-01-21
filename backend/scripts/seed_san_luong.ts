/**
 * Seed Sản Lượng Data for Chia Hàng and Giao Hàng
 * January 2026
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Seeding Sản Lượng Data for January 2026...');

    const thang = 1;
    const nam = 2026;

    // Get employees from Chia hàng (ID: 27) and Giao hàng (ID: 32)
    // Use direct phongBanId lookup based on DB query results
    const chiaHangPB = await prisma.phongBan.findFirst({
        where: { tenPhongBan: { contains: 'Chia', mode: 'insensitive' } }
    });
    const giaoHangPB = await prisma.phongBan.findFirst({
        where: { tenPhongBan: { contains: 'Giao', mode: 'insensitive' } }
    });

    console.log(`   Chia hàng PB ID: ${chiaHangPB?.id}, Giao hàng PB ID: ${giaoHangPB?.id}`);

    const chiaHangNVs = chiaHangPB ? await prisma.nhanVien.findMany({
        where: { 
            phongBanId: chiaHangPB.id,
            trangThai: 'DANG_LAM' 
        },
        select: { id: true, maNhanVien: true, hoTen: true, phongBanId: true }
    }) : [];

    const giaoHangNVs = giaoHangPB ? await prisma.nhanVien.findMany({
        where: { 
            phongBanId: giaoHangPB.id,
            trangThai: 'DANG_LAM' 
        },
        select: { id: true, maNhanVien: true, hoTen: true, phongBanId: true }
    }) : [];

    console.log(`   Found ${chiaHangNVs.length} employees in Chia hàng`);
    console.log(`   Found ${giaoHangNVs.length} employees in Giao hàng`);

    // Generate working days in January 2026 (skip Sundays)
    const workDays: Date[] = [];
    for (let d = 1; d <= 20; d++) { // Up to Jan 20 (current date)
        const date = new Date(nam, thang - 1, d);
        if (date.getDay() !== 0) { // Skip Sunday
            workDays.push(date);
        }
    }

    console.log(`   Working days to seed: ${workDays.length}`);

    // Delete existing data for January 2026
    await prisma.sanLuongChiaHang.deleteMany({
        where: {
            ngay: {
                gte: new Date(nam, thang - 1, 1),
                lt: new Date(nam, thang, 1)
            }
        }
    });

    await prisma.giaoHang.deleteMany({
        where: {
            ngay: {
                gte: new Date(nam, thang - 1, 1),
                lt: new Date(nam, thang, 1)
            }
        }
    });

    console.log('   Cleared old data for January 2026');

    // Seed Sản Lượng Chia Hàng
    console.log('   Seeding Sản Lượng Chia Hàng...');
    const sanLuongData = [];
    for (const nv of chiaHangNVs) {
        for (const day of workDays) {
            // Random production between 150-400 items
            const soLuongDat = Math.floor(Math.random() * 250) + 150;
            // Error rate 1-5%
            const soLuongLoi = Math.floor(soLuongDat * (Math.random() * 0.04 + 0.01));

            sanLuongData.push({
                ngay: day,
                nhanVienId: nv.id,
                soLuongSpDat: soLuongDat,
                soLuongSpLoi: soLuongLoi,
                ghiChu: 'Seed data T1/2026',
                nguonDuLieu: 'NHAP_TAY' as const,
                khoaSua: false
            });
        }
    }

    await prisma.sanLuongChiaHang.createMany({
        data: sanLuongData
    });

    console.log(`   ✅ Created ${sanLuongData.length} Sản Lượng Chia Hàng records`);

    // Seed Giao Hàng
    console.log('   Seeding Giao Hàng...');
    const giaoHangData = [];
    for (const nv of giaoHangNVs) {
        for (const day of workDays) {
            // Random delivery weight 50-200 kg
            const khoiLuong = Math.floor(Math.random() * 150) + 50 + Math.random();
            // Random late times 0-2
            const soLanTre = Math.random() > 0.8 ? Math.floor(Math.random() * 3) : 0;
            // Random no-receipt times 0-1
            const soLanKhongPhieu = Math.random() > 0.9 ? 1 : 0;

            giaoHangData.push({
                ngay: day,
                nhanVienId: nv.id,
                khoiLuongThanhCong: khoiLuong,
                soLanTreGio: soLanTre,
                soLanKhongLayPhieu: soLanKhongPhieu,
                ghiChu: 'Seed data T1/2026',
                nguonDuLieu: 'NHAP_TAY' as const,
                khoaSua: false
            });
        }
    }

    await prisma.giaoHang.createMany({
        data: giaoHangData
    });

    console.log(`   ✅ Created ${giaoHangData.length} Giao Hàng records`);

    // Summary stats
    const totalChiaHang = await prisma.sanLuongChiaHang.aggregate({
        where: {
            ngay: {
                gte: new Date(nam, thang - 1, 1),
                lt: new Date(nam, thang, 1)
            }
        },
        _sum: { soLuongSpDat: true, soLuongSpLoi: true }
    });

    const totalGiaoHang = await prisma.giaoHang.aggregate({
        where: {
            ngay: {
                gte: new Date(nam, thang - 1, 1),
                lt: new Date(nam, thang, 1)
            }
        },
        _sum: { khoiLuongThanhCong: true }
    });

    console.log('\n📊 Summary:');
    console.log(`   Chia Hàng - Total SP Đạt: ${totalChiaHang._sum.soLuongSpDat?.toLocaleString()}`);
    console.log(`   Chia Hàng - Total SP Lỗi: ${totalChiaHang._sum.soLuongSpLoi?.toLocaleString()}`);
    console.log(`   Giao Hàng - Total KL: ${Number(totalGiaoHang._sum.khoiLuongThanhCong || 0).toLocaleString()} kg`);

    console.log('\n✅ Seeding completed successfully!');
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
