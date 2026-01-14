// Prisma Service - Quản lý kết nối database
import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    super({
      log: process.env.NODE_ENV === 'development' 
        ? ['query', 'info', 'warn', 'error'] 
        : ['error'],
    });
  }

  async onModuleInit() {
    await this.$connect();
    this.logger.log('Đã kết nối database PostgreSQL');
  }

  async onModuleDestroy() {
    await this.$disconnect();
    this.logger.log('Đã ngắt kết nối database');
  }

  // Helper method để clean database trong testing
  async cleanDatabase() {
    if (process.env.NODE_ENV !== 'production') {
      const models = Reflect.ownKeys(this).filter(
        (key) => typeof key === 'string' && !key.startsWith('_') && !key.startsWith('$'),
      );
      
      return Promise.all(
        models.map((modelKey) => {
          const model = (this as Record<string, unknown>)[modelKey as string];
          if (model && typeof model === 'object' && 'deleteMany' in model) {
            return (model as { deleteMany: () => Promise<unknown> }).deleteMany();
          }
          return Promise.resolve();
        }),
      );
    }
  }
}
