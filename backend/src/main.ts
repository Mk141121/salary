// Main entry point - Hệ thống tính lương
import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { json, urlencoded } from 'express';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Security headers với Helmet
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", "data:", "blob:"],
      },
    },
    crossOriginEmbedderPolicy: false, // Cho phép embed resources
  }));

  // Tăng giới hạn body size cho upload file lớn
  app.use(json({ limit: '10mb' })); // Giảm từ 50mb xuống 10mb cho bảo mật
  app.use(urlencoded({ extended: true, limit: '10mb' }));

  // Bật CORS cho frontend - cấu hình chặt chẽ hơn
  app.enableCors({
    origin: process.env.ALLOWED_ORIGINS 
      ? process.env.ALLOWED_ORIGINS.split(',')
      : ['http://localhost', 'http://localhost:80', 'http://localhost:3000', 'http://localhost:5173'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    exposedHeaders: ['Content-Disposition'],
    maxAge: 3600, // Preflight cache 1 hour
  });

  // Validation pipe toàn cục
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Prefix API
  app.setGlobalPrefix('api');

  // Swagger documentation
  const config = new DocumentBuilder()
    .setTitle('Hệ Thống Tính Lương')
    .setDescription('API cho hệ thống tính lương doanh nghiệp Việt Nam')
    .setVersion('1.0')
    .addTag('phong-ban', 'Quản lý phòng ban')
    .addTag('nhan-vien', 'Quản lý nhân viên')
    .addTag('khoan-luong', 'Quản lý khoản lương')
    .addTag('bang-luong', 'Quản lý bảng lương')
    .addTag('import-excel', 'Import dữ liệu từ Excel')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT || 3001;
  await app.listen(port);
  
  const logger = new Logger('Bootstrap');
  logger.log(`Server đang chạy tại: http://localhost:${port}`);
  logger.log(`API Docs: http://localhost:${port}/api/docs`);
}

bootstrap();
