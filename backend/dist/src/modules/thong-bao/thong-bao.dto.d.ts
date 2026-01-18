import { LoaiThongBao } from '@prisma/client';
export declare class ThongBaoQueryDto {
    daDoc?: boolean;
    loaiThongBao?: LoaiThongBao;
    page?: number;
    limit?: number;
}
export declare class TaoThongBaoDto {
    nguoiNhanId: number;
    loaiThongBao: LoaiThongBao;
    tieuDe: string;
    noiDung: string;
    link?: string;
    duLieuThem?: Record<string, any>;
}
export interface ThongBaoResponse {
    id: number;
    loaiThongBao: LoaiThongBao;
    tieuDe: string;
    noiDung: string;
    link?: string | null;
    daDoc: boolean;
    ngayDoc?: Date | null;
    duLieuThem?: Record<string, any> | null;
    ngayTao: Date;
}
export interface DanhSachThongBaoResponse {
    data: ThongBaoResponse[];
    total: number;
    page: number;
    limit: number;
    chuaDoc: number;
}
export interface DemChuaDocResponse {
    chuaDoc: number;
}
