import { PrismaService } from '../../prisma/prisma.service';
import { LoaiThongBao } from '@prisma/client';
import { ThongBaoQueryDto, TaoThongBaoDto, ThongBaoResponse, DanhSachThongBaoResponse } from './thong-bao.dto';
export declare class ThongBaoService {
    private prisma;
    constructor(prisma: PrismaService);
    layDanhSach(nguoiDungId: number, query: ThongBaoQueryDto): Promise<DanhSachThongBaoResponse>;
    demChuaDoc(nguoiDungId: number): Promise<number>;
    danhDauDaDoc(nguoiDungId: number, thongBaoId: number): Promise<ThongBaoResponse>;
    danhDauTatCaDaDoc(nguoiDungId: number): Promise<{
        count: number;
    }>;
    xoaThongBaoCu(): Promise<{
        count: number;
    }>;
    taoThongBao(dto: TaoThongBaoDto): Promise<ThongBaoResponse>;
    taoThongBaoNhieuNguoi(nguoiNhanIds: number[], loaiThongBao: LoaiThongBao, tieuDe: string, noiDung: string, link?: string, duLieuThem?: Record<string, any>): Promise<{
        count: number;
    }>;
    guiThongBaoYeuCauMoi(nguoiDuyetId: number, nhanVienTen: string, loaiYeuCau: string, donYeuCauId: number): Promise<void>;
    guiThongBaoYeuCauDaDuyet(nguoiNhanId: number, loaiYeuCau: string, donYeuCauId: number): Promise<void>;
    guiThongBaoYeuCauTuChoi(nguoiNhanId: number, loaiYeuCau: string, donYeuCauId: number, lyDo: string): Promise<void>;
    guiThongBaoNghiPhepDaDuyet(nguoiNhanId: number, loaiNghi: string, donNghiPhepId: number): Promise<void>;
    guiThongBaoLichPhanCa(nguoiNhanIds: number[], tuNgay: string, denNgay: string, lichPhanCaId: number): Promise<void>;
    guiThongBaoPhieuLuong(nguoiNhanId: number, kyLuong: string, bangLuongId: number): Promise<void>;
    private mapToResponse;
}
