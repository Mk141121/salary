import { Test } from '@nestjs/testing'
import { ImportExcelService } from '../import-excel.service'
import { PrismaService } from '../../../prisma/prisma.service'
import { describeIf } from '../../../test/integrationTestUtils'
import { TinhLuongService } from '../../bang-luong/tinh-luong.service'

describeIf('Import Excel mapping', () => {
  let prisma: PrismaService
  let service: ImportExcelService

  const suffix = Date.now()
  let khoanLuongId = 0

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        PrismaService,
        ImportExcelService,
        { provide: TinhLuongService, useValue: {} },
      ],
    }).compile()

    prisma = moduleRef.get(PrismaService)
    service = moduleRef.get(ImportExcelService)

    await prisma.$connect()

    const khoanLuong = await prisma.khoanLuong.create({
      data: {
        maKhoan: 'LUONG_CO_BAN',
        tenKhoan: `Lương cơ bản ${suffix}`,
        loai: 'THU_NHAP',
        cachTinh: 'LUONG_THANG_CO_DINH',
        chiuThue: false,
        thuTu: 1,
      },
    })
    khoanLuongId = khoanLuong.id
  })

  afterAll(async () => {
    await prisma.khoanLuong.deleteMany({ where: { id: khoanLuongId } })
    await prisma.$disconnect()
  })

  it('suggests mapping for common headers', async () => {
    const headers = ['Mã NV', 'Họ tên', 'Phòng ban', 'Lương cơ bản']
    const mappings = await service.goiYMapping(headers)

    expect(mappings[0].truongHeThong).toBe('ma_nhan_vien')
    expect(mappings[1].truongHeThong).toBe('ho_ten')
    expect(mappings[2].truongHeThong).toBe('phong_ban')
    expect(mappings[3].khoanLuongId).toBe(khoanLuongId)
  })
})
