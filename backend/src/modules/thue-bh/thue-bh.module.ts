import { Module } from '@nestjs/common';
import { ThueBHController } from './thue-bh.controller';
import { ThueBHService } from './thue-bh.service';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ThueBHController],
  providers: [ThueBHService],
  exports: [ThueBHService],
})
export class ThueBHModule {}
