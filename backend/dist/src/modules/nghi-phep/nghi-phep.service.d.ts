import { PrismaService } from '../../prisma/prisma.service';
import { NghiPhepMappingService } from './nghi-phep-mapping.service';
import { Prisma } from '@prisma/client';
import { TaoLoaiNghiDto, CapNhatLoaiNghiDto, TaoDonNghiPhepDto, CapNhatDonNghiPhepDto, DuyetDonNghiPhepDto, TuChoiDonNghiPhepDto, LocDonNghiPhepDto, LocLichNghiDto } from './nghi-phep.dto';
export declare class NghiPhepService {
    private prisma;
    private mappingService;
    private readonly logger;
    constructor(prisma: PrismaService, mappingService: NghiPhepMappingService);
    layDanhSachLoaiNghi(chiActive?: boolean): Promise<{
        id: number;
        taoBoi: number | null;
        capNhatBoi: number | null;
        ngayTao: Date;
        ngayCapNhat: Date;
        maLoaiNghi: string;
        tenLoaiNghi: string;
        nhomLoai: string;
        coTinhLuong: boolean;
        coTinhChuyenCan: boolean;
        thuTuHienThi: number;
        isActive: boolean;
    }[]>;
    layLoaiNghi(id: number): Promise<{
        id: number;
        taoBoi: number | null;
        capNhatBoi: number | null;
        ngayTao: Date;
        ngayCapNhat: Date;
        maLoaiNghi: string;
        tenLoaiNghi: string;
        nhomLoai: string;
        coTinhLuong: boolean;
        coTinhChuyenCan: boolean;
        thuTuHienThi: number;
        isActive: boolean;
    }>;
    taoLoaiNghi(dto: TaoLoaiNghiDto, taoBoi?: number): Promise<{
        id: number;
        taoBoi: number | null;
        capNhatBoi: number | null;
        ngayTao: Date;
        ngayCapNhat: Date;
        maLoaiNghi: string;
        tenLoaiNghi: string;
        nhomLoai: string;
        coTinhLuong: boolean;
        coTinhChuyenCan: boolean;
        thuTuHienThi: number;
        isActive: boolean;
    }>;
    capNhatLoaiNghi(id: number, dto: CapNhatLoaiNghiDto, capNhatBoi?: number): Promise<{
        id: number;
        taoBoi: number | null;
        capNhatBoi: number | null;
        ngayTao: Date;
        ngayCapNhat: Date;
        maLoaiNghi: string;
        tenLoaiNghi: string;
        nhomLoai: string;
        coTinhLuong: boolean;
        coTinhChuyenCan: boolean;
        thuTuHienThi: number;
        isActive: boolean;
    }>;
    toggleLoaiNghi(id: number, capNhatBoi?: number): Promise<{
        id: number;
        taoBoi: number | null;
        capNhatBoi: number | null;
        ngayTao: Date;
        ngayCapNhat: Date;
        maLoaiNghi: string;
        tenLoaiNghi: string;
        nhomLoai: string;
        coTinhLuong: boolean;
        coTinhChuyenCan: boolean;
        thuTuHienThi: number;
        isActive: boolean;
    }>;
    private taoMaDon;
    private tinhSoNgayNghi;
    taoDonNghiPhep(dto: TaoDonNghiPhepDto, taoBoi?: number): Promise<{
        phongBan: {
            id: number;
            tenPhongBan: string;
        };
        nhanVien: {
            id: number;
            maNhanVien: string;
            hoTen: string;
        };
        loaiNghi: {
            id: number;
            taoBoi: number | null;
            capNhatBoi: number | null;
            ngayTao: Date;
            ngayCapNhat: Date;
            maLoaiNghi: string;
            tenLoaiNghi: string;
            nhomLoai: string;
            coTinhLuong: boolean;
            coTinhChuyenCan: boolean;
            thuTuHienThi: number;
            isActive: boolean;
        };
    } & {
        id: number;
        trangThai: import(".prisma/client").$Enums.TrangThaiDonNghiPhep;
        taoBoi: number | null;
        ngayTao: Date;
        ngayCapNhat: Date;
        phongBanId: number;
        nhanVienId: number;
        tuNgay: Date;
        denNgay: Date;
        lyDo: string | null;
        ngayDuyet: Date | null;
        lyDoTuChoi: string | null;
        soNgayNghi: Prisma.Decimal;
        maDon: string;
        loaiNghiId: number;
        tepDinhKemUrl: string | null;
        nguoiDuyetId: number | null;
    }>;
    capNhatDonNghiPhep(id: number, dto: CapNhatDonNghiPhepDto, nguoiCapNhat?: number): Promise<{
        phongBan: {
            id: number;
            tenPhongBan: string;
        };
        nhanVien: {
            id: number;
            maNhanVien: string;
            hoTen: string;
        };
        loaiNghi: {
            id: number;
            taoBoi: number | null;
            capNhatBoi: number | null;
            ngayTao: Date;
            ngayCapNhat: Date;
            maLoaiNghi: string;
            tenLoaiNghi: string;
            nhomLoai: string;
            coTinhLuong: boolean;
            coTinhChuyenCan: boolean;
            thuTuHienThi: number;
            isActive: boolean;
        };
    } & {
        id: number;
        trangThai: import(".prisma/client").$Enums.TrangThaiDonNghiPhep;
        taoBoi: number | null;
        ngayTao: Date;
        ngayCapNhat: Date;
        phongBanId: number;
        nhanVienId: number;
        tuNgay: Date;
        denNgay: Date;
        lyDo: string | null;
        ngayDuyet: Date | null;
        lyDoTuChoi: string | null;
        soNgayNghi: Prisma.Decimal;
        maDon: string;
        loaiNghiId: number;
        tepDinhKemUrl: string | null;
        nguoiDuyetId: number | null;
    }>;
    guiDuyet(id: number, nguoiGui?: number): Promise<{
        phongBan: {
            id: number;
            tenPhongBan: string;
        };
        nhanVien: {
            id: number;
            maNhanVien: string;
            hoTen: string;
        };
        loaiNghi: {
            id: number;
            taoBoi: number | null;
            capNhatBoi: number | null;
            ngayTao: Date;
            ngayCapNhat: Date;
            maLoaiNghi: string;
            tenLoaiNghi: string;
            nhomLoai: string;
            coTinhLuong: boolean;
            coTinhChuyenCan: boolean;
            thuTuHienThi: number;
            isActive: boolean;
        };
    } & {
        id: number;
        trangThai: import(".prisma/client").$Enums.TrangThaiDonNghiPhep;
        taoBoi: number | null;
        ngayTao: Date;
        ngayCapNhat: Date;
        phongBanId: number;
        nhanVienId: number;
        tuNgay: Date;
        denNgay: Date;
        lyDo: string | null;
        ngayDuyet: Date | null;
        lyDoTuChoi: string | null;
        soNgayNghi: Prisma.Decimal;
        maDon: string;
        loaiNghiId: number;
        tepDinhKemUrl: string | null;
        nguoiDuyetId: number | null;
    }>;
    duyetDon(id: number, dto: DuyetDonNghiPhepDto, nguoiDuyetId: number): Promise<{
        phongBan: {
            id: number;
            tenPhongBan: string;
        };
        nhanVien: {
            id: number;
            maNhanVien: string;
            hoTen: string;
        };
        nguoiDuyet: {
            id: number;
            hoTen: string;
        } | null;
        loaiNghi: {
            id: number;
            taoBoi: number | null;
            capNhatBoi: number | null;
            ngayTao: Date;
            ngayCapNhat: Date;
            maLoaiNghi: string;
            tenLoaiNghi: string;
            nhomLoai: string;
            coTinhLuong: boolean;
            coTinhChuyenCan: boolean;
            thuTuHienThi: number;
            isActive: boolean;
        };
    } & {
        id: number;
        trangThai: import(".prisma/client").$Enums.TrangThaiDonNghiPhep;
        taoBoi: number | null;
        ngayTao: Date;
        ngayCapNhat: Date;
        phongBanId: number;
        nhanVienId: number;
        tuNgay: Date;
        denNgay: Date;
        lyDo: string | null;
        ngayDuyet: Date | null;
        lyDoTuChoi: string | null;
        soNgayNghi: Prisma.Decimal;
        maDon: string;
        loaiNghiId: number;
        tepDinhKemUrl: string | null;
        nguoiDuyetId: number | null;
    }>;
    tuChoiDon(id: number, dto: TuChoiDonNghiPhepDto, nguoiDuyetId: number): Promise<{
        phongBan: {
            id: number;
            tenPhongBan: string;
        };
        nhanVien: {
            id: number;
            maNhanVien: string;
            hoTen: string;
        };
        nguoiDuyet: {
            id: number;
            hoTen: string;
        } | null;
        loaiNghi: {
            id: number;
            taoBoi: number | null;
            capNhatBoi: number | null;
            ngayTao: Date;
            ngayCapNhat: Date;
            maLoaiNghi: string;
            tenLoaiNghi: string;
            nhomLoai: string;
            coTinhLuong: boolean;
            coTinhChuyenCan: boolean;
            thuTuHienThi: number;
            isActive: boolean;
        };
    } & {
        id: number;
        trangThai: import(".prisma/client").$Enums.TrangThaiDonNghiPhep;
        taoBoi: number | null;
        ngayTao: Date;
        ngayCapNhat: Date;
        phongBanId: number;
        nhanVienId: number;
        tuNgay: Date;
        denNgay: Date;
        lyDo: string | null;
        ngayDuyet: Date | null;
        lyDoTuChoi: string | null;
        soNgayNghi: Prisma.Decimal;
        maDon: string;
        loaiNghiId: number;
        tepDinhKemUrl: string | null;
        nguoiDuyetId: number | null;
    }>;
    huyDon(id: number, nguoiHuy?: number): Promise<{
        phongBan: {
            id: number;
            tenPhongBan: string;
        };
        nhanVien: {
            id: number;
            maNhanVien: string;
            hoTen: string;
        };
        loaiNghi: {
            id: number;
            taoBoi: number | null;
            capNhatBoi: number | null;
            ngayTao: Date;
            ngayCapNhat: Date;
            maLoaiNghi: string;
            tenLoaiNghi: string;
            nhomLoai: string;
            coTinhLuong: boolean;
            coTinhChuyenCan: boolean;
            thuTuHienThi: number;
            isActive: boolean;
        };
    } & {
        id: number;
        trangThai: import(".prisma/client").$Enums.TrangThaiDonNghiPhep;
        taoBoi: number | null;
        ngayTao: Date;
        ngayCapNhat: Date;
        phongBanId: number;
        nhanVienId: number;
        tuNgay: Date;
        denNgay: Date;
        lyDo: string | null;
        ngayDuyet: Date | null;
        lyDoTuChoi: string | null;
        soNgayNghi: Prisma.Decimal;
        maDon: string;
        loaiNghiId: number;
        tepDinhKemUrl: string | null;
        nguoiDuyetId: number | null;
    }>;
    layChiTietDon(id: number): Promise<{
        phongBan: {
            id: number;
            tenPhongBan: string;
        };
        nhanVien: {
            id: number;
            maNhanVien: string;
            hoTen: string;
        };
        nguoiDuyet: {
            id: number;
            hoTen: string;
        } | null;
        loaiNghi: {
            id: number;
            taoBoi: number | null;
            capNhatBoi: number | null;
            ngayTao: Date;
            ngayCapNhat: Date;
            maLoaiNghi: string;
            tenLoaiNghi: string;
            nhomLoai: string;
            coTinhLuong: boolean;
            coTinhChuyenCan: boolean;
            thuTuHienThi: number;
            isActive: boolean;
        };
        chiTietNgays: ({
            loaiNghi: {
                id: number;
                taoBoi: number | null;
                capNhatBoi: number | null;
                ngayTao: Date;
                ngayCapNhat: Date;
                maLoaiNghi: string;
                tenLoaiNghi: string;
                nhomLoai: string;
                coTinhLuong: boolean;
                coTinhChuyenCan: boolean;
                thuTuHienThi: number;
                isActive: boolean;
            };
        } & {
            id: number;
            ngayTao: Date;
            nhanVienId: number;
            coTinhLuong: boolean;
            coTinhChuyenCan: boolean;
            ngay: Date;
            loaiNghiId: number;
            donNghiPhepId: number;
            soGioNghi: Prisma.Decimal;
        })[];
    } & {
        id: number;
        trangThai: import(".prisma/client").$Enums.TrangThaiDonNghiPhep;
        taoBoi: number | null;
        ngayTao: Date;
        ngayCapNhat: Date;
        phongBanId: number;
        nhanVienId: number;
        tuNgay: Date;
        denNgay: Date;
        lyDo: string | null;
        ngayDuyet: Date | null;
        lyDoTuChoi: string | null;
        soNgayNghi: Prisma.Decimal;
        maDon: string;
        loaiNghiId: number;
        tepDinhKemUrl: string | null;
        nguoiDuyetId: number | null;
    }>;
    layDanhSachDon(filter: LocDonNghiPhepDto): Promise<{
        items: ({
            phongBan: {
                id: number;
                tenPhongBan: string;
            };
            nhanVien: {
                id: number;
                maNhanVien: string;
                hoTen: string;
            };
            nguoiDuyet: {
                id: number;
                hoTen: string;
            } | null;
            loaiNghi: {
                id: number;
                taoBoi: number | null;
                capNhatBoi: number | null;
                ngayTao: Date;
                ngayCapNhat: Date;
                maLoaiNghi: string;
                tenLoaiNghi: string;
                nhomLoai: string;
                coTinhLuong: boolean;
                coTinhChuyenCan: boolean;
                thuTuHienThi: number;
                isActive: boolean;
            };
        } & {
            id: number;
            trangThai: import(".prisma/client").$Enums.TrangThaiDonNghiPhep;
            taoBoi: number | null;
            ngayTao: Date;
            ngayCapNhat: Date;
            phongBanId: number;
            nhanVienId: number;
            tuNgay: Date;
            denNgay: Date;
            lyDo: string | null;
            ngayDuyet: Date | null;
            lyDoTuChoi: string | null;
            soNgayNghi: Prisma.Decimal;
            maDon: string;
            loaiNghiId: number;
            tepDinhKemUrl: string | null;
            nguoiDuyetId: number | null;
        })[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    layLichNghi(filter: LocLichNghiDto): Promise<{
        nhanVien: {
            id: number;
            maNhanVien: string;
            hoTen: string;
        };
        chiTietNgays: {
            ngay: Date;
            soGioNghi: number;
            loaiNghi: {
                id: number;
                taoBoi: number | null;
                capNhatBoi: number | null;
                ngayTao: Date;
                ngayCapNhat: Date;
                maLoaiNghi: string;
                tenLoaiNghi: string;
                nhomLoai: string;
                coTinhLuong: boolean;
                coTinhChuyenCan: boolean;
                thuTuHienThi: number;
                isActive: boolean;
            };
            coTinhLuong: boolean;
            coTinhChuyenCan: boolean;
            donNghiPhep: {
                id: number;
                trangThai: import(".prisma/client").$Enums.TrangThaiDonNghiPhep;
                maDon: string;
            };
        }[];
    }[]>;
    rebuildMapping(id: number): Promise<{
        soNgayTao: number;
        soNgayCapNhatChamCong: number;
        thongKeNgayCong: {
            soNgayNghiCoPhep: number;
            soNgayNghiKhongPhep: number;
            soNgayNghiCoLuong: number;
            soNgayNghiKhongLuong: number;
        };
    }>;
}
