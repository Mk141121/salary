import { PrismaService } from '../../prisma/prisma.service';
import { QuyCheService } from './quy-che.service';
import { SuKienThuongPhatService } from './su-kien-thuong-phat.service';
export interface KetQuaEngine {
    bangLuongId: number;
    quyCheId: number;
    soNhanVien: number;
    soDongTao: number;
    soTraceGhi: number;
    chiTiet: {
        nhanVienId: number;
        hoTen: string;
        tongThuNhap: number;
        tongKhauTru: number;
        thucNhan: number;
        cacKhoan: {
            khoanLuong: string;
            soTien: number;
        }[];
    }[];
    thoiGianXuLy: number;
}
export declare class RuleEngineExecutor {
    private prisma;
    private quyCheService;
    private suKienService;
    private readonly BIEN_CHO_PHEP;
    constructor(prisma: PrismaService, quyCheService: QuyCheService, suKienService: SuKienThuongPhatService);
    chayRuleEngine(bangLuongId: number, nguoiThucHien?: string): Promise<KetQuaEngine>;
    private chuanBiDuLieuNhanVien;
    private kiemTraDieuKien;
    private tinhToanRule;
    private layGiaTriBien;
    xemTrace(bangLuongId: number, nhanVienId?: number): Promise<({
        quyChe: {
            id: number;
            phienBan: number;
            tenQuyChe: string;
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
    private formatTien;
}
