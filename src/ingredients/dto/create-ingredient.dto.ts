import { IsInt, IsOptional, IsString } from 'class-validator';
import { User } from '../../entity/User';
import { Unit } from '../../entity/Unit';

export class CreateIngredientDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsOptional()
  user?: User;

  @IsOptional()
  defaultUnit?: Unit;
}
