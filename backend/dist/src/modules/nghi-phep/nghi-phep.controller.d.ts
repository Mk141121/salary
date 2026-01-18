import { NghiPhepService } from './nghi-phep.service';
import { NghiPhepMappingService } from './nghi-phep-mapping.service';
import { TaoLoaiNghiDto, CapNhatLoaiNghiDto, TaoDonNghiPhepDto, CapNhatDonNghiPhepDto, DuyetDonNghiPhepDto, TuChoiDonNghiPhepDto, HuyDonNghiPhepDto, LocDonNghiPhepDto, LocLichNghiDto } from './nghi-phep.dto';
export declare class NghiPhepController {
    private readonly nghiPhepService;
    private readonly mappingService;
    constructor(nghiPhepService: NghiPhepService, mappingService: NghiPhepMappingService);
    layDanhSachLoaiNghi(all?: string): Promise<{
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
    taoLoaiNghi(dto: TaoLoaiNghiDto, req: any): Promise<{
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
    capNhatLoaiNghi(id: number, dto: CapNhatLoaiNghiDto, req: any): Promise<{
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
    toggleLoaiNghi(id: number, req: any): Promise<{
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
            soNgayNghi: import("@prisma/client/runtime/library").Decimal;
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
            soGioNghi: import("@prisma/client/runtime/library").Decimal;
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
        soNgayNghi: import("@prisma/client/runtime/library").Decimal;
        maDon: string;
        loaiNghiId: number;
        tepDinhKemUrl: string | null;
        nguoiDuyetId: number | null;
    }>;
    taoDonNghiPhep(dto: TaoDonNghiPhepDto, req: any): Promise<{
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
        soNgayNghi: import("@prisma/client/runtime/library").Decimal;
        maDon: string;
        loaiNghiId: number;
        tepDinhKemUrl: string | null;
        nguoiDuyetId: number | null;
    }>;
    capNhatDonNghiPhep(id: number, dto: CapNhatDonNghiPhepDto, req: any): Promise<{
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
        soNgayNghi: import("@prisma/client/runtime/library").Decimal;
        maDon: string;
        loaiNghiId: number;
        tepDinhKemUrl: string | null;
        nguoiDuyetId: number | null;
    }>;
    guiDuyet(id: number, req: any): Promise<{
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
        soNgayNghi: import("@prisma/client/runtime/library").Decimal;
        maDon: string;
        loaiNghiId: number;
        tepDinhKemUrl: string | null;
        nguoiDuyetId: number | null;
    }>;
    duyetDon(id: number, dto: DuyetDonNghiPhepDto, req: any): Promise<{
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
        soNgayNghi: import("@prisma/client/runtime/library").Decimal;
        maDon: string;
        loaiNghiId: number;
        tepDinhKemUrl: string | null;
        nguoiDuyetId: number | null;
    }>;
    tuChoiDon(id: number, dto: TuChoiDonNghiPhepDto, req: any): Promise<{
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
        soNgayNghi: import("@prisma/client/runtime/library").Decimal;
        maDon: string;
        loaiNghiId: number;
        tepDinhKemUrl: string | null;
        nguoiDuyetId: number | null;
    }>;
    huyDon(id: number, dto: HuyDonNghiPhepDto, req: any): Promise<{
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
        soNgayNghi: import("@prisma/client/runtime/library").Decimal;
        maDon: string;
        loaiNghiId: number;
        tepDinhKemUrl: string | null;
        nguoiDuyetId: number | null;
    }>;
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
    layLichNghiNhanVien(nhanVienId: number, tuNgay: string, denNgay: string): Promise<{
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
