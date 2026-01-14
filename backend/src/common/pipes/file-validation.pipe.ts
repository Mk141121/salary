/**
 * File Validation Pipe
 * Kiểm tra file upload trước khi xử lý
 */
import {
  PipeTransform,
  Injectable,
  BadRequestException,
} from '@nestjs/common';

// Kích thước tối đa: 10MB
const MAX_FILE_SIZE = 10 * 1024 * 1024;

// Các MIME type được phép cho Excel
const ALLOWED_MIME_TYPES = [
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
  'application/vnd.ms-excel', // .xls
  'text/csv', // .csv
];

// Magic bytes cho các định dạng file
const FILE_SIGNATURES: Record<string, number[][]> = {
  xlsx: [[0x50, 0x4b, 0x03, 0x04]], // PK (ZIP format)
  xls: [[0xd0, 0xcf, 0x11, 0xe0]], // OLE Compound Document
  csv: [], // CSV không có magic bytes cố định
};

@Injectable()
export class ExcelFileValidationPipe implements PipeTransform {
  transform(file: Express.Multer.File): Express.Multer.File {
    if (!file) {
      throw new BadRequestException('Vui lòng upload file');
    }

    // Kiểm tra kích thước
    if (file.size > MAX_FILE_SIZE) {
      throw new BadRequestException(
        `File quá lớn. Kích thước tối đa: ${MAX_FILE_SIZE / 1024 / 1024}MB`
      );
    }

    // Kiểm tra MIME type
    if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
      throw new BadRequestException(
        `Định dạng file không hợp lệ. Chỉ chấp nhận: .xlsx, .xls, .csv`
      );
    }

    // Kiểm tra extension
    const originalName = file.originalname.toLowerCase();
    const validExtensions = ['.xlsx', '.xls', '.csv'];
    const hasValidExtension = validExtensions.some(ext => originalName.endsWith(ext));
    
    if (!hasValidExtension) {
      throw new BadRequestException(
        `Phần mở rộng file không hợp lệ. Chỉ chấp nhận: ${validExtensions.join(', ')}`
      );
    }

    // Kiểm tra magic bytes (file signature)
    if (file.buffer && file.buffer.length >= 4) {
      const isValidSignature = this.validateFileSignature(file.buffer, originalName);
      if (!isValidSignature) {
        throw new BadRequestException(
          'File không hợp lệ. Nội dung file không khớp với định dạng khai báo.'
        );
      }
    }

    // Kiểm tra tên file không chứa ký tự nguy hiểm
    const dangerousChars = /[<>:"/\\|?*\x00-\x1f]/;
    if (dangerousChars.test(file.originalname)) {
      throw new BadRequestException('Tên file chứa ký tự không hợp lệ');
    }

    // Kiểm tra path traversal
    if (file.originalname.includes('..') || file.originalname.includes('/') || file.originalname.includes('\\')) {
      throw new BadRequestException('Tên file không hợp lệ');
    }

    return file;
  }

  private validateFileSignature(buffer: Buffer, filename: string): boolean {
    // Lấy 4 bytes đầu tiên
    const header = Array.from(buffer.slice(0, 4));

    if (filename.endsWith('.xlsx')) {
      // XLSX phải bắt đầu với PK (ZIP format)
      return this.matchSignature(header, FILE_SIGNATURES.xlsx);
    }

    if (filename.endsWith('.xls')) {
      // XLS phải bắt đầu với OLE signature
      return this.matchSignature(header, FILE_SIGNATURES.xls);
    }

    if (filename.endsWith('.csv')) {
      // CSV: Kiểm tra không phải file nhị phân
      // Cho phép nếu các bytes đầu là ký tự ASCII hoặc UTF-8
      return this.isTextFile(buffer);
    }

    return false;
  }

  private matchSignature(header: number[], signatures: number[][]): boolean {
    if (signatures.length === 0) return true;
    
    return signatures.some(sig =>
      sig.every((byte, index) => header[index] === byte)
    );
  }

  private isTextFile(buffer: Buffer): boolean {
    // Kiểm tra 1000 bytes đầu tiên
    const checkLength = Math.min(buffer.length, 1000);
    
    for (let i = 0; i < checkLength; i++) {
      const byte = buffer[i];
      // Cho phép: printable ASCII, tab, newline, carriage return, UTF-8 multibyte
      if (byte < 0x09 || (byte > 0x0d && byte < 0x20 && byte !== 0x1b)) {
        // Có thể là UTF-8 multibyte (0x80-0xff)
        if (byte < 0x80) {
          return false; // Binary character trong ASCII range
        }
      }
    }
    
    return true;
  }
}

/**
 * Image File Validation Pipe (cho upload ảnh nếu cần)
 */
@Injectable()
export class ImageFileValidationPipe implements PipeTransform {
  private readonly maxSize: number;
  private readonly allowedMimeTypes: string[];

  constructor(
    options: { maxSizeMB?: number; allowedTypes?: string[] } = {}
  ) {
    this.maxSize = (options.maxSizeMB || 5) * 1024 * 1024;
    this.allowedMimeTypes = options.allowedTypes || [
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/webp',
    ];
  }

  transform(file: Express.Multer.File): Express.Multer.File {
    if (!file) {
      throw new BadRequestException('Vui lòng upload file ảnh');
    }

    if (file.size > this.maxSize) {
      throw new BadRequestException(
        `File quá lớn. Kích thước tối đa: ${this.maxSize / 1024 / 1024}MB`
      );
    }

    if (!this.allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException(
        `Định dạng ảnh không hợp lệ. Chỉ chấp nhận: ${this.allowedMimeTypes.join(', ')}`
      );
    }

    // Validate magic bytes
    if (file.buffer && file.buffer.length >= 4) {
      if (!this.validateImageSignature(file.buffer, file.mimetype)) {
        throw new BadRequestException('File ảnh không hợp lệ');
      }
    }

    return file;
  }

  private validateImageSignature(buffer: Buffer, mimeType: string): boolean {
    const header = Array.from(buffer.slice(0, 8));

    const signatures: Record<string, number[][]> = {
      'image/jpeg': [[0xff, 0xd8, 0xff]],
      'image/png': [[0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]],
      'image/gif': [[0x47, 0x49, 0x46, 0x38, 0x37, 0x61], [0x47, 0x49, 0x46, 0x38, 0x39, 0x61]],
      'image/webp': [[0x52, 0x49, 0x46, 0x46]], // RIFF
    };

    const sigs = signatures[mimeType];
    if (!sigs) return false;

    return sigs.some(sig =>
      sig.every((byte, index) => header[index] === byte)
    );
  }
}
