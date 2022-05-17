import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { ApiResponseOptions } from '@nestjs/swagger/dist/decorators/api-response.decorator';
import { ApiSecuredResponse } from './api-secured-response.decorator';

export const ApiSecuredOkResponse = (options?: ApiResponseOptions) =>
  applyDecorators(ApiSecuredResponse(), ApiOkResponse(options));
