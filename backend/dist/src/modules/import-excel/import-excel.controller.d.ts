import { Response } from 'express';
import { ImportExcelService, CotExcel } from './import-excel.service';
export declare class ImportExcelController {
    private readonly importExcelService;
    constructor(importExcelService: ImportExcelService);
    docHeader(file: Express.Multer.File): Promise<{
        headers: string[];
        duLieuMau: string[][];
    }>;
    goiYMapping(file: Express.Multer.File): Promise<CotExcel[]>;
    layDanhSachMapping(): Promise<{
        id: number;
        trangThai: boolean;
        ngayTao: Date;
        ngayCapNhat: Date;
        khoanLuongId: number | null;
        truongHeThong: string | null;
        tenMapping: string;
        tenCotExcel: string;
        thuTuCot: number;
    }[]>;
    importExcel(file: Express.Multer.File, thang: string, nam: string, phongBanId: string, mappingsJson: string): Promise<import("./import-excel.service").KetQuaImport>;
    exportExcel(bangLuongId: number, res: Response): Promise<void>;
}
