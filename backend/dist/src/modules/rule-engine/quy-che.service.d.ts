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
            tenRule: string;
            loaiRule: import(".prisma/client").$Enums.LoaiRule;
            dieuKienJson: string | null;
            congThucJson: string;
            thuTuUuTien: number;
            cheDoGop: import(".prisma/client").$Enums.CheDoGop;
            choPhepChinhTay: boolean;
            quyCheId: number;
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
        tenQuyChe: string;
        phienBan: number;
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
            trangThai: string;
            phongBanChaId: number | null;
            capDo: number;
            loaiPhongBan: string | null;
            nguoiQuanLyId: number | null;
            gioVaoChuan: string;
            gioRaChuan: string;
            phutChoPhepTre: number;
            taoBoi: number | null;
            capNhatBoi: number | null;
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
            tenRule: string;
            loaiRule: import(".prisma/client").$Enums.LoaiRule;
            dieuKienJson: string | null;
            congThucJson: string;
            thuTuUuTien: number;
            cheDoGop: import(".prisma/client").$Enums.CheDoGop;
            choPhepChinhTay: boolean;
            quyCheId: number;
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
        tenQuyChe: string;
        phienBan: number;
    }>;
    tao(dto: TaoQuyCheDto): Promise<{
        phongBan: {
            id: number;
            maPhongBan: string;
            tenPhongBan: string;
            moTa: string | null;
            trangThai: string;
            phongBanChaId: number | null;
            capDo: number;
            loaiPhongBan: string | null;
            nguoiQuanLyId: number | null;
            gioVaoChuan: string;
            gioRaChuan: string;
            phutChoPhepTre: number;
            taoBoi: number | null;
            capNhatBoi: number | null;
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
        tenQuyChe: string;
        phienBan: number;
    }>;
    private kiemTraOverlapQuyChe;
    capNhat(id: number, dto: CapNhatQuyCheDto): Promise<{
        phongBan: {
            id: number;
            maPhongBan: string;
            tenPhongBan: string;
            moTa: string | null;
            trangThai: string;
            phongBanChaId: number | null;
            capDo: number;
            loaiPhongBan: string | null;
            nguoiQuanLyId: number | null;
            gioVaoChuan: string;
            gioRaChuan: string;
            phutChoPhepTre: number;
            taoBoi: number | null;
            capNhatBoi: number | null;
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
            tenRule: string;
            loaiRule: import(".prisma/client").$Enums.LoaiRule;
            dieuKienJson: string | null;
            congThucJson: string;
            thuTuUuTien: number;
            cheDoGop: import(".prisma/client").$Enums.CheDoGop;
            choPhepChinhTay: boolean;
            quyCheId: number;
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
        tenQuyChe: string;
        phienBan: number;
    }>;
    nhanBan(id: number, dto: NhanBanQuyCheDto): Promise<{
        phongBan: {
            id: number;
            maPhongBan: string;
            tenPhongBan: string;
            moTa: string | null;
            trangThai: string;
            phongBanChaId: number | null;
            capDo: number;
            loaiPhongBan: string | null;
            nguoiQuanLyId: number | null;
            gioVaoChuan: string;
            gioRaChuan: string;
            phutChoPhepTre: number;
            taoBoi: number | null;
            capNhatBoi: number | null;
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
            tenRule: string;
            loaiRule: import(".prisma/client").$Enums.LoaiRule;
            dieuKienJson: string | null;
            congThucJson: string;
            thuTuUuTien: number;
            cheDoGop: import(".prisma/client").$Enums.CheDoGop;
            choPhepChinhTay: boolean;
            quyCheId: number;
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
        tenQuyChe: string;
        phienBan: number;
    }>;
    kichHoat(id: number): Promise<{
        phongBan: {
            id: number;
            maPhongBan: string;
            tenPhongBan: string;
            moTa: string | null;
            trangThai: string;
            phongBanChaId: number | null;
            capDo: number;
            loaiPhongBan: string | null;
            nguoiQuanLyId: number | null;
            gioVaoChuan: string;
            gioRaChuan: string;
            phutChoPhepTre: number;
            taoBoi: number | null;
            capNhatBoi: number | null;
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
            tenRule: string;
            loaiRule: import(".prisma/client").$Enums.LoaiRule;
            dieuKienJson: string | null;
            congThucJson: string;
            thuTuUuTien: number;
            cheDoGop: import(".prisma/client").$Enums.CheDoGop;
            choPhepChinhTay: boolean;
            quyCheId: number;
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
        tenQuyChe: string;
        phienBan: number;
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
        tenQuyChe: string;
        phienBan: number;
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
            tenRule: string;
            loaiRule: import(".prisma/client").$Enums.LoaiRule;
            dieuKienJson: string | null;
            congThucJson: string;
            thuTuUuTien: number;
            cheDoGop: import(".prisma/client").$Enums.CheDoGop;
            choPhepChinhTay: boolean;
            quyCheId: number;
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
        tenQuyChe: string;
        phienBan: number;
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
        tenQuyChe: string;
        phienBan: number;
    }>;
}
