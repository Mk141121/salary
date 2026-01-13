// Module Chấm công
import { Module } from '@nestjs/common';
import { ChamCongService } from './cham-cong.service';
import { ChamCongController } from './cham-cong.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ChamCongController],
  providers: [ChamCongService],
  exports: [ChamCongService],
})
export class ChamCongModule {}
