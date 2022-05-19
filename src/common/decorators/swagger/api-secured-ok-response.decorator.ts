import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { ApiResponseOptions } from '@nestjs/swagger/dist/decorators/api-response.decorator';
import { ApiSecuredResponse } from './api-secured-response.decorator';

/**
 * Adds
 * Response Status 403 Unauthorized and
 * Response Status 200 Ok responses to swagger doc
 */
export const ApiSecuredOkResponse = (options?: ApiResponseOptions) =>
  applyDecorators(ApiSecuredResponse(), ApiOkResponse(options));
