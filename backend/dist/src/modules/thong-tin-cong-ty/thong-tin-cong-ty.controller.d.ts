import { ThongTinCongTyService, CapNhatThongTinCongTyDto } from './thong-tin-cong-ty.service';
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
}
