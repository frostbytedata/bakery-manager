import { IsNumber } from 'class-validator';

export class RecipeAddIngredientDto {
  @IsNumber()
  recipeId: number;

  @IsNumber()
  ingredientId: number;

  @IsNumber()
  quantity: number;

  @IsNumber()
  unitId: number;
}
