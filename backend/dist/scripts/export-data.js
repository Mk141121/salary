"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const fs = require("fs");
const path = require("path");
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('=== EXPORT DỮ LIỆU HIỆN TẠI ===\n');
    const phongBans = await prisma.phongBan.findMany({
        orderBy: { id: 'asc' },
    });
    console.log(`📁 Phòng ban: ${phongBans.length}`);
    const nhanViens = await prisma.nhanVien.findMany({
        orderBy: { maNhanVien: 'asc' },
        include: {
            phongBan: {
                select: { tenPhongBan: true },
            },
        },
    });
    console.log(`👥 Nhân viên: ${nhanViens.length}`);
    const khoanLuongs = await prisma.khoanLuong.findMany({
        orderBy: { thuTu: 'asc' },
    });
    console.log(`💰 Khoản lương: ${khoanLuongs.length}`);
    const cauHinhBHXH = await prisma.cauHinhBHXH.findMany();
    console.log(`🏥 Cấu hình BHXH: ${cauHinhBHXH.length}`);
    const cauHinhThue = await prisma.cauHinhThueTNCN.findMany();
    const bacThue = await prisma.bacThueTNCN.findMany({
        orderBy: { bac: 'asc' },
    });
    console.log(`📊 Cấu hình thuế: ${cauHinhThue.length}, Bậc thuế: ${bacThue.length}`);
    const phuCaps = await prisma.phuCapNhanVien.findMany({
        include: {
            nhanVien: { select: { maNhanVien: true } },
            khoanLuong: { select: { maKhoan: true } },
        },
    });
    console.log(`🎁 Phụ cấp NV: ${phuCaps.length}`);
    const exportData = {
        exportedAt: new Date().toISOString(),
        phongBans: phongBans.map(pb => ({
            maPhongBan: pb.maPhongBan,
            tenPhongBan: pb.tenPhongBan,
            moTa: pb.moTa,
            gioVaoChuan: pb.gioVaoChuan,
            gioRaChuan: pb.gioRaChuan,
            phutChoPhepTre: pb.phutChoPhepTre,
        })),
        nhanViens: nhanViens.map(nv => ({
            maNhanVien: nv.maNhanVien,
            hoTen: nv.hoTen,
            email: nv.email,
            soDienThoai: nv.soDienThoai,
            tenPhongBan: nv.phongBan.tenPhongBan,
            chucVu: nv.chucVu,
            luongCoBan: Number(nv.luongCoBan),
            ngayVaoLam: nv.ngayVaoLam.toISOString().split('T')[0],
            trangThai: nv.trangThai,
        })),
        khoanLuongs: khoanLuongs.map(kl => ({
            maKhoan: kl.maKhoan,
            tenKhoan: kl.tenKhoan,
            loai: kl.loai,
            chiuThue: kl.chiuThue,
            phamViApDung: kl.phamViApDung,
            moTa: kl.moTa,
            thuTu: kl.thuTu,
            trangThai: kl.trangThai,
        })),
        cauHinhBHXH: cauHinhBHXH.map(ch => ({
            nam: ch.nam,
            tyLeBHXH_NV: Number(ch.tyLeBHXH_NV),
            tyLeBHXH_DN: Number(ch.tyLeBHXH_DN),
            tyLeBHYT_NV: Number(ch.tyLeBHYT_NV),
            tyLeBHYT_DN: Number(ch.tyLeBHYT_DN),
            tyLeBHTN_NV: Number(ch.tyLeBHTN_NV),
            tyLeBHTN_DN: Number(ch.tyLeBHTN_DN),
            luongCoBanToiThieu: Number(ch.luongCoBanToiThieu),
            tranDongBHXH: Number(ch.tranDongBHXH),
            luongCoSo: Number(ch.luongCoSo),
            trangThai: ch.trangThai,
        })),
        cauHinhThue: cauHinhThue.map(ct => ({
            nam: ct.nam,
            giamTruBanThan: Number(ct.giamTruBanThan),
            giamTruPhuThuoc: Number(ct.giamTruPhuThuoc),
            trangThai: ct.trangThai,
        })),
        bacThue: bacThue.map(bt => ({
            cauHinhThueId: bt.cauHinhThueId,
            bac: bt.bac,
            tuMuc: Number(bt.tuMuc),
            denMuc: bt.denMuc ? Number(bt.denMuc) : null,
            thueSuat: Number(bt.thueSuat),
            soTienTruNhanh: Number(bt.soTienTruNhanh),
        })),
        phuCapNhanViens: phuCaps.map(pc => ({
            maNhanVien: pc.nhanVien.maNhanVien,
            maKhoan: pc.khoanLuong.maKhoan,
            soTien: Number(pc.soTien),
            ghiChu: pc.ghiChu,
            trangThai: pc.trangThai,
        })),
    };
    const outputPath = path.join(__dirname, '../prisma/seed-data.json');
    fs.writeFileSync(outputPath, JSON.stringify(exportData, null, 2), 'utf-8');
    console.log(`\n✅ Đã lưu vào: ${outputPath}`);
    console.log('\n=== HOÀN THÀNH ===');
}
main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
//# sourceMappingURL=export-data.js.map