// Module Phụ cấp Nhân viên
import { Module } from '@nestjs/common';
import { PhuCapNhanVienController } from './phu-cap-nhan-vien.controller';
import { PhuCapNhanVienService } from './phu-cap-nhan-vien.service';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [PhuCapNhanVienController],
  providers: [PhuCapNhanVienService],
  exports: [PhuCapNhanVienService],
})
export class PhuCapNhanVienModule {}
