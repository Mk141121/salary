import { RuleEngineService } from './rule-engine.service';
import { TaoCongThucDto, CapNhatCongThucDto, ThemBienSoDto, TestCongThucDto, TinhLuongDto } from './dto/rule-engine.dto';
export declare class RuleEngineController {
    private readonly ruleEngineService;
    constructor(ruleEngineService: RuleEngineService);
    layDanhSachCongThuc(phongBanId?: string): Promise<({
        bienSos: {
            id: number;
            moTa: string | null;
            ngayTao: Date;
            giaTriMacDinh: string | null;
            tenBien: string;
            kieuDuLieu: import(".prisma/client").$Enums.KieuDuLieu;
            nguonDuLieu: string | null;
            congThucId: number;
        }[];
    } & {
        id: number;
        moTa: string | null;
        trangThai: boolean;
        ngayTao: Date;
        ngayCapNhat: Date;
        phongBanId: number | null;
        tuNgay: Date;
        denNgay: Date | null;
        nguoiTao: string | null;
        maCongThuc: string;
        tenCongThuc: string;
        congThuc: string;
        phienBan: number;
    })[]>;
    layCongThuc(id: number): Promise<{
        bienSos: {
            id: number;
            moTa: string | null;
            ngayTao: Date;
            giaTriMacDinh: string | null;
            tenBien: string;
            kieuDuLieu: import(".prisma/client").$Enums.KieuDuLieu;
            nguonDuLieu: string | null;
            congThucId: number;
        }[];
    } & {
        id: number;
        moTa: string | null;
        trangThai: boolean;
        ngayTao: Date;
        ngayCapNhat: Date;
        phongBanId: number | null;
        tuNgay: Date;
        denNgay: Date | null;
        nguoiTao: string | null;
        maCongThuc: string;
        tenCongThuc: string;
        congThuc: string;
        phienBan: number;
    }>;
    taoCongThuc(dto: TaoCongThucDto): Promise<{
        bienSos: {
            id: number;
            moTa: string | null;
            ngayTao: Date;
            giaTriMacDinh: string | null;
            tenBien: string;
            kieuDuLieu: import(".prisma/client").$Enums.KieuDuLieu;
            nguonDuLieu: string | null;
            congThucId: number;
        }[];
    } & {
        id: number;
        moTa: string | null;
        trangThai: boolean;
        ngayTao: Date;
        ngayCapNhat: Date;
        phongBanId: number | null;
        tuNgay: Date;
        denNgay: Date | null;
        nguoiTao: string | null;
        maCongThuc: string;
        tenCongThuc: string;
        congThuc: string;
        phienBan: number;
    }>;
    capNhatCongThuc(id: number, dto: CapNhatCongThucDto): Promise<{
        bienSos: {
            id: number;
            moTa: string | null;
            ngayTao: Date;
            giaTriMacDinh: string | null;
            tenBien: string;
            kieuDuLieu: import(".prisma/client").$Enums.KieuDuLieu;
            nguonDuLieu: string | null;
            congThucId: number;
        }[];
    } & {
        id: number;
        moTa: string | null;
        trangThai: boolean;
        ngayTao: Date;
        ngayCapNhat: Date;
        phongBanId: number | null;
        tuNgay: Date;
        denNgay: Date | null;
        nguoiTao: string | null;
        maCongThuc: string;
        tenCongThuc: string;
        congThuc: string;
        phienBan: number;
    }>;
    layLichSuCongThuc(maCongThuc: string): Promise<{
        id: number;
        nguoiThayDoi: string;
        ngayThayDoi: Date;
        maCongThuc: string;
        phienBan: number;
        congThucCu: string;
        congThucMoi: string;
        lyDoThayDoi: string | null;
    }[]>;
    themBienSo(congThucId: number, dto: ThemBienSoDto): Promise<{
        id: number;
        moTa: string | null;
        ngayTao: Date;
        giaTriMacDinh: string | null;
        tenBien: string;
        kieuDuLieu: import(".prisma/client").$Enums.KieuDuLieu;
        nguonDuLieu: string | null;
        congThucId: number;
    }>;
    xoaBienSo(id: number): Promise<{
        id: number;
        moTa: string | null;
        ngayTao: Date;
        giaTriMacDinh: string | null;
        tenBien: string;
        kieuDuLieu: import(".prisma/client").$Enums.KieuDuLieu;
        nguonDuLieu: string | null;
        congThucId: number;
    }>;
    testCongThuc(dto: TestCongThucDto): Promise<import("./rule-engine.service").KetQuaTinhCongThuc>;
    tinhLuong(dto: TinhLuongDto): Promise<import("./rule-engine.service").KetQuaTinhCongThuc>;
    khoiTaoCongThucMau(): Promise<{
        message: string;
    }>;
}
