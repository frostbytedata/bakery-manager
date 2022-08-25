import { IsNumber } from 'class-validator';

export class AssignRoleDto {
  @IsNumber()
  roleId: string;

  @IsNumber()
  userId: string;
}
