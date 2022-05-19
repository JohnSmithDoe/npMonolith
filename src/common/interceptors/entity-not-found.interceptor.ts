import {
    BadRequestException,
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import {
    Observable,
    throwError,
} from 'rxjs';
import { catchError } from 'rxjs/operators';
import { EntityNotFoundError } from 'typeorm';

/** Catches all EntityNotFoundErrors and transforms them into a BAD Request Error */
@Injectable()
export class EntityNotFoundInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        if (error instanceof EntityNotFoundError) {
          return throwError(() => new BadRequestException(error));
        } else {
          return throwError(() => error);
        }
      }),
    );
  }
}
