// Main entry point - Hệ thống tính lương
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { json, urlencoded } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Tăng giới hạn body size cho upload file lớn
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));

  // Bật CORS cho frontend
  app.enableCors({
    origin: ['http://localhost:3000', 'http://localhost:5173'],
    credentials: true,
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
  
  console.log(`🚀 Server đang chạy tại: http://localhost:${port}`);
  console.log(`📚 API Docs: http://localhost:${port}/api/docs`);
}

bootstrap();
