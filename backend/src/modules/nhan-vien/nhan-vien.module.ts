// Module Nhân Viên
import { Module } from '@nestjs/common';
import { NhanVienController } from './nhan-vien.controller';
import { NhanVienService } from './nhan-vien.service';
import { ImportExportNhanVienService } from './import-export-nhan-vien.service';

@Module({
  controllers: [NhanVienController],
  providers: [NhanVienService, ImportExportNhanVienService],
  exports: [NhanVienService, ImportExportNhanVienService],
})
export class NhanVienModule {}
