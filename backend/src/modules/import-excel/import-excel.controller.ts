// Controller Import Excel - Xử lý upload và import từ Excel
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
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
  ApiConsumes,
  ApiBody,
} from '@nestjs/swagger';
import { Response } from 'express';
import { ImportExcelService, CotExcel } from './import-excel.service';
import { VaiTro, ExcelFileValidationPipe } from '../../common';

@ApiTags('import-excel')
@Controller('import-excel')
@VaiTro('ADMIN', 'KETOAN') // Chỉ admin và kế toán mới được import
export class ImportExcelController {
  constructor(private readonly importExcelService: ImportExcelService) {}

  @Post('doc-header')
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
  async docHeader(
    @UploadedFile(new ExcelFileValidationPipe()) file: Express.Multer.File,
  ) {
    return this.importExcelService.docHeaderExcel(file.buffer);
  }

  @Post('goi-y-mapping')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Gợi ý mapping tự động từ tên cột' })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({ status: 200, description: 'Gợi ý mapping thành công' })
  async goiYMapping(
    @UploadedFile(new ExcelFileValidationPipe()) file: Express.Multer.File,
  ) {
    const { headers } = await this.importExcelService.docHeaderExcel(file.buffer);
    return this.importExcelService.goiYMapping(headers);
  }

  @Get('mapping')
  @ApiOperation({ summary: 'Lấy danh sách mapping đã lưu' })
  @ApiResponse({ status: 200, description: 'Thành công' })
  async layDanhSachMapping() {
    return this.importExcelService.layDanhSachMapping();
  }

  @Post('import')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Import dữ liệu từ Excel vào bảng lương' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: { type: 'string', format: 'binary' },
        thang: { type: 'number' },
        nam: { type: 'number' },
        phongBanId: { type: 'number' },
        mappings: { type: 'string', description: 'JSON string của CotExcel[]' },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Import thành công' })
  async importExcel(
    @UploadedFile(new ExcelFileValidationPipe()) file: Express.Multer.File,
    @Body('thang') thang: string,
    @Body('nam') nam: string,
    @Body('phongBanId') phongBanId: string,
    @Body('mappings') mappingsJson: string,
  ) {
    if (!thang || !nam || !phongBanId || !mappingsJson) {
      throw new BadRequestException('Thiếu thông tin: thang, nam, phongBanId, mappings');
    }

    let mappings: CotExcel[];
    try {
      mappings = JSON.parse(mappingsJson);
    } catch {
      throw new BadRequestException('Mappings không đúng định dạng JSON');
    }

    return this.importExcelService.importExcel(
      file.buffer,
      parseInt(thang, 10),
      parseInt(nam, 10),
      parseInt(phongBanId, 10),
      mappings,
    );
  }

  @Get('export/:bangLuongId')
  @ApiOperation({ summary: 'Export bảng lương ra file Excel' })
  @ApiResponse({ status: 200, description: 'Export thành công' })
  async exportExcel(
    @Param('bangLuongId', ParseIntPipe) bangLuongId: number,
    @Res() res: Response,
  ) {
    const buffer = await this.importExcelService.exportExcel(bangLuongId);

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=bang-luong-${bangLuongId}.xlsx`,
    );
    res.send(buffer);
  }
}
