// Module Sổ Lương
import { Module } from '@nestjs/common';
import { SoLuongController } from './so-luong.controller';
import { SoLuongService } from './so-luong.service';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [SoLuongController],
  providers: [SoLuongService],
  exports: [SoLuongService],
})
export class SoLuongModule {}
