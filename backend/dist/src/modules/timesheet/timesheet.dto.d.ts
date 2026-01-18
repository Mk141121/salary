export declare class TimesheetQueryDto {
    thang: number;
    nam: number;
    phongBanId?: number;
    nhanVienId?: number;
    search?: string;
    page?: number;
    limit?: number;
}
export declare class TaoYeuCauSuaCongDto {
    nhanVienId: number;
    ngayChamCong: string;
    gioVaoMoi?: string;
    gioRaMoi?: string;
    trangThaiMoi?: string;
    lyDo: string;
    bangChung?: string;
}
export declare class DuyetYeuCauSuaCongDto {
    trangThaiDuyet: 'DA_DUYET' | 'TU_CHOI';
    lyDoTuChoi?: string;
}
export declare class SuaCongTrucTiepDto {
    nhanVienId: number;
    ngayChamCong: string;
    gioVao?: string;
    gioRa?: string;
    trangThai?: string;
    loaiNgay?: string;
    ghiChu: string;
}
export declare class YeuCauSuaCongQueryDto {
    nhanVienId?: number;
    phongBanId?: number;
    trangThaiDuyet?: string;
    tuNgay?: string;
    denNgay?: string;
    page?: number;
    limit?: number;
}
export declare class LichSuSuaCongQueryDto {
    nhanVienId?: number;
    tuNgay?: string;
    denNgay?: string;
    page?: number;
    limit?: number;
}
export interface TimesheetNhanVien {
    nhanVienId: number;
    hoTen: string;
    maNhanVien: string;
    phongBan?: {
        id: number;
        tenPhongBan: string;
    };
    chiTiet: TimesheetNgay[];
    tongKet: {
        soNgayDiLam: number;
        soNgayNghi: number;
        soNgayPhep: number;
        soGioLam: number;
        soGioOT: number;
        soLanDiTre: number;
        soLanVeSom: number;
        tongPhutDiTre: number;
        tongPhutVeSom: number;
    };
}
export interface TimesheetNgay {
    ngay: string;
    thuTrongTuan: number;
    loaiNgay: string;
    trangThai: string;
    gioVao?: string;
    gioRa?: string;
    gioVaoDuKien?: string;
    gioRaDuKien?: string;
    caLamViec?: {
        id: number;
        tenCa: string;
    };
    soGioLam: number;
    soGioOT: number;
    phutDiTre?: number;
    phutVeSom?: number;
    ghiChu?: string;
    coYeuCauSuaCong?: boolean;
}
export interface YeuCauSuaCongResponse {
    id: number;
    nhanVienId: number;
    ngayChamCong: Date;
    gioVaoCu?: Date;
    gioRaCu?: Date;
    trangThaiCu?: string;
    gioVaoMoi?: Date;
    gioRaMoi?: Date;
    trangThaiMoi?: string;
    lyDo: string;
    bangChung?: string;
    trangThaiDuyet: string;
    nguoiDuyetId?: number;
    ngayDuyet?: Date;
    lyDoTuChoi?: string;
    nguoiTaoId: number;
    ngayTao: Date;
    nhanVien?: {
        id: number;
        hoTen: string;
        maNhanVien: string;
    };
    nguoiDuyet?: {
        id: number;
        hoTen: string;
    };
    nguoiTao?: {
        id: number;
        hoTen: string;
    };
}
export interface LichSuSuaCongResponse {
    id: number;
    nhanVienId: number;
    ngayChamCong: Date;
    truongThayDoi: string;
    giaTriCu?: string;
    giaTriMoi?: string;
    nguonThayDoi: string;
    yeuCauSuaCongId?: number;
    nguoiThucHienId: number;
    ghiChu?: string;
    ngayTao: Date;
    nhanVien?: {
        id: number;
        hoTen: string;
        maNhanVien: string;
    };
    nguoiThucHien?: {
        id: number;
        hoTen: string;
    };
}
export interface ThongKeTimesheet {
    thang: number;
    nam: number;
    tongNhanVien: number;
    tongNgayCong: number;
    tongNgayNghi: number;
    tongNgayPhep: number;
    tongGioOT: number;
    tongLanDiTre: number;
    tongLanVeSom: number;
    yeuCauSuaCong: {
        choDuyet: number;
        daDuyet: number;
        tuChoi: number;
    };
}
