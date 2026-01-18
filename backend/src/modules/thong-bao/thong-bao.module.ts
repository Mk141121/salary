// Module Thông báo - Sprint 6
import { Module, Global } from '@nestjs/common';
import { ThongBaoController } from './thong-bao.controller';
import { ThongBaoService } from './thong-bao.service';
import { PrismaModule } from '../../prisma/prisma.module';

@Global() // Export globally để các module khác dùng event hooks
@Module({
  imports: [PrismaModule],
  controllers: [ThongBaoController],
  providers: [ThongBaoService],
  exports: [ThongBaoService],
})
export class ThongBaoModule {}
