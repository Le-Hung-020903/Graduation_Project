import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import JWT from 'src/utils/jwt';

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const accessToken =
      req.cookies?.accessToken || req.headers.authorization?.split(' ')[1];

    if (accessToken) {
      try {
        const decoded = JWT.verifyToken(accessToken);
        const { userId } = decoded;
        req['user'] = {
          userId,
        };
      } catch (e) {
        throw new BadRequestException('Token không hợp lệ');
      }
    }

    next();
  }
}
