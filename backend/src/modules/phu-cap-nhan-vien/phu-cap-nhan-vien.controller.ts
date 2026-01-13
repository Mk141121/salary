// Controller quản lý Phụ cấp Nhân viên
import {
  Controller,
  Get,
  Post,
  Put,
  Param,
  Body,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { PhuCapNhanVienService } from './phu-cap-nhan-vien.service';
import {
  TaoPhuCapDto,
  KetThucPhuCapDto,
  TangPhuCapDto,
} from './phu-cap-nhan-vien.dto';

@ApiTags('Phụ cấp nhân viên')
@Controller('phu-cap-nhan-vien')
export class PhuCapNhanVienController {
  constructor(private readonly phuCapService: PhuCapNhanVienService) {}

  @Get('nhan-vien/:nhanVienId')
  @ApiOperation({ summary: 'Lấy tất cả phụ cấp của nhân viên' })
  async layTheoNhanVien(
    @Param('nhanVienId', ParseIntPipe) nhanVienId: number,
  ) {
    return this.phuCapService.layTheoNhanVien(nhanVienId);
  }

  @Get('nhan-vien/:nhanVienId/hieu-luc')
  @ApiOperation({ summary: 'Lấy phụ cấp đang hiệu lực của nhân viên' })
  async layPhuCapHieuLuc(
    @Param('nhanVienId', ParseIntPipe) nhanVienId: number,
  ) {
    return this.phuCapService.layPhuCapHieuLuc(nhanVienId);
  }

  @Get('nhan-vien/:nhanVienId/theo-thang')
  @ApiOperation({ summary: 'Lấy phụ cấp hợp lệ cho 1 tháng lương' })
  @ApiQuery({ name: 'thang', type: Number })
  @ApiQuery({ name: 'nam', type: Number })
  async layPhuCapTheoThang(
    @Param('nhanVienId', ParseIntPipe) nhanVienId: number,
    @Query('thang', ParseIntPipe) thang: number,
    @Query('nam', ParseIntPipe) nam: number,
  ) {
    return this.phuCapService.layPhuCapTheoThang(nhanVienId, thang, nam);
  }

  @Get('nhan-vien/:nhanVienId/lich-su')
  @ApiOperation({ summary: 'Lấy lịch sử thay đổi phụ cấp' })
  @ApiQuery({ name: 'khoanLuongId', required: false, type: Number })
  async layLichSuPhuCap(
    @Param('nhanVienId', ParseIntPipe) nhanVienId: number,
    @Query('khoanLuongId') khoanLuongId?: string,
  ) {
    return this.phuCapService.layLichSuPhuCap(
      nhanVienId,
      khoanLuongId ? parseInt(khoanLuongId) : undefined,
    );
  }

  @Post()
  @ApiOperation({ summary: 'Thêm phụ cấp mới cho nhân viên' })
  async taoPhuCap(@Body() dto: TaoPhuCapDto) {
    return this.phuCapService.taoPhuCap({
      nhanVienId: dto.nhanVienId,
      khoanLuongId: dto.khoanLuongId,
      soTien: dto.soTien,
      tuNgay: new Date(dto.tuNgay),
      denNgay: dto.denNgay ? new Date(dto.denNgay) : undefined,
      ghiChu: dto.ghiChu,
      nguoiTao: dto.nguoiTao,
    });
  }

  @Put(':id/ket-thuc')
  @ApiOperation({ summary: 'Kết thúc phụ cấp' })
  async ketThucPhuCap(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: KetThucPhuCapDto,
  ) {
    return this.phuCapService.ketThucPhuCap(
      id,
      new Date(dto.denNgay),
      dto.nguoiCapNhat,
    );
  }

  @Post(':id/tang')
  @ApiOperation({ summary: 'Tăng/Điều chỉnh phụ cấp (tạo bản ghi mới)' })
  async tangPhuCap(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: TangPhuCapDto,
  ) {
    return this.phuCapService.tangPhuCap(id, {
      soTienMoi: dto.soTienMoi,
      tuNgay: new Date(dto.tuNgay),
      ghiChu: dto.ghiChu,
      nguoiTao: dto.nguoiTao,
    });
  }

  @Put(':id/tam-dung')
  @ApiOperation({ summary: 'Tạm dừng phụ cấp' })
  async tamDungPhuCap(@Param('id', ParseIntPipe) id: number) {
    return this.phuCapService.tamDungPhuCap(id);
  }

  @Put(':id/kich-hoat')
  @ApiOperation({ summary: 'Kích hoạt lại phụ cấp đang tạm dừng' })
  async kichHoatLai(@Param('id', ParseIntPipe) id: number) {
    return this.phuCapService.kichHoatLai(id);
  }

  @Get('thong-ke/phong-ban/:phongBanId')
  @ApiOperation({ summary: 'Thống kê tổng phụ cấp theo phòng ban' })
  async thongKeTheoPhongBan(
    @Param('phongBanId', ParseIntPipe) phongBanId: number,
  ) {
    return this.phuCapService.thongKeTheoPhongBan(phongBanId);
  }
}
