export declare class TaoNguoiDungDto {
    tenDangNhap: string;
    matKhau: string;
    email: string;
    hoTen: string;
    nhanVienId?: number;
    vaiTroIds?: number[];
}
export declare class CapNhatNguoiDungDto {
    email?: string;
    hoTen?: string;
    trangThai?: string;
}
export declare class DoiMatKhauDto {
    matKhauCu: string;
    matKhauMoi: string;
}
export declare class DangNhapDto {
    tenDangNhap: string;
    matKhau: string;
}
export declare class TaoVaiTroDto {
    maVaiTro: string;
    tenVaiTro: string;
    moTa?: string;
    capDo?: number;
    quyenIds?: number[];
}
export declare class CapNhatVaiTroDto {
    tenVaiTro?: string;
    moTa?: string;
    capDo?: number;
    trangThai?: boolean;
}
export declare class GanVaiTroDto {
    nguoiDungId: number;
    vaiTroId: number;
    phongBanId?: number;
    denNgay?: string;
}
export declare class GoVaiTroDto {
    nguoiDungId: number;
    vaiTroId: number;
    phongBanId?: number;
}
export declare class TaoQuyenDto {
    maQuyen: string;
    tenQuyen: string;
    nhomQuyen: string;
    moTa?: string;
}
export declare class GanQuyenChoVaiTroDto {
    vaiTroId: number;
    quyenIds: number[];
}
export declare class TaoAuditLogDto {
    nguoiDungId?: number;
    tenDangNhap: string;
    hanhDong: string;
    bangDuLieu: string;
    banGhiId?: string;
    duLieuCu?: string;
    duLieuMoi?: string;
    diaChiIP?: string;
    userAgent?: string;
    moTa?: string;
}
export declare class TimKiemAuditLogDto {
    nguoiDungId?: number;
    tenDangNhap?: string;
    hanhDong?: string;
    bangDuLieu?: string;
    tuNgay?: string;
    denNgay?: string;
    limit?: number;
    offset?: number;
}
export declare class KiemTraQuyenResponseDto {
    coQuyen: boolean;
    quyens: string[];
}
export declare class ThongTinPhienDangNhapDto {
    token: string;
    nguoiDung: {
        id: number;
        tenDangNhap: string;
        hoTen: string;
        email: string;
    };
    vaiTros: string[];
    quyens: string[];
    hetHan: Date;
}
