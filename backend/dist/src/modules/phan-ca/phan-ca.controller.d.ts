import { PhanCaService } from './phan-ca.service';
import { TaoLichPhanCaDto, CapNhatLichPhanCaDto, AssignBatchDto, CopyTuanDto, LocLichPhanCaDto, CalendarViewDto, ChiTietPhanCaNgayDto, XoaPhanCaDto } from './phan-ca.dto';
export declare class PhanCaController {
    private readonly phanCaService;
    constructor(phanCaService: PhanCaService);
    layDanhSach(filter: LocLichPhanCaDto): Promise<{
        data: ({
            _count: {
                chiTiets: number;
            };
        } & {
            id: number;
            trangThai: import(".prisma/client").$Enums.TrangThaiLichCa;
            taoBoi: number | null;
            capNhatBoi: number | null;
            ngayTao: Date;
            ngayCapNhat: Date;
            phongBanId: number | null;
            ghiChu: string | null;
            nhomId: number | null;
            thangNam: string;
            tenLich: string | null;
            ngayCongBo: Date | null;
            nguoiCongBo: number | null;
        })[];
        total: number;
    }>;
    layCalendarView(dto: CalendarViewDto): Promise<{
        thangNam: string;
        soNgayTrongThang: number;
        ngayDauThang: number;
        nhanViens: {
            nhanVienId: number;
            maNhanVien: string;
            hoTen: string;
            phongBanId: number;
            ngays: Record<string, any>;
        }[];
        danhSachCa: {
            id: number;
            mauHienThi: string | null;
            gioVao: string;
            gioRa: string;
            maCa: string;
            tenCa: string;
            isCaDem: boolean;
        }[];
    }>;
    layLichCuaToi(tuNgay: string, denNgay: string, req: any): Promise<{
        ngay: string;
        ca: {
            id: number;
            mauHienThi: string | null;
            gioVao: string;
            gioRa: string;
            maCa: string;
            tenCa: string;
            isCaDem: boolean;
        };
        ghiChu: string | null;
    }[]>;
    layChiTiet(id: number): Promise<{
        chiTiets: ({
            caLamViec: {
                id: number;
                mauHienThi: string | null;
                gioVao: string;
                gioRa: string;
                maCa: string;
                tenCa: string;
                isCaDem: boolean;
            };
        } & {
            id: number;
            taoBoi: number | null;
            ngayTao: Date;
            nhanVienId: number;
            ghiChu: string | null;
            ngay: Date;
            caLamViecId: number;
            lichPhanCaId: number;
        })[];
    } & {
        id: number;
        trangThai: import(".prisma/client").$Enums.TrangThaiLichCa;
        taoBoi: number | null;
        capNhatBoi: number | null;
        ngayTao: Date;
        ngayCapNhat: Date;
        phongBanId: number | null;
        ghiChu: string | null;
        nhomId: number | null;
        thangNam: string;
        tenLich: string | null;
        ngayCongBo: Date | null;
        nguoiCongBo: number | null;
    }>;
    tao(dto: TaoLichPhanCaDto, req: any): Promise<{
        id: number;
        trangThai: import(".prisma/client").$Enums.TrangThaiLichCa;
        taoBoi: number | null;
        capNhatBoi: number | null;
        ngayTao: Date;
        ngayCapNhat: Date;
        phongBanId: number | null;
        ghiChu: string | null;
        nhomId: number | null;
        thangNam: string;
        tenLich: string | null;
        ngayCongBo: Date | null;
        nguoiCongBo: number | null;
    }>;
    capNhat(id: number, dto: CapNhatLichPhanCaDto, req: any): Promise<{
        id: number;
        trangThai: import(".prisma/client").$Enums.TrangThaiLichCa;
        taoBoi: number | null;
        capNhatBoi: number | null;
        ngayTao: Date;
        ngayCapNhat: Date;
        phongBanId: number | null;
        ghiChu: string | null;
        nhomId: number | null;
        thangNam: string;
        tenLich: string | null;
        ngayCongBo: Date | null;
        nguoiCongBo: number | null;
    }>;
    assignNgay(id: number, dto: ChiTietPhanCaNgayDto, req: any): Promise<{
        caLamViec: {
            id: number;
            moTa: string | null;
            trangThai: boolean;
            taoBoi: number | null;
            capNhatBoi: number | null;
            ngayTao: Date;
            ngayCapNhat: Date;
            phongBanId: number | null;
            mauHienThi: string | null;
            gioVao: string;
            gioRa: string;
            maCa: string;
            tenCa: string;
            nghiGiuaCaPhut: number;
            graceInPhut: number;
            graceLatePhut: number;
            isCaDem: boolean;
        };
    } & {
        id: number;
        taoBoi: number | null;
        ngayTao: Date;
        nhanVienId: number;
        ghiChu: string | null;
        ngay: Date;
        caLamViecId: number;
        lichPhanCaId: number;
    }>;
    assignBatch(id: number, dto: AssignBatchDto, req: any): Promise<{
        message: string;
        created: number;
        updated: number;
        total: number;
    }>;
    copyTuan(id: number, dto: CopyTuanDto, req: any): Promise<{
        message: string;
        created: number;
        updated: number;
        total: number;
    }>;
    publish(id: number, req: any): Promise<{
        message: string;
        mapped: number;
        skipped: number;
        total: number;
    }>;
    unpublish(id: number, req: any): Promise<{
        message: string;
    }>;
    xoa(id: number): Promise<{
        message: string;
    }>;
    xoaChiTiet(id: number, dto: XoaPhanCaDto): Promise<{
        message: string;
        deleted: number;
    }>;
}
