import { PrismaService } from '../../prisma/prisma.service';
import { TaoPhongBanDto, CapNhatPhongBanDto } from './dto/phong-ban.dto';
export declare class PhongBanService {
    private prisma;
    constructor(prisma: PrismaService);
    layTatCa(): Promise<({
        _count: {
            nhanViens: number;
        };
    } & {
        id: number;
        maPhongBan: string;
        tenPhongBan: string;
        moTa: string | null;
        trangThai: boolean;
        gioVaoChuan: string;
        gioRaChuan: string;
        phutChoPhepTre: number;
        ngayTao: Date;
        ngayCapNhat: Date;
    })[]>;
    layTheoId(id: number): Promise<{
        nhanViens: {
            id: number;
            trangThai: import(".prisma/client").$Enums.TrangThaiNhanVien;
            ngayTao: Date;
            ngayCapNhat: Date;
            maNhanVien: string;
            email: string | null;
            hoTen: string;
            soDienThoai: string | null;
            phongBanId: number;
            chucVu: string | null;
            luongCoBan: import("@prisma/client/runtime/library").Decimal;
            ngayVaoLam: Date;
        }[];
        coCauLuongs: ({
            chiTiets: ({
                khoanLuong: {
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
                };
            } & {
                id: number;
                ngayTao: Date;
                ngayCapNhat: Date;
                khoanLuongId: number;
                coCauLuongId: number;
                batBuoc: boolean;
                giaTriMacDinh: import("@prisma/client/runtime/library").Decimal;
            })[];
        } & {
            id: number;
            moTa: string | null;
            trangThai: boolean;
            ngayTao: Date;
            ngayCapNhat: Date;
            phongBanId: number;
            tenCoCau: string;
        })[];
        _count: {
            nhanViens: number;
            bangLuongs: number;
        };
    } & {
        id: number;
        maPhongBan: string;
        tenPhongBan: string;
        moTa: string | null;
        trangThai: boolean;
        gioVaoChuan: string;
        gioRaChuan: string;
        phutChoPhepTre: number;
        ngayTao: Date;
        ngayCapNhat: Date;
    }>;
    taoMoi(dto: TaoPhongBanDto): Promise<{
        id: number;
        maPhongBan: string;
        tenPhongBan: string;
        moTa: string | null;
        trangThai: boolean;
        gioVaoChuan: string;
        gioRaChuan: string;
        phutChoPhepTre: number;
        ngayTao: Date;
        ngayCapNhat: Date;
    }>;
    capNhat(id: number, dto: CapNhatPhongBanDto): Promise<{
        id: number;
        maPhongBan: string;
        tenPhongBan: string;
        moTa: string | null;
        trangThai: boolean;
        gioVaoChuan: string;
        gioRaChuan: string;
        phutChoPhepTre: number;
        ngayTao: Date;
        ngayCapNhat: Date;
    }>;
    xoa(id: number): Promise<{
        id: number;
        maPhongBan: string;
        tenPhongBan: string;
        moTa: string | null;
        trangThai: boolean;
        gioVaoChuan: string;
        gioRaChuan: string;
        phutChoPhepTre: number;
        ngayTao: Date;
        ngayCapNhat: Date;
    }>;
    layNhanVienTheoPhongBan(id: number): Promise<{
        id: number;
        trangThai: import(".prisma/client").$Enums.TrangThaiNhanVien;
        ngayTao: Date;
        ngayCapNhat: Date;
        maNhanVien: string;
        email: string | null;
        hoTen: string;
        soDienThoai: string | null;
        phongBanId: number;
        chucVu: string | null;
        luongCoBan: import("@prisma/client/runtime/library").Decimal;
        ngayVaoLam: Date;
    }[]>;
}
