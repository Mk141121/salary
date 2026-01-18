import { QuyCheService } from './quy-che.service';
import { QuyCheRuleService } from './quy-che-rule.service';
import { SuKienThuongPhatService } from './su-kien-thuong-phat.service';
import { RuleEngineExecutor } from './rule-engine-executor.service';
import { TaoQuyCheDto, CapNhatQuyCheDto, NhanBanQuyCheDto, LocQuyCheDto } from './dto/quy-che.dto';
import { TaoQuyCheRuleDto, CapNhatQuyCheRuleDto, ValidateRuleDto, PreviewRuleDto, SapXepRuleDto } from './dto/quy-che-rule.dto';
import { TaoSuKienDto, CapNhatSuKienDto, DuyetSuKienDto, DuyetNhieuSuKienDto, LocSuKienDto, TaoDanhMucSuKienDto } from './dto/su-kien.dto';
import { LoaiSuKien } from '@prisma/client';
export declare class QuyCheController {
    private readonly quyCheService;
    private readonly quyCheRuleService;
    constructor(quyCheService: QuyCheService, quyCheRuleService: QuyCheRuleService);
    layDanhSach(filter: LocQuyCheDto): Promise<({
        phongBan: {
            id: number;
            maPhongBan: string;
            tenPhongBan: string;
        };
        _count: {
            bangLuongs: number;
            rules: number;
        };
        rules: ({
            khoanLuong: {
                id: number;
                maKhoan: string;
                tenKhoan: string;
                loai: import(".prisma/client").$Enums.LoaiKhoanLuong;
            };
        } & {
            id: number;
            moTa: string | null;
            trangThai: boolean;
            ngayTao: Date;
            ngayCapNhat: Date;
            khoanLuongId: number;
            nguoiTao: string | null;
            tenRule: string;
            loaiRule: import(".prisma/client").$Enums.LoaiRule;
            dieuKienJson: string | null;
            congThucJson: string;
            thuTuUuTien: number;
            cheDoGop: import(".prisma/client").$Enums.CheDoGop;
            choPhepChinhTay: boolean;
            quyCheId: number;
        })[];
    } & {
        id: number;
        moTa: string | null;
        trangThai: import(".prisma/client").$Enums.TrangThaiQuyChe;
        ngayTao: Date;
        ngayCapNhat: Date;
        phongBanId: number;
        tuNgay: Date;
        denNgay: Date | null;
        nguoiTao: string | null;
        tenQuyChe: string;
        phienBan: number;
    })[]>;
    layChiTiet(id: number): Promise<{
        daChotLuong: boolean;
        coDuocSua: boolean;
        bangLuongs: ({
            bangLuong: {
                id: number;
                trangThai: import(".prisma/client").$Enums.TrangThaiBangLuong;
                nam: number;
                thang: number;
            };
        } & {
            id: number;
            ngayTao: Date;
            bangLuongId: number;
            quyCheId: number;
            ngayApDung: Date;
            nguoiApDung: string | null;
        })[];
        phongBan: {
            id: number;
            maPhongBan: string;
            tenPhongBan: string;
            moTa: string | null;
            trangThai: string;
            phongBanChaId: number | null;
            capDo: number;
            loaiPhongBan: string | null;
            nguoiQuanLyId: number | null;
            gioVaoChuan: string;
            gioRaChuan: string;
            phutChoPhepTre: number;
            taoBoi: number | null;
            capNhatBoi: number | null;
            ngayTao: Date;
            ngayCapNhat: Date;
        };
        rules: ({
            khoanLuong: {
                id: number;
                moTa: string | null;
                trangThai: boolean;
                ngayTao: Date;
                ngayCapNhat: Date;
                maKhoan: string;
                tenKhoan: string;
                loai: import(".prisma/client").$Enums.LoaiKhoanLuong;
                cachTinh: import(".prisma/client").$Enums.CachTinhLuong;
                chiuThue: boolean;
                phamViApDung: string | null;
                thuTu: number;
            };
        } & {
            id: number;
            moTa: string | null;
            trangThai: boolean;
            ngayTao: Date;
            ngayCapNhat: Date;
            khoanLuongId: number;
            nguoiTao: string | null;
            tenRule: string;
            loaiRule: import(".prisma/client").$Enums.LoaiRule;
            dieuKienJson: string | null;
            congThucJson: string;
            thuTuUuTien: number;
            cheDoGop: import(".prisma/client").$Enums.CheDoGop;
            choPhepChinhTay: boolean;
            quyCheId: number;
        })[];
        id: number;
        moTa: string | null;
        trangThai: import(".prisma/client").$Enums.TrangThaiQuyChe;
        ngayTao: Date;
        ngayCapNhat: Date;
        phongBanId: number;
        tuNgay: Date;
        denNgay: Date | null;
        nguoiTao: string | null;
        tenQuyChe: string;
        phienBan: number;
    }>;
    tao(dto: TaoQuyCheDto): Promise<{
        phongBan: {
            id: number;
            maPhongBan: string;
            tenPhongBan: string;
            moTa: string | null;
            trangThai: string;
            phongBanChaId: number | null;
            capDo: number;
            loaiPhongBan: string | null;
            nguoiQuanLyId: number | null;
            gioVaoChuan: string;
            gioRaChuan: string;
            phutChoPhepTre: number;
            taoBoi: number | null;
            capNhatBoi: number | null;
            ngayTao: Date;
            ngayCapNhat: Date;
        };
    } & {
        id: number;
        moTa: string | null;
        trangThai: import(".prisma/client").$Enums.TrangThaiQuyChe;
        ngayTao: Date;
        ngayCapNhat: Date;
        phongBanId: number;
        tuNgay: Date;
        denNgay: Date | null;
        nguoiTao: string | null;
        tenQuyChe: string;
        phienBan: number;
    }>;
    capNhat(id: number, dto: CapNhatQuyCheDto): Promise<{
        phongBan: {
            id: number;
            maPhongBan: string;
            tenPhongBan: string;
            moTa: string | null;
            trangThai: string;
            phongBanChaId: number | null;
            capDo: number;
            loaiPhongBan: string | null;
            nguoiQuanLyId: number | null;
            gioVaoChuan: string;
            gioRaChuan: string;
            phutChoPhepTre: number;
            taoBoi: number | null;
            capNhatBoi: number | null;
            ngayTao: Date;
            ngayCapNhat: Date;
        };
        rules: {
            id: number;
            moTa: string | null;
            trangThai: boolean;
            ngayTao: Date;
            ngayCapNhat: Date;
            khoanLuongId: number;
            nguoiTao: string | null;
            tenRule: string;
            loaiRule: import(".prisma/client").$Enums.LoaiRule;
            dieuKienJson: string | null;
            congThucJson: string;
            thuTuUuTien: number;
            cheDoGop: import(".prisma/client").$Enums.CheDoGop;
            choPhepChinhTay: boolean;
            quyCheId: number;
        }[];
    } & {
        id: number;
        moTa: string | null;
        trangThai: import(".prisma/client").$Enums.TrangThaiQuyChe;
        ngayTao: Date;
        ngayCapNhat: Date;
        phongBanId: number;
        tuNgay: Date;
        denNgay: Date | null;
        nguoiTao: string | null;
        tenQuyChe: string;
        phienBan: number;
    }>;
    nhanBan(id: number, dto: NhanBanQuyCheDto): Promise<{
        phongBan: {
            id: number;
            maPhongBan: string;
            tenPhongBan: string;
            moTa: string | null;
            trangThai: string;
            phongBanChaId: number | null;
            capDo: number;
            loaiPhongBan: string | null;
            nguoiQuanLyId: number | null;
            gioVaoChuan: string;
            gioRaChuan: string;
            phutChoPhepTre: number;
            taoBoi: number | null;
            capNhatBoi: number | null;
            ngayTao: Date;
            ngayCapNhat: Date;
        };
        rules: ({
            khoanLuong: {
                id: number;
                moTa: string | null;
                trangThai: boolean;
                ngayTao: Date;
                ngayCapNhat: Date;
                maKhoan: string;
                tenKhoan: string;
                loai: import(".prisma/client").$Enums.LoaiKhoanLuong;
                cachTinh: import(".prisma/client").$Enums.CachTinhLuong;
                chiuThue: boolean;
                phamViApDung: string | null;
                thuTu: number;
            };
        } & {
            id: number;
            moTa: string | null;
            trangThai: boolean;
            ngayTao: Date;
            ngayCapNhat: Date;
            khoanLuongId: number;
            nguoiTao: string | null;
            tenRule: string;
            loaiRule: import(".prisma/client").$Enums.LoaiRule;
            dieuKienJson: string | null;
            congThucJson: string;
            thuTuUuTien: number;
            cheDoGop: import(".prisma/client").$Enums.CheDoGop;
            choPhepChinhTay: boolean;
            quyCheId: number;
        })[];
    } & {
        id: number;
        moTa: string | null;
        trangThai: import(".prisma/client").$Enums.TrangThaiQuyChe;
        ngayTao: Date;
        ngayCapNhat: Date;
        phongBanId: number;
        tuNgay: Date;
        denNgay: Date | null;
        nguoiTao: string | null;
        tenQuyChe: string;
        phienBan: number;
    }>;
    kichHoat(id: number): Promise<{
        phongBan: {
            id: number;
            maPhongBan: string;
            tenPhongBan: string;
            moTa: string | null;
            trangThai: string;
            phongBanChaId: number | null;
            capDo: number;
            loaiPhongBan: string | null;
            nguoiQuanLyId: number | null;
            gioVaoChuan: string;
            gioRaChuan: string;
            phutChoPhepTre: number;
            taoBoi: number | null;
            capNhatBoi: number | null;
            ngayTao: Date;
            ngayCapNhat: Date;
        };
        rules: {
            id: number;
            moTa: string | null;
            trangThai: boolean;
            ngayTao: Date;
            ngayCapNhat: Date;
            khoanLuongId: number;
            nguoiTao: string | null;
            tenRule: string;
            loaiRule: import(".prisma/client").$Enums.LoaiRule;
            dieuKienJson: string | null;
            congThucJson: string;
            thuTuUuTien: number;
            cheDoGop: import(".prisma/client").$Enums.CheDoGop;
            choPhepChinhTay: boolean;
            quyCheId: number;
        }[];
    } & {
        id: number;
        moTa: string | null;
        trangThai: import(".prisma/client").$Enums.TrangThaiQuyChe;
        ngayTao: Date;
        ngayCapNhat: Date;
        phongBanId: number;
        tuNgay: Date;
        denNgay: Date | null;
        nguoiTao: string | null;
        tenQuyChe: string;
        phienBan: number;
    }>;
    ngung(id: number): Promise<{
        id: number;
        moTa: string | null;
        trangThai: import(".prisma/client").$Enums.TrangThaiQuyChe;
        ngayTao: Date;
        ngayCapNhat: Date;
        phongBanId: number;
        tuNgay: Date;
        denNgay: Date | null;
        nguoiTao: string | null;
        tenQuyChe: string;
        phienBan: number;
    }>;
    xoa(id: number): Promise<{
        id: number;
        moTa: string | null;
        trangThai: import(".prisma/client").$Enums.TrangThaiQuyChe;
        ngayTao: Date;
        ngayCapNhat: Date;
        phongBanId: number;
        tuNgay: Date;
        denNgay: Date | null;
        nguoiTao: string | null;
        tenQuyChe: string;
        phienBan: number;
    }>;
    layDanhSachRule(quyCheId: number): Promise<({
        khoanLuong: {
            id: number;
            maKhoan: string;
            tenKhoan: string;
            loai: import(".prisma/client").$Enums.LoaiKhoanLuong;
        };
    } & {
        id: number;
        moTa: string | null;
        trangThai: boolean;
        ngayTao: Date;
        ngayCapNhat: Date;
        khoanLuongId: number;
        nguoiTao: string | null;
        tenRule: string;
        loaiRule: import(".prisma/client").$Enums.LoaiRule;
        dieuKienJson: string | null;
        congThucJson: string;
        thuTuUuTien: number;
        cheDoGop: import(".prisma/client").$Enums.CheDoGop;
        choPhepChinhTay: boolean;
        quyCheId: number;
    })[]>;
    taoRule(quyCheId: number, dto: Omit<TaoQuyCheRuleDto, 'quyCheId'>): Promise<{
        khoanLuong: {
            id: number;
            moTa: string | null;
            trangThai: boolean;
            ngayTao: Date;
            ngayCapNhat: Date;
            maKhoan: string;
            tenKhoan: string;
            loai: import(".prisma/client").$Enums.LoaiKhoanLuong;
            cachTinh: import(".prisma/client").$Enums.CachTinhLuong;
            chiuThue: boolean;
            phamViApDung: string | null;
            thuTu: number;
        };
    } & {
        id: number;
        moTa: string | null;
        trangThai: boolean;
        ngayTao: Date;
        ngayCapNhat: Date;
        khoanLuongId: number;
        nguoiTao: string | null;
        tenRule: string;
        loaiRule: import(".prisma/client").$Enums.LoaiRule;
        dieuKienJson: string | null;
        congThucJson: string;
        thuTuUuTien: number;
        cheDoGop: import(".prisma/client").$Enums.CheDoGop;
        choPhepChinhTay: boolean;
        quyCheId: number;
    }>;
    sapXepRule(quyCheId: number, dto: SapXepRuleDto): Promise<({
        khoanLuong: {
            id: number;
            maKhoan: string;
            tenKhoan: string;
            loai: import(".prisma/client").$Enums.LoaiKhoanLuong;
        };
    } & {
        id: number;
        moTa: string | null;
        trangThai: boolean;
        ngayTao: Date;
        ngayCapNhat: Date;
        khoanLuongId: number;
        nguoiTao: string | null;
        tenRule: string;
        loaiRule: import(".prisma/client").$Enums.LoaiRule;
        dieuKienJson: string | null;
        congThucJson: string;
        thuTuUuTien: number;
        cheDoGop: import(".prisma/client").$Enums.CheDoGop;
        choPhepChinhTay: boolean;
        quyCheId: number;
    })[]>;
}
export declare class QuyCheRuleController {
    private readonly quyCheRuleService;
    constructor(quyCheRuleService: QuyCheRuleService);
    layChiTiet(id: number): Promise<{
        daChotLuong: boolean;
        coDuocSua: boolean;
        quyChe: {
            bangLuongs: ({
                bangLuong: {
                    id: number;
                    trangThai: import(".prisma/client").$Enums.TrangThaiBangLuong;
                    ngayTao: Date;
                    ngayCapNhat: Date;
                    phongBanId: number;
                    nam: number;
                    ghiChu: string | null;
                    thang: number;
                    tenBangLuong: string | null;
                    ngayChot: Date | null;
                    nguoiChot: string | null;
                };
            } & {
                id: number;
                ngayTao: Date;
                bangLuongId: number;
                quyCheId: number;
                ngayApDung: Date;
                nguoiApDung: string | null;
            })[];
            phongBan: {
                id: number;
                maPhongBan: string;
                tenPhongBan: string;
                moTa: string | null;
                trangThai: string;
                phongBanChaId: number | null;
                capDo: number;
                loaiPhongBan: string | null;
                nguoiQuanLyId: number | null;
                gioVaoChuan: string;
                gioRaChuan: string;
                phutChoPhepTre: number;
                taoBoi: number | null;
                capNhatBoi: number | null;
                ngayTao: Date;
                ngayCapNhat: Date;
            };
        } & {
            id: number;
            moTa: string | null;
            trangThai: import(".prisma/client").$Enums.TrangThaiQuyChe;
            ngayTao: Date;
            ngayCapNhat: Date;
            phongBanId: number;
            tuNgay: Date;
            denNgay: Date | null;
            nguoiTao: string | null;
            tenQuyChe: string;
            phienBan: number;
        };
        khoanLuong: {
            id: number;
            moTa: string | null;
            trangThai: boolean;
            ngayTao: Date;
            ngayCapNhat: Date;
            maKhoan: string;
            tenKhoan: string;
            loai: import(".prisma/client").$Enums.LoaiKhoanLuong;
            cachTinh: import(".prisma/client").$Enums.CachTinhLuong;
            chiuThue: boolean;
            phamViApDung: string | null;
            thuTu: number;
        };
        id: number;
        moTa: string | null;
        trangThai: boolean;
        ngayTao: Date;
        ngayCapNhat: Date;
        khoanLuongId: number;
        nguoiTao: string | null;
        tenRule: string;
        loaiRule: import(".prisma/client").$Enums.LoaiRule;
        dieuKienJson: string | null;
        congThucJson: string;
        thuTuUuTien: number;
        cheDoGop: import(".prisma/client").$Enums.CheDoGop;
        choPhepChinhTay: boolean;
        quyCheId: number;
    }>;
    capNhat(id: number, dto: CapNhatQuyCheRuleDto): Promise<{
        khoanLuong: {
            id: number;
            moTa: string | null;
            trangThai: boolean;
            ngayTao: Date;
            ngayCapNhat: Date;
            maKhoan: string;
            tenKhoan: string;
            loai: import(".prisma/client").$Enums.LoaiKhoanLuong;
            cachTinh: import(".prisma/client").$Enums.CachTinhLuong;
            chiuThue: boolean;
            phamViApDung: string | null;
            thuTu: number;
        };
    } & {
        id: number;
        moTa: string | null;
        trangThai: boolean;
        ngayTao: Date;
        ngayCapNhat: Date;
        khoanLuongId: number;
        nguoiTao: string | null;
        tenRule: string;
        loaiRule: import(".prisma/client").$Enums.LoaiRule;
        dieuKienJson: string | null;
        congThucJson: string;
        thuTuUuTien: number;
        cheDoGop: import(".prisma/client").$Enums.CheDoGop;
        choPhepChinhTay: boolean;
        quyCheId: number;
    }>;
    xoa(id: number): Promise<{
        id: number;
        moTa: string | null;
        trangThai: boolean;
        ngayTao: Date;
        ngayCapNhat: Date;
        khoanLuongId: number;
        nguoiTao: string | null;
        tenRule: string;
        loaiRule: import(".prisma/client").$Enums.LoaiRule;
        dieuKienJson: string | null;
        congThucJson: string;
        thuTuUuTien: number;
        cheDoGop: import(".prisma/client").$Enums.CheDoGop;
        choPhepChinhTay: boolean;
        quyCheId: number;
    }>;
    validate(dto: ValidateRuleDto): Promise<import("./dto/quy-che-rule.dto").KetQuaValidate>;
    preview(dto: PreviewRuleDto): Promise<import("./dto/quy-che-rule.dto").KetQuaPreview>;
}
export declare class SuKienThuongPhatController {
    private readonly suKienService;
    constructor(suKienService: SuKienThuongPhatService);
    layDanhSach(filter: LocSuKienDto): Promise<({
        phongBan: {
            id: number;
            maPhongBan: string;
            tenPhongBan: string;
        };
        nhanVien: {
            id: number;
            maNhanVien: string;
            hoTen: string;
        };
    } & {
        id: number;
        trangThai: import(".prisma/client").$Enums.TrangThaiSuKien;
        ngayTao: Date;
        ngayCapNhat: Date;
        phongBanId: number;
        nhanVienId: number;
        soTien: import("@prisma/client/runtime/library").Decimal;
        ghiChu: string | null;
        nguoiTao: string | null;
        giaTri: import("@prisma/client/runtime/library").Decimal;
        ngay: Date;
        maSuKien: string;
        loaiSuKien: import(".prisma/client").$Enums.LoaiSuKien;
        duyetBoi: string | null;
        duyetLuc: Date | null;
    })[]>;
    layDanhMuc(loai?: LoaiSuKien): Promise<{
        id: number;
        moTa: string | null;
        trangThai: boolean;
        ngayTao: Date;
        ngayCapNhat: Date;
        loai: import(".prisma/client").$Enums.LoaiSuKien;
        maSuKien: string;
        tenSuKien: string;
        soTienMacDinh: import("@prisma/client/runtime/library").Decimal | null;
    }[]>;
    taoDanhMuc(dto: TaoDanhMucSuKienDto): Promise<{
        id: number;
        moTa: string | null;
        trangThai: boolean;
        ngayTao: Date;
        ngayCapNhat: Date;
        loai: import(".prisma/client").$Enums.LoaiSuKien;
        maSuKien: string;
        tenSuKien: string;
        soTienMacDinh: import("@prisma/client/runtime/library").Decimal | null;
    }>;
    khoiTaoDanhMucMau(): Promise<{
        message: string;
    }>;
    layChiTiet(id: number): Promise<{
        phongBan: {
            id: number;
            maPhongBan: string;
            tenPhongBan: string;
            moTa: string | null;
            trangThai: string;
            phongBanChaId: number | null;
            capDo: number;
            loaiPhongBan: string | null;
            nguoiQuanLyId: number | null;
            gioVaoChuan: string;
            gioRaChuan: string;
            phutChoPhepTre: number;
            taoBoi: number | null;
            capNhatBoi: number | null;
            ngayTao: Date;
            ngayCapNhat: Date;
        };
        nhanVien: {
            id: number;
            trangThai: import(".prisma/client").$Enums.TrangThaiNhanVien;
            taoBoi: number | null;
            capNhatBoi: number | null;
            ngayTao: Date;
            ngayCapNhat: Date;
            maNhanVien: string;
            email: string | null;
            hoTen: string;
            soDienThoai: string | null;
            phongBanId: number;
            chucVu: string | null;
            luongCoBan: import("@prisma/client/runtime/library").Decimal;
            ngayVaoLam: Date;
            ngayNghiViec: Date | null;
            gioiTinh: import(".prisma/client").$Enums.GioiTinh | null;
            ngaySinh: Date | null;
            diaChi: string | null;
        };
    } & {
        id: number;
        trangThai: import(".prisma/client").$Enums.TrangThaiSuKien;
        ngayTao: Date;
        ngayCapNhat: Date;
        phongBanId: number;
        nhanVienId: number;
        soTien: import("@prisma/client/runtime/library").Decimal;
        ghiChu: string | null;
        nguoiTao: string | null;
        giaTri: import("@prisma/client/runtime/library").Decimal;
        ngay: Date;
        maSuKien: string;
        loaiSuKien: import(".prisma/client").$Enums.LoaiSuKien;
        duyetBoi: string | null;
        duyetLuc: Date | null;
    }>;
    tao(dto: TaoSuKienDto): Promise<{
        phongBan: {
            id: number;
            maPhongBan: string;
            tenPhongBan: string;
            moTa: string | null;
            trangThai: string;
            phongBanChaId: number | null;
            capDo: number;
            loaiPhongBan: string | null;
            nguoiQuanLyId: number | null;
            gioVaoChuan: string;
            gioRaChuan: string;
            phutChoPhepTre: number;
            taoBoi: number | null;
            capNhatBoi: number | null;
            ngayTao: Date;
            ngayCapNhat: Date;
        };
        nhanVien: {
            id: number;
            trangThai: import(".prisma/client").$Enums.TrangThaiNhanVien;
            taoBoi: number | null;
            capNhatBoi: number | null;
            ngayTao: Date;
            ngayCapNhat: Date;
            maNhanVien: string;
            email: string | null;
            hoTen: string;
            soDienThoai: string | null;
            phongBanId: number;
            chucVu: string | null;
            luongCoBan: import("@prisma/client/runtime/library").Decimal;
            ngayVaoLam: Date;
            ngayNghiViec: Date | null;
            gioiTinh: import(".prisma/client").$Enums.GioiTinh | null;
            ngaySinh: Date | null;
            diaChi: string | null;
        };
    } & {
        id: number;
        trangThai: import(".prisma/client").$Enums.TrangThaiSuKien;
        ngayTao: Date;
        ngayCapNhat: Date;
        phongBanId: number;
        nhanVienId: number;
        soTien: import("@prisma/client/runtime/library").Decimal;
        ghiChu: string | null;
        nguoiTao: string | null;
        giaTri: import("@prisma/client/runtime/library").Decimal;
        ngay: Date;
        maSuKien: string;
        loaiSuKien: import(".prisma/client").$Enums.LoaiSuKien;
        duyetBoi: string | null;
        duyetLuc: Date | null;
    }>;
    taoNhieu(dtos: TaoSuKienDto[]): Promise<{
        thanhCong: number;
        thatBai: number;
        loi: string[];
    }>;
    capNhat(id: number, dto: CapNhatSuKienDto): Promise<{
        phongBan: {
            id: number;
            maPhongBan: string;
            tenPhongBan: string;
            moTa: string | null;
            trangThai: string;
            phongBanChaId: number | null;
            capDo: number;
            loaiPhongBan: string | null;
            nguoiQuanLyId: number | null;
            gioVaoChuan: string;
            gioRaChuan: string;
            phutChoPhepTre: number;
            taoBoi: number | null;
            capNhatBoi: number | null;
            ngayTao: Date;
            ngayCapNhat: Date;
        };
        nhanVien: {
            id: number;
            trangThai: import(".prisma/client").$Enums.TrangThaiNhanVien;
            taoBoi: number | null;
            capNhatBoi: number | null;
            ngayTao: Date;
            ngayCapNhat: Date;
            maNhanVien: string;
            email: string | null;
            hoTen: string;
            soDienThoai: string | null;
            phongBanId: number;
            chucVu: string | null;
            luongCoBan: import("@prisma/client/runtime/library").Decimal;
            ngayVaoLam: Date;
            ngayNghiViec: Date | null;
            gioiTinh: import(".prisma/client").$Enums.GioiTinh | null;
            ngaySinh: Date | null;
            diaChi: string | null;
        };
    } & {
        id: number;
        trangThai: import(".prisma/client").$Enums.TrangThaiSuKien;
        ngayTao: Date;
        ngayCapNhat: Date;
        phongBanId: number;
        nhanVienId: number;
        soTien: import("@prisma/client/runtime/library").Decimal;
        ghiChu: string | null;
        nguoiTao: string | null;
        giaTri: import("@prisma/client/runtime/library").Decimal;
        ngay: Date;
        maSuKien: string;
        loaiSuKien: import(".prisma/client").$Enums.LoaiSuKien;
        duyetBoi: string | null;
        duyetLuc: Date | null;
    }>;
    duyet(id: number, dto: DuyetSuKienDto): Promise<{
        phongBan: {
            id: number;
            maPhongBan: string;
            tenPhongBan: string;
            moTa: string | null;
            trangThai: string;
            phongBanChaId: number | null;
            capDo: number;
            loaiPhongBan: string | null;
            nguoiQuanLyId: number | null;
            gioVaoChuan: string;
            gioRaChuan: string;
            phutChoPhepTre: number;
            taoBoi: number | null;
            capNhatBoi: number | null;
            ngayTao: Date;
            ngayCapNhat: Date;
        };
        nhanVien: {
            id: number;
            trangThai: import(".prisma/client").$Enums.TrangThaiNhanVien;
            taoBoi: number | null;
            capNhatBoi: number | null;
            ngayTao: Date;
            ngayCapNhat: Date;
            maNhanVien: string;
            email: string | null;
            hoTen: string;
            soDienThoai: string | null;
            phongBanId: number;
            chucVu: string | null;
            luongCoBan: import("@prisma/client/runtime/library").Decimal;
            ngayVaoLam: Date;
            ngayNghiViec: Date | null;
            gioiTinh: import(".prisma/client").$Enums.GioiTinh | null;
            ngaySinh: Date | null;
            diaChi: string | null;
        };
    } & {
        id: number;
        trangThai: import(".prisma/client").$Enums.TrangThaiSuKien;
        ngayTao: Date;
        ngayCapNhat: Date;
        phongBanId: number;
        nhanVienId: number;
        soTien: import("@prisma/client/runtime/library").Decimal;
        ghiChu: string | null;
        nguoiTao: string | null;
        giaTri: import("@prisma/client/runtime/library").Decimal;
        ngay: Date;
        maSuKien: string;
        loaiSuKien: import(".prisma/client").$Enums.LoaiSuKien;
        duyetBoi: string | null;
        duyetLuc: Date | null;
    }>;
    duyetNhieu(dto: DuyetNhieuSuKienDto): Promise<import(".prisma/client").Prisma.BatchPayload>;
    huy(id: number): Promise<{
        id: number;
        trangThai: import(".prisma/client").$Enums.TrangThaiSuKien;
        ngayTao: Date;
        ngayCapNhat: Date;
        phongBanId: number;
        nhanVienId: number;
        soTien: import("@prisma/client/runtime/library").Decimal;
        ghiChu: string | null;
        nguoiTao: string | null;
        giaTri: import("@prisma/client/runtime/library").Decimal;
        ngay: Date;
        maSuKien: string;
        loaiSuKien: import(".prisma/client").$Enums.LoaiSuKien;
        duyetBoi: string | null;
        duyetLuc: Date | null;
    }>;
    thongKe(nhanVienId: number, thang: number, nam: number): Promise<{
        chiTiet: (import(".prisma/client").Prisma.PickEnumerable<import(".prisma/client").Prisma.SuKienThuongPhatGroupByOutputType, ("maSuKien" | "loaiSuKien")[]> & {
            _count: number;
            _sum: {
                giaTri: import("@prisma/client/runtime/library").Decimal | null;
                soTien: import("@prisma/client/runtime/library").Decimal | null;
            };
        })[];
        tongThuong: number;
        tongPhat: number;
        chenh: number;
    }>;
}
export declare class RuleEngineExecutorController {
    private readonly ruleEngineExecutor;
    constructor(ruleEngineExecutor: RuleEngineExecutor);
    chayRuleEngine(id: number, nguoiThucHien?: string): Promise<import("./rule-engine-executor.service").KetQuaEngine>;
    xemTrace(id: number, nhanVienId?: string): Promise<({
        quyChe: {
            id: number;
            tenQuyChe: string;
            phienBan: number;
        };
        khoanLuong: {
            id: number;
            maKhoan: string;
            tenKhoan: string;
            loai: import(".prisma/client").$Enums.LoaiKhoanLuong;
        };
        nhanVien: {
            id: number;
            maNhanVien: string;
            hoTen: string;
        };
        quyCheRule: {
            id: number;
            tenRule: string;
            loaiRule: import(".prisma/client").$Enums.LoaiRule;
        } | null;
    } & {
        id: number;
        nhanVienId: number;
        khoanLuongId: number;
        bangLuongId: number;
        quyCheId: number;
        inputJson: string;
        outputSoTien: import("@prisma/client/runtime/library").Decimal;
        messageGiaiThich: string;
        taoLuc: Date;
        quyCheRuleId: number | null;
    })[]>;
}
