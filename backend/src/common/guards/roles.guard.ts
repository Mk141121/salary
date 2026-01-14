// Roles Guard - Kiểm tra vai trò người dùng
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { VAI_TRO_KEY } from '../decorators/vai-tro.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(VAI_TRO_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const nguoiDung = request.nguoiDung;

    if (!nguoiDung) {
      throw new ForbiddenException('Không có thông tin người dùng');
    }

    // ADMIN có tất cả quyền
    if (nguoiDung.vaiTros.includes('ADMIN')) {
      return true;
    }

    const hasRole = requiredRoles.some((role) => nguoiDung.vaiTros.includes(role));

    if (!hasRole) {
      throw new ForbiddenException(
        `Bạn cần có vai trò ${requiredRoles.join(' hoặc ')} để thực hiện thao tác này`
      );
    }

    return true;
  }
}
