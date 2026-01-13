import { PrismaService } from '../../prisma/prisma.service';
import { TaoQuyCheDto, CapNhatQuyCheDto, NhanBanQuyCheDto, LocQuyCheDto } from './dto/quy-che.dto';
export declare class QuyCheService {
    private prisma;
    constructor(prisma: PrismaService);
    layDanhSach(filter: LocQuyCheDto): Promise<({
        phongBan: {
            id: number;
            maPhongBan: string;
            tenPhongBan: string;
        };
        _count: {
            bangLuongs: number;
            rules: number;
        };
        rules: ({
            khoanLuong: {
                id: number;
                maKhoan: string;
                tenKhoan: string;
                loai: import(".prisma/client").$Enums.LoaiKhoanLuong;
            };
        } & {
            id: number;
            moTa: string | null;
            trangThai: boolean;
            ngayTao: Date;
            ngayCapNhat: Date;
            khoanLuongId: number;
            nguoiTao: string | null;
            thuTuUuTien: number;
            quyCheId: number;
            tenRule: string;
            loaiRule: import(".prisma/client").$Enums.LoaiRule;
            dieuKienJson: string | null;
            congThucJson: string;
            cheDoGop: import(".prisma/client").$Enums.CheDoGop;
            choPhepChinhTay: boolean;
        })[];
    } & {
        id: number;
        moTa: string | null;
        trangThai: import(".prisma/client").$Enums.TrangThaiQuyChe;
        ngayTao: Date;
        ngayCapNhat: Date;
        phongBanId: number;
        tuNgay: Date;
        denNgay: Date | null;
        nguoiTao: string | null;
        phienBan: number;
        tenQuyChe: string;
    })[]>;
    layChiTiet(id: number): Promise<{
        daChotLuong: boolean;
        coDuocSua: boolean;
        bangLuongs: ({
            bangLuong: {
                id: number;
                trangThai: import(".prisma/client").$Enums.TrangThaiBangLuong;
                nam: number;
                thang: number;
            };
        } & {
            id: number;
            ngayTao: Date;
            bangLuongId: number;
            quyCheId: number;
            ngayApDung: Date;
            nguoiApDung: string | null;
        })[];
        phongBan: {
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
        };
        rules: ({
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
            moTa: string | null;
            trangThai: boolean;
            ngayTao: Date;
            ngayCapNhat: Date;
            khoanLuongId: number;
            nguoiTao: string | null;
            thuTuUuTien: number;
            quyCheId: number;
            tenRule: string;
            loaiRule: import(".prisma/client").$Enums.LoaiRule;
            dieuKienJson: string | null;
            congThucJson: string;
            cheDoGop: import(".prisma/client").$Enums.CheDoGop;
            choPhepChinhTay: boolean;
        })[];
        id: number;
        moTa: string | null;
        trangThai: import(".prisma/client").$Enums.TrangThaiQuyChe;
        ngayTao: Date;
        ngayCapNhat: Date;
        phongBanId: number;
        tuNgay: Date;
        denNgay: Date | null;
        nguoiTao: string | null;
        phienBan: number;
        tenQuyChe: string;
    }>;
    tao(dto: TaoQuyCheDto): Promise<{
        phongBan: {
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
        };
    } & {
        id: number;
        moTa: string | null;
        trangThai: import(".prisma/client").$Enums.TrangThaiQuyChe;
        ngayTao: Date;
        ngayCapNhat: Date;
        phongBanId: number;
        tuNgay: Date;
        denNgay: Date | null;
        nguoiTao: string | null;
        phienBan: number;
        tenQuyChe: string;
    }>;
    capNhat(id: number, dto: CapNhatQuyCheDto): Promise<{
        phongBan: {
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
        };
        rules: {
            id: number;
            moTa: string | null;
            trangThai: boolean;
            ngayTao: Date;
            ngayCapNhat: Date;
            khoanLuongId: number;
            nguoiTao: string | null;
            thuTuUuTien: number;
            quyCheId: number;
            tenRule: string;
            loaiRule: import(".prisma/client").$Enums.LoaiRule;
            dieuKienJson: string | null;
            congThucJson: string;
            cheDoGop: import(".prisma/client").$Enums.CheDoGop;
            choPhepChinhTay: boolean;
        }[];
    } & {
        id: number;
        moTa: string | null;
        trangThai: import(".prisma/client").$Enums.TrangThaiQuyChe;
        ngayTao: Date;
        ngayCapNhat: Date;
        phongBanId: number;
        tuNgay: Date;
        denNgay: Date | null;
        nguoiTao: string | null;
        phienBan: number;
        tenQuyChe: string;
    }>;
    nhanBan(id: number, dto: NhanBanQuyCheDto): Promise<{
        phongBan: {
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
        };
        rules: ({
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
            moTa: string | null;
            trangThai: boolean;
            ngayTao: Date;
            ngayCapNhat: Date;
            khoanLuongId: number;
            nguoiTao: string | null;
            thuTuUuTien: number;
            quyCheId: number;
            tenRule: string;
            loaiRule: import(".prisma/client").$Enums.LoaiRule;
            dieuKienJson: string | null;
            congThucJson: string;
            cheDoGop: import(".prisma/client").$Enums.CheDoGop;
            choPhepChinhTay: boolean;
        })[];
    } & {
        id: number;
        moTa: string | null;
        trangThai: import(".prisma/client").$Enums.TrangThaiQuyChe;
        ngayTao: Date;
        ngayCapNhat: Date;
        phongBanId: number;
        tuNgay: Date;
        denNgay: Date | null;
        nguoiTao: string | null;
        phienBan: number;
        tenQuyChe: string;
    }>;
    kichHoat(id: number): Promise<{
        phongBan: {
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
        };
        rules: {
            id: number;
            moTa: string | null;
            trangThai: boolean;
            ngayTao: Date;
            ngayCapNhat: Date;
            khoanLuongId: number;
            nguoiTao: string | null;
            thuTuUuTien: number;
            quyCheId: number;
            tenRule: string;
            loaiRule: import(".prisma/client").$Enums.LoaiRule;
            dieuKienJson: string | null;
            congThucJson: string;
            cheDoGop: import(".prisma/client").$Enums.CheDoGop;
            choPhepChinhTay: boolean;
        }[];
    } & {
        id: number;
        moTa: string | null;
        trangThai: import(".prisma/client").$Enums.TrangThaiQuyChe;
        ngayTao: Date;
        ngayCapNhat: Date;
        phongBanId: number;
        tuNgay: Date;
        denNgay: Date | null;
        nguoiTao: string | null;
        phienBan: number;
        tenQuyChe: string;
    }>;
    ngung(id: number): Promise<{
        id: number;
        moTa: string | null;
        trangThai: import(".prisma/client").$Enums.TrangThaiQuyChe;
        ngayTao: Date;
        ngayCapNhat: Date;
        phongBanId: number;
        tuNgay: Date;
        denNgay: Date | null;
        nguoiTao: string | null;
        phienBan: number;
        tenQuyChe: string;
    }>;
    layQuyCheHieuLuc(phongBanId: number, thang: number, nam: number): Promise<({
        rules: ({
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
            moTa: string | null;
            trangThai: boolean;
            ngayTao: Date;
            ngayCapNhat: Date;
            khoanLuongId: number;
            nguoiTao: string | null;
            thuTuUuTien: number;
            quyCheId: number;
            tenRule: string;
            loaiRule: import(".prisma/client").$Enums.LoaiRule;
            dieuKienJson: string | null;
            congThucJson: string;
            cheDoGop: import(".prisma/client").$Enums.CheDoGop;
            choPhepChinhTay: boolean;
        })[];
    } & {
        id: number;
        moTa: string | null;
        trangThai: import(".prisma/client").$Enums.TrangThaiQuyChe;
        ngayTao: Date;
        ngayCapNhat: Date;
        phongBanId: number;
        tuNgay: Date;
        denNgay: Date | null;
        nguoiTao: string | null;
        phienBan: number;
        tenQuyChe: string;
    }) | null>;
    xoa(id: number): Promise<{
        id: number;
        moTa: string | null;
        trangThai: import(".prisma/client").$Enums.TrangThaiQuyChe;
        ngayTao: Date;
        ngayCapNhat: Date;
        phongBanId: number;
        tuNgay: Date;
        denNgay: Date | null;
        nguoiTao: string | null;
        phienBan: number;
        tenQuyChe: string;
    }>;
}
