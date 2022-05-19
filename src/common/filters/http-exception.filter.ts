import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';
import { HttpExceptionDto } from '../dtos/http-exception.dto';

/**
 * Catches all HttpExceptions
 * should be the last error handler on the error handling stack
 * logs the error to the logfile
 */
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter<HttpException> {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    const { message, name } = exception;
    this.logger.error(
      `${exception.getStatus()} - ${name}:${message}`,
      exception.stack,
    );
    const response = host.switchToHttp().getResponse<Response>();
    const status = exception.getStatus();
    const data: HttpExceptionDto = {
      statusCode: status,
      message,
      error: name,
    };
    response.status(status).json(data);
  }
}
