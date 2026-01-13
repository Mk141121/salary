// Module Import Excel
import { Module } from '@nestjs/common';
import { ImportExcelController } from './import-excel.controller';
import { ImportExcelService } from './import-excel.service';
import { BangLuongModule } from '../bang-luong/bang-luong.module';

@Module({
  imports: [BangLuongModule],
  controllers: [ImportExcelController],
  providers: [ImportExcelService],
  exports: [ImportExcelService],
})
export class ImportExcelModule {}
