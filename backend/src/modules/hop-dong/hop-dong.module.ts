import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { HopDongController } from './hop-dong.controller';
import { HopDongService } from './hop-dong.service';

@Module({
  imports: [PrismaModule],
  controllers: [HopDongController],
  providers: [HopDongService],
  exports: [HopDongService],
})
export class HopDongModule {}
