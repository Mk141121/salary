import { PrismaService } from '../../prisma/prisma.service';
import { Decimal } from '@prisma/client/runtime/library';
import { TaoTemplateKPIDto, CapNhatTemplateKPIDto, TaoChiTieuKPIDto, TaoKyDanhGiaDto, CapNhatTrangThaiKyDto, TaoDanhGiaKPIDto, CapNhatKetQuaKPIDto, DuyetDanhGiaKPIDto, TaoCauHinhThuongDto, TinhThuongKPIDto, KetQuaTinhThuongDto } from './dto/kpi.dto';
export declare class KPIService {
    private prisma;
    constructor(prisma: PrismaService);
    layDanhSachTemplate(phongBanId?: number): Promise<({
        chiTieuKPIs: {
            id: number;
            moTa: string | null;
            ngayTao: Date;
            thuTu: number;
            templateId: number;
            maChiTieu: string;
            tenChiTieu: string;
            donViTinh: string;
            trongSo: Decimal;
            loaiChiTieu: import(".prisma/client").$Enums.LoaiChiTieuKPI;
            chiTieuToiThieu: Decimal | null;
            chiTieuMucTieu: Decimal | null;
            chiTieuVuotMuc: Decimal | null;
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
            trongSo: Decimal;
            loaiChiTieu: import(".prisma/client").$Enums.LoaiChiTieuKPI;
            chiTieuToiThieu: Decimal | null;
            chiTieuMucTieu: Decimal | null;
            chiTieuVuotMuc: Decimal | null;
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
            trongSo: Decimal;
            loaiChiTieu: import(".prisma/client").$Enums.LoaiChiTieuKPI;
            chiTieuToiThieu: Decimal | null;
            chiTieuMucTieu: Decimal | null;
            chiTieuVuotMuc: Decimal | null;
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
            trongSo: Decimal;
            loaiChiTieu: import(".prisma/client").$Enums.LoaiChiTieuKPI;
            chiTieuToiThieu: Decimal | null;
            chiTieuMucTieu: Decimal | null;
            chiTieuVuotMuc: Decimal | null;
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
    themChiTieu(templateId: number, dto: TaoChiTieuKPIDto): Promise<{
        id: number;
        moTa: string | null;
        ngayTao: Date;
        thuTu: number;
        templateId: number;
        maChiTieu: string;
        tenChiTieu: string;
        donViTinh: string;
        trongSo: Decimal;
        loaiChiTieu: import(".prisma/client").$Enums.LoaiChiTieuKPI;
        chiTieuToiThieu: Decimal | null;
        chiTieuMucTieu: Decimal | null;
        chiTieuVuotMuc: Decimal | null;
    }>;
    xoaChiTieu(chiTieuId: number): Promise<{
        id: number;
        moTa: string | null;
        ngayTao: Date;
        thuTu: number;
        templateId: number;
        maChiTieu: string;
        tenChiTieu: string;
        donViTinh: string;
        trongSo: Decimal;
        loaiChiTieu: import(".prisma/client").$Enums.LoaiChiTieuKPI;
        chiTieuToiThieu: Decimal | null;
        chiTieuMucTieu: Decimal | null;
        chiTieuVuotMuc: Decimal | null;
    }>;
    layDanhSachKyDanhGia(nam?: number): Promise<({
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
                    trongSo: Decimal;
                    loaiChiTieu: import(".prisma/client").$Enums.LoaiChiTieuKPI;
                    chiTieuToiThieu: Decimal | null;
                    chiTieuMucTieu: Decimal | null;
                    chiTieuVuotMuc: Decimal | null;
                };
            } & {
                id: number;
                ngayTao: Date;
                ghiChu: string | null;
                chiTieuId: number;
                ketQuaDat: Decimal | null;
                tyLeDat: Decimal | null;
                diemQuyDoi: Decimal | null;
                danhGiaId: number;
            })[];
        } & {
            id: number;
            trangThai: import(".prisma/client").$Enums.TrangThaiDanhGiaKPI;
            ngayTao: Date;
            ngayCapNhat: Date;
            nhanVienId: number;
            xepLoai: import(".prisma/client").$Enums.XepLoaiKPI | null;
            heSoThuong: Decimal;
            templateId: number;
            nguoiDuyet: string | null;
            ngayDuyet: Date | null;
            kyDanhGiaId: number;
            nhanXetChung: string | null;
            nguoiDanhGia: string | null;
            diemTongKet: Decimal | null;
            soTienThuong: Decimal;
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
                trongSo: Decimal;
                loaiChiTieu: import(".prisma/client").$Enums.LoaiChiTieuKPI;
                chiTieuToiThieu: Decimal | null;
                chiTieuMucTieu: Decimal | null;
                chiTieuVuotMuc: Decimal | null;
            };
        } & {
            id: number;
            ngayTao: Date;
            ghiChu: string | null;
            chiTieuId: number;
            ketQuaDat: Decimal | null;
            tyLeDat: Decimal | null;
            diemQuyDoi: Decimal | null;
            danhGiaId: number;
        })[];
    } & {
        id: number;
        trangThai: import(".prisma/client").$Enums.TrangThaiDanhGiaKPI;
        ngayTao: Date;
        ngayCapNhat: Date;
        nhanVienId: number;
        xepLoai: import(".prisma/client").$Enums.XepLoaiKPI | null;
        heSoThuong: Decimal;
        templateId: number;
        nguoiDuyet: string | null;
        ngayDuyet: Date | null;
        kyDanhGiaId: number;
        nhanXetChung: string | null;
        nguoiDanhGia: string | null;
        diemTongKet: Decimal | null;
        soTienThuong: Decimal;
        ngayDanhGia: Date | null;
    }>;
    capNhatKetQuaKPI(danhGiaId: number, dto: CapNhatKetQuaKPIDto): Promise<({
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
                trongSo: Decimal;
                loaiChiTieu: import(".prisma/client").$Enums.LoaiChiTieuKPI;
                chiTieuToiThieu: Decimal | null;
                chiTieuMucTieu: Decimal | null;
                chiTieuVuotMuc: Decimal | null;
            };
        } & {
            id: number;
            ngayTao: Date;
            ghiChu: string | null;
            chiTieuId: number;
            ketQuaDat: Decimal | null;
            tyLeDat: Decimal | null;
            diemQuyDoi: Decimal | null;
            danhGiaId: number;
        })[];
    } & {
        id: number;
        trangThai: import(".prisma/client").$Enums.TrangThaiDanhGiaKPI;
        ngayTao: Date;
        ngayCapNhat: Date;
        nhanVienId: number;
        xepLoai: import(".prisma/client").$Enums.XepLoaiKPI | null;
        heSoThuong: Decimal;
        templateId: number;
        nguoiDuyet: string | null;
        ngayDuyet: Date | null;
        kyDanhGiaId: number;
        nhanXetChung: string | null;
        nguoiDanhGia: string | null;
        diemTongKet: Decimal | null;
        soTienThuong: Decimal;
        ngayDanhGia: Date | null;
    }) | null>;
    private tinhTyLeDat;
    tinhDiemTongKet(danhGiaId: number): Promise<{
        diemTongKet: number;
        xepLoai: import(".prisma/client").$Enums.XepLoaiKPI;
    }>;
    private xepLoaiTheoĐiem;
    guiDuyet(danhGiaId: number): Promise<{
        id: number;
        trangThai: import(".prisma/client").$Enums.TrangThaiDanhGiaKPI;
        ngayTao: Date;
        ngayCapNhat: Date;
        nhanVienId: number;
        xepLoai: import(".prisma/client").$Enums.XepLoaiKPI | null;
        heSoThuong: Decimal;
        templateId: number;
        nguoiDuyet: string | null;
        ngayDuyet: Date | null;
        kyDanhGiaId: number;
        nhanXetChung: string | null;
        nguoiDanhGia: string | null;
        diemTongKet: Decimal | null;
        soTienThuong: Decimal;
        ngayDanhGia: Date | null;
    }>;
    duyetDanhGia(danhGiaId: number, dto: DuyetDanhGiaKPIDto): Promise<{
        id: number;
        trangThai: import(".prisma/client").$Enums.TrangThaiDanhGiaKPI;
        ngayTao: Date;
        ngayCapNhat: Date;
        nhanVienId: number;
        xepLoai: import(".prisma/client").$Enums.XepLoaiKPI | null;
        heSoThuong: Decimal;
        templateId: number;
        nguoiDuyet: string | null;
        ngayDuyet: Date | null;
        kyDanhGiaId: number;
        nhanXetChung: string | null;
        nguoiDanhGia: string | null;
        diemTongKet: Decimal | null;
        soTienThuong: Decimal;
        ngayDanhGia: Date | null;
    }>;
    tuChoiDanhGia(danhGiaId: number, lyDo: string): Promise<{
        id: number;
        trangThai: import(".prisma/client").$Enums.TrangThaiDanhGiaKPI;
        ngayTao: Date;
        ngayCapNhat: Date;
        nhanVienId: number;
        xepLoai: import(".prisma/client").$Enums.XepLoaiKPI | null;
        heSoThuong: Decimal;
        templateId: number;
        nguoiDuyet: string | null;
        ngayDuyet: Date | null;
        kyDanhGiaId: number;
        nhanXetChung: string | null;
        nguoiDanhGia: string | null;
        diemTongKet: Decimal | null;
        soTienThuong: Decimal;
        ngayDanhGia: Date | null;
    }>;
    layCauHinhThuong(nam: number): Promise<{
        id: number;
        moTa: string | null;
        trangThai: boolean;
        ngayTao: Date;
        nam: number;
        xepLoai: import(".prisma/client").$Enums.XepLoaiKPI;
        diemToiThieu: Decimal;
        diemToiDa: Decimal;
        heSoThuong: Decimal;
    }[]>;
    luuCauHinhThuong(dto: TaoCauHinhThuongDto): Promise<{
        id: number;
        moTa: string | null;
        trangThai: boolean;
        ngayTao: Date;
        nam: number;
        xepLoai: import(".prisma/client").$Enums.XepLoaiKPI;
        diemToiThieu: Decimal;
        diemToiDa: Decimal;
        heSoThuong: Decimal;
    }>;
    khoiTaoCauHinhThuongMacDinh(nam: number): Promise<{
        id: number;
        moTa: string | null;
        trangThai: boolean;
        ngayTao: Date;
        nam: number;
        xepLoai: import(".prisma/client").$Enums.XepLoaiKPI;
        diemToiThieu: Decimal;
        diemToiDa: Decimal;
        heSoThuong: Decimal;
    }[]>;
    tinhThuongKPI(dto: TinhThuongKPIDto): Promise<KetQuaTinhThuongDto[]>;
    baoCaoKPITheoPhongBan(kyDanhGiaId: number): Promise<any[]>;
}
