import { LoaiNgayCong, TrangThaiChamCong } from '@prisma/client';
export declare class LuuChamCongDto {
    nhanVienId: number;
    thang: number;
    nam: number;
    soCongChuan?: number;
    soCongThucTe?: number;
    soNgayNghiPhep?: number;
    soNgayNghiKhongLuong?: number;
    soGioOT?: number;
    soGioOTDem?: number;
    soGioOTChuNhat?: number;
    soGioOTLe?: number;
    soLanDiMuon?: number;
    soLanVeSom?: number;
    ghiChu?: string;
}
export declare class LuuChiTietChamCongDto {
    nhanVienId: number;
    ngay: Date;
    gioVao?: Date;
    gioRa?: Date;
    loaiNgay?: LoaiNgayCong;
    trangThai?: TrangThaiChamCong;
    soGioLam?: number;
    soGioOT?: number;
    ghiChu?: string;
}
export declare class KhoiTaoChamCongDto {
    thang: number;
    nam: number;
    soCongChuan?: number;
}
export declare class DuLieuChamCongDto {
    maNhanVien: string;
    soCongThucTe?: number;
    soNgayNghiPhep?: number;
    soNgayNghiKhongLuong?: number;
    soGioOT?: number;
    soGioOTDem?: number;
    soGioOTChuNhat?: number;
    soGioOTLe?: number;
    soLanDiMuon?: number;
    soLanVeSom?: number;
}
export declare class ImportChamCongDto {
    thang: number;
    nam: number;
    duLieu: DuLieuChamCongDto[];
}
export declare class CapNhatCauHinhPhatDto {
    phatDiMuon1_3Lan?: number;
    phatDiMuon4_6Lan?: number;
    phatDiMuonTren6Lan?: number;
    phatVeSom1_3Lan?: number;
    phatVeSom4_6Lan?: number;
    phatVeSomTren6Lan?: number;
    phatNghiKhongPhep?: number;
    truLuongNghiKhongPhep?: boolean;
    gioVaoChuan?: string;
    gioRaChuan?: string;
    phutChoPhepTre?: number;
    moTa?: string;
}
