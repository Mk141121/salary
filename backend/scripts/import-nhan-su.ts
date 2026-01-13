// Script import nhân sự từ CSV
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Dữ liệu từ file CSV
const csvData = `ID;*Tên riêng;*Họ;Phòng ban
NV0001;MỘNG CHÚC ANH;ĐỖ;Kế Toán
NV0002;THÀNH HOÀNG;LÊ;Kế Toán
NV0003;NHƯ NGỌC;LÂM;Kế Toán
NV0004;THÚY DUY;PHẠM;Kế Toán
NV0005;ÁI MINH TRIỆU;NGUYỄN;Kinh Doanh
NV0006;THỊ THANH THÚY;NGUYỄN;Kinh Doanh
NV0007;MINH MẪN;PHẠM;Đơn hàng
NV0008;HUỲNH THẠCH QUÝ;LÂM;Đơn hàng
NV0009;ÁI KHANH;NGUYỄN;Đơn hàng
NV0010;VŨ HOÀNG;NGUYỄN;Đơn hàng
NV0011;THỊ DIỆU LINH;TRẦN;Kế Toán
NV0012;HỒ HỮU NHÂN;TRẦN;Kho vận
NV0013;THỊ TUYẾT LÊ;TRẦN;Chia hàng
NV0014;THỊ ƯƠNG;DƯ;Chia hàng
NV0015;THỊ NGỌC HUYỀN;SƠN;Chia hàng
NV0016;THỊ BÍCH DUNG;VÕ;Chia hàng
NV0017;THỊ THANH HƯƠNG;TRẦN;Chia hàng
NV0018;THỊ NGỌC THANH;TRẦN;Chia hàng
NV0019;THỊ ÁI VÂN;BÙI;Chia hàng
NV0020;THỊ THU;NGUYỄN;Chia hàng
NV0021;THỊ MINH;PHẠM;Chia hàng
NV0022;THỊ BÉ;CHÂU;Chia hàng
NV0023;NGỌC KIM VĂN;NGUYỄN;Chia hàng
NV0024;THỊ THÙY TRANG;LÊ;Chia hàng
NV0025;LÝ HỒNG NGỌC;NGUYỄN;Chia hàng
NV0026;NHẬT TUẤN;NGUYỄN;Giao hàng
NV0027;NGỌC AN;PHẠM;Giao hàng
NV0028;HÙNG;HOÀNG;Giao hàng
NV0029;ĐỨC TÚ;TRẦN;Giao hàng
NV0030;QUỐC VŨ;TRẦN;Kho vận
NV0032;THÀNH BẢO;NGUYỄN;Kho vận`;

interface NhanSuCSV {
  maNhanVien: string;
  tenRieng: string;
  ho: string;
  phongBan: string;
}

function parseCSV(csv: string): NhanSuCSV[] {
  const lines = csv.trim().split('\n');
  const result: NhanSuCSV[] = [];

  // Bỏ qua header
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const [maNV, tenRieng, ho, phongBan] = line.split(';').map(s => s?.trim() || '');
    
    // Bỏ qua dòng rỗng hoặc không có mã NV
    if (!maNV || maNV === '') continue;

    result.push({
      maNhanVien: maNV,
      tenRieng: tenRieng,
      ho: ho,
      phongBan: phongBan || 'Chưa phân bổ',
    });
  }

  return result;
}

async function main() {
  console.log('=== BẮT ĐẦU IMPORT NHÂN SỰ ===\n');

  const nhanSuList = parseCSV(csvData);
  console.log(`Tổng số nhân viên cần import: ${nhanSuList.length}`);

  // 1. Tạo danh sách phòng ban unique
  const phongBanSet = new Set(nhanSuList.map(nv => nv.phongBan));
  console.log(`\nCác phòng ban: ${[...phongBanSet].join(', ')}`);

  // 2. Tạo/cập nhật phòng ban
  console.log('\n--- Xử lý phòng ban ---');
  const phongBanMap = new Map<string, number>();

  for (const tenPB of phongBanSet) {
    // Tìm phòng ban theo tên
    let phongBan = await prisma.phongBan.findFirst({
      where: { tenPhongBan: tenPB },
    });

    if (!phongBan) {
      // Tạo mã phòng ban từ tên
      const maPB = tenPB
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd')
        .replace(/Đ/g, 'D')
        .replace(/\s+/g, '_')
        .toUpperCase()
        .substring(0, 10);

      phongBan = await prisma.phongBan.create({
        data: {
          maPhongBan: maPB,
          tenPhongBan: tenPB,
          moTa: `Phòng ${tenPB}`,
        },
      });
      console.log(`✅ Tạo mới phòng ban: ${tenPB} (${maPB})`);
    } else {
      console.log(`📋 Phòng ban đã tồn tại: ${tenPB}`);
    }

    phongBanMap.set(tenPB, phongBan.id);
  }

  // 3. Xóa tất cả nhân viên cũ (nếu cần reset)
  console.log('\n--- Xóa dữ liệu nhân viên cũ ---');
  
  // Xóa các bản ghi liên quan trước (theo thứ tự dependency)
  await prisma.nguoiPhuThuoc.deleteMany({});
  await prisma.bangTinhThue.deleteMany({});
  await prisma.bangTinhBHXH.deleteMany({});
  await prisma.chiTietPhieuDieuChinh.deleteMany({});
  await prisma.phieuDieuChinh.deleteMany({});
  await prisma.snapshotBangLuong.deleteMany({});
  await prisma.phuCapNhanVien.deleteMany({});
  await prisma.chiTietChamCong.deleteMany({});
  await prisma.chamCong.deleteMany({});
  await prisma.ngayCongBangLuong.deleteMany({});
  await prisma.lichSuChinhSua.deleteMany({});
  await prisma.chiTietBangLuong.deleteMany({});
  await prisma.bangLuong.deleteMany({});
  await prisma.nhanVien.deleteMany({});
  console.log('✅ Đã xóa dữ liệu nhân viên cũ');

  // 4. Tạo nhân viên mới
  console.log('\n--- Tạo nhân viên mới ---');
  let created = 0;

  for (const nv of nhanSuList) {
    const phongBanId = phongBanMap.get(nv.phongBan);
    if (!phongBanId) {
      console.log(`❌ Không tìm thấy phòng ban: ${nv.phongBan} cho NV ${nv.maNhanVien}`);
      continue;
    }

    // Tạo họ tên đầy đủ: Họ + Tên riêng
    const hoTen = `${nv.ho} ${nv.tenRieng}`.trim();

    await prisma.nhanVien.create({
      data: {
        maNhanVien: nv.maNhanVien,
        hoTen: hoTen,
        phongBanId: phongBanId,
        luongCoBan: 5000000, // Mặc định 5 triệu
        trangThai: 'DANG_LAM',
      },
    });

    created++;
    console.log(`✅ ${nv.maNhanVien}: ${hoTen} - ${nv.phongBan}`);
  }

  console.log(`\n=== HOÀN THÀNH ===`);
  console.log(`Đã tạo ${created} nhân viên`);

  // Thống kê
  const stats = await prisma.nhanVien.groupBy({
    by: ['phongBanId'],
    _count: true,
  });

  console.log('\n--- Thống kê theo phòng ban ---');
  for (const stat of stats) {
    const pb = await prisma.phongBan.findUnique({ where: { id: stat.phongBanId } });
    console.log(`${pb?.tenPhongBan}: ${stat._count} nhân viên`);
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
