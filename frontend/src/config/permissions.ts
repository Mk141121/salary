export const PERMISSIONS = {
  ADMIN: 'ADMIN',
  CHAM_CONG_XEM: 'CHAM_CONG_XEM',
  PHAN_CA_XEM: 'PHAN_CA_XEM',
  NGHI_PHEP_XEM: 'NGHI_PHEP_XEM',
  NGHI_PHEP_DUYET: 'NGHI_PHEP_DUYET',
  YEU_CAU_XEM: 'YEU_CAU_XEM',
  YEU_CAU_DUYET_CAP_1: 'YEU_CAU_DUYET_CAP_1',
  YEU_CAU_DUYET_CAP_2: 'YEU_CAU_DUYET_CAP_2',
  BANG_LUONG_XEM: 'BANG_LUONG_XEM',
  UNG_LUONG_XEM: 'UNG_LUONG_XEM',
  SO_LUONG_XEM: 'SO_LUONG_XEM',
  KHOAN_LUONG_XEM: 'KHOAN_LUONG_XEM',
  QUY_CHE_XEM: 'QUY_CHE_XEM',
  SU_KIEN_XEM: 'SU_KIEN_XEM',
  SAN_LUONG_XEM: 'SAN_LUONG_XEM',
  NHAN_VIEN_XEM: 'NHAN_VIEN_XEM',
  PHONG_BAN_XEM: 'PHONG_BAN_XEM',
  NHOM_NV_XEM: 'NHOM_NV_XEM',
  KPI_XEM: 'KPI_XEM',
  KPI_QUAN_LY: 'KPI_QUAN_LY',
} as const

const LEGACY_SUFFIX_TO_CANONICAL_SUFFIX: Array<[string, string]> = [
  ['_VIEW', '_XEM'],
  ['_CREATE', '_TAO'],
  ['_EDIT', '_SUA'],
  ['_UPDATE', '_SUA'],
  ['_DELETE', '_XOA'],
  ['_MANAGE', '_QUAN_LY'],
  ['_APPROVE', '_DUYET'],
]

export function normalizePermissionCode(permission: string): string {
  for (const [legacySuffix, canonicalSuffix] of LEGACY_SUFFIX_TO_CANONICAL_SUFFIX) {
    if (permission.endsWith(legacySuffix)) {
      return permission.slice(0, -legacySuffix.length) + canonicalSuffix
    }
  }

  return permission
}

export function normalizePermissionList(permissions: string[]): string[] {
  return Array.from(new Set(permissions.map(normalizePermissionCode)))
}
