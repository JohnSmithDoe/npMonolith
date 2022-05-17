import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LoginGuard extends AuthGuard('local') {
  constructor() {
    //console.log('session reflect @WithSession maybe or config');
    super();
  }

  async canActivate(context: ExecutionContext) {
    const result = (await super.canActivate(context)) as boolean;
    // console.log('can activate login session reflect @WithSession maybe or config');
    if (result) {
      // console.log('start session');
      const request = context.switchToHttp().getRequest();
      await super.logIn(request);
    }
    return result;
  }
}
