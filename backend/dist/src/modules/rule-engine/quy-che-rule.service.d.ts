import { PrismaService } from '../../prisma/prisma.service';
import { TaoQuyCheRuleDto, CapNhatQuyCheRuleDto, ValidateRuleDto, PreviewRuleDto, SapXepRuleDto, KetQuaValidate, KetQuaPreview } from './dto/quy-che-rule.dto';
export declare class QuyCheRuleService {
    private prisma;
    constructor(prisma: PrismaService);
    layDanhSachTheoQuyChe(quyCheId: number): Promise<({
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
    tao(dto: TaoQuyCheRuleDto): Promise<{
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
    sapXep(quyCheId: number, dto: SapXepRuleDto): Promise<({
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
    validate(dto: ValidateRuleDto): KetQuaValidate;
    private validateCoDinh;
    private validateTheoHeSo;
    private validateBacThang;
    private validateTheoSuKien;
    private validateCongThuc;
    private validateDieuKien;
    preview(dto: PreviewRuleDto): Promise<KetQuaPreview>;
    private tinhToanRule;
    private formatTien;
}
