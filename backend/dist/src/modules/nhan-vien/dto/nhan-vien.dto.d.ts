import { TrangThaiNhanVien } from '@prisma/client';
export declare class TaoNhanVienDto {
    maNhanVien?: string;
    hoTen: string;
    email?: string;
    soDienThoai?: string;
    phongBanId: number;
    chucVu?: string;
    luongCoBan?: number;
    ngayVaoLam?: string;
}
declare const CapNhatNhanVienDto_base: import("@nestjs/common").Type<Partial<TaoNhanVienDto>>;
export declare class CapNhatNhanVienDto extends CapNhatNhanVienDto_base {
    trangThai?: TrangThaiNhanVien;
}
export declare class TimKiemNhanVienDto {
    phongBanId?: number;
    tuKhoa?: string;
    trangThai?: TrangThaiNhanVien;
    trang?: number;
    soLuong?: number;
}
export {};
