import { TrangThaiDonNghiPhep } from '@prisma/client';
export declare enum NhomLoaiNghi {
    CO_PHEP = "CO_PHEP",
    KHONG_PHEP = "KHONG_PHEP"
}
export declare class TaoLoaiNghiDto {
    maLoaiNghi: string;
    tenLoaiNghi: string;
    nhomLoai: NhomLoaiNghi;
    coTinhLuong: boolean;
    coTinhChuyenCan: boolean;
    thuTuHienThi?: number;
}
export declare class CapNhatLoaiNghiDto {
    tenLoaiNghi?: string;
    nhomLoai?: NhomLoaiNghi;
    coTinhLuong?: boolean;
    coTinhChuyenCan?: boolean;
    thuTuHienThi?: number;
}
export declare class TaoDonNghiPhepDto {
    nhanVienId: number;
    loaiNghiId: number;
    tuNgay: string;
    denNgay: string;
    lyDo?: string;
    tepDinhKemUrl?: string;
}
export declare class CapNhatDonNghiPhepDto {
    loaiNghiId?: number;
    tuNgay?: string;
    denNgay?: string;
    lyDo?: string;
    tepDinhKemUrl?: string;
}
export declare class DuyetDonNghiPhepDto {
    ghiChu?: string;
}
export declare class TuChoiDonNghiPhepDto {
    lyDoTuChoi: string;
}
export declare class HuyDonNghiPhepDto {
    lyDo?: string;
}
export declare class LocDonNghiPhepDto {
    phongBanId?: number;
    nhanVienId?: number;
    loaiNghiId?: number;
    trangThai?: TrangThaiDonNghiPhep;
    tuNgay?: string;
    denNgay?: string;
    page?: number;
    limit?: number;
}
export declare class LocLichNghiDto {
    nhanVienId?: number;
    phongBanId?: number;
    tuNgay: string;
    denNgay: string;
}
export declare class LoaiNghiResponse {
    id: number;
    maLoaiNghi: string;
    tenLoaiNghi: string;
    nhomLoai: string;
    coTinhLuong: boolean;
    coTinhChuyenCan: boolean;
    thuTuHienThi: number;
    isActive: boolean;
}
export declare class DonNghiPhepResponse {
    id: number;
    maDon: string;
    nhanVien: {
        id: number;
        maNhanVien: string;
        hoTen: string;
    };
    phongBan: {
        id: number;
        tenPhongBan: string;
    };
    loaiNghi: LoaiNghiResponse;
    tuNgay: Date;
    denNgay: Date;
    soNgayNghi: number;
    lyDo: string | null;
    tepDinhKemUrl: string | null;
    trangThai: TrangThaiDonNghiPhep;
    nguoiDuyet?: {
        id: number;
        hoTen: string;
    };
    ngayDuyet: Date | null;
    lyDoTuChoi: string | null;
    ngayTao: Date;
}
export declare class ChiTietNghiPhepNgayResponse {
    id: number;
    ngay: Date;
    soGioNghi: number;
    loaiNghi: LoaiNghiResponse;
    coTinhLuong: boolean;
    coTinhChuyenCan: boolean;
}
export declare class LichNghiNhanVienResponse {
    nhanVienId: number;
    maNhanVien: string;
    hoTen: string;
    phongBan: string;
    chiTietNgays: ChiTietNghiPhepNgayResponse[];
}
export declare class ThongKeMappingResponse {
    soNgayNghiCoPhep: number;
    soNgayNghiKhongPhep: number;
    soNgayNghiCoLuong: number;
    soNgayNghiKhongLuong: number;
    tongSoNgayNghi: number;
    chiTiet: ChiTietNghiPhepNgayResponse[];
}
