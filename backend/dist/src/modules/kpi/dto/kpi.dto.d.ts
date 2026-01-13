export declare class TaoChiTieuKPIDto {
    maChiTieu: string;
    tenChiTieu: string;
    moTa?: string;
    donViTinh: string;
    trongSo: number;
    loaiChiTieu: string;
    chiTieuToiThieu?: number;
    chiTieuMucTieu?: number;
    chiTieuVuotMuc?: number;
    thuTu?: number;
}
export declare class TaoTemplateKPIDto {
    maTemplate: string;
    tenTemplate: string;
    phongBanId?: number;
    moTa?: string;
    chiTieuKPIs?: TaoChiTieuKPIDto[];
}
export declare class CapNhatTemplateKPIDto {
    tenTemplate?: string;
    phongBanId?: number;
    moTa?: string;
    trangThai?: boolean;
}
export declare class TaoKyDanhGiaDto {
    maKy: string;
    tenKy: string;
    loaiKy: string;
    thang?: number;
    quy?: number;
    nam: number;
    tuNgay: string;
    denNgay: string;
    hanNopKetQua: string;
    ghiChu?: string;
}
export declare class CapNhatTrangThaiKyDto {
    trangThai: string;
}
export declare class NhapKetQuaKPIDto {
    chiTieuId: number;
    ketQuaDat: number;
    ghiChu?: string;
}
export declare class TaoDanhGiaKPIDto {
    kyDanhGiaId: number;
    nhanVienId: number;
    templateId: number;
    ketQuaKPIs?: NhapKetQuaKPIDto[];
    nhanXetChung?: string;
    nguoiDanhGia?: string;
}
export declare class CapNhatKetQuaKPIDto {
    ketQuaKPIs: NhapKetQuaKPIDto[];
    nhanXetChung?: string;
}
export declare class DuyetDanhGiaKPIDto {
    nguoiDuyet?: string;
    nhanXet?: string;
}
export declare class TuChoiDanhGiaKPIDto {
    lyDoTuChoi: string;
}
export declare class TaoCauHinhThuongDto {
    nam: number;
    xepLoai: string;
    diemToiThieu: number;
    diemToiDa: number;
    heSoThuong: number;
    moTa?: string;
}
export declare class TinhThuongKPIDto {
    kyDanhGiaId: number;
    mucThuongCoBan: number;
}
export declare class KetQuaTinhThuongDto {
    nhanVienId: number;
    maNhanVien: string;
    hoTen: string;
    diemTongKet: number;
    xepLoai: string;
    heSoThuong: number;
    soTienThuong: number;
}
