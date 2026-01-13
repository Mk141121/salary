import { KhoanLuongService } from './khoan-luong.service';
import { TaoKhoanLuongDto, CapNhatKhoanLuongDto, CapNhatThuTuDto } from './dto/khoan-luong.dto';
export declare class KhoanLuongController {
    private readonly khoanLuongService;
    constructor(khoanLuongService: KhoanLuongService);
    layTatCa(loai?: 'THU_NHAP' | 'KHAU_TRU'): Promise<{
        id: number;
        moTa: string | null;
        trangThai: boolean;
        ngayTao: Date;
        ngayCapNhat: Date;
        maKhoan: string;
        tenKhoan: string;
        loai: import(".prisma/client").$Enums.LoaiKhoanLuong;
        cachTinh: import(".prisma/client").$Enums.CachTinhLuong;
        chiuThue: boolean;
        phamViApDung: string | null;
        thuTu: number;
    }[]>;
    layTheoId(id: number): Promise<{
        _count: {
            coCauLuongChiTiets: number;
            chiTietBangLuongs: number;
        };
    } & {
        id: number;
        moTa: string | null;
        trangThai: boolean;
        ngayTao: Date;
        ngayCapNhat: Date;
        maKhoan: string;
        tenKhoan: string;
        loai: import(".prisma/client").$Enums.LoaiKhoanLuong;
        cachTinh: import(".prisma/client").$Enums.CachTinhLuong;
        chiuThue: boolean;
        phamViApDung: string | null;
        thuTu: number;
    }>;
    layTheoMa(maKhoan: string): Promise<{
        id: number;
        moTa: string | null;
        trangThai: boolean;
        ngayTao: Date;
        ngayCapNhat: Date;
        maKhoan: string;
        tenKhoan: string;
        loai: import(".prisma/client").$Enums.LoaiKhoanLuong;
        cachTinh: import(".prisma/client").$Enums.CachTinhLuong;
        chiuThue: boolean;
        phamViApDung: string | null;
        thuTu: number;
    }>;
    taoMoi(dto: TaoKhoanLuongDto): Promise<{
        id: number;
        moTa: string | null;
        trangThai: boolean;
        ngayTao: Date;
        ngayCapNhat: Date;
        maKhoan: string;
        tenKhoan: string;
        loai: import(".prisma/client").$Enums.LoaiKhoanLuong;
        cachTinh: import(".prisma/client").$Enums.CachTinhLuong;
        chiuThue: boolean;
        phamViApDung: string | null;
        thuTu: number;
    }>;
    capNhat(id: number, dto: CapNhatKhoanLuongDto): Promise<{
        id: number;
        moTa: string | null;
        trangThai: boolean;
        ngayTao: Date;
        ngayCapNhat: Date;
        maKhoan: string;
        tenKhoan: string;
        loai: import(".prisma/client").$Enums.LoaiKhoanLuong;
        cachTinh: import(".prisma/client").$Enums.CachTinhLuong;
        chiuThue: boolean;
        phamViApDung: string | null;
        thuTu: number;
    }>;
    xoa(id: number): Promise<{
        id: number;
        moTa: string | null;
        trangThai: boolean;
        ngayTao: Date;
        ngayCapNhat: Date;
        maKhoan: string;
        tenKhoan: string;
        loai: import(".prisma/client").$Enums.LoaiKhoanLuong;
        cachTinh: import(".prisma/client").$Enums.CachTinhLuong;
        chiuThue: boolean;
        phamViApDung: string | null;
        thuTu: number;
    }>;
    capNhatThuTu(dto: CapNhatThuTuDto): Promise<{
        id: number;
        moTa: string | null;
        trangThai: boolean;
        ngayTao: Date;
        ngayCapNhat: Date;
        maKhoan: string;
        tenKhoan: string;
        loai: import(".prisma/client").$Enums.LoaiKhoanLuong;
        cachTinh: import(".prisma/client").$Enums.CachTinhLuong;
        chiuThue: boolean;
        phamViApDung: string | null;
        thuTu: number;
    }[]>;
}
