export type WorkdayRule = 'FULL' | 'SAT_HALF_SUN_OFF';

export function resolveWorkdayRule(phongBan?: {
  maPhongBan?: string | null;
  tenPhongBan?: string | null;
  loaiPhongBan?: string | null;
  quyTacNgayCong?: string | null;
  soNgayCongThang?: number | null;
}): WorkdayRule {
  if (!phongBan) return 'SAT_HALF_SUN_OFF';

  const quyTacNgayCong = (phongBan.quyTacNgayCong || '').trim().toUpperCase();
  if (quyTacNgayCong === 'FULL' || quyTacNgayCong === 'SAT_HALF_SUN_OFF') {
    return quyTacNgayCong as WorkdayRule;
  }

  const maPhongBan = (phongBan.maPhongBan || '').trim().toUpperCase();
  const tenPhongBan = (phongBan.tenPhongBan || '').toLowerCase();
  const loaiPhongBan = (phongBan.loaiPhongBan || '').toUpperCase();

  if (maPhongBan === 'KV' || tenPhongBan.includes('kho vận')) {
    return 'FULL';
  }

  if (loaiPhongBan === 'VAN_PHONG') {
    return 'SAT_HALF_SUN_OFF';
  }

  return 'SAT_HALF_SUN_OFF';
}

export function countWorkingDaysInMonth(
  thang: number,
  nam: number,
  rule: WorkdayRule,
  soNgayCongThang?: number | null,
): number {
  const soNgayTrongThang = new Date(nam, thang, 0).getDate();
  if (typeof soNgayCongThang === 'number' && !Number.isNaN(soNgayCongThang)) {
    return Math.max(0, Math.min(soNgayCongThang, soNgayTrongThang));
  }
  if (rule === 'FULL') return soNgayTrongThang;

  let soNgayChuNhat = 0;
  let soNgayThuBay = 0;
  for (let ngay = 1; ngay <= soNgayTrongThang; ngay++) {
    const date = new Date(nam, thang - 1, ngay);
    const thuTrongTuan = date.getDay();
    if (thuTrongTuan === 0) {
      soNgayChuNhat++;
    } else if (thuTrongTuan === 6) {
      soNgayThuBay++;
    }
  }

  return soNgayTrongThang - soNgayChuNhat - soNgayThuBay * 0.5;
}

export function countWorkingDaysInRange(tuNgay: Date, denNgay: Date, rule: WorkdayRule): number {
  const start = new Date(tuNgay.getFullYear(), tuNgay.getMonth(), tuNgay.getDate());
  const end = new Date(denNgay.getFullYear(), denNgay.getMonth(), denNgay.getDate());
  let count = 0;

  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    const day = d.getDay();
    if (rule === 'FULL') {
      count += 1;
    } else {
      if (day === 0) continue;
      if (day === 6) {
        count += 0.5;
      } else {
        count += 1;
      }
    }
  }

  return count;
}