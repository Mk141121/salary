import { ThongBaoService } from './thong-bao.service';
import { ThongBaoQueryDto } from './thong-bao.dto';
export declare class ThongBaoController {
    private readonly service;
    constructor(service: ThongBaoService);
    layDanhSach(req: any, query: ThongBaoQueryDto): Promise<import("./thong-bao.dto").DanhSachThongBaoResponse>;
    demChuaDoc(req: any): Promise<{
        chuaDoc: number;
    }>;
    danhDauDaDoc(req: any, id: number): Promise<import("./thong-bao.dto").ThongBaoResponse>;
    danhDauTatCaDaDoc(req: any): Promise<{
        count: number;
    }>;
}
