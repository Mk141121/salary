import { OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ThongBaoService } from '../thong-bao/thong-bao.service';
import { ConfigService } from '@nestjs/config';
export declare class AutoEscalationService implements OnModuleInit {
    private prisma;
    private thongBaoService;
    private configService;
    private readonly logger;
    private config;
    constructor(prisma: PrismaService, thongBaoService: ThongBaoService, configService: ConfigService);
    onModuleInit(): void;
    nhacNhoDonQuaHan(): Promise<void>;
    escalateDonQuaHan(): Promise<void>;
    tuDongDuyetDonQuaHan(): Promise<void>;
    baoCaoTuanMoi(): Promise<void>;
    private layNguoiDuyetCap2;
    runManually(job: 'remind' | 'escalate' | 'auto-approve' | 'report'): Promise<{
        message: string;
    }>;
}
