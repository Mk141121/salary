"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('🌱 Bắt đầu seed dữ liệu...');
    console.log('📋 Tạo danh mục khoản lương...');
    const danhMucKhoanLuong = [
        { maKhoan: 'LUONG_CO_BAN', tenKhoan: 'Lương cơ bản', loai: client_1.LoaiKhoanLuong.THU_NHAP, cachTinh: client_1.CachTinhLuong.LUONG_THANG_CO_DINH, chiuThue: true, thuTu: 1 },
        { maKhoan: 'THUONG_HIEU_SUAT', tenKhoan: 'Thưởng hiệu suất', loai: client_1.LoaiKhoanLuong.THU_NHAP, cachTinh: client_1.CachTinhLuong.LUONG_THANG_CO_DINH, chiuThue: true, thuTu: 2 },
        { maKhoan: 'PHU_CAP_XANG_XE', tenKhoan: 'Phụ cấp xăng xe', loai: client_1.LoaiKhoanLuong.THU_NHAP, cachTinh: client_1.CachTinhLuong.THEO_NGAY_CONG, chiuThue: false, thuTu: 3 },
        { maKhoan: 'PHU_CAP_DIEN_THOAI', tenKhoan: 'Phụ cấp điện thoại', loai: client_1.LoaiKhoanLuong.THU_NHAP, cachTinh: client_1.CachTinhLuong.THEO_NGAY_CONG, chiuThue: false, thuTu: 4 },
        { maKhoan: 'HO_TRO_CHUYEN_CAN', tenKhoan: 'Hỗ trợ chuyên cần', loai: client_1.LoaiKhoanLuong.THU_NHAP, cachTinh: client_1.CachTinhLuong.CHUYEN_CAN_DIEU_KIEN, chiuThue: false, thuTu: 5 },
        { maKhoan: 'HO_TRO_AN_CA', tenKhoan: 'Hỗ trợ ăn ca', loai: client_1.LoaiKhoanLuong.THU_NHAP, cachTinh: client_1.CachTinhLuong.THEO_NGAY_CONG, chiuThue: false, thuTu: 6 },
        { maKhoan: 'THUONG_KINH_DOANH', tenKhoan: 'Thưởng kinh doanh', loai: client_1.LoaiKhoanLuong.THU_NHAP, cachTinh: client_1.CachTinhLuong.LUONG_THANG_CO_DINH, chiuThue: true, thuTu: 7 },
        { maKhoan: 'PHU_CAP_KHAC', tenKhoan: 'Phụ cấp khác', loai: client_1.LoaiKhoanLuong.THU_NHAP, cachTinh: client_1.CachTinhLuong.LUONG_THANG_CO_DINH, chiuThue: false, thuTu: 8 },
        { maKhoan: 'PHU_CAP_CHUC_VU', tenKhoan: 'Phụ cấp chức vụ', loai: client_1.LoaiKhoanLuong.THU_NHAP, cachTinh: client_1.CachTinhLuong.LUONG_THANG_CO_DINH, chiuThue: true, thuTu: 9 },
        { maKhoan: 'PHU_CAP_THAM_NIEN', tenKhoan: 'Phụ cấp thâm niên', loai: client_1.LoaiKhoanLuong.THU_NHAP, cachTinh: client_1.CachTinhLuong.LUONG_THANG_CO_DINH, chiuThue: true, thuTu: 10 },
        { maKhoan: 'BHXH_NLD', tenKhoan: 'BHXH (8%)', loai: client_1.LoaiKhoanLuong.KHAU_TRU, cachTinh: client_1.CachTinhLuong.LUONG_THANG_CO_DINH, chiuThue: false, thuTu: 101 },
        { maKhoan: 'BHYT_NLD', tenKhoan: 'BHYT (1.5%)', loai: client_1.LoaiKhoanLuong.KHAU_TRU, cachTinh: client_1.CachTinhLuong.LUONG_THANG_CO_DINH, chiuThue: false, thuTu: 102 },
        { maKhoan: 'BHTN_NLD', tenKhoan: 'BHTN (1%)', loai: client_1.LoaiKhoanLuong.KHAU_TRU, cachTinh: client_1.CachTinhLuong.LUONG_THANG_CO_DINH, chiuThue: false, thuTu: 103 },
        { maKhoan: 'THUE_TNCN', tenKhoan: 'Thuế TNCN', loai: client_1.LoaiKhoanLuong.KHAU_TRU, cachTinh: client_1.CachTinhLuong.LUONG_THANG_CO_DINH, chiuThue: false, thuTu: 104 },
        { maKhoan: 'PHAT_DI_MUON', tenKhoan: 'Phạt đi muộn', loai: client_1.LoaiKhoanLuong.KHAU_TRU, cachTinh: client_1.CachTinhLuong.LUONG_THANG_CO_DINH, chiuThue: false, thuTu: 111 },
        { maKhoan: 'PHAT_VE_SOM', tenKhoan: 'Phạt về sớm', loai: client_1.LoaiKhoanLuong.KHAU_TRU, cachTinh: client_1.CachTinhLuong.LUONG_THANG_CO_DINH, chiuThue: false, thuTu: 112 },
        { maKhoan: 'PHAT_NGHI_KHONG_PHEP', tenKhoan: 'Phạt nghỉ không phép', loai: client_1.LoaiKhoanLuong.KHAU_TRU, cachTinh: client_1.CachTinhLuong.LUONG_THANG_CO_DINH, chiuThue: false, thuTu: 113 },
        { maKhoan: 'TRU_NGAY_CONG', tenKhoan: 'Trừ ngày công', loai: client_1.LoaiKhoanLuong.KHAU_TRU, cachTinh: client_1.CachTinhLuong.LUONG_THANG_CO_DINH, chiuThue: false, thuTu: 114 },
        { maKhoan: 'KHAU_TRU_KHAC', tenKhoan: 'Khấu trừ khác', loai: client_1.LoaiKhoanLuong.KHAU_TRU, cachTinh: client_1.CachTinhLuong.LUONG_THANG_CO_DINH, chiuThue: false, thuTu: 120 },
    ];
    for (const khoan of danhMucKhoanLuong) {
        await prisma.khoanLuong.upsert({
            where: { maKhoan: khoan.maKhoan },
            update: { cachTinh: khoan.cachTinh },
            create: khoan,
        });
    }
    console.log('🏢 Tạo phòng ban...');
    const phongBans = [
        { maPhongBan: 'KT', tenPhongBan: 'Kế toán', moTa: 'Phòng Kế toán - Tài chính', gioVaoChuan: '08:00', gioRaChuan: '17:00', phutChoPhepTre: 5 },
        { maPhongBan: 'KDMKT', tenPhongBan: 'Kinh doanh & Marketing', moTa: 'Phòng Kinh doanh và Marketing', gioVaoChuan: '08:30', gioRaChuan: '17:30', phutChoPhepTre: 10 },
        { maPhongBan: 'DH', tenPhongBan: 'Đơn hàng', moTa: 'Phòng Quản lý đơn hàng', gioVaoChuan: '07:30', gioRaChuan: '16:30', phutChoPhepTre: 5 },
        { maPhongBan: 'KV', tenPhongBan: 'Kho vận', moTa: 'Phòng Kho vận - Logistics', gioVaoChuan: '06:00', gioRaChuan: '15:00', phutChoPhepTre: 10 },
        { maPhongBan: 'CH', tenPhongBan: 'Chia hàng', moTa: 'Bộ phận Chia hàng', gioVaoChuan: '06:00', gioRaChuan: '15:00', phutChoPhepTre: 10 },
    ];
    const createdPhongBans = {};
    for (const pb of phongBans) {
        const created = await prisma.phongBan.upsert({
            where: { maPhongBan: pb.maPhongBan },
            update: {},
            create: pb,
        });
        createdPhongBans[pb.maPhongBan] = created.id;
    }
    console.log('📅 Tạo danh mục loại nghỉ...');
    const danhMucLoaiNghi = [
        {
            maLoaiNghi: 'PHEP_NAM',
            tenLoaiNghi: 'Phép năm',
            nhomLoai: 'CO_PHEP',
            coTinhLuong: true,
            coTinhChuyenCan: true,
            thuTuHienThi: 1,
        },
        {
            maLoaiNghi: 'OM',
            tenLoaiNghi: 'Nghỉ ốm',
            nhomLoai: 'CO_PHEP',
            coTinhLuong: true,
            coTinhChuyenCan: true,
            thuTuHienThi: 2,
        },
        {
            maLoaiNghi: 'THAI_SAN',
            tenLoaiNghi: 'Nghỉ thai sản',
            nhomLoai: 'CO_PHEP',
            coTinhLuong: false,
            coTinhChuyenCan: true,
            thuTuHienThi: 3,
        },
        {
            maLoaiNghi: 'VIEC_RIENG_CO_LUONG',
            tenLoaiNghi: 'Việc riêng có lương',
            nhomLoai: 'CO_PHEP',
            coTinhLuong: true,
            coTinhChuyenCan: true,
            thuTuHienThi: 4,
        },
        {
            maLoaiNghi: 'VIEC_RIENG_KHONG_LUONG',
            tenLoaiNghi: 'Việc riêng không lương',
            nhomLoai: 'CO_PHEP',
            coTinhLuong: false,
            coTinhChuyenCan: true,
            thuTuHienThi: 5,
        },
        {
            maLoaiNghi: 'KHONG_PHEP',
            tenLoaiNghi: 'Nghỉ không phép',
            nhomLoai: 'KHONG_PHEP',
            coTinhLuong: false,
            coTinhChuyenCan: false,
            thuTuHienThi: 99,
        },
    ];
    for (const loaiNghi of danhMucLoaiNghi) {
        await prisma.danhMucLoaiNghi.upsert({
            where: { maLoaiNghi: loaiNghi.maLoaiNghi },
            update: {
                tenLoaiNghi: loaiNghi.tenLoaiNghi,
                nhomLoai: loaiNghi.nhomLoai,
                coTinhLuong: loaiNghi.coTinhLuong,
                coTinhChuyenCan: loaiNghi.coTinhChuyenCan,
                thuTuHienThi: loaiNghi.thuTuHienThi,
            },
            create: loaiNghi,
        });
    }
    console.log('📝 Tạo danh mục loại yêu cầu...');
    const danhMucLoaiYeuCau = [
        {
            maLoai: 'OT',
            tenLoai: 'Làm thêm giờ (OT)',
            moTa: 'Yêu cầu làm thêm ngoài giờ quy định',
            nhomLoai: 'THOI_GIAN',
            yeuCauGioBatDau: true,
            yeuCauGioKetThuc: true,
            coTinhOT: true,
            isActive: true,
            thuTuHienThi: 1,
            mauHienThi: '#FF6B35',
            icon: 'clock',
        },
        {
            maLoai: 'TRE_GIO',
            tenLoai: 'Đi trễ',
            moTa: 'Xin phép đi làm trễ giờ quy định',
            nhomLoai: 'THOI_GIAN',
            yeuCauGioBatDau: true,
            yeuCauGioKetThuc: false,
            coTinhOT: false,
            isActive: true,
            thuTuHienThi: 2,
            mauHienThi: '#F59E0B',
            icon: 'clock',
        },
        {
            maLoai: 'VE_SOM',
            tenLoai: 'Về sớm',
            moTa: 'Xin phép về sớm hơn giờ quy định',
            nhomLoai: 'THOI_GIAN',
            yeuCauGioBatDau: false,
            yeuCauGioKetThuc: true,
            coTinhOT: false,
            isActive: true,
            thuTuHienThi: 3,
            mauHienThi: '#10B981',
            icon: 'clock',
        },
        {
            maLoai: 'CONG_TAC',
            tenLoai: 'Công tác',
            moTa: 'Đi công tác ngoài văn phòng',
            nhomLoai: 'DI_CHUYEN',
            yeuCauGioBatDau: false,
            yeuCauGioKetThuc: false,
            yeuCauDiaDiem: true,
            coTinhOT: false,
            isActive: true,
            thuTuHienThi: 4,
            mauHienThi: '#3B82F6',
            icon: 'briefcase',
        },
        {
            maLoai: 'LAM_TU_XA',
            tenLoai: 'Làm từ xa (WFH)',
            moTa: 'Làm việc từ xa tại nhà',
            nhomLoai: 'DI_CHUYEN',
            yeuCauGioBatDau: false,
            yeuCauGioKetThuc: false,
            yeuCauDiaDiem: false,
            coTinhOT: false,
            isActive: true,
            thuTuHienThi: 5,
            mauHienThi: '#8B5CF6',
            icon: 'home',
        },
    ];
    for (const loai of danhMucLoaiYeuCau) {
        await prisma.danhMucLoaiYeuCau.upsert({
            where: { maLoai: loai.maLoai },
            update: {
                tenLoai: loai.tenLoai,
                moTa: loai.moTa,
                nhomLoai: loai.nhomLoai,
                yeuCauGioBatDau: loai.yeuCauGioBatDau,
                yeuCauGioKetThuc: loai.yeuCauGioKetThuc,
                yeuCauDiaDiem: loai.yeuCauDiaDiem ?? false,
                coTinhOT: loai.coTinhOT,
                isActive: loai.isActive,
                thuTuHienThi: loai.thuTuHienThi,
                mauHienThi: loai.mauHienThi,
                icon: loai.icon,
            },
            create: loai,
        });
    }
    console.log('👥 Tạo nhân viên từ file chấm công...');
    const phongNhanSu = await prisma.phongBan.upsert({
        where: { maPhongBan: 'NS' },
        update: {},
        create: {
            maPhongBan: 'NS',
            tenPhongBan: 'Nhân Sự',
            moTa: 'Phòng Nhân Sự',
            gioVaoChuan: '08:00',
            gioRaChuan: '17:00',
            phutChoPhepTre: 5,
        },
    });
    createdPhongBans['NS'] = phongNhanSu.id;
    const nhanViens = [
        { maNhanVien: 'NV0003', hoTen: 'Lâm Như Ngọc', phongBanId: createdPhongBans['KT'], chucVu: 'Kế toán viên', luongCoBan: 8000000, email: 'ngoc.ln@company.vn' },
        { maNhanVien: 'NV0005', hoTen: 'Nguyễn Ái Minh Triệu', phongBanId: createdPhongBans['KT'], chucVu: 'Kế toán trưởng', luongCoBan: 12000000, email: 'trieu.nam@company.vn' },
        { maNhanVien: 'NV0006', hoTen: 'Nguyễn Thị Thanh Thúy', phongBanId: createdPhongBans['KT'], chucVu: 'Kế toán viên', luongCoBan: 8000000, email: 'thuy.ntt@company.vn' },
        { maNhanVien: 'NV0013', hoTen: 'Trần Thị Tuyết Lê', phongBanId: createdPhongBans['KDMKT'], chucVu: 'Nhân viên kinh doanh', luongCoBan: 8000000, email: 'le.ttt@company.vn' },
        { maNhanVien: 'NV0014', hoTen: 'Dư Thị Ương', phongBanId: createdPhongBans['KDMKT'], chucVu: 'Trưởng phòng KD', luongCoBan: 15000000, email: 'uong.dt@company.vn' },
        { maNhanVien: 'NV0015', hoTen: 'Sơn Thị Ngọc Huyền', phongBanId: createdPhongBans['KDMKT'], chucVu: 'Nhân viên marketing', luongCoBan: 8500000, email: 'huyen.stn@company.vn' },
        { maNhanVien: 'NV0017', hoTen: 'Trần Thị Thanh Hương', phongBanId: createdPhongBans['DH'], chucVu: 'Trưởng nhóm đơn hàng', luongCoBan: 10000000, email: 'huong.ttt@company.vn' },
        { maNhanVien: 'NV0018', hoTen: 'Trần Thị Ngọc Thanh', phongBanId: createdPhongBans['DH'], chucVu: 'Nhân viên đơn hàng', luongCoBan: 8000000, email: 'thanh.ttn@company.vn' },
        { maNhanVien: 'NV0019', hoTen: 'Bùi Thị Ái Vân', phongBanId: createdPhongBans['DH'], chucVu: 'Nhân viên đơn hàng', luongCoBan: 8500000, email: 'van.bta@company.vn' },
        { maNhanVien: 'NV0020', hoTen: 'Nguyễn Thị Thu', phongBanId: createdPhongBans['KV'], chucVu: 'Nhân viên kho', luongCoBan: 8000000, email: 'thu.nt@company.vn' },
        { maNhanVien: 'NV0021', hoTen: 'Phạm Thị Minh', phongBanId: createdPhongBans['KV'], chucVu: 'Quản lý kho', luongCoBan: 10000000, email: 'minh.pt@company.vn' },
        { maNhanVien: 'NV0024', hoTen: 'Lê Thị Thùy Trang', phongBanId: createdPhongBans['KV'], chucVu: 'Nhân viên kho', luongCoBan: 8500000, email: 'trang.ltt@company.vn' },
        { maNhanVien: 'NV0025', hoTen: 'Nguyễn Lý Hồng Ngọc', phongBanId: createdPhongBans['CH'], chucVu: 'Trưởng nhóm chia hàng', luongCoBan: 10000000, email: 'ngoc.nlh@company.vn' },
        { maNhanVien: 'NV0027', hoTen: 'Phạm Ngọc An', phongBanId: createdPhongBans['CH'], chucVu: 'Nhân viên chia hàng', luongCoBan: 8000000, email: 'an.pn@company.vn' },
        { maNhanVien: 'NV0032', hoTen: 'Nguyễn Thành Bảo', phongBanId: createdPhongBans['NS'], chucVu: 'Trưởng phòng NS', luongCoBan: 12000000, email: 'bao.nt@company.vn' },
    ];
    const createdNhanViens = {};
    for (const nv of nhanViens) {
        const created = await prisma.nhanVien.upsert({
            where: { maNhanVien: nv.maNhanVien },
            update: {},
            create: {
                ...nv,
                trangThai: client_1.TrangThaiNhanVien.DANG_LAM,
            },
        });
        createdNhanViens[nv.maNhanVien] = created.id;
    }
    console.log('📊 Tạo cơ cấu lương theo phòng ban...');
    const khoanLuongs = await prisma.khoanLuong.findMany();
    const khoanLuongMap = {};
    khoanLuongs.forEach(kl => {
        khoanLuongMap[kl.maKhoan] = kl.id;
    });
    const coCauKeToan = await prisma.coCauLuong.upsert({
        where: { id: 1 },
        update: {},
        create: {
            phongBanId: createdPhongBans['KT'],
            tenCoCau: 'Cơ cấu lương Kế toán',
        },
    });
    const coCauKinhDoanh = await prisma.coCauLuong.upsert({
        where: { id: 2 },
        update: {},
        create: {
            phongBanId: createdPhongBans['KDMKT'],
            tenCoCau: 'Cơ cấu lương Kinh doanh & Marketing',
        },
    });
    const chiTietCoCauKeToan = [
        { khoanLuongId: khoanLuongMap['LUONG_CO_BAN'], batBuoc: true, giaTriMacDinh: 0 },
        { khoanLuongId: khoanLuongMap['PHU_CAP_XANG_XE'], batBuoc: false, giaTriMacDinh: 500000 },
        { khoanLuongId: khoanLuongMap['PHU_CAP_DIEN_THOAI'], batBuoc: false, giaTriMacDinh: 300000 },
        { khoanLuongId: khoanLuongMap['HO_TRO_AN_CA'], batBuoc: true, giaTriMacDinh: 700000 },
        { khoanLuongId: khoanLuongMap['HO_TRO_CHUYEN_CAN'], batBuoc: false, giaTriMacDinh: 500000 },
    ];
    for (const ct of chiTietCoCauKeToan) {
        await prisma.coCauLuongChiTiet.upsert({
            where: {
                coCauLuongId_khoanLuongId: {
                    coCauLuongId: coCauKeToan.id,
                    khoanLuongId: ct.khoanLuongId,
                },
            },
            update: {},
            create: {
                coCauLuongId: coCauKeToan.id,
                ...ct,
            },
        });
    }
    const chiTietCoCauKinhDoanh = [
        { khoanLuongId: khoanLuongMap['LUONG_CO_BAN'], batBuoc: true, giaTriMacDinh: 0 },
        { khoanLuongId: khoanLuongMap['THUONG_KINH_DOANH'], batBuoc: false, giaTriMacDinh: 0 },
        { khoanLuongId: khoanLuongMap['PHU_CAP_XANG_XE'], batBuoc: true, giaTriMacDinh: 1000000 },
        { khoanLuongId: khoanLuongMap['PHU_CAP_DIEN_THOAI'], batBuoc: true, giaTriMacDinh: 500000 },
        { khoanLuongId: khoanLuongMap['HO_TRO_AN_CA'], batBuoc: true, giaTriMacDinh: 700000 },
    ];
    for (const ct of chiTietCoCauKinhDoanh) {
        await prisma.coCauLuongChiTiet.upsert({
            where: {
                coCauLuongId_khoanLuongId: {
                    coCauLuongId: coCauKinhDoanh.id,
                    khoanLuongId: ct.khoanLuongId,
                },
            },
            update: {},
            create: {
                coCauLuongId: coCauKinhDoanh.id,
                ...ct,
            },
        });
    }
    console.log('💰 Tạo bảng lương mẫu tháng 01/2026...');
    const bangLuongNS = await prisma.bangLuong.upsert({
        where: {
            thang_nam_phongBanId: {
                thang: 1,
                nam: 2026,
                phongBanId: createdPhongBans['NS'],
            },
        },
        update: {},
        create: {
            thang: 1,
            nam: 2026,
            phongBanId: createdPhongBans['NS'],
            tenBangLuong: 'Bảng lương Nhân Sự - Tháng 01/2026',
            trangThai: client_1.TrangThaiBangLuong.NHAP,
        },
    });
    const chiTietLuongNS = [
        { nhanVienId: createdNhanViens['NV0017'], khoanLuongId: khoanLuongMap['LUONG_CO_BAN'], soTien: 10000000 },
        { nhanVienId: createdNhanViens['NV0017'], khoanLuongId: khoanLuongMap['PHU_CAP_CHUC_VU'], soTien: 1500000 },
        { nhanVienId: createdNhanViens['NV0017'], khoanLuongId: khoanLuongMap['HO_TRO_AN_CA'], soTien: 700000 },
        { nhanVienId: createdNhanViens['NV0025'], khoanLuongId: khoanLuongMap['LUONG_CO_BAN'], soTien: 10000000 },
        { nhanVienId: createdNhanViens['NV0025'], khoanLuongId: khoanLuongMap['PHU_CAP_CHUC_VU'], soTien: 1500000 },
        { nhanVienId: createdNhanViens['NV0025'], khoanLuongId: khoanLuongMap['HO_TRO_AN_CA'], soTien: 700000 },
        { nhanVienId: createdNhanViens['NV0003'], khoanLuongId: khoanLuongMap['LUONG_CO_BAN'], soTien: 8000000 },
        { nhanVienId: createdNhanViens['NV0003'], khoanLuongId: khoanLuongMap['HO_TRO_AN_CA'], soTien: 700000 },
        { nhanVienId: createdNhanViens['NV0005'], khoanLuongId: khoanLuongMap['LUONG_CO_BAN'], soTien: 8500000 },
        { nhanVienId: createdNhanViens['NV0005'], khoanLuongId: khoanLuongMap['HO_TRO_AN_CA'], soTien: 700000 },
        { nhanVienId: createdNhanViens['NV0006'], khoanLuongId: khoanLuongMap['LUONG_CO_BAN'], soTien: 8000000 },
        { nhanVienId: createdNhanViens['NV0006'], khoanLuongId: khoanLuongMap['HO_TRO_AN_CA'], soTien: 700000 },
    ];
    for (const ct of chiTietLuongNS) {
        await prisma.chiTietBangLuong.upsert({
            where: {
                bangLuongId_nhanVienId_khoanLuongId: {
                    bangLuongId: bangLuongNS.id,
                    nhanVienId: ct.nhanVienId,
                    khoanLuongId: ct.khoanLuongId,
                },
            },
            update: { soTien: ct.soTien },
            create: {
                bangLuongId: bangLuongNS.id,
                nguon: client_1.NguonChiTiet.NHAP_TAY,
                ...ct,
            },
        });
    }
    console.log('💼 Tạo phụ cấp nhân viên...');
    const ngayBatDau = new Date('2025-01-01');
    const phuCapNhanVienData = [
        { nhanVienId: createdNhanViens['NV0017'], khoanLuongId: khoanLuongMap['PHU_CAP_CHUC_VU'], soTien: 1500000, tuNgay: ngayBatDau, ghiChu: 'Phụ cấp chức vụ Trưởng nhóm' },
        { nhanVienId: createdNhanViens['NV0017'], khoanLuongId: khoanLuongMap['HO_TRO_AN_CA'], soTien: 700000, tuNgay: ngayBatDau, ghiChu: 'Hỗ trợ ăn ca' },
        { nhanVienId: createdNhanViens['NV0025'], khoanLuongId: khoanLuongMap['PHU_CAP_CHUC_VU'], soTien: 1500000, tuNgay: ngayBatDau, ghiChu: 'Phụ cấp chức vụ Trưởng nhóm' },
        { nhanVienId: createdNhanViens['NV0025'], khoanLuongId: khoanLuongMap['HO_TRO_AN_CA'], soTien: 700000, tuNgay: ngayBatDau, ghiChu: 'Hỗ trợ ăn ca' },
        { nhanVienId: createdNhanViens['NV0003'], khoanLuongId: khoanLuongMap['HO_TRO_AN_CA'], soTien: 700000, tuNgay: ngayBatDau, ghiChu: 'Hỗ trợ ăn ca' },
        { nhanVienId: createdNhanViens['NV0005'], khoanLuongId: khoanLuongMap['HO_TRO_AN_CA'], soTien: 700000, tuNgay: ngayBatDau, ghiChu: 'Hỗ trợ ăn ca' },
        { nhanVienId: createdNhanViens['NV0006'], khoanLuongId: khoanLuongMap['HO_TRO_AN_CA'], soTien: 700000, tuNgay: ngayBatDau, ghiChu: 'Hỗ trợ ăn ca' },
        { nhanVienId: createdNhanViens['NV0013'], khoanLuongId: khoanLuongMap['HO_TRO_AN_CA'], soTien: 700000, tuNgay: ngayBatDau, ghiChu: 'Hỗ trợ ăn ca' },
        { nhanVienId: createdNhanViens['NV0014'], khoanLuongId: khoanLuongMap['HO_TRO_AN_CA'], soTien: 700000, tuNgay: ngayBatDau, ghiChu: 'Hỗ trợ ăn ca' },
        { nhanVienId: createdNhanViens['NV0015'], khoanLuongId: khoanLuongMap['HO_TRO_AN_CA'], soTien: 700000, tuNgay: ngayBatDau, ghiChu: 'Hỗ trợ ăn ca' },
        { nhanVienId: createdNhanViens['NV0018'], khoanLuongId: khoanLuongMap['HO_TRO_AN_CA'], soTien: 700000, tuNgay: ngayBatDau, ghiChu: 'Hỗ trợ ăn ca' },
        { nhanVienId: createdNhanViens['NV0019'], khoanLuongId: khoanLuongMap['HO_TRO_AN_CA'], soTien: 700000, tuNgay: ngayBatDau, ghiChu: 'Hỗ trợ ăn ca' },
        { nhanVienId: createdNhanViens['NV0020'], khoanLuongId: khoanLuongMap['HO_TRO_AN_CA'], soTien: 700000, tuNgay: ngayBatDau, ghiChu: 'Hỗ trợ ăn ca' },
        { nhanVienId: createdNhanViens['NV0021'], khoanLuongId: khoanLuongMap['HO_TRO_AN_CA'], soTien: 700000, tuNgay: ngayBatDau, ghiChu: 'Hỗ trợ ăn ca' },
        { nhanVienId: createdNhanViens['NV0024'], khoanLuongId: khoanLuongMap['HO_TRO_AN_CA'], soTien: 700000, tuNgay: ngayBatDau, ghiChu: 'Hỗ trợ ăn ca' },
        { nhanVienId: createdNhanViens['NV0027'], khoanLuongId: khoanLuongMap['HO_TRO_AN_CA'], soTien: 700000, tuNgay: ngayBatDau, ghiChu: 'Hỗ trợ ăn ca' },
        { nhanVienId: createdNhanViens['NV0032'], khoanLuongId: khoanLuongMap['HO_TRO_AN_CA'], soTien: 700000, tuNgay: ngayBatDau, ghiChu: 'Hỗ trợ ăn ca' },
    ];
    for (const pc of phuCapNhanVienData) {
        await prisma.phuCapNhanVien.create({
            data: {
                ...pc,
                trangThai: client_1.TrangThaiPhuCap.HIEU_LUC,
                nguoiTao: 'Hệ thống',
            },
        });
    }
    console.log('📎 Tạo mapping Excel mẫu...');
    const mappingExcel = [
        { tenMapping: 'Mapping chuẩn', tenCotExcel: 'Mã NV', truongHeThong: 'ma_nhan_vien', thuTuCot: 1 },
        { tenMapping: 'Mapping chuẩn', tenCotExcel: 'Họ tên', truongHeThong: 'ho_ten', thuTuCot: 2 },
        { tenMapping: 'Mapping chuẩn', tenCotExcel: 'Phòng ban', truongHeThong: 'phong_ban', thuTuCot: 3 },
        { tenMapping: 'Mapping chuẩn', tenCotExcel: 'Lương CB', khoanLuongId: khoanLuongMap['LUONG_CO_BAN'], thuTuCot: 4 },
        { tenMapping: 'Mapping chuẩn', tenCotExcel: 'Thưởng HS', khoanLuongId: khoanLuongMap['THUONG_HIEU_SUAT'], thuTuCot: 5 },
        { tenMapping: 'Mapping chuẩn', tenCotExcel: 'PC Xăng xe', khoanLuongId: khoanLuongMap['PHU_CAP_XANG_XE'], thuTuCot: 6 },
        { tenMapping: 'Mapping chuẩn', tenCotExcel: 'PC Điện thoại', khoanLuongId: khoanLuongMap['PHU_CAP_DIEN_THOAI'], thuTuCot: 7 },
        { tenMapping: 'Mapping chuẩn', tenCotExcel: 'HT Chuyên cần', khoanLuongId: khoanLuongMap['HO_TRO_CHUYEN_CAN'], thuTuCot: 8 },
        { tenMapping: 'Mapping chuẩn', tenCotExcel: 'HT Ăn ca', khoanLuongId: khoanLuongMap['HO_TRO_AN_CA'], thuTuCot: 9 },
        { tenMapping: 'Mapping chuẩn', tenCotExcel: 'Thưởng KD', khoanLuongId: khoanLuongMap['THUONG_KINH_DOANH'], thuTuCot: 10 },
    ];
    for (const mapping of mappingExcel) {
        await prisma.mappingExcel.create({
            data: mapping,
        });
    }
    console.log('⚙️ Tạo cấu hình BHXH/Thuế TNCN...');
    await prisma.cauHinhBHXH.upsert({
        where: { nam: 2025 },
        update: {},
        create: {
            nam: 2025,
            tyLeBHXH_NV: 8,
            tyLeBHXH_DN: 17.5,
            tyLeBHYT_NV: 1.5,
            tyLeBHYT_DN: 3,
            tyLeBHTN_NV: 1,
            tyLeBHTN_DN: 1,
            luongCoBanToiThieu: 4680000,
            tranDongBHXH: 46800000,
            luongCoSo: 2340000,
        },
    });
    await prisma.cauHinhBHXH.upsert({
        where: { nam: 2026 },
        update: {},
        create: {
            nam: 2026,
            tyLeBHXH_NV: 8,
            tyLeBHXH_DN: 17.5,
            tyLeBHYT_NV: 1.5,
            tyLeBHYT_DN: 3,
            tyLeBHTN_NV: 1,
            tyLeBHTN_DN: 1,
            luongCoBanToiThieu: 4960000,
            tranDongBHXH: 49600000,
            luongCoSo: 2480000,
        },
    });
    const cauHinhThue2025 = await prisma.cauHinhThueTNCN.upsert({
        where: { nam: 2025 },
        update: {},
        create: {
            nam: 2025,
            giamTruBanThan: 11000000,
            giamTruPhuThuoc: 4400000,
        },
    });
    const cauHinhThue2026 = await prisma.cauHinhThueTNCN.upsert({
        where: { nam: 2026 },
        update: {},
        create: {
            nam: 2026,
            giamTruBanThan: 11000000,
            giamTruPhuThuoc: 4400000,
        },
    });
    const bacThue = [
        { bac: 1, tuMuc: 0, denMuc: 5000000, thueSuat: 5, soTienTruNhanh: 0 },
        { bac: 2, tuMuc: 5000000, denMuc: 10000000, thueSuat: 10, soTienTruNhanh: 250000 },
        { bac: 3, tuMuc: 10000000, denMuc: 18000000, thueSuat: 15, soTienTruNhanh: 750000 },
        { bac: 4, tuMuc: 18000000, denMuc: 32000000, thueSuat: 20, soTienTruNhanh: 1650000 },
        { bac: 5, tuMuc: 32000000, denMuc: 52000000, thueSuat: 25, soTienTruNhanh: 3250000 },
        { bac: 6, tuMuc: 52000000, denMuc: 80000000, thueSuat: 30, soTienTruNhanh: 5850000 },
        { bac: 7, tuMuc: 80000000, denMuc: null, thueSuat: 35, soTienTruNhanh: 9850000 },
    ];
    for (const cauHinhThue of [cauHinhThue2025, cauHinhThue2026]) {
        for (const bt of bacThue) {
            await prisma.bacThueTNCN.upsert({
                where: {
                    cauHinhThueId_bac: {
                        cauHinhThueId: cauHinhThue.id,
                        bac: bt.bac,
                    },
                },
                update: bt,
                create: {
                    cauHinhThueId: cauHinhThue.id,
                    ...bt,
                },
            });
        }
    }
    console.log('👨‍👩‍👧 Tạo người phụ thuộc mẫu...');
    await prisma.nguoiPhuThuoc.createMany({
        data: [
            {
                nhanVienId: createdNhanViens['NV0017'],
                hoTen: 'Trần Văn Hùng',
                quanHe: 'Chồng',
                tuNgay: new Date('2020-01-01'),
                trangThai: true,
            },
            {
                nhanVienId: createdNhanViens['NV0017'],
                hoTen: 'Trần Thị Mai',
                quanHe: 'Con',
                ngaySinh: new Date('2019-08-15'),
                tuNgay: new Date('2019-09-01'),
                trangThai: true,
            },
        ],
        skipDuplicates: true,
    });
    await prisma.nguoiPhuThuoc.create({
        data: {
            nhanVienId: createdNhanViens['NV0025'],
            hoTen: 'Nguyễn Thị Lan',
            quanHe: 'Mẹ',
            ngaySinh: new Date('1958-03-20'),
            tuNgay: new Date('2022-01-01'),
            trangThai: true,
        },
    });
    console.log('🔐 Tạo quyền mặc định...');
    const quyenMacDinh = [
        { maQuyen: 'NHAN_VIEN_XEM', tenQuyen: 'Xem nhân viên', nhomQuyen: 'NHAN_VIEN' },
        { maQuyen: 'NHAN_VIEN_TAO', tenQuyen: 'Tạo nhân viên', nhomQuyen: 'NHAN_VIEN' },
        { maQuyen: 'NHAN_VIEN_SUA', tenQuyen: 'Sửa nhân viên', nhomQuyen: 'NHAN_VIEN' },
        { maQuyen: 'NHAN_VIEN_XOA', tenQuyen: 'Xóa nhân viên', nhomQuyen: 'NHAN_VIEN' },
        { maQuyen: 'LUONG_XEM', tenQuyen: 'Xem bảng lương', nhomQuyen: 'LUONG' },
        { maQuyen: 'LUONG_TAO', tenQuyen: 'Tạo bảng lương', nhomQuyen: 'LUONG' },
        { maQuyen: 'LUONG_SUA', tenQuyen: 'Sửa bảng lương', nhomQuyen: 'LUONG' },
        { maQuyen: 'LUONG_CHOT', tenQuyen: 'Chốt bảng lương', nhomQuyen: 'LUONG' },
        { maQuyen: 'LUONG_MO_KHOA', tenQuyen: 'Mở khóa bảng lương', nhomQuyen: 'LUONG' },
        { maQuyen: 'KPI_XEM', tenQuyen: 'Xem KPI', nhomQuyen: 'KPI' },
        { maQuyen: 'KPI_NHAP', tenQuyen: 'Nhập kết quả KPI', nhomQuyen: 'KPI' },
        { maQuyen: 'KPI_DUYET', tenQuyen: 'Duyệt KPI', nhomQuyen: 'KPI' },
        { maQuyen: 'KPI_CAU_HINH', tenQuyen: 'Cấu hình KPI', nhomQuyen: 'KPI' },
        { maQuyen: 'CHAM_CONG_XEM', tenQuyen: 'Xem chấm công', nhomQuyen: 'CHAM_CONG' },
        { maQuyen: 'CHAM_CONG_NHAP', tenQuyen: 'Nhập chấm công', nhomQuyen: 'CHAM_CONG' },
        { maQuyen: 'CHAM_CONG_IMPORT', tenQuyen: 'Import chấm công', nhomQuyen: 'CHAM_CONG' },
        { maQuyen: 'BAO_CAO_XEM', tenQuyen: 'Xem báo cáo', nhomQuyen: 'BAO_CAO' },
        { maQuyen: 'BAO_CAO_XUAT', tenQuyen: 'Xuất báo cáo', nhomQuyen: 'BAO_CAO' },
        { maQuyen: 'CAU_HINH_XEM', tenQuyen: 'Xem cấu hình', nhomQuyen: 'HE_THONG' },
        { maQuyen: 'CAU_HINH_SUA', tenQuyen: 'Sửa cấu hình', nhomQuyen: 'HE_THONG' },
        { maQuyen: 'NGUOI_DUNG_QUAN_LY', tenQuyen: 'Quản lý người dùng', nhomQuyen: 'HE_THONG' },
        { maQuyen: 'AUDIT_XEM', tenQuyen: 'Xem audit log', nhomQuyen: 'HE_THONG' },
    ];
    for (const q of quyenMacDinh) {
        await prisma.quyen.upsert({
            where: { maQuyen: q.maQuyen },
            update: {},
            create: q,
        });
    }
    const tatCaQuyen = await prisma.quyen.findMany();
    console.log('👤 Tạo vai trò mặc định...');
    const vaiTroConfigs = [
        {
            maVaiTro: 'ADMIN',
            tenVaiTro: 'Quản trị viên',
            moTa: 'Toàn quyền hệ thống',
            capDo: 100,
            quyens: tatCaQuyen.map(q => q.maQuyen),
        },
        {
            maVaiTro: 'HR',
            tenVaiTro: 'Nhân sự',
            moTa: 'Quản lý nhân viên, KPI',
            capDo: 80,
            quyens: ['NHAN_VIEN_XEM', 'NHAN_VIEN_TAO', 'NHAN_VIEN_SUA', 'KPI_XEM', 'KPI_NHAP', 'KPI_DUYET', 'CHAM_CONG_XEM', 'CHAM_CONG_NHAP', 'BAO_CAO_XEM'],
        },
        {
            maVaiTro: 'ACCOUNTANT',
            tenVaiTro: 'Kế toán',
            moTa: 'Quản lý lương, BHXH, thuế',
            capDo: 80,
            quyens: ['NHAN_VIEN_XEM', 'LUONG_XEM', 'LUONG_TAO', 'LUONG_SUA', 'LUONG_CHOT', 'CHAM_CONG_XEM', 'BAO_CAO_XEM', 'BAO_CAO_XUAT'],
        },
        {
            maVaiTro: 'MANAGER',
            tenVaiTro: 'Quản lý',
            moTa: 'Quản lý phòng ban',
            capDo: 60,
            quyens: ['NHAN_VIEN_XEM', 'LUONG_XEM', 'KPI_XEM', 'KPI_NHAP', 'CHAM_CONG_XEM', 'BAO_CAO_XEM'],
        },
        {
            maVaiTro: 'EMPLOYEE',
            tenVaiTro: 'Nhân viên',
            moTa: 'Xem thông tin cá nhân',
            capDo: 10,
            quyens: [],
        },
    ];
    for (const vtConfig of vaiTroConfigs) {
        const vaiTro = await prisma.vaiTro.upsert({
            where: { maVaiTro: vtConfig.maVaiTro },
            update: {
                tenVaiTro: vtConfig.tenVaiTro,
                moTa: vtConfig.moTa,
                capDo: vtConfig.capDo,
            },
            create: {
                maVaiTro: vtConfig.maVaiTro,
                tenVaiTro: vtConfig.tenVaiTro,
                moTa: vtConfig.moTa,
                capDo: vtConfig.capDo,
            },
        });
        await prisma.vaiTroQuyen.deleteMany({
            where: { vaiTroId: vaiTro.id },
        });
        const quyenIds = tatCaQuyen
            .filter(q => vtConfig.quyens.includes(q.maQuyen))
            .map(q => q.id);
        for (const quyenId of quyenIds) {
            await prisma.vaiTroQuyen.create({
                data: {
                    vaiTroId: vaiTro.id,
                    quyenId,
                },
            });
        }
    }
    console.log('👨‍💼 Tạo admin mặc định...');
    const vaiTroAdmin = await prisma.vaiTro.findUnique({
        where: { maVaiTro: 'ADMIN' },
    });
    const crypto = await Promise.resolve().then(() => require('crypto'));
    const matKhauHash = crypto.createHash('sha256').update('admin123').digest('hex');
    const admin = await prisma.nguoiDung.upsert({
        where: { tenDangNhap: 'admin' },
        update: {},
        create: {
            tenDangNhap: 'admin',
            matKhau: matKhauHash,
            email: 'admin@company.com',
            hoTen: 'Administrator',
        },
    });
    if (vaiTroAdmin) {
        const existingRole = await prisma.nguoiDungVaiTro.findFirst({
            where: {
                nguoiDungId: admin.id,
                vaiTroId: vaiTroAdmin.id,
            },
        });
        if (!existingRole) {
            await prisma.nguoiDungVaiTro.create({
                data: {
                    nguoiDungId: admin.id,
                    vaiTroId: vaiTroAdmin.id,
                },
            });
        }
    }
    console.log('🏆 Tạo cấu hình thưởng KPI mặc định...');
    const cauHinhThuong = [
        { nam: 2025, xepLoai: client_1.XepLoaiKPI.XUAT_SAC, diemToiThieu: 95, diemToiDa: 150, heSoThuong: 2.0, moTa: 'Xuất sắc - 2x lương' },
        { nam: 2025, xepLoai: client_1.XepLoaiKPI.TOT, diemToiThieu: 80, diemToiDa: 94.99, heSoThuong: 1.5, moTa: 'Tốt - 1.5x lương' },
        { nam: 2025, xepLoai: client_1.XepLoaiKPI.KHA, diemToiThieu: 65, diemToiDa: 79.99, heSoThuong: 1.0, moTa: 'Khá - 1x lương' },
        { nam: 2025, xepLoai: client_1.XepLoaiKPI.TRUNG_BINH, diemToiThieu: 50, diemToiDa: 64.99, heSoThuong: 0.5, moTa: 'Trung bình - 0.5x lương' },
        { nam: 2025, xepLoai: client_1.XepLoaiKPI.YEU, diemToiThieu: 0, diemToiDa: 49.99, heSoThuong: 0, moTa: 'Yếu - không thưởng' },
        { nam: 2026, xepLoai: client_1.XepLoaiKPI.XUAT_SAC, diemToiThieu: 95, diemToiDa: 150, heSoThuong: 2.0, moTa: 'Xuất sắc - 2x lương' },
        { nam: 2026, xepLoai: client_1.XepLoaiKPI.TOT, diemToiThieu: 80, diemToiDa: 94.99, heSoThuong: 1.5, moTa: 'Tốt - 1.5x lương' },
        { nam: 2026, xepLoai: client_1.XepLoaiKPI.KHA, diemToiThieu: 65, diemToiDa: 79.99, heSoThuong: 1.0, moTa: 'Khá - 1x lương' },
        { nam: 2026, xepLoai: client_1.XepLoaiKPI.TRUNG_BINH, diemToiThieu: 50, diemToiDa: 64.99, heSoThuong: 0.5, moTa: 'Trung bình - 0.5x lương' },
        { nam: 2026, xepLoai: client_1.XepLoaiKPI.YEU, diemToiThieu: 0, diemToiDa: 49.99, heSoThuong: 0, moTa: 'Yếu - không thưởng' },
    ];
    for (const ch of cauHinhThuong) {
        await prisma.cauHinhThuongKPI.upsert({
            where: {
                nam_xepLoai: {
                    nam: ch.nam,
                    xepLoai: ch.xepLoai,
                },
            },
            update: {
                diemToiThieu: ch.diemToiThieu,
                diemToiDa: ch.diemToiDa,
                heSoThuong: ch.heSoThuong,
                moTa: ch.moTa,
            },
            create: ch,
        });
    }
    console.log('📋 Tạo template KPI mẫu...');
    const templateNS = await prisma.templateKPI.upsert({
        where: { maTemplate: 'TPL-NS' },
        update: {},
        create: {
            maTemplate: 'TPL-NS',
            tenTemplate: 'Template KPI Nhân Sự',
            phongBanId: createdPhongBans['NS'],
            moTa: 'KPI đánh giá nhân viên phòng Nhân Sự',
        },
    });
    const chiTieuNS = [
        { maChiTieu: 'CHUYEN_CAN', tenChiTieu: 'Chuyên cần', donViTinh: '%', trongSo: 30, loaiChiTieu: client_1.LoaiChiTieuKPI.PHAN_TRAM, chiTieuToiThieu: 80, chiTieuMucTieu: 95, chiTieuVuotMuc: 100, thuTu: 1 },
        { maChiTieu: 'CHAT_LUONG_CV', tenChiTieu: 'Chất lượng công việc', donViTinh: 'Điểm', trongSo: 35, loaiChiTieu: client_1.LoaiChiTieuKPI.DANH_GIA, chiTieuToiThieu: 3, chiTieuMucTieu: 4, chiTieuVuotMuc: 5, thuTu: 2 },
        { maChiTieu: 'TIEN_DO', tenChiTieu: 'Tiến độ hoàn thành', donViTinh: '%', trongSo: 25, loaiChiTieu: client_1.LoaiChiTieuKPI.PHAN_TRAM, chiTieuToiThieu: 80, chiTieuMucTieu: 100, chiTieuVuotMuc: 120, thuTu: 3 },
        { maChiTieu: 'SANG_KIEN', tenChiTieu: 'Sáng kiến, đề xuất', donViTinh: 'Số', trongSo: 10, loaiChiTieu: client_1.LoaiChiTieuKPI.SO, chiTieuToiThieu: 0, chiTieuMucTieu: 2, chiTieuVuotMuc: 5, thuTu: 4 },
    ];
    for (const ct of chiTieuNS) {
        await prisma.chiTieuKPI.upsert({
            where: {
                templateId_maChiTieu: {
                    templateId: templateNS.id,
                    maChiTieu: ct.maChiTieu,
                },
            },
            update: {
                tenChiTieu: ct.tenChiTieu,
                donViTinh: ct.donViTinh,
                trongSo: ct.trongSo,
                chiTieuToiThieu: ct.chiTieuToiThieu,
                chiTieuMucTieu: ct.chiTieuMucTieu,
                chiTieuVuotMuc: ct.chiTieuVuotMuc,
                thuTu: ct.thuTu,
            },
            create: {
                templateId: templateNS.id,
                ...ct,
            },
        });
    }
    const templateChung = await prisma.templateKPI.upsert({
        where: { maTemplate: 'TPL-CHUNG' },
        update: {},
        create: {
            maTemplate: 'TPL-CHUNG',
            tenTemplate: 'Template KPI chung',
            moTa: 'KPI đánh giá chung cho nhân viên các phòng ban',
        },
    });
    const chiTieuChung = [
        { maChiTieu: 'CHUYEN_CAN', tenChiTieu: 'Chuyên cần', donViTinh: '%', trongSo: 25, loaiChiTieu: client_1.LoaiChiTieuKPI.PHAN_TRAM, chiTieuToiThieu: 80, chiTieuMucTieu: 95, chiTieuVuotMuc: 100, thuTu: 1 },
        { maChiTieu: 'CHAT_LUONG_CV', tenChiTieu: 'Chất lượng công việc', donViTinh: 'Điểm', trongSo: 35, loaiChiTieu: client_1.LoaiChiTieuKPI.DANH_GIA, chiTieuToiThieu: 3, chiTieuMucTieu: 4, chiTieuVuotMuc: 5, thuTu: 2 },
        { maChiTieu: 'TIEN_DO', tenChiTieu: 'Tiến độ hoàn thành', donViTinh: '%', trongSo: 25, loaiChiTieu: client_1.LoaiChiTieuKPI.PHAN_TRAM, chiTieuToiThieu: 80, chiTieuMucTieu: 100, chiTieuVuotMuc: 120, thuTu: 3 },
        { maChiTieu: 'SANG_KIEN', tenChiTieu: 'Sáng kiến, đề xuất', donViTinh: 'Số', trongSo: 15, loaiChiTieu: client_1.LoaiChiTieuKPI.SO, chiTieuToiThieu: 0, chiTieuMucTieu: 2, chiTieuVuotMuc: 5, thuTu: 4 },
    ];
    for (const ct of chiTieuChung) {
        await prisma.chiTieuKPI.upsert({
            where: {
                templateId_maChiTieu: {
                    templateId: templateChung.id,
                    maChiTieu: ct.maChiTieu,
                },
            },
            update: {
                tenChiTieu: ct.tenChiTieu,
                donViTinh: ct.donViTinh,
                trongSo: ct.trongSo,
                chiTieuToiThieu: ct.chiTieuToiThieu,
                chiTieuMucTieu: ct.chiTieuMucTieu,
                chiTieuVuotMuc: ct.chiTieuVuotMuc,
                thuTu: ct.thuTu,
            },
            create: {
                templateId: templateChung.id,
                ...ct,
            },
        });
    }
    console.log('✅ Seed dữ liệu hoàn tất!');
    console.log('📊 Thống kê:');
    console.log(`   - Khoản lương: ${danhMucKhoanLuong.length}`);
    console.log(`   - Phòng ban: ${phongBans.length + 1} (+ Nhân Sự)`);
    console.log(`   - Loại nghỉ: ${danhMucLoaiNghi.length}`);
    console.log(`   - Nhân viên: ${nhanViens.length} (từ file chấm công)`);
    console.log(`   - Phụ cấp nhân viên: ${phuCapNhanVienData.length}`);
    console.log(`   - Bảng lương mẫu: 1 (Nhân Sự)`);
    console.log(`   - Cấu hình BHXH: 2 năm (2025, 2026)`);
    console.log(`   - Cấu hình Thuế TNCN: 2 năm (2025, 2026)`);
    console.log(`   - Người phụ thuộc: 3`);
    console.log(`   - Quyền: ${quyenMacDinh.length}`);
    console.log(`   - Vai trò: ${vaiTroConfigs.length}`);
    console.log(`   - Cấu hình thưởng KPI: ${cauHinhThuong.length}`);
    console.log(`   - Template KPI: 2`);
    console.log(`   - Admin mặc định: admin/admin123`);
}
main()
    .catch((e) => {
    console.error('❌ Lỗi khi seed dữ liệu:', e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map