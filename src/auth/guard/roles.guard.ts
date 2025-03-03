import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { UserPayloadType } from '../types/user-payload.type';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorator/roles-auth.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) {
      return true;
    }

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

      const user = this.jwtService.verify<UserPayloadType>(token);
      req.user = user;
      console.log(user, user.roles);
      const hasRole = user.roles?.some((role) =>
        requiredRoles.includes(role.value),
      );
      if (!hasRole) {
        throw new UnauthorizedException('Insufficient permissions');
      }

      return true;
    } catch (error) {
      if (error instanceof Error) {
        throw new UnauthorizedException(error.message);
      }
      throw new HttpException('No access', HttpStatus.FORBIDDEN);
    }
  }
}
