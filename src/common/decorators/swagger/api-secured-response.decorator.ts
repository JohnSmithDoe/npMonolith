import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiSecurity, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { HttpExceptionDto } from '../../dtos/http-exception.dto';

export const ApiSecuredResponse = () =>
  applyDecorators(
    ApiSecurity('np-sec'),
    ApiUnauthorizedResponse({
      type: HttpExceptionDto,
      description: `## Needs Authorization
This endpoint is only available if you are a signed in user.
Use the login or register endpoints on the auth route to authorize.
`,
      content: {
        statusCode: { example: HttpStatus[HttpStatus.UNAUTHORIZED] },
        message: { example: 'Please log in first' },
        error: { example: HttpStatus.UNAUTHORIZED },
      },
    }),
  );
