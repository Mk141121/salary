export interface NhanVienDetailForm {
  hoTen: string
  email: string
  soDienThoai: string
  phongBanId: number
  chucVu: string
  gioiTinh: '' | 'NAM' | 'NU' | 'KHAC'
  ngaySinh: string
  diaChi: string
  soCCCD: string
  hinhCCCDTruoc: string
  hinhCCCDSau: string
  soDienThoaiKhanCap: string
  nguoiLienHeKhanCap: string
  quanHeKhanCap: string
  dongBHXH: boolean
}
