import { TroLyAiService } from './tro-ly-ai.service';
import { GoiYRuleDto, ApDungRuleDeXuatDto } from './dto/tro-ly-ai.dto';
export declare class TroLyAiController {
    private readonly troLyAiService;
    constructor(troLyAiService: TroLyAiService);
    goiYRule(dto: GoiYRuleDto): Promise<import("./dto/tro-ly-ai.dto").GoiYRuleResponseDto>;
    layContext(phongBanId: number, quyCheId: number): Promise<import("./dto/tro-ly-ai.dto").AiContextDto>;
    apDungRule(quyCheId: number, dto: ApDungRuleDeXuatDto): Promise<{
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
        thuTuUuTien: number;
        quyCheId: number;
        tenRule: string;
        loaiRule: import(".prisma/client").$Enums.LoaiRule;
        dieuKienJson: string | null;
        congThucJson: string;
        cheDoGop: import(".prisma/client").$Enums.CheDoGop;
        choPhepChinhTay: boolean;
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
