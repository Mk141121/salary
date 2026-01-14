import { PrismaService } from '../../prisma/prisma.service';
export interface TaoAuditLogDto {
    nguoiDungId?: number;
    tenDangNhap?: string;
    hanhDong: string;
    bangDuLieu: string;
    banGhiId?: string;
    duLieuCu?: string;
    duLieuMoi?: string;
    diaChiIP?: string;
    userAgent?: string;
    moTa?: string;
}
export interface TimKiemAuditLogDto {
    nguoiDungId?: number;
    tenDangNhap?: string;
    hanhDong?: string;
    bangDuLieu?: string;
    tuNgay?: string;
    denNgay?: string;
    trang?: number;
    soLuong?: number;
}
export declare class AuditLogService {
    private prisma;
    constructor(prisma: PrismaService);
    ghiLog(dto: TaoAuditLogDto): Promise<{
        id: number;
        moTa: string | null;
        ngayTao: Date;
        tenDangNhap: string;
        nguoiDungId: number | null;
        diaChiIP: string | null;
        userAgent: string | null;
        hanhDong: import(".prisma/client").$Enums.HanhDongAudit;
        bangDuLieu: string;
        banGhiId: string | null;
        duLieuCu: string | null;
        duLieuMoi: string | null;
    }>;
    ghiLogRuleEngine(params: {
        nguoiDungId?: number;
        tenDangNhap?: string;
        bangLuongId: number;
        quyCheId: number;
        soNhanVien: number;
        thoiGianXuLy: number;
        moTa?: string;
    }): Promise<{
        id: number;
        moTa: string | null;
        ngayTao: Date;
        tenDangNhap: string;
        nguoiDungId: number | null;
        diaChiIP: string | null;
        userAgent: string | null;
        hanhDong: import(".prisma/client").$Enums.HanhDongAudit;
        bangDuLieu: string;
        banGhiId: string | null;
        duLieuCu: string | null;
        duLieuMoi: string | null;
    }>;
    ghiLogChotBangLuong(params: {
        nguoiDungId?: number;
        tenDangNhap?: string;
        bangLuongId: number;
        thang: number;
        nam: number;
        phongBan: string;
    }): Promise<{
        id: number;
        moTa: string | null;
        ngayTao: Date;
        tenDangNhap: string;
        nguoiDungId: number | null;
        diaChiIP: string | null;
        userAgent: string | null;
        hanhDong: import(".prisma/client").$Enums.HanhDongAudit;
        bangDuLieu: string;
        banGhiId: string | null;
        duLieuCu: string | null;
        duLieuMoi: string | null;
    }>;
    ghiLogMoKhoaBangLuong(params: {
        nguoiDungId?: number;
        tenDangNhap?: string;
        bangLuongId: number;
        lyDo: string;
    }): Promise<{
        id: number;
        moTa: string | null;
        ngayTao: Date;
        tenDangNhap: string;
        nguoiDungId: number | null;
        diaChiIP: string | null;
        userAgent: string | null;
        hanhDong: import(".prisma/client").$Enums.HanhDongAudit;
        bangDuLieu: string;
        banGhiId: string | null;
        duLieuCu: string | null;
        duLieuMoi: string | null;
    }>;
    ghiLogKhoaBangLuong(params: {
        nguoiDungId?: number;
        tenDangNhap?: string;
        bangLuongId: number;
    }): Promise<{
        id: number;
        moTa: string | null;
        ngayTao: Date;
        tenDangNhap: string;
        nguoiDungId: number | null;
        diaChiIP: string | null;
        userAgent: string | null;
        hanhDong: import(".prisma/client").$Enums.HanhDongAudit;
        bangDuLieu: string;
        banGhiId: string | null;
        duLieuCu: string | null;
        duLieuMoi: string | null;
    }>;
    ghiLogImportExcel(params: {
        nguoiDungId?: number;
        tenDangNhap?: string;
        loaiImport: string;
        tenFile: string;
        soLuong: number;
        thanhCong: number;
        loi: number;
    }): Promise<{
        id: number;
        moTa: string | null;
        ngayTao: Date;
        tenDangNhap: string;
        nguoiDungId: number | null;
        diaChiIP: string | null;
        userAgent: string | null;
        hanhDong: import(".prisma/client").$Enums.HanhDongAudit;
        bangDuLieu: string;
        banGhiId: string | null;
        duLieuCu: string | null;
        duLieuMoi: string | null;
    }>;
    ghiLogQuyChe(params: {
        nguoiDungId?: number;
        tenDangNhap?: string;
        hanhDong: 'TAO' | 'SUA' | 'XOA' | 'DUYET' | 'TU_CHOI';
        quyCheId: number;
        tenQuyChe: string;
        duLieuCu?: any;
        duLieuMoi?: any;
    }): Promise<{
        id: number;
        moTa: string | null;
        ngayTao: Date;
        tenDangNhap: string;
        nguoiDungId: number | null;
        diaChiIP: string | null;
        userAgent: string | null;
        hanhDong: import(".prisma/client").$Enums.HanhDongAudit;
        bangDuLieu: string;
        banGhiId: string | null;
        duLieuCu: string | null;
        duLieuMoi: string | null;
    }>;
    timKiem(dto: TimKiemAuditLogDto): Promise<{
        items: ({
            nguoiDung: {
                hoTen: string;
            } | null;
        } & {
            id: number;
            moTa: string | null;
            ngayTao: Date;
            tenDangNhap: string;
            nguoiDungId: number | null;
            diaChiIP: string | null;
            userAgent: string | null;
            hanhDong: import(".prisma/client").$Enums.HanhDongAudit;
            bangDuLieu: string;
            banGhiId: string | null;
            duLieuCu: string | null;
            duLieuMoi: string | null;
        })[];
        total: number;
        trang: number;
        soLuong: number;
        tongTrang: number;
    }>;
}
