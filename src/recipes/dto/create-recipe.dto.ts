import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';
import { User } from '../../entity/User';
import { RecipeToIngredient } from '../../entity/RecipeToIngredient';

export class CreateRecipeDto {
  @IsString()
  name: string;

  @IsString()
  description?: string;

  @IsOptional()
  user?: User;

  @IsArray()
  ingredients: RecipeToIngredient[];

  @IsNumber()
  retailPrice: number;

  @IsNumber()
  wholesalePrice: number;
}
