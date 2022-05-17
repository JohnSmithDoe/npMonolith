import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { map, Observable } from 'rxjs';
import { ClassRef } from '../types';

export class SerializeRespondInterceptor<T extends ClassRef>
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
