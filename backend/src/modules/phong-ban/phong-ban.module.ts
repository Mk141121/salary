// Module Phòng Ban
import { Module } from '@nestjs/common';
import { PhongBanController } from './phong-ban.controller';
import { PhongBanService } from './phong-ban.service';

@Module({
  controllers: [PhongBanController],
  providers: [PhongBanService],
  exports: [PhongBanService],
})
export class PhongBanModule {}
