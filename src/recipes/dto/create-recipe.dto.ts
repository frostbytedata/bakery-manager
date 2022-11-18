import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';
import { User } from '../../entity/User';
import { Ingredient } from '../../entity/Ingredient';

export class CreateRecipeDto {
  @IsString()
  name: string;

  @IsString()
  description?: string;

  @IsOptional()
  user?: User;

  @IsArray()
  ingredients: Ingredient[];

  @IsNumber()
  retailPrice: number;

  @IsNumber()
  wholesalePrice: number;
}
