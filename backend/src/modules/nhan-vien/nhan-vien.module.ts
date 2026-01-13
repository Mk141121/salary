// Module Nhân Viên
import { Module } from '@nestjs/common';
import { NhanVienController } from './nhan-vien.controller';
import { NhanVienService } from './nhan-vien.service';

@Module({
  controllers: [NhanVienController],
  providers: [NhanVienService],
  exports: [NhanVienService],
})
export class NhanVienModule {}
