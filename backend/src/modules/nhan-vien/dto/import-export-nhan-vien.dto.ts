// DTO cho Import/Export Nhân Viên
import { IsNumber, IsString, IsOptional, IsEnum, IsArray } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TrangThaiNhanVien } from '@prisma/client';

// Kết quả import
export interface KetQuaImportNhanVien {
  thanhCong: boolean;
  tongDong: number;
  dongThanhCong: number;
  dongThem: number;        // Số nhân viên thêm mới
  dongCapNhat: number;     // Số nhân viên cập nhật
  dongLoi: number;
  chiTietLoi: { dong: number; maNhanVien?: string; lyDo: string }[];
  danhSachThemMoi: string[];    // Danh sách mã NV thêm mới
  danhSachCapNhat: string[];    // Danh sách mã NV cập nhật
}

// Mapping cột Excel với trường hệ thống
export interface CotNhanVienExcel {
  soCot: number;
  tenCotExcel: string;
  truongHeThong: string; // maNhanVien, hoTen, soDienThoai, phongBan, gioiTinh, chucVu, email, diaChi, soCCCD, ngaySinh, lienHeKhanCap, luongCoBan, luongDongBHXH, taiKhoanNganHang, phuCap_XXX
}

// DTO cập nhật trạng thái nhân viên (active/deactive)
export class CapNhatTrangThaiNhanVienDto {
  @ApiProperty({ 
    description: 'Trạng thái mới', 
    enum: ['DANG_LAM', 'TAM_NGHI', 'NGHI_VIEC'],
    example: 'TAM_NGHI'
  })
  @IsEnum(TrangThaiNhanVien)
  trangThai: TrangThaiNhanVien;

  @ApiPropertyOptional({ description: 'Lý do thay đổi trạng thái' })
  @IsOptional()
  @IsString()
  lyDo?: string;

  @ApiPropertyOptional({ description: 'Ngày nghỉ việc (YYYY-MM-DD)' })
  @IsOptional()
  @IsString()
  ngayNghiViec?: string;
}

// DTO cập nhật hàng loạt trạng thái
export class CapNhatHangLoatTrangThaiDto {
  @ApiProperty({ description: 'Danh sách ID nhân viên', type: [Number] })
  @IsArray()
  @IsNumber({}, { each: true })
  nhanVienIds: number[];

  @ApiProperty({ 
    description: 'Trạng thái mới', 
    enum: ['DANG_LAM', 'TAM_NGHI', 'NGHI_VIEC'] 
  })
  @IsEnum(TrangThaiNhanVien)
  trangThai: TrangThaiNhanVien;

  @ApiPropertyOptional({ description: 'Lý do thay đổi trạng thái' })
  @IsOptional()
  @IsString()
  lyDo?: string;
}

// Danh sách trường hệ thống hỗ trợ import/export
export const TRUONG_NHAN_VIEN = [
  { ma: 'maNhanVien', ten: 'Mã nhân viên', batBuoc: true },
  { ma: 'hoTen', ten: 'Họ tên', batBuoc: true },
  { ma: 'soDienThoai', ten: 'Số điện thoại', batBuoc: false },
  { ma: 'phongBan', ten: 'Phòng ban', batBuoc: false }, // Có thể là mã hoặc tên
  { ma: 'gioiTinh', ten: 'Giới tính', batBuoc: false }, // NAM, NU, KHAC
  { ma: 'chucVu', ten: 'Chức vụ', batBuoc: false },
  { ma: 'email', ten: 'Email', batBuoc: false },
  { ma: 'diaChi', ten: 'Địa chỉ', batBuoc: false },
  { ma: 'soCCCD', ten: 'Số CCCD/CMND', batBuoc: false },
  { ma: 'ngaySinh', ten: 'Ngày sinh', batBuoc: false },
  { ma: 'ngayVaoLam', ten: 'Ngày vào làm', batBuoc: false },
  { ma: 'nguoiLienHeKhanCap', ten: 'Người liên hệ khẩn cấp', batBuoc: false },
  { ma: 'soDienThoaiKhanCap', ten: 'SĐT khẩn cấp', batBuoc: false },
  { ma: 'quanHeKhanCap', ten: 'Quan hệ (liên hệ khẩn cấp)', batBuoc: false },
  { ma: 'luongCoBan', ten: 'Lương cơ bản', batBuoc: false },
  { ma: 'luongDongBHXH', ten: 'Lương đóng BHXH', batBuoc: false },
  { ma: 'tenNganHang', ten: 'Tên ngân hàng', batBuoc: false },
  { ma: 'soTaiKhoan', ten: 'Số tài khoản', batBuoc: false },
  { ma: 'tenChuTaiKhoan', ten: 'Tên chủ tài khoản', batBuoc: false },
  { ma: 'chiNhanhNganHang', ten: 'Chi nhánh ngân hàng', batBuoc: false },
  { ma: 'loaiNhanVien', ten: 'Loại nhân viên', batBuoc: false },
  { ma: 'trangThai', ten: 'Trạng thái', batBuoc: false },
];

// Từ khóa mapping tự động (lowercase)
export const TU_KHOA_MAPPING: Record<string, string[]> = {
  maNhanVien: ['mã nv', 'mã nhân viên', 'ma nhan vien', 'manv', 'employee id', 'emp id', 'mã'],
  hoTen: ['họ tên', 'ho ten', 'họ và tên', 'tên', 'name', 'full name', 'hoten'],
  soDienThoai: ['số điện thoại', 'sdt', 'điện thoại', 'phone', 'mobile', 'số đt'],
  phongBan: ['phòng ban', 'phong ban', 'department', 'bộ phận', 'phòng', 'pb'],
  gioiTinh: ['giới tính', 'gioi tinh', 'gender', 'nam/nữ'],
  chucVu: ['chức vụ', 'chuc vu', 'position', 'vị trí', 'title'],
  email: ['email', 'mail', 'e-mail'],
  diaChi: ['địa chỉ', 'dia chi', 'address', 'nơi ở'],
  soCCCD: ['cccd', 'cmnd', 'căn cước', 'số cccd', 'số cmnd', 'cmtnd'],
  ngaySinh: ['ngày sinh', 'ngay sinh', 'birthday', 'dob', 'sinh nhật', 'năm sinh'],
  ngayVaoLam: ['ngày vào làm', 'ngay vao lam', 'hire date', 'ngày bắt đầu'],
  nguoiLienHeKhanCap: ['người liên hệ khẩn', 'liên hệ khẩn cấp', 'emergency contact', 'người thân'],
  soDienThoaiKhanCap: ['sđt khẩn cấp', 'phone khẩn', 'emergency phone', 'điện thoại khẩn'],
  quanHeKhanCap: ['quan hệ', 'relationship', 'mối quan hệ'],
  luongCoBan: ['lương cơ bản', 'luong co ban', 'basic salary', 'lương cb', 'lương'],
  luongDongBHXH: ['lương đóng bh', 'lương bhxh', 'lương bảo hiểm', 'insurance salary'],
  tenNganHang: ['ngân hàng', 'bank', 'tên nh', 'tên ngân hàng'],
  soTaiKhoan: ['số tài khoản', 'stk', 'account number', 'tài khoản'],
  tenChuTaiKhoan: ['tên chủ tk', 'tên tài khoản', 'account name', 'chủ tài khoản'],
  chiNhanhNganHang: ['chi nhánh', 'branch', 'chi nhánh nh'],
  loaiNhanVien: ['loại nv', 'loại nhân viên', 'employee type'],
  trangThai: ['trạng thái', 'status', 'tình trạng'],
};
