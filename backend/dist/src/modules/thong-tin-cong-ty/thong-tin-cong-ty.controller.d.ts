import { ThongTinCongTyService, CapNhatThongTinCongTyDto, TaoCauHinhDonGiaDto, CapNhatCauHinhDonGiaDto } from './thong-tin-cong-ty.service';
export declare class ThongTinCongTyController {
    private readonly service;
    constructor(service: ThongTinCongTyService);
    layThongTin(): Promise<{
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
    capNhat(dto: CapNhatThongTinCongTyDto): Promise<{
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
    layDanhSachDonGia(phongBanId?: string): Promise<({
        phongBan: {
            id: number;
            tenPhongBan: string;
        } | null;
    } & {
        id: number;
        moTa: string | null;
        trangThai: boolean;
        ngayTao: Date;
        ngayCapNhat: Date;
        phongBanId: number | null;
        maBien: string;
        tenBien: string;
        giaTri: import("@prisma/client/runtime/library").Decimal;
        donVi: string | null;
    })[]>;
    layDonGia(id: number): Promise<{
        phongBan: {
            id: number;
            tenPhongBan: string;
        } | null;
    } & {
        id: number;
        moTa: string | null;
        trangThai: boolean;
        ngayTao: Date;
        ngayCapNhat: Date;
        phongBanId: number | null;
        maBien: string;
        tenBien: string;
        giaTri: import("@prisma/client/runtime/library").Decimal;
        donVi: string | null;
    }>;
    taoDonGia(dto: TaoCauHinhDonGiaDto): Promise<{
        phongBan: {
            id: number;
            tenPhongBan: string;
        } | null;
    } & {
        id: number;
        moTa: string | null;
        trangThai: boolean;
        ngayTao: Date;
        ngayCapNhat: Date;
        phongBanId: number | null;
        maBien: string;
        tenBien: string;
        giaTri: import("@prisma/client/runtime/library").Decimal;
        donVi: string | null;
    }>;
    capNhatDonGia(id: number, dto: CapNhatCauHinhDonGiaDto): Promise<{
        phongBan: {
            id: number;
            tenPhongBan: string;
        } | null;
    } & {
        id: number;
        moTa: string | null;
        trangThai: boolean;
        ngayTao: Date;
        ngayCapNhat: Date;
        phongBanId: number | null;
        maBien: string;
        tenBien: string;
        giaTri: import("@prisma/client/runtime/library").Decimal;
        donVi: string | null;
    }>;
    xoaDonGia(id: number): Promise<{
        id: number;
        moTa: string | null;
        trangThai: boolean;
        ngayTao: Date;
        ngayCapNhat: Date;
        phongBanId: number | null;
        maBien: string;
        tenBien: string;
        giaTri: import("@prisma/client/runtime/library").Decimal;
        donVi: string | null;
    }>;
    khoiTaoDonGiaMau(): Promise<{
        message: string;
        data: {
            id: number;
            moTa: string | null;
            trangThai: boolean;
            ngayTao: Date;
            ngayCapNhat: Date;
            phongBanId: number | null;
            maBien: string;
            tenBien: string;
            giaTri: import("@prisma/client/runtime/library").Decimal;
            donVi: string | null;
        }[];
    }>;
}
