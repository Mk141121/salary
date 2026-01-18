import { Module } from '@nestjs/common';
import { CaLamViecController } from './ca-lam-viec.controller';
import { CaLamViecService } from './ca-lam-viec.service';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CaLamViecController],
  providers: [CaLamViecService],
  exports: [CaLamViecService],
})
export class CaLamViecModule {}
