import { ConfigService } from '@nestjs/config';
export interface PhieuLuongData {
    hoTen: string;
    maNhanVien: string;
    email: string;
    phongBan: string;
    chucVu: string;
    thang: number;
    nam: number;
    ngayCongThucTe: number;
    ngayCongLyThuyet: number;
    cacKhoanLuong: Array<{
        tenKhoan: string;
        loai: 'THU_NHAP' | 'KHAU_TRU';
        soTien: number;
    }>;
    tongThuNhap: number;
    tongKhauTru: number;
    thucLinh: number;
}
export declare class EmailService {
    private configService;
    private readonly logger;
    private transporter;
    constructor(configService: ConfigService);
    private generatePayslipHtml;
    sendPayslip(data: PhieuLuongData): Promise<{
        success: boolean;
        message: string;
    }>;
    sendPayslipBulk(dataList: PhieuLuongData[]): Promise<{
        success: number;
        failed: number;
        errors: string[];
    }>;
    verifyConnection(): Promise<boolean>;
    getPayslipHtml(data: PhieuLuongData): string;
}
