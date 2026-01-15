// Controller Phòng Ban - Xử lý HTTP requests (Hỗ trợ cây phân cấp)
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { PhongBanService } from './phong-ban.service';
import { 
  TaoPhongBanDto, 
  CapNhatPhongBanDto,
  DoiPhongBanChaDto,
  TaoDonViConDto,
  CapNhatDonViConDto,
  ChuyenPhongBanDto,
  TaoPhanQuyenPhongBanDto,
} from './dto/phong-ban.dto';
import { Quyen } from '../../common';

@ApiTags('phong-ban')
@Controller('phong-ban')
export class PhongBanController {
  constructor(private readonly phongBanService: PhongBanService) {}

  // ===== PHÒNG BAN CƠ BẢN =====

  @Quyen('PHONGBAN_XEM')
  @Get()
  @ApiOperation({ summary: 'Lấy danh sách tất cả phòng ban (phẳng)' })
  @ApiResponse({ status: 200, description: 'Thành công' })
  async layTatCa() {
    return this.phongBanService.layTatCa();
  }

  @Quyen('PHONGBAN_XEM')
  @Get('cay')
  @ApiOperation({ summary: 'Lấy cây phòng ban (hierarchical tree)' })
  @ApiResponse({ status: 200, description: 'Thành công' })
  async layCayPhongBan() {
    return this.phongBanService.layCayPhongBan();
  }

  @Quyen('PHONGBAN_XEM')
  @Get(':id')
  @ApiOperation({ summary: 'Lấy thông tin phòng ban theo ID' })
  @ApiResponse({ status: 200, description: 'Thành công' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy phòng ban' })
  async layTheoId(@Param('id', ParseIntPipe) id: number) {
    return this.phongBanService.layTheoId(id);
  }

  @Quyen('PHONGBAN_THEM')
  @Post()
  @ApiOperation({ summary: 'Tạo phòng ban mới' })
  @ApiResponse({ status: 201, description: 'Tạo thành công' })
  async taoMoi(@Body() dto: TaoPhongBanDto) {
    return this.phongBanService.taoMoi(dto);
  }

  @Quyen('PHONGBAN_SUA')
  @Put(':id')
  @ApiOperation({ summary: 'Cập nhật thông tin phòng ban' })
  @ApiResponse({ status: 200, description: 'Cập nhật thành công' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy phòng ban' })
  async capNhat(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CapNhatPhongBanDto,
  ) {
    return this.phongBanService.capNhat(id, dto);
  }

  @Quyen('PHONGBAN_SUA')
  @Put(':id/doi-phong-ban-cha')
  @ApiOperation({ summary: 'Đổi phòng ban cha (di chuyển trong cây)' })
  @ApiResponse({ status: 200, description: 'Thành công' })
  @ApiResponse({ status: 400, description: 'Không thể tạo vòng lặp' })
  async doiPhongBanCha(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: DoiPhongBanChaDto,
  ) {
    return this.phongBanService.doiPhongBanCha(id, dto);
  }

  @Quyen('PHONGBAN_SUA')
  @Post(':id/ngung-hoat-dong')
  @ApiOperation({ summary: 'Ngừng hoạt động phòng ban' })
  @ApiResponse({ status: 200, description: 'Thành công' })
  @ApiResponse({ status: 400, description: 'Không thể ngừng (còn nhân viên/phòng ban con)' })
  async ngungHoatDong(@Param('id', ParseIntPipe) id: number) {
    return this.phongBanService.ngungHoatDong(id);
  }

  @Quyen('PHONGBAN_SUA')
  @Post(':id/kich-hoat')
  @ApiOperation({ summary: 'Kích hoạt lại phòng ban' })
  @ApiResponse({ status: 200, description: 'Thành công' })
  async kichHoat(@Param('id', ParseIntPipe) id: number) {
    return this.phongBanService.kichHoat(id);
  }

  @Quyen('PHONGBAN_XOA')
  @Delete(':id')
  @ApiOperation({ summary: 'Xóa phòng ban (ngừng hoạt động)' })
  @ApiResponse({ status: 200, description: 'Xóa thành công' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy phòng ban' })
  async xoa(@Param('id', ParseIntPipe) id: number) {
    return this.phongBanService.xoa(id);
  }

  @Quyen('PHONGBAN_XEM')
  @Get(':id/nhan-vien')
  @ApiOperation({ summary: 'Lấy danh sách nhân viên theo phòng ban' })
  @ApiResponse({ status: 200, description: 'Thành công' })
  async layNhanVien(@Param('id', ParseIntPipe) id: number) {
    return this.phongBanService.layNhanVienTheoPhongBan(id);
  }

  // ===== ĐƠN VỊ CON (TỔ/CA/NHÓM) =====

  @Quyen('PHONGBAN_XEM')
  @Get(':id/don-vi-con')
  @ApiOperation({ summary: 'Lấy danh sách đơn vị con (tổ/ca) của phòng ban' })
  @ApiResponse({ status: 200, description: 'Thành công' })
  async layDonViCon(@Param('id', ParseIntPipe) id: number) {
    return this.phongBanService.layDonViCon(id);
  }

  @Quyen('PHONGBAN_THEM')
  @Post(':id/don-vi-con')
  @ApiOperation({ summary: 'Tạo đơn vị con mới cho phòng ban' })
  @ApiResponse({ status: 201, description: 'Tạo thành công' })
  async taoDonViCon(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: TaoDonViConDto,
  ) {
    return this.phongBanService.taoDonViCon(id, dto);
  }
}

// Controller riêng cho Đơn vị con
@ApiTags('don-vi-con')
@Controller('don-vi-con')
export class DonViConController {
  constructor(private readonly phongBanService: PhongBanService) {}

  @Quyen('PHONGBAN_SUA')
  @Put(':id')
  @ApiOperation({ summary: 'Cập nhật đơn vị con' })
  @ApiResponse({ status: 200, description: 'Thành công' })
  async capNhat(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CapNhatDonViConDto,
  ) {
    return this.phongBanService.capNhatDonViCon(id, dto);
  }

  @Quyen('PHONGBAN_SUA')
  @Post(':id/ngung-hoat-dong')
  @ApiOperation({ summary: 'Ngừng hoạt động đơn vị con' })
  @ApiResponse({ status: 200, description: 'Thành công' })
  async ngungHoatDong(@Param('id', ParseIntPipe) id: number) {
    return this.phongBanService.ngungDonViCon(id);
  }
}

// Controller cho lịch sử phòng ban nhân viên
@ApiTags('nhan-vien')
@Controller('nhan-vien')
export class NhanVienPhongBanController {
  constructor(private readonly phongBanService: PhongBanService) {}

  @Quyen('NHANVIEN_XEM')
  @Get(':id/lich-su-phong-ban')
  @ApiOperation({ summary: 'Lấy lịch sử phòng ban của nhân viên' })
  @ApiResponse({ status: 200, description: 'Thành công' })
  async layLichSuPhongBan(@Param('id', ParseIntPipe) id: number) {
    return this.phongBanService.layLichSuPhongBan(id);
  }

  @Quyen('NHANVIEN_SUA')
  @Post(':id/chuyen-phong-ban')
  @ApiOperation({ summary: 'Chuyển nhân viên sang phòng ban/tổ/ca khác' })
  @ApiResponse({ status: 201, description: 'Thành công' })
  @ApiResponse({ status: 400, description: 'Đơn vị con không thuộc phòng ban' })
  async chuyenPhongBan(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: ChuyenPhongBanDto,
  ) {
    return this.phongBanService.chuyenPhongBan(id, dto);
  }
}

// Controller cho phân quyền phòng ban
@ApiTags('phan-quyen-phong-ban')
@Controller('phan-quyen-phong-ban')
export class PhanQuyenPhongBanController {
  constructor(private readonly phongBanService: PhongBanService) {}

  @Quyen('ADMIN')
  @Get()
  @ApiOperation({ summary: 'Lấy phân quyền theo người dùng hoặc phòng ban' })
  @ApiQuery({ name: 'nguoiDungId', required: false })
  @ApiQuery({ name: 'phongBanId', required: false })
  @ApiResponse({ status: 200, description: 'Thành công' })
  async layPhanQuyen(
    @Query('nguoiDungId') nguoiDungId?: string,
    @Query('phongBanId') phongBanId?: string,
  ) {
    if (nguoiDungId) {
      return this.phongBanService.layPhanQuyenNguoiDung(parseInt(nguoiDungId));
    }
    if (phongBanId) {
      return this.phongBanService.layPhanQuyenPhongBan(parseInt(phongBanId));
    }
    return [];
  }

  @Quyen('ADMIN')
  @Post()
  @ApiOperation({ summary: 'Tạo phân quyền phòng ban cho người dùng' })
  @ApiResponse({ status: 201, description: 'Thành công' })
  async taoPhanQuyen(@Body() dto: TaoPhanQuyenPhongBanDto) {
    return this.phongBanService.taoPhanQuyen(dto);
  }

  @Quyen('ADMIN')
  @Delete(':id')
  @ApiOperation({ summary: 'Xóa phân quyền' })
  @ApiResponse({ status: 200, description: 'Thành công' })
  async xoaPhanQuyen(@Param('id', ParseIntPipe) id: number) {
    return this.phongBanService.xoaPhanQuyen(id);
  }
}
