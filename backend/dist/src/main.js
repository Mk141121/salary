"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const express_1 = require("express");
const helmet_1 = require("helmet");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use((0, helmet_1.default)({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                styleSrc: ["'self'", "'unsafe-inline'"],
                scriptSrc: ["'self'"],
                imgSrc: ["'self'", "data:", "blob:"],
            },
        },
        crossOriginEmbedderPolicy: false,
    }));
    app.use((0, express_1.json)({ limit: '10mb' }));
    app.use((0, express_1.urlencoded)({ extended: true, limit: '10mb' }));
    app.enableCors({
        origin: process.env.ALLOWED_ORIGINS
            ? process.env.ALLOWED_ORIGINS.split(',')
            : ['http://localhost:3000', 'http://localhost:5173'],
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
        exposedHeaders: ['Content-Disposition'],
        maxAge: 3600,
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
        transformOptions: {
            enableImplicitConversion: true,
        },
    }));
    app.setGlobalPrefix('api');
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Hệ Thống Tính Lương')
        .setDescription('API cho hệ thống tính lương doanh nghiệp Việt Nam')
        .setVersion('1.0')
        .addTag('phong-ban', 'Quản lý phòng ban')
        .addTag('nhan-vien', 'Quản lý nhân viên')
        .addTag('khoan-luong', 'Quản lý khoản lương')
        .addTag('bang-luong', 'Quản lý bảng lương')
        .addTag('import-excel', 'Import dữ liệu từ Excel')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api/docs', app, document);
    const port = process.env.PORT || 3001;
    await app.listen(port);
    const logger = new common_1.Logger('Bootstrap');
    logger.log(`Server đang chạy tại: http://localhost:${port}`);
    logger.log(`API Docs: http://localhost:${port}/api/docs`);
}
bootstrap();
//# sourceMappingURL=main.js.map