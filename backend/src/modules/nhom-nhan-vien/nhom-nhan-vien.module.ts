import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { NhomNhanVienController } from './nhom-nhan-vien.controller';
import { NhomNhanVienService } from './nhom-nhan-vien.service';

@Module({
  imports: [PrismaModule],
  controllers: [NhomNhanVienController],
  providers: [NhomNhanVienService],
  exports: [NhomNhanVienService],
})
export class NhomNhanVienModule {}
