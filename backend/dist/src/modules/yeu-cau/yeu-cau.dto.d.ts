export declare class TaoLoaiYeuCauDto {
    maLoai: string;
    tenLoai: string;
    moTa?: string;
    nhomLoai: string;
    yeuCauGioBatDau?: boolean;
    yeuCauGioKetThuc?: boolean;
    yeuCauDiaDiem?: boolean;
    coTinhOT?: boolean;
    thuTuHienThi?: number;
    mauHienThi?: string;
    icon?: string;
}
export declare class CapNhatLoaiYeuCauDto {
    tenLoai?: string;
    moTa?: string;
    yeuCauGioBatDau?: boolean;
    yeuCauGioKetThuc?: boolean;
    yeuCauDiaDiem?: boolean;
    coTinhOT?: boolean;
    thuTuHienThi?: number;
    mauHienThi?: string;
    icon?: string;
}
export declare class TaoDonYeuCauDto {
    nhanVienId: number;
    loaiYeuCauId: number;
    ngayYeuCau: string;
    gioBatDau?: string;
    gioKetThuc?: string;
    diaDiem?: string;
    lyDo: string;
    tepDinhKemUrl?: string;
}
export declare class CapNhatDonYeuCauDto {
    ngayYeuCau?: string;
    gioBatDau?: string;
    gioKetThuc?: string;
    diaDiem?: string;
    lyDo?: string;
    tepDinhKemUrl?: string;
}
export declare class DuyetDonYeuCauDto {
    ghiChu?: string;
}
export declare class TuChoiDonYeuCauDto {
    lyDoTuChoi: string;
}
export declare class OverrideDonYeuCauDto {
    lyDoOverride: string;
    duyet: boolean;
}
export declare class LocDonYeuCauDto {
    nhanVienId?: number;
    phongBanId?: number;
    loaiYeuCauId?: number;
    trangThai?: string;
    tuNgay?: string;
    denNgay?: string;
    nguoiDuyet1Id?: number;
    nguoiDuyet2Id?: number;
    page?: number;
    limit?: number;
}
export declare class TaoWorkflowConfigDto {
    loaiYeuCauId: number;
    phongBanId?: number;
    soCap: number;
    nguoiDuyet1: string;
    nguoiDuyetCuThe1Id?: number;
    nguoiDuyet2?: string;
    nguoiDuyetCuThe2Id?: number;
    tuDongDuyetNeuQuaHan?: boolean;
    soNgayQuaHan?: number;
    yeuCauLyDoTuChoi?: boolean;
    yeuCauLyDoOverride?: boolean;
}
export declare class CapNhatWorkflowConfigDto {
    soCap?: number;
    nguoiDuyet1?: string;
    nguoiDuyetCuThe1Id?: number;
    nguoiDuyet2?: string;
    nguoiDuyetCuThe2Id?: number;
    tuDongDuyetNeuQuaHan?: boolean;
    soNgayQuaHan?: number;
    yeuCauLyDoTuChoi?: boolean;
    yeuCauLyDoOverride?: boolean;
    isActive?: boolean;
}
