export declare enum LoaiBaoCao {
    DI_TRE = "DI_TRE",
    VE_SOM = "VE_SOM",
    NGHI_PHEP = "NGHI_PHEP",
    OT = "OT",
    QUY_LUONG = "QUY_LUONG",
    HEADCOUNT = "HEADCOUNT",
    CHAM_CONG = "CHAM_CONG",
    TONG_HOP = "TONG_HOP"
}
export declare enum DinhDangXuat {
    JSON = "JSON",
    EXCEL = "EXCEL",
    PDF = "PDF"
}
export declare class ReportFilterDto {
    thang?: number;
    nam?: number;
    tuNgay?: string;
    denNgay?: string;
    phongBanId?: number;
    nhanVienId?: number;
    dinhDang?: DinhDangXuat;
}
export interface DiTreVeSomItem {
    nhanVienId: number;
    maNhanVien: string;
    hoTen: string;
    phongBan: string;
    ngay: Date;
    gioVao: string | null;
    gioRa: string | null;
    soPhutTre: number;
    soPhutVeSom: number;
    lyDo: string | null;
    coGiaiTrinh: boolean;
}
export interface DiTreVeSomSummary {
    tongNhanVien: number;
    tongLuotDiTre: number;
    tongLuotVeSom: number;
    tongPhutTre: number;
    tongPhutVeSom: number;
    topDiTre: {
        nhanVienId: number;
        hoTen: string;
        soLan: number;
    }[];
}
export interface DiTreVeSomReport {
    filter: ReportFilterDto;
    summary: DiTreVeSomSummary;
    chiTiet: DiTreVeSomItem[];
}
export interface OTItem {
    nhanVienId: number;
    maNhanVien: string;
    hoTen: string;
    phongBan: string;
    ngay: Date;
    soGioOT: number;
    heSoOT: number;
    tienOT: number;
    trangThai: string;
}
export interface OTSummary {
    tongNhanVien: number;
    tongGioOT: number;
    tongTienOT: number;
    trungBinhGioOTNgay: number;
    phongBanNhieuOTNhat: {
        phongBan: string;
        tongGio: number;
    }[];
}
export interface OTReport {
    filter: ReportFilterDto;
    summary: OTSummary;
    chiTiet: OTItem[];
}
export interface NghiPhepItem {
    nhanVienId: number;
    maNhanVien: string;
    hoTen: string;
    phongBan: string;
    loaiNghi: string;
    tuNgay: Date;
    denNgay: Date;
    soNgay: number;
    trangThai: string;
    lyDo: string | null;
}
export interface NghiPhepSummary {
    tongDon: number;
    tongNgayNghi: number;
    daDuyet: number;
    choDuyet: number;
    tuChoi: number;
    theoLoai: {
        loai: string;
        soNgay: number;
        soDon: number;
    }[];
}
export interface NghiPhepReport {
    filter: ReportFilterDto;
    summary: NghiPhepSummary;
    chiTiet: NghiPhepItem[];
}
export interface QuyLuongPhongBan {
    phongBanId: number;
    tenPhongBan: string;
    tongNhanVien: number;
    tongLuongCoBan: number;
    tongPhuCap: number;
    tongThuong: number;
    tongKhauTru: number;
    tongThucLinh: number;
    tyLeQuyLuong: number;
}
export interface QuyLuongKhoan {
    maKhoan: string;
    tenKhoan: string;
    loai: string;
    tongSoTien: number;
    soNguoiNhan: number;
}
export interface QuyLuongSummary {
    thang: number;
    nam: number;
    tongQuyLuong: number;
    tongNhanVien: number;
    luongTrungBinh: number;
    luongCaoNhat: number;
    luongThapNhat: number;
    tongBHXH_NLD: number;
    tongBHXH_DN: number;
    tongThueTNCN: number;
}
export interface QuyLuongReport {
    filter: ReportFilterDto;
    summary: QuyLuongSummary;
    theoPhongBan: QuyLuongPhongBan[];
    theoKhoan: QuyLuongKhoan[];
}
export interface HeadcountPhongBan {
    phongBanId: number;
    tenPhongBan: string;
    tongNhanVien: number;
    dangLam: number;
    nghiViec: number;
    thuViec: number;
    moiTuyen: number;
    nghiMoi: number;
}
export interface HeadcountSummary {
    tongNhanVien: number;
    dangLam: number;
    nghiViec: number;
    thuViec: number;
    tyLeNghiViec: number;
    moiTuyenThang: number;
    nghiViecThang: number;
    theoGioiTinh: {
        nam: number;
        nu: number;
    };
    theoDoTuoi: {
        duoi25: number;
        tu25den35: number;
        tu35den45: number;
        tren45: number;
    };
}
export interface HeadcountReport {
    filter: ReportFilterDto;
    summary: HeadcountSummary;
    theoPhongBan: HeadcountPhongBan[];
}
export interface ChamCongNhanVien {
    nhanVienId: number;
    maNhanVien: string;
    hoTen: string;
    phongBan: string;
    ngayCongChuan: number;
    ngayCongThuc: number;
    ngayNghi: number;
    ngayPhep: number;
    soLanDiTre: number;
    soLanVeSom: number;
    tongGioOT: number;
    tyLeDiLam: number;
}
export interface ChamCongSummary {
    thang: number;
    nam: number;
    ngayCongChuan: number;
    tongNhanVien: number;
    trungBinhNgayCong: number;
    tyLeDiLamTrungBinh: number;
    tongNgayNghi: number;
    tongNgayPhep: number;
    tongGioOT: number;
}
export interface ChamCongReport {
    filter: ReportFilterDto;
    summary: ChamCongSummary;
    chiTiet: ChamCongNhanVien[];
}
export interface DashboardKPI {
    label: string;
    value: number;
    unit: string;
    trend: number;
    trendDirection: 'up' | 'down' | 'stable';
}
export interface DashboardAlert {
    loai: 'WARNING' | 'ERROR' | 'INFO';
    tieuDe: string;
    moTa: string;
    soLuong: number;
    link?: string;
}
export interface DashboardReport {
    thang: number;
    nam: number;
    kpis: DashboardKPI[];
    alerts: DashboardAlert[];
    quyLuongThang: number;
    headcount: number;
    tyLeDiLam: number;
    tyLeTurnover: number;
}
