import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { BlackListService } from 'src/black-list/black-list.service';
import { IS_PUBLIC_KEY } from 'src/Decorator/auth.decorator';
import { UserService } from 'src/user/user.service';
import JWT from 'src/utils/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly blackListService: BlackListService,
    private readonly userService: UserService,
    private reflector: Reflector, // Dùng để lấy metadata từ @Public()
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.get<boolean>(
      IS_PUBLIC_KEY,
      context.getHandler(),
    );

    if (isPublic) {
      return true; // Trả về true nếu đang ở trang public
    }
    const request = context.switchToHttp().getRequest();
    const accessToken: string =
      request.cookies?.accessToken ||
      request.headers.authorization?.split(' ')[1];

    // Kiểm tra xem access token có trong BL không
    const blackList = await this.blackListService.checkAccessToken(accessToken);
    if (blackList) {
      throw new UnauthorizedException('Token truy cập trái phép co bl');
    }

    // Giải mã token
    const decoded = JWT.verifyToken(accessToken);
    if (!decoded) {
      throw new UnauthorizedException(
        'Token truy cập trái phép khong giai duoc',
      );
    }

    const { userId, exp }: { userId: number; exp: number } = decoded;

    // Kiểm tra xem user còn nằm trong hệ thống không
    const user = await this.userService.findOne(userId);

    const roles = [
      ...new Set(
        user.data.roles.flatMap((role) => role.permissions.map((p) => p.value)),
      ),
    ];

    request.user = {
      ...user.data,
      exp,
      accessToken,
      roles,
    };
    return true;
  }
}
