import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSION_KEY } from 'src/Decorator/roles.decorator';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // 1️⃣ Lấy danh sách role yêu cầu từ `@Permissions()`
    const requiredPermissions = this.reflector.get<string[]>(
      PERMISSION_KEY,
      context.getHandler(),
    );

    // 2️⃣ Nếu API không yêu cầu quyền, mặc định cho phép truy cập
    if (!requiredPermissions || requiredPermissions.length === 0) {
      return true; // Không yêu cầu role cụ thể
    }

    const { user } = context.switchToHttp().getRequest();
    if (!user || !user.roles) {
      throw new ForbiddenException('Bạn không có quyền truy cập');
    }

    // Kiểm tra user có ít nhất một quyền trong requiredPermissions không
    const hasPermission = requiredPermissions.some((permission) =>
      user.roles.includes(permission),
    );

    if (!hasPermission) {
      throw new ForbiddenException('Bạn không có quyền truy cập');
    }
    return true;
  }
}
