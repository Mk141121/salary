// Module Yêu cầu (Request) - Sprint 4
import { Module } from '@nestjs/common';
import { YeuCauController } from './yeu-cau.controller';
import { YeuCauService } from './yeu-cau.service';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [YeuCauController],
  providers: [YeuCauService],
  exports: [YeuCauService],
})
export class YeuCauModule {}
