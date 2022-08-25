import { RoleCheckGuard } from './role-check.guard';

describe('RoleCheckGuard', () => {
  it('should be defined', () => {
    expect(new RoleCheckGuard()).toBeDefined();
  });
});
