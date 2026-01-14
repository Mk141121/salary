"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageFileValidationPipe = exports.ExcelFileValidationPipe = void 0;
const common_1 = require("@nestjs/common");
const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ALLOWED_MIME_TYPES = [
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-excel',
    'text/csv',
];
const FILE_SIGNATURES = {
    xlsx: [[0x50, 0x4b, 0x03, 0x04]],
    xls: [[0xd0, 0xcf, 0x11, 0xe0]],
    csv: [],
};
let ExcelFileValidationPipe = class ExcelFileValidationPipe {
    transform(file) {
        if (!file) {
            throw new common_1.BadRequestException('Vui lòng upload file');
        }
        if (file.size > MAX_FILE_SIZE) {
            throw new common_1.BadRequestException(`File quá lớn. Kích thước tối đa: ${MAX_FILE_SIZE / 1024 / 1024}MB`);
        }
        if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
            throw new common_1.BadRequestException(`Định dạng file không hợp lệ. Chỉ chấp nhận: .xlsx, .xls, .csv`);
        }
        const originalName = file.originalname.toLowerCase();
        const validExtensions = ['.xlsx', '.xls', '.csv'];
        const hasValidExtension = validExtensions.some(ext => originalName.endsWith(ext));
        if (!hasValidExtension) {
            throw new common_1.BadRequestException(`Phần mở rộng file không hợp lệ. Chỉ chấp nhận: ${validExtensions.join(', ')}`);
        }
        if (file.buffer && file.buffer.length >= 4) {
            const isValidSignature = this.validateFileSignature(file.buffer, originalName);
            if (!isValidSignature) {
                throw new common_1.BadRequestException('File không hợp lệ. Nội dung file không khớp với định dạng khai báo.');
            }
        }
        const dangerousChars = /[<>:"/\\|?*\x00-\x1f]/;
        if (dangerousChars.test(file.originalname)) {
            throw new common_1.BadRequestException('Tên file chứa ký tự không hợp lệ');
        }
        if (file.originalname.includes('..') || file.originalname.includes('/') || file.originalname.includes('\\')) {
            throw new common_1.BadRequestException('Tên file không hợp lệ');
        }
        return file;
    }
    validateFileSignature(buffer, filename) {
        const header = Array.from(buffer.slice(0, 4));
        if (filename.endsWith('.xlsx')) {
            return this.matchSignature(header, FILE_SIGNATURES.xlsx);
        }
        if (filename.endsWith('.xls')) {
            return this.matchSignature(header, FILE_SIGNATURES.xls);
        }
        if (filename.endsWith('.csv')) {
            return this.isTextFile(buffer);
        }
        return false;
    }
    matchSignature(header, signatures) {
        if (signatures.length === 0)
            return true;
        return signatures.some(sig => sig.every((byte, index) => header[index] === byte));
    }
    isTextFile(buffer) {
        const checkLength = Math.min(buffer.length, 1000);
        for (let i = 0; i < checkLength; i++) {
            const byte = buffer[i];
            if (byte < 0x09 || (byte > 0x0d && byte < 0x20 && byte !== 0x1b)) {
                if (byte < 0x80) {
                    return false;
                }
            }
        }
        return true;
    }
};
exports.ExcelFileValidationPipe = ExcelFileValidationPipe;
exports.ExcelFileValidationPipe = ExcelFileValidationPipe = __decorate([
    (0, common_1.Injectable)()
], ExcelFileValidationPipe);
let ImageFileValidationPipe = class ImageFileValidationPipe {
    constructor(options = {}) {
        this.maxSize = (options.maxSizeMB || 5) * 1024 * 1024;
        this.allowedMimeTypes = options.allowedTypes || [
            'image/jpeg',
            'image/png',
            'image/gif',
            'image/webp',
        ];
    }
    transform(file) {
        if (!file) {
            throw new common_1.BadRequestException('Vui lòng upload file ảnh');
        }
        if (file.size > this.maxSize) {
            throw new common_1.BadRequestException(`File quá lớn. Kích thước tối đa: ${this.maxSize / 1024 / 1024}MB`);
        }
        if (!this.allowedMimeTypes.includes(file.mimetype)) {
            throw new common_1.BadRequestException(`Định dạng ảnh không hợp lệ. Chỉ chấp nhận: ${this.allowedMimeTypes.join(', ')}`);
        }
        if (file.buffer && file.buffer.length >= 4) {
            if (!this.validateImageSignature(file.buffer, file.mimetype)) {
                throw new common_1.BadRequestException('File ảnh không hợp lệ');
            }
        }
        return file;
    }
    validateImageSignature(buffer, mimeType) {
        const header = Array.from(buffer.slice(0, 8));
        const signatures = {
            'image/jpeg': [[0xff, 0xd8, 0xff]],
            'image/png': [[0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]],
            'image/gif': [[0x47, 0x49, 0x46, 0x38, 0x37, 0x61], [0x47, 0x49, 0x46, 0x38, 0x39, 0x61]],
            'image/webp': [[0x52, 0x49, 0x46, 0x46]],
        };
        const sigs = signatures[mimeType];
        if (!sigs)
            return false;
        return sigs.some(sig => sig.every((byte, index) => header[index] === byte));
    }
};
exports.ImageFileValidationPipe = ImageFileValidationPipe;
exports.ImageFileValidationPipe = ImageFileValidationPipe = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Object])
], ImageFileValidationPipe);
//# sourceMappingURL=file-validation.pipe.js.map