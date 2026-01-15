import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { NganHangController } from './ngan-hang.controller';
import { NganHangService } from './ngan-hang.service';

@Module({
  imports: [PrismaModule],
  controllers: [NganHangController],
  providers: [NganHangService],
  exports: [NganHangService],
})
export class NganHangModule {}
