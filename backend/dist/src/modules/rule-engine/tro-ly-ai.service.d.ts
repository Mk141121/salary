import { PrismaService } from '../../prisma/prisma.service';
import { GoiYRuleDto, GoiYRuleResponseDto, AiContextDto, ApDungRuleDeXuatDto } from './dto/tro-ly-ai.dto';
export declare class TroLyAiService {
    private prisma;
    constructor(prisma: PrismaService);
    layContext(phongBanId: number, quyCheId: number): Promise<AiContextDto>;
    goiYRule(dto: GoiYRuleDto, nguoiTaoId?: number): Promise<GoiYRuleResponseDto>;
    private phanTichNoiDung;
    private nhanDienLoaiRule;
    private nhanDienKhoanLuong;
    private parseCongThuc;
    private parseSoTien;
    private parseCongThucCoDinh;
    private parseCongThucTheoHeSo;
    private parseCongThucBacThang;
    private parseCongThucTheoSuKien;
    private parseCongThucBieuThuc;
    private parseDieuKien;
    private taoTenRule;
    private xacDinhCheDoGop;
    apDungRule(dto: ApDungRuleDeXuatDto, quyCheId: number, nguoiTaoId?: number): Promise<{
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
    huyDeXuat(auditId: number): Promise<{
        id: number;
        trangThai: import(".prisma/client").$Enums.TrangThaiAiAudit;
        phongBanId: number | null;
        quyCheId: number | null;
        taoLuc: Date;
        promptGoc: string;
        responseJson: string;
        nguoiTaoId: number | null;
        ruleApDungId: number | null;
    }>;
    lichSuDeXuat(quyCheId: number): Promise<({
        nguoiTao: {
            id: number;
            hoTen: string;
        } | null;
        rule: {
            id: number;
            tenRule: string;
        } | null;
    } & {
        id: number;
        trangThai: import(".prisma/client").$Enums.TrangThaiAiAudit;
        phongBanId: number | null;
        quyCheId: number | null;
        taoLuc: Date;
        promptGoc: string;
        responseJson: string;
        nguoiTaoId: number | null;
        ruleApDungId: number | null;
    })[]>;
}
