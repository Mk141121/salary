export declare class LichLamViecQueryDto {
    tuNgay?: string;
    denNgay?: string;
}
export declare class ChamCongQueryDto {
    thang?: number;
    nam?: number;
}
export declare class PhieuLuongQueryDto {
    nam?: number;
    page?: number;
    limit?: number;
}
export interface DashboardResponse {
    nhanVien: {
        id: number;
        maNhanVien: string;
        hoTen: string;
        avatar?: string;
        phongBan: string;
        chucVu?: string;
    };
    caHomNay?: {
        id: number;
        maCa: string;
        tenCa: string;
        gioVao: string;
        gioRa: string;
        mauHienThi?: string;
    };
    chamCongHomNay?: {
        gioVao?: string;
        gioRa?: string;
        trangThai: string;
    };
    thongKe: {
        soDonChoDuyet: number;
        soNgayPhepConLai: number;
        soNgayCongThang: number;
    };
    thongBaoMoi: number;
}
export interface LichLamViecItem {
    ngay: string;
    thuTrongTuan: number;
    ca?: {
        id: number;
        maCa: string;
        tenCa: string;
        gioVao: string;
        gioRa: string;
        mauHienThi?: string;
    };
    nghiPhep?: {
        loaiNghi: string;
        trangThai: string;
    };
    yeuCau?: {
        loaiYeuCau: string;
        trangThai: string;
    };
}
export interface ChamCongItem {
    ngay: string;
    gioVaoThucTe?: string;
    gioRaThucTe?: string;
    gioVaoDuKien?: string;
    gioRaDuKien?: string;
    trangThai: string;
    phutDiTre?: number;
    phutVeSom?: number;
    soGioLam?: number;
    ca?: {
        maCa: string;
        tenCa: string;
    };
}
export interface PhieuLuongItem {
    id: number;
    bangLuongId: number;
    kyLuong: string;
    thang: number;
    nam: number;
    tongThuNhap: number;
    tongKhauTru: number;
    thucLinh: number;
    trangThai: string;
    ngayChot?: string;
}
export interface SoDuPhepResponse {
    phepNam: {
        tongSo: number;
        daSuDung: number;
        conLai: number;
    };
    danhSachLoaiNghi: {
        maLoai: string;
        tenLoai: string;
        soNgayDaSuDung: number;
    }[];
}
