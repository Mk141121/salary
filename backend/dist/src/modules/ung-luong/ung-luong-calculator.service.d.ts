import { PrismaService } from '../../prisma/prisma.service';
export declare const CAU_HINH_MAC_DINH: {
    chuyen_can: {
        so_ngay_nghi_toi_da: number;
        cam_neu_nghi_khong_phep: boolean;
    };
    ung_luong: {
        ti_le_toi_da: number;
        lam_tron: number;
    };
};
export interface KetQuaTinhLuyKe {
    tienCongLuyKe: number;
    luongCoBan: number;
    luongTheoNgayCong: number;
    sanLuongChiaHang: number;
    giaoHang: number;
    phatChamCong: number;
    thuongPhat: number;
    soNgayCong: number;
    soNgayNghi: number;
    soNgayNghiKhongPhep: number;
    laTamTinh: boolean;
    inputDataJson: Record<string, unknown>;
}
export interface KetQuaKiemTraDieuKien {
    duocPhepUng: boolean;
    lyDoKhongDat: string | null;
    mucToiDaDuocUng: number;
    chiTiet: {
        viPhamChuyenCan: boolean;
        viPhamNghiKhongPhep: boolean;
        nhanVienKhongHoatDong: boolean;
    };
}
export declare class UngLuongCalculatorService {
    private prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    layLuongCoBanHieuLuc(nhanVienId: number, ngay: Date): Promise<number>;
    tinhSanLuongChiaHang(nhanVienId: number, tuNgay: Date, denNgay: Date): Promise<{
        tongSpDat: number;
        tongSpLoi: number;
        soTien: number;
    }>;
    tinhGiaoHang(nhanVienId: number, tuNgay: Date, denNgay: Date): Promise<{
        tongKhoiLuong: number;
        tongLanTreGio: number;
        soTien: number;
    }>;
    tinhPhatChamCong(nhanVienId: number, thang: number, nam: number): Promise<number>;
    private tinhNgayLamViecTheoLich;
    private tinhSoCongChuanTheoLich;
    tinhNgayCong(nhanVienId: number, tuNgay: Date, denNgay: Date): Promise<{
        soNgayCong: number;
        soNgayNghi: number;
        soNgayNghiKhongPhep: number;
        soCongChuan: number;
        laTamTinh: boolean;
    }>;
    tinhThuongPhat(nhanVienId: number, tuNgay: Date, denNgay: Date): Promise<{
        thuong: number;
        phat: number;
    }>;
    tinhTienCongLuyKe(nhanVienId: number, tuNgay: Date, denNgay: Date): Promise<KetQuaTinhLuyKe>;
    kiemTraDieuKien(nhanVienId: number, tienCongLuyKe: number, soNgayNghi: number, soNgayNghiKhongPhep: number, cauHinhJson?: Record<string, unknown>): Promise<KetQuaKiemTraDieuKien>;
    tinhToanDayDu(nhanVienId: number, tuNgay: Date, denNgay: Date, cauHinhJson?: Record<string, unknown>): Promise<{
        luyKe: KetQuaTinhLuyKe;
        dieuKien: KetQuaKiemTraDieuKien;
    }>;
}
