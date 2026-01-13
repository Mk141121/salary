"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const fs = require("fs");
const path = require("path");
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('🌱 Bắt đầu seed dữ liệu từ file JSON...\n');
    const seedDataPath = path.join(__dirname, 'seed-data.json');
    if (!fs.existsSync(seedDataPath)) {
        console.log('❌ Không tìm thấy file seed-data.json');
        console.log('   Chạy: npx ts-node scripts/export-data.ts để tạo file');
        return;
    }
    const seedData = JSON.parse(fs.readFileSync(seedDataPath, 'utf-8'));
    console.log(`📅 Dữ liệu được export lúc: ${seedData.exportedAt}\n`);
    console.log('🏢 Tạo phòng ban...');
    const phongBanMap = {};
    for (const pb of seedData.phongBans) {
        const created = await prisma.phongBan.upsert({
            where: { maPhongBan: pb.maPhongBan },
            update: {
                tenPhongBan: pb.tenPhongBan,
                moTa: pb.moTa ?? undefined,
                gioVaoChuan: pb.gioVaoChuan ?? undefined,
                gioRaChuan: pb.gioRaChuan ?? undefined,
                phutChoPhepTre: pb.phutChoPhepTre ?? undefined,
            },
            create: {
                maPhongBan: pb.maPhongBan,
                tenPhongBan: pb.tenPhongBan,
                moTa: pb.moTa ?? undefined,
                gioVaoChuan: pb.gioVaoChuan ?? '08:00',
                gioRaChuan: pb.gioRaChuan ?? '17:00',
                phutChoPhepTre: pb.phutChoPhepTre ?? 5,
            },
        });
        phongBanMap[pb.tenPhongBan] = created.id;
        console.log(`  ✅ ${pb.tenPhongBan}`);
    }
    console.log('\n💰 Tạo khoản lương...');
    const khoanLuongMap = {};
    for (const kl of seedData.khoanLuongs) {
        const created = await prisma.khoanLuong.upsert({
            where: { maKhoan: kl.maKhoan },
            update: {
                tenKhoan: kl.tenKhoan,
                chiuThue: kl.chiuThue,
                phamViApDung: kl.phamViApDung,
                moTa: kl.moTa,
                thuTu: kl.thuTu,
                trangThai: kl.trangThai,
            },
            create: {
                maKhoan: kl.maKhoan,
                tenKhoan: kl.tenKhoan,
                loai: kl.loai,
                chiuThue: kl.chiuThue,
                phamViApDung: kl.phamViApDung,
                moTa: kl.moTa,
                thuTu: kl.thuTu,
                trangThai: kl.trangThai,
                cachTinh: client_1.CachTinhLuong.LUONG_THANG_CO_DINH,
            },
        });
        khoanLuongMap[kl.maKhoan] = created.id;
    }
    console.log(`  ✅ ${seedData.khoanLuongs.length} khoản lương`);
    console.log('\n👥 Tạo nhân viên...');
    for (const nv of seedData.nhanViens) {
        const phongBanId = phongBanMap[nv.tenPhongBan];
        if (!phongBanId) {
            console.log(`  ⚠️ Không tìm thấy phòng ban: ${nv.tenPhongBan} cho NV ${nv.maNhanVien}`);
            continue;
        }
        await prisma.nhanVien.upsert({
            where: { maNhanVien: nv.maNhanVien },
            update: {
                hoTen: nv.hoTen,
                email: nv.email,
                soDienThoai: nv.soDienThoai,
                phongBanId,
                chucVu: nv.chucVu,
                luongCoBan: nv.luongCoBan,
                trangThai: nv.trangThai,
            },
            create: {
                maNhanVien: nv.maNhanVien,
                hoTen: nv.hoTen,
                email: nv.email,
                soDienThoai: nv.soDienThoai,
                phongBanId,
                chucVu: nv.chucVu,
                luongCoBan: nv.luongCoBan,
                ngayVaoLam: new Date(nv.ngayVaoLam),
                trangThai: nv.trangThai,
            },
        });
    }
    console.log(`  ✅ ${seedData.nhanViens.length} nhân viên`);
    console.log('\n🏥 Tạo cấu hình BHXH...');
    for (const ch of seedData.cauHinhBHXH) {
        await prisma.cauHinhBHXH.upsert({
            where: { nam: ch.nam },
            update: {
                tyLeBHXH_NV: ch.tyLeBHXH_NV,
                tyLeBHXH_DN: ch.tyLeBHXH_DN,
                tyLeBHYT_NV: ch.tyLeBHYT_NV,
                tyLeBHYT_DN: ch.tyLeBHYT_DN,
                tyLeBHTN_NV: ch.tyLeBHTN_NV,
                tyLeBHTN_DN: ch.tyLeBHTN_DN,
                luongCoBanToiThieu: ch.luongCoBanToiThieu,
                tranDongBHXH: ch.tranDongBHXH,
                luongCoSo: ch.luongCoSo,
                trangThai: ch.trangThai,
            },
            create: ch,
        });
        console.log(`  ✅ Năm ${ch.nam}`);
    }
    console.log('\n📊 Tạo cấu hình thuế...');
    const cauHinhThueMap = {};
    for (const ct of seedData.cauHinhThue) {
        const created = await prisma.cauHinhThueTNCN.upsert({
            where: { nam: ct.nam },
            update: {
                giamTruBanThan: ct.giamTruBanThan,
                giamTruPhuThuoc: ct.giamTruPhuThuoc,
                trangThai: ct.trangThai,
            },
            create: ct,
        });
        cauHinhThueMap[ct.nam] = created.id;
        console.log(`  ✅ Thuế năm ${ct.nam}`);
    }
    for (const bt of seedData.bacThue) {
        const cauHinhThue = await prisma.cauHinhThueTNCN.findFirst({
            where: { id: bt.cauHinhThueId },
        });
        if (!cauHinhThue)
            continue;
        await prisma.bacThueTNCN.upsert({
            where: {
                cauHinhThueId_bac: {
                    cauHinhThueId: cauHinhThue.id,
                    bac: bt.bac,
                },
            },
            update: {
                tuMuc: bt.tuMuc,
                denMuc: bt.denMuc,
                thueSuat: bt.thueSuat,
                soTienTruNhanh: bt.soTienTruNhanh,
            },
            create: {
                cauHinhThueId: cauHinhThue.id,
                bac: bt.bac,
                tuMuc: bt.tuMuc,
                denMuc: bt.denMuc,
                thueSuat: bt.thueSuat,
                soTienTruNhanh: bt.soTienTruNhanh,
            },
        });
    }
    console.log(`  ✅ ${seedData.bacThue.length} bậc thuế`);
    console.log('\n🎁 Tạo phụ cấp nhân viên...');
    for (const pc of seedData.phuCapNhanViens) {
        const nhanVien = await prisma.nhanVien.findUnique({
            where: { maNhanVien: pc.maNhanVien },
        });
        const khoanLuongId = khoanLuongMap[pc.maKhoan];
        if (!nhanVien || !khoanLuongId) {
            console.log(`  ⚠️ Bỏ qua: NV ${pc.maNhanVien} - ${pc.maKhoan}`);
            continue;
        }
        const existingPhuCap = await prisma.phuCapNhanVien.findFirst({
            where: {
                nhanVienId: nhanVien.id,
                khoanLuongId,
            },
        });
        if (existingPhuCap) {
            await prisma.phuCapNhanVien.update({
                where: { id: existingPhuCap.id },
                data: {
                    soTien: pc.soTien,
                    ghiChu: pc.ghiChu,
                    trangThai: pc.trangThai ? 'HIEU_LUC' : 'TAM_DUNG',
                },
            });
        }
        else {
            await prisma.phuCapNhanVien.create({
                data: {
                    nhanVien: { connect: { id: nhanVien.id } },
                    khoanLuong: { connect: { id: khoanLuongId } },
                    soTien: pc.soTien,
                    ghiChu: pc.ghiChu,
                    tuNgay: new Date(),
                    trangThai: pc.trangThai ? 'HIEU_LUC' : 'TAM_DUNG',
                },
            });
        }
    }
    console.log(`  ✅ ${seedData.phuCapNhanViens.length} phụ cấp`);
    console.log('\n✨ Hoàn thành seed dữ liệu!');
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed-from-json.js.map