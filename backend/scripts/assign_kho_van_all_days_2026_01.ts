import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const TARGET_MONTH = '2026-01';
const INCLUDE_WEEKENDS = true; // User requested include T7/CN
const KHO_VAN_KEYWORD = 'kho van';
const APPLY = process.env.APPLY === '1';

const normalize = (value: string) =>
  value
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();

const getMonthRange = (thangNam: string) => {
  const [year, month] = thangNam.split('-').map(Number);
  const start = new Date(year, month - 1, 1);
  const end = new Date(year, month, 0);
  return { start, end };
};

const getDatesInRange = (start: Date, end: Date, includeWeekends: boolean) => {
  const dates: Date[] = [];
  const current = new Date(start);
  while (current <= end) {
    const dayOfWeek = current.getDay(); // 0=CN
    if (includeWeekends || (dayOfWeek >= 1 && dayOfWeek <= 5)) {
      dates.push(new Date(current));
    }
    current.setDate(current.getDate() + 1);
  }
  return dates;
};

const buildKhoVanPhongBanIds = (phongBans: { id: number; tenPhongBan: string; phongBanChaId: number | null }[]) => {
  const byParent = new Map<number, number[]>();
  for (const pb of phongBans) {
    if (pb.phongBanChaId != null) {
      const list = byParent.get(pb.phongBanChaId) || [];
      list.push(pb.id);
      byParent.set(pb.phongBanChaId, list);
    }
  }

  const matchedRoots = phongBans
    .filter((pb) => normalize(pb.tenPhongBan).includes(KHO_VAN_KEYWORD))
    .map((pb) => pb.id);

  const result = new Set<number>(matchedRoots);
  const stack = [...matchedRoots];
  while (stack.length > 0) {
    const current = stack.pop()!;
    const children = byParent.get(current) || [];
    for (const childId of children) {
      if (!result.has(childId)) {
        result.add(childId);
        stack.push(childId);
      }
    }
  }

  return Array.from(result.values());
};

async function main() {
  console.log('🗓️  Assign lịch làm việc Kho Vận');
  console.log(`- Tháng: ${TARGET_MONTH}`);
  console.log(`- Include T7/CN: ${INCLUDE_WEEKENDS ? 'YES' : 'NO'}`);
  console.log(`- APPLY: ${APPLY ? 'YES' : 'NO (dry run)'}`);

  const phongBans = await prisma.phongBan.findMany({
    select: { id: true, tenPhongBan: true, phongBanChaId: true },
  });

  const khoVanPhongBanIds = buildKhoVanPhongBanIds(phongBans);
  if (khoVanPhongBanIds.length === 0) {
    console.log('⚠️  Không tìm thấy phòng ban thuộc Kho Vận.');
    return;
  }

  console.log(`- Phòng ban thuộc Kho Vận: ${khoVanPhongBanIds.join(', ')}`);

  const { start, end } = getMonthRange(TARGET_MONTH);
  const dates = getDatesInRange(start, end, INCLUDE_WEEKENDS);
  console.log(`- Tổng ngày trong tháng để phân ca: ${dates.length}`);

  for (const phongBanId of khoVanPhongBanIds) {
    const phongBan = phongBans.find((pb) => pb.id === phongBanId);
    const label = phongBan ? `${phongBan.tenPhongBan} (#${phongBanId})` : `#${phongBanId}`;

    const lichExisting = await prisma.lichPhanCa.findFirst({
      where: {
        thangNam: TARGET_MONTH,
        phongBanId,
        nhomId: null,
        trangThai: { not: 'HUY' },
      },
    });

    const lich = lichExisting
      ? lichExisting
      : !APPLY
        ? null
        : await prisma.lichPhanCa.create({
            data: {
              thangNam: TARGET_MONTH,
              phongBanId,
              tenLich: `Lịch phân ca ${TARGET_MONTH} - Kho Vận`,
              ghiChu: 'Auto assign tất cả ngày trong tháng (Kho Vận)',
            },
          });

    const nhanViens = await prisma.nhanVien.findMany({
      where: { phongBanId, trangThai: 'DANG_LAM' },
      select: { id: true, hoTen: true },
      orderBy: { id: 'asc' },
    });

    if (nhanViens.length === 0) {
      console.log(`- ${label}: Không có nhân viên DANG_LAM. Bỏ qua.`);
      continue;
    }

    const caLamViecs = await prisma.caLamViec.findMany({
      where: {
        trangThai: true,
        OR: [{ phongBanId: null }, { phongBanId }],
      },
      select: { id: true, maCa: true, tenCa: true },
      orderBy: { id: 'asc' },
    });

    if (caLamViecs.length === 0) {
      console.log(`- ${label}: Không có ca làm việc active. Bỏ qua.`);
      continue;
    }

    const assignments = new Map<number, number[]>();
    caLamViecs.forEach((ca) => assignments.set(ca.id, []));

    nhanViens.forEach((nv, index) => {
      const ca = caLamViecs[index % caLamViecs.length];
      assignments.get(ca.id)!.push(nv.id);
    });

    console.log(`- ${label}: ${nhanViens.length} NV, ${caLamViecs.length} ca.`);

    if (!APPLY) {
      continue;
    }

    if (!lich) {
      throw new Error('Không tạo được lịch phân ca (lich null)');
    }

    await prisma.$transaction(async (tx) => {
      for (const [caLamViecId, nhanVienIds] of assignments.entries()) {
        if (nhanVienIds.length === 0) continue;

        for (const nhanVienId of nhanVienIds) {
          for (const ngay of dates) {
            const existing = await tx.lichPhanCaChiTiet.findUnique({
              where: {
                nhanVienId_ngay: { nhanVienId, ngay },
              },
              select: { id: true },
            });

            if (existing) {
              await tx.lichPhanCaChiTiet.update({
                where: { id: existing.id },
                data: { caLamViecId },
              });
            } else {
              await tx.lichPhanCaChiTiet.create({
                data: {
                  lichPhanCaId: lich.id,
                  nhanVienId,
                  ngay,
                  caLamViecId,
                },
              });
            }
          }
        }
      }
    });

    console.log(`  ✓ ${label}: Đã phân ca xong.`);
  }
}

main()
  .catch((err) => {
    console.error('❌ Lỗi:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
