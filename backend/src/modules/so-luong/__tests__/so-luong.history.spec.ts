import { Test } from '@nestjs/testing'
import { SoLuongService } from '../so-luong.service'
import { PrismaService } from '../../../prisma/prisma.service'
import { describeIf } from '../../../test/integrationTestUtils'

describeIf('So luong history', () => {
  let prisma: PrismaService
  let service: SoLuongService

  const suffix = Date.now()
  let phongBanId = 0
  let nhanVienId = 0
  let khoanLuongId = 0
  let bangLuongId = 0
  let snapshotId = 0
  let ngayCongId = 0

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [PrismaService, SoLuongService],
    }).compile()

    prisma = moduleRef.get(PrismaService)
    service = moduleRef.get(SoLuongService)

    await prisma.$connect()

    const phongBan = await prisma.phongBan.create({
      data: {
        maPhongBan: `PB_SL_${suffix}`,
        tenPhongBan: `PB SL ${suffix}`,
      },
    })
    phongBanId = phongBan.id

    const nhanVien = await prisma.nhanVien.create({
      data: {
        maNhanVien: `NV_SL_${suffix}`,
        hoTen: `Nhân viên SL ${suffix}`,
        phongBanId,
      },
    })
    nhanVienId = nhanVien.id

    const khoanLuong = await prisma.khoanLuong.create({
      data: {
        maKhoan: `K_SL_${suffix}`,
        tenKhoan: `Khoản SL ${suffix}`,
        loai: 'THU_NHAP',
        cachTinh: 'LUONG_THANG_CO_DINH',
        chiuThue: false,
        thuTu: 1,
      },
    })
    khoanLuongId = khoanLuong.id

    const bangLuong = await prisma.bangLuong.create({
      data: {
        thang: 1,
        nam: new Date().getFullYear(),
        phongBanId,
        tenBangLuong: `Bang luong ${suffix}`,
        trangThai: 'DA_CHOT',
        ngayChot: new Date(),
        nguoiChot: 'jest',
      },
    })
    bangLuongId = bangLuong.id

    const snapshot = await prisma.snapshotBangLuong.create({
      data: {
        bangLuongId,
        nhanVienId,
        maNhanVien: `NV_SL_${suffix}`,
        hoTen: `Nhân viên SL ${suffix}`,
        phongBan: `PB SL ${suffix}`,
        phongBanId,
        khoanLuongId,
        maKhoan: `K_SL_${suffix}`,
        tenKhoan: `Khoản SL ${suffix}`,
        loaiKhoan: 'THU_NHAP',
        soTien: 100000,
        nguon: 'NHAP_TAY',
        ngayChot: new Date(),
        nguoiChot: 'jest',
      },
    })
    snapshotId = snapshot.id

    const ngayCong = await prisma.ngayCongBangLuong.create({
      data: {
        bangLuongId,
        nhanVienId,
        ngayCongLyThuyet: 26,
        soCongThucTe: 24,
        soNgayNghiCoPhep: 1,
        soNgayNghiKhongPhep: 1,
      },
    })
    ngayCongId = ngayCong.id
  })

  afterAll(async () => {
    await prisma.ngayCongBangLuong.deleteMany({ where: { id: ngayCongId } })
    await prisma.snapshotBangLuong.deleteMany({ where: { id: snapshotId } })
    await prisma.bangLuong.deleteMany({ where: { id: bangLuongId } })
    await prisma.khoanLuong.deleteMany({ where: { id: khoanLuongId } })
    await prisma.nhanVien.deleteMany({ where: { id: nhanVienId } })
    await prisma.phongBan.deleteMany({ where: { id: phongBanId } })
    await prisma.$disconnect()
  })

  it('returns salary history with ngay cong', async () => {
    const result = await service.laySoLuongNhanVien(nhanVienId, {})
    expect(result.bangLuongs.length).toBeGreaterThan(0)
    expect(result.bangLuongs[0].ngayCong).toBe(24)
  })
})
