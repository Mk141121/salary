import { PipeTransform } from '@nestjs/common';
export declare class ExcelFileValidationPipe implements PipeTransform {
    transform(file: Express.Multer.File): Express.Multer.File;
    private validateFileSignature;
    private matchSignature;
    private isTextFile;
}
export declare class ImageFileValidationPipe implements PipeTransform {
    private readonly maxSize;
    private readonly allowedMimeTypes;
    constructor(options?: {
        maxSizeMB?: number;
        allowedTypes?: string[];
    });
    transform(file: Express.Multer.File): Express.Multer.File;
    private validateImageSignature;
}
