// JWT Auth Guard - Xác thực token cho tất cả API
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { createHash } from 'crypto';
import { PrismaService } from '../../prisma/prisma.service';
import { CONG_KHAI_KEY } from '../decorators/cong-khai.decorator';
import {
  CSRF_COOKIE_NAME,
  extractAuthTokenFromRequest,
  parseCookies,
} from '../utils/http-auth.util';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private prisma: PrismaService,
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Kiểm tra xem route có được đánh dấu public không
    const congKhai = this.reflector.getAllAndOverride<boolean>(CONG_KHAI_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (congKhai) {
      return true;
    }

    const request = context.switchToHttp().getRequest<{
      method: string;
      headers: { authorization?: string; cookie?: string; 'x-csrf-token'?: string };
      nguoiDung?: unknown;
      user?: unknown;
    }>();
    const token = extractAuthTokenFromRequest(request);

    if (!token) {
      throw new UnauthorizedException('Yêu cầu đăng nhập để truy cập');
    }

    this.validateCsrfForCookieAuth(request, token);

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
        nhanVienId: phien.nguoiDung.nhanVienId, // Thêm nhanVienId cho Employee Portal
        vaiTros,
        quyens,
      };
      // Alias cho compatibility
      request.user = request.nguoiDung;

      return true;
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new UnauthorizedException('Lỗi xác thực');
    }
  }

  private hashToken(token: string): string {
    return createHash('sha256').update(token).digest('hex');
  }

  private validateCsrfForCookieAuth(request: {
    method: string;
    headers: { authorization?: string; cookie?: string; 'x-csrf-token'?: string };
  }, token: string): void {
    const cookies = parseCookies(request.headers.cookie);
    const cookieToken = cookies.TL_AUTH_TOKEN;

    if (!cookieToken || cookieToken !== token) {
      return;
    }

    const method = request.method?.toUpperCase() || 'GET';
    const safeMethod = method === 'GET' || method === 'HEAD' || method === 'OPTIONS';
    if (safeMethod) {
      return;
    }

    const csrfCookie = cookies[CSRF_COOKIE_NAME];
    const csrfHeader = request.headers['x-csrf-token'];

    if (!csrfCookie || !csrfHeader || csrfCookie !== csrfHeader) {
      throw new UnauthorizedException('CSRF token không hợp lệ');
    }
  }
}
