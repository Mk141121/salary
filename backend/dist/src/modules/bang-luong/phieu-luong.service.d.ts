import { PrismaService } from '../../prisma/prisma.service';
import { EmailService, PhieuLuongData } from '../email/email.service';
import { TinhLuongService } from './tinh-luong.service';
export declare class PhieuLuongService {
    private prisma;
    private emailService;
    private tinhLuongService;
    constructor(prisma: PrismaService, emailService: EmailService, tinhLuongService: TinhLuongService);
    private tinhSoNgayCongLyThuyet;
    layPhieuLuong(bangLuongId: number, nhanVienId: number): Promise<PhieuLuongData>;
    layPhieuLuongHtml(bangLuongId: number, nhanVienId: number): Promise<{
        html: string;
        data: PhieuLuongData;
    }>;
    guiPhieuLuong(bangLuongId: number, nhanVienId: number): Promise<{
        success: boolean;
        message: string;
    }>;
    guiTatCaPhieuLuong(bangLuongId: number): Promise<{
        success: number;
        failed: number;
        errors: string[];
    }>;
}
