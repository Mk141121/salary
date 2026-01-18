
/**
 * DB SEED FOR DEEP TESTING (SPRINT 0-12) - REVISED
 * 
 * Clears data and seeds:
 * 1. Departments & Positions
 * 2. Salary Components & Formulas (Corrected for Rule Engine)
 * 3. Employees & Contracts (Populating NhanVien.luongCoBan)
 * 4. Attendance Data (ChamCong & ChiTietChamCong)
 * 5. Rule Engine Config (Correct variables & JSON format)
 */

import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Starting Deep Test Seeding (Revised)...');

    // 1. CLEANUP
    console.log('   Cleaning old data...');
    try {
        // Order matters for FK constraints
        await prisma.nguoiDungVaiTro.deleteMany();
        await prisma.phienDangNhap.deleteMany();
        await prisma.auditLog.deleteMany();
        await prisma.thongBao.deleteMany();

        await prisma.chiTietBangLuong.deleteMany();
        await prisma.ngayCongBangLuong.deleteMany();
        await prisma.ruleTrace.deleteMany();
        await prisma.bangLuongQuyChe.deleteMany();
        await prisma.bangLuong.deleteMany();

        await prisma.nguoiPhuThuoc.deleteMany();
        await prisma.nhanVienNganHang.deleteMany();
        await prisma.nhanVienTrachNhiem.deleteMany();
        await prisma.suKienThuongPhat.deleteMany();
        await prisma.phuCapNhanVien.deleteMany();
        await prisma.nhanVienHopDong.deleteMany();

        await prisma.chiTietChamCong.deleteMany();
        await prisma.chamCong.deleteMany();

        // Safe check for GPS/Requests
        if ((prisma as any).bangGhiChamCongGPS) await (prisma as any).bangGhiChamCongGPS.deleteMany();
        if ((prisma as any).donYeuCau) await (prisma as any).donYeuCau.deleteMany();
        if ((prisma as any).donNghiPhep) await (prisma as any).donNghiPhep.deleteMany();

        await prisma.nguoiDung.deleteMany();
        await prisma.nhanVien.deleteMany();

        await prisma.quyCheRule.deleteMany();
        await prisma.quyChe.deleteMany();

        await prisma.vaiTro.deleteMany();
        await prisma.khoanLuong.deleteMany();
        await prisma.phongBan.deleteMany();
        await prisma.cauHinhDonGia.deleteMany();
    } catch (e) {
        console.log('Cleanup warning:', e);
    }

    // 2. CORE DATA
    console.log('   Seeding Core Data: Departments...');
    const pbBoard = await prisma.phongBan.create({
        data: { maPhongBan: 'BOD', tenPhongBan: 'Ban Giám Đốc', gioVaoChuan: '08:00', gioRaChuan: '17:00', trangThai: 'ACTIVE' }
    });
    const pbTech = await prisma.phongBan.create({
        data: { maPhongBan: 'TECH', tenPhongBan: 'Phòng Kỹ Thuật', gioVaoChuan: '08:30', gioRaChuan: '17:30', trangThai: 'ACTIVE' }
    });

    // 3. SALARY COMPONENTS (Khoan Luong)
    console.log('   Seeding Salary Components...');
    const klLuongCB = await prisma.khoanLuong.create({
        data: { maKhoan: 'L_CB', tenKhoan: 'Lương Cơ Bản', loai: 'THU_NHAP', cachTinh: 'LUONG_THANG_CO_DINH', thuTu: 1 }
    });
    const klPhuCapAn = await prisma.khoanLuong.create({
        data: { maKhoan: 'PC_AN', tenKhoan: 'Phụ Cấp Ăn Trưa', loai: 'THU_NHAP', cachTinh: 'THEO_NGAY_CONG', thuTu: 2 }
    });
    const klOT = await prisma.khoanLuong.create({
        data: { maKhoan: 'L_OT', tenKhoan: 'Lương Tăng Ca', loai: 'THU_NHAP', cachTinh: 'LUONG_THANG_CO_DINH', thuTu: 3 }
    });
    const klBHXH = await prisma.khoanLuong.create({
        data: { maKhoan: 'BHXH', tenKhoan: 'BHXH (8%)', loai: 'KHAU_TRU', cachTinh: 'LUONG_THANG_CO_DINH', thuTu: 4 }
    });
    const klThucLinh = await prisma.khoanLuong.create({
        data: { maKhoan: 'NET', tenKhoan: 'Thực Lĩnh', loai: 'THU_NHAP', cachTinh: 'LUONG_THANG_CO_DINH', thuTu: 99 }
    });

    // 4. RULE ENGINE (Quy Che)
    console.log('   Seeding Rule Engine Formulas...');
    // Constants from database
    await prisma.cauHinhDonGia.create({
        data: { maBien: 'PC_AN_NGAY', tenBien: 'Tiền ăn/ngày', giaTri: 30000, trangThai: true }
    });

    const generateRules = async (quyCheId: number) => {
        // 1. Lương Cơ Bản theo ngày công
        await prisma.quyCheRule.create({
            data: {
                quyCheId, khoanLuongId: klLuongCB.id, tenRule: 'Lương chính', loaiRule: 'CONG_THUC',
                congThucJson: JSON.stringify({ bieuThuc: 'LUONG_CO_BAN * (CONG_THUC_TE / CONG_CHUAN)' }),
                thuTuUuTien: 1
            }
        });
        // 2. OT
        await prisma.quyCheRule.create({
            data: {
                quyCheId, khoanLuongId: klOT.id, tenRule: 'Tăng ca', loaiRule: 'CONG_THUC',
                congThucJson: JSON.stringify({ bieuThuc: '(LUONG_CO_BAN / CONG_CHUAN / 8) * SO_GIO_OT * 1.5' }),
                thuTuUuTien: 2
            }
        });
        // 3. BHXH
        await prisma.quyCheRule.create({
            data: {
                quyCheId, khoanLuongId: klBHXH.id, tenRule: 'Trừ BHXH', loaiRule: 'CONG_THUC',
                congThucJson: JSON.stringify({ bieuThuc: 'LUONG_CO_BAN * 0.08' }),
                thuTuUuTien: 3
            }
        });
        // 4. Phụ cấp ăn trưa
        await prisma.quyCheRule.create({
            data: {
                quyCheId, khoanLuongId: klPhuCapAn.id, tenRule: 'Ăn trưa', loaiRule: 'CONG_THUC',
                congThucJson: JSON.stringify({ bieuThuc: 'PC_AN_NGAY * CONG_THUC_TE' }),
                thuTuUuTien: 4
            }
        });
        // 4. Phụ cấp ăn trưa
        await prisma.quyCheRule.create({
            data: {
                quyCheId, khoanLuongId: klPhuCapAn.id, tenRule: 'Ăn trưa', loaiRule: 'CONG_THUC',
                congThucJson: JSON.stringify({ bieuThuc: 'PC_AN_NGAY * CONG_THUC_TE' }),
                thuTuUuTien: 4
            }
        });
    };

    const startOfYear = new Date('2024-01-01');
    const qcBoard = await prisma.quyChe.create({
        data: { phongBanId: pbBoard.id, tenQuyChe: 'Quy Chế BOD', tuNgay: startOfYear, trangThai: 'HIEU_LUC' }
    });
    await generateRules(qcBoard.id);

    const qcTech = await prisma.quyChe.create({
        data: { phongBanId: pbTech.id, tenQuyChe: 'Quy Chế TECH', tuNgay: startOfYear, trangThai: 'HIEU_LUC' }
    });
    await generateRules(qcTech.id);

    // 5. USERS & ROLES
    console.log('   Seeding Valid Roles & Permissions...');
    const roleAdmin = await prisma.vaiTro.create({
        data: { maVaiTro: 'ADMIN', tenVaiTro: 'Quản trị hệ thống', trangThai: true }
    });
    const adminHash = await bcrypt.hash('admin123', 10);
    const hash = await bcrypt.hash('123456', 10);

    const adminUser = await prisma.nguoiDung.create({
        data: { tenDangNhap: 'admin', matKhau: adminHash, hoTen: 'System Admin', email: 'admin@system.com', trangThai: 'HOAT_DONG' }
    });
    await prisma.nguoiDungVaiTro.create({ data: { nguoiDungId: adminUser.id, vaiTroId: roleAdmin.id } });

    // 6. EMPLOYEES
    console.log('   Seeding Employees...');
    const dir = await prisma.nhanVien.create({
        data: { maNhanVien: 'DIR01', hoTen: 'Nguyễn Văn Giám Đốc', email: 'dir@corp.com', phongBanId: pbBoard.id, trangThai: 'DANG_LAM', gioiTinh: 'NAM', luongCoBan: 50000000 }
    });
    await prisma.nhanVienHopDong.create({
        data: { nhanVienId: dir.id, loaiHopDong: 'VO_THOI_HAN', tuNgay: startOfYear, luongCoBan: 50000000, luongDongBH: 50000000, trangThai: 'HIEU_LUC' }
    });
    await prisma.nguoiDung.create({ data: { tenDangNhap: 'director', email: 'dir@corp.com', matKhau: hash, hoTen: 'Nguyễn Giám Đốc', nhanVienId: dir.id, trangThai: 'HOAT_DONG' } });

    const dev = await prisma.nhanVien.create({
        data: { maNhanVien: 'DEV01', hoTen: 'Trần Kỹ Thuật', email: 'dev@corp.com', phongBanId: pbTech.id, trangThai: 'DANG_LAM', gioiTinh: 'NAM', luongCoBan: 20000000 }
    });
    await prisma.nhanVienHopDong.create({
        data: { nhanVienId: dev.id, loaiHopDong: 'VO_THOI_HAN', tuNgay: startOfYear, luongCoBan: 20000000, luongDongBH: 20000000, trangThai: 'HIEU_LUC' }
    });
    await prisma.nguoiDung.create({ data: { tenDangNhap: 'dev01', email: 'dev@corp.com', matKhau: hash, hoTen: 'Trần Kỹ Thuật', nhanVienId: dev.id, trangThai: 'HOAT_DONG' } });

    // 7. ATTENDANCE & DAILY LOGS
    const thang = 1;
    const nam = 2026;
    console.log(`   Seeding Attendance & Logs for ${thang}/${nam}...`);
    const daysInMonth = 31;
    const workDaysTarget = 26;

    const createLogs = async (nvId: number, name: string, isDev: boolean) => {
        let daysLogged = 0;
        for (let d = 1; d <= daysInMonth; d++) {
            const date = new Date(nam, thang - 1, d);
            if (date.getDay() === 0) continue; // Skip Sunday
            daysLogged++;

            if (isDev && daysLogged > 24) continue; // Dev misses 2 days

            const isOT = isDev && (daysLogged === 1 || daysLogged === 2);
            await prisma.chiTietChamCong.create({
                data: {
                    nhanVienId: nvId, ngay: date, soGioLam: 8, soGioOT: isOT ? 5 : 0, trangThai: 'DI_LAM'
                }
            });
        }
        // Monthly summary
        await prisma.chamCong.create({
            data: {
                nhanVienId: nvId, thang, nam, soCongChuan: workDaysTarget,
                soCongThucTe: isDev ? 24 : 26, soGioOT: isDev ? 10 : 0
            }
        });
    };

    await createLogs(dir.id, 'Director', false);
    await createLogs(dev.id, 'Developer', true);

    console.log('✅ Seeding Completed Successfully.');
}

main().catch(e => { console.error(e); process.exit(1); }).finally(async () => { await prisma.$disconnect(); });
