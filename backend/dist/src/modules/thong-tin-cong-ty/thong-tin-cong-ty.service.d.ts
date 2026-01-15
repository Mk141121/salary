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
}
