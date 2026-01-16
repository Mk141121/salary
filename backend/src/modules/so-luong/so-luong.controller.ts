// Controller Sổ Lương
import {
  Controller,
  Get,
  Param,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { SoLuongService } from './so-luong.service';
import { LocSoLuongDto, TimKiemSoLuongDto } from './dto';
import { Quyen } from '../../common/decorators';

@Controller('so-luong')
export class SoLuongController {
  constructor(private readonly soLuongService: SoLuongService) {}

  // ============================================
  // SỔ LƯƠNG THEO NHÂN VIÊN
  // ============================================

  @Get('nhan-vien/:id')
  @Quyen('SO_LUONG_VIEW')
  async laySoLuongNhanVien(
    @Param('id', ParseIntPipe) id: number,
    @Query() dto: LocSoLuongDto,
  ) {
    return this.soLuongService.laySoLuongNhanVien(id, dto);
  }

  // ============================================
  // SỔ LƯƠNG THEO PHÒNG BAN
  // ============================================

  @Get('phong-ban/:id')
  @Quyen('SO_LUONG_VIEW')
  async laySoLuongPhongBan(
    @Param('id', ParseIntPipe) id: number,
    @Query() dto: LocSoLuongDto,
  ) {
    return this.soLuongService.laySoLuongPhongBan(id, dto);
  }

  // ============================================
  // TÌM KIẾM SỔ LƯƠNG
  // ============================================

  @Get('search')
  @Quyen('SO_LUONG_VIEW')
  async timKiem(@Query() dto: TimKiemSoLuongDto) {
    return this.soLuongService.timKiem(dto);
  }

  // ============================================
  // CHI TIẾT ENTRY (DRILL-DOWN)
  // ============================================

  @Get('entry/:refType/:refId')
  @Quyen('SO_LUONG_VIEW')
  async layChiTietEntry(
    @Param('refType') refType: string,
    @Param('refId', ParseIntPipe) refId: number,
  ) {
    return this.soLuongService.layChiTietEntry(refType, refId);
  }
}
