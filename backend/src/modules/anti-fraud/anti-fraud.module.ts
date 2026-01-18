// Module Anti-fraud - Sprint 7
// GPS + Geofence validation
import { Module } from '@nestjs/common';
import { AntiFraudController } from './anti-fraud.controller';
import { AntiFraudService } from './anti-fraud.service';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [AntiFraudController],
  providers: [AntiFraudService],
  exports: [AntiFraudService],
})
export class AntiFraudModule {}
