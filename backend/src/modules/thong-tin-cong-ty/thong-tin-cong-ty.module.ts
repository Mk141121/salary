import { Module } from '@nestjs/common';
import { ThongTinCongTyController } from './thong-tin-cong-ty.controller';
import { ThongTinCongTyService } from './thong-tin-cong-ty.service';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ThongTinCongTyController],
  providers: [ThongTinCongTyService],
  exports: [ThongTinCongTyService],
})
export class ThongTinCongTyModule {}
