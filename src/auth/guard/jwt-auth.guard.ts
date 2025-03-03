import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { UserPayloadType } from '../types/user-payload.type';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const req = context
      .switchToHttp()
      .getRequest<Request & { user?: UserPayloadType }>();

    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        throw new UnauthorizedException('Authorization header is missing');
      }

      const [bearer, token] = authHeader.split(' ');
      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException('Invalid token format');
      }

      req.user = this.jwtService.verify<UserPayloadType>(token);
      return true;
    } catch (error) {
      if (error instanceof Error) {
        throw new UnauthorizedException(error.message);
      }
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
