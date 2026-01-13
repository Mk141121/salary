import { PrismaService } from '../../prisma/prisma.service';
import { TinhLuongService } from '../bang-luong/tinh-luong.service';
export interface CotExcel {
    soCot: number;
    tenCot: string;
    loaiMapping: 'thong_tin' | 'khoan_luong';
    truongHeThong?: string;
    khoanLuongId?: number;
}
export interface KetQuaImport {
    thanhCong: boolean;
    tongDong: number;
    dongThanhCong: number;
    dongLoi: number;
    chiTietLoi: {
        dong: number;
        lyDo: string;
    }[];
    tongTienImport: number;
    bangLuongId: number;
}
export interface DuLieuDongExcel {
    soDong: number;
    maNhanVien?: string;
    hoTen?: string;
    phongBan?: string;
    cacKhoan: {
        khoanLuongId: number;
        soTien: number;
    }[];
}
export declare class ImportExcelService {
    private prisma;
    private tinhLuongService;
    constructor(prisma: PrismaService, tinhLuongService: TinhLuongService);
    docHeaderExcel(buffer: Buffer): Promise<{
        headers: string[];
        duLieuMau: string[][];
    }>;
    layDanhSachMapping(): Promise<{
        id: number;
        trangThai: boolean;
        ngayTao: Date;
        ngayCapNhat: Date;
        khoanLuongId: number | null;
        truongHeThong: string | null;
        tenMapping: string;
        tenCotExcel: string;
        thuTuCot: number;
    }[]>;
    goiYMapping(headers: string[]): Promise<CotExcel[]>;
    private soSanhGanDung;
    importExcel(buffer: Buffer, thang: number, nam: number, phongBanId: number, mappings: CotExcel[]): Promise<KetQuaImport>;
    exportExcel(bangLuongId: number): Promise<Buffer>;
}
