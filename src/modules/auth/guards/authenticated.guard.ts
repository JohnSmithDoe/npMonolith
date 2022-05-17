import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext) {
    // console.log('9: canActivate is authenticated 1');
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      // console.log('9: is Public');
      return true;
    }
    const request: Express.Request = context.switchToHttp().getRequest();
    const isAuthenticated = request.isAuthenticated();
    // console.log('Authentication Guard', request.user, request.isAuthenticated());

    if (!isAuthenticated) {
      // console.log('9: can NOT Activate session auth');
      throw new UnauthorizedException('no session auth');
    }
    return isAuthenticated;
  }
}
