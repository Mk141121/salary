// Controller Bảng Lương - Xử lý HTTP requests
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
import { BangLuongService } from './bang-luong.service';
import { TinhLuongService } from './tinh-luong.service';
import { PhieuLuongService } from './phieu-luong.service';
import { NgayCongService } from './ngay-cong.service';
import {
  TaoBangLuongDto,
  CapNhatBangLuongDto,
  CapNhatChiTietLuongDto,
  ChotBangLuongDto,
  CapNhatNhieuChiTietDto,
} from './dto/bang-luong.dto';

@ApiTags('bang-luong')
@Controller('bang-luong')
export class BangLuongController {
  constructor(
    private readonly bangLuongService: BangLuongService,
    private readonly tinhLuongService: TinhLuongService,
    private readonly phieuLuongService: PhieuLuongService,
    private readonly ngayCongService: NgayCongService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách bảng lương' })
  @ApiQuery({ name: 'thang', required: false, type: Number })
  @ApiQuery({ name: 'nam', required: false, type: Number })
  @ApiQuery({ name: 'phongBanId', required: false, type: Number })
  @ApiResponse({ status: 200, description: 'Thành công' })
  async layDanhSach(
    @Query('thang') thang?: number,
    @Query('nam') nam?: number,
    @Query('phongBanId') phongBanId?: number,
  ) {
    return this.bangLuongService.layDanhSach(thang, nam, phongBanId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy chi tiết bảng lương theo ID' })
  @ApiResponse({ status: 200, description: 'Thành công' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy bảng lương' })
  async layTheoId(@Param('id', ParseIntPipe) id: number) {
    return this.bangLuongService.layTheoId(id);
  }

  @Get(':id/tong')
  @ApiOperation({ summary: 'Lấy tổng lương của bảng lương' })
  @ApiResponse({ status: 200, description: 'Thành công' })
  async layTongLuong(@Param('id', ParseIntPipe) id: number) {
    return this.tinhLuongService.tinhTongBangLuong(id);
  }

  @Get(':id/nhan-vien/:nhanVienId/tong')
  @ApiOperation({ summary: 'Lấy tổng lương của nhân viên trong bảng lương' })
  @ApiResponse({ status: 200, description: 'Thành công' })
  async layTongLuongNhanVien(
    @Param('id', ParseIntPipe) id: number,
    @Param('nhanVienId', ParseIntPipe) nhanVienId: number,
  ) {
    return this.tinhLuongService.tinhTongLuongNhanVien(id, nhanVienId);
  }

  @Get(':id/lich-su')
  @ApiOperation({ summary: 'Lấy lịch sử chỉnh sửa bảng lương' })
  @ApiResponse({ status: 200, description: 'Thành công' })
  async layLichSu(@Param('id', ParseIntPipe) id: number) {
    return this.bangLuongService.layLichSuChinhSua(id);
  }

  @Post()
  @ApiOperation({ summary: 'Tạo bảng lương mới' })
  @ApiResponse({ status: 201, description: 'Tạo thành công' })
  @ApiResponse({ status: 409, description: 'Bảng lương đã tồn tại' })
  async taoMoi(@Body() dto: TaoBangLuongDto) {
    return this.bangLuongService.taoMoi(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Cập nhật thông tin bảng lương' })
  @ApiResponse({ status: 200, description: 'Cập nhật thành công' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy bảng lương' })
  @ApiResponse({ status: 400, description: 'Bảng lương đã chốt' })
  async capNhat(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CapNhatBangLuongDto,
  ) {
    return this.bangLuongService.capNhat(id, dto);
  }

  @Put('chi-tiet/cap-nhat')
  @ApiOperation({ summary: 'Cập nhật một ô chi tiết lương' })
  @ApiResponse({ status: 200, description: 'Cập nhật thành công' })
  async capNhatChiTiet(@Body() dto: CapNhatChiTietLuongDto) {
    return this.bangLuongService.capNhatChiTiet(dto);
  }

  @Put('chi-tiet/cap-nhat-nhieu')
  @ApiOperation({ summary: 'Cập nhật nhiều ô chi tiết lương cùng lúc' })
  @ApiResponse({ status: 200, description: 'Cập nhật thành công' })
  async capNhatNhieuChiTiet(@Body() dto: CapNhatNhieuChiTietDto) {
    return this.bangLuongService.capNhatNhieuChiTiet(dto.danhSach);
  }

  @Post(':id/chot')
  @ApiOperation({ summary: 'Chốt bảng lương' })
  @ApiResponse({ status: 200, description: 'Chốt thành công' })
  @ApiResponse({ status: 400, description: 'Bảng lương đã chốt' })
  async chotBangLuong(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: ChotBangLuongDto,
  ) {
    return this.bangLuongService.chotBangLuong(id, dto);
  }

  @Post(':id/mo-khoa')
  @ApiOperation({ summary: 'Mở khóa bảng lương đã chốt' })
  @ApiResponse({ status: 200, description: 'Mở khóa thành công' })
  async moKhoa(@Param('id', ParseIntPipe) id: number) {
    return this.bangLuongService.moKhoaBangLuong(id);
  }

  @Post(':id/khoa')
  @ApiOperation({ summary: 'Khóa vĩnh viễn bảng lương' })
  @ApiResponse({ status: 200, description: 'Khóa thành công' })
  async khoa(@Param('id', ParseIntPipe) id: number) {
    return this.bangLuongService.khoaBangLuong(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Xóa bảng lương' })
  @ApiResponse({ status: 200, description: 'Xóa thành công' })
  @ApiResponse({ status: 400, description: 'Không thể xóa bảng lương đã chốt' })
  async xoa(@Param('id', ParseIntPipe) id: number) {
    return this.bangLuongService.xoa(id);
  }

  @Post(':id/so-sanh-excel')
  @ApiOperation({ summary: 'So sánh tổng lương với Excel' })
  @ApiResponse({ status: 200, description: 'Thành công' })
  async soSanhExcel(
    @Param('id', ParseIntPipe) id: number,
    @Body('tongExcel') tongExcel: number,
  ) {
    return this.tinhLuongService.soSanhVoiExcel(id, tongExcel);
  }

  // ============ PHIẾU LƯƠNG ============

  @Get(':id/phieu-luong/:nhanVienId')
  @ApiOperation({ summary: 'Lấy dữ liệu phiếu lương của nhân viên' })
  @ApiResponse({ status: 200, description: 'Thành công' })
  async layPhieuLuong(
    @Param('id', ParseIntPipe) id: number,
    @Param('nhanVienId', ParseIntPipe) nhanVienId: number,
  ) {
    return this.phieuLuongService.layPhieuLuong(id, nhanVienId);
  }

  @Get(':id/phieu-luong/:nhanVienId/html')
  @ApiOperation({ summary: 'Lấy HTML phiếu lương (để render hoặc xuất ảnh)' })
  @ApiResponse({ status: 200, description: 'Thành công' })
  async layPhieuLuongHtml(
    @Param('id', ParseIntPipe) id: number,
    @Param('nhanVienId', ParseIntPipe) nhanVienId: number,
  ) {
    return this.phieuLuongService.layPhieuLuongHtml(id, nhanVienId);
  }

  @Post(':id/gui-phieu-luong/:nhanVienId')
  @ApiOperation({ summary: 'Gửi phiếu lương qua email cho 1 nhân viên' })
  @ApiResponse({ status: 200, description: 'Gửi thành công' })
  async guiPhieuLuong(
    @Param('id', ParseIntPipe) id: number,
    @Param('nhanVienId', ParseIntPipe) nhanVienId: number,
  ) {
    return this.phieuLuongService.guiPhieuLuong(id, nhanVienId);
  }

  @Post(':id/gui-tat-ca')
  @ApiOperation({ summary: 'Gửi phiếu lương cho tất cả nhân viên trong bảng lương' })
  @ApiResponse({ status: 200, description: 'Gửi thành công' })
  async guiTatCa(@Param('id', ParseIntPipe) id: number) {
    return this.phieuLuongService.guiTatCaPhieuLuong(id);
  }

  // ==================== API NGÀY CÔNG ====================

  @Get(':id/ngay-cong')
  @ApiOperation({ summary: 'Lấy tất cả ngày công của bảng lương' })
  @ApiResponse({ status: 200, description: 'Thành công' })
  async layTatCaNgayCong(@Param('id', ParseIntPipe) id: number) {
    return this.ngayCongService.layTatCaNgayCong(id);
  }

  @Get(':id/ngay-cong/:nhanVienId')
  @ApiOperation({ summary: 'Lấy ngày công của nhân viên trong bảng lương' })
  @ApiResponse({ status: 200, description: 'Thành công' })
  async layNgayCongNhanVien(
    @Param('id', ParseIntPipe) id: number,
    @Param('nhanVienId', ParseIntPipe) nhanVienId: number,
  ) {
    return this.ngayCongService.layNgayCongTheoNhanVien(id, nhanVienId);
  }

  @Post(':id/ngay-cong/khoi-tao')
  @ApiOperation({ summary: 'Khởi tạo ngày công từ dữ liệu chấm công' })
  @ApiResponse({ status: 200, description: 'Khởi tạo thành công' })
  async khoiTaoNgayCong(@Param('id', ParseIntPipe) id: number) {
    return this.ngayCongService.khoiTaoNgayCongTuChamCong(id);
  }

  @Post(':id/tinh-lai-luong')
  @ApiOperation({ summary: 'Tính lại tất cả khoản lương theo ngày công hiện tại' })
  @ApiResponse({ status: 200, description: 'Tính lại thành công' })
  async tinhLaiLuong(@Param('id', ParseIntPipe) id: number) {
    return this.bangLuongService.tinhLaiTatCaKhoanLuong(id);
  }

  @Put(':id/ngay-cong/:nhanVienId/dieu-chinh')
  @ApiOperation({ summary: 'Điều chỉnh ngày công thủ công' })
  @ApiResponse({ status: 200, description: 'Cập nhật thành công' })
  async dieuChinhNgayCong(
    @Param('id', ParseIntPipe) id: number,
    @Param('nhanVienId', ParseIntPipe) nhanVienId: number,
    @Body() body: { ngayCongMoi: number; ghiChu?: string },
  ) {
    return this.ngayCongService.capNhatNgayCongDieuChinh(
      id,
      nhanVienId,
      body.ngayCongMoi,
      body.ghiChu,
    );
  }

  @Delete(':id/ngay-cong/:nhanVienId/dieu-chinh')
  @ApiOperation({ summary: 'Xóa điều chỉnh ngày công (trở về tính tự động)' })
  @ApiResponse({ status: 200, description: 'Xóa thành công' })
  async xoaDieuChinhNgayCong(
    @Param('id', ParseIntPipe) id: number,
    @Param('nhanVienId', ParseIntPipe) nhanVienId: number,
  ) {
    return this.ngayCongService.xoaDieuChinh(id, nhanVienId);
  }
}
