// Module Phòng Ban - Hỗ trợ cây phân cấp + Đơn vị con + Phân quyền
import { Module } from '@nestjs/common';
import { 
  PhongBanController, 
  DonViConController,
  NhanVienPhongBanController,
  PhanQuyenPhongBanController 
} from './phong-ban.controller';
import { PhongBanService } from './phong-ban.service';

@Module({
  controllers: [
    PhongBanController,
    DonViConController,
    NhanVienPhongBanController,
    PhanQuyenPhongBanController,
  ],
  providers: [PhongBanService],
  exports: [PhongBanService],
})
export class PhongBanModule {}
