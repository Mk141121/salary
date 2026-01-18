// Reports Controller - Sprint 12
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { ReportsService } from './reports.service';
import { ReportFilterDto } from './reports.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { VaiTro } from '../../common/decorators/vai-tro.decorator';

@ApiTags('Reports')
@ApiBearerAuth()
@Controller('reports')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('di-tre-ve-som')
  @VaiTro('ADMIN', 'HR', 'MANAGER')
  @ApiOperation({ summary: 'Báo cáo đi trễ / về sớm' })
  async getDiTreVeSom(@Query() filter: ReportFilterDto) {
    return this.reportsService.getDiTreVeSom(filter);
  }

  @Get('ot')
  @VaiTro('ADMIN', 'HR', 'MANAGER')
  @ApiOperation({ summary: 'Báo cáo OT' })
  async getOT(@Query() filter: ReportFilterDto) {
    return this.reportsService.getOT(filter);
  }

  @Get('nghi-phep')
  @VaiTro('ADMIN', 'HR', 'MANAGER')
  @ApiOperation({ summary: 'Báo cáo nghỉ phép' })
  async getNghiPhep(@Query() filter: ReportFilterDto) {
    return this.reportsService.getNghiPhep(filter);
  }

  @Get('quy-luong')
  @VaiTro('ADMIN', 'HR')
  @ApiOperation({ summary: 'Báo cáo quỹ lương theo phòng ban/khoản' })
  async getQuyLuong(@Query() filter: ReportFilterDto) {
    return this.reportsService.getQuyLuong(filter);
  }

  @Get('headcount')
  @VaiTro('ADMIN', 'HR', 'MANAGER')
  @ApiOperation({ summary: 'Báo cáo Headcount' })
  async getHeadcount(@Query() filter: ReportFilterDto) {
    return this.reportsService.getHeadcount(filter);
  }

  @Get('cham-cong')
  @VaiTro('ADMIN', 'HR', 'MANAGER')
  @ApiOperation({ summary: 'Báo cáo chấm công tổng hợp' })
  async getChamCong(@Query() filter: ReportFilterDto) {
    return this.reportsService.getChamCong(filter);
  }

  @Get('dashboard')
  @VaiTro('ADMIN', 'HR', 'MANAGER')
  @ApiOperation({ summary: 'Dashboard tổng hợp với KPIs và Alerts' })
  @ApiQuery({ name: 'thang', required: false, type: Number })
  @ApiQuery({ name: 'nam', required: false, type: Number })
  async getDashboard(
    @Query('thang') thang?: number,
    @Query('nam') nam?: number,
  ) {
    return this.reportsService.getDashboard(
      thang ? Number(thang) : undefined,
      nam ? Number(nam) : undefined,
    );
  }
}
