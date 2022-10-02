import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RoleCheckGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const [req, res, next] = context.getArgs();
    // Get roles from method or controller level metadata
    const roles =
      this.reflector.get<string[]>('roles', context.getHandler()) ||
      this.reflector.get<string[]>('roles', context.getClass());
    const operator =
      this.reflector.get<string[]>('operator', context.getHandler()) ||
      this.reflector.get<string>('operator', context.getClass());
    const user = req?.user;
    if (roles) {
      // Check if we have all or some roles based on the
      // decorator operator used.
      return operator === 'and'
        ? roles.every((requiredRole) => user.roles.includes(requiredRole))
        : roles.some((requiredRole) => user.roles.includes(requiredRole));
    }
    return true;
  }
}
