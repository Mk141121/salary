import { TroLyAiService } from './tro-ly-ai.service';
import { GoiYRuleDto, ApDungRuleDeXuatDto } from './dto/tro-ly-ai.dto';
export declare class TroLyAiController {
    private readonly troLyAiService;
    constructor(troLyAiService: TroLyAiService);
    goiYRule(dto: GoiYRuleDto): Promise<import("./dto/tro-ly-ai.dto").GoiYRuleResponseDto>;
    layContext(phongBanId: number, quyCheId: number): Promise<import("./dto/tro-ly-ai.dto").AiContextDto>;
    apDungRule(quyCheId: number, dto: ApDungRuleDeXuatDto): Promise<{
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
