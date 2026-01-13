import { Module } from '@nestjs/common';
import { RBACService } from './rbac.service';
import { RBACController } from './rbac.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [RBACController],
  providers: [RBACService],
  exports: [RBACService],
})
export class RBACModule {}
