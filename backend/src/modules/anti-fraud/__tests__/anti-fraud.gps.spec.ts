import { Test } from '@nestjs/testing'
import { AntiFraudService } from '../anti-fraud.service'
import { PrismaService } from '../../../prisma/prisma.service'
import { describeIf } from '../../../test/integrationTestUtils'

describeIf('Anti-fraud GPS', () => {
  let prisma: PrismaService
  let service: AntiFraudService

  const suffix = Date.now()
  let phongBanId = 0
  let nhanVienId = 0
  let geofenceId = 0

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [PrismaService, AntiFraudService],
    }).compile()

    prisma = moduleRef.get(PrismaService)
    service = moduleRef.get(AntiFraudService)

    await prisma.$connect()

    const phongBan = await prisma.phongBan.create({
      data: {
        maPhongBan: `PB_GPS_${suffix}`,
        tenPhongBan: `PB GPS ${suffix}`,
      },
    })
    phongBanId = phongBan.id

    const nhanVien = await prisma.nhanVien.create({
      data: {
        maNhanVien: `NV_GPS_${suffix}`,
        hoTen: `Nhân viên GPS ${suffix}`,
        phongBanId,
      },
    })
    nhanVienId = nhanVien.id

    const geofence = await prisma.cauHinhGeofence.create({
      data: {
        tenDiaDiem: `Geofence ${suffix}`,
        diaChi: 'Test',
        viDo: 10.0,
        kinhDo: 106.0,
        banKinhMet: 500,
        phongBanId,
        apDungTatCa: false,
        batBuocGPS: true,
        chanNgoaiVung: false,
      },
    })
    geofenceId = geofence.id
  })

  afterAll(async () => {
    await prisma.bangGhiChamCongGPS.deleteMany({ where: { nhanVienId } })
    await prisma.cauHinhGeofence.deleteMany({ where: { id: geofenceId } })
    await prisma.nhanVien.deleteMany({ where: { id: nhanVienId } })
    await prisma.phongBan.deleteMany({ where: { id: phongBanId } })
    await prisma.$disconnect()
  })

  it('validates gps checkin inside geofence', async () => {
    const result = await service.gpsCheckin(
      nhanVienId,
      { loaiChamCong: 'CHECK_IN', viDo: 10.0005, kinhDo: 106.0005 },
      { userAgent: 'jest', ipAddress: '127.0.0.1' },
    )

    expect(result.success).toBe(true)
    expect(result.trangThai).toBe('HOP_LE')
    expect(result.trongVung).toBe(true)
  })
})
