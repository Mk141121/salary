// Module Nghỉ phép - Quản lý đơn nghỉ, duyệt và mapping chấm công/ngày công
import { Module } from '@nestjs/common';
import { NghiPhepController } from './nghi-phep.controller';
import { NghiPhepService } from './nghi-phep.service';
import { NghiPhepMappingService } from './nghi-phep-mapping.service';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [NghiPhepController],
  providers: [NghiPhepService, NghiPhepMappingService],
  exports: [NghiPhepService, NghiPhepMappingService],
})
export class NghiPhepModule {}
