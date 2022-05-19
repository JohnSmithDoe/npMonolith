import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

/**
 * Global Guard that prevents access to api endpoints
 * Session based authentication
 * To prevent the guard from blocking we can use the
 * Public() decorator
 * @throws UnauthorizedException if the user is not authenticated and the route is not public
 */
@Injectable()
export class AuthenticatedGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext) {
    // Check for public route metadata
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    // Check if request is authenticated is valid
    const request: Express.Request = context.switchToHttp().getRequest();
    const isAuthenticated = request.isAuthenticated();
    if (!isAuthenticated) {
      throw new UnauthorizedException('not authenticated');
    }
    return isAuthenticated;
  }
}
