/**
 * Scheduling Service Integration Tests
 * Test ca làm việc, lịch phân ca, assign ca batch, copy week
 */
import { Test } from '@nestjs/testing';
import { SchedulingService } from '../scheduling.service';
import { PrismaService } from '../../../prisma/prisma.service';
import { describeIf } from '../../../test/integrationTestUtils';
import { TrangThaiLichPhanCa } from '../dto/scheduling.dto';

describeIf('SchedulingService', () => {
  let service: SchedulingService;
  let prisma: PrismaService;
  
  const suffix = Date.now();
  let testPhongBanId = 0;
  let testNhanVienIds: number[] = [];
  let testCaId = 0;
  let testLichId = 0;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [PrismaService, SchedulingService],
    }).compile();

    prisma = moduleRef.get(PrismaService);
    service = moduleRef.get(SchedulingService);
    await prisma.$connect();

    // Setup test data
    const phongBan = await prisma.phongBan.create({
      data: {
        maPhongBan: `PB_SCHED_${suffix}`,
        tenPhongBan: `PB Scheduling Test ${suffix}`,
      },
    });
    testPhongBanId = phongBan.id;

    // Create test employees
    for (let i = 1; i <= 3; i++) {
      const nv = await prisma.nhanVien.create({
        data: {
          maNhanVien: `NV_SCHED_${suffix}_${i}`,
          hoTen: `NV Test Scheduling ${i}`,
          phongBanId: testPhongBanId,
        },
      });
      testNhanVienIds.push(nv.id);
    }
  });

  afterAll(async () => {
    // Cleanup in reverse order
    if (testLichId) {
      await prisma.$executeRaw`DELETE FROM chi_tiet_phan_ca WHERE lich_phan_ca_id = ${testLichId}`;
      await prisma.$executeRaw`DELETE FROM lich_phan_ca WHERE id = ${testLichId}`;
    }
    if (testCaId) {
      await prisma.$executeRaw`DELETE FROM ca_lam_viec WHERE id = ${testCaId}`;
    }
    for (const nvId of testNhanVienIds) {
      await prisma.nhanVien.deleteMany({ where: { id: nvId } });
    }
    await prisma.phongBan.deleteMany({ where: { id: testPhongBanId } });
    await prisma.$disconnect();
  });

  describe('Ca Làm Việc CRUD', () => {
    it('should create a new ca lam viec', async () => {
      const ca = await service.createCaLamViec({
        maCa: `CA_${suffix}`,
        tenCa: `Ca sáng test ${suffix}`,
        gioVao: '08:00',
        gioRa: '17:00',
        nghiGiuaCaPhut: 60,
        graceInPhut: 15,
        graceLatePhut: 15,
        phongBanId: testPhongBanId,
      });

      expect(ca).toBeDefined();
      expect(ca.id).toBeGreaterThan(0);
      expect(ca.maCa).toBe(`CA_${suffix}`);
      expect(ca.gioVao).toBe('08:00');
      expect(ca.gioRa).toBe('17:00');
      expect(ca.isCaDem).toBe(false);
      
      testCaId = ca.id;
    });

    it('should detect ca đêm automatically', async () => {
      const caDem = await service.createCaLamViec({
        maCa: `CA_DEM_${suffix}`,
        tenCa: `Ca đêm test ${suffix}`,
        gioVao: '22:00',
        gioRa: '06:00',
        nghiGiuaCaPhut: 30,
        phongBanId: testPhongBanId,
      });

      expect(caDem.isCaDem).toBe(true);
      
      // Cleanup
      await prisma.$executeRaw`DELETE FROM ca_lam_viec WHERE id = ${caDem.id}`;
    });

    it('should reject duplicate maCa', async () => {
      await expect(
        service.createCaLamViec({
          maCa: `CA_${suffix}`,
          tenCa: 'Duplicate test',
          gioVao: '09:00',
          gioRa: '18:00',
        })
      ).rejects.toThrow(/đã tồn tại/);
    });

    it('should get ca by id', async () => {
      const ca = await service.getCaLamViecById(testCaId);
      
      expect(ca.id).toBe(testCaId);
      expect(ca.maCa).toBe(`CA_${suffix}`);
    });

    it('should update ca lam viec', async () => {
      const updated = await service.updateCaLamViec(testCaId, {
        tenCa: `Ca sáng updated ${suffix}`,
        graceInPhut: 30,
      });

      expect(updated.tenCa).toContain('updated');
    });

    it('should list all ca', async () => {
      const list = await service.getAllCaLamViec();
      
      expect(Array.isArray(list)).toBe(true);
      const testCa = list.find(c => c.id === testCaId);
      expect(testCa).toBeDefined();
    });
  });

  describe('Lịch Phân Ca CRUD', () => {
    const testThangNam = '2026-03';

    it('should create lich phan ca', async () => {
      const lich = await service.createLichPhanCa({
        tenLich: `Lịch test ${suffix}`,
        thangNam: testThangNam,
        phongBanId: testPhongBanId,
      });

      expect(lich).toBeDefined();
      expect(lich.id).toBeGreaterThan(0);
      expect(lich.tenLich).toContain('test');
      expect(lich.trangThai).toBe(TrangThaiLichPhanCa.NHAP);
      
      testLichId = lich.id;
    });

    it('should get lich by id', async () => {
      const lich = await service.getLichPhanCaById(testLichId);
      
      expect(lich.id).toBe(testLichId);
    });

    it('should list lich with filters', async () => {
      const list = await service.getLichPhanCaList({
        thangNam: testThangNam,
        phongBanId: testPhongBanId,
      });

      expect(Array.isArray(list)).toBe(true);
      const found = list.find(l => l.id === testLichId);
      expect(found).toBeDefined();
    });
  });

  describe('Assign Ca Batch', () => {
    it('should assign ca to multiple employees for date range', async () => {
      const result = await service.assignCaBatch(testLichId, {
        nhanVienIds: testNhanVienIds,
        caLamViecId: testCaId,
        tuNgay: '2026-03-02',
        denNgay: '2026-03-06',
        ngoaiTruThu: [0, 6], // Exclude Sun & Sat
      });

      expect(result.success).toBe(true);
      expect(result.count).toBeGreaterThan(0);
      
      // Should have assigned for weekdays only
      // 5 days - 0 weekend = 5 days * 3 employees = 15 slots (if no overlap)
    });

    it('should assign single day', async () => {
      const result = await service.assignCaNgay(testLichId, {
        nhanVienId: testNhanVienIds[0],
        caLamViecId: testCaId,
        ngay: '2026-03-10',
      });

      expect(result).toBeDefined();
      expect(result.nhanVienId).toBe(testNhanVienIds[0]);
    });

    it('should get chi tiet phan ca for employee', async () => {
      const chiTiet = await service.getChiTietPhanCa(testLichId, {
        nhanVienId: testNhanVienIds[0],
      });

      expect(Array.isArray(chiTiet)).toBe(true);
      expect(chiTiet.length).toBeGreaterThan(0);
    });
  });

  describe('Copy Week', () => {
    it('should copy week assignments to another week', async () => {
      const result = await service.copyWeek(testLichId, {
        tuanNguon: '2026-03-02', // Week source (Mon)
        tuanDich: '2026-03-09', // Week destination (Mon)
      });

      expect(result.success).toBe(true);
      expect(result.copiedCount).toBeGreaterThan(0);
    });
  });

  describe('Calendar View', () => {
    it('should return calendar view data', async () => {
      const calendar = await service.getCalendarView({
        lichId: testLichId,
      });

      expect(calendar).toBeDefined();
      expect(calendar.days).toBeDefined();
      expect(Array.isArray(calendar.days)).toBe(true);
    });
  });

  describe('Workflow Status', () => {
    it('should publish lich', async () => {
      const result = await service.publishLich(testLichId);

      expect(result.trangThai).toBe(TrangThaiLichPhanCa.DA_CONG_BO);
    });

    it('should not allow editing published lich', async () => {
      await expect(
        service.assignCaNgay(testLichId, {
          nhanVienId: testNhanVienIds[0],
          caLamViecId: testCaId,
          ngay: '2026-03-15',
        })
      ).rejects.toThrow();
    });

    it('should allow HR to override', async () => {
      // Unpublish for more tests
      await service.updateLichStatus(testLichId, TrangThaiLichPhanCa.NHAP);
      
      const lich = await service.getLichPhanCaById(testLichId);
      expect(lich.trangThai).toBe(TrangThaiLichPhanCa.NHAP);
    });
  });

  describe('Validation', () => {
    it('should reject invalid time format', async () => {
      await expect(
        service.createCaLamViec({
          maCa: `CA_INVALID_${suffix}`,
          tenCa: 'Invalid',
          gioVao: '25:00', // Invalid
          gioRa: '17:00',
        })
      ).rejects.toThrow();
    });

    it('should reject assigning to non-existent employee', async () => {
      await expect(
        service.assignCaNgay(testLichId, {
          nhanVienId: 999999,
          caLamViecId: testCaId,
          ngay: '2026-03-20',
        })
      ).rejects.toThrow();
    });

    it('should reject assigning non-existent ca', async () => {
      await expect(
        service.assignCaNgay(testLichId, {
          nhanVienId: testNhanVienIds[0],
          caLamViecId: 999999,
          ngay: '2026-03-20',
        })
      ).rejects.toThrow();
    });
  });
});
