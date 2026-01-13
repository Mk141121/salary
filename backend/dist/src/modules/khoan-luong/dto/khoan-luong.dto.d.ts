import { LoaiKhoanLuong } from '@prisma/client';
export declare class TaoKhoanLuongDto {
    maKhoan: string;
    tenKhoan: string;
    loai?: LoaiKhoanLuong;
    chiuThue?: boolean;
    phamViApDung?: string;
    moTa?: string;
    thuTu?: number;
}
declare const CapNhatKhoanLuongDto_base: import("@nestjs/common").Type<Partial<TaoKhoanLuongDto>>;
export declare class CapNhatKhoanLuongDto extends CapNhatKhoanLuongDto_base {
    trangThai?: boolean;
}
declare class ThuTuItem {
    id: number;
    thuTu: number;
}
export declare class CapNhatThuTuDto {
    danhSach: ThuTuItem[];
}
export {};
