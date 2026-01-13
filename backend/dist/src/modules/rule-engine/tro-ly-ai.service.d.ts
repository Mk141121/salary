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
            moTa: string | null;
            trangThai: boolean;
            ngayTao: Date;
            ngayCapNhat: Date;
            id: number;
            maKhoan: string;
            tenKhoan: string;
            loai: import(".prisma/client").$Enums.LoaiKhoanLuong;
            cachTinh: import(".prisma/client").$Enums.CachTinhLuong;
            chiuThue: boolean;
            phamViApDung: string | null;
            thuTu: number;
        };
    } & {
        tenRule: string;
        moTa: string | null;
        loaiRule: import(".prisma/client").$Enums.LoaiRule;
        dieuKienJson: string | null;
        congThucJson: string;
        thuTuUuTien: number;
        cheDoGop: import(".prisma/client").$Enums.CheDoGop;
        choPhepChinhTay: boolean;
        trangThai: boolean;
        nguoiTao: string | null;
        ngayTao: Date;
        ngayCapNhat: Date;
        id: number;
        quyCheId: number;
        khoanLuongId: number;
    }>;
    huyDeXuat(auditId: number): Promise<{
        trangThai: import(".prisma/client").$Enums.TrangThaiAiAudit;
        id: number;
        quyCheId: number | null;
        nguoiTaoId: number | null;
        phongBanId: number | null;
        promptGoc: string;
        responseJson: string;
        ruleApDungId: number | null;
        taoLuc: Date;
    }>;
    lichSuDeXuat(quyCheId: number): Promise<({
        nguoiTao: {
            id: number;
            hoTen: string;
        } | null;
        rule: {
            tenRule: string;
            id: number;
        } | null;
    } & {
        trangThai: import(".prisma/client").$Enums.TrangThaiAiAudit;
        id: number;
        quyCheId: number | null;
        nguoiTaoId: number | null;
        phongBanId: number | null;
        promptGoc: string;
        responseJson: string;
        ruleApDungId: number | null;
        taoLuc: Date;
    })[]>;
}
