// Module Sản Lượng - Chia hàng & Giao hàng
import { Module } from '@nestjs/common';
import { SanLuongController } from './san-luong.controller';
import { SanLuongService } from './san-luong.service';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [SanLuongController],
  providers: [SanLuongService],
  exports: [SanLuongService],
})
export class SanLuongModule {}
