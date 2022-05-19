import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  Type,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import {
  map,
  Observable,
} from 'rxjs';

/**
 * Transforms a response according to the given Dto
 * Usage: @UseInterceptors(new SerializeRespondInterceptor(someDto))
 * Effect: Response data will be transformed
 * to the given Dto {excludeExtraneousValues: true}
 */
export class SerializeRespondInterceptor<T extends Type>
  implements NestInterceptor
{
  constructor(private dto: T) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<T> {
    return next.handle().pipe(
      map((value) => {
        return plainToInstance(this.dto, value, {
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}
