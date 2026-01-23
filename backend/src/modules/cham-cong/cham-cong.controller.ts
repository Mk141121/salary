// Controller Chấm công
import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { ChamCongService } from './cham-cong.service';
import {
  LuuChamCongDto,
  LuuChiTietChamCongDto,
  KhoiTaoChamCongDto,
  ImportChamCongDto,
  CapNhatCauHinhPhatDto,
} from './dto/cham-cong.dto';
import { Quyen } from '../../common';

@ApiTags('Chấm công')
@Controller('cham-cong')
@Quyen('CHAMCONG_XEM') // Mặc định cần quyền xem chấm công để truy cập
export class ChamCongController {
  constructor(private readonly chamCongService: ChamCongService) {}

  // ============================================
  // NGÀY CÔNG LÝ THUYẾT
  // ============================================

  @Get('ngay-cong-ly-thuyet')
  @ApiOperation({ summary: 'Lấy thông tin ngày công lý thuyết trong tháng' })
  @ApiQuery({ name: 'thang', required: true })
  @ApiQuery({ name: 'nam', required: true })
  @ApiQuery({ name: 'phongBanId', required: false })
  async layNgayCongLyThuyet(
    @Query('thang', ParseIntPipe) thang: number,
    @Query('nam', ParseIntPipe) nam: number,
    @Query('phongBanId') phongBanId?: string,
  ) {
    const pbId = phongBanId ? Number(phongBanId) : undefined;
    return this.chamCongService.layThongTinNgayCongLyThuyet(thang, nam, pbId);
  }

  // ============================================
  // CẤU HÌNH PHẠT CHẤM CÔNG
  // ============================================

  @Get('cau-hinh-phat/:nam')
  @ApiOperation({ summary: 'Lấy cấu hình phạt theo năm' })
  async layCauHinhPhat(@Param('nam', ParseIntPipe) nam: number) {
    return this.chamCongService.layCauHinhPhat(nam);
  }

  @Put('cau-hinh-phat/:nam')
  @ApiOperation({ summary: 'Cập nhật cấu hình phạt' })
  async capNhatCauHinhPhat(
    @Param('nam', ParseIntPipe) nam: number,
    @Body() dto: CapNhatCauHinhPhatDto,
  ) {
    return this.chamCongService.capNhatCauHinhPhat(nam, dto);
  }

  @Get('tinh-phat/:nhanVienId')
  @ApiOperation({ summary: 'Tính tiền phạt cho nhân viên trong tháng' })
  @ApiQuery({ name: 'thang', required: true })
  @ApiQuery({ name: 'nam', required: true })
  async tinhTienPhat(
    @Param('nhanVienId', ParseIntPipe) nhanVienId: number,
    @Query('thang', ParseIntPipe) thang: number,
    @Query('nam', ParseIntPipe) nam: number,
  ) {
    return this.chamCongService.tinhTienPhat(nhanVienId, thang, nam);
  }

  // ============================================
  // CHẤM CÔNG THÁNG
  // ============================================

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách chấm công theo tháng' })
  @ApiQuery({ name: 'thang', required: true })
  @ApiQuery({ name: 'nam', required: true })
  @ApiQuery({ name: 'phongBanId', required: false })
  async layDanhSachChamCong(
    @Query('thang', ParseIntPipe) thang: number,
    @Query('nam', ParseIntPipe) nam: number,
    @Query('phongBanId') phongBanId?: string,
  ) {
    return this.chamCongService.layDanhSachChamCong(
      thang,
      nam,
      phongBanId ? parseInt(phongBanId, 10) : undefined,
    );
  }

  @Get('nhan-vien/:nhanVienId')
  @ApiOperation({ summary: 'Lấy chấm công của nhân viên' })
  @ApiQuery({ name: 'thang', required: true })
  @ApiQuery({ name: 'nam', required: true })
  async layChamCongNhanVien(
    @Param('nhanVienId', ParseIntPipe) nhanVienId: number,
    @Query('thang', ParseIntPipe) thang: number,
    @Query('nam', ParseIntPipe) nam: number,
  ) {
    return this.chamCongService.layChamCongNhanVien(nhanVienId, thang, nam);
  }

  @Post()
  @ApiOperation({ summary: 'Lưu chấm công' })
  async luuChamCong(@Body() dto: LuuChamCongDto) {
    return this.chamCongService.luuChamCong(dto);
  }

  @Post('khoi-tao')
  @ApiOperation({ summary: 'Khởi tạo chấm công cho tất cả nhân viên' })
  async khoiTaoChamCongThang(@Body() dto: KhoiTaoChamCongDto) {
    return this.chamCongService.khoiTaoChamCongThang(
      dto.thang,
      dto.nam,
      dto.soCongChuan,
    );
  }

  // ============================================
  // CHI TIẾT CHẤM CÔNG
  // ============================================

  @Get('chi-tiet/:nhanVienId')
  @ApiOperation({ summary: 'Lấy chi tiết chấm công theo ngày' })
  @ApiQuery({ name: 'thang', required: true })
  @ApiQuery({ name: 'nam', required: true })
  async layChiTietChamCong(
    @Param('nhanVienId', ParseIntPipe) nhanVienId: number,
    @Query('thang', ParseIntPipe) thang: number,
    @Query('nam', ParseIntPipe) nam: number,
  ) {
    return this.chamCongService.layChiTietChamCong(nhanVienId, thang, nam);
  }

  @Post('chi-tiet')
  @ApiOperation({ summary: 'Lưu chi tiết chấm công' })
  async luuChiTietChamCong(@Body() dto: LuuChiTietChamCongDto) {
    return this.chamCongService.luuChiTietChamCong(dto);
  }

  @Post('tong-hop/:nhanVienId')
  @ApiOperation({ summary: 'Tổng hợp chi tiết thành chấm công tháng' })
  @ApiQuery({ name: 'thang', required: true })
  @ApiQuery({ name: 'nam', required: true })
  async tongHopChamCong(
    @Param('nhanVienId', ParseIntPipe) nhanVienId: number,
    @Query('thang', ParseIntPipe) thang: number,
    @Query('nam', ParseIntPipe) nam: number,
  ) {
    return this.chamCongService.tongHopChamCong(nhanVienId, thang, nam);
  }

  // ============================================
  // IMPORT
  // ============================================

  @Post('import')
  @ApiOperation({ summary: 'Import chấm công từ dữ liệu' })
  async importChamCong(@Body() dto: ImportChamCongDto) {
    return this.chamCongService.importChamCong(dto.thang, dto.nam, dto.duLieu);
  }

  @Post('dong-bo-csv')
  @ApiOperation({ summary: 'Đồng bộ chấm công từ file CSV máy chấm công' })
  async dongBoChamCongCSV(@Body() dto: { csvContent: string }) {
    return this.chamCongService.dongBoChamCongCSV(dto.csvContent);
  }
}
