import { NhomNhanVienService } from './nhom-nhan-vien.service';
import { TaoNhomDto, CapNhatNhomDto, ThemVaoNhomDto, GoKhoiNhomDto } from './nhom-nhan-vien.dto';
export declare class NhomNhanVienController {
    private readonly nhomNhanVienService;
    constructor(nhomNhanVienService: NhomNhanVienService);
    layDanhSachNhom(): Promise<({
        _count: {
            thanhViens: number;
        };
    } & {
        id: number;
        moTa: string | null;
        trangThai: boolean;
        ngayTao: Date;
        maNhom: string;
        tenNhom: string;
        mauSac: string | null;
    })[]>;
    layNhomTheoId(id: number): Promise<{
        thanhViens: ({
            nhanVien: {
                trangThai: import(".prisma/client").$Enums.TrangThaiNhanVien;
                maNhanVien: string;
                hoTen: string;
            };
        } & {
            id: number;
            ngayTao: Date;
            nhanVienId: number;
            tuNgay: Date | null;
            denNgay: Date | null;
            nhomId: number;
        })[];
    } & {
        id: number;
        moTa: string | null;
        trangThai: boolean;
        ngayTao: Date;
        maNhom: string;
        tenNhom: string;
        mauSac: string | null;
    }>;
    taoNhom(dto: TaoNhomDto): Promise<{
        id: number;
        moTa: string | null;
        trangThai: boolean;
        ngayTao: Date;
        maNhom: string;
        tenNhom: string;
        mauSac: string | null;
    }>;
    capNhatNhom(id: number, dto: CapNhatNhomDto): Promise<{
        id: number;
        moTa: string | null;
        trangThai: boolean;
        ngayTao: Date;
        maNhom: string;
        tenNhom: string;
        mauSac: string | null;
    }>;
    xoaNhom(id: number): Promise<{
        id: number;
        moTa: string | null;
        trangThai: boolean;
        ngayTao: Date;
        maNhom: string;
        tenNhom: string;
        mauSac: string | null;
    }>;
    layNhomCuaNhanVien(nhanVienId: number): Promise<({
        nhom: {
            id: number;
            moTa: string | null;
            trangThai: boolean;
            ngayTao: Date;
            maNhom: string;
            tenNhom: string;
            mauSac: string | null;
        };
    } & {
        id: number;
        ngayTao: Date;
        nhanVienId: number;
        tuNgay: Date | null;
        denNgay: Date | null;
        nhomId: number;
    })[]>;
    themVaoNhom(nhanVienId: number, dto: ThemVaoNhomDto): Promise<{
        nhom: {
            id: number;
            moTa: string | null;
            trangThai: boolean;
            ngayTao: Date;
            maNhom: string;
            tenNhom: string;
            mauSac: string | null;
        };
    } & {
        id: number;
        ngayTao: Date;
        nhanVienId: number;
        tuNgay: Date | null;
        denNgay: Date | null;
        nhomId: number;
    }>;
    goKhoiNhom(nhanVienId: number, dto: GoKhoiNhomDto): Promise<{
        id: number;
        ngayTao: Date;
        nhanVienId: number;
        tuNgay: Date | null;
        denNgay: Date | null;
        nhomId: number;
    }>;
}
