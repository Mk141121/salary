// Module Khoản Lương
import { Module } from '@nestjs/common';
import { KhoanLuongController } from './khoan-luong.controller';
import { KhoanLuongService } from './khoan-luong.service';

@Module({
  controllers: [KhoanLuongController],
  providers: [KhoanLuongService],
  exports: [KhoanLuongService],
})
export class KhoanLuongModule {}
