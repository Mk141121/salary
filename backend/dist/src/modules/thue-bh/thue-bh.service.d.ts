import { PrismaService } from '../../prisma/prisma.service';
import { TaoThueBHDto, CapNhatThueBHDto } from './thue-bh.dto';
export declare class ThueBHService {
    private prisma;
    constructor(prisma: PrismaService);
    layTheoNhanVien(nhanVienId: number): Promise<{
        id: number;
        ngayTao: Date;
        ngayCapNhat: Date;
        nhanVienId: number;
        ghiChu: string | null;
        mstCaNhan: string | null;
        soCmndCccd: string | null;
        ngayCap: Date | null;
        noiCap: string | null;
        soNguoiPhuThuoc: number;
    } | null>;
    taoHoacCapNhat(nhanVienId: number, dto: TaoThueBHDto): Promise<{
        id: number;
        ngayTao: Date;
        ngayCapNhat: Date;
        nhanVienId: number;
        ghiChu: string | null;
        mstCaNhan: string | null;
        soCmndCccd: string | null;
        ngayCap: Date | null;
        noiCap: string | null;
        soNguoiPhuThuoc: number;
    }>;
    capNhat(id: number, dto: CapNhatThueBHDto): Promise<{
        id: number;
        ngayTao: Date;
        ngayCapNhat: Date;
        nhanVienId: number;
        ghiChu: string | null;
        mstCaNhan: string | null;
        soCmndCccd: string | null;
        ngayCap: Date | null;
        noiCap: string | null;
        soNguoiPhuThuoc: number;
    }>;
    xoa(id: number): Promise<{
        message: string;
    }>;
}
