// JWT Auth Guard - Xác thực token cho tất cả API
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import * as crypto from 'crypto';
import { PrismaService } from '../../prisma/prisma.service';
import { CONG_KHAI_KEY } from '../decorators/cong-khai.decorator';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private prisma: PrismaService,
  ) {}

  /**
   * Hash token để lookup trong DB
   */
  private hashToken(token: string): string {
    return crypto.createHash('sha256').update(token).digest('hex');
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Kiểm tra xem route có được đánh dấu public không
    const congKhai = this.reflector.getAllAndOverride<boolean>(CONG_KHAI_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (congKhai) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Yêu cầu đăng nhập để truy cập');
    }

    try {
      // Hash token để lookup trong DB (token được lưu dạng hash)
      const tokenHash = this.hashToken(token);
      
      // Tìm phiên đăng nhập theo token hash
      const phien = await this.prisma.phienDangNhap.findFirst({
        where: {
          token: tokenHash,
          trangThai: 'HOAT_DONG',
          thoiGianHetHan: {
            gt: new Date(),
          },
        },
        include: {
          nguoiDung: {
            include: {
              vaiTros: {
                include: {
                  vaiTro: {
                    include: {
                      quyens: {
                        include: {
                          quyen: true,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      });

      if (!phien) {
        throw new UnauthorizedException('Phiên đăng nhập không hợp lệ hoặc đã hết hạn');
      }

      if (phien.nguoiDung.trangThai !== 'HOAT_DONG') {
        throw new UnauthorizedException('Tài khoản đã bị khóa hoặc vô hiệu hóa');
      }

      // Thu thập vai trò và quyền
      const vaiTros: string[] = [];
      const quyens: string[] = [];

      for (const ndvt of phien.nguoiDung.vaiTros) {
        vaiTros.push(ndvt.vaiTro.maVaiTro);
        for (const vtq of ndvt.vaiTro.quyens) {
          if (!quyens.includes(vtq.quyen.maQuyen)) {
            quyens.push(vtq.quyen.maQuyen);
          }
        }
      }

      // Gắn thông tin user vào request
      request.nguoiDung = {
        id: phien.nguoiDung.id,
        tenDangNhap: phien.nguoiDung.tenDangNhap,
        hoTen: phien.nguoiDung.hoTen,
        email: phien.nguoiDung.email,
        vaiTros,
        quyens,
      };

      return true;
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new UnauthorizedException('Lỗi xác thực');
    }
  }

  private extractTokenFromHeader(request: { headers: { authorization?: string } }): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
