import { PrismaService } from '../../prisma/prisma.service';
export interface CapNhatThongTinCongTyDto {
    tenCongTy: string;
    maSoThue?: string;
    diaChi?: string;
    dienThoai?: string;
    email?: string;
    website?: string;
    logo?: string;
    nguoiDaiDien?: string;
    chucVuDaiDien?: string;
}
export interface TaoCauHinhDonGiaDto {
    maBien: string;
    tenBien: string;
    moTa?: string;
    giaTri: number;
    donVi?: string;
    phongBanId?: number;
}
export interface CapNhatCauHinhDonGiaDto {
    tenBien?: string;
    moTa?: string;
    giaTri?: number;
    donVi?: string;
    trangThai?: boolean;
}
export declare class ThongTinCongTyService {
    private prisma;
    constructor(prisma: PrismaService);
    layThongTinCongTy(): Promise<{
        id: number;
        ngayTao: Date;
        ngayCapNhat: Date;
        email: string | null;
        diaChi: string | null;
        maSoThue: string | null;
        tenCongTy: string;
        dienThoai: string | null;
        website: string | null;
        logo: string | null;
        nguoiDaiDien: string | null;
        chucVuDaiDien: string | null;
        ngayCongChuanMacDinh: number;
    }>;
    capNhatThongTinCongTy(dto: CapNhatThongTinCongTyDto): Promise<{
        id: number;
        ngayTao: Date;
        ngayCapNhat: Date;
        email: string | null;
        diaChi: string | null;
        maSoThue: string | null;
        tenCongTy: string;
        dienThoai: string | null;
        website: string | null;
        logo: string | null;
        nguoiDaiDien: string | null;
        chucVuDaiDien: string | null;
        ngayCongChuanMacDinh: number;
    }>;
    capNhatLogo(logoPath: string): Promise<{
        id: number;
        ngayTao: Date;
        ngayCapNhat: Date;
        email: string | null;
        diaChi: string | null;
        maSoThue: string | null;
        tenCongTy: string;
        dienThoai: string | null;
        website: string | null;
        logo: string | null;
        nguoiDaiDien: string | null;
        chucVuDaiDien: string | null;
        ngayCongChuanMacDinh: number;
    }>;
    layDanhSachDonGia(phongBanId?: number): Promise<({
        phongBan: {
            id: number;
            tenPhongBan: string;
        } | null;
    } & {
        id: number;
        moTa: string | null;
        trangThai: boolean;
        ngayTao: Date;
        ngayCapNhat: Date;
        phongBanId: number | null;
        maBien: string;
        tenBien: string;
        giaTri: import("@prisma/client/runtime/library").Decimal;
        donVi: string | null;
    })[]>;
    layDonGia(id: number): Promise<{
        phongBan: {
            id: number;
            tenPhongBan: string;
        } | null;
    } & {
        id: number;
        moTa: string | null;
        trangThai: boolean;
        ngayTao: Date;
        ngayCapNhat: Date;
        phongBanId: number | null;
        maBien: string;
        tenBien: string;
        giaTri: import("@prisma/client/runtime/library").Decimal;
        donVi: string | null;
    }>;
    taoDonGia(dto: TaoCauHinhDonGiaDto): Promise<{
        phongBan: {
            id: number;
            tenPhongBan: string;
        } | null;
    } & {
        id: number;
        moTa: string | null;
        trangThai: boolean;
        ngayTao: Date;
        ngayCapNhat: Date;
        phongBanId: number | null;
        maBien: string;
        tenBien: string;
        giaTri: import("@prisma/client/runtime/library").Decimal;
        donVi: string | null;
    }>;
    capNhatDonGia(id: number, dto: CapNhatCauHinhDonGiaDto): Promise<{
        phongBan: {
            id: number;
            tenPhongBan: string;
        } | null;
    } & {
        id: number;
        moTa: string | null;
        trangThai: boolean;
        ngayTao: Date;
        ngayCapNhat: Date;
        phongBanId: number | null;
        maBien: string;
        tenBien: string;
        giaTri: import("@prisma/client/runtime/library").Decimal;
        donVi: string | null;
    }>;
    xoaDonGia(id: number): Promise<{
        id: number;
        moTa: string | null;
        trangThai: boolean;
        ngayTao: Date;
        ngayCapNhat: Date;
        phongBanId: number | null;
        maBien: string;
        tenBien: string;
        giaTri: import("@prisma/client/runtime/library").Decimal;
        donVi: string | null;
    }>;
    khoiTaoDonGiaMau(): Promise<{
        message: string;
        data: {
            id: number;
            moTa: string | null;
            trangThai: boolean;
            ngayTao: Date;
            ngayCapNhat: Date;
            phongBanId: number | null;
            maBien: string;
            tenBien: string;
            giaTri: import("@prisma/client/runtime/library").Decimal;
            donVi: string | null;
        }[];
    }>;
}
