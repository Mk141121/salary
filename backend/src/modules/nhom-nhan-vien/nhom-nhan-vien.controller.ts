import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { NhomNhanVienService } from './nhom-nhan-vien.service';
import { TaoNhomDto, CapNhatNhomDto, ThemVaoNhomDto, GoKhoiNhomDto } from './nhom-nhan-vien.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { VaiTro } from '../../common/decorators/vai-tro.decorator';

@Controller()
@UseGuards(JwtAuthGuard, RolesGuard)
export class NhomNhanVienController {
  constructor(private readonly nhomNhanVienService: NhomNhanVienService) {}

  // =============== QUẢN LÝ NHÓM ===============

  /**
   * Lấy danh sách nhóm
   */
  @Get('nhom-nhan-vien')
  @VaiTro('ADMIN', 'HR', 'PAYROLL_OPERATOR')
  async layDanhSachNhom() {
    return this.nhomNhanVienService.layDanhSachNhom();
  }

  /**
   * Lấy chi tiết nhóm
   */
  @Get('nhom-nhan-vien/:id')
  @VaiTro('ADMIN', 'HR', 'PAYROLL_OPERATOR')
  async layNhomTheoId(@Param('id', ParseIntPipe) id: number) {
    return this.nhomNhanVienService.layNhomTheoId(id);
  }

  /**
   * Tạo nhóm mới
   */
  @Post('nhom-nhan-vien')
  @VaiTro('ADMIN', 'HR')
  async taoNhom(@Body() dto: TaoNhomDto) {
    return this.nhomNhanVienService.taoNhom(dto);
  }

  /**
   * Cập nhật nhóm
   */
  @Put('nhom-nhan-vien/:id')
  @VaiTro('ADMIN', 'HR')
  async capNhatNhom(@Param('id', ParseIntPipe) id: number, @Body() dto: CapNhatNhomDto) {
    return this.nhomNhanVienService.capNhatNhom(id, dto);
  }

  /**
   * Xóa nhóm
   */
  @Delete('nhom-nhan-vien/:id')
  @VaiTro('ADMIN')
  async xoaNhom(@Param('id', ParseIntPipe) id: number) {
    return this.nhomNhanVienService.xoaNhom(id);
  }

  // =============== THÀNH VIÊN NHÓM ===============

  /**
   * Lấy danh sách nhóm của nhân viên
   */
  @Get('nhan-vien/:nhanVienId/nhom')
  @VaiTro('ADMIN', 'HR', 'PAYROLL_OPERATOR')
  async layNhomCuaNhanVien(@Param('nhanVienId', ParseIntPipe) nhanVienId: number) {
    return this.nhomNhanVienService.layNhomCuaNhanVien(nhanVienId);
  }

  /**
   * Thêm nhân viên vào nhóm
   */
  @Post('nhan-vien/:nhanVienId/them-vao-nhom')
  @VaiTro('ADMIN', 'HR')
  async themVaoNhom(
    @Param('nhanVienId', ParseIntPipe) nhanVienId: number,
    @Body() dto: ThemVaoNhomDto,
  ) {
    return this.nhomNhanVienService.themVaoNhom(nhanVienId, dto);
  }

  /**
   * Gỡ nhân viên khỏi nhóm
   */
  @Post('nhan-vien/:nhanVienId/go-khoi-nhom')
  @VaiTro('ADMIN', 'HR')
  async goKhoiNhom(
    @Param('nhanVienId', ParseIntPipe) nhanVienId: number,
    @Body() dto: GoKhoiNhomDto,
  ) {
    return this.nhomNhanVienService.goKhoiNhom(nhanVienId, dto);
  }
}
