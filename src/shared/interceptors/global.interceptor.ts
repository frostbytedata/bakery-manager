import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ResponseCleanserPipe } from '../pipes/response-cleanser.pipe';

@Injectable()
export class GlobalInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before...');
    const now = Date.now();
    return next.handle().pipe(
      tap(() => console.log(`After... ${Date.now() - now}ms`)),
      map((requestData) => {
        const cleansingPipe = new ResponseCleanserPipe();
        return cleansingPipe.transform(requestData);
      }),
    );
  }
}
