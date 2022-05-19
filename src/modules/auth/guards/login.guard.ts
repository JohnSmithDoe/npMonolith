import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * Custom AuthGuard triggers the local strategy (validates the user by password)
 * If a valid user is found we start a session on the server with this.login()
 */

@Injectable()
export class LoginGuard extends AuthGuard('local') {
  constructor() {
    super();
  }

  async canActivate(context: ExecutionContext) {
    const result = (await super.canActivate(context)) as boolean;
    if (result) {
      const request = context.switchToHttp().getRequest();
      await super.logIn(request);
    }
    return result;
  }
}
