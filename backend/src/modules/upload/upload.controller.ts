// Controller Upload - Xử lý upload file (ảnh, PDF)
import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  BadRequestException,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiResponse, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { Quyen } from '../../common';

// Cấu hình storage
const UPLOAD_DIR = process.env.UPLOAD_DIR || './uploads';

// Đảm bảo thư mục tồn tại
const ensureDir = (dir: string) => {
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
};

// Storage config cho multer
const storageConfig = (subFolder: string) => diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = join(UPLOAD_DIR, subFolder);
    ensureDir(uploadPath);
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = extname(file.originalname);
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  },
});

// Filter cho ảnh
const imageFileFilter = (req: any, file: Express.Multer.File, cb: any) => {
  const allowedMimes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new BadRequestException('Chỉ chấp nhận file ảnh (jpeg, png, gif, webp)'), false);
  }
};

// Filter cho ảnh + PDF
const documentFileFilter = (req: any, file: Express.Multer.File, cb: any) => {
  const allowedMimes = [
    'image/jpeg', 'image/png', 'image/gif', 'image/webp',
    'application/pdf',
  ];
  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new BadRequestException('Chỉ chấp nhận file ảnh hoặc PDF'), false);
  }
};

@ApiTags('upload')
@Controller('upload')
export class UploadController {
  private readonly baseUrl: string;

  constructor() {
    this.baseUrl = process.env.API_URL || 'http://localhost:3001';
  }

  /**
   * Upload ảnh CCCD
   */
  @Quyen('NHANVIEN_SUA')
  @Post('cccd/:nhanVienId/:mat')
  @UseInterceptors(FileInterceptor('file', {
    storage: storageConfig('cccd'),
    fileFilter: imageFileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  }))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Upload ảnh CCCD (mặt trước hoặc sau)' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: { type: 'string', format: 'binary' },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Upload thành công' })
  async uploadCCCD(
    @Param('nhanVienId', ParseIntPipe) nhanVienId: number,
    @Param('mat') mat: 'truoc' | 'sau',
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('Vui lòng chọn file ảnh');
    }

    if (!['truoc', 'sau'].includes(mat)) {
      throw new BadRequestException('Tham số mat phải là "truoc" hoặc "sau"');
    }

    const fileUrl = `${this.baseUrl}/uploads/cccd/${file.filename}`;
    
    return {
      success: true,
      message: `Upload ảnh CCCD mặt ${mat} thành công`,
      url: fileUrl,
      filename: file.filename,
      originalName: file.originalname,
      size: file.size,
      mimetype: file.mimetype,
    };
  }

  /**
   * Upload file hợp đồng (ảnh hoặc PDF)
   */
  @Quyen('NHANVIEN_SUA')
  @Post('hop-dong/:nhanVienId')
  @UseInterceptors(FileInterceptor('file', {
    storage: storageConfig('hop-dong'),
    fileFilter: documentFileFilter,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  }))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Upload file hợp đồng (ảnh hoặc PDF)' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: { type: 'string', format: 'binary' },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Upload thành công' })
  async uploadHopDong(
    @Param('nhanVienId', ParseIntPipe) nhanVienId: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('Vui lòng chọn file');
    }

    const fileUrl = `${this.baseUrl}/uploads/hop-dong/${file.filename}`;
    
    return {
      success: true,
      message: 'Upload file hợp đồng thành công',
      url: fileUrl,
      filename: file.filename,
      originalName: file.originalname,
      size: file.size,
      mimetype: file.mimetype,
    };
  }

  /**
   * Upload nhiều file hợp đồng
   */
  @Quyen('NHANVIEN_SUA')
  @Post('hop-dong/:nhanVienId/multi')
  @UseInterceptors(FilesInterceptor('files', 10, {
    storage: storageConfig('hop-dong'),
    fileFilter: documentFileFilter,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB mỗi file
  }))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Upload nhiều file hợp đồng' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'array',
          items: { type: 'string', format: 'binary' },
        },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Upload thành công' })
  async uploadMultiHopDong(
    @Param('nhanVienId', ParseIntPipe) nhanVienId: number,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    if (!files || files.length === 0) {
      throw new BadRequestException('Vui lòng chọn ít nhất 1 file');
    }

    const uploadedFiles = files.map(file => ({
      url: `${this.baseUrl}/uploads/hop-dong/${file.filename}`,
      filename: file.filename,
      originalName: file.originalname,
      size: file.size,
      mimetype: file.mimetype,
    }));
    
    return {
      success: true,
      message: `Upload ${files.length} file thành công`,
      files: uploadedFiles,
      urls: uploadedFiles.map(f => f.url),
    };
  }
}
