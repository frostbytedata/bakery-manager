import {
  CallHandler,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  mixin,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable()
export abstract class ResponseOwnerInterceptor implements NestInterceptor {
  protected abstract readonly resourceIdField: string;

  constructor() {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // Get our context and our user id from the JWT
    const [req, res] = context.getArgs();
    const userId = req.user.id || req.user._id;
    return next.handle().pipe(
      map((responseData) => {
        // Make sure we have some response data
        if (!responseData) {
          return responseData;
        }
        // If we are receiving an array of data, filter out results not
        // owned by the current user.
        if (responseData?.data && responseData.data.length !== undefined) {
          responseData.data = responseData.data.filter(
            (resource) =>
              resource[this.resourceIdField] === userId ||
              resource.global === true,
          );
          responseData.total = responseData.data.length;
          return responseData;
        }
        // If this is a single piece of data, ensure
        // the user owns it. If not, throw forbidden exception
        if (
          userId !== responseData[this.resourceIdField] &&
          responseData.global !== true
        ) {
          throw new ForbiddenException(
            'Resource not owned by user',
            'This resource is not owned by the current user.',
          );
        }
        return responseData;
      }),
      catchError((err) => {
        return throwError(() => err);
      }),
    );
  }
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const MustOwnResponse = (resourceIdField: string): any =>
  mixin(
    class extends ResponseOwnerInterceptor {
      protected readonly resourceIdField = resourceIdField;
    },
  );
