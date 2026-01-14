import { KPIService } from './kpi.service';
import { TaoTemplateKPIDto, CapNhatTemplateKPIDto, TaoChiTieuKPIDto, TaoKyDanhGiaDto, CapNhatTrangThaiKyDto, TaoDanhGiaKPIDto, CapNhatKetQuaKPIDto, DuyetDanhGiaKPIDto, TuChoiDanhGiaKPIDto, TaoCauHinhThuongDto, TinhThuongKPIDto } from './dto/kpi.dto';
export declare class KPIController {
    private readonly kpiService;
    constructor(kpiService: KPIService);
    layDanhSachTemplate(phongBanId?: string): Promise<({
        chiTieuKPIs: {
            id: number;
            moTa: string | null;
            ngayTao: Date;
            thuTu: number;
            templateId: number;
            maChiTieu: string;
            tenChiTieu: string;
            donViTinh: string;
            trongSo: import("@prisma/client/runtime/library").Decimal;
            loaiChiTieu: import(".prisma/client").$Enums.LoaiChiTieuKPI;
            chiTieuToiThieu: import("@prisma/client/runtime/library").Decimal | null;
            chiTieuMucTieu: import("@prisma/client/runtime/library").Decimal | null;
            chiTieuVuotMuc: import("@prisma/client/runtime/library").Decimal | null;
        }[];
    } & {
        id: number;
        moTa: string | null;
        trangThai: boolean;
        ngayTao: Date;
        ngayCapNhat: Date;
        phongBanId: number | null;
        maTemplate: string;
        tenTemplate: string;
    })[]>;
    layTemplateTheoId(id: number): Promise<{
        chiTieuKPIs: {
            id: number;
            moTa: string | null;
            ngayTao: Date;
            thuTu: number;
            templateId: number;
            maChiTieu: string;
            tenChiTieu: string;
            donViTinh: string;
            trongSo: import("@prisma/client/runtime/library").Decimal;
            loaiChiTieu: import(".prisma/client").$Enums.LoaiChiTieuKPI;
            chiTieuToiThieu: import("@prisma/client/runtime/library").Decimal | null;
            chiTieuMucTieu: import("@prisma/client/runtime/library").Decimal | null;
            chiTieuVuotMuc: import("@prisma/client/runtime/library").Decimal | null;
        }[];
    } & {
        id: number;
        moTa: string | null;
        trangThai: boolean;
        ngayTao: Date;
        ngayCapNhat: Date;
        phongBanId: number | null;
        maTemplate: string;
        tenTemplate: string;
    }>;
    taoTemplate(dto: TaoTemplateKPIDto): Promise<{
        chiTieuKPIs: {
            id: number;
            moTa: string | null;
            ngayTao: Date;
            thuTu: number;
            templateId: number;
            maChiTieu: string;
            tenChiTieu: string;
            donViTinh: string;
            trongSo: import("@prisma/client/runtime/library").Decimal;
            loaiChiTieu: import(".prisma/client").$Enums.LoaiChiTieuKPI;
            chiTieuToiThieu: import("@prisma/client/runtime/library").Decimal | null;
            chiTieuMucTieu: import("@prisma/client/runtime/library").Decimal | null;
            chiTieuVuotMuc: import("@prisma/client/runtime/library").Decimal | null;
        }[];
    } & {
        id: number;
        moTa: string | null;
        trangThai: boolean;
        ngayTao: Date;
        ngayCapNhat: Date;
        phongBanId: number | null;
        maTemplate: string;
        tenTemplate: string;
    }>;
    capNhatTemplate(id: number, dto: CapNhatTemplateKPIDto): Promise<{
        chiTieuKPIs: {
            id: number;
            moTa: string | null;
            ngayTao: Date;
            thuTu: number;
            templateId: number;
            maChiTieu: string;
            tenChiTieu: string;
            donViTinh: string;
            trongSo: import("@prisma/client/runtime/library").Decimal;
            loaiChiTieu: import(".prisma/client").$Enums.LoaiChiTieuKPI;
            chiTieuToiThieu: import("@prisma/client/runtime/library").Decimal | null;
            chiTieuMucTieu: import("@prisma/client/runtime/library").Decimal | null;
            chiTieuVuotMuc: import("@prisma/client/runtime/library").Decimal | null;
        }[];
    } & {
        id: number;
        moTa: string | null;
        trangThai: boolean;
        ngayTao: Date;
        ngayCapNhat: Date;
        phongBanId: number | null;
        maTemplate: string;
        tenTemplate: string;
    }>;
    themChiTieu(id: number, dto: TaoChiTieuKPIDto): Promise<{
        id: number;
        moTa: string | null;
        ngayTao: Date;
        thuTu: number;
        templateId: number;
        maChiTieu: string;
        tenChiTieu: string;
        donViTinh: string;
        trongSo: import("@prisma/client/runtime/library").Decimal;
        loaiChiTieu: import(".prisma/client").$Enums.LoaiChiTieuKPI;
        chiTieuToiThieu: import("@prisma/client/runtime/library").Decimal | null;
        chiTieuMucTieu: import("@prisma/client/runtime/library").Decimal | null;
        chiTieuVuotMuc: import("@prisma/client/runtime/library").Decimal | null;
    }>;
    xoaChiTieu(id: number): Promise<{
        id: number;
        moTa: string | null;
        ngayTao: Date;
        thuTu: number;
        templateId: number;
        maChiTieu: string;
        tenChiTieu: string;
        donViTinh: string;
        trongSo: import("@prisma/client/runtime/library").Decimal;
        loaiChiTieu: import(".prisma/client").$Enums.LoaiChiTieuKPI;
        chiTieuToiThieu: import("@prisma/client/runtime/library").Decimal | null;
        chiTieuMucTieu: import("@prisma/client/runtime/library").Decimal | null;
        chiTieuVuotMuc: import("@prisma/client/runtime/library").Decimal | null;
    }>;
    layDanhSachKyDanhGia(nam?: string): Promise<({
        _count: {
            danhGiaNhanViens: number;
        };
    } & {
        id: number;
        trangThai: import(".prisma/client").$Enums.TrangThaiKyDanhGia;
        ngayTao: Date;
        ngayCapNhat: Date;
        nam: number;
        tuNgay: Date;
        denNgay: Date;
        ghiChu: string | null;
        thang: number | null;
        maKy: string;
        tenKy: string;
        loaiKy: import(".prisma/client").$Enums.LoaiKyDanhGia;
        quy: number | null;
        hanNopKetQua: Date;
    })[]>;
    layKyDanhGiaTheoId(id: number): Promise<{
        danhGiaNhanViens: ({
            ketQuaKPIs: ({
                chiTieu: {
                    id: number;
                    moTa: string | null;
                    ngayTao: Date;
                    thuTu: number;
                    templateId: number;
                    maChiTieu: string;
                    tenChiTieu: string;
                    donViTinh: string;
                    trongSo: import("@prisma/client/runtime/library").Decimal;
                    loaiChiTieu: import(".prisma/client").$Enums.LoaiChiTieuKPI;
                    chiTieuToiThieu: import("@prisma/client/runtime/library").Decimal | null;
                    chiTieuMucTieu: import("@prisma/client/runtime/library").Decimal | null;
                    chiTieuVuotMuc: import("@prisma/client/runtime/library").Decimal | null;
                };
            } & {
                id: number;
                ngayTao: Date;
                ghiChu: string | null;
                ketQuaDat: import("@prisma/client/runtime/library").Decimal | null;
                tyLeDat: import("@prisma/client/runtime/library").Decimal | null;
                diemQuyDoi: import("@prisma/client/runtime/library").Decimal | null;
                danhGiaId: number;
                chiTieuId: number;
            })[];
        } & {
            id: number;
            trangThai: import(".prisma/client").$Enums.TrangThaiDanhGiaKPI;
            ngayTao: Date;
            ngayCapNhat: Date;
            nhanVienId: number;
            xepLoai: import(".prisma/client").$Enums.XepLoaiKPI | null;
            heSoThuong: import("@prisma/client/runtime/library").Decimal;
            templateId: number;
            nguoiDuyet: string | null;
            ngayDuyet: Date | null;
            kyDanhGiaId: number;
            diemTongKet: import("@prisma/client/runtime/library").Decimal | null;
            soTienThuong: import("@prisma/client/runtime/library").Decimal;
            nhanXetChung: string | null;
            nguoiDanhGia: string | null;
            ngayDanhGia: Date | null;
        })[];
    } & {
        id: number;
        trangThai: import(".prisma/client").$Enums.TrangThaiKyDanhGia;
        ngayTao: Date;
        ngayCapNhat: Date;
        nam: number;
        tuNgay: Date;
        denNgay: Date;
        ghiChu: string | null;
        thang: number | null;
        maKy: string;
        tenKy: string;
        loaiKy: import(".prisma/client").$Enums.LoaiKyDanhGia;
        quy: number | null;
        hanNopKetQua: Date;
    }>;
    taoKyDanhGia(dto: TaoKyDanhGiaDto): Promise<{
        id: number;
        trangThai: import(".prisma/client").$Enums.TrangThaiKyDanhGia;
        ngayTao: Date;
        ngayCapNhat: Date;
        nam: number;
        tuNgay: Date;
        denNgay: Date;
        ghiChu: string | null;
        thang: number | null;
        maKy: string;
        tenKy: string;
        loaiKy: import(".prisma/client").$Enums.LoaiKyDanhGia;
        quy: number | null;
        hanNopKetQua: Date;
    }>;
    capNhatTrangThaiKy(id: number, dto: CapNhatTrangThaiKyDto): Promise<{
        id: number;
        trangThai: import(".prisma/client").$Enums.TrangThaiKyDanhGia;
        ngayTao: Date;
        ngayCapNhat: Date;
        nam: number;
        tuNgay: Date;
        denNgay: Date;
        ghiChu: string | null;
        thang: number | null;
        maKy: string;
        tenKy: string;
        loaiKy: import(".prisma/client").$Enums.LoaiKyDanhGia;
        quy: number | null;
        hanNopKetQua: Date;
    }>;
    taoDanhGiaKPI(dto: TaoDanhGiaKPIDto): Promise<{
        ketQuaKPIs: ({
            chiTieu: {
                id: number;
                moTa: string | null;
                ngayTao: Date;
                thuTu: number;
                templateId: number;
                maChiTieu: string;
                tenChiTieu: string;
                donViTinh: string;
                trongSo: import("@prisma/client/runtime/library").Decimal;
                loaiChiTieu: import(".prisma/client").$Enums.LoaiChiTieuKPI;
                chiTieuToiThieu: import("@prisma/client/runtime/library").Decimal | null;
                chiTieuMucTieu: import("@prisma/client/runtime/library").Decimal | null;
                chiTieuVuotMuc: import("@prisma/client/runtime/library").Decimal | null;
            };
        } & {
            id: number;
            ngayTao: Date;
            ghiChu: string | null;
            ketQuaDat: import("@prisma/client/runtime/library").Decimal | null;
            tyLeDat: import("@prisma/client/runtime/library").Decimal | null;
            diemQuyDoi: import("@prisma/client/runtime/library").Decimal | null;
            danhGiaId: number;
            chiTieuId: number;
        })[];
    } & {
        id: number;
        trangThai: import(".prisma/client").$Enums.TrangThaiDanhGiaKPI;
        ngayTao: Date;
        ngayCapNhat: Date;
        nhanVienId: number;
        xepLoai: import(".prisma/client").$Enums.XepLoaiKPI | null;
        heSoThuong: import("@prisma/client/runtime/library").Decimal;
        templateId: number;
        nguoiDuyet: string | null;
        ngayDuyet: Date | null;
        kyDanhGiaId: number;
        diemTongKet: import("@prisma/client/runtime/library").Decimal | null;
        soTienThuong: import("@prisma/client/runtime/library").Decimal;
        nhanXetChung: string | null;
        nguoiDanhGia: string | null;
        ngayDanhGia: Date | null;
    }>;
    capNhatKetQuaKPI(id: number, dto: CapNhatKetQuaKPIDto): Promise<({
        ketQuaKPIs: ({
            chiTieu: {
                id: number;
                moTa: string | null;
                ngayTao: Date;
                thuTu: number;
                templateId: number;
                maChiTieu: string;
                tenChiTieu: string;
                donViTinh: string;
                trongSo: import("@prisma/client/runtime/library").Decimal;
                loaiChiTieu: import(".prisma/client").$Enums.LoaiChiTieuKPI;
                chiTieuToiThieu: import("@prisma/client/runtime/library").Decimal | null;
                chiTieuMucTieu: import("@prisma/client/runtime/library").Decimal | null;
                chiTieuVuotMuc: import("@prisma/client/runtime/library").Decimal | null;
            };
        } & {
            id: number;
            ngayTao: Date;
            ghiChu: string | null;
            ketQuaDat: import("@prisma/client/runtime/library").Decimal | null;
            tyLeDat: import("@prisma/client/runtime/library").Decimal | null;
            diemQuyDoi: import("@prisma/client/runtime/library").Decimal | null;
            danhGiaId: number;
            chiTieuId: number;
        })[];
    } & {
        id: number;
        trangThai: import(".prisma/client").$Enums.TrangThaiDanhGiaKPI;
        ngayTao: Date;
        ngayCapNhat: Date;
        nhanVienId: number;
        xepLoai: import(".prisma/client").$Enums.XepLoaiKPI | null;
        heSoThuong: import("@prisma/client/runtime/library").Decimal;
        templateId: number;
        nguoiDuyet: string | null;
        ngayDuyet: Date | null;
        kyDanhGiaId: number;
        diemTongKet: import("@prisma/client/runtime/library").Decimal | null;
        soTienThuong: import("@prisma/client/runtime/library").Decimal;
        nhanXetChung: string | null;
        nguoiDanhGia: string | null;
        ngayDanhGia: Date | null;
    }) | null>;
    guiDuyet(id: number): Promise<{
        id: number;
        trangThai: import(".prisma/client").$Enums.TrangThaiDanhGiaKPI;
        ngayTao: Date;
        ngayCapNhat: Date;
        nhanVienId: number;
        xepLoai: import(".prisma/client").$Enums.XepLoaiKPI | null;
        heSoThuong: import("@prisma/client/runtime/library").Decimal;
        templateId: number;
        nguoiDuyet: string | null;
        ngayDuyet: Date | null;
        kyDanhGiaId: number;
        diemTongKet: import("@prisma/client/runtime/library").Decimal | null;
        soTienThuong: import("@prisma/client/runtime/library").Decimal;
        nhanXetChung: string | null;
        nguoiDanhGia: string | null;
        ngayDanhGia: Date | null;
    }>;
    duyetDanhGia(id: number, dto: DuyetDanhGiaKPIDto): Promise<{
        id: number;
        trangThai: import(".prisma/client").$Enums.TrangThaiDanhGiaKPI;
        ngayTao: Date;
        ngayCapNhat: Date;
        nhanVienId: number;
        xepLoai: import(".prisma/client").$Enums.XepLoaiKPI | null;
        heSoThuong: import("@prisma/client/runtime/library").Decimal;
        templateId: number;
        nguoiDuyet: string | null;
        ngayDuyet: Date | null;
        kyDanhGiaId: number;
        diemTongKet: import("@prisma/client/runtime/library").Decimal | null;
        soTienThuong: import("@prisma/client/runtime/library").Decimal;
        nhanXetChung: string | null;
        nguoiDanhGia: string | null;
        ngayDanhGia: Date | null;
    }>;
    tuChoiDanhGia(id: number, dto: TuChoiDanhGiaKPIDto): Promise<{
        id: number;
        trangThai: import(".prisma/client").$Enums.TrangThaiDanhGiaKPI;
        ngayTao: Date;
        ngayCapNhat: Date;
        nhanVienId: number;
        xepLoai: import(".prisma/client").$Enums.XepLoaiKPI | null;
        heSoThuong: import("@prisma/client/runtime/library").Decimal;
        templateId: number;
        nguoiDuyet: string | null;
        ngayDuyet: Date | null;
        kyDanhGiaId: number;
        diemTongKet: import("@prisma/client/runtime/library").Decimal | null;
        soTienThuong: import("@prisma/client/runtime/library").Decimal;
        nhanXetChung: string | null;
        nguoiDanhGia: string | null;
        ngayDanhGia: Date | null;
    }>;
    layCauHinhThuong(nam: number): Promise<{
        id: number;
        moTa: string | null;
        trangThai: boolean;
        ngayTao: Date;
        nam: number;
        xepLoai: import(".prisma/client").$Enums.XepLoaiKPI;
        diemToiThieu: import("@prisma/client/runtime/library").Decimal;
        diemToiDa: import("@prisma/client/runtime/library").Decimal;
        heSoThuong: import("@prisma/client/runtime/library").Decimal;
    }[]>;
    luuCauHinhThuong(dto: TaoCauHinhThuongDto): Promise<{
        id: number;
        moTa: string | null;
        trangThai: boolean;
        ngayTao: Date;
        nam: number;
        xepLoai: import(".prisma/client").$Enums.XepLoaiKPI;
        diemToiThieu: import("@prisma/client/runtime/library").Decimal;
        diemToiDa: import("@prisma/client/runtime/library").Decimal;
        heSoThuong: import("@prisma/client/runtime/library").Decimal;
    }>;
    khoiTaoCauHinhThuongMacDinh(nam: number): Promise<{
        id: number;
        moTa: string | null;
        trangThai: boolean;
        ngayTao: Date;
        nam: number;
        xepLoai: import(".prisma/client").$Enums.XepLoaiKPI;
        diemToiThieu: import("@prisma/client/runtime/library").Decimal;
        diemToiDa: import("@prisma/client/runtime/library").Decimal;
        heSoThuong: import("@prisma/client/runtime/library").Decimal;
    }[]>;
    tinhThuongKPI(dto: TinhThuongKPIDto): Promise<import("./dto/kpi.dto").KetQuaTinhThuongDto[]>;
    baoCaoKPITheoPhongBan(kyDanhGiaId: number): Promise<any[]>;
}
