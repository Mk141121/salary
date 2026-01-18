import { Module } from '@nestjs/common';
import { PhanCaController } from './phan-ca.controller';
import { PhanCaService } from './phan-ca.service';
import { PrismaModule } from '../../prisma/prisma.module';
import { CaLamViecModule } from '../ca-lam-viec/ca-lam-viec.module';

@Module({
  imports: [PrismaModule, CaLamViecModule],
  controllers: [PhanCaController],
  providers: [PhanCaService],
  exports: [PhanCaService],
})
export class PhanCaModule {}
