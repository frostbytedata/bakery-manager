import { IsOptional, IsString } from 'class-validator';
import { User } from '../../entity/User';

export class CreateIngredientDto {
  @IsString()
  name: string;

  @IsString()
  description?: string;

  @IsOptional()
  user?: User;

  @IsOptional()
  defaultUnitId?: number;
}
