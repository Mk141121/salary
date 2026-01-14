// Permissions Guard - Kiểm tra quyền cụ thể
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { QUYEN_KEY } from '../decorators/quyen.decorator';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(QUYEN_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredPermissions || requiredPermissions.length === 0) {
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

    const hasPermission = requiredPermissions.some((perm) => nguoiDung.quyens.includes(perm));

    if (!hasPermission) {
      throw new ForbiddenException(
        `Bạn không có quyền ${requiredPermissions.join(' hoặc ')} để thực hiện thao tác này`
      );
    }

    return true;
  }
}
