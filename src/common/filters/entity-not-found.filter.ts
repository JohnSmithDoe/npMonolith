import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { EntityNotFoundError } from 'typeorm';
import { HttpExceptionDto } from '../dtos/http-exception.dto';

/**
 * Catches all EntityNotFoundErrors
 * and transforms them into a BAD Request Error
 */
@Catch(EntityNotFoundError)
export class EntityNotFoundFilter
  implements ExceptionFilter<EntityNotFoundError>
{
  catch(exception: EntityNotFoundError, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();
    const status = HttpStatus.BAD_REQUEST;
    const data: HttpExceptionDto = {
      statusCode: status,
      message: exception.message,
      error: exception.name,
    };
    response.status(status).json(data);
  }
}
