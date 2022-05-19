import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * Extracts the User from the request.
 * The User is on the request if the session validated the user correctly
 */
export const CurrentUser = createParamDecorator(
  (data: any, ctx: ExecutionContext) => {
    const req: Express.Request = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
