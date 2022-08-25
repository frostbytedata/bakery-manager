import { applyDecorators, SetMetadata } from '@nestjs/common';

export const AndRoles = (roles: string[]) => {
  return applyDecorators(
    SetMetadata('roles', roles),
    SetMetadata('operator', 'and'),
  );
};
export const OrRoles = (roles: string[]) => {
  return applyDecorators(
    SetMetadata('roles', roles),
    SetMetadata('operator', 'or'),
  );
};
