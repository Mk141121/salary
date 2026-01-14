// Health Controller - Endpoint kiểm tra sức khỏe ứng dụng
import { Controller, Get } from '@nestjs/common';
import { CongKhai } from './common/decorators';
import { PrismaService } from './prisma/prisma.service';

@Controller('health')
export class HealthController {
  constructor(private prisma: PrismaService) {}

  @Get()
  @CongKhai()
  async check() {
    const dbStatus = await this.checkDatabase();
    
    return {
      status: dbStatus ? 'healthy' : 'unhealthy',
      timestamp: new Date().toISOString(),
      services: {
        database: dbStatus ? 'up' : 'down',
      },
    };
  }

  private async checkDatabase(): Promise<boolean> {
    try {
      await this.prisma.$queryRaw`SELECT 1`;
      return true;
    } catch {
      return false;
    }
  }
}
