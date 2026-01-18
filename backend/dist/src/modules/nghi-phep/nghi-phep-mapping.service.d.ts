import { PrismaService } from '../../prisma/prisma.service';
export declare class NghiPhepMappingService {
    private prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    taoChiTietNgayNghi(donNghiPhepId: number): Promise<{
        soNgayTao: number;
    }>;
    dongBoChamCong(donNghiPhepId: number): Promise<{
        soNgayCapNhat: number;
    }>;
    capNhatNgayCongBangLuong(thangNam: string, nhanVienId: number): Promise<{
        soNgayNghiCoPhep: number;
        soNgayNghiKhongPhep: number;
        soNgayNghiCoLuong: number;
        soNgayNghiKhongLuong: number;
    }>;
    rebuildMapping(donNghiPhepId: number): Promise<{
        soNgayTao: number;
        soNgayCapNhatChamCong: number;
        thongKeNgayCong: {
            soNgayNghiCoPhep: number;
            soNgayNghiKhongPhep: number;
            soNgayNghiCoLuong: number;
            soNgayNghiKhongLuong: number;
        };
    }>;
    xoaMapping(donNghiPhepId: number): Promise<{
        soNgayXoa: number;
    }>;
    layLichNghiNhanVien(nhanVienId: number, tuNgay: Date, denNgay: Date): Promise<{
        chiTietNgays: Array<{
            ngay: Date;
            soGioNghi: number;
            loaiNghi: {
                id: number;
                maLoaiNghi: string;
                tenLoaiNghi: string;
            };
            coTinhLuong: boolean;
            coTinhChuyenCan: boolean;
            donNghiPhep: {
                id: number;
                maDon: string;
                trangThai: string;
            };
        }>;
    }>;
}
