import { Test } from '@nestjs/testing'
import { QuyCheRuleService } from '../quy-che-rule.service'
import { PrismaService } from '../../../prisma/prisma.service'
import { describeIf } from '../../../test/integrationTestUtils'

describeIf('RuleEngine Preview', () => {
  let prisma: PrismaService
  let service: QuyCheRuleService

  const suffix = Date.now()
  let phongBanId = 0
  let nhanVienId = 0
  let khoanLuongId = 0
  let quyCheId = 0
  let ruleId = 0

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [PrismaService, QuyCheRuleService],
    }).compile()

    prisma = moduleRef.get(PrismaService)
    service = moduleRef.get(QuyCheRuleService)

    await prisma.$connect()

    const phongBan = await prisma.phongBan.create({
      data: {
        maPhongBan: `PB_TEST_${suffix}`,
        tenPhongBan: `PB Test ${suffix}`,
      },
    })
    phongBanId = phongBan.id

    const nhanVien = await prisma.nhanVien.create({
      data: {
        maNhanVien: `NV_TEST_${suffix}`,
        hoTen: `Nhân viên test ${suffix}`,
        phongBanId,
      },
    })
    nhanVienId = nhanVien.id

    const khoanLuong = await prisma.khoanLuong.create({
      data: {
        maKhoan: `K_TEST_${suffix}`,
        tenKhoan: `Khoản test ${suffix}`,
        loai: 'THU_NHAP',
        cachTinh: 'LUONG_THANG_CO_DINH',
        chiuThue: false,
        thuTu: 1,
      },
    })
    khoanLuongId = khoanLuong.id

    const quyChe = await prisma.quyChe.create({
      data: {
        phongBanId,
        tenQuyChe: `Quy chế test ${suffix}`,
        tuNgay: new Date(),
        trangThai: 'HIEU_LUC',
      },
    })
    quyCheId = quyChe.id

    const rule = await prisma.quyCheRule.create({
      data: {
        quyCheId,
        khoanLuongId,
        tenRule: `Rule test ${suffix}`,
        loaiRule: 'CO_DINH',
        dieuKienJson: JSON.stringify({ apDungCho: { phongBanIds: [phongBanId] } }),
        congThucJson: JSON.stringify({ soTien: 100000 }),
        thuTuUuTien: 1,
        cheDoGop: 'GHI_DE',
        choPhepChinhTay: true,
        trangThai: true,
      },
    })
    ruleId = rule.id
  })

  afterAll(async () => {
    await prisma.quyCheRule.deleteMany({ where: { id: ruleId } })
    await prisma.quyChe.deleteMany({ where: { id: quyCheId } })
    await prisma.khoanLuong.deleteMany({ where: { id: khoanLuongId } })
    await prisma.nhanVien.deleteMany({ where: { id: nhanVienId } })
    await prisma.phongBan.deleteMany({ where: { id: phongBanId } })
    await prisma.$disconnect()
  })

  it('applies dieu kien phong ban in preview', async () => {
    const result = await service.preview({
      quyCheId,
      nhanVienId,
      duLieuGiaLap: {},
    })

    expect(result.tongTien).toBe(100000)
    expect(result.chiTiet.length).toBeGreaterThan(0)
  })
})
