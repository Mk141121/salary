// Module BHXH & Thuế TNCN - Quản lý bảo hiểm và thuế thu nhập cá nhân
import { Module } from '@nestjs/common';
import { BHXHThueService } from './bhxh-thue.service';
import { BHXHThueController } from './bhxh-thue.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [BHXHThueController],
  providers: [BHXHThueService],
  exports: [BHXHThueService],
})
export class BHXHThueModule {}
