// Controller Nhân Viên - Xử lý HTTP requests
import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  ParseIntPipe,
  UseInterceptors,
  UploadedFile,
  Res,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { 
  ApiTags, 
  ApiOperation, 
  ApiResponse, 
  ApiQuery,
  ApiConsumes,
  ApiBody,
} from '@nestjs/swagger';
import { Response } from 'express';
import { TrangThaiNhanVien } from '@prisma/client';
import { NhanVienService } from './nhan-vien.service';
import { ImportExportNhanVienService } from './import-export-nhan-vien.service';
import { TaoNhanVienDto, CapNhatNhanVienDto, TimKiemNhanVienDto } from './dto/nhan-vien.dto';
import { 
  CapNhatTrangThaiNhanVienDto, 
  CapNhatHangLoatTrangThaiDto,
  CotNhanVienExcel,
} from './dto/import-export-nhan-vien.dto';
import { Quyen, ExcelFileValidationPipe } from '../../common';

@ApiTags('nhan-vien')
@Controller('nhan-vien')
export class NhanVienController {
  constructor(
    private readonly nhanVienService: NhanVienService,
    private readonly importExportService: ImportExportNhanVienService,
  ) {}

  @Quyen('NHANVIEN_XEM')
  @Get('ma-tu-dong')
  @ApiOperation({ summary: 'Lấy mã nhân viên tự động tiếp theo' })
  @ApiResponse({ status: 200, description: 'Thành công' })
  async layMaTuDong() {
    const maNhanVien = await this.nhanVienService.taoMaNhanVienTuDong();
    return { maNhanVien };
  }

  @Quyen('NHANVIEN_XEM')
  @Get()
  @ApiOperation({ summary: 'Lấy danh sách nhân viên' })
  @ApiQuery({ name: 'phongBanId', required: false, type: Number })
  @ApiQuery({ name: 'tuKhoa', required: false, type: String })
  @ApiResponse({ status: 200, description: 'Thành công' })
  async layTatCa(@Query() query: TimKiemNhanVienDto) {
    return this.nhanVienService.layTatCa(query);
  }

  @Quyen('NHANVIEN_XEM')
  @Get(':id')
  @ApiOperation({ summary: 'Lấy thông tin nhân viên theo ID' })
  @ApiResponse({ status: 200, description: 'Thành công' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy nhân viên' })
  async layTheoId(@Param('id', ParseIntPipe) id: number) {
    return this.nhanVienService.layTheoId(id);
  }

  @Quyen('NHANVIEN_XEM')
  @Get('ma/:maNhanVien')
  @ApiOperation({ summary: 'Lấy thông tin nhân viên theo mã' })
  @ApiResponse({ status: 200, description: 'Thành công' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy nhân viên' })
  async layTheoMa(@Param('maNhanVien') maNhanVien: string) {
    return this.nhanVienService.layTheoMa(maNhanVien);
  }

  @Quyen('NHANVIEN_THEM')
  @Post()
  @ApiOperation({ summary: 'Tạo nhân viên mới' })
  @ApiResponse({ status: 201, description: 'Tạo thành công' })
  async taoMoi(@Body() dto: TaoNhanVienDto) {
    return this.nhanVienService.taoMoi(dto);
  }

  @Quyen('NHANVIEN_SUA')
  @Put(':id')
  @ApiOperation({ summary: 'Cập nhật thông tin nhân viên' })
  @ApiResponse({ status: 200, description: 'Cập nhật thành công' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy nhân viên' })
  async capNhat(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CapNhatNhanVienDto,
  ) {
    return this.nhanVienService.capNhat(id, dto);
  }

  @Quyen('NHANVIEN_XOA')
  @Delete(':id')
  @ApiOperation({ summary: 'Xóa nhân viên (chuyển trạng thái nghỉ việc)' })
  @ApiResponse({ status: 200, description: 'Xóa thành công' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy nhân viên' })
  async xoa(@Param('id', ParseIntPipe) id: number) {
    return this.nhanVienService.xoa(id);
  }

  @Quyen('NHANVIEN_XEM')
  @Get('thong-ke/theo-phong-ban')
  @ApiOperation({ summary: 'Thống kê số nhân viên theo phòng ban' })
  async thongKeTheoPhongBan() {
    return this.nhanVienService.demTheoPhongBan();
  }

  // ============ IMPORT/EXPORT EXCEL ============

  @Quyen('NHANVIEN_XEM')
  @Get('import-export/danh-sach-truong')
  @ApiOperation({ summary: 'Lấy danh sách trường hệ thống hỗ trợ import/export' })
  @ApiResponse({ status: 200, description: 'Thành công' })
  async layDanhSachTruong() {
    return this.importExportService.layDanhSachTruong();
  }

  @Quyen('NHANVIEN_THEM')
  @Post('import-export/doc-header')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Đọc header từ file Excel để mapping' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: { type: 'string', format: 'binary' },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Đọc header thành công' })
  async docHeaderExcel(
    @UploadedFile(new ExcelFileValidationPipe()) file: Express.Multer.File,
  ) {
    return this.importExportService.docHeaderExcel(file.buffer);
  }

  @Quyen('NHANVIEN_THEM')
  @Post('import-export/goi-y-mapping')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Gợi ý mapping tự động từ tên cột Excel' })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({ status: 200, description: 'Gợi ý mapping thành công' })
  async goiYMapping(
    @UploadedFile(new ExcelFileValidationPipe()) file: Express.Multer.File,
  ) {
    const { headers } = await this.importExportService.docHeaderExcel(file.buffer);
    return this.importExportService.goiYMapping(headers);
  }

  @Quyen('NHANVIEN_THEM')
  @Post('import-export/import')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Import nhân viên từ Excel' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: { type: 'string', format: 'binary' },
        mappings: { type: 'string', description: 'JSON string của CotNhanVienExcel[]' },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Import thành công' })
  async importNhanVien(
    @UploadedFile(new ExcelFileValidationPipe()) file: Express.Multer.File,
    @Body('mappings') mappingsJson: string,
  ) {
    if (!mappingsJson) {
      throw new BadRequestException('Thiếu thông tin mappings');
    }

    let mappings: CotNhanVienExcel[];
    try {
      mappings = JSON.parse(mappingsJson);
    } catch {
      throw new BadRequestException('Mappings không đúng định dạng JSON');
    }

    return this.importExportService.importNhanVien(file.buffer, mappings);
  }

  @Quyen('NHANVIEN_XEM')
  @Get('import-export/export')
  @ApiOperation({ summary: 'Export danh sách nhân viên ra Excel' })
  @ApiQuery({ name: 'phongBanId', required: false, type: Number })
  @ApiQuery({ name: 'trangThai', required: false, enum: ['DANG_LAM', 'TAM_NGHI', 'NGHI_VIEC'] })
  @ApiResponse({ status: 200, description: 'Export thành công' })
  async exportNhanVien(
    @Query('phongBanId') phongBanId?: string,
    @Query('trangThai') trangThai?: string,
    @Res() res?: Response,
  ) {
    const buffer = await this.importExportService.exportNhanVien(
      phongBanId ? parseInt(phongBanId, 10) : undefined,
      trangThai as TrangThaiNhanVien | undefined,
    );

    res!.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    res!.setHeader(
      'Content-Disposition',
      'attachment; filename=danh-sach-nhan-vien.xlsx',
    );
    res!.send(buffer);
  }

  @Quyen('NHANVIEN_XEM')
  @Get('import-export/template')
  @ApiOperation({ summary: 'Tải template Excel để import nhân viên' })
  @ApiResponse({ status: 200, description: 'Download thành công' })
  async downloadTemplate(@Res() res: Response) {
    const buffer = await this.importExportService.downloadTemplate();

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    res.setHeader(
      'Content-Disposition',
      'attachment; filename=template-import-nhan-vien.xlsx',
    );
    res.send(buffer);
  }

  // ============ ACTIVE/DEACTIVE ============

  @Quyen('NHANVIEN_SUA')
  @Patch(':id/trang-thai')
  @ApiOperation({ summary: 'Cập nhật trạng thái nhân viên (Active/Deactive)' })
  @ApiResponse({ status: 200, description: 'Cập nhật thành công' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy nhân viên' })
  async capNhatTrangThai(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CapNhatTrangThaiNhanVienDto,
  ) {
    return this.importExportService.capNhatTrangThai(id, dto);
  }

  @Quyen('NHANVIEN_SUA')
  @Post('cap-nhat-hang-loat-trang-thai')
  @ApiOperation({ summary: 'Cập nhật hàng loạt trạng thái nhiều nhân viên' })
  @ApiResponse({ status: 200, description: 'Cập nhật thành công' })
  async capNhatHangLoatTrangThai(@Body() dto: CapNhatHangLoatTrangThaiDto) {
    return this.importExportService.capNhatHangLoatTrangThai(
      dto.nhanVienIds,
      dto.trangThai,
      dto.lyDo,
    );
  }
}
