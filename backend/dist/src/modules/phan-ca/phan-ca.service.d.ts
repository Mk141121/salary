import { PrismaService } from '../../prisma/prisma.service';
import { CaLamViecService } from '../ca-lam-viec/ca-lam-viec.service';
import { TaoLichPhanCaDto, CapNhatLichPhanCaDto, AssignBatchDto, CopyTuanDto, LocLichPhanCaDto, CalendarViewDto, ChiTietPhanCaNgayDto } from './phan-ca.dto';
export declare class PhanCaService {
    private prisma;
    private caLamViecService;
    constructor(prisma: PrismaService, caLamViecService: CaLamViecService);
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
    tao(dto: TaoLichPhanCaDto, nguoiTaoId?: number): Promise<{
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
    capNhat(id: number, dto: CapNhatLichPhanCaDto, nguoiCapNhatId?: number): Promise<{
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
    assignNgay(lichId: number, dto: ChiTietPhanCaNgayDto, nguoiTaoId?: number): Promise<{
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
    assignBatch(lichId: number, dto: AssignBatchDto, nguoiTaoId?: number): Promise<{
        message: string;
        created: number;
        updated: number;
        total: number;
    }>;
    copyTuan(lichId: number, dto: CopyTuanDto, nguoiTaoId?: number): Promise<{
        message: string;
        created: number;
        updated: number;
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
    publish(id: number, nguoiCongBoId?: number): Promise<{
        message: string;
        mapped: number;
        skipped: number;
        total: number;
    }>;
    unpublish(id: number, nguoiCapNhatId?: number): Promise<{
        message: string;
    }>;
    xoa(id: number): Promise<{
        message: string;
    }>;
    xoaChiTiet(lichId: number, chiTietIds: number[]): Promise<{
        message: string;
        deleted: number;
    }>;
    layLichCuaToi(nhanVienId: number, tuNgay: string, denNgay: string): Promise<{
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
}
